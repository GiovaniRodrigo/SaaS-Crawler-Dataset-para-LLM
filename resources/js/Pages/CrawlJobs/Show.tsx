import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { CrawlJob } from '@/Types/project';
import Card from '@/Components/atoms/Card';
import PrimaryButton from '@/Components/PrimaryButton';
import SecondaryButton from '@/Components/SecondaryButton';

interface Props {
    crawlJob: CrawlJob;
}

export default function Show({ crawlJob }: Props) {
    const { post, processing } = useForm();

    const runJob = () => {
        post(route('crawl-jobs.run', crawlJob.id));
    };

    return (
        <AuthenticatedLayout
            header={
                <div className="flex justify-between items-center">
                    <h2 className="text-xl font-semibold leading-tight text-gray-800">
                        Crawl Job #{crawlJob.id}
                    </h2>
                    <Link href={route('projects.show', crawlJob.project_id)}>
                        <SecondaryButton>Voltar ao Projeto</SecondaryButton>
                    </Link>
                </div>
            }
        >
            <Head title={`Crawl Job #${crawlJob.id}`} />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <Card className="md:col-span-2">
                            <h3 className="text-lg font-bold mb-4">Configuração</h3>
                            <div className="space-y-4">
                                <div>
                                    <span className="font-semibold text-gray-600">Status:</span>
                                    <span className={`ml-2 px-2 py-1 rounded-full text-xs font-bold ${
                                        crawlJob.status === 'completed' ? 'bg-green-100 text-green-800' :
                                        crawlJob.status === 'running' ? 'bg-blue-100 text-blue-800' :
                                        crawlJob.status === 'failed' ? 'bg-red-100 text-red-800' : 'bg-gray-100 text-gray-800'
                                    }`}>
                                        {crawlJob.status}
                                    </span>
                                </div>
                                <div>
                                    <span className="font-semibold text-gray-600">Seed URLs:</span>
                                    <ul className="list-disc ml-6 mt-1">
                                        {crawlJob.seed_urls.map((url, i) => (
                                            <li key={i} className="text-sm truncate">{url}</li>
                                        ))}
                                    </ul>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <span className="font-semibold text-gray-600">Profundidade Máxima:</span>
                                        <span className="ml-2">{crawlJob.max_depth}</span>
                                    </div>
                                    <div>
                                        <span className="font-semibold text-gray-600">Limite de Páginas:</span>
                                        <span className="ml-2">{crawlJob.max_pages}</span>
                                    </div>
                                </div>
                            </div>

                            {crawlJob.status === 'created' && (
                                <div className="mt-8">
                                    <PrimaryButton onClick={runJob} disabled={processing}>
                                        Executar Agora
                                    </PrimaryButton>
                                </div>
                            )}
                        </Card>

                        <Card>
                            <h3 className="text-lg font-bold mb-4">Relatório</h3>
                            <div className="space-y-4">
                                <div className="flex justify-between">
                                    <span>Páginas Descobertas:</span>
                                    <span className="font-bold">{crawlJob.total_discovered}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Páginas Coletadas:</span>
                                    <span className="font-bold text-green-600">{crawlJob.total_crawled}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Páginas Falhas:</span>
                                    <span className="font-bold text-red-600">{crawlJob.total_failed}</span>
                                </div>
                                <hr />
                                <div className="flex justify-between">
                                    <span>Documentos Gerados:</span>
                                    <span className="font-bold">{crawlJob.total_documents}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Chunks Gerados:</span>
                                    <span className="font-bold">{crawlJob.total_chunks}</span>
                                </div>
                            </div>
                        </Card>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
