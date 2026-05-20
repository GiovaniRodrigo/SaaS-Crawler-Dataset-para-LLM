import React, { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, usePage } from '@inertiajs/react';
import Typography from '@/Components/atoms/Typography';
import Card from '@/Components/atoms/Card';
import Button from '@/Components/atoms/Button';
import Input from '@/Components/atoms/Input';
import InputLabel from '@/Components/atoms/InputLabel';
import InputError from '@/Components/atoms/InputError';
import { Key, Copy, CheckCircle2, Trash2, ShieldAlert } from 'lucide-react';

interface Token {
    id: number;
    name: string;
    last_used_at: string;
    created_at: string;
}

interface Props {
    tokens: Token[];
}

export default function ApiTokens({ tokens }: Props) {
    const { flash } = usePage().props as any;
    const [newToken, setNewToken] = useState<string | null>(null);
    const [copied, setCopied] = useState(false);

    const { data, setData, post, processing, reset, errors } = useForm({
        name: '',
    });

    const createToken = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('settings.tokens.store'), {
            onSuccess: (page: any) => {
                reset();
                if (page.props.flash?.token) {
                    setNewToken(page.props.flash.token);
                }
            },
        });
    };

    const deleteToken = (id: number) => {
        if (confirm('Tem certeza que deseja remover este token?')) {
            useForm().delete(route('settings.tokens.destroy', id));
        }
    };

    const copyToClipboard = () => {
        if (newToken) {
            navigator.clipboard.writeText(newToken);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
    };

    return (
        <AuthenticatedLayout
            header={
                <Typography variant="h1" className="font-bold text-slate-100">
                    API Tokens
                </Typography>
            }
        >
            <Head title="Gerenciar API Tokens" />

            <div className="max-w-4xl mx-auto space-y-8">
                {/* Create Token Section */}
                <Card className="border-cyan-500/20 bg-gradient-to-br from-slate-900 to-slate-950">
                    <div className="flex items-center gap-4 mb-6">
                        <div className="h-12 w-12 rounded-2xl bg-cyan-500/10 flex items-center justify-center text-cyan-400">
                            <Key className="h-6 w-6" />
                        </div>
                        <div>
                            <Typography variant="h3" className="font-bold text-slate-100">Criar Novo Token</Typography>
                            <Typography variant="small" className="text-slate-500">Gere uma chave secreta para usar na extensão ou integrações.</Typography>
                        </div>
                    </div>

                    <form onSubmit={createToken} className="flex items-end gap-4">
                        <div className="flex-1">
                            <InputLabel htmlFor="name" value="Nome do Token (ex: Extensão Chrome)" className="mb-1" />
                            <Input
                                id="name"
                                value={data.name}
                                className="w-full"
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setData('name', e.target.value)}
                                placeholder="Dê um nome amigável para identificar este token"
                            />
                            <InputError message={errors.name} className="mt-2" />
                        </div>
                        <Button type="submit" isLoading={processing} className="h-[42px]">
                            Gerar Token
                        </Button>
                    </form>
                </Card>

                {/* Display New Token (Secret) */}
                {newToken && (
                    <Card className="bg-emerald-500/5 border-emerald-500/30 animate-in fade-in slide-in-from-top-4 duration-500">
                        <div className="flex items-center gap-3 mb-4 text-emerald-400">
                            <ShieldAlert className="h-5 w-5" />
                            <Typography variant="body" className="font-bold">Token Gerado com Sucesso!</Typography>
                        </div>
                        <Typography variant="small" className="text-slate-400 mb-4">
                            Por razões de segurança, este token será exibido apenas **uma vez**. Copie e guarde-o em um local seguro.
                        </Typography>
                        <div className="flex items-center gap-2 p-3 bg-slate-950 rounded-xl border border-slate-800">
                            <code className="flex-1 text-sm text-emerald-400 break-all">{newToken}</code>
                            <Button 
                                variant="ghost" 
                                size="icon" 
                                onClick={copyToClipboard}
                                className={copied ? 'text-emerald-400' : 'text-slate-500'}
                            >
                                {copied ? <CheckCircle2 className="h-5 w-5" /> : <Copy className="h-5 w-5" />}
                            </Button>
                        </div>
                    </Card>
                )}

                {/* Existing Tokens List */}
                <Card padding="none" className="overflow-hidden">
                    <div className="p-6 border-b border-slate-800">
                        <Typography variant="h4" className="font-bold text-slate-100">Seus Tokens Ativos</Typography>
                    </div>
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-slate-800/30">
                                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Nome</th>
                                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Último Uso</th>
                                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Criado em</th>
                                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">Ações</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-800">
                            {tokens.map((token) => (
                                <tr key={token.id} className="hover:bg-slate-800/20 transition-colors">
                                    <td className="px-6 py-4">
                                        <Typography variant="body" className="font-medium text-slate-200">{token.name}</Typography>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="text-sm text-slate-400">{token.last_used_at}</span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="text-sm text-slate-400">{token.created_at}</span>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <button 
                                            onClick={() => deleteToken(token.id)}
                                            className="text-slate-600 hover:text-rose-500 transition-colors p-2"
                                        >
                                            <Trash2 className="h-5 w-5" />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                            {tokens.length === 0 && (
                                <tr>
                                    <td colSpan={4} className="px-6 py-12 text-center text-slate-500">
                                        Você ainda não possui API tokens.
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
