import { Head, Link } from '@inertiajs/react';
import type { PageProps } from '@/types';
import Typography from '@/Components/atoms/Typography';
import Button from '@/Components/atoms/Button';
import Badge from '@/Components/atoms/Badge';
import Card from '@/Components/atoms/Card';
import useTranslation from '@/Hooks/useTranslation';
import MarketingLayout from '@/Layouts/MarketingLayout';
import { 
    Activity, 
    Zap, 
    Globe, 
    FileText, 
    ShieldCheck, 
    Sparkles, 
    CopyCheck, 
    Braces, 
    CheckSquare, 
    FileJson, 
    History,
    ArrowRight,
    CheckCircle2
} from 'lucide-react';
import { cn } from '@/utils';

export default function Welcome({ auth }: PageProps) {
    const { t } = useTranslation();

    const metrics = [
        { value: '12.847', label: 'Páginas processadas', icon: <FileText className="h-4 w-4" /> },
        { value: '156K', label: 'Chunks para RAG', icon: <Braces className="h-4 w-4" /> },
        { value: 'JSONL', label: 'Exportação pronta', icon: <FileJson className="h-4 w-4" /> },
        { value: '91%', label: 'Qualidade média', icon: <Activity className="h-4 w-4" /> },
    ];

    const steps = [
        { title: 'Configure o domínio', desc: 'Defina URLs iniciais, escopo, profundidade e limites.' },
        { title: 'Execute o crawler', desc: 'Colete páginas públicas respeitando as regras definidas.' },
        { title: 'Limpe e processe', desc: 'Remova ruídos, menus, rodapés e duplicidades.' },
        { title: 'Gere chunks', desc: 'Divida documentos em partes rastreáveis para LLM.' },
        { title: 'Exporte o dataset', desc: 'Baixe JSONL, CSV ou Markdown para RAG e IA.' },
    ];

    const features = [
        { title: 'Crawling por domínio', desc: 'Coleta páginas dentro do escopo autorizado.', icon: <Globe /> },
        { title: 'Regras de escopo', desc: 'Controle caminhos permitidos e profundidade.', icon: <ShieldCheck /> },
        { title: 'Limpeza de conteúdo', desc: 'Remove menus, rodapés e ruídos.', icon: <Sparkles /> },
        { title: 'Deduplicação', desc: 'Evita documentos e chunks repetidos.', icon: <CopyCheck /> },
        { title: 'Chunking para RAG', desc: 'Gera partes com metadados e origem.', icon: <Braces /> },
        { title: 'Revisão humana', desc: 'Aprova, rejeita ou edita documentos.', icon: <CheckSquare /> },
        { title: 'Exportação JSONL', desc: 'Dataset pronto para pipelines de IA.', icon: <FileJson /> },
        { title: 'Auditoria', desc: 'Registra ações críticas e origem dos dados.', icon: <History /> },
    ];

    return (
        <MarketingLayout>
            <Head title="DataCrawl - SaaS para Crawler e Dataset LLM" />

            {/* Hero Section */}
            <section className="relative overflow-hidden py-20 lg:py-32">
                <div className="mx-auto max-w-7xl px-6">
                    <div className="text-center">
                        <Badge variant="cyan" className="mb-6 py-1 px-4">SaaS + Extensão para datasets LLM</Badge>
                        <Typography variant="display" className="mx-auto max-w-4xl text-white lg:text-7xl leading-tight tracking-tighter">
                            {t('messages.tagline')}
                        </Typography>
                        <Typography variant="h3" className="mx-auto mt-8 max-w-2xl font-normal text-slate-400">
                            {t('messages.description')}
                        </Typography>

                        <div className="mt-12 flex flex-wrap justify-center gap-4">
                            <Link href={route('register')}>
                                <Button size="lg" className="h-14 px-8 text-lg" icon={<Zap className="h-5 w-5" />}>
                                    {t('messages.start_now')}
                                </Button>
                            </Link>
                            <Button variant="secondary" size="lg" className="h-14 px-8 text-lg">
                                {t('messages.view_demo')}
                            </Button>
                        </div>
                    </div>

                    {/* Preview Visual */}
                    <div className="mt-24 relative">
                        <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-3xl blur opacity-20" />
                        <Card padding="none" className="relative border-slate-800 bg-slate-900/50 backdrop-blur shadow-2xl overflow-hidden">
                            <div className="border-b border-slate-800 bg-slate-900/80 p-6 flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-500/10 text-cyan-400">
                                        <Activity className="h-5 w-5 animate-pulse" />
                                    </div>
                                    <div>
                                        <Typography variant="small" className="font-bold text-white">Job em execução</Typography>
                                        <Typography variant="caption" className="text-slate-500">docs.empresa.com.br</Typography>
                                    </div>
                                </div>
                                <Badge variant="cyan" className="animate-pulse">RUNNING</Badge>
                            </div>
                            <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-12">
                                <div className="space-y-8">
                                    <div>
                                        <div className="flex justify-between mb-2">
                                            <Typography variant="small" className="text-slate-400">Progresso total</Typography>
                                            <Typography variant="small" className="font-bold text-cyan-400">72%</Typography>
                                        </div>
                                        <div className="h-3 w-full bg-slate-800 rounded-full overflow-hidden">
                                            <div className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 w-[72%] shadow-[0_0_15px_rgba(6,182,212,0.5)]" />
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-2 gap-6">
                                        <div className="space-y-1">
                                            <Typography variant="caption" className="text-slate-500">Páginas coletadas</Typography>
                                            <Typography variant="h3" className="font-bold">1.248</Typography>
                                        </div>
                                        <div className="space-y-1">
                                            <Typography variant="caption" className="text-slate-500">Chunks gerados</Typography>
                                            <Typography variant="h3" className="font-bold">8.920</Typography>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex flex-col justify-center gap-4">
                                    <Typography variant="caption" className="text-slate-500 font-bold uppercase tracking-widest">Pipeline de dados</Typography>
                                    <div className="flex flex-col gap-3">
                                        {['Descoberta', 'Coleta', 'Limpeza', 'Chunking', 'Dataset'].map((p, i) => (
                                            <div key={p} className="flex items-center gap-3">
                                                <div className={cn("h-6 w-6 rounded-full flex items-center justify-center text-[10px] font-bold", i < 3 ? "bg-emerald-500/20 text-emerald-400" : i === 3 ? "bg-cyan-500/20 text-cyan-400" : "bg-slate-800 text-slate-500")}>
                                                    {i < 3 ? <CheckCircle2 className="h-3 w-3" /> : i + 1}
                                                </div>
                                                <Typography variant="small" className={i < 3 ? "text-slate-300" : i === 3 ? "text-cyan-400 font-bold" : "text-slate-500"}>
                                                    {p}
                                                </Typography>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </Card>
                    </div>
                </div>
            </section>
        </MarketingLayout>
    );
}
