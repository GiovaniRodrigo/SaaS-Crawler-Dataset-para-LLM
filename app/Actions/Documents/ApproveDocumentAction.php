<?php

namespace App\Actions\Documents;

use App\Models\Document;

class ApproveDocumentAction
{
    public function execute(Document $document): void
    {
        $document->update([
            'status' => Document::STATUS_APPROVED
        ]);
    }
}
