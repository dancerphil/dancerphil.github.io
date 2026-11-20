// ==UserScript==
// @name         Auto M/D/G/C
// @namespace    https://tampermonkey.net/
// @version      2026-11-16
// @description  自动依次按 C→G→D→M，四个方形按钮右对齐、垂直错开固定在右上角，共用一个 1000ms 定时器；【9】开关购买规划标记
// @author       You
// @match        https://g1tyx.github.io/antimatter-dimensions/new/
// @icon         https://www.google.com/s2/favicons?sz=64&domain=github.io
// @grant        none
// ==/UserScript==

/* eslint-disable hero-u/no-javascript-source, func-names, unicorn/prefer-module, unicorn/no-global-object-property-assignment, max-lines -- 浏览器用户脚本，需保持 .js 且为非模块 IIFE */

(function () {
    'use strict';

    // 重复执行先清理旧实例
    if (window.__mAuto) window.__mAuto.destroy();

    const INTERVAL = 100; // 共用的自动按键间隔，单位毫秒

    // 按钮尺寸 / 间距
    const SIZE = 20; // 正方形边长
    const GAP_Y = 4; // 垂直 gap
    const TOP0 = 22; // 第一个按钮的 top

    // 按钮从上到下的摆放顺序：M / D / G / C（全部 right: 0，仅 top 不同）
    const KEYS = [
        { key: 'm', code: 'KeyM', keyCode: 77 },
        { key: 'd', code: 'KeyD', keyCode: 68 },
        { key: 'g', code: 'KeyG', keyCode: 71 },
        { key: 'c', code: 'KeyC', keyCode: 67 },
    ].map((k, i) => ({
        ...k,
        top: TOP0 + i * (SIZE + GAP_Y), // 22 / 46 / 70 / 94
    }));

    // 每个 tick 内的触发顺序：反过来 → C, G, D, M
    const PRESS_ORDER = ['c', 'g', 'd', 'm'];

    const PLANNER_TOP = TOP0 + KEYS.length * (SIZE + GAP_Y); // 【9】按钮位于 C 之下
    const PLANNER_INTERVAL = 200; // 规划标记的界面刷新间隔，单位毫秒
    // 八个维度（每次买 10 份）与计数频率（每次买 1 份）购买后的指数增量
    const PLANNER_STEPS = [3, 4, 5, 6, 8, 10, 12, 15, 1];
    const SEQUENCE = '1-2-3-4-5-T-T-T-6-3-2-1-1-1-T-T-T-T-T-5-7-4-T-T-6-8-4-2-2-2-T-T-7-4-4-3-3-3-2-1-1-T-T-T-T-T-T-6-5-5-1-1-1-T-T-T-T-T-T-T-T-8-3-3-2-2-1-1-1-T-T-T-T-T-T-5-6-1-1-5-3-6-8-7-7-4-4-4-4-3-3-2-1-2-2-2-2-1-1-T-T-T-T-T-T-T-T-T-T-T-T-T-T-T-T-T-T-T-5-2-1-1-T-T-T-T-3-T-6-7-4-4-2-2-T-8-3-3-1-1-T-T-T-T-6-5-5-T-T-3-2-1-1-1-T-T-T-T-T-7-4-T-T-5-6-8-4-2-2-2-T-T-5-7-4-4-3-3-3-2-1-1-1-1-1-T-T-T-T-T-T-T-T-T-T-T-T-T-T-6-5-8-3-3-2-2-1-1-1-T-T-T-T-T-T-6-1-1-3-6-5-5-8-7-7-4-4-4-4-3-3-2-1-2-2-2-2-1-1-T-T-T-T-T-T-T-T-T-T-T-T-T-T-T-T-T-T-T-2-1-T-T-T-3-6-7-4-4-2-2-8-5-5-3-3-1-1-1-T-T-T-T-T-T-T-T-T-6-3-2-1-1-1-T-T-T-T-T-5-7-4-T-T-6-8-4-2-2-2-T-T-7-4-4-3-3-3-2-1-1-T-T-T-T-T-T-6-5-5-1-1-1-T-T-T-T-T-T-T-T-8-3-3-2-2-1-1-1-T-T-T-T-T-T-5-6-1-1-5-3-6-8-7-7-4-4-4-4-3-3-2-1-2-2-2-2-1-1-T-T-T-T-T-T-T-T-T-T-T-T-T-T-T-T-T-T-T-5-2-1-1-T-T-T-T-3-T-6-7-4-4-2-2-T-8-3-3-1-1-T-T-T-T-6-5-5-T-T-3-2-1-1-1-T-T-T-T-T-7-4-T-T-5-6-8-4-2-2-2-T-T-5-7-4-4-3-3-3-2-1-1-1-1-1-T-T-T-T-T-T-T-T-T-T-T-T-T-T-6-5-8-3-3-2-2-1-1-1-T-T-T-T-T-T-6-1-1-3-6-5-5-8-7-7-4-4-4-4-3-3-2-1-2-2-2-2-1-1-T-T-T-T-T-T-T-T-T-T-T-T-T-T-T-T-T-T-T-2-1-T-T-T-3-6-7-4-4-2-2-8-5-5-3-3-1-1-1-T-T-T-T-T-T-T-T-T-6-3-2-1-1-1-T-T-T-T-T-5-7-4-T-T-6-8-4-2-2-2-T-T-7-4-4-3-3-3-2-1-1-T-T-T-T-T-T-6-5-5-1-1-1-T-T-T-T-T-T-T-T-8-3-3-2-2-1-1-1-T-T-T-T-T-T-5-6-1-1-5-3-6-8-7-7-4-4-4-4-3-3-2-1-2-2-2-2-1-1-T-T-T-T-T-T-T-T-T-T-T-T-T-T-T-T-T-T-T-5-2-1-1-T-T-T-T-3-T';

    /* ---------- 焦点记录（四个键共用） ---------- */
    let lastFocused = null;
    function onFocusIn(e) {
        lastFocused = e.target;
    }
    document.addEventListener('focusin', onFocusIn, { capture: true });

    function targetEl() {
        return (lastFocused && document.contains(lastFocused)) ? lastFocused : document;
    }

    function makeEvent(type, k) {
        const e = new KeyboardEvent(type, {
            key: k.key,
            code: k.code,
            shiftKey: !!k.shiftKey,
            bubbles: true,
            cancelable: true,
            composed: true,
        });
        Object.defineProperties(e, {
            keyCode: { get: () => k.keyCode },
            which: { get: () => k.keyCode },
        });
        return e;
    }

    /* ---------- 共享状态与唯一定时器 ---------- */
    const enabled = { m: false, d: false, g: false, c: false };
    const byKey = {}; // key -> 实例
    let timer = null; // 全局唯一的 interval

    function anyEnabled() {
        return PRESS_ORDER.some(k => enabled[k]);
    }

    // 每次 tick：按 C → G → D → M 的顺序，触发当前开启的键
    function tick() {
        const seq = PRESS_ORDER.filter(k => enabled[k]);
        if (!seq.length) return;
        seq.forEach(k => byKey[k].press());
        console.log(`pressed ${seq.map(k => k.toUpperCase()).join(' → ')}`, new Date().toLocaleTimeString());
    }

    function startTimer() {
        if (timer) return;
        timer = setInterval(tick, INTERVAL);
        tick(); // 开启后立刻触发一次
    }

    function stopTimerIfIdle() {
        if (timer && !anyEnabled()) {
            clearInterval(timer);
            timer = null;
        }
    }

    /* ---------- 创建方形按钮 ---------- */
    function createSquare(text, top) {
        const btn = document.createElement('div');
        btn.textContent = text;

        // 完全内联样式：小方形、右对齐、垂直错开
        Object.assign(btn.style, {
            position: 'fixed',
            top: `${top}px`,
            right: '0px', // 所有按钮统一贴右边缘
            width: `${SIZE}px`,
            height: `${SIZE}px`,
            zIndex: '2147483647',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxSizing: 'border-box',
            margin: '0',
            padding: '0',
            backgroundColor: '#ffffff',
            border: '1px solid #888888',
            borderRadius: '3px',
            color: '#222222',
            fontSize: '10px',
            fontWeight: 'bold',
            fontFamily: 'Arial, sans-serif',
            lineHeight: '1',
            cursor: 'pointer',
            userSelect: 'none',
            boxShadow: '0 1px 2px rgba(0,0,0,0.18)',
        });

        // 阻止抢焦点 / 冒泡
        btn.addEventListener('mousedown', (e) => {
            e.preventDefault();
            e.stopPropagation();
        });
        btn.addEventListener('pointerdown', e => e.stopPropagation(), { capture: true });

        document.documentElement.append(btn);
        return btn;
    }

    /* ---------- 创建四个按键开关 ---------- */
    const instances = [];
    const api = {};

    KEYS.forEach((k) => {
        const btn = createSquare(k.key.toUpperCase(), k.top);
        btn.title = `自动按 ${k.key.toUpperCase()}（点击开关）`;

        // 只负责单个键的按键事件
        function press() {
            const el = targetEl();
            el.dispatchEvent(makeEvent('keydown', k));
            el.dispatchEvent(makeEvent('keypress', k));
            el.dispatchEvent(makeEvent('keyup', k));
        }

        function setActiveUI(on) {
            btn.style.backgroundColor = on ? '#d4f8e8' : '#ffffff';
            btn.style.borderColor = on ? '#22a06b' : '#888888';
            btn.style.boxShadow = on
                ? '0 0 0 2px #22a06b, 0 1px 2px rgba(0,0,0,0.18)'
                : '0 1px 2px rgba(0,0,0,0.18)';
            btn.title = on
                ? `正在自动按 ${k.key.toUpperCase()}（点击停止）`
                : `自动按 ${k.key.toUpperCase()}（点击开启）`;
        }

        function start() {
            if (enabled[k.key]) return;
            enabled[k.key] = true;
            setActiveUI(true);
            startTimer(); // 共用同一个 timer
            console.log(`▶ 自动按 ${k.key.toUpperCase()} 已开启`);
        }

        function stop() {
            if (!enabled[k.key]) return;
            enabled[k.key] = false;
            setActiveUI(false);
            stopTimerIfIdle();
            console.log(`⏸ 自动按 ${k.key.toUpperCase()} 已关闭`);
        }

        function toggle() {
            enabled[k.key] ? stop() : start();
        }

        btn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            toggle();
        });

        const inst = {
            press,
            start,
            stop,
            toggle,
            setActiveUI,
            isRunning: () => !!enabled[k.key],
            el: btn,
        };
        instances.push(inst);
        byKey[k.key] = inst;
        api[k.key] = inst;
    });

    /* ---------- 购买规划（【9】开关） ---------- */
    let plannerOn = false;

    // 八个维度每次买 10 份，disabled 时显示的是 1/10 价格，补回 1；计数频率每次买 1 份，价格无需修正
    function readPlannerItems() {
        const tick = document.querySelector('.tickspeed-btn');
        const rows = [...document.querySelectorAll('.c-antimatter-dim-row')];
        if (!tick || !rows.length) return null;
        const dimensions = rows.map(row => row.querySelector('button')).map((btn) => {
            const disabled = btn.classList.contains('o-primary-btn--disabled');
            const exp = Number(btn.textContent.match(/e(\d+)/)[1]);
            return { btn, disabled, exp: disabled ? exp + 1 : exp };
        });
        const tickspeed = {
            btn: tick,
            disabled: tick.classList.contains('o-primary-btn--disabled'),
            exp: Number(tick.textContent.match(/e(\d+)/)[1]),
        };
        return [...dimensions, tickspeed];
    }

    // 购买后价格与购买项相同的项目都会按各自步长升级；购买后产生的新重复价格即为冲突
    const duplicatePrices = prices => new Set(prices.filter((p, i) => prices.indexOf(p) !== i));

    const isSafeToBuy = (prices, item) => {
        const after = prices.map((p, i) => (p === prices[item] ? p + PLANNER_STEPS[i] : p));
        const before = duplicatePrices(prices);
        return [...duplicatePrices(after)].every(p => before.has(p));
    };

    function clearPlannerMarks() {
        document.querySelectorAll('.planner-mark').forEach(mark => mark.remove());
    }

    function renderPlanner() {
        if (!plannerOn) return;
        const items = readPlannerItems();
        if (!items) return;
        const prices = items.map(item => item.exp);
        items.forEach((item, i) => {
            let mark = item.btn.nextElementSibling;
            if (!mark || !mark.classList.contains('planner-mark')) {
                mark = document.createElement('span');
                mark.className = 'planner-mark';
                Object.assign(mark.style, { marginLeft: '4px', fontSize: '14px', alignSelf: 'center' });
                item.btn.after(mark);
            }
            mark.textContent = !isSafeToBuy(prices, i) ? '' : (item.disabled ? '❓' : '✅');
        });
    }

    const plannerTimer = setInterval(renderPlanner, PLANNER_INTERVAL);

    const SEQUENCE_ITEMS = SEQUENCE.split('-');
    let sequenceQueue = [...SEQUENCE_ITEMS];
    const sequenceEl = createSquare('', PLANNER_TOP);
    Object.assign(sequenceEl.style, {
        right: `${SIZE + 4}px`,
        width: 'auto',
        padding: '0 4px',
        display: 'none',
        whiteSpace: 'nowrap',
        fontSize: '12px',
    });

    function renderSequence() {
        sequenceEl.textContent = sequenceQueue.slice(0, 4).join(' - ');
    }

    // 数字 1–8 对应维度，T 对应 Shift+T（升级计数频率），按真实键盘顺序派发 Shift 按下 → T → Shift 松开
    const SHIFT_KEY = { key: 'Shift', code: 'ShiftLeft', keyCode: 16 };
    function pressToken(token) {
        const el = targetEl();
        const shift = token === 'T';
        const k = shift
            ? { key: 'T', code: 'KeyT', keyCode: 84, shiftKey: true }
            : { key: token, code: `Digit${token}`, keyCode: 48 + Number(token) };
        if (shift) el.dispatchEvent(makeEvent('keydown', { ...SHIFT_KEY, shiftKey: true }));
        el.dispatchEvent(makeEvent('keydown', k));
        el.dispatchEvent(makeEvent('keypress', k));
        el.dispatchEvent(makeEvent('keyup', k));
        if (shift) el.dispatchEvent(makeEvent('keyup', SHIFT_KEY));
    }

    // 手动按 d 时从头依次派发整个 SEQUENCE，每个之间用 setTimeout 0 衔接；再次手动按 d 从头重新开始，【9】关闭时停止
    let chainId = 0;
    function startChain() {
        const id = ++chainId;
        let i = 0;
        (function step() {
            if (id !== chainId || i >= SEQUENCE_ITEMS.length) return;
            pressToken(SEQUENCE_ITEMS[i++]);
            setTimeout(step, 0);
        })();
    }
    function stopChain() {
        chainId++;
    }

    function onManualD(e) {
        if (e.isTrusted && e.key === 'd') startChain();
    }

    // 9 等于按下队首；自动按键的合成事件不处理
    function onSequenceKey(e) {
        if (!e.isTrusted || e.key !== '9') return;
        if (!sequenceQueue.length) return;
        e.preventDefault();
        e.stopImmediatePropagation();
        pressToken(sequenceQueue.shift());
        renderSequence();
    }

    const plannerBtn = createSquare('9', PLANNER_TOP);
    plannerBtn.title = '显示购买规划（点击开关）';
    plannerBtn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        plannerOn = !plannerOn;
        plannerBtn.style.backgroundColor = plannerOn ? '#d4f8e8' : '#ffffff';
        plannerBtn.style.borderColor = plannerOn ? '#22a06b' : '#888888';
        sequenceEl.style.display = plannerOn ? 'flex' : 'none';
        if (plannerOn) {
            sequenceQueue = [...SEQUENCE_ITEMS];
            renderSequence();
            window.addEventListener('keydown', onSequenceKey, { capture: true });
            window.addEventListener('keydown', onManualD, { capture: true });
        }
        else {
            clearPlannerMarks();
            window.removeEventListener('keydown', onSequenceKey, true);
            window.removeEventListener('keydown', onManualD, true);
            stopChain();
        }
    });

    /* ---------- 全局控制 ---------- */
    api.startAll = () => {
        // 先全部置为开启，再启动 timer，这样第一次 tick 就是完整的 C→G→D→M
        PRESS_ORDER.forEach((k) => {
            if (enabled[k]) return;
            enabled[k] = true;
            byKey[k].setActiveUI(true);
        });
        startTimer();
        console.log('▶ 全部开启');
    };

    api.stopAll = () => {
        PRESS_ORDER.forEach((k) => {
            enabled[k] = false;
            byKey[k].setActiveUI(false);
        });
        stopTimerIfIdle();
        console.log('⏸ 全部关闭');
    };

    api.toggleAll = () => {
        anyEnabled() ? api.stopAll() : api.startAll();
    };

    api.destroy = () => {
        if (timer) {
            clearInterval(timer);
            timer = null;
        }
        clearInterval(plannerTimer);
        clearPlannerMarks();
        window.removeEventListener('keydown', onSequenceKey, true);
        window.removeEventListener('keydown', onManualD, true);
        stopChain();
        plannerBtn.remove();
        sequenceEl.remove();
        PRESS_ORDER.forEach((k) => {
            enabled[k] = false;
        });
        document.removeEventListener('focusin', onFocusIn, true);
        instances.forEach(i => i.el.remove());
        delete window.__mAuto;
        console.log('已移除按钮和定时器');
    };

    window.__mAuto = api;

    console.log('右上角已注入五个方形按钮（M / D / G / C / 9），共用一个 1000ms 定时器，按 C → G → D → M 依次触发；9 开关购买规划标记。');
    console.log('控制命令示例：__mAuto.m.start() / __mAuto.d.stop() / __mAuto.startAll() / __mAuto.destroy()');
})();
