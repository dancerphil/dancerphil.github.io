import path from 'node:path';
import { readdirSync } from 'node:fs';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

const getInput = () => {
    const htmlFiles = readdirSync(__dirname).filter(file => path.extname(file) === '.html');
    const input: Record<string, string> = {
        main: path.resolve(__dirname, 'index.html'),
    };
    htmlFiles.forEach((file) => {
        const name = file.slice(0, -5);
        input[name] = path.resolve(__dirname, file);
    });
    return input;
};

export default defineConfig(() => {
    return {
        build: {
            outDir: 'dist',
            rollupOptions: {
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
