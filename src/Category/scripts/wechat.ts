import { createHash } from 'node:crypto';
import { mkdirSync, readFileSync, readdirSync, rmSync, writeFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import path from 'node:path';
import url from 'node:url';
import { createElement, Fragment } from 'react';
import type { CSSProperties } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import ReactMarkdown from 'react-markdown';
import type { Components } from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import katex from 'katex';
import { Resvg } from '@resvg/resvg-js';
import { dvi2svg, load, tex } from 'node-tikzjax';

const dirname = path.dirname(url.fileURLToPath(import.meta.url));
const articlesDir = path.join(dirname, '../wechat-articles');
const outDir = path.join(dirname, '../../../dist-wechat');
const imagesDir = path.join(outDir, 'images');
const require = createRequire(import.meta.url);
const fontDir = path.join(path.dirname(require.resolve('node-tikzjax/package.json')), 'css/bakoma/ttf');

// 光栅化倍数，保证高 DPI 下清晰
const ZOOM = 3;
// TeX 10pt 字号（SVG 中约 13.33px）映射到 16px 正文字号
const TEX_TO_CSS = 1.2;
// 27px（SVG 宽度属性单位）换算为 TeX pt
const MIN_INLINE_WIDTH_PT = 20.3;

interface Image {
    src: string;
    width: number;
    height: number;
}

// node-tikzjax 生成的 SVG 文字依赖 bakoma 字体，resvg 不读取 @font-face，需显式传入字体文件
const rasterize = (svg: string): Image => {
    const families = [...new Set([...svg.matchAll(/font-family="([^"]+)"/g)].map(match => match[1]))];
    const image = new Resvg(svg, {
        font: {
            loadSystemFonts: false,
            fontFiles: families.map(family => path.join(fontDir, `${family}.ttf`)),
            defaultFontFamily: 'cmr10',
        },
        fitTo: { mode: 'zoom', value: ZOOM },
    }).render();
    const png = image.asPng();
    writeFileSync(path.join(imagesDir, `${createHash('sha1').update(png).digest('hex').slice(0, 12)}.png`), png);
    return {
        src: `data:image/png;base64,${png.toString('base64')}`,
        width: image.width / ZOOM * TEX_TO_CSS,
        height: image.height / ZOOM * TEX_TO_CSS,
    };
};

const renderFormula = async (latex: string, display: boolean) => {
    const math = display ? String.raw`\displaystyle ${latex}` : latex;
    const node = display ? 'inner sep=0pt' : `inner sep=0pt, minimum width=${MIN_INLINE_WIDTH_PT}pt`;
    const dvi = await tex(String.raw`\usepackage{amsmath,amssymb,amstext,tikz}
\begin{document}
\begin{tikzpicture}\node[${node}] {$${math}$};\end{tikzpicture}
\end{document}`);
    return rasterize(await dvi2svg(dvi));
};

const FORMULA_PATTERN = /\$\$([\s\S]+?)\$\$|\$([^$\n]+?)\$/g;

const collectFormulas = (markdown: string) => [...markdown.matchAll(FORMULA_PATTERN)].map(match => ({
    display: match[1] !== undefined,
    latex: (match[1] ?? match[2]).trim(),
}));

const mathText = (latex: string) => {
    const text = katex.renderToString(latex, { output: 'mathml' }).replaceAll(/<annotation[\s\S]*?<\/annotation>/g, '').replaceAll(/<[^>]+>/g, '').replaceAll('&gt;', '>').replaceAll('&lt;', '<').trim();
    return [...text].length === 1 || /^[A-Za-z0-9]+$/.test(text) ? text : undefined;
};
// 单字符为斜体变量，多字母单词（如 Id）保持正体
const renderMathText = (text: string) => text.split(/((?<![A-Za-z])[A-Za-zημ](?![A-Za-z]))/).map((part, index) => (index % 2 ? createElement('i', { key: index }, part) : part));

const formulaKey = (display: boolean, latex: string) => `${display}:${latex}`;

const getImage = (images: Map<string, Image>, key: string | undefined) => {
    const image = images.get(key ?? '');
    if (!image) throw new Error(`Missing rendered image: ${key}`);
    return image;
};

const styles: Record<string, CSSProperties> = {
    root: { maxWidth: 677, margin: '0 auto', fontSize: 16, lineHeight: 1.75, color: '#333', textAlign: 'justify' },
    h1: { fontSize: 22, fontWeight: 'bold', margin: '32px 0 16px', textAlign: 'center' },
    h2: { fontSize: 19, fontWeight: 'bold', margin: '28px 0 12px' },
    h3: { fontSize: 17, fontWeight: 'bold', margin: '24px 0 10px' },
    p: { margin: '12px 0' },
    li: { margin: '6px 0' },
    blockquote: { margin: '12px 0', padding: '8px 16px', borderLeft: '3px solid #ccc', color: '#666' },
    figure: { textAlign: 'center', margin: '24px 0' },
    figureImg: { maxWidth: '100%' },
    caption: { fontSize: 14, color: '#888', margin: '8px 0 0' },
    inline: { verticalAlign: 'middle' },
    display: { display: 'block', margin: '16px auto' },
};

const createComponents = (formulas: Map<string, Image>, figures: Map<string, Image>): Components => ({
    h1: ({ children }) => createElement('h1', { style: styles.h1 }, children),
    h2: ({ children }) => createElement('h2', { style: styles.h2 }, children),
    h3: ({ children }) => createElement('h3', { style: styles.h3 }, children),
    p: ({ children }) => createElement('p', { style: styles.p }, children),
    li: ({ children }) => createElement('li', { style: styles.li }, children),
    blockquote: ({ children }) => createElement('blockquote', { style: styles.blockquote }, children),
    // remark-math 的块级公式外层会包一层 pre，这里去掉
    pre: ({ children }) => createElement('div', null, children),
    code: ({ className, children }) => {
        const latex = String(children).trim();
        if (className === 'language-math math-inline') {
            const text = mathText(latex);
            if (text) return createElement(Fragment, null, ...renderMathText(text));
            const image = getImage(formulas, formulaKey(false, latex));
            return createElement('img', { src: image.src, alt: latex, style: { ...styles.inline, width: image.width, height: image.height } });
        }
        if (className === 'language-math math-display') {
            const image = getImage(formulas, formulaKey(true, latex));
            return createElement('img', { src: image.src, alt: latex, style: { ...styles.display, width: image.width, height: image.height } });
        }
        return createElement('code', null, children);
    },
    img: ({ src, alt }) => {
        const image = getImage(figures, src);
        const img = createElement('img', { src: image.src, alt, style: { ...styles.figureImg, width: image.width } });
        return createElement('section', { style: styles.figure }, img, createElement('p', { style: styles.caption }, alt));
    },
});

const cssText = (style: CSSProperties) => Object.entries(style).map(([key, value]) => `${key.replaceAll(/[A-Z]/g, letter => `-${letter.toLowerCase()}`)}:${value}`).join(';');

const renderArticle = (markdown: string, components: Components) => {
    const body = renderToStaticMarkup(createElement(ReactMarkdown, { remarkPlugins: [remarkGfm, remarkMath], components }, markdown));
    return `<!DOCTYPE html><html><head><meta charset="utf-8"></head><body><section style="${cssText(styles.root)}">${body}</section></body></html>`;
};

await load();
rmSync(outDir, { recursive: true, force: true });
mkdirSync(imagesDir, { recursive: true });
const files = readdirSync(articlesDir).filter(file => file.endsWith('.md'));
for (const file of files) {
    const markdown = readFileSync(path.join(articlesDir, file), 'utf8');
    const formulas = new Map<string, Image>();
    for (const { display, latex } of collectFormulas(markdown)) {
        if (!display && mathText(latex)) continue;
        formulas.set(formulaKey(display, latex), await renderFormula(latex, display));
    }
    const figures = new Map<string, Image>();
    for (const [, src] of markdown.matchAll(/!\[[^\]]*\]\(([^)]+)\)/g)) {
        const svg = readFileSync(path.join(articlesDir, src), 'utf8');
        figures.set(src, rasterize(svg));
    }
    const html = renderArticle(markdown, createComponents(formulas, figures));
    writeFileSync(path.join(outDir, file.replace(/\.md$/, '.html')), html);
    console.log(`rendered ${file}`);
}
