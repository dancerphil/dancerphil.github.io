/* eslint-disable max-lines */
import { useState, useMemo } from 'react';
import {
    NumberInput,
    Title,
    Text,
    Table,
    Group,
    Stack,
    Badge,
    Card,
    Divider,
    Box,
} from '@mantine/core';
import { css } from '@emotion/css';

interface LevelRow {
    level: number;
    /** 需要产出多少个本级物品 */
    need: number;
    /** 实际产出多少个本级物品 */
    produced: number;
    /** 剩余多少个本级物品 */
    surplus: number;
    /** 消耗多少个下一级物品 */
    consumed: number;
    /** 5合2批次数 */
    batches52: number;
    /** 3合1批次数（仅最优方法有） */
    batches31: number;
}

interface CalcResult {
    rows52: LevelRow[];
    rowsMin: LevelRow[];
    total52: number;
    totalMin: number;
    /** 纯5合2：实际产出的目标等级物品数（含顶层surplus） */
    produced52: number;
    /** 最优：实际产出的目标等级物品数（等于 targetCount，无剩余） */
    producedMin: number;
    /** 目标等级物品折合1级物品的价值系数 */
    valuePerItem: number;
    /** 纯5合2 各级剩余产出折合1级的总价值（顶层产出 + 各中间层surplus） */
    totalValue52: number;
    /** 最优方案 总价值 */
    totalValueMin: number;
}

function calcOnly52(targetLevel: number, targetCount: number): LevelRow[] {
    const rows: LevelRow[] = [];
    let current = targetCount;

    for (let level = targetLevel; level >= 2; level--) {
        const need = current;
        const batches52 = Math.ceil(need / 2);
        const produced = batches52 * 2;
        const surplus = produced - need;
        const consumed = batches52 * 5;

        rows.push({ level, need, produced, surplus, consumed, batches52, batches31: 0 });
        current = consumed;
    }

    return rows;
}

function calcMin(targetLevel: number, targetCount: number): LevelRow[] {
    const rows: LevelRow[] = [];
    let current = targetCount;

    for (let level = targetLevel; level >= 2; level--) {
        const need = current;
        let batches52: number;
        let batches31: number;

        if (need % 2 === 0) {
            batches52 = need / 2;
            batches31 = 0;
        }
        else {
            batches52 = (need - 1) / 2;
            batches31 = 1;
        }

        const produced = batches52 * 2 + batches31;
        const surplus = produced - need; // 始终为 0
        const consumed = batches52 * 5 + batches31 * 3;

        rows.push({ level, need, produced, surplus, consumed, batches52, batches31 });
        current = consumed;
    }

    return rows;
}

function calculate(targetLevel: number, targetCount: number): CalcResult {
    const rows52 = calcOnly52(targetLevel, targetCount);
    const rowsMin = calcMin(targetLevel, targetCount);
    const total52 = rows52[rows52.length - 1]?.consumed ?? targetCount;
    const totalMin = rowsMin[rowsMin.length - 1]?.consumed ?? targetCount;
    const produced52 = rows52[0]?.produced ?? targetCount;
    const producedMin = targetCount; // 最优方案无剩余
    const valuePerItem = Math.pow(3, targetLevel - 1);

    // 5合2 总价值：顶层全部产出的价值 + 每个中间层剩余物品的价值
    // rows52[i].level 是该行对应的等级，rows52[0] 是顶层
    let totalValue52 = rows52[0].produced * Math.pow(3, rows52[0].level - 1);
    for (let i = 1; i < rows52.length; i++) {
        totalValue52 += rows52[i].surplus * Math.pow(3, rows52[i].level - 1);
    }

    // 最优方案无任何剩余，价值就是目标物品数 × 顶层价值
    const totalValueMin = targetCount * valuePerItem;

    return { rows52, rowsMin, total52, totalMin, produced52, producedMin, valuePerItem, totalValue52, totalValueMin };
}

const tableCss = css`
    th {
        white-space: nowrap;
    }
`;

const highlightCss = css`
    font-weight: bold;
    color: #228be6;
`;

const surplusCss = css`
    color: #f03e3e;
`;

const savedCss = css`
    color: #2f9e44;
`;

