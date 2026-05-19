import { InputHTMLAttributes } from 'react';
import { cn } from '@/utils';

export default function Checkbox({
    className = '',
    ...props
}: InputHTMLAttributes<HTMLInputElement>) {
    return (
        <input
            {...props}
            type="checkbox"
            className={cn(
                'rounded border-slate-700 bg-slate-900 text-cyan-500 shadow-sm focus:ring-cyan-500 focus:ring-offset-slate-950 transition-all duration-200',
                className
            )}
        />
    );
}
