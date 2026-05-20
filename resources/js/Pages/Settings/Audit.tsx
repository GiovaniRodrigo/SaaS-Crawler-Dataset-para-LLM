import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import Typography from '@/Components/atoms/Typography';
import Card from '@/Components/atoms/Card';
import Badge from '@/Components/atoms/Badge';
import { ShieldCheck, User, Monitor, Globe } from 'lucide-react';

interface AuditLog {
    id: number;
    action: string;
    description: string;
    created_at: string;
    ip_address: string;
    project?: { name: string };
}

interface Props {
    logs: {
        data: AuditLog[];
        links: any[];
    };
}

export default function Audit({ logs }: Props) {
    const getActionColor = (action: string) => {
        if (action.includes('approved')) return 'emerald';
        if (action.includes('rejected')) return 'rose';
        if (action.includes('created')) return 'cyan';
        return 'slate';
    };

    return (
        <AuthenticatedLayout
            header={
                <Typography variant="h1" className="font-bold text-slate-100">
                    Log de Auditoria
                </Typography>
            }
        >
            <Head title="Auditoria do Sistema" />

            <div className="max-w-6xl mx-auto space-y-6">
                <Card padding="none" className="overflow-hidden">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-slate-800/50">
                                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider w-48">Evento</th>
                                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Descrição</th>
                                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Projeto</th>
                                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Metadados</th>
                                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Data</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-800">
                            {logs.data.map((log) => (
                                <tr key={log.id} className="hover:bg-slate-800/20 transition-colors">
                                    <td className="px-6 py-4">
                                        <Badge variant={getActionColor(log.action) as any}>{log.action.replace('_', ' ')}</Badge>
                                    </td>
                                    <td className="px-6 py-4">
                                        <Typography variant="small" className="text-slate-200">{log.description}</Typography>
                                    </td>
                                    <td className="px-6 py-4">
                                        {log.project ? (
                                            <span className="text-xs text-slate-400 flex items-center gap-1">
                                                <Globe className="h-3 w-3" /> {log.project.name}
                                            </span>
                                        ) : (
                                            <span className="text-xs text-slate-600">-</span>
                                        )}
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex flex-col gap-1">
                                            <span className="text-[10px] text-slate-500 flex items-center gap-1">
                                                <Monitor className="h-2 w-2" /> {log.ip_address}
                                            </span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className="text-xs text-slate-500">
                                            {new Date(log.created_at).toLocaleString('pt-BR')}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                            {logs.data.length === 0 && (
                                <tr>
                                    <td colSpan={5} className="px-6 py-12 text-center text-slate-500">
                                        Nenhuma atividade registrada ainda.
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
