<?php

namespace App\Services\AI;

use App\Contracts\AI\QualityScorerInterface;
use App\Models\Document;
use App\Services\Quality\QualityScorer;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class OpenAiQualityScorer implements QualityScorerInterface
{
    protected string $key;
    protected string $model;
    protected QualityScorer $fallbackScorer;

    public function __construct(QualityScorer $fallbackScorer)
    {
        $this->key = config('ai.providers.openai.key') ?? '';
        $this->model = config('ai.providers.openai.chat_model') ?? 'gpt-4o-mini';
        $this->fallbackScorer = $fallbackScorer;
    }

    public function calculate(Document $document): float
    {
        if (empty($this->key)) {
            Log::warning('OpenAI API key is missing. Falling back to local heuristic QualityScorer.');
            return $this->fallbackScorer->calculate($document);
        }

        // Limit the text to avoid huge costs and token context bloat (~4000 words limit)
        $words = preg_split('/\s+/', $document->text ?? '');
        $truncatedText = implode(' ', array_slice($words, 0, 4000));

        try {
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
                'model' => $this->model,
                'messages' => [
                    [
                        'role' => 'user',
                        'content' => $prompt
                    ]
                ],
                'response_format' => ['type' => 'json_object'],
                'temperature' => 0.2
            ];

            $response = Http::withToken($this->key)
                ->timeout(10)
                ->post('https://api.openai.com/v1/chat/completions', $payload);

            if ($response->successful()) {
                $data = $response->json();
                $textResult = $data['choices'][0]['message']['content'] ?? null;
                if ($textResult) {
                    $json = json_decode($textResult, true);
                    if (isset($json['score'])) {
                        return (float) max(0, min(100, $json['score']));
                    }
                }
            }

            Log::error('OpenAI QualityScorer API error: ' . $response->body());
        } catch (\Exception $e) {
            Log::error('OpenAI QualityScorer exception: ' . $e->getMessage());
        }

        return $this->fallbackScorer->calculate($document);
    }
}
