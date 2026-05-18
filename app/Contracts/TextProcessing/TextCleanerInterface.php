<?php

namespace App\Contracts\TextProcessing;

interface TextCleanerInterface
{
    public function clean(string $text): string;
}
