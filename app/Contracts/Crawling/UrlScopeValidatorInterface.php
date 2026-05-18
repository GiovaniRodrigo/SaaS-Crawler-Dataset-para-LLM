<?php

namespace App\Contracts\Crawling;

use App\Models\Project;
use App\Models\CrawlJob;

interface UrlScopeValidatorInterface
{
    public function isAllowed(string $url, Project $project, ?CrawlJob $job = null, int $depth = 0): bool;
}
