<?php

namespace App\Actions\Documents;

use App\Models\Document;

class RejectDocumentAction
{
    public function __construct(
        protected \App\Actions\Audit\LogAuditAction $logAudit
    ) {}

    public function execute(Document $document): void
    {
        $document->update([
            'status' => Document::STATUS_REJECTED
        ]);

        $this->logAudit->execute(
            'document_rejected',
            "Documento #{$document->id} rejeitado: {$document->title}",
            $document->project_id
        );
    }
}
