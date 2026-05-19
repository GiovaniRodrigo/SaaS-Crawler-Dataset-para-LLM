import { render, screen, fireEvent } from '@testing-library/react';
import Dropdown from '@/Components/molecules/Dropdown';
import { describe, it, expect, vi } from 'vitest';

// Mock Inertia Link
vi.mock('@inertiajs/react', () => ({
    Link: ({ children, className, ...props }: any) => (
        <a className={className} {...props}>
            {children}
        </a>
    ),
}));

describe('Dropdown Molecule', () => {
    it('toggles content when trigger is clicked', () => {
        render(
            <Dropdown>
                <Dropdown.Trigger>
                    <button>Open</button>
                </Dropdown.Trigger>
                <Dropdown.Content>
                    <div>Content</div>
                </Dropdown.Content>
            </Dropdown>
        );

        expect(screen.queryByText('Content')).not.toBeInTheDocument();
        fireEvent.click(screen.getByText('Open'));
        expect(screen.getByText('Content')).toBeInTheDocument();
    });
});
