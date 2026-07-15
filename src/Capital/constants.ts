import { v4 } from 'uuid';
import { Category, AssetItem } from './types';

export const STORAGE_KEY = 'capital-data';

const c1 = v4();
const c2 = v4();
const c3 = v4();
const c4 = v4();
const c5 = v4();

export const defaultCategories: Category[] = [
    { id: c1, name: '数字货币' },
    { id: c2, name: '股票' },
    { id: c3, name: '股票基金' },
    { id: c4, name: '债券基金' },
    { id: c5, name: '现金' },
];

export const defaultAssetItems: AssetItem[] = [
    { id: v4(), name: '比特币', category: c1, amount: 10000 },
    { id: v4(), name: '贵州茅台', category: c2, amount: 300000 },
    { id: v4(), name: '中概互联', category: c3, amount: 300000 },
    { id: v4(), name: '国债', category: c4, amount: 300000 },
    { id: v4(), name: '招商银行', category: c5, amount: 40000 },
    { id: v4(), name: '工商银行', category: c5, amount: 30000 },
    { id: v4(), name: '余额宝', category: c5, amount: 10000 },
    { id: v4(), name: '证券现金', category: c5, amount: 10000 },
];
