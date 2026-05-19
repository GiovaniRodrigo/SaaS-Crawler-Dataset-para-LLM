<?php

namespace Tests\Feature\AI;

use App\Models\Chunk;
use App\Models\Document;
use App\Models\Project;
use App\Models\User;
use App\Services\AI\GenerateChunkEmbeddingService;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\DB;
use Tests\TestCase;

class GenerateChunkEmbeddingServiceTest extends TestCase
{
    use RefreshDatabase;

    public function test_it_saves_embedding_to_postgresql_pgvector()
    {
        // dump(DB::getDriverName());

        $user = User::factory()->create();
        $project = Project::factory()->create(['user_id' => $user->id]);
        $document = Document::factory()->create([
            'project_id' => $project->id,
            'source' => 'test'
        ]);
        $chunk = Chunk::factory()->create([
            'project_id' => $project->id,
            'document_id' => $document->id,
            'text' => 'This is a test chunk content for embedding.'
        ]);

        /** @var GenerateChunkEmbeddingService $service */
        $service = app(GenerateChunkEmbeddingService::class);
        
        $service->handle($chunk);

        $this->assertDatabaseHas('chunk_embeddings', [
            'chunk_id' => $chunk->id,
            'provider' => 'fake',
            'dimensions' => 1536
        ]);

        // Check if vector was actually saved (raw check)
        $embedding = DB::table('chunk_embeddings')->where('chunk_id', $chunk->id)->first();
        $this->assertNotNull($embedding->embedding);
        $this->assertStringStartsWith('[', $embedding->embedding);
    }
}
