import { defineConfig, presetMini } from 'unocss';
import presetRemToPx from '@unocss/preset-rem-to-px';

export default defineConfig({
    theme: {
        preflightRoot: ':root',
    },
    presets: [
        presetRemToPx({ baseFontSize: 4 }),
        presetMini({
            variablePrefix: '',
            preflight: 'on-demand',
        }),
    ],
});
