import{w as h,a as m}from"./with-props-Da6b0gV-.js";import{a,o as e,N as x,M as p,L as u,S as f,p as w,q as j,O as g,s as y}from"./chunk-DQRVZFIR-C9NECug8.js";import{u as v,A as k}from"./artistReducer-Cq3i9szn.js";function b(){const r=[{name:"Home",url:"/"},{name:"Landscapes",url:"/landscapes"},{name:"Portraits",url:"/portraits"},{name:"Charcoal",url:"/charcoals"}],[s,n]=a.useState(!1),[t,o]=a.useState(700),l=768;typeof window<"u"&&a.useEffect(()=>{o(window.innerWidth)}),a.useEffect(()=>{const i=()=>o(window.innerWidth);return window.addEventListener("resize",i),()=>window.removeEventListener("resize",i)},[]);const d=()=>{n(!s)};return e.jsxs(e.Fragment,{children:[t<l&&e.jsxs("svg",{height:"25px",viewBox:"0 0 48 48",fill:"none",xmlns:"http://www.w3.org/2000/svg",id:"hamburger-icon",onClick:d,className:s?"cross":"",children:[e.jsx("path",{d:"M7.94977 11.9498H39.9498",stroke:"#a8a29e",strokeWidth:"4px",strokeLinecap:"round",strokeLinejoin:"round"}),e.jsx("path",{d:"M7.94977 23.9498H39.9498",stroke:"#a8a29e",strokeWidth:"4px",strokeLinecap:"round",strokeLinejoin:"round"}),e.jsx("path",{d:"M7.94977 35.9498H39.9498",stroke:"#a8a29e",strokeWidth:"4px",strokeLinecap:"round",strokeLinejoin:"round"})]}),(s||t>l)&&e.jsx("nav",{className:`\r
        absolute \r
        top-0 \r
        left-0\r
        w-full \r
        h-screen \r
        grid \r
        grid-col \r
        place-items-center \r
        bg-slate-900 \r
        z-10\r
        m-0\r
        md:relative \r
        md:w-auto \r
        md:h-auto\r
        md:bg-white\r
        md:place-items-start\r
        md:mt-10\r
        md:mb-20\r
        `,children:r.map(i=>e.jsx(x,{to:i.url,className:({isActive:c})=>c?"text-white md:text-stone-400":"text-stone-300 hover:text-yellow-200",onClick:d,children:i.name},i.name))})]})}function N(){const r=[{x:0,y:0,id:1},{x:12,y:0,id:2},{x:0,y:14,id:3},{x:12,y:14,id:4}],s=v(),n=()=>{s({type:"thumbsVisible"})};return e.jsx("div",{className:"absolute right-[3rem] cursor-pointer md:relative md:top-auto md:right-auto",onClick:()=>{n()},children:e.jsx("svg",{width:"26",height:"26",xmlns:"http://www.w3.org/2000/svg",children:r.map(t=>e.jsx("rect",{x:t.x,y:t.y,width:"10",height:"10",style:{fill:"rgb(183, 183, 189)"}},t.id))})})}const W=()=>[{rel:"preconnect",href:"https://fonts.googleapis.com"},{rel:"preconnect",href:"https://fonts.gstatic.com",crossOrigin:"anonymous"},{rel:"stylesheet",href:"https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400..900;1,400..900&display=swap"}];function C({children:r}){return e.jsxs("html",{lang:"en",children:[e.jsxs("head",{children:[e.jsx("meta",{charSet:"utf-8"}),e.jsx("meta",{name:"viewport",content:"width=device-width, initial-scale=1"}),e.jsx(p,{}),e.jsx(u,{})]}),e.jsxs("body",{children:[r,e.jsx(f,{}),e.jsx(w,{})]})]})}const S=h(function(){return j(),e.jsx(k,{children:e.jsxs("div",{className:"flex flex-col md:flex-row",children:[e.jsxs("header",{className:"flex pt-4 pb-4 pl-8 pr-8 h-[100px] md:h-auto md:w-[200px] md:flex-row md:content-start md:flex-wrap",children:[e.jsxs("div",{className:"flex-1",children:[e.jsx("p",{className:"uppercase font-serif text-stone-400 text-[2rem]",children:"Artist200"}),e.jsx("p",{className:"text-stone-300 italic text-sm",children:"Cheryl Collier"})]}),e.jsxs("div",{className:"flex-1",children:[e.jsx(b,{}),e.jsx(N,{})]})]}),e.jsx("main",{className:"px-8 pt-2 overflow-hidden md:pt-4",children:e.jsx(g,{})})]})})}),A=m(function({error:s}){let n="Oops!",t="An unexpected error occurred.",o;return y(s)&&(n=s.status===404?"404":"Error",t=s.status===404?"The requested page could not be found.":s.statusText||t),e.jsxs("main",{className:"pt-16 p-4 container mx-auto",children:[e.jsx("h1",{children:n}),e.jsx("p",{children:t}),o]})});export{A as ErrorBoundary,C as Layout,S as default,W as links};
