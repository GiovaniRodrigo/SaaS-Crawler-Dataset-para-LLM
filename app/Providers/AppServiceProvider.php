<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use App\Contracts\Crawling\UrlScopeValidatorInterface;
use App\Services\Crawling\SimpleUrlScopeValidator;
use App\Contracts\Crawling\UrlNormalizerInterface;
use App\Services\Crawling\SimpleUrlNormalizer;
use App\Contracts\Crawling\WebPageFetcherInterface;
use App\Services\Crawling\SimpleWebPageFetcher;
use App\Contracts\TextProcessing\HtmlTextExtractorInterface;
use App\Services\TextProcessing\SimpleHtmlTextExtractor;
use App\Contracts\TextProcessing\TextCleanerInterface;
use App\Services\TextProcessing\SimpleTextCleaner;
use App\Contracts\TextProcessing\ContentHasherInterface;
use App\Services\TextProcessing\Sha256ContentHasher;
use App\Contracts\Dataset\ChunkerInterface;
use App\Services\Dataset\SimpleChunker;
use App\Contracts\Dataset\DatasetExporterInterface;
use App\Services\Dataset\JsonlDatasetExporter;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        $this->app->bind(UrlScopeValidatorInterface::class, SimpleUrlScopeValidator::class);
        $this->app->bind(UrlNormalizerInterface::class, SimpleUrlNormalizer::class);
        $this->app->bind(WebPageFetcherInterface::class, SimpleWebPageFetcher::class);
        $this->app->bind(HtmlTextExtractorInterface::class, SimpleHtmlTextExtractor::class);
        $this->app->bind(TextCleanerInterface::class, SimpleTextCleaner::class);
        $this->app->bind(ContentHasherInterface::class, Sha256ContentHasher::class);
        $this->app->bind(ChunkerInterface::class, SimpleChunker::class);
        $this->app->bind(DatasetExporterInterface::class, JsonlDatasetExporter::class);

        // AI and Search
        $this->app->bind(\App\Contracts\AI\EmbeddingGeneratorInterface::class, function ($app) {
            $provider = config('ai.embedding_provider', 'fake');
            return match ($provider) {
                'openai' => $app->make(\App\Services\AI\OpenAIEmbeddingGenerator::class),
                'gemini' => $app->make(\App\Services\AI\GeminiEmbeddingGenerator::class),
                default => $app->make(\App\Services\AI\FakeEmbeddingGenerator::class),
            };
        });
        $this->app->bind(\App\Contracts\AI\QualityScorerInterface::class, function ($app) {
            $provider = config('ai.quality_provider', 'local');
            return match ($provider) {
                'openai' => $app->make(\App\Services\AI\OpenAiQualityScorer::class),
                'gemini' => $app->make(\App\Services\AI\GeminiQualityScorer::class),
                default => $app->make(\App\Services\Quality\QualityScorer::class),
            };
        });
        $this->app->bind(\App\Contracts\Repositories\ChunkEmbeddingRepositoryInterface::class, \App\Repositories\PgVectorChunkEmbeddingRepository::class);
        $this->app->bind(\App\Contracts\Search\SemanticSearchInterface::class, \App\Services\Search\PgVectorSemanticSearchService::class);
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        if (app()->environment('production')) {
            \Illuminate\Support\Facades\URL::forceScheme('https');
        }
    }
}
