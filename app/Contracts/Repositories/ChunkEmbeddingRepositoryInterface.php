<?php

namespace App\Contracts\Repositories;

interface ChunkEmbeddingRepositoryInterface
{
    public function saveEmbedding(
        int $userId,
        int $projectId,
        int $documentId,
        int $chunkId,
        array $embedding,
        string $provider,
        string $model,
        int $dimensions,
        string $contentHash
    ): void;

    public function searchSimilar(
        int $userId,
        int $projectId,
        array $queryEmbedding,
        int $limit = 10
    ): array;
}
