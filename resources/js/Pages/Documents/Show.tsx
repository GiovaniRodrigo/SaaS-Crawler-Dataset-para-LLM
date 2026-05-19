import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import Card from '@/Components/atoms/Card';
import SecondaryButton from '@/Components/SecondaryButton';

interface Props {
    document: any;
}

export default function Show({ document }: Props) {
    return (
        <AuthenticatedLayout
            header={
                <div className="flex items-center justify-between gap-4">
                    <div>
                        <p className="text-xs font-semibold uppercase text-cyan-300">Documento</p>
                        <h2 className="mt-1 text-2xl font-bold text-slate-100">{document.title || 'Sem título'}</h2>
                    </div>
                    <Link href={route('projects.documents.index', document.project_id)}>
                        <SecondaryButton>Voltar à lista</SecondaryButton>
                    </Link>
                </div>
            }
        >
            <Head title="Visualizar Documento" />

            <div className="py-10">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <Card>
                        <div className="mb-6">
                            <span className="font-semibold text-slate-400">URL:</span>
                            <a href={document.url} target="_blank" className="ml-2 break-all text-cyan-300 hover:text-cyan-200">{document.url}</a>
                        </div>
                        <div className="whitespace-pre-wrap rounded-lg border border-slate-800 bg-slate-900/70 p-6 font-mono text-sm leading-relaxed text-slate-200">
                            {document.text}
                        </div>
                    </Card>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
