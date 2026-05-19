import { render } from '@testing-library/react';
import Button from '@/Components/atoms/Button';
import { describe, it, expect } from 'vitest';

describe('Button Atom Snapshots', () => {
    it('matches primary snapshot', () => {
        const { asFragment } = render(<Button variant="primary">Primary</Button>);
        expect(asFragment()).toMatchSnapshot();
    });

    it('matches destructive snapshot', () => {
        const { asFragment } = render(<Button variant="destructive">Delete</Button>);
        expect(asFragment()).toMatchSnapshot();
    });

    it('matches loading snapshot', () => {
        const { asFragment } = render(<Button isLoading>Loading</Button>);
        expect(asFragment()).toMatchSnapshot();
    });
});
