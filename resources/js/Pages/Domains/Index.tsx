import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import Typography from '@/Components/atoms/Typography';
import Card from '@/Components/atoms/Card';
import { Globe, CheckCircle2, XCircle } from 'lucide-react';
import useTranslation from '@/Hooks/useTranslation';

interface Domain {
    id: number;
    domain: string;
    allow_subdomains: boolean;
    project_id: number;
    project: { name: string };
    crawled_pages_count: number;
}

interface Props {
    domains: Domain[];
}

export default function Index({ domains }: Props) {
    const { t } = useTranslation();

    return (
        <AuthenticatedLayout
            header={
                <Typography variant="h1" className="font-bold text-slate-100">
                    {t('messages.domains')}
                </Typography>
            }
        >
            <Head title={t('messages.domains')} />

            <div className="space-y-6">
                <Card padding="none" className="overflow-hidden">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-slate-800/50">
                                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Domínio</th>
                                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Projeto</th>
                                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Subdomínios</th>
                                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Páginas Coletadas</th>
                                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">Ações</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-800">
                            {domains.map((domain) => (
                                <tr key={domain.id} className="hover:bg-slate-800/30 transition-colors">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="h-8 w-8 rounded-lg bg-indigo-500/10 flex items-center justify-center text-indigo-400">
                                                <Globe className="h-4 w-4" />
                                            </div>
                                            <span className="text-sm font-medium text-slate-200">{domain.domain}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="text-sm text-slate-400">{domain.project?.name || 'N/A'}</span>
                                    </td>
                                    <td className="px-6 py-4">
                                        {domain.allow_subdomains ? (
                                            <span className="inline-flex items-center gap-1.5 py-1 px-2.5 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-400">
                                                <CheckCircle2 className="h-3 w-3" /> Permitido
                                            </span>
                                        ) : (
                                            <span className="inline-flex items-center gap-1.5 py-1 px-2.5 rounded-full text-xs font-medium bg-slate-800 text-slate-500">
                                                <XCircle className="h-3 w-3" /> Bloqueado
                                            </span>
                                        )}
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="text-sm text-slate-400">{domain.crawled_pages_count} páginas</span>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <Link 
                                            href={route('projects.show', { project: domain.project_id, tab: 'domains' })} 
                                            className="text-xs font-bold text-cyan-400 hover:text-cyan-300"
                                        >
                                            Configurar
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                            {domains.length === 0 && (
                                <tr>
                                    <td colSpan={4} className="px-6 py-12 text-center text-slate-500">
                                        Nenhum domínio cadastrado.
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
