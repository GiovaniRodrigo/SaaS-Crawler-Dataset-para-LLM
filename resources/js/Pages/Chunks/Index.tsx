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
                <div className="flex justify-between items-center">
                    <h2 className="text-xl font-semibold leading-tight text-gray-800">
                        Chunks - {project.name}
                    </h2>
                    <Link href={route('projects.show', project.id)}>
                        <SecondaryButton>Voltar ao Projeto</SecondaryButton>
                    </Link>
                </div>
            }
        >
            <Head title="Chunks" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="space-y-6">
                        {chunks.data.map((chunk) => (
                            <Card key={chunk.id}>
                                <div className="flex justify-between items-start mb-4">
                                    <div className="text-sm">
                                        <span className="font-semibold text-gray-500">Doc:</span>
                                        <Link href={route('documents.show', chunk.document_id)} className="ml-2 text-blue-600 hover:underline">
                                            {chunk.document.title || chunk.document.url}
                                        </Link>
                                    </div>
                                    <div className="text-xs bg-gray-100 px-2 py-1 rounded">
                                        Index: {chunk.chunk_index} | Est. Tokens: {chunk.tokens_estimated}
                                    </div>
                                </div>
                                <div className="bg-gray-50 p-4 rounded text-sm text-gray-700 whitespace-pre-wrap">
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
