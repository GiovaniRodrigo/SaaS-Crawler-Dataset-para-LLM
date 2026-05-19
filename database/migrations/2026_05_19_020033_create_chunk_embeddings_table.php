<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('chunk_embeddings', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->cascadeOnDelete();
            $table->foreignId('project_id')->constrained()->cascadeOnDelete();
            $table->foreignId('document_id')->constrained()->cascadeOnDelete();
            $table->foreignId('chunk_id')->constrained('chunks')->cascadeOnDelete();

            $table->string('provider');
            $table->string('model');
            $table->unsignedInteger('dimensions');
            $table->string('content_hash', 64);

            $table->timestamps();

            $table->index('user_id');
            $table->index('project_id');
            $table->index('document_id');
            $table->index('chunk_id');
            $table->unique(['chunk_id', 'provider', 'model']);
        });

        if (DB::getDriverName() === 'pgsql') {
            DB::statement('ALTER TABLE chunk_embeddings ADD COLUMN embedding vector(1536)');
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('chunk_embeddings');
    }
};
