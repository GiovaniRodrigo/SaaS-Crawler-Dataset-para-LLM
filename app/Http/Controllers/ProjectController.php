<?php

namespace App\Http\Controllers;

use App\Models\Project;
use App\Http\Requests\StoreProjectRequest;
use App\Http\Requests\UpdateProjectRequest;
use App\Actions\Projects\CreateProjectAction;
use App\Actions\Projects\UpdateProjectAction;
use App\Actions\Projects\DeleteProjectAction;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ProjectController extends Controller
{
    public function index(Request $request)
    {
        // O Global Scope 'organization' aplicado no model Project cuida da filtragem
        $projects = Project::withCount(['documents', 'chunks'])
            ->latest()
            ->get();

        return Inertia::render('Projects/Index', [
            'projects' => $projects
        ]);
    }

    public function create()
    {
        return Inertia::render('Projects/Create');
    }

    public function store(StoreProjectRequest $request, CreateProjectAction $action)
    {
        $organization = $request->get('current_organization');

        $project = $action->execute(
            $request->user(), 
            $request->validated(),
            $organization
        );

        return redirect()->route('projects.show', $project)
            ->with('success', 'Projeto criado com sucesso.');
    }

    public function show(Project $project)
    {
        \Illuminate\Support\Facades\Gate::authorize('view', $project);

        return Inertia::render('Projects/Show', [
            'project' => $project->load(['domains', 'crawlJobs']),
            'stats' => [
                'total_documents' => $project->documents()->count(),
                'total_chunks' => $project->chunks()->count(),
            ]
        ]);
    }

    public function edit(Project $project)
    {
        \Illuminate\Support\Facades\Gate::authorize('update', $project);

        return Inertia::render('Projects/Edit', [
            'project' => $project
        ]);
    }

    public function update(UpdateProjectRequest $request, Project $project, UpdateProjectAction $action)
    {
        \Illuminate\Support\Facades\Gate::authorize('update', $project);

        $action->execute($project, $request->validated());

        return redirect()->route('projects.show', $project)
            ->with('success', 'Projeto atualizado com sucesso.');
    }

    public function destroy(Project $project, DeleteProjectAction $action)
    {
        \Illuminate\Support\Facades\Gate::authorize('delete', $project);

        $action->execute($project);

        return redirect()->route('projects.index')
            ->with('success', 'Projeto excluído com sucesso.');
    }
}
