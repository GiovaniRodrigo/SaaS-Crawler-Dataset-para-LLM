# DESIGN HI-FI — SAAS E EXTENSÃO PARA CRAWLER DE DATASET LLM

## 1. Objetivo do Design

Este documento define o layout visual, experiência de uso, identidade, componentes e telas principais do produto.

O projeto é uma plataforma SaaS com extensão de navegador para:

- cadastrar projetos;
- configurar domínios;
- executar crawlers;
- revisar documentos;
- gerar chunks;
- exportar datasets para LLM;
- capturar páginas manualmente via extensão;
- acompanhar qualidade, auditoria e relatórios.

O design deve transmitir:

- confiança;
- precisão técnica;
- controle sobre os dados;
- segurança;
- produtividade;
- aparência moderna de ferramenta SaaS para IA.

---

# 2. Conceito Visual

## 2.1 Nome visual sugerido

```text
CrawlMind
```

Outras opções:

| Nome         | Sensação                     |
| ------------ | ---------------------------- |
| CrawlMind    | IA + coleta inteligente      |
| DataForge AI | Construção de datasets       |
| DatasetFlow  | Pipeline visual de dados     |
| Web2LLM      | Conversão direta para LLM    |
| CrawlBase    | Base estruturada por crawler |

---

## 2.2 Estilo visual

O produto deve seguir uma estética:

```text
SaaS B2B moderno + painel de dados + IA produtiva
```

Referências visuais:

* dashboards de analytics;
* plataformas de observabilidade;
* ferramentas de IA;
* produtos developer-first;
* painéis com tabelas, status, gráficos e ações rápidas.

---

# 3. Paleta de Cres

## 3.1 Tema principal — Light Mode

| Uso              | Cor         | Hex       |
| ---------------- | ----------- | --------- |
| Fundo principal  | Slate 50    | `#F8FAFC` |
| Fundo de cards   | White       | `#FFFFFF` |
| Texto principal  | Slate 950   | `#020617` |
| Texto secundário | Slate 500   | `#64748B` |
| Borda suave      | Slate 200   | `#E2E8F0` |
| Primária         | Indigo 600  | `#4F46E5` |
| Primária hover   | Indigo 700  | `#4338CA` |
| Secundária       | Cyan 500    | `#06B6D4` |
| Sucesso          | Emerald 500 | `#10B981` |
| Alerta           | Amber 500   | `#F59E0B` |
| Erro             | Rose 500    | `#F43F5E` |
| Informação       | Blue 500    | `#3B82F6` |

---

## 3.2 Tema Dark Mode

| Uso              | Cor         | Hex       |
| ---------------- | ----------- | --------- |
| Fundo principal  | Slate 950   | `#020617` |
| Fundo lateral    | Slate 900   | `#0F172A` |
| Fundo de cards   | Slate 900   | `#0F172A` |
| Fundo elevado    | Slate 800   | `#1E293B` |
| Texto principal  | Slate 50    | `#F8FAFC` |
| Texto secundário | Slate 400   | `#94A3B8` |
| Borda            | Slate 700   | `#334155` |
| Primária         | Indigo 500  | `#6366F1` |
| Primária hover   | Indigo 400  | `#818CF8` |
| Sucesso          | Emerald 400 | `#34D399` |
| Alerta           | Amber 400   | `#FBBF24` |
| Erro             | Rose 400    | `#FB7185` |

---

# 4. Tipografia

## 4.1 Fonte recomendada

```text
Inter
```

Alternativas:

* Geist Sans;
* Roboto;
* Plus Jakarta Sans.

---

## 4.2 Escala tipográfica

| Elemento  |     Tamanho | Peso |
| --------- | ----------: | ---: |
| Display   |        40px |  700 |
| H1        |        32px |  700 |
| H2        |        24px |  700 |
| H3        |        20px |  600 |
| H4        |        18px |  600 |
| Body      | 14px / 16px |  400 |
| Small     |        13px |  400 |
| Caption   |        12px |  500 |
| Badge     |        11px |  600 |
| Code/Data |        13px |  500 |

---

# 5. Princípios de UX

| Princípio          | Aplicação                                                             |
| ------------------ | --------------------------------------------------------------------- |
| Controle explícito | Nenhuma coleta ocorre sem configuração ou ação clara                  |
| Rastreabilidade    | Toda página, documento e chunk deve mostrar origem                    |
| Segurança visual   | Domínios autorizados e bloqueados devem ficar evidentes               |
| Baixo atrito       | Criar projeto e executar crawler deve exigir poucos passos            |
| Revisão humana     | Conteúdos sensíveis devem ter fluxo claro de aprovação                |
| Transparência      | Jobs devem mostrar progresso, falhas e logs                           |
| Produto SaaS       | Sempre exibir organização, plano, uso e limites                       |
| Dataset-first      | O usuário deve entender rapidamente se o dataset está pronto para LLM |

