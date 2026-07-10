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
        display: 'font-display text-5xl font-black tracking-tighter text-foreground',
        h1: 'font-display text-3xl font-bold tracking-tight text-foreground',
        h2: 'font-display text-2xl font-bold tracking-tight text-foreground',
        h3: 'font-display text-xl font-semibold tracking-tight text-foreground',
        h4: 'font-display text-lg font-semibold tracking-tight text-slate-900 dark:text-slate-100',
        body: 'text-base leading-relaxed text-slate-900 dark:text-slate-100',
        small: 'text-sm leading-relaxed text-slate-800 dark:text-slate-200',
        caption: 'text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400',
        code: 'font-mono text-sm font-bold text-foreground bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 px-1.5 py-0.5 rounded',
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
