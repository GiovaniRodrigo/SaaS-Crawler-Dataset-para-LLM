<?php

namespace App\Contracts\Crawling;

use App\DTOs\Crawling\FetchResult;

interface WebPageFetcherInterface
{
    public function fetch(string $url): FetchResult;
}
