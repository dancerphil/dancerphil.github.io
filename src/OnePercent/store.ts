/* eslint-disable max-lines */
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { cloneDeep } from 'lodash-es';
import { SHOP_ITEMS, INITIAL_MONEY, DAILY_GROWTH_RATE, VICTORY_CHIPS, START_EVENT, createNoWaterEvent, createNoFoodEvent, MANPOWER_DAILY_COST, CHIPS_MAX, RESEARCH_ITEMS } from './config';
import type { LogEntry, GameEvent } from './types';

const SAVE_KEY = 'one_percent_save';

interface PersistedState {
    money: number;
    day: number;
    hasBuy: Record<string, boolean>;
    autoBuy: Record<string, boolean>;
    log: LogEntry[];
    currentEvent: GameEvent | null;
    eventQueue: GameEvent[];
    nextEventId: number;
    isVictory: boolean;
    manpowerRate: number;
    equipmentRate: number;
    chipsRate: number;
    equipment: number;
    chips: number;
    activeResearch: string | null;
    researchProgress: Record<string, number>;
    completedResearch: Record<string, boolean>;
    dailyIncome: number;
    dailyCost: number;
}

interface GameState extends PersistedState {
    eventStartMs: number;
    tick: () => void;
    toggleAutoBuy: (itemId: string) => void;
    buyItem: (itemId: string) => void;
    resolveEvent: (action?: string) => void;
    setManpowerRate: (rate: number) => void;
    setEquipmentRate: (rate: number) => void;
    setChipsRate: (rate: number) => void;
    startResearch: (researchId: string) => void;
    reset: () => void;
}

const defaultState: PersistedState = {
    money: INITIAL_MONEY,
    day: 0,
    hasBuy: {},
    autoBuy: {},
    log: [],
    currentEvent: START_EVENT,
    eventQueue: [],
    nextEventId: 0,
    isVictory: false,
    manpowerRate: 10,
    equipmentRate: 5,
    chipsRate: 2,
    equipment: 0,
    chips: 0,
    activeResearch: null,
    researchProgress: {},
    completedResearch: {},
    dailyIncome: 0,
    dailyCost: 0,
};

function getItemsByTag(tag: string) {
    return SHOP_ITEMS.filter(item => item.tags?.includes(tag));
}

function addLog(log: LogEntry[], entry: LogEntry): LogEntry[] {
    return [entry, ...log].slice(0, 100);
}

function applyResearchProgress(
    activeResearch: string | null,
    manpower: number,
    completedResearch: Record<string, boolean>,
    researchProgress: Record<string, number>,
): {
    activeResearch: string | null;
    completedResearch: Record<string, boolean>;
    researchProgress: Record<string, number>;
} {
    if (activeResearch === null || manpower <= 0) {
        return { activeResearch, completedResearch, researchProgress };
    }
    const research = RESEARCH_ITEMS.find(r => r.id === activeResearch);
    if (!research || completedResearch[activeResearch]) {
        return { activeResearch, completedResearch, researchProgress };
    }
    const prev = researchProgress[activeResearch] || 0;
    const next = prev + manpower;
    if (next >= research.personDays) {
        return {
            activeResearch: null,
            completedResearch: { ...completedResearch, [activeResearch]: true },
            researchProgress: { ...researchProgress, [activeResearch]: research.personDays },
        };
    }
    return {
        activeResearch,
        completedResearch,
        researchProgress: { ...researchProgress, [activeResearch]: next },
    };
}

