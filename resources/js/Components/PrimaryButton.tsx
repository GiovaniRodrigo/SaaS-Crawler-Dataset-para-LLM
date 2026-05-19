import { ButtonHTMLAttributes } from 'react';
import Button from './atoms/Button';

export default function PrimaryButton({
    className = '',
    disabled,
    children,
    ...props
}: ButtonHTMLAttributes<HTMLButtonElement>) {
    return (
        <Button
            {...props}
            variant="primary"
            className={className}
            disabled={disabled}
        >
            {children}
        </Button>
    );
}
