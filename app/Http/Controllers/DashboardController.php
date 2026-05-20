<?php

namespace App\Http\Controllers;

use App\Models\Project;
use App\Models\Document;
use App\Models\Chunk;
use App\Models\CrawlJob;
use App\Models\AuditLog;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index(Request $request)
    {
        $organization = $request->get('current_organization');
        
        // Project::pluck('id') já é filtrado pelo GlobalScope BelongsToOrganization
        $projectIds = Project::pluck('id');

        $stats = [
            'total_projects' => $projectIds->count(),
            'total_documents' => Document::whereIn('project_id', $projectIds)->count(),
            'total_chunks' => Chunk::whereIn('project_id', $projectIds)->count(),
            'average_quality' => Document::whereIn('project_id', $projectIds)->avg('quality_score') ?? 0,
        ];

        $activeJobs = CrawlJob::whereIn('project_id', $projectIds)
            ->where('status', 'running')
            ->with('project')
            ->latest()
            ->get();

        // Simulação de atividades recentes (em um produto real, isso viria de uma tabela de logs/audit)
        $recentActivities = $this->getRecentActivities($projectIds);

        return Inertia::render('Dashboard', [
            'stats' => $stats,
            'activeJobs' => $activeJobs,
            'recentActivities' => $recentActivities
        ]);
    }

    private function getRecentActivities($projectIds)
    {
        return AuditLog::whereIn('project_id', $projectIds)
            ->with(['user', 'project'])
            ->latest()
            ->take(5)
            ->get()
            ->map(function($log) {
                return [
                    'id' => $log->id,
                    'user' => $log->user?->name ?? 'Sistema',
                    'action' => $log->description,
                    'project' => $log->project?->name ?? 'Geral',
                    'time' => $log->created_at->diffForHumans(),
                    'type' => $this->getActivityType($log->action)
                ];
            });
    }

    private function getActivityType(string $action): string
    {
        $actionLower = strtolower($action);
        if (str_contains($actionLower, 'crawl') || str_contains($actionLower, 'job')) {
            return 'job';
        }
        if (str_contains($actionLower, 'document') || str_contains($actionLower, 'chunk') || str_contains($actionLower, 'capture')) {
            return 'document';
        }
        return 'project';
    }

    public function downloadExtension()
    {
        $zip = new \ZipArchive();
        $fileName = 'crawlmind-extension.zip';
        $tempFile = tempnam(sys_get_temp_dir(), 'extension');

        if ($zip->open($tempFile, \ZipArchive::CREATE | \ZipArchive::OVERWRITE) === TRUE) {
            $files = new \RecursiveIteratorIterator(
                new \RecursiveDirectoryIterator(base_path('browser-extension')),
                \RecursiveIteratorIterator::LEAVES_ONLY
            );

            foreach ($files as $name => $file) {
                if (!$file->isDir()) {
                    $filePath = $file->getRealPath();
                    $relativePath = substr($filePath, strlen(base_path('browser-extension')) + 1);
                    $zip->addFile($filePath, $relativePath);
                }
            }
            $zip->close();

            return response()->download($tempFile, $fileName)->deleteFileAfterSend(true);
        }

        return back()->with('error', 'Não foi possível gerar a extensão.');
    }
}
