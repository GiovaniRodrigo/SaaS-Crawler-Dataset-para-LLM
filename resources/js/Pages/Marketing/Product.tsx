import { Head } from '@inertiajs/react';
import MarketingLayout from '@/Layouts/MarketingLayout';
import Typography from '@/Components/atoms/Typography';
import Card from '@/Components/atoms/Card';
import Badge from '@/Components/atoms/Badge';
import useTranslation from '@/Hooks/useTranslation';
import { Globe, Layers, Zap, Search, ShieldCheck, Database } from 'lucide-react';

export default function Product() {
    const { t } = useTranslation();

    const features = [
        {
            title: t('messages.step_1_title'),
            desc: t('messages.step_1_desc'),
            icon: <Globe className="h-6 w-6 text-cyan-400" />,
        },
        {
            title: t('messages.step_2_title'),
            desc: t('messages.step_2_desc'),
            icon: <Layers className="h-6 w-6 text-cyan-400" />,
        },
        {
            title: t('messages.step_3_title'),
            desc: t('messages.step_3_desc'),
            icon: <Database className="h-6 w-6 text-cyan-400" />,
        },
    ];

    return (
        <MarketingLayout>
            <Head title={t('messages.product')} />

            {/* Hero Section */}
            <section className="py-20 lg:py-32 overflow-hidden">
                <div className="mx-auto max-w-7xl px-6">
                    <div className="text-center space-y-8">
                        <Badge variant="cyan" className="px-4 py-1">SOLUÇÃO END-TO-END</Badge>
                        <Typography variant="display" className="mx-auto max-w-4xl text-white lg:text-7xl leading-tight tracking-tighter">
                            {t('messages.product_title')}
                        </Typography>
                        <Typography variant="h3" className="mx-auto mt-8 max-w-2xl font-normal text-slate-400">
                            {t('messages.product_desc')}
                        </Typography>
                    </div>
                </div>
            </section>

            {/* How it works Section */}
            <section className="py-20 bg-slate-900/30">
                <div className="mx-auto max-w-7xl px-6">
                    <div className="text-center mb-16">
                        <Typography variant="h2" className="text-4xl font-bold">{t('messages.how_it_works')}</Typography>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {features.map((f, i) => (
                            <Card key={i} className="border-slate-800 bg-slate-950/50 hover:border-cyan-500/30 transition-all group">
                                <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-2xl bg-cyan-500/10 transition-transform group-hover:scale-110">
                                    {f.icon}
                                </div>
                                <Typography variant="h3" className="text-xl font-bold mb-4">{f.title}</Typography>
                                <Typography variant="body" className="text-slate-400 leading-relaxed">
                                    {f.desc}
                                </Typography>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            {/* Detailed Features Preview */}
            <section className="py-32">
                <div className="mx-auto max-w-7xl px-6">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                        <div>
                            <Typography variant="h2" className="text-4xl font-bold leading-tight mb-8">
                                Projetado para escala e precisão semântica
                            </Typography>
                            <div className="space-y-6">
                                {[
                                    { title: 'Busca Semântica Nativa', desc: 'Integração profunda com pgvector para encontrar o contexto exato nos seus dados.' },
                                    { title: 'Isolamento de Tenant', desc: 'Arquitetura segura que garante que seus dados nunca se misturem.' },
                                    { title: 'Pronto para RAG', desc: 'Exportações otimizadas para sistemas Retrieval-Augmented Generation.' },
                                ].map((item, i) => (
                                    <div key={i} className="flex gap-4">
                                        <div className="mt-1"><Zap className="h-5 w-5 text-cyan-500" /></div>
                                        <div>
                                            <Typography variant="body" className="font-bold text-slate-100">{item.title}</Typography>
                                            <Typography variant="small" className="text-slate-400 mt-1">{item.desc}</Typography>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="relative">
                            <div className="absolute -inset-4 bg-cyan-500/10 rounded-full blur-3xl opacity-20" />
                            <Card className="border-slate-800 bg-slate-900/80 p-8 shadow-2xl relative">
                                <div className="h-64 rounded-xl border border-slate-700 bg-slate-950 flex flex-col justify-center p-6 space-y-4">
                                    <div className="h-2 w-3/4 bg-slate-800 rounded animate-pulse" />
                                    <div className="h-2 w-1/2 bg-slate-800 rounded animate-pulse" />
                                    <div className="h-2 w-5/6 bg-slate-800 rounded animate-pulse" />
                                    <div className="h-2 w-2/3 bg-cyan-900/30 rounded animate-pulse" />
                                    <div className="pt-4 flex justify-between items-end">
                                        <div className="h-24 w-24 rounded bg-cyan-500/10 border border-cyan-500/20" />
                                        <div className="h-32 w-48 rounded bg-slate-900 border border-slate-800" />
                                    </div>
                                </div>
                                <div className="mt-6 flex gap-2">
                                    <Badge variant="cyan">VECTOR STORE</Badge>
                                    <Badge variant="indigo">PG_VECTOR</Badge>
                                </div>
                            </Card>
                        </div>
                    </div>
                </div>
            </section>
        </MarketingLayout>
    );
}
