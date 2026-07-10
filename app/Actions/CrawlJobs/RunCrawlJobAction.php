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

            $organization = $job->project->organization;
            if ($organization && $organization->hasReachedPageLimit()) {
                Log::warning("Crawl job {$job->id} cancelado: limite de páginas do plano atingido para a organização.");
                $this->markAsCompletedAction->execute($job);
                return;
            }

            // Initialize queue with seed URLs
            foreach ($job->seed_urls as $url) {
                $normalized = $this->urlNormalizer->normalize($url);
                if ($this->scopeValidator->isAllowed($normalized, $job->project, $job, 0)) {
                    $this->queue[] = ['url' => $normalized, 'depth' => 0];
                } else {
                    Log::warning("Seed URL {$url} bloqueada pelo validador de escopo para o projeto {$job->project_id}.");
                    CrawledPage::create([
                        'project_id' => $job->project_id,
                        'crawl_job_id' => $job->id,
                        'url' => $normalized,
                        'domain' => parse_url($normalized, PHP_URL_HOST),
                        'status_code' => 0,
                        'source' => 'crawler',
                        'error_message' => 'URL inicial fora do escopo autorizado do projeto. Adicione o domínio na aba de configurações.',
                    ]);
                    $job->increment('total_failed');
                }
            }

            $pagesCrawled = 0;

            while (!empty($this->queue) && $pagesCrawled < $job->max_pages) {
                if ($organization && $organization->hasReachedPageLimit()) {
                    Log::warning("Crawl job {$job->id} interrompido: limite de páginas do plano atingido durante a execução.");
                    break;
                }

                $current = array_shift($this->queue);
                $url = $current['url'];
                $depth = $current['depth'];

                if (isset($this->visited[$url])) {
                    continue;
                }

                $this->visited[$url] = true;
                $pagesCrawled++;

                // Apply politeness delay (between 0.1 and 10 seconds)
                if ($pagesCrawled > 1) {
                    $delay = 1.0;
                    if (method_exists($this->scopeValidator, 'getCrawlDelay')) {
                        $delay = $this->scopeValidator->getCrawlDelay($url);
                    }
                    $delay = min(10.0, max(0.1, $delay));
                    usleep((int)($delay * 1000000));
                }

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
        if (empty($html)) {
            return [];
        }

        $dom = new \DOMDocument();
        @$dom->loadHTML('<?xml encoding="UTF-8">' . $html, LIBXML_HTML_NOIMPLIED | LIBXML_HTML_NODEFDTD);
        
        $links = [];
        $anchors = $dom->getElementsByTagName('a');
        foreach ($anchors as $anchor) {
            $href = $anchor->getAttribute('href');
            if ($href) {
                $href = strtok($href, '#');
                $href = trim($href);
                if ($href !== '' && 
                    !str_starts_with($href, 'javascript:') && 
                    !str_starts_with($href, 'mailto:') && 
                    !str_starts_with($href, 'tel:')) {
                    $links[] = $href;
                }
            }
        }

        return array_unique($links);
    }
}
