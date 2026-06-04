import { Title, Button, Group } from '@mantine/core';

interface Props {
    languages: string[];
    onToggle: (lang: string) => void;
}

const languageOptions: { value: string; label: string }[] = [
    { value: 'cn', label: '中文 🇨🇳' },
    { value: 'en', label: 'English 🇬🇧' },
    { value: 'de', label: 'Deutsch 🇩🇪' },
];

export const Header = ({ languages, onToggle }: Props) => {
    return (
        <div
            style={{
                position: 'relative',
                color: '#fff',
                textAlign: 'center',
                backgroundColor: '#159957',
                backgroundImage: 'linear-gradient(120deg, #155799, #159957)',
                padding: '80px 100px',
            }}
        >
            <Group justify="center" gap="xs" mb="lg">
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
            <h3>汉译世界学术名著丛书——商务印书馆</h3>
            <Title order={1} style={{ fontSize: '50px' }}>逻辑哲学论</Title>
            <h2>〔奥〕维特根斯坦 著</h2>
            <h2>贺绍甲 译</h2>
        </div>
    );
};
