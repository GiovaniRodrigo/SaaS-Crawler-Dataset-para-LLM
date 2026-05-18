<?php

namespace App\Actions\Documents;

use App\Models\CrawledPage;
use App\Models\Document;
use App\Contracts\TextProcessing\HtmlTextExtractorInterface;
use App\Contracts\TextProcessing\TextCleanerInterface;
use App\Contracts\TextProcessing\ContentHasherInterface;
use App\Actions\Chunks\GenerateChunksForDocumentAction;

class CreateDocumentFromCrawledPageAction
{
    public function __construct(
        protected HtmlTextExtractorInterface $extractor,
        protected TextCleanerInterface $cleaner,
        protected ContentHasherInterface $hasher,
        protected GenerateChunksForDocumentAction $generateChunksAction
    ) {}

    public function execute(CrawledPage $page, string $html): ?Document
    {
        $extracted = $this->extractor->extract($html);
        $cleanText = $this->cleaner->clean($extracted->text);

        if (empty($cleanText)) {
            return null;
        }

        $hash = $this->hasher->hash($cleanText);

        // Check for duplicate content in the same project
        $existing = Document::where('project_id', $page->project_id)
            ->where('content_hash', $hash)
            ->first();

        if ($existing) {
            return $existing;
        }

        $document = Document::create([
            'project_id' => $page->project_id,
            'crawl_job_id' => $page->crawl_job_id,
            'crawled_page_id' => $page->id,
            'url' => $page->url,
            'title' => $extracted->title ?: $page->title,
            'text' => $cleanText,
            'language' => $extracted->language,
            'content_hash' => $hash,
            'source' => $page->source,
        ]);

        // Generate chunks
        $this->generateChunksAction->execute($document);

        // Update crawl job total documents if applicable
        if ($page->crawl_job_id) {
            $page->crawlJob()->increment('total_documents');
        }

        return $document;
    }
}
