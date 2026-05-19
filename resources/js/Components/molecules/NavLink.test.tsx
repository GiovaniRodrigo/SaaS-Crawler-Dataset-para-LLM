import { render, screen } from '@testing-library/react';
import NavLink from '@/Components/molecules/NavLink';
import { describe, it, expect, vi } from 'vitest';

// Mock Inertia Link
vi.mock('@inertiajs/react', () => ({
    Link: ({ children, className, ...props }: any) => (
        <a className={className} {...props}>
            {children}
        </a>
    ),
}));

describe('NavLink Molecule', () => {
    it('renders correctly', () => {
        render(<NavLink href="/test" active={false}>Home</NavLink>);
        const link = screen.getByText('Home');
        expect(link).toBeInTheDocument();
        expect(link).toHaveAttribute('href', '/test');
    });

    it('applies active classes when active is true', () => {
        render(<NavLink href="/test" active={true}>Home</NavLink>);
        const link = screen.getByText('Home');
        expect(link).toHaveClass('border-cyan-400');
        expect(link).toHaveClass('text-cyan-100');
    });

    it('applies inactive classes when active is false', () => {
        render(<NavLink href="/test" active={false}>Home</NavLink>);
        const link = screen.getByText('Home');
        expect(link).toHaveClass('border-transparent');
        expect(link).toHaveClass('text-slate-400');
    });
});
