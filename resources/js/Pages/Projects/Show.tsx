import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { Project, Domain, CrawlJob } from '@/Types/project';
import Card from '@/Components/atoms/Card';
import PrimaryButton from '@/Components/PrimaryButton';
import SecondaryButton from '@/Components/SecondaryButton';
import TextInput from '@/Components/TextInput';
import InputLabel from '@/Components/InputLabel';
import InputError from '@/Components/InputError';
import Checkbox from '@/Components/Checkbox';
import { FormEvent, useState } from 'react';

interface Props {
    project: Project;
    stats: {
        total_documents: number;
        total_chunks: number;
    };
}

export default function Show({ project, stats }: Props) {
    const [activeTab, setActiveTab] = useState('summary');

    return (
        <AuthenticatedLayout
            header={
                <div className="flex justify-between items-center">
                    <h2 className="text-xl font-semibold leading-tight text-gray-800">
                        {project.name}
                    </h2>
                    <div className="space-x-2">
                        <Link href={route('projects.edit', project.id)}>
                            <SecondaryButton>Editar</SecondaryButton>
                        </Link>
                    </div>
                </div>
            }
        >
            <Head title={project.name} />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    {/* Tabs */}
                    <div className="flex border-b border-gray-200 mb-6 overflow-x-auto">
                        {['summary', 'domains', 'jobs', 'documents', 'chunks', 'exports'].map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`px-4 py-2 font-medium text-sm capitalize whitespace-nowrap ${
                                    activeTab === tab
                                        ? 'border-b-2 border-indigo-500 text-indigo-600'
                                        : 'text-gray-500 hover:text-gray-700'
                                }`}
                            >
                                {tab === 'summary' ? 'Resumo' : 
                                 tab === 'domains' ? 'Domínios' : 
                                 tab === 'jobs' ? 'Jobs' : 
                                 tab === 'documents' ? 'Documentos' : 
                                 tab === 'chunks' ? 'Chunks' : 'Exportações'}
                            </button>
                        ))}
                    </div>

                    {activeTab === 'summary' && (
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <Card>
                                <h3 className="text-sm font-medium text-gray-500">Documentos</h3>
                                <p className="text-3xl font-bold mt-2">{stats.total_documents}</p>
                            </Card>
                            <Card>
                                <h3 className="text-sm font-medium text-gray-500">Chunks</h3>
                                <p className="text-3xl font-bold mt-2">{stats.total_chunks}</p>
                            </Card>
                            <Card>
                                <h3 className="text-sm font-medium text-gray-500">Descrição</h3>
                                <p className="mt-2 text-gray-700">{project.description || 'Nenhuma descrição.'}</p>
                            </Card>
                        </div>
                    )}

                    {activeTab === 'domains' && <DomainSection project={project} />}
                    {activeTab === 'jobs' && <JobSection project={project} />}
                    {activeTab === 'documents' && <DocumentSection project={project} />}
                    {activeTab === 'chunks' && <ChunkSection project={project} />}
                    {activeTab === 'exports' && <ExportSection project={project} />}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

