<?php

namespace App\Http\Controllers;

use App\Models\Project;
use Inertia\Inertia;

use App\Models\Chunk;
use Illuminate\Http\Request;

class ChunkController extends Controller
{
    public function indexAll(Request $request)
    {
        $chunks = Chunk::whereIn('project_id', $request->user()->projects()->pluck('id'))
            ->with(['project', 'document'])
            ->latest()
            ->paginate(50);

        return Inertia::render('Chunks/IndexAll', [
            'chunks' => $chunks
        ]);
    }
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
