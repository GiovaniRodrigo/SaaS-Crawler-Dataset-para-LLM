<?php

namespace App\DTOs\Crawling;

class FetchResult
{
    public function __construct(
        public string $url,
        public ?string $html = null,
        public ?int $statusCode = null,
        public ?string $errorMessage = null,
        public array $headers = []
    ) {}

    public function isSuccessful(): bool
    {
        return $this->statusCode >= 200 && $this->statusCode < 300;
    }
}
