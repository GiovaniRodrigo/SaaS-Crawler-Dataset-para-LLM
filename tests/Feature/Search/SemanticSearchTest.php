<?php

namespace Tests\Feature\Search;

use App\Models\Project;
use App\Models\User;
use App\Contracts\Search\SemanticSearchInterface;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;
use Mockery\MockInterface;
use Illuminate\Support\Facades\Gate;

class SemanticSearchTest extends TestCase
{
    use RefreshDatabase;
    use \Illuminate\Foundation\Testing\WithoutMiddleware;

    public function test_semantic_search_validates_query()
    {
        $user = User::factory()->create();
        $project = Project::factory()->create(['user_id' => $user->id]);

        $response = $this->actingAs($user)->post(route('projects.semantic-search', $project->id), [
            'query' => 'ab' // too short
        ]);

        $response->assertSessionHasErrors('query');
    }

    public function test_semantic_search_calls_service_and_flashes_results()
    {
        $user = User::factory()->create();
        $project = Project::factory()->create(['user_id' => $user->id]);
        
        // Ensure the policy passes with WithoutMiddleware
        Gate::define('view', function ($u, $p) use ($user, $project) {
            return $u->id === $user->id && $p->id === $project->id;
        });

        $mockResults = [
            ['chunk_id' => 1, 'content' => 'Result 1', 'similarity' => 0.9]
        ];

        $this->mock(SemanticSearchInterface::class, function (MockInterface $mock) use ($user, $project, $mockResults) {
            $mock->shouldReceive('search')
                ->once()
                ->with($user->id, $project->id, 'how to test', 10)
                ->andReturn($mockResults);
        });

        $response = $this->actingAs($user)->post(route('projects.semantic-search', $project->id), [
            'query' => 'how to test',
            'limit' => 10
        ]);

        $response->assertRedirect();
        $response->assertSessionHas('semanticSearchResults', $mockResults);
    }
}
