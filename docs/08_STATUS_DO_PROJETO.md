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
| Documentos | DONE | `DocumentController`, `CreateDocumentFromCrawledPageAction` | Geração a partir de crawler/extensão |
| Chunks | DONE | `SimpleChunker`, `ChunkController` | Chunking simples |
| Exportação JSONL | DONE | `JsonlDatasetExporter` | Documents e chunks |
| Extensão | PARTIAL | `browser-extension/`, `ExtensionCaptureController` | Estrutura simples local |
| Multi-tenant por organização | TODO | Não identificado no repositório atual | Hoje o isolamento é por usuário |
| Revisão de conteúdo | TODO | Não identificado no repositório atual | Exporta sem aprovação |
| Auditoria | TODO | Não identificado no repositório atual | Apenas logs técnicos pontuais |
| Relatórios | TODO | Não identificado no repositório atual | Há contadores básicos no projeto/job |
| Integração LLM | TODO | Não identificado no repositório atual | Fora do código atual |

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
| Exportação de documentos JSONL | DONE | `exportDocuments()` |
| Exportação de chunks JSONL | DONE | `exportChunks()` |
| Token para extensão | PARTIAL | Sanctum configurado, mas tela de emissão de token não identificada |
