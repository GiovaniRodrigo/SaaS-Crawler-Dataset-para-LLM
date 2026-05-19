<?php

namespace App\Http\Controllers;

use App\Models\Project;
use App\Models\Document;
use App\Actions\Documents\ApproveDocumentAction;
use App\Actions\Documents\RejectDocumentAction;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DocumentReviewController extends Controller
{
    public function index(Request $request, Project $project = null)
    {
        $query = Document::query();

        if ($project) {
            $this->authorize('view', $project);
            $query->where('project_id', $project->id);
        } else {
            $query->whereIn('project_id', $request->user()->projects()->pluck('id'));
        }

        $documents = $query->pending()
            ->with('project')
            ->latest()
            ->paginate(15);

        return Inertia::render('Documents/Review', [
            'project' => $project,
            'documents' => $documents
        ]);
    }

    public function approve(Document $document, ApproveDocumentAction $action)
    {
        $this->authorize('update', $document);
        $action->execute($document);

        return back()->with('success', 'Documento aprovado.');
    }

    public function reject(Document $document, RejectDocumentAction $action)
    {
        $this->authorize('update', $document);
        $action->execute($document);

        return back()->with('success', 'Documento rejeitado.');
    }

    public function bulkApprove(Request $request, ApproveDocumentAction $action)
    {
        $request->validate([
            'ids' => 'required|array',
            'ids.*' => 'exists:documents,id'
        ]);

        $documents = Document::whereIn('id', $request->ids)->get();

        foreach ($documents as $document) {
            $this->authorize('update', $document);
            $action->execute($document);
        }

        return back()->with('success', count($request->ids) . ' documentos aprovados.');
    }
}
