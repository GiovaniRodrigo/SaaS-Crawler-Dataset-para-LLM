<?php

namespace App\Services\AI;

use App\Contracts\AI\QualityScorerInterface;
use App\Models\Document;
use App\Services\Quality\QualityScorer;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class GeminiQualityScorer implements QualityScorerInterface
{
    protected string $key;
    protected string $model;
    protected QualityScorer $fallbackScorer;

    public function __construct(QualityScorer $fallbackScorer)
    {
        $this->key = config('ai.providers.gemini.key') ?? '';
        $this->model = config('ai.providers.gemini.chat_model') ?? 'gemini-1.5-flash';
        $this->fallbackScorer = $fallbackScorer;
    }

    public function calculate(Document $document): float
    {
        if (empty($this->key)) {
            Log::warning('Gemini API key is missing. Falling back to local heuristic QualityScorer.');
            return $this->fallbackScorer->calculate($document);
        }

        // Limit the text to avoid huge costs and token context bloat (~4000 words limit)
        $words = preg_split('/\s+/', $document->text ?? '');
        $truncatedText = implode(' ', array_slice($words, 0, 4000));

        try {
            $modelName = ltrim($this->model, 'models/');
            $url = "https://generativelanguage.googleapis.com/v1beta/models/{$modelName}:generateContent?key={$this->key}";

            $prompt = "Você é um avaliador de qualidade de dados especializado em curadoria de datasets para treinamento de Inteligência Artificial (LLMs).\n"
                . "Analise o conteúdo de texto da página web abaixo (Título e Texto) e atribua um score de qualidade de 0 a 100, onde:\n"
                . "- 90-100: Conteúdo de altíssima qualidade (tutoriais aprofundados, artigos técnicos completos, documentação oficial, livros, sem ruído).\n"
                . "- 70-80: Conteúdo informativo útil (artigos de blog informativos, notícias relevantes, guias básicos).\n"
                . "- 50-60: Conteúdo de baixa qualidade ou superficial (páginas curtas, posts promocionais leves, notícias rasas).\n"
                . "- 0-49: Ruído absoluto (páginas de login, mensagens de erro, cabeçalhos/rodapés vazios, política de cookies pura, termos de serviço curtos e sem valor informativo, spam).\n\n"
                . "Considere critérios como riqueza informativa, presença de ruído técnico/HTML e coerência.\n"
                . "Retorne obrigatoriamente um objeto JSON com o seguinte formato:\n"
                . '{"score": <número entre 0 e 100>, "reason": "<explicação curta de 1 frase justificando o score>"}' . "\n\n"
                . "Título: " . ($document->title ?: 'Sem título') . "\n"
                . "Texto:\n" . $truncatedText;

            $payload = [
                'contents' => [
                    [
                        'parts' => [
                            ['text' => $prompt]
                        ]
                    ]
                ],
                'generationConfig' => [
                    'responseMimeType' => 'application/json',
                    'responseSchema' => [
                        'type' => 'OBJECT',
                        'properties' => [
                            'score' => ['type' => 'INTEGER'],
                            'reason' => ['type' => 'STRING']
                        ],
                        'required' => ['score', 'reason']
                    ],
                    'temperature' => 0.2
                ]
            ];

            $response = Http::timeout(10)->post($url, $payload);

            if ($response->successful()) {
                $data = $response->json();
                $textResult = $data['candidates'][0]['content']['parts'][0]['text'] ?? null;
                if ($textResult) {
                    $json = json_decode($textResult, true);
                    if (isset($json['score'])) {
                        return (float) max(0, min(100, $json['score']));
                    }
                }
            }

            Log::error('Gemini QualityScorer API error: ' . $response->body());
        } catch (\Exception $e) {
            Log::error('Gemini QualityScorer exception: ' . $e->getMessage());
        }

        return $this->fallbackScorer->calculate($document);
    }
}
