import React, { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, usePage } from '@inertiajs/react';
import Typography from '@/Components/atoms/Typography';
import Card from '@/Components/atoms/Card';
import Button from '@/Components/atoms/Button';
import Input from '@/Components/atoms/Input';
import InputLabel from '@/Components/atoms/InputLabel';
import InputError from '@/Components/atoms/InputError';
import { Users, UserPlus, Shield, Mail, Trash2, Copy, Check, Clock, XCircle } from 'lucide-react';

interface Member {
    id: number;
    name: string;
    email: string;
    role: string;
}

interface Invitation {
    id: number;
    email: string;
    role: string;
    accept_url: string;
    created_at: string;
}

interface Props {
    organization: {
        name: string;
        slug: string;
    };
    members: Member[];
    invitations: Invitation[];
}

export default function Team({ organization, members, invitations }: Props) {
    const { auth } = usePage().props as any;

    const { data, setData, post, delete: destroy, processing, reset, errors } = useForm({
        email: '',
        role: 'member',
    });

    const [copiedId, setCopiedId] = useState<number | null>(null);

    const addMember = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('settings.team.add'), {
            onSuccess: () => reset(),
        });
    };

    const removeMember = (id: number) => {
        if (confirm('Tem certeza que deseja remover este membro do time?')) {
            destroy(route('settings.team.remove', id));
        }
    };

    const cancelInvitation = (id: number) => {
        if (confirm('Tem certeza que deseja cancelar este convite?')) {
            destroy(route('settings.team.cancel_invite', id));
        }
    };

    const copyLink = (id: number, url: string) => {
        navigator.clipboard.writeText(url);
        setCopiedId(id);
        setTimeout(() => setCopiedId(null), 2000);
    };

    return (
        <AuthenticatedLayout
            header={
                <Typography variant="h1" className="font-bold text-slate-100">
                    Gestão de Time
                </Typography>
            }
        >
            <Head title="Gestão de Time" />

            <div className="max-w-4xl mx-auto space-y-8">
                {/* Invite Member Section */}
                <Card className="border-cyan-500/20 bg-gradient-to-br from-slate-900 to-slate-950">
                    <div className="flex items-center gap-4 mb-6">
                        <div className="h-12 w-12 rounded-2xl bg-cyan-500/10 flex items-center justify-center text-cyan-400">
                            <UserPlus className="h-6 w-6" />
                        </div>
                        <div>
                            <Typography variant="h3" className="font-bold text-slate-100">Adicionar Membro</Typography>
                            <Typography variant="small" className="text-slate-500">Convide novos colaboradores para a organização {organization.name}.</Typography>
                        </div>
                    </div>

                    <form onSubmit={addMember} className="flex items-end gap-4">
                        <div className="flex-1">
                            <InputLabel htmlFor="email" value="E-mail do Usuário" className="mb-1" />
                            <div className="relative">
                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
                                <Input
                                    id="email"
                                    type="email"
                                    value={data.email}
                                    className="w-full pl-10"
                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setData('email', e.target.value)}
                                    placeholder="exemplo@email.com"
                                />
                            </div>
                            <InputError message={errors.email} className="mt-2" />
                        </div>
                        <div className="w-32">
                            <InputLabel htmlFor="role" value="Papel" className="mb-1" />
                            <select 
                                id="role"
                                value={data.role}
                                onChange={(e) => setData('role', e.target.value)}
                                className="w-full h-[42px] bg-slate-950 border border-slate-800 rounded-xl px-3 text-sm text-slate-300 focus:ring-cyan-500 focus:border-cyan-500"
                            >
                                <option value="member">Membro</option>
                                <option value="admin">Admin</option>
                            </select>
                        </div>
                        <Button type="submit" isLoading={processing} className="h-[42px]">
                            Adicionar
                        </Button>
                    </form>
                </Card>

                {/* Members List */}
                <Card padding="none" className="overflow-hidden">
                    <div className="p-6 border-b border-slate-800 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <Users className="h-5 w-5 text-cyan-400" />
                            <Typography variant="h4" className="font-bold text-slate-100">Membros da Organização</Typography>
                        </div>
                        <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">{members.length} MEMBROS</span>
                    </div>
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-slate-800/30">
                                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Usuário</th>
                                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Papel</th>
                                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">Ações</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-800">
                            {members.map((member) => (
                                <tr key={member.id} className="hover:bg-slate-800/20 transition-colors">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="h-8 w-8 rounded-full bg-slate-800 flex items-center justify-center text-xs font-bold text-slate-400 border border-slate-700">
                                                {member.name.substring(0, 2).toUpperCase()}
                                            </div>
                                            <div>
                                                <Typography variant="body" className="font-medium text-slate-200">{member.name}</Typography>
                                                <Typography variant="small" className="text-slate-500">{member.email}</Typography>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-2">
                                            <Shield className={`h-4 w-4 ${member.role === 'admin' ? 'text-cyan-400' : 'text-slate-500'}`} />
                                            <span className={`text-sm font-medium ${member.role === 'admin' ? 'text-slate-200' : 'text-slate-400'}`}>
                                                {member.role === 'admin' ? 'Administrador' : 'Membro'}
                                            </span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        {member.id !== auth.user.id && (
                                            <button 
                                                onClick={() => removeMember(member.id)}
                                                className="text-slate-600 hover:text-rose-500 transition-colors p-2"
                                            >
                                                <Trash2 className="h-5 w-5" />
                                            </button>
                                        )}
                                        {member.id === auth.user.id && (
                                            <span className="text-[10px] font-bold text-slate-600 uppercase tracking-widest px-2">Você</span>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </Card>

                {/* Pending Invitations List */}
                {invitations && invitations.length > 0 && (
                    <Card padding="none" className="overflow-hidden border-slate-800 bg-slate-900/20">
                        <div className="p-6 border-b border-slate-800 flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <Clock className="h-5 w-5 text-cyan-400" />
                                <Typography variant="h4" className="font-bold text-slate-100">Convites Pendentes</Typography>
                            </div>
                            <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">{invitations.length} CONVITES</span>
                        </div>
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-slate-800/20">
                                    <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Destinatário</th>
                                    <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Papel</th>
                                    <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">URL de Acesso</th>
                                    <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">Ações</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-800/60">
                                {invitations.map((invite) => (
                                    <tr key={invite.id} className="hover:bg-slate-800/10 transition-colors">
                                        <td className="px-6 py-4">
                                            <div>
                                                <Typography variant="body" className="font-medium text-slate-200">{invite.email}</Typography>
                                                <Typography variant="small" className="text-slate-500">
                                                    Enviado em {new Date(invite.created_at).toLocaleDateString('pt-BR')}
                                                </Typography>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-2">
                                                <Shield className={`h-4 w-4 ${invite.role === 'admin' ? 'text-cyan-400' : 'text-slate-500'}`} />
                                                <span className={`text-sm ${invite.role === 'admin' ? 'text-slate-200' : 'text-slate-400'}`}>
                                                    {invite.role === 'admin' ? 'Administrador' : 'Membro'}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-2 max-w-xs">
                                                <input 
                                                    type="text" 
                                                    readOnly 
                                                    value={invite.accept_url} 
                                                    className="bg-slate-950 border border-slate-800/80 rounded-lg px-2.5 py-1 text-xs text-slate-500 flex-1 truncate select-all"
                                                />
                                                <button
                                                    onClick={() => copyLink(invite.id, invite.accept_url)}
                                                    className="p-1.5 rounded-lg bg-slate-800/80 border border-slate-700 text-slate-400 hover:text-cyan-400 transition-colors shrink-0"
                                                    title="Copiar Link do Convite"
                                                >
                                                    {copiedId === invite.id ? (
                                                        <Check className="h-3.5 w-3.5 text-emerald-400" />
                                                    ) : (
                                                        <Copy className="h-3.5 w-3.5" />
                                                    )}
                                                </button>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <button 
                                                onClick={() => cancelInvitation(invite.id)}
                                                className="text-slate-500 hover:text-rose-500 transition-colors p-2"
                                                title="Cancelar Convite"
                                            >
                                                <XCircle className="h-5 w-5" />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </Card>
                )}
            </div>
        </AuthenticatedLayout>
    );
}
