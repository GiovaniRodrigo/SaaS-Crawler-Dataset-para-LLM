---
name: tdd
description: Guia para Test-Driven Development (TDD) na stack Laravel + Inertia + React. Use ao criar novas funcionalidades, endpoints ou componentes, garantindo que o ciclo Red-Green-Refactor seja seguido com PHPUnit e Vitest.
---

# TDD - Test Driven Development

## Ciclo Red-Green-Refactor

Este guia obriga a execução do ciclo clássico de TDD:

1.  **Red (Vermelho):** Escreva um teste que falha para a funcionalidade desejada.
2.  **Green (Verde):** Escreva o código mínimo necessário para fazer o teste passar.
3.  **Refactor (Refatoração):** Melhore o código mantendo o teste passando.

## Workflow

Siga estes passos rigorosamente:

### 1. Preparação
- Identifique se a mudança é no **Backend (API/Controller)** ou **Frontend (Componente/Página)**.
- Escolha a ferramenta correta: `php artisan test` para Laravel, `npm run test` para React.

### 2. Fase Red
- Crie o arquivo de teste (ex: `tests/Feature/MyFeatureTest.php` ou `resources/js/Pages/MyPage.test.tsx`).
- Escreva a asserção do comportamento esperado.
- Execute o teste e confirme a falha.

### 3. Fase Green
- Implemente a lógica necessária.
- Evite refatorações prematuras aqui; o objetivo é o "verde" o mais rápido possível.
- Execute o teste até passar.
- **Console Check:** Verifique se o componente renderiza sem erros ou warnings no console do navegador (ou via `console.spy` em testes unitários).

### 4. Fase Refactor
- Remova duplicidade, melhore nomes de variáveis, extraia métodos.
- Execute o teste após cada pequena alteração.
- **Validação de Build:** Para frontend, execute `npm run build` ao final do refactor para garantir que não existam erros de TypeScript (`tsc`) ou problemas de empacotamento (`vite build`).

### 5. Validação de Entrega (Regressão e E2E)
- **Testes E2E:** Execute os testes de ponta a ponta usando o comando `npm run cypress:run` como critério final de aceite.
- **Integridade de Implementações Passadas:** Se um teste E2E ou de regressão falhar, **você deve corrigir o problema sem alterar ou reverter funcionalidades passadas**. É proibido quebrar o que já foi implementado para fazer o novo código passar.

## Padrões por Camada

### Backend (Laravel)
Consulte [laravel-patterns.md](references/laravel-patterns.md) para:
- Factories e Seeding em testes.
- Asserções de redirecionamento e Inertia.
- Testes de validação de requests.

### Frontend (React + Vitest)
Consulte [react-patterns.md](references/react-patterns.md) para:
- Mocking de rotas Ziggy.
- Testes de interação com usuário (fireEvent).
- Verificação de renderização condicional.

## Browser TDD (Real Browser Feedback)

Para testes que exigem comportamento real de CSS, eventos complexos ou depuração visual, utilize o modo browser:

1.  **Console como Validador:** Durante o desenvolvimento (Red/Green), observe erros de renderização e warnings diretamente no console para garantir integridade estrutural.
2.  **Component Testing:** Utilize o Vitest com Playwright ou Cypress para rodar testes de componentes em um navegador real, garantindo que o CSS (Tailwind/DataCrawl) esteja sendo aplicado corretamente.
3.  **Comando Sugerido:** `npm run test -- --browser.enabled=true` (requer configuração no vitest.config.ts).

## Workflow com Console
- **Red:** O console deve mostrar o erro esperado (ex: componente não encontrado ou falha de asserção).
- **Green:** O console deve estar limpo de warnings de React e erros de CSS.
- **Refactor:** O console auxilia na identificação de loops de renderização ou vazamentos de memória.

## Comandos Úteis

```bash
# Executar teste específico (Laravel)
php artisan test --filter NomeDoTeste

# Executar Vitest em modo watch (local)
npm run test -- --watch

# Validar Build e Console (Frontend)
npm run build && npm run test

# Executar Suite de Entrega Completa (Unitários + Cypress E2E + Build)
npm run test && npm run cypress:run && npm run build
```
