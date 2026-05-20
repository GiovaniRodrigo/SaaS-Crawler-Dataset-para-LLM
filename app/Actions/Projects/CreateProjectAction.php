<?php

namespace App\Actions\Projects;

use App\Models\Project;
use App\Models\User;

use App\Models\Organization;

class CreateProjectAction
{
    public function execute(User $user, array $data, ?Organization $organization = null): Project
    {
        $payload = [
            'user_id' => $user->id,
            'name' => $data['name'],
            'description' => $data['description'] ?? null,
        ];

        if ($organization) {
            $payload['organization_id'] = $organization->id;
            return $organization->projects()->create($payload);
        }

        return Project::create($payload);
    }
}
