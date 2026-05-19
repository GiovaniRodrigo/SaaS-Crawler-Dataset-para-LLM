---
name: datacrawl-frontend-design-system
description: Use ao recriar, manter ou evoluir telas e componentes frontend do DataCrawl preservando o design system extraido do projeto de referencia.
metadata:
  version: 1.0.0
  source: saa-s-de-coleta-dados.zip
  language: pt-BR
  stack: Next.js, React, TypeScript, Tailwind CSS, shadcn/ui, Radix UI, Lucide React
---

# SKILL - FRONTEND DATACRAWL

## 1. Objetivo da Skill

Esta skill orienta uma LLM a recriar, manter ou evoluir o frontend do **DataCrawl**, uma plataforma SaaS para coleta, processamento e exportacao de dados web para uso em LLMs, fine-tuning e sistemas RAG.

O frontend extraido do ZIP representa principalmente um **design system demonstrativo**, nao uma aplicacao funcional completa. Ele define identidade visual, tokens de tema, componentes base, padroes de layout, estados visuais, badges, cards, botoes, inputs, estatisticas e utilitarios CSS.

A LLM deve usar esta skill como fonte de verdade visual para implementar novas telas e componentes mantendo consistencia com o frontend original.

## 2. Escopo Extraido do Frontend

| Item | Encontrado no frontend | Observacao |
|---|---:|---|
| Aplicacao Next.js | Sim | Usa App Router com `app/page.tsx` e `app/layout.tsx` |
| React + TypeScript | Sim | Componentes em `.tsx` |
| Tailwind CSS 4 | Sim | Usa tokens CSS e `@theme inline` |
| shadcn/ui | Sim | Estilo `new-york`, Radix UI e aliases configurados |
| Tema escuro principal | Sim | O tema padrao e dark-first |
| Tema claro alternativo | Sim | Classe `.light` definida |
| Design system visual | Sim | Implementado em `components/design-system-showcase.tsx` |
| Telas reais de produto | Parcial | Existe uma vitrine de componentes; nao existem fluxos funcionais completos |
| Componentes UI reutilizaveis | Sim | 56 componentes em `components/ui` |
| Icones | Sim | `lucide-react` |
| Graficos | Preparado | `recharts` e componente `chart.tsx` existem |

## 3. Identidade do Produto

| Campo | Valor |
|---|---|
| Nome do produto | DataCrawl |
| Tipo | SaaS para coleta e preparacao de dados web |
| Publico esperado | Pessoas ou equipes que precisam gerar datasets para LLM, RAG ou fine-tuning |
| Tom visual | Tecnico, moderno, escuro, orientado a dados |
| Sensacao visual | Dashboard tecnico, plataforma SaaS, dados, automacao e IA |
| Idioma padrao | Portugues do Brasil |
| Metadados da pagina | `DataCrawl - Coleta de Dados para LLMs` |
| Descricao | Plataforma SaaS para coleta, processamento e exportacao de dados web para treinamento de LLMs e sistemas RAG |

## 4. Stack do Frontend

A LLM deve preservar esta base tecnologica ao evoluir o frontend de referencia:

| Camada | Tecnologia |
|---|---|
| Framework | Next.js |
| UI | React |
| Linguagem | TypeScript |
| Estilizacao | Tailwind CSS |
| Design system | shadcn/ui |
| Primitivos acessiveis | Radix UI |
| Icones | lucide-react |
| Formularios | react-hook-form + zod |
| Tema | next-themes |
| Graficos | recharts |
| Toasts | sonner / componentes toast existentes |
| Utilitario de classes | `cn` com `clsx` + `tailwind-merge` |

> Nota para este repositorio: a aplicacao principal observada usa Laravel + Inertia + React + TypeScript + Tailwind. Use esta skill como referencia visual e adapte os padroes para a arquitetura local quando estiver trabalhando em `resources/js`, sem assumir que Next.js existe neste codigo.

## 5. Estrutura Relevante do Projeto de Referencia

