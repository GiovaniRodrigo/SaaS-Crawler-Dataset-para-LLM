import { ButtonHTMLAttributes } from 'react';
import Button from './atoms/Button';

interface SecondaryButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    isLoading?: boolean;
}

export default function SecondaryButton({
    type = 'button',
    className = '',
    disabled,
    isLoading,
    children,
    ...props
}: SecondaryButtonProps) {
    return (
        <Button
            {...props}
            type={type}
            variant="secondary"
            className={className}
            disabled={disabled}
            isLoading={isLoading}
        >
            {children}
        </Button>
    );
}
