<?php

namespace App\Http\Controllers;

use App\Contracts\Search\SemanticSearchInterface;
use App\Http\Requests\SemanticSearchRequest;
use App\Models\Project;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;

class SemanticSearchController extends Controller
{
    use AuthorizesRequests;

    public function __invoke(
        SemanticSearchRequest $request,
        Project $project,
        SemanticSearchInterface $semanticSearch
    ) {
        $this->authorize('view', $project);

        $results = $semanticSearch->search(
            userId: $project->user_id,
            projectId: $project->id,
            query: $request->validated('query'),
            limit: $request->validated('limit') ?? 10
        );

        return back()->with([
            'semanticSearchResults' => $results,
        ]);
    }
}
