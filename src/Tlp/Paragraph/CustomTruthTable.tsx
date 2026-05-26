import { Flex } from '@mantine/core';
import { responsive } from '@/Tlp/styles';
import { TruthTable } from './TruthTable';

export const FlexContainer = ({ children }: { children: React.ReactNode }) => (
    <Flex align="center" wrap="wrap" gap={40} style={{ padding: responsive.contentPadding }}>{children}</Flex>
);

const FlexSecondary = ({ children }: { children: React.ReactNode }) => (
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

const values431_2 = [
    'p', 'q',
    'W', 'W',
    'F', 'W',
    'W', 'F',
    'F', 'F',
];

const values431_3 = [
    'p',
    'W',
    'F',
];

export const CustomTruthTable = () => {
    return (
        <FlexContainer>
            <FlexSecondary>
                <TruthTable col={3} values={values431_1} />
                ，
            </FlexSecondary>
            <FlexSecondary>
                <TruthTable col={2} values={values431_2} />
                ，
            </FlexSecondary>
            <FlexSecondary>
                <TruthTable col={1} values={values431_3} />
                。
            </FlexSecondary>
        </FlexContainer>
    );
};