export const FiveInTwo = () => {
    const [targetLevel, setTargetLevel] = useState<number>(10);
    const [targetCount, setTargetCount] = useState<number>(1);

    const result = useMemo(() => {
        if (targetLevel < 2 || targetCount < 1) return null;
        return calculate(targetLevel, targetCount);
    }, [targetLevel, targetCount]);

    const pct = result
        ? ((result.totalMin / result.total52) * 100).toFixed(1)
        : null;

    const value52 = result ? result.totalValue52 : 0;
    const valueMin = result ? result.totalValueMin : 0;
    const valueRatio52 = result && result.total52 > 0
        ? (value52 / result.total52).toFixed(3)
        : null;
    const valueRatioMin = result && result.totalMin > 0
        ? (valueMin / result.totalMin).toFixed(3)
        : null;

    return (
        <Box p="xl" maw={900} mx="auto">
            <Title order={2} mb="md">5合2 合成计算器</Title>
            <Text c="dimmed" size="sm" mb="lg">
                规则：3个低级物品 → 1个高级物品（3合1）；5个低级物品 → 2个高级物品（5合2）。
                <br />
                计算全部采用 5合2 时需要多少 1 级物品，以及最优混合方式（最小消耗）的对比。
            </Text>

            <Group mb="xl" gap="md" align="flex-end">
                <NumberInput
                    label="目标物品等级"
                    value={targetLevel}
                    onChange={v => setTargetLevel(Number(v))}
                    min={2}
                    max={30}
                    w={160}
                />
                <NumberInput
                    label="目标物品数量"
                    value={targetCount}
                    onChange={v => setTargetCount(Number(v))}
                    min={1}
                    w={160}
                />
            </Group>

            {result && (
                <Stack gap="xl">
                    {/* 纯 5合2 方案 */}
                    <Card withBorder shadow="sm" p="md">
                        <Title order={4} mb="sm">方案一：纯 5合2</Title>
                        <Text size="sm" c="dimmed" mb="md">
                            每次将 5 个低级合成 2 个高级，可能产生剩余。
                        </Text>
                        <Table className={tableCss} striped highlightOnHover withTableBorder withColumnBorders>
                            <Table.Thead>
                                <Table.Tr>
                                    <Table.Th>目标等级</Table.Th>
                                    <Table.Th>需要产出</Table.Th>
                                    <Table.Th>5合2批次</Table.Th>
                                    <Table.Th>实际产出</Table.Th>
                                    <Table.Th>剩余</Table.Th>
                                    <Table.Th>消耗（下一级）</Table.Th>
                                </Table.Tr>
                            </Table.Thead>
                            <Table.Tbody>
                                {result.rows52.map(row => (
                                    <Table.Tr key={row.level}>
                                        <Table.Td>
                                            <Badge variant="light">{row.level} 级</Badge>
                                        </Table.Td>
                                        <Table.Td>{row.need.toLocaleString()}</Table.Td>
                                        <Table.Td>{row.batches52.toLocaleString()}</Table.Td>
                                        <Table.Td>
                                            {row.produced.toLocaleString()}
                                            {row.surplus > 0 && (
                                                <span className={surplusCss}> (+{row.surplus})</span>
                                            )}
                                        </Table.Td>
                                        <Table.Td>
                                            {row.surplus > 0
                                                ? <span className={surplusCss}>{row.surplus}</span>
                                                : 0}
                                        </Table.Td>
                                        <Table.Td className={highlightCss}>
                                            {row.consumed.toLocaleString()}
                                        </Table.Td>
                                    </Table.Tr>
                                ))}
                            </Table.Tbody>
                        </Table>
                        <Group mt="md" gap="xs">
                            <Text size="sm">需要 1 级物品：</Text>
                            <Text size="lg" fw="bold" c="blue">{result.total52.toLocaleString()} 个</Text>
                        </Group>
                    </Card>

                    {/* 最优混合方案 */}
                    <Card withBorder shadow="sm" p="md">
                        <Title order={4} mb="sm">方案二：最优混合（最小消耗）</Title>
                        <Text size="sm" c="dimmed" mb="md">
                            偶数需求时全用 5合2；奇数需求时用 (n-1)/2 次 5合2 + 1 次 3合1，不产生剩余。
                        </Text>
                        <Table className={tableCss} striped highlightOnHover withTableBorder withColumnBorders>
                            <Table.Thead>
                                <Table.Tr>
                                    <Table.Th>目标等级</Table.Th>
                                    <Table.Th>需要产出</Table.Th>
                                    <Table.Th>5合2批次</Table.Th>
                                    <Table.Th>3合1批次</Table.Th>
                                    <Table.Th>实际产出</Table.Th>
                                    <Table.Th>消耗（下一级）</Table.Th>
                                    <Table.Th>vs 纯5合2</Table.Th>
                                </Table.Tr>
                            </Table.Thead>
                            <Table.Tbody>
                                {result.rowsMin.map((row, i) => {
                                    const row52 = result.rows52[i];
                                    const ratio = row52.consumed > 0
                                        ? ((row.consumed / row52.consumed) * 100).toFixed(1)
                                        : '100.0';
                                    return (
                                        <Table.Tr key={row.level}>
                                            <Table.Td>
                                                <Badge variant="light">{row.level} 级</Badge>
                                            </Table.Td>
                                            <Table.Td>{row.need.toLocaleString()}</Table.Td>
                                            <Table.Td>{row.batches52.toLocaleString()}</Table.Td>
                                            <Table.Td>{row.batches31 > 0
                                                ? <span className={surplusCss}>{row.batches31}</span>
                                                : 0}
                                            </Table.Td>
                                            <Table.Td>{row.produced.toLocaleString()}</Table.Td>
                                            <Table.Td className={highlightCss}>
                                                {row.consumed.toLocaleString()}
                                            </Table.Td>
                                            <Table.Td className={savedCss}>{ratio}%</Table.Td>
                                        </Table.Tr>
                                    );
                                })}
                            </Table.Tbody>
                        </Table>
                        <Group mt="md" gap="xs">
                            <Text size="sm">需要 1 级物品：</Text>
                            <Text size="lg" fw="bold" c="green">{result.totalMin.toLocaleString()} 个</Text>
                        </Group>
                    </Card>

                    {/* 总结对比 */}
                    <Divider />
                    <Card withBorder shadow="sm" p="md" bg="gray.0">
                        <Title order={4} mb="sm">汇总对比</Title>

                        <Text size="sm" fw={600} c="dimmed" mb="xs">成本对比（消耗 1 级物品数）</Text>
                        <Group gap="xl" mb="lg">
                            <Stack gap={4}>
                                <Text size="sm" c="dimmed">纯 5合2</Text>
                                <Text size="xl" fw="bold" c="blue">{result.total52.toLocaleString()}</Text>
                            </Stack>
                            <Stack gap={4}>
                                <Text size="sm" c="dimmed">最优混合</Text>
                                <Text size="xl" fw="bold" c="green">{result.totalMin.toLocaleString()}</Text>
                            </Stack>
                            <Stack gap={4}>
                                <Text size="sm" c="dimmed">最优 / 纯5合2</Text>
                                <Text size="xl" fw="bold" c="green">{pct}%</Text>
                            </Stack>
                            <Stack gap={4}>
                                <Text size="sm" c="dimmed">成本节省</Text>
                                <Text size="xl" fw="bold" c="orange">
                                    {(result.total52 - result.totalMin).toLocaleString()} 个
                                </Text>
                            </Stack>
                        </Group>

                        <Divider mb="md" />

                        <Text size="sm" fw={600} c="dimmed" mb="xs">
                            价值对比（每高一级价值×3，{targetLevel}级物品 = {result.valuePerItem.toLocaleString()} 个1级价值）
                        </Text>
                        <Group gap="xl">
                            <Stack gap={4}>
                                <Text size="sm" c="dimmed">纯 5合2 产出价值</Text>
                                <Text size="xl" fw="bold" c="blue">{value52.toLocaleString()}</Text>
                            </Stack>
                            <Stack gap={4}>
                                <Text size="sm" c="dimmed">最优混合 产出价值</Text>
                                <Text size="xl" fw="bold" c="green">{valueMin.toLocaleString()}</Text>
                            </Stack>
                            <Stack gap={4}>
                                <Text size="sm" c="dimmed">纯5合2 价值/成本比</Text>
                                <Text size="xl" fw="bold" c="blue">{valueRatio52}</Text>
                            </Stack>
                            <Stack gap={4}>
                                <Text size="sm" c="dimmed">最优混合 价值/成本比</Text>
                                <Text size="xl" fw="bold" c="green">{valueRatioMin}</Text>
                            </Stack>
                            <Stack gap={4}>
                                <Text size="sm" c="dimmed">5合2 价值多出</Text>
                                <Text size="xl" fw="bold" c="blue">
                                    {valueMin > 0 ? ((value52 / valueMin) * 100).toFixed(1) : '-'}%
                                </Text>
                            </Stack>
                        </Group>
                    </Card>
                </Stack>
            )}
        </Box>
    );
};
