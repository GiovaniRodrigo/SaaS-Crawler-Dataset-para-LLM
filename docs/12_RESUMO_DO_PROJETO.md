# Resumo do Projeto

## TL;DR
O CrawlMind e um SaaS Laravel + Inertia + React para transformar paginas web autorizadas em datasets rastreaveis para uso com LLMs. Ele permite cadastrar projetos, controlar dominios e escopos de crawling, coletar paginas, extrair texto, gerar documentos e chunks, revisar qualidade e exportar JSONL.

---

## O Que o Projeto Faz

O projeto resolve o problema de montar datasets confiaveis a partir de conteudo web. Em vez de apenas baixar paginas, ele organiza um fluxo completo para coleta autorizada, limpeza, deduplicacao, curadoria, segmentacao e exportacao de dados.

Na pratica, o usuario cria um projeto, cadastra dominios permitidos, configura o escopo de coleta, executa crawlers, revisa os documentos gerados e exporta documentos ou chunks em JSONL. O sistema tambem aceita capturas manuais por uma extensao de navegador autenticada via Sanctum.

## Principais Capacidades

| Area | O que entrega |
|---|---|
| Projetos | Organiza datasets, dominios, crawls, documentos, chunks e exportacoes por contexto de trabalho |
| Dominios autorizados | Limita a coleta a sites permitidos, com opcao de permitir ou bloquear subdominios |
| Crawling | Executa jobs em fila para buscar paginas dentro de escopo definido |
| Escopo de URL | Respeita seed URLs, allow paths, deny paths, profundidade, limite de paginas, bloqueio de arquivos e regras de `robots.txt` |
| Extracao de texto | Remove HTML irrelevante, limpa conteudo e gera texto utilizavel |
| Deduplicacao | Evita documentos duplicados por hash de conteudo dentro do projeto |
| Qualidade e revisao | Calcula score de qualidade e permite aprovar ou rejeitar documentos antes da exportacao |
| Chunking | Segmenta documentos em partes menores com tamanho e overlap padronizados |
| Exportacao JSONL | Exporta documentos e chunks aprovados com metadados de origem e rastreabilidade |
| Historico de datasets | Registra exportacoes geradas com metadados e link de download |
| Extensao de navegador | Permite capturar manualmente conteudo de paginas para projetos do usuario |
| Auditoria | Registra acoes relevantes, como revisoes e atividades criticas |
| Dashboard e relatorios | Mostra metricas reais de projetos, crawls, documentos, qualidade e atividades |
| Busca semantica | Usa embeddings e pgvector para pesquisa semantica em chunks |
| Organizacoes | Suporta isolamento por organizacao em politicas, modelos e contexto ativo |

## Fluxo Principal

```text
Usuario cria ou seleciona uma organizacao
Usuario cria um projeto
Usuario cadastra dominios autorizados
Usuario define seed URLs, allow paths, deny paths e limites
Sistema executa o crawler em fila
Sistema valida escopo, robots.txt e tipos de arquivo
Sistema coleta paginas permitidas
Sistema extrai e limpa texto
Sistema deduplica por hash
Sistema cria documentos com score de qualidade
Sistema gera chunks
Usuario revisa e aprova documentos
Usuario exporta documentos ou chunks em JSONL
```

## Produto

O CrawlMind foi pensado para desenvolvedores, times de dados e equipes de conteudo que precisam transformar conteudo web em dados prontos para pipelines de IA. Os datasets exportados podem apoiar casos como RAG, fine-tuning, avaliacao de respostas, classificacao, enriquecimento e busca semantica.

O produto prioriza rastreabilidade: documentos e chunks preservam informacoes como projeto, URL, dominio, origem, hash, idioma, tokens estimados e metadados. Isso ajuda a saber de onde cada trecho veio e reduz risco de misturar conteudo sem contexto.

## Arquitetura

