<?php

namespace App\Services\AI;

use App\Contracts\AI\EmbeddingGeneratorInterface;

class FakeEmbeddingGenerator implements EmbeddingGeneratorInterface
{
    public function generate(string $text): array
    {
        $hash = hash('sha256', $text);
        $vector = [];

        // Generate a pseudo-random vector of 1536 dimensions based on the hash
        for ($i = 0; $i < 1536; $i++) {
            $piece = substr($hash, ($i % 32), 2);
            $vector[] = round(hexdec($piece) / 255, 8);
        }

        return $vector;
    }

    public function provider(): string
    {
        return 'fake';
    }

    public function model(): string
    {
        return 'fake-embedding-1536';
    }

    public function dimensions(): int
    {
        return 1536;
    }
}
