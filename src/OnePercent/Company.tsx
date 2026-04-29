import { useGameStore } from './store';
import { MANPOWER_DAILY_COST, CHIPS_MAX, RESEARCH_ITEMS } from './config';
import { fmtMoney } from './utils';
import styles from './index.module.css';

export const Company = () => {
    const money = useGameStore(s => s.money);
    const manpowerRate = useGameStore(s => s.manpowerRate);
    const equipmentRate = useGameStore(s => s.equipmentRate);
    const chipsRate = useGameStore(s => s.chipsRate);
    const equipment = useGameStore(s => s.equipment);
    const chips = useGameStore(s => s.chips);
    const activeResearch = useGameStore(s => s.activeResearch);
    const researchProgress = useGameStore(s => s.researchProgress);
    const completedResearch = useGameStore(s => s.completedResearch);
    const setManpowerRate = useGameStore(s => s.setManpowerRate);
    const setEquipmentRate = useGameStore(s => s.setEquipmentRate);
    const setChipsRate = useGameStore(s => s.setChipsRate);
    const startResearch = useGameStore(s => s.startResearch);

    const dailyIncome = Math.floor(money * 0.01);
    const manpower = Math.floor(dailyIncome * manpowerRate / 100 / MANPOWER_DAILY_COST);
    const addedEquipment = Math.floor(dailyIncome * equipmentRate / 100);
    const addedChips = Math.min(Math.floor(dailyIncome * chipsRate / 100), Math.max(0, CHIPS_MAX - chips));

    return (
        <div className={styles.companyPanel}>
            {/* Resource card */}
            <div className={styles.resourceCard}>
                <div className={styles.resourceSliderRow}>
                    <span className={styles.resourceLabel}>人力</span>
                    <span className={styles.resourceRate}>{manpowerRate}%</span>
                    <span className={styles.resourceToday}>今日 +{manpower} 人天</span>
                </div>
                <input
                    type="range"
                    className={styles.manpowerSlider}
                    min={0}
                    max={100}
                    step={1}
                    value={manpowerRate}
                    onChange={e => setManpowerRate(Number(e.target.value))}
                />
                <div className={styles.resourceSliderRow}>
                    <span className={styles.resourceLabel}>设备</span>
                    <span className={styles.resourceRate}>{equipmentRate}%</span>
                    <span className={styles.resourceToday}>今日 +{fmtMoney(addedEquipment)}（累计 {fmtMoney(equipment)}）</span>
                </div>
                <input
                    type="range"
                    className={styles.manpowerSlider}
                    min={0}
                    max={100}
                    step={1}
                    value={equipmentRate}
                    onChange={e => setEquipmentRate(Number(e.target.value))}
                />
                <div className={styles.resourceSliderRow}>
                    <span className={styles.resourceLabel}>芯片</span>
                    <span className={styles.resourceRate}>{chipsRate}%</span>
                    <span className={styles.resourceToday}>
                        今日 +{fmtMoney(addedChips)}（累计 {fmtMoney(chips)} / {fmtMoney(CHIPS_MAX)}）
                    </span>
                </div>
                <input
                    type="range"
                    className={styles.manpowerSlider}
                    min={0}
                    max={100}
                    step={1}
                    value={chipsRate}
                    onChange={e => setChipsRate(Number(e.target.value))}
                />
            </div>

            {/* Research list */}
            <div className={styles.panelLabel}>研究</div>
            <div className={styles.researchList}>
                {RESEARCH_ITEMS.map((research) => {
                    const done = completedResearch[research.id];
                    const isActive = activeResearch === research.id;
                    const progress = researchProgress[research.id] || 0;
                    const pct = Math.min((progress / research.personDays) * 100, 100);
                    const meetsReq = (
                        equipment >= research.reqEquipment &&
                        chips >= research.reqChips
                    );
                    const canActivate = !done && meetsReq && !isActive;

                    return (
                        <div
                            key={research.id}
                            className={`${styles.researchItem} ${done ? styles.researchDone : ''} ${canActivate ? styles.researchAvailable : ''} ${isActive ? styles.researchActive : ''}`}
                            onClick={() => canActivate && startResearch(research.id)}
                        >
                            <div className={styles.researchName}>
                                {research.name}
                                {done && <span className={styles.researchCheck}> ✓</span>}
                                {isActive && <span className={styles.researchActiveTag}> 研究中</span>}
                            </div>
                            <div className={styles.researchDesc}>{research.description}</div>

                            {(isActive || progress > 0) && !done && (
                                <div className={styles.researchProgressBar}>
                                    <div
                                        className={styles.researchProgressFill}
                                        style={{ width: `${pct}%` }}
                                    />
                                    <span className={styles.researchProgressText}>
                                        {progress}/{research.personDays} 人天
                                    </span>
                                </div>
                            )}

                            <div className={styles.researchCosts}>
                                <span className={!meetsReq && equipment < research.reqEquipment ? styles.resourceShort : ''}>
                                    设备 {fmtMoney(research.reqEquipment)}
                                </span>
                                <span className={!meetsReq && chips < research.reqChips ? styles.resourceShort : ''}>
                                    芯片 {fmtMoney(research.reqChips)}
                                </span>
                                {!done && (
                                    <span>人天 {research.personDays}</span>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};