---

# 6. Layout Base do SaaS

## 6.1 Estrutura geral

```text
┌──────────────────────────────────────────────────────────────┐
│ Topbar                                                       │
├───────────────┬──────────────────────────────────────────────┤
│ Sidebar       │ Conteúdo principal                           │
│               │                                              │
│ Navegação     │ Header da página                             │
│ principal     │ Cards / tabelas / gráficos / ações            │
│               │                                              │
└───────────────┴──────────────────────────────────────────────┘
```

---

## 6.2 Sidebar

A sidebar deve ser fixa no desktop.

Largura recomendada:

```text
280px
```

Itens:

| Item          | Ícone sugerido | Descrição               |
| ------------- | -------------- | ----------------------- |
| Dashboard     | Gauge          | Visão geral             |
| Projetos      | FolderKanban   | Projetos do tenant      |
| Domínios      | Globe          | Domínios autorizados    |
| Jobs          | Activity       | Execuções de crawling   |
| Revisão       | CheckSquare    | Aprovação de documentos |
| Documentos    | FileText       | Textos extraídos        |
| Chunks        | Braces         | Partes geradas para LLM |
| Datasets      | Database       | Exportações             |
| Relatórios    | BarChart3      | Métricas e qualidade    |
| Integrações   | Plug           | LLMs e APIs             |
| Auditoria     | ShieldCheck    | Histórico de ações      |
| Plano         | CreditCard     | Uso e cobrança          |
| Configurações | Settings       | Preferências            |

---

## 6.3 Topbar

Elementos da topbar:

```text
[Busca global] [Organização atual] [Plano] [Notificações] [Usuário]
```

Comportamentos:

* busca global por projeto, URL, domínio, documento ou chunk;
* seletor de organização;
* badge do plano atual;
* indicador de uso mensal;
* menu do usuário.

---

# 7. Design System

## 7.1 Botões

### Botão primário

Uso:

* criar projeto;
* iniciar crawler;
* exportar dataset;
* enviar página pela extensão.

Visual:

```text
Fundo indigo
Texto branco
Altura 40px
Border-radius 10px
Ícone opcional à esquerda
```

Exemplo:

```text
[+ Novo Projeto]
[▶ Iniciar Crawling]
[⬇ Exportar JSONL]
```

---

### Botão secundário

Uso:

* cancelar;
* visualizar;
* abrir detalhes;
* configurar.

Visual:

```text
Fundo branco ou transparente
Borda slate
Texto slate
```

---

### Botão destrutivo

Uso:

* cancelar job;
* remover domínio;
* rejeitar documento;
* excluir dataset.

Visual:

```text
Fundo rose
Texto branco
```

---

## 7.2 Cards

Cards devem ter:

```text
border-radius: 16px
padding: 20px
border: 1px solid
shadow suave
```

Tipos de cards:

| Tipo         | Uso                      |
| ------------ | ------------------------ |
| KPI Card     | Métricas rápidas         |
| Status Card  | Estado de job ou domínio |
| Project Card | Resumo de projeto        |
| Dataset Card | Exportações              |
| Alert Card   | Avisos de segurança      |
| Quality Card | Score do dataset         |

---

## 7.3 Badges

| Estado     | Badge            | Cor      |
| ---------- | ---------------- | -------- |
| Descoberto | `discovered`     | Azul     |
| Coletado   | `crawled`        | Cyan     |
| Extraído   | `extracted`      | Indigo   |
| Limpo      | `cleaned`        | Verde    |
| Chunked    | `chunked`        | Roxo     |
| Revisão    | `pending_review` | Amarelo  |
| Aprovado   | `approved`       | Verde    |
| Rejeitado  | `rejected`       | Vermelho |
| Exportado  | `exported`       | Slate    |
| Falha      | `failed`         | Vermelho |

---

## 7.4 Tabelas

Tabelas devem ter:

* cabeçalho fixo quando houver muitos dados;
* filtro por status;
* busca por texto;
* paginação;
* ações por linha;
* seleção em massa;
* badges de estado;
* coluna de origem.

Exemplo de tabela de documentos:

