import { Category, AssetItem } from './types';

export const STORAGE_KEY = 'capital-data';

export const defaultCategories: Category[] = [
    { id: '1', name: '数字货币' },
    { id: '2', name: '股票' },
    { id: '3', name: '股票基金' },
    { id: '4', name: '债券基金' },
    { id: '5', name: '现金' },
];

export const defaultAssetItems: AssetItem[] = [
    { id: '1', name: '比特币', category: '1', amount: 10000 },
    { id: '2', name: '贵州茅台', category: '2', amount: 300000 },
    { id: '3', name: '中概互联', category: '3', amount: 300000 },
    { id: '4', name: '国债', category: '4', amount: 300000 },
    { id: '5', name: '招商银行', category: '5', amount: 40000 },
    { id: '6', name: '工商银行', category: '5', amount: 30000 },
    { id: '7', name: '余额宝', category: '5', amount: 10000 },
    { id: '8', name: '证券现金', category: '5', amount: 10000 },
];