function DomainSection({ project }: { project: Project }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        domain: '',
        allow_subdomains: false,
    });

    const submit = (e: FormEvent) => {
        e.preventDefault();
        post(route('projects.domains.store', project.id), {
            onSuccess: () => reset(),
        });
    };

    return (
        <div className="space-y-6">
            <Card>
                <h3 className="text-lg font-medium text-gray-900 mb-4">Adicionar Domínio Autorizado</h3>
                <form onSubmit={submit} className="flex flex-wrap items-end gap-4">
                    <div className="flex-1 min-w-[200px]">
                        <InputLabel htmlFor="domain" value="Domínio (ex: empresa.com.br)" />
                        <TextInput
                            id="domain"
                            value={data.domain}
                            onChange={(e) => setData('domain', e.target.value)}
                            className="mt-1 block w-full"
                        />
                        <InputError message={errors.domain} className="mt-2" />
                    </div>
                    <div className="flex items-center mb-2">
                        <Checkbox
                            id="allow_subdomains"
                            checked={data.allow_subdomains}
                            onChange={(e) => setData('allow_subdomains', e.target.checked)}
                        />
                        <label htmlFor="allow_subdomains" className="ml-2 text-sm text-gray-600">
                            Permitir subdomínios
                        </label>
                    </div>
                    <PrimaryButton disabled={processing} className="mb-1">Adicionar</PrimaryButton>
                </form>
            </Card>

            <Card>
                <h3 className="text-lg font-medium text-gray-900 mb-4">Domínios Cadastrados</h3>
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead>
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Domínio</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Subdomínios</th>
                                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Ações</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {project.domains?.map((domain) => (
                                <tr key={domain.id}>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{domain.domain}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {domain.allow_subdomains ? 'Sim' : 'Não'}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                        <Link
                                            href={route('domains.destroy', domain.id)}
                                            method="delete"
                                            as="button"
                                            className="text-red-600 hover:text-red-900"
                                        >
                                            Excluir
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </Card>
        </div>
    );
}

function JobSection({ project }: { project: Project }) {
    return (
        <Card>
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium text-gray-900">Histórico de Jobs</h3>
                <Link href={route('projects.crawl-jobs.create', project.id)}>
                    <PrimaryButton>Novo Job</PrimaryButton>
                </Link>
            </div>
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead>
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Progresso</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Data</th>
                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Ações</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {project.crawl_jobs?.map((job) => (
                            <tr key={job.id}>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                        job.status === 'completed' ? 'bg-green-100 text-green-800' :
                                        job.status === 'running' ? 'bg-blue-100 text-blue-800' :
                                        job.status === 'failed' ? 'bg-red-100 text-red-800' : 'bg-gray-100 text-gray-800'
                                    }`}>
                                        {job.status}
                                    </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    {job.total_crawled} / {job.max_pages} páginas
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    {new Date(job.created_at).toLocaleDateString()}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                    <Link href={route('crawl-jobs.show', job.id)} className="text-indigo-600 hover:text-indigo-900">
                                        Visualizar
                                    </Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </Card>
    );
}

function DocumentSection({ project }: { project: Project }) {
    return (
        <Card>
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium text-gray-900">Documentos Recentes</h3>
                <Link href={route('projects.documents.index', project.id)} className="text-sm text-blue-600 hover:underline">
                    Ver todos
                </Link>
            </div>
            <p className="text-gray-500">Nesta aba você pode visualizar os documentos extraídos.</p>
        </Card>
    );
}

function ChunkSection({ project }: { project: Project }) {
    return (
        <Card>
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium text-gray-900">Chunks Preparados</h3>
                <Link href={route('projects.chunks.index', project.id)} className="text-sm text-blue-600 hover:underline">
                    Ver todos
                </Link>
            </div>
            <p className="text-gray-500">Nesta aba você pode visualizar os chunks gerados para LLM.</p>
        </Card>
    );
}

function ExportSection({ project }: { project: Project }) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="flex flex-col items-center text-center">
                <h3 className="text-lg font-bold">Documents JSONL</h3>
                <p className="text-sm text-gray-600 mt-2 mb-6">Dataset completo contendo o texto limpo de todas as páginas coletadas.</p>
                <a href={route('projects.exports.documents', project.id)} target="_blank">
                    <PrimaryButton>Exportar Documentos</PrimaryButton>
                </a>
            </Card>
            <Card className="flex flex-col items-center text-center">
                <h3 className="text-lg font-bold">Chunks JSONL</h3>
                <p className="text-sm text-gray-600 mt-2 mb-6">Dataset segmentado em chunks com overlap, ideal para RAG e fine-tuning.</p>
                <a href={route('projects.exports.chunks', project.id)} target="_blank">
                    <PrimaryButton>Exportar Chunks</PrimaryButton>
                </a>
            </Card>
        </div>
    );
}
