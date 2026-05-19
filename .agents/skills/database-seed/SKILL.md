---
name: database-seed
description: Regras para seeding de banco de dados no DataCrawl, garantindo dados para teste e funcionamento básico em produção.
---

# SKILL - DATABASE SEEDING

## 1. Regras Gerais

- **Obrigatoriedade:** Todo CRUD implementado deve possuir um seed mínimo para permitir testes imediatos.
- **Padrão de Dados:**
    1. **Primeiro Registro:** Deve sempre conter dados fixos (primitivos) previsíveis.
    2. **Registros Subsequentes:** Devem ser gerados em número aleatório utilizando **Factories**.

## 2. Comportamento por Ambiente (APP_ENV)

O seeder deve identificar o ambiente atual usando `app()->environment()` ou a variável `APP_ENV`.

### 2.1 Ambiente `local` ou `dev`
- Executar seeding completo.
- Utilizar Factories para gerar massa de dados de teste (ex: 10-50 registros por tabela).
- Incluir o usuário administrador padrão com credenciais conhecidas.

### 2.2 Ambiente `staging` (homologação) ou `production`
- **Somente dados primitivos:** Gerar apenas o estritamente necessário para o funcionamento básico do software.
- Exemplo: Usuário administrador inicial, configurações de sistema, planos base.
- **Proibido:** Gerar dados falsos (faker) ou massa de teste aleatória nestes ambientes.

## 3. Implementação Recomendada

```php
public function run(): void
{
    // 1. Dados Fixos (Todos os ambientes)
    $admin = User::firstOrCreate(
        ['email' => 'admin@datacrawl.com.br'],
        ['name' => 'Admin', 'password' => bcrypt('password')]
    );

    // 2. Dados de Teste (Somente Local/Dev)
    if (app()->environment(['local', 'dev'])) {
        Project::factory()
            ->count(rand(5, 15))
            ->create(['user_id' => $admin->id]);
            
        // ... outros factories
    }
}
```

## 4. Comandos Úteis

```bash
# Rodar todos os seeders (definidos no DatabaseSeeder)
php artisan db:seed

# Rodar um seeder específico
php artisan db:seed --class=ProjectSeeder

# Resetar banco e rodar seeds
php artisan migrate:fresh --seed
```
