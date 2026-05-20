import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import Typography from '@/Components/atoms/Typography';
import Card from '@/Components/atoms/Card';
import { 
    TrendingUp, 
    Database, 
    CheckCircle2, 
    AlertTriangle, 
    XCircle, 
    Activity, 
    Globe, 
    FileText, 
    Braces
} from 'lucide-react';

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
}

export default function Reports({ metrics, chartData, topDomains }: Props) {
    const maxVal = Math.max(...chartData.map(d => d.count), 1);
    
    // Calcular percentuais de aprovação
    const totalDocs = metrics.total_documents || 1;
    const approvalRate = Math.round((metrics.approved_documents / totalDocs) * 100);
    const rejectionRate = Math.round((metrics.rejected_documents / totalDocs) * 100);
    const pendingRate = Math.round((metrics.pending_documents / totalDocs) * 100);

    const totalJobs = metrics.completed_jobs + metrics.failed_jobs + metrics.running_jobs || 1;
    const jobSuccessRate = Math.round((metrics.completed_jobs / totalJobs) * 100);

    return (
        <AuthenticatedLayout
            header={
                <Typography variant="h1" className="font-bold text-slate-100">
                    Relatórios Avançados
                </Typography>
            }
        >
            <Head title="Relatórios Avançados" />

            <div className="max-w-6xl mx-auto space-y-8">
                {/* Hero section */}
                <Card className="border-cyan-500/10 bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 relative overflow-hidden">
                    <div className="absolute top-0 right-0 -mt-4 -mr-4 h-32 w-32 rounded-full bg-cyan-500/5 blur-3xl"></div>
                    <div className="flex items-start gap-4">
                        <div className="h-12 w-12 rounded-2xl bg-cyan-500/10 flex items-center justify-center text-cyan-400 shrink-0">
                            <TrendingUp className="h-6 w-6" />
                        </div>
                        <div>
                            <Typography variant="h3" className="font-bold text-slate-100 mb-1">
                                Análise de Coleta & Qualidade
                            </Typography>
                            <Typography variant="body" className="text-slate-400 text-sm">
                                Acompanhe a volumetria, taxas de aprovação humana e performance de extração de dados da sua organização.
                            </Typography>
                        </div>
                    </div>
                </Card>

                {/* Grid 1: Principais Métricas */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <Card className="border-slate-800 bg-slate-900/30 flex items-center gap-4">
                        <div className="h-12 w-12 rounded-xl bg-cyan-500/10 flex items-center justify-center text-cyan-400 shrink-0">
                            <Database className="h-6 w-6" />
                        </div>
                        <div>
                            <Typography variant="small" className="text-slate-500 font-medium">Total de Projetos</Typography>
                            <Typography variant="h2" className="font-bold text-slate-100 mt-0.5">{metrics.total_projects}</Typography>
                        </div>
                    </Card>

                    <Card className="border-slate-800 bg-slate-900/30 flex items-center gap-4">
                        <div className="h-12 w-12 rounded-xl bg-violet-500/10 flex items-center justify-center text-violet-400 shrink-0">
                            <FileText className="h-6 w-6" />
                        </div>
                        <div>
                            <Typography variant="small" className="text-slate-500 font-medium">Documentos Extraídos</Typography>
                            <Typography variant="h2" className="font-bold text-slate-100 mt-0.5">{metrics.total_documents}</Typography>
                        </div>
                    </Card>

                    <Card className="border-slate-800 bg-slate-900/30 flex items-center gap-4">
                        <div className="h-12 w-12 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-400 shrink-0">
                            <Braces className="h-6 w-6" />
                        </div>
                        <div>
                            <Typography variant="small" className="text-slate-500 font-medium">Total de Chunks</Typography>
                            <Typography variant="h2" className="font-bold text-slate-100 mt-0.5">{metrics.total_chunks}</Typography>
                        </div>
                    </Card>
                </div>

                {/* Grid 2: Histórico e Distribuição de Qualidade */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Gráfico de Histórico de Coletas (7 Dias) */}
                    <Card className="lg:col-span-2 border-slate-800 bg-slate-900/30 flex flex-col justify-between h-96">
                        <div>
                            <Typography variant="h4" className="font-bold text-slate-200 flex items-center gap-2 mb-1">
                                <Activity className="h-5 w-5 text-cyan-400" />
                                Histórico de Coleta (Últimos 7 dias)
                            </Typography>
                            <Typography variant="small" className="text-slate-500">
                                Quantidade de novos documentos indexados por dia.
                            </Typography>
                        </div>

                        {/* Custom Pure CSS/HTML Chart */}
                        <div className="h-52 flex items-end justify-between gap-2 px-4 border-b border-slate-800/80 pb-2">
                            {chartData.map((item, index) => {
                                const heightPct = (item.count / maxVal) * 80 + 5; // mínimo 5% para visibilidade
                                return (
                                    <div key={index} className="flex-1 flex flex-col items-center group relative h-full justify-end">
                                        {/* Tooltip */}
                                        <div className="absolute bottom-full mb-2 bg-slate-950 text-slate-100 text-[10px] px-2 py-1 rounded shadow-lg border border-slate-800 pointer-events-none whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10">
                                            {item.count} docs
                                        </div>
                                        {/* Bar */}
                                        <div 
                                            style={{ height: `${heightPct}%` }}
                                            className="w-full bg-gradient-to-t from-cyan-600/80 to-cyan-400/90 hover:from-cyan-500 hover:to-cyan-300 rounded-t-md transition-all duration-300 relative"
                                        ></div>
                                        <span className="text-[10px] text-slate-500 mt-2 block select-none">
                                            {item.name}
                                        </span>
                                    </div>
                                );
                            })}
                        </div>
                    </Card>

                    {/* Distribuição de Qualidade (Review de Documentos) */}
                    <Card className="border-slate-800 bg-slate-900/30 flex flex-col justify-between h-96">
                        <div>
                            <Typography variant="h4" className="font-bold text-slate-200 mb-1">
                                Status de Curadoria
                            </Typography>
                            <Typography variant="small" className="text-slate-500">
                                Distribuição dos documentos revisados pela equipe.
                            </Typography>
                        </div>

                        <div className="space-y-6">
                            {/* Radial/Bar progress container */}
                            <div className="space-y-4">
                                <div className="space-y-1">
                                    <div className="flex justify-between text-xs font-semibold">
                                        <span className="text-emerald-400 flex items-center gap-1">
                                            <CheckCircle2 className="h-3.5 w-3.5" /> Aprovados
                                        </span>
                                        <span className="text-slate-300">{metrics.approved_documents} ({approvalRate}%)</span>
                                    </div>
                                    <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
                                        <div style={{ width: `${approvalRate}%` }} className="h-full bg-emerald-500 rounded-full"></div>
                                    </div>
                                </div>

                                <div className="space-y-1">
                                    <div className="flex justify-between text-xs font-semibold">
                                        <span className="text-amber-400 flex items-center gap-1">
                                            <AlertTriangle className="h-3.5 w-3.5" /> Pendentes
                                        </span>
                                        <span className="text-slate-300">{metrics.pending_documents} ({pendingRate}%)</span>
                                    </div>
                                    <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
                                        <div style={{ width: `${pendingRate}%` }} className="h-full bg-amber-500 rounded-full"></div>
                                    </div>
                                </div>

                                <div className="space-y-1">
                                    <div className="flex justify-between text-xs font-semibold">
                                        <span className="text-rose-400 flex items-center gap-1">
                                            <XCircle className="h-3.5 w-3.5" /> Rejeitados
                                        </span>
                                        <span className="text-slate-300">{metrics.rejected_documents} ({rejectionRate}%)</span>
                                    </div>
                                    <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
                                        <div style={{ width: `${rejectionRate}%` }} className="h-full bg-rose-500 rounded-full"></div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="p-3 bg-slate-950/40 border border-slate-800/80 rounded-xl flex items-center justify-between text-xs">
                            <span className="text-slate-500 font-medium">Tamanho médio:</span>
                            <span className="text-slate-300 font-bold">{metrics.average_characters.toLocaleString()} caracteres</span>
                        </div>
                    </Card>
                </div>

                {/* Grid 3: Crawl Performance e Principais Domínios */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Eficiência do Crawler */}
                    <Card className="border-slate-800 bg-slate-900/30 space-y-6">
                        <div>
                            <Typography variant="h4" className="font-bold text-slate-200 mb-1">
                                Performance do Crawler
                            </Typography>
                            <Typography variant="small" className="text-slate-500">
                                Histórico de execução de tarefas e taxas de sucesso.
                            </Typography>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="p-4 bg-slate-950/30 border border-slate-800/80 rounded-xl">
                                <Typography variant="small" className="text-slate-500">Jobs Concluídos</Typography>
                                <Typography variant="h3" className="font-bold text-slate-200 mt-1">{metrics.completed_jobs}</Typography>
                            </div>
                            <div className="p-4 bg-slate-950/30 border border-slate-800/80 rounded-xl">
                                <Typography variant="small" className="text-slate-500">Jobs com Falha</Typography>
                                <Typography variant="h3" className="font-bold text-rose-400 mt-1">{metrics.failed_jobs}</Typography>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <div className="flex justify-between items-center text-xs">
                                <span className="text-slate-500">Taxa de Sucesso dos Jobs</span>
                                <span className="font-semibold text-slate-300">{jobSuccessRate}%</span>
                            </div>
                            <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
                                <div style={{ width: `${jobSuccessRate}%` }} className="h-full bg-cyan-500 rounded-full"></div>
                            </div>
                            
                            <div className="flex justify-between items-center text-xs text-slate-400 pt-2 border-t border-slate-800/60">
                                <span>Total Páginas Coletadas (Histórico):</span>
                                <span className="font-bold text-slate-300">{metrics.total_crawled}</span>
                            </div>
                            <div className="flex justify-between items-center text-xs text-slate-400">
                                <span>Erros de Requisição (Histórico):</span>
                                <span className="font-bold text-slate-500">{metrics.total_failed}</span>
                            </div>
                        </div>
                    </Card>

                    {/* Principais Fontes/Domínios */}
                    <Card className="border-slate-800 bg-slate-900/30 space-y-6">
                        <div>
                            <Typography variant="h4" className="font-bold text-slate-200 mb-1">
                                Principais Domínios
                            </Typography>
                            <Typography variant="small" className="text-slate-500">
                                Fontes de dados mais expressivas no seu dataset.
                            </Typography>
                        </div>

                        <div className="space-y-4">
                            {topDomains.map((item, index) => (
                                <div key={index} className="flex items-center justify-between p-3 bg-slate-950/20 border border-slate-800/40 rounded-xl">
                                    <div className="flex items-center gap-3 min-w-0">
                                        <div className="h-8 w-8 rounded-lg bg-slate-800 flex items-center justify-center shrink-0">
                                            <Globe className="h-4 w-4 text-cyan-400" />
                                        </div>
                                        <span className="text-sm font-semibold text-slate-300 truncate">{item.domain}</span>
                                    </div>
                                    <span className="text-xs font-bold text-slate-500 bg-slate-800/50 px-2.5 py-1 rounded-lg border border-slate-700/40 shrink-0">
                                        {item.count} docs
                                    </span>
                                </div>
                            ))}
                            {topDomains.length === 0 && (
                                <div className="text-center py-12 text-slate-500 text-sm">
                                    Nenhum domínio identificado ainda.
                                </div>
                            )}
                        </div>
                    </Card>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
