import { usePage } from '@inertiajs/react';

export default function useTranslation() {
    const { translations } = usePage<any>().props;

    /**
     * Translate the given key.
     * Use dot notation for nested keys, e.g., 'messages.dashboard'
     */
    const t = (key: string, replacements: Record<string, string> = {}) => {
        const keys = key.split('.');
        let translation = translations;

        for (const k of keys) {
            translation = translation?.[k];
            if (!translation) break;
        }

        if (typeof translation !== 'string') {
            return key;
        }

        Object.keys(replacements).forEach((placeholder) => {
            translation = (translation as string).replace(`:${placeholder}`, replacements[placeholder]);
        });

        return translation;
    };

    return { t };
}
