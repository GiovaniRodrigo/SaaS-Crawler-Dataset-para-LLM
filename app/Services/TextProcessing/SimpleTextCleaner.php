<?php

namespace App\Services\TextProcessing;

use App\Contracts\TextProcessing\TextCleanerInterface;

class SimpleTextCleaner implements TextCleanerInterface
{
    public function clean(string $text): string
    {
        // Normalize line endings
        $text = str_replace(["\r\n", "\r"], "\n", $text);

        // Remove invisible characters but preserve newlines and tabs
        $text = preg_replace('/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/', '', $text);

        // Remove multiple spaces
        $text = preg_replace('/[ \t]+/', ' ', $text);

        // Remove excessive empty lines
        $text = preg_replace('/\n{4,}/', "\n\n\n", $text);

        $text = trim($text);

        // Section 19.2: ignore text with less than 100 characters
        if (mb_strlen($text) < 100) {
            return '';
        }

        return $text;
    }
}
