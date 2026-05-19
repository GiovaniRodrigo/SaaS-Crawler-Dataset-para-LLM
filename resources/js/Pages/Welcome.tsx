import { Head, Link } from '@inertiajs/react';
import type { PageProps } from '@/types';
import Typography from '@/Components/atoms/Typography';
import Button from '@/Components/atoms/Button';
import Badge from '@/Components/atoms/Badge';
import Card from '@/Components/atoms/Card';
import ApplicationLogo from '@/Components/atoms/ApplicationLogo';
import { 
    Activity, 
    Zap, 
    Globe, 
    Database, 
    FileText, 
    ShieldCheck, 
    Sparkles, 
    CopyCheck, 
    Braces, 
    CheckSquare, 
    FileJson, 
    History,
    Brain,
    ArrowRight,
    Search,
    CheckCircle2
} from 'lucide-react';
import { cn } from '@/utils';

export default function Welcome({ auth }: PageProps) {
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
        <>
            <Head title="DataCrawl - SaaS para Crawler e Dataset LLM" />

            <main className="min-h-screen bg-slate-950 text-slate-100 selection:bg-cyan-500/30">
                {/* 1. Header Público */}
                <header className="fixed top-0 z-50 w-full border-b border-slate-800 bg-slate-950/80 backdrop-blur-md">
                    <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
                        <Link href="/" className="flex items-center gap-3">
                            <ApplicationLogo />
                        </Link>

                        <nav className="hidden items-center gap-8 md:flex">
                            {['Produto', 'Recursos', 'Segurança', 'Preços'].map((item) => (
                                <Link key={item} href="#" className="text-sm font-medium text-slate-400 hover:text-white transition-colors">
                                    {item}
                                </Link>
                            ))}
                        </nav>

                        <div className="flex items-center gap-4">
                            {auth.user ? (
                                <Link href={route('dashboard')}>
                                    <Button size="sm">Dashboard</Button>
                                </Link>
                            ) : (
                                <>
                                    <Link href={route('login')} className="text-sm font-medium text-slate-400 hover:text-white">
                                        Entrar
                                    </Link>
                                    <Link href={route('register')}>
                                        <Button size="sm">Começar agora</Button>
                                    </Link>
                                </>
                            )}
                        </div>
                    </div>
                </header>

                {/* 2. Hero Section */}
                <section className="relative overflow-hidden pt-32 pb-20 lg:pt-48 lg:pb-32">
                    <div className="mx-auto max-w-7xl px-6">
                        <div className="text-center">
                            <Badge variant="cyan" className="mb-6 py-1 px-4">SaaS + Extensão para datasets LLM</Badge>
                            <Typography variant="display" className="mx-auto max-w-4xl text-white lg:text-7xl leading-tight tracking-tighter">
                                Transforme sites em <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">datasets prontos para LLM</span>
                            </Typography>
                            <Typography variant="h3" className="mx-auto mt-8 max-w-2xl font-normal text-slate-400">
                                Colete páginas, limpe conteúdos, gere chunks rastreáveis e exporte datasets em JSONL para RAG, embeddings e fine-tuning.
                            </Typography>

                            <div className="mt-12 flex flex-wrap justify-center gap-4">
                                <Link href={route('register')}>
                                    <Button size="lg" className="h-14 px-8 text-lg" icon={<Zap className="h-5 w-5" />}>
                                        Começar agora
                                    </Button>
                                </Link>
                                <Button variant="secondary" size="lg" className="h-14 px-8 text-lg">
                                    Ver demonstração
                                </Button>
                            </div>
                        </div>

                        {/* 3. Preview Visual do Dashboard */}
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
                                            <div className="space-y-1">
                                                <Typography variant="caption" className="text-slate-500">Qualidade média</Typography>
                                                <Typography variant="h3" className="font-bold text-emerald-400">91%</Typography>
                                            </div>
                                            <div className="space-y-1">
                                                <Typography variant="caption" className="text-slate-500">Falhas</Typography>
                                                <Typography variant="h3" className="font-bold text-rose-400">2.1%</Typography>
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

                {/* 3. Seção de Métricas */}
                <section className="py-20 border-y border-slate-800 bg-slate-900/30">
                    <div className="mx-auto max-w-7xl px-6">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                            {metrics.map((m, i) => (
                                <div key={i} className="text-center space-y-2">
                                    <div className="flex justify-center text-cyan-500">{m.icon}</div>
                                    <Typography variant="h2" className="text-4xl font-black text-white">{m.value}</Typography>
                                    <Typography variant="caption" className="text-slate-500">{m.label}</Typography>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* 4. Seção Como Funciona */}
                <section className="py-32">
                    <div className="mx-auto max-w-7xl px-6 text-center">
                        <Typography variant="h2" className="text-4xl font-bold">Do site ao dataset em poucos passos</Typography>
                        <Typography variant="body" className="mt-4 text-slate-400 max-w-2xl mx-auto">
                            O DataCrawl automatiza o pipeline de dados para que você foque no que importa: treinar sua IA.
                        </Typography>

                        <div className="mt-20 grid grid-cols-1 md:grid-cols-5 gap-8">
                            {steps.map((s, i) => (
                                <div key={i} className="relative">
                                    <div className="mx-auto mb-6 flex h-12 w-12 items-center justify-center rounded-2xl bg-cyan-600/10 text-cyan-400 font-bold text-xl">
                                        {i + 1}
                                    </div>
                                    <Typography variant="body" className="font-bold">{s.title}</Typography>
                                    <Typography variant="caption" className="mt-2 block text-slate-500">{s.desc}</Typography>
                                    {i < 4 && <ArrowRight className="hidden md:block absolute top-6 -right-4 h-4 w-4 text-slate-800" />}
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* 5. Seção de Recursos Principais */}
                <section className="py-32 bg-slate-900/30">
                    <div className="mx-auto max-w-7xl px-6">
                        <div className="text-center mb-20">
                            <Typography variant="h2" className="text-4xl font-bold">Tudo que você precisa para criar datasets confiáveis</Typography>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {features.map((f, i) => (
                                <Card key={i} className="border-slate-800 bg-slate-900/50 hover:border-cyan-500/50 transition-all group">
                                    <div className="mb-4 text-cyan-500 group-hover:scale-110 transition-transform">
                                        {f.icon}
                                    </div>
                                    <Typography variant="body" className="font-bold">{f.title}</Typography>
                                    <Typography variant="caption" className="mt-2 block text-slate-500">{f.desc}</Typography>
                                </Card>
                            ))}
                        </div>
                    </div>
                </section>

                {/* 6. Seção SaaS + Extensão */}
                <section className="py-32">
                    <div className="mx-auto max-w-7xl px-6">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                            <div>
                                <Typography variant="h2" className="text-4xl font-bold leading-tight">Coleta automática com SaaS.<br />Captura assistida com extensão.</Typography>
                                <Typography variant="body" className="mt-6 text-slate-400">
                                    Use o SaaS para coletar sites públicos e documentações. Use a extensão do navegador para capturar áreas que exigem navegação humana ou conteúdo renderizado dinamicamente.
                                </Typography>
                                <div className="mt-10 grid grid-cols-2 gap-8">
                                    <div className="space-y-4">
                                        <Typography variant="body" className="font-bold text-cyan-400">SaaS Crawler</Typography>
                                        <ul className="space-y-2 text-sm text-slate-500">
                                            <li className="flex gap-2 items-center"><CheckCircle2 className="h-3 w-3 text-cyan-500" /> Coleta automática</li>
                                            <li className="flex gap-2 items-center"><CheckCircle2 className="h-3 w-3 text-cyan-500" /> Escopo por domínio</li>
                                            <li className="flex gap-2 items-center"><CheckCircle2 className="h-3 w-3 text-cyan-500" /> Jobs e relatórios</li>
                                        </ul>
                                    </div>
                                    <div className="space-y-4">
                                        <Typography variant="body" className="font-bold text-blue-400">Extensão</Typography>
                                        <ul className="space-y-2 text-sm text-slate-500">
                                            <li className="flex gap-2 items-center"><CheckCircle2 className="h-3 w-3 text-blue-500" /> Captura manual</li>
                                            <li className="flex gap-2 items-center"><CheckCircle2 className="h-3 w-3 text-blue-500" /> Prévia do conteúdo</li>
                                            <li className="flex gap-2 items-center"><CheckCircle2 className="h-3 w-3 text-blue-500" /> Navegação humana</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div className="relative">
                                <div className="absolute -inset-4 bg-cyan-500/10 rounded-full blur-3xl" />
                                <Card className="border-slate-800 bg-slate-900/80 shadow-2xl relative">
                                    <div className="flex h-64 items-center justify-center border-2 border-dashed border-slate-800 rounded-xl">
                                        <div className="text-center text-slate-600">
                                            <Activity className="h-12 w-12 mx-auto mb-4 opacity-20" />
                                            <Typography variant="caption">Visual da Extensão</Typography>
                                        </div>
                                    </div>
                                </Card>
                            </div>
                        </div>
                    </div>
                </section>

                {/* 7. Casos de Uso */}
                <section className="py-32 bg-cyan-900/10">
                    <div className="mx-auto max-w-7xl px-6">
                        <div className="text-center mb-20">
                            <Typography variant="h2" className="text-4xl font-bold">Feito para equipes que precisam transformar conhecimento em IA</Typography>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {[
                                { title: 'Times de suporte', desc: 'Criar assistentes com FAQs e manuais.' },
                                { title: 'Desenvolvedores', desc: 'Preparar bases RAG para aplicações.' },
                                { title: 'Empresas', desc: 'Transformar documentação em IA consultável.' },
                            ].map((u, i) => (
                                <div key={i} className="p-8 rounded-3xl border border-slate-800 bg-slate-900/50">
                                    <Typography variant="h4" className="font-bold text-white">{u.title}</Typography>
                                    <Typography variant="body" className="mt-4 text-slate-400">{u.desc}</Typography>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* 8. Exportações */}
                <section className="py-32">
                    <div className="mx-auto max-w-7xl px-6">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                            <Card padding="none" className="bg-slate-900 border-slate-800 font-mono text-[10px] leading-relaxed p-6 text-slate-400 overflow-hidden relative">
                                <div className="absolute top-0 right-0 p-4 opacity-20"><FileJson className="h-12 w-12" /></div>
                                <pre className="text-cyan-400">
{`{
  "id": "chunk_000001",
  "url": "https://empresa.com.br/docs/guia",
  "title": "Guia de Uso",
  "text": "Trecho preparado para LLM...",
  "tokens_estimated": 780,
  "metadata": {
    "domain": "empresa.com.br",
    "source": "saas_crawler"
  }
}`}
                                </pre>
                            </Card>
                            <div>
                                <Typography variant="h2" className="text-4xl font-bold">Exporte datasets prontos para seus fluxos de IA</Typography>
                                <Typography variant="body" className="mt-6 text-slate-400">
                                    Baixe seus dados nos formatos que os desenvolvedores e as APIs de IA amam. Do JSONL estruturado ao Markdown legível.
                                </Typography>
                                <div className="mt-10 flex flex-wrap gap-3">
                                    <Badge variant="cyan" className="py-2 px-4">JSONL</Badge>
                                    <Badge variant="slate" className="py-2 px-4">CSV</Badge>
                                    <Badge variant="slate" className="py-2 px-4">Markdown</Badge>
                                    <Badge variant="slate" className="py-2 px-4">ZIP</Badge>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* 9. Segurança */}
                <section className="py-32 bg-slate-900/30">
                    <div className="mx-auto max-w-7xl px-6 text-center">
                        <Typography variant="h2" className="text-4xl font-bold">Controle, rastreabilidade e consentimento</Typography>
                        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-12">
                            {[
                                { title: 'Domínios autorizados', desc: 'O crawler só coleta dentro do escopo definido.' },
                                { title: 'Consentimento', desc: 'A extensão só envia conteúdo após ação do usuário.' },
                                { title: 'Auditoria', desc: 'Toda ação crítica gera um registro rastreável.' },
                            ].map((s, i) => (
                                <div key={i} className="space-y-4">
                                    <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-500/10 text-emerald-500">
                                        <ShieldCheck className="h-8 w-8" />
                                    </div>
                                    <Typography variant="body" className="font-bold">{s.title}</Typography>
                                    <Typography variant="caption" className="block text-slate-500">{s.desc}</Typography>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* 10. CTA Final */}
                <section className="py-32">
                    <div className="mx-auto max-w-5xl px-6">
                        <Card className="bg-cyan-600 border-none p-12 lg:p-20 text-center relative overflow-hidden">
                            <div className="relative z-10">
                                <Typography variant="display" className="text-slate-950 text-4xl lg:text-5xl">Pronto para transformar conteúdo web em dataset para IA?</Typography>
                                <Typography variant="h3" className="mt-6 font-bold text-slate-900 max-w-2xl mx-auto">
                                    Crie seu primeiro projeto, configure um domínio e gere seu primeiro JSONL hoje mesmo.
                                </Typography>
                                <div className="mt-12 flex flex-wrap justify-center gap-4">
                                    <Link href={route('register')}>
                                        <Button variant="secondary" size="lg" className="h-14 px-10 text-lg bg-slate-950 text-cyan-400 border-none">
                                            Começar agora
                                        </Button>
                                    </Link>
                                    <Link href={route('login')}>
                                        <Button variant="outline" size="lg" className="h-14 px-10 text-lg border-slate-950 text-slate-950 hover:bg-slate-950/10">
                                            Entrar na conta
                                        </Button>
                                    </Link>
                                </div>
                            </div>
                            {/* Abstract shapes */}
                            <div className="absolute -right-20 -bottom-20 h-64 w-64 rounded-full bg-white/20 blur-3xl" />
                            <div className="absolute -left-20 -top-20 h-64 w-64 rounded-full bg-cyan-400/30 blur-3xl" />
                        </Card>
                    </div>
                </section>

                {/* Footer */}
                <footer className="border-t border-slate-800 py-20">
                    <div className="mx-auto max-w-7xl px-6">
                        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
                            <div className="flex items-center gap-3">
                                <ApplicationLogo />
                            </div>
                            <Typography variant="caption" className="text-slate-500">
                                © 2026 DataCrawl. Todos os direitos reservados.
                            </Typography>
                            <div className="flex gap-6">
                                {['Twitter', 'GitHub', 'LinkedIn'].map(s => (
                                    <Link key={s} href="#" className="text-slate-500 hover:text-white transition-colors">{s}</Link>
                                ))}
                            </div>
                        </div>
                    </div>
                </footer>
            </main>
        </>
    );
}
