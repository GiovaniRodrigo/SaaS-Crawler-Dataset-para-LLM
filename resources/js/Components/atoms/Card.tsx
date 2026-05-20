import { PropsWithChildren } from 'react';
import { twMerge } from 'tailwind-merge';
import { clsx, type ClassValue } from 'clsx';

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

interface CardProps {
    className?: string;
    padding?: 'none' | 'small' | 'normal' | 'large';
}

export default function Card({ 
    children, 
    className = '',
    padding = 'normal'
}: PropsWithChildren<CardProps>) {
    const paddings = {
        none: '',
        small: 'p-4',
        normal: 'p-5 md:p-6',
        large: 'p-8',
    };

    return (
        <div className={cn(
            'overflow-hidden rounded-3xl border bg-white shadow-sm transition-all',
            'dark:bg-slate-900/60 dark:backdrop-blur-xl dark:border-slate-800/50 dark:shadow-black/20',
            paddings[padding],
            className
        )}>
            {children}
        </div>
    );
}
