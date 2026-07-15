import { useRef, useLayoutEffect, useEffect } from 'react';
import { init, EChartsType } from 'echarts';
import { AssetItem, Category } from './types';
import s from './styles.module.css';

interface SankeyChartProps {
    assetItems: AssetItem[];
    categories: Category[];
}

export const SankeyChart = ({ assetItems, categories }: SankeyChartProps) => {
    const chartRef = useRef<HTMLDivElement>(null);
    const chartInstance = useRef<EChartsType | null>(null);

    // 初始化图表
    useLayoutEffect(() => {
        if (chartRef.current && !chartInstance.current) {
            chartInstance.current = init(chartRef.current);
        }
        return () => {
            chartInstance.current?.dispose();
            chartInstance.current = null;
        };
    }, []);

    // 监听窗口大小变化
    useEffect(() => {
        const handleResize = () => {
            chartInstance.current?.resize();
        };

        window.addEventListener('resize', handleResize);

        // 使用 ResizeObserver 监听容器大小变化（更适合 ResizeLayout）
        const resizeObserver = new ResizeObserver(() => {
            chartInstance.current?.resize();
        });

        if (chartRef.current) {
            resizeObserver.observe(chartRef.current);
        }

        return () => {
            window.removeEventListener('resize', handleResize);
            resizeObserver.disconnect();
        };
    }, []);

    // 更新图表
    useEffect(() => {
        if (!chartInstance.current) return;

        const totalAmount = assetItems.reduce((sum, item) => sum + item.amount, 0);

        const categoryAmounts = new Map<string, number>();
        assetItems.forEach((item) => {
            const current = categoryAmounts.get(item.category) || 0;
            categoryAmounts.set(item.category, current + item.amount);
        });

        const categoriesWithItems = categories.filter(cat => categoryAmounts.get(cat.id) > 0);
        const activeItems = assetItems.filter(item => item.amount > 0);

        const catNodeId = (id: string) => `c_${id}`;
        const itemNodeId = (id: string) => `i_${id}`;

        const displayNameMap = new Map<string, string>([['总资产', '总资产']]);
        categoriesWithItems.forEach(cat => displayNameMap.set(catNodeId(cat.id), cat.name));
        activeItems.forEach(item => displayNameMap.set(itemNodeId(item.id), item.name));

        const nodes = [
            { name: '总资产' },
            ...categoriesWithItems.map(cat => ({ name: catNodeId(cat.id) })),
            ...activeItems.map(item => ({ name: itemNodeId(item.id) })),
        ];

        const links = [
            ...categoriesWithItems.map(cat => ({
                source: '总资产',
                target: catNodeId(cat.id),
                value: categoryAmounts.get(cat.id) || 0,
            })),
            ...activeItems.map((item) => {
                const category = categories.find(c => c.id === item.category);
                return {
                    source: category ? catNodeId(category.id) : '',
                    target: itemNodeId(item.id),
                    value: item.amount,
                };
            }),
        ].filter(link => link.value > 0 && link.source);

        const getDisplayName = (id: string) => displayNameMap.get(id) || id;

        const option = {
            title: {
                text: `资本视图 - 总资产: ¥${totalAmount.toLocaleString()}`,
                left: 'center',
                textStyle: {
                    fontSize: 20,
                },
            },
            tooltip: {
                trigger: 'item',
                formatter: (params: any) => {
                    if (params.dataType === 'edge') {
                        const percentage = ((params.data.value / totalAmount) * 100).toFixed(1);
                        const sourceName = getDisplayName(params.data.source);
                        const targetName = getDisplayName(params.data.target);
                        return `${sourceName} → ${targetName}<br/>金额: ¥${params.data.value.toLocaleString()} (${percentage}%)`;
                    }
                    const nodeId = params.name;
                    if (nodeId === '总资产') {
                        return `总资产<br/>金额: ¥${totalAmount.toLocaleString()}`;
                    }
                    let nodeValue = 0;
                    links.forEach((link) => {
                        if (link.target === nodeId) {
                            nodeValue += link.value;
                        }
                    });
                    const percentage = ((nodeValue / totalAmount) * 100).toFixed(1);
                    return `${getDisplayName(nodeId)}<br/>金额: ¥${nodeValue.toLocaleString()} (${percentage}%)`;
                },
            },
            series: [
                {
                    type: 'sankey',
                    data: nodes,
                    links: links,
                    emphasis: {
                        focus: 'adjacency',
                    },
                    lineStyle: {
                        color: 'gradient',
                        curveness: 0.5,
                    },
                    label: {
                        fontSize: 14,
                        formatter: (params: any) => {
                            const nodeId = params.name;
                            if (nodeId === '总资产') {
                                return '总资产';
                            }
                            let nodeValue = 0;
                            links.forEach((link) => {
                                if (link.target === nodeId) {
                                    nodeValue += link.value;
                                }
                            });
                            const percentage = ((nodeValue / totalAmount) * 100).toFixed(1);
                            return `${getDisplayName(nodeId)} ${percentage}%`;
                        },
                    },
                    layoutIterations: 0,
                },
            ],
        };

        chartInstance.current.setOption(option, true);
    }, [categories, assetItems]);

    return <div ref={chartRef} className={s.chart} />;
};
