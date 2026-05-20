import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import Typography from '@/Components/atoms/Typography';
import Card from '@/Components/atoms/Card';
import { Braces, FileText, Globe } from 'lucide-react';
import useTranslation from '@/Hooks/useTranslation';

interface Chunk {
    id: number;
    text: string;
    tokens_estimated: number;
    document: { title: string, url: string };
    project: { name: string };
    created_at: string;
}

interface Props {
    chunks: {
        data: Chunk[];
        links: any[];
    };
}

export default function IndexAll({ chunks }: Props) {
    const { t } = useTranslation();

    return (
        <AuthenticatedLayout
            header={
                <Typography variant="h1" className="font-bold text-slate-100">
                    {t('messages.chunks')}
                </Typography>
            }
        >
            <Head title="Fragmentos (Chunks)" />

            <div className="space-y-6">
                <Card padding="none" className="overflow-hidden">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-slate-800/50">
                                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Conteúdo (Preview)</th>
                                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Origem</th>
                                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Tokens</th>
                                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">Ações</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-800">
                            {chunks.data.map((chunk) => (
                                <tr key={chunk.id} className="hover:bg-slate-800/30 transition-colors">
                                    <td className="px-6 py-4 max-w-lg">
                                        <div className="flex flex-col">
                                            <p className="text-sm text-slate-300 line-clamp-2 italic font-serif">"{chunk.text}"</p>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex flex-col">
                                            <span className="text-xs font-medium text-slate-400 flex items-center gap-1">
                                                <FileText className="h-3 w-3" /> {chunk.document.title || 'Doc sem título'}
                                            </span>
                                            <span className="text-[10px] text-slate-500 truncate flex items-center gap-1">
                                                <Globe className="h-2 w-2" /> {chunk.project.name}
                                            </span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                                            {chunk.tokens_estimated}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <button className="text-xs font-bold text-cyan-400 hover:text-cyan-300">Explorar</button>
                                    </td>
                                </tr>
                            ))}
                            {chunks.data.length === 0 && (
                                <tr>
                                    <td colSpan={4} className="px-6 py-12 text-center text-slate-500">
                                        Nenhum fragmento encontrado. Execute um Job de Coleta para gerar chunks.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </Card>
            </div>
        </AuthenticatedLayout>
    );
}
