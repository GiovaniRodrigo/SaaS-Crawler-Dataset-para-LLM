<?php

namespace App\Actions\Projects;

use App\Models\Project;
use App\Models\User;

class CreateProjectAction
{
    public function execute(User $user, array $data): Project
    {
        return $user->projects()->create([
            'name' => $data['name'],
            'description' => $data['description'] ?? null,
        ]);
    }
}
