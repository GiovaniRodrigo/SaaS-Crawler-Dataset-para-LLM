# Mapa do Repositório

## Estrutura Principal

| Caminho | Responsabilidade |
|---|---|
| `app/` | Código backend Laravel |
| `bootstrap/` | Bootstrap da aplicação |
| `browser-extension/` | Extensão de navegador Manifest V3 |
| `config/` | Configurações Laravel |
| `database/` | Migrations, seeders, factories e SQLite local |
| `public/` | Entrada pública da aplicação |
| `resources/` | CSS, views Blade e frontend React |
| `routes/` | Rotas web, API, auth e console |
| `tests/` | Testes automatizados |
| `docs/` | Documentação do projeto |

## Backend

| Caminho | Descrição |
|---|---|
| `app/Models/` | `User`, `Project`, `Domain`, `CrawlJob`, `CrawledPage`, `Document`, `Chunk` |
| `app/Http/Controllers/` | Controllers web/API do produto |
| `app/Http/Requests/` | Validações de entrada |
| `app/Actions/` | Casos de uso de projetos, domínios, crawling, documentos, chunks e exportações |
| `app/Services/` | Implementações de crawler, processamento de texto e dataset |
| `app/Contracts/` | Interfaces dos services |
| `app/Policies/` | Autorização por dono do projeto |
| `app/Jobs/` | Job assíncrono de crawling |

## Frontend

| Caminho | Descrição |
|---|---|
| `resources/js/Pages/Auth/` | Login, registro, senha e verificação |
| `resources/js/Pages/Projects/` | Listagem, criação e detalhe de projetos |
| `resources/js/Pages/CrawlJobs/` | Criação e visualização de jobs |
| `resources/js/Pages/Documents/` | Listagem e detalhe de documentos |
| `resources/js/Pages/Chunks/` | Listagem de chunks |
| `resources/js/Components/` | Componentes reutilizáveis |
| `resources/js/Layouts/` | Layouts Inertia |

## Banco de Dados

| Caminho | Descrição |
|---|---|
| `database/migrations/*users*` | Usuários, sessões e reset de senha |
| `database/migrations/*projects*` | Projetos por usuário |
| `database/migrations/*domains*` | Domínios autorizados |
| `database/migrations/*crawl_jobs*` | Jobs e escopo de crawling |
| `database/migrations/*crawled_pages*` | Páginas coletadas |
| `database/migrations/*documents*` | Documentos extraídos |
| `database/migrations/*chunks*` | Chunks para dataset |
| `database/migrations/*personal_access_tokens*` | Tokens Sanctum |

## Testes

| Caminho | Descrição |
|---|---|
| `tests/Feature/Auth/` | Testes de autenticação Breeze |
| `tests/Feature/ProfileTest.php` | Testes de perfil |
| `tests/Feature/ExampleTest.php` | Teste de exemplo |
| `tests/Unit/ExampleTest.php` | Teste unitário de exemplo |

## Documentação

| Caminho | Descrição |
|---|---|
| `README.md` | Resumo principal do projeto |
| `docs/00_INDEX.md` | Índice da documentação |
| `docs/01_VISAO_GERAL.md` a `docs/10_PENDENCIAS_E_RISCOS.md` | Documentação objetiva do produto, arquitetura e evolução |
