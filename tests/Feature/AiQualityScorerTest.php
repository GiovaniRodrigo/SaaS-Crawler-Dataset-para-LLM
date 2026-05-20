<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;
use App\Models\Project;
use App\Models\Document;
use App\Contracts\AI\QualityScorerInterface;
use App\Services\Quality\QualityScorer;
use App\Services\AI\GeminiQualityScorer;
use App\Services\AI\OpenAiQualityScorer;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Config;

class AiQualityScorerTest extends TestCase
{
    use RefreshDatabase;

    protected Document $document;

    protected function setUp(): void
    {
        parent::setUp();

        $project = Project::factory()->create();
        $this->document = Document::create([
            'project_id' => $project->id,
            'url' => 'https://example.com/test-article',
            'title' => 'Como configurar o Laravel e Inertia com React',
            'text' => 'Neste artigo vamos aprender como instalar o Laravel Breeze com Inertia e configurar uma stack moderna com React e TypeScript no backend e frontend. Siga os passos e configure seus controllers.',
            'language' => 'pt',
            'content_hash' => md5('Neste artigo...'),
            'source' => 'web',
            'status' => Document::STATUS_PENDING,
        ]);
    }

    public function test_local_heuristic_scorer_is_bound_by_default()
    {
        Config::set('ai.quality_provider', 'local');

        $scorer = app(QualityScorerInterface::class);

        $this->assertInstanceOf(QualityScorer::class, $scorer);
        $score = $scorer->calculate($this->document);

        // Word count is ~30 words (<50 penalty of -30), has title
        $this->assertEquals(70.0, $score);
    }

    public function test_gemini_scorer_is_bound_and_succeeds()
    {
        Config::set('ai.quality_provider', 'gemini');
        Config::set('ai.providers.gemini.key', 'fake-key');
        Config::set('ai.providers.gemini.chat_model', 'gemini-1.5-flash');

        $scorer = app(QualityScorerInterface::class);
        $this->assertInstanceOf(GeminiQualityScorer::class, $scorer);

        Http::fake([
            'https://generativelanguage.googleapis.com/*' => Http::response([
                'candidates' => [
                    [
                        'content' => [
                            'parts' => [
                                ['text' => json_encode(['score' => 95, 'reason' => 'Excellent documentation.'])]
                            ]
                        ]
                    ]
                ]
            ], 200)
        ]);

        $score = $scorer->calculate($this->document);
        $this->assertEquals(95.0, $score);
    }

    public function test_gemini_scorer_falls_back_on_api_error()
    {
        Config::set('ai.quality_provider', 'gemini');
        Config::set('ai.providers.gemini.key', 'fake-key');

        $scorer = app(QualityScorerInterface::class);

        Http::fake([
            'https://generativelanguage.googleapis.com/*' => Http::response('API Error', 500)
        ]);

        $score = $scorer->calculate($this->document);
        // Falls back to heuristic (70.0)
        $this->assertEquals(70.0, $score);
    }

    public function test_gemini_scorer_falls_back_on_missing_key()
    {
        Config::set('ai.quality_provider', 'gemini');
        Config::set('ai.providers.gemini.key', null);

        $scorer = app(QualityScorerInterface::class);

        $score = $scorer->calculate($this->document);
        // Falls back to heuristic (70.0) without calling api
        $this->assertEquals(70.0, $score);
    }

    public function test_openai_scorer_is_bound_and_succeeds()
    {
        Config::set('ai.quality_provider', 'openai');
        Config::set('ai.providers.openai.key', 'fake-key');
        Config::set('ai.providers.openai.chat_model', 'gpt-4o-mini');

        $scorer = app(QualityScorerInterface::class);
        $this->assertInstanceOf(OpenAiQualityScorer::class, $scorer);

        Http::fake([
            'https://api.openai.com/v1/chat/completions' => Http::response([
                'choices' => [
                    [
                        'message' => [
                            'content' => json_encode(['score' => 88, 'reason' => 'Good overview of Inertia Setup.'])
                        ]
                    ]
                ]
            ], 200)
        ]);

        $score = $scorer->calculate($this->document);
        $this->assertEquals(88.0, $score);
    }

    public function test_openai_scorer_falls_back_on_api_error()
    {
        Config::set('ai.quality_provider', 'openai');
        Config::set('ai.providers.openai.key', 'fake-key');

        $scorer = app(QualityScorerInterface::class);

        Http::fake([
            'https://api.openai.com/v1/chat/completions' => Http::response('API Error', 500)
        ]);

        $score = $scorer->calculate($this->document);
        // Falls back to heuristic (70.0)
        $this->assertEquals(70.0, $score);
    }

    public function test_openai_scorer_falls_back_on_missing_key()
    {
        Config::set('ai.quality_provider', 'openai');
        Config::set('ai.providers.openai.key', null);

        $scorer = app(QualityScorerInterface::class);

        $score = $scorer->calculate($this->document);
        // Falls back to heuristic (70.0) without calling api
        $this->assertEquals(70.0, $score);
    }
}
