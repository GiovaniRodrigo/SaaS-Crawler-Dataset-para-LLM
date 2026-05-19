import { render, screen } from '@testing-library/react';
import Dashboard from '@/Pages/Dashboard';
import { describe, it, expect, vi } from 'vitest';

// Mock Inertia modules
vi.mock('@inertiajs/react', () => ({
    Head: ({ title }: { title: string }) => <title>{title}</title>,
    Link: ({ children, href }: { children: any, href: string }) => <a href={href}>{children}</a>,
    usePage: () => ({
        props: {
            auth: {
                user: { name: 'Test User', email: 'test@example.com' }
            }
        },
        url: '/dashboard'
    })
}));

describe('Dashboard Page', () => {
    it('renders the dashboard with correct user info and metrics', () => {
        render(<Dashboard />);
        
        // Check if header is present (specifically the H1)
        const headers = screen.getAllByText('Dashboard');
        expect(headers.some(h => h.tagName === 'H1')).toBe(true);
        expect(screen.getByText(/Bem-vindo de volta/)).toBeInTheDocument();
        
        // Check if KPI cards are rendered
        expect(screen.getByText('Projetos Ativos')).toBeInTheDocument();
        expect(screen.getByText('Páginas Coletadas')).toBeInTheDocument();
        expect(screen.getByText('Chunks Gerados')).toBeInTheDocument();
        
        // Check if "Ações rápidas" are present
        expect(screen.getByText('Ações rápidas')).toBeInTheDocument();
        const quickActions = screen.getAllByText('Novo Projeto');
        expect(quickActions.length).toBeGreaterThan(0);
    });
});
