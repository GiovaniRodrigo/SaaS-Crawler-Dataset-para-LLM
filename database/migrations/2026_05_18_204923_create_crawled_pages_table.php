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
        Schema::create('crawled_pages', function (Blueprint $table) {
            $table->id();
            $table->foreignId('project_id')->constrained()->cascadeOnDelete();
            $table->foreignId('crawl_job_id')->nullable()->constrained()->nullOnDelete();
            $table->string('url', 2048);
            $table->string('canonical_url', 2048)->nullable();
            $table->string('domain');
            $table->string('title', 512)->nullable();
            $table->integer('status_code')->nullable();
            $table->string('raw_html_hash')->nullable();
            $table->string('content_hash')->nullable();
            $table->string('source'); // crawler, browser_extension, manual
            $table->text('error_message')->nullable();
            $table->timestamps();

            $table->index('project_id');
            $table->index('crawl_job_id');
            $table->index('content_hash');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('crawled_pages');
    }
};
