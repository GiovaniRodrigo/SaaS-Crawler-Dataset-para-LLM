import { render, screen } from '@testing-library/react';
import ResponsiveNavLink from '@/Components/molecules/ResponsiveNavLink';
import { describe, it, expect, vi } from 'vitest';

// Mock Inertia Link
vi.mock('@inertiajs/react', () => ({
    Link: ({ children, className, ...props }: any) => (
        <a className={className} {...props}>
            {children}
        </a>
    ),
}));

describe('ResponsiveNavLink Molecule', () => {
    it('renders correctly', () => {
        render(<ResponsiveNavLink href="/test" active={false}>Home</ResponsiveNavLink>);
        const link = screen.getByText('Home');
        expect(link).toBeInTheDocument();
    });

    it('applies active classes when active is true', () => {
        render(<ResponsiveNavLink href="/test" active={true}>Home</ResponsiveNavLink>);
        const link = screen.getByText('Home');
        expect(link).toHaveClass('border-cyan-400');
        expect(link).toHaveClass('bg-cyan-400/10');
    });

    it('applies inactive classes when active is false', () => {
        render(<ResponsiveNavLink href="/test" active={false}>Home</ResponsiveNavLink>);
        const link = screen.getByText('Home');
        expect(link).toHaveClass('border-transparent');
        expect(link).toHaveClass('text-slate-300');
    });
});
