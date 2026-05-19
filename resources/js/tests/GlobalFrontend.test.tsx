import { render } from '@testing-library/react';
import Welcome from '@/Pages/Welcome';
import { describe, it, expect, vi } from 'vitest';

// Mock Inertia
vi.mock('@inertiajs/react', () => ({
    Head: ({ children }: any) => <>{children}</>,
    Link: ({ children, ...props }: any) => <a {...props}>{children}</a>,
    usePage: () => ({ props: { auth: { user: null } } }),
    useForm: () => ({ data: {}, setData: vi.fn(), post: vi.fn(), processing: false, errors: {} }),
}));

// Mock Auth
const authMock = { user: null };

describe('Global Frontend TDD (Console Check)', () => {
    it('renders Welcome page without console errors or warnings', () => {
        const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
        const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});

        render(<Welcome auth={authMock as any} ziggy={{} as any} />);

        // Filtramos warnings comuns de pacotes externos que não dependem do nosso código
        // O foco é no código do projeto (Atoms, Molecules, etc)
        const errors = consoleSpy.mock.calls.filter(args => 
            !args[0]?.includes('React does not recognize the') && 
            !args[0]?.includes('componentWillReceiveProps')
        );

        expect(errors).toHaveLength(0);
        expect(warnSpy).not.toHaveBeenCalled();

        consoleSpy.mockRestore();
        warnSpy.mockRestore();
    });
});
