import { FormEvent, useState } from 'react';
import { Head, router, usePage } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import Typography from '@/Components/atoms/Typography';
import Card from '@/Components/atoms/Card';
import Button from '@/Components/atoms/Button';
import Input from '@/Components/atoms/Input';
import { Search, Info, Link as LinkIcon } from 'lucide-react';
import { Project } from '@/Types/project';

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
}

export default function SemanticSearch({ project }: Props) {
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
        <AuthenticatedLayout
            header={
                <div className="flex items-center justify-between">
                    <div>
                        <Typography variant="h1" className="font-bold text-slate-100">
                            Busca Semântica
                        </Typography>
                        <Typography variant="small" className="text-slate-500">
                            Pesquise nos dados do projeto <span className="text-cyan-400 font-medium">{project.name}</span> usando inteligência vetorial.
                        </Typography>
                    </div>
                </div>
            }
        >
            <Head title={`Busca Semântica - ${project.name}`} />

            <div className="max-w-4xl mx-auto space-y-8">
                <Card className="border-slate-800 bg-slate-900/50 backdrop-blur">
                    <form onSubmit={handleSearch} className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-slate-400">O que você está procurando?</label>
                            <div className="relative">
                                <Search className="absolute left-4 top-4 h-5 w-5 text-slate-500" />
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
                                icon={<Search className="h-4 w-4" />}
                                className="px-8"
                            >
                                Buscar nos Chunks
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
                                                {result.title || 'Sem título'}
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
        </AuthenticatedLayout>
    );
}
