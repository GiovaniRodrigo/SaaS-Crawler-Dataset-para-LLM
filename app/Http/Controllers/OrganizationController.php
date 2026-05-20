<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\User;

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

        return Inertia::render('Settings/Team', [
            'organization' => [
                'name' => $organization->name,
                'slug' => $organization->slug,
            ],
            'members' => $members
        ]);
    }

    public function addMember(Request $request)
    {
        $request->validate([
            'email' => 'required|email|exists:users,email',
            'role' => 'required|in:admin,member',
        ]);

        $organization = $request->get('current_organization');
        $user = User::where('email', $request->email)->first();

        if ($organization->users()->where('user_id', $user->id)->exists()) {
            return back()->with('error', 'Usuário já é membro desta organização.');
        }

        $organization->users()->attach($user->id, ['role' => $request->role]);

        return back()->with('success', 'Membro adicionado com sucesso.');
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
}
