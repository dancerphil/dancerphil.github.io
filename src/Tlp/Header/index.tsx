import { Box, Button, Flex, Group } from '@mantine/core';
import { Cover } from './Cover';
import { CoverInfo } from './types';

interface Props {
    languages: string[];
    onToggle: (lang: string) => void;
}

const languageOptions: { value: string; label: string }[] = [
    { value: 'cn', label: '中文 🇨🇳' },
    { value: 'en', label: 'English 🇬🇧' },
    { value: 'de', label: 'Deutsch 🇩🇪' },
];

const titleMap: Record<string, CoverInfo> = {
    cn: {
        title: '逻辑哲学论',
        source: '汉译世界学术名著丛书——商务印书馆',
        author: '〔奥〕维特根斯坦 著',
        translator: '贺绍甲 译',
        flex: 0.9,
    },
    en: {
        title: 'Tractatus Logico-Philosophicus',
        source: 'https://www.kfs.org/jonathan/witt/ten.htm',
        author: 'Ludwig Wittgenstein',
        translator: 'Translated by C.K. Ogden',
        flex: 1,
    },
    de: {
        title: 'Logisch-Philosophische Abhandlung',
        source: 'https://www.gutenberg.org/ebooks/574',
        author: 'Ludwig Wittgenstein',
        flex: 1.1,
    },
};

export const Header = ({ languages, onToggle }: Props) => {
    const single = languages.length === 1;
    return (
        <div
            style={{
                position: 'relative',
                color: '#fff',
                textAlign: single ? 'center' : 'left',
                backgroundColor: '#159957',
                backgroundImage: 'linear-gradient(120deg, #155799, #159957)',
                padding: '80px 35px',
            }}
        >
            <Group justify="center" gap="xs" mb="xl">
                {languageOptions.map(opt => (
                    <Button
                        key={opt.value}
                        variant={languages.includes(opt.value) ? 'filled' : 'subtle'}
                        color={languages.includes(opt.value) ? 'dark' : 'white'}
                        onClick={() => onToggle(opt.value)}
                    >
                        {opt.label}
                    </Button>
                ))}
            </Group>
            {single ? (
                <Box>
                    {languages.map((lang) => {
                        const cover = titleMap[lang];
                        return <Cover key={lang} cover={cover} />;
                    })}
                </Box>
            ) : (
                <Flex gap={60}>
                    <Box w={100} />
                    {languages.map((lang) => {
                        const cover = titleMap[lang];
                        return <Cover key={lang} cover={cover} />;
                    })}
                </Flex>
            )}
        </div>
    );
};
