<?php

namespace App\Http\Controllers;

use App\Models\Project;
use App\Actions\Exports\ExportProjectDocumentsJsonlAction;
use App\Actions\Exports\ExportProjectChunksJsonlAction;
use Illuminate\Support\Facades\Storage;

class DatasetExportController extends Controller
{
    public function documents(Project $project, ExportProjectDocumentsJsonlAction $action)
    {
        $this->authorize('view', $project);

        $path = $action->execute($project);

        return Storage::download($path);
    }

    public function chunks(Project $project, ExportProjectChunksJsonlAction $action)
    {
        $this->authorize('view', $project);

        $path = $action->execute($project);

        return Storage::download($path);
    }
}
