<?php

namespace App\Jobs;

use App\Models\Chunk;
use App\Services\AI\GenerateChunkEmbeddingService;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Queue\Queueable;

class GenerateChunkEmbeddingJob implements ShouldQueue
{
    use Queueable;

    /**
     * Create a new job instance.
     */
    public function __construct(
        public readonly int $chunkId
    ) {}

    /**
     * Execute the job.
     */
    public function handle(GenerateChunkEmbeddingService $service): void
    {
        $chunk = Chunk::query()->with('project')->findOrFail($this->chunkId);

        $service->handle($chunk);
    }
}
