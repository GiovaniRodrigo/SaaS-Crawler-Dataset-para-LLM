import { render, screen } from '@testing-library/react';
import MetricCard from '@/Components/molecules/MetricCard';
import { describe, it, expect } from 'vitest';
import { Activity } from 'lucide-react';

describe('MetricCard Molecule', () => {
    it('renders label and value correctly', () => {
        render(<MetricCard label="Total Pages" value="1,234" />);
        expect(screen.getByText('Total Pages')).toBeInTheDocument();
        expect(screen.getByText('1,234')).toBeInTheDocument();
    });

    it('renders positive trend correctly', () => {
        render(
            <MetricCard 
                label="Total Pages" 
                value="1,234" 
                trend={{ value: '10%', isPositive: true }} 
            />
        );
        const trendValue = screen.getByText('+10%');
        expect(trendValue).toBeInTheDocument();
        expect(trendValue).toHaveClass('text-emerald-600');
    });

    it('renders negative trend correctly', () => {
        render(
            <MetricCard 
                label="Total Pages" 
                value="1,234" 
                trend={{ value: '5%', isPositive: false }} 
            />
        );
        const trendValue = screen.getByText('-5%');
        expect(trendValue).toBeInTheDocument();
        expect(trendValue).toHaveClass('text-rose-600');
    });

    it('renders with an icon', () => {
        const { container } = render(
            <MetricCard 
                label="Total Pages" 
                value="1,234" 
                icon={<Activity data-testid="activity-icon" />} 
            />
        );
        expect(screen.getByTestId('activity-icon')).toBeInTheDocument();
    });
});
