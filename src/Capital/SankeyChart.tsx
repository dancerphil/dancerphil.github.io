import { useRef, useLayoutEffect, useEffect } from 'react';
import { init, EChartsType } from 'echarts';
import { AssetItem, Category } from './types';
import { chartCss } from './styles';

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

        // 计算每个类别的总金额
        const categoryAmounts = new Map<string, number>();
        assetItems.forEach((item) => {
            const current = categoryAmounts.get(item.category) || 0;
            categoryAmounts.set(item.category, current + item.amount);
        });

        // 只包含有资产项的类别
        const categoriesWithItems = categories.filter(cat => categoryAmounts.get(cat.id) > 0);

        // 构建节点数据
        const nodes = [
            { name: '总资产' },
            ...categoriesWithItems.map(cat => ({ name: cat.name })),
            ...assetItems.filter(item => item.amount > 0).map(item => ({ name: item.name })),
        ];

        // 构建连接数据
        const links = [
            // 总资产 -> 类别
            ...categoriesWithItems.map(cat => ({
                source: '总资产',
                target: cat.name,
                value: categoryAmounts.get(cat.id) || 0,
            })),
            // 类别 -> 资产项
            ...assetItems.filter(item => item.amount > 0).map((item) => {
                const category = categories.find(c => c.id === item.category);
                return {
                    source: category?.name || '',
                    target: item.name,
                    value: item.amount,
                };
            }),
        ].filter(link => link.value > 0 && link.source);

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
                        return `${params.data.source} → ${params.data.target}<br/>金额: ¥${params.data.value.toLocaleString()}`;
                    }
                    return params.name;
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
                    },
                    layoutIterations: 0,
                },
            ],
        };

        chartInstance.current.setOption(option);
    }, [categories, assetItems]);

    return <div ref={chartRef} className={chartCss} />;
};
