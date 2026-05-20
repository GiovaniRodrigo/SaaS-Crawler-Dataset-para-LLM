import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, router } from '@inertiajs/react';
import Typography from '@/Components/atoms/Typography';
import Card from '@/Components/atoms/Card';
import Badge from '@/Components/atoms/Badge';
import Button from '@/Components/atoms/Button';
import { useState } from 'react';
import { Check, CreditCard, Layers, FileText, Sparkles, Download, ExternalLink, AlertTriangle } from 'lucide-react';

interface Invoice {
    id: string;
    number: string;
    amount: string;
    currency: string;
    status: string;
    created: string;
    pdf: string;
}

interface Props {
    plan: string;
    status: string;
    ends_at: string | null;
    project_count: number;
    page_count: number;
    limits: {
        max_projects: number;
        max_pages: number;
    };
    invoices: Invoice[];
    errors?: {
        error?: string;
    };
}

export default function Billing({
    plan,
    status,
    ends_at,
    project_count,
    page_count,
    limits,
    invoices,
    errors
}: Props) {
    const [loading, setLoading] = useState(false);

    const projectPercent = Math.min(100, Math.round((project_count / limits.max_projects) * 100));
    const pagePercent = Math.min(100, Math.round((page_count / limits.max_pages) * 100));

    const handleSubscribe = () => {
        setLoading(true);
        router.post(route('settings.billing.subscribe'), {}, {
            onError: () => setLoading(false),
            onFinish: () => setLoading(false),
        });
    };

    const handlePortal = () => {
        setLoading(true);
        router.post(route('settings.billing.portal'), {}, {
            onError: () => setLoading(false),
            onFinish: () => setLoading(false),
        });
    };

    const isPro = plan.toLowerCase() === 'pro';
    const isEnterprise = plan.toLowerCase() === 'enterprise';

    return (
        <AuthenticatedLayout
            header={
                <Typography variant="h1" className="font-bold text-slate-100">
                    Plano e Faturamento
                </Typography>
            }
        >
            <Head title="Faturamento e Assinatura" />

            <div className="max-w-6xl mx-auto space-y-8 pb-12">
                {errors?.error && (
                    <div className="p-4 bg-rose-500/10 border border-rose-500/20 rounded-2xl flex items-start gap-3 text-rose-400">
                        <AlertTriangle className="h-5 w-5 shrink-0 mt-0.5" />
                        <Typography variant="body" className="font-medium text-rose-300">
                            {errors.error}
                        </Typography>
                    </div>
                )}

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left Column: Plan & Limits */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* Current Plan Card */}
                        <Card className="bg-slate-900/50 border-slate-800/80 backdrop-blur-md relative overflow-hidden">
                            <div className="absolute top-0 right-0 h-40 w-40 bg-primary-500/5 rounded-full blur-3xl pointer-events-none" />
                            
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-6 border-b border-slate-800/80">
                                <div>
                                    <span className="text-xs font-bold tracking-widest text-primary-400 uppercase">Seu Plano</span>
                                    <Typography variant="h2" className="font-extrabold text-slate-100 capitalize mt-1">
                                        {plan} {isPro && '🚀'}
                                    </Typography>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Badge variant={status === 'active' ? 'emerald' : status === 'past_due' ? 'amber' : 'rose'}>
                                        {status === 'active' ? 'Ativo' : status === 'past_due' ? 'Pagamento Pendente' : status}
                                    </Badge>
                                    {ends_at && (
                                        <Typography variant="small" className="text-slate-400">
                                            Expira em: {new Date(ends_at).toLocaleDateString('pt-BR')}
                                        </Typography>
                                    )}
                                </div>
                            </div>

                            {/* Limits & Usage */}
                            <div className="space-y-6">
                                <div>
                                    <div className="flex justify-between items-center mb-2">
                                        <Typography variant="body" className="font-semibold text-slate-300 flex items-center gap-2">
                                            <Layers className="h-4 w-4 text-indigo-400" />
                                            Projetos Utilizados
                                        </Typography>
                                        <Typography variant="small" className="text-slate-400 font-bold">
                                            {project_count} / {isEnterprise ? 'Ilimitado' : limits.max_projects}
                                        </Typography>
                                    </div>
                                    {!isEnterprise ? (
                                        <div className="w-full h-2.5 bg-slate-850 rounded-full overflow-hidden border border-slate-800/80">
                                            <div
                                                className="h-full bg-gradient-to-r from-indigo-500 to-primary-500 rounded-full transition-all duration-500 shadow-[0_0_12px_rgba(99,102,241,0.2)]"
                                                style={{ width: `${projectPercent}%` }}
                                            />
                                        </div>
                                    ) : (
                                        <div className="w-full h-2.5 bg-indigo-500/20 rounded-full border border-indigo-500/30 shadow-[0_0_8px_rgba(99,102,241,0.1)]" />
                                    )}
                                </div>

                                <div>
                                    <div className="flex justify-between items-center mb-2">
                                        <Typography variant="body" className="font-semibold text-slate-300 flex items-center gap-2">
                                            <FileText className="h-4 w-4 text-emerald-400" />
                                            Páginas Coletadas (Documentos)
                                        </Typography>
                                        <Typography variant="small" className="text-slate-400 font-bold">
                                            {page_count.toLocaleString('pt-BR')} / {isEnterprise ? 'Ilimitado' : limits.max_pages.toLocaleString('pt-BR')}
                                        </Typography>
                                    </div>
                                    {!isEnterprise ? (
                                        <div className="w-full h-2.5 bg-slate-850 rounded-full overflow-hidden border border-slate-800/80">
                                            <div
                                                className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 rounded-full transition-all duration-500 shadow-[0_0_12px_rgba(16,185,129,0.2)]"
                                                style={{ width: `${pagePercent}%` }}
                                            />
                                        </div>
                                    ) : (
                                        <div className="w-full h-2.5 bg-emerald-500/20 rounded-full border border-emerald-500/30 shadow-[0_0_8px_rgba(16,185,129,0.1)]" />
                                    )}
                                </div>
                            </div>
                        </Card>

                        {/* Invoice History */}
                        <Card className="bg-slate-900/50 border-slate-800/80 backdrop-blur-md overflow-hidden" padding="none">
                            <div className="px-6 py-5 border-b border-slate-800/80">
                                <Typography variant="h3" className="font-bold text-slate-100 flex items-center gap-2">
                                    <CreditCard className="h-5 w-5 text-indigo-400" />
                                    Histórico de Faturamento
                                </Typography>
                            </div>
                            
                            <div className="overflow-x-auto">
                                <table className="w-full text-left border-collapse">
                                    <thead>
                                        <tr className="bg-slate-800/20">
                                            <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Número</th>
                                            <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Data</th>
                                            <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Valor</th>
                                            <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Status</th>
                                            <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider text-right">PDF</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-800/60">
                                        {invoices.map((invoice) => (
                                            <tr key={invoice.id} className="hover:bg-slate-800/10 transition-colors">
                                                <td className="px-6 py-4 font-semibold text-slate-200">{invoice.number}</td>
                                                <td className="px-6 py-4 text-slate-400">{new Date(invoice.created).toLocaleDateString('pt-BR')}</td>
                                                <td className="px-6 py-4 font-bold text-slate-250">{invoice.amount} {invoice.currency}</td>
                                                <td className="px-6 py-4">
                                                    <Badge variant={invoice.status === 'paid' ? 'emerald' : 'rose'}>
                                                        {invoice.status === 'paid' ? 'Pago' : invoice.status}
                                                    </Badge>
                                                </td>
                                                <td className="px-6 py-4 text-right">
                                                    {invoice.pdf ? (
                                                        <a
                                                            href={invoice.pdf}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary-400 hover:text-primary-300 transition-colors bg-primary-500/5 hover:bg-primary-500/10 px-3 py-1.5 rounded-xl border border-primary-500/10"
                                                        >
                                                            <Download className="h-3 w-3" /> Fatura
                                                        </a>
                                                    ) : (
                                                        <span className="text-slate-600 text-xs">-</span>
                                                    )}
                                                </td>
                                            </tr>
                                        ))}
                                        {invoices.length === 0 && (
                                            <tr>
                                                <td colSpan={5} className="px-6 py-12 text-center text-slate-500 italic">
                                                    Nenhuma fatura registrada.
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </Card>
                    </div>

                    {/* Right Column: Stripe Sub Actions */}
                    <div>
                        {!isPro && !isEnterprise ? (
                            <Card className="bg-gradient-to-b from-indigo-950/40 to-slate-900/50 border-indigo-500/20 backdrop-blur-md relative overflow-hidden flex flex-col justify-between h-full">
                                <div className="absolute top-0 right-0 -mt-8 -mr-8 h-32 w-32 bg-primary-500/10 rounded-full blur-2xl pointer-events-none" />
                                
                                <div className="space-y-6">
                                    <div className="flex items-center gap-2 mb-2">
                                        <Sparkles className="h-6 w-6 text-primary-400 animate-pulse" />
                                        <Typography variant="h3" className="font-extrabold text-slate-100">
                                            Faça o Upgrade para Pro
                                        </Typography>
                                    </div>
                                    <div className="flex items-baseline gap-1">
                                        <span className="text-4xl font-extrabold text-slate-100">$49</span>
                                        <span className="text-slate-400 text-sm">/mês</span>
                                    </div>
                                    <Typography variant="small" className="text-slate-400">
                                        Perfeito para desenvolvedores e times que precisam de escalabilidade e recursos inteligentes de IA.
                                    </Typography>
                                    
                                    <div className="space-y-4 pt-4 border-t border-slate-800/80">
                                        {[
                                            'Até 50.000 páginas coletadas/mês',
                                            'Até 10 projetos ativos',
                                            'Busca Semântica avançada',
                                            'Pontuação de Qualidade por IA',
                                            'Deduplicação Pro de conteúdo',
                                            'Exportações JSONL completas',
                                            'Acesso direto à API do sistema'
                                        ].map((feature) => (
                                            <div key={feature} className="flex items-start gap-2.5">
                                                <Check className="h-4.5 w-4.5 text-primary-400 shrink-0 mt-0.5" />
                                                <Typography variant="small" className="text-slate-300 font-medium">{feature}</Typography>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="mt-8 pt-6 border-t border-slate-800/80">
                                    <Button
                                        variant="primary"
                                        className="w-full justify-center text-sm py-3 rounded-2xl"
                                        onClick={handleSubscribe}
                                        isLoading={loading}
                                    >
                                        Assinar Plano Pro
                                    </Button>
                                </div>
                            </Card>
                        ) : (
                            <Card className="bg-slate-900/50 border-slate-800/80 backdrop-blur-md flex flex-col justify-between h-full">
                                <div className="space-y-6">
                                    <Typography variant="h3" className="font-extrabold text-slate-100 flex items-center gap-2">
                                        <CreditCard className="h-5 w-5 text-primary-400" />
                                        Gerenciamento
                                    </Typography>
                                    <Typography variant="small" className="text-slate-400 leading-relaxed">
                                        Sua assinatura é processada e gerenciada de forma segura pelo Stripe. Você pode atualizar a sua forma de pagamento, alterar o plano, consultar o histórico detalhado ou cancelar a renovação automática a qualquer momento.
                                    </Typography>
                                </div>

                                <div className="mt-8 pt-6 border-t border-slate-800/80 space-y-3">
                                    <Button
                                        variant="secondary"
                                        className="w-full justify-center border border-slate-700/80 hover:border-slate-600 rounded-2xl flex items-center gap-2"
                                        onClick={handlePortal}
                                        isLoading={loading}
                                    >
                                        Gerenciar no Stripe
                                        <ExternalLink className="h-4 w-4" />
                                    </Button>
                                </div>
                            </Card>
                        )}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
