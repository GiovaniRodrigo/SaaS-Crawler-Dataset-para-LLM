import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
    plugins: [react()],
    test: {
        globals: true,
        environment: 'jsdom',
        setupFiles: './resources/js/tests/setup.ts',
        exclude: ['**/node_modules/**', '**/dist/**', '**/tests/e2e/**', '**/cypress/**'],
        alias: {
            '@': path.resolve(__dirname, './resources/js'),
        },
    },
});
