import { PropsWithChildren } from 'react';

export default function Card({ children, className = '' }: PropsWithChildren<{ className?: string }>) {
    return (
        <div className={`bg-white overflow-hidden shadow-sm sm:rounded-lg p-6 ${className}`}>
            {children}
        </div>
    );
}
