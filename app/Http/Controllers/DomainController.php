<?php

namespace App\Http\Controllers;

use App\Models\Project;
use App\Models\Domain;
use App\Http\Requests\StoreDomainRequest;
use App\Actions\Domains\CreateDomainAction;
use App\Actions\Domains\DeleteDomainAction;

class DomainController extends Controller
{
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
