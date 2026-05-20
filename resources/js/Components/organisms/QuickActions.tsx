import Card from '@/Components/atoms/Card';
import Typography from '@/Components/atoms/Typography';
import { Plus, Zap, ArrowRight } from 'lucide-react';
import { Link } from '@inertiajs/react';

export default function QuickActions() {
    return (
        <div className="grid grid-cols-1 gap-4">
            <Link href={route('projects.create')} className="block">
                <Card className="group border-slate-800 bg-slate-900/50 hover:border-cyan-500/50 transition-all cursor-pointer">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="rounded-xl bg-cyan-500/10 p-3 text-cyan-400">
                                <Plus className="h-5 w-5" />
                            </div>
                            <Typography variant="body" className="font-bold text-slate-100">Novo Projeto</Typography>
                        </div>
                        <ArrowRight className="h-5 w-5 text-slate-600 group-hover:translate-x-1 group-hover:text-cyan-400 transition-all" />
                    </div>
                </Card>
            </Link>
            <Link href={route('projects.index')} className="block">
                <Card className="group border-slate-800 bg-slate-900/50 hover:border-emerald-500/50 transition-all cursor-pointer">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="rounded-xl bg-emerald-500/10 p-3 text-emerald-400">
                                <Zap className="h-5 w-5" />
                            </div>
                            <Typography variant="body" className="font-bold text-slate-100">Iniciar Crawling</Typography>
                        </div>
                        <ArrowRight className="h-5 w-5 text-slate-600 group-hover:translate-x-1 group-hover:text-emerald-400 transition-all" />
                    </div>
                </Card>
            </Link>
        </div>
    );
}
