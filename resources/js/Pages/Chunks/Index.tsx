import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import { Project } from '@/Types/project';
import Card from '@/Components/atoms/Card';
import SecondaryButton from '@/Components/SecondaryButton';

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
                <div className="flex items-center justify-between gap-4">
                    <div>
                        <p className="text-xs font-semibold uppercase text-cyan-300">{project.name}</p>
                        <h2 className="mt-1 text-2xl font-bold text-slate-100">Chunks</h2>
                    </div>
                    <Link href={route('projects.show', project.id)}>
                        <SecondaryButton>Voltar ao projeto</SecondaryButton>
                    </Link>
                </div>
            }
        >
            <Head title="Chunks" />

            <div className="py-10">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="space-y-6">
                        {chunks.data.map((chunk) => (
                            <Card key={chunk.id}>
                                <div className="flex justify-between items-start mb-4">
                                    <div className="text-sm">
                                        <span className="font-semibold text-slate-400">Doc:</span>
                                        <Link href={route('documents.show', chunk.document_id)} className="ml-2 text-cyan-300 hover:text-cyan-200">
                                            {chunk.document.title || chunk.document.url}
                                        </Link>
                                    </div>
                                    <div className="rounded bg-slate-800 px-2 py-1 text-xs text-slate-300">
                                        Index: {chunk.chunk_index} | Est. Tokens: {chunk.tokens_estimated}
                                    </div>
                                </div>
                                <div className="whitespace-pre-wrap rounded border border-slate-800 bg-slate-900/70 p-4 text-sm text-slate-200">
                                    {chunk.text}
                                </div>
                            </Card>
                        ))}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
