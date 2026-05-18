<?php

namespace App\Actions\Projects;

use App\Models\Project;

class UpdateProjectAction
{
    public function execute(Project $project, array $data): Project
    {
        $project->update([
            'name' => $data['name'],
            'description' => $data['description'] ?? null,
        ]);

        return $project;
    }
}
