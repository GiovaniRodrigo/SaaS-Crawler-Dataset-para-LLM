import React, { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router, useForm } from '@inertiajs/react';
import Typography from '@/Components/atoms/Typography';
import Card from '@/Components/atoms/Card';
import Button from '@/Components/atoms/Button';
import { Database, Download, FileText, Braces, CheckSquare, AlertCircle } from 'lucide-react';

interface Project {
    id: number;
    name: string;
    description: string;
    documents_count: number;
    chunks_count: number;
}

interface DatasetExport {
    id: number;
    type: 'documents' | 'chunks';
    project_names: string;
    file_size: number;
    record_count: number;
    created_at: string;
    user?: {
        name: string;
    };
}

interface Props {
    projects: Project[];
    exports: DatasetExport[];
}

export default function Datasets({ projects, exports }: Props) {
    const [selectedProjects, setSelectedProjects] = useState<number[]>([]);
    const [exportType, setExportType] = useState<'documents' | 'chunks'>('documents');

    const { post, processing, errors } = useForm({
        project_ids: [] as number[],
        type: 'documents',
    });

    const toggleProject = (projectId: number) => {
        setSelectedProjects(prev => 
            prev.includes(projectId) 
                ? prev.filter(id => id !== projectId) 
                : [...prev, projectId]
        );
    };

    const toggleSelectAll = () => {
        if (selectedProjects.length === projects.length) {
            setSelectedProjects([]);
        } else {
            setSelectedProjects(projects.map(p => p.id));
        }
    };

    const handleExport = (e: React.FormEvent) => {
        e.preventDefault();
        if (selectedProjects.length === 0) return;

        router.post(route('settings.datasets.export'), {
            project_ids: selectedProjects,
            type: exportType,
        }, {
            onSuccess: () => {
                setSelectedProjects([]);
            }
        });
    };

    const formatBytes = (bytes: number) => {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const dm = 2;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('pt-BR', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        });
    };

    return (
        <AuthenticatedLayout
            header={
                <Typography variant="h1" className="font-bold text-slate-100">
                    Gerenciador de Datasets
                </Typography>
            }
        >
            <Head title="Gerenciador de Datasets" />

            <div className="max-w-5xl mx-auto space-y-8">
                {/* Hero / Header Card */}
                <Card className="border-cyan-500/20 bg-gradient-to-br from-slate-900 to-slate-950 relative overflow-hidden">
                    <div className="absolute top-0 right-0 -mt-4 -mr-4 h-32 w-32 rounded-full bg-cyan-500/5 blur-3xl"></div>
                    <div className="flex items-start gap-4">
                        <div className="h-12 w-12 rounded-2xl bg-cyan-500/10 flex items-center justify-center text-cyan-400 shrink-0">
                            <Database className="h-6 w-6" />
                        </div>
                        <div>
                            <Typography variant="h3" className="font-bold text-slate-100 mb-1">
                                Unificar e Exportar Datasets
                            </Typography>
                            <Typography variant="body" className="text-slate-400">
                                Selecione múltiplos projetos para consolidar seus dados coletados em um único arquivo formatado. Ideal para treinamento de modelos de linguagem (LLMs) ou RAG (Retrieval-Augmented Generation).
                            </Typography>
                        </div>
                    </div>
                </Card>

                {projects.length === 0 ? (
                    <Card className="text-center py-16 border-dashed border-slate-800">
                        <div className="h-16 w-16 rounded-full bg-slate-800/50 flex items-center justify-center text-slate-500 mx-auto mb-4">
                            <Database className="h-8 w-8" />
                        </div>
                        <Typography variant="h3" className="font-bold text-slate-300 mb-2">
                            Nenhum projeto encontrado
                        </Typography>
                        <Typography variant="body" className="text-slate-500 max-w-md mx-auto mb-6">
                            Você precisa criar projetos e capturar dados para gerar um dataset unificado.
                        </Typography>
                        <Link href={route('projects.index')}>
                            <Button>
                                Criar Primeiro Projeto
                            </Button>
                        </Link>
                    </Card>
                ) : (
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
                        {/* Projects Selection List */}
                        <div className="lg:col-span-2 space-y-4">
                            <Card padding="none" className="overflow-hidden border-slate-800 bg-slate-900/50">
                                <div className="p-6 border-b border-slate-800 flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <Typography variant="h4" className="font-bold text-slate-100">
                                            Selecionar Projetos
                                        </Typography>
                                    </div>
                                    <button 
                                        onClick={toggleSelectAll}
                                        className="text-xs font-bold text-cyan-400 hover:text-cyan-300 transition-colors uppercase tracking-wider"
                                    >
                                        {selectedProjects.length === projects.length ? 'Desmarcar Todos' : 'Selecionar Todos'}
                                    </button>
                                </div>

                                <div className="divide-y divide-slate-800 max-h-[500px] overflow-y-auto pr-2 custom-scrollbar">
                                    {projects.map((project) => {
                                        const isSelected = selectedProjects.includes(project.id);
                                        return (
                                            <div 
                                                key={project.id}
                                                onClick={() => toggleProject(project.id)}
                                                className={`flex items-center gap-4 p-5 hover:bg-slate-800/30 transition-all duration-200 cursor-pointer ${
                                                    isSelected ? 'bg-cyan-500/5' : ''
                                                }`}
                                            >
                                                <div className="relative flex items-center justify-center shrink-0">
                                                    <input 
                                                        type="checkbox"
                                                        checked={isSelected}
                                                        onChange={() => {}} // Handle click on container
                                                        className="h-5 w-5 rounded border-slate-800 bg-slate-950 text-cyan-500 focus:ring-cyan-500 focus:ring-offset-slate-900"
                                                    />
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <Typography variant="body" className="font-semibold text-slate-200 truncate">
                                                        {project.name}
                                                    </Typography>
                                                    <Typography variant="small" className="text-slate-500 truncate mt-0.5">
                                                        {project.description || 'Sem descrição.'}
                                                    </Typography>
                                                </div>
                                                <div className="flex items-center gap-3 shrink-0 text-slate-400 text-xs">
                                                    <div className="flex items-center gap-1 bg-slate-800/80 px-2.5 py-1 rounded-lg border border-slate-700">
                                                        <FileText className="h-3.5 w-3.5 text-slate-500" />
                                                        <span>{project.documents_count} docs</span>
                                                    </div>
                                                    <div className="flex items-center gap-1 bg-slate-800/80 px-2.5 py-1 rounded-lg border border-slate-700">
                                                        <Braces className="h-3.5 w-3.5 text-slate-500" />
                                                        <span>{project.chunks_count} chunks</span>
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </Card>
                        </div>

                        {/* Export Panel */}
                        <div className="space-y-6">
                            <Card className="border-slate-800 bg-slate-900/40 sticky top-6">
                                <Typography variant="h4" className="font-bold text-slate-100 mb-6">
                                    Opções do Dataset
                                </Typography>

                                <form onSubmit={handleExport} className="space-y-6">
                                    {/* Export Type Selection */}
                                    <div className="space-y-3">
                                        <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
                                            Estrutura de Exportação
                                        </label>
                                        <div className="grid grid-cols-1 gap-3">
                                            <label 
                                                className={`flex items-start gap-3 p-4 rounded-xl border transition-all duration-200 cursor-pointer ${
                                                    exportType === 'documents' 
                                                        ? 'border-cyan-500/50 bg-cyan-500/5 text-slate-100' 
                                                        : 'border-slate-800 bg-slate-950/50 text-slate-400 hover:bg-slate-800/20'
                                                }`}
                                            >
                                                <input 
                                                    type="radio" 
                                                    name="exportType"
                                                    value="documents"
                                                    checked={exportType === 'documents'}
                                                    onChange={() => setExportType('documents')}
                                                    className="sr-only"
                                                />
                                                <FileText className={`h-5 w-5 mt-0.5 shrink-0 ${exportType === 'documents' ? 'text-cyan-400' : 'text-slate-500'}`} />
                                                <div>
                                                    <span className="font-semibold text-sm block">Documentos Completos</span>
                                                    <span className="text-xs text-slate-500 mt-1 block">
                                                        Um documento por linha contendo metadados e o texto completo extraído.
                                                    </span>
                                                </div>
                                            </label>

                                            <label 
                                                className={`flex items-start gap-3 p-4 rounded-xl border transition-all duration-200 cursor-pointer ${
                                                    exportType === 'chunks' 
                                                        ? 'border-cyan-500/50 bg-cyan-500/5 text-slate-100' 
                                                        : 'border-slate-800 bg-slate-950/50 text-slate-400 hover:bg-slate-800/20'
                                                }`}
                                            >
                                                <input 
                                                    type="radio" 
                                                    name="exportType"
                                                    value="chunks"
                                                    checked={exportType === 'chunks'}
                                                    onChange={() => setExportType('chunks')}
                                                    className="sr-only"
                                                />
                                                <Braces className={`h-5 w-5 mt-0.5 shrink-0 ${exportType === 'chunks' ? 'text-cyan-400' : 'text-slate-500'}`} />
                                                <div>
                                                    <span className="font-semibold text-sm block">Chunks (Fragmentos)</span>
                                                    <span className="text-xs text-slate-500 mt-1 block">
                                                        Fragmentos de texto otimizados com cálculo estimado de tokens e metadados.
                                                    </span>
                                                </div>
                                            </label>
                                        </div>
                                    </div>

                                    {/* Format Info */}
                                    <div className="flex gap-3 p-3 bg-slate-950/80 rounded-xl border border-slate-800/60">
                                        <AlertCircle className="h-5 w-5 text-slate-500 shrink-0 mt-0.5" />
                                        <Typography variant="small" className="text-slate-500 text-[11px] leading-relaxed">
                                            O dataset unificado será exportado no formato **JSON Lines (.jsonl)**, amplamente compatível com pipelines de Fine-Tuning e RAG.
                                        </Typography>
                                    </div>

                                    {/* Action Button */}
                                    <Button 
                                        type="submit" 
                                        disabled={selectedProjects.length === 0}
                                        className="w-full h-12 flex items-center justify-center gap-2"
                                    >
                                        <Download className="h-5 w-5" />
                                        Exportar {selectedProjects.length} {selectedProjects.length === 1 ? 'Projeto' : 'Projetos'}
                                    </Button>
                                </form>
                            </Card>
                        </div>
                    </div>
                )}

                {/* History Section */}
                {exports && exports.length > 0 && (
                    <Card className="border-slate-800 bg-slate-900/40">
                        <div className="flex items-center gap-3 mb-6">
                            <Database className="h-5 w-5 text-cyan-400" />
                            <Typography variant="h4" className="font-bold text-slate-100">
                                Histórico de Exports
                            </Typography>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-left text-sm text-slate-300">
                                <thead className="text-xs uppercase tracking-wider text-slate-500 border-b border-slate-800 bg-slate-950/20">
                                    <tr>
                                        <th className="py-3 px-4">Estrutura</th>
                                        <th className="py-3 px-4">Projetos Inclusos</th>
                                        <th className="py-3 px-4">Metadados</th>
                                        <th className="py-3 px-4">Gerado Por</th>
                                        <th className="py-3 px-4 text-right">Ação</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-800/60">
                                    {exports.map((item) => (
                                        <tr key={item.id} className="hover:bg-slate-800/10 transition-colors">
                                            <td className="py-4 px-4 font-semibold text-slate-200">
                                                <div className="flex items-center gap-2">
                                                    {item.type === 'documents' ? (
                                                        <FileText className="h-4 w-4 text-cyan-400" />
                                                    ) : (
                                                        <Braces className="h-4 w-4 text-emerald-400" />
                                                    )}
                                                    <span>{item.type === 'documents' ? 'Documentos' : 'Chunks'}</span>
                                                </div>
                                            </td>
                                            <td className="py-4 px-4 text-xs text-slate-400 max-w-xs truncate" title={item.project_names}>
                                                {item.project_names}
                                            </td>
                                            <td className="py-4 px-4 text-xs">
                                                <div className="flex flex-col gap-0.5">
                                                    <span>{item.record_count.toLocaleString()} registros</span>
                                                    <span className="text-slate-500">{formatBytes(item.file_size)}</span>
                                                </div>
                                            </td>
                                            <td className="py-4 px-4 text-xs">
                                                <div className="flex flex-col gap-0.5">
                                                    <span>{item.user?.name || 'Sistema'}</span>
                                                    <span className="text-slate-500">{formatDate(item.created_at)}</span>
                                                </div>
                                            </td>
                                            <td className="py-4 px-4 text-right">
                                                <a 
                                                    href={route('settings.datasets.download', item.id)}
                                                    download
                                                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-400 text-xs font-bold transition-all"
                                                >
                                                    <Download className="h-3.5 w-3.5" />
                                                    <span>Download</span>
                                                </a>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </Card>
                )}
            </div>
        </AuthenticatedLayout>
    );
}
