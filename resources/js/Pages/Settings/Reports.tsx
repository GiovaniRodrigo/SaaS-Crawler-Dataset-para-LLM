import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, router } from '@inertiajs/react';
import Typography from '@/Components/atoms/Typography';
import Card from '@/Components/atoms/Card';
import Badge from '@/Components/atoms/Badge';
import { 
    TrendingUp, 
    Database, 
    CheckCircle2, 
    AlertTriangle, 
    XCircle, 
    Activity, 
    Globe, 
    FileText, 
    Braces,
    ExternalLink
} from 'lucide-react';
import useTranslation from '@/Hooks/useTranslation';

interface Metrics {
    total_projects: number;
    total_documents: number;
    total_chunks: number;
    approved_documents: number;
    pending_documents: number;
    rejected_documents: number;
    completed_jobs: number;
    failed_jobs: number;
    running_jobs: number;
    total_crawled: number;
    total_failed: number;
    average_characters: number;
}

interface ChartItem {
    name: string;
    count: number;
}

interface TopDomain {
    domain: string;
    count: number;
}

interface Props {
    metrics: Metrics;
    chartData: ChartItem[];
    topDomains: TopDomain[];
    currentPeriod?: number;
}

export default function Reports({ metrics, chartData, topDomains, currentPeriod = 7 }: Props) {
    const { t } = useTranslation();
    const maxVal = Math.max(...chartData.map(d => d.count), 1);
    
    // Calcular percentuais de aprovação
    const totalDocs = metrics.total_documents || 1;
    const approvalRate = Math.round((metrics.approved_documents / totalDocs) * 100);
    const rejectionRate = Math.round((metrics.rejected_documents / totalDocs) * 100);
    const pendingRate = Math.round((metrics.pending_documents / totalDocs) * 100);

    const totalJobs = metrics.completed_jobs + metrics.failed_jobs + metrics.running_jobs || 1;
    const jobSuccessRate = Math.round((metrics.completed_jobs / totalJobs) * 100);

    const handlePeriodChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        router.get(route('settings.reports'), { period: e.target.value }, { preserveState: true });
    };

    return (
        <AuthenticatedLayout
            header={
                <Typography variant="h1" className="font-black text-slate-950 dark:text-slate-50">
                    {t('messages.advanced_reports')}
                </Typography>
            }
        >
            <Head title={t('messages.advanced_reports')} />

            <div className="max-w-6xl mx-auto space-y-8">
                {/* Hero section */}
                <Card className="border-cyan-500/10 bg-gradient-to-br from-slate-950 via-black to-slate-950 relative overflow-hidden border-2">
                    <div className="absolute top-0 right-0 -mt-4 -mr-4 h-32 w-32 rounded-full bg-cyan-500/5 blur-3xl"></div>
                    <div className="flex items-start gap-4">
                        <div className="h-12 w-12 rounded-2xl bg-cyan-500/10 flex items-center justify-center text-cyan-600 dark:text-cyan-400 shrink-0 border-2 border-cyan-500/20">
                            <TrendingUp className="h-6 w-6" />
                        </div>
                        <div>
                            <Typography variant="h3" className="font-black text-slate-950 dark:text-slate-50 mb-1">
                                {t('messages.analysis_quality')}
                            </Typography>
                            <Typography variant="body" className="text-slate-600 dark:text-slate-400 text-sm font-bold">
                                {t('messages.analysis_desc')}
                            </Typography>
                        </div>
                    </div>
                </Card>

                {/* Grid 1: Principais Métricas */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <Card className="border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 flex items-center gap-4 border-2">
                        <div className="h-12 w-12 rounded-xl bg-cyan-500/10 flex items-center justify-center text-cyan-600 dark:text-cyan-400 shrink-0 border-2 border-cyan-500/20">
                            <Database className="h-6 w-6" />
                        </div>
                        <div>
                            <Typography variant="small" className="text-slate-500 font-black uppercase tracking-widest text-[10px]">{t('messages.total_projects')}</Typography>
                            <Typography variant="h2" className="font-black text-slate-950 dark:text-slate-50 mt-0.5">{metrics.total_projects}</Typography>
                        </div>
                    </Card>

                    <Card className="border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 flex items-center gap-4 border-2">
                        <div className="h-12 w-12 rounded-xl bg-violet-500/10 flex items-center justify-center text-violet-600 dark:text-violet-400 shrink-0 border-2 border-violet-500/20">
                            <FileText className="h-6 w-6" />
                        </div>
                        <div>
                            <Typography variant="small" className="text-slate-500 font-black uppercase tracking-widest text-[10px]">{t('messages.extracted_documents')}</Typography>
                            <Typography variant="h2" className="font-black text-slate-950 dark:text-slate-50 mt-0.5">{metrics.total_documents}</Typography>
                        </div>
                    </Card>

                    <Card className="border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 flex items-center gap-4 border-2">
                        <div className="h-12 w-12 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-600 dark:text-emerald-400 shrink-0 border-2 border-emerald-500/20">
                            <Braces className="h-6 w-6" />
                        </div>
                        <div>
                            <Typography variant="small" className="text-slate-500 font-black uppercase tracking-widest text-[10px]">{t('messages.total_chunks')}</Typography>
                            <Typography variant="h2" className="font-black text-slate-950 dark:text-slate-50 mt-0.5">{metrics.total_chunks}</Typography>
                        </div>
                    </Card>
                </div>

                {/* Grid 2: Histórico e Distribuição de Qualidade */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Gráfico de Histórico de Coletas */}
                    <Card className="lg:col-span-2 border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 flex flex-col justify-between h-96 border-2">
                        <div className="flex items-start justify-between">
                            <div>
                                <Typography variant="h4" className="font-black text-slate-950 dark:text-slate-50 flex items-center gap-2 mb-1">
                                    <Activity className="h-5 w-5 text-cyan-600 dark:text-cyan-400" />
                                    {t('messages.collection_history')}
                                </Typography>
                                <Typography variant="small" className="text-slate-500 font-bold">
                                    {t('messages.indexing_quantity')}
                                </Typography>
                            </div>
                            <select 
                                value={currentPeriod} 
                                onChange={handlePeriodChange}
                                className="bg-white dark:bg-black border-2 border-slate-950 dark:border-slate-50 text-slate-950 dark:text-slate-50 text-sm font-black rounded-lg px-3 py-1.5 focus:ring-cyan-500 focus:border-cyan-500 transition-colors"
                            >
                                <option value={7}>{t('messages.last_7_days')}</option>
                                <option value={15}>{t('messages.last_15_days')}</option>
                                <option value={30}>{t('messages.last_30_days')}</option>
                            </select>
                        </div>

                        {/* Custom Pure CSS/HTML Chart */}
                        <div className="h-52 flex items-end justify-between gap-2 px-4 border-b-2 border-slate-100 dark:border-slate-900 pb-2">
                            {chartData.map((item, index) => {
                                const heightPct = (item.count / maxVal) * 80 + 5; // mínimo 5% para visibilidade
                                return (
                                    <div key={index} className="flex-1 flex flex-col items-center group relative h-full justify-end">
                                        {/* Tooltip */}
                                        <div className="absolute bottom-full mb-2 bg-slate-950 text-slate-100 text-[10px] px-2 py-1 rounded shadow-lg border-2 border-slate-50 pointer-events-none whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10 font-black">
                                            {item.count} docs
                                        </div>
                                        {/* Bar */}
                                        <div 
                                            style={{ height: `${heightPct}%` }}
                                            className="w-full bg-slate-950 dark:bg-slate-50 hover:bg-cyan-500 dark:hover:bg-cyan-400 rounded-t-lg transition-all duration-300 relative border-x border-t border-slate-200 dark:border-slate-800"
                                        ></div>
                                        <span className="text-[10px] text-slate-500 mt-2 block select-none font-black uppercase">
                                            {item.name}
                                        </span>
                                    </div>
                                );
                            })}
                        </div>
                    </Card>

                    {/* Distribuição de Qualidade (Review de Documentos) */}
                    <Card className="border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 flex flex-col justify-between h-96 border-2">
                        <div>
                            <Typography variant="h4" className="font-black text-slate-950 dark:text-slate-50 mb-1">
                                {t('messages.curation_status')}
                            </Typography>
                            <Typography variant="small" className="text-slate-500 font-bold">
                                {t('messages.curation_desc')}
                            </Typography>
                        </div>

                        <div className="space-y-6">
                            {/* Radial/Bar progress container */}
                            <div className="space-y-5">
                                <div className="space-y-1.5">
                                    <div className="flex justify-between text-xs font-black uppercase tracking-widest">
                                        <span className="text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                                            <CheckCircle2 className="h-4 w-4" /> {t('messages.approved')}
                                        </span>
                                        <span className="text-slate-950 dark:text-slate-50">{metrics.approved_documents} ({approvalRate}%)</span>
                                    </div>
                                    <div className="h-3 w-full bg-slate-100 dark:bg-slate-900 rounded-full overflow-hidden border border-slate-200 dark:border-slate-800">
                                        <div style={{ width: `${approvalRate}%` }} className="h-full bg-emerald-500 rounded-full shadow-[0_0_10px_rgba(16,185,129,0.2)]"></div>
                                    </div>
                                </div>

                                <div className="space-y-1.5">
                                    <div className="flex justify-between text-xs font-black uppercase tracking-widest">
                                        <span className="text-amber-600 dark:text-amber-400 flex items-center gap-1">
                                            <AlertTriangle className="h-4 w-4" /> {t('messages.pending')}
                                        </span>
                                        <span className="text-slate-950 dark:text-slate-50">{metrics.pending_documents} ({pendingRate}%)</span>
                                    </div>
                                    <div className="h-3 w-full bg-slate-100 dark:bg-slate-900 rounded-full overflow-hidden border border-slate-200 dark:border-slate-800">
                                        <div style={{ width: `${pendingRate}%` }} className="h-full bg-amber-500 rounded-full shadow-[0_0_10px_rgba(245,158,11,0.2)]"></div>
                                    </div>
                                </div>

                                <div className="space-y-1.5">
                                    <div className="flex justify-between text-xs font-black uppercase tracking-widest">
                                        <span className="text-rose-600 dark:text-rose-400 flex items-center gap-1">
                                            <XCircle className="h-4 w-4" /> {t('messages.rejected')}
                                        </span>
                                        <span className="text-slate-950 dark:text-slate-50">{metrics.rejected_documents} ({rejectionRate}%)</span>
                                    </div>
                                    <div className="h-3 w-full bg-slate-100 dark:bg-slate-900 rounded-full overflow-hidden border border-slate-200 dark:border-slate-800">
                                        <div style={{ width: `${rejectionRate}%` }} className="h-full bg-rose-500 rounded-full shadow-[0_0_10px_rgba(244,63,94,0.2)]"></div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="p-4 bg-slate-50 dark:bg-black border-2 border-slate-950 dark:border-slate-50 rounded-xl flex items-center justify-between text-xs font-black">
                            <span className="text-slate-500 uppercase tracking-widest">{t('messages.avg_size')}:</span>
                            <span className="text-slate-950 dark:text-slate-50">{metrics.average_characters.toLocaleString()} {t('messages.characters')}</span>
                        </div>
                    </Card>
                </div>

                {/* Grid 3: Crawl Performance e Principais Domínios */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Eficiência do Crawler */}
                    <Card className="border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 space-y-6 border-2">
                        <div>
                            <Typography variant="h4" className="font-black text-slate-950 dark:text-slate-50 mb-1">
                                {t('messages.crawler_performance')}
                            </Typography>
                            <Typography variant="small" className="text-slate-500 font-bold">
                                {t('messages.track_recent_crawls')}
                            </Typography>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="p-4 bg-slate-50 dark:bg-black border-2 border-slate-200 dark:border-slate-800 rounded-xl">
                                <Typography variant="caption" className="text-slate-500 font-black uppercase tracking-widest text-[9px]">{t('messages.crawler_finished')}</Typography>
                                <Typography variant="h3" className="font-black text-slate-950 dark:text-slate-50 mt-1">{metrics.completed_jobs}</Typography>
                            </div>
                            <div className="p-4 bg-slate-50 dark:bg-black border-2 border-slate-200 dark:border-slate-800 rounded-xl">
                                <Typography variant="caption" className="text-slate-500 font-black uppercase tracking-widest text-[9px]">{t('messages.failures_title')}</Typography>
                                <Typography variant="h3" className="font-black text-rose-600 dark:text-rose-400 mt-1">{metrics.failed_jobs}</Typography>
                            </div>
                        </div>

                        <div className="space-y-4 pt-4 border-t-2 border-slate-100 dark:border-slate-900">
                            <div className="flex justify-between items-center text-xs font-black uppercase tracking-widest">
                                <span className="text-slate-500">{t('messages.success_rate')}</span>
                                <span className="text-slate-950 dark:text-slate-50">{jobSuccessRate}%</span>
                            </div>
                            <div className="h-3 w-full bg-slate-100 dark:bg-slate-900 rounded-full overflow-hidden border border-slate-200 dark:border-slate-800">
                                <div style={{ width: `${jobSuccessRate}%` }} className="h-full bg-cyan-500 rounded-full shadow-[0_0_10px_rgba(6,182,212,0.2)]"></div>
                            </div>
                            
                            <div className="flex justify-between items-center text-xs font-bold text-slate-600 dark:text-slate-400 pt-2">
                                <span>{t('messages.total_crawled_history')}:</span>
                                <span className="font-black text-slate-950 dark:text-slate-50">{metrics.total_crawled}</span>
                            </div>
                            <div className="flex justify-between items-center text-xs font-bold text-slate-600 dark:text-slate-400">
                                <span>{t('messages.request_errors_history')}:</span>
                                <span className="font-black text-rose-600 dark:text-rose-400">{metrics.total_failed}</span>
                            </div>
                        </div>
                    </Card>

                    {/* Principais Fontes/Domínios */}
                    <Card className="border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 space-y-6 border-2">
                        <div>
                            <Typography variant="h4" className="font-black text-slate-950 dark:text-slate-50 mb-1">
                                {t('messages.top_domains')}
                            </Typography>
                            <Typography variant="small" className="text-slate-500 font-bold">
                                {t('messages.sources_desc')}
                            </Typography>
                        </div>

                        <div className="space-y-4">
                            {topDomains.map((item, index) => (
                                <div key={index} className="flex items-center justify-between p-4 bg-slate-50 dark:bg-black border-2 border-slate-200 dark:border-slate-800 rounded-xl group transition-all hover:border-cyan-500/50">
                                    <a 
                                        href={`https://${item.domain}`} 
                                        target="_blank" 
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-3 min-w-0 flex-1 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors"
                                    >
                                        <div className="h-10 w-10 rounded-xl bg-white dark:bg-slate-900 flex items-center justify-center shrink-0 border-2 border-slate-200 dark:border-slate-800 group-hover:border-cyan-500/30 group-hover:bg-cyan-500/5 transition-all">
                                            <Globe className="h-5 w-5 text-cyan-600 dark:text-cyan-400" />
                                        </div>
                                        <div className="flex flex-col min-w-0">
                                            <span className="text-sm font-black text-slate-950 dark:text-slate-50 truncate group-hover:text-cyan-600 dark:group-hover:text-cyan-400">{item.domain}</span>
                                            <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-1">
                                                {t('messages.validate_manually')} <ExternalLink className="h-2 w-2" />
                                            </span>
                                        </div>
                                    </a>
                                    
                                    <button 
                                        onClick={() => router.get(route('documents.indexAll'), { search: item.domain })}
                                        className="text-xs font-black text-slate-950 dark:text-slate-50 bg-white dark:bg-slate-900 hover:bg-cyan-400 hover:text-black dark:hover:bg-cyan-400 dark:hover:text-black px-4 py-2 rounded-xl border-2 border-slate-950 dark:border-slate-50 shrink-0 transition-all cursor-pointer shadow-sm active:scale-95"
                                    >
                                        {item.count} docs
                                    </button>
                                </div>
                            ))}
                            {topDomains.length === 0 && (
                                <div className="text-center py-12 text-slate-500 text-sm font-bold">
                                    {t('messages.no_domains')}
                                </div>
                            )}
                        </div>
                    </Card>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
