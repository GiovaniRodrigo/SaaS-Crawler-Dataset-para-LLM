<?php

namespace App\Services\TextProcessing;

use App\Contracts\TextProcessing\HtmlTextExtractorInterface;
use App\DTOs\TextProcessing\ExtractedText;
use DOMDocument;
use DOMXPath;

class SimpleHtmlTextExtractor implements HtmlTextExtractorInterface
{
    public function extract(string $html): ExtractedText
    {
        if (empty($html)) {
            return new ExtractedText('');
        }

        $dom = new DOMDocument();
        @$dom->loadHTML('<?xml encoding="UTF-8">' . $html, LIBXML_HTML_NOIMPLIED | LIBXML_HTML_NODEFDTD);
        $xpath = new DOMXPath($dom);

        // Remove unwanted tags (Section 19.1)
        $unwantedTags = [
            'script', 'style', 'nav', 'footer', 'header', 'form', 'button',
            'input', 'textarea', 'select', 'svg', 'noscript', 'iframe'
        ];

        foreach ($unwantedTags as $tag) {
            $nodes = $dom->getElementsByTagName($tag);
            while ($nodes->length > 0) {
                $node = $nodes->item(0);
                $node->parentNode->removeChild($node);
            }
        }

        // Try to find main content
        $contentNode = $xpath->query('//main')->item(0) 
            ?? $xpath->query('//article')->item(0) 
            ?? $dom->getElementsByTagName('body')->item(0);

        $text = $contentNode ? $this->getCleanText($contentNode) : '';
        $title = $dom->getElementsByTagName('title')->item(0)?->textContent ?? '';

        return new ExtractedText(
            text: $text,
            title: trim($title)
        );
    }

    private function getCleanText($node): string
    {
        // Simple text extraction by iterating over children or using textContent
        // We want to keep some structure, maybe newlines for block elements
        $text = $node->textContent;
        return $text;
    }
}
