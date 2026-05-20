import { usePage, Link } from '@inertiajs/react';
import { Search, Bell, User, ChevronDown, Languages, HelpCircle, MessageCircle } from 'lucide-react';
import Typography from '@/Components/atoms/Typography';
import Badge from '@/Components/atoms/Badge';
import Dropdown from '@/Components/Dropdown';

import useTranslation from '@/Hooks/useTranslation';

export default function Topbar() {
    const { t } = useTranslation();
    const { auth, locale } = usePage<any>().props;
    const user = auth.user;

    const languages = [
        { code: 'pt_BR', label: 'Português', flag: '🇧🇷' },
        { code: 'en', label: 'English', flag: '🇺🇸' },
    ];

    const currentLanguage = languages.find(l => l.code === locale) || languages[0];

    return (
        <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-slate-200 bg-white/80 px-8 backdrop-blur dark:border-slate-800 dark:bg-slate-900/80">
            <div className="flex items-center gap-6">
                {/* Organization Switcher (Placeholder for now) */}
                <div id="org-selector" className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                    <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-cyan-500 text-white shadow-lg shadow-cyan-500/20">
                        <span className="text-[10px] font-bold">{auth.organization.name.substring(0, 1)}</span>
                    </div>
                    <span className="text-xs font-bold text-slate-700 dark:text-slate-200">{auth.organization.name}</span>
                </div>

                <div id="global-search" className="flex w-72 items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 px-4 py-2 text-slate-400 dark:border-slate-800 dark:bg-slate-950/50">
                    <Search className="h-4 w-4" />
                    <span className="text-sm">{t('messages.search_placeholder')}</span>
                </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-6">
                <Dropdown>
                    <Dropdown.Trigger>
                        <button className="flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-medium text-slate-500 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800">
                            <span>{currentLanguage.flag}</span>
                            <span className="hidden sm:inline">{currentLanguage.label}</span>
                            <ChevronDown className="h-4 w-4" />
                        </button>
                    </Dropdown.Trigger>
                    <Dropdown.Content>
                        {languages.map((lang) => (
                            <Dropdown.Link 
                                key={lang.code} 
                                href={`?lang=${lang.code}`}
                                preserveState={false}
                            >
                                <span className="mr-2">{lang.flag}</span>
                                {lang.label}
                            </Dropdown.Link>
                        ))}
                    </Dropdown.Content>
                </Dropdown>

                <div className="flex items-center gap-2">
                    <Badge variant="indigo" className="px-3">PRO PLAN</Badge>
                    <Typography variant="caption" className="text-[10px] text-slate-400">
                        8.2k / 20k páginas
                    </Typography>
                </div>

                <div className="flex items-center gap-3">
                    <Dropdown>
                        <Dropdown.Trigger>
                            <button className="relative rounded-xl p-2 text-slate-500 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800">
                                <HelpCircle className="h-5 w-5" />
                            </button>
                        </Dropdown.Trigger>
                        <Dropdown.Content>
                            <div className="px-4 py-2 border-b border-slate-100 dark:border-slate-800">
                                <Typography variant="caption" className="font-bold text-slate-400 uppercase">Ajuda</Typography>
                            </div>
                            <button 
                                onClick={() => window.dispatchEvent(new CustomEvent('start-onboarding-tour'))}
                                className="flex items-center gap-2 w-full text-left px-4 py-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                            >
                                <Languages className="h-4 w-4 text-slate-400" />
                                Tour Guiado
                            </button>
                            <button 
                                className="flex items-center gap-2 w-full text-left px-4 py-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                            >
                                <MessageCircle className="h-4 w-4 text-slate-400" />
                                Chat de Suporte
                            </button>
                            <Dropdown.Link href="#">
                                <div className="flex items-center gap-2">
                                    <HelpCircle className="h-4 w-4 text-slate-400" />
                                    Documentação
                                </div>
                            </Dropdown.Link>
                            <Dropdown.Link href="#">Suporte</Dropdown.Link>
                        </Dropdown.Content>
                    </Dropdown>

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
