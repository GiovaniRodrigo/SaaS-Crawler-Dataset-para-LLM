<?php

namespace App\Policies;

use App\Models\Domain;
use App\Models\User;

class DomainPolicy
{
    public function view(User $user, Domain $domain): bool
    {
        return $user->id === $domain->project->user_id;
    }

    public function create(User $user): bool
    {
        return true;
    }

    public function delete(User $user, Domain $domain): bool
    {
        return $user->id === $domain->project->user_id;
    }
}
