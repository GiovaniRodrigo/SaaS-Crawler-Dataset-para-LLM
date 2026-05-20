<?php

namespace App\Services\AI;

use App\Contracts\AI\EmbeddingGeneratorInterface;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class OpenAIEmbeddingGenerator implements EmbeddingGeneratorInterface
{
    protected string $key;
    protected string $model;
    protected int $dimensions;

    public function __construct()
    {
        $this->key = config('ai.providers.openai.key') ?? '';
        $this->model = config('ai.providers.openai.model') ?? 'text-embedding-3-small';
        $this->dimensions = config('ai.providers.openai.dimensions') ?? 1536;
    }

    public function generate(string $text): array
    {
        if (empty($this->key)) {
            Log::warning('OpenAI API key is missing. Falling back to zero-filled embedding.');
            return array_fill(0, $this->dimensions, 0.0);
        }

        try {
            $payload = [
                'input' => $text,
                'model' => $this->model,
            ];

            // Only text-embedding-3 models support customizing dimensions
            if (str_contains($this->model, 'text-embedding-3')) {
                $payload['dimensions'] = $this->dimensions;
            }

            $response = Http::withToken($this->key)
                ->timeout(15)
                ->post('https://api.openai.com/v1/embeddings', $payload);

            if ($response->successful()) {
                $data = $response->json();
                $embedding = $data['data'][0]['embedding'] ?? null;
                if ($embedding) {
                    return $embedding;
                }
            }

            Log::error('OpenAI Embedding API error: ' . $response->body());
        } catch (\Exception $e) {
            Log::error('OpenAI Embedding exception: ' . $e->getMessage());
        }

        return array_fill(0, $this->dimensions, 0.0);
    }

    public function provider(): string
    {
        return 'openai';
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
