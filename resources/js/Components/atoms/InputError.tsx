import { HTMLAttributes } from 'react';
import { cn } from '@/utils';

interface InputErrorProps extends HTMLAttributes<HTMLParagraphElement> {
    message?: string;
}

export default function InputError({
    message,
    className = '',
    ...props
}: InputErrorProps) {
    return message ? (
        <p
            {...props}
            className={cn('text-sm text-rose-500 font-medium', className)}
        >
            {message}
        </p>
    ) : null;
}
