<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\User;
use App\Models\OrganizationInvitation;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Log;

class OrganizationController extends Controller
{
    public function members(Request $request)
    {
        $organization = $request->get('current_organization');

        if (!$organization) {
            return redirect()->route('dashboard');
        }

        $members = $organization->users()
            ->select('users.id', 'users.name', 'users.email')
            ->get()
            ->map(function ($user) {
                return [
                    'id' => $user->id,
                    'name' => $user->name,
                    'email' => $user->email,
                    'role' => $user->pivot->role,
                ];
            });

        $invitations = $organization->invitations()
            ->select('id', 'email', 'role', 'token', 'created_at')
            ->latest()
            ->get()
            ->map(function ($invite) {
                return [
                    'id' => $invite->id,
                    'email' => $invite->email,
                    'role' => $invite->role,
                    'accept_url' => $invite->accept_url,
                    'created_at' => $invite->created_at->toIso8601String(),
                ];
            });

        return Inertia::render('Settings/Team', [
            'organization' => [
                'name' => $organization->name,
                'slug' => $organization->slug,
            ],
            'members' => $members,
            'invitations' => $invitations,
        ]);
    }

    public function addMember(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'role' => 'required|in:admin,member',
        ]);

        $organization = $request->get('current_organization');
        
        // Verificar se já é membro
        $user = User::where('email', $request->email)->first();
        if ($user && $organization->users()->where('user_id', $user->id)->exists()) {
            return back()->withErrors(['email' => 'Este usuário já é membro desta organização.']);
        }

        // Verificar se já tem convite pendente
        if ($organization->invitations()->where('email', $request->email)->exists()) {
            return back()->withErrors(['email' => 'Já existe um convite pendente para este e-mail nesta organização.']);
        }

        // Criar convite
        $token = Str::random(40);
        $organization->invitations()->create([
            'email' => $request->email,
            'role' => $request->role,
            'token' => $token,
        ]);

        // Registrar log com a URL (em produção seria enviado um e-mail real)
        Log::info("Convite de organização enviado para {$request->email}. URL: " . route('settings.team.accept_invite', ['token' => $token]));

        return back()->with('success', 'Convite enviado com sucesso.');
    }

    public function removeMember(Request $request, User $user)
    {
        $organization = $request->get('current_organization');

        if ($user->id === $organization->owner_id) {
            return back()->with('error', 'Não é possível remover o dono da organização.');
        }

        $organization->users()->detach($user->id);

        return back()->with('success', 'Membro removido com sucesso.');
    }

    public function cancelInvitation(Request $request, OrganizationInvitation $invitation)
    {
        $organization = $request->get('current_organization');

        if ($invitation->organization_id !== $organization->id) {
            abort(403);
        }

        $invitation->delete();

        return back()->with('success', 'Convite cancelado com sucesso.');
    }

    public function acceptInvitation(Request $request, $token)
    {
        $invitation = OrganizationInvitation::where('token', $token)->first();

        if (!$invitation) {
            return redirect()->route('dashboard')->with('error', 'Convite inválido ou expirado.');
        }

        if (!$request->user()) {
            // Guardar na sessão e ir para a tela de registro com o token na URL
            session(['invite_token' => $token]);
            return redirect()->route('register', ['invite_token' => $token])->with('info', 'Crie sua conta para aceitar o convite.');
        }

        // Usuário logado
        $user = $request->user();

        // Se já for membro da organização
        if ($user->belongsToOrganization($invitation->organization_id)) {
            $invitation->delete();
            return redirect()->route('dashboard')->with('info', 'Você já pertence a esta organização.');
        }

        // Associar usuário à organização
        $invitation->organization->users()->attach($user->id, ['role' => $invitation->role]);
        $invitation->delete();

        // Atualizar organização ativa na sessão
        session(['current_organization_id' => $invitation->organization_id]);

        return redirect()->route('dashboard')->with('success', "Você se juntou à organização {$invitation->organization->name} com sucesso!");
    }
}
