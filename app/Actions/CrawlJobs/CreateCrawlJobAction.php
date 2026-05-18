<?php

namespace App\Actions\CrawlJobs;

use App\Models\Project;
use App\Models\CrawlJob;

class CreateCrawlJobAction
{
    public function execute(Project $project, array $data): CrawlJob
    {
        return $project->crawlJobs()->create([
            'status' => 'created',
            'seed_urls' => $data['seed_urls'],
            'allow_paths' => $data['allow_paths'] ?? null,
            'deny_paths' => $data['deny_paths'] ?? null,
            'max_depth' => $data['max_depth'] ?? 3,
            'max_pages' => $data['max_pages'] ?? 100,
        ]);
    }
}
