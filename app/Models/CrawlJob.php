<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

use App\Traits\BelongsToOrganization;

class CrawlJob extends Model
{
    use HasFactory, BelongsToOrganization;

    protected $fillable = [
        'organization_id',
        'project_id',
        'status',
        'seed_urls',
        'allow_paths',
        'deny_paths',
        'max_depth',
        'max_pages',
        'total_discovered',
        'total_crawled',
        'total_failed',
        'total_documents',
        'total_chunks',
        'started_at',
        'finished_at',
    ];

    protected $casts = [
        'seed_urls' => 'array',
        'allow_paths' => 'array',
        'deny_paths' => 'array',
        'started_at' => 'datetime',
        'finished_at' => 'datetime',
    ];

    public function project(): BelongsTo
    {
        return $this->belongsTo(Project::class);
    }

    public function crawledPages(): HasMany
    {
        return $this->hasMany(CrawledPage::class);
    }

    public function documents(): HasMany
    {
        return $this->hasMany(Document::class);
    }
}
