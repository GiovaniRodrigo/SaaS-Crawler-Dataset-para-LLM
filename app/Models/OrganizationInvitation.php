<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class OrganizationInvitation extends Model
{
    protected $fillable = [
        'organization_id',
        'email',
        'role',
        'token',
    ];

    public function organization(): BelongsTo
    {
        return $this->belongsTo(Organization::class);
    }

    /**
     * Obter a URL de aceitação do convite.
     */
    public function getAcceptUrlAttribute(): string
    {
        return route('settings.team.accept_invite', ['token' => $this->token]);
    }
}
