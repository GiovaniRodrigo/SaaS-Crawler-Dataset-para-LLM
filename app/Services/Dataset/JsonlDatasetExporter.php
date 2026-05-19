<?php

namespace App\Services\Dataset;

use App\Contracts\Dataset\DatasetExporterInterface;
use App\Models\Project;
use Illuminate\Support\Facades\Storage;

class JsonlDatasetExporter implements DatasetExporterInterface
{
    public function exportDocuments(Project $project): string
    {
        $filename = 'exports/project_' . $project->id . '_documents_' . time() . '.jsonl';
        $handle = fopen('php://temp', 'r+');

        $project->documents()->approved()->chunk(100, function ($documents) use ($handle) {
            foreach ($documents as $doc) {
                $data = [
                    'id' => 'doc_' . $doc->id,
                    'project_id' => 'project_' . $doc->project_id,
                    'url' => $doc->url,
                    'domain' => parse_url($doc->url, PHP_URL_HOST),
                    'title' => $doc->title,
                    'text' => $doc->text,
                    'source' => $doc->source,
                    'language' => $doc->language,
                    'quality_score' => $doc->quality_score,
                    'content_hash' => $doc->content_hash,
                    'created_at' => $doc->created_at->toIso8601String(),
                ];
                fwrite($handle, json_encode($data) . "\n");
            }
        });

        rewind($handle);
        Storage::put($filename, $handle);
        fclose($handle);

        return $filename;
    }

    public function exportChunks(Project $project): string
    {
        $filename = 'exports/project_' . $project->id . '_chunks_' . time() . '.jsonl';
        $handle = fopen('php://temp', 'r+');

        $project->chunks()->whereHas('document', function($q) {
            $q->approved();
        })->with('document')->chunk(100, function ($chunks) use ($handle) {
            foreach ($chunks as $chunk) {
                $data = [
                    'id' => 'chunk_' . $chunk->id,
                    'document_id' => 'doc_' . $chunk->document_id,
                    'project_id' => 'project_' . $chunk->project_id,
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

        rewind($handle);
        Storage::put($filename, $handle);
        fclose($handle);

        return $filename;
    }
}
