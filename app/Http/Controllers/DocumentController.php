<?php

namespace App\Http\Controllers;

use App\Models\Project;
use App\Models\Document;
use Inertia\Inertia;

use Illuminate\Http\Request;

class DocumentController extends Controller
{
    public function indexAll(Request $request)
    {
        $documents = Document::whereIn('project_id', $request->user()->projects()->pluck('id'))
            ->with('project')
            ->latest()
            ->paginate(20);

        return Inertia::render('Documents/IndexAll', [
            'documents' => $documents
        ]);
    }
    public function index(Project $project)
    {
        $this->authorize('view', $project);

        $documents = $project->documents()
            ->latest()
            ->paginate(20);

        return Inertia::render('Documents/Index', [
            'project' => $project,
            'documents' => $documents
        ]);
    }

    public function show(Document $document)
    {
        $this->authorize('view', $document);

        return Inertia::render('Documents/Show', [
            'document' => $document->load('project')
        ]);
    }
}
