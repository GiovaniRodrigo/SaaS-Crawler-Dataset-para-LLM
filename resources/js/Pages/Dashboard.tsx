import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import Typography from '@/Components/atoms/Typography';
import Button from '@/Components/atoms/Button';
import MetricCard from '@/Components/molecules/MetricCard';
import Card from '@/Components/atoms/Card';
import JobProgressCard from '@/Components/organisms/JobProgressCard';
import RecentActivitiesCard from '@/Components/organisms/RecentActivitiesCard';
import QuickActions from '@/Components/organisms/QuickActions';
import useTranslation from '@/Hooks/useTranslation';
import { 
    FolderKanban, 
    Braces, 
    Zap, 
    Plus, 
    TrendingUp,
    Activity,
} from 'lucide-react';

interface Props {
    stats: {
        total_projects: number;
        total_documents: number;
        total_chunks: number;
        average_quality: number;
    };
    activeJobs: any[];
    recentActivities: any[];
}

export default function Dashboard({ stats, activeJobs, recentActivities }: Props) {
    const { t } = useTranslation();

    return (
        <AuthenticatedLayout
            header={
                <div className="flex items-center justify-between">
                    <div>
                        <Typography variant="h1" className="font-bold text-slate-100">
                            {t('messages.dashboard')}
                        </Typography>
                        <Typography variant="small" className="text-slate-500">
                            {t('messages.welcome_back')}
                        </Typography>
                    </div>
                    <div className="flex gap-3">
                        <Link href={route('projects.create')}>
                            <Button variant="outline" icon={<Plus className="h-4 w-4" />}>
                                {t('messages.new_project')}
                            </Button>
                        </Link>
                        <Link href={route('projects.index')}>
                            <Button icon={<Zap className="h-4 w-4" />}>
                                {t('messages.new_job')}
                            </Button>
                        </Link>
                    </div>
                </div>
            }
        >
            <Head title={t('messages.dashboard')} />

            {/* KPI Grid */}
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                <MetricCard 
                    label={t('messages.projects')} 
                    value={stats.total_projects.toString()} 
                    icon={<FolderKanban className="h-6 w-6" />}
                />
                <MetricCard 
                    label={t('messages.documents')} 
                    value={stats.total_documents > 1000 ? (stats.total_documents / 1000).toFixed(1) + 'k' : stats.total_documents.toString()} 
                    icon={<Activity className="h-6 w-6" />}
                />
                <MetricCard 
                    label={t('messages.chunks')} 
                    value={stats.total_chunks > 1000 ? (stats.total_chunks / 1000).toFixed(1) + 'k' : stats.total_chunks.toString()} 
                    icon={<Braces className="h-6 w-6" />}
                />
                <MetricCard 
                    label="Qualidade Média" 
                    value={Math.round(stats.average_quality) + '%'} 
                    icon={<TrendingUp className="h-6 w-6" />}
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
                            <a href={route('download-extension')} target="_blank">
                                <Button variant="secondary" size="sm" className="mt-4 bg-slate-950 text-cyan-400 border-none shadow-md hover:bg-slate-900">
                                    Baixar Extensão
                                </Button>
                            </a>
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
