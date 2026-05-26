import { useState } from 'react';
import { NumberInput, Select, Flex, Text } from '@mantine/core';

interface Params {
    ratePercentage: number;
    gap: string;
    term: number;
    termValue: number;
}

const getIndex = ({ gap }: Params) => {
    switch (gap) {
        case 'year':
            return 1;
        case 'month':
            return 1 / 12;
        case 'day':
            return 1 / 365.24;
        default:
            return 1 / 12;
    }
};

const computeValue = (params: Params) => {
    const { ratePercentage, term, termValue } = params;
    const rate = 1 + ratePercentage / 100;
    const index = getIndex(params);
    const rateOfGap = rate ** index;
    const rateBackward = 1 / rateOfGap;
    const v1 = termValue / rateBackward;
    const value = v1 * (1 - rateBackward ** term) / (1 - rateBackward);
    return value.toFixed(2);
};

export const CashFlow = () => {
    const [gap, setGap] = useState('month');
    const [ratePercentage, setRatePercentage] = useState(5);
    const [term, setTerm] = useState(12);
    const [termValue, setTermValue] = useState(1);

    return (
        <Flex align="center" wrap="wrap" gap="xs" style={{ fontSize: '24px' }}>
            <Text size="xl" component="span">有一笔现金流，从1期后开始，每</Text>
            <Select
                w={72}
                value={gap}
                onChange={value => setGap(value || 'month')}
                data={[{ value: 'year', label: '年' }, { value: 'month', label: '月' }, { value: 'day', label: '天' }]}
            />
            <Text size="xl" component="span">获得</Text>
            <NumberInput
                w={72}
                value={termValue}
                onChange={(v) => {
                    if (typeof v === 'number') {
                        setTermValue(v);
                    }
                }}
            />
            <Text size="xl" component="span">元，持续</Text>
            <NumberInput
                w={72}
                value={term}
                onChange={(v) => {
                    if (typeof v === 'number') {
                        setTerm(v);
                    }
                }}
            />
            <Text size="xl" component="span">期，按贴现率</Text>
            <NumberInput
                w={72}
                value={ratePercentage}
                suffix="%"
                onChange={(v) => {
                    if (typeof v === 'number') {
                        setRatePercentage(v);
                    }
                }}
            />
            <Text size="xl" component="span">计算，这笔现金流当前价值为</Text>
            <NumberInput
                w={92}
                value={computeValue({ ratePercentage, gap, term, termValue })}
                readOnly
            />
            <Text size="xl" component="span">元</Text>
        </Flex>
    );
};