```text
app/
  globals.css              # Tokens principais, tema dark-first, utilitarios visuais
  layout.tsx               # Layout raiz, metadata e idioma pt-BR
  page.tsx                 # Renderiza DesignSystemShowcase

components/
  design-system-showcase.tsx  # Vitrine principal do design system
  theme-provider.tsx          # Provider de tema
  ui/                         # Componentes shadcn/ui reutilizaveis

hooks/
  use-mobile.ts
  use-toast.ts

lib/
  utils.ts                    # Funcao cn()

styles/
  globals.css                 # CSS base shadcn padrao; nao e o tema principal do app
```

Regra importante no projeto de referencia: **usar `app/globals.css` como fonte principal de tema**, pois ele contem o design system customizado do DataCrawl.

## 6. Regras Gerais para a LLM

| Regra | Instrucao |
|---|---|
| Preservar identidade | Manter visual dark-first, tecnico e orientado a dados |
| Evitar redesenho sem necessidade | Nao trocar paleta, fontes, espacamentos ou linguagem visual sem solicitacao explicita |
| Reaproveitar componentes | Usar `components/ui` antes de criar novos componentes no projeto de referencia; neste repo, usar componentes existentes em `resources/js/Components` |
| Usar composicao | Criar telas a partir de Card, Button, Badge, Input, Tabs, Table, Dialog, Sheet e Sidebar quando existirem |
| Navegacao Acessivel | Toda nova tela implementada deve possuir um botao ou link de redirecionamento correspondente em uma tela pai ou menu relevante (ex: Sidebar, Dashboard ou cabecalho) |
| Evitar CSS duplicado | Preferir tokens CSS e utilitarios existentes |
| Baixo custo | Implementar primeiro telas estaticas e dados mockados, depois integrar com backend |
| Responsividade | Usar grids responsivos com `grid-cols-1`, `md:grid-cols-*`, `lg:grid-cols-*` |
| Acessibilidade | Preservar foco visivel, labels, contraste e componentes acessiveis |
| Idioma | Textos de interface em portugues do Brasil |
| Dominio | Usar vocabulario de crawling, datasets, chunks, exportacoes, LLM, RAG e processamento |

## 7. Tema Visual Principal

O tema principal e **escuro por padrao**.

### 7.1 Cores base

| Token | Uso esperado | Intencao visual |
|---|---|---|
| `--background` | Fundo principal | Preto profundo levemente quente |
| `--foreground` | Texto principal | Alto contraste |
| `--card` | Superficies elevadas | Cards e blocos de dashboard |
| `--popover` | Menus e dropdowns | Superficies flutuantes |
| `--muted` | Fundos sutis | Areas secundarias |
| `--muted-foreground` | Texto secundario | Descricoes e metadados |
| `--border` | Bordas e divisores | Separacao visual discreta |
| `--input` | Campos de formulario | Inputs e controles |
| `--ring` | Foco | Realce de acessibilidade |

### 7.2 Cores de acao

| Token | Uso esperado |
|---|---|
| `--primary` | Acao principal, botoes principais, destaques cyan/teal |
| `--secondary` | Acoes secundarias e superficies elevadas |
| `--accent` | Destaques especiais, amber/warm highlight |
| `--destructive` | Erros e acoes destrutivas |
| `--success` | Sucesso, conclusao e jobs finalizados |
| `--warning` | Processamento, pendencia e atencao |
| `--info` | Informacao e status neutros |

### 7.3 Cores para graficos

| Token | Uso |
|---|---|
| `--chart-1` | Serie principal |
| `--chart-2` | Serie de sucesso/crescimento |
| `--chart-3` | Serie de destaque |
| `--chart-4` | Serie informativa |
| `--chart-5` | Serie de erro/alerta |

## 8. Tipografia

