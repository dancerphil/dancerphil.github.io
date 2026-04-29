/* eslint-disable max-lines */
import type { ShopItem, GameEvent, ResearchItem } from './types';

const RAW_SHOP_ITEMS: ShopItem[] = [
    // ── 饮品 ──
    { id: 'water_1', name: '怡宝', cost: 1, tags: ['water'] },
    { id: 'water_2', name: '农夫山泉', cost: 2, tags: ['water'] },
    { id: 'water_9', name: '百岁山', cost: 3, tags: ['water'] },
    { id: 'water_3', name: '可口可乐', cost: 3, tags: ['water'] },
    { id: 'water_10', name: '东方树叶', cost: 4, tags: ['water'] },
    { id: 'water_11', name: '茶π', cost: 5, tags: ['water'] },
    { id: 'water_12', name: '元气森林', cost: 5, tags: ['water'] },
    { id: 'water_4', name: '王老吉', cost: 6, tags: ['water'] },
    { id: 'water_6', name: '美汁源', cost: 7, tags: ['water'] },
    { id: 'water_5', name: '特仑苏', cost: 8, tags: ['water'] },
    { id: 'water_13', name: '瑞幸', cost: 12, tags: ['water'] },
    { id: 'water_7', name: '喜茶', cost: 15, tags: ['water'] },
    { id: 'water_14', name: '霸王茶姬', cost: 20, tags: ['water'] },
    { id: 'water_15', name: '奈雪的茶', cost: 25, tags: ['water'] },
    { id: 'water_8', name: '星巴克', cost: 33, tags: ['water'] },
    { id: 'water_16', name: 'Manner咖啡', cost: 20, tags: ['water'] },
    { id: 'water_18', name: '獭祭清酒', cost: 800, tags: ['water'] },
    { id: 'water_19', name: '茅台', cost: 2_500, tags: ['water'] },
    { id: 'water_20', name: '山崎威士忌', cost: 3_000, tags: ['water'] },
    { id: 'water_25', name: '拉菲', cost: 8_000, tags: ['water'] },
    { id: 'water_29', name: '罗曼尼康帝', cost: 80_000, tags: ['water'] },

    // ── 食物 ──
    { id: 'food_2', name: '康师傅方便面', cost: 4, tags: ['food'] },
    { id: 'food_1', name: '桃李面包', cost: 5, tags: ['food'] },
    { id: 'food_3', name: '巴比馒头', cost: 6, tags: ['food'] },
    { id: 'food_21', name: '螺蛳粉', cost: 12, tags: ['food'] },
    { id: 'food_11', name: '沙县小吃', cost: 12, tags: ['food'] },
    { id: 'food_12', name: '兰州拉面', cost: 15, tags: ['food'] },
    { id: 'food_13', name: '黄焖鸡米饭', cost: 18, tags: ['food'] },
    { id: 'food_22', name: '小杨生煎', cost: 18, tags: ['food'] },
    { id: 'food_14', name: '老乡鸡', cost: 25, tags: ['food'] },
    { id: 'food_23', name: '喜家德水饺', cost: 28, tags: ['food'] },
    { id: 'food_6', name: '杨国福', cost: 28, tags: ['food'] },
    { id: 'food_4', name: '赛百味', cost: 30, tags: ['food'] },
    { id: 'food_5', name: '真功夫', cost: 30, tags: ['food'] },
    { id: 'food_7', name: '麦当劳', cost: 35, tags: ['food'] },
    { id: 'food_24', name: '达美乐', cost: 40, tags: ['food'] },
    { id: 'food_8', name: '元气寿司', cost: 55, tags: ['food'] },
    { id: 'food_25', name: '呷哺呷哺', cost: 60, tags: ['food'] },
    { id: 'food_26', name: '外婆家', cost: 70, tags: ['food'] },
    { id: 'food_27', name: '绿茶餐厅', cost: 70, tags: ['food'] },
    { id: 'food_15', name: '太二酸菜鱼', cost: 80, tags: ['food'] },
    { id: 'food_28', name: '必胜客', cost: 80, tags: ['food'] },
    { id: 'food_29', name: '蓝蛙', cost: 90, tags: ['food'] },
    { id: 'food_16', name: '西贝莜面村', cost: 100, tags: ['food'] },
    { id: 'food_30', name: '点都德', cost: 100, tags: ['food'] },
    { id: 'food_31', name: '八合里牛肉火锅', cost: 100, tags: ['food'] },
    { id: 'food_9', name: '海底捞', cost: 120, tags: ['food'] },
    { id: 'food_17', name: '鼎泰丰', cost: 120, tags: ['food'] },
    { id: 'food_32', name: '哥老官', cost: 130, tags: ['food'] },
    { id: 'food_10', name: '金钱豹', cost: 150, tags: ['food'] },
    { id: 'food_18', name: '大董烤鸭', cost: 400, tags: ['food'] },
    { id: 'food_19', name: '新荣记', cost: 500, tags: ['food'] },
    { id: 'food_33', name: '老乾杯', cost: 500, tags: ['food'] },
    { id: 'food_34', name: '福和慧', cost: 1_200, tags: ['food'] },
    { id: 'food_35', name: '甬府', cost: 1_500, tags: ['food'] },
    { id: 'food_36', name: '唐阁', cost: 1_800, tags: ['food'] },
    { id: 'food_20', name: '鮨一', cost: 2_000, tags: ['food'] },
    { id: 'food_37', name: '龙景轩', cost: 2_500, tags: ['food'] },
    { id: 'food_38', name: 'Ultraviolet', cost: 5_000, tags: ['food'] },

    // ── 住宿 ──
    { id: 'hotel', name: '如家', cost: 200 },
    { id: 'b_n_b', name: '全季', cost: 300 },
    { id: 'marriott', name: '万豪', cost: 1_500 },
    { id: 'peninsula', name: '半岛酒店', cost: 3_000 },
    { id: 'apartment', name: '自如', cost: 3_000 },
    { id: 'villa', name: '汤臣一品', cost: 25_000_000 },

    // ── 出行 ──
    { id: 'car_wuling', name: '五菱宏光', cost: 50_000 },
    { id: 'car_byd', name: '比亚迪汉', cost: 120_000 },
    { id: 'car_honda', name: '本田雅阁', cost: 180_000 },
    { id: 'car_tesla', name: '特斯拉 Model 3', cost: 250_000 },
    { id: 'car_bmw', name: '宝马330Li', cost: 350_000 },
    { id: 'car_benz', name: '奔驰C260L', cost: 350_000 },
    { id: 'car_nio', name: '蔚来ET7', cost: 400_000 },
    { id: 'car_audi', name: '奥迪A6L', cost: 450_000 },
    { id: 'car_porsche', name: '保时捷Cayenne Turbo', cost: 1_200_000 },
    { id: 'car_maybach', name: '迈巴赫S680', cost: 2_500_000 },
    { id: 'car_ferrari', name: '法拉利Roma', cost: 3_000_000 },
    { id: 'car_lamborghini', name: '兰博基尼Huracán', cost: 5_000_000 },
    { id: 'car_rr', name: '劳斯莱斯幻影', cost: 8_000_000 },
    { id: 'car_bugatti', name: '布加迪Chiron', cost: 30_000_000 },

    // ── 娱乐 ──
    { id: 'music_vip', name: 'QQ音乐', cost: 15 },
    { id: 'video_vip', name: '爱奇艺', cost: 25 },
    { id: 'wz_skin', name: '王者荣耀皮肤', cost: 88 },
    { id: 'murder_mystery', name: '剧本杀', cost: 88 },
    { id: 'gym', name: '乐刻健身', cost: 200 },
    { id: 'disney', name: '迪士尼', cost: 400 },
    { id: 'universal', name: '环球影城', cost: 400 },
    { id: 'switch', name: 'Switch', cost: 2_000, chips: 500 },
    { id: 'ps5', name: 'PS5', cost: 4_000, chips: 1_000 },

    // ── 购物 ──
    { id: 'coffee_machine', name: '咖啡机', cost: 500, equipment: 500 },
    { id: 'printer', name: '打印机', cost: 1_000, equipment: 800 },
    { id: 'desk', name: '办公桌', cost: 2_000, equipment: 1_000 },
    { id: 'uniqlo', name: '优衣库', cost: 500 },
    { id: 'nike', name: '耐克', cost: 800 },
    { id: 'lancome', name: '兰蔻', cost: 800 },
    { id: 'northface', name: '北面', cost: 1_500 },
    { id: 'arcteryx', name: '始祖鸟', cost: 2_000 },
    { id: 'mi_phone', name: '小米手机', cost: 3_000, chips: 500 },
    { id: 'dyson', name: '戴森吹风机', cost: 3_000 },
    { id: 'drone', name: '大疆无人机', cost: 5_000, chips: 800, equipment: 800 },
    { id: 'canada_goose', name: 'Canada Goose', cost: 8_000 },
    { id: 'iphone', name: 'iPhone', cost: 8_000, chips: 2_000, equipment: 1_000 },
    { id: 'macbook', name: 'MacBook', cost: 12_000, chips: 5_000, equipment: 3_000 },
    { id: 'tiffany', name: '蒂芙尼', cost: 12_000 },
    { id: 'lv_bag', name: 'LV', cost: 15_000 },
    { id: 'gucci', name: '古驰', cost: 20_000 },
    { id: 'dior', name: '迪奥', cost: 25_000 },
    { id: 'chanel', name: '香奈儿', cost: 35_000 },
    { id: 'cartier', name: '卡地亚', cost: 50_000 },
    { id: 'rolex', name: '劳力士', cost: 60_000 },
    { id: 'hermes', name: '爱马仕', cost: 80_000 },

    // ── 创业 ──
    { id: 'create_company', name: '创建公司', cost: 1_000_000 },
];

