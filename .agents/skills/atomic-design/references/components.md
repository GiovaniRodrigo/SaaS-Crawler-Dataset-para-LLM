# Atomic Design Components Reference

Este documento detalha os componentes existentes e os padrões esperados para cada nível do Atomic Design no projeto DataCrawl.

## 1. Atoms (Átomos)
Componentes básicos e indivisíveis. Não possuem dependência de outros componentes da aplicação.

- **Button**: Botão base com variantes (primary, secondary, danger, ghost, link).
- **Badge**: Indicador de status (success, error, warning, info, slate).
- **Input**: Campo de texto básico.
- **Checkbox**: Seleção binária.
- **Typography**: Componente para textos (H1, H2, Body, Caption, etc.).
- **Card**: Container base com bordas e sombra suave.
- **InputLabel**: Rótulo para campos de formulário.
- **InputError**: Exibição de mensagens de erro de validação.
- **ApplicationLogo**: Logo da aplicação em SVG.

## 2. Molecules (Moléculas)
Grupos de átomos funcionando juntos como uma unidade funcional.

- **SearchBar**: Input com ícone de busca e funcionalidade de limpeza.
- **MetricCard**: Card que utiliza Typography e ícones para exibir KPIs.
- **StatusBadge**: Badge contextualizado (ex: status de um CrawlJob).
- **FormField**: Combinação de Label + Input + Error.
- **ProjectCard**: Card com resumo de um projeto.
- **EmptyState**: Ilustração + Texto + Botão de ação.

## 3. Organisms (Organismos)
Componentes complexos formados por moléculas e/ou átomos. Frequentemente representam seções distintas da interface.

- **AppSidebar**: Navegação lateral completa.
- **AppTopbar**: Barra superior com busca e perfil.
- **ProjectHeader**: Cabeçalho de página de projeto com ações e abas.
- **JobTimeline**: Visualização do progresso de um crawler.
- **DocumentsTable**: Tabela complexa com filtros, busca e paginação.
- **ReviewPanel**: Painel de decisão para aprovação de documentos.

## 4. Templates (Templates)
Layouts de página que organizam organismos. Definem a estrutura de grade da página.

- **AuthLayout**: Layout centralizado para login/registro.
- **DashboardLayout**: Layout com Sidebar e Topbar para a área logada.
- **ProjectLayout**: Layout específico para subpáginas de um projeto.

## 5. Pages (Páginas)
Instâncias dos templates com dados reais e estado.

- **Dashboard**: Visão geral.
- **Projects/Index**: Listagem de projetos.
- **Projects/Show**: Detalhes de um projeto específico.
- **CrawlJobs/Show**: Acompanhamento de um job.

## Padrões de Implementação

### Localização
- Todos os componentes devem estar em `resources/js/Components/`.
- Páginas devem estar em `resources/js/Pages/`.

### Convenções
- Use Functional Components com TypeScript.
- Utilize as classes do Tailwind CSS para estilização.
- Siga as definições de cores e tipografia em `docs/11_DESIGN_HI_FI.md`.
- Cada componente deve ter seu próprio arquivo `.tsx`.
- Testes unitários devem estar no mesmo diretório ou em subdiretórios `tests/`.
