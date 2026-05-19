import { render, screen } from '@testing-library/react';
import RecentActivitiesCard from '@/Components/organisms/RecentActivitiesCard';
import { describe, it, expect } from 'vitest';

describe('RecentActivitiesCard Organism', () => {
    const activities = [
        { user: 'Ana', action: 'Exportou', project: 'Proj 1', time: '10:00' },
    ];

    it('renders activities correctly', () => {
        render(<RecentActivitiesCard activities={activities} />);
        expect(screen.getByText('Ana')).toBeInTheDocument();
        expect(screen.getByText('Exportou')).toBeInTheDocument();
        expect(screen.getByText('Proj 1')).toBeInTheDocument();
        expect(screen.getByText('10:00')).toBeInTheDocument();
    });

    it('renders empty state when no activities', () => {
        render(<RecentActivitiesCard activities={[]} />);
        expect(screen.getByText('Nenhuma atividade recente')).toBeInTheDocument();
    });
});
