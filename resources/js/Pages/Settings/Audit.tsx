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
                <Typography variant="h1" className="font-black text-slate-950 dark:text-slate-50">
                    {t('messages.audit_log')}
                </Typography>
            }
        >
            <Head title={t('messages.audit_desc')} />

            <div className="max-w-6xl mx-auto space-y-6">
                <Card padding="none" className="overflow-hidden border-2 border-slate-200 dark:border-slate-800">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-slate-100 dark:bg-black border-b border-slate-200 dark:border-slate-800">
                                <th className="px-6 py-4 text-[10px] font-black text-slate-500 uppercase tracking-widest w-48">{t('messages.event')}</th>
                                <th className="px-6 py-4 text-[10px] font-black text-slate-500 uppercase tracking-widest">{t('messages.description_label')}</th>
                                <th className="px-6 py-4 text-[10px] font-black text-slate-500 uppercase tracking-widest">{t('messages.project_label')}</th>
                                <th className="px-6 py-4 text-[10px] font-black text-slate-500 uppercase tracking-widest">{t('messages.metadata')}</th>
                                <th className="px-6 py-4 text-[10px] font-black text-slate-500 uppercase tracking-widest">{t('messages.date')}</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                            {logs.data.map((log) => (
                                <tr key={log.id} className="hover:bg-slate-50 dark:hover:bg-slate-900/30 transition-colors">
                                    <td className="px-6 py-4">
                                        <Badge variant={getActionColor(log.action) as any} className="border-2">{log.action.replace('_', ' ')}</Badge>
                                    </td>
                                    <td className="px-6 py-4">
                                        <Typography variant="body" className="font-bold text-slate-950 dark:text-slate-50">{log.description}</Typography>
                                    </td>
                                    <td className="px-6 py-4">
                                        {log.project ? (
                                            <span className="text-xs font-bold text-slate-600 dark:text-slate-400 flex items-center gap-1">
                                                <Globe className="h-3 w-3" /> {log.project.name}
                                            </span>
                                        ) : (
                                            <span className="text-xs font-bold text-slate-600 dark:text-slate-400">-</span>
                                        )}
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex flex-col gap-1">
                                            <span className="text-[10px] font-bold text-slate-500 flex items-center gap-1">
                                                <Monitor className="h-3 w-3" /> {log.ip_address}
                                            </span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className="text-xs font-black text-slate-900 dark:text-slate-100">
                                            {new Date(log.created_at).toLocaleString('pt-BR')}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                            {logs.data.length === 0 && (
                                <tr>
                                    <td colSpan={5} className="px-6 py-12 text-center text-slate-500 font-bold">
                                        {t('messages.no_activity')}
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
