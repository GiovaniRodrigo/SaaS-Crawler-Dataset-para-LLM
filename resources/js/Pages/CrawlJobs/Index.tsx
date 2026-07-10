import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router } from '@inertiajs/react';
import Typography from '@/Components/atoms/Typography';
import Card from '@/Components/atoms/Card';
import Badge from '@/Components/atoms/Badge';
import { Activity, Clock, FileText, ArrowRight, Layers } from 'lucide-react';
import useTranslation from '@/Hooks/useTranslation';
import { useEffect } from 'react';
import { cn } from '@/utils';

interface Job {
    id: number;
    project: { name: string };
    status: 'created' | 'running' | 'completed' | 'failed' | 'canceled';
    total_crawled: number;
    max_pages: number;
    total_documents: number;
    created_at: string;
}

interface Props {
    jobs: {
        data: Job[];
        links: any[];
    };
}

export default function Index({ jobs }: Props) {
    const { t } = useTranslation();

    // Polling to update progress in real-time
    useEffect(() => {
        const hasRunningJobs = jobs.data.some(job => job.status === 'running' || job.status === 'created');
        
        if (hasRunningJobs) {
            const timer = setTimeout(() => {
                router.reload({ preserveScroll: true });
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [jobs.data]);

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'completed': return 'emerald';
            case 'running': return 'cyan';
            case 'failed': return 'rose';
            default: return 'slate';
        }
    };

    return (
        <AuthenticatedLayout
            header={
                <div className="flex flex-col gap-1">
                    <Typography variant="h1" className="font-black text-slate-950 dark:text-slate-50">
                        Histórico de Jobs
                    </Typography>
                    <Typography variant="small" className="text-slate-600 dark:text-slate-400 font-bold">
                        Acompanhe o progresso da coleta de dados em tempo real.
                    </Typography>
                </div>
            }
        >
            <Head title="Jobs de Coleta" />

            <div className="space-y-6">
                <Card padding="none" className="overflow-hidden border-2 border-slate-200 dark:border-slate-800">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-slate-50 dark:bg-black border-b-2 border-slate-100 dark:border-slate-800">
                                    <th className="px-6 py-4 text-[10px] font-black text-slate-500 uppercase tracking-widest">Projeto</th>
                                    <th className="px-6 py-4 text-[10px] font-black text-slate-500 uppercase tracking-widest">Status</th>
                                    <th className="px-6 py-4 text-[10px] font-black text-slate-500 uppercase tracking-widest">Progresso / Páginas</th>
                                    <th className="px-6 py-4 text-[10px] font-black text-slate-500 uppercase tracking-widest text-center">Docs</th>
                                    <th className="px-6 py-4 text-[10px] font-black text-slate-500 uppercase tracking-widest text-right">Ações</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y-2 divide-slate-50 dark:divide-slate-900">
                                {jobs.data.length === 0 ? (
                                    <tr>
                                        <td colSpan={5} className="px-6 py-20 text-center">
                                            <Typography variant="body" className="text-slate-500 font-bold">Nenhum job de coleta encontrado.</Typography>
                                        </td>
                                    </tr>
                                ) : (
                                    jobs.data.map((job) => (
                                        <tr key={job.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-900/30 transition-colors group">
                                            <td className="px-6 py-5">
                                                <div className="flex items-center gap-3">
                                                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white dark:bg-black border-2 border-slate-950 dark:border-slate-50 text-cyan-600 dark:text-cyan-400 shadow-sm transition-transform group-hover:scale-110">
                                                        <Activity className="h-5 w-5" />
                                                    </div>
                                                    <div className="flex flex-col">
                                                        <span className="text-sm font-black text-slate-950 dark:text-slate-50">{job.project.name}</span>
                                                        <span className="flex items-center gap-1.5 text-[10px] font-bold text-slate-500">
                                                            <Clock className="h-3 w-3" /> 
                                                            {new Date(job.created_at).toLocaleDateString()} às {new Date(job.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                                        </span>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-5">
                                                <Badge variant={getStatusColor(job.status) as any}>{job.status}</Badge>
                                            </td>
                                            <td className="px-6 py-5">
                                                <div className="flex flex-col gap-2 min-w-[140px]">
                                                    <div className="flex items-center justify-between">
                                                        <span className="text-[11px] font-black text-slate-900 dark:text-slate-100">
                                                            {job.total_crawled} / {job.max_pages}
                                                        </span>
                                                        <span className="text-[11px] font-black text-cyan-600 dark:text-cyan-400">
                                                            {Math.round((job.total_crawled / job.max_pages) * 100)}%
                                                        </span>
                                                    </div>
                                                    <div className="h-2 w-full overflow-hidden rounded-full bg-slate-200 dark:bg-slate-800 border border-slate-300 dark:border-slate-700">
                                                        <div 
                                                            className={cn(
                                                                "h-full transition-all duration-500",
                                                                job.status === 'running' ? 'bg-cyan-500 animate-pulse' : 
                                                                job.status === 'completed' ? 'bg-emerald-500' : 
                                                                job.status === 'failed' ? 'bg-red-500' : 'bg-slate-500'
                                                            )}
                                                            style={{ width: `${Math.min((job.total_crawled / job.max_pages) * 100, 100)}%` }} 
                                                        />
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-5 text-center">
                                                <div className="inline-flex items-center gap-1.5 rounded-lg bg-slate-100 dark:bg-slate-900 px-2 py-1 border border-slate-200 dark:border-slate-800">
                                                    <Layers className="h-3 w-3 text-slate-500" />
                                                    <span className="text-xs font-black text-slate-900 dark:text-slate-100">{job.total_documents}</span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-5 text-right">
                                                <Link href={route('crawl-jobs.show', job.id)}>
                                                    <button className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-white dark:bg-black border-2 border-slate-950 dark:border-slate-50 text-slate-950 dark:text-slate-50 hover:bg-cyan-400 hover:text-black hover:border-black transition-all">
                                                        <ArrowRight className="h-5 w-5" />
                                                    </button>
                                                </Link>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </Card>
            </div>
        </AuthenticatedLayout>
    );
}
