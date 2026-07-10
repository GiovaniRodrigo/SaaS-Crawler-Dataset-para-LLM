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

    const { data, setData, post, delete: destroy, processing, reset, errors } = useForm({
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
        if (confirm(t('messages.confirm_delete_token'))) {
            destroy(route('settings.tokens.destroy', id));
        }
    };

    const copyToClipboard = async () => {
        if (newToken) {
            try {
                if (navigator.clipboard && window.isSecureContext) {
                    await navigator.clipboard.writeText(newToken);
                } else {
                    // Fallback for older browsers or non-HTTPS
                    const textArea = document.createElement("textarea");
                    textArea.value = newToken;
                    textArea.style.position = "absolute";
                    textArea.style.left = "-999999px";
                    document.body.prepend(textArea);
                    textArea.select();
                    document.execCommand('copy');
                    textArea.remove();
                }
                setCopied(true);
                setTimeout(() => setCopied(false), 2000);
            } catch (err) {
                console.error("Failed to copy token", err);
                alert(t('messages.token_copy_error'));
            }
        }
    };

    return (
        <AuthenticatedLayout
            header={
                <Typography variant="h1" className="font-black text-slate-950 dark:text-slate-50">
                    {t('messages.api_tokens')}
                </Typography>
            }
        >
            <Head title={t('messages.api_tokens')} />

            <div className="max-w-4xl mx-auto space-y-8">
                {/* Create Token Section */}
                <Card className="border-2 border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950">
                    <div className="flex items-center gap-4 mb-6">
                        <div className="h-12 w-12 rounded-2xl bg-cyan-500/10 flex items-center justify-center text-cyan-600 dark:text-cyan-400">
                            <Key className="h-6 w-6" />
                        </div>
                        <div>
                            <Typography variant="h3" className="font-black text-slate-950 dark:text-slate-50">{t('messages.create_new_token')}</Typography>
                            <Typography variant="small" className="font-bold text-slate-600 dark:text-slate-400">{t('messages.token_security_notice')}</Typography>
                        </div>
                    </div>

                    <form onSubmit={createToken} className="flex items-end gap-4">
                        <div className="flex-1">
                            <InputLabel htmlFor="name" value={t('messages.token_name_label')} className="mb-1 font-bold text-slate-900 dark:text-slate-100" />
                            <Input
                                id="name"
                                value={data.name}
                                className="w-full border-2 border-slate-200 dark:border-slate-800 bg-white dark:bg-black text-slate-900 dark:text-slate-100 font-bold"
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setData('name', e.target.value)}
                                placeholder={t('messages.token_name_placeholder')}
                            />
                            <InputError message={errors.name} className="mt-2 font-bold" />
                        </div>
                        <Button type="submit" isLoading={processing} className="h-[42px] px-8">
                            {t('messages.generate_token')}
                        </Button>
                    </form>
                </Card>

                {/* Display New Token (Secret) */}
                {newToken && (
                    <Card className="bg-emerald-50 dark:bg-emerald-950/20 border-4 border-emerald-500/30 animate-in fade-in slide-in-from-top-4 duration-500">
                        <div className="flex items-center gap-3 mb-4 text-emerald-600 dark:text-emerald-400">
                            <ShieldAlert className="h-6 w-6" />
                            <Typography variant="h3" className="font-black">{t('messages.token_generated_success')}</Typography>
                        </div>
                        <Typography variant="small" className="text-slate-700 dark:text-slate-300 font-bold mb-4">
                            {t('messages.token_security_notice')}
                        </Typography>
                        <div className="flex items-center gap-2 p-4 bg-white dark:bg-black rounded-xl border-2 border-slate-950 dark:border-slate-50">
                            <code className="flex-1 text-sm font-mono font-black text-slate-950 dark:text-slate-50 break-all select-all">{newToken}</code>
                            <Button 
                                type="button"
                                variant="ghost" 
                                size="icon" 
                                onClick={copyToClipboard}
                                className={copied ? 'text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/30' : 'text-slate-950 dark:text-slate-50 hover:bg-slate-100 dark:hover:bg-slate-800'}
                            >
                                {copied ? <CheckCircle2 className="h-5 w-5" /> : <Copy className="h-5 w-5" />}
                            </Button>
                        </div>
                    </Card>
                )}

                {/* Existing Tokens List */}
                <Card padding="none" className="overflow-hidden border-2 border-slate-200 dark:border-slate-800">
                    <div className="p-6 border-b-2 border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-black">
                        <Typography variant="h4" className="font-black text-slate-950 dark:text-slate-50">{t('messages.active_tokens')}</Typography>
                    </div>
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-slate-100/50 dark:bg-slate-900/50 border-b border-slate-200 dark:border-slate-800">
                                <th className="px-6 py-4 text-[10px] font-black text-slate-500 uppercase tracking-widest">{t('messages.token_name')}</th>
                                <th className="px-6 py-4 text-[10px] font-black text-slate-500 uppercase tracking-widest">{t('messages.last_used')}</th>
                                <th className="px-6 py-4 text-[10px] font-black text-slate-500 uppercase tracking-widest">{t('messages.created_at')}</th>
                                <th className="px-6 py-4 text-[10px] font-black text-slate-500 uppercase tracking-widest text-right">{t('messages.actions')}</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                            {tokens.map((token) => (
                                <tr key={token.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors">
                                    <td className="px-6 py-4">
                                        <Typography variant="body" className="font-black text-slate-950 dark:text-slate-50">{token.name}</Typography>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="text-sm font-bold text-slate-600 dark:text-slate-400">
                                            {token.last_used_at === 'Nunca usado' ? t('messages.never_used') : token.last_used_at}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="text-sm font-bold text-slate-600 dark:text-slate-400">{token.created_at}</span>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <Button 
                                            type="button"
                                            variant="ghost"
                                            size="icon"
                                            onClick={() => deleteToken(token.id)}
                                            className="hover:text-rose-600 dark:hover:text-rose-500 text-slate-400"
                                        >
                                            <Trash2 className="h-5 w-5" />
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                            {tokens.length === 0 && (
                                <tr>
                                    <td colSpan={4} className="px-6 py-12 text-center text-slate-500 font-bold">
                                        {t('messages.no_tokens')}
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
