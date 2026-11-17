// ==UserScript==
// @name         Auto M/D/G/C
// @namespace    http://tampermonkey.net/
// @version      2026-11-16
// @description  自动依次按 C→G→D→M，四个方形按钮右对齐、垂直错开固定在右上角，共用一个 1000ms 定时器
// @author       You
// @match        https://g1tyx.github.io/antimatter-dimensions/new/
// @icon         https://www.google.com/s2/favicons?sz=64&domain=github.io
// @grant        none
// ==/UserScript==

(function () {
    'use strict';

    // 重复执行先清理旧实例
    if (window.__mAuto) window.__mAuto.destroy();

    const INTERVAL = 100; // 共用的自动按键间隔，单位毫秒

    // 按钮尺寸 / 间距
    const SIZE = 20;   // 正方形边长
    const GAP_Y = 4;   // 垂直 gap
    const TOP0 = 22;   // 第一个按钮的 top

    // 按钮从上到下的摆放顺序：M / D / G / C（全部 right: 0，仅 top 不同）
    const KEYS = [
        { key: 'm', code: 'KeyM', keyCode: 77 },
        { key: 'd', code: 'KeyD', keyCode: 68 },
        { key: 'g', code: 'KeyG', keyCode: 71 },
        { key: 'c', code: 'KeyC', keyCode: 67 }
    ].map((k, i) => ({
        ...k,
        top: TOP0 + i * (SIZE + GAP_Y)  // 22 / 46 / 70 / 94
    }));

    // 每个 tick 内的触发顺序：反过来 → C, G, D, M
    const PRESS_ORDER = ['c', 'g', 'd', 'm'];

    /* ---------- 焦点记录（四个键共用） ---------- */
    let lastFocused = null;
    function onFocusIn(e) { lastFocused = e.target; }
    document.addEventListener('focusin', onFocusIn, true);

    function targetEl() {
        return (lastFocused && document.contains(lastFocused)) ? lastFocused : document;
    }

    function makeEvent(type, k) {
        const e = new KeyboardEvent(type, {
            key: k.key,
            code: k.code,
            bubbles: true,
            cancelable: true,
            composed: true
        });
        Object.defineProperty(e, 'keyCode', { get: () => k.keyCode });
        Object.defineProperty(e, 'which', { get: () => k.keyCode });
        return e;
    }

    /* ---------- 共享状态与唯一定时器 ---------- */
    const enabled = { m: false, d: false, g: false, c: false };
    const byKey = {};          // key -> 实例
    let timer = null;          // 全局唯一的 interval

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

    /* ---------- 创建四个方形按钮 ---------- */
    const instances = [];
    const api = {};

    KEYS.forEach((k) => {
        const btn = document.createElement('div');
        btn.textContent = k.key.toUpperCase();
        btn.title = `自动按 ${k.key.toUpperCase()}（点击开关）`;

        // 完全内联样式：小方形、右对齐、垂直错开
        Object.assign(btn.style, {
            position: 'fixed',
            top: `${k.top}px`,
            right: '0px',          // 四个按钮统一贴右边缘
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
            boxShadow: '0 1px 2px rgba(0,0,0,0.18)'
        });

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
            startTimer();  // 共用同一个 timer
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

        // 阻止抢焦点 / 冒泡
        btn.addEventListener('mousedown', (e) => {
            e.preventDefault();
            e.stopPropagation();
        });
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            toggle();
        });
        btn.addEventListener('pointerdown', (e) => e.stopPropagation(), true);

        document.documentElement.appendChild(btn);

        const inst = {
            press,
            start,
            stop,
            toggle,
            setActiveUI,
            isRunning: () => !!enabled[k.key],
            el: btn
        };
        instances.push(inst);
        byKey[k.key] = inst;
        api[k.key] = inst;
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
        if (timer) { clearInterval(timer); timer = null; }
        PRESS_ORDER.forEach(k => { enabled[k] = false; });
        document.removeEventListener('focusin', onFocusIn, true);
        instances.forEach(i => i.el.remove());
        delete window.__mAuto;
        console.log('已移除按钮和定时器');
    };

    window.__mAuto = api;

    console.log('右上角已注入四个方形按钮（M / D / G / C），共用一个 1000ms 定时器，按 C → G → D → M 依次触发。');
    console.log('控制命令示例：__mAuto.m.start() / __mAuto.d.stop() / __mAuto.startAll() / __mAuto.destroy()');
})();
