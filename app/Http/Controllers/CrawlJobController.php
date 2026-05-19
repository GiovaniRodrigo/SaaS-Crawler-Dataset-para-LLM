<?php

namespace App\Http\Controllers;

use App\Models\Project;
use App\Models\CrawlJob;
use App\Http\Requests\StoreCrawlJobRequest;
use App\Actions\CrawlJobs\CreateCrawlJobAction;
use App\Jobs\RunCrawlJob;
use Inertia\Inertia;

class CrawlJobController extends Controller
{
    public function create(Project $project)
    {
        $this->authorize('view', $project);

        return Inertia::render('CrawlJobs/Create', [
            'project' => $project
        ]);
    }

    public function store(StoreCrawlJobRequest $request, Project $project, CreateCrawlJobAction $action)
    {
        $this->authorize('update', $project);

        $job = $action->execute($project, $request->validated());

        return redirect()->route('crawl-jobs.show', $job)
            ->with('success', __('messages.crawl_job_created'));
    }

    public function show(CrawlJob $crawlJob)
    {
        $this->authorize('view', $crawlJob);

        return Inertia::render('CrawlJobs/Show', [
            'crawlJob' => $crawlJob->load('project'),
        ]);
    }

    public function run(CrawlJob $crawlJob)
    {
        $this->authorize('run', $crawlJob);

        if ($crawlJob->status === 'running') {
            return redirect()->back()->with('error', __('messages.crawl_job_running'));
        }

        RunCrawlJob::dispatch($crawlJob);

        return redirect()->back()->with('success', __('messages.crawl_job_started'));
    }
}
