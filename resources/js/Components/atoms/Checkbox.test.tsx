import { render, screen, fireEvent } from '@testing-library/react';
import Checkbox from '@/Components/atoms/Checkbox';
import { describe, it, expect, vi } from 'vitest';

describe('Checkbox Atom', () => {
    it('renders correctly', () => {
        render(<Checkbox data-testid="checkbox" />);
        expect(screen.getByTestId('checkbox')).toBeInTheDocument();
        expect(screen.getByTestId('checkbox')).toHaveAttribute('type', 'checkbox');
    });

    it('handles change events', () => {
        const handleChange = vi.fn();
        render(<Checkbox data-testid="checkbox" onChange={handleChange} />);
        const checkbox = screen.getByTestId('checkbox');
        fireEvent.click(checkbox);
        expect(handleChange).toHaveBeenCalled();
    });

    it('can be disabled', () => {
        render(<Checkbox data-testid="checkbox" disabled />);
        expect(screen.getByTestId('checkbox')).toBeDisabled();
    });

    it('has the correct accent color', () => {
        render(<Checkbox data-testid="checkbox" />);
        expect(screen.getByTestId('checkbox')).toHaveClass('text-cyan-500');
    });
});
