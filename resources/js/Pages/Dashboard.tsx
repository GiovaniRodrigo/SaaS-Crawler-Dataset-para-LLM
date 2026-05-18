import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import Card from '@/Components/atoms/Card';
import PrimaryButton from '@/Components/PrimaryButton';

export default function Dashboard() {
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Dashboard
                </h2>
            }
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <Card className="flex flex-col items-center text-center">
                            <h3 className="text-lg font-bold">Gerenciar Projetos</h3>
                            <p className="text-gray-600 mt-2 mb-6">Crie e gerencie seus projetos de crawling e datasets.</p>
                            <Link href={route('projects.index')}>
                                <PrimaryButton>Ver Meus Projetos</PrimaryButton>
                            </Link>
                        </Card>
                        <Card className="flex flex-col items-center text-center">
                            <h3 className="text-lg font-bold">Novo Projeto</h3>
                            <p className="text-gray-600 mt-2 mb-6">Comece um novo projeto de coleta agora mesmo.</p>
                            <Link href={route('projects.create')}>
                                <PrimaryButton>Criar Projeto</PrimaryButton>
                            </Link>
                        </Card>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
