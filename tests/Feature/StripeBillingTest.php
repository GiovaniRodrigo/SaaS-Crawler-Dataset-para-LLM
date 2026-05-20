<?php

namespace Tests\Feature;

use App\Models\User;
use App\Models\Organization;
use App\Models\Project;
use App\Models\CrawledPage;
use App\Models\Document;
use App\Models\CrawlJob;
use App\Actions\CrawlJobs\RunCrawlJobAction;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;
use Inertia\Testing\AssertableInertia as Assert;
use Mockery;

class StripeBillingTest extends TestCase
{
    use RefreshDatabase;

    protected function tearDown(): void
    {
        Mockery::close();
        parent::tearDown();
    }

    public function test_billing_page_renders_with_correct_metrics(): void
    {
        $user = User::factory()->create();
        $organization = Organization::create([
            'name' => 'Acme Corp',
            'slug' => 'acme-corp',
            'owner_id' => $user->id,
            'subscription_plan' => 'starter',
            'subscription_status' => 'active',
        ]);
        $user->organizations()->attach($organization->id, ['role' => 'owner']);

        $project = Project::factory()->create([
            'user_id' => $user->id,
            'organization_id' => $organization->id,
        ]);

        $crawledPage = CrawledPage::create([
            'project_id' => $project->id,
            'url' => 'https://example.com/page1',
            'domain' => 'example.com',
            'status_code' => 200,
            'source' => 'crawler',
        ]);

        $text = 'Page content here...';
        Document::create([
            'project_id' => $project->id,
            'organization_id' => $organization->id,
            'crawled_page_id' => $crawledPage->id,
            'title' => 'Page 1',
            'text' => $text,
            'url' => 'https://example.com/page1',
            'quality_score' => 85,
            'content_hash' => md5($text),
            'source' => 'crawler',
        ]);

        $response = $this->actingAs($user)
            ->get('/billing');

        $response->assertStatus(200);
        $response->assertInertia(fn (Assert $page) => $page
            ->component('Settings/Billing')
            ->where('plan', 'starter')
            ->where('status', 'active')
            ->where('project_count', 1)
            ->where('page_count', 1)
            ->where('limits.max_projects', 2)
            ->where('limits.max_pages', 1000)
        );
    }

    public function test_cannot_create_project_when_limit_is_exceeded(): void
    {
        $user = User::factory()->create();
        $organization = Organization::create([
            'name' => 'Acme Corp',
            'slug' => 'acme-corp',
            'owner_id' => $user->id,
            'subscription_plan' => 'starter', // Starter allows 2 projects
        ]);
        $user->organizations()->attach($organization->id, ['role' => 'owner']);

        // Create 2 projects (reaching the limit)
        Project::factory()->count(2)->create([
            'user_id' => $user->id,
            'organization_id' => $organization->id,
        ]);

        // Try to create the 3rd project
        $response = $this->actingAs($user)
            ->post('/projects', [
                'name' => 'Project 3',
                'description' => 'A third project description',
                'allowed_domains' => "example.com\n",
            ]);

        $response->assertSessionHasErrors('name');
        $this->assertEquals(2, $organization->projects()->count());
    }

    public function test_cannot_capture_via_extension_when_page_limit_is_exceeded(): void
    {
        $user = User::factory()->create();
        $organization = Organization::create([
            'name' => 'Acme Corp',
            'slug' => 'acme-corp',
            'owner_id' => $user->id,
            'subscription_plan' => 'starter', // Starter allows 1000 pages
        ]);
        $user->organizations()->attach($organization->id, ['role' => 'owner']);

        $project = Project::factory()->create([
            'user_id' => $user->id,
            'organization_id' => $organization->id,
        ]);

        // Simulate having 1000 documents
        for ($i = 0; $i < 1000; $i++) {
            $text = "Content {$i}";
            Document::create([
                'project_id' => $project->id,
                'organization_id' => $organization->id,
                'title' => "Page {$i}",
                'text' => $text,
                'url' => "https://example.com/page-{$i}",
                'quality_score' => 80,
                'content_hash' => md5($text),
                'source' => 'browser_extension',
            ]);
        }

        $this->actingAs($user, 'sanctum');

        $response = $this->postJson('/api/extension/captures', [
            'project_id' => $project->id,
            'url' => 'https://example.com/new-capture',
            'title' => 'New Capture',
            'text' => str_repeat('New capture page content that is long enough to pass validation. ', 3),
        ]);

        $response->assertStatus(403);
        $response->assertJsonPath('message', 'Limite de páginas atingido para o plano Starter. Faça o upgrade de plano.');
    }

