import { render, screen } from '@testing-library/react';
import QuickActions from '@/Components/organisms/QuickActions';
import { describe, it, expect } from 'vitest';

describe('QuickActions Organism', () => {
    it('renders the actions', () => {
        render(<QuickActions />);
        expect(screen.getByText('Novo Projeto')).toBeInTheDocument();
        expect(screen.getByText('Iniciar Crawling')).toBeInTheDocument();
    });
});
