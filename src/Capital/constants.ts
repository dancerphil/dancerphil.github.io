import { Category, AssetItem } from './types';

export const STORAGE_KEY = 'capital-data';

export const defaultCategories: Category[] = [
    { id: '1', name: '现金' },
    { id: '2', name: '股票' },
    { id: '3', name: '基金' },
];

export const defaultAssetItems: AssetItem[] = [
    { id: '1', name: '银行账户A', category: '1', amount: 50000 },
    { id: '2', name: '银行账户B', category: '1', amount: 30000 },
    { id: '3', name: '券商账户', category: '2', amount: 100000 },
    { id: '4', name: '基金账户A', category: '3', amount: 80000 },
];
