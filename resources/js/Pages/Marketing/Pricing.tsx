import { Head, Link } from '@inertiajs/react';
import MarketingLayout from '@/Layouts/MarketingLayout';
import Typography from '@/Components/atoms/Typography';
import Card from '@/Components/atoms/Card';
import Badge from '@/Components/atoms/Badge';
import Button from '@/Components/atoms/Button';
import useTranslation from '@/Hooks/useTranslation';
import { Check } from 'lucide-react';

export default function Pricing() {
    const { t } = useTranslation();

    const plans = [
        {
            name: t('messages.starter_plan'),
            price: '$0',
            period: '/mo',
            description: 'Para experimentação e projetos pequenos.',
            features: [
                t('messages.feature_pages_limit', { count: '1.000' }),
                t('messages.feature_max_projects', { count: '2' }),
                'Exportação em JSONL',
                'Suporte via Comunidade',
            ],
            cta: t('messages.register'),
            variant: 'secondary' as const,
        },
        {
            name: t('messages.pro_plan'),
            price: '$49',
            period: '/mo',
            description: 'Para profissionais e times em crescimento.',
            features: [
                t('messages.feature_pages_limit', { count: '50.000' }),
                t('messages.feature_max_projects', { count: '10' }),
                t('messages.feature_semantic_search'),
                t('messages.feature_api_access'),
                'Deduplicação Pro',
            ],
            cta: t('messages.get_started'),
            variant: 'primary' as const,
            popular: true,
        },
        {
            name: t('messages.enterprise_plan'),
            price: 'Custom',
            period: '',
            description: 'Para grandes volumes e necessidades específicas.',
            features: [
                t('messages.feature_pages_limit', { count: 'Unlimited' }),
                t('messages.feature_max_projects', { count: 'Unlimited' }),
                t('messages.feature_custom_extraction'),
                t('messages.feature_dedicated_support'),
                'SLA de 99.9%',
            ],
            cta: t('messages.contact_us'),
            variant: 'secondary' as const,
        },
    ];

    return (
        <MarketingLayout>
            <Head title={t('messages.pricing')} />

            {/* Hero Section */}
            <section className="py-20 lg:py-32">
                <div className="mx-auto max-w-7xl px-6 text-center">
                    <Typography variant="display" className="text-white leading-tight tracking-tighter mx-auto max-w-4xl">
                        {t('messages.pricing_hero_title')}
                    </Typography>
                    <Typography variant="h3" className="mt-8 font-normal text-slate-400 mx-auto max-w-2xl">
                        {t('messages.pricing_hero_desc')}
                    </Typography>
                </div>
            </section>

            {/* Plans Section */}
            <section className="py-20">
                <div className="mx-auto max-w-7xl px-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
                        {plans.map((plan, i) => (
                            <Card 
                                key={i} 
                                className={`relative border-slate-800 bg-slate-900/50 p-8 flex flex-col h-full ${plan.popular ? 'ring-2 ring-cyan-500 shadow-2xl shadow-cyan-500/10' : ''}`}
                            >
                                {plan.popular && (
                                    <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                                        <Badge variant="cyan" className="px-4 py-1 shadow-lg font-black uppercase tracking-widest text-[10px]">
                                            {t('messages.most_popular')}
                                        </Badge>
                                    </div>
                                )}

                                <div className="mb-8">
                                    <Typography variant="h3" className="text-xl font-bold text-slate-100">{plan.name}</Typography>
                                    <div className="mt-4 flex items-baseline gap-1">
                                        <Typography variant="display" className="text-4xl font-black text-white">{plan.price}</Typography>
                                        <Typography variant="caption" className="text-slate-500">{plan.period}</Typography>
                                    </div>
                                    <Typography variant="small" className="mt-4 text-slate-400">
                                        {plan.description}
                                    </Typography>
                                </div>

                                <div className="flex-1 space-y-4 mb-8">
                                    {plan.features.map((feature, j) => (
                                        <div key={j} className="flex gap-3">
                                            <Check className="h-5 w-5 text-cyan-500 flex-shrink-0" />
                                            <Typography variant="small" className="text-slate-300">{feature}</Typography>
                                        </div>
                                    ))}
                                </div>

                                <Link href={route('register')} className="mt-auto block">
                                    <Button variant={plan.variant} className="w-full h-12 text-md">
                                        {plan.cta}
                                    </Button>
                                </Link>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            {/* FAQ Preview or Secondary CTA */}
            <section className="py-32 bg-slate-900/30">
                <div className="mx-auto max-w-4xl px-6 text-center">
                    <Typography variant="h2" className="text-3xl font-bold mb-6">Precisa de algo diferente?</Typography>
                    <Typography variant="body" className="text-slate-400 mb-10">
                        Oferecemos descontos para instituições de ensino e projetos open-source. Além de implementações on-premise para segurança máxima.
                    </Typography>
                    <Button variant="outline" className="border-slate-700 text-slate-300 hover:text-white">
                        Falar com o comercial
                    </Button>
                </div>
            </section>
        </MarketingLayout>
    );
}
