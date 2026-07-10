import { ReactNode } from 'react';
import Card from '@/Components/atoms/Card';
import Typography from '@/Components/atoms/Typography';
import { cn } from '@/utils';

interface MetricCardProps {
    label: string;
    value: string | number;
    icon?: ReactNode;
    trend?: {
        value: string | number;
        isPositive: boolean;
    };
    className?: string;
}

export default function MetricCard({
    label,
    value,
    icon,
    trend,
    className,
}: MetricCardProps) {
    return (
        <Card className={cn('relative overflow-hidden group hover:border-cyan-500/50 transition-all duration-300', className)}>
            {/* Top accent line */}
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            
            <div className="flex items-start justify-between relative z-10">
                <div>
                    <Typography variant="caption" className="text-slate-500 dark:text-slate-400 font-bold uppercase tracking-wider text-[10px]">
                        {label}
                    </Typography>
                    <Typography variant="h2" className="mt-2 font-black text-slate-950 dark:text-white tracking-tight">
                        {value}
                    </Typography>
                    {trend && (
                        <div className="mt-3 flex items-center gap-1.5 bg-slate-900/50 rounded-full px-2 py-0.5 w-fit border border-slate-800">
                            <span className={cn(
                                'text-[10px] font-bold',
                                trend.isPositive ? 'text-emerald-400' : 'text-rose-400'
                            )}>
                                {trend.isPositive ? '↑' : '↓'} {trend.value}
                            </span>
                        </div>
                    )}
                </div>
                {icon && (
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white dark:bg-black border-2 border-slate-950 dark:border-slate-50 text-cyan-600 dark:text-cyan-400 shadow-sm group-hover:scale-110 transition-transform duration-500">
                        {icon}
                    </div>
                )}
            </div>
            {/* Background glow */}
            <div className="absolute -right-8 -bottom-8 h-32 w-32 rounded-full bg-cyan-500/5 blur-[50px] group-hover:bg-cyan-500/10 transition-colors" />
        </Card>
    );
}
