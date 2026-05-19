<?php

namespace App\Contracts\Search;

interface SemanticSearchInterface
{
    public function search(
        int $userId,
        int $projectId,
        string $query,
        int $limit = 10
    ): array;
}