| Elemento | Classe recomendada | Uso |
|---|---|---|
| Titulo principal | `text-4xl font-bold tracking-tight` | Cabecalho de pagina |
| Titulo secundario | `text-3xl font-bold tracking-tight` | Secoes importantes |
| Titulo de secao | `text-2xl font-semibold` | Blocos de produto |
| Titulo de card | `text-lg font-semibold` | Cards e modulos |
| Texto padrao | `text-base` | Conteudo comum |
| Texto secundario | `text-sm text-muted-foreground` | Descricoes |
| Labels/metadados | `text-xs text-muted-foreground` | Status, datas, hints |
| Codigo/dados | `font-mono` | JSON, URLs, configuracoes, payloads |

Fonte principal: **Geist Sans**.
Fonte monoespacada: **Geist Mono**.

## 9. Componentes UI Disponiveis no Projeto de Referencia

A LLM deve priorizar estes componentes ja existentes antes de criar novos:

```text
accordion, alert, alert-dialog, aspect-ratio, avatar, badge, breadcrumb,
button, button-group, calendar, card, carousel, chart, checkbox, collapsible,
command, context-menu, dialog, drawer, dropdown-menu, empty, field, form,
hover-card, input, input-group, input-otp, item, kbd, label, menubar,
navigation-menu, pagination, popover, progress, radio-group, resizable,
scroll-area, select, separator, sheet, sidebar, skeleton, slider, sonner,
spinner, switch, table, tabs, textarea, toast, toaster, toggle,
toggle-group, tooltip, use-mobile
```

## 10. Padroes de Componentes Extraidos

### 10.1 Header

| Elemento | Padrao |
|---|---|
| Altura | `h-16` |
| Posicao | `sticky top-0 z-50` |
| Fundo | `bg-background/80 backdrop-blur-sm` |
| Borda | `border-b border-border` |
| Container | `max-w-7xl mx-auto px-6` |
| Logo | Icone em quadrado `w-8 h-8 rounded-lg bg-primary` |
| Navegacao | Botoes pequenos com estado ativo |

Uso recomendado: criar header com nome do produto, badge de contexto e navegacao entre modulos.

### 10.2 Cards

Padrao base:

```tsx
<Card className="card-hover">
  <CardHeader>
    <CardTitle>Titulo</CardTitle>
    <CardDescription>Descricao curta</CardDescription>
  </CardHeader>
  <CardContent>
    Conteudo
  </CardContent>
</Card>
```

Regras:

| Tipo de card | Uso |
|---|---|
| Card simples | Agrupar conteudo |
| Card com icone | Representar modulo ou funcionalidade |
| Card hover | Usar `card-hover` para cards clicaveis |
| Stat card | Usar `stat-card` para metricas |
| Card com borda gradiente | Usar `border-gradient` para destaque premium ou IA |

### 10.3 Botoes

Variantes disponiveis:

| Variante | Uso |
|---|---|
| `default` | Acao principal |
| `secondary` | Acao secundaria |
| `outline` | Acao alternativa |
| `ghost` | Acao discreta em cards/listas |
| `destructive` | Cancelar, excluir ou interromper |
| `link` | Navegacao textual |

Tamanhos:

| Tamanho | Uso |
|---|---|
| `sm` | Acoes compactas |
| `default` | Uso padrao |
| `lg` | CTA principal |
| `icon` | Botao apenas com icone |

Botoes com icones devem usar `lucide-react` e `gap-2`.

### 10.4 Inputs

Padrao de campo:

```tsx
<div className="space-y-2">
  <label className="text-sm font-medium">URL do Site</label>
  <Input placeholder="https://exemplo.com" />
</div>
```

Padrao de busca:

```tsx
<div className="relative">
  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
  <Input className="pl-10" placeholder="Buscar por titulo, URL ou conteudo..." />
</div>
```

### 10.5 Badges de status

Classes utilitarias disponiveis:

| Classe | Uso |
|---|---|
| `badge-success` | Concluido, ativo, exportado |
| `badge-warning` | Processando, aguardando, em fila |
| `badge-destructive` | Erro, falha, cancelado |
| `badge-info` | Pendente, informativo |
| `badge-primary` | Novo, destaque, IA |

