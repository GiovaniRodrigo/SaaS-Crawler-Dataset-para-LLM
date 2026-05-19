import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { Project } from '@/Types/project';
import Card from '@/Components/atoms/Card';
import Typography from '@/Components/atoms/Typography';
import Badge from '@/Components/atoms/Badge';
import Button from '@/Components/atoms/Button';
import useTranslation from '@/Hooks/useTranslation';
import { CheckSquare, XSquare, Link as LinkIcon, FileText, CheckCircle } from 'lucide-react';
import { cn } from '@/utils';
import { useState } from 'react';

interface Document {
    id: number;
    title: string | null;
    url: string;
    source: string;
    quality_score: number | null;
    project?: Project;
    created_at: string;
}

interface Props {
    project: Project | null;
    documents: {
        data: Document[];
        links: any;
        current_page: number;
    };
}

export default function Review({ project, documents }: Props) {
    const { t } = useTranslation();
    const [selectedIds, setSelectedIds] = useState<number[]>([]);
    
    const { post: postApprove, processing: approving } = useForm();
    const { post: postReject, processing: rejecting } = useForm();
    const { post: postBulkApprove, processing: bulkApproving } = useForm({
        ids: [] as number[]
    });

    const handleApprove = (id: number) => {
        postApprove(route('documents.approve', id));
    };

    const handleReject = (id: number) => {
        postReject(route('documents.reject', id));
    };

    const handleBulkApprove = () => {
        if (selectedIds.length === 0) return;
        postBulkApprove(route('documents.bulk-approve', { ids: selectedIds }), {
            onSuccess: () => setSelectedIds([])
        });
    };

    const toggleSelectAll = () => {
        if (selectedIds.length === documents.data.length) {
            setSelectedIds([]);
        } else {
            setSelectedIds(documents.data.map(d => d.id));
        }
    };

    const toggleSelect = (id: number) => {
        if (selectedIds.includes(id)) {
            setSelectedIds(selectedIds.filter(i => i !== id));
        } else {
            setSelectedIds([...selectedIds, id]);
        }
    };

    return (
        <AuthenticatedLayout
            header={
                <div className="flex items-center justify-between gap-4">
                    <div>
                        {project && (
                            <Typography variant="caption" className="font-semibold uppercase text-cyan-300">
                                {project.name}
                            </Typography>
                        )}
                        <Typography variant="h1" className="mt-1 font-bold text-slate-100">
                            {t('messages.review_documents')}
                        </Typography>
                    </div>
                    {selectedIds.length > 0 && (
                        <Button 
                            variant="primary" 
                            onClick={handleBulkApprove}
                            disabled={bulkApproving}
                            className="gap-2"
                        >
                            <CheckCircle className="h-4 w-4" />
                            Aprovar Selecionados ({selectedIds.length})
                        </Button>
                    )}
                </div>
            }
        >
            <Head title="Revisão de Documentos" />

            <div className="py-10">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    {documents.data.length > 0 ? (
                        <Card padding="none" className="overflow-hidden border-slate-800 bg-slate-900/40">
                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-slate-800">
                                    <thead>
                                        <tr className="bg-slate-950/50">
                                            <th className="px-6 py-4 text-left w-10">
                                                <input 
                                                    type="checkbox" 
                                                    checked={selectedIds.length === documents.data.length && documents.data.length > 0}
                                                    onChange={toggleSelectAll}
                                                    className="rounded border-slate-700 bg-slate-800 text-cyan-500 focus:ring-cyan-500/20"
                                                />
                                            </th>
                                            <th className="px-6 py-4 text-left">
                                                <Typography variant="caption" className="font-bold uppercase tracking-wider text-slate-500">
                                                    {t('messages.title_url')}
                                                </Typography>
                                            </th>
                                            <th className="px-6 py-4 text-left">
                                                <Typography variant="caption" className="font-bold uppercase tracking-wider text-slate-500">
                                                    Score
                                                </Typography>
                                            </th>
                                            <th className="px-6 py-4 text-left">
                                                <Typography variant="caption" className="font-bold uppercase tracking-wider text-slate-500">
                                                    {t('messages.source')}
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
                                                    <input 
                                                        type="checkbox" 
                                                        checked={selectedIds.includes(doc.id)}
                                                        onChange={() => toggleSelect(doc.id)}
                                                        className="rounded border-slate-700 bg-slate-800 text-cyan-500 focus:ring-cyan-500/20"
                                                    />
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="flex flex-col gap-1">
                                                        <Link href={route('documents.show', doc.id)} className="hover:underline">
                                                            <Typography variant="body" className="max-w-md truncate font-bold text-slate-100 group-hover:text-cyan-400 transition-colors">
                                                                {doc.title || t('messages.no_title')}
                                                            </Typography>
                                                        </Link>
                                                        <div className="flex items-center gap-2 text-slate-500 group-hover:text-slate-400 transition-colors">
                                                            <LinkIcon className="h-3 w-3" />
                                                            <span className="max-w-md truncate text-xs">{doc.url}</span>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    {doc.quality_score !== null ? (
                                                        <Badge variant={doc.quality_score >= 80 ? 'emerald' : doc.quality_score >= 50 ? 'amber' : 'rose'}>
                                                            {Math.round(doc.quality_score)}%
                                                        </Badge>
                                                    ) : (
                                                        <span className="text-slate-600 text-xs">-</span>
                                                    )}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="flex flex-col">
                                                        <Badge variant={doc.source === 'crawler' ? 'cyan' : 'indigo'}>
                                                            {doc.source}
                                                        </Badge>
                                                        {doc.project && !project && (
                                                            <span className="text-[10px] text-slate-500 mt-1">{doc.project.name}</span>
                                                        )}
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-right">
                                                    <div className="flex items-center justify-end gap-2">
                                                        <Button 
                                                            variant="ghost" 
                                                            size="sm" 
                                                            onClick={() => handleApprove(doc.id)}
                                                            disabled={approving || rejecting}
                                                            className="text-emerald-500 hover:bg-emerald-500/10 p-2"
                                                        >
                                                            <CheckSquare className="h-5 w-5" />
                                                        </Button>
                                                        <Button 
                                                            variant="ghost" 
                                                            size="sm" 
                                                            onClick={() => handleReject(doc.id)}
                                                            disabled={approving || rejecting}
                                                            className="text-rose-500 hover:bg-rose-500/10 p-2"
                                                        >
                                                            <XSquare className="h-5 w-5" />
                                                        </Button>
                                                    </div>
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
                                <CheckCircle className="h-10 w-10" />
                            </div>
                            <Typography variant="h3" className="font-bold text-slate-100">
                                Tudo limpo por aqui!
                            </Typography>
                            <Typography variant="body" className="mt-2 text-slate-500 max-w-sm mx-auto">
                                Todos os documentos foram revisados ou ainda não há novos documentos pendentes.
                            </Typography>
                        </div>
                    )}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
