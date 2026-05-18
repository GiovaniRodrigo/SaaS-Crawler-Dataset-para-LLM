<?php

namespace App\Services\TextProcessing;

use App\Contracts\TextProcessing\TextCleanerInterface;

class SimpleTextCleaner implements TextCleanerInterface
{
    public function clean(string $text): string
    {
        // Normalize line endings
        $text = str_replace(["\r\n", "\r"], "\n", $text);

        // Remove invisible characters
        $text = preg_replace('/[[:cntrl:]]/', '', $text);

        // Remove multiple spaces
        $text = preg_replace('/[ \t]+/', ' ', $text);

        // Remove excessive empty lines
        $text = preg_replace('/\n{3,}/', "\n\n", $text);

        $text = trim($text);

        // Section 19.2: ignore text with less than 300 characters
        if (mb_strlen($text) < 300) {
            return '';
        }

        return $text;
    }
}
