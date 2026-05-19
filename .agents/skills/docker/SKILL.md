---
name: docker
description: Guia de padrões, comandos e boas práticas de Docker e Docker Compose adotados no projeto DataCrawl.
---

# SKILL - DOCKER & ORCHESTRATION

## 1. Comandos Essenciais

```bash
# Levantar todo o ecossistema (buildando se necessário)
docker-compose up -d --build

# Parar containers
docker-compose stop

# Remover containers e redes
docker-compose down

# Logs de um serviço específico
docker-compose logs -f app

# Executar comando dentro do container app
docker-compose exec app php artisan migrate
```

## 2. Padrões de Containerização

- **Base Image:** PHP 8.3 FPM para a aplicação e worker.
- **Portainer:** Interface de gestão acessível em `localhost:9000`.
- **Caddy:** Reverse proxy automático para TLS e HTTP/2.
- **Redis:** Utilizado para filas (`QUEUE_CONNECTION=redis`) e cache.
- **Postgres:** Banco de dados relacional com extensão `pgvector`.

## 3. Boas Práticas

1.  **Imutabilidade:** Nunca instale pacotes manualmente dentro do container; atualize o `Dockerfile` e rebuilde.
2.  **Volumes:** Use volumes apenas para persistência de dados (DB, Redis) e logs. Use bind mounts para código fonte em desenvolvimento.
3.  **Ambiente:** Variáveis sensíveis devem residir no `.env` e nunca serem hardcoded no `docker-compose.yml`.
4.  **Limpeza:** Remova imagens órfãs e containers parados periodicamente para economizar espaço em disco.
