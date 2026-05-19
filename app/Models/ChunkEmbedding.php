<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class ChunkEmbedding extends Model
{
    protected $fillable = [
        'user_id',
        'project_id',
        'document_id',
        'chunk_id',
        'provider',
        'model',
        'dimensions',
        'content_hash',
    ];

    public function chunk(): BelongsTo
    {
        return $this->belongsTo(Chunk::class);
    }

    public function document(): BelongsTo
    {
        return $this->belongsTo(Document::class);
    }

    public function project(): BelongsTo
    {
        return $this->belongsTo(Project::class);
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