Status recomendados para o dominio:

| Status | Badge | Icone sugerido |
|---|---|---|
| Concluido | `badge-success` | `CheckCircle2` |
| Processando | `badge-warning` | `Clock` |
| Erro | `badge-destructive` | `AlertCircle` |
| Pendente | `badge-info` | `Info` |
| Novo | `badge-primary` | `Sparkles` |

### 10.6 Estatisticas

Padrao extraido:

```tsx
<div className="stat-card">
  <p className="text-sm text-muted-foreground">Total de Paginas</p>
  <p className="text-3xl font-bold mt-1">12,847</p>
  <p className="text-xs text-success mt-2">+23% esta semana</p>
</div>
```

Metricas recomendadas para o DataCrawl:

| Metrica | Exemplo |
|---|---|
| Total de paginas | `12,847` |
| Documentos processados | `8,234` |
| Chunks gerados | `156K` |
| Exportacoes | `47` |
| Crawls ativos | `6` |
| Erros de coleta | `12` |
| Dominios monitorados | `28` |

## 11. Utilitarios CSS Customizados

| Classe | Uso |
|---|---|
| `text-gradient` | Texto com gradiente de `primary` para `accent` |
| `glow-primary` | Brilho cyan/teal para destaque tecnico |
| `glow-accent` | Brilho amber para destaque especial |
| `glow-success` | Brilho verde para sucesso |
| `border-gradient` | Borda com gradiente animavel/visual |
| `status-pulse` | Indicador pulsante de status |
| `bg-grid` | Fundo com grade tecnica |
| `code-block` | Bloco de codigo/dados |
| `card-hover` | Hover consistente para cards clicaveis |
| `stat-card` | Card de metrica |

## 12. Modulos Visuais Representados no Frontend

O design system demonstra tres modulos principais:

| Modulo | Icone | Descricao visual |
|---|---|---|
| Crawling Web | `Globe` | Coleta automatizada de paginas com controle de profundidade |
| Processamento | `Layers` | Limpeza, deduplicacao e chunking inteligente |
| Exportacao | `FileJson` | Exportacao JSONL para fine-tuning ou RAG |

A LLM deve usar esses modulos como base para menus, dashboards e fluxos principais.

## 13. Telas Recomendadas a Partir Desta Skill

Como o ZIP contem um design system e nao todas as telas finais, a LLM pode evoluir o produto com estas telas de baixo custo:

| Tela | Prioridade | Objetivo |
|---|---:|---|
| Dashboard | Alta | Mostrar metricas, crawls recentes, status e alertas |
| Projetos | Alta | Listar projetos/dominios configurados |
| Novo Crawl | Alta | Formulario para cadastrar URL, profundidade, limite de paginas e regras |
| Execucoes | Media | Mostrar historico de coletas e status |
| Documentos | Media | Listar paginas/documentos coletados |
| Chunks | Media | Visualizar chunks gerados por documento |
| Exportacoes | Alta | Gerar/baixar JSONL ou dataset estruturado |
| Configuracoes | Baixa | Preferencias do projeto, dominio, limites e crawling |
| Design System | Baixa | Manter vitrine atual para consulta interna |

## 14. Layout Base Recomendado para Novas Telas

```tsx
<div className="min-h-screen bg-background">
  <header className="border-b border-border sticky top-0 z-50 bg-background/80 backdrop-blur-sm">
    <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
      {/* Logo, titulo e navegacao */}
    </div>
  </header>

  <main className="max-w-7xl mx-auto px-6 py-12 space-y-8">
    {/* Conteudo da tela */}
  </main>
</div>
```

Para dashboards, usar:

```tsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
  {/* stat-card */}
</div>
```

Para modulos:

```tsx
<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
  {/* cards de modulos */}
</div>
```

## 15. Vocabulario de Interface

A LLM deve usar nomes alinhados ao dominio:

