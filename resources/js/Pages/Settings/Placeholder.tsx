import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import Typography from '@/Components/atoms/Typography';
import Card from '@/Components/atoms/Card';
import { Construction } from 'lucide-react';

interface Props {
    title: string;
    description: string;
}

export default function Placeholder({ title, description }: Props) {
    return (
        <AuthenticatedLayout
            header={
                <Typography variant="h1" className="font-bold text-slate-100">
                    {title}
                </Typography>
            }
        >
            <Head title={title} />

            <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
                <div className="h-20 w-20 rounded-full bg-amber-500/10 flex items-center justify-center text-amber-500 mb-6 border border-amber-500/20 shadow-lg shadow-amber-500/5">
                    <Construction className="h-10 w-10" />
                </div>
                <Typography variant="h2" className="font-bold text-slate-100 mb-2">{title} em construção</Typography>
                <Typography variant="body" className="text-slate-500 max-w-md">
                    {description}
                </Typography>
                
                <Card className="mt-8 bg-slate-800/30 border-slate-800 max-w-lg">
                    <Typography variant="small" className="text-slate-400 italic">
                        Esta funcionalidade está no nosso roadmap de produto e estará disponível em breve para assinantes do plano Premium.
                    </Typography>
                </Card>
            </div>
        </AuthenticatedLayout>
    );
}
