export const ITEM_NAMES = [
    '第1维度',
    '第2维度',
    '第3维度',
    '第4维度',
    '第5维度',
    '第6维度',
    '第7维度',
    '第8维度',
    '计数频率',
];

const DIMENSION_PRICES = [1, 2, 4, 6, 9, 13, 18, 24];
const DIMENSION_STEPS = [3, 4, 5, 6, 8, 10, 12, 15];
const TICKSPEED_PRICE = 3;
const TICKSPEED_STEP = 1;
export const TICKSPEED = 8;

const PREREQUISITES: (number | undefined)[] = [undefined, 0, 1, 2, 3, 4, 5, 6, 1];
const PRIORITY = [7, 6, 5, 4, 3, 2, 1, 0, TICKSPEED];
const OPENING = [0, 1, 2, 3, 4];

export interface PurchaseStep {
    level: number;
    item: number;
    price: number;
    forced: boolean;
}

const isDistinct = (values: number[]) => new Set(values).size === values.length;

export const planPurchases = (maxLevel: number): PurchaseStep[] => {
    let prices = [...DIMENSION_PRICES, TICKSPEED_PRICE];
    const steps = [...DIMENSION_STEPS, TICKSPEED_STEP];
    const bought = prices.map(() => false);
    const queue = [...OPENING];
    const result: PurchaseStep[] = [];

    const isUnlocked = (item: number) => {
        const prerequisite = PREREQUISITES[item];
        return prerequisite === undefined || bought[prerequisite];
    };

    const pricesAfter = (item: number) => prices.map((price, i) => (price === prices[item] ? price + steps[i] : price));

    const buy = ({ item, level, forced }: { item: number; level: number; forced: boolean }) => {
        result.push({ level, item, price: prices[item], forced });
        prices = pricesAfter(item);
        bought[item] = true;
    };

    for (let level = 1; level <= maxLevel; level++) {
        for (;;) {
            const forcedItem = queue[0];
            if (forcedItem !== undefined && prices[forcedItem] <= level) {
                queue.shift();
                buy({ item: forcedItem, level, forced: true });
                continue;
            }
            const item = PRIORITY.find(i => isUnlocked(i) && prices[i] <= level && isDistinct(pricesAfter(i)));
            if (item === undefined) {
                break;
            }
            buy({ item, level, forced: false });
        }
    }

    return result;
};
