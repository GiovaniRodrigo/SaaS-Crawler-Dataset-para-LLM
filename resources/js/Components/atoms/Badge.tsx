import { ReactNode } from 'react';
import { cn } from '@/utils';

interface BadgeProps {
    children: ReactNode;
    variant?: 'blue' | 'cyan' | 'indigo' | 'green' | 'purple' | 'amber' | 'rose' | 'slate' | 'emerald';
    className?: string;
}

export default function Badge({ 
    children, 
    variant = 'slate',
    className 
}: BadgeProps) {
    const variants = {
        blue: 'bg-blue-100 text-blue-900 dark:bg-blue-900/40 dark:text-blue-200 border-blue-300 dark:border-blue-700',
        cyan: 'bg-cyan-100 text-cyan-900 dark:bg-cyan-900/40 dark:text-cyan-200 border-cyan-300 dark:border-cyan-700',
        indigo: 'bg-indigo-100 text-indigo-900 dark:bg-indigo-900/40 dark:text-indigo-200 border-indigo-300 dark:border-indigo-700',
        green: 'bg-green-100 text-green-900 dark:bg-green-900/40 dark:text-green-200 border-green-300 dark:border-green-700',
        emerald: 'bg-emerald-100 text-emerald-900 dark:bg-emerald-900/40 dark:text-emerald-200 border-emerald-300 dark:border-emerald-700',
        purple: 'bg-purple-100 text-purple-900 dark:bg-purple-900/40 dark:text-purple-200 border-purple-300 dark:border-purple-700',
        amber: 'bg-amber-100 text-amber-900 dark:bg-amber-900/40 dark:text-amber-200 border-amber-300 dark:border-amber-700',
        rose: 'bg-rose-100 text-rose-900 dark:bg-rose-900/40 dark:text-rose-200 border-rose-300 dark:border-rose-700',
        slate: 'bg-slate-100 text-slate-900 dark:bg-slate-900/40 dark:text-slate-200 border-slate-300 dark:border-slate-700',
    };

    return (
        <span className={cn(
            'inline-flex items-center rounded-full border px-2 py-0.5 text-[11px] font-bold tracking-wider uppercase leading-none transition-colors',
            variants[variant],
            className
        )}>
            {children}
        </span>
    );
}
