<?php

namespace App\DTOs\TextProcessing;

class ExtractedText
{
    public function __construct(
        public string $text,
        public ?string $title = null,
        public ?string $language = null,
        public array $metadata = []
    ) {}
}
