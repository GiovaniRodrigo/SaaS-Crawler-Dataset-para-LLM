<?php

namespace App\Http\Controllers;

use App\Models\Project;
use App\Models\Document;
use App\Models\Chunk;
use App\Models\CrawlJob;
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
        // Por enquanto, pegamos os últimos documentos criados como "atividade"
        return Document::whereIn('project_id', $projectIds)
            ->with('project')
            ->latest()
            ->take(5)
            ->get()
            ->map(function($doc) {
                return [
                    'id' => $doc->id,
                    'user' => 'Sistema', // Simplificado
                    'action' => 'Documento extraído',
                    'project' => $doc->project->name,
                    'time' => $doc->created_at->diffForHumans(),
                    'type' => 'job'
                ];
            });
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
