<?php

namespace Tests\Unit;

use Tests\TestCase;
use App\Services\Crawling\SimpleUrlScopeValidator;
use App\Models\Project;
use App\Models\Domain;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Http;

class SimpleUrlScopeValidatorTest extends TestCase
{
    use RefreshDatabase;

    public function test_it_respects_robots_txt_disallow_rules()
    {
        $user = User::factory()->create();
        $project = Project::factory()->create(['user_id' => $user->id]);
        Domain::create([
            'project_id' => $project->id,
            'domain' => 'example.com',
            'allow_subdomains' => false
        ]);

        // Mock robots.txt
        Http::fake([
            'https://example.com/robots.txt' => Http::response(
                "User-agent: *\nDisallow: /admin/\nDisallow: /private\nCrawl-delay: 2.5", 
                200
            ),
        ]);

        $validator = new SimpleUrlScopeValidator();

        // Check if disallowed paths are blocked
        $this->assertFalse($validator->isAllowed('https://example.com/admin/dashboard', $project));
        $this->assertFalse($validator->isAllowed('https://example.com/private/page', $project));

        // Check if other paths are allowed
        $this->assertTrue($validator->isAllowed('https://example.com/public/page', $project));

        // Check if crawl delay is correctly parsed
        $this->assertEquals(2.5, $validator->getCrawlDelay('https://example.com/public/page'));
    }

    public function test_it_bypasses_robots_txt_for_localhost()
    {
        $user = User::factory()->create();
        $project = Project::factory()->create(['user_id' => $user->id]);
        Domain::create([
            'project_id' => $project->id,
            'domain' => 'localhost',
            'allow_subdomains' => false
        ]);

        $validator = new SimpleUrlScopeValidator();

        // Localhost should be allowed and return default delay (1.0)
        $this->assertTrue($validator->isAllowed('http://localhost/about', $project));
        $this->assertEquals(1.0, $validator->getCrawlDelay('http://localhost/about'));
    }
}
