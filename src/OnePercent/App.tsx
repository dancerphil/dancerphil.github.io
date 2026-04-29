import { useEffect } from 'react';
import { Shop } from '@/OnePercent/Shop';
import { Log } from '@/OnePercent/Log';
import { fmtMoney } from '@/OnePercent/utils';
import { Event } from '@/OnePercent/Event';
import { Company } from '@/OnePercent/Company';
import { TICK_MS, VICTORY_CHIPS } from './config';
import { useGameStore } from './store';
import styles from './index.module.css';

const Header = () => {
    const money = useGameStore(s => s.money);
    const day = useGameStore(s => s.day);

    return (
        <div className={styles.header}>
            <div className={styles.moneyDisplay}>{fmtMoney(money)}</div>
            <div className={styles.dayDisplay}>第 {day} 天</div>
        </div>
    );
};

export const App = () => {
    const tick = useGameStore(s => s.tick);
    const reset = useGameStore(s => s.reset);
    const isVictory = useGameStore(s => s.isVictory);
    const currentEvent = useGameStore(s => s.currentEvent);
    const hasCompany = useGameStore(s => s.hasBuy['create_company']);

    useEffect(() => {
        const iv = setInterval(tick, TICK_MS);
        return () => {
            clearInterval(iv);
        };
    }, [tick]);

    return (
        <div className={styles.body}>
            <div className={styles.app}>
                <Header />
                <Shop />
                <div className={styles.mainPanel}>
                    {isVictory && (
                        <div className={styles.victoryInline}>
                            <h2>胜利</h2>
                            <p>你积累了 {fmtMoney(VICTORY_CHIPS)} 芯片。</p>
                            <button className={styles.resetBtn} onClick={reset}>重新开始</button>
                        </div>
                    )}
                    {!isVictory && currentEvent && <Event />}
                    {!isVictory && !currentEvent && hasCompany && <Company />}
                </div>
                <Log />
            </div>
        </div>
    );
};
