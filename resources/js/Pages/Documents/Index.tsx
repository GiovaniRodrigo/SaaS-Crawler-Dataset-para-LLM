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
                <div className="flex items-center justify-between gap-4">
                    <div>
                        <p className="text-xs font-semibold uppercase text-cyan-300">{project.name}</p>
                        <h2 className="mt-1 text-2xl font-bold text-slate-100">Documentos</h2>
                    </div>
                    <Link href={route('projects.show', project.id)}>
                        <SecondaryButton>Voltar ao projeto</SecondaryButton>
                    </Link>
                </div>
            }
        >
            <Head title="Documentos" />

            <div className="py-10">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <Card>
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-slate-800">
                                <thead>
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium uppercase text-slate-400">Título / URL</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium uppercase text-slate-400">Origem</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium uppercase text-slate-400">Data</th>
                                        <th className="px-6 py-3 text-right text-xs font-medium uppercase text-slate-400">Ações</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-800">
                                    {documents.data.map((doc) => (
                                        <tr key={doc.id}>
                                            <td className="px-6 py-4">
                                                <div className="max-w-md truncate text-sm font-medium text-slate-100">{doc.title || 'Sem título'}</div>
                                                <div className="max-w-md truncate text-xs text-slate-400">{doc.url}</div>
                                            </td>
                                            <td className="whitespace-nowrap px-6 py-4 text-sm uppercase text-slate-400">
                                                {doc.source}
                                            </td>
                                            <td className="whitespace-nowrap px-6 py-4 text-sm text-slate-400">
                                                {new Date(doc.created_at).toLocaleDateString()}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                <Link href={route('documents.show', doc.id)} className="text-cyan-300 hover:text-cyan-200">
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
