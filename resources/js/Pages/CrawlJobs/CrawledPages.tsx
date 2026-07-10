import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import { CrawlJob } from '@/Types/project';
import Card from '@/Components/atoms/Card';
import Typography from '@/Components/atoms/Typography';
import Badge from '@/Components/atoms/Badge';
import { ArrowLeft, CheckCircle2, Globe, Link as LinkIcon, Clock } from 'lucide-react';
import useTranslation from '@/Hooks/useTranslation';

interface CrawledPage {
    id: number;
    url: string;
    status_code: number;
    created_at: string;
}

interface Props {
    crawlJob: CrawlJob & { project: { name: string } };
    pages: {
        data: CrawledPage[];
        links: any[];
    };
}

export default function CrawledPages({ crawlJob, pages }: Props) {
    const { t } = useTranslation();

    return (
        <AuthenticatedLayout
            header={
                <div className="flex items-center justify-between">
                    <div className="flex flex-col gap-1">
                        <div className="flex items-center gap-2">
                            <Link href={route('crawl-jobs.show', crawlJob.id)} className="flex items-center gap-1 text-slate-500 hover:text-slate-950 dark:hover:text-slate-50 transition-colors">
                                <ArrowLeft className="h-4 w-4" />
                                <Typography variant="caption" className="font-bold uppercase tracking-wider">Voltar ao Job</Typography>
                            </Link>
                        </div>
                        <Typography variant="h1" className="font-black text-slate-950 dark:text-slate-50">
                            Páginas Coletadas
                        </Typography>
                        <Typography variant="small" className="text-slate-600 dark:text-slate-400 font-bold">
                            {crawlJob.project.name} • Job #{crawlJob.id}
                        </Typography>
                    </div>
                </div>
            }
        >
            <Head title="Páginas Coletadas" />

            <div className="space-y-6">
                <Card padding="none" className="overflow-hidden border-4 border-emerald-500/20 dark:border-emerald-500/10">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-emerald-50/50 dark:bg-emerald-950/10 border-b-2 border-slate-100 dark:border-slate-800">
                                    <th className="px-6 py-4 text-[10px] font-black text-slate-500 uppercase tracking-widest">URL</th>
                                    <th className="px-6 py-4 text-[10px] font-black text-slate-500 uppercase tracking-widest text-center">Status</th>
                                    <th className="px-6 py-4 text-[10px] font-black text-slate-500 uppercase tracking-widest text-right">Data/Hora</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y-2 divide-slate-50 dark:divide-slate-900">
                                {pages.data.length === 0 ? (
                                    <tr>
                                        <td colSpan={3} className="px-6 py-20 text-center">
                                            <div className="flex flex-col items-center gap-4">
                                                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-50 dark:bg-slate-900 text-slate-400 border-2 border-slate-200 dark:border-slate-800">
                                                    <Globe className="h-8 w-8" />
                                                </div>
                                                <Typography variant="body" className="text-slate-500 font-black">Nenhuma página coletada com sucesso ainda.</Typography>
                                            </div>
                                        </td>
                                    </tr>
                                ) : (
                                    pages.data.map((page) => (
                                        <tr key={page.id} className="hover:bg-emerald-50/30 dark:hover:bg-emerald-950/5 transition-colors group">
                                            <td className="px-6 py-5">
                                                <div className="flex items-center gap-3">
                                                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white dark:bg-black border-2 border-slate-950 dark:border-slate-50 text-emerald-600 dark:text-emerald-400 shadow-sm transition-transform group-hover:scale-110">
                                                        <CheckCircle2 className="h-5 w-5" />
                                                    </div>
                                                    <div className="flex flex-col min-w-0">
                                                        <a 
                                                            href={page.url} 
                                                            target="_blank" 
                                                            rel="noopener noreferrer"
                                                            className="text-sm font-black text-slate-950 dark:text-slate-50 truncate hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
                                                        >
                                                            {page.url}
                                                        </a>
                                                        <span className="text-[10px] font-bold text-slate-500 uppercase">Acesse para validar manualmente</span>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-5 text-center">
                                                <Badge variant="emerald" className="border-2 border-emerald-600 dark:border-emerald-400 bg-emerald-600 dark:bg-emerald-400 text-white dark:text-black">
                                                    {page.status_code} OK
                                                </Badge>
                                            </td>
                                            <td className="px-6 py-5 text-right whitespace-nowrap">
                                                <div className="flex flex-col">
                                                    <span className="text-xs font-black text-slate-950 dark:text-slate-50">{new Date(page.created_at).toLocaleDateString()}</span>
                                                    <span className="text-[10px] font-bold text-slate-500">{new Date(page.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
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
