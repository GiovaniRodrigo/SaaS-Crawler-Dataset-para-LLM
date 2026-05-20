<?php

namespace App\Actions\Exports;

use App\Models\Project;
use App\Models\Document;
use App\Models\Chunk;
use Illuminate\Support\Facades\Storage;

class ExportCombinedProjectsAction
{
    public function execute(array $projectIds, string $type): string
    {
        $filename = 'exports/combined_' . $type . '_' . time() . '.jsonl';
        $handle = fopen('php://temp', 'r+');

        if ($type === 'documents') {
            Document::whereIn('project_id', $projectIds)
                ->approved()
                ->with('project')
                ->chunk(100, function ($documents) use ($handle) {
                    foreach ($documents as $doc) {
                        $data = [
                            'id' => 'doc_' . $doc->id,
                            'project_id' => 'project_' . $doc->project_id,
                            'project_name' => $doc->project->name,
                            'url' => $doc->url,
                            'domain' => parse_url($doc->url, PHP_URL_HOST),
                            'title' => $doc->title,
                            'text' => $doc->text,
                            'source' => $doc->source,
                            'language' => $doc->language,
                            'quality_score' => $doc->quality_score,
                            'created_at' => $doc->created_at->toIso8601String(),
                        ];
                        fwrite($handle, json_encode($data) . "\n");
                    }
                });
        } else {
            Chunk::whereIn('project_id', $projectIds)
                ->whereHas('document', function($q) {
                    $q->approved();
                })
                ->with(['document', 'project'])
                ->chunk(100, function ($chunks) use ($handle) {
                    foreach ($chunks as $chunk) {
                        $data = [
                            'id' => 'chunk_' . $chunk->id,
                            'document_id' => 'doc_' . $chunk->document_id,
                            'project_id' => 'project_' . $chunk->project_id,
                            'project_name' => $chunk->project->name,
                            'url' => $chunk->document->url,
                            'title' => $chunk->document->title,
                            'chunk_index' => $chunk->chunk_index,
                            'text' => $chunk->text,
                            'tokens_estimated' => $chunk->tokens_estimated,
                            'source' => $chunk->document->source,
                            'quality_score' => $chunk->document->quality_score,
                            'metadata' => [
                                'domain' => parse_url($chunk->document->url, PHP_URL_HOST),
                                'language' => $chunk->document->language,
                            ]
                        ];
                        fwrite($handle, json_encode($data) . "\n");
                    }
                });
        }

        rewind($handle);
        Storage::put($filename, $handle);
        fclose($handle);

        return $filename;
    }
}
