import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import { CrawlJob } from '@/Types/project';
import Card from '@/Components/atoms/Card';
import Typography from '@/Components/atoms/Typography';
import Badge from '@/Components/atoms/Badge';
import { AlertCircle, ArrowLeft, Globe, Link as LinkIcon, Clock } from 'lucide-react';
import useTranslation from '@/Hooks/useTranslation';

interface FailedPage {
    id: number;
    url: string;
    status_code: number;
    error_message: string | null;
    created_at: string;
}

interface Props {
    crawlJob: CrawlJob & { project: { name: string } };
    failures: {
        data: FailedPage[];
        links: any[];
    };
}

export default function Failures({ crawlJob, failures }: Props) {
    const { t } = useTranslation();

    return (
        <AuthenticatedLayout
            header={
                <div className="flex items-center justify-between">
                    <div className="flex flex-col gap-1">
                        <div className="flex items-center gap-2">
                            <Link href={route('crawl-jobs.show', crawlJob.id)} className="flex items-center gap-1 text-slate-500 hover:text-slate-950 dark:hover:text-slate-50 transition-colors">
                                <ArrowLeft className="h-4 w-4" />
                                <Typography variant="caption" className="font-bold uppercase tracking-wider">{t('messages.back_to_job')}</Typography>
                            </Link>
                        </div>
                        <Typography variant="h1" className="font-black text-slate-950 dark:text-slate-50">
                            {t('messages.failures_title')}
                        </Typography>
                        <Typography variant="small" className="text-slate-600 dark:text-slate-400 font-bold">
                            {crawlJob.project.name} • Job #{crawlJob.id}
                        </Typography>
                    </div>
                </div>
            }
        >
            <Head title={t('messages.failures_title')} />

            <div className="space-y-6">
                <Card padding="none" className="overflow-hidden border-4 border-rose-500/20 dark:border-rose-500/10">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-rose-50/50 dark:bg-rose-950/10 border-b-2 border-slate-100 dark:border-slate-800">
                                    <th className="px-6 py-4 text-[10px] font-black text-slate-500 uppercase tracking-widest">{t('messages.url')}</th>
                                    <th className="px-6 py-4 text-[10px] font-black text-slate-500 uppercase tracking-widest text-center">{t('messages.status')}</th>
                                    <th className="px-6 py-4 text-[10px] font-black text-slate-500 uppercase tracking-widest">{t('messages.reason')}</th>
                                    <th className="px-6 py-4 text-[10px] font-black text-slate-500 uppercase tracking-widest text-right">{t('messages.date_time')}</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y-2 divide-slate-50 dark:divide-slate-900">
                                {failures.data.length === 0 ? (
                                    <tr>
                                        <td colSpan={4} className="px-6 py-20 text-center">
                                            <div className="flex flex-col items-center gap-4">
                                                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-50 dark:bg-emerald-950/20 text-emerald-500 border-2 border-emerald-500/20">
                                                    <Globe className="h-8 w-8" />
                                                </div>
                                                <Typography variant="body" className="text-slate-500 font-black">{t('messages.no_failures')}</Typography>
                                            </div>
                                        </td>
                                    </tr>
                                ) : (
                                    failures.data.map((fail) => (
                                        <tr key={fail.id} className="hover:bg-rose-50/30 dark:hover:bg-rose-950/5 transition-colors group">
                                            <td className="px-6 py-5">
                                                <div className="flex items-center gap-3">
                                                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white dark:bg-black border-2 border-slate-950 dark:border-slate-50 text-rose-600 dark:text-rose-400 shadow-sm transition-transform group-hover:scale-110">
                                                        <LinkIcon className="h-5 w-5" />
                                                    </div>
                                                    <div className="flex flex-col min-w-0">
                                                        <a 
                                                            href={fail.url} 
                                                            target="_blank" 
                                                            rel="noopener noreferrer"
                                                            className="text-sm font-black text-slate-950 dark:text-slate-50 truncate hover:text-rose-600 dark:hover:text-rose-400 transition-colors"
                                                        >
                                                            {fail.url}
                                                        </a>
                                                        <span className="text-[10px] font-bold text-slate-500 uppercase">{t('messages.validate_manually')}</span>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-5 text-center">
                                                <Badge variant="rose" className="border-2 border-rose-600 dark:border-rose-400 bg-rose-600 dark:bg-rose-400 text-white dark:text-black">
                                                    {fail.status_code === 0 ? t('messages.blocked_badge') : fail.status_code}
                                                </Badge>
                                            </td>
                                            <td className="px-6 py-5">
                                                <div className="flex items-start gap-2 max-w-md">
                                                    <AlertCircle className="h-4 w-4 shrink-0 text-rose-500 mt-0.5" />
                                                    <Typography variant="small" className="text-slate-800 dark:text-slate-200 font-bold leading-snug">
                                                        {fail.error_message || t('messages.request_errors_history')}
                                                    </Typography>
                                                </div>
                                            </td>
                                            <td className="px-6 py-5 text-right whitespace-nowrap">
                                                <div className="flex flex-col">
                                                    <span className="text-xs font-black text-slate-950 dark:text-slate-50">{new Date(fail.created_at).toLocaleDateString()}</span>
                                                    <span className="text-[10px] font-bold text-slate-500">{new Date(fail.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                                                </div>
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
