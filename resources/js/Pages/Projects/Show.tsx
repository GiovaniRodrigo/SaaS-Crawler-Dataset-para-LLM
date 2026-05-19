import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm, router, usePage } from '@inertiajs/react';
import { Project, Domain, CrawlJob } from '@/Types/project';
import Card from '@/Components/atoms/Card';
import Typography from '@/Components/atoms/Typography';
import Button from '@/Components/atoms/Button';
import Badge from '@/Components/atoms/Badge';
import MetricCard from '@/Components/molecules/MetricCard';
import useTranslation from '@/Hooks/useTranslation';
import { FormEvent, useState } from 'react';
import { 
    Activity, 
    Globe, 
    FileText, 
    Braces, 
    Download, 
    Settings, 
    Plus, 
    CheckCircle2, 
    AlertCircle,
    ChevronRight,
    Trash2,
    Play,
    Search as SearchIcon,
    Info,
    Link as LinkIcon
} from 'lucide-react';
import { cn } from '@/utils';

interface SearchResult {
    chunk_id: number;
    document_id: number;
    content: string;
    title: string | null;
    url: string;
    similarity: number;
}

interface Props {
    project: Project;
    stats: {
        total_documents: number;
        total_chunks: number;
    };
}

export default function Show({ project, stats }: Props) {
    const { t } = useTranslation();
    const [activeTab, setActiveTab] = useState('summary');

    const tabs = [
        { id: 'summary', label: t('messages.report'), icon: Activity },
        { id: 'search', label: t('messages.semantic_search'), icon: SearchIcon },
        { id: 'domains', label: t('messages.domains'), icon: Globe },
        { id: 'jobs', label: t('messages.jobs'), icon: Play },
        { id: 'documents', label: t('messages.documents'), icon: FileText },
        { id: 'chunks', label: t('messages.chunks'), icon: Braces },
        { id: 'exports', label: t('messages.exports'), icon: Download },
    ];

    return (
        <AuthenticatedLayout
            header={
                <div className="flex items-center justify-between">
                    <div>
                        <div className="flex items-center gap-2">
                            <Link href={route('projects.index')} className="text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                                <Typography variant="caption">{t('messages.projects')}</Typography>
                            </Link>
                            <ChevronRight className="h-3 w-3 text-slate-300" />
                            <Badge variant="indigo">SaaS Crawler</Badge>
                        </div>
                        <Typography variant="h1" className="mt-1 font-bold text-slate-900 dark:text-white">
                            {project.name}
                        </Typography>
                    </div>
                    <div className="flex gap-3">
                        <Link href={route('projects.crawl-jobs.create', project.id)}>
                            <Button icon={<Play className="h-4 w-4" />}>
                                {t('messages.execute_now')}
                            </Button>
                        </Link>
                        <Link href={route('projects.edit', project.id)}>
                            <Button variant="secondary" icon={<Settings className="h-4 w-4" />}>
                                {t('messages.configuration')}
                            </Button>
                        </Link>
                    </div>
                </div>
            }
        >
            <Head title={project.name} />

            {/* Tabs Navigation */}
            <div className="mb-8 flex items-center gap-1 rounded-2xl bg-white p-1.5 shadow-sm dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                {tabs.map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={cn(
                            'flex flex-1 items-center justify-center gap-2 rounded-xl py-2.5 text-sm font-medium transition-all duration-200',
                            activeTab === tab.id
                                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20'
                                : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-100'
                        )}
                    >
                        <tab.icon className={cn('h-4 w-4', activeTab === tab.id ? 'text-white' : 'text-slate-400')} />
                        {tab.label}
                    </button>
                ))}
            </div>

            {/* Tab Content */}
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-300">
                {activeTab === 'summary' && (
                    <div className="space-y-8">
                        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                            <MetricCard 
                                label={t('messages.documents')} 
                                value={stats.total_documents} 
                                icon={<FileText className="h-6 w-6" />}
                            />
                            <MetricCard 
                                label={t('messages.chunks')} 
                                value={stats.total_chunks} 
                                icon={<Braces className="h-6 w-6" />}
                            />
                            <Card className="flex flex-col justify-center">
                                <Typography variant="caption" className="text-slate-500">Qualidade do Dataset</Typography>
                                <div className="mt-2 flex items-center gap-3">
                                    <Typography variant="h2" className="font-bold text-emerald-600 dark:text-emerald-400">87%</Typography>
                                    <Badge variant="emerald">Excelente</Badge>
                                </div>
                            </Card>
                        </div>
                        
                        <Card>
                            <Typography variant="h3" className="font-bold mb-4">{t('messages.project_summary')}</Typography>
                            <Typography variant="body" className="text-slate-600 dark:text-slate-400">
                                {project.description || t('messages.no_description')}
                            </Typography>
                            
                            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8 pt-8 border-t border-slate-100 dark:border-slate-800">
                                <div>
                                    <Typography variant="caption" className="text-slate-400">{t('messages.current_scope')}</Typography>
                                    <div className="mt-4 space-y-3">
                                        <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300">
                                            <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                                            {t('messages.authorized_domains_count', { count: String(project.domains?.length || 0) })}
                                        </div>
                                        <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300">
                                            <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                                            {t('messages.sensitive_filter_active')}
                                        </div>
                                        <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300">
                                            <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                                            {t('messages.deduplication_active')}
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <Typography variant="caption" className="text-slate-400">{t('messages.last_activity')}</Typography>
                                    <div className="mt-4 flex items-center gap-3">
                                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-500">
                                            <Play className="h-5 w-5" />
                                        </div>
                                        <div>
                                            <Typography variant="small" className="font-bold">{t('messages.crawler_finished')}</Typography>
                                            <Typography variant="caption" className="text-slate-500">
                                                {t('messages.new_pages_count', { time: '2 dias', count: '1.2k' })}
                                            </Typography>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Card>
                    </div>
                )}

                {activeTab === 'search' && <SearchSection project={project} />}
                {activeTab === 'domains' && <DomainSection project={project} />}
                {activeTab === 'jobs' && <JobSection project={project} />}
                {activeTab === 'documents' && <DocumentSection project={project} />}
                {activeTab === 'chunks' && <ChunkSection project={project} />}
                {activeTab === 'exports' && <ExportSection project={project} />}
            </div>
        </AuthenticatedLayout>
    );
}

