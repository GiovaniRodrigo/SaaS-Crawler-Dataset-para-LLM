import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import Typography from '@/Components/atoms/Typography';
import Button from '@/Components/atoms/Button';
import MetricCard from '@/Components/molecules/MetricCard';
import Card from '@/Components/atoms/Card';
import JobProgressCard from '@/Components/organisms/JobProgressCard';
import RecentActivitiesCard from '@/Components/organisms/RecentActivitiesCard';
import QuickActions from '@/Components/organisms/QuickActions';
import { 
    FolderKanban, 
    Braces, 
    Zap, 
    Plus, 
    TrendingUp,
    Activity,
} from 'lucide-react';

export default function Dashboard() {
    const activeJobs = [
        { name: 'empresa.com.br/docs', progress: 72, pages: 892, status: 'Running' },
        { name: 'docs.site.com/api', progress: 41, pages: 124, status: 'Running' },
    ];

    const recentActivities = [
        { user: 'Ana', action: 'Exportou dataset', project: 'Base KB', time: '14:10', type: 'export' },
        { user: 'João', action: 'Domínio validado', project: 'Manual Interno', time: '13:50', type: 'domain' },
        { user: 'Sistema', action: 'Job finalizado', project: 'Docs API', time: '12:30', type: 'job' },
    ];

    return (
        <AuthenticatedLayout
            header={
                <div className="flex items-center justify-between">
                    <div>
                        <Typography variant="h1" className="font-bold text-slate-100">
                            Dashboard
                        </Typography>
                        <Typography variant="small" className="text-slate-500">
                            Bem-vindo de volta! Aqui está o resumo dos seus datasets.
                        </Typography>
                    </div>
                    <div className="flex gap-3">
                        <Link href={route('projects.create')}>
                            <Button variant="outline" icon={<Plus className="h-4 w-4" />}>
                                Novo Projeto
                            </Button>
                        </Link>
                        <Button icon={<Zap className="h-4 w-4" />}>
                            Novo Job
                        </Button>
                    </div>
                </div>
            }
        >
            <Head title="Dashboard" />

            {/* KPI Grid */}
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                <MetricCard 
                    label="Projetos Ativos" 
                    value="8" 
                    icon={<FolderKanban className="h-6 w-6" />}
                    trend={{ value: '12%', isPositive: true }}
                />
                <MetricCard 
                    label="Páginas Coletadas" 
                    value="24.3k" 
                    icon={<Activity className="h-6 w-6" />}
                    trend={{ value: '5.2%', isPositive: true }}
                />
                <MetricCard 
                    label="Chunks Gerados" 
                    value="91.2k" 
                    icon={<Braces className="h-6 w-6" />}
                    trend={{ value: '8.4%', isPositive: true }}
                />
                <MetricCard 
                    label="Qualidade Média" 
                    value="87%" 
                    icon={<TrendingUp className="h-6 w-6" />}
                    trend={{ value: '2.1%', isPositive: true }}
                />
            </div>

            <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-3">
                {/* Main Content Area */}
                <div className="lg:col-span-2 space-y-6">
                    <Typography variant="h3" className="font-bold text-slate-100">Jobs em execução</Typography>
                    <JobProgressCard jobs={activeJobs} />

                    <Typography variant="h3" className="font-bold pt-4 text-slate-100">Atividades recentes</Typography>
                    <RecentActivitiesCard activities={recentActivities} />
                </div>

                {/* Sidebar Info Area */}
                <div className="space-y-6">
                    <Typography variant="h3" className="font-bold text-slate-100">Ações rápidas</Typography>
                    <QuickActions />

                    <Card className="bg-cyan-600 text-slate-950 border-none shadow-lg shadow-cyan-600/20 overflow-hidden relative">
                        <div className="relative z-10">
                            <Typography variant="h4" className="font-bold text-slate-950">Extensão do Navegador</Typography>
                            <Typography variant="small" className="mt-2 text-slate-900 font-medium">
                                Capture páginas manualmente e envie direto para seus projetos.
                            </Typography>
                            <Button variant="secondary" size="sm" className="mt-4 bg-slate-950 text-cyan-400 border-none shadow-md hover:bg-slate-900">
                                Baixar Extensão
                            </Button>
                        </div>
                        {/* Abstract shapes */}
                        <div className="absolute -right-8 -bottom-8 h-32 w-32 rounded-full bg-white/20 blur-2xl" />
                        <div className="absolute -left-4 -top-4 h-24 w-24 rounded-full bg-cyan-400/30 blur-2xl" />
                    </Card>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
