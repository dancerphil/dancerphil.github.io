import { useMemo, useState } from 'react';
import { Group, NumberInput, Table, Text, Title } from '@mantine/core';
import { ITEM_NAMES, planPurchases, TICKSPEED } from './planner';

export const AdAnalyzer = () => {
    const [maxLevel, setMaxLevel] = useState(300);
    const steps = useMemo(() => planPurchases(maxLevel), [maxLevel]);

    return (
        <>
            <Title order={2}>ad-analyzer</Title>
            <Text c="dimmed" mb="md">
                规划《反物质维度》普通挑战 9（C9）的购买顺序：每当买入 10 个反物质维度时，同价格的其他项目会升级到下一个价格。假定反物质按 1e1、1e2、1e3……依次增长，每一步优先购买可买且不产生价格冲突的最高维度；开局前五步按固定顺序直接购买（不做冲突检查），之后才启用上述规则。
            </Text>

            <Group mb="md">
                <NumberInput
                    label="最大反物质指数"
                    size="sm"
                    min={1}
                    value={maxLevel}
                    onChange={value => setMaxLevel(Number(value))}
                />
            </Group>

            <Table striped withTableBorder withColumnBorders>
                <Table.Thead>
                    <Table.Tr>
                        <Table.Th colSpan={5}>
                            {steps.map(step => (step.item === TICKSPEED ? 'T' : `${step.item + 1}`)).join('-')}
                        </Table.Th>
                    </Table.Tr>
                    <Table.Tr>
                        <Table.Th>序号</Table.Th>
                        <Table.Th>反物质</Table.Th>
                        <Table.Th>购买</Table.Th>
                        <Table.Th>价格</Table.Th>
                        <Table.Th>备注</Table.Th>
                    </Table.Tr>
                </Table.Thead>
                <Table.Tbody>
                    {steps.map((step, index) => (
                        <Table.Tr key={index}>
                            <Table.Td>{index + 1}</Table.Td>
                            <Table.Td>1e{step.level}</Table.Td>
                            <Table.Td>
                                {ITEM_NAMES[step.item]}
                                {step.item === TICKSPEED ? ' ×1' : ' ×10'}
                            </Table.Td>
                            <Table.Td>1e{step.price}</Table.Td>
                            <Table.Td>{step.forced ? '开局强制' : ''}</Table.Td>
                        </Table.Tr>
                    ))}
                </Table.Tbody>
            </Table>
        </>
    );
};
