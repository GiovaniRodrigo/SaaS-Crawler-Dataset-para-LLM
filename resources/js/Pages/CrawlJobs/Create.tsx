import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import { Project } from '@/Types/project';
import Card from '@/Components/atoms/Card';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import InputError from '@/Components/InputError';
import Button from '@/Components/atoms/Button';
import PrimaryButton from '@/Components/PrimaryButton';
import useTranslation from '@/Hooks/useTranslation';
import { FormEvent } from 'react';

interface Props {
    project: Project;
}

export default function Create({ project }: Props) {
    const { t } = useTranslation();
    const { data, setData, post, processing, errors } = useForm({
        seed_urls: [''],
        max_depth: 3,
        max_pages: 100,
    });

    const handleUrlChange = (index: number, value: string) => {
        const newUrls = [...data.seed_urls];
        newUrls[index] = value;
        setData('seed_urls', newUrls);
    };

    const addUrl = () => {
        setData('seed_urls', [...data.seed_urls, '']);
    };

    const removeUrl = (index: number) => {
        const newUrls = [...data.seed_urls];
        newUrls.splice(index, 1);
        setData('seed_urls', newUrls);
    };

    const submit = (e: FormEvent) => {
        e.preventDefault();
        post(route('projects.crawl-jobs.store', project?.id));
    };

    return (
        <AuthenticatedLayout
            header={
                <div>
                    <p className="text-xs font-black uppercase text-cyan-600 dark:text-cyan-400">{project?.name || 'Projeto'}</p>
                    <h2 className="mt-1 text-2xl font-black text-slate-950 dark:text-slate-50">{t('messages.new_crawling_job')}</h2>
                </div>
            }
        >
            <Head title={t('messages.new_crawling_job')} />

            <div className="py-10">
                <div className="mx-auto max-w-3xl sm:px-6 lg:px-8">
                    <Card border>
                        <form onSubmit={submit}>
                            <div className="space-y-4">
                                <InputLabel value={t('messages.seed_urls')} className="text-slate-900 dark:text-slate-100 font-bold" />
                                {data.seed_urls.map((url, index) => (
                                    <div key={index} className="flex mt-1 gap-2">
                                        <TextInput
                                            type="url"
                                            value={url}
                                            className="block w-full border-2 border-slate-200 dark:border-slate-800 bg-white dark:bg-black text-slate-900 dark:text-slate-100 font-medium"
                                            onChange={(e) => handleUrlChange(index, e.target.value)}
                                            placeholder="https://exemplo.com.br"
                                            required
                                        />
                                        {data.seed_urls.length > 1 && (
                                            <Button
                                                type="button"
                                                variant="ghost"
                                                size="sm"
                                                onClick={() => removeUrl(index)}
                                                className="px-2 text-rose-600 dark:text-rose-400 hover:bg-rose-500/10 text-xl font-black"
                                            >
                                                &times;
                                            </Button>
                                        )}
                                    </div>
                                ))}
                                <Button
                                    type="button"
                                    variant="ghost"
                                    size="sm"
                                    onClick={addUrl}
                                    className="mt-2 text-cyan-600 dark:text-cyan-400 hover:bg-cyan-500/10 font-bold"
                                >
                                    + {t('messages.add_another_url')}
                                </Button>
                                <InputError message={errors.seed_urls} className="mt-2 font-bold" />
                            </div>

                            <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2">
                                <div>
                                    <InputLabel htmlFor="max_depth" value={t('messages.max_depth')} className="text-slate-900 dark:text-slate-100 font-bold" />
                                    <TextInput
                                        id="max_depth"
                                        type="number"
                                        value={data.max_depth}
                                        className="mt-1 block w-full border-2 border-slate-200 dark:border-slate-800 bg-white dark:bg-black text-slate-900 dark:text-slate-100 font-medium"
                                        onChange={(e) => setData('max_depth', parseInt(e.target.value))}
                                        min="0"
                                        max="10"
                                    />
                                    <InputError message={errors.max_depth} className="mt-2 font-bold" />
                                </div>
                                <div>
                                    <InputLabel htmlFor="max_pages" value={t('messages.max_pages')} className="text-slate-900 dark:text-slate-100 font-bold" />
                                    <TextInput
                                        id="max_pages"
                                        type="number"
                                        value={data.max_pages}
                                        className="mt-1 block w-full border-2 border-slate-200 dark:border-slate-800 bg-white dark:bg-black text-slate-900 dark:text-slate-100 font-medium"
                                        onChange={(e) => setData('max_pages', parseInt(e.target.value))}
                                        min="1"
                                        max="10000"
                                    />
                                    <InputError message={errors.max_pages} className="mt-2 font-bold" />
                                </div>
                            </div>

                            <div className="mt-10 flex items-center justify-end border-t-2 border-slate-100 dark:border-slate-800 pt-8">
                                <PrimaryButton isLoading={processing} className="px-10">
                                    {t('messages.create_job')}
                                </PrimaryButton>
                            </div>
                        </form>
                    </Card>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
