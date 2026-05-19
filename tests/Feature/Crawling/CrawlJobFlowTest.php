<?php

namespace Tests\Feature\Crawling;

use App\Models\CrawlJob;
use App\Models\Project;
use App\Models\User;
use App\Models\Domain;
use App\Actions\CrawlJobs\RunCrawlJobAction;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Http;
use Tests\TestCase;

class CrawlJobFlowTest extends TestCase
{
    use RefreshDatabase;

    public function test_it_crawls_a_site_and_creates_documents_and_chunks()
    {
        $user = User::factory()->create();
        $project = Project::factory()->create(['user_id' => $user->id]);
        
        Domain::create([
            'project_id' => $project->id,
            'domain' => 'test.com',
            'allow_subdomains' => false
        ]);

        $job = CrawlJob::create([
            'project_id' => $project->id,
            'status' => 'pending',
            'seed_urls' => ['https://test.com'],
            'max_pages' => 2,
            'max_depth' => 1
        ]);

        $longText1 = str_repeat("This is a long text to satisfy the character limit requirement for crawling. ", 20);
        $longText2 = str_repeat("Another long text for the about page to ensure it also gets saved as a document. ", 20);

        // Mock HTTP responses
        Http::fake([
            'https://test.com' => Http::response(<<<HTML
                <html>
                    <head><title>Home</title></head>
                    <body>
                        <main>
                            <h1>Home</h1>
                            <p>{$longText1}</p>
                            <a href="/about">About Us</a>
                        </main>
                    </body>
                </html>
            HTML, 200),
            'https://test.com/about' => Http::response(<<<HTML
                <html>
                    <head><title>About</title></head>
                    <body>
                        <main>
                            <h1>About</h1>
                            <p>{$longText2}</p>
                        </main>
                    </body>
                </html>
            HTML, 200),
        ]);

        $action = app(RunCrawlJobAction::class);
        $action->execute($job);

        // Refresh job
        $job->refresh();

        $this->assertEquals('completed', $job->status);
        $this->assertEquals(2, $job->total_crawled);
        
        // Check documents
        $this->assertDatabaseHas('documents', [
            'project_id' => $project->id,
            'title' => 'Home'
        ]);
        $this->assertDatabaseHas('documents', [
            'project_id' => $project->id,
            'title' => 'About'
        ]);

        // Check chunks
        $this->assertDatabaseCount('chunks', 2);
    }
}
