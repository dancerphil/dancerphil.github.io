import { css } from '@emotion/css';
import { ActionIcon, Group, Menu } from '@mantine/core';
import { useHotkeys } from '@mantine/hooks';
import { usePersonality, setPersonality } from './region';
import { useMemo } from 'react';
import { getCognition } from '@/Mbti/utils';
import { HelpIcon } from '@/ui';

const containerCss = css`
    max-width: 1000px;
    margin: 0 auto;
    padding: 60px 0;
`;

const headerCss = css`
    display: flex;
    align-items: center;
    gap: 8px;
    margin-bottom: 20px;
`;

const resultCss = css`
    padding: 20px 12px;
`;

const POSITION_OPTIONS = [
    { position: 0, options: ['I', 'E'], labels: ['I - 内向', 'E - 外向'] },
    { position: 1, options: ['N', 'S'], labels: ['N - 直觉', 'S - 感觉'] },
    { position: 2, options: ['T', 'F'], labels: ['T - 思考', 'F - 情感'] },
    { position: 3, options: ['J', 'P'], labels: ['J - 判断', 'P - 感知'] },
];

export const Mbti = () => {
    const personality = usePersonality();
    const result = useMemo(
        () => getCognition(personality),
        [personality],
    );

    const updatePosition = (position: number, char: string) => {
        const chars = personality.split('');
        while (chars.length < 4) chars.push('');
        chars[position] = char;
        setPersonality(chars.join(''));
    };

    useHotkeys([
        ['I', () => updatePosition(0, 'I')],
        ['E', () => updatePosition(0, 'E')],
        ['N', () => updatePosition(1, 'N')],
        ['S', () => updatePosition(1, 'S')],
        ['T', () => updatePosition(2, 'T')],
        ['F', () => updatePosition(2, 'F')],
        ['J', () => updatePosition(3, 'J')],
        ['P', () => updatePosition(3, 'P')],
    ]);

    return (
        <div className={containerCss}>
            <div className={headerCss}>
                <span>使用键盘快捷键快速输入：</span>
                <HelpIcon tooltip="I/E: 内向/外向 | N/S: 直觉/感觉 | T/F: 思考/情感 | J/P: 判断/感知" />
            </div>
            <Group gap="md" mb="xl">
                {POSITION_OPTIONS.map(({ position, options, labels }) => (
                    <Menu key={position} position="bottom">
                        <Menu.Target>
                            <ActionIcon size={80} variant="default">
                                <span style={{ fontSize: '48px', fontWeight: 'bold' }}>
                                    {personality[position] || '?'}
                                </span>
                            </ActionIcon>
                        </Menu.Target>
                        <Menu.Dropdown>
                            {options.map((option, idx) => (
                                <Menu.Item
                                    key={option}
                                    onClick={() => updatePosition(position, option)}
                                >
                                    {labels[idx]}
                                </Menu.Item>
                            ))}
                        </Menu.Dropdown>
                    </Menu>
                ))}
            </Group>
            <div className={resultCss}>{result.join(' ')}</div>
        </div>
    );
};
