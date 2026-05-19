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
            },
            translations: {
                messages: {
                    dashboard: 'Dashboard',
                    welcome_back: 'Bem-vindo de volta',
                    projects: 'Projetos Ativos',
                    documents: 'Páginas Coletadas',
                    chunks: 'Chunks Gerados',
                    new_project: 'Novo Projeto',
                    new_job: 'Novo Job',
                }
            }
        },
        url: '/dashboard'
    })
}));

describe('Dashboard Page', () => {
    const stats = {
        total_projects: 8,
        total_documents: 24300,
        total_chunks: 91200,
        average_quality: 87
    };

    it('renders the dashboard with correct user info and metrics', () => {
        render(<Dashboard stats={stats} activeJobs={[]} recentActivities={[]} />);
        
        // Check if header is present (specifically the H1)
        const headers = screen.getAllByText('Dashboard');
        expect(headers.some(h => h.tagName === 'H1')).toBe(true);
        expect(screen.getByText(/Bem-vindo de volta/)).toBeInTheDocument();
        
        // Check if KPI cards are rendered
        const projectsElements = screen.getAllByText('Projetos Ativos');
        expect(projectsElements.length).toBeGreaterThan(0);
        
        const pagesElements = screen.getAllByText('Páginas Coletadas');
        expect(pagesElements.length).toBeGreaterThan(0);

        const chunksElements = screen.getAllByText('Chunks Gerados');
        expect(chunksElements.length).toBeGreaterThan(0);
        
        // Check if "Ações rápidas" are present
        expect(screen.getByText('Ações rápidas')).toBeInTheDocument();
        const quickActions = screen.getAllByText('Novo Projeto');
        expect(quickActions.length).toBeGreaterThan(0);
    });
});
