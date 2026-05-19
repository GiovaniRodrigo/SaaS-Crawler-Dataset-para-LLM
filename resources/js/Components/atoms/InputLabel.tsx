import { LabelHTMLAttributes } from 'react';
import { cn } from '@/utils';

interface InputLabelProps extends LabelHTMLAttributes<HTMLLabelElement> {
    value?: string;
}

export default function InputLabel({
    value,
    className = '',
    children,
    ...props
}: InputLabelProps) {
    return (
        <label
            {...props}
            className={cn('block text-sm font-medium text-slate-200', className)}
        >
            {value ? value : children}
        </label>
    );
}
