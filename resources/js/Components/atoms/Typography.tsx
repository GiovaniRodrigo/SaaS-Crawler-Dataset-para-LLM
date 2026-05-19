import { ReactNode } from 'react';
import { cn } from '@/utils';

type TypographyVariant = 'display' | 'h1' | 'h2' | 'h3' | 'h4' | 'body' | 'small' | 'caption' | 'code';

interface TypographyProps {
    variant?: TypographyVariant;
    children: ReactNode;
    className?: string;
    as?: 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span' | 'div' | 'code';
}

export default function Typography({
    variant = 'body',
    children,
    className,
    as,
}: TypographyProps) {
    const variants = {
        display: 'text-4xl font-bold tracking-tight',
        h1: 'text-3xl font-bold tracking-tight',
        h2: 'text-2xl font-bold tracking-tight',
        h3: 'text-xl font-semibold tracking-tight',
        h4: 'text-lg font-semibold tracking-tight',
        body: 'text-base leading-relaxed',
        small: 'text-sm leading-relaxed',
        caption: 'text-xs font-medium uppercase tracking-wider',
        code: 'font-mono text-sm font-medium',
    };

    const Component = as || (
        variant === 'display' || variant === 'h1' ? 'h1' :
        variant === 'h2' ? 'h2' :
        variant === 'h3' ? 'h3' :
        variant === 'h4' ? 'h4' :
        variant === 'code' ? 'code' :
        'p'
    );

    return (
        <Component className={cn(variants[variant], className)}>
            {children}
        </Component>
    );
}
