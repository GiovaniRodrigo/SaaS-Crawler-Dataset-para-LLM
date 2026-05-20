---
name: project-file-map
description: Especialista no mapa de arquivos do repositório, mapeando pastas, responsabilidades e fluxos de dados do DataCrawl.
---

# Skill: Project File Map Specialist

Esta skill fornece o mapa completo de arquivos e pastas do projeto **DataCrawl / CrawlMind**, servindo como referência para identificar onde cada responsabilidade e componente deve ser criado ou alterado.

## Regra de Ouro
> [!IMPORTANT]
> **Antes de criar novos diretórios ou arquivos, o agente deve consultar esta skill para garantir que a localização esteja estritamente alinhada ao design arquitetural do projeto.**

## Estrutura de Diretórios e Arquivos

### 1. Backend (Laravel)
- **`app/Actions/`**: Lógica de execução pura e isolada.
  - `Audit/LogAuditAction.php` - Registra ações de auditoria.
  - `Chunks/` - Casos de uso de fragmentação de texto.
  - `CrawlJobs/` - Casos de uso de execução e controle do crawler (ex: `RunCrawlJobAction.php`).
  - `Documents/` - Criação, curadoria e aprovação de documentos.
  - `Domains/` - Registro e escopo de domínios autorizados.
  - `Projects/` - CRUD de projetos.
- **`app/Contracts/`**: Interfaces de serviços (ex: `EmbeddingGeneratorInterface`).
- **`app/Services/`**: Implementações de regras complexas ou integrações externas.
  - `AI/` - Geradores de embeddings (Fake, OpenAI, Gemini).
  - `Crawling/` - Fetchers, validadores de escopo e normalizadores de URL.
  - `TextProcessing/` - Limpeza e extração de HTML.
  - `Dataset/` - Exporte JSONL e fragmentadores de texto.
- **`app/Models/`**: Modelos Eloquent (`User`, `Project`, `Domain`, `CrawlJob`, `CrawledPage`, `Document`, `Chunk`, `ChunkEmbedding`, `AuditLog`).
- **`app/Policies/`**: Políticas de autorização.
- **`config/`**: Arquivos de configuração.
  - `ai.php` - Configurações centrais de IA e embeddings.
- **`database/migrations/`**: Esquema de banco de dados.

### 2. Frontend (Inertia + React + Tailwind)
- **`resources/js/Pages/`**: Telas/Páginas acessíveis por rotas Inertia.
- **`resources/js/Components/`**:
  - `atoms/` - Componentes atômicos básicos (Button, Checkbox, Input).
  - `molecules/` - Componentes moleculares combinados (Dropdown, MetricCard).
  - `organisms/` - Seções e cards complexos (Topbar, Sidebar, JobProgressCard).
- **`resources/js/Layouts/`**: Estrutura geral de layout (`AuthenticatedLayout`, `GuestLayout`).

### 3. Extensão
- **`browser-extension/`**: Extensão de navegador baseada em Manifest V3 (`manifest.json`, `popup.html`, `popup.js`, `content.js`).

## Fluxo de Consulta de Arquivos
1. **Regras de Negócio**: `app/Actions` e `app/Services`.
2. **Definição de Rotas**: `routes/web.php` e `routes/api.php`.
3. **Páginas de UI**: `resources/js/Pages`.
4. **Armazenamento de Dados**: `app/Models` e `database/migrations`.
