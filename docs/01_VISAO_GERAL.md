# Visão Geral

## Problema

Criar datasets para LLM a partir de páginas web exige coleta controlada, extração de texto, limpeza, deduplicação, rastreabilidade de origem e exportação em formato utilizável.

## Solução

O projeto implementa um SaaS Laravel + Inertia + React para cadastrar projetos, autorizar domínios, executar crawlers, gerar documentos e chunks, exportar JSONL e receber capturas manuais por uma extensão de navegador.

## Público-Alvo

| Público | Necessidade |
|---|---|
| Desenvolvedores de produtos com LLM | Gerar datasets rastreáveis para RAG, fine-tuning ou avaliação |
| Times de dados | Coletar e normalizar conteúdo web autorizado |
| Equipes de conteúdo | Capturar páginas específicas via extensão |

## Proposta de Valor

| Valor | Descrição |
|---|---|
| Coleta controlada | Crawling limitado por domínio, paths, profundidade e quantidade de páginas |
| Dataset pronto para uso | Exportação de documentos e chunks em JSONL |
| Rastreabilidade | Documentos e chunks preservam URL, projeto, origem e hash |
| Menor atrito | Fluxos web e captura via extensão compartilham o mesmo backend |

## Escopo Atual Encontrado no Código

| Item | Status | Evidência no Repositório |
|---|---|---|
| Cadastro e autenticação de usuários | Existente | `routes/auth.php`, `app/Http/Controllers/Auth/`, `resources/js/Pages/Auth/` |
| Projetos por usuário | Existente | `projects` migration, `ProjectController`, `ProjectPolicy` |
| Domínios autorizados | Existente | `domains` migration, `DomainController`, `SimpleUrlScopeValidator` |
| Jobs de crawling | Existente | `crawl_jobs` migration, `RunCrawlJob`, `RunCrawlJobAction` |
| Extração e limpeza de texto | Existente | `SimpleHtmlTextExtractor`, `SimpleTextCleaner` |
| Documentos e chunks | Existente | `Document`, `Chunk`, `GenerateChunksForDocumentAction` |
| Deduplicação por hash | Existente | `CreateDocumentFromCrawledPageAction`, `Sha256ContentHasher` |
| Exportação JSONL | Existente | `DatasetExportController`, `JsonlDatasetExporter` |
| API e extensão de navegador | Parcial | `routes/api.php`, `ExtensionCaptureController`, `browser-extension/` |

## Escopo Planejado

| Item | Status |
|---|---|
| Organizações/multi-tenant por organização | Planejado, mas não encontrado no código atual |
| Revisão/aprovação de documentos | Planejado, mas não encontrado no código atual |
| Auditoria estruturada | Planejado, mas não encontrado no código atual |
| Relatórios avançados | Planejado, mas não encontrado no código atual |
| Integração direta com LLM | Planejado, mas não encontrado no código atual |
