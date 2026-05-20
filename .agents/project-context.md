# Contexto do Projeto

## Resumo

Este repositorio contem um SaaS Laravel + Inertia + React para criar datasets a partir de paginas web autorizadas. O fluxo principal e:

1. Usuario cria um projeto.
2. Usuario cadastra dominios autorizados.
3. Usuario cria e executa um crawl job.
4. O crawler coleta paginas dentro do escopo permitido.
5. O sistema extrai texto, deduplica conteudo e cria documentos.
6. O sistema gera chunks.
7. Usuario exporta documentos ou chunks em JSONL.

Tambem existe uma extensao de navegador simples para capturar conteudo via API protegida por Sanctum.

## Onde olhar

- Rotas web: `routes/web.php`
- Rotas API: `routes/api.php`
- Controllers: `app/Http/Controllers`
- Requests: `app/Http/Requests`
- Actions: `app/Actions`
- Contracts: `app/Contracts`
- Services: `app/Services`
- Models: `app/Models`
- Policies: `app/Policies`
- Jobs: `app/Jobs`
- Frontend: `resources/js`
- Extensao: `browser-extension`
- Docs: `docs`

- Projetos
- Dominios autorizados
- Crawl jobs
- Crawled pages
- Documentos (Revisão e Aprovação)
- Chunks
- Exportacao JSONL
- Captura via extensao
- Auditoria
- API Tokens

## Status funcional

- **CrawlMind (Rebranded)**: Identidade visual premium, Dashboard dinâmico e polimento de UI concluídos.
- **Curadoria**: Fluxo de revisão, aprovação e qualidade de documentos implementado.
- **SaaS Base**: Sistema de API Tokens e Logs de Auditoria funcional.
- **Crawler**: MVP de crawling, extração e exportação JSONL funcional.
- Extensao funcional via Sanctum.
- Organizações, relatórios avançados e integração direta com LLM estão no roadmap.

## Documentacao existente

Use `docs/00_INDEX.md` como indice. Os arquivos mais importantes para orientar mudancas sao:

- `docs/01_VISAO_GERAL.md`
- `docs/03_FLUXOS_PRINCIPAIS.md`
- `docs/04_REGRAS_DE_NEGOCIO.md`
- `docs/05_ARQUITETURA_OBSERVADA.md`
- `docs/06_COMO_RODAR.md`
- `docs/08_STATUS_DO_PROJETO.md`
- `docs/09_ROADMAP_MENOR_CUSTO.md`
- `docs/10_PENDENCIAS_E_RISCOS.md`

