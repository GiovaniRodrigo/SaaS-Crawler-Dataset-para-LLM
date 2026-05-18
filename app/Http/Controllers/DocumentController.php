<?php

namespace App\Http\Controllers;

use App\Models\Project;
use App\Models\Document;
use Inertia\Inertia;

class DocumentController extends Controller
{
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
