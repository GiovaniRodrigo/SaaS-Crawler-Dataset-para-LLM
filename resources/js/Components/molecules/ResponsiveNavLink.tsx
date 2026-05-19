import { InertiaLinkProps, Link } from '@inertiajs/react';
import { cn } from '@/utils';

interface ResponsiveNavLinkProps extends InertiaLinkProps {
    active?: boolean;
}

export default function ResponsiveNavLink({
    active = false,
    className = '',
    children,
    ...props
}: ResponsiveNavLinkProps) {
    return (
        <Link
            {...props}
            className={cn(
                'flex w-full items-start border-l-4 py-2 pe-4 ps-3 text-base font-medium transition duration-150 ease-in-out focus:outline-none',
                active
                    ? 'border-cyan-400 bg-cyan-400/10 text-cyan-100 focus:border-cyan-300 focus:bg-cyan-400/20'
                    : 'border-transparent text-slate-300 hover:border-slate-700 hover:bg-slate-900 hover:text-slate-100 focus:border-slate-700 focus:bg-slate-900',
                className
            )}
        >
            {children}
        </Link>
    );
}
