<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        if (DB::getDriverName() === 'pgsql') {
            // HNSW index is recommended for large vector datasets.
            // We use vector_cosine_ops because we are performing cosine similarity searches (1 - <=>).
            DB::statement('CREATE INDEX IF NOT EXISTS chunk_embeddings_embedding_hnsw_idx ON chunk_embeddings USING hnsw (embedding vector_cosine_ops)');
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        if (DB::getDriverName() === 'pgsql') {
            DB::statement('DROP INDEX IF EXISTS chunk_embeddings_embedding_hnsw_idx');
        }
    }
};