| Camada | Tecnologia / Padrao |
|---|---|
| Backend | PHP 8.3, Laravel 13, Actions, Services, Contracts, Policies e Form Requests |
| Frontend | Inertia, React 18, TypeScript, Tailwind CSS e Vite |
| Autenticacao/API | Laravel Breeze e Sanctum |
| Banco | SQLite local e suporte a PostgreSQL com pgvector para embeddings |
| Filas | Laravel Queue para execucao de crawlers e geracao de embeddings |
| Extensao | Manifest V3 em `browser-extension/` |
| Documentacao | Guias em `docs/` e instrucoes para agentes em `.agents/` |

## Backend

O backend concentra as regras de negocio em Actions e mantem os Controllers como pontos de orquestracao. Requests validam entradas HTTP, Policies controlam acesso, Contracts definem interfaces e Services implementam detalhes tecnicos como crawling, limpeza de texto, chunking, exportacao e embeddings.

Os principais modelos do dominio incluem `Organization`, `Project`, `Domain`, `CrawlJob`, `CrawledPage`, `Document`, `Chunk`, `ChunkEmbedding`, `DatasetExport` e `AuditLog`.

## Frontend

O frontend usa paginas Inertia em React para entregar a experiencia autenticada do SaaS. Existem telas para dashboard, projetos, dominios, crawl jobs, documentos, revisao, chunks, configuracoes, tokens de API, auditoria, relatorios e historico de datasets.

O projeto tambem possui componentes reutilizaveis organizados em atomos, moleculas e organismos, alem de hooks e tipos TypeScript para manter consistencia entre telas.

## Crawler e Dataset

O crawler e controlado por regras de escopo para evitar coleta fora do permitido. Ele valida dominio, subdominio, paths permitidos e bloqueados, profundidade, limite de paginas, extensoes nao textuais e regras de `robots.txt`. Tambem aplica delay de politeness antes das requisicoes.

Depois da coleta, o sistema extrai texto principal, limpa o conteudo, descarta textos pequenos, calcula hash, cria documentos rastreaveis e gera chunks com tokens estimados. As exportacoes JSONL priorizam documentos aprovados, mantendo o dataset mais adequado para uso posterior.

## Extensao de Navegador

A extensao permite capturar conteudo diretamente do navegador. Ela se comunica com a API protegida por Sanctum, lista projetos disponiveis e envia texto da pagina para o backend, respeitando o usuario autenticado e a configuracao da URL da API.

## Seguranca e Isolamento

O sistema usa autenticacao web, tokens Sanctum para API e Policies para proteger recursos. O isolamento evoluiu para considerar organizacoes, com verificacoes de pertencimento e contexto ativo. A captura por extensao so pode gravar em projetos acessiveis ao usuario autenticado.

## O Que Ainda Esta no Roadmap

| Item | Situacao |
|---|---|
| Integracao direta com LLM para enriquecimento automatico | Planejado |
| Relatorios ainda mais avancados | Em evolucao |
| Melhorias adicionais no crawler para sites complexos | Em evolucao |
| Versionamento mais completo de datasets e pipelines | Em evolucao |

## Onde Encontrar Mais Detalhes

| Documento | Conteudo |
|---|---|
| `docs/01_VISAO_GERAL.md` | Problema, solucao, publico-alvo e proposta de valor |
| `docs/02_MODULOS.md` | Modulos do sistema e dependencias |
| `docs/03_FLUXOS_PRINCIPAIS.md` | Fluxos de uso do produto |
| `docs/04_REGRAS_DE_NEGOCIO.md` | Regras funcionais, seguranca, dataset e crawler |
| `docs/05_ARQUITETURA_OBSERVADA.md` | Stack, arquitetura e organizacao do codigo |
| `docs/08_STATUS_DO_PROJETO.md` | Status funcional por modulo |
| `docs/09_ROADMAP_MENOR_CUSTO.md` | Evolucao planejada |
| `docs/10_PENDENCIAS_E_RISCOS.md` | Riscos e pendencias conhecidas |
