<?php

namespace Tests\Feature;

use App\Models\Project;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;
use Inertia\Testing\AssertableInertia as Assert;

class ProjectsTest extends TestCase
{
    use RefreshDatabase;

    public function test_projects_index_page_is_rendered_with_projects(): void
    {
        $user = User::factory()->create();
        $organization = \App\Models\Organization::create([
            'name' => 'Test Org',
            'slug' => 'test-org',
            'owner_id' => $user->id
        ]);
        $user->organizations()->attach($organization->id, ['role' => 'owner']);

        Project::factory()->count(3)->create([
            'user_id' => $user->id,
            'organization_id' => $organization->id
        ]);

        $response = $this->actingAs($user)
            ->get('/projects');

        $response->assertStatus(200);
        $response->assertInertia(fn (Assert $page) => $page
            ->component('Projects/Index')
            ->has('projects', 3)
        );
    }

    public function test_can_view_project_details(): void
    {
        $user = User::factory()->create();
        $organization = \App\Models\Organization::create([
            'name' => 'Test Org',
            'slug' => 'test-org',
            'owner_id' => $user->id
        ]);
        $user->organizations()->attach($organization->id, ['role' => 'owner']);

        $project = Project::factory()->create([
            'user_id' => $user->id,
            'organization_id' => $organization->id
        ]);

        $response = $this->actingAs($user)
            ->get("/projects/{$project->id}");

        $response->assertStatus(200);
        $response->assertInertia(fn (Assert $page) => $page
            ->component('Projects/Show')
            ->has('project', fn (Assert $page) => $page
                ->where('id', $project->id)
                ->where('name', $project->name)
                ->etc()
            )
        );
    }
}
