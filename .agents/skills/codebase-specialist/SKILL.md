---
name: codebase-specialist
description: Especialista na estrutura de pastas, responsabilidades e rastreamento de arquivos/funções do projeto.
---

# Skill: Codebase Specialist

Esta skill serve como o mapa mestre do projeto **DataCrawl**, facilitando o rastreamento de responsabilidades e a localização de arquivos ou funções.

## Regra de Ouro
> [!IMPORTANT]
> Sempre que uma nova pasta, módulo significativo ou mudança de responsabilidade arquitetural ocorrer, esta skill **DEVE** ser atualizada imediatamente pelo agente.

## Padronização Multilingual (i18n)
> [!WARNING]
> **Toda nova implementação ou refatoração DEVE ser multilingual.**
> - **Backend**: Use as traduções em `lang/{locale}/messages.php`. Nunca use strings fixas em Controllers ou Actions que serão exibidas ao usuário.
> - **Frontend**: Use o hook `useTranslation` e a função `t('messages.chave')`.
> - **Estrutura**: Novos termos devem ser adicionados em `pt_BR` e `en` simultaneamente.

## Mapa de Responsabilidades

### Backend (Laravel)
- **`app/Actions`**: Lógica de negócio principal (ex: `ApproveDocumentAction`). Agora inclui o registro automático de **Auditoria** via `LogAuditAction`.
- **`app/Contracts`**: Interfaces de contrato (ex: `HtmlTextExtractorInterface`).
- **`app/Http/Controllers`**: Controladores finos. Novos controladores: `DashboardController`, `ApiTokenController`, `ReviewController`.
- **`app/Http/Requests`**: Validação de formulários.
- **`app/Models`**: Entidades. Novos modelos: `AuditLog`, `Document` (com suporte a qualidade e status).
- **`app/Policies`**: Autorização.
- **`app/Services`**: Serviços complexos. Inclui o `QualityScorer` (cálculo de score de documentos).
- **`app/Jobs`**: Processos em background (Crawl, Processamento).
- **`database/migrations`**: Esquema do banco. Adicionada tabela `audit_logs` e colunas de qualidade em `documents`.

### Frontend (Inertia + React)
- **`resources/js/Pages`**: Componentes de página que recebem dados do Inertia.
- **`resources/js/Components`**: Componentes reutilizáveis organizados (Atoms, Molecules, Organisms).
- **`resources/js/Layouts`**: Estruturas de layout da aplicação (ex: `AuthenticatedLayout`).
- **`resources/js/Types`**: Definições de interfaces e tipos TypeScript para consistência de dados.
- **`resources/js/Hooks`**: Hooks customizados para lógica reutilizável no frontend.

### Extensão de Navegador
- **`browser-extension`**: Código fonte completo da extensão (manifest, popup, content scripts).

### Documentação e Configuração
- **`docs`**: Documentação de negócio, técnica e roadmaps.
- **`.agents`**: Configurações de contexto e skills para agentes de IA (como esta).
- **`routes`**: Definições de rotas web, API e autenticação.

## Como Rastrear uma Função
1. **Ponto de Entrada**: Comece por `routes/web.php` ou `routes/api.php`.
2. **Handler**: Vá ao Controller indicado.
3. **Lógica**: Procure a Action chamada pelo Controller em `app/Actions`.
4. **Infraestrutura**: Se a Action usar serviços complexos, verifique `app/Services`.
5. **Dados**: Consulte o Model correspondente para entender a estrutura de dados.
