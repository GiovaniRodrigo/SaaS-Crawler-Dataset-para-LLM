import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import { Project } from '@/Types/project';
import Card from '@/Components/atoms/Card';
import SecondaryButton from '@/Components/SecondaryButton';

interface Props {
    project: Project;
    documents: {
        data: any[];
        links: any;
    };
}

export default function Index({ project, documents }: Props) {
    return (
        <AuthenticatedLayout
            header={
                <div className="flex justify-between items-center">
                    <h2 className="text-xl font-semibold leading-tight text-gray-800">
                        Documentos - {project.name}
                    </h2>
                    <Link href={route('projects.show', project.id)}>
                        <SecondaryButton>Voltar ao Projeto</SecondaryButton>
                    </Link>
                </div>
            }
        >
            <Head title="Documentos" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <Card>
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead>
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Título / URL</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Origem</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Data</th>
                                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Ações</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {documents.data.map((doc) => (
                                        <tr key={doc.id}>
                                            <td className="px-6 py-4">
                                                <div className="text-sm font-medium text-gray-900 truncate max-w-md">{doc.title || 'Sem título'}</div>
                                                <div className="text-xs text-gray-500 truncate max-w-md">{doc.url}</div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 uppercase">
                                                {doc.source}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                {new Date(doc.created_at).toLocaleDateString()}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                <Link href={route('documents.show', doc.id)} className="text-indigo-600 hover:text-indigo-900">
                                                    Ver Texto
                                                </Link>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </Card>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
