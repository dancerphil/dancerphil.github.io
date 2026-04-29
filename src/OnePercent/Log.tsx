import { useEffect, useRef } from 'react';
import { fmtMoney } from '@/OnePercent/utils';
import { useGameStore } from './store';
import styles from './index.module.css';

export const Log = () => {
    const dailyIncome = useGameStore(s => s.dailyIncome);
    const dailyCost = useGameStore(s => s.dailyCost);
    const log = useGameStore(s => s.log);
    const logEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        logEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [log]);

    return (
        <div className={styles.logPanel}>
            <div className={styles.statsCard}>
                <div className={styles.statRow}>
                    <span className={styles.statKey}>今日收益</span>
                    <span className={styles.statVal}>+{fmtMoney(dailyIncome)}</span>
                </div>
                <div className={styles.statRow}>
                    <span className={styles.statKey}>今日成本</span>
                    <span className={styles.statVal}>-{fmtMoney(dailyCost)}</span>
                </div>
                <div className={styles.statRow}>
                    <span className={styles.statKey}>今日结余</span>
                    <span className={styles.statVal}>{fmtMoney(dailyIncome - dailyCost)}</span>
                </div>
            </div>
            <div className={styles.panelLabel} style={{ marginTop: 16 }}>日志</div>
            <div className={styles.logArea}>
                {log.map((entry, i) => (
                    <div
                        key={i}
                        className={`${styles.logEntry} ${entry.type === 'warning' ? styles.logWarning : ''} ${entry.type === 'milestone' ? styles.logMilestone : ''}`}
                    >
                        <span className={styles.logDay}>D{entry.day}</span>
                        <span>{entry.text}</span>
                    </div>
                ))}
                <div ref={logEndRef} />
            </div>
        </div>
    );
};
