import path from 'node:path';
import { readdirSync } from 'node:fs';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

const getInput = () => {
    const htmlFiles = readdirSync(import.meta.dirname).filter(file => path.extname(file) === '.html');
    const input: Record<string, string> = {
        main: path.resolve(import.meta.dirname, 'index.html'),
    };
    htmlFiles.forEach((file) => {
        const name = file.slice(0, -5);
        input[name] = path.resolve(import.meta.dirname, file);
    });
    return input;
};

export default defineConfig(() => {
    return {
        build: {
            outDir: 'dist',
            rolldownOptions: {
                input: getInput(),
            },
        },
        plugins: [
            react(),
        ],
        resolve: {
            alias: {
                '@': '/src',
            },
        },
    };
});
