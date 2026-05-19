import { render, screen } from '@testing-library/react';
import JobProgressCard from '@/Components/organisms/JobProgressCard';
import { describe, it, expect } from 'vitest';

describe('JobProgressCard Organism', () => {
    const jobs = [
        { id: 1, project: { name: 'test.com' }, progress: 50, total_pages_crawled: 100, status: 'running' },
    ];

    it('renders jobs correctly', () => {
        render(<JobProgressCard jobs={jobs as any} />);
        expect(screen.getByText('test.com')).toBeInTheDocument();
        expect(screen.getByText('100 páginas coletadas')).toBeInTheDocument();
        expect(screen.getByText('running')).toBeInTheDocument();
    });

    it('renders empty state when no jobs', () => {
        render(<JobProgressCard jobs={[]} />);
        expect(screen.getByText('Nenhum job em execução')).toBeInTheDocument();
    });
});
