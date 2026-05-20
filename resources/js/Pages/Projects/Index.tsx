import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import { Project } from '@/Types/project';
import Typography from '@/Components/atoms/Typography';
import Button from '@/Components/atoms/Button';
import ProjectCard from '@/Components/molecules/ProjectCard';
import { Plus, Search, Filter } from 'lucide-react';

interface Props {
    projects: Project[];
}

export default function Index({ projects }: Props) {
    return (
        <AuthenticatedLayout
            header={
                <div className="flex items-center justify-between">
                    <div>
                        <Typography variant="h1" className="font-bold text-slate-900 dark:text-white">
                            Projetos
                        </Typography>
                        <Typography variant="small" className="text-slate-500 dark:text-slate-400">
                            Gerencie seus workspaces de coleta e datasets para LLM.
                        </Typography>
                    </div>
                    <Link href={route('projects.create')} id="create-project-btn">
                        <Button icon={<Plus className="h-4 w-4" />}>
                            Novo Projeto
                        </Button>
                    </Link>
                </div>
            }
        >
            <Head title="Projetos" />

            <div className="mt-8 flex items-center justify-between gap-4">
                <div className="flex flex-1 items-center gap-3 rounded-xl border border-slate-200 bg-white px-4 py-2 text-slate-400 dark:border-slate-800 dark:bg-slate-900">
                    <Search className="h-4 w-4" />
                    <input 
                        type="text" 
                        placeholder="Buscar projetos pelo nome ou domínio..." 
                        className="w-full border-none bg-transparent p-0 text-sm focus:ring-0 text-slate-900 dark:text-white"
                    />
                </div>
                <Button variant="secondary" icon={<Filter className="h-4 w-4" />}>
                    Filtros
                </Button>
            </div>

            <div className="mt-8">
                {projects.length === 0 ? (
                    <div className="flex flex-col items-center justify-center rounded-3xl border-2 border-dashed border-slate-200 py-24 dark:border-slate-800">
                        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-50 text-slate-400 dark:bg-slate-900">
                            <Plus className="h-8 w-8" />
                        </div>
                        <Typography variant="h3" className="mt-6 font-bold">Nenhum projeto encontrado</Typography>
                        <Typography variant="body" className="mt-2 text-slate-500 dark:text-slate-400 max-w-sm text-center">
                            Crie seu primeiro projeto para começar a coletar dados e construir seu dataset personalizado.
                        </Typography>
                        <Link href={route('projects.create')} className="mt-8">
                            <Button>Criar primeiro projeto</Button>
                        </Link>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {projects.map((project) => (
                            <ProjectCard key={project.id} project={project} />
                        ))}
                    </div>
                )}
            </div>
        </AuthenticatedLayout>
    );
}