export const SHOP_ITEMS: ShopItem[] = [...RAW_SHOP_ITEMS].sort((a, b) => a.cost - b.cost);

export const INITIAL_MONEY = 1000;

export const DAILY_GROWTH_RATE = 0.01;

export const TICK_MS = 100;

export const VICTORY_CHIPS = 20_000_000_000;

// ── Events ──

export const EVENT_PROGRESS_MS = 3000;

export const START_EVENT: GameEvent = {
    id: 'start',
    type: 'start',
    title: '1% 游戏',
    description: '你的初始资金为 ¥1,000。\n\n每天你的资金会自动增长 1%。购买「创建公司」进入第二阶段，通过分配收益比例来积累设备、芯片和人力，完成研究并最终让芯片达到 ¥200 亿即可获胜。',
    choices: [{ text: '开始游戏', action: 'start_game' }],
};

export function createNoWaterEvent(id: number): GameEvent {
    return {
        id: `no_water_${id}`,
        type: 'no_water',
        title: '口渴',
        description: '你没有设置自动购买饮品。在商店购买饮品并开启自动购买，以免每天收到提醒。',
        duration: EVENT_PROGRESS_MS,
    };
}

export function createNoFoodEvent(id: number): GameEvent {
    return {
        id: `no_food_${id}`,
        type: 'no_food',
        title: '饥饿',
        description: '你没有设置自动购买食物。在商店购买食物并开启自动购买，以免每天收到提醒。',
        duration: EVENT_PROGRESS_MS,
    };
}

// ── Phase 2: Company & Research ──

export const MANPOWER_DAILY_COST = 1_000;
export const CHIPS_MAX = 10_000_000_000;

export const RESEARCH_ITEMS: ResearchItem[] = [
    {
        id: 'basic_mgmt',
        name: '基础管理',
        description: '建立基本的企业管理制度',
        personDays: 10,
        reqEquipment: 500,
        reqChips: 200,
    },
    {
        id: 'office_auto',
        name: '自动化办公',
        description: '引入OA系统，提升运营效率',
        personDays: 30,
        reqEquipment: 2_000,
        reqChips: 1_000,
    },
    {
        id: 'cloud',
        name: '云计算平台',
        description: '搭建云基础设施，支撑业务扩展',
        personDays: 60,
        reqEquipment: 10_000,
        reqChips: 5_000,
    },
    {
        id: 'ai_lab',
        name: 'AI 实验室',
        description: '组建AI研究团队，探索前沿技术',
        personDays: 120,
        reqEquipment: 50_000,
        reqChips: 20_000,
    },
    {
        id: 'quantum',
        name: '量子计算',
        description: '突破计算极限，开启新纪元',
        personDays: 300,
        reqEquipment: 200_000,
        reqChips: 100_000,
    },
];
