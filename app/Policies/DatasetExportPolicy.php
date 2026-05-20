<?php

namespace App\Policies;

use App\Models\DatasetExport;
use App\Models\User;

class DatasetExportPolicy
{
    public function view(User $user, DatasetExport $datasetExport): bool
    {
        return $user->belongsToOrganization($datasetExport->organization_id);
    }
}
