export interface ShopItem {
    id: string;
    name: string;
    cost: number;
    tags?: string[];
    chips?: number;
    equipment?: number;
}

export interface LogEntry {
    day: number;
    text: string;
    type?: 'warning' | 'milestone';
}

export type GameEventType = 'start' | 'no_water' | 'no_food';

export interface GameEvent {
    id: string;
    type: GameEventType;
    title: string;
    description: string;
    choices?: { text: string; action: string }[];
    duration?: number;
}

export interface ResearchItem {
    id: string;
    name: string;
    description: string;
    personDays: number;
    reqEquipment: number;
    reqChips: number;
}