function SearchSection({ project }: { project: Project }) {
    const { t } = useTranslation();
    const { props } = usePage<any>();
    const [query, setQuery] = useState('');
    const [limit, setLimit] = useState(10);
    const [isLoading, setIsLoading] = useState(false);

    const results = props.flash?.semanticSearchResults as SearchResult[] ?? [];

    const handleSearch = (e: FormEvent) => {
        e.preventDefault();
        if (query.length < 3) return;

        setIsLoading(true);
        router.post(
            route('projects.semantic-search', project.id),
            { query, limit },
            {
                preserveScroll: true,
                onFinish: () => setIsLoading(false),
            }
        );
    };

    return (
        <div className="max-w-4xl mx-auto space-y-8">
            <Card className="border-slate-800 bg-slate-900/50 backdrop-blur">
                <form onSubmit={handleSearch} className="space-y-6">
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-400">O que você está procurando?</label>
                        <div className="relative">
                            <SearchIcon className="absolute left-4 top-4 h-5 w-5 text-slate-500" />
                            <textarea
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                placeholder="Ex: Como configurar a autenticação via OAuth2?"
                                className="w-full min-h-[120px] rounded-xl border border-slate-700 bg-slate-950 pl-12 pr-4 py-3 text-slate-100 placeholder:text-slate-600 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all resize-none"
                            />
                        </div>
                    </div>

                    <div className="flex items-center justify-between gap-4">
                        <div className="flex items-center gap-3">
                            <label className="text-sm font-medium text-slate-400">Resultados:</label>
                            <select 
                                value={limit}
                                onChange={(e) => setLimit(Number(e.target.value))}
                                className="bg-slate-800 border-slate-700 rounded-lg text-sm text-slate-100 focus:ring-cyan-500"
                            >
                                <option value={5}>5 resultados</option>
                                <option value={10}>10 resultados</option>
                                <option value={25}>25 resultados</option>
                            </select>
                        </div>

                        <Button 
                            type="submit" 
                            isLoading={isLoading}
                            disabled={query.length < 3}
                            icon={<SearchIcon className="h-4 w-4" />}
                            className="px-8"
                        >
                            {t('messages.semantic_search')}
                        </Button>
                    </div>
                </form>
            </Card>

            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <Typography variant="h3" className="font-bold text-slate-100">
                        Resultados da Pesquisa
                    </Typography>
                    {results.length > 0 && (
                        <Typography variant="caption" className="text-slate-500">
                            Encontrados {results.length} trechos relevantes
                        </Typography>
                    )}
                </div>

                {results.length > 0 ? (
                    <div className="space-y-4">
                        {results.map((result) => (
                            <Card key={result.chunk_id} className="border-slate-800 bg-slate-900/30 hover:border-cyan-500/30 transition-all group">
                                <div className="flex items-start justify-between mb-4">
                                    <div className="space-y-1">
                                        <Typography variant="body" className="font-bold text-slate-100">
                                            {result.title || t('messages.no_title')}
                                        </Typography>
                                        <div className="flex items-center gap-2 text-slate-500 hover:text-cyan-400 transition-colors">
                                            <LinkIcon className="h-3 w-3" />
                                            <a href={result.url} target="_blank" className="text-xs truncate max-w-md">
                                                {result.url}
                                            </a>
                                        </div>
                                    </div>
                                    <div className="px-2 py-1 rounded-lg bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-[10px] font-bold">
                                        {(result.similarity * 100).toFixed(1)}% MATCH
                                    </div>
                                </div>
                                <div className="p-4 rounded-xl bg-slate-950/50 border border-slate-800/50">
                                    <Typography variant="small" className="text-slate-300 leading-relaxed italic">
                                        "{result.content}"
                                    </Typography>
                                </div>
                            </Card>
                        ))}
                    </div>
                ) : (
                    !isLoading && (
                        <div className="text-center py-20 border-2 border-dashed border-slate-800 rounded-3xl">
                            <div className="mx-auto w-16 h-16 rounded-2xl bg-slate-900 flex items-center justify-center text-slate-700 mb-4">
                                <Info className="h-8 w-8" />
                            </div>
                            <Typography variant="body" className="text-slate-500">
                                {query.length > 0 ? 'Nenhum trecho relevante encontrado para esta busca.' : 'Digite uma pergunta acima para iniciar a busca semântica.'}
                            </Typography>
                        </div>
                    )
                )}
            </div>
        </div>
    );
}