| Status         | Título       | URL              | Qualidade | Chunks | Origem   | Ações    |
| -------------- | ------------ | ---------------- | --------: | -----: | -------- | -------- |
| approved       | Guia de Uso  | `/docs/guia`     |       91% |     12 | SaaS     | Ver      |
| pending_review | Tela Interna | `/manual/tela-x` |       76% |      5 | Extensão | Revisar  |
| failed         | FAQ antiga   | `/faq`           |         — |      — | SaaS     | Ver erro |

---

# 8. Componentes Principais

## 8.1 Project Switcher

Componente para alternar entre projetos.

Visual:

```text
Projeto atual
Domínio principal
Status do projeto
```

Exemplo:

```text
Projeto: Base de Conhecimento
empresa.com.br
● Ativo
```

---

## 8.2 Domain Scope Card

Card para mostrar escopo autorizado.

```text
Domínio: empresa.com.br
Status: Validado
Subdomínios: Permitidos
Profundidade: 3 níveis
Limite: 1.000 páginas
```

Ações:

* editar escopo;
* validar domínio;
* ver URLs bloqueadas;
* testar URL.

---

## 8.3 Job Progress Timeline

Timeline visual do crawler:

```text
1. URLs descobertas
2. Páginas coletadas
3. Texto extraído
4. Conteúdo limpo
5. Chunks gerados
6. Revisão pendente
7. Dataset pronto
```

Cada etapa deve ter:

* status;
* quantidade;
* tempo;
* erros.

---

## 8.4 Quality Score

Componente de qualidade do dataset.

Exemplo:

```text
Score geral: 87%
Duplicidade: 4%
Falhas: 2%
Chunks válidos: 94%
Revisão pendente: 18 documentos
```

Visual:

* círculo de progresso;
* cor por faixa;
* tooltip explicativo.

Faixas:

|  Score | Estado    |
| -----: | --------- |
| 90–100 | Excelente |
|  75–89 | Bom       |
|  60–74 | Atenção   |
|   0–59 | Ruim      |

---

## 8.5 Chunk Viewer

Visualização de chunk:

```text
Chunk #004
Documento: Guia de Uso
URL: https://empresa.com.br/docs/guia
Tokens estimados: 780
Origem: SaaS Crawler
Qualidade: 91%
```

Área de texto:

```text
Trecho do conteúdo preparado para uso em RAG...
```

Ações:

* copiar chunk;
* abrir documento;
* aprovar;
* rejeitar;
* editar;
* ver metadados.

---

# 9. Telas Hi-Fi do SaaS

---

# 9.1 Tela de Login

## Objetivo

Permitir acesso seguro ao SaaS.

## Layout

```text
┌─────────────────────────────────────────────┐
│                                             │
│        CrawlMind                            │
│        Transforme sites em datasets LLM     │
│                                             │
│        [ Email                         ]    │
│        [ Senha                         ]    │
│                                             │
│        [ Entrar ]                           │
│                                             │
│        Criar conta | Esqueci minha senha    │
│                                             │
└─────────────────────────────────────────────┘
```

## Elementos visuais

* painel central com sombra suave;
* fundo com gradiente discreto indigo/cyan;
* ilustração abstrata de crawler + dataset;
* destaque para segurança e rastreabilidade.

---

# 9.2 Tela de Onboarding

## Objetivo

Guiar o usuário até o primeiro projeto.

## Passos

```text
1. Criar organização
2. Criar primeiro projeto
3. Cadastrar domínio
4. Definir escopo
5. Executar primeiro crawler
```

## Layout

```text
┌──────────────────────────────────────────────┐
│ Vamos criar seu primeiro dataset para IA     │
│                                              │
│ Etapa 2 de 5                                 │
│ ███████░░░░░░░░░░░░                          │
│                                              │
│ Nome do projeto                              │
│ [ Base de Conhecimento                      ]│
│                                              │
│ Finalidade                                   │
│ [ RAG / Embeddings / Fine-tuning            ]│
│                                              │
│ [ Voltar ]                       [ Continuar ]│
└──────────────────────────────────────────────┘
```

---

# 9.3 Dashboard Principal

## Objetivo

Mostrar visão geral da organização.

## Layout

