<?php

namespace App\Policies;

use App\Models\Chunk;
use App\Models\User;

class ChunkPolicy
{
    public function view(User $user, Chunk $chunk): bool
    {
        return $user->id === $chunk->project->user_id;
    }
}
