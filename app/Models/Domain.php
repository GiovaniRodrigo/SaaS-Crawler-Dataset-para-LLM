<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

use App\Traits\BelongsToOrganization;

class Domain extends Model
{
    use HasFactory, BelongsToOrganization;

    protected $fillable = [
        'organization_id',
        'project_id',
        'domain',
        'allow_subdomains',
    ];

    protected $casts = [
        'allow_subdomains' => 'boolean',
    ];

    public function project(): BelongsTo
    {
        return $this->belongsTo(Project::class);
    }

    public function crawledPages(): \Illuminate\Database\Eloquent\Relations\HasMany
    {
        return $this->hasMany(CrawledPage::class, 'domain', 'domain');
    }
}
