<?php

namespace App\Traits;

use App\Models\Organization;
use Illuminate\Database\Eloquent\Builder;

trait BelongsToOrganization
{
    protected static function bootBelongsToOrganization()
    {
        static::creating(function ($model) {
            if (!$model->organization_id) {
                // Try session fallback first
                $sessionOrgId = null;
                try {
                    if (session() && session()->has('current_organization_id')) {
                        $sessionOrgId = session()->get('current_organization_id');
                    }
                } catch (\Throwable $e) {
                    // Session not initialized (e.g. API/CLI stateless contexts)
                }

                if ($sessionOrgId) {
                    $model->organization_id = $sessionOrgId;
                } elseif (isset($model->project_id) && $model->project_id) {
                    $project = \App\Models\Project::withoutGlobalScopes()->find($model->project_id);
                    if ($project) {
                        $model->organization_id = $project->organization_id;
                    }
                } elseif (isset($model->document_id) && $model->document_id) {
                    $document = \App\Models\Document::withoutGlobalScopes()->find($model->document_id);
                    if ($document) {
                        $model->organization_id = $document->organization_id;
                    }
                } elseif (auth()->check()) {
                    $user = auth()->user();
                    if (method_exists($user, 'currentOrganization')) {
                        $org = $user->currentOrganization();
                        if ($org) {
                            $model->organization_id = $org->id;
                        }
                    }
                }
            }
        });

        static::addGlobalScope('organization', function (Builder $builder) {
            $orgId = null;
            try {
                if (session() && session()->has('current_organization_id')) {
                    $orgId = session()->get('current_organization_id');
                }
            } catch (\Throwable $e) {
                // Session not initialized
            }

            if (!$orgId && auth()->check()) {
                $user = auth()->user();
                if (method_exists($user, 'currentOrganization')) {
                    $org = $user->currentOrganization();
                    if ($org) {
                        $orgId = $org->id;
                    }
                }
            }

            if ($orgId) {
                $builder->where($builder->getModel()->getTable() . '.organization_id', $orgId);
            }
        });
    }

    public function organization()
    {
        return $this->belongsTo(Organization::class);
    }
}
