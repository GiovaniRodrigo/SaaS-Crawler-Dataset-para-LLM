<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        $tables = ['domains', 'crawl_jobs', 'documents', 'chunks', 'audit_logs'];

        foreach ($tables as $table) {
            Schema::table($table, function (Blueprint $table) {
                $table->foreignId('organization_id')->nullable()->constrained()->onDelete('cascade');
            });
        }
    }

    public function down(): void
    {
        $tables = ['domains', 'crawl_jobs', 'documents', 'chunks', 'audit_logs'];

        foreach ($tables as $table) {
            Schema::table($table, function (Blueprint $table) {
                $table->dropForeign(['organization_id']);
                $table->dropColumn('organization_id');
            });
        }
    }
};
