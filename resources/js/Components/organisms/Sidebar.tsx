import { Link, usePage } from '@inertiajs/react';
import { 
    Gauge, 
    FolderKanban, 
    Globe, 
    Activity, 
    CheckSquare, 
    FileText, 
    Braces, 
    Database, 
    BarChart3, 
    Plug, 
    ShieldCheck, 
    CreditCard, 
    Settings,
    LogOut
} from 'lucide-react';
import { cn } from '@/utils';
import Typography from '@/Components/atoms/Typography';
import ApplicationLogo from '@/Components/atoms/ApplicationLogo';
import useTranslation from '@/Hooks/useTranslation';

interface SidebarItemProps {
    href: string;
    icon: any;
    label: string;
    active?: boolean;
}

function SidebarItem({ href, icon: Icon, label, active }: SidebarItemProps) {
    return (
        <Link
            href={href}
            className={cn(
                'group flex items-center gap-3 rounded-xl px-3 py-2 text-sm font-medium transition-all duration-200',
                active 
                    ? 'bg-cyan-500/10 text-cyan-400 shadow-[inset_0_0_10px_rgba(6,182,212,0.1)]' 
                    : 'text-slate-500 hover:bg-slate-800/50 hover:text-slate-200'
            )}
        >
            <Icon className={cn('h-5 w-5 transition-transform group-hover:scale-110', active ? 'text-cyan-400' : 'text-slate-500 group-hover:text-cyan-400')} />
            {label}
        </Link>
    );
}

export default function Sidebar() {
    const { url } = usePage();
    const { t } = useTranslation();

    const menuItems = [
        { group: 'Geral', items: [
            { href: route('dashboard'), icon: Gauge, label: t('messages.dashboard') },
            { href: route('projects.index'), icon: FolderKanban, label: t('messages.projects'), activePrefix: 'projects' },
        ]},
        { group: 'Dados', items: [
            { href: route('domains.index'), icon: Globe, label: t('messages.domains'), activePrefix: 'domains' },
            { href: route('crawl-jobs.indexAll'), icon: Activity, label: t('messages.jobs'), activePrefix: 'crawl-jobs' },
            { href: route('documents.review.index'), icon: CheckSquare, label: t('messages.review'), activePrefix: 'review' },
            { href: route('documents.indexAll'), icon: FileText, label: t('messages.documents'), activePrefix: 'documents' },
            { href: route('chunks.indexAll'), icon: Braces, label: t('messages.chunks'), activePrefix: 'chunks' },
        ]},
        { group: 'Sistema', items: [
            { href: route('settings.datasets'), icon: Database, label: 'Datasets' },
            { href: route('settings.reports'), icon: BarChart3, label: 'Relatórios' },
            { href: route('settings.tokens'), icon: Plug, label: 'API Tokens', activePrefix: 'settings/tokens' },
            { href: route('settings.audit'), icon: ShieldCheck, label: 'Auditoria' },
        ]},
        { group: 'Configurações', items: [
            { href: route('settings.billing'), icon: CreditCard, label: 'Plano' },
            { href: route('settings.general'), icon: Settings, label: 'Configurações' },
        ]},
    ];

    const isItemActive = (item: any) => {
        if (item.activePrefix) {
            return url.startsWith(`/${item.activePrefix}`) || route().current(`${item.activePrefix}.*`);
        }

        const isDashboard = item.href === route('dashboard');
        if (isDashboard) {
            return route().current('dashboard');
        }

        try {
            return url === new URL(item.href).pathname;
        } catch (e) {
            return false;
        }
    };

    return (
        <aside className="fixed left-0 top-0 z-40 h-screen w-72 border-r border-slate-800 bg-slate-900/50 backdrop-blur-xl">
            <div className="flex h-full flex-col px-4 py-6">
                {/* Logo */}
                <div className="mb-10 px-2">
                    <ApplicationLogo className="scale-100" />
                </div>

                {/* Navigation */}
                <nav id="sidebar-nav" className="flex-1 space-y-8 overflow-y-auto pr-2 custom-scrollbar">
                    {menuItems.map((group, idx) => (
                        <div key={idx} className="space-y-2">
                            <Typography variant="caption" className="px-3 text-slate-600 font-bold uppercase tracking-wider text-[10px]">
                                {group.group}
                            </Typography>
                            <div className="space-y-1">
                                {group.items.map((item, itemIdx) => (
                                    <SidebarItem 
                                        key={itemIdx} 
                                        {...item} 
                                        active={isItemActive(item)}
                                    />
                                ))}
                            </div>
                        </div>
                    ))}
                </nav>

                {/* Footer */}
                <div className="mt-auto border-t border-slate-800 pt-4">
                    <Link
                        href={route('logout')}
                        method="post"
                        as="button"
                        className="flex w-full items-center gap-3 rounded-xl px-3 py-2 text-sm font-medium text-slate-500 transition-all hover:bg-rose-500/10 hover:text-rose-400"
                    >
                        <LogOut className="h-5 w-5" />
                        Sair da conta
                    </Link>
                </div>
            </div>
        </aside>
    );
}
