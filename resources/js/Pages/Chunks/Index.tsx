import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import { Project } from '@/Types/project';
import Card from '@/Components/atoms/Card';
import Typography from '@/Components/atoms/Typography';
import Button from '@/Components/atoms/Button';
import { ChevronLeft, Braces, FileText } from 'lucide-react';

interface Props {
    project: Project;
    chunks: {
        data: any[];
        links: any;
    };
}

export default function Index({ project, chunks }: Props) {
    return (
        <AuthenticatedLayout
            header={
                <div className="flex items-center justify-between">
                    <div className="space-y-1">
                        <div className="flex items-center gap-2">
                            <Link href={route('projects.show', project.id)} className="text-slate-500 hover:text-cyan-400 transition-colors">
                                <Typography variant="caption">{project.name}</Typography>
                            </Link>
                            <span className="text-slate-700 text-[10px]">/</span>
                            <Typography variant="caption" className="text-cyan-500 font-bold">FRAGMENTOS</Typography>
                        </div>
                        <Typography variant="h1" className="font-bold text-slate-100">
                            Chunks do Projeto
                        </Typography>
                    </div>
                    <Link href={route('projects.show', project.id)}>
                        <Button variant="secondary" icon={<ChevronLeft className="h-4 w-4" />}>
                            Voltar ao Projeto
                        </Button>
                    </Link>
                </div>
            }
        >
            <Head title={`Chunks - ${project.name}`} />

            <div className="max-w-5xl mx-auto space-y-6">
                {chunks.data.map((chunk) => (
                    <Card key={chunk.id} className="border-slate-800/50 bg-slate-900/40">
                        <div className="flex justify-between items-start mb-4 pb-4 border-b border-slate-800/50">
                            <div className="flex items-center gap-3">
                                <div className="p-2 rounded-lg bg-slate-800/50 text-slate-400">
                                    <FileText className="h-4 w-4" />
                                </div>
                                <div className="flex flex-col">
                                    <Typography variant="caption" className="text-slate-500">Documento de Origem</Typography>
                                    <Link href={route('documents.show', chunk.document_id)} className="text-sm font-bold text-slate-200 hover:text-cyan-400 transition-colors">
                                        {chunk.document?.title || 'Documento sem título'}
                                    </Link>
                                </div>
                            </div>
                            <div className="flex gap-2">
                                <span className="px-2 py-1 rounded bg-slate-950 text-[10px] font-bold text-slate-500 uppercase border border-slate-800">
                                    Index: {chunk.chunk_index}
                                </span>
                                <span className="px-2 py-1 rounded bg-cyan-500/10 text-[10px] font-bold text-cyan-400 uppercase border border-cyan-500/20">
                                    {chunk.tokens_estimated} TOKENS
                                </span>
                            </div>
                        </div>
                        <div className="relative group">
                            <div className="absolute -left-2 top-0 bottom-0 w-1 bg-cyan-500/30 rounded-full group-hover:bg-cyan-500 transition-colors" />
                            <Typography variant="body" className="text-slate-300 leading-relaxed font-serif italic pl-4">
                                "{chunk.text}"
                            </Typography>
                        </div>
                    </Card>
                ))}

                {chunks.data.length === 0 && (
                    <div className="text-center py-20 border-2 border-dashed border-slate-800 rounded-3xl">
                        <div className="mx-auto w-16 h-16 rounded-2xl bg-slate-900 flex items-center justify-center text-slate-700 mb-4">
                            <Braces className="h-8 w-8" />
                        </div>
                        <Typography variant="body" className="text-slate-500">
                            Nenhum fragmento gerado para este projeto ainda.
                        </Typography>
                    </div>
                )}
            </div>
        </AuthenticatedLayout>
    );
}
