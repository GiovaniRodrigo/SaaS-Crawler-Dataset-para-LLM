---
name: environments
description: Definição de comportamentos e configurações do DataCrawl baseados no ambiente de execução (APP_ENV).
---

# SKILL - ENVIRONMENTS

## 1. Ambientes Definidos

O sistema utiliza a variável `APP_ENV` no `.env` para determinar seu comportamento:

- **`local`**: Ambiente de desenvolvimento na máquina do desenvolvedor. Debug habilitado, logs em stack, banco local (SQLite ou Docker).
- **`dev` / `testing`**: Ambiente de integração contínua ou máquinas de teste.
- **`staging`**: Ambiente de homologação. Espelha a produção, mas com dados de teste controlados.
- **`production`**: Ambiente real do usuário final. Segurança máxima, HTTPS forçado, debug desabilitado.

## 2. Regras de Configuração

### 2.1 Segurança
- **HTTPS:** Forçado apenas em `production` e `staging`.
- **Cookies:** `Secure` habilitado em `production`.
- **Debug:** `APP_DEBUG=false` em `staging` e `production`.

### 2.2 Banco de Dados e Seeding
- Ver regras na skill `database-seed`.
- Migrações destrutivas (`migrate:fresh`) são proibidas em `production`.

### 2.3 Serviços Externos
- **Embeddings:** Em `local` e `dev`, preferir o provider `fake`. Em `production`, utilizar provedores reais (OpenAI, Ollama, etc.).
- **Emails:** Em `local`, usar `log` ou `MailHog`. Em `production`, usar provedor SMTP/API configurado.

## 3. Verificação em Código

### Backend (PHP/Laravel)
```php
if (app()->isLocal()) { ... }
if (app()->environment('production')) { ... }
```

### Frontend (React/TypeScript)
```typescript
const isProduction = import.meta.env.PROD;
const isDevelopment = import.meta.env.DEV;
```

## 4. Gerenciamento de Segredos
- Nunca versionar arquivos `.env` reais.
- Utilizar `.env.example` como template atualizado para novas variáveis.
- Em produção, preferir o uso de Secret Managers ou variáveis de ambiente injetadas pelo CI/CD ou Docker.
