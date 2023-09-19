import{d as s,c as k,r as g,w as x,k as H,h as u,T as I,f as Q,Q as D,a as B,e as d,l as E,j as K,g as L,D as M,E as O,F as J,H as $,I as U,J as V,K as W}from"./index.d6ff8fdf.js";const A={ratio:[String,Number]};function G(e,r){return s(()=>{const a=Number(e.ratio||(r!==void 0?r.value:void 0));return isNaN(a)!==!0&&a>0?{paddingBottom:`${100/a}%`}:null})}const X=16/9;var p=k({name:"QImg",props:{...A,src:String,srcset:String,sizes:String,alt:String,crossorigin:String,decoding:String,referrerpolicy:String,draggable:Boolean,loading:{type:String,default:"lazy"},fetchpriority:{type:String,default:"auto"},width:String,height:String,initialRatio:{type:[Number,String],default:X},placeholderSrc:String,fit:{type:String,default:"cover"},position:{type:String,default:"50% 50%"},imgClass:String,imgStyle:Object,noSpinner:Boolean,noNativeMenu:Boolean,noTransition:Boolean,spinnerColor:String,spinnerSize:String},emits:["load","error"],setup(e,{slots:r,emit:a}){const l=g(e.initialRatio),y=G(e,l);let n=null,c=!1;const i=[g(null),g(S())],o=g(0),f=g(!1),v=g(!1),w=s(()=>`q-img q-img--${e.noNativeMenu===!0?"no-":""}menu`),_=s(()=>({width:e.width,height:e.height})),T=s(()=>`q-img__image ${e.imgClass!==void 0?e.imgClass+" ":""}q-img__image--with${e.noTransition===!0?"out":""}-transition`),F=s(()=>({...e.imgStyle,objectFit:e.fit,objectPosition:e.position}));x(()=>C(),b);function C(){return e.src||e.srcset||e.sizes?{src:e.src,srcset:e.srcset,sizes:e.sizes}:null}function S(){return e.placeholderSrc!==void 0?{src:e.placeholderSrc}:null}function b(t){n!==null&&(clearTimeout(n),n=null),v.value=!1,t===null?(f.value=!1,i[o.value^1].value=S()):f.value=!0,i[o.value].value=t}function N({target:t}){c!==!0&&(n!==null&&(clearTimeout(n),n=null),l.value=t.naturalHeight===0?.5:t.naturalWidth/t.naturalHeight,q(t,1))}function q(t,m){c===!0||m===1e3||(t.complete===!0?j(t):n=setTimeout(()=>{n=null,q(t,m+1)},50))}function j(t){c!==!0&&(o.value=o.value^1,i[o.value].value=null,f.value=!1,v.value=!1,a("load",t.currentSrc||t.src))}function P(t){n!==null&&(clearTimeout(n),n=null),f.value=!1,v.value=!0,i[o.value].value=null,i[o.value^1].value=S(),a("error",t)}function z(t){const m=i[t].value,h={key:"img_"+t,class:T.value,style:F.value,crossorigin:e.crossorigin,decoding:e.decoding,referrerpolicy:e.referrerpolicy,height:e.height,width:e.width,loading:e.loading,fetchpriority:e.fetchpriority,"aria-hidden":"true",draggable:e.draggable,...m};return o.value===t?(h.class+=" q-img__image--waiting",Object.assign(h,{onLoad:N,onError:P})):h.class+=" q-img__image--loaded",u("div",{class:"q-img__container absolute-full",key:"img"+t},u("img",h))}function R(){return f.value!==!0?u("div",{key:"content",class:"q-img__content absolute-full q-anchor--skip"},Q(r[v.value===!0?"error":"default"])):u("div",{key:"loading",class:"q-img__loading absolute-full flex flex-center"},r.loading!==void 0?r.loading():e.noSpinner===!0?void 0:[u(D,{color:e.spinnerColor,size:e.spinnerSize})])}return b(C()),H(()=>{c=!0,n!==null&&(clearTimeout(n),n=null)}),()=>{const t=[];return y.value!==null&&t.push(u("div",{key:"filler",style:y.value})),v.value!==!0&&(i[0].value!==null&&t.push(z(0)),i[1].value!==null&&t.push(z(1))),t.push(u(I,{name:"q-transition--fade"},R)),u("div",{class:w.value,style:_.value,role:"img","aria-label":e.alt},t)}}}),ee=k({name:"QPage",props:{padding:Boolean,styleFn:Function},setup(e,{slots:r}){const{proxy:{$q:a}}=L(),l=B(E,d);if(l===d)return console.error("QPage needs to be a deep child of QLayout"),d;if(B(K,d)===d)return console.error("QPage needs to be child of QPageContainer"),d;const n=s(()=>{const i=(l.header.space===!0?l.header.size:0)+(l.footer.space===!0?l.footer.size:0);if(typeof e.styleFn=="function"){const o=l.isContainer.value===!0?l.containerHeight.value:a.screen.height;return e.styleFn(i,o)}return{minHeight:l.isContainer.value===!0?l.containerHeight.value-i+"px":a.screen.height===0?i!==0?`calc(100vh - ${i}px)`:"100vh":a.screen.height-i+"px"}}),c=s(()=>`q-page${e.padding===!0?" q-layout-padding":""}`);return()=>u("main",{class:c.value,style:n.value},Q(r.default))}});const Y={class:"flex justify-center items-center q-col-gutter-x-sm"},te={__name:"BaseButton",props:{label:String,to:{type:String,required:!1},color:{type:String,default:"accent"},icon:{type:String,required:!1},size:{type:String,default:"md"},round:{type:Boolean,default:!1}},emits:["click"],setup(e){return(r,a)=>(M(),O(W,{to:e.to,class:"items-center",onClick:a[0]||(a[0]=l=>r.$emit("click")),ripple:{color:"negative"},"no-caps":"",unelevated:"",size:e.size,rounded:!e.round,round:e.round,color:e.color},{default:J(()=>[$("div",Y,[U(r.$slots,"default"),$("span",null,V(e.label),1)])]),_:3},8,["to","size","rounded","round","color"]))}};export{ee as Q,te as _,p as a};
