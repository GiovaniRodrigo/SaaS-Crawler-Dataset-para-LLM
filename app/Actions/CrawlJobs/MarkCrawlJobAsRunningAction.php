<?php

namespace App\Actions\CrawlJobs;

use App\Models\CrawlJob;

class MarkCrawlJobAsRunningAction
{
    public function execute(CrawlJob $job): void
    {
        $job->update([
            'status' => 'running',
            'started_at' => now(),
        ]);
    }
}
