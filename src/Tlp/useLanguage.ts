import { useState, useCallback } from 'react';

const key = 'language';

export const useLanguages = () => {
    const [value, setValue] = useState(() =>
        new URLSearchParams(window.location.search).get(key),
    );

    const toggleLanguage = useCallback(
        (lang: string) => {
            setValue((prev) => {
                const current = (prev ?? 'cn').split(',').filter(Boolean);
                const next = current.includes(lang)
                    ? current.filter(v => v !== lang)
                    : [...current, lang];
                if (next.length === 0) return prev as string | null;

                const val = next.length === 1 && next[0] === 'cn' ? null : next.join(',');

                const params = new URLSearchParams(window.location.search);
                if (val === null) {
                    params.delete(key);
                }
                else {
                    params.set(key, val);
                }
                const search = params.toString().replaceAll('%2C', ',');
                const url = search ? `?${search}` : window.location.pathname;
                window.history.replaceState(null, '', `${url}${window.location.hash}`);

                return val;
            });
        },
        [],
    );

    const languages = (value ?? 'cn').split(',').filter(Boolean);

    return [languages, toggleLanguage] as const;
};
