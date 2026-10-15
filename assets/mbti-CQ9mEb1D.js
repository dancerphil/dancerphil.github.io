import{i as e,l as t,n,r,t as i}from"./jsx-runtime-DXDvaycA.js";import{d as a,n as o,p as s,t as c,v as l}from"./Box-B2JG_hwo.js";import{t as u}from"./MantineProvider-DUfKCMFx.js";import{n as d,r as f}from"./Transition-D3cexHly.js";import{n as p}from"./use-merged-ref-Caca3s8I.js";import{t as m}from"./use-disclosure-oBj0P3pV.js";import{t as h}from"./get-style-object-BDpgefo6.js";import{t as g}from"./Tooltip-CHdTnj0E.js";import{t as _}from"./ActionIcon-DP19picx.js";import{t as v}from"./Group-B-6JBxhe.js";import{t as y}from"./Flex-cFXbOg_Q.js";import{t as b}from"./Text-DllXAllD.js";import{t as x}from"./Button-D7lMJdnF.js";import{t as S}from"./Container-X814b_IJ.js";import{t as C}from"./Divider-Cb1xajap.js";import{t as w}from"./Stack-CoZHpUNx.js";import{t as T}from"./createReactComponent-Bufbw_R6.js";import{t as E}from"./Markdown-CYtWq1gL.js";/* empty css               */import{t as D}from"./createRegion-DIyy4-D5.js";var O={" ":`space`,ArrowLeft:`arrowleft`,ArrowRight:`arrowright`,ArrowUp:`arrowup`,ArrowDown:`arrowdown`,Escape:`escape`,Esc:`escape`,esc:`escape`,Enter:`enter`,Tab:`tab`,Backspace:`backspace`,Delete:`delete`,Insert:`insert`,Home:`home`,End:`end`,PageUp:`pageup`,PageDown:`pagedown`,"+":`plus`,"-":`minus`,"*":`asterisk`,"/":`slash`};function k(e){let t=e.replace(`Key`,``).toLowerCase();return O[e]||t}function A(e){let t=e.toLowerCase().split(`+`).map(e=>e.trim()),n={alt:t.includes(`alt`),ctrl:t.includes(`ctrl`),meta:t.includes(`meta`),mod:t.includes(`mod`),shift:t.includes(`shift`)},r=[`alt`,`ctrl`,`meta`,`shift`,`mod`],i=t.find(e=>!r.includes(e));return{...n,key:i===`[plus]`?`+`:i}}function j(e,t,n){let{alt:r,ctrl:i,meta:a,mod:o,shift:s,key:c}=e,{altKey:l,ctrlKey:u,metaKey:d,shiftKey:f,key:p,code:m}=t;if(r!==l)return!1;if(o){if(!u&&!d)return!1}else if(i!==u||a!==d)return!1;return s===f&&!!(c&&(n?k(m)===k(c):k(p??m)===k(c)))}function M(e,t){return n=>j(A(e),n,t)}var N=t(e(),1);function P(e,t,n=!1){return e.target instanceof HTMLElement?(n||!e.target.isContentEditable)&&!t.includes(e.target.tagName):!0}function F(e,t=[`INPUT`,`TEXTAREA`,`SELECT`],n=!1){let r=(0,N.useEffectEvent)(r=>{e.forEach(([e,i,a={preventDefault:!0,usePhysicalKeys:!1}])=>{M(e,a.usePhysicalKeys)(r)&&P(r,t,n)&&(a.preventDefault&&r.preventDefault(),i(r))})});(0,N.useEffect)(()=>(document.documentElement.addEventListener(`keydown`,r),()=>document.documentElement.removeEventListener(`keydown`,r)),[])}var I=t(r(),1);function L(e){if(!e||typeof e==`string`)return 0;let t=e/36;return Math.round((4+15*t**.25+t/5)*10)}function R(e){return e.current?e.current.scrollHeight:`auto`}function ee({transitionDuration:e,transitionTimingFunction:t=`ease`,onTransitionEnd:n,onTransitionStart:r,expanded:i,keepMounted:a}){let o={height:0,overflow:`hidden`,...a?{}:{display:`none`}},s=(0,N.useEffectEvent)(()=>r?.()),c=(0,N.useRef)(null),[l,u]=(0,N.useState)(i?{}:o),[d,m]=(0,N.useState)(i?`entered`:`exited`),h=e=>{(0,I.flushSync)(()=>u(e))},g=e=>{h(t=>({...t,...e}))},_=n=>{let r=e??L(n);return{transition:`height ${r}ms ${t}, opacity ${r}ms ${t}`}};f(()=>{e!==0&&s(),i?window.requestAnimationFrame(()=>{(0,I.flushSync)(()=>m(`entering`)),g({willChange:`height`,display:`block`,overflow:`hidden`}),window.requestAnimationFrame(()=>{let e=R(c);g({..._(e),height:e})})}):window.requestAnimationFrame(()=>{(0,I.flushSync)(()=>m(`exiting`));let e=R(c);g({..._(e),willChange:`height`,height:e}),window.requestAnimationFrame(()=>g({height:0,overflow:`hidden`}))})},[i]);let v=e=>{if(e.target===c.current&&e.propertyName===`height`)if(i){let e=R(c);e===l.height?h({}):g({height:e}),m(`entered`),n?.()}else l.height===0&&(h(o),m(`exited`),n?.())};return{state:d,getCollapseProps:e=>({"aria-hidden":!i,inert:!i,ref:p(c,e?.ref),onTransitionEnd:v,style:{boxSizing:`border-box`,...e?.style,...l}})}}function te(e){if(!e||typeof e==`string`)return 0;let t=e/36;return Math.round((4+15*t**.25+t/5)*10)}function z(e){return e.current?e.current.scrollWidth:`auto`}function B({transitionDuration:e,transitionTimingFunction:t=`ease`,onTransitionEnd:n,onTransitionStart:r,expanded:i,keepMounted:a}){let o={width:0,overflow:`hidden`,...a?{}:{display:`none`}},s=(0,N.useEffectEvent)(()=>r?.()),c=(0,N.useRef)(null),[l,u]=(0,N.useState)(i?{}:o),[d,m]=(0,N.useState)(i?`entered`:`exited`),h=e=>{(0,I.flushSync)(()=>u(e))},g=e=>{h(t=>({...t,...e}))},_=n=>{let r=e??te(n);return{transition:`width ${r}ms ${t}, opacity ${r}ms ${t}`}};f(()=>{e!==0&&s(),i?window.requestAnimationFrame(()=>{(0,I.flushSync)(()=>m(`entering`)),g({willChange:`width`,display:`block`,overflow:`hidden`}),window.requestAnimationFrame(()=>{let e=z(c);g({..._(e),width:e})})}):window.requestAnimationFrame(()=>{(0,I.flushSync)(()=>m(`exiting`));let e=z(c);g({..._(e),willChange:`width`,width:e}),window.requestAnimationFrame(()=>g({width:0,overflow:`hidden`}))})},[i]);let v=e=>{if(e.target===c.current&&e.propertyName===`width`)if(i){let e=z(c);e===l.width?h({}):g({width:e}),m(`entered`),n?.()}else l.width===0&&(h(o),m(`exited`),n?.())};return{state:d,getCollapseProps:e=>({"aria-hidden":!i,inert:!i,ref:p(c,e?.ref),onTransitionEnd:v,style:{boxSizing:`border-box`,...e?.style,...l}})}}var V=i(),H={transitionDuration:200,transitionTimingFunction:`ease`,animateOpacity:!0,orientation:`vertical`,keepMounted:!0,keepMountedMode:`activity`},U=o(e=>{let{children:t,expanded:n,transitionDuration:r,transitionTimingFunction:i,style:o,onTransitionEnd:u,onTransitionStart:f,animateOpacity:p,keepMounted:m,keepMountedMode:g,ref:_,orientation:v,...y}=a(`Collapse`,H,e),b=l(),x=s(),S=d(),C=x.respectReducedMotion&&S?0:r,w=(v===`horizontal`?B:ee)({expanded:n,transitionDuration:C,transitionTimingFunction:i,onTransitionEnd:u,onTransitionStart:f,keepMounted:!1});if(C===0)return m===!0&&(g===`display-none`||b!==`test`)?g===`display-none`?(0,V.jsx)(c,{...y,style:{...h(o,x),...n?{}:{display:`none`}},ref:_,children:t}):(0,V.jsx)(N.Activity,{mode:n?`visible`:`hidden`,children:(0,V.jsx)(c,{...y,style:o,ref:_,children:t})}):n?(0,V.jsx)(c,{...y,style:o,ref:_,children:t}):null;let T=w.state===`exited`,E;return E=m===!1?T?null:t:m===!0?g===`display-none`?t:(0,V.jsx)(N.Activity,{mode:T?`hidden`:`visible`,children:t}):t,(0,V.jsx)(c,{...y,...w.getCollapseProps({style:{opacity:n||!p?1:0,transition:p?`opacity ${C}ms ${i}`:`none`,...h(o,x),...m&&g===`display-none`&&T?{display:`none`}:{}},ref:_}),children:E})});U.displayName=`@mantine/core/Collapse`;var W=T(`outline`,`help`,`Help`,[[`path`,{d:`M3 12a9 9 0 1 0 18 0a9 9 0 1 0 -18 0`,key:`svg-0`}],[`path`,{d:`M12 17l0 .01`,key:`svg-1`}],[`path`,{d:`M12 13.5a1.5 1.5 0 0 1 1 -1.5a2.6 2.6 0 1 0 -3 -4`,key:`svg-2`}]]);function G(...e){return e.flat().filter(Boolean).join(` `).trim()}function K(e,t){let{className:n,tooltip:r,disabledReason:i,tooltipProps:a,...o}=t??{};return t=>{let{ref:s,className:c,tooltip:l=r,disabledReason:u=i,tooltipProps:d=a,...f}=t,p={className:G(n,c),...o,...f},m=(0,V.jsx)(e,{ref:s,...p});return p.disabled&&u?(0,V.jsx)(g,{label:u,...d,children:m}):l?(0,V.jsx)(g,{label:l,...d,children:m}):m}}var q=n(),J=(e=``,t)=>{let n=e.toUpperCase();return t.includes(n)?n:`X`},Y=(e,t)=>{for(let n=0;n<e.length;n++)if(t[n]!==`X`&&e[n]!==t[n])return!1;return!0},X={I:`E`,E:`I`,N:`S`,S:`N`,F:`T`,T:`F`,J:`P`,P:`J`,X:`X`,i:`e`,e:`i`,x:`x`},Z=e=>{let t=J(e[0],[`I`,`E`]),n=J(e[1],[`N`,`S`]),r=J(e[2],[`F`,`T`]),i=J(e[3],[`J`,`P`]),a=X[n],o=X[r],s=`${t}${n}${r}${i}`;return Y(s,`IXXJ`)?[`${n}i`,`${r}e`,`${o}i`,`${a}e`,`${n}e`,`${r}i`,`${o}e`,`${a}i`]:Y(s,`IXXP`)?[`${r}i`,`${n}e`,`${a}i`,`${o}e`,`${r}e`,`${n}i`,`${a}e`,`${o}i`]:Y(s,`EXXJ`)?[`${r}e`,`${n}i`,`${a}e`,`${o}i`,`${r}i`,`${n}e`,`${a}i`,`${o}e`]:Y(s,`EXXP`)?[`${n}e`,`${r}i`,`${o}e`,`${a}i`,`${n}i`,`${r}e`,`${o}i`,`${a}e`]:[]};K(x),K(_,{size:32});var ne=K(W,{size:16,style:{display:`inline-flex`,cursor:`help`,color:`var(--mantine-color-gray-6)`}}),Q=D(``,{withLocalStorageKey:`mbti/personality`}),re=Q.useValue,ie=Q.set,ae=`“八维功能”通常指的是 MBTI（迈尔斯人格类型）体系里的 **八个认知功能（Cognitive Functions）**。
它不是简单的 “16 型人格标签”，而是描述一个人 **如何感知世界、如何做决策** 的底层机制。

八个功能来自两组维度：

* 感知方式：

  * S（感觉 / Sensing）
  * N（直觉 / iNtuition）

* 判断方式：

  * T（思维 / Thinking）
  * F（情感 / Feeling）

再加上：

* 内向（Introverted，i）
* 外向（Extraverted，e）

于是形成：

| 感知 | 判断 |
| -- | -- |
| Se | Te |
| Si | Ti |
| Ne | Fe |
| Ni | Fi |

共八个功能。

---

# 八维功能分别是什么

## Se —— 外向感觉（Extraverted Sensing）

关注现实世界的即时信息。

特点：

* 对环境变化敏锐
* 喜欢“直接体验”
* 行动力强
* 重视真实、刺激、临场感

典型表现：

* 赛车、运动、摄影、即兴发挥
* 很会“活在当下”
* 看到机会立刻行动

低位 Se 常见：

* 忽略现实细节
* 活在脑内
* 临场容易慌

---

## Si —— 内向感觉（Introverted Sensing）

关注过去经验与稳定记忆。

特点：

* 重视熟悉感
* 有“内部数据库”
* 擅长积累经验
* 注重安全、稳定、传统

典型表现：

* 对细节记忆强
* 有固定习惯
* 喜欢可预测环境

高 Si 的人：

“以前这样是有效的。”

低 Si：

* 容易生活混乱
* 不记细节
* 难建立稳定节奏

---

## Ne —— 外向直觉（Extraverted Intuition）

关注“可能性扩散”。

特点：

* 联想能力强
* 一个点能发散无数想法
* 喜欢探索新可能
* 创意、脑洞、跳跃思维

典型表现：

* 聊天容易跑题
* 创业点子很多
* 喜欢“如果……会怎样”

高 Ne：

“万一还能这样呢？”

低 Ne：

* 不喜欢变化
* 缺少想象空间
* 容易路径依赖

---

## Ni —— 内向直觉（Introverted Intuition）

关注“深层模式”和未来趋势。

特点：

* 会把大量信息压缩成一个洞察
* 喜欢本质、规律、长期趋势
* 常有“预感”
* 思维偏收敛

典型表现：

* 一眼看穿核心
* 对未来方向敏感
* 很重视战略感

高 Ni：

“事情最终会发展成这样。”

低 Ni：

* 缺少长期方向
* 难以总结规律
* 容易只看眼前

---

# 判断功能

## Te —— 外向思维（Extraverted Thinking）

关注效率、结果、组织。

特点：

* 喜欢量化
* 注重执行
* 重视客观效率
* 擅长管理系统

典型表现：

* 做计划
* 推进项目
* KPI、流程、优化

高 Te：

“有没有更高效的方法？”

低 Te：

* 执行力弱
* 难组织事情
* 容易空想

---

## Ti —— 内向思维（Introverted Thinking）

关注逻辑自洽。

特点：

* 喜欢分析原理
* 强调“逻辑正确”
* 会不断拆解概念
* 注重精确性

典型表现：

* 爱研究底层机制
* 经常纠错
* 喜欢定义概念

高 Ti：

“这在逻辑上说不通。”

低 Ti：

* 逻辑混乱
* 难独立分析
* 容易照搬结论

---

## Fe —— 外向情感（Extraverted Feeling）

关注群体情绪与关系协调。

特点：

* 对他人情绪敏感
* 重视氛围
* 擅长照顾群体
* 倾向维持和谐

典型表现：

* 会读空气
* 容易共情
* 擅长社交协调

高 Fe：

“大家会不会不舒服？”

低 Fe：

* 不会处理人际气氛
* 容易显得冷
* 社交钝感

---

## Fi —— 内向情感（Introverted Feeling）

关注个人价值观与真实感受。

特点：

* 强调内心真实
* 重视自我认同
* 情感深但未必外露
* 有强烈价值判断

典型表现：

* 很在意“我是否认可”
* 不喜欢违背内心
* 有独特审美与价值观

高 Fi：

“这不符合我真正认可的东西。”

低 Fi：

* 不知道自己真正想要什么
* 容易随波逐流
* 情感自我感弱

---

# 八维是如何工作的

MBTI 认为：

每个人都会使用八个功能，
但有主次之分。

例如：

## INTP

功能序列通常是：

1. Ti（主功能）
2. Ne（辅助）
3. Si（第三）
4. Fe（劣势）

意思是：

* 核心：逻辑分析（Ti）
* 辅助：发散可能性（Ne）
* 稳定器：经验记忆（Si）
* 最不成熟：群体情绪（Fe）

---

# 一个关键理解

MBTI 字母 ≠ 八维本身。

例如：

* “I/E” 不等于社恐/社牛
* “T/F” 不等于理性/感性

真正核心是：

> 你的大脑更习惯用什么方式处理信息。

比如：

* Ni 像“压缩未来趋势”
* Ne 像“无限展开可能”
* Ti 像“逻辑建模”
* Fi 像“价值校准”

---

# 一个比较直观的理解

可以把八维想成：

| 功能 | 类似能力    |
| -- | ------- |
| Se | 实时摄像头   |
| Si | 历史数据库   |
| Ne | 创意生成器   |
| Ni | 趋势预测模型  |
| Te | 项目管理系统  |
| Ti | 数学证明器   |
| Fe | 群体情绪雷达  |
| Fi | 内心价值检测器 |

不同人格，本质上只是：

> “哪些模块最强，哪些模块最弱。”
`,oe={Ti:{name:`内倾思考`,description:`关注逻辑自洽`},Te:{name:`外倾思考`,description:`关注效率、结果、组织`},Fi:{name:`内倾情感`,description:`关注个人价值观与真实感受`},Fe:{name:`外倾情感`,description:`关注群体情绪与关系协调`},Ni:{name:`内倾直觉`,description:`关注深层模式和未来趋势`},Ne:{name:`外倾直觉`,description:`关注可能性扩散`},Si:{name:`内倾感觉`,description:`关注过去经验与稳定记忆`},Se:{name:`外倾感觉`,description:`关注现实世界的即时信息`}},se=({rank:e,code:t,name:n,description:r})=>(0,V.jsxs)(y,{gap:`md`,align:`flex-start`,children:[(0,V.jsxs)(b,{style:{flexShrink:0,width:24},children:[e,`.`]}),(0,V.jsx)(b,{style:{flexShrink:0,width:28,fontFamily:`var(--mantine-font-family-monospace)`},children:t}),(0,V.jsx)(b,{style:{flexShrink:0,width:72},children:n}),(0,V.jsx)(b,{c:`dimmed`,children:r})]}),$=[{position:0,options:[`I`,`E`],labels:[`内向`,`外向`]},{position:1,options:[`N`,`S`],labels:[`直觉`,`感觉`]},{position:2,options:[`T`,`F`],labels:[`思考`,`情感`]},{position:3,options:[`J`,`P`],labels:[`判断`,`感知`]}];(0,q.createRoot)(document.body).render((0,V.jsx)(u,{children:(0,V.jsx)(()=>{let[e,{toggle:t}]=m(!1),n=re(),r=(0,N.useMemo)(()=>Z(n),[n]),i=e=>{let t=n.split(``);for(;t.length<4;)t.push(``);let{options:r}=$[e];t[e]=t[e]===r[0]?r[1]:r[0],ie(t.join(``))};return F([[`I`,()=>i(0)],[`E`,()=>i(0)],[`N`,()=>i(1)],[`S`,()=>i(1)],[`T`,()=>i(2)],[`F`,()=>i(2)],[`J`,()=>i(3)],[`P`,()=>i(3)]]),(0,V.jsxs)(S,{size:`lg`,py:60,children:[(0,V.jsxs)(v,{gap:`md`,mb:`xl`,children:[$.map(({position:e,options:t,labels:r})=>{let a=t.indexOf(n[e]);return(0,V.jsxs)(w,{align:`center`,gap:4,children:[(0,V.jsx)(_,{size:80,variant:`default`,onClick:()=>i(e),children:(0,V.jsx)(`span`,{style:{fontSize:`48px`,fontWeight:`bold`},children:n[e]||`?`})}),(0,V.jsx)(b,{size:`sm`,c:`dimmed`,children:a===-1?t.join(` / `):r[a]})]},e)}),(0,V.jsx)(ne,{tooltip:`按下 I/E、N/S、T/F、J/P 可以切换对应维度`})]}),(0,V.jsx)(w,{py:`md`,children:r.map((e,t)=>{let n=oe[e];return(0,V.jsx)(se,{rank:t+1,code:e,name:n.name,description:n.description},t)})}),(0,V.jsx)(C,{my:`xl`}),(0,V.jsx)(x,{variant:`subtle`,onClick:t,children:e?`收起`:`查看更多`}),(0,V.jsx)(U,{expanded:e,children:(0,V.jsx)(E,{children:ae})})]})},{})}));