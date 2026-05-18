<?php

namespace App\Services\Dataset;

use App\Contracts\Dataset\ChunkerInterface;

class SimpleChunker implements ChunkerInterface
{
    private int $chunkSize = 3000;
    private int $chunkOverlap = 300;

    public function chunk(string $text): array
    {
        $chunks = [];
        $textLength = mb_strlen($text);
        
        if ($textLength === 0) {
            return [];
        }

        $start = 0;
        while ($start < $textLength) {
            $end = $start + $this->chunkSize;
            $chunkText = mb_substr($text, $start, $this->chunkSize);
            
            $chunks[] = [
                'text' => $chunkText,
                'tokens_estimated' => (int) ceil(mb_strlen($chunkText) / 4)
            ];

            if ($end >= $textLength) {
                break;
            }

            $start = $end - $this->chunkOverlap;
        }

        return $chunks;
    }
}
