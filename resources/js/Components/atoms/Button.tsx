import { ButtonHTMLAttributes, ReactNode } from 'react';
import { cn } from '@/utils';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'destructive' | 'ghost' | 'outline';
    size?: 'sm' | 'md' | 'lg' | 'icon';
    isLoading?: boolean;
    icon?: ReactNode;
}

export default function Button({
    variant = 'primary',
    size = 'md',
    isLoading = false,
    icon,
    className,
    children,
    disabled,
    ...props
}: ButtonProps) {
    const variants = {
        primary: 'bg-cyan-400 text-black hover:bg-cyan-300 shadow-lg shadow-cyan-500/20 font-black',
        secondary: 'bg-white dark:bg-slate-900 border-2 border-slate-950 dark:border-slate-50 text-slate-950 dark:text-slate-50 hover:bg-slate-100 dark:hover:bg-slate-800 font-bold',
        destructive: 'bg-red-600 text-white hover:bg-red-700 shadow-sm shadow-red-500/20 font-bold',
        ghost: 'bg-transparent text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-900 hover:text-slate-950 dark:hover:text-slate-50 font-bold',
        outline: 'bg-transparent border-2 border-cyan-500 text-cyan-600 dark:text-cyan-400 hover:bg-cyan-500/10 font-bold',
    };

    const sizes = {
        sm: 'h-8 px-3 text-xs',
        md: 'h-10 px-4 text-sm font-bold',
        lg: 'h-12 px-6 text-base font-black',
        icon: 'h-10 w-10 flex items-center justify-center p-0',
    };

    return (
        <button
            disabled={isLoading || disabled}
            className={cn(
                'inline-flex items-center justify-center gap-2 rounded-xl transition-all duration-200 active:scale-95 disabled:pointer-events-none focus:outline-none focus:ring-4 focus:ring-cyan-500/50 dark:focus:ring-cyan-400/30',
                variant === 'primary' && 'disabled:bg-slate-200 dark:disabled:bg-slate-800 disabled:text-slate-500 disabled:shadow-none',
                variant !== 'primary' && 'disabled:opacity-50 disabled:shadow-none',
                variants[variant],
                sizes[size],
                className
            )}
            {...props}
        >
            {isLoading ? (
                <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
            ) : icon ? (
                <span className="shrink-0">{icon}</span>
            ) : null}
            {children}
        </button>
    );
}
