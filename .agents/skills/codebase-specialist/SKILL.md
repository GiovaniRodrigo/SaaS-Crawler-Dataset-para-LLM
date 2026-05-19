---
name: codebase-specialist
description: Especialista na estrutura de pastas, responsabilidades e rastreamento de arquivos/funções do projeto.
---

# Skill: Codebase Specialist

Esta skill serve como o mapa mestre do projeto **DataCrawl**, facilitando o rastreamento de responsabilidades e a localização de arquivos ou funções.

## Regra de Ouro
> [!IMPORTANT]
> Sempre que uma nova pasta, módulo significativo ou mudança de responsabilidade arquitetural ocorrer, esta skill **DEVE** ser atualizada imediatamente pelo agente.

## Mapa de Responsabilidades

### Backend (Laravel)
- **`app/Actions`**: Contém a lógica de negócio principal dividida em ações de propósito único (ex: `CreateProjectAction`).
- **`app/Contracts`**: Interfaces que definem contratos para serviços, facilitando a troca de implementações (ex: `HtmlTextExtractorInterface`).
- **`app/Http/Controllers`**: Controladores finos que gerenciam o fluxo de requisição/resposta e delegam para as Actions.
- **`app/Http/Requests`**: Objetos de validação de dados de entrada.
- **`app/Models`**: Definições das entidades de banco de dados e seus relacionamentos.
- **`app/Policies`**: Lógica de autorização baseada em permissões de usuário/organização.
- **`app/Services`**: Serviços pesados ou de integração (Crawler, Processamento de Texto, Pontuação de Qualidade).
- **`app/Jobs`**: Processos em background, principalmente a execução do crawler.
- **`database/migrations`**: Histórico e definição do esquema do banco de dados (PostgreSQL + pgvector).

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
