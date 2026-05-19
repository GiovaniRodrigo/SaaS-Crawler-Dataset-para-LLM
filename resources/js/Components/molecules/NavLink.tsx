import { InertiaLinkProps, Link } from '@inertiajs/react';
import { cn } from '@/utils';

interface NavLinkProps extends InertiaLinkProps {
    active?: boolean;
}

export default function NavLink({
    active = false,
    className = '',
    children,
    ...props
}: NavLinkProps) {
    return (
        <Link
            {...props}
            className={cn(
                'inline-flex items-center border-b-2 px-1 pt-1 text-sm font-medium leading-5 transition duration-150 ease-in-out focus:outline-none h-16',
                active
                    ? 'border-cyan-400 text-cyan-100 focus:border-cyan-300'
                    : 'border-transparent text-slate-400 hover:border-slate-700 hover:text-slate-100 focus:border-slate-700 focus:text-slate-100',
                className
            )}
        >
            {children}
        </Link>
    );
}
