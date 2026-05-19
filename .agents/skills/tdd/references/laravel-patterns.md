# Padrões de Teste Laravel

## Configuração Base
Sempre use o trait `RefreshDatabase` para garantir um banco limpo entre testes.

```php
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class MyTest extends TestCase
{
    use RefreshDatabase;
}
```

## Autenticação
Use `actingAs` para simular um usuário logado.

```php
$user = User::factory()->create();
$response = $this->actingAs($user)->get('/dashboard');
```

## Asserções de Inertia
Use `AssertableInertia` para verificar dados enviados ao frontend.

```php
use Inertia\Testing\AssertableInertia as Assert;

$response->assertInertia(fn (Assert $page) => $page
    ->component('Projects/Show')
    ->has('project')
    ->where('project.name', 'Meu Projeto')
);
```

## Validação de Request
Teste se a validação está funcionando corretamente.

```php
$response = $this->post('/projects', []);
$response->assertSessionHasErrors(['name']);
```
