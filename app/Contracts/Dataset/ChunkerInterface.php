<?php

namespace App\Contracts\Dataset;

interface ChunkerInterface
{
    public function chunk(string $text): array;
}
