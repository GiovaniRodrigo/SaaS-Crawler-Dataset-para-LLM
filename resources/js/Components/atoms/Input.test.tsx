import { render, screen, fireEvent } from '@testing-library/react';
import Input from '@/Components/atoms/Input';
import { describe, it, expect, vi } from 'vitest';

describe('Input Atom', () => {
    it('renders correctly with default props', () => {
        render(<Input placeholder="Enter text" />);
        const input = screen.getByPlaceholderText('Enter text');
        expect(input).toBeInTheDocument();
        expect(input).toHaveAttribute('type', 'text');
    });

    it('applies custom type', () => {
        render(<Input type="password" placeholder="Password" />);
        expect(screen.getByPlaceholderText('Password')).toHaveAttribute('type', 'password');
    });

    it('handles focus correctly when isFocused is true', () => {
        render(<Input isFocused placeholder="Focus me" />);
        const input = screen.getByPlaceholderText('Focus me');
        expect(input).toHaveFocus();
    });

    it('calls onChange handler', () => {
        const handleChange = vi.fn();
        render(<Input onChange={handleChange} placeholder="Type here" />);
        const input = screen.getByPlaceholderText('Type here');
        fireEvent.change(input, { target: { value: 'Hello' } });
        expect(handleChange).toHaveBeenCalled();
    });

    it('applies error styles when hasError is true', () => {
        render(<Input hasError placeholder="Error input" />);
        const input = screen.getByPlaceholderText('Error input');
        expect(input).toHaveClass('border-rose-500');
    });
});
