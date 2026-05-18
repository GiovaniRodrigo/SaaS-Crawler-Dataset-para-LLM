<?php

namespace App\Actions\Domains;

use App\Models\Project;
use App\Models\Domain;

class CreateDomainAction
{
    public function execute(Project $project, array $data): Domain
    {
        return $project->domains()->create([
            'domain' => $data['domain'],
            'allow_subdomains' => $data['allow_subdomains'] ?? false,
        ]);
    }
}
