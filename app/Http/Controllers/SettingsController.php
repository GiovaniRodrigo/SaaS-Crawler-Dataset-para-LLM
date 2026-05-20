<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Project;
use App\Models\Document;
use App\Models\Chunk;
use App\Models\CrawlJob;
use App\Models\DatasetExport;

class SettingsController extends Controller
{
    public function reports()
    {
        $totalProjects = Project::count();
        $totalDocuments = Document::count();
        $totalChunks = Chunk::count();

        $approvedDocs = Document::approved()->count();
        $pendingDocs = Document::pending()->count();
        $rejectedDocs = Document::rejected()->count();

        $crawlJobs = CrawlJob::select('status', \Illuminate\Support\Facades\DB::raw('count(*) as count'))
            ->groupBy('status')
            ->get()
            ->pluck('count', 'status')
            ->toArray();

        $totalCrawled = CrawlJob::sum('total_crawled');
        $totalFailed = CrawlJob::sum('total_failed');

        $avgChars = Document::select(\Illuminate\Support\Facades\DB::raw('avg(length(text)) as average'))
            ->first()
            ->average ?? 0;

        $history = Document::select(
                \Illuminate\Support\Facades\DB::raw('date(created_at) as date'),
                \Illuminate\Support\Facades\DB::raw('count(*) as count')
            )
            ->where('created_at', '>=', now()->subDays(7))
            ->groupBy('date')
            ->orderBy('date', 'asc')
            ->get()
            ->map(function ($row) {
                return [
                    'date' => \Carbon\Carbon::parse($row->date)->format('d/m'),
                    'count' => $row->count
                ];
            })
            ->toArray();

        $historyMap = [];
        for ($i = 6; $i >= 0; $i--) {
            $dateStr = now()->subDays($i)->format('d/m');
            $historyMap[$dateStr] = 0;
        }
        foreach ($history as $h) {
            $historyMap[$h['date']] = $h['count'];
        }
        
        $chartData = [];
        foreach ($historyMap as $date => $count) {
            $chartData[] = [
                'name' => $date,
                'count' => $count
            ];
        }

        $documents = Document::select('url')->get();
        $domainCounts = [];
        foreach ($documents as $doc) {
            $host = parse_url($doc->url, PHP_URL_HOST) ?? 'Outro';
            $host = preg_replace('/^www\./', '', $host);
            if (!isset($domainCounts[$host])) {
                $domainCounts[$host] = 0;
            }
            $domainCounts[$host]++;
        }
        arsort($domainCounts);
        $topDomains = [];
        $limit = 5;
        foreach (array_slice($domainCounts, 0, $limit, true) as $domain => $count) {
            $topDomains[] = [
                'domain' => $domain,
                'count' => $count
            ];
        }

        return Inertia::render('Settings/Reports', [
            'metrics' => [
                'total_projects' => $totalProjects,
                'total_documents' => $totalDocuments,
                'total_chunks' => $totalChunks,
                'approved_documents' => $approvedDocs,
                'pending_documents' => $pendingDocs,
                'rejected_documents' => $rejectedDocs,
                'completed_jobs' => $crawlJobs['completed'] ?? 0,
                'failed_jobs' => $crawlJobs['failed'] ?? 0,
                'running_jobs' => $crawlJobs['running'] ?? 0,
                'total_crawled' => (int) $totalCrawled,
                'total_failed' => (int) $totalFailed,
                'average_characters' => round($avgChars),
            ],
            'chartData' => $chartData,
            'topDomains' => $topDomains,
        ]);
    }

    public function integrations()
    {
        return Inertia::render('Settings/Placeholder', [
            'title' => 'Integrações',
            'description' => 'Conecte o CrawlMind ao seu pipeline de dados (S3, Snowflake) ou ferramentas de IA (OpenAI, Anthropic).'
        ]);
    }

    public function audit(Request $request)
    {
        $logs = \App\Models\AuditLog::where('user_id', $request->user()->id)
            ->with('project')
            ->latest()
            ->paginate(20);

        return Inertia::render('Settings/Audit', [
            'logs' => $logs
        ]);
    }

    public function billing(\App\Services\StripeService $stripeService)
    {
        $organization = request()->get('current_organization');
        $stripeSecret = config('services.stripe.secret');

        $projectCount = $organization ? $organization->projects()->count() : 0;
        $pageCount = $organization ? \App\Models\Document::whereIn('project_id', $organization->projects()->pluck('id'))->count() : 0;

        $invoices = [];
        if ($organization && !empty($organization->stripe_customer_id) && !empty($stripeSecret)) {
            $invoices = $stripeService->getInvoices($organization->stripe_customer_id);
        }

        return Inertia::render('Settings/Billing', [
            'organization' => $organization,
            'plan' => $organization ? $organization->subscription_plan : 'starter',
            'status' => $organization ? $organization->subscription_status : 'active',
            'ends_at' => $organization ? $organization->subscription_ends_at : null,
            'project_count' => $projectCount,
            'page_count' => $pageCount,
            'limits' => $organization ? $organization->getLimits() : [
                'max_projects' => 2,
                'max_pages' => 1000,
            ],
            'invoices' => $invoices,
        ]);
    }

    public function general()
    {
        return Inertia::render('Settings/Placeholder', [
            'title' => 'Configurações Gerais',
            'description' => 'Ajuste as preferências da sua organização, membros da equipe e chaves de API globais.'
        ]);
    }

    public function datasets()
    {
        $projects = Project::withCount(['documents', 'chunks'])
            ->latest()
            ->get();

        $exports = DatasetExport::with('user')
            ->latest()
            ->get();

        return Inertia::render('Settings/Datasets', [
            'projects' => $projects,
            'exports' => $exports,
        ]);
    }

    public function exportDatasets(Request $request, \App\Actions\Exports\ExportCombinedProjectsAction $action)
    {
        $request->validate([
            'project_ids' => 'required|array|min:1',
            'project_ids.*' => 'exists:projects,id',
            'type' => 'required|in:documents,chunks',
        ]);

        $filePath = $action->execute($request->project_ids, $request->type);

        if (!\Illuminate\Support\Facades\Storage::exists($filePath)) {
            return back()->with('error', 'Erro ao gerar o arquivo do dataset.');
        }

        $fileSize = \Illuminate\Support\Facades\Storage::size($filePath);
        
        if ($request->type === 'documents') {
            $recordCount = Document::whereIn('project_id', $request->project_ids)
                ->approved()
                ->count();
        } else {
            $recordCount = Chunk::whereIn('project_id', $request->project_ids)
                ->whereHas('document', function($q) {
                    $q->approved();
                })
                ->count();
        }

        $projectNames = Project::whereIn('id', $request->project_ids)
            ->pluck('name')
            ->implode(', ');

        DatasetExport::create([
            'organization_id' => $request->get('current_organization')->id,
            'user_id' => $request->user()->id,
            'type' => $request->type,
            'project_ids' => $request->project_ids,
            'project_names' => $projectNames,
            'filename' => $filePath,
            'file_size' => $fileSize,
            'record_count' => $recordCount,
        ]);

        return back()->with('success', 'Dataset consolidado e registrado com sucesso no histórico!');
    }

    public function downloadExport(DatasetExport $datasetExport)
    {
        $this->authorize('view', $datasetExport);

        if (!\Illuminate\Support\Facades\Storage::exists($datasetExport->filename)) {
            abort(404, 'Arquivo de exportação não encontrado no storage.');
        }

        return \Illuminate\Support\Facades\Storage::download($datasetExport->filename);
    }
}
