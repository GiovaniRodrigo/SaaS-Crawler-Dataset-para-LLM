import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import SecondaryButton from '@/Components/SecondaryButton';
import Card from '@/Components/atoms/Card';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Project } from '@/Types/project';
import { Head, Link, useForm } from '@inertiajs/react';
import { FormEvent } from 'react';

interface Props {
    project: Project;
}

export default function Edit({ project }: Props) {
    const { data, setData, patch, processing, errors } = useForm({
        name: project.name,
        description: project.description || '',
    });

    const submit = (e: FormEvent) => {
        e.preventDefault();
        patch(route('projects.update', project.id));
    };

    return (
        <AuthenticatedLayout
            header={
                <div className="flex items-center justify-between gap-4">
                    <div>
                        <p className="text-xs font-semibold uppercase text-cyan-300">Projeto</p>
                        <h2 className="mt-1 text-2xl font-bold text-slate-100">Editar {project.name}</h2>
                    </div>
                    <Link href={route('projects.show', project.id)}>
                        <SecondaryButton>Voltar ao projeto</SecondaryButton>
                    </Link>
                </div>
            }
        >
            <Head title={`Editar ${project.name}`} />

            <div className="py-10">
                <div className="mx-auto max-w-3xl sm:px-6 lg:px-8">
                    <Card>
                        <form onSubmit={submit}>
                            <div>
                                <InputLabel htmlFor="name" value="Nome do projeto" />
                                <input
                                    id="name"
                                    type="text"
                                    name="name"
                                    value={data.name}
                                    className="mt-1 block w-full rounded-md border-slate-700 bg-slate-950 text-slate-100 shadow-sm placeholder:text-slate-500 focus:border-cyan-400 focus:ring-cyan-400"
                                    onChange={(e) => setData('name', e.target.value)}
                                />
                                <InputError message={errors.name} className="mt-2" />
                            </div>

                            <div className="mt-4">
                                <InputLabel htmlFor="description" value="Descrição" />
                                <textarea
                                    id="description"
                                    name="description"
                                    value={data.description}
                                    className="mt-1 block w-full rounded-md border-slate-700 bg-slate-950 text-slate-100 shadow-sm placeholder:text-slate-500 focus:border-cyan-400 focus:ring-cyan-400"
                                    rows={4}
                                    onChange={(e) => setData('description', e.target.value)}
                                />
                                <InputError message={errors.description} className="mt-2" />
                            </div>

                            <div className="mt-6 flex items-center justify-end">
                                <PrimaryButton disabled={processing}>
                                    Salvar alterações
                                </PrimaryButton>
                            </div>
                        </form>
                    </Card>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
