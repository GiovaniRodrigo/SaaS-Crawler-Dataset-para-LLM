<?php

namespace App\Contracts\Dataset;

use App\Models\Project;

interface DatasetExporterInterface
{
    public function exportDocuments(Project $project): string;

    public function exportChunks(Project $project): string;
}
