import { Fragment } from 'react';
import { Container, Divider } from '@mantine/core';
import { Markdown } from '@/components/Markdown';

const articles = import.meta.glob<string>('./articles/*.md', {
    query: '?raw',
    import: 'default',
    eager: true,
});

const assets = import.meta.glob<string>('./assets/*.svg', {
    query: '?url',
    import: 'default',
    eager: true,
});

const assetUrls = Object.fromEntries(
    Object.entries(assets).map(([path, url]) => [path.split('/').pop(), url]),
);

const contents = Object.keys(articles)
    .toSorted((a, b) => a.localeCompare(b, undefined, { numeric: true }))
    .map(path => articles[path].replaceAll(/\.\.\/assets\/([\w-]+\.svg)/g, (_, name: string) => assetUrls[name]));

export const Category = () => {
    return (
        <Container size="md" py={60}>
            {contents.map((content, index) => (
                <Fragment key={index}>
                    {index > 0 && <Divider my="xl" />}
                    <Markdown>{content}</Markdown>
                </Fragment>
            ))}
        </Container>
    );
};
