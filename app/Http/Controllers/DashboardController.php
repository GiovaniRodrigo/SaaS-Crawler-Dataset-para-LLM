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
        $user = $request->user();
        $projectIds = $user->projects()->pluck('id');

        $stats = [
            'total_projects' => $user->projects()->count(),
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
}
