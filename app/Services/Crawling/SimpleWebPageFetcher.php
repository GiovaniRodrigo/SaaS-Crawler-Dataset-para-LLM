<?php

namespace App\Services\Crawling;

use App\Contracts\Crawling\WebPageFetcherInterface;
use App\DTOs\Crawling\FetchResult;
use Illuminate\Support\Facades\Http;

class SimpleWebPageFetcher implements WebPageFetcherInterface
{
    public function fetch(string $url): FetchResult
    {
        try {
            $response = Http::timeout(30)
                ->withHeaders([
                    'User-Agent' => 'Mozilla/5.0 (compatible; CrawlMindBot/1.0; +https://crawlmind.com/bot)'
                ])
                ->get($url);
            
            return new FetchResult(
                url: $url,
                html: $response->body(),
                statusCode: $response->status(),
                headers: $response->headers()
            );
        } catch (\Exception $e) {
            return new FetchResult(
                url: $url,
                errorMessage: $e->getMessage()
            );
        }
    }
}
