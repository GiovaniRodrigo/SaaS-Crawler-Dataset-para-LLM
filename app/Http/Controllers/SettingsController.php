<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class SettingsController extends Controller
{
    public function reports()
    {
        return Inertia::render('Settings/Placeholder', [
            'title' => 'Relatórios Avançados',
            'description' => 'Visualize estatísticas detalhadas sobre o crescimento do seu dataset e performance do crawler.'
        ]);
    }

    public function integrations()
    {
        return Inertia::render('Settings/Placeholder', [
            'title' => 'Integrações',
            'description' => 'Conecte o CrawlMind ao seu pipeline de dados (S3, Snowflake) ou ferramentas de IA (OpenAI, Anthropic).'
        ]);
    }

    public function audit(Request $request)
    {
        $logs = \App\Models\AuditLog::where('user_id', $request->user()->id)
            ->with('project')
            ->latest()
            ->paginate(20);

        return Inertia::render('Settings/Audit', [
            'logs' => $logs
        ]);
    }

    public function billing()
    {
        return Inertia::render('Settings/Placeholder', [
            'title' => 'Plano e Faturamento',
            'description' => 'Gerencie sua assinatura, visualize faturas e altere seus métodos de pagamento.'
        ]);
    }

    public function general()
    {
        return Inertia::render('Settings/Placeholder', [
            'title' => 'Configurações Gerais',
            'description' => 'Ajuste as preferências da sua organização, membros da equipe e chaves de API globais.'
        ]);
    }

    public function datasets()
    {
        return Inertia::render('Settings/Placeholder', [
            'title' => 'Gerenciador de Datasets',
            'description' => 'Combine documentos de múltiplos projetos em datasets unificados para treinamento de LLMs.'
        ]);
    }
}
