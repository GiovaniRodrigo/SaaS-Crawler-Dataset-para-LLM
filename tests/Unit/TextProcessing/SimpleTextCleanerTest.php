<?php

namespace Tests\Unit\TextProcessing;

use App\Services\TextProcessing\SimpleTextCleaner;
use PHPUnit\Framework\TestCase;

class SimpleTextCleanerTest extends TestCase
{
    public function test_it_cleans_text_properly()
    {
        $cleaner = new SimpleTextCleaner();
        
        // Test normalization and removal of excessive spaces/newlines
        $text = "Line 1\r\nLine 2    with spaces\n\n\n\nLine 3" . str_repeat(" more text to reach the minimum limit of one hundred characters required by the cleaner service.", 2);
        $cleaned = $cleaner->clean($text);
        
        $this->assertStringContainsString("Line 1\nLine 2 with spaces", $cleaned);
        $this->assertStringContainsString("Line 3", $cleaned);
        // Should have at most 3 newlines (\n\n\n) as per our regex \n{4,} -> \n\n\n
        $this->assertStringNotContainsString("\n\n\n\n", $cleaned);
    }

    public function test_it_preserves_minimum_length_code_blocks()
    {
        $cleaner = new SimpleTextCleaner();
        
        // Short text (less than 100 chars) should be discarded
        $shortText = "Too short content";
        $this->assertEquals('', $cleaner->clean($shortText));
        
        // Long enough text should be kept
        $longText = str_repeat("This is a long sentence that should definitely be kept because it has more than one hundred characters in total. ", 2);
        $this->assertNotEmpty($cleaner->clean($longText));
    }
}
