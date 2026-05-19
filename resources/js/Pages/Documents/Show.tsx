import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import Card from '@/Components/atoms/Card';
import Typography from '@/Components/atoms/Typography';
import Badge from '@/Components/atoms/Badge';
import Button from '@/Components/atoms/Button';
import useTranslation from '@/Hooks/useTranslation';
import { Link as LinkIcon, Calendar, Database, FileText, Globe } from 'lucide-react';

interface Props {
    document: {
        id: number;
        project_id: number;
        title: string | null;
        url: string;
        text: string;
        source: string;
        language: string;
        content_hash: string;
        created_at: string;
    };
}

export default function Show({ document }: Props) {
    const { t } = useTranslation();

    const wordCount = document.text ? document.text.split(/\s+/).length : 0;
    const charCount = document.text ? document.text.length : 0;

    return (
        <AuthenticatedLayout
            header={
                <div className="flex items-center justify-between gap-4">
                    <div className="flex flex-col gap-1">
                        <div className="flex items-center gap-2">
                            <Typography variant="caption" className="font-semibold uppercase text-cyan-300">
                                {t('messages.document')}
                            </Typography>
                            <Badge variant="cyan">{document.source}</Badge>
                        </div>
                        <Typography variant="h1" className="font-bold text-slate-100 max-w-2xl truncate">
                            {document.title || t('messages.no_title')}
                        </Typography>
                    </div>
                    <Link href={route('projects.documents.index', document.project_id)}>
                        <Button variant="secondary">
                            {t('messages.back_to_list')}
                        </Button>
                    </Link>
                </div>
            }
        >
            <Head title={t('messages.view_document')} />

            <div className="py-10">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8 space-y-8">
                    {/* Metadata Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        <Card className="flex items-center gap-4 bg-slate-900/40 border-slate-800">
                            <div className="p-2 rounded-lg bg-slate-800 text-slate-400">
                                <LinkIcon className="h-4 w-4" />
                            </div>
                            <div className="flex flex-col">
                                <Typography variant="caption" className="text-slate-500 uppercase font-bold tracking-wider text-[10px]">URL</Typography>
                                <a href={document.url} target="_blank" className="text-xs text-cyan-400 truncate max-w-[150px] hover:text-cyan-300 transition-colors">{document.url}</a>
                            </div>
                        </Card>
                        <Card className="flex items-center gap-4 bg-slate-900/40 border-slate-800">
                            <div className="p-2 rounded-lg bg-slate-800 text-slate-400">
                                <Calendar className="h-4 w-4" />
                            </div>
                            <div className="flex flex-col">
                                <Typography variant="caption" className="text-slate-500 uppercase font-bold tracking-wider text-[10px]">{t('messages.date')}</Typography>
                                <Typography variant="small" className="text-slate-200">{new Date(document.created_at).toLocaleDateString()}</Typography>
                            </div>
                        </Card>
                        <Card className="flex items-center gap-4 bg-slate-900/40 border-slate-800">
                            <div className="p-2 rounded-lg bg-slate-800 text-slate-400">
                                <Globe className="h-4 w-4" />
                            </div>
                            <div className="flex flex-col">
                                <Typography variant="caption" className="text-slate-500 uppercase font-bold tracking-wider text-[10px]">Idioma</Typography>
                                <Typography variant="small" className="text-slate-200">{document.language || 'N/A'}</Typography>
                            </div>
                        </Card>
                        <Card className="flex items-center gap-4 bg-slate-900/40 border-slate-800">
                            <div className="p-2 rounded-lg bg-slate-800 text-slate-400">
                                <Database className="h-4 w-4" />
                            </div>
                            <div className="flex flex-col">
                                <Typography variant="caption" className="text-slate-500 uppercase font-bold tracking-wider text-[10px]">Tamanho</Typography>
                                <Typography variant="small" className="text-slate-200">{wordCount} palavras</Typography>
                            </div>
                        </Card>
                    </div>

                    {/* Content Section */}
                    <Card className="border-slate-800 bg-slate-900/40 shadow-2xl relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-6 opacity-5 pointer-events-none">
                            <FileText className="h-32 w-32 text-cyan-500" />
                        </div>
                        <div className="relative z-10">
                            <div className="flex items-center justify-between mb-6 border-b border-slate-800 pb-4">
                                <Typography variant="h3" className="font-bold text-slate-100">Conteúdo Extraído</Typography>
                                <Typography variant="caption" className="text-slate-500 font-mono text-[10px]">
                                    HASH: {document.content_hash?.substring(0, 16)}...
                                </Typography>
                            </div>
                            <div className="whitespace-pre-wrap rounded-2xl border border-slate-800 bg-slate-950/80 p-8 font-mono text-sm leading-relaxed text-slate-300 selection:bg-cyan-500/30">
                                {document.text}
                            </div>
                        </div>
                    </Card>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
