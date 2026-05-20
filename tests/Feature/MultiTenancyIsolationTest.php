<?php

namespace Tests\Feature;

use App\Models\User;
use App\Models\Organization;
use App\Models\Project;
use App\Models\CrawledPage;
use App\Models\Document;
use App\Models\Chunk;
use App\Models\Domain;
use App\Models\CrawlJob;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;
use App\Actions\Documents\CreateDocumentFromCrawledPageAction;
use App\Actions\Chunks\GenerateChunksForDocumentAction;

class MultiTenancyIsolationTest extends TestCase
{
    use RefreshDatabase;

    public function test_api_scoping_only_allows_viewing_projects_of_active_organization(): void
    {
        $user1 = User::factory()->create();
        $org1 = Organization::create([
            'name' => 'Org 1',
            'slug' => 'org-1',
            'owner_id' => $user1->id,
        ]);
        $user1->organizations()->attach($org1->id, ['role' => 'owner']);

        $project1 = Project::factory()->create([
            'organization_id' => $org1->id,
            'user_id' => $user1->id,
        ]);

        $user2 = User::factory()->create();
        $org2 = Organization::create([
            'name' => 'Org 2',
            'slug' => 'org-2',
            'owner_id' => $user2->id,
        ]);
        $user2->organizations()->attach($org2->id, ['role' => 'owner']);

        $project2 = Project::factory()->create([
            'organization_id' => $org2->id,
            'user_id' => $user2->id,
        ]);

        // Autenticar como User 1 via Sanctum
        $this->actingAs($user1, 'sanctum');

        $response = $this->getJson('/api/extension/projects');

        $response->assertStatus(200);
        $response->assertJsonCount(1);
        $response->assertJsonPath('0.id', $project1->id);
    }

    public function test_api_scoping_blocks_captures_for_other_organization_projects(): void
    {
        $user1 = User::factory()->create();
        $org1 = Organization::create([
            'name' => 'Org 1',
            'slug' => 'org-1',
            'owner_id' => $user1->id,
        ]);
        $user1->organizations()->attach($org1->id, ['role' => 'owner']);

        $user2 = User::factory()->create();
        $org2 = Organization::create([
            'name' => 'Org 2',
            'slug' => 'org-2',
            'owner_id' => $user2->id,
        ]);
        $user2->organizations()->attach($org2->id, ['role' => 'owner']);

        $project2 = Project::factory()->create([
            'organization_id' => $org2->id,
            'user_id' => $user2->id,
        ]);

        Domain::create([
            'project_id' => $project2->id,
            'organization_id' => $org2->id,
            'domain' => 'example.com',
            'allow_subdomains' => true,
        ]);

        $this->actingAs($user1, 'sanctum');

        $response = $this->postJson('/api/extension/captures', [
            'project_id' => $project2->id,
            'url' => 'https://example.com/page',
            'title' => 'Page Title',
            'text' => '<body>' . str_repeat('New capture page content that is long enough to pass validation. ', 7) . '</body>',
        ]);

        // Retorna 403 ou 404
        $this->assertTrue(in_array($response->status(), [403, 404]));
    }

    public function test_api_scoping_creates_crawled_pages_and_documents_with_correct_org_id(): void
    {
        $user1 = User::factory()->create();
        $org1 = Organization::create([
            'name' => 'Org 1',
            'slug' => 'org-1',
            'owner_id' => $user1->id,
        ]);
        $user1->organizations()->attach($org1->id, ['role' => 'owner']);

        $project1 = Project::factory()->create([
            'organization_id' => $org1->id,
            'user_id' => $user1->id,
        ]);

        Domain::create([
            'project_id' => $project1->id,
            'organization_id' => $org1->id,
            'domain' => 'example.com',
            'allow_subdomains' => true,
        ]);

        $this->actingAs($user1, 'sanctum');

        $response = $this->postJson('/api/extension/captures', [
            'project_id' => $project1->id,
            'url' => 'https://example.com/page',
            'title' => 'Page Title',
            'text' => '<body>' . str_repeat('New capture page content that is long enough to pass validation. ', 7) . '</body>',
        ]);

        $response->assertStatus(200);

        $crawledPage = CrawledPage::latest()->first();
        $this->assertNotNull($crawledPage);
        $this->assertEquals($org1->id, $crawledPage->organization_id);

        $document = Document::latest()->first();
        $this->assertNotNull($document);
        $this->assertEquals($org1->id, $document->organization_id);

        $chunk = Chunk::latest()->first();
        $this->assertNotNull($chunk);
        $this->assertEquals($org1->id, $chunk->organization_id);
    }

