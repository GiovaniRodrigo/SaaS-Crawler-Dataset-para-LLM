<?php

namespace App\Services\AI;

use App\Contracts\AI\EmbeddingGeneratorInterface;
use App\Contracts\Repositories\ChunkEmbeddingRepositoryInterface;
use App\Models\Chunk;

class GenerateChunkEmbeddingService
{
    public function __construct(
        private readonly EmbeddingGeneratorInterface $embeddingGenerator,
        private readonly ChunkEmbeddingRepositoryInterface $repository,
    ) {}

    public function handle(Chunk $chunk): void
    {
        $contentHash = hash('sha256', $chunk->text);

        if ($chunk->embedding && $chunk->embedding->content_hash === $contentHash) {
            return;
        }

        $embedding = $this->embeddingGenerator->generate($chunk->text);

        $this->repository->saveEmbedding(
            userId: $chunk->project->user_id,
            projectId: $chunk->project_id,
            documentId: $chunk->document_id,
            chunkId: $chunk->id,
            embedding: $embedding,
            provider: $this->embeddingGenerator->provider(),
            model: $this->embeddingGenerator->model(),
            dimensions: $this->embeddingGenerator->dimensions(),
            contentHash: $contentHash
        );
    }
}
