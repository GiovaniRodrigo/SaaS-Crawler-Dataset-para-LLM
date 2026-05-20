# Changelog

Todos os registros de alterações relevantes no projeto CrawlMind serão documentados neste arquivo.

O formato é baseado no [Keep a Changelog](https://keepachangelog.com/pt-BR/1.0.0/).

## [Unreleased] - 2026-05-20

### Adicionado
- Novo seeder `DemoDatasetSeeder` para povoar um projeto de exemplo ("Demo: Base de Conhecimento RAG - Laravel & Inertia") com conteúdos reais de documentações públicas, logs de execução de crawler simulados e arquivo JSONL de amostra exportado.
- Atualizado o seeder principal `DatabaseSeeder.php` para rodar o seeder de demonstração em todos os ambientes por padrão.
- Novo documento `docs/12_RESUMO_DO_PROJETO.md` consolidando o que o projeto faz, seus fluxos, arquitetura, capacidades e roadmap.
- Gerador de Embedding real da OpenAI (`OpenAIEmbeddingGenerator`) integrado via HTTP.
- Gerador de Embedding real do Gemini (`GeminiEmbeddingGenerator`) integrado via HTTP com preenchimento (padding) automático para conformidade de 1536 dimensões.
- Novo arquivo de configuração (`config/ai.php`) para centralizar os tokens de API e configurações de embeddings.
- Configuração flexível de **URL da API** na Extensão de Navegador persistida no `chrome.storage.local`.
- Suporte a parsing automático de `robots.txt` e cache em nível de host em `SimpleUrlScopeValidator`.
- Delay de politeness dinâmico baseado na diretiva `Crawl-delay` do `robots.txt` no crawler (entre 0.1s e 10s, com fallback de 1.0s).
- Suíte de testes unitários para regras de `robots.txt` e delays em `SimpleUrlScopeValidatorTest`.
- Suporte a atividades dinâmicas reais no Dashboard obtidas do modelo `AuditLog`.
- Criadas skills locais `.agents/skills/changelog/SKILL.md` (regras do changelog), `.agents/skills/project-file-map/SKILL.md` (mapa de arquivos do repositório) e `.agents/skills/documentation/SKILL.md` (padrão de documentação com TL;DR).
- Adicionado helper `belongsToOrganization` ao modelo `User` para verificar associação de usuário a organizações.
- Criado teste de integração `OrganizationTenancyTest` para garantir o isolamento correto de recursos por inquilino/organização.
- Desenvolvido painel de **Relatórios Avançados** em React (`Reports.tsx`) apresentando gráficos de coletas baseados em puro CSS/Tailwind, distribuição de curadoria, performance do crawler e domínios dominantes.
- Criado o modelo e tabela `DatasetExport` com trait `BelongsToOrganization` para rastrear, auditar e versionar arquivos JSONL exportados pela organização.
- Implementado painel de histórico de exportações na tela `Datasets.tsx` com link estável para download de arquivos gerados.
- Tabela e migration `organization_invitations` para suporte a fluxo de convite e admissão de novos membros no time.
- Modelo `OrganizationInvitation` com relacionamento para `Organization` e URL de aceitação de convite.
- Implementado fluxo público de aceitação de convite `/settings/team/invitations/accept/{token}` (rota pública que vincula o token de convite à sessão de visitantes e usuários existentes).
- Criado teste de integração robusto `OrganizationInvitationTest.php` cobrindo o ciclo de vida completo de envio, listagem, revogação e aceitação de convites de time.
- Contrato `QualityScorerInterface` para modularizar a pontuação de qualidade de documentos.
- Novo serviço `GeminiQualityScorer` integrado via API para análise estruturada com JSON Schema da qualidade de conteúdo.
- Novo serviço `OpenAiQualityScorer` integrado via API para análise de qualidade estruturada com formato JSON.
- Suíte de testes `AiQualityScorerTest.php` cobrindo o comportamento, chamadas mockadas das APIs e resiliência com fallback heurístico.
- Rota e página de faturamento do usuário (`Billing.tsx`) em React/Inertia apresentando o plano atual, histórico de faturas e cotas de uso.
- Serviço unificado `StripeService` encapsulando as integrações HTTP e tratamento de exceções com o Stripe SDK.
- Controlador de webhooks do Stripe (`StripeWebhookController`) sincronizando assinaturas, pagamentos pendentes e cancelamentos em tempo de execução.
- Controlador de checkout e portal (`StripeBillingController`) redirecionando usuários aos fluxos hospedados do Stripe de forma segura.
- Suíte de testes de faturamento (`StripeBillingTest.php`) cobrindo 100% das regras de limites de uso, webhooks e redirecionamento.
- Nova coluna `organization_id` na tabela `crawled_pages` com migração de dados retroativa automática baseada no projeto correspondente.
- Nova suíte de testes de isolamento multitenant (`MultiTenancyIsolationTest.php`) cobrindo chamadas de API, jobs de fila (CLI) e escopo de consultas.

### Modificado
- Alterado o User-Agent padrão nas requisições HTTP do crawler para `CrawlMindBot/1.0`.
- Ajustada a injeção do `EmbeddingGeneratorInterface` no `AppServiceProvider` para resolver dinamicamente o provedor ativo baseado no arquivo de configuração `ai.php`.
- Refatorada a extração de links em `RunCrawlJobAction` de Regex para `DOMDocument` visando maior robustez no parsing de páginas HTML.
- Modificado o método `getRecentActivities` no `DashboardController` para consumir a tabela de auditoria real e categorizar visualmente via `getActivityType`.
- Atualizadas as políticas de autorização (`ProjectPolicy`, `DomainPolicy`, `CrawlJobPolicy`, `DocumentPolicy`, `ChunkPolicy`) para usar escopo e pertencimento à organização (`belongsToOrganization`) ao invés de isolamento simples por usuário.
- Substituída a rota de placeholder de relatórios em `SettingsController@reports` pela agregação de estatísticas de coletas e qualidade de dados reais do banco de dados na organização ativa.
- Corrigido link do botão em `Datasets.tsx` envolvendo-o com `Link` do Inertia para conformidade com a tipagem do TypeScript.
- Refatorada a ação de exportação de datasets (`exportDatasets` em `SettingsController`) para persistir o histórico e metadados de arquivos gerados (contagem de registros e tamanho do arquivo) antes de disponibilizar para download.
- Atualizado o middleware `HandleOrganizationContext` para resolver convites salvos na sessão (no momento pós-registro ou pós-login), associando o novo usuário à organização com o respectivo papel do convite e definindo-a como organização ativa.
- Refatorado `OrganizationController` para gerenciar geração de convites (enviando link único e gravando logs de e-mail), cancelamento de convites ativos por administradores, e redirecionamento de visitantes com token na URL.
- Atualizada a tela de gerenciamento de equipe em React (`Team.tsx`) para exibir convites pendentes de time, permitir cancelamento direto, e incluir botão de cópia de link de convite com feedback de status copiado.
- Atualizado o arquivo de configuração `config/ai.php` com o provedor dinâmico `quality_provider` e modelos de chat.
- Atualizado o provedor `AppServiceProvider` para vincular dinamicamente o `QualityScorerInterface` com base nas configurações ativas.
- Modificado o serviço original `QualityScorer` para implementar `QualityScorerInterface` como a heurística local padrão.
- Refatorado o construtor do `CreateDocumentFromCrawledPageAction` para injetar a interface de pontuação unificada ao invés de uma classe concreta.
- Atualizado o modelo `Organization` adicionando colunas de controle do Stripe e métodos de validação de limites (`getLimits()`, `hasReachedProjectLimit()`, `hasReachedPageLimit()`).
- Refatorado `ProjectController` para bloquear a criação de novos projetos caso o limite do plano ativo seja excedido.
- Refatorado o motor do Crawler (`RunCrawlJobAction`) para interromper e cancelar a raspagem de URLs caso o limite de páginas da organização seja atingido.
- Refatorado o endpoint de captura da extensão (`ExtensionCaptureController`) para rejeitar novas capturas com HTTP 403 e filtrar listagem de projetos por organização ativa.
- Habilitado o trait `BelongsToOrganization` no modelo `CrawledPage` para reforçar o isolamento do conteúdo bruto raspado.
- Atualizado o trait `BelongsToOrganization` para suportar fallback automático inteligente (resolvendo `organization_id` a partir de `project_id` ou `document_id` de forma assíncrona/background e a partir do usuário autenticado no Sanctum de forma stateless), qualificando consultas com nomes de tabelas para prevenir colisões SQL.