function DomainSection({ project }: { project: Project }) {
    const { t } = useTranslation();
    const { data, setData, post, processing, errors, reset } = useForm({
        domain: '',
        allow_subdomains: false,
    });

    const submit = (e: FormEvent) => {
        e.preventDefault();
        post(route('projects.domains.store', project.id), {
            onSuccess: () => reset(),
        });
    };

    return (
        <div className="space-y-6">
            <Card>
                <Typography variant="h3" className="font-bold mb-1">{t('messages.authorize_new_domain')}</Typography>
                <Typography variant="small" className="text-slate-500 mb-6">{t('messages.domain_scope_desc')}</Typography>
                
                <form onSubmit={submit} className="flex flex-col md:flex-row items-start md:items-end gap-6">
                    <div className="flex-1 w-full">
                        <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">{t('messages.domain_url')}</label>
                        <input
                            type="text"
                            placeholder="ex: ajuda.empresa.com.br"
                            value={data.domain}
                            onChange={(e) => setData('domain', e.target.value)}
                            className={cn(
                                'w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm transition-all focus:border-indigo-600 focus:ring-4 focus:ring-indigo-600/10 dark:border-slate-800 dark:bg-slate-950 dark:focus:border-indigo-500',
                                errors.domain && 'border-rose-500 focus:border-rose-500 focus:ring-rose-500/10'
                            )}
                        />
                        {errors.domain && <Typography variant="caption" className="mt-1.5 text-rose-500">{errors.domain}</Typography>}
                    </div>
                    <div className="flex items-center gap-3 py-3">
                        <input
                            type="checkbox"
                            id="allow_subdomains"
                            checked={data.allow_subdomains}
                            onChange={(e) => setData('allow_subdomains', e.target.checked)}
                            className="h-5 w-5 rounded-lg border-slate-300 text-indigo-600 focus:ring-indigo-600 dark:border-slate-700 dark:bg-slate-950"
                        />
                        <label htmlFor="allow_subdomains" className="text-sm font-medium text-slate-700 dark:text-slate-300 cursor-pointer">
                            {t('messages.allow_subdomains')}
                        </label>
                    </div>
                    <Button type="submit" isLoading={processing} icon={<Plus className="h-4 w-4" />}>
                        {t('messages.add')}
                    </Button>
                </form>
            </Card>

            <Card padding="none">
                <div className="p-6 pb-0">
                    <Typography variant="h3" className="font-bold">{t('messages.registered_domains')}</Typography>
                </div>
                <div className="mt-6 overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="border-b border-slate-100 bg-slate-50/50 dark:border-slate-800 dark:bg-slate-900/50">
                                <th className="px-6 py-4"><Typography variant="caption" className="text-slate-500">{t('messages.domain')}</Typography></th>
                                <th className="px-6 py-4"><Typography variant="caption" className="text-slate-500">{t('messages.scope')}</Typography></th>
                                <th className="px-6 py-4"><Typography variant="caption" className="text-slate-500">{t('messages.status')}</Typography></th>
                                <th className="px-6 py-4 text-right"><Typography variant="caption" className="text-slate-500">{t('messages.actions')}</Typography></th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                            {project.domains?.length === 0 ? (
                                <tr>
                                    <td colSpan={4} className="px-6 py-12 text-center">
                                        <Typography variant="small" className="text-slate-500">{t('messages.no_domains_authorized')}</Typography>
                                    </td>
                                </tr>
                            ) : (
                                project.domains?.map((domain) => (
                                    <tr key={domain.id} className="group hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                                        <td className="px-6 py-4 font-medium text-slate-900 dark:text-white">{domain.domain}</td>
                                        <td className="px-6 py-4">
                                            <Badge variant={domain.allow_subdomains ? 'indigo' : 'slate'}>
                                                {domain.allow_subdomains ? t('messages.domain_plus_subdomains') : t('messages.only_domain')}
                                            </Badge>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-2">
                                                <div className="h-2 w-2 rounded-full bg-emerald-500" />
                                                <Typography variant="small">{t('messages.validated')}</Typography>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <Link
                                                href={route('domains.destroy', domain.id)}
                                                method="delete"
                                                as="button"
                                                className="text-slate-400 hover:text-rose-500 transition-colors"
                                            >
                                                <Trash2 className="h-4 w-4" />
                                            </Link>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </Card>
        </div>
    );
}

function JobSection({ project }: { project: Project }) {
    const { t } = useTranslation();
    return (
        <Card padding="none">
            <div className="flex justify-between items-center p-6 border-b border-slate-100 dark:border-slate-800">
                <div>
                    <Typography variant="h3" className="font-bold">{t('messages.job_history')}</Typography>
                    <Typography variant="caption" className="text-slate-500">{t('messages.track_recent_crawls')}</Typography>
                </div>
                <Link href={route('projects.crawl-jobs.create', project.id)}>
                    <Button size="sm" icon={<Plus className="h-4 w-4" />}>{t('messages.new_job')}</Button>
                </Link>
            </div>
            <div className="overflow-x-auto">
                <table className="w-full text-left">
                    <thead>
                        <tr className="bg-slate-50/50 dark:bg-slate-900/50">
                            <th className="px-6 py-4"><Typography variant="caption" className="text-slate-500">{t('messages.status')}</Typography></th>
                            <th className="px-6 py-4"><Typography variant="caption" className="text-slate-500">Páginas</Typography></th>
                            <th className="px-6 py-4"><Typography variant="caption" className="text-slate-500">Data de Início</Typography></th>
                            <th className="px-6 py-4 text-right"><Typography variant="caption" className="text-slate-500">{t('messages.actions')}</Typography></th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                        {project.crawl_jobs?.length === 0 ? (
                            <tr>
                                <td colSpan={4} className="px-6 py-12 text-center text-slate-500">
                                    {t('messages.no_jobs_executed')}
                                </td>
                            </tr>
                        ) : (
                            project.crawl_jobs?.map((job) => (
                                <tr key={job.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                                    <td className="px-6 py-4">
                                        <Badge variant={
                                            job.status === 'completed' ? 'emerald' :
                                            job.status === 'running' ? 'cyan' :
                                            job.status === 'failed' ? 'rose' : 'slate'
                                        }>
                                            {job.status}
                                        </Badge>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex flex-col gap-1">
                                            <Typography variant="small" className="font-bold">
                                                {job.total_crawled} / {job.max_pages}
                                            </Typography>
                                            <div className="h-1.5 w-24 overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
                                                <div 
                                                    className="h-full bg-indigo-600" 
                                                    style={{ width: `${(job.total_crawled / job.max_pages) * 100}%` }} 
                                                />
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <Typography variant="small" className="text-slate-600 dark:text-slate-400">
                                            {new Date(job.created_at).toLocaleDateString()} às {new Date(job.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                        </Typography>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <Link href={route('crawl-jobs.show', job.id)}>
                                            <Button variant="ghost" size="sm">Ver Detalhes</Button>
                                        </Link>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </Card>
    );
}

function DocumentSection({ project }: { project: Project }) {
    const { t } = useTranslation();
    return (
        <Card className="text-center py-24">
            <div className="flex h-16 w-16 mx-auto items-center justify-center rounded-2xl bg-slate-50 dark:bg-slate-900 text-slate-400 mb-6">
                <FileText className="h-8 w-8" />
            </div>
            <Typography variant="h3" className="font-bold">{t('messages.documents')}</Typography>
            <Typography variant="body" className="mt-2 text-slate-500 dark:text-slate-400 max-w-sm mx-auto">
                {t('messages.explore_documents')}
            </Typography>
            <Link href={route('projects.documents.index', project.id)} className="mt-8 block">
                <Button variant="outline">{t('messages.explore_documents')}</Button>
            </Link>
        </Card>
    );
}

function ChunkSection({ project }: { project: Project }) {
    const { t } = useTranslation();
    return (
        <Card className="text-center py-24">
            <div className="flex h-16 w-16 mx-auto items-center justify-center rounded-2xl bg-slate-50 dark:bg-slate-900 text-slate-400 mb-6">
                <Braces className="h-8 w-8" />
            </div>
            <Typography variant="h3" className="font-bold">{t('messages.chunks')}</Typography>
            <Typography variant="body" className="mt-2 text-slate-500 dark:text-slate-400 max-w-sm mx-auto">
                Visualize como seus documentos foram segmentados em fragmentos menores prontos para consumo por LLMs.
            </Typography>
            <Link href={route('projects.chunks.index', project.id)} className="mt-8 block">
                <Button variant="outline">Ver Chunks</Button>
            </Link>
        </Card>
    );
}

function ExportSection({ project }: { project: Project }) {
    const { t } = useTranslation();
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="group relative overflow-hidden">
                <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-400">
                    <FileText className="h-6 w-6" />
                </div>
                <Typography variant="h3" className="font-bold">Documents JSONL</Typography>
                <Typography variant="body" className="mt-2 text-slate-500 dark:text-slate-400">
                    Dataset completo contendo o texto limpo e metadados de todas as páginas coletadas.
                </Typography>
                <div className="mt-8 pt-6 border-t border-slate-100 dark:border-slate-800">
                    <a href={route('projects.exports.documents', project.id)} target="_blank">
                        <Button className="w-full" icon={<Download className="h-4 w-4" />}>
                            Baixar JSONL de Documentos
                        </Button>
                    </a>
                </div>
                {/* Background glow */}
                <div className="absolute -right-12 -top-12 h-32 w-32 rounded-full bg-indigo-500/5 blur-3xl" />
            </Card>

            <Card className="group relative overflow-hidden border-indigo-600/20 dark:border-indigo-500/20 shadow-indigo-500/5">
                <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-600 text-white shadow-lg shadow-indigo-600/30">
                    <Braces className="h-6 w-6" />
                </div>
                <Typography variant="h3" className="font-bold">Chunks JSONL</Typography>
                <Typography variant="body" className="mt-2 text-slate-500 dark:text-slate-400">
                    Dataset segmentado em fragmentos menores (chunks) com overlap, ideal para RAG e Fine-tuning.
                </Typography>
                <div className="mt-8 pt-6 border-t border-slate-100 dark:border-slate-800">
                    <a href={route('projects.exports.chunks', project.id)} target="_blank">
                        <Button className="w-full" icon={<Download className="h-4 w-4" />}>
                            Baixar JSONL de Chunks
                        </Button>
                    </a>
                </div>
                {/* Background glow */}
                <div className="absolute -right-12 -top-12 h-32 w-32 rounded-full bg-indigo-500/10 blur-3xl" />
            </Card>
        </div>
    );
}
