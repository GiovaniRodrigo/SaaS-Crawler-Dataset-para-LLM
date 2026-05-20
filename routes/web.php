<?php

use App\Http\Controllers\MarketingController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ProjectController;
use App\Http\Controllers\DomainController;
use App\Http\Controllers\CrawlJobController;
use App\Http\Controllers\DocumentController;
use App\Http\Controllers\ChunkController;
use App\Http\Controllers\DocumentReviewController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\ApiTokenController;
use App\Http\Controllers\SettingsController;
use App\Http\Controllers\DatasetExportController;
use App\Http\Controllers\OrganizationController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/product', [MarketingController::class, 'product'])->name('product');
Route::get('/features', [MarketingController::class, 'features'])->name('features');
Route::get('/security', [MarketingController::class, 'security'])->name('security');
Route::get('/pricing', [MarketingController::class, 'pricing'])->name('pricing');

Route::get('/dashboard', [DashboardController::class, 'index'])
    ->middleware(['auth', 'verified'])
    ->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/download-extension', [DashboardController::class, 'downloadExtension'])->name('download-extension');
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    // Global Data Routes
    Route::get('/domains', [DomainController::class, 'index'])->name('domains.index');
    Route::get('/crawl-jobs', [CrawlJobController::class, 'index'])->name('crawl-jobs.indexAll');
    Route::get('/documents', [DocumentController::class, 'indexAll'])->name('documents.indexAll');
    Route::get('/chunks', [ChunkController::class, 'indexAll'])->name('chunks.indexAll');

    // System & Settings Routes
    Route::get('/datasets', [SettingsController::class, 'datasets'])->name('settings.datasets');
    Route::post('/datasets/export', [SettingsController::class, 'exportDatasets'])->name('settings.datasets.export');
    Route::get('/reports', [SettingsController::class, 'reports'])->name('settings.reports');
    Route::get('/integrations', [SettingsController::class, 'integrations'])->name('settings.integrations');
    Route::get('/audit', [SettingsController::class, 'audit'])->name('settings.audit');
    Route::get('/billing', [SettingsController::class, 'billing'])->name('settings.billing');
    Route::get('/settings', [SettingsController::class, 'general'])->name('settings.general');
    Route::get('/settings/tokens', [ApiTokenController::class, 'index'])->name('settings.tokens');
    Route::post('/settings/tokens', [ApiTokenController::class, 'store'])->name('settings.tokens.store');
    Route::delete('/settings/tokens/{id}', [ApiTokenController::class, 'destroy'])->name('settings.tokens.destroy');

    // Organization / Team
    Route::get('/settings/team', [OrganizationController::class, 'members'])->name('settings.team');
    Route::post('/settings/team/add', [OrganizationController::class, 'addMember'])->name('settings.team.add');
    Route::delete('/settings/team/remove/{user}', [OrganizationController::class, 'removeMember'])->name('settings.team.remove');

    // Projects
    Route::resource('projects', ProjectController::class);

    // Domains
    Route::post('projects/{project}/domains', [DomainController::class, 'store'])->name('projects.domains.store');
    Route::delete('domains/{domain}', [DomainController::class, 'destroy'])->name('domains.destroy');

    // Crawl Jobs
    Route::get('projects/{project}/crawl-jobs/create', [CrawlJobController::class, 'create'])->name('projects.crawl-jobs.create');
    Route::post('projects/{project}/crawl-jobs', [CrawlJobController::class, 'store'])->name('projects.crawl-jobs.store');
    Route::get('crawl-jobs/{crawlJob}', [CrawlJobController::class, 'show'])->name('crawl-jobs.show');
    Route::post('crawl-jobs/{crawlJob}/run', [CrawlJobController::class, 'run'])->name('crawl-jobs.run');

    // Documents
    Route::get('projects/{project}/documents', [DocumentController::class, 'index'])->name('projects.documents.index');
    Route::get('documents/{document}', [DocumentController::class, 'show'])->name('documents.show');

    // Document Review
    Route::get('review/{project?}', [DocumentReviewController::class, 'index'])->name('documents.review.index');
    Route::post('documents/{document}/approve', [DocumentReviewController::class, 'approve'])->name('documents.approve');
    Route::post('documents/{document}/reject', [DocumentReviewController::class, 'reject'])->name('documents.reject');
    Route::post('documents/bulk-approve', [DocumentReviewController::class, 'bulkApprove'])->name('documents.bulk-approve');

    // Chunks
    Route::get('projects/{project}/chunks', [ChunkController::class, 'index'])->name('projects.chunks.index');

    // Semantic Search
    Route::post('projects/{project}/semantic-search', \App\Http\Controllers\SemanticSearchController::class)->name('projects.semantic-search');

    // Exports
    Route::get('projects/{project}/exports/documents', [DatasetExportController::class, 'documents'])->name('projects.exports.documents');
    Route::get('projects/{project}/exports/chunks', [DatasetExportController::class, 'chunks'])->name('projects.exports.chunks');
});

require __DIR__.'/auth.php';
