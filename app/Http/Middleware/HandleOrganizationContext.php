<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class HandleOrganizationContext
{
    /**
     * Handle an incoming request.
     *
     * @param  Closure(Request): (Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        // Se houver invite_token na requisição (query ou post), armazena na sessão
        if ($request->has('invite_token')) {
            session(['invite_token' => $request->input('invite_token')]);
        }

        if ($request->user()) {
            // Processar convite pendente na sessão pós-autenticação
            if (session()->has('invite_token')) {
                $token = session()->pull('invite_token');
                $invitation = \App\Models\OrganizationInvitation::where('token', $token)->first();
                if ($invitation) {
                    if (!$request->user()->belongsToOrganization($invitation->organization_id)) {
                        $invitation->organization->users()->attach($request->user()->id, ['role' => $invitation->role]);
                    }
                    session(['current_organization_id' => $invitation->organization_id]);
                    $invitation->delete();
                }
            }

            // Priorizar a organização armazenada na sessão
            $organization = null;
            if (session()->has('current_organization_id')) {
                $organization = $request->user()->organizations()
                    ->where('organizations.id', session('current_organization_id'))
                    ->first();
            }

            if (!$organization) {
                $organization = $request->user()->currentOrganization();
            }

            // Se não tiver organização, cria uma padrão para manter o sistema funcionando
            if (!$organization) {
                $organization = \App\Models\Organization::create([
                    'name' => $request->user()->name . "'s Team",
                    'slug' => \Illuminate\Support\Str::slug($request->user()->name . "-team-" . $request->user()->id),
                    'owner_id' => $request->user()->id,
                ]);
                $request->user()->organizations()->attach($organization->id, ['role' => 'owner']);
            }

            // Armazena na sessão para o Global Scope
            session(['current_organization_id' => $organization->id]);

            // Compartilha com o Frontend (Inertia)
            \Inertia\Inertia::share('auth.organization', [
                'id' => $organization->id,
                'name' => $organization->name,
                'slug' => $organization->slug,
                'role' => $organization->pivot?->role ?? 'owner',
            ]);

            // Define o contexto global no request para uso nos controllers
            $request->merge(['current_organization' => $organization]);
        }

        return $next($request);
    }
}
