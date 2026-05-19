<?php

namespace App\Console\Commands;

use App\Jobs\GenerateChunkEmbeddingJob;
use App\Models\Chunk;
use App\Models\Project;
use Illuminate\Console\Command;

class GenerateProjectEmbeddingsCommand extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'datacrawl:generate-embeddings {project_id} {--limit= : Limite de chunks}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Gera embeddings para todos os chunks de um projeto';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $projectId = $this->argument('project_id');
        $limit = $this->option('limit');

        $project = Project::findOrFail($projectId);

        $query = Chunk::query()->where('project_id', $project->id);

        if ($limit) {
            $query->limit($limit);
        }

        $chunks = $query->get();

        $this->info("Enfileirando " . $chunks->count() . " chunks para geração de embeddings...");

        foreach ($chunks as $chunk) {
            dispatch(new GenerateChunkEmbeddingJob($chunk->id));
        }

        $this->info("Concluído!");
    }
}