| Conceito | Termos recomendados |
|---|---|
| Coleta | Crawl, crawling, execucao, coleta web |
| Entrada | URL, dominio, escopo, profundidade, limite de paginas |
| Processamento | Limpeza, deduplicacao, chunking, normalizacao |
| Saida | Dataset, JSONL, exportacao, documentos, chunks |
| IA | LLM, RAG, fine-tuning, embeddings |
| Status | Pendente, processando, concluido, erro, cancelado |
| Controle | Configurar, iniciar, pausar, cancelar, exportar, copiar |

## 16. Regras de UX

| Situacao | Comportamento esperado |
|---|---|
| Acao principal da tela | Usar botao `default` com icone |
| Acao secundaria | Usar `secondary` ou `outline` |
| Acao destrutiva | Usar `destructive` e confirmar com dialog |
| Navegacao de tela | Sempre adicionar um botao ou link de redirecionamento na tela pai ou menu relevante para qualquer nova tela implementada |
| Card clicavel | Aplicar `card-hover` |
| Item em processamento | Usar badge warning e `status-pulse` quando fizer sentido |
| Conteudo vazio | Usar componente `Empty` ou card com mensagem clara |
| Dados tecnicos | Usar `font-mono` ou `code-block` |
| Filtros | Usar inputs, selects, tabs e badges |
| Feedback | Usar toast/sonner para sucesso, erro e andamento |
| Longas listas | Usar tabela, paginacao e busca |

## 17. Regras de Baixo Custo para Implementacao por LLM

A LLM deve implementar seguindo esta ordem para reduzir custo, risco e retrabalho:

| Ordem | Acao | Motivo |
|---:|---|---|
| 1 | Preservar tokens e tema do frontend existente | Mantem identidade visual sem redesenho |
| 2 | Reusar componentes existentes | Evita criar componentes duplicados |
| 3 | Criar dados mockados locais | Permite validar UI antes da API |
| 4 | Implementar telas estaticas | Reduz complexidade inicial |
| 5 | Extrair componentes repetidos | Evita duplicacao apos validar layout |
| 6 | Integrar backend depois | Evita acoplamento prematuro |
| 7 | Adicionar loading/empty/error states | Melhora UX com baixo custo |
| 8 | Adicionar testes visuais minimos quando houver infraestrutura | Protege fluxo principal |

## 18. Nao Fazer

| Proibicao | Motivo |
|---|---|
| Nao substituir shadcn/ui por outra biblioteca no projeto de referencia | Quebra consistencia do frontend extraido |
| Nao trocar a paleta dark-first sem solicitacao | A identidade visual depende dela |
| Nao criar CSS global duplicado | Deve-se usar tokens e utilitarios existentes |
| Nao criar componentes complexos antes das telas | Primeiro validar experiencia e fluxo |
| Nao misturar ingles e portugues na UI | Idioma padrao e pt-BR |
| Nao transformar a vitrine em produto sem separar responsabilidades | `DesignSystemShowcase` deve continuar sendo referencia visual |
| Nao inventar funcionalidades ausentes | O ZIP de referencia e majoritariamente design system/demo |

## 19. Checklist de Aceite para a LLM

Antes de concluir qualquer alteracao no frontend, verificar:

- [ ] Usa o tema/tokens existentes como fonte visual principal.
- [ ] Mantem visual dark-first.
- [ ] Usa componentes reutilizaveis existentes.
- [ ] Usa `lucide-react` para icones quando disponivel no projeto.
- [ ] Textos estao em portugues do Brasil.
- [ ] Cards seguem o padrao visual do DataCrawl.
- [ ] Botoes seguem variantes existentes.
- [ ] Status usam badges semanticos.
- [ ] Metricas usam padrao `stat-card` ou equivalente local.
- [ ] Layout usa `max-w-7xl mx-auto px-6` ou equivalente ja estabelecido.
- [ ] Tela e responsiva.
- [ ] Estados vazio, erro e carregamento foram considerados.
- [ ] Nao houve redesenho desnecessario da identidade visual.

## 20. Prompt Base para Usar com Outra LLM

