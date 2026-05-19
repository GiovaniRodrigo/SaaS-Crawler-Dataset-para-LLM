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
        primary: 'bg-cyan-500 text-slate-950 hover:bg-cyan-400 shadow-sm shadow-cyan-500/20 font-bold',
        secondary: 'bg-slate-800 border border-slate-700 text-slate-100 hover:bg-slate-700',
        destructive: 'bg-rose-500 text-white hover:bg-rose-600 shadow-sm shadow-rose-500/20',
        ghost: 'bg-transparent text-slate-400 hover:bg-slate-800 hover:text-slate-100',
        outline: 'bg-transparent border border-cyan-500 text-cyan-500 hover:bg-cyan-500/10',
    };

    const sizes = {
        sm: 'h-8 px-3 text-xs',
        md: 'h-10 px-4 text-sm font-medium',
        lg: 'h-12 px-6 text-base font-semibold',
        icon: 'h-10 w-10 flex items-center justify-center p-0',
    };

    return (
        <button
            disabled={isLoading || disabled}
            className={cn(
                'inline-flex items-center justify-center gap-2 rounded-xl transition-all duration-200 active:scale-95 disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:focus:ring-offset-slate-950',
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
