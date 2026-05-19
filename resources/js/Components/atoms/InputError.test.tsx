import { render, screen } from '@testing-library/react';
import InputError from '@/Components/atoms/InputError';
import { describe, it, expect } from 'vitest';

describe('InputError Atom', () => {
    it('renders the message correctly', () => {
        render(<InputError message="This field is required" />);
        expect(screen.getByText('This field is required')).toBeInTheDocument();
    });

    it('does not render when no message is provided', () => {
        const { container } = render(<InputError />);
        expect(container).toBeEmptyDOMElement();
    });

    it('applies custom className', () => {
        render(<InputError message="Error" className="mt-2" />);
        expect(screen.getByText('Error')).toHaveClass('mt-2');
    });

    it('has the correct error color class', () => {
        render(<InputError message="Error" />);
        expect(screen.getByText('Error')).toHaveClass('text-rose-500');
    });
});
