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
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        //
    }
}
