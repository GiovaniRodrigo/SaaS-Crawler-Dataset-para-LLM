<?php

namespace App\Actions\Documents;

use App\Models\Document;

class ApproveDocumentAction
{
    public function __construct(
        protected \App\Actions\Audit\LogAuditAction $logAudit
    ) {}

    public function execute(Document $document): void
    {
        $document->update([
            'status' => Document::STATUS_APPROVED
        ]);

        $this->logAudit->execute(
            'document_approved',
            "Documento #{$document->id} aprovado: {$document->title}",
            $document->project_id
        );
    }
}
