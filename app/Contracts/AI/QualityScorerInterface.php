<?php

namespace App\Contracts\AI;

use App\Models\Document;

interface QualityScorerInterface
{
    /**
     * Calcula um score de qualidade de 0 a 100 para um documento.
     *
     * @param Document $document
     * @return float
     */
    public function calculate(Document $document): float;
}
