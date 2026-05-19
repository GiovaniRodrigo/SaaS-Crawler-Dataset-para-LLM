import { usePage } from '@inertiajs/react';
import { Search, Bell, User, ChevronDown } from 'lucide-react';
import Typography from '@/Components/atoms/Typography';
import Badge from '@/Components/atoms/Badge';
import Dropdown from '@/Components/Dropdown';

export default function Topbar() {
    const user = usePage().props.auth.user;

    return (
        <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-slate-200 bg-white/80 px-8 backdrop-blur dark:border-slate-800 dark:bg-slate-900/80">
            {/* Search bar placeholder */}
            <div className="flex w-96 items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 px-4 py-2 text-slate-400 dark:border-slate-800 dark:bg-slate-950/50">
                <Search className="h-4 w-4" />
                <span className="text-sm">Buscar projeto, URL, domínio...</span>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-6">
                <div className="flex items-center gap-2">
                    <Badge variant="indigo" className="px-3">PRO PLAN</Badge>
                    <Typography variant="caption" className="text-[10px] text-slate-400">
                        8.2k / 20k páginas
                    </Typography>
                </div>

                <div className="flex items-center gap-3">
                    <button className="relative rounded-xl p-2 text-slate-500 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800">
                        <Bell className="h-5 w-5" />
                        <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-rose-500 ring-2 ring-white dark:ring-slate-900" />
                    </button>

                    <div className="h-8 w-px bg-slate-200 dark:bg-slate-800" />

                    <Dropdown>
                        <Dropdown.Trigger>
                            <button className="group flex items-center gap-3 rounded-xl p-1 pr-2 transition-colors hover:bg-slate-100 dark:hover:bg-slate-800">
                                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-100 text-indigo-600 dark:bg-indigo-900/40 dark:text-indigo-400">
                                    <User className="h-5 w-5" />
                                </div>
                                <div className="hidden text-left sm:block">
                                    <Typography variant="small" className="font-bold text-slate-900 dark:text-white">
                                        {user.name}
                                    </Typography>
                                    <Typography variant="caption" className="text-[10px] text-slate-400">
                                        Administrador
                                    </Typography>
                                </div>
                                <ChevronDown className="h-4 w-4 text-slate-400 transition-transform group-hover:translate-y-0.5" />
                            </button>
                        </Dropdown.Trigger>

                        <Dropdown.Content>
                            <Dropdown.Link href={route('profile.edit')}>Perfil</Dropdown.Link>
                            <Dropdown.Link href={route('logout')} method="post" as="button">
                                Sair
                            </Dropdown.Link>
                        </Dropdown.Content>
                    </Dropdown>
                </div>
            </div>
        </header>
    );
}
