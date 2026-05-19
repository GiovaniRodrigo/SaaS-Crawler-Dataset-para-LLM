import './bootstrap';
import '../css/app.css';

import { createInertiaApp } from '@inertiajs/react';
import { createRoot } from 'react-dom/client';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

const el = document.getElementById('app');
const initialPage = el?.dataset.page ? JSON.parse(el.dataset.page) : null;

if (initialPage) {
    createInertiaApp({
        title: (title) => `${title} - ${appName}`,
        resolve: (name) => resolvePageComponent(`./Pages/${name}.tsx`, import.meta.glob('./Pages/**/*.tsx')) as any,
        setup({ el, App, props }) {
            createRoot(el).render(<App {...props} />);
        },
        progress: {
            color: '#06b6d4',
        },
        page: initialPage
    });
}
