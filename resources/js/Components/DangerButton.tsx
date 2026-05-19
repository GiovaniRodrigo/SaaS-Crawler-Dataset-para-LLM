import { ButtonHTMLAttributes } from 'react';
import Button from './atoms/Button';

export default function DangerButton({
    className = '',
    disabled,
    children,
    ...props
}: ButtonHTMLAttributes<HTMLButtonElement>) {
    return (
        <Button
            {...props}
            variant="destructive"
            className={className}
            disabled={disabled}
        >
            {children}
        </Button>
    );
}
