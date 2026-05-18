<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ProjectController;
use App\Http\Controllers\DomainController;
use App\Http\Controllers\CrawlJobController;
use App\Http\Controllers\DocumentController;
use App\Http\Controllers\ChunkController;
use App\Http\Controllers\DatasetExportController;
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

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

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

    // Chunks
    Route::get('projects/{project}/chunks', [ChunkController::class, 'index'])->name('projects.chunks.index');

    // Exports
    Route::get('projects/{project}/exports/documents', [DatasetExportController::class, 'documents'])->name('projects.exports.documents');
    Route::get('projects/{project}/exports/chunks', [DatasetExportController::class, 'chunks'])->name('projects.exports.chunks');
});

require __DIR__.'/auth.php';
