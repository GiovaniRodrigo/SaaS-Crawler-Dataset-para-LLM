---
name: atomic-design
description: Padronização e implementação de componentes seguindo Atomic Design no frontend (React + Tailwind). Use ao criar ou modificar componentes em resources/js/Components ou páginas em resources/js/Pages.
---

# Atomic Design no DataCrawl

Este skill orienta a criação, manutenção e evolução da interface do usuário seguindo a metodologia Atomic Design, garantindo consistência visual e reutilização de código.

## Visão Geral

O projeto utiliza Atomic Design para organizar os componentes React em cinco níveis:
1. **Atoms**: Componentes básicos e indivisíveis.
2. **Molecules**: Grupos de átomos operando como uma unidade.
3. **Organisms**: Componentes complexos que formam seções da interface.
4. **Templates**: Estruturas de layout.
5. **Pages**: Instâncias reais com dados.

## Fluxo de Trabalho

### 1. Seleção do Nível Correto
Antes de criar um novo componente, identifique em qual nível ele se encaixa:
- Se é um elemento HTML básico estilizado (ex: botão, input), é um **Atom**.
- Se é uma composição simples (ex: campo de busca), é uma **Molecule**.
- Se é uma seção funcional independente (ex: tabela de documentos), é um **Organism**.

### 2. Implementação
- Crie o arquivo `.tsx` no subdiretório correspondente em `resources/js/Components/`.
- Utilize **Tailwind CSS** para estilização, respeitando a paleta e tipografia definidas em `docs/11_DESIGN_HI_FI.md`.
- Garanta que o componente seja funcional, tipado com TypeScript e reutilizável.

### 3. Validação e Testes
- Adicione testes unitários utilizando Vitest/React Testing Library no mesmo diretório ou em `tests/`.
- Verifique se o componente segue os padrões visuais do projeto.

## Referência de Componentes

Para uma lista detalhada dos componentes existentes e exemplos de uso, consulte:
- [Componentes Reference](references/components.md)

## Exemplos de Triggers
- "Crie um novo botão de ação para o dashboard"
- "Implemente um card de métricas para mostrar o progresso do crawler"
- "Refatore a tabela de documentos para ser um Organism"
- "Adicione uma nova página de listagem de domínios"
