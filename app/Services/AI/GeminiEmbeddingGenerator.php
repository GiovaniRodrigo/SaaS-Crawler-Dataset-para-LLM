<?php

namespace App\Services\AI;

use App\Contracts\AI\EmbeddingGeneratorInterface;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class GeminiEmbeddingGenerator implements EmbeddingGeneratorInterface
{
    protected string $key;
    protected string $model;
    protected int $dimensions;

    public function __construct()
    {
        $this->key = config('ai.providers.gemini.key') ?? '';
        $this->model = config('ai.providers.gemini.model') ?? 'text-embedding-004';
        $this->dimensions = config('ai.providers.gemini.dimensions') ?? 1536;
    }

    public function generate(string $text): array
    {
        if (empty($this->key)) {
            Log::warning('Gemini API key is missing. Falling back to zero-filled embedding.');
            return array_fill(0, $this->dimensions, 0.0);
        }

        try {
            $modelName = ltrim($this->model, 'models/');
            $url = "https://generativelanguage.googleapis.com/v1beta/models/{$modelName}:embedContent?key={$this->key}";

            $payload = [
                'model' => "models/{$modelName}",
                'content' => [
                    'parts' => [
                        ['text' => $text]
                    ]
                ]
            ];

            // If dimensions fits within Gemini's native capability (typically <= 768), request it.
            // Otherwise, we fetch native size and pad to $this->dimensions.
            if ($this->dimensions <= 768) {
                $payload['outputDimensionality'] = $this->dimensions;
            }

            $response = Http::timeout(15)
                ->post($url, $payload);

            if ($response->successful()) {
                $data = $response->json();
                $embedding = $data['embedding']['values'] ?? null;
                if ($embedding) {
                    $count = count($embedding);
                    if ($count < $this->dimensions) {
                        $embedding = array_pad($embedding, $this->dimensions, 0.0);
                    } elseif ($count > $this->dimensions) {
                        $embedding = array_slice($embedding, 0, $this->dimensions);
                    }
                    return $embedding;
                }
            }

            Log::error('Gemini Embedding API error: ' . $response->body());
        } catch (\Exception $e) {
            Log::error('Gemini Embedding exception: ' . $e->getMessage());
        }

        return array_fill(0, $this->dimensions, 0.0);
    }

    public function provider(): string
    {
        return 'gemini';
    }

    public function model(): string
    {
        return $this->model;
    }

    public function dimensions(): int
    {
        return $this->dimensions;
    }
}
