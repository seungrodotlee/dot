"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[331],{4013:function(e,t,n){n.r(t),n.d(t,{default:function(){return k}});var r=n(1151),l=n(7294),a=n(4620),o=n(6298);var i=e=>{let{from:t,to:n,options:r}=e;const{geul:l,isRunning:i,isEnded:c,next:s,reset:p}=(0,a.DV)(n,{...r,initial:t});return(0,o.tZ)("div",{className:"example"},(0,o.tZ)("p",null,"value: ",(0,o.tZ)("code",null,"[",n.map((e=>'"'+e+'"')).join(", "),"]")),(0,o.tZ)("p",null,"options:"),(0,o.tZ)("p",null," ","- speed: ",(0,o.tZ)("code",null,""+r.speed)),(0,o.tZ)("p",null," ","- initial: ",(0,o.tZ)("code",null,'"',""+t,'"')),(0,o.tZ)("p",null," ","- decomposeOnBackspace:",(0,o.tZ)("code",null,""+r.decomposeOnBackspace)),(0,o.tZ)("p",{className:"result"},"result: ",l),(0,o.tZ)("button",{onClick:async()=>{c?p():s()},disabled:i},c?"reset":"run"))};function c(e){const t=Object.assign({h1:"h1",p:"p",code:"code",pre:"pre",h2:"h2",h3:"h3"},(0,r.ah)(),e.components);return l.createElement(l.Fragment,null,l.createElement(t.h1,null,"use-geul-pipe"),"\n","\n",l.createElement(t.p,null,l.createElement(t.code,null,"use-geul-pipe")," is hook for run typing effect with multiple values in order."),"\n",l.createElement(t.pre,null,l.createElement(t.code,{className:"language-ts"},"function useGeulPipe(\n  values: string[],\n  options: UseGeulPipeOptions,\n): UseGeulPipeReturn;\n")),"\n",l.createElement(t.h2,null,l.createElement(t.code,null,"values")),"\n",l.createElement(t.p,null,"Values that will be sequential results of the typing effect."),"\n",l.createElement(t.h2,null,l.createElement(t.code,null,"UseGeulPipeOptions")),"\n",l.createElement("table",null,l.createElement("thead",null,l.createElement("tr",null,l.createElement("th",null,"option"),l.createElement("th",null,"type"),l.createElement("th",null,"description"))),l.createElement("tbody",null,l.createElement("tr",null,l.createElement("td",null,l.createElement(t.code,null,"speed")),l.createElement("td",null,l.createElement(t.code,null,"number")),l.createElement("td",null,"Speed of typing effect (ms)")),l.createElement("tr",null,l.createElement("td",null,l.createElement(t.code,null,"decomposeOnBackspace")),l.createElement("td",null,l.createElement(t.code,null,"boolean | undefined")),l.createElement("td",null,l.createElement(t.p,null,"Whether to have the effect of separating consonants when backspace"))))),"\n",l.createElement(t.h2,null,l.createElement(t.code,null,"UseGeulPipeReturn")),"\n",l.createElement("table",null,l.createElement("thead",null,l.createElement("tr",null,l.createElement("th",null,"member"),l.createElement("th",null,"type"),l.createElement("th",null,"description"))),l.createElement("tbody",null,l.createElement("tr",null,l.createElement("td",null,l.createElement(t.code,null,"geul")),l.createElement("td",null,l.createElement(t.code,null,"string")),l.createElement("td",null,"Typed value")),l.createElement("tr",null,l.createElement("td",null,l.createElement(t.code,null,"isRunning")),l.createElement("td",null,l.createElement(t.code,null,"boolean")),l.createElement("td",null,"Running status of the ",l.createElement(t.code,null,"geul")," instance")),l.createElement("tr",null,l.createElement("td",null,l.createElement(t.code,null,"next")),l.createElement("td",null,l.createElement(t.code,null,"() => void")),l.createElement("td",null,"funtion that start next typing effect")),l.createElement("tr",null,l.createElement("td",null,l.createElement(t.code,null,"reset")),l.createElement("td",null,l.createElement(t.code,null,"() => void")),l.createElement("td",null,"funtion that reset typing effect")))),"\n",l.createElement(t.h2,null,"Examples"),"\n",l.createElement(t.h3,null,l.createElement(t.code,null,'""')," -> ",l.createElement(t.code,null,'"안녕"')," -> ",l.createElement(t.code,null,'"안녕하세요"')),"\n",l.createElement(i,{from:"",to:["안녕","안녕하세요"],options:{speed:50}}),"\n",l.createElement(t.h3,null,l.createElement(t.code,null,'""')," -> ",l.createElement(t.code,null,'"안녕하세요"')," -> ",l.createElement(t.code,null,'"안녕"')," (without ",l.createElement(t.code,null,"decomposeOnBackspace"),")"),"\n",l.createElement(i,{from:"",to:["안녕하세요","안녕"],options:{speed:50}}),"\n",l.createElement(t.h3,null,l.createElement(t.code,null,'""')," -> ",l.createElement(t.code,null,'"안녕하세요"')," -> ",l.createElement(t.code,null,'"안녕"')," (with ",l.createElement(t.code,null,"decomposeOnBackspace"),")"),"\n",l.createElement(i,{from:"",to:["안녕하세요","안녕"],options:{speed:50,decomposeOnBackspace:!0}}))}var s=function(e){void 0===e&&(e={});const{wrapper:t}=Object.assign({},(0,r.ah)(),e.components);return t?l.createElement(t,e,l.createElement(c,e)):c(e)},p=n(7462),m=n(4593),u=n(9573),d=n(6647),w=n(7021),h=n(2352),b=n(8917),y=n(380),g=n(2952);var f={name:"1g917ag",styles:'*,::before,::after{box-sizing:border-box;border-width:0;border-style:solid;border-color:#e5e7eb;--tw-border-spacing-x:0;--tw-border-spacing-y:0;--tw-translate-x:0;--tw-translate-y:0;--tw-rotate:0;--tw-skew-x:0;--tw-skew-y:0;--tw-scale-x:1;--tw-scale-y:1;--tw-pan-x:var(--tw-empty,/*!*/ /*!*/);--tw-pan-y:var(--tw-empty,/*!*/ /*!*/);--tw-pinch-zoom:var(--tw-empty,/*!*/ /*!*/);--tw-scroll-snap-strictness:proximity;--tw-gradient-from-position:var(--tw-empty,/*!*/ /*!*/);--tw-gradient-via-position:var(--tw-empty,/*!*/ /*!*/);--tw-gradient-to-position:var(--tw-empty,/*!*/ /*!*/);--tw-ordinal:var(--tw-empty,/*!*/ /*!*/);--tw-slashed-zero:var(--tw-empty,/*!*/ /*!*/);--tw-numeric-figure:var(--tw-empty,/*!*/ /*!*/);--tw-numeric-spacing:var(--tw-empty,/*!*/ /*!*/);--tw-numeric-fraction:var(--tw-empty,/*!*/ /*!*/);--tw-ring-offset-shadow:0 0 #0000;--tw-ring-shadow:0 0 #0000;--tw-shadow:0 0 #0000;--tw-shadow-colored:0 0 #0000;--tw-ring-inset:var(--tw-empty,/*!*/ /*!*/);--tw-ring-offset-width:0px;--tw-ring-offset-color:#fff;--tw-ring-color:rgb(59 130 246 / 0.5);--tw-blur:var(--tw-empty,/*!*/ /*!*/);--tw-brightness:var(--tw-empty,/*!*/ /*!*/);--tw-contrast:var(--tw-empty,/*!*/ /*!*/);--tw-grayscale:var(--tw-empty,/*!*/ /*!*/);--tw-hue-rotate:var(--tw-empty,/*!*/ /*!*/);--tw-invert:var(--tw-empty,/*!*/ /*!*/);--tw-saturate:var(--tw-empty,/*!*/ /*!*/);--tw-sepia:var(--tw-empty,/*!*/ /*!*/);--tw-drop-shadow:var(--tw-empty,/*!*/ /*!*/);--tw-backdrop-blur:var(--tw-empty,/*!*/ /*!*/);--tw-backdrop-brightness:var(--tw-empty,/*!*/ /*!*/);--tw-backdrop-contrast:var(--tw-empty,/*!*/ /*!*/);--tw-backdrop-grayscale:var(--tw-empty,/*!*/ /*!*/);--tw-backdrop-hue-rotate:var(--tw-empty,/*!*/ /*!*/);--tw-backdrop-invert:var(--tw-empty,/*!*/ /*!*/);--tw-backdrop-opacity:var(--tw-empty,/*!*/ /*!*/);--tw-backdrop-saturate:var(--tw-empty,/*!*/ /*!*/);--tw-backdrop-sepia:var(--tw-empty,/*!*/ /*!*/);}::before,::after{--tw-content:\'\';}html,:host{line-height:1.5;-webkit-text-size-adjust:100%;-moz-tab-size:4;tab-size:4;font-family:ui-sans-serif,system-ui,sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji";font-feature-settings:normal;font-variation-settings:normal;-webkit-tap-highlight-color:transparent;}body{margin:0;line-height:inherit;}hr{height:0;color:inherit;border-top-width:1px;}abbr:where([title]){text-decoration:underline dotted;}h1,h2,h3,h4,h5,h6{font-size:inherit;font-weight:inherit;}a{color:inherit;text-decoration:inherit;}b,strong{font-weight:bolder;}code,kbd,samp,pre{font-family:ui-monospace,SFMono-Regular,Menlo,Monaco,Consolas,"Liberation Mono","Courier New",monospace;font-feature-settings:normal;font-variation-settings:normal;font-size:1em;}small{font-size:80%;}sub,sup{font-size:75%;line-height:0;position:relative;vertical-align:baseline;}sub{bottom:-0.25em;}sup{top:-0.5em;}table{text-indent:0;border-color:inherit;border-collapse:collapse;}button,input,optgroup,select,textarea{font-family:inherit;font-feature-settings:inherit;font-variation-settings:inherit;font-size:100%;font-weight:inherit;line-height:inherit;color:inherit;margin:0;padding:0;}button,select{text-transform:none;}button,[type=\'button\'],[type=\'reset\'],[type=\'submit\']{-webkit-appearance:button;background-color:transparent;background-image:none;}:-moz-focusring{outline:auto;}:-moz-ui-invalid{box-shadow:none;}progress{vertical-align:baseline;}::-webkit-inner-spin-button,::-webkit-outer-spin-button{height:auto;}[type=\'search\']{-webkit-appearance:textfield;outline-offset:-2px;}::-webkit-search-decoration{-webkit-appearance:none;}::-webkit-file-upload-button{-webkit-appearance:button;font:inherit;}summary{display:list-item;}blockquote,dl,dd,h1,h2,h3,h4,h5,h6,hr,figure,p,pre{margin:0;}fieldset{margin:0;padding:0;}legend{padding:0;}ol,ul,menu{list-style:none;margin:0;padding:0;}dialog{padding:0;}textarea{resize:vertical;}input::placeholder,textarea::placeholder{opacity:1;color:#9ca3af;}button,[role="button"]{cursor:pointer;}:disabled{cursor:default;}img,svg,video,canvas,audio,iframe,embed,object{display:block;vertical-align:middle;}img,video{max-width:100%;height:auto;}[hidden]{display:none;}::backdrop{--tw-border-spacing-x:0;--tw-border-spacing-y:0;--tw-translate-x:0;--tw-translate-y:0;--tw-rotate:0;--tw-skew-x:0;--tw-skew-y:0;--tw-scale-x:1;--tw-scale-y:1;--tw-pan-x:var(--tw-empty,/*!*/ /*!*/);--tw-pan-y:var(--tw-empty,/*!*/ /*!*/);--tw-pinch-zoom:var(--tw-empty,/*!*/ /*!*/);--tw-scroll-snap-strictness:proximity;--tw-gradient-from-position:var(--tw-empty,/*!*/ /*!*/);--tw-gradient-via-position:var(--tw-empty,/*!*/ /*!*/);--tw-gradient-to-position:var(--tw-empty,/*!*/ /*!*/);--tw-ordinal:var(--tw-empty,/*!*/ /*!*/);--tw-slashed-zero:var(--tw-empty,/*!*/ /*!*/);--tw-numeric-figure:var(--tw-empty,/*!*/ /*!*/);--tw-numeric-spacing:var(--tw-empty,/*!*/ /*!*/);--tw-numeric-fraction:var(--tw-empty,/*!*/ /*!*/);--tw-ring-offset-shadow:0 0 #0000;--tw-ring-shadow:0 0 #0000;--tw-shadow:0 0 #0000;--tw-shadow-colored:0 0 #0000;--tw-ring-inset:var(--tw-empty,/*!*/ /*!*/);--tw-ring-offset-width:0px;--tw-ring-offset-color:#fff;--tw-ring-color:rgb(59 130 246 / 0.5);--tw-blur:var(--tw-empty,/*!*/ /*!*/);--tw-brightness:var(--tw-empty,/*!*/ /*!*/);--tw-contrast:var(--tw-empty,/*!*/ /*!*/);--tw-grayscale:var(--tw-empty,/*!*/ /*!*/);--tw-hue-rotate:var(--tw-empty,/*!*/ /*!*/);--tw-invert:var(--tw-empty,/*!*/ /*!*/);--tw-saturate:var(--tw-empty,/*!*/ /*!*/);--tw-sepia:var(--tw-empty,/*!*/ /*!*/);--tw-drop-shadow:var(--tw-empty,/*!*/ /*!*/);--tw-backdrop-blur:var(--tw-empty,/*!*/ /*!*/);--tw-backdrop-brightness:var(--tw-empty,/*!*/ /*!*/);--tw-backdrop-contrast:var(--tw-empty,/*!*/ /*!*/);--tw-backdrop-grayscale:var(--tw-empty,/*!*/ /*!*/);--tw-backdrop-hue-rotate:var(--tw-empty,/*!*/ /*!*/);--tw-backdrop-invert:var(--tw-empty,/*!*/ /*!*/);--tw-backdrop-opacity:var(--tw-empty,/*!*/ /*!*/);--tw-backdrop-saturate:var(--tw-empty,/*!*/ /*!*/);--tw-backdrop-sepia:var(--tw-empty,/*!*/ /*!*/);}'};const v=()=>(0,o.tZ)(o.xB,{styles:f}),E=e=>{let{data:t,children:n,...a}=e;const{0:i,1:c}=(0,l.useState)(!1),s=e=>()=>{c(e)};return(0,o.tZ)(y.Z.Root,(0,p.Z)({sidebarVisible:i},(0,u.r)(a)),(0,o.tZ)(m.q,null,(0,o.tZ)("title",null,t.mdx.frontmatter.title)),(0,o.tZ)(v,null),(0,o.tZ)(d.Z,null,(0,o.tZ)(g.a,{value:{withoutSidebar:!1}},(0,o.tZ)(b.Z,{onClose:s(!1)}),(0,o.tZ)(y.Z.Main,null,(0,o.tZ)(h.Z,{onMenuClick:s(!0)}),(0,o.tZ)(y.Z.Content,null,(0,o.tZ)(r.Zo,{components:{pre:w.Z}},(0,o.tZ)("div",{className:"doc"},n)))))))};function k(e){return l.createElement(E,e,l.createElement(s,e))}}}]);
//# sourceMappingURL=component---src-domains-ui-layout-mdx-layout-tsx-content-file-path-src-content-posts-geul-js-react-use-geul-pipe-mdx-b41a77aff2fd64821cad.js.map