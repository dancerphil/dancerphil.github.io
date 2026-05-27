import { useMemo } from 'react';
import { ActionIcon, Button, Collapse, Container, Divider, Flex, Group, Stack, Text } from '@mantine/core';
import { useDisclosure, useHotkeys } from '@mantine/hooks';
import { Markdown } from '@hero-u/mantine';
import { getCognition } from '@/Mbti/utils';
import { HelpIcon } from '@/ui';
import { usePersonality, setPersonality } from './region';
import cognitiveContent from './cognitive.md?raw';

const COGNITION_INFO: Record<string, { name: string; description: string }> = {
    Ti: { name: '内倾思考', description: '关注逻辑自洽' },
    Te: { name: '外倾思考', description: '关注效率、结果、组织' },
    Fi: { name: '内倾情感', description: '关注个人价值观与真实感受' },
    Fe: { name: '外倾情感', description: '关注群体情绪与关系协调' },
    Ni: { name: '内倾直觉', description: '关注深层模式和未来趋势' },
    Ne: { name: '外倾直觉', description: '关注可能性扩散' },
    Si: { name: '内倾感觉', description: '关注过去经验与稳定记忆' },
    Se: { name: '外倾感觉', description: '关注现实世界的即时信息' },
};

interface CognitionItemProps {
    rank: number;
    code: string;
    name: string;
    description: string;
}

const CognitionItem = ({ rank, code, name, description }: CognitionItemProps) => (
    <Flex gap="md" align="flex-start">
        <Text style={{ flexShrink: 0, width: 24 }}>{rank}.</Text>
        <Text style={{ flexShrink: 0, width: 28, fontFamily: 'var(--mantine-font-family-monospace)' }}>{code}</Text>
        <Text style={{ flexShrink: 0, width: 72 }}>{name}</Text>
        <Text c="dimmed">{description}</Text>
    </Flex>
);

const POSITION_OPTIONS = [
    { position: 0, options: ['I', 'E'], labels: ['内向', '外向'] },
    { position: 1, options: ['N', 'S'], labels: ['直觉', '感觉'] },
    { position: 2, options: ['T', 'F'], labels: ['思考', '情感'] },
    { position: 3, options: ['J', 'P'], labels: ['判断', '感知'] },
];

export const Mbti = () => {
    const [opened, { toggle }] = useDisclosure(false);
    const personality = usePersonality();
    const result = useMemo(
        () => getCognition(personality),
        [personality],
    );

    const flipPosition = (position: number) => {
        const chars = personality.split('');
        while (chars.length < 4) chars.push('');
        const { options } = POSITION_OPTIONS[position];
        chars[position] = chars[position] === options[0] ? options[1] : options[0];
        setPersonality(chars.join(''));
    };

    useHotkeys([
        ['I', () => flipPosition(0)],
        ['E', () => flipPosition(0)],
        ['N', () => flipPosition(1)],
        ['S', () => flipPosition(1)],
        ['T', () => flipPosition(2)],
        ['F', () => flipPosition(2)],
        ['J', () => flipPosition(3)],
        ['P', () => flipPosition(3)],
    ]);

    return (
        <Container size="lg" py={60}>
            <Group gap="md" mb="xl">
                {POSITION_OPTIONS.map(({ position, options, labels }) => {
                    const index = options.indexOf(personality[position]);
                    return (
                        <Stack key={position} align="center" gap={4}>
                            <ActionIcon size={80} variant="default" onClick={() => flipPosition(position)}>
                                <span style={{ fontSize: '48px', fontWeight: 'bold' }}>
                                    {personality[position] || '?'}
                                </span>
                            </ActionIcon>
                            <Text size="sm" c="dimmed">
                                {index >= 0 ? labels[index] : options.join(' / ')}
                            </Text>
                        </Stack>
                    );
                })}
                <HelpIcon tooltip="按下 I/E、N/S、T/F、J/P 可以切换对应维度" />
            </Group>
            <Stack py="md">
                {result.map((code, index) => {
                    const info = COGNITION_INFO[code];
                    return (
                        <CognitionItem
                            key={index}
                            rank={index + 1}
                            code={code}
                            name={info.name}
                            description={info.description}
                        />
                    );
                })}
            </Stack>
            <Divider my="xl" />
            <Button variant="subtle" onClick={toggle}>
                {opened ? '收起' : '查看更多'}
            </Button>
            <Collapse expanded={opened}>
                <Markdown>{cognitiveContent}</Markdown>
            </Collapse>
        </Container>
    );
};
