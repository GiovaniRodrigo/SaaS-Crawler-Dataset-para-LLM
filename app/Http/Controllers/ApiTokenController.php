<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;

class ApiTokenController extends Controller
{
    public function index(Request $request)
    {
        return Inertia::render('Settings/ApiTokens', [
            'tokens' => $request->user()->tokens->map(function ($token) {
                return [
                    'id' => $token->id,
                    'name' => $token->name,
                    'last_used_at' => $token->last_used_at ? $token->last_used_at->diffForHumans() : 'Nunca usado',
                    'created_at' => $token->created_at->format('d/m/Y H:i'),
                ];
            }),
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
        ]);

        $token = $request->user()->createToken($request->name);

        return redirect()->back()->with('flash', [
            'token' => $token->plainTextToken,
        ]);
    }

    public function destroy(Request $request, $id)
    {
        $request->user()->tokens()->where('id', $id)->delete();

        return redirect()->back()->with('success', 'Token removido com sucesso.');
    }
}
