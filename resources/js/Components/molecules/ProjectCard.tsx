import { Link } from '@inertiajs/react';
import { Project } from '@/Types/project';
import Card from '@/Components/atoms/Card';
import Typography from '@/Components/atoms/Typography';
import Badge from '@/Components/atoms/Badge';
import Button from '@/Components/atoms/Button';
import { FolderKanban, ArrowRight, Settings } from 'lucide-react';

interface ProjectCardProps {
    project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
    return (
        <Card className="group relative border-slate-800 bg-slate-900/40 hover:border-cyan-500/50 transition-all duration-300 card-hover">
            <div className="flex items-start justify-between">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-cyan-500/10 text-cyan-400">
                    <FolderKanban className="h-6 w-6" />
                </div>
                <div className="flex items-center gap-2">
                    <Badge variant={project.is_active ? 'emerald' : 'slate'}>
                        {project.is_active ? 'Ativo' : 'Inativo'}
                    </Badge>
                </div>
            </div>

            <div className="mt-4">
                <Link href={route('projects.show', project.id)} className="block">
                    <Typography variant="h3" className="font-bold text-slate-100 group-hover:text-cyan-400 transition-colors">
                        {project.name}
                    </Typography>
                </Link>
                <Typography variant="small" className="mt-2 line-clamp-2 text-slate-500">
                    {project.description || 'Nenhuma descrição fornecida para este projeto.'}
                </Typography>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-4 border-t border-slate-800 pt-4">
                <div>
                    <Typography variant="caption" className="text-slate-500 font-bold uppercase tracking-wider text-[10px]">Documentos</Typography>
                    <Typography variant="body" className="font-bold text-slate-200">
                        {project.documents_count || 0}
                    </Typography>
                </div>
                <div>
                    <Typography variant="caption" className="text-slate-500 font-bold uppercase tracking-wider text-[10px]">Chunks</Typography>
                    <Typography variant="body" className="font-bold text-slate-200">
                        {project.chunks_count || 0}
                    </Typography>
                </div>
            </div>

            <div className="mt-6 flex items-center justify-between">
                <Link href={route('projects.show', project.id)}>
                    <Button variant="ghost" size="sm" className="group/btn gap-1 px-0 hover:bg-transparent text-cyan-500 hover:text-cyan-300 transition-colors">
                        Abrir projeto <ArrowRight className="h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
                    </Button>
                </Link>
                <Link href={route('projects.edit', project.id)}>
                    <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg text-slate-500 hover:text-slate-200">
                        <Settings className="h-4 w-4" />
                    </Button>
                </Link>
            </div>
        </Card>
    );
}
