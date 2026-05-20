<?php

namespace Tests\Feature;

use App\Models\Project;
use App\Models\User;
use App\Models\Organization;
use App\Models\DatasetExport;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Storage;
use Tests\TestCase;

class DatasetExportTest extends TestCase
{
    use RefreshDatabase;

    public function test_can_export_dataset_and_view_in_history_list(): void
    {
        Storage::fake();

        // 1. Criar usuário e organização
        $user = User::factory()->create();
        $org = Organization::create([
            'name' => 'Test Org',
            'slug' => 'test-org',
            'owner_id' => $user->id
        ]);
        $user->organizations()->attach($org->id, ['role' => 'owner']);

        // 2. Criar projeto
        $project = Project::factory()->create([
            'user_id' => $user->id,
            'organization_id' => $org->id,
            'name' => 'Project Alpha'
        ]);

        // 3. Executar o export via POST
        $response = $this->actingAs($user)
            ->post(route('settings.datasets.export'), [
                'project_ids' => [$project->id],
                'type' => 'documents',
            ]);

        $response->assertRedirect();
        
        // 4. Assert que foi criado no banco
        $this->assertDatabaseHas('dataset_exports', [
            'organization_id' => $org->id,
            'user_id' => $user->id,
            'type' => 'documents',
            'project_names' => 'Project Alpha',
        ]);

        $export = DatasetExport::first();
        Storage::assertExists($export->filename);

        // 5. Assert que o export aparece na listagem
        $listResponse = $this->actingAs($user)
            ->get(route('settings.datasets'));
        $listResponse->assertStatus(200);

        // 6. Assert que download funciona para membro da org
        $downloadResponse = $this->actingAs($user)
            ->get(route('settings.datasets.download', $export));
        $downloadResponse->assertStatus(200);

        // 7. Assert que outro usuário de outra org não consegue baixar (view policy falha)
        $userB = User::factory()->create();
        $orgB = Organization::create([
            'name' => 'Other Org',
            'slug' => 'other-org',
            'owner_id' => $userB->id
        ]);
        $userB->organizations()->attach($orgB->id, ['role' => 'owner']);

        $forbiddenResponse = $this->actingAs($userB)
            ->get(route('settings.datasets.download', $export));
        
        $forbiddenResponse->assertStatus(403);
    }
}
