<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // 1. Dados Fixos (Todos os ambientes)
        // Primeiro seed com dados fixos (primitivos)
        $admin = User::firstOrCreate(
            ['email' => 'admin@datacrawl.com.br'],
            [
                'name' => 'DataCrawl Admin',
                'password' => bcrypt('password'), // Use secrets in real production
                'email_verified_at' => now(),
            ]
        );

        // Chamar o seeder de demonstração com base de conhecimento real
        $this->call(DemoDatasetSeeder::class);

        // 2. Dados de Teste (Somente Local/Dev)
        // Em ambiente local, dev use factory
        if (app()->environment(['local', 'dev'])) {
            // Do segundo em diante um número aleatorio usando factory
            $users = User::factory(rand(2, 5))->create();

            $allUsers = collect([$admin])->concat($users);

            $allUsers->each(function ($user) {
                $projects = \App\Models\Project::factory(rand(1, 3))->create([
                    'user_id' => $user->id
                ]);

                $projects->each(function ($project) {
                    \App\Models\Domain::factory(rand(1, 2))->create([
                        'project_id' => $project->id
                    ]);

                    $jobs = \App\Models\CrawlJob::factory(rand(1, 3))->create([
                        'project_id' => $project->id
                    ]);

                    $jobs->each(function ($job) use ($project) {
                        $docs = \App\Models\Document::factory(rand(3, 10))->create([
                            'project_id' => $project->id,
                            'crawl_job_id' => $job->id
                        ]);

                        $docs->each(function ($doc) use ($project) {
                            \App\Models\Chunk::factory(rand(2, 5))->create([
                                'project_id' => $project->id,
                                'document_id' => $doc->id
                            ]);
                        });
                    });
                });
            });
        }
    }
}
