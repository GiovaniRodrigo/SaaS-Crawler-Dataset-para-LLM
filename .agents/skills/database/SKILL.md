---
name: database
description: Guia de padrões, modelagem e boas práticas para o banco de dados PostgreSQL com pgvector no DataCrawl.
---

# SKILL - DATABASE & PERSISTENCE

## 1. Stack Tecnológica
- **Principal:** PostgreSQL 16
- **Extensão Vetorial:** pgvector (para busca semântica)
- **ORM:** Eloquent (Laravel)

## 2. Padrões de Migração

- **Nomenclatura:** Use o padrão do Laravel `YYYY_MM_DD_HHMMSS_create_table_name_table.php`.
- **Integridade:** Sempre utilize chaves estrangeiras (`foreignId()->constrained()`) com política de deleção apropriada (`cascadeOnDelete()`).
- **Indexação:** 
    - Indexe todas as chaves estrangeiras.
    - Adicione índices para colunas frequentemente usadas em filtros (`where`).
    - Use índices de busca vetorial (HNSW ou IVFFlat) para colunas do tipo `vector`.

## 3. pgvector e Embeddings

- **Dimensões:** O padrão do projeto é **1536 dimensões** (compatível com modelos OpenAI e similares).
- **SQL Raw:** Para buscas de similaridade, utilize SQL raw via `DB::select` ou `scope` no Eloquent para aproveitar os operadores nativos (`<=>` para distância de cosseno).
- **Segurança:** Nunca execute buscas vetoriais globais sem filtrar por `user_id` ou `project_id`.

## 4. Boas Práticas

1.  **Idempotência:** Migrações devem ser seguras para rodar múltiplas vezes (use `IF NOT EXISTS` em statements raw).
2.  **Performance:** Evite `SELECT *`. Busque apenas as colunas necessárias, especialmente em tabelas com colunas `longText` (como a de documentos).
3.  **Soft Deletes:** Avalie o uso de `SoftDeletes` para entidades críticas como Projetos e Documentos.
4.  **Seeders:** Mantenha o `DatabaseSeeder` atualizado para permitir que novos desenvolvedores (ou containers) subam o ambiente com dados de teste válidos.

## 5. Comandos Úteis

```bash
# Rodar novas migrações
php artisan migrate

# Rollback da última operação
php artisan migrate:rollback

# Refresh completo (apaga tudo e roda denovo)
php artisan migrate:fresh --seed

# Criar nova migração
php artisan make:migration nome_da_migracao

# Criar novo Model com Migration e Factory
php artisan make:model Nome -mf
```
