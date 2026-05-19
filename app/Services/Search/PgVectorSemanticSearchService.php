<?php

namespace App\Services\Search;

use App\Contracts\AI\EmbeddingGeneratorInterface;
use App\Contracts\Repositories\ChunkEmbeddingRepositoryInterface;
use App\Contracts\Search\SemanticSearchInterface;

class PgVectorSemanticSearchService implements SemanticSearchInterface
{
    public function __construct(
        private readonly EmbeddingGeneratorInterface $embeddingGenerator,
        private readonly ChunkEmbeddingRepositoryInterface $repository,
    ) {}

    public function search(
        int $userId,
        int $projectId,
        string $query,
        int $limit = 10
    ): array {
        $embedding = $this->embeddingGenerator->generate($query);

        return $this->repository->searchSimilar(
            userId: $userId,
            projectId: $projectId,
            queryEmbedding: $embedding,
            limit: $limit
        );
    }
}
