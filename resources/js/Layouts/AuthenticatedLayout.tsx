import Sidebar from '@/Components/organisms/Sidebar';
import Topbar from '@/Components/organisms/Topbar';
import OnboardingTour from '@/Components/organisms/OnboardingTour';
import { PropsWithChildren, ReactNode, useEffect, useState } from 'react';
import { usePage } from '@inertiajs/react';
import { PageProps } from '@/types';
import { CheckCircle2, AlertCircle, X } from 'lucide-react';
import { cn } from '@/utils';

export default function Authenticated({
    header,
    children,
}: PropsWithChildren<{ header?: ReactNode }>) {
    const { flash } = usePage<PageProps>().props;
    const [visibleFlash, setVisibleFlash] = useState<string | null>(null);
    const [flashType, setFlashType] = useState<'success' | 'error' | null>(null);

    useEffect(() => {
        if (flash.success) {
            setVisibleFlash(flash.success);
            setFlashType('success');
            const timer = setTimeout(() => setVisibleFlash(null), 5000);
            return () => clearTimeout(timer);
        }
        if (flash.error) {
            setVisibleFlash(flash.error);
            setFlashType('error');
            const timer = setTimeout(() => setVisibleFlash(null), 5000);
            return () => clearTimeout(timer);
        }
    }, [flash]);

    return (
        <div className="min-h-screen bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100">
            <OnboardingTour />
            
            {/* Flash Messages - High Contrast Banner */}
            {visibleFlash && (
                <div className="fixed top-4 right-4 z-[100] animate-in fade-in slide-in-from-right duration-300">
                    <div className={cn(
                        'flex items-center gap-3 rounded-2xl border-4 px-6 py-4 shadow-2xl min-w-[320px]',
                        flashType === 'success' 
                            ? 'bg-white dark:bg-black border-emerald-500 text-slate-950 dark:text-slate-50' 
                            : 'bg-white dark:bg-black border-rose-500 text-slate-950 dark:text-slate-50'
                    )}>
                        {flashType === 'success' ? (
                            <CheckCircle2 className="h-6 w-6 text-emerald-500" />
                        ) : (
                            <AlertCircle className="h-6 w-6 text-rose-500" />
                        )}
                        <span className="flex-1 font-black text-sm">{visibleFlash}</span>
                        <button onClick={() => setVisibleFlash(null)} className="ml-2 rounded-lg p-1 hover:bg-slate-100 dark:hover:bg-slate-900 transition-colors">
                            <X className="h-4 w-4 text-slate-400" />
                        </button>
                    </div>
                </div>
            )}

            {/* Sidebar fixed */}
            <Sidebar />

            {/* Main content area */}
            <div className="pl-72">
                <Topbar />

                {header && (
                    <div className="mx-auto max-w-7xl px-8 py-8">
                        {header}
                    </div>
                )}

                <main className="mx-auto max-w-7xl px-8 pb-12">
                    {children}
                </main>
            </div>
        </div>
    );
}
