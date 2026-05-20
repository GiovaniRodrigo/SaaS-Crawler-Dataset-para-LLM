import { Head } from '@inertiajs/react';
import MarketingLayout from '@/Layouts/MarketingLayout';
import Typography from '@/Components/atoms/Typography';
import Card from '@/Components/atoms/Card';
import Badge from '@/Components/atoms/Badge';
import useTranslation from '@/Hooks/useTranslation';
import { Globe, Eraser, Braces, Database, ShieldCheck, Zap } from 'lucide-react';

export default function Features() {
    const { t } = useTranslation();

    const mainFeatures = [
        {
            title: t('messages.feature_crawling_title'),
            desc: t('messages.feature_crawling_desc'),
            icon: <Globe className="h-8 w-8 text-cyan-400" />,
        },
        {
            title: t('messages.feature_extraction_title'),
            desc: t('messages.feature_extraction_desc'),
            icon: <Eraser className="h-8 w-8 text-cyan-400" />,
        },
        {
            title: t('messages.feature_chunking_title'),
            desc: t('messages.feature_chunking_desc'),
            icon: <Braces className="h-8 w-8 text-cyan-400" />,
        },
        {
            title: t('messages.feature_vector_title'),
            desc: t('messages.feature_vector_desc'),
            icon: <Database className="h-8 w-8 text-cyan-400" />,
        },
    ];

    return (
        <MarketingLayout>
            <Head title={t('messages.features')} />

            {/* Hero Section */}
            <section className="py-20 lg:py-32">
                <div className="mx-auto max-w-7xl px-6">
                    <div className="max-w-3xl">
                        <Badge variant="cyan" className="mb-6">TECNOLOGIA DE PONTA</Badge>
                        <Typography variant="display" className="text-white leading-tight tracking-tighter">
                            {t('messages.features_hero_title')}
                        </Typography>
                        <Typography variant="h3" className="mt-8 font-normal text-slate-400">
                            {t('messages.features_hero_desc')}
                        </Typography>
                    </div>
                </div>
            </section>

            {/* Grid Section */}
            <section className="py-20 bg-slate-900/30">
                <div className="mx-auto max-w-7xl px-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                        {mainFeatures.map((f, i) => (
                            <div key={i} className="flex gap-8 group">
                                <div className="flex-shrink-0 flex h-16 w-16 items-center justify-center rounded-2xl bg-cyan-500/10 border border-cyan-500/20 group-hover:scale-110 transition-transform duration-300">
                                    {f.icon}
                                </div>
                                <div className="space-y-4">
                                    <Typography variant="h3" className="text-2xl font-bold text-slate-100">{f.title}</Typography>
                                    <Typography variant="body" className="text-slate-400 leading-relaxed">
                                        {f.desc}
                                    </Typography>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Technical Specs Section */}
            <section className="py-32">
                <div className="mx-auto max-w-7xl px-6 text-center">
                    <Typography variant="h2" className="text-4xl font-bold mb-20">Especificações Técnicas</Typography>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {[
                            { label: 'Formato de Saída', value: 'JSONL / CSV / MD' },
                            { label: 'Dimensões Vetoriais', value: '1536 (OpenAI Standard)' },
                            { label: 'Infraestrutura', value: 'PostgreSQL + pgvector' },
                            { label: 'Segurança', value: 'TLS 1.3 + HSTS' },
                        ].map((spec, i) => (
                            <Card key={i} className="bg-slate-900/50 border-slate-800">
                                <Typography variant="caption" className="text-slate-500 uppercase tracking-widest font-bold text-[10px]">{spec.label}</Typography>
                                <Typography variant="body" className="mt-4 font-mono font-bold text-cyan-400">{spec.value}</Typography>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            {/* Comparison Section */}
            <section className="py-32 bg-slate-900/30">
                <div className="mx-auto max-w-4xl px-6">
                    <Card className="border-slate-800 bg-slate-950 p-12 overflow-hidden relative">
                        <div className="absolute top-0 right-0 p-8 opacity-10"><Zap className="h-32 w-32 text-cyan-500" /></div>
                        <Typography variant="h2" className="text-3xl font-bold mb-8">Por que escolher o CrawlMind?</Typography>
                        <div className="space-y-4 text-left">
                            {[
                                'Foco exclusivo em datasets para LLM e RAG.',
                                'Processamento local (on-premise ou cloud privada).',
                                'Deduplicação agressiva para reduzir custos de tokens.',
                                'Extensão de navegador para capturas complexas.',
                                'Integração nativa com fluxos de auditoria.',
                            ].map((item, i) => (
                                <div key={i} className="flex items-center gap-3">
                                    <ShieldCheck className="h-5 w-5 text-emerald-500 flex-shrink-0" />
                                    <Typography variant="body" className="text-slate-300">{item}</Typography>
                                </div>
                            ))}
                        </div>
                    </Card>
                </div>
            </section>
        </MarketingLayout>
    );
}
