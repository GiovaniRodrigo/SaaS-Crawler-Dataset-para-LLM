---
name: laravel-inertia
description: Use ao alterar backend Laravel, paginas Inertia, componentes React, rotas web, validacoes, policies ou fluxos autenticados.
---

# Skill: Laravel Inertia

## Quando usar

Use esta skill para tarefas em Laravel, Inertia, React, TypeScript e Tailwind neste projeto.

## Checklist

1. Identifique a rota em `routes/web.php` ou `routes/api.php`.
2. Verifique o controller correspondente em `app/Http/Controllers`.
3. Procure Form Requests em `app/Http/Requests`.
4. Procure Actions existentes em `app/Actions` antes de criar logica nova.
5. Confirme autorizacao em `app/Policies`.
6. Para UI, edite Pages em `resources/js/Pages` e componentes em `resources/js/Components`.
7. Reuse tipos existentes em `resources/js/Types` e `resources/js/types`.
8. Rode `composer run test` para backend e `npm run build` para frontend quando viavel.

## Padroes locais

- Controllers devem permanecer finos.
- Casos de uso devem ficar em Actions.
- Validacao deve ficar em Form Requests.
- Autorizacao deve passar por Policies.
- Evite logica de negocio dentro de componentes React.
- Mantenha UI consistente com layouts existentes.

