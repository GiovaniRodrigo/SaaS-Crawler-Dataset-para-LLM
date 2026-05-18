# SaaS Crawler Dataset para LLM

SaaS Laravel + Inertia + React para transformar páginas web autorizadas em documentos, chunks e datasets JSONL utilizáveis por LLMs.

## Objetivo

Permitir que usuários organizem coletas em projetos, autorizem domínios, executem crawling controlado, processem texto e exportem datasets rastreáveis para uso em LLMs.

## Funcionalidades

- Autenticação de usuários.
- Projetos por usuário.
- Cadastro de domínios autorizados.
- Jobs de crawling com seed URLs, allow/deny paths, profundidade e limite de páginas.
- Extração e limpeza de texto.
- Deduplicação por hash de conteúdo.
- Geração de documentos e chunks.
- Exportação JSONL de documentos e chunks.
- API protegida por Sanctum para captura via extensão.
- Extensão de navegador simples em `browser-extension/`.
- Planejado: organizações, revisão de conteúdo, auditoria, relatórios e integração LLM.

## Stack

| Camada | Tecnologia |
|---|---|
| Backend | PHP 8.3, Laravel 13.x |
| Frontend | Inertia.js, React 18, TypeScript |
| Estilo | Tailwind CSS |
| API Token | Laravel Sanctum |
| Fila | Laravel Queue |
| Banco local | SQLite |
| Build | Vite |

## Como Rodar

```bash
composer install
cp .env.example .env
php artisan key:generate
php artisan migrate
npm install
composer run dev
```

Build:

```bash
npm run build
```

Testes:

```bash
composer run test
```

## Documentação

A documentação completa está em:

- [Índice da Documentação](./docs/00_INDEX.md)

## Status

O MVP técnico de crawler, documentos, chunks, exportação JSONL e captura via extensão está parcialmente implementado. O isolamento atual é por usuário; organizações/multi-tenant por organização ainda não foram encontrados no código.

## Roadmap

Próximas entregas de menor custo:

- Fortalecer testes dos services e fluxos principais.
- Melhorar UX de execução e acompanhamento de crawler.
- Criar gestão simples de tokens para extensão.
- Versionar exports JSONL.
- Adicionar revisão/aprovação de documentos antes da exportação.