Use o prompt abaixo quando quiser que uma LLM implemente ou evolua o frontend com base nesta skill:

```markdown
Voce e uma LLM responsavel por implementar o frontend do DataCrawl.

Use a skill `datacrawl-frontend-design-system` como fonte de verdade visual.

Objetivo:
Implementar ou evoluir telas do produto DataCrawl preservando o design system extraido do frontend existente.

Regras obrigatorias:
- Usar a stack frontend existente do repositorio alvo.
- Preservar o tema dark-first e tokens existentes.
- Reusar componentes reutilizaveis do projeto.
- Usar `lucide-react` para icones quando disponivel.
- Usar textos em portugues do Brasil.
- Manter estetica tecnica, SaaS, dados, IA e automacao.
- Usar Card, Button, Badge, Input, Table, Tabs, Dialog, Sheet e Sidebar quando aplicavel e disponivel.
- Implementar com o menor custo possivel: primeiro UI estatica com mocks, depois integracao.
- Nao redesenhar a identidade visual sem necessidade.

Ao implementar:
1. Leia a estrutura existente.
2. Preserve tokens e utilitarios CSS.
3. Crie componentes pequenos e reutilizaveis.
4. Evite duplicacao.
5. Entregue uma tela funcional, responsiva e consistente.
6. Inclua estados de loading, vazio e erro quando aplicavel.

Resultado esperado:
Uma implementacao consistente com o frontend original do DataCrawl.
```

## 21. Prompt Especifico para Criar Dashboard

```markdown
Implemente a tela Dashboard do DataCrawl usando a skill `datacrawl-frontend-design-system`.

A tela deve conter:
- Header com logo DataCrawl, nome da tela e acao principal `Novo Crawl`.
- Cards de estatisticas com `stat-card`.
- Secao de crawls recentes com badges de status.
- Secao de modulos: Crawling Web, Processamento e Exportacao.
- Area de alertas/erros recentes.
- Dados mockados locais.
- Visual dark-first, responsivo e em portugues do Brasil.

Use apenas componentes existentes sempre que possivel.
```

## 22. Prompt Especifico para Criar Tela Novo Crawl

```markdown
Implemente a tela Novo Crawl do DataCrawl usando a skill `datacrawl-frontend-design-system`.

A tela deve conter:
- Campo URL inicial.
- Campo dominio/escopo permitido.
- Campo profundidade maxima.
- Campo limite maximo de paginas.
- Opcao para respeitar robots.txt.
- Opcao para deduplicar conteudo.
- Opcao para gerar chunks automaticamente.
- Botoes `Iniciar Crawl`, `Salvar Configuracao` e `Cancelar`.
- Card lateral explicando o fluxo: Coleta -> Processamento -> Exportacao.
- Estados visuais com badges e icones lucide-react.

Priorize implementacao estatica com validacao visual simples.
```

## 23. Prompt Especifico para Criar Tela de Exportacoes

```markdown
Implemente a tela Exportacoes do DataCrawl usando a skill `datacrawl-frontend-design-system`.

A tela deve conter:
- Lista de exportacoes geradas.
- Metricas: total de documentos, chunks, tamanho estimado e formato.
- Filtros por projeto, status e formato.
- Acoes: copiar link, baixar JSONL, ver detalhes e remover.
- Badges de status: concluido, processando, erro e pendente.
- Tabela responsiva ou cards em mobile.
- Dados mockados locais.

Preserve visual dark-first, tokens, utilitarios e componentes existentes.
```

## 24. Resumo Executivo

Esta skill transforma o frontend enviado em uma especificacao reutilizavel para LLMs. A fonte original e um design system do DataCrawl, com tema escuro, tokens customizados, componentes shadcn/ui, utilitarios visuais e exemplos de interface para uma plataforma SaaS de coleta de dados para LLMs.

A LLM deve usar este documento para manter consistencia visual, reduzir custo de implementacao e evoluir o produto com telas reais sem perder a identidade extraida do frontend original.
