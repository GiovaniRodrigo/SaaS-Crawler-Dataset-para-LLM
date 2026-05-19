<?php

namespace App\Services\Quality;

use App\Models\Document;

class QualityScorer
{
    /**
     * Calcula um score de qualidade de 0 a 100 para um documento.
     */
    public function calculate(Document $document): float
    {
        $text = $document->text;
        $score = 100.0;

        // 1. Penalizar textos muito curtos (provável erro de extração ou boilerplate)
        $wordCount = str_word_count($text);
        if ($wordCount < 50) {
            $score -= 30;
        } elseif ($wordCount < 100) {
            $score -= 15;
        }

        // 2. Penalizar densidade excessiva de HTML (se sobrar tags)
        if (preg_match_all('/<[^>]*>/', $text, $matches)) {
            $tagCount = count($matches[0]);
            $score -= ($tagCount * 2);
        }

        // 3. Penalizar falta de título
        if (empty($document->title)) {
            $score -= 10;
        }

        // Garantir que o score esteja entre 0 e 100
        return (float) max(0, min(100, $score));
    }
}
