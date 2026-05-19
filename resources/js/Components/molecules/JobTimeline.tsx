import React from 'react';
import { cn } from '@/utils';
import Typography from '@/Components/atoms/Typography';
import { Search, Download, FileText, Eraser, Braces, CheckCircle2 } from 'lucide-react';

interface StepProps {
    icon: any;
    label: string;
    status: 'pending' | 'active' | 'completed';
    isLast?: boolean;
}

const Step = ({ icon: Icon, label, status, isLast }: StepProps) => {
    return (
        <div className="flex flex-col items-center flex-1 relative">
            {!isLast && (
                <div className={cn(
                    "absolute top-5 left-[50%] right-[-50%] h-0.5 z-0 transition-colors duration-500",
                    status === 'completed' ? "bg-emerald-500" : "bg-slate-800"
                )} />
            )}
            <div className={cn(
                "w-10 h-10 rounded-xl flex items-center justify-center z-10 transition-all duration-300 shadow-lg",
                status === 'completed' ? "bg-emerald-500 text-white shadow-emerald-500/20" : 
                status === 'active' ? "bg-cyan-500 text-white shadow-cyan-500/30 animate-pulse" : 
                "bg-slate-900 text-slate-600 border border-slate-800"
            )}>
                <Icon className="h-5 w-5" />
            </div>
            <Typography 
                variant="caption" 
                className={cn(
                    "mt-3 font-bold text-[10px] uppercase tracking-tighter text-center px-1",
                    status === 'completed' ? "text-emerald-400" : 
                    status === 'active' ? "text-cyan-400" : 
                    "text-slate-600"
                )}
            >
                {label}
            </Typography>
        </div>
    );
};

interface JobTimelineProps {
    currentStatus?: string;
    className?: string;
}

export default function JobTimeline({ currentStatus = 'pending', className }: JobTimelineProps) {
    // Definir as fases do Job
    const steps = [
        { key: 'discovery', label: 'Descoberta', icon: Search },
        { key: 'collect', label: 'Coleta', icon: Download },
        { key: 'extract', label: 'Extração', icon: FileText },
        { key: 'clean', label: 'Limpeza', icon: Eraser },
        { key: 'chunk', label: 'Fragmentação', icon: Braces },
        { key: 'done', label: 'Finalizado', icon: CheckCircle2 },
    ];

    // Mapear status atual para as fases (simplificado para demonstração)
    const getStatusForStep = (stepKey: string, current: string) => {
        const order = ['discovery', 'collect', 'extract', 'clean', 'chunk', 'done'];
        const currentIndex = order.indexOf(current === 'running' ? 'collect' : current === 'finished' ? 'done' : 'discovery');
        const stepIndex = order.indexOf(stepKey);

        if (stepIndex < currentIndex) return 'completed';
        if (stepIndex === currentIndex) return 'active';
        return 'pending';
    };

    return (
        <div className={cn("flex justify-between items-start w-full py-4", className)}>
            {steps.map((step, idx) => (
                <Step 
                    key={step.key}
                    icon={step.icon}
                    label={step.label}
                    status={getStatusForStep(step.key, currentStatus)}
                    isLast={idx === steps.length - 1}
                />
            ))}
        </div>
    );
}
