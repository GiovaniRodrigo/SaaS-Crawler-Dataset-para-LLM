import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { CrawlJob } from '@/Types/project';
import Card from '@/Components/atoms/Card';
import PrimaryButton from '@/Components/PrimaryButton';
import SecondaryButton from '@/Components/SecondaryButton';
import useTranslation from '@/Hooks/useTranslation';

interface Props {
    crawlJob: CrawlJob;
}

export default function Show({ crawlJob }: Props) {
    const { t } = useTranslation();
    const { post, processing } = useForm();

    const runJob = () => {
        post(route('crawl-jobs.run', crawlJob.id));
    };

    return (
        <AuthenticatedLayout
            header={
                <div className="flex items-center justify-between gap-4">
                    <div>
                        <p className="text-xs font-semibold uppercase text-cyan-300">Crawler</p>
                        <h2 className="mt-1 text-2xl font-bold text-slate-100">Job #{crawlJob.id}</h2>
                    </div>
                    <Link href={route('projects.show', crawlJob.project_id)}>
                        <SecondaryButton>{t('messages.back_to_project')}</SecondaryButton>
                    </Link>
                </div>
            }
        >
            <Head title={`Crawl Job #${crawlJob.id}`} />

            <div className="py-10">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                        <Card className="md:col-span-2">
                            <h3 className="mb-4 text-lg font-bold text-slate-100">{t('messages.configuration')}</h3>
                            <div className="space-y-4">
                                <div>
                                    <span className="font-semibold text-slate-400">{t('messages.status')}:</span>
                                    <span className={`ml-2 px-2 py-1 rounded-full text-xs font-bold ${
                                        crawlJob.status === 'completed' ? 'bg-emerald-400/10 text-emerald-300' :
                                        crawlJob.status === 'running' ? 'bg-cyan-400/10 text-cyan-300' :
                                        crawlJob.status === 'failed' ? 'bg-red-400/10 text-red-300' : 'bg-slate-800 text-slate-300'
                                    }`}>
                                        {crawlJob.status}
                                    </span>
                                </div>
                                <div>
                                    <span className="font-semibold text-slate-400">{t('messages.seed_urls')}:</span>
                                    <ul className="list-disc ml-6 mt-1">
                                        {crawlJob.seed_urls.map((url, i) => (
                                            <li key={i} className="truncate text-sm text-slate-200">{url}</li>
                                        ))}
                                    </ul>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <span className="font-semibold text-slate-400">{t('messages.max_depth')}:</span>
                                        <span className="ml-2 text-slate-100">{crawlJob.max_depth}</span>
                                    </div>
                                    <div>
                                        <span className="font-semibold text-slate-400">{t('messages.max_pages')}:</span>
                                        <span className="ml-2 text-slate-100">{crawlJob.max_pages}</span>
                                    </div>
                                </div>
                            </div>

                            {crawlJob.status === 'created' && (
                                <div className="mt-8">
                                    <PrimaryButton onClick={runJob} disabled={processing}>
                                        {t('messages.execute_now')}
                                    </PrimaryButton>
                                </div>
                            )}
                        </Card>

                        <Card>
                            <h3 className="mb-4 text-lg font-bold text-slate-100">{t('messages.report')}</h3>
                            <div className="space-y-4">
                                <div className="flex justify-between text-slate-300">
                                    <span>{t('messages.pages_discovered')}:</span>
                                    <span className="font-bold text-slate-100">{crawlJob.total_discovered}</span>
                                </div>
                                <div className="flex justify-between text-slate-300">
                                    <span>{t('messages.pages_crawled')}:</span>
                                    <span className="font-bold text-emerald-300">{crawlJob.total_crawled}</span>
                                </div>
                                <div className="flex justify-between text-slate-300">
                                    <span>{t('messages.pages_failed')}:</span>
                                    <span className="font-bold text-red-300">{crawlJob.total_failed}</span>
                                </div>
                                <hr className="border-slate-800" />
                                <div className="flex justify-between text-slate-300">
                                    <span>{t('messages.documents_generated')}:</span>
                                    <span className="font-bold text-slate-100">{crawlJob.total_documents}</span>
                                </div>
                                <div className="flex justify-between text-slate-300">
                                    <span>{t('messages.chunks_generated')}:</span>
                                    <span className="font-bold text-slate-100">{crawlJob.total_chunks}</span>
                                </div>
                            </div>
                        </Card>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
