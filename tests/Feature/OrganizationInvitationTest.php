<?php

namespace Tests\Feature;

use App\Models\User;
use App\Models\Organization;
use App\Models\OrganizationInvitation;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Str;
use Tests\TestCase;

class OrganizationInvitationTest extends TestCase
{
    use RefreshDatabase;

    public function test_owner_can_invite_member_and_view_in_list(): void
    {
        $user = User::factory()->create();
        $org = Organization::create([
            'name' => 'Acme Org',
            'slug' => 'acme-org',
            'owner_id' => $user->id
        ]);
        $user->organizations()->attach($org->id, ['role' => 'owner']);

        $response = $this->actingAs($user)
            ->post(route('settings.team.add'), [
                'email' => 'colleague@example.com',
                'role' => 'member',
            ]);

        $response->assertRedirect();
        $this->assertDatabaseHas('organization_invitations', [
            'organization_id' => $org->id,
            'email' => 'colleague@example.com',
            'role' => 'member',
        ]);

        $listResponse = $this->actingAs($user)->get(route('settings.team'));
        $listResponse->assertStatus(200);
        $listResponse->assertSee('colleague@example.com');
    }

    public function test_cannot_invite_existing_member_or_duplicate_invitation(): void
    {
        $user = User::factory()->create();
        $org = Organization::create([
            'name' => 'Acme Org',
            'slug' => 'acme-org',
            'owner_id' => $user->id
        ]);
        $user->organizations()->attach($org->id, ['role' => 'owner']);

        // Convidar uma vez (Sucesso)
        $this->actingAs($user)->post(route('settings.team.add'), [
            'email' => 'duplicate@example.com',
            'role' => 'member',
        ]);

        // Convidar denovo (Falha de validação)
        $duplicateResponse = $this->actingAs($user)->post(route('settings.team.add'), [
            'email' => 'duplicate@example.com',
            'role' => 'member',
        ]);
        $duplicateResponse->assertSessionHasErrors('email');

        // Convidar o próprio dono (Falha de validação)
        $ownerInviteResponse = $this->actingAs($user)->post(route('settings.team.add'), [
            'email' => $user->email,
            'role' => 'member',
        ]);
        $ownerInviteResponse->assertSessionHasErrors('email');
    }

    public function test_owner_can_cancel_invitation(): void
    {
        $user = User::factory()->create();
        $org = Organization::create([
            'name' => 'Acme Org',
            'slug' => 'acme-org',
            'owner_id' => $user->id
        ]);
        $user->organizations()->attach($org->id, ['role' => 'owner']);

        $invitation = $org->invitations()->create([
            'email' => 'cancel@example.com',
            'role' => 'member',
            'token' => Str::random(40),
        ]);

        $response = $this->actingAs($user)
            ->delete(route('settings.team.cancel_invite', $invitation));

        $response->assertRedirect();
        $this->assertDatabaseMissing('organization_invitations', [
            'id' => $invitation->id,
        ]);
    }

    public function test_guest_is_redirected_to_register_and_joined_after_registration(): void
    {
        $user = User::factory()->create();
        $org = Organization::create([
            'name' => 'Acme Org',
            'slug' => 'acme-org',
            'owner_id' => $user->id
        ]);
        $user->organizations()->attach($org->id, ['role' => 'owner']);

        $invitation = $org->invitations()->create([
            'email' => 'newuser@example.com',
            'role' => 'member',
            'token' => 'test-invitation-token',
        ]);

        // 1. Visitante acessa o link do convite
        $acceptResponse = $this->get(route('settings.team.accept_invite', 'test-invitation-token'));
        $acceptResponse->assertRedirect(route('register', ['invite_token' => 'test-invitation-token']));
        $this->assertEquals('test-invitation-token', session('invite_token'));

        // 2. Visitante faz registro
        $registerResponse = $this->post(route('register'), [
            'name' => 'New Colleague',
            'email' => 'newuser@example.com',
            'password' => 'password123',
            'password_confirmation' => 'password123',
            'invite_token' => 'test-invitation-token',
        ]);

        $registerResponse->assertRedirect(route('dashboard'));

        // 3. Fazer requisição GET ao dashboard (como o novo usuário) para disparar o middleware
        $newUser = User::where('email', 'newuser@example.com')->first();
        $this->actingAs($newUser)->get(route('dashboard'));

        // 4. Verificar se o usuário foi associado à organização
        $this->assertNotNull($newUser);
        $this->assertTrue($newUser->belongsToOrganization($org->id));
        $this->assertDatabaseMissing('organization_invitations', [
            'id' => $invitation->id,
        ]);
    }

    public function test_authenticated_user_can_accept_invitation_directly(): void
    {
        $user = User::factory()->create();
        $org = Organization::create([
            'name' => 'Acme Org',
            'slug' => 'acme-org',
            'owner_id' => $user->id
        ]);
        $user->organizations()->attach($org->id, ['role' => 'owner']);

        $invitation = $org->invitations()->create([
            'email' => 'colleague@example.com',
            'role' => 'admin',
            'token' => 'another-test-token',
        ]);

        $invitedUser = User::factory()->create(['email' => 'colleague@example.com']);

        $response = $this->actingAs($invitedUser)
            ->get(route('settings.team.accept_invite', 'another-test-token'));

        $response->assertRedirect(route('dashboard'));
        $this->assertTrue($invitedUser->belongsToOrganization($org->id));
        
        // Verificar que o role atribuído foi 'admin' (conforme convite)
        $this->assertEquals('admin', $org->users()->where('users.id', $invitedUser->id)->first()->pivot->role);
        
        $this->assertDatabaseMissing('organization_invitations', [
            'id' => $invitation->id,
        ]);
    }
}
