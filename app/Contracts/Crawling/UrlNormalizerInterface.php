<?php

namespace App\Contracts\Crawling;

interface UrlNormalizerInterface
{
    public function normalize(string $url, ?string $baseUrl = null): string;
}
