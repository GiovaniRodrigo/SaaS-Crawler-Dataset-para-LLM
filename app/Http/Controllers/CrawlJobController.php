<?php

namespace App\Http\Controllers;

use App\Models\Project;
use App\Models\CrawlJob;
use App\Http\Requests\StoreCrawlJobRequest;
use App\Actions\CrawlJobs\CreateCrawlJobAction;
use App\Jobs\RunCrawlJob;
use Inertia\Inertia;

use Illuminate\Http\Request;

class CrawlJobController extends Controller
{
    public function index(Request $request)
    {
        $jobs = CrawlJob::whereIn('project_id', $request->user()->projects()->pluck('id'))
            ->with('project')
            ->latest()
            ->paginate(15);

        return Inertia::render('CrawlJobs/Index', [
            'jobs' => $jobs
        ]);
    }
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

    public function failures(CrawlJob $crawlJob)
    {
        $this->authorize('view', $crawlJob);

        $failures = $crawlJob->crawledPages()
            ->where(function ($query) {
                $query->where('status_code', 0)
                      ->orWhere('status_code', '>=', 400);
            })
            ->latest()
            ->paginate(20);

        return Inertia::render('CrawlJobs/Failures', [
            'crawlJob' => $crawlJob->load('project'),
            'failures' => $failures
        ]);
    }

    public function crawledPages(CrawlJob $crawlJob)
    {
        $this->authorize('view', $crawlJob);

        $pages = $crawlJob->crawledPages()
            ->where('status_code', '>=', 200)
            ->where('status_code', '<', 300)
            ->latest()
            ->paginate(20);

        return Inertia::render('CrawlJobs/CrawledPages', [
            'crawlJob' => $crawlJob->load('project'),
            'pages' => $pages
        ]);
    }

    public function discoveredPages(CrawlJob $crawlJob)
    {
        $this->authorize('view', $crawlJob);

        // Discovered pages are conceptually the URLs found but not yet crawled or that didn't fail yet.
        // For simplicity and high contrast feedback, we will show all pages found in this job context.
        $pages = $crawlJob->crawledPages()
            ->latest()
            ->paginate(20);

        return Inertia::render('CrawlJobs/DiscoveredPages', [
            'crawlJob' => $crawlJob->load('project'),
            'pages' => $pages
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