```text
Dashboard
Resumo da organização, jobs recentes e qualidade dos datasets

[ Novo Projeto ] [ Novo Job ] [ Exportar Dataset ]

┌──────────────┬──────────────┬──────────────┬──────────────┐
│ Projetos     │ Páginas      │ Chunks       │ Qualidade    │
│ 8            │ 24.300       │ 91.200       │ 87%          │
└──────────────┴──────────────┴──────────────┴──────────────┘

┌─────────────────────────────┬─────────────────────────────┐
│ Jobs em execução            │ Qualidade dos datasets       │
│ - empresa.com.br 72%        │ gráfico de score             │
│ - docs.site.com 41%         │                             │
└─────────────────────────────┴─────────────────────────────┘

┌────────────────────────────────────────────────────────────┐
│ Atividades recentes                                         │
│ - Dataset exportado por Ana                                 │
│ - Domínio validado por João                                 │
│ - 18 documentos aguardando revisão                          │
└────────────────────────────────────────────────────────────┘
```

## Cards KPI

| Card               | Valor  |
| ------------------ | ------ |
| Projetos ativos    | 8      |
| Páginas coletadas  | 24.300 |
| Documentos gerados | 18.900 |
| Chunks gerados     | 91.200 |
| Score médio        | 87%    |
| Pendências         | 18     |

---

# 9.4 Tela de Projetos

## Objetivo

Listar e gerenciar projetos.

## Layout

```text
Projetos
Organize datasets por produto, cliente, domínio ou finalidade

[ + Novo Projeto ]

┌─────────────────────────────────────────────────────────────┐
│ Buscar projeto...                         Filtro: Todos     │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│ Base de Conhecimento                                        │
│ empresa.com.br                                              │
│ 12.000 páginas | 42.000 chunks | Score 91%                  │
│ Status: Ativo                                               │
│ [Abrir] [Novo Job] [Exportar]                               │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│ Documentação Técnica                                        │
│ docs.empresa.com.br                                         │
│ 4.800 páginas | 18.400 chunks | Score 88%                   │
│ Status: Revisão pendente                                    │
│ [Abrir] [Revisar] [Exportar]                                │
└─────────────────────────────────────────────────────────────┘
```

---

# 9.5 Detalhe do Projeto

## Objetivo

Ser a página central do projeto.

## Abas

```text
Visão Geral | Domínios | Jobs | Documentos | Chunks | Datasets | Configurações
```

## Layout

```text
Base de Conhecimento
empresa.com.br

[ Novo Job ] [ Captura Manual ] [ Exportar Dataset ]

┌──────────────┬──────────────┬──────────────┬──────────────┐
│ Documentos   │ Chunks       │ Qualidade    │ Pendências   │
│ 8.320        │ 41.902       │ 91%          │ 12           │
└──────────────┴──────────────┴──────────────┴──────────────┘

Pipeline atual
Descoberto → Coletado → Extraído → Limpo → Chunked → Revisão → Exportado

Domínios autorizados
- empresa.com.br
- docs.empresa.com.br
- ajuda.empresa.com.br

Últimos jobs
Tabela com status, progresso, duração e falhas
```

---

# 9.6 Tela de Domínios

## Objetivo

Gerenciar domínios permitidos e regras de escopo.

## Layout

```text
Domínios autorizados
Controle quais sites podem ser coletados

[ + Adicionar domínio ]

┌─────────────────────────────────────────────────────────────┐
│ empresa.com.br                                              │
│ Status: Validado                                            │
│ Subdomínios: Permitidos                                     │
│ Caminhos permitidos: /docs, /ajuda, /blog                   │
│ Caminhos bloqueados: /login, /admin, /checkout              │
│ [Editar escopo] [Testar URL] [Remover]                      │
└─────────────────────────────────────────────────────────────┘
```

## Modal de escopo

Campos:

* domínio;
* permitir subdomínios;
* URLs iniciais;
* caminhos permitidos;
* caminhos bloqueados;
* profundidade máxima;
* limite de páginas;
* ignorar parâmetros;
* exigir revisão manual;
* bloquear dados sensíveis.

---

# 9.7 Criar Job de Crawling

## Objetivo

Criar execução de coleta com configuração guiada.

## Modelo

Wizard em 4 etapas.

```text
Etapa 1 — Origem
Etapa 2 — Escopo
Etapa 3 — Processamento
Etapa 4 — Revisão
```

---

## Etapa 1 — Origem

```text
Criar novo job

Projeto
[ Base de Conhecimento ]

Domínio
[ empresa.com.br ]

URLs iniciais
[ https://empresa.com.br/docs ]
[ https://empresa.com.br/ajuda ]

[ Continuar ]
```

---

## Etapa 2 — Escopo

```text
Profundidade máxima
[ 3 ]

Limite de páginas
[ 1000 ]

Caminhos permitidos
[ /docs ]
[ /ajuda ]

Caminhos bloqueados
[ /login ]
[ /admin ]

[ Voltar ] [ Continuar ]
```

