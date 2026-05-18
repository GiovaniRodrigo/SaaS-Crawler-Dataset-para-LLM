<?php

namespace App\Services\TextProcessing;

use App\Contracts\TextProcessing\ContentHasherInterface;

class Sha256ContentHasher implements ContentHasherInterface
{
    public function hash(string $content): string
    {
        return hash('sha256', $content);
    }
}
