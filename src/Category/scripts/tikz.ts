import { readFileSync, readdirSync, writeFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import path from 'node:path';
import url from 'node:url';
import { dvi2svg, load, tex } from 'node-tikzjax';

const dirname = path.dirname(url.fileURLToPath(import.meta.url));
const assetsDir = path.join(dirname, '../assets');
const require = createRequire(import.meta.url);
const fontDir = path.join(path.dirname(require.resolve('node-tikzjax/package.json')), 'css/bakoma/ttf');

// SVG used as <img> cannot load external CSS, so embed the bakoma fonts it references
const embedFonts = (svg: string) => {
    const families = new Set([...svg.matchAll(/font-family="([^"]+)"/g)].map(match => match[1]));
    const rules = [...families].map((family) => {
        const data = readFileSync(path.join(fontDir, `${family}.ttf`)).toString('base64');
        return `@font-face{font-family:${family};src:url(data:font/ttf;base64,${data})}`;
    });
    return svg.replace(/<svg[^>]*>/, tag => `${tag}<defs><style>${rules.join('')}</style></defs>`);
};

await load();
const files = readdirSync(assetsDir).filter(file => file.endsWith('.tex'));
for (const file of files) {
    const source = readFileSync(path.join(assetsDir, file), 'utf8');
    const dvi = await tex(source);
    const svg = embedFonts(await dvi2svg(dvi));
    writeFileSync(path.join(assetsDir, file.replace(/\.tex$/, '.svg')), svg);
    console.log(`rendered ${file}`);
}
