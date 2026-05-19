<?php

namespace App\Contracts\AI;

interface EmbeddingGeneratorInterface
{
    /**
     * @return array<float>
     */
    public function generate(string $text): array;

    public function provider(): string;

    public function model(): string;

    public function dimensions(): int;
}
