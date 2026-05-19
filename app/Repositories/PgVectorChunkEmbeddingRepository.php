<?php

namespace App\Repositories;

use App\Contracts\Repositories\ChunkEmbeddingRepositoryInterface;
use App\Models\ChunkEmbedding;
use Illuminate\Support\Facades\DB;

class PgVectorChunkEmbeddingRepository implements ChunkEmbeddingRepositoryInterface
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
    ): void {
        $record = ChunkEmbedding::query()->updateOrCreate(
            [
                'chunk_id' => $chunkId,
                'provider' => $provider,
                'model' => $model,
            ],
            [
                'user_id' => $userId,
                'project_id' => $projectId,
                'document_id' => $documentId,
                'dimensions' => $dimensions,
                'content_hash' => $contentHash,
            ]
        );

        DB::statement(
            'UPDATE chunk_embeddings SET embedding = ?::vector WHERE id = ?',
            [$this->vectorToSql($embedding), $record->id]
        );
    }

    public function searchSimilar(
        int $userId,
        int $projectId,
        array $queryEmbedding,
        int $limit = 10
    ): array {
        $vector = $this->vectorToSql($queryEmbedding);

        return DB::select(
            '
            SELECT
                c.id AS chunk_id,
                c.document_id,
                c.text AS content,
                d.title,
                d.url,
                1 - (ce.embedding <=> ?::vector) AS similarity
            FROM chunk_embeddings ce
            JOIN chunks c ON c.id = ce.chunk_id
            JOIN documents d ON d.id = c.document_id
            WHERE ce.user_id = ?
              AND ce.project_id = ?
            ORDER BY ce.embedding <=> ?::vector
            LIMIT ?
            ',
            [
                $vector,
                $userId,
                $projectId,
                $vector,
                $limit,
            ]
        );
    }

    private function vectorToSql(array $vector): string
    {
        $safeVector = array_map(
            static fn ($value) => (float) $value,
            $vector
        );

        return '[' . implode(',', $safeVector) . ']';
    }
}
