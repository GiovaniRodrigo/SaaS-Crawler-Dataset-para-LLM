import Card from '@/Components/atoms/Card';
import Typography from '@/Components/atoms/Typography';
import { Activity } from 'lucide-react';
import { Link } from '@inertiajs/react';

interface Job {
    name: string;
    progress: number;
    pages: number;
    status?: string;
}

interface JobProgressCardProps {
    jobs: Job[];
}

export default function JobProgressCard({ jobs }: JobProgressCardProps) {
    return (
        <Card padding="none" className="overflow-hidden">
            {jobs.length > 0 ? (
                <div className="divide-y divide-slate-800">
                    {jobs.map((job, idx) => (
                        <div key={idx} className="p-6 hover:bg-slate-800/30 transition-colors">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-500/10 text-cyan-400">
                                        <Activity className="h-5 w-5 animate-pulse" />
                                    </div>
                                    <div>
                                        <Typography variant="body" className="font-bold text-slate-100">{job.name}</Typography>
                                        <Typography variant="caption" className="text-slate-500">{job.pages} páginas coletadas</Typography>
                                    </div>
                                </div>
                                <Typography variant="small" className="font-bold text-cyan-400">{job.progress}%</Typography>
                            </div>
                            <div className="mt-4 h-2 w-full overflow-hidden rounded-full bg-slate-800">
                                <div 
                                    className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 transition-all duration-500 shadow-[0_0_10px_rgba(6,182,212,0.5)]" 
                                    style={{ width: `${job.progress}%` }} 
                                />
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="p-12 text-center">
                    <Typography variant="body" className="text-slate-500">Nenhum job em execução</Typography>
                </div>
            )}
            <div className="bg-slate-800/50 p-4 text-center border-t border-slate-800">
                <Link href="#" className="text-sm font-medium text-cyan-400 hover:text-cyan-300 transition-colors">
                    Ver todos os jobs
                </Link>
            </div>
        </Card>
    );
}
