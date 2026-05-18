<?php

namespace App\Actions\Chunks;

use App\Models\Document;
use App\Contracts\Dataset\ChunkerInterface;
use App\Contracts\TextProcessing\ContentHasherInterface;

class GenerateChunksForDocumentAction
{
    public function __construct(
        protected ChunkerInterface $chunker,
        protected ContentHasherInterface $hasher
    ) {}

    public function execute(Document $document): void
    {
        // Clear existing chunks to avoid duplicates if re-processed
        $document->chunks()->delete();

        $chunks = $this->chunker->chunk($document->text);

        foreach ($chunks as $index => $chunkData) {
            $document->chunks()->create([
                'project_id' => $document->project_id,
                'chunk_index' => $index,
                'text' => $chunkData['text'],
                'tokens_estimated' => $chunkData['tokens_estimated'],
                'content_hash' => $this->hasher->hash($chunkData['text']),
            ]);
        }

        // Update crawl job total chunks if applicable
        if ($document->crawl_job_id) {
            $document->crawlJob()->increment('total_chunks', count($chunks));
        }
    }
}
