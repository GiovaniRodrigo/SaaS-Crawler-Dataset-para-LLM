import { ButtonHTMLAttributes } from 'react';
import Button from './atoms/Button';

interface PrimaryButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    isLoading?: boolean;
}

export default function PrimaryButton({
    className = '',
    disabled,
    isLoading,
    children,
    ...props
}: PrimaryButtonProps) {
    return (
        <Button
            {...props}
            variant="primary"
            className={className}
            disabled={disabled}
            isLoading={isLoading}
        >
            {children}
        </Button>
    );
}
