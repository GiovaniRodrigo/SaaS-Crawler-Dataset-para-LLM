<?php

namespace App\Http\Controllers;

use App\Models\Project;
use App\Models\Domain;
use App\Http\Requests\StoreDomainRequest;
use App\Actions\Domains\CreateDomainAction;
use App\Actions\Domains\DeleteDomainAction;

use Illuminate\Http\Request;
use Inertia\Inertia;

class DomainController extends Controller
{
    public function index(Request $request)
    {
        $domains = Domain::whereIn('project_id', $request->user()->projects()->pluck('id'))
            ->with('project:id,name')
            ->withCount('crawledPages')
            ->latest()
            ->get();

        return Inertia::render('Domains/Index', [
            'domains' => $domains
        ]);
    }
    public function store(StoreDomainRequest $request, Project $project, CreateDomainAction $action)
    {
        $this->authorize('update', $project);

        $action->execute($project, $request->validated());

        return redirect()->back()->with('success', 'Domínio adicionado com sucesso.');
    }

    public function destroy(Domain $domain, DeleteDomainAction $action)
    {
        $this->authorize('delete', $domain);

        $action->execute($domain);

        return redirect()->back()->with('success', 'Domínio removido com sucesso.');
    }
}
