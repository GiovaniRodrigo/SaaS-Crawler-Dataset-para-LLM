# AGENTS.md

Instrucoes para agentes compativeis com Codex.

Leia primeiro:

1. `.agents/llm-config.md`
2. `.agents/project-context.md`
3. `docs/00_INDEX.md`

Skills locais disponiveis:

- `.agents/skills/laravel-inertia/SKILL.md`
- `.agents/skills/crawler-dataset/SKILL.md`
- `.agents/skills/browser-extension/SKILL.md`

## Regras de trabalho

- Responda em portugues do Brasil, a menos que o usuario peça outro idioma.
- Preserve a arquitetura existente: Laravel, Inertia, React, TypeScript, Tailwind, Actions, Contracts, Services, Policies e Form Requests.
- Antes de alterar comportamento, consulte os docs em `docs/` e o codigo correspondente.
- Nao reverta alteracoes do usuario.
- Prefira mudancas pequenas, verificaveis e alinhadas aos padroes locais.
- Ao mexer em backend, rode `composer run test` quando viavel.
- Ao mexer em frontend, rode `npm run build` quando viavel.
- Atualize a documentacao quando mudar fluxo, regra de negocio, setup ou arquitetura.

