<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Organization;
use App\Models\Project;
use App\Models\Domain;
use App\Models\CrawlJob;
use App\Models\Document;
use App\Models\Chunk;
use App\Models\DatasetExport;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Storage;

class DemoDatasetSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $usersToCreate = [
            [
                'email' => 'admin@datacrawl.com.br',
                'name' => 'CrawlMind Admin (Starter)',
                'plan' => 'starter',
                'org_name' => 'CrawlMind Starter Org',
                'org_slug' => 'crawlmind-starter-org',
            ],
            [
                'email' => 'starter@datacrawl.com.br',
                'name' => 'CrawlMind Starter User',
                'plan' => 'starter',
                'org_name' => 'CrawlMind Starter Test Org',
                'org_slug' => 'crawlmind-starter-test-org',
            ],
            [
                'email' => 'pro@datacrawl.com.br',
                'name' => 'CrawlMind Pro User',
                'plan' => 'pro',
                'org_name' => 'CrawlMind Pro Org',
                'org_slug' => 'crawlmind-pro-org',
            ],
            [
                'email' => 'enterprise@datacrawl.com.br',
                'name' => 'CrawlMind Enterprise User',
                'plan' => 'enterprise',
                'org_name' => 'CrawlMind Enterprise Org',
                'org_slug' => 'crawlmind-enterprise-org',
            ],
        ];

        foreach ($usersToCreate as $u) {
            // 1. Localizar ou criar o usuário
            $user = User::firstOrCreate(
                ['email' => $u['email']],
                [
                    'name' => $u['name'],
                    'password' => bcrypt('password'),
                    'email_verified_at' => now(),
                ]
            );

            // 2. Garantir que o usuário possui a organização correspondente com o plano configurado
            $org = $user->organizations()->where('slug', $u['org_slug'])->first();
            if (!$org) {
                $org = Organization::create([
                    'name' => $u['org_name'],
                    'slug' => $u['org_slug'],
                    'owner_id' => $user->id,
                    'subscription_plan' => $u['plan'],
                    'subscription_status' => 'active',
                ]);
                $user->organizations()->attach($org->id, ['role' => 'owner']);
            } else {
                $org->update([
                    'subscription_plan' => $u['plan'],
                    'subscription_status' => 'active',
                ]);
            }

            // 3. Criar o Projeto de Demonstração para essa organização
            $project = Project::updateOrCreate(
                [
                    'organization_id' => $org->id,
                    'name' => 'Demo: Base de Conhecimento RAG - Laravel & Inertia',
                ],
                [
                    'user_id' => $user->id,
                    'description' => 'Dataset preparado de documentações públicas para treinar chatbots e alimentar sistemas RAG sobre arquiteturas Laravel, Inertia e React.',
                ]
            );

            // 4. Cadastrar Domínios Autorizados
            Domain::updateOrCreate(
                ['project_id' => $project->id, 'domain' => 'laravel.com'],
                ['organization_id' => $org->id, 'allow_subdomains' => true]
            );

            Domain::updateOrCreate(
                ['project_id' => $project->id, 'domain' => 'inertiajs.com'],
                ['organization_id' => $org->id, 'allow_subdomains' => false]
            );

            // 5. Simular um Crawl Job bem-sucedido
            $job = CrawlJob::create([
                'project_id' => $project->id,
                'organization_id' => $org->id,
                'status' => 'completed',
                'seed_urls' => ['https://laravel.com/docs'],
                'allow_paths' => ['/docs/*'],
                'deny_paths' => [],
                'max_depth' => 2,
                'max_pages' => 10,
                'total_discovered' => 12,
                'total_crawled' => 3,
                'total_failed' => 0,
                'total_documents' => 3,
                'total_chunks' => 3,
                'started_at' => now()->subHours(2),
                'finished_at' => now()->subHours(1)->subMinutes(45),
            ]);

            // 6. Criar Documentos Realistas com Textos da Documentação (Aprovados e acima de 300 caracteres)
            $docData = [
                [
                    'url' => 'https://laravel.com/docs/routing',
                    'title' => 'Laravel Routing - Conceitos Básicos e Parâmetros de Rota',
                    'text' => "O roteamento do Laravel aceita uma URI e um fechamento (closure), fornecendo um método simples e expressivo de definir rotas e comportamentos. Os arquivos de rota padrão são carregados automaticamente pelo framework. A maioria das rotas do seu aplicativo será definida no arquivo routes/web.php. Parâmetros de rota podem ser definidos utilizando chaves (ex: {id}) e são injetados automaticamente nos controllers do backend. Você também pode definir restrições de formato utilizando expressões regulares e nomear rotas para fácil geração de URLs nos templates ou redirecionamentos seguros do sistema.",
                    'quality_score' => 95,
                ],
                [
                    'url' => 'https://laravel.com/docs/controllers',
                    'title' => 'Laravel Controllers - Agrupando Lógica de Requisições',
                    'text' => "Em vez de definir toda a lógica de tratamento de requisições como closures em seus arquivos de rotas, você pode desejar organizar esse comportamento usando classes Controller. Os controladores podem agrupar lógica de tratamento de requisições relacionadas em uma única classe. Os controladores são armazenados no diretório app/Http/Controllers. No Laravel, controllers herdam de uma classe base e podem utilizar dependências injetadas pelo container automaticamente no construtor ou métodos. Isso facilita a escrita de códigos testáveis, modulares e focados nas ações de negócio (Single Action Controllers).",
                    'quality_score' => 92,
                ],
                [
                    'url' => 'https://inertiajs.com/routing',
                    'title' => 'Inertia.js - Integração com Roteamento Laravel e Componentes React',
                    'text' => "O Inertia permite que você crie aplicações clássicas renderizadas no lado do servidor utilizando frameworks SPA modernos como React, Vue e Svelte. O roteamento no Inertia funciona exatamente como no Laravel tradicional. Você define suas rotas web no arquivo routes/web.php e retorna respostas Inertia utilizando o helper ou classe facade Inertia::render('NomeDoComponente', [dados]). O Inertia intercepta cliques em links normais e faz uma requisição XHR leve, retornando apenas os dados JSON da página e alterando a URL no histórico do navegador sem recarregar a tela inteira.",
                    'quality_score' => 94,
                ],
            ];

            foreach ($docData as $index => $data) {
                $hash = md5($data['text']);
                
                $document = Document::updateOrCreate(
                    [
                        'project_id' => $project->id,
                        'url' => $data['url'],
                    ],
                    [
                        'organization_id' => $org->id,
                        'crawl_job_id' => $job->id,
                        'title' => $data['title'],
                        'text' => $data['text'],
                        'language' => 'pt',
                        'content_hash' => $hash,
                        'source' => 'crawler',
                        'status' => Document::STATUS_APPROVED,
                        'quality_score' => $data['quality_score'],
                    ]
                );

                // 7. Dividir cada Documento em Chunks
                $paragraphs = explode("\n\n", $data['text']);
                foreach ($paragraphs as $pIndex => $paragraph) {
                    Chunk::updateOrCreate(
                        [
                            'project_id' => $project->id,
                            'document_id' => $document->id,
                            'chunk_index' => $pIndex,
                        ],
                        [
                            'organization_id' => $org->id,
                            'text' => $paragraph,
                            'tokens_estimated' => (int) round(str_word_count($paragraph) * 1.3),
                            'content_hash' => md5($paragraph),
                        ]
                    );
                }
            }

            // 8. Simular um DatasetExport na tabela de histórico
            $filename = 'exports/' . $project->id . '/laravel_react_rag_dataset_' . time() . '.jsonl';
            
            // Escrever um arquivo JSONL fictício básico no storage local para manter o link estável funcionando
            $jsonLines = [];
            foreach ($docData as $data) {
                $jsonLines[] = json_encode([
                    'url' => $data['url'],
                    'title' => $data['title'],
                    'text' => $data['text'],
                    'quality_score' => $data['quality_score'],
                ]);
            }
            Storage::disk('local')->put($filename, implode("\n", $jsonLines));

            DatasetExport::create([
                'organization_id' => $org->id,
                'user_id' => $user->id,
                'type' => 'documents',
                'project_ids' => [$project->id],
                'project_names' => $project->name,
                'filename' => $filename,
                'file_size' => strlen(implode("\n", $jsonLines)),
                'record_count' => count($docData),
            ]);
        }
    }
}
