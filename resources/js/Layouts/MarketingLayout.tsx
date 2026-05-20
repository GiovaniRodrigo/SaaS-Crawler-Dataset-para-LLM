import { Link, usePage } from '@inertiajs/react';
import { PropsWithChildren } from 'react';
import ApplicationLogo from '@/Components/atoms/ApplicationLogo';
import Button from '@/Components/atoms/Button';
import useTranslation from '@/Hooks/useTranslation';
import Typography from '@/Components/atoms/Typography';
import Topbar from '@/Components/organisms/Topbar'; // We might need a simpler version for guest

export default function MarketingLayout({ children }: PropsWithChildren) {
    const { auth, locale } = usePage<any>().props;
    const { t } = useTranslation();

    const languages = [
        { code: 'pt_BR', label: 'BR', flag: '🇧🇷' },
        { code: 'en', label: 'EN', flag: '🇺🇸' },
    ];

    const currentLanguage = languages.find(l => l.code === locale) || languages[0];

    return (
        <div className="min-h-screen bg-slate-950 text-slate-100 selection:bg-cyan-500/30">
            {/* Header */}
            <header className="fixed top-0 z-50 w-full border-b border-slate-800 bg-slate-950/80 backdrop-blur-md">
                <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
                    <Link href="/" className="flex items-center gap-3">
                        <ApplicationLogo />
                    </Link>

                    <nav className="hidden items-center gap-8 md:flex">
                        <Link href={route('product')} className="text-sm font-medium text-slate-400 hover:text-white transition-colors">
                            {t('messages.product')}
                        </Link>
                        <Link href={route('features')} className="text-sm font-medium text-slate-400 hover:text-white transition-colors">
                            {t('messages.features')}
                        </Link>
                        <Link href={route('security')} className="text-sm font-medium text-slate-400 hover:text-white transition-colors">
                            {t('messages.security')}
                        </Link>
                        <Link href="#" className="text-sm font-medium text-slate-400 hover:text-white transition-colors">
                            {t('messages.pricing')}
                        </Link>
                    </nav>

                    <div className="flex items-center gap-4">
                        {/* Language Switcher */}
                        <div className="mr-2 flex items-center gap-2">
                            {languages.map((lang) => (
                                <Link
                                    key={lang.code}
                                    href={`?lang=${lang.code}`}
                                    preserveState={false}
                                    className={`text-xs font-bold p-1 rounded hover:bg-slate-800 ${locale === lang.code ? 'text-cyan-400 border border-cyan-500/30' : 'text-slate-500'}`}
                                >
                                    {lang.code === 'pt_BR' ? 'PT' : 'EN'}
                                </Link>
                            ))}
                        </div>

                        {auth.user ? (
                            <Link href={route('dashboard')}>
                                <Button size="sm">{t('messages.dashboard')}</Button>
                            </Link>
                        ) : (
                            <>
                                <Link href={route('login')} className="text-sm font-medium text-slate-400 hover:text-white">
                                    {t('messages.login')}
                                </Link>
                                <Link href={route('register')}>
                                    <Button size="sm">{t('messages.register')}</Button>
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="pt-16">
                {children}
            </main>

            {/* Footer */}
            <footer className="border-t border-slate-800 py-20 bg-slate-950">
                <div className="mx-auto max-w-7xl px-6">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-8">
                        <div className="flex items-center gap-3">
                            <ApplicationLogo />
                        </div>
                        <Typography variant="caption" className="text-slate-500">
                            © 2026 CrawlMind. Todos os direitos reservados.
                        </Typography>
                        <div className="flex gap-6">
                            {['Twitter', 'GitHub', 'LinkedIn'].map(s => (
                                <Link key={s} href="#" className="text-slate-500 hover:text-white transition-colors">{s}</Link>
                            ))}
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}
