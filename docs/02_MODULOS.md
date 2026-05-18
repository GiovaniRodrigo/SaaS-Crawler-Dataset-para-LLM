# Módulos do Sistema

## Módulos Encontrados no Código

| Módulo | Descrição | Evidência | Status |
|---|---|---|---|
| Autenticação | Login, registro, reset de senha e verificação de e-mail | `routes/auth.php`, `resources/js/Pages/Auth/` | Existente |
| Perfil | Edição e exclusão de perfil | `ProfileController`, `resources/js/Pages/Profile/` | Existente |
| Projetos | CRUD principal do produto, associado ao usuário | `ProjectController`, `Project`, `projects` migration | Existente |
| Domínios | Whitelist de domínios por projeto | `DomainController`, `Domain`, `StoreDomainRequest` | Existente |
| Crawling | Criação, execução em fila e status de jobs | `CrawlJobController`, `RunCrawlJob`, `RunCrawlJobAction` | Existente |
| Escopo de crawling | Validação de domínio, subdomínio, paths, profundidade e bloqueios | `SimpleUrlScopeValidator`, `StoreCrawlJobRequest` | Existente |
| Documentos | Texto extraído e metadados de origem | `DocumentController`, `Document`, `documents` migration | Existente |
| Chunks | Segmentação de documentos em partes menores | `ChunkController`, `SimpleChunker`, `chunks` migration | Existente |
| Exportações | Exportação JSONL de documentos e chunks | `DatasetExportController`, `JsonlDatasetExporter` | Existente |
| Extensão | Captura manual com token Sanctum | `ExtensionCaptureController`, `browser-extension/` | Parcial |
| Organizações | Tenant organizacional | Não identificado no repositório atual | Não encontrado |
| Auditoria | Logs/auditoria de ações do usuário | Não identificado no repositório atual | Não encontrado |

## Módulos Planejados

| Módulo | Descrição | Prioridade |
|---|---|---|
| Organizações | Separar usuários, projetos e dados por organização | Alta |
| Revisão de conteúdo | Aprovar/reprovar documentos antes da exportação | Média |
| Relatórios | Exibir qualidade, volume, falhas e cobertura de crawling | Média |
| Auditoria | Registrar ações relevantes e alterações sensíveis | Média |
| Integração LLM | Classificação, sumarização ou enriquecimento de documentos | Baixa |

## Dependências Entre Módulos

| Módulo Origem | Módulo Destino | Motivo |
|---|---|---|
| Projetos | Domínios | Domínios pertencem a um projeto |
| Projetos | Crawling | Jobs são criados dentro de projetos |
| Domínios | Crawling | URLs precisam estar em domínio autorizado |
| Crawling | Documentos | Páginas coletadas geram documentos |
| Documentos | Chunks | Chunks são derivados de documentos |
| Documentos/Chunks | Exportações | JSONL é gerado a partir do conteúdo processado |
| Extensão | Projetos/Domínios/Documentos | Capturas usam projeto autorizado e geram documentos |
