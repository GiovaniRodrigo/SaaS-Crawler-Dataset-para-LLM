<?php

namespace App\Actions\CrawlJobs;

use App\Models\CrawlJob;

class MarkCrawlJobAsCompletedAction
{
    public function execute(CrawlJob $job): void
    {
        $job->update([
            'status' => 'completed',
            'finished_at' => now(),
        ]);
    }
}
