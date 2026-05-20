<?php

namespace Tests\Feature;

use App\Models\Project;
use App\Models\User;
use App\Models\Organization;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class OrganizationTenancyTest extends TestCase
{
    use RefreshDatabase;

    public function test_users_can_only_access_projects_within_their_organizations(): void
    {
        // 1. Criar Usuários
        $userA = User::factory()->create();
        $userB = User::factory()->create();

        // 2. Criar Organizações
        $orgA = Organization::create([
            'name' => 'Org A',
            'slug' => 'org-a',
            'owner_id' => $userA->id
        ]);
        $userA->organizations()->attach($orgA->id, ['role' => 'owner']);

        $orgB = Organization::create([
            'name' => 'Org B',
            'slug' => 'org-b',
            'owner_id' => $userB->id
        ]);
        $userB->organizations()->attach($orgB->id, ['role' => 'owner']);

        // 3. Criar Projetos
        $projectA = Project::factory()->create([
            'user_id' => $userA->id,
            'organization_id' => $orgA->id
        ]);

        $projectB = Project::factory()->create([
            'user_id' => $userB->id,
            'organization_id' => $orgB->id
        ]);

        // 4. Usuário A acessando Projeto A (Sucesso)
        $responseA = $this->actingAs($userA)
            ->get(route('projects.show', $projectA));
        $responseA->assertStatus(200);

        // 5. Usuário A acessando Projeto B (Não encontrado/404 devido ao Global Scope de Tenancy)
        $responseB = $this->actingAs($userA)
            ->get(route('projects.show', $projectB));
        $responseB->assertStatus(404);

        // 6. Adicionar Usuário B à Org A como membro
        $orgA->users()->attach($userB->id, ['role' => 'member']);

        // 7. Usuário B acessando Projeto A (Sucesso após se juntar à organização)
        $responseC = $this->actingAs($userB)
            ->get(route('projects.show', $projectA));
        $responseC->assertStatus(200);
    }
}
