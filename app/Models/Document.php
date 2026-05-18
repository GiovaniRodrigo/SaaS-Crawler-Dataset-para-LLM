<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Document extends Model
{
    use HasFactory;

    protected $fillable = [
        'project_id',
        'crawl_job_id',
        'crawled_page_id',
        'url',
        'title',
        'text',
        'language',
        'content_hash',
        'quality_score',
        'source',
    ];

    public function project(): BelongsTo
    {
        return $this->belongsTo(Project::class);
    }

    public function crawlJob(): BelongsTo
    {
        return $this->belongsTo(CrawlJob::class);
    }

    public function crawledPage(): BelongsTo
    {
        return $this->belongsTo(CrawledPage::class);
    }

    public function chunks(): HasMany
    {
        return $this->hasMany(Chunk::class);
    }
}
