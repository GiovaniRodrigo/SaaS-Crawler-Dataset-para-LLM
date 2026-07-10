import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import { CrawlJob } from '@/Types/project';
import Card from '@/Components/atoms/Card';
import Typography from '@/Components/atoms/Typography';
import Badge from '@/Components/atoms/Badge';
import { ArrowLeft, Globe, Link as LinkIcon, Clock, Search } from 'lucide-react';
import useTranslation from '@/Hooks/useTranslation';

interface DiscoveredPage {
    id: number;
    url: string;
    status_code: number;
    created_at: string;
}

interface Props {
    crawlJob: CrawlJob & { project: { name: string } };
    pages: {
        data: DiscoveredPage[];
        links: any[];
    };
}

export default function DiscoveredPages({ crawlJob, pages }: Props) {
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
                            Páginas Descobertas
                        </Typography>
                        <Typography variant="small" className="text-slate-600 dark:text-slate-400 font-bold">
                            Total de URLs encontradas no grafo de links • Job #{crawlJob.id}
                        </Typography>
                    </div>
                </div>
            }
        >
            <Head title="Páginas Descobertas" />

            <div className="space-y-6">
                <Card padding="none" className="overflow-hidden border-4 border-cyan-500/20 dark:border-cyan-500/10">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-cyan-50/50 dark:bg-cyan-950/10 border-b-2 border-slate-100 dark:border-slate-800">
                                    <th className="px-6 py-4 text-[10px] font-black text-slate-500 uppercase tracking-widest">URL Encontrada</th>
                                    <th className="px-6 py-4 text-[10px] font-black text-slate-500 uppercase tracking-widest text-center">Status Atual</th>
                                    <th className="px-6 py-4 text-[10px] font-black text-slate-500 uppercase tracking-widest text-right">Descoberta em</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y-2 divide-slate-50 dark:divide-slate-900">
                                {pages.data.length === 0 ? (
                                    <tr>
                                        <td colSpan={3} className="px-6 py-20 text-center">
                                            <div className="flex flex-col items-center gap-4">
                                                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-50 dark:bg-slate-900 text-slate-400 border-2 border-slate-200 dark:border-slate-800">
                                                    <Search className="h-8 w-8" />
                                                </div>
                                                <Typography variant="body" className="text-slate-500 font-black">Nenhuma URL descoberta para este job.</Typography>
                                            </div>
                                        </td>
                                    </tr>
                                ) : (
                                    pages.data.map((page) => (
                                        <tr key={page.id} className="hover:bg-cyan-50/30 dark:hover:bg-cyan-950/5 transition-colors group">
                                            <td className="px-6 py-5">
                                                <div className="flex items-center gap-3">
                                                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white dark:bg-black border-2 border-slate-950 dark:border-slate-50 text-cyan-600 dark:text-cyan-400 shadow-sm transition-transform group-hover:scale-110">
                                                        <LinkIcon className="h-5 w-5" />
                                                    </div>
                                                    <div className="flex flex-col min-w-0">
                                                        <span className="text-sm font-black text-slate-950 dark:text-slate-50 truncate">{page.url}</span>
                                                        <span className="text-[10px] font-bold text-slate-500 uppercase">Aguardando processamento ou já processada</span>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-5 text-center">
                                                <Badge 
                                                    variant={page.status_code >= 200 && page.status_code < 300 ? 'emerald' : page.status_code === 0 ? 'slate' : 'rose'} 
                                                    className="border-2"
                                                >
                                                    {page.status_code === 0 ? 'PENDING' : page.status_code}
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
