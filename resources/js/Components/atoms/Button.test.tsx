import { render, screen, fireEvent } from '@testing-library/react';
import Button from '@/Components/atoms/Button';
import { describe, it, expect, vi } from 'vitest';

describe('Button Atom', () => {
    it('renders the button text correctly', () => {
        render(<Button>Click me</Button>);
        expect(screen.getByText('Click me')).toBeInTheDocument();
    });

    it('handles click events', () => {
        const handleClick = vi.fn();
        render(<Button onClick={handleClick}>Click me</Button>);
        fireEvent.click(screen.getByText('Click me'));
        expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('shows loading state and disables the button', () => {
        render(<Button isLoading>Click me</Button>);
        const button = screen.getByRole('button');
        expect(button).toBeDisabled();
        // Should have the spinner (SVG)
        expect(button.querySelector('svg')).toBeInTheDocument();
    });

    it('applies correct variant classes', () => {
        const { rerender } = render(<Button variant="primary">Primary</Button>);
        expect(screen.getByRole('button')).toHaveClass('bg-cyan-500');

        rerender(<Button variant="destructive">Delete</Button>);
        expect(screen.getByRole('button')).toHaveClass('bg-rose-500');
    });
});
