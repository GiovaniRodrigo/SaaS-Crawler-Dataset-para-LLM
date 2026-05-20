import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import Typography from '@/Components/atoms/Typography';
import Card from '@/Components/atoms/Card';
import Badge from '@/Components/atoms/Badge';
import { FileText, Globe, Search } from 'lucide-react';
import useTranslation from '@/Hooks/useTranslation';

interface Document {
    id: number;
    title: string;
    url: string;
    project_id: number;
    project: { name: string };
    status: string;
    quality_score: number;
    created_at: string;
}

interface Props {
    documents: {
        data: Document[];
        links: any[];
    };
}

export default function IndexAll({ documents }: Props) {
    const { t } = useTranslation();

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'approved': return 'emerald';
            case 'pending_review': return 'amber';
            case 'rejected': return 'rose';
            default: return 'slate';
        }
    };

    return (
        <AuthenticatedLayout
            header={
                <div className="flex items-center justify-between w-full">
                    <Typography variant="h1" className="font-bold text-slate-100">
                        {t('messages.documents')}
                    </Typography>
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
                        <input 
                            type="text" 
                            placeholder="Buscar documentos..." 
                            className="bg-slate-800 border-none rounded-xl pl-10 pr-4 py-2 text-sm text-slate-200 focus:ring-1 focus:ring-cyan-500 w-64"
                        />
                    </div>
                </div>
            }
        >
            <Head title="Documentos Coletados" />

            <div className="space-y-6">
                <Card padding="none" className="overflow-hidden">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-slate-800/50">
                                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Documento</th>
                                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Projeto</th>
                                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Status</th>
                                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Qualidade</th>
                                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">Ações</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-800">
                            {documents.data.map((doc) => (
                                <tr key={doc.id} className="hover:bg-slate-800/30 transition-colors">
                                    <td className="px-6 py-4 max-w-md">
                                        <div className="flex flex-col">
                                            <span className="text-sm font-medium text-slate-200 truncate">{doc.title || 'Sem título'}</span>
                                            <span className="text-xs text-slate-500 truncate flex items-center gap-1">
                                                <Globe className="h-3 w-3" /> {doc.url}
                                            </span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="text-sm text-slate-400">{doc.project.name}</span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <Badge variant={getStatusColor(doc.status) as any}>{doc.status}</Badge>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-2">
                                            <div className="w-12 h-1.5 bg-slate-800 rounded-full overflow-hidden">
                                                <div 
                                                    className="h-full bg-cyan-500" 
                                                    style={{ width: `${doc.quality_score}%` }} 
                                                />
                                            </div>
                                            <span className="text-xs font-bold text-slate-300">{Math.round(doc.quality_score)}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <Link href={route('projects.documents.show', { project: doc.project_id, document: doc.id })} className="text-xs font-bold text-cyan-400 hover:text-cyan-300">Ver</Link>
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
