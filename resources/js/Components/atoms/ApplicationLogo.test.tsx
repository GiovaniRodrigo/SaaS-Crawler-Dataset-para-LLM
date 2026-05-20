import { render, screen } from '@testing-library/react';
import ApplicationLogo from '@/Components/atoms/ApplicationLogo';
import { describe, it, expect } from 'vitest';

describe('ApplicationLogo Atom', () => {
    it('renders correctly', () => {
        render(<ApplicationLogo />);
        expect(screen.getByText('Mind')).toBeInTheDocument();
        expect(screen.getByText('Crawl')).toBeInTheDocument();
        const svg = document.querySelector('svg');
        expect(svg).toBeInTheDocument();
    });

    it('applies custom className to the container', () => {
        const { container } = render(<ApplicationLogo className="my-custom-class" />);
        expect(container.firstChild).toHaveClass('my-custom-class');
    });
});
