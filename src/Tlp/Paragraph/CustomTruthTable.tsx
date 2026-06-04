import { ReactNode } from 'react';
import { Flex } from '@mantine/core';
import { TruthTable } from './TruthTable';

interface Props {
    children: ReactNode;
}

export const FlexContainer = ({ children }: Props) => (
    <Flex align="center" justify="center" wrap="wrap" gap={40} py="lg">{children}</Flex>
);

const FlexSecondary = ({ children }: Props) => (
    <Flex align="center" wrap="wrap" gap={10}>{children}</Flex>
);

const values431_1 = [
    'p', 'q', 'r',
    'W', 'W', 'W',
    'F', 'W', 'W',
    'W', 'F', 'W',
    'W', 'W', 'F',
    'F', 'F', 'W',
    'F', 'W', 'F',
    'W', 'F', 'F',
    'F', 'F', 'F',
];

const values431_1_en = [
    'p', 'q', 'r',
    'T', 'T', 'T',
    'F', 'T', 'T',
    'T', 'F', 'T',
    'T', 'T', 'F',
    'F', 'F', 'T',
    'F', 'T', 'F',
    'T', 'F', 'F',
    'F', 'F', 'F',
];

const values431_2 = [
    'p', 'q',
    'W', 'W',
    'F', 'W',
    'W', 'F',
    'F', 'F',
];

const values431_2_en = [
    'p', 'q',
    'T', 'T',
    'F', 'T',
    'T', 'F',
    'F', 'F',
];

const values431_3 = [
    'p',
    'W',
    'F',
];

const values431_3_en = [
    'p',
    'T',
    'F',
];

export const CustomTruthTable = ({ language }: { language?: string | null }) => {
    const en = language === 'en';
    const v1 = en ? values431_1_en : values431_1;
    const v2 = en ? values431_2_en : values431_2;
    const v3 = en ? values431_3_en : values431_3;
    return (
        <FlexContainer>
            <FlexSecondary>
                <TruthTable col={3} values={v1} />
                ，
            </FlexSecondary>
            <FlexSecondary>
                <TruthTable col={2} values={v2} />
                ，
            </FlexSecondary>
            <FlexSecondary>
                <TruthTable col={1} values={v3} />
                。
            </FlexSecondary>
        </FlexContainer>
    );
};