---

## Etapa 3 — Processamento

```text
[✓] Extrair conteúdo principal
[✓] Remover menus e rodapés
[✓] Deduplicar conteúdo
[✓] Gerar chunks para RAG
[✓] Calcular score de qualidade

Tamanho médio do chunk
[ 800 tokens ]

Sobreposição
[ 120 tokens ]
```

---

## Etapa 4 — Revisão

```text
Revisão manual
( ) Não exigir revisão
(•) Exigir revisão apenas para baixa qualidade
( ) Exigir revisão para todos os documentos

Qualidade mínima
[ 70% ]

[ Criar e iniciar job ]
```

---

# 9.8 Detalhe do Job

## Objetivo

Acompanhar execução do crawler.

## Layout

```text
Job #CRW-000241
empresa.com.br/docs

Status: Em execução
Progresso: 72%

┌──────────────┬──────────────┬──────────────┬──────────────┐
│ Descobertas  │ Coletadas    │ Falhas       │ Chunks       │
│ 1.240        │ 892          │ 18           │ 6.421        │
└──────────────┴──────────────┴──────────────┴──────────────┘

Pipeline
[Descoberta ✓] [Coleta ✓] [Extração ●] [Limpeza] [Chunks] [Revisão]

URLs processadas
Tabela com URL, status, tempo, qualidade e erro

Logs
[14:32] URL coletada com sucesso
[14:33] Conteúdo duplicado ignorado
[14:34] Falha HTTP 404
```

## Ações

* pausar;
* cancelar;
* reexecutar;
* baixar logs;
* ver falhas;
* abrir documentos gerados.

---

# 9.9 Tela de Documentos

## Objetivo

Exibir documentos limpos gerados a partir das páginas.

## Layout

```text
Documentos
Textos extraídos e limpos para uso em dataset

Busca por título, URL ou conteúdo...
Filtros: Status | Origem | Qualidade | Domínio

Tabela:
Status | Título | URL | Qualidade | Chunks | Origem | Atualizado | Ações
```

## Drawer lateral de documento

Ao clicar em um documento:

```text
Título
URL
Domínio
Origem
Score
Status

Texto limpo
Área de leitura com scroll

Ações:
[Aprovar] [Rejeitar] [Editar] [Ver chunks]
```

---

# 9.10 Tela de Revisão

## Objetivo

Permitir aprovação, rejeição ou edição de documentos.

## Layout

```text
Revisão de Conteúdo

┌───────────────────────────────┬───────────────────────────────┐
│ Lista de documentos pendentes │ Visualização do documento      │
│                               │                               │
│ - Guia de Uso                 │ Título                         │
│ - FAQ Produto                 │ URL                            │
│ - Tela Interna                │ Score                          │
│                               │ Texto limpo                    │
└───────────────────────────────┴───────────────────────────────┘

Ações:
[ Aprovar ] [ Rejeitar ] [ Editar texto ] [ Marcar sensível ]
```

## Estados da revisão

| Estado    | Ação                       |
| --------- | -------------------------- |
| Pendente  | precisa de decisão         |
| Aprovado  | entra no dataset           |
| Rejeitado | não entra no dataset       |
| Editado   | texto alterado manualmente |
| Sensível  | exige cuidado adicional    |

---

# 9.11 Tela de Chunks

## Objetivo

Visualizar partes do dataset usadas por LLM/RAG.

## Layout

```text
Chunks
Partes geradas a partir dos documentos aprovados

Filtros:
Projeto | Documento | Qualidade | Tokens | Origem

┌─────────────────────────────────────────────────────────────┐
│ Chunk #001                                                  │
│ Documento: Guia de Uso                                      │
│ Tokens: 780                                                 │
│ Score: 91%                                                  │
│ Texto: ...                                                  │
│ [Copiar] [Abrir documento] [Metadados]                      │
└─────────────────────────────────────────────────────────────┘
```

---

# 9.12 Tela de Datasets

## Objetivo

Gerenciar exportações.

## Layout

```text
Datasets

[ + Gerar novo dataset ]

┌─────────────────────────────────────────────────────────────┐
│ Dataset RAG — Base de Conhecimento                          │
│ Formato: JSONL                                              │
│ Chunks: 41.902                                              │
│ Versão: v1.3                                                │
│ Criado em: 18/05/2026                                       │
│ [Baixar] [Ver detalhes] [Comparar]                          │
└─────────────────────────────────────────────────────────────┘
```

## Modal de exportação

Campos:

