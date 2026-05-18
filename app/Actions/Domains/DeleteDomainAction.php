<?php

namespace App\Actions\Domains;

use App\Models\Domain;

class DeleteDomainAction
{
    public function execute(Domain $domain): void
    {
        $domain->delete();
    }
}
