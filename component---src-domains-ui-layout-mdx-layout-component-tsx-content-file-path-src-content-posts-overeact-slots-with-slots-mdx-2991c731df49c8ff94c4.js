"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[624],{5005:function(t,e,n){n.r(e),n.d(e,{default:function(){return z}});var r=n(1151),a=n(7294),o=n(6523),i=n(6298);const l={name:"1ov1ki3",styles:"background-color:#0c1018;border-radius:6px;padding:16px;> *{background-color:#204230;padding:8px 16px;margin-bottom:1rem !important;border-radius:4px;}"},s={name:"syyjfa",styles:"background-color:#92731d !important"},p={name:"rdlx4i",styles:"background-color:#1d5092 !important"};var c=(0,o.Y)((t=>{let{slots:{childA:e,childB:n,defaultChildren:r}}=t;return(0,i.tZ)("div",{css:l},e,r,n)}),{ChildA:()=>(0,i.tZ)("div",{css:s},"child A"),ChildB:()=>(0,i.tZ)("div",{css:p},"child B")});function d(t){const e=Object.assign({h1:"h1",p:"p",code:"code",pre:"pre",h2:"h2",h3:"h3"},(0,r.ah)(),t.components);return c||m("WithSlotsExample",!1),c.ChildA||m("WithSlotsExample.ChildA",!0),c.ChildB||m("WithSlotsExample.ChildB",!0),a.createElement(a.Fragment,null,a.createElement(e.h1,null,"withSlots"),"\n",a.createElement(e.p,null,a.createElement(e.code,null,"withSlots")," is HOC that create a component with slots easily."),"\n",a.createElement(e.pre,null,a.createElement(e.code,{className:"language-tsx"},'function withSlots<\n  Comp extends (props: any) => ReactElement,\n  Props extends Parameters<Comp>[0],\n  SlotConstructors extends Record<\n    ToPascalCase<Exclude<keyof Props["slots"], "defaultChildren">>,\n    keyof JSX.IntrinsicElements | JSXElementConstructor<any>\n  >,\n>(\n  Component: Comp,\n  slotConstructors: SlotConstructors,\n): (\n  props: Omit<Props, "slots"> & {\n    children: ReactNode;\n  },\n) => ReactElement;\n')),"\n",a.createElement(e.h2,null,a.createElement(e.code,null,"Component")),"\n",a.createElement(e.p,null,"Target component to apply slots."),"\n",a.createElement(e.h2,null,a.createElement(e.code,null,"slotConstructors")),"\n",a.createElement(e.p,null,"Object where 'key' represents the name of each slot,\nand 'value' represents the define of the component\nto be passed to each slot."),"\n",a.createElement(e.h2,null,a.createElement(e.code,null,"return")),"\n",a.createElement(e.p,null,"A new component created through the delivered component,\nwhich receives 'children', not 'slots' which original one receives."),"\n",a.createElement(e.h2,null,"Examples"),"\n",a.createElement(e.h3,null,"Codes"),"\n",a.createElement(e.pre,null,a.createElement(e.code,{className:"language-tsx"},'// with-slots.example.component.tsx\nimport { SlotsProp, withSlots } from "@d0t/overeact";\n\nconst ChildA = () => {\n  return <div>child A</div>;\n};\n\nconst ChildB = () => {\n  return <div>child B</div>;\n};\n\nconst WithSlotsExample = ({\n  slots: { childA, childB, defaultChildren },\n}: SlotsProp<"childA" | "childB">) => {\n  return (\n    <div>\n      {childA}\n      {defaultChildren}\n      {childB}\n    </div>\n  );\n};\n\nexport default withSlots(WithSlotsExample, {\n  ChildA,\n  ChildB,\n});\n')),"\n",a.createElement(e.pre,null,a.createElement(e.code,{className:"language-tsx"},"// page.tsx\nconst Page = () => {\n  return (\n    <WithSlotsExample>\n      <WithSlotsExample.ChildA />\n      <WithSlotsExample.ChildB />\n      <div>I'm default child 1</div>\n      <p>I'm default child 2</p>\n    </WithSlotsExample>\n  );\n};\n")),"\n",a.createElement(e.h3,null,"Result"),"\n",a.createElement(c,{className:"slots-example-root"},a.createElement(c.ChildA),a.createElement(c.ChildB),a.createElement("div",null,"I'm default child 1"),a.createElement("p",null,"I'm default child 2")))}var w=function(t){void 0===t&&(t={});const{wrapper:e}=Object.assign({},(0,r.ah)(),t.components);return e?a.createElement(e,t,a.createElement(d,t)):d(t)};function m(t,e){throw new Error("Expected "+(e?"component":"object")+" `"+t+"` to be defined: you likely forgot to import, pass, or provide it.")}var h=n(7462),u=n(4593),y=n(8905),b=n(6647),g=n(5564),v=n(327),f=n(2661),x=n(2863),k=n(380),E=n(2952);var Z={name:"1g917ag",styles:'*,::before,::after{box-sizing:border-box;border-width:0;border-style:solid;border-color:#e5e7eb;--tw-border-spacing-x:0;--tw-border-spacing-y:0;--tw-translate-x:0;--tw-translate-y:0;--tw-rotate:0;--tw-skew-x:0;--tw-skew-y:0;--tw-scale-x:1;--tw-scale-y:1;--tw-pan-x:var(--tw-empty,/*!*/ /*!*/);--tw-pan-y:var(--tw-empty,/*!*/ /*!*/);--tw-pinch-zoom:var(--tw-empty,/*!*/ /*!*/);--tw-scroll-snap-strictness:proximity;--tw-gradient-from-position:var(--tw-empty,/*!*/ /*!*/);--tw-gradient-via-position:var(--tw-empty,/*!*/ /*!*/);--tw-gradient-to-position:var(--tw-empty,/*!*/ /*!*/);--tw-ordinal:var(--tw-empty,/*!*/ /*!*/);--tw-slashed-zero:var(--tw-empty,/*!*/ /*!*/);--tw-numeric-figure:var(--tw-empty,/*!*/ /*!*/);--tw-numeric-spacing:var(--tw-empty,/*!*/ /*!*/);--tw-numeric-fraction:var(--tw-empty,/*!*/ /*!*/);--tw-ring-offset-shadow:0 0 #0000;--tw-ring-shadow:0 0 #0000;--tw-shadow:0 0 #0000;--tw-shadow-colored:0 0 #0000;--tw-ring-inset:var(--tw-empty,/*!*/ /*!*/);--tw-ring-offset-width:0px;--tw-ring-offset-color:#fff;--tw-ring-color:rgb(59 130 246 / 0.5);--tw-blur:var(--tw-empty,/*!*/ /*!*/);--tw-brightness:var(--tw-empty,/*!*/ /*!*/);--tw-contrast:var(--tw-empty,/*!*/ /*!*/);--tw-grayscale:var(--tw-empty,/*!*/ /*!*/);--tw-hue-rotate:var(--tw-empty,/*!*/ /*!*/);--tw-invert:var(--tw-empty,/*!*/ /*!*/);--tw-saturate:var(--tw-empty,/*!*/ /*!*/);--tw-sepia:var(--tw-empty,/*!*/ /*!*/);--tw-drop-shadow:var(--tw-empty,/*!*/ /*!*/);--tw-backdrop-blur:var(--tw-empty,/*!*/ /*!*/);--tw-backdrop-brightness:var(--tw-empty,/*!*/ /*!*/);--tw-backdrop-contrast:var(--tw-empty,/*!*/ /*!*/);--tw-backdrop-grayscale:var(--tw-empty,/*!*/ /*!*/);--tw-backdrop-hue-rotate:var(--tw-empty,/*!*/ /*!*/);--tw-backdrop-invert:var(--tw-empty,/*!*/ /*!*/);--tw-backdrop-opacity:var(--tw-empty,/*!*/ /*!*/);--tw-backdrop-saturate:var(--tw-empty,/*!*/ /*!*/);--tw-backdrop-sepia:var(--tw-empty,/*!*/ /*!*/);}::before,::after{--tw-content:\'\';}html,:host{line-height:1.5;-webkit-text-size-adjust:100%;-moz-tab-size:4;tab-size:4;font-family:ui-sans-serif,system-ui,sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji";font-feature-settings:normal;font-variation-settings:normal;-webkit-tap-highlight-color:transparent;}body{margin:0;line-height:inherit;}hr{height:0;color:inherit;border-top-width:1px;}abbr:where([title]){text-decoration:underline dotted;}h1,h2,h3,h4,h5,h6{font-size:inherit;font-weight:inherit;}a{color:inherit;text-decoration:inherit;}b,strong{font-weight:bolder;}code,kbd,samp,pre{font-family:ui-monospace,SFMono-Regular,Menlo,Monaco,Consolas,"Liberation Mono","Courier New",monospace;font-feature-settings:normal;font-variation-settings:normal;font-size:1em;}small{font-size:80%;}sub,sup{font-size:75%;line-height:0;position:relative;vertical-align:baseline;}sub{bottom:-0.25em;}sup{top:-0.5em;}table{text-indent:0;border-color:inherit;border-collapse:collapse;}button,input,optgroup,select,textarea{font-family:inherit;font-feature-settings:inherit;font-variation-settings:inherit;font-size:100%;font-weight:inherit;line-height:inherit;color:inherit;margin:0;padding:0;}button,select{text-transform:none;}button,[type=\'button\'],[type=\'reset\'],[type=\'submit\']{-webkit-appearance:button;background-color:transparent;background-image:none;}:-moz-focusring{outline:auto;}:-moz-ui-invalid{box-shadow:none;}progress{vertical-align:baseline;}::-webkit-inner-spin-button,::-webkit-outer-spin-button{height:auto;}[type=\'search\']{-webkit-appearance:textfield;outline-offset:-2px;}::-webkit-search-decoration{-webkit-appearance:none;}::-webkit-file-upload-button{-webkit-appearance:button;font:inherit;}summary{display:list-item;}blockquote,dl,dd,h1,h2,h3,h4,h5,h6,hr,figure,p,pre{margin:0;}fieldset{margin:0;padding:0;}legend{padding:0;}ol,ul,menu{list-style:none;margin:0;padding:0;}dialog{padding:0;}textarea{resize:vertical;}input::placeholder,textarea::placeholder{opacity:1;color:#9ca3af;}button,[role="button"]{cursor:pointer;}:disabled{cursor:default;}img,svg,video,canvas,audio,iframe,embed,object{display:block;vertical-align:middle;}img,video{max-width:100%;height:auto;}[hidden]{display:none;}::backdrop{--tw-border-spacing-x:0;--tw-border-spacing-y:0;--tw-translate-x:0;--tw-translate-y:0;--tw-rotate:0;--tw-skew-x:0;--tw-skew-y:0;--tw-scale-x:1;--tw-scale-y:1;--tw-pan-x:var(--tw-empty,/*!*/ /*!*/);--tw-pan-y:var(--tw-empty,/*!*/ /*!*/);--tw-pinch-zoom:var(--tw-empty,/*!*/ /*!*/);--tw-scroll-snap-strictness:proximity;--tw-gradient-from-position:var(--tw-empty,/*!*/ /*!*/);--tw-gradient-via-position:var(--tw-empty,/*!*/ /*!*/);--tw-gradient-to-position:var(--tw-empty,/*!*/ /*!*/);--tw-ordinal:var(--tw-empty,/*!*/ /*!*/);--tw-slashed-zero:var(--tw-empty,/*!*/ /*!*/);--tw-numeric-figure:var(--tw-empty,/*!*/ /*!*/);--tw-numeric-spacing:var(--tw-empty,/*!*/ /*!*/);--tw-numeric-fraction:var(--tw-empty,/*!*/ /*!*/);--tw-ring-offset-shadow:0 0 #0000;--tw-ring-shadow:0 0 #0000;--tw-shadow:0 0 #0000;--tw-shadow-colored:0 0 #0000;--tw-ring-inset:var(--tw-empty,/*!*/ /*!*/);--tw-ring-offset-width:0px;--tw-ring-offset-color:#fff;--tw-ring-color:rgb(59 130 246 / 0.5);--tw-blur:var(--tw-empty,/*!*/ /*!*/);--tw-brightness:var(--tw-empty,/*!*/ /*!*/);--tw-contrast:var(--tw-empty,/*!*/ /*!*/);--tw-grayscale:var(--tw-empty,/*!*/ /*!*/);--tw-hue-rotate:var(--tw-empty,/*!*/ /*!*/);--tw-invert:var(--tw-empty,/*!*/ /*!*/);--tw-saturate:var(--tw-empty,/*!*/ /*!*/);--tw-sepia:var(--tw-empty,/*!*/ /*!*/);--tw-drop-shadow:var(--tw-empty,/*!*/ /*!*/);--tw-backdrop-blur:var(--tw-empty,/*!*/ /*!*/);--tw-backdrop-brightness:var(--tw-empty,/*!*/ /*!*/);--tw-backdrop-contrast:var(--tw-empty,/*!*/ /*!*/);--tw-backdrop-grayscale:var(--tw-empty,/*!*/ /*!*/);--tw-backdrop-hue-rotate:var(--tw-empty,/*!*/ /*!*/);--tw-backdrop-invert:var(--tw-empty,/*!*/ /*!*/);--tw-backdrop-opacity:var(--tw-empty,/*!*/ /*!*/);--tw-backdrop-saturate:var(--tw-empty,/*!*/ /*!*/);--tw-backdrop-sepia:var(--tw-empty,/*!*/ /*!*/);}'};const C=()=>(0,i.tZ)(i.xB,{styles:Z}),S=t=>{let{data:e,children:n,...o}=t;const{0:l,1:s}=(0,a.useState)(!1),p=(0,a.useCallback)((t=>()=>{s(t)}),[]);return(0,i.tZ)(k.Z.Root,(0,h.Z)({sidebarVisible:l},(0,y.r)(o)),(0,i.tZ)(u.q,null,(0,i.tZ)("title",null,e.mdx.frontmatter.title)),(0,i.tZ)(C,null),(0,i.tZ)(b.Z,null,(0,i.tZ)(E.a,{value:{withoutSidebar:!1}},(0,i.tZ)(x.Z,{onClose:p(!1)}),(0,i.tZ)(k.Z.Main,null,(0,i.tZ)(f.Z,{onMenuClick:p(!0)}),(0,i.tZ)(k.Z.Content,null,(0,i.tZ)(r.Zo,{components:{h1:t=>(0,i.tZ)(v.Z,(0,h.Z)({as:"h1"},t)),h2:t=>(0,i.tZ)(v.Z,(0,h.Z)({as:"h2"},t)),h3:t=>(0,i.tZ)(v.Z,(0,h.Z)({as:"h3"},t)),h4:t=>(0,i.tZ)(v.Z,(0,h.Z)({as:"h4"},t)),h5:t=>(0,i.tZ)(v.Z,(0,h.Z)({as:"h5"},t)),h6:t=>(0,i.tZ)(v.Z,(0,h.Z)({as:"h6"},t)),pre:g.Z}},(0,i.tZ)("div",{className:"doc"},n)))))))};function z(t){return a.createElement(S,t,a.createElement(w,t))}}}]);
//# sourceMappingURL=component---src-domains-ui-layout-mdx-layout-component-tsx-content-file-path-src-content-posts-overeact-slots-with-slots-mdx-2991c731df49c8ff94c4.js.map