    public function test_queue_worker_context_automatically_assigns_org_id_via_project_relation(): void
    {
        $user = User::factory()->create();
        $org = Organization::create([
            'name' => 'Org 1',
            'slug' => 'org-1',
            'owner_id' => $user->id,
        ]);

        $project = Project::factory()->create([
            'organization_id' => $org->id,
            'user_id' => $user->id,
        ]);

        // Garantir que não há sessão nem auth ativos (simulando queue CLI worker)
        $this->assertFalse(auth()->check());
        session()->forget('current_organization_id');

        // Criar crawled page
        $crawledPage = CrawledPage::create([
            'project_id' => $project->id,
            'url' => 'https://example.com/crawler-page',
            'domain' => 'example.com',
            'source' => 'crawler',
        ]);

        $this->assertEquals($org->id, $crawledPage->organization_id);

        // Criar documento via Action
        $createDocAction = app(CreateDocumentFromCrawledPageAction::class);
        $document = $createDocAction->execute($crawledPage, '<body>' . str_repeat('Extracted crawler content from HTML page for testing chunking layout... ', 7) . '</body>');

        $this->assertNotNull($document);
        $this->assertEquals($org->id, $document->organization_id);

        // Criar chunks via Action
        $genChunksAction = app(GenerateChunksForDocumentAction::class);
        $genChunksAction->execute($document);

        $chunk = Chunk::where('document_id', $document->id)->first();
        $this->assertNotNull($chunk);
        $this->assertEquals($org->id, $chunk->organization_id);
    }

    public function test_global_scope_filters_resources_by_active_organization_session(): void
    {
        $user1 = User::factory()->create();
        $org1 = Organization::create([
            'name' => 'Org 1',
            'slug' => 'org-1',
            'owner_id' => $user1->id,
        ]);
        $project1 = Project::factory()->create([
            'organization_id' => $org1->id,
            'user_id' => $user1->id,
        ]);

        $user2 = User::factory()->create();
        $org2 = Organization::create([
            'name' => 'Org 2',
            'slug' => 'org-2',
            'owner_id' => $user2->id,
        ]);
        $project2 = Project::factory()->create([
            'organization_id' => $org2->id,
            'user_id' => $user2->id,
        ]);

        // Simula crawled pages para ambas as organizações
        $crawled1 = CrawledPage::create([
            'project_id' => $project1->id,
            'organization_id' => $org1->id,
            'url' => 'https://example.com/org1',
            'domain' => 'example.com',
            'source' => 'crawler',
        ]);

        $crawled2 = CrawledPage::create([
            'project_id' => $project2->id,
            'organization_id' => $org2->id,
            'url' => 'https://example.com/org2',
            'domain' => 'example.com',
            'source' => 'crawler',
        ]);

        // 1. Simula sessão da Org 1
        session(['current_organization_id' => $org1->id]);

        $scopedProjects = Project::all();
        $this->assertCount(1, $scopedProjects);
        $this->assertEquals($project1->id, $scopedProjects->first()->id);

        $scopedPages = CrawledPage::all();
        $this->assertCount(1, $scopedPages);
        $this->assertEquals($crawled1->id, $scopedPages->first()->id);

        // 2. Simula sessão da Org 2
        session(['current_organization_id' => $org2->id]);

        $scopedProjects2 = Project::all();
        $this->assertCount(1, $scopedProjects2);
        $this->assertEquals($project2->id, $scopedProjects2->first()->id);

        $scopedPages2 = CrawledPage::all();
        $this->assertCount(1, $scopedPages2);
        $this->assertEquals($crawled2->id, $scopedPages2->first()->id);
    }
}
