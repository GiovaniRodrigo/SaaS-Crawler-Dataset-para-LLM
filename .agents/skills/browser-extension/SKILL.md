---
name: browser-extension
description: Use ao alterar a extensao de navegador, captura via Sanctum ou endpoints usados pelo popup.
---

# Skill: Browser Extension

## Quando usar

Use esta skill para tarefas em `browser-extension/` ou nos endpoints de captura da extensao.

## Arquivos relevantes

- `browser-extension/manifest.json`
- `browser-extension/popup.html`
- `browser-extension/popup.js`
- `routes/api.php`
- `app/Http/Requests/StoreExtensionCaptureRequest.php`
- Controllers de API relacionados a captura
- Models `Project`, `Document`, `Chunk` quando a captura gerar conteudo

## Cuidados

- A API da extensao deve permanecer protegida por Sanctum.
- Capturas devem pertencer a projeto do usuario autenticado.
- Nao codifique tokens reais no repositorio.
- Mantenha configuracao de host/API facil de ajustar para ambiente local.
- Preserve consentimento: a captura deve ocorrer por acao explicita do usuario.

## Verificacao

- Teste validacoes do endpoint quando alterar backend.
- Revise permissões do `manifest.json` quando mexer na extensao.
- Atualize docs se mudar fluxo de instalacao, token ou endpoint.

