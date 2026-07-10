<?php

namespace App\Actions\CrawlJobs;

use App\Models\CrawlJob;
use App\Notifications\JobCompletedNotification;

class MarkCrawlJobAsCompletedAction
{
    public function execute(CrawlJob $job): void
    {
        $job->update([
            'status' => 'completed',
            'finished_at' => now(),
        ]);

        $job->project->user->notify(new JobCompletedNotification($job));
    }
}
