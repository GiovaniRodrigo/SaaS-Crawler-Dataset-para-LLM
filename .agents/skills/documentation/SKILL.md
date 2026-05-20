---
name: documentation
description: Regras para escrita de documentação clara, objetiva e com resumo no padrão TL;DR.
---

# Skill: Documentation (Padrão TL;DR)

Esta skill define as regras para escrita e atualização de documentações no projeto CrawlMind, estabelecendo a obrigatoriedade da inclusão de uma seção **TL;DR** (Too Long; Didn't Read) no início de cada documento relevante.

## Regras de Trabalho

> [!IMPORTANT]
> **Qualquer novo arquivo de documentação em `docs/`, guias arquiteturais ou manuais deve conter um bloco TL;DR no topo para facilitar a leitura rápida de agentes e desenvolvedores.**

### Estrutura Padrão

Todo documento deve seguir a seguinte estrutura de cabeçalho:

```markdown
# Nome do Documento

## TL;DR
Breve resumo de 2 a 3 frases explicando o propósito do documento e qual problema ele resolve.

---

## [Seções de Conteúdo...]
```

### Exemplo Prático

```markdown
# Guia de Configuração de Ambientes

## TL;DR
Manual rápido de configuração de variáveis de ambiente do projeto para desenvolvimento e produção. Explica as diferenças de cache e conexões entre bancos SQLite e PostgreSQL.
```