export const useGameStore = create<GameState>()(persist(
    (set, get) => {
        return {
            ...cloneDeep(defaultState),
            eventStartMs: 0,

            tick: () => {
                const state = get();
                if (state.currentEvent !== null || state.isVictory) return;

                const dailyIncome = Math.floor(state.money * DAILY_GROWTH_RATE);
                let money = state.money + dailyIncome;
                const day = state.day + 1;
                let dailyCost = 0;

                const hasCompany = state.hasBuy['create_company'];

                // 根据滑块计算三种资源
                let researchProgress = { ...state.researchProgress };
                let activeResearch = state.activeResearch;
                let completedResearch = { ...state.completedResearch };
                let equipment = state.equipment;
                let chips = state.chips;

                if (hasCompany) {
                    // 人力
                    if (state.manpowerRate > 0) {
                        const manpower = Math.floor(dailyIncome * state.manpowerRate / 100 / MANPOWER_DAILY_COST);
                        const cost = manpower * MANPOWER_DAILY_COST;
                        money -= cost;
                        dailyCost += cost;

                        // 人力投入到当前研究
                        const result = applyResearchProgress(activeResearch, manpower, completedResearch, researchProgress);
                        activeResearch = result.activeResearch;
                        completedResearch = result.completedResearch;
                        researchProgress = result.researchProgress;
                    }

                    // 设备（1:1 金额转换）
                    if (state.equipmentRate > 0) {
                        const gain = Math.floor(dailyIncome * state.equipmentRate / 100);
                        money -= gain;
                        dailyCost += gain;
                        equipment += gain;
                    }

                    // 芯片（1:1 金额转换，有购买上限）
                    if (state.chipsRate > 0) {
                        let gain = Math.floor(dailyIncome * state.chipsRate / 100);
                        if (chips + gain > CHIPS_MAX) {
                            gain = Math.max(0, CHIPS_MAX - chips);
                        }
                        if (gain > 0) {
                            money -= gain;
                            dailyCost += gain;
                            chips += gain;
                        }
                    }
                }

                // 自动购买水
                const waterItems = getItemsByTag('water').filter(item => state.autoBuy[item.id]);
                if (waterItems.length > 0) {
                    const item = waterItems[Math.floor(Math.random() * waterItems.length)];
                    money -= item.cost;
                    dailyCost += item.cost;
                }

                // 自动购买食物
                const foodItems = getItemsByTag('food').filter(item => state.autoBuy[item.id]);
                if (foodItems.length > 0) {
                    const item = foodItems[Math.floor(Math.random() * foodItems.length)];
                    money -= item.cost;
                    dailyCost += item.cost;
                }

                if (chips >= VICTORY_CHIPS) {
                    set({ money, day, isVictory: true, dailyIncome, dailyCost, chips });
                    return;
                }

                // 检查事件
                let queue = [...state.eventQueue];
                let nextId = state.nextEventId;

                if (waterItems.length === 0) {
                    const hasPending = queue.some(e => e.type === 'no_water');
                    if (!hasPending) {
                        queue.push(createNoWaterEvent(nextId++));
                    }
                }

                if (foodItems.length === 0) {
                    const hasPending = queue.some(e => e.type === 'no_food');
                    if (!hasPending) {
                        queue.push(createNoFoodEvent(nextId++));
                    }
                }

                // 如果当前没有事件，从队列取一个
                let currentEvent = state.currentEvent;
                let eventStartMs = state.eventStartMs;
                if (currentEvent === null && queue.length > 0) {
                    currentEvent = queue[0];
                    queue = queue.slice(1);
                    eventStartMs = Date.now();
                }

                set({ money, day, dailyIncome, dailyCost, currentEvent, eventQueue: queue, nextEventId: nextId, eventStartMs, researchProgress, activeResearch, completedResearch, equipment, chips });
            },

            toggleAutoBuy: (itemId: string) => {
                set(state => ({
                    autoBuy: { ...state.autoBuy, [itemId]: !state.autoBuy[itemId] },
                }));
            },

            buyItem: (itemId: string) => {
                const state = get();
                const item = SHOP_ITEMS.find(i => i.id === itemId);
                if (!item || state.money < item.cost) return;

                const newMoney = state.money - item.cost;
                const isCompany = itemId === 'create_company';
                const logText = isCompany ? '创建了公司' : '购买了' + item.name;
                const logType = isCompany ? 'milestone' as const : undefined;
                const newLog = addLog(state.log, { day: state.day, text: logText, type: logType });

                const addedChips = (item.chips || 0);
                const addedEquipment = (item.equipment || 0);

                set({
                    money: newMoney,
                    log: newLog,
                    hasBuy: { ...state.hasBuy, [itemId]: true },
                    chips: state.chips + addedChips,
                    equipment: state.equipment + addedEquipment,
                });
            },

            resolveEvent: (_action?: string) => {
                const state = get();
                let queue = [...state.eventQueue];
                let currentEvent: GameEvent | null = null;
                let eventStartMs = 0;

                if (queue.length > 0) {
                    currentEvent = queue[0];
                    queue = queue.slice(1);
                    eventStartMs = Date.now();
                }

                set({ currentEvent, eventQueue: queue, eventStartMs });
            },

            setManpowerRate: (rate: number) => {
                set({ manpowerRate: Math.max(0, Math.min(100, rate)) });
            },

            setEquipmentRate: (rate: number) => {
                set({ equipmentRate: Math.max(0, Math.min(100, rate)) });
            },

            setChipsRate: (rate: number) => {
                set({ chipsRate: Math.max(0, Math.min(100, rate)) });
            },

            startResearch: (researchId: string) => {
                const state = get();
                if (!state.hasBuy['create_company']) return;
                const research = RESEARCH_ITEMS.find(r => r.id === researchId);
                if (!research || state.completedResearch[researchId]) return;
                if (state.equipment < research.reqEquipment) return;
                if (state.chips < research.reqChips) return;
                if (state.activeResearch === researchId) return;

                set({ activeResearch: researchId });
            },

            reset: () => {
                set(() => ({
                    ...cloneDeep(defaultState),
                    eventStartMs: 0,
                }));
            },
        };
    },
    {
        name: SAVE_KEY,
        partialize: (state) => {
            const { eventStartMs, ...rest } = state;
            return rest;
        },
        merge: (persisted, current) => {
            const merged = { ...current, ...(persisted as Partial<GameState>) };
            if (merged.currentEvent?.duration) {
                merged.eventStartMs = Date.now();
            }
            return merged as GameState;
        },
    },
));
