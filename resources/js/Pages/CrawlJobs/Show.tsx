import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm, usePage } from '@inertiajs/react';
import { CrawlJob } from '@/Types/project';
import { PageProps } from '@/types';
import Card from '@/Components/atoms/Card';
import PrimaryButton from '@/Components/PrimaryButton';
import SecondaryButton from '@/Components/SecondaryButton';
import useTranslation from '@/Hooks/useTranslation';
import { ChevronRight } from 'lucide-react';

interface Props {
    crawlJob: CrawlJob;
}

export default function Show({ crawlJob }: Props) {
    const { auth } = usePage<PageProps>().props;
    const { t } = useTranslation();
    const { post, processing } = useForm();

    const subscriptionPlan = auth.organization?.subscription_plan;
    const isPro = subscriptionPlan === 'pro' || subscriptionPlan === 'enterprise';

    const runJob = () => {
        post(route('crawl-jobs.run', crawlJob.id));
    };

    return (
        <AuthenticatedLayout
            header={
                <div className="flex items-center justify-between gap-4">
                    <div>
                        <p className="text-xs font-black uppercase text-cyan-600 dark:text-cyan-400">Crawler</p>
                        <h2 className="mt-1 text-2xl font-black text-slate-950 dark:text-slate-50">Job #{crawlJob.id}</h2>
                    </div>
                    <Link href={route('projects.show', crawlJob?.project_id)}>
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
                            <h3 className="mb-4 text-lg font-bold text-slate-950 dark:text-slate-50">{t('messages.configuration')}</h3>
                            <div className="space-y-4">
                                <div>
                                    <span className="font-semibold text-slate-600 dark:text-slate-300">{t('messages.status')}:</span>
                                    <span className={`ml-2 px-2 py-1 rounded-full text-xs font-bold ${
                                        crawlJob.status === 'completed' ? 'bg-emerald-400/10 text-emerald-600 dark:text-emerald-400' :
                                        crawlJob.status === 'running' ? 'bg-cyan-400/10 text-cyan-600 dark:text-cyan-400' :
                                        crawlJob.status === 'failed' ? 'bg-red-400/10 text-red-600 dark:text-red-400' : 'bg-slate-800 text-slate-100'
                                    }`}>
                                        {crawlJob.status}
                                    </span>
                                </div>
                                <div>
                                    <span className="font-semibold text-slate-600 dark:text-slate-300">{t('messages.seed_urls')}:</span>
                                    <ul className="list-disc ml-6 mt-1">
                                        {crawlJob.seed_urls.map((url, i) => (
                                            <li key={i} className="truncate text-sm text-slate-800 dark:text-slate-200">{url}</li>
                                        ))}
                                    </ul>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <span className="font-semibold text-slate-600 dark:text-slate-300">{t('messages.max_depth')}:</span>
                                        <span className="ml-2 text-slate-900 dark:text-slate-100">{crawlJob.max_depth}</span>
                                    </div>
                                    <div>
                                        <span className="font-semibold text-slate-600 dark:text-slate-300">{t('messages.max_pages')}:</span>
                                        <span className="ml-2 text-slate-900 dark:text-slate-100">{crawlJob.max_pages}</span>
                                    </div>
                                </div>
                            </div>

                            {crawlJob.status === 'created' && (
                                <div className="mt-8">
                                    <PrimaryButton onClick={runJob} isLoading={processing}>
                                        {t('messages.execute_now')}
                                    </PrimaryButton>
                                </div>
                            )}

                            {isPro && (crawlJob.status === 'completed' || crawlJob.status === 'failed' || crawlJob.status === 'canceled') && (
                                <div className="mt-8">
                                    <PrimaryButton onClick={runJob} isLoading={processing}>
                                        {t('messages.reexecute_job')}
                                    </PrimaryButton>
                                </div>
                            )}
                        </Card>

                        <Card>
                            <h3 className="mb-4 text-lg font-black text-slate-950 dark:text-slate-50">{t('messages.report')}</h3>
                            <div className="space-y-4">
                                <Link 
                                    href={route('crawl-jobs.discovered', crawlJob.id)}
                                    className="flex justify-between p-3 -mx-3 rounded-xl hover:bg-cyan-50 dark:hover:bg-cyan-950/20 transition-all border-2 border-transparent hover:border-cyan-200 dark:hover:border-cyan-900 group"
                                >
                                    <span className="font-bold text-slate-600 dark:text-slate-300 group-hover:text-cyan-600 dark:group-hover:text-cyan-400">{t('messages.pages_discovered')}:</span>
                                    <div className="flex items-center gap-2">
                                        <span className="font-black text-slate-900 dark:text-slate-100 group-hover:text-cyan-600 dark:group-hover:text-cyan-400 underline decoration-2 underline-offset-4">{crawlJob.total_discovered}</span>
                                        <ChevronRight className="h-4 w-4 text-cyan-400 group-hover:translate-x-1 transition-transform" />
                                    </div>
                                </Link>
                                <Link 
                                    href={route('crawl-jobs.crawled', crawlJob.id)}
                                    className="flex justify-between p-3 -mx-3 rounded-xl hover:bg-emerald-50 dark:hover:bg-emerald-950/20 transition-all border-2 border-transparent hover:border-emerald-200 dark:hover:border-emerald-900 group"
                                >
                                    <span className="font-bold text-slate-600 dark:text-slate-300 group-hover:text-emerald-600 dark:group-hover:text-emerald-400">{t('messages.pages_crawled')}:</span>
                                    <div className="flex items-center gap-2">
                                        <span className="font-black text-emerald-600 dark:text-emerald-400 underline decoration-2 underline-offset-4">{crawlJob.total_crawled}</span>
                                        <ChevronRight className="h-4 w-4 text-emerald-400 group-hover:translate-x-1 transition-transform" />
                                    </div>
                                </Link>
                                <Link 
                                    href={route('crawl-jobs.failures', crawlJob.id)}
                                    className="flex justify-between p-3 -mx-3 rounded-xl hover:bg-rose-50 dark:hover:bg-rose-950/20 transition-all border-2 border-transparent hover:border-rose-200 dark:hover:border-rose-900 group"
                                >
                                    <span className="font-bold text-rose-600 dark:text-rose-400">{t('messages.pages_failed')}:</span>
                                    <div className="flex items-center gap-2">
                                        <span className="font-black text-rose-600 dark:text-rose-400 underline decoration-2 underline-offset-4">{crawlJob.total_failed}</span>
                                        <ChevronRight className="h-4 w-4 text-rose-400 group-hover:translate-x-1 transition-transform" />
                                    </div>
                                </Link>
                                <hr className="border-slate-200 dark:border-slate-800" />
                                <div className="flex justify-between text-slate-600 dark:text-slate-300">
                                    <span className="font-bold">{t('messages.documents_generated')}:</span>
                                    <span className="font-black text-slate-900 dark:text-slate-100">{crawlJob.total_documents}</span>
                                </div>
                                <div className="flex justify-between text-slate-600 dark:text-slate-300">
                                    <span className="font-bold">{t('messages.chunks_generated')}:</span>
                                    <span className="font-black text-slate-900 dark:text-slate-100">{crawlJob.total_chunks}</span>
                                </div>
                            </div>
                        </Card>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
