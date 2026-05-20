<?php

namespace App\Traits;

use App\Models\Organization;
use Illuminate\Database\Eloquent\Builder;

trait BelongsToOrganization
{
    protected static function bootBelongsToOrganization()
    {
        static::creating(function ($model) {
            if (!$model->organization_id && session()->has('current_organization_id')) {
                $model->organization_id = session()->get('current_organization_id');
            }
        });

        static::addGlobalScope('organization', function (Builder $builder) {
            if (session()->has('current_organization_id')) {
                $builder->where('organization_id', session()->get('current_organization_id'));
            }
        });
    }

    public function organization()
    {
        return $this->belongsTo(Organization::class);
    }
}
