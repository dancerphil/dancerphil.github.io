import{a as e}from"./chunk-DEbqiTd3.js";import{_ as t}from"./emotion-react-jsx-runtime.browser.esm-CpoP8j-F.js";import{S as n}from"./useSize-Czn6APZu.js";var r=e(t()),i=r.createContext(void 0),a=100;const o=a*10;o+a;const s={Modal:a,Drawer:a,Popover:a,Popconfirm:a,Tooltip:a,Tour:a,FloatButton:a},c={SelectLike:50,Dropdown:50,DatePicker:50,Menu:50,ImagePreview:1};var l=e=>e in s;const u=(e,t)=>{let[,a]=n(),o=r.useContext(i),u=l(e),d;if(t!==void 0)d=[t,t];else{let n=o??0;u?n+=(o?0:a.zIndexPopupBase)+s[e]:n+=c[e],d=[o===void 0?t:n,n]}return d};var d=e=>({animationDuration:e,animationFillMode:`both`}),f=e=>({animationDuration:e,animationFillMode:`both`});const p=(e,t,n,r,i=!1)=>{let a=i?`&`:``;return{[`
      ${a}${e}-enter,
      ${a}${e}-appear
    `]:{...d(r),animationPlayState:`paused`},[`${a}${e}-leave`]:{...f(r),animationPlayState:`paused`},[`
      ${a}${e}-enter${e}-enter-active,
      ${a}${e}-appear${e}-appear-active
    `]:{animationName:t,animationPlayState:`running`},[`${a}${e}-leave${e}-leave-active`]:{animationName:n,animationPlayState:`running`,pointerEvents:`none`}}};export{i,o as n,u as r,p as t};