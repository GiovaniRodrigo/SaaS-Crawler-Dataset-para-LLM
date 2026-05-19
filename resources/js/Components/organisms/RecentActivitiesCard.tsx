import Card from '@/Components/atoms/Card';
import Typography from '@/Components/atoms/Typography';
import { Clock } from 'lucide-react';

interface Activity {
    user: string;
    action: string;
    project: string;
    time: string;
    type?: string;
}

interface RecentActivitiesCardProps {
    activities: Activity[];
}

export default function RecentActivitiesCard({ activities }: RecentActivitiesCardProps) {
    return (
        <Card padding="none" className="overflow-hidden">
            {activities.length > 0 ? (
                <div className="divide-y divide-slate-800">
                    {activities.map((act, idx) => (
                        <div key={idx} className="flex items-center justify-between p-4 px-6 hover:bg-slate-800/30 transition-colors">
                            <div className="flex items-center gap-4">
                                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-800 text-slate-400">
                                    <Clock className="h-4 w-4" />
                                </div>
                                <div>
                                    <Typography variant="small" className="font-medium">
                                        <span className="font-bold text-slate-100">{act.user}</span> <span className="text-slate-300">{act.action}</span>
                                    </Typography>
                                    <Typography variant="caption" className="text-slate-500">{act.project}</Typography>
                                </div>
                            </div>
                            <Typography variant="caption" className="text-slate-400">{act.time}</Typography>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="p-12 text-center">
                    <Typography variant="body" className="text-slate-500">Nenhuma atividade recente</Typography>
                </div>
            )}
        </Card>
    );
}
