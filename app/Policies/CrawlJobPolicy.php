<?php

namespace App\Policies;

use App\Models\CrawlJob;
use App\Models\User;

class CrawlJobPolicy
{
    public function view(User $user, CrawlJob $crawlJob): bool
    {
        return $user->belongsToOrganization($crawlJob->project->organization_id);
    }

    public function create(User $user): bool
    {
        return true;
    }

    public function run(User $user, CrawlJob $crawlJob): bool
    {
        return $user->belongsToOrganization($crawlJob->project->organization_id);
    }
}
