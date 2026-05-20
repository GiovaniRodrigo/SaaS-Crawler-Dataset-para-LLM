import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import Typography from '@/Components/atoms/Typography';
import Card from '@/Components/atoms/Card';
import Badge from '@/Components/atoms/Badge';
import { Activity, Clock, FileText, ArrowRight } from 'lucide-react';
import useTranslation from '@/Hooks/useTranslation';

interface Job {
    id: number;
    project: { name: string };
    status: string;
    total_pages_crawled: number;
    created_at: string;
}

interface Props {
    jobs: {
        data: Job[];
        links: any[];
    };
}

export default function Index({ jobs }: Props) {
    const { t } = useTranslation();

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'finished': return 'emerald';
            case 'running': return 'cyan';
            case 'failed': return 'rose';
            default: return 'slate';
        }
    };

    return (
        <AuthenticatedLayout
            header={
                <Typography variant="h1" className="font-bold text-slate-100">
                    Histórico de Jobs
                </Typography>
            }
        >
            <Head title="Jobs de Coleta" />

            <div className="space-y-6">
                <Card padding="none" className="overflow-hidden">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-slate-800/50">
                                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Projeto</th>
                                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Status</th>
                                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Páginas</th>
                                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Data</th>
                                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">Ações</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-800">
                            {jobs.data.map((job) => (
                                <tr key={job.id} className="hover:bg-slate-800/30 transition-colors">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="h-8 w-8 rounded-lg bg-cyan-500/10 flex items-center justify-center text-cyan-400">
                                                <Activity className="h-4 w-4" />
                                            </div>
                                            <span className="text-sm font-medium text-slate-200">{job.project.name}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <Badge variant={getStatusColor(job.status) as any}>{job.status}</Badge>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-2 text-sm text-slate-400">
                                            <FileText className="h-3 w-3" /> {job.total_pages_crawled}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-2 text-sm text-slate-400">
                                            <Clock className="h-3 w-3" /> {new Date(job.created_at).toLocaleDateString()}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <Link href={`#`} className="text-cyan-400 hover:text-cyan-300">
                                            <ArrowRight className="h-4 w-4" />
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </Card>
            </div>
        </AuthenticatedLayout>
    );
}
