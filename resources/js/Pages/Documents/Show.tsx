import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import Card from '@/Components/atoms/Card';
import SecondaryButton from '@/Components/SecondaryButton';

interface Props {
    document: any;
}

export default function Show({ document }: Props) {
    return (
        <AuthenticatedLayout
            header={
                <div className="flex justify-between items-center">
                    <h2 className="text-xl font-semibold leading-tight text-gray-800">
                        Documento: {document.title || 'Sem título'}
                    </h2>
                    <Link href={route('projects.documents.index', document.project_id)}>
                        <SecondaryButton>Voltar à Lista</SecondaryButton>
                    </Link>
                </div>
            }
        >
            <Head title="Visualizar Documento" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <Card>
                        <div className="mb-6">
                            <span className="text-gray-500 font-semibold">URL:</span>
                            <a href={document.url} target="_blank" className="ml-2 text-blue-600 hover:underline">{document.url}</a>
                        </div>
                        <div className="bg-gray-50 p-6 rounded-lg whitespace-pre-wrap font-serif text-gray-800 leading-relaxed">
                            {document.text}
                        </div>
                    </Card>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
