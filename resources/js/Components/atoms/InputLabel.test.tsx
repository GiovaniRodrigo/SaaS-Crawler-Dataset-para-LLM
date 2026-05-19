import { render, screen } from '@testing-library/react';
import InputLabel from '@/Components/atoms/InputLabel';
import { describe, it, expect } from 'vitest';

describe('InputLabel Atom', () => {
    it('renders the value correctly', () => {
        render(<InputLabel value="Email Address" />);
        expect(screen.getByText('Email Address')).toBeInTheDocument();
    });

    it('renders children correctly', () => {
        render(<InputLabel>Full Name</InputLabel>);
        expect(screen.getByText('Full Name')).toBeInTheDocument();
    });

    it('applies custom className', () => {
        render(<InputLabel value="Label" className="mb-2" />);
        expect(screen.getByText('Label')).toHaveClass('mb-2');
    });

    it('has the correct base classes', () => {
        render(<InputLabel value="Label" />);
        const label = screen.getByText('Label');
        expect(label).toHaveClass('text-sm');
        expect(label).toHaveClass('text-slate-200');
    });
});
