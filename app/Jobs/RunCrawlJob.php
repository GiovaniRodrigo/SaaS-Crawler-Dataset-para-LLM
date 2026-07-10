<?php

namespace App\Jobs;

use App\Models\CrawlJob;
use App\Actions\CrawlJobs\RunCrawlJobAction;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;

class RunCrawlJob implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    /**
     * Create a new job instance.
     */
    public function __construct(public CrawlJob $crawlJob)
    {
        //
    }

    /**
     * Execute the job.
     */
    public function handle(RunCrawlJobAction $action): void
    {
        $action->execute($this->crawlJob);
    }
}
