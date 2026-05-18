<?php

namespace App\Contracts\TextProcessing;

use App\DTOs\TextProcessing\ExtractedText;

interface HtmlTextExtractorInterface
{
    public function extract(string $html): ExtractedText;
}
