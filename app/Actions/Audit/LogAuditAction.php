<?php

namespace App\Actions\Audit;

use App\Models\AuditLog;
use Illuminate\Support\Facades\Request;

class LogAuditAction
{
    public function execute(string $action, string $description, ?int $projectId = null, array $metadata = [])
    {
        return AuditLog::create([
            'user_id' => auth()->id(),
            'project_id' => $projectId,
            'action' => $action,
            'description' => $description,
            'metadata' => $metadata,
            'ip_address' => Request::ip(),
            'user_agent' => Request::userAgent(),
        ]);
    }
}
