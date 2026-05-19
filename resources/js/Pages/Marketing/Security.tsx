import { Head } from '@inertiajs/react';
import MarketingLayout from '@/Layouts/MarketingLayout';
import Typography from '@/Components/atoms/Typography';
import Card from '@/Components/atoms/Card';
import Badge from '@/Components/atoms/Badge';
import useTranslation from '@/Hooks/useTranslation';
import { ShieldCheck, Lock, Users, History, EyeOff, Server } from 'lucide-react';

export default function Security() {
    const { t } = useTranslation();

    const securityPillars = [
        {
            title: t('messages.sec_encryption_title'),
            desc: t('messages.sec_encryption_desc'),
            icon: <Lock className="h-6 w-6 text-cyan-400" />,
        },
        {
            title: t('messages.sec_isolation_title'),
            desc: t('messages.sec_isolation_desc'),
            icon: <Users className="h-6 w-6 text-cyan-400" />,
        },
        {
            title: t('messages.sec_compliance_title'),
            desc: t('messages.sec_compliance_desc'),
            icon: <History className="h-6 w-6 text-cyan-400" />,
        },
    ];

    return (
        <MarketingLayout>
            <Head title={t('messages.security')} />

            {/* Hero Section */}
            <section className="py-20 lg:py-32">
                <div className="mx-auto max-w-7xl px-6 text-center">
                    <Badge variant="cyan" className="mb-6 px-4 py-1">CONFIANÇA E PRIVACIDADE</Badge>
                    <Typography variant="display" className="text-white leading-tight tracking-tighter mx-auto max-w-4xl">
                        {t('messages.security_hero_title')}
                    </Typography>
                    <Typography variant="h3" className="mt-8 font-normal text-slate-400 mx-auto max-w-2xl">
                        {t('messages.security_hero_desc')}
                    </Typography>
                </div>
            </section>

            {/* Pillars Section */}
            <section className="py-20 bg-slate-900/30">
                <div className="mx-auto max-w-7xl px-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {securityPillars.map((p, i) => (
                            <Card key={i} className="border-slate-800 bg-slate-950/50 p-10 text-center space-y-6">
                                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-cyan-500/10 border border-cyan-500/20">
                                    {p.icon}
                                </div>
                                <Typography variant="h3" className="text-xl font-bold text-slate-100">{p.title}</Typography>
                                <Typography variant="body" className="text-slate-400 leading-relaxed">
                                    {p.desc}
                                </Typography>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            {/* Privacy Controls */}
            <section className="py-32">
                <div className="mx-auto max-w-7xl px-6">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                        <div className="relative">
                            <div className="absolute -inset-4 bg-emerald-500/10 rounded-full blur-3xl opacity-20" />
                            <Card className="border-slate-800 bg-slate-900/80 p-8 shadow-2xl relative space-y-6">
                                <div className="flex items-center justify-between">
                                    <Typography variant="body" className="font-bold text-slate-100">Controles de Privacidade</Typography>
                                    <ShieldCheck className="h-6 w-6 text-emerald-500" />
                                </div>
                                <div className="space-y-4">
                                    {[
                                        { label: 'Ocultar PII (Personal Identifiable Information)', status: 'Ativo' },
                                        { label: 'Criptografia em Repouso (AES-256)', status: 'Ativo' },
                                        { label: 'Exclusão Permanente de Dados', status: 'Configurável' },
                                    ].map((item, i) => (
                                        <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-slate-950 border border-slate-800">
                                            <Typography variant="small" className="text-slate-300">{item.label}</Typography>
                                            <Badge variant={item.status === 'Ativo' ? 'emerald' : 'indigo'}>{item.status}</Badge>
                                        </div>
                                    ))}
                                </div>
                            </Card>
                        </div>
                        <div>
                            <Typography variant="h2" className="text-4xl font-bold leading-tight mb-8">
                                Você no controle total dos seus dados
                            </Typography>
                            <div className="space-y-8">
                                <div className="flex gap-4">
                                    <div className="flex-shrink-0 mt-1 p-2 rounded-lg bg-slate-800"><EyeOff className="h-5 w-5 text-cyan-400" /></div>
                                    <div>
                                        <Typography variant="body" className="font-bold text-slate-100">Zero-Knowledge em Treinamento</Typography>
                                        <Typography variant="small" className="text-slate-400 mt-1">Nós nunca utilizamos seus dados coletados para treinar nossos próprios modelos ou de terceiros sem seu consentimento explícito.</Typography>
                                    </div>
                                </div>
                                <div className="flex gap-4">
                                    <div className="flex-shrink-0 mt-1 p-2 rounded-lg bg-slate-800"><Server className="h-5 w-5 text-cyan-400" /></div>
                                    <div>
                                        <Typography variant="body" className="font-bold text-slate-100">Hosting Soberano</Typography>
                                        <Typography variant="small" className="text-slate-400 mt-1">Escolha onde seus dados residem. Suportamos implantações em regiões específicas para conformidade com LGPD e GDPR.</Typography>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Certifications Section */}
            <section className="py-20 border-t border-slate-800 bg-slate-950">
                <div className="mx-auto max-w-7xl px-6">
                    <div className="flex flex-wrap justify-center items-center gap-12 grayscale opacity-40 hover:grayscale-0 hover:opacity-100 transition-all duration-500">
                        {['SOC2 COMPLIANT', 'GDPR READY', 'LGPD COMPLIANT', 'AES-256'].map((cert) => (
                            <Typography key={cert} variant="h3" className="text-2xl font-black tracking-tighter text-white">{cert}</Typography>
                        ))}
                    </div>
                </div>
            </section>
        </MarketingLayout>
    );
}
