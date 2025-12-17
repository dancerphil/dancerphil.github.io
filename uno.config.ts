import { defineConfig, Rule } from 'unocss';

const generateRule = (name: string): Rule => {
    return [
        new RegExp(`^${name}-([.\\d]+)$`),
        ([_, num]) => ({ [name]: `${num}px` }),
    ];
};

export default defineConfig({
    rules: [
        generateRule('margin'),
        generateRule('margin-left'),
        generateRule('margin-right'),
        generateRule('margin-top'),
        generateRule('margin-bottom'),
        generateRule('padding'),
        generateRule('width'),
        generateRule('height'),
        generateRule('font-size'),
        [/^size-([.\d]+)$/, ([_, num]) => ({ width: `${num}px`, height: `${num}px` })],
    ],
});
