import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import { Project } from '@/Types/project';
import Card from '@/Components/atoms/Card';
import PrimaryButton from '@/Components/PrimaryButton';

interface Props {
    projects: Project[];
}

export default function Index({ projects }: Props) {
    return (
        <AuthenticatedLayout
            header={
                <div className="flex justify-between items-center">
                    <h2 className="text-xl font-semibold leading-tight text-gray-800">
                        Projetos
                    </h2>
                    <Link href={route('projects.create')}>
                        <PrimaryButton>Novo Projeto</PrimaryButton>
                    </Link>
                </div>
            }
        >
            <Head title="Projetos" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    {projects.length === 0 ? (
                        <Card className="text-center py-12">
                            <p className="text-gray-500">Nenhum projeto encontrado.</p>
                            <Link href={route('projects.create')} className="mt-4 inline-block text-blue-600 hover:underline">
                                Criar seu primeiro projeto
                            </Link>
                        </Card>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {projects.map((project) => (
                                <Card key={project.id} className="hover:shadow-md transition-shadow">
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <h3 className="text-lg font-bold text-gray-900">
                                                <Link href={route('projects.show', project.id)} className="hover:text-blue-600">
                                                    {project.name}
                                                </Link>
                                            </h3>
                                            <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                                                {project.description || 'Sem descrição.'}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="mt-6 flex justify-between items-center text-sm text-gray-500">
                                        <div>
                                            <span className="font-semibold">{project.documents_count || 0}</span> Docs
                                        </div>
                                        <div>
                                            <span className="font-semibold">{project.chunks_count || 0}</span> Chunks
                                        </div>
                                        <div>
                                            <Link href={route('projects.edit', project.id)} className="text-blue-600 hover:underline">
                                                Editar
                                            </Link>
                                        </div>
                                    </div>
                                </Card>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
