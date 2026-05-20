<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

use App\Traits\BelongsToOrganization;

class Project extends Model
{
    use HasFactory, BelongsToOrganization;

    protected $fillable = [
        'user_id',
        'organization_id',
        'name',
        'description',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function domains(): HasMany
    {
        return $this->hasMany(Domain::class);
    }

    public function crawlJobs(): HasMany
    {
        return $this->hasMany(CrawlJob::class);
    }

    public function crawledPages(): HasMany
    {
        return $this->hasMany(CrawledPage::class);
    }

    public function documents(): HasMany
    {
        return $this->hasMany(Document::class);
    }

    public function chunks(): HasMany
    {
        return $this->hasMany(Chunk::class);
    }
}