    public function test_crawler_stops_running_when_page_limit_is_reached(): void
    {
        $user = User::factory()->create();
        $organization = Organization::create([
            'name' => 'Acme Corp',
            'slug' => 'acme-corp',
            'owner_id' => $user->id,
            'subscription_plan' => 'starter', // Starter: 1000 pages
        ]);
        $user->organizations()->attach($organization->id, ['role' => 'owner']);

        $project = Project::factory()->create([
            'user_id' => $user->id,
            'organization_id' => $organization->id,
        ]);

        // Pre-fill 1000 documents to trigger limit
        for ($i = 0; $i < 1000; $i++) {
            $text = "Content {$i}";
            Document::create([
                'project_id' => $project->id,
                'organization_id' => $organization->id,
                'title' => "Doc {$i}",
                'text' => $text,
                'url' => "https://example.com/{$i}",
                'content_hash' => md5($text),
                'source' => 'crawler',
            ]);
        }

        $job = CrawlJob::create([
            'project_id' => $project->id,
            'seed_urls' => ['https://example.com'],
            'max_depth' => 2,
            'max_pages' => 10,
            'status' => 'pending',
        ]);

        // Run the action
        $action = app(RunCrawlJobAction::class);
        $action->execute($job);

        // Fetch refreshed job and verify it completed immediately without adding crawled pages
        $job->refresh();
        $this->assertEquals('completed', $job->status);
        $this->assertEquals(0, $job->total_crawled);
    }

    public function test_stripe_webhook_checkout_completed(): void
    {
        $user = User::factory()->create();
        $organization = Organization::create([
            'name' => 'Acme Corp',
            'slug' => 'acme-corp',
            'owner_id' => $user->id,
            'subscription_plan' => 'starter',
            'subscription_status' => 'active',
        ]);

        $payload = [
            'type' => 'checkout.session.completed',
            'data' => [
                'object' => [
                    'customer' => 'cus_test123',
                    'subscription' => 'sub_test123',
                    'metadata' => [
                        'organization_id' => $organization->id,
                    ],
                ],
            ],
        ];

        $response = $this->postJson('/webhook/stripe', $payload);

        $response->assertStatus(200);
        
        $organization->refresh();
        $this->assertEquals('cus_test123', $organization->stripe_customer_id);
        $this->assertEquals('sub_test123', $organization->stripe_subscription_id);
        $this->assertEquals('pro', $organization->subscription_plan);
        $this->assertEquals('active', $organization->subscription_status);
    }

    public function test_stripe_webhook_subscription_updated_and_deleted(): void
    {
        $user = User::factory()->create();
        $organization = Organization::create([
            'name' => 'Acme Corp',
            'slug' => 'acme-corp',
            'owner_id' => $user->id,
            'stripe_customer_id' => 'cus_test123',
            'stripe_subscription_id' => 'sub_test123',
            'subscription_plan' => 'pro',
            'subscription_status' => 'active',
        ]);

        // Test update status to past_due
        $updatePayload = [
            'type' => 'customer.subscription.updated',
            'data' => [
                'object' => [
                    'id' => 'sub_test123',
                    'status' => 'past_due',
                    'current_period_end' => 1779836400, // Year 2026
                ],
            ],
        ];

        $response = $this->postJson('/webhook/stripe', $updatePayload);
        $response->assertStatus(200);

        $organization->refresh();
        $this->assertEquals('past_due', $organization->subscription_status);
        $this->assertNotNull($organization->subscription_ends_at);

        // Test delete / cancellation
        $deletePayload = [
            'type' => 'customer.subscription.deleted',
            'data' => [
                'object' => [
                    'id' => 'sub_test123',
                ],
            ],
        ];

        $response = $this->postJson('/webhook/stripe', $deletePayload);
        $response->assertStatus(200);

        $organization->refresh();
        $this->assertEquals('starter', $organization->subscription_plan);
        $this->assertEquals('active', $organization->subscription_status);
        $this->assertNull($organization->stripe_subscription_id);
        $this->assertNull($organization->subscription_ends_at);
    }

    public function test_stripe_subscribe_checkout_redirection(): void
    {
        $user = User::factory()->create();
        $organization = Organization::create([
            'name' => 'Acme Corp',
            'slug' => 'acme-corp',
            'owner_id' => $user->id,
            'subscription_plan' => 'starter',
        ]);
        $user->organizations()->attach($organization->id, ['role' => 'owner']);

        // Set Stripe secrets config
        config(['services.stripe.secret' => 'sk_test_mock']);
        config(['services.stripe.pro_price_id' => 'price_mock']);

        // Hydrate real Stripe objects with properties set using constructFrom
        $customer = \Stripe\Customer::constructFrom(['id' => 'cus_test123']);
        $session = \Stripe\Checkout\Session::constructFrom([
            'id' => 'sess_test123',
            'url' => 'https://checkout.stripe.com/mock-session'
        ]);

        // Mock StripeService via Container Binding
        $stripeServiceMock = Mockery::mock(\App\Services\StripeService::class);
        $stripeServiceMock->shouldReceive('createCustomer')
            ->once()
            ->andReturn($customer);

        $stripeServiceMock->shouldReceive('createCheckoutSession')
            ->once()
            ->andReturn($session);

        $this->instance(\App\Services\StripeService::class, $stripeServiceMock);

        $response = $this->actingAs($user)
            ->post('/settings/billing/subscribe', [], ['X-Inertia' => 'true']);

        // Inertia location returns 409 status code
        $response->assertStatus(409);
        $response->assertHeader('X-Inertia-Location', 'https://checkout.stripe.com/mock-session');

        $organization->refresh();
        $this->assertEquals('cus_test123', $organization->stripe_customer_id);
    }
}
