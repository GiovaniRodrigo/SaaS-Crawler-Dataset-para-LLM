<?php

namespace App\Actions\Exports;

use App\Models\Project;
use App\Contracts\Dataset\DatasetExporterInterface;

class ExportProjectDocumentsJsonlAction
{
    public function __construct(protected DatasetExporterInterface $exporter) {}

    public function execute(Project $project): string
    {
        return $this->exporter->exportDocuments($project);
    }
}
