import { useState } from 'react';
import { fmtMoney } from '@/OnePercent/utils';
import { ShopItem } from '@/OnePercent/types';
import { SHOP_ITEMS } from './config';
import { useGameStore } from './store';
import styles from './index.module.css';

const ratioBarColor = (ratio: number, canAfford: boolean): string => {
    if (!canAfford) return 'rgba(139, 32, 32, 0.4)';
    if (ratio > 50) return 'rgba(139, 32, 32, 0.25)';
    if (ratio > 20) return 'rgba(122, 90, 16, 0.2)';
    return 'rgba(128, 128, 128, 0.15)';
};

const popoverGroups = [
    { label: '饮品', tag: 'water' },
    { label: '食物', tag: 'food' },
];

export const Shop = () => {
    const money = useGameStore(s => s.money);
    const hasBuy = useGameStore(s => s.hasBuy);
    const autoBuy = useGameStore(s => s.autoBuy);
    const toggleAutoBuy = useGameStore(s => s.toggleAutoBuy);
    const buyItem = useGameStore(s => s.buyItem);
    const [popoverOpen, setPopoverOpen] = useState(false);

    const isItemPurchased = (item: ShopItem) => {
        return hasBuy[item.id];
    };

    const shopItems = SHOP_ITEMS.filter((item) => {
        if (item.cost > money * 2) return false;
        return !isItemPurchased(item);
    });

    const autoBuyItems = SHOP_ITEMS.filter(item => isItemPurchased(item));

    const autoBuyCount = Object.values(autoBuy).filter(Boolean).length;

    return (
        <div className={styles.shopPanel}>
            <div className={styles.autoBuySection}>
                <button
                    className={styles.autoBuySectionBtn}
                    onClick={() => setPopoverOpen(!popoverOpen)}
                >
                    自动购买{autoBuyCount > 0 ? ` (${autoBuyCount})` : ''}
                </button>
                {popoverOpen && (
                    <>
                        <div className={styles.popoverBackdrop} onClick={() => setPopoverOpen(false)} />
                        <div className={styles.autoBuyPopover}>
                            {popoverGroups.map((group) => {
                                const items = autoBuyItems.filter(i => i.tags?.includes(group.tag));
                                if (items.length === 0) return null;
                                return (
                                    <div key={group.tag}>
                                        <div className={styles.popoverGroupLabel}>{group.label}</div>
                                        {items.map(item => (
                                            <div key={item.id} className={styles.popoverItem}>
                                                <span>{item.name}</span>
                                                <button
                                                    className={`${styles.popoverToggle} ${autoBuy[item.id] ? styles.popoverToggleActive : ''}`}
                                                    onClick={() => toggleAutoBuy(item.id)}
                                                >
                                                    {autoBuy[item.id] ? '开' : '关'}
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                );
                            })}
                            {autoBuyItems.length === 0 && (
                                <div className={styles.popoverGroupLabel}>暂无已购买的商品</div>
                            )}
                        </div>
                    </>
                )}
            </div>
            <div className={styles.panelLabel}>商店</div>
            {shopItems.map((item) => {
                const ratio = money > 0 ? (item.cost / money * 100) : 100;
                const canAfford = money >= item.cost;
                const barPct = Math.min(ratio, 100);
                const barColor = ratioBarColor(ratio, canAfford);

                return (
                    <div
                        key={item.id}
                        className={`${styles.shopItem} ${canAfford ? styles.shopItemAffordable : ''}`}
                        style={{
                            background: `linear-gradient(to right, ${barColor} ${barPct}%, transparent ${barPct}%)`,
                        }}
                        onClick={() => canAfford && buyItem(item.id)}
                    >
                        <span className={styles.shopItemName}>{item.name}</span>
                        <span className={`${styles.shopItemCost} ${!canAfford ? styles.unaffordable : ''}`}>
                            {fmtMoney(item.cost)}
                        </span>
                    </div>
                );
            })}
        </div>
    );
};
