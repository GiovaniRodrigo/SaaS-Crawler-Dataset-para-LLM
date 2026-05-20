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
        if ($request->user()) {
            $organization = $request->user()->currentOrganization();

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
