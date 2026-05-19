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
        <Card className={cn('relative overflow-hidden', className)}>
            <div className="flex items-start justify-between">
                <div>
                    <Typography variant="caption" className="text-slate-500 dark:text-slate-400">
                        {label}
                    </Typography>
                    <Typography variant="h2" className="mt-1 font-bold text-slate-950 dark:text-white">
                        {value}
                    </Typography>
                    {trend && (
                        <div className="mt-2 flex items-center gap-1">
                            <span className={cn(
                                'text-xs font-bold',
                                trend.isPositive ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400'
                            )}>
                                {trend.isPositive ? '+' : '-'}{trend.value}
                            </span>
                            <span className="text-xs text-slate-500">vs último mês</span>
                        </div>
                    )}
                </div>
                {icon && (
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-50 dark:bg-slate-800/50 text-indigo-600 dark:text-indigo-400">
                        {icon}
                    </div>
                )}
            </div>
            {/* Subtle background glow */}
            <div className="absolute -right-4 -top-4 h-24 w-24 rounded-full bg-indigo-500/5 blur-3xl" />
        </Card>
    );
}
