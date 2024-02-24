"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[832],{7943:function(t,e,a){a.r(e),a.d(e,{default:function(){return v}});var n=a(1151),r=a(7294);function o(t){const e=Object.assign({h1:"h1",p:"p",code:"code",pre:"pre",img:"img",ul:"ul",li:"li"},(0,n.ah)(),t.components);return r.createElement(r.Fragment,null,r.createElement(e.h1,null,"Implement perfect typing effect in React with Geul.js!"),"\n",r.createElement(e.p,null,r.createElement(e.code,null,"Geul.js")," is a library designed to easily implement\nthe typing effect of Korean characters,\nwhere characters are decomposed into\ninitial, medial, and final consonants\nas they are typed and then combined."),"\n",r.createElement(e.pre,null,r.createElement(e.code,{className:"language-ts"},'const Page = () => {\n  const { geul, run, reset } = useGeul("안녕하세요", {\n    initial: "",\n    speed: 50,\n  });\n\n  useEffect(() => {\n    run();\n  }, []);\n\n  return (\n    <div>{geul}</div>\n  );\n};\n')),"\n",r.createElement(e.img,{src:"/f7f24a545794f5e66c54916042ebfc9c/head-motion.gif",alt:"Main Image"}),"\n",r.createElement(e.h1,null,"Install Geul.js for React"),"\n",r.createElement(e.p,null,"Install via Package Manager"),"\n",r.createElement(e.pre,null,r.createElement(e.code,{className:"language-sh"},"npm i @dot/react-geul\n")),"\n",r.createElement(e.h1,null,"Usage"),"\n",r.createElement(e.p,null,"You can use ",r.createElement(e.code,null,"Geul.js")," by import ",r.createElement(e.code,null,"@dot/react-geul")," package and just simply call hooks. ",r.createElement(e.code,null,"@dot/react-geul")," provides three types of hooks."),"\n",r.createElement(e.ul,null,"\n",r.createElement(e.li,null,r.createElement(e.code,null,"useGeul")),"\n",r.createElement(e.li,null,r.createElement(e.code,null,"useDynamicGeul")),"\n",r.createElement(e.li,null,r.createElement(e.code,null,"useGeulPipe")),"\n"),"\n",r.createElement(e.h1,null,"Geul.js for other frameworks (eg. ",r.createElement(e.code,null,"Vue.js"),", ",r.createElement(e.code,null,"Svelte"),")"),"\n",r.createElement(e.p,null,r.createElement(e.code,null,"Geul.js")," have plan to support ",r.createElement(e.code,null,"Vue.js")," and ",r.createElement(e.code,null,"Svelde"),", and other frameworks,\nbut not in the process of developing it yet.\nI will work on it quickly and release it soon."))}var i=function(t){void 0===t&&(t={});const{wrapper:e}=Object.assign({},(0,n.ah)(),t.components);return e?r.createElement(e,t,r.createElement(o,t)):o(t)},l=a(7462),s=a(6298),c=a(4593),p=a(9573),w=a(6647),m=a(7021),d=a(160),u=a(8917),g=a(380),h=a(2952);var y={name:"1g917ag",styles:'*,::before,::after{box-sizing:border-box;border-width:0;border-style:solid;border-color:#e5e7eb;--tw-border-spacing-x:0;--tw-border-spacing-y:0;--tw-translate-x:0;--tw-translate-y:0;--tw-rotate:0;--tw-skew-x:0;--tw-skew-y:0;--tw-scale-x:1;--tw-scale-y:1;--tw-pan-x:var(--tw-empty,/*!*/ /*!*/);--tw-pan-y:var(--tw-empty,/*!*/ /*!*/);--tw-pinch-zoom:var(--tw-empty,/*!*/ /*!*/);--tw-scroll-snap-strictness:proximity;--tw-gradient-from-position:var(--tw-empty,/*!*/ /*!*/);--tw-gradient-via-position:var(--tw-empty,/*!*/ /*!*/);--tw-gradient-to-position:var(--tw-empty,/*!*/ /*!*/);--tw-ordinal:var(--tw-empty,/*!*/ /*!*/);--tw-slashed-zero:var(--tw-empty,/*!*/ /*!*/);--tw-numeric-figure:var(--tw-empty,/*!*/ /*!*/);--tw-numeric-spacing:var(--tw-empty,/*!*/ /*!*/);--tw-numeric-fraction:var(--tw-empty,/*!*/ /*!*/);--tw-ring-offset-shadow:0 0 #0000;--tw-ring-shadow:0 0 #0000;--tw-shadow:0 0 #0000;--tw-shadow-colored:0 0 #0000;--tw-ring-inset:var(--tw-empty,/*!*/ /*!*/);--tw-ring-offset-width:0px;--tw-ring-offset-color:#fff;--tw-ring-color:rgb(59 130 246 / 0.5);--tw-blur:var(--tw-empty,/*!*/ /*!*/);--tw-brightness:var(--tw-empty,/*!*/ /*!*/);--tw-contrast:var(--tw-empty,/*!*/ /*!*/);--tw-grayscale:var(--tw-empty,/*!*/ /*!*/);--tw-hue-rotate:var(--tw-empty,/*!*/ /*!*/);--tw-invert:var(--tw-empty,/*!*/ /*!*/);--tw-saturate:var(--tw-empty,/*!*/ /*!*/);--tw-sepia:var(--tw-empty,/*!*/ /*!*/);--tw-drop-shadow:var(--tw-empty,/*!*/ /*!*/);--tw-backdrop-blur:var(--tw-empty,/*!*/ /*!*/);--tw-backdrop-brightness:var(--tw-empty,/*!*/ /*!*/);--tw-backdrop-contrast:var(--tw-empty,/*!*/ /*!*/);--tw-backdrop-grayscale:var(--tw-empty,/*!*/ /*!*/);--tw-backdrop-hue-rotate:var(--tw-empty,/*!*/ /*!*/);--tw-backdrop-invert:var(--tw-empty,/*!*/ /*!*/);--tw-backdrop-opacity:var(--tw-empty,/*!*/ /*!*/);--tw-backdrop-saturate:var(--tw-empty,/*!*/ /*!*/);--tw-backdrop-sepia:var(--tw-empty,/*!*/ /*!*/);}::before,::after{--tw-content:\'\';}html,:host{line-height:1.5;-webkit-text-size-adjust:100%;-moz-tab-size:4;tab-size:4;font-family:ui-sans-serif,system-ui,sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji";font-feature-settings:normal;font-variation-settings:normal;-webkit-tap-highlight-color:transparent;}body{margin:0;line-height:inherit;}hr{height:0;color:inherit;border-top-width:1px;}abbr:where([title]){text-decoration:underline dotted;}h1,h2,h3,h4,h5,h6{font-size:inherit;font-weight:inherit;}a{color:inherit;text-decoration:inherit;}b,strong{font-weight:bolder;}code,kbd,samp,pre{font-family:ui-monospace,SFMono-Regular,Menlo,Monaco,Consolas,"Liberation Mono","Courier New",monospace;font-feature-settings:normal;font-variation-settings:normal;font-size:1em;}small{font-size:80%;}sub,sup{font-size:75%;line-height:0;position:relative;vertical-align:baseline;}sub{bottom:-0.25em;}sup{top:-0.5em;}table{text-indent:0;border-color:inherit;border-collapse:collapse;}button,input,optgroup,select,textarea{font-family:inherit;font-feature-settings:inherit;font-variation-settings:inherit;font-size:100%;font-weight:inherit;line-height:inherit;color:inherit;margin:0;padding:0;}button,select{text-transform:none;}button,[type=\'button\'],[type=\'reset\'],[type=\'submit\']{-webkit-appearance:button;background-color:transparent;background-image:none;}:-moz-focusring{outline:auto;}:-moz-ui-invalid{box-shadow:none;}progress{vertical-align:baseline;}::-webkit-inner-spin-button,::-webkit-outer-spin-button{height:auto;}[type=\'search\']{-webkit-appearance:textfield;outline-offset:-2px;}::-webkit-search-decoration{-webkit-appearance:none;}::-webkit-file-upload-button{-webkit-appearance:button;font:inherit;}summary{display:list-item;}blockquote,dl,dd,h1,h2,h3,h4,h5,h6,hr,figure,p,pre{margin:0;}fieldset{margin:0;padding:0;}legend{padding:0;}ol,ul,menu{list-style:none;margin:0;padding:0;}dialog{padding:0;}textarea{resize:vertical;}input::placeholder,textarea::placeholder{opacity:1;color:#9ca3af;}button,[role="button"]{cursor:pointer;}:disabled{cursor:default;}img,svg,video,canvas,audio,iframe,embed,object{display:block;vertical-align:middle;}img,video{max-width:100%;height:auto;}[hidden]{display:none;}::backdrop{--tw-border-spacing-x:0;--tw-border-spacing-y:0;--tw-translate-x:0;--tw-translate-y:0;--tw-rotate:0;--tw-skew-x:0;--tw-skew-y:0;--tw-scale-x:1;--tw-scale-y:1;--tw-pan-x:var(--tw-empty,/*!*/ /*!*/);--tw-pan-y:var(--tw-empty,/*!*/ /*!*/);--tw-pinch-zoom:var(--tw-empty,/*!*/ /*!*/);--tw-scroll-snap-strictness:proximity;--tw-gradient-from-position:var(--tw-empty,/*!*/ /*!*/);--tw-gradient-via-position:var(--tw-empty,/*!*/ /*!*/);--tw-gradient-to-position:var(--tw-empty,/*!*/ /*!*/);--tw-ordinal:var(--tw-empty,/*!*/ /*!*/);--tw-slashed-zero:var(--tw-empty,/*!*/ /*!*/);--tw-numeric-figure:var(--tw-empty,/*!*/ /*!*/);--tw-numeric-spacing:var(--tw-empty,/*!*/ /*!*/);--tw-numeric-fraction:var(--tw-empty,/*!*/ /*!*/);--tw-ring-offset-shadow:0 0 #0000;--tw-ring-shadow:0 0 #0000;--tw-shadow:0 0 #0000;--tw-shadow-colored:0 0 #0000;--tw-ring-inset:var(--tw-empty,/*!*/ /*!*/);--tw-ring-offset-width:0px;--tw-ring-offset-color:#fff;--tw-ring-color:rgb(59 130 246 / 0.5);--tw-blur:var(--tw-empty,/*!*/ /*!*/);--tw-brightness:var(--tw-empty,/*!*/ /*!*/);--tw-contrast:var(--tw-empty,/*!*/ /*!*/);--tw-grayscale:var(--tw-empty,/*!*/ /*!*/);--tw-hue-rotate:var(--tw-empty,/*!*/ /*!*/);--tw-invert:var(--tw-empty,/*!*/ /*!*/);--tw-saturate:var(--tw-empty,/*!*/ /*!*/);--tw-sepia:var(--tw-empty,/*!*/ /*!*/);--tw-drop-shadow:var(--tw-empty,/*!*/ /*!*/);--tw-backdrop-blur:var(--tw-empty,/*!*/ /*!*/);--tw-backdrop-brightness:var(--tw-empty,/*!*/ /*!*/);--tw-backdrop-contrast:var(--tw-empty,/*!*/ /*!*/);--tw-backdrop-grayscale:var(--tw-empty,/*!*/ /*!*/);--tw-backdrop-hue-rotate:var(--tw-empty,/*!*/ /*!*/);--tw-backdrop-invert:var(--tw-empty,/*!*/ /*!*/);--tw-backdrop-opacity:var(--tw-empty,/*!*/ /*!*/);--tw-backdrop-saturate:var(--tw-empty,/*!*/ /*!*/);--tw-backdrop-sepia:var(--tw-empty,/*!*/ /*!*/);}'};const b=()=>(0,s.tZ)(s.xB,{styles:y}),f=t=>{let{data:e,children:a,...o}=t;const{0:i,1:y}=(0,r.useState)(!1),f=t=>()=>{y(t)};return(0,s.tZ)(g.Z.Root,(0,l.Z)({sidebarVisible:i},(0,p.r)(o)),(0,s.tZ)(c.q,null,(0,s.tZ)("title",null,e.mdx.frontmatter.title)),(0,s.tZ)(b,null),(0,s.tZ)(w.Z,null,(0,s.tZ)(h.a,{value:{withoutSidebar:!1}},(0,s.tZ)(u.Z,{onClose:f(!1)}),(0,s.tZ)(g.Z.Main,null,(0,s.tZ)(d.Z,{onMenuClick:f(!0)}),(0,s.tZ)(g.Z.Content,null,(0,s.tZ)(n.Zo,{components:{pre:m.Z}},(0,s.tZ)("div",{className:"doc"},a)))))))};function v(t){return r.createElement(f,t,r.createElement(i,t))}}}]);
//# sourceMappingURL=component---src-domains-ui-layout-mdx-layout-tsx-content-file-path-src-content-posts-geul-js-introduce-mdx-6b174bc99636d63aa66f.js.map