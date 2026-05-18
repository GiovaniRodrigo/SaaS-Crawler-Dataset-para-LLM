<?php

namespace App\Actions\CrawlJobs;

use App\Models\CrawlJob;

class MarkCrawlJobAsFailedAction
{
    public function execute(CrawlJob $job): void
    {
        $job->update([
            'status' => 'failed',
            'finished_at' => now(),
        ]);
    }
}
