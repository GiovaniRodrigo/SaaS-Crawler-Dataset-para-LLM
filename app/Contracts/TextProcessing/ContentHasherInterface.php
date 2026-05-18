<?php

namespace App\Contracts\TextProcessing;

interface ContentHasherInterface
{
    public function hash(string $content): string;
}
