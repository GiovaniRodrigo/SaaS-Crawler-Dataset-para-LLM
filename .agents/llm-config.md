# Configuracao LLM

Este arquivo concentra instrucoes compartilhadas para Codex, Gemini e Claude.

## Perfil do projeto

- Nome: SaaS Crawler Dataset para LLM
- Objetivo: transformar paginas web autorizadas em documentos, chunks e datasets JSONL rastreaveis.
- Idioma preferencial: portugues do Brasil.
- Stack backend: PHP 8.3, Laravel 13, Sanctum, filas Laravel, SQLite local.
- Stack frontend: Inertia, React, TypeScript, Tailwind CSS, Vite.
- Extensao: Manifest V3 simples em `browser-extension/`.

## Comandos

Instalacao:

```bash
composer install
cp .env.example .env
php artisan key:generate
php artisan migrate
npm install
```

Desenvolvimento:

```bash
composer run dev
```

Build frontend:

```bash
npm run build
```

Testes:

```bash
composer run test
```

## Padroes de codigo

- Controllers orquestram requests, policies, actions e responses.
- Form Requests validam entradas HTTP.
- Actions representam casos de uso.
- Contracts definem interfaces de dominio/servico.
- Services implementam detalhes tecnicos.
- Policies protegem recursos por dono do projeto.
- Pages Inertia ficam em `resources/js/Pages`.
- Componentes reutilizaveis ficam em `resources/js/Components`.
- Tipos TypeScript ficam em `resources/js/Types` ou `resources/js/types`.
- Em qualquer implementacao, aplique a skill `.agents/skills/menor-custo-possivel/SKILL.md`: menor escopo funcional, menor risco e menor custo de manutencao que resolva o pedido.

## Cuidados obrigatorios

- Nao executar comandos destrutivos sem pedido explicito.
- Nao alterar credenciais, secrets ou `.env`.
- Nao introduzir dependencia nova sem necessidade clara.
- Nao trocar a arquitetura principal sem atualizar docs e justificar.
- Nao assumir multi-tenant por organizacao: hoje o isolamento observado e por usuario.
- Respeitar as regras de crawler: dominio autorizado, allow/deny paths, profundidade, limite de paginas e bloqueio de extensoes nao textuais.
- Manter exportacoes JSONL rastreaveis com URL, origem, projeto, hashes e metadados.

## Verificacao recomendada

- Backend/regra de negocio: `composer run test`.
- Frontend/tipos/build: `npm run build`.
- Mudancas de rotas: verificar `routes/web.php`, `routes/api.php`, controllers e pages Inertia relacionadas.
- Mudancas de dataset: verificar exporters, chunker, documentos, migrations e docs de regras de negocio.
