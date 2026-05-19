<?php

namespace App\Actions\CrawlJobs;

use App\Models\CrawlJob;
use App\Models\CrawledPage;
use App\Contracts\Crawling\UrlScopeValidatorInterface;
use App\Contracts\Crawling\UrlNormalizerInterface;
use App\Contracts\Crawling\WebPageFetcherInterface;
use App\Contracts\TextProcessing\ContentHasherInterface;
use App\Actions\Documents\CreateDocumentFromCrawledPageAction;
use Illuminate\Support\Facades\Log;

class RunCrawlJobAction
{
    protected array $visited = [];
    protected array $queue = [];

    public function __construct(
        protected UrlScopeValidatorInterface $scopeValidator,
        protected UrlNormalizerInterface $urlNormalizer,
        protected WebPageFetcherInterface $fetcher,
        protected ContentHasherInterface $hasher,
        protected CreateDocumentFromCrawledPageAction $createDocumentAction,
        protected MarkCrawlJobAsRunningAction $markAsRunningAction,
        protected MarkCrawlJobAsCompletedAction $markAsCompletedAction,
        protected MarkCrawlJobAsFailedAction $markAsFailedAction
    ) {}

    public function execute(CrawlJob $job): void
    {
        try {
            $this->markAsRunningAction->execute($job);

            // Initialize queue with seed URLs
            foreach ($job->seed_urls as $url) {
                $normalized = $this->urlNormalizer->normalize($url);
                if ($this->scopeValidator->isAllowed($normalized, $job->project, $job, 0)) {
                    $this->queue[] = ['url' => $normalized, 'depth' => 0];
                }
            }

            $pagesCrawled = 0;

            while (!empty($this->queue) && $pagesCrawled < $job->max_pages) {
                $current = array_shift($this->queue);
                $url = $current['url'];
                $depth = $current['depth'];

                if (isset($this->visited[$url])) {
                    continue;
                }

                $this->visited[$url] = true;
                $pagesCrawled++;

                $fetchResult = $this->fetcher->fetch($url);
                
                $crawledPage = CrawledPage::create([
                    'project_id' => $job->project_id,
                    'crawl_job_id' => $job->id,
                    'url' => $url,
                    'domain' => parse_url($url, PHP_URL_HOST),
                    'status_code' => $fetchResult->statusCode,
                    'source' => 'crawler',
                    'error_message' => $fetchResult->errorMessage,
                ]);

                if ($fetchResult->isSuccessful()) {
                    $job->increment('total_crawled');
                    
                    // Create document
                    $this->createDocumentAction->execute($crawledPage, $fetchResult->html);

                    // Extract links if not at max depth
                    if ($depth < $job->max_depth) {
                        $links = $this->extractLinks($fetchResult->html, $url);
                        foreach ($links as $link) {
                            $normalizedLink = $this->urlNormalizer->normalize($link, $url);
                            if (!isset($this->visited[$normalizedLink]) && 
                                $this->scopeValidator->isAllowed($normalizedLink, $job->project, $job, $depth + 1)) {
                                $this->queue[] = ['url' => $normalizedLink, 'depth' => $depth + 1];
                                $job->increment('total_discovered');
                            }
                        }
                    }
                } else {
                    $job->increment('total_failed');
                }
            }

            $this->markAsCompletedAction->execute($job);
        } catch (\Exception $e) {
            Log::error(__('messages.crawl_job_failed', ['id' => $job->id]) . " " . $e->getMessage());
            $this->markAsFailedAction->execute($job);
            throw $e;
        }
    }

    protected function extractLinks(string $html, string $baseUrl): array
    {
        $links = [];
        preg_match_all('/<a\s+[^>]*?href=["\']([^"\']+)["\']/i', $html, $matches);
        
        if (isset($matches[1])) {
            foreach ($matches[1] as $link) {
                // Basic cleanup
                $link = strtok($link, '#');
                if (!empty($link) && !str_starts_with($link, 'javascript:') && !str_starts_with($link, 'mailto:')) {
                    $links[] = $link;
                }
            }
        }

        return array_unique($links);
    }
}