* projeto;
* tipo de dataset;
* documentos incluídos;
* status incluídos;
* formato;
* incluir metadados;
* gerar versão;
* nome da exportação.

Formatos:

| Formato  | Uso                          |
| -------- | ---------------------------- |
| JSONL    | RAG, fine-tuning e pipelines |
| CSV      | análise tabular              |
| Markdown | leitura humana               |
| ZIP      | pacote completo              |

---

# 9.13 Tela de Relatórios

## Objetivo

Mostrar qualidade e resultado das coletas.

## Métricas

| Métrica             | Visual      |
| ------------------- | ----------- |
| Páginas descobertas | KPI         |
| Páginas coletadas   | KPI         |
| Falhas              | KPI + lista |
| Duplicidade         | gráfico     |
| Qualidade média     | score       |
| Chunks válidos      | barra       |
| Conteúdo pendente   | lista       |
| Volume por domínio  | gráfico     |
| Evolução por versão | linha       |

## Layout

```text
Relatórios

Período: Últimos 30 dias
Projeto: Base de Conhecimento

┌──────────────┬──────────────┬──────────────┬──────────────┐
│ Coletadas    │ Falhas       │ Duplicidade  │ Qualidade    │
│ 24.300       │ 2.1%         │ 4.4%         │ 87%          │
└──────────────┴──────────────┴──────────────┴──────────────┘

Gráfico: páginas coletadas por dia
Gráfico: qualidade por domínio
Tabela: principais falhas
```

---

# 9.14 Tela de Integrações

## Objetivo

Conectar o SaaS a provedores de IA e ferramentas externas.

## Layout

```text
Integrações

LLM Providers
┌────────────────────────────────────────────┐
│ OpenAI                                     │
│ Status: Não conectado                      │
│ [Configurar]                               │
└────────────────────────────────────────────┘

Embeddings
┌────────────────────────────────────────────┐
│ Provedor de embeddings                     │
│ Status: Configurado                        │
│ [Editar]                                   │
└────────────────────────────────────────────┘

API
┌────────────────────────────────────────────┐
│ Chaves de API                              │
│ [Gerar nova chave]                         │
└────────────────────────────────────────────┘
```

---

# 9.15 Tela de Auditoria

## Objetivo

Exibir histórico rastreável de ações.

## Layout

```text
Auditoria

Filtros:
Usuário | Projeto | Tipo de ação | Data

Tabela:
Data | Usuário | Ação | Projeto | Origem | Detalhes

Exemplos:
18/05/2026 14:10 | Ana | Exportou dataset | Base KB | SaaS
18/05/2026 14:04 | João | Enviou página | Manual Interno | Extensão
18/05/2026 13:50 | Admin | Removeu domínio | Projeto X | SaaS
```

---

# 9.16 Tela de Plano e Cobrança

## Objetivo

Mostrar uso, limites e planos.

## Layout

```text
Plano atual: Pro

Uso mensal
Páginas coletadas: 8.200 / 20.000
Projetos: 4 / 5
Usuários: 1 / 1
Exportações: 12

[ Fazer upgrade ]

Tabela de planos:
Free | Pro | Team | Enterprise
```

---

# 10. Design da Extensão do Navegador

## 10.1 Direção visual

A extensão deve parecer uma versão compacta do SaaS.

Características:

* largura aproximada de 360px;
* layout em cards;
* ações claras;
* pouco texto;
* foco em capturar, revisar e enviar.

---

# 10.2 Tela de Conexão

```text
┌──────────────────────────────┐
│ CrawlMind                    │
│ Conecte sua conta SaaS       │
│                              │
│ [ Conectar ao SaaS ]         │
│                              │
│ Ambiente                     │
│ app.crawlmind.com            │
└──────────────────────────────┘
```

---

# 10.3 Seleção de Projeto

```text
┌──────────────────────────────┐
│ Selecionar projeto           │
│                              │
│ Organização                  │
│ [ Minha Empresa ▼ ]          │
│                              │
│ Projeto                      │
│ [ Base de Conhecimento ▼ ]   │
│                              │
│ [ Continuar ]                │
└──────────────────────────────┘
```

---

# 10.4 Página Atual

```text
┌──────────────────────────────┐
│ Página atual                 │
│                              │
│ empresa.com.br               │
│ Guia de Uso                  │
│                              │
│ Status: Domínio permitido    │
│ Já capturada: Não            │
│                              │
│ [ Capturar página ]          │
│ [ Capturar seleção ]         │
└──────────────────────────────┘
```

---

# 10.5 Prévia de Texto

