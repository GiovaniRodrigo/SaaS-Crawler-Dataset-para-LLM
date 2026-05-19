import { SVGAttributes } from 'react';
import { cn } from '@/utils';

export default function ApplicationLogo({ className, ...props }: SVGAttributes<SVGElement>) {
    return (
        <div className={cn('flex items-center gap-2', className)}>
            <div className="w-8 h-8 rounded-lg bg-cyan-500 flex items-center justify-center shadow-lg shadow-cyan-500/20">
                <svg
                    {...props}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="w-5 h-5 text-slate-950"
                >
                    <path d="M12 2L2 7l10 5 10-5-10-5z" />
                    <path d="M2 17l10 5 10-5" />
                    <path d="M2 12l10 5 10-5" />
                </svg>
            </div>
            <span className="text-xl font-bold tracking-tight text-slate-100 hidden sm:block">
                Data<span className="text-cyan-400">Crawl</span>
            </span>
        </div>
    );
}
