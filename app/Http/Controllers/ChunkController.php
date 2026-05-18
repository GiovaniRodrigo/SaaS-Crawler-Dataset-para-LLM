<?php

namespace App\Http\Controllers;

use App\Models\Project;
use Inertia\Inertia;

class ChunkController extends Controller
{
    public function index(Project $project)
    {
        $this->authorize('view', $project);

        $chunks = $project->chunks()
            ->with('document')
            ->latest()
            ->paginate(50);

        return Inertia::render('Chunks/Index', [
            'project' => $project,
            'chunks' => $chunks
        ]);
    }
}