```text
┌──────────────────────────────┐
│ Prévia do conteúdo           │
│                              │
│ 1.280 palavras extraídas     │
│ Qualidade estimada: Boa      │
│                              │
│ ┌──────────────────────────┐ │
│ │ Texto visível capturado  │ │
│ │ da página atual...       │ │
│ └──────────────────────────┘ │
│                              │
│ [ Enviar ao SaaS ]           │
│ [ Editar ] [ Cancelar ]      │
└──────────────────────────────┘
```

---

# 10.6 Envio Concluído

```text
┌──────────────────────────────┐
│ Conteúdo enviado             │
│                              │
│ ✓ Página enviada com sucesso │
│                              │
│ Projeto: Base Conhecimento   │
│ Status: Aguardando revisão   │
│                              │
│ [ Abrir no SaaS ]            │
│ [ Capturar outra página ]    │
└──────────────────────────────┘
```

---

# 10.7 Histórico da Extensão

```text
┌──────────────────────────────┐
│ Histórico                    │
│                              │
│ Guia de Uso                  │
│ empresa.com.br               │
│ Enviado hoje às 14:10        │
│                              │
│ FAQ Produto                  │
│ ajuda.empresa.com.br         │
│ Enviado ontem às 09:42       │
└──────────────────────────────┘
```

---

# 11. Responsividade

## Desktop

Uso principal do SaaS.

```text
Sidebar fixa
Topbar fixa
Conteúdo em grid
Tabelas completas
Drawers laterais
```

## Tablet

```text
Sidebar recolhível
Cards em 2 colunas
Tabelas com scroll horizontal
```

## Mobile

```text
Sidebar vira bottom navigation ou menu drawer
Cards em 1 coluna
Tabelas viram listas
Ações principais fixas no rodapé
```

---

# 12. Estados Visuais

## 12.1 Empty State

Exemplo para projetos:

```text
Nenhum projeto criado ainda

Crie seu primeiro projeto para transformar páginas web
em datasets prontos para LLM.

[ Criar projeto ]
```

---

## 12.2 Loading State

Usar skeletons:

```text
████████████████
██████████
████████████████████
```

Aplicar em:

* cards;
* tabelas;
* gráficos;
* lista de documentos;
* chunks.

---

## 12.3 Error State

Exemplo:

```text
Não foi possível carregar os jobs

Verifique sua conexão ou tente novamente.

[ Tentar novamente ]
```

---

## 12.4 Permission State

Exemplo:

```text
Você não tem permissão para exportar datasets

Solicite acesso a um administrador da organização.
```

---

# 13. Microcopy

## Botões

| Ação            | Texto            |
| --------------- | ---------------- |
| Criar projeto   | Novo Projeto     |
| Criar job       | Novo Job         |
| Iniciar crawler | Iniciar Crawling |
| Pausar          | Pausar Job       |
| Cancelar        | Cancelar Job     |
| Exportar        | Exportar Dataset |
| Aprovar         | Aprovar Conteúdo |
| Rejeitar        | Rejeitar         |
| Enviar extensão | Enviar ao SaaS   |
| Capturar página | Capturar Página  |

---

## Mensagens de sucesso

```text
Projeto criado com sucesso.
Domínio validado com sucesso.
Job iniciado com sucesso.
Documento aprovado para o dataset.
Dataset exportado com sucesso.
Página enviada pela extensão.
```

---

## Mensagens de alerta

```text
Este domínio ainda não foi validado.
Este conteúdo possui baixa qualidade.
Este documento parece duplicado.
Este job atingiu o limite do plano.
Esta página está fora do escopo permitido.
```

---

## Mensagens de erro

```text
Não foi possível iniciar o crawler.
A URL informada está fora do domínio permitido.
O conteúdo não pôde ser extraído.
A extensão não está conectada ao SaaS.
Você não tem permissão para esta ação.
```

---

# 14. Navegação Recomendada

## Fluxo principal SaaS

```text
Login
  ↓
Onboarding
  ↓
Dashboard
  ↓
Novo Projeto
  ↓
Cadastrar Domínio
  ↓
Criar Job
  ↓
Acompanhar Job
  ↓
Revisar Documentos
  ↓
Ver Chunks
  ↓
Exportar Dataset
```

---

## Fluxo principal extensão

```text
Conectar ao SaaS
  ↓
Selecionar Organização
  ↓
Selecionar Projeto
  ↓
Detectar Página Atual
  ↓
Capturar Texto
  ↓
Pré-visualizar
  ↓
Enviar ao SaaS
  ↓
Acompanhar Status
```

---

# 15. Componentes por Atomic Design

