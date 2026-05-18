<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('crawl_jobs', function (Blueprint $table) {
            $table->id();
            $table->foreignId('project_id')->constrained()->cascadeOnDelete();
            $table->string('status')->default('created');
            $table->json('seed_urls');
            $table->json('allow_paths')->nullable();
            $table->json('deny_paths')->nullable();
            $table->integer('max_depth')->default(3);
            $table->integer('max_pages')->default(100);
            $table->integer('total_discovered')->default(0);
            $table->integer('total_crawled')->default(0);
            $table->integer('total_failed')->default(0);
            $table->integer('total_documents')->default(0);
            $table->integer('total_chunks')->default(0);
            $table->timestamp('started_at')->nullable();
            $table->timestamp('finished_at')->nullable();
            $table->timestamps();

            $table->index('project_id');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('crawl_jobs');
    }
};
