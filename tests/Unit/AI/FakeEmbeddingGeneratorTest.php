<?php

namespace Tests\Unit\AI;

use App\Services\AI\FakeEmbeddingGenerator;
use PHPUnit\Framework\TestCase;

class FakeEmbeddingGeneratorTest extends TestCase
{
    public function test_it_generates_consistent_embeddings()
    {
        $generator = new FakeEmbeddingGenerator();
        $text = 'test semantic search';
        
        $embedding1 = $generator->generate($text);
        $embedding2 = $generator->generate($text);
        
        $this->assertCount(1536, $embedding1);
        $this->assertEquals($embedding1, $embedding2);
    }

    public function test_it_generates_different_embeddings_for_different_text()
    {
        $generator = new FakeEmbeddingGenerator();
        
        $embedding1 = $generator->generate('text one');
        $embedding2 = $generator->generate('text two');
        
        $this->assertNotEquals($embedding1, $embedding2);
    }
}
