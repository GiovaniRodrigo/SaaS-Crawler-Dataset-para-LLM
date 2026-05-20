<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Organization extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'slug',
        'owner_id',
        'stripe_customer_id',
        'stripe_subscription_id',
        'subscription_plan',
        'subscription_status',
        'subscription_ends_at',
    ];

    public function getLimits(): array
    {
        return match ($this->subscription_plan) {
            'pro' => [
                'max_projects' => 10,
                'max_pages' => 50000,
            ],
            'enterprise' => [
                'max_projects' => 999999,
                'max_pages' => 99999999,
            ],
            // 'starter' or default
            default => [
                'max_projects' => 2,
                'max_pages' => 1000,
            ],
        };
    }

    public function hasReachedProjectLimit(): bool
    {
        return $this->projects()->count() >= $this->getLimits()['max_projects'];
    }

    public function hasReachedPageLimit(): bool
    {
        $currentDocumentsCount = \App\Models\Document::whereIn('project_id', $this->projects()->pluck('id'))->count();
        return $currentDocumentsCount >= $this->getLimits()['max_pages'];
    }

    public function owner(): BelongsTo
    {
        return $this->belongsTo(User::class, 'owner_id');
    }

    public function users(): BelongsToMany
    {
        return $this->belongsToMany(User::class)
            ->withPivot('role')
            ->withTimestamps();
    }

    public function projects(): HasMany
    {
        return $this->hasMany(Project::class);
    }

    public function invitations(): HasMany
    {
        return $this->hasMany(OrganizationInvitation::class);
    }
}