## 15.1 Atoms

| Componente | Uso             |
| ---------- | --------------- |
| Button     | ações           |
| Input      | formulários     |
| Select     | filtros         |
| Badge      | status          |
| Icon       | navegação       |
| Tooltip    | explicações     |
| Spinner    | carregamento    |
| Checkbox   | opções          |
| Radio      | escolhas únicas |
| Avatar     | usuário         |

---

## 15.2 Molecules

| Componente    | Uso                |
| ------------- | ------------------ |
| SearchBar     | busca global       |
| StatusBadge   | status padronizado |
| MetricCard    | KPI                |
| DomainCard    | domínio            |
| ProjectCard   | projeto            |
| JobStatus     | progresso          |
| QualityScore  | qualidade          |
| EmptyState    | ausência de dados  |
| ConfirmDialog | confirmação        |
| FilterGroup   | filtros            |

---

## 15.3 Organisms

| Componente         | Uso                  |
| ------------------ | -------------------- |
| AppSidebar         | navegação principal  |
| AppTopbar          | busca e conta        |
| ProjectHeader      | cabeçalho do projeto |
| JobTimeline        | andamento do crawler |
| DocumentsTable     | documentos           |
| ChunkViewer        | chunks               |
| ReviewPanel        | revisão              |
| ExportDatasetModal | exportação           |
| AuditTable         | auditoria            |
| ExtensionPopup     | extensão             |

---

## 15.4 Templates

| Template        | Uso               |
| --------------- | ----------------- |
| AuthLayout      | login e cadastro  |
| DashboardLayout | SaaS autenticado  |
| ProjectLayout   | telas de projeto  |
| SettingsLayout  | configurações     |
| ExtensionLayout | popup da extensão |

---

# 16. Prioridade de Implementação Visual

## MVP Visual

| Prioridade | Tela                  |
| ---------- | --------------------- |
| Alta       | Login                 |
| Alta       | Onboarding            |
| Alta       | Dashboard             |
| Alta       | Projetos              |
| Alta       | Detalhe do Projeto    |
| Alta       | Domínios              |
| Alta       | Criar Job             |
| Alta       | Detalhe do Job        |
| Alta       | Documentos            |
| Alta       | Chunks                |
| Alta       | Exportar Dataset      |
| Média      | Revisão               |
| Média      | Relatórios            |
| Média      | Auditoria             |
| Média      | Plano                 |
| Média      | Extensão              |
| Baixa      | Integrações avançadas |

---

# 17. Resultado Esperado

Ao final da implementação visual, o produto deve parecer:

```text
Uma plataforma SaaS profissional para transformar conteúdo web
em datasets confiáveis, rastreáveis e prontos para LLM.
```

O usuário deve conseguir entender rapidamente:

* qual projeto está ativo;
* quais domínios estão autorizados;
* quais jobs estão rodando;
* quantos documentos foram gerados;
* qual a qualidade do dataset;
* o que precisa de revisão;
* como exportar os dados;
* quais páginas foram capturadas pela extensão.

---

# 18. Checklist de Aceite do Design

| Item                                      | Status esperado |
| ----------------------------------------- | --------------- |
| SaaS possui sidebar e topbar consistentes | Obrigatório     |
| Dashboard mostra KPIs principais          | Obrigatório     |
| Projeto possui página central própria     | Obrigatório     |
| Job mostra progresso visual               | Obrigatório     |
| Documentos possuem status e qualidade     | Obrigatório     |
| Chunks exibem origem e metadados          | Obrigatório     |
| Exportação possui fluxo claro             | Obrigatório     |
| Revisão humana é simples e visual         | Obrigatório     |
| Extensão possui fluxo curto de captura    | Obrigatório     |
| Estados vazios existem                    | Obrigatório     |
| Estados de erro existem                   | Obrigatório     |
| Dark mode é suportado                     | Recomendado     |
| Layout é responsivo                       | Obrigatório     |
| Badges de status são padronizadas         | Obrigatório     |
| Ações críticas pedem confirmação          | Obrigatório     |

---

# 19. Direção Final

A interface deve ser construída como um produto SaaS de IA com foco em:

* clareza operacional;
* segurança de coleta;
* rastreabilidade;
* revisão humana;
* exportação simples;
* visual profissional;
* baixo atrito para gerar o primeiro dataset.

A primeira versão deve priorizar o SaaS.

A extensão deve entrar como complemento visualmente integrado ao produto, com experiência simples:

```text
Selecionar projeto → capturar página → revisar texto → enviar ao SaaS
```
