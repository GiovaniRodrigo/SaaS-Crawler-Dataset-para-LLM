# Status do Projeto

## Legenda

| Status | Significado |
|---|---|
| DONE | Implementado |
| PARTIAL | Implementado parcialmente |
| TODO | Ainda não implementado |
| BLOCKED | Bloqueado |
| UNKNOWN | Não foi possível identificar |

## Status por Módulo

| Módulo | Status | Evidência | Observação |
|---|---|---|---|
| Autenticação | DONE | `routes/auth.php` | Base Breeze |
| Projetos | DONE | `ProjectController`, páginas `Projects/` | CRUD principal presente |
| Domínios | DONE | `DomainController`, `domains` migration | Cadastro e remoção presentes |
| Crawling | DONE | `RunCrawlJobAction`, `RunCrawlJob` | MVP funcional |
| Documentos | DONE | `DocumentController`, `ReviewController` | Com sistema de **Qualidade** e **Revisão** |
| Chunks | DONE | `SimpleChunker`, `ChunkController` | Chunking simples |
| Exportação JSONL | DONE | `JsonlDatasetExporter` | Apenas documentos **aprovados** |
| Extensão | DONE | `browser-extension/`, `ApiTokenController` | Funcional com gestão de tokens |
| Multi-tenant por organização | TODO | Planejado para Milestone 3 | Hoje o isolamento é por usuário |
| Revisão de conteúdo | DONE | `ReviewController`, `resources/js/Pages/Review` | Aprovação em massa e scores |
| Auditoria | DONE | `AuditLog` model, `LogAuditAction` | Rastreamento de ações críticas |
| Relatórios | PARTIAL | `DashboardController` | Dashboard dinâmico com métricas reais |
| Integração LLM | TODO | Planejado para Milestone 4 | Fora do código atual |

## Status por Funcionalidade

| Funcionalidade | Status | Evidência |
|---|---|---|
| Registro/login/logout | DONE | `routes/auth.php` |
| CRUD de projeto | DONE | `Route::resource('projects', ProjectController::class)` |
| Domínio com subdomínios opcionais | DONE | `allow_subdomains` em migration/model/request |
| Seed URLs, allow/deny paths | DONE | `StoreCrawlJobRequest`, `crawl_jobs` migration |
| Fila de crawler | DONE | `RunCrawlJob::dispatch($crawlJob)` |
| Extração de links | PARTIAL | Regex em `RunCrawlJobAction` |
| Extração de conteúdo principal | PARTIAL | Busca `main`, `article` ou `body` |
| Deduplicação | DONE | `content_hash` por projeto |
| Exportação de documentos JSONL | DONE | `exportDocuments()` | Apenas aprovados |
| Exportação de chunks JSONL | DONE | `exportChunks()` | |
| Token para extensão | DONE | `ApiTokenController` e tela em Configurações |
| Branding CrawlMind | DONE | UI completa refinada |
