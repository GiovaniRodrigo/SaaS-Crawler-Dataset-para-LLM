import Sidebar from '@/Components/organisms/Sidebar';
import Topbar from '@/Components/organisms/Topbar';
import OnboardingTour from '@/Components/organisms/OnboardingTour';
import { PropsWithChildren, ReactNode } from 'react';

export default function Authenticated({
    header,
    children,
}: PropsWithChildren<{ header?: ReactNode }>) {
    return (
        <div className="min-h-screen bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100">
            <OnboardingTour />
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
