<?php

namespace App\Actions\CrawlJobs;

use App\Models\CrawlJob;
use App\Notifications\JobCompletedNotification;

class MarkCrawlJobAsFailedAction
{
    public function execute(CrawlJob $job): void
    {
        $job->update([
            'status' => 'failed',
            'finished_at' => now(),
        ]);

        $job->project->user->notify(new JobCompletedNotification($job));
    }
}
