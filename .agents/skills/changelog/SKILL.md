---
name: changelog
description: Regras para registro obrigatório de toda implementação no CHANGELOG do projeto.
---

# Skill: Changelog

Esta skill define a obrigatoriedade de registrar todas as alterações, correções e novas funcionalidades no arquivo `CHANGELOG.md` na raiz do projeto.

## Regras de Trabalho

> [!IMPORTANT]
> **Toda implementação concluída DEVE ser registrada no arquivo `CHANGELOG.md` na raiz do projeto antes de finalizar a tarefa.**

### Estrutura do CHANGELOG.md

O arquivo `CHANGELOG.md` deve seguir o padrão Keep a Changelog, estruturado por versões e datas (ou seção `[Unreleased]`), categorizando as alterações em:
- **Adicionado**: para novos recursos.
- **Modificado**: para alterações em recursos existentes.
- **Corrigido**: para quaisquer correções de bugs.
- **Removido**: para recursos removidos.

### Exemplo de Entrada

```markdown
## [Unreleased] - YYYY-MM-DD

### Adicionado
- Descrição da funcionalidade adicionada.

### Modificado
- Descrição do que mudou no código existente.

### Corrigido
- Descrição do bug corrigido.
```
