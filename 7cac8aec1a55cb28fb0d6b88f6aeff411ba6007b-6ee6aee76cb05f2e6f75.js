/*! For license information please see 7cac8aec1a55cb28fb0d6b88f6aeff411ba6007b-6ee6aee76cb05f2e6f75.js.LICENSE.txt */
"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[794],{6523:function(e,t,r){r.d(t,{R:function(){return i},Y:function(){return l}});var o=r(7462),n=r(7294),c=r(8190);var a=r(1237),f=r(5785);const s=e=>t=>(0,n.isValidElement)(t)&&e.has(t.type),i=(e,t)=>{const r=new Map((0,c.zG)(t,c.qh,(0,c.UI)((e=>{let[t,r]=e;return[r,t.replace(/^[A-Z]/,(e=>e.toLowerCase()))]}))));return(0,a.EQ)(e).with(a.P.array(),(e=>t=>(0,c.u4)(((t,r)=>(0,a.EQ)(r).with(a.P.when(s(e)),(r=>({...t,[e.get(r.type)]:r}))).otherwise((e=>{var r;return{...t,defaultChildren:[].concat((0,f.Z)(null!==(r=t.defaultChildren)&&void 0!==r?r:[]),[e])}}))),{},t))(r)).with(a.P.when(s(r)),(e=>({[r.get(e.type)]:e}))).otherwise((()=>({})))};var u=r(4540);r(7164),r(2442),r(4740),r(434),r(5839);const l=(e,t)=>{const r=Object.assign((r=>{let{children:c,...a}=r;const f=i(c,t);return function(e,t){var r=arguments;if(null==t||!u.h.call(t,"css"))return n.createElement.apply(void 0,r);var o=r.length,c=new Array(o);c[0]=u.E,c[1]=(0,u.c)(e,t);for(var a=2;a<o;a++)c[a]=r[a];return n.createElement.apply(null,c)}(e,(0,o.Z)({},a,{slots:f}))}),(a=t,(0,c.u4)(((e,t)=>{let[r,o]=t;return(e=>"string"==typeof e)(o)?{...e,[r]:e=>(0,n.createElement)(o,e)}:{...e,[r]:o}}),{},(0,c.qh)(a))));var a;return r}},5839:function(e,t,r){var o=r(9185),n={childContextTypes:!0,contextType:!0,contextTypes:!0,defaultProps:!0,displayName:!0,getDefaultProps:!0,getDerivedStateFromError:!0,getDerivedStateFromProps:!0,mixins:!0,propTypes:!0,type:!0},c={name:!0,length:!0,prototype:!0,caller:!0,callee:!0,arguments:!0,arity:!0},a={$$typeof:!0,compare:!0,defaultProps:!0,displayName:!0,propTypes:!0,type:!0},f={};function s(e){return o.isMemo(e)?a:f[e.$$typeof]||n}f[o.ForwardRef]={$$typeof:!0,render:!0,defaultProps:!0,displayName:!0,propTypes:!0},f[o.Memo]=a;var i=Object.defineProperty,u=Object.getOwnPropertyNames,l=Object.getOwnPropertySymbols,p=Object.getOwnPropertyDescriptor,y=Object.getPrototypeOf,m=Object.prototype;e.exports=function e(t,r,o){if("string"!=typeof r){if(m){var n=y(r);n&&n!==m&&e(t,n,o)}var a=u(r);l&&(a=a.concat(l(r)));for(var f=s(t),d=s(r),b=0;b<a.length;++b){var $=a[b];if(!(c[$]||o&&o[$]||d&&d[$]||f&&f[$])){var S=p(r,$);try{i(t,$,S)}catch(h){}}}}return t}},8702:function(e,t){var r="function"==typeof Symbol&&Symbol.for,o=r?Symbol.for("react.element"):60103,n=r?Symbol.for("react.portal"):60106,c=r?Symbol.for("react.fragment"):60107,a=r?Symbol.for("react.strict_mode"):60108,f=r?Symbol.for("react.profiler"):60114,s=r?Symbol.for("react.provider"):60109,i=r?Symbol.for("react.context"):60110,u=r?Symbol.for("react.async_mode"):60111,l=r?Symbol.for("react.concurrent_mode"):60111,p=r?Symbol.for("react.forward_ref"):60112,y=r?Symbol.for("react.suspense"):60113,m=r?Symbol.for("react.suspense_list"):60120,d=r?Symbol.for("react.memo"):60115,b=r?Symbol.for("react.lazy"):60116,$=r?Symbol.for("react.block"):60121,S=r?Symbol.for("react.fundamental"):60117,h=r?Symbol.for("react.responder"):60118,v=r?Symbol.for("react.scope"):60119;function w(e){if("object"==typeof e&&null!==e){var t=e.$$typeof;switch(t){case o:switch(e=e.type){case u:case l:case c:case f:case a:case y:return e;default:switch(e=e&&e.$$typeof){case i:case p:case b:case d:case s:return e;default:return t}}case n:return t}}}function g(e){return w(e)===l}t.AsyncMode=u,t.ConcurrentMode=l,t.ContextConsumer=i,t.ContextProvider=s,t.Element=o,t.ForwardRef=p,t.Fragment=c,t.Lazy=b,t.Memo=d,t.Portal=n,t.Profiler=f,t.StrictMode=a,t.Suspense=y,t.isAsyncMode=function(e){return g(e)||w(e)===u},t.isConcurrentMode=g,t.isContextConsumer=function(e){return w(e)===i},t.isContextProvider=function(e){return w(e)===s},t.isElement=function(e){return"object"==typeof e&&null!==e&&e.$$typeof===o},t.isForwardRef=function(e){return w(e)===p},t.isFragment=function(e){return w(e)===c},t.isLazy=function(e){return w(e)===b},t.isMemo=function(e){return w(e)===d},t.isPortal=function(e){return w(e)===n},t.isProfiler=function(e){return w(e)===f},t.isStrictMode=function(e){return w(e)===a},t.isSuspense=function(e){return w(e)===y},t.isValidElementType=function(e){return"string"==typeof e||"function"==typeof e||e===c||e===l||e===f||e===a||e===y||e===m||"object"==typeof e&&null!==e&&(e.$$typeof===b||e.$$typeof===d||e.$$typeof===s||e.$$typeof===i||e.$$typeof===p||e.$$typeof===S||e.$$typeof===h||e.$$typeof===v||e.$$typeof===$)},t.typeOf=w},9185:function(e,t,r){e.exports=r(8702)}}]);
//# sourceMappingURL=7cac8aec1a55cb28fb0d6b88f6aeff411ba6007b-6ee6aee76cb05f2e6f75.js.map