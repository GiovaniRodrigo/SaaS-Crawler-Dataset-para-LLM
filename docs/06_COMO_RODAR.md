# Como Rodar o Projeto

## Pré-requisitos

| Ferramenta | Obrigatória | Observação |
|---|---|---|
| PHP 8.3+ | Sim | `composer.json` exige `^8.3` |
| Composer | Sim | Instala dependências PHP |
| Node.js e npm | Sim | Instala dependências frontend |
| SQLite | Sim | Banco local identificado em `database/database.sqlite` |

## Instalação

```bash
composer install
cp .env.example .env
php artisan key:generate
php artisan migrate
npm install
```

Também existe script Composer:

```bash
composer run setup
```

## Desenvolvimento

```bash
composer run dev
```

O script inicia servidor Laravel, queue listener, logs com Pail e Vite usando `concurrently`.

Comandos separados encontrados no README:

```bash
php artisan serve
npm run dev
```

## Build

```bash
npm run build
```

O script executa `tsc && vite build`.

## Testes

```bash
composer run test
```

O script limpa config e executa `php artisan test`.

## Observações

- Não foi identificado `Dockerfile`, `docker-compose.yml` ou `Makefile`.
- O README anterior citava Laravel 11, mas `composer.json` indica Laravel `^13.8`.
- A extensão aponta para `http://localhost:8000/api/extension/*`.
