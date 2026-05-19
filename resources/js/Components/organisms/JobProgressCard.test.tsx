import { render, screen } from '@testing-library/react';
import JobProgressCard from '@/Components/organisms/JobProgressCard';
import { describe, it, expect } from 'vitest';

describe('JobProgressCard Organism', () => {
    const jobs = [
        { name: 'test.com', progress: 50, pages: 100 },
    ];

    it('renders jobs correctly', () => {
        render(<JobProgressCard jobs={jobs} />);
        expect(screen.getByText('test.com')).toBeInTheDocument();
        expect(screen.getByText('100 páginas coletadas')).toBeInTheDocument();
        expect(screen.getByText('50%')).toBeInTheDocument();
    });

    it('renders empty state when no jobs', () => {
        render(<JobProgressCard jobs={[]} />);
        expect(screen.getByText('Nenhum job em execução')).toBeInTheDocument();
    });
});
