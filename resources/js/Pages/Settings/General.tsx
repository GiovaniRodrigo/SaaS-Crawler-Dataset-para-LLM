import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import Typography from '@/Components/atoms/Typography';
import Card from '@/Components/atoms/Card';
import Input from '@/Components/atoms/Input';
import InputLabel from '@/Components/atoms/InputLabel';
import InputError from '@/Components/atoms/InputError';
import Button from '@/Components/atoms/Button';
import PrimaryButton from '@/Components/PrimaryButton';
import { Settings as SettingsIcon, Building, Globe } from 'lucide-react';
import useTranslation from '@/Hooks/useTranslation';

interface Organization {
    id: number;
    name: string;
    subscription_plan: string;
}

interface Props {
    organization: Organization | null;
}

export default function General({ organization }: Props) {
    const { t } = useTranslation();
    const { data, setData, post, processing, errors } = useForm({
        name: organization?.name || '',
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('settings.general.update'));
    };

    return (
        <AuthenticatedLayout
            header={
                <div className="flex items-center gap-3">
                    <SettingsIcon className="h-8 w-8 text-cyan-600 dark:text-cyan-400" />
                    <Typography variant="h1" className="font-black text-slate-950 dark:text-slate-50">
                        {t('messages.general_settings')}
                    </Typography>
                </div>
            }
        >
            <Head title={t('messages.general_settings')} />

            <div className="max-w-4xl mx-auto space-y-8">
                <Card className="border-2 border-slate-200 dark:border-slate-800">
                    <div className="flex items-center gap-4 mb-6 pb-6 border-b-2 border-slate-100 dark:border-slate-800">
                        <div className="h-12 w-12 rounded-2xl bg-cyan-500/10 flex items-center justify-center text-cyan-600 dark:text-cyan-400">
                            <Building className="h-6 w-6" />
                        </div>
                        <div>
                            <Typography variant="h3" className="font-black text-slate-950 dark:text-slate-50">{t('messages.organization_data')}</Typography>
                            <Typography variant="small" className="font-bold text-slate-600 dark:text-slate-400">{t('messages.workspace_management')}</Typography>
                        </div>
                    </div>

                    <form onSubmit={submit} className="space-y-6">
                        <div className="max-w-xl">
                            <InputLabel htmlFor="name" value={t('messages.org_name_label')} className="mb-2 font-bold text-slate-900 dark:text-slate-100" />
                            <Input
                                id="name"
                                value={data.name}
                                onChange={(e) => setData('name', e.target.value)}
                                className="w-full border-2 border-slate-200 dark:border-slate-800 font-bold bg-white dark:bg-black text-slate-950 dark:text-slate-50"
                                required
                            />
                            <InputError message={errors.name} className="mt-2 font-bold" />
                        </div>

                        <div className="pt-6 border-t-2 border-slate-100 dark:border-slate-800">
                            <PrimaryButton isLoading={processing} type="submit" className="px-8">
                                {t('messages.save_changes')}
                            </PrimaryButton>
                        </div>
                    </form>
                </Card>

                <Card className="border-2 border-slate-200 dark:border-slate-800">
                    <div className="flex items-center gap-4 mb-6 pb-6 border-b-2 border-slate-100 dark:border-slate-800">
                        <div className="h-12 w-12 rounded-2xl bg-emerald-500/10 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
                            <Globe className="h-6 w-6" />
                        </div>
                        <div>
                            <Typography variant="h3" className="font-black text-slate-950 dark:text-slate-50">{t('messages.regional_preferences')}</Typography>
                            <Typography variant="small" className="font-bold text-slate-600 dark:text-slate-400">{t('messages.regional_desc')}</Typography>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-900/50 rounded-xl border border-slate-200 dark:border-slate-800">
                            <div>
                                <Typography variant="body" className="font-black text-slate-950 dark:text-slate-50">{t('messages.default_language')}</Typography>
                                <Typography variant="small" className="font-bold text-slate-500">{t('messages.change_in_topbar')}</Typography>
                            </div>
                            <Badge variant="slate" className="border-2 font-black">{t('messages.change_in_topbar').toUpperCase()}</Badge>
                        </div>
                    </div>
                </Card>
            </div>
        </AuthenticatedLayout>
    );
}
