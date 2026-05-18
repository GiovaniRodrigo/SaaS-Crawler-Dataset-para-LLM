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
        Schema::create('documents', function (Blueprint $table) {
            $table->id();
            $table->foreignId('project_id')->constrained()->cascadeOnDelete();
            $table->foreignId('crawl_job_id')->nullable()->constrained()->nullOnDelete();
            $table->foreignId('crawled_page_id')->nullable()->constrained()->nullOnDelete();
            $table->string('url', 2048);
            $table->string('title', 512)->nullable();
            $table->longText('text');
            $table->string('language')->nullable();
            $table->string('content_hash');
            $table->float('quality_score')->nullable();
            $table->string('source');
            $table->timestamps();

            $table->index('project_id');
            $table->index('content_hash');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('documents');
    }
};
