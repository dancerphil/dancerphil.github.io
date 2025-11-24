import{o as e}from"./chunk-a1Y4OS11.js";import{_ as t,h as n,n as r,r as i,t as a}from"./emotion-react-jsx-runtime.browser.esm-gYJ-kLJ7.js";import{t as o}from"./styles-BkwWHfWw.js";import{R as s,c,d as l,ht as u,i as d,pt as f,rt as p,t as m,v as h}from"./useSize-BHfrmQgs.js";var g=e=>{let{componentCls:t}=e;return{[t]:{"&-horizontal":{[`&${t}`]:{"&-sm":{marginBlock:e.marginXS},"&-md":{marginBlock:e.margin}}}}}},_=e=>{let{componentCls:t,sizePaddingEdgeHorizontal:n,colorSplit:r,lineWidth:i,textPaddingInline:a,orientationMargin:o,verticalMarginInline:s}=e,c=`${t}-rail`;return{[t]:{...h(e),borderBlockStart:`${p(i)} solid ${r}`,[c]:{borderBlockStart:`${p(i)} solid ${r}`},"&-vertical":{position:`relative`,top:`-0.06em`,display:`inline-block`,height:`0.9em`,marginInline:s,marginBlock:0,verticalAlign:`middle`,borderTop:0,borderInlineStart:`${p(i)} solid ${r}`},"&-horizontal":{display:`flex`,clear:`both`,width:`100%`,minWidth:`100%`,margin:`${p(e.marginLG)} 0`},[`&-horizontal${t}-with-text`]:{display:`flex`,alignItems:`center`,margin:`${p(e.dividerHorizontalWithTextGutterMargin)} 0`,color:e.colorTextHeading,fontWeight:500,fontSize:e.fontSizeLG,whiteSpace:`nowrap`,textAlign:`center`,borderBlockStart:`0 ${r}`,[`${c}-start, ${c}-end`]:{width:`50%`,borderBlockStartColor:`inherit`,borderBlockEnd:0,content:`''`}},[`&-horizontal${t}-with-text-start`]:{[`${c}-start`]:{width:`calc(${o} * 100%)`},[`${c}-end`]:{width:`calc(100% - ${o} * 100%)`}},[`&-horizontal${t}-with-text-end`]:{[`${c}-start`]:{width:`calc(100% - ${o} * 100%)`},[`${c}-end`]:{width:`calc(${o} * 100%)`}},[`${t}-inner-text`]:{display:`inline-block`,paddingBlock:0,paddingInline:a},"&-dashed":{background:`none`,borderColor:r,borderStyle:`dashed`,borderWidth:`${p(i)} 0 0`,[c]:{borderBlockStart:`${p(i)} dashed ${r}`}},[`&-horizontal${t}-with-text${t}-dashed`]:{[`${c}-start, ${c}-end`]:{borderStyle:`dashed none none`}},[`&-vertical${t}-dashed`]:{borderInlineStartWidth:i,borderInlineEnd:0,borderBlockStart:0,borderBlockEnd:0},"&-dotted":{background:`none`,borderColor:r,borderStyle:`dotted`,borderWidth:`${p(i)} 0 0`,[c]:{borderBlockStart:`${p(i)} dotted ${r}`}},[`&-horizontal${t}-with-text${t}-dotted`]:{"&::before, &::after":{borderStyle:`dotted none none`}},[`&-vertical${t}-dotted`]:{borderInlineStartWidth:i,borderInlineEnd:0,borderBlockStart:0,borderBlockEnd:0},[`&-plain${t}-with-text`]:{color:e.colorText,fontWeight:`normal`,fontSize:e.fontSize},[`&-horizontal${t}-with-text-start${t}-no-default-orientation-margin-start`]:{[`${c}-start`]:{width:0},[`${c}-end`]:{width:`100%`},[`${t}-inner-text`]:{paddingInlineStart:n}},[`&-horizontal${t}-with-text-end${t}-no-default-orientation-margin-end`]:{[`${c}-start`]:{width:`100%`},[`${c}-end`]:{width:0},[`${t}-inner-text`]:{paddingInlineEnd:n}}}}},v=l(`Divider`,e=>{let t=s(e,{dividerHorizontalWithTextGutterMargin:e.margin,sizePaddingEdgeHorizontal:0});return[_(t),g(t)]},e=>({textPaddingInline:`1em`,orientationMargin:.05,verticalMarginInline:e.marginXS}),{unitless:{orientationMargin:!0}}),y=e(t()),b=[`left`,`right`,`center`,`start`,`end`],x={small:`sm`,middle:`md`},S=e=>{let{getPrefixCls:t,direction:n,className:r,style:i,classNames:a,styles:o}=f(`divider`),{prefixCls:s,type:l,orientation:p,vertical:h,titlePlacement:g,orientationMargin:_,className:S,rootClassName:C,children:w,dashed:T,variant:E=`solid`,plain:D,style:O,size:k,classNames:A,styles:j,...M}=e,N=t(`divider`,s),P=`${N}-rail`,[F,I]=v(N),L=m(k),R=x[L],z=!!w,B=b.includes(p||``),V=y.useMemo(()=>{let e=g??(B?p:`center`);return e===`left`?n===`rtl`?`end`:`start`:e===`right`?n===`rtl`?`start`:`end`:e},[n,p,g,B]),H=V===`start`&&_!=null,U=V===`end`&&_!=null,[W,G]=d(p,h,l),K={...e,orientation:W,titlePlacement:V,size:L},[q,J]=c([a,A],[o,j],{props:K}),Y=u(N,r,F,I,`${N}-${W}`,{[`${N}-with-text`]:z,[`${N}-with-text-${V}`]:z,[`${N}-dashed`]:!!T,[`${N}-${E}`]:E!==`solid`,[`${N}-plain`]:!!D,[`${N}-rtl`]:n===`rtl`,[`${N}-no-default-orientation-margin-start`]:H,[`${N}-no-default-orientation-margin-end`]:U,[`${N}-${R}`]:!!R,[P]:!w,[q.rail]:q.rail&&!w},S,C,q.root),X=y.useMemo(()=>typeof _==`number`?_:/^\d+$/.test(_)?Number(_):_,[_]),Z={marginInlineStart:H?X:void 0,marginInlineEnd:U?X:void 0};return y.createElement(`div`,{className:Y,style:{...i,...J.root,...w?{}:J.rail,...O},...M,role:`separator`},w&&!G&&y.createElement(y.Fragment,null,y.createElement(`div`,{className:u(P,`${P}-start`,q.rail),style:J.rail}),y.createElement(`span`,{className:u(`${N}-inner-text`,q.content),style:{...Z,...J.content}},w),y.createElement(`div`,{className:u(P,`${P}-end`,q.rail),style:J.rail})))};(function(e){typeof define==`function`&&define.amd?define(e):e()})(function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,`value`in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function t(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}function n(e,t){if(typeof t!=`function`&&t!==null)throw TypeError(`Super expression must either be null or a function`);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&i(e,t)}function r(e){return r=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)},r(e)}function i(e,t){return i=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e},i(e,t)}function a(){if(typeof Reflect>`u`||!Reflect.construct||Reflect.construct.sham)return!1;if(typeof Proxy==`function`)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],function(){})),!0}catch{return!1}}function o(e,t,n){return o=a()?Reflect.construct:function(e,t,n){var r=[null];return r.push.apply(r,t),e=new(Function.bind.apply(e,r)),n&&i(e,n.prototype),e},o.apply(null,arguments)}function s(e){var t=typeof Map==`function`?new Map:void 0;return s=function(e){function n(){return o(e,arguments,r(this).constructor)}if(e===null||Function.toString.call(e).indexOf(`[native code]`)===-1)return e;if(typeof e!=`function`)throw TypeError(`Super expression must either be null or a function`);if(t!==void 0){if(t.has(e))return t.get(e);t.set(e,n)}return n.prototype=Object.create(e.prototype,{constructor:{value:n,enumerable:!1,writable:!0,configurable:!0}}),i(n,e)},s(e)}var c=document.createElement(`template`);c.innerHTML=`
<style>
  :host {
    position: relative;
    display: inline-block;
    width: 250px;
    height: 250px;
  }
  :host > canvas {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    border-radius: inherit;
   }
</style>
`;var l=/\(\s*out\s+vec4\s+(\S+)\s*,\s*in\s+vec2\s+(\S+)\s*\)/,u=function(e){function i(){if(!(this instanceof i))throw TypeError(`Cannot call a class as a function`);var e=r(i).call(this);if(!e||typeof e!=`object`&&typeof e!=`function`){if(this===void 0)throw ReferenceError(`this hasn't been initialised - super() hasn't been called`);e=this}return e.shadow=e.attachShadow({mode:`open`}),e.shadow.appendChild(c.content.cloneNode(!0)),e}return n(i,e),t(i,[{key:`connectedCallback`,value:function(){var e=this;this.mounted=!0,setTimeout(function(){if(!e.textContent.trim())return!1;try{e.init()}catch(t){e.textContent=``,console.error(t&&t.message||`Error in shader-doodle.`)}})}},{key:`disconnectedCallback`,value:function(){this.mounted=!1,this.canvas.removeEventListener(`mousedown`,this.mouseDown),this.canvas.removeEventListener(`mousemove`,this.mouseMove),this.canvas.removeEventListener(`mouseup`,this.mouseUp),clearAnimationFrame(this.animationFrame)}},{key:`init`,value:function(){var e=this;this.useST=this.hasAttribute(`shadertoy`);var t=this.textContent;this.uniforms={resolution:{name:this.useST?`iResolution`:`u_resolution`,type:`vec2`,value:[0,0]},time:{name:this.useST?`iTime`:`u_time`,type:`float`,value:0},delta:{name:this.useST?`iTimeDelta`:`u_delta`,type:`float`,value:0},date:{name:this.useST?`iDate`:`u_date`,type:`vec4`,value:[0,0,0,0]},frame:{name:this.useST?`iFrame`:`u_frame`,type:`int`,value:0},mouse:{name:this.useST?`iMouse`:`u_mouse`,type:this.useST?`vec4`:`vec2`,value:this.useST?[0,0,0,0]:[0,0]}},this.canvas=document.createElement(`canvas`),this.shadow.appendChild(this.canvas);var n=this.gl=this.canvas.getContext(`webgl`);if(this.updateRect(),this.useST){var r=t.match(l);t=t.replace(`mainImage`,`main`),t=t.replace(l,`()`),t=(r?`#define ${r[1]} gl_FragColor
#define ${r[2]} gl_FragCoord.xy
`:``)+t}t=`precision highp float;
`+(Object.values(this.uniforms).reduce(function(e,t){return e+`uniform ${t.type} ${t.name};
`},``)+t),n.clearColor(0,0,0,0),this.vertexShader=this.makeShader(n.VERTEX_SHADER,`
attribute vec2 position;

void main() {
  gl_Position = vec4(position, 0.0, 1.0);
}`),this.fragmentShader=this.makeShader(n.FRAGMENT_SHADER,t),this.program=this.makeProgram(this.vertexShader,this.fragmentShader),this.vertices=new Float32Array([-1,1,1,1,1,-1,-1,1,1,-1,-1,-1]),this.buffer=n.createBuffer(),n.bindBuffer(n.ARRAY_BUFFER,this.buffer),n.bufferData(n.ARRAY_BUFFER,this.vertices,n.STATIC_DRAW),n.useProgram(this.program),this.program.position=n.getAttribLocation(this.program,`position`),n.enableVertexAttribArray(this.program.position),n.vertexAttribPointer(this.program.position,2,n.FLOAT,!1,0,0),Object.values(this.uniforms).forEach(function(t){t.location=n.getUniformLocation(e.program,t.name)}),this._bind(`mouseDown`,`mouseMove`,`mouseUp`,`render`),this.canvas.addEventListener(`mousedown`,this.mouseDown),this.canvas.addEventListener(`mousemove`,this.mouseMove),this.canvas.addEventListener(`mouseup`,this.mouseUp),this.render()}},{key:`render`,value:function(e){if(this&&this.mounted&&this.gl){var t=this.gl;this.updateTimeUniforms(e),this.updateRect(),t.clear(t.COLOR_BUFFER_BIT),Object.values(this.uniforms).forEach(function(e){var n=e.type,r=e.location;e=e.value,n=n.match(/vec/)?`${n[n.length-1]}fv`:`1${n[0]}`,t[`uniform${n}`](r,e)}),t.drawArrays(t.TRIANGLES,0,this.vertices.length/2),this.ticking=!1,this.animationFrame=requestAnimationFrame(this.render)}}},{key:`mouseDown`,value:function(e){if(this.useST){this.mousedown=!0;var t=this.rect,n=t.top,r=t.height;this.uniforms.mouse.value[2]=e.clientX-Math.floor(t.left),this.uniforms.mouse.value[3]=Math.floor(r)-(e.clientY-Math.floor(n))}}},{key:`mouseMove`,value:function(e){if(!this.ticking&&(!this.useST||this.mousedown)){var t=this.rect,n=t.top,r=t.height;this.uniforms.mouse.value[0]=e.clientX-Math.floor(t.left),this.uniforms.mouse.value[1]=Math.floor(r)-(e.clientY-Math.floor(n)),this.ticking=!0}}},{key:`mouseUp`,value:function(e){this.useST&&(this.mousedown=!1,this.uniforms.mouse.value[2]=0,this.uniforms.mouse.value[3]=0)}},{key:`updateTimeUniforms`,value:function(e){var t=this.lastTime?(e-this.lastTime)/1e3:0;this.lastTime=e,this.uniforms.time.value+=t,this.uniforms.delta.value=t,this.uniforms.frame.value++,e=new Date,this.uniforms.date.value[0]=e.getFullYear(),this.uniforms.date.value[1]=e.getMonth()+1,this.uniforms.date.value[2]=e.getDate(),this.uniforms.date.value[3]=3600*e.getHours()+60*e.getMinutes()+e.getSeconds()+.001*e.getMilliseconds()}},{key:`updateRect`,value:function(){var e=this.rect=this.canvas.getBoundingClientRect(),t=e.width;e=e.height;var n=this.canvas.width!==t,r=this.canvas.height!==e;n&&(this.canvas.width=this.uniforms.resolution.value[0]=t),r&&(this.canvas.height=this.uniforms.resolution.value[1]=e),(n||r)&&this.gl.viewport(0,0,this.canvas.width,this.canvas.height)}},{key:`makeShader`,value:function(e,t){var n=this.gl;if(e=n.createShader(e),n.shaderSource(e,t),n.compileShader(e),!n.getShaderParameter(e,n.COMPILE_STATUS)){var r=n.getShaderInfoLog(e);n.deleteShader(e),console.warn(r,`
in shader:
`,t)}return e}},{key:`makeProgram`,value:function(){for(var e=this.gl,t=e.createProgram(),n=arguments.length,r=Array(n),i=0;i<n;i++)r[i]=arguments[i];return r.forEach(function(n){e.attachShader(t,n)}),e.linkProgram(t),e.getProgramParameter(t,e.LINK_STATUS)||(n=e.getProgramInfoLog(this.program),console.warn(n)),t}},{key:`_bind`,value:function(){for(var e=this,t=arguments.length,n=Array(t),r=0;r<t;r++)n[r]=arguments[r];n.forEach(function(t){return e[t]=e[t].bind(e)})}}]),i}(s(HTMLElement));customElements.define(`shader-doodle`,u)});var C=o({name:`1fiuwws`,styles:`position:relative;color:#fff;text-align:center;background-color:#159957;background-image:linear-gradient(120deg, #155799, #159957);padding:80px 100px`}),w=o({name:`1yoef68`,styles:`position:absolute;top:0;right:0;bottom:0;left:0;#shader{width:100%;height:100%;opacity:0.2;}`}),T=`
<shader-doodle id="shader">
    <script type="x-shader/x-fragment">

        float r (in vec2 st) {
        return fract(sin(dot(st.xy,vec2(13.,78.)))*43756.);
    }

        float noise (in vec2 st) {
        vec2 i=floor(st);
        vec2 f=fract(st);
        float a=r(i);
        float b=r(i+vec2(1.,0.));
        float c=r(i+vec2(0.,1.));
        float d=r(i+vec2(1.,1.));
        vec2 u=f*f*(3.-2.*f);
        return mix(a,b,u.x)+(c-a)* u.y*(1.-u.x)+(d-b)*u.x*u.y;
    }

        float g (in vec2 st) {
        float v=0.;
        float a=.5;
        for (int i=0; i<6; i++) {
        v += a*noise(st);
        st *= 2.;
        a *= .5;
    }
        return v;
    }

        float f (in vec2 st) {
        return g(st+g(st+g(st+u_time*.1)));
    }

        float pattern(in vec2 p,out vec2 q,out vec2 r) {
        p += +u_time * .1;
        q.x=f(p+vec2(0.,0.));
        q.y=f(p+vec2(5.,1.));
        r.x=f(p+4.*q+vec2(1.,9.));
        r.y=f(p+4.*q+vec2(8.,2.));
        return f(p+4.*r);
    }

        void main() {
        vec2 u=u_resolution;
        vec2 st=gl_FragCoord.xy/u.xy;
        st.x *= u.x/u.y;
        vec2 o,n;
        float f=pattern(st,o,n);
        vec3 c=vec3(1.);
        c=mix(c,vec3(1.),f);
        c=mix(c,vec3(0.1,0.4,0.7),0.8*dot(n,n));
        c=mix(c,vec3(0.1,0.7,0.4),0.5*o.y*o.y);
        c*=f*2.5;
        c=c*c;
        gl_FragColor=vec4(c,1.);
    }
    <\/script>
</shader-doodle>
`;const E=({children:e})=>{let t=(0,y.useRef)(null);return(0,y.useLayoutEffect)(()=>{t.current&&(t.current.innerHTML=T)},[]),i(`div`,{className:C,children:[r(`div`,{className:w,ref:t}),e]})};var D=o({name:`1fx5xze`,styles:`font-size:20px;opacity:0.7;color:unset;text-decoration:unset`}),O=o({name:`h3anzh`,styles:`position:relative;font-size:50px;font-weight:bold`}),k=o({name:`1cu3yxh`,styles:`position:relative;margin-top:20px;margin-bottom:40px`});const A=()=>i(a,{children:[r(`div`,{className:O,children:`张振衣`}),r(`div`,{className:k,children:r(`a`,{className:D,href:`https://zhihu.com/people/dancerphil`,children:`https://zhihu.com/people/dancerphil`})})]});var j=o({name:`1xcyv4o`,styles:`padding:8px 4px;display:flex;align-items:center;border-radius:4px;:hover{background-color:rgba(0, 0, 0, 0.03);}`}),M=o({name:`18ji2p4`,styles:`width:300px`}),N=o({name:`122gdby`,styles:`color:rgba(0, 0, 0, 0.45)`});const P=({href:e,title:t,description:n})=>i(`a`,{className:j,target:`_blank`,href:e,rel:`noreferrer`,children:[r(`span`,{className:M,children:t}),n&&r(`span`,{className:N,children:n})]});var F=o({name:`13qx8f4`,styles:`max-width:1000px;margin:0 auto;padding:60px 0;a{color:#1e6bb8;text-decoration:none;:hover{text-decoration:underline;}}`}),I=o({name:`1azakc`,styles:`text-align:center`}),L=o({name:`rj9gtv`,styles:`margin-bottom:16px;font-size:20px;font-weight:500;color:#159957`}),R=({children:e})=>r(`div`,{className:L,children:e});(0,n().createRoot)(document.body).render(r(()=>i(a,{children:[r(E,{children:r(A,{})}),i(`div`,{className:F,children:[r(R,{children:`关于我`}),r(P,{href:`https://github.com/dancerphil`,title:`我的 github 主页`}),r(S,{}),r(R,{children:`推荐`}),r(P,{href:`https://tradingagents.zeabur.app/`,title:`股票分析`,description:`多智能体股票分析工作流`}),r(P,{href:`./tlp`,title:`《逻辑哲学论》`,description:`维特根斯坦的哲学著作，包含了 AI 辅读`}),r(P,{href:`https://github.com/regionjs/region`,title:`region-react`,description:`react 状态管理`}),r(P,{href:`https://github.com/dancerphil/dancerphil.github.io`,title:`dancerphil.github.io`,description:`当前站点的源码`}),r(S,{}),r(R,{children:`随手写的玩具`}),r(P,{href:`./age`,title:`age`,description:`可以计算自己的年龄的工具，精确到 0.0000001`}),r(P,{href:`./annotate`,title:`annotate`,description:`数据标记产品原型`}),r(P,{href:`./coder`,title:`coder`,description:`基于 localStorage 的在线的编辑器（代码很老）`}),r(P,{href:`./github-friends`,title:`github 关系网`,description:`用 echarts 关系图分析 github 关系，可以找朋友`}),r(P,{href:`./mbti`,title:`mbti`,description:`一个mbti八维分析工具`}),r(P,{href:`./mine`,title:`扫雷`,description:`适配手机端的扫雷游戏`}),r(P,{href:`./skyline`,title:`3d commit 记录`,description:`用 three.js 画的提交历史天际线玩具，但现在运行不了`}),r(S,{}),r(R,{children:`随手写的动画`}),r(P,{href:`./10/once.html`,title:`10 随机迷宫`}),r(P,{href:`./b`,title:`base64 背景图`}),r(P,{href:`https://codepen.io/dancerphil/pen/POdeWy`,title:`纯 css 动画：bees`}),r(P,{href:`./d`,title:`任务管理`}),r(P,{href:`https://codepen.io/dancerphil/pen/dRmLza`,title:`自动旋转的画图工具`}),r(P,{href:`./m`,title:`material-design v0 颜色分析`}),r(P,{href:`./w`,title:`纯 css 动画`}),r(S,{}),i(`div`,{className:I,children:[`With Love. `,r(`a`,{target:`_blank`,href:`https://github.com/dancerphil`,rel:`noreferrer`,children:`Dancerphil`})]})]})]}),{}));