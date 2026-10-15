import ReactMarkdown from 'react-markdown';
import type { Components } from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import { Typography } from '@mantine/core';
import 'katex/dist/katex.css';
import c from './Markdown.module.css';

const classNames = { root: c.root };
const remarkPlugins = [remarkGfm, remarkMath];
const rehypePlugins = [rehypeKatex];

// alt 作为图注，span 而非 figure，因为图片位于 p 内
const components: Components = {
    img: ({ src, alt }) => (
        <span className={c.figure}>
            <img src={src} alt={alt} />
            <span className={c.caption}>{alt}</span>
        </span>
    ),
};

interface MarkdownProps {
    children: string;
}

export const Markdown = ({ children }: MarkdownProps) => {
    return (
        <Typography classNames={classNames}>
            <ReactMarkdown remarkPlugins={remarkPlugins} rehypePlugins={rehypePlugins} components={components}>
                {children}
            </ReactMarkdown>
        </Typography>
    );
};
