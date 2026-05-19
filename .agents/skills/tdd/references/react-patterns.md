# Padrões de Teste React (Vitest + RTL)

## Setup Básico
Certifique-se de que o `resources/js/tests/setup.ts` está configurado.

```tsx
import { render, screen, fireEvent } from '@testing-library/react';
import MyComponent from './MyComponent';

describe('MyComponent', () => {
    it('deve renderizar corretamente', () => {
        render(<MyComponent title="Teste" />);
        expect(screen.getByText('Teste')).toBeInTheDocument();
    });
});
```

## Interação com Usuário
Use `fireEvent` ou `user-event` para simular cliques e digitação.

```tsx
it('deve chamar a função ao clicar no botão', () => {
    const fn = vi.fn();
    render(<Button onClick={fn}>Clique</Button>);
    fireEvent.click(screen.getByText('Clique'));
    expect(fn).toHaveBeenCalled();
});
```

## Mocking de Inertia
Se o componente usa `Link` ou `useForm`, você pode precisar mockar o módulo.

```tsx
vi.mock('@inertiajs/react', () => ({
    Link: ({ children, href }: any) => <a href={href}>{children}</a>,
    useForm: () => ({
        data: {},
        setData: vi.fn(),
        post: vi.fn(),
        processing: false,
        errors: {},
    }),
}));
```

## Asserções de Estilo (Tailwind)
Verifique se as classes corretas estão sendo aplicadas.

```tsx
expect(screen.getByRole('button')).toHaveClass('bg-indigo-600');
```
