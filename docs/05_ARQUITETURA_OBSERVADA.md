# Arquitetura Observada

## Stack Identificada

| Camada | Tecnologia | Evidência |
|---|---|---|
| Backend | PHP 8.3, Laravel 13.x | `composer.json` |
| SPA server-driven | Inertia Laravel | `composer.json`, `routes/web.php` |
| Frontend | React 18, TypeScript, Inertia React | `package.json`, `resources/js/` |
| Build | Vite 7 | `package.json`, `vite.config.js` |
| CSS | Tailwind CSS | `package.json`, `resources/css/app.css` |
| API token | Laravel Sanctum | `composer.json`, `routes/api.php` |
| Banco local | SQLite | `database/database.sqlite`, `config/database.php` |
| Fila | Laravel Queue | `jobs` migration, `RunCrawlJob` |

## Arquitetura Existente

### Backend

| Item | Local | Observação |
|---|---|---|
| Rotas web | `routes/web.php` | Páginas Inertia e ações autenticadas |
| Rotas API | `routes/api.php` | Endpoints Sanctum da extensão |
| Controllers | `app/Http/Controllers/` | Orquestram requests, policies, actions e responses |
| Requests | `app/Http/Requests/` | Validam projetos, domínios, jobs e capturas |
| Actions | `app/Actions/` | Encapsulam casos de uso |
| Services | `app/Services/` | Implementações de crawling, texto e dataset |
| Contracts | `app/Contracts/` | Interfaces para serviços principais |
| Policies | `app/Policies/` | Autorização por dono do projeto |
| Job | `app/Jobs/RunCrawlJob.php` | Execução assíncrona do crawler |

### Frontend

| Item | Local | Observação |
|---|---|---|
| App Inertia | `resources/js/app.tsx` | Entrada React/Inertia |
| Layout autenticado | `resources/js/Layouts/AuthenticatedLayout.tsx` | Navegação de usuário autenticado |
| Páginas | `resources/js/Pages/` | Auth, projetos, crawl jobs, documentos, chunks e perfil |
| Componentes | `resources/js/Components/` | Componentes base e `atoms/Card.tsx` |
| Tipos | `resources/js/Types/`, `resources/js/types/` | Tipos globais e de projeto |

## Organização de Código

| Pasta | Responsabilidade |
|---|---|
| `app/Actions/` | Casos de uso de negócio |
| `app/Contracts/` | Abstrações dos serviços |
| `app/Http/Controllers/` | Entrada HTTP web/API |
| `app/Http/Requests/` | Validação de entrada |
| `app/Models/` | Entidades Eloquent |
| `app/Policies/` | Regras de autorização |
| `app/Services/` | Implementações técnicas |
| `browser-extension/` | Extensão Manifest V3 simples |
| `database/migrations/` | Estrutura de banco |
| `resources/js/` | Frontend React/Inertia |
| `tests/` | Testes automatizados |

## Padrões Observados

| Padrão | Evidência | Comentário |
|---|---|---|
| Actions | `CreateProjectAction`, `RunCrawlJobAction` | Mantém controllers menores |
| Contracts + Services | `AppServiceProvider` faz binds de interfaces | Facilita troca de implementações |
| Policies | `ProjectPolicy`, `DocumentPolicy`, `ChunkPolicy` | Isolamento atual por usuário |
| Form Requests | `StoreCrawlJobRequest`, `StoreExtensionCaptureRequest` | Validação separada |
| Inertia Pages | `resources/js/Pages/*` | Frontend acoplado às rotas web Laravel |

## Pontos de Atenção

| Ponto | Risco | Recomendação |
|---|---|---|
| Multi-tenant por organização ausente | Dados hoje são isolados por usuário, não por organização | Definir modelo `Organization` antes de colaboração entre usuários |
| Crawler simples | Regex para links e fetch simples podem falhar em sites complexos | Evoluir após MVP com parser mais robusto e políticas de rate limit |
| Revisão ausente | Exportação inclui todos os documentos/chunks do projeto | Adicionar status de revisão antes de datasets críticos |
| Auditoria ausente | Ações sensíveis não têm trilha dedicada | Adicionar logs/auditoria antes de uso multiusuário |

## Arquitetura Recomendada Futuramente

| Item | Recomendação |
|---|---|
| Tenancy | Introduzir organizações, memberships e escopos por `organization_id` |
| Revisão | Adicionar estados em documentos/chunks ou tabela de revisão |
| Crawler | Adicionar politeness, robots.txt, retries, rate limit e parser HTML dedicado |
| Dataset | Versionar exports e salvar metadados do arquivo gerado |
| Extensão | Criar tela de configuração de token e tratamento de ambiente/API base |
