import InputError from '@/Components/InputError';
import { Head, Link, useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';
import Typography from '@/Components/atoms/Typography';
import Button from '@/Components/atoms/Button';
import Card from '@/Components/atoms/Card';
import { Activity, CheckCircle2, LogIn, ArrowRight } from 'lucide-react';
import { cn } from '@/utils';

export default function Login({
    status,
    canResetPassword,
}: {
    status?: string;
    canResetPassword: boolean;
}) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false as boolean,
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route('login'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <div className="flex min-h-screen bg-slate-950 text-slate-100">
            <Head title="Entrar no CrawlMind" />

            {/* Lado Esquerdo - Institucional */}
            <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-indigo-600 p-16 flex-col justify-between">
                <div className="relative z-10">
                    <Link href="/" className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-indigo-600 shadow-lg">
                            <Activity className="h-6 w-6" />
                        </div>
                        <span className="text-2xl font-bold tracking-tight text-white">CrawlMind</span>
                    </Link>

                    <div className="mt-24 space-y-6 max-w-lg">
                        <div className="inline-flex rounded-full bg-white/10 px-4 py-1 text-xs font-bold uppercase tracking-widest text-white backdrop-blur-md">
                            Dataset pipeline para IA
                        </div>
                        <Typography variant="display" className="text-white text-5xl leading-tight">
                            Acesse sua central de crawling e datasets
                        </Typography>
                        <Typography variant="h3" className="text-indigo-100 font-normal">
                            Gerencie projetos, domínios, jobs, documentos, chunks e exportações em um único lugar.
                        </Typography>
                    </div>

                    <div className="mt-16 grid grid-cols-2 gap-8">
                        {[
                            'Coleta com escopo controlado',
                            'Chunks rastreáveis por origem',
                            'Exportação em JSONL para LLM',
                            'Revisão humana e auditoria'
                        ].map((b, i) => (
                            <div key={i} className="flex items-center gap-3 text-white/80">
                                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-white/10">
                                    <CheckCircle2 className="h-4 w-4 text-white" />
                                </div>
                                <span className="text-sm font-medium">{b}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Abstract decoration */}
                <div className="absolute -right-20 -bottom-20 h-96 w-96 rounded-full bg-white/5 blur-3xl" />
                <div className="absolute -left-20 top-1/2 h-64 w-64 rounded-full bg-indigo-400/20 blur-3xl" />

                <div className="relative z-10">
                    <Typography variant="caption" className="text-indigo-200">
                        © 2026 CrawlMind. Ferramenta profissional para engenharia de dados de IA.
                    </Typography>
                </div>
            </div>

            {/* Lado Direito - Formulário */}
            <div className="w-full lg:w-1/2 flex items-center justify-center p-8 lg:p-16">
                <div className="w-full max-w-md space-y-8">
                    <div className="lg:hidden flex justify-center mb-8">
                        <Link href="/" className="flex items-center gap-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-600 text-white shadow-lg">
                                <Activity className="h-6 w-6" />
                            </div>
                            <span className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">CrawlMind</span>
                        </Link>
                    </div>

                    <div className="text-center lg:text-left">
                        <Typography variant="h1" className="text-3xl font-black text-slate-900 dark:text-white">
                            Entrar na conta
                        </Typography>
                        <Typography variant="body" className="mt-2 text-slate-500 dark:text-slate-400">
                            Acesse seus projetos, crawlers e datasets estruturados.
                        </Typography>
                    </div>

                    {status && (
                        <Card className="bg-emerald-500/10 border-emerald-500/20 text-emerald-500 p-4">
                            <Typography variant="small">{status}</Typography>
                        </Card>
                    )}

                    <form onSubmit={submit} className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-xs font-bold uppercase tracking-widest text-slate-500">Email</label>
                            <input
                                id="email"
                                type="email"
                                name="email"
                                value={data.email}
                                placeholder="voce@empresa.com"
                                className={cn(
                                    "w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm transition-all focus:border-indigo-600 focus:ring-4 focus:ring-indigo-600/10 dark:border-slate-800 dark:bg-slate-900 dark:focus:border-indigo-500 text-slate-900 dark:text-white",
                                    errors.email && "border-rose-500 focus:border-rose-500 focus:ring-rose-500/10"
                                )}
                                autoComplete="username"
                                autoFocus
                                onChange={(e) => setData('email', e.target.value)}
                            />
                            <InputError message={errors.email} />
                        </div>

                        <div className="space-y-2">
                            <div className="flex justify-between items-center">
                                <label className="text-xs font-bold uppercase tracking-widest text-slate-500">Senha</label>
                                {canResetPassword && (
                                    <Link href={route('password.request')} className="text-xs font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400">
                                        Esqueceu sua senha?
                                    </Link>
                                )}
                            </div>
                            <input
                                id="password"
                                type="password"
                                name="password"
                                value={data.password}
                                placeholder="Sua senha secreta"
                                className={cn(
                                    "w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm transition-all focus:border-indigo-600 focus:ring-4 focus:ring-indigo-600/10 dark:border-slate-800 dark:bg-slate-900 dark:focus:border-indigo-500 text-slate-900 dark:text-white",
                                    errors.password && "border-rose-500 focus:border-rose-500 focus:ring-rose-500/10"
                                )}
                                autoComplete="current-password"
                                onChange={(e) => setData('password', e.target.value)}
                            />
                            <InputError message={errors.password} />
                        </div>

                        <div className="flex items-center gap-3">
                            <input
                                type="checkbox"
                                id="remember"
                                checked={data.remember}
                                onChange={(e) => setData('remember', e.target.checked)}
                                className="h-5 w-5 rounded-lg border-slate-300 text-indigo-600 focus:ring-indigo-600 dark:border-slate-700 dark:bg-slate-900"
                            />
                            <label htmlFor="remember" className="text-sm font-medium text-slate-600 dark:text-slate-400 cursor-pointer">
                                Manter conectado
                            </label>
                        </div>

                        <Button 
                            type="submit" 
                            className="w-full h-12 text-lg" 
                            isLoading={processing}
                            icon={<LogIn className="h-5 w-5" />}
                        >
                            Entrar
                        </Button>
                    </form>

                    <div className="pt-8 border-t border-slate-100 dark:border-slate-800 text-center">
                        <Typography variant="small" className="text-slate-500">
                            Ainda não tem uma conta?{' '}
                            <Link href={route('register')} className="font-bold text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 inline-flex items-center gap-1 group">
                                Criar conta agora <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-1" />
                            </Link>
                        </Typography>
                    </div>
                </div>
            </div>
        </div>
    );
}
