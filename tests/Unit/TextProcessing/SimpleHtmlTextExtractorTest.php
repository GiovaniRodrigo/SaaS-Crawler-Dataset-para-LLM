<?php

namespace Tests\Unit\TextProcessing;

use App\Services\TextProcessing\SimpleHtmlTextExtractor;
use PHPUnit\Framework\TestCase;

class SimpleHtmlTextExtractorTest extends TestCase
{
    public function test_it_extracts_text_and_removes_unwanted_tags()
    {
        $extractor = new SimpleHtmlTextExtractor();
        $html = <<<HTML
        <!DOCTYPE html>
        <html>
        <head><title>Test Title</title></head>
        <body>
            <header><nav>Home</nav></header>
            <main>
                <h1>Main Content</h1>
                <p>This is a paragraph.</p>
                <script>alert('noise');</script>
                <style>.noise { color: red; }</style>
            </main>
            <footer>Footer noise</footer>
        </body>
        </html>
        HTML;

        $result = $extractor->extract($html);

        $this->assertEquals('Test Title', $result->title);
        $this->assertStringContainsString('Main Content', $result->text);
        $this->assertStringContainsString('This is a paragraph.', $result->text);
        $this->assertStringNotContainsString('Home', $result->text);
        $this->assertStringNotContainsString('Footer noise', $result->text);
        $this->assertStringNotContainsString("alert('noise')", $result->text);
    }

    public function test_it_preserves_code_blocks()
    {
        $extractor = new SimpleHtmlTextExtractor();
        $html = <<<HTML
        <main>
            <h1>Routing</h1>
            <p>Example:</p>
            <pre>Route::get('/', function () { return view('welcome'); });</pre>
            <p>Inline <code>code</code> here.</p>
        </main>
        HTML;

        $result = $extractor->extract($html);

        $this->assertStringContainsString('Routing', $result->text);
        $this->assertStringContainsString('```', $result->text);
        $this->assertStringContainsString("Route::get('/', function () { return view('welcome'); });", $result->text);
        $this->assertStringContainsString('`code`', $result->text);
    }
}
