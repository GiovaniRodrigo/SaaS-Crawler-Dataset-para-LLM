import { render, screen } from '@testing-library/react';
import Modal from '@/Components/organisms/Modal';
import { describe, it, expect, vi } from 'vitest';

describe('Modal Organism', () => {
    it('renders children when show is true', () => {
        render(
            <Modal show={true} onClose={() => {}}>
                <div>Modal Content</div>
            </Modal>
        );
        expect(screen.getByText('Modal Content')).toBeInTheDocument();
    });

    it('does not render children when show is false', () => {
        render(
            <Modal show={false} onClose={() => {}}>
                <div>Modal Content</div>
            </Modal>
        );
        expect(screen.queryByText('Modal Content')).not.toBeInTheDocument();
    });
});
