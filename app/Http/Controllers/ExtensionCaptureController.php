<?php

namespace App\Http\Controllers;

use App\Models\Project;
use App\Models\CrawledPage;
use App\Http\Requests\StoreExtensionCaptureRequest;
use App\Contracts\Crawling\UrlScopeValidatorInterface;
use App\Actions\Documents\CreateDocumentFromCrawledPageAction;
use Illuminate\Http\Request;

class ExtensionCaptureController extends Controller
{
    public function projects(Request $request)
    {
        $organization = $request->user()->currentOrganization();
        if (!$organization) {
            return response()->json([]);
        }
        $projects = $organization->projects()->select('id', 'name')->get();
        return response()->json($projects);
    }

    public function store(
        StoreExtensionCaptureRequest $request,
        UrlScopeValidatorInterface $scopeValidator,
        CreateDocumentFromCrawledPageAction $createDocumentAction
    ) {
        $project = Project::findOrFail($request->project_id);
        $organization = $request->user()->currentOrganization();
        
        // Authorize project belongs to user's active organization
        if (!$organization || $project->organization_id !== $organization->id) {
            return response()->json(['message' => 'Unauthorized or project does not belong to active organization'], 403);
        }

        // Check if organization has reached its page limit
        if ($organization->hasReachedPageLimit()) {
            return response()->json(['message' => 'Limite de páginas atingido para o plano ' . ucfirst($organization->subscription_plan) . '. Faça o upgrade de plano.'], 403);
        }

        // Validate domain
        if (!$scopeValidator->isAllowed($request->url, $project)) {
            return response()->json(['message' => 'Domain not allowed for this project'], 422);
        }

        // Create CrawledPage
        $page = CrawledPage::create([
            'project_id' => $project->id,
            'url' => $request->url,
            'domain' => parse_url($request->url, PHP_URL_HOST),
            'title' => $request->title,
            'source' => 'browser_extension',
            'status_code' => 200, // Manual capture is assumed successful
        ]);

        // Create Document & Chunks
        // We pass the raw text as "html" to the action, but our cleaner/extractor might need adjustments
        // Actually, the extension sends already cleaned text or innerText.
        // I'll modify the action to handle raw text if needed, or just use it.
        
        $document = $createDocumentAction->execute($page, $request->text);

        if (!$document) {
            return response()->json(['message' => 'Failed to process text (too short or empty)'], 422);
        }

        return response()->json([
            'message' => 'Capture successful',
            'document_id' => $document->id
        ]);
    }
}
