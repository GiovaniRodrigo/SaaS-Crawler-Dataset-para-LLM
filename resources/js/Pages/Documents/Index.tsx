import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import { Project } from '@/Types/project';
import Card from '@/Components/atoms/Card';
import Typography from '@/Components/atoms/Typography';
import Badge from '@/Components/atoms/Badge';
import Button from '@/Components/atoms/Button';
import useTranslation from '@/Hooks/useTranslation';
import { FileText, ArrowRight, Link as LinkIcon, Info } from 'lucide-react';
import { cn } from '@/utils';

interface Document {
    id: number;
    title: string | null;
    url: string;
    source: string;
    created_at: string;
}

interface Props {
    project: Project;
    documents: {
        data: Document[];
        links: any;
    };
}

export default function Index({ project, documents }: Props) {
    const { t } = useTranslation();

    return (
        <AuthenticatedLayout
            header={
                <div className="flex items-center justify-between gap-4">
                    <div>
                        <Typography variant="caption" className="font-semibold uppercase text-cyan-300">
                            {project.name}
                        </Typography>
                        <Typography variant="h1" className="mt-1 font-bold text-slate-100">
                            {t('messages.documents')}
                        </Typography>
                    </div>
                    <Link href={route('projects.show', project.id)}>
                        <Button variant="secondary">
                            {t('messages.back_to_project')}
                        </Button>
                    </Link>
                </div>
            }
        >
            <Head title={t('messages.documents')} />

            <div className="py-10">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    {documents.data.length > 0 ? (
                        <Card padding="none" className="overflow-hidden border-slate-800 bg-slate-900/40">
                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-slate-800">
                                    <thead>
                                        <tr className="bg-slate-950/50">
                                            <th className="px-6 py-4 text-left">
                                                <Typography variant="caption" className="font-bold uppercase tracking-wider text-slate-500">
                                                    {t('messages.title_url')}
                                                </Typography>
                                            </th>
                                            <th className="px-6 py-4 text-left">
                                                <Typography variant="caption" className="font-bold uppercase tracking-wider text-slate-500">
                                                    {t('messages.source')}
                                                </Typography>
                                            </th>
                                            <th className="px-6 py-4 text-left">
                                                <Typography variant="caption" className="font-bold uppercase tracking-wider text-slate-500">
                                                    {t('messages.date')}
                                                </Typography>
                                            </th>
                                            <th className="px-6 py-4 text-right">
                                                <Typography variant="caption" className="font-bold uppercase tracking-wider text-slate-500">
                                                    {t('messages.actions')}
                                                </Typography>
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-800">
                                        {documents.data.map((doc) => (
                                            <tr key={doc.id} className="group hover:bg-slate-800/30 transition-colors">
                                                <td className="px-6 py-4">
                                                    <div className="flex flex-col gap-1">
                                                        <Typography variant="body" className="max-w-md truncate font-bold text-slate-100 group-hover:text-cyan-400 transition-colors">
                                                            {doc.title || t('messages.no_title')}
                                                        </Typography>
                                                        <div className="flex items-center gap-2 text-slate-500 group-hover:text-slate-400 transition-colors">
                                                            <LinkIcon className="h-3 w-3" />
                                                            <span className="max-w-md truncate text-xs">{doc.url}</span>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <Badge variant={doc.source === 'crawler' ? 'cyan' : 'indigo'}>
                                                        {doc.source}
                                                    </Badge>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <Typography variant="small" className="text-slate-400">
                                                        {new Date(doc.created_at).toLocaleDateString()}
                                                    </Typography>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-right">
                                                    <Link href={route('documents.show', doc.id)}>
                                                        <Button variant="ghost" size="sm" className="group/btn gap-1 hover:bg-cyan-500/10 text-cyan-500">
                                                            {t('messages.view_text')}
                                                            <ArrowRight className="h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
                                                        </Button>
                                                    </Link>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </Card>
                    ) : (
                        <div className="text-center py-24 border-2 border-dashed border-slate-800 rounded-3xl bg-slate-900/20 backdrop-blur">
                            <div className="mx-auto w-20 h-20 rounded-2xl bg-slate-900 flex items-center justify-center text-slate-700 mb-6 shadow-xl">
                                <FileText className="h-10 w-10" />
                            </div>
                            <Typography variant="h3" className="font-bold text-slate-100">
                                {t('messages.no_documents_found')}
                            </Typography>
                            <Typography variant="body" className="mt-2 text-slate-500 max-w-sm mx-auto">
                                {t('messages.explore_documents')}
                            </Typography>
                        </div>
                    )}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
