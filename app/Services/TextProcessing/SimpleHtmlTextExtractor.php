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
        $text = $this->extractTextWithNewlines($node);
        // Clean up excessive whitespace but keep single newlines
        $text = preg_replace('/[ \t]+/', ' ', $text);
        $text = preg_replace('/\n\s*\n/', "\n\n", $text);
        return trim($text);
    }

    private function extractTextWithNewlines($node): string
    {
        if ($node->nodeType === XML_TEXT_NODE) {
            return $node->textContent;
        }

        $nodeName = strtolower($node->nodeName);

        // Handle code blocks
        if ($nodeName === 'pre' || $nodeName === 'code') {
            $codeText = trim($node->textContent);
            if (empty($codeText)) return "";
            
            // If it's a pre tag, it likely contains a block of code
            if ($nodeName === 'pre') {
                return "\n```\n" . $codeText . "\n```\n";
            }
            // If it's just code tag (inline), wrap with single backticks
            return "`" . $codeText . "`";
        }

        $text = "";
        if ($node->childNodes) {
            foreach ($node->childNodes as $child) {
                $text .= $this->extractTextWithNewlines($child);
            }
        }

        $blockElements = [
            'p', 'div', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 
            'li', 'br', 'hr', 'article', 'section'
        ];

        if (in_array($nodeName, $blockElements)) {
            $text .= "\n";
        }

        return $text;
    }
}
