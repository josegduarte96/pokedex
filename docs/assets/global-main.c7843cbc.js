import{r as $,b as ee}from"./index.d6ff8fdf.js";import{i as te,a as B,r as se,n as q,t as re,g as ie,c as L,b as m,d as E,e as V,S as X,h as Y,p as U,m as K,f as I,j as H,o as G,k as w,l as ne,q as A,s as N,u as n,v as C,w as ae}from"./utils.esm.5ceb5904.js";const _=console;class W{destroy(){this.clearGcTimeout()}scheduleGc(){this.clearGcTimeout(),te(this.cacheTime)&&(this.gcTimeout=setTimeout(()=>{this.optionalRemove()},this.cacheTime))}updateCacheTime(e){this.cacheTime=Math.max(this.cacheTime||0,e!=null?e:B?1/0:5*60*1e3)}clearGcTimeout(){this.gcTimeout&&(clearTimeout(this.gcTimeout),this.gcTimeout=void 0)}}class ue extends W{constructor(e){super(),this.abortSignalConsumed=!1,this.defaultOptions=e.defaultOptions,this.setOptions(e.options),this.observers=[],this.cache=e.cache,this.logger=e.logger||_,this.queryKey=e.queryKey,this.queryHash=e.queryHash,this.initialState=e.state||oe(this.options),this.state=this.initialState,this.scheduleGc()}get meta(){return this.options.meta}setOptions(e){this.options={...this.defaultOptions,...e},this.updateCacheTime(this.options.cacheTime)}optionalRemove(){!this.observers.length&&this.state.fetchStatus==="idle"&&this.cache.remove(this)}setData(e,t){const s=se(this.state.data,e,this.options);return this.dispatch({data:s,type:"success",dataUpdatedAt:t==null?void 0:t.updatedAt,manual:t==null?void 0:t.manual}),s}setState(e,t){this.dispatch({type:"setState",state:e,setStateOptions:t})}cancel(e){var t;const s=this.promise;return(t=this.retryer)==null||t.cancel(e),s?s.then(q).catch(q):Promise.resolve()}destroy(){super.destroy(),this.cancel({silent:!0})}reset(){this.destroy(),this.setState(this.initialState)}isActive(){return this.observers.some(e=>e.options.enabled!==!1)}isDisabled(){return this.getObserversCount()>0&&!this.isActive()}isStale(){return this.state.isInvalidated||!this.state.dataUpdatedAt||this.observers.some(e=>e.getCurrentResult().isStale)}isStaleByTime(e=0){return this.state.isInvalidated||!this.state.dataUpdatedAt||!re(this.state.dataUpdatedAt,e)}onFocus(){var e;const t=this.observers.find(s=>s.shouldFetchOnWindowFocus());t&&t.refetch({cancelRefetch:!1}),(e=this.retryer)==null||e.continue()}onOnline(){var e;const t=this.observers.find(s=>s.shouldFetchOnReconnect());t&&t.refetch({cancelRefetch:!1}),(e=this.retryer)==null||e.continue()}addObserver(e){this.observers.includes(e)||(this.observers.push(e),this.clearGcTimeout(),this.cache.notify({type:"observerAdded",query:this,observer:e}))}removeObserver(e){this.observers.includes(e)&&(this.observers=this.observers.filter(t=>t!==e),this.observers.length||(this.retryer&&(this.abortSignalConsumed?this.retryer.cancel({revert:!0}):this.retryer.cancelRetry()),this.scheduleGc()),this.cache.notify({type:"observerRemoved",query:this,observer:e}))}getObserversCount(){return this.observers.length}invalidate(){this.state.isInvalidated||this.dispatch({type:"invalidate"})}fetch(e,t){var s,r;if(this.state.fetchStatus!=="idle"){if(this.state.dataUpdatedAt&&t!=null&&t.cancelRefetch)this.cancel({silent:!0});else if(this.promise){var i;return(i=this.retryer)==null||i.continueRetry(),this.promise}}if(e&&this.setOptions(e),!this.options.queryFn){const h=this.observers.find(p=>p.options.queryFn);h&&this.setOptions(h.options)}const u=ie(),o={queryKey:this.queryKey,pageParam:void 0,meta:this.meta},f=h=>{Object.defineProperty(h,"signal",{enumerable:!0,get:()=>{if(u)return this.abortSignalConsumed=!0,u.signal}})};f(o);const g=()=>this.options.queryFn?(this.abortSignalConsumed=!1,this.options.queryFn(o)):Promise.reject("Missing queryFn for queryKey '"+this.options.queryHash+"'"),v={fetchOptions:t,options:this.options,queryKey:this.queryKey,state:this.state,fetchFn:g};if(f(v),(s=this.options.behavior)==null||s.onFetch(v),this.revertState=this.state,this.state.fetchStatus==="idle"||this.state.fetchMeta!==((r=v.fetchOptions)==null?void 0:r.meta)){var M;this.dispatch({type:"fetch",meta:(M=v.fetchOptions)==null?void 0:M.meta})}const y=h=>{if(E(h)&&h.silent||this.dispatch({type:"error",error:h}),!E(h)){var p,b,Q,O;(p=(b=this.cache.config).onError)==null||p.call(b,h,this),(Q=(O=this.cache.config).onSettled)==null||Q.call(O,this.state.data,h,this)}this.isFetchingOptimistic||this.scheduleGc(),this.isFetchingOptimistic=!1};return this.retryer=L({fn:v.fetchFn,abort:u==null?void 0:u.abort.bind(u),onSuccess:h=>{var p,b,Q,O;if(typeof h=="undefined"){y(new Error(this.queryHash+" data is undefined"));return}this.setData(h),(p=(b=this.cache.config).onSuccess)==null||p.call(b,h,this),(Q=(O=this.cache.config).onSettled)==null||Q.call(O,h,this.state.error,this),this.isFetchingOptimistic||this.scheduleGc(),this.isFetchingOptimistic=!1},onError:y,onFail:(h,p)=>{this.dispatch({type:"failed",failureCount:h,error:p})},onPause:()=>{this.dispatch({type:"pause"})},onContinue:()=>{this.dispatch({type:"continue"})},retry:v.options.retry,retryDelay:v.options.retryDelay,networkMode:v.options.networkMode}),this.promise=this.retryer.promise,this.promise}dispatch(e){const t=s=>{var r,i;switch(e.type){case"failed":return{...s,fetchFailureCount:e.failureCount,fetchFailureReason:e.error};case"pause":return{...s,fetchStatus:"paused"};case"continue":return{...s,fetchStatus:"fetching"};case"fetch":return{...s,fetchFailureCount:0,fetchFailureReason:null,fetchMeta:(r=e.meta)!=null?r:null,fetchStatus:V(this.options.networkMode)?"fetching":"paused",...!s.dataUpdatedAt&&{error:null,status:"loading"}};case"success":return{...s,data:e.data,dataUpdateCount:s.dataUpdateCount+1,dataUpdatedAt:(i=e.dataUpdatedAt)!=null?i:Date.now(),error:null,isInvalidated:!1,status:"success",...!e.manual&&{fetchStatus:"idle",fetchFailureCount:0,fetchFailureReason:null}};case"error":const u=e.error;return E(u)&&u.revert&&this.revertState?{...this.revertState,fetchStatus:"idle"}:{...s,error:u,errorUpdateCount:s.errorUpdateCount+1,errorUpdatedAt:Date.now(),fetchFailureCount:s.fetchFailureCount+1,fetchFailureReason:u,fetchStatus:"idle",status:"error"};case"invalidate":return{...s,isInvalidated:!0};case"setState":return{...s,...e.state}}};this.state=t(this.state),m.batch(()=>{this.observers.forEach(s=>{s.onQueryUpdate(e)}),this.cache.notify({query:this,type:"updated",action:e})})}}function oe(a){const e=typeof a.initialData=="function"?a.initialData():a.initialData,t=typeof e!="undefined",s=t?typeof a.initialDataUpdatedAt=="function"?a.initialDataUpdatedAt():a.initialDataUpdatedAt:0;return{data:e,dataUpdateCount:0,dataUpdatedAt:t?s!=null?s:Date.now():0,error:null,errorUpdateCount:0,errorUpdatedAt:0,fetchFailureCount:0,fetchFailureReason:null,fetchMeta:null,isInvalidated:!1,status:t?"success":"loading",fetchStatus:"idle"}}class z extends X{constructor(e){super(),this.config=e||{},this.queries=[],this.queriesMap={}}build(e,t,s){var r;const i=t.queryKey,u=(r=t.queryHash)!=null?r:Y(i,t);let o=this.get(u);return o||(o=new ue({cache:this,logger:e.getLogger(),queryKey:i,queryHash:u,options:e.defaultQueryOptions(t),state:s,defaultOptions:e.getQueryDefaults(i)}),this.add(o)),o}add(e){this.queriesMap[e.queryHash]||(this.queriesMap[e.queryHash]=e,this.queries.push(e),this.notify({type:"added",query:e}))}remove(e){const t=this.queriesMap[e.queryHash];t&&(e.destroy(),this.queries=this.queries.filter(s=>s!==e),t===e&&delete this.queriesMap[e.queryHash],this.notify({type:"removed",query:e}))}clear(){m.batch(()=>{this.queries.forEach(e=>{this.remove(e)})})}get(e){return this.queriesMap[e]}getAll(){return this.queries}find(e,t){const[s]=U(e,t);return typeof s.exact=="undefined"&&(s.exact=!0),this.queries.find(r=>K(s,r))}findAll(e,t){const[s]=U(e,t);return Object.keys(s).length>0?this.queries.filter(r=>K(s,r)):this.queries}notify(e){m.batch(()=>{this.listeners.forEach(({listener:t})=>{t(e)})})}onFocus(){m.batch(()=>{this.queries.forEach(e=>{e.onFocus()})})}onOnline(){m.batch(()=>{this.queries.forEach(e=>{e.onOnline()})})}}class le extends W{constructor(e){super(),this.defaultOptions=e.defaultOptions,this.mutationId=e.mutationId,this.mutationCache=e.mutationCache,this.logger=e.logger||_,this.observers=[],this.state=e.state||he(),this.setOptions(e.options),this.scheduleGc()}setOptions(e){this.options={...this.defaultOptions,...e},this.updateCacheTime(this.options.cacheTime)}get meta(){return this.options.meta}setState(e){this.dispatch({type:"setState",state:e})}addObserver(e){this.observers.includes(e)||(this.observers.push(e),this.clearGcTimeout(),this.mutationCache.notify({type:"observerAdded",mutation:this,observer:e}))}removeObserver(e){this.observers=this.observers.filter(t=>t!==e),this.scheduleGc(),this.mutationCache.notify({type:"observerRemoved",mutation:this,observer:e})}optionalRemove(){this.observers.length||(this.state.status==="loading"?this.scheduleGc():this.mutationCache.remove(this))}continue(){var e,t;return(e=(t=this.retryer)==null?void 0:t.continue())!=null?e:this.execute()}async execute(){const e=()=>{var l;return this.retryer=L({fn:()=>this.options.mutationFn?this.options.mutationFn(this.state.variables):Promise.reject("No mutationFn found"),onFail:(d,D)=>{this.dispatch({type:"failed",failureCount:d,error:D})},onPause:()=>{this.dispatch({type:"pause"})},onContinue:()=>{this.dispatch({type:"continue"})},retry:(l=this.options.retry)!=null?l:0,retryDelay:this.options.retryDelay,networkMode:this.options.networkMode}),this.retryer.promise},t=this.state.status==="loading";try{var s,r,i,u,o,f,g,v;if(!t){var M,y,h,p;this.dispatch({type:"loading",variables:this.options.variables}),await((M=(y=this.mutationCache.config).onMutate)==null?void 0:M.call(y,this.state.variables,this));const d=await((h=(p=this.options).onMutate)==null?void 0:h.call(p,this.state.variables));d!==this.state.context&&this.dispatch({type:"loading",context:d,variables:this.state.variables})}const l=await e();return await((s=(r=this.mutationCache.config).onSuccess)==null?void 0:s.call(r,l,this.state.variables,this.state.context,this)),await((i=(u=this.options).onSuccess)==null?void 0:i.call(u,l,this.state.variables,this.state.context)),await((o=(f=this.mutationCache.config).onSettled)==null?void 0:o.call(f,l,null,this.state.variables,this.state.context,this)),await((g=(v=this.options).onSettled)==null?void 0:g.call(v,l,null,this.state.variables,this.state.context)),this.dispatch({type:"success",data:l}),l}catch(l){try{var b,Q,O,S,F,P,R,c;throw await((b=(Q=this.mutationCache.config).onError)==null?void 0:b.call(Q,l,this.state.variables,this.state.context,this)),await((O=(S=this.options).onError)==null?void 0:O.call(S,l,this.state.variables,this.state.context)),await((F=(P=this.mutationCache.config).onSettled)==null?void 0:F.call(P,void 0,l,this.state.variables,this.state.context,this)),await((R=(c=this.options).onSettled)==null?void 0:R.call(c,void 0,l,this.state.variables,this.state.context)),l}finally{this.dispatch({type:"error",error:l})}}}dispatch(e){const t=s=>{switch(e.type){case"failed":return{...s,failureCount:e.failureCount,failureReason:e.error};case"pause":return{...s,isPaused:!0};case"continue":return{...s,isPaused:!1};case"loading":return{...s,context:e.context,data:void 0,failureCount:0,failureReason:null,error:null,isPaused:!V(this.options.networkMode),status:"loading",variables:e.variables};case"success":return{...s,data:e.data,failureCount:0,failureReason:null,error:null,status:"success",isPaused:!1};case"error":return{...s,data:void 0,error:e.error,failureCount:s.failureCount+1,failureReason:e.error,isPaused:!1,status:"error"};case"setState":return{...s,...e.state}}};this.state=t(this.state),m.batch(()=>{this.observers.forEach(s=>{s.onMutationUpdate(e)}),this.mutationCache.notify({mutation:this,type:"updated",action:e})})}}function he(){return{context:void 0,data:void 0,error:null,failureCount:0,failureReason:null,isPaused:!1,status:"idle",variables:void 0}}class J extends X{constructor(e){super(),this.config=e||{},this.mutations=[],this.mutationId=0}build(e,t,s){const r=new le({mutationCache:this,logger:e.getLogger(),mutationId:++this.mutationId,options:e.defaultMutationOptions(t),state:s,defaultOptions:t.mutationKey?e.getMutationDefaults(t.mutationKey):void 0});return this.add(r),r}add(e){this.mutations.push(e),this.notify({type:"added",mutation:e})}remove(e){this.mutations=this.mutations.filter(t=>t!==e),this.notify({type:"removed",mutation:e})}clear(){m.batch(()=>{this.mutations.forEach(e=>{this.remove(e)})})}getAll(){return this.mutations}find(e){return typeof e.exact=="undefined"&&(e.exact=!0),this.mutations.find(t=>I(e,t))}findAll(e){return this.mutations.filter(t=>I(e,t))}notify(e){m.batch(()=>{this.listeners.forEach(({listener:t})=>{t(e)})})}resumePausedMutations(){var e;return this.resuming=((e=this.resuming)!=null?e:Promise.resolve()).then(()=>{const t=this.mutations.filter(s=>s.state.isPaused);return m.batch(()=>t.reduce((s,r)=>s.then(()=>r.continue().catch(q)),Promise.resolve()))}).then(()=>{this.resuming=void 0}),this.resuming}}function ce(){return{onFetch:a=>{a.fetchFn=()=>{var e,t,s,r,i,u;const o=(e=a.fetchOptions)==null||(t=e.meta)==null?void 0:t.refetchPage,f=(s=a.fetchOptions)==null||(r=s.meta)==null?void 0:r.fetchMore,g=f==null?void 0:f.pageParam,v=(f==null?void 0:f.direction)==="forward",M=(f==null?void 0:f.direction)==="backward",y=((i=a.state.data)==null?void 0:i.pages)||[],h=((u=a.state.data)==null?void 0:u.pageParams)||[];let p=h,b=!1;const Q=c=>{Object.defineProperty(c,"signal",{enumerable:!0,get:()=>{var l;if((l=a.signal)!=null&&l.aborted)b=!0;else{var d;(d=a.signal)==null||d.addEventListener("abort",()=>{b=!0})}return a.signal}})},O=a.options.queryFn||(()=>Promise.reject("Missing queryFn for queryKey '"+a.options.queryHash+"'")),S=(c,l,d,D)=>(p=D?[l,...p]:[...p,l],D?[d,...c]:[...c,d]),F=(c,l,d,D)=>{if(b)return Promise.reject("Cancelled");if(typeof d=="undefined"&&!l&&c.length)return Promise.resolve(c);const T={queryKey:a.queryKey,pageParam:d,meta:a.options.meta};Q(T);const x=O(T);return Promise.resolve(x).then(Z=>S(c,d,Z,D))};let P;if(!y.length)P=F([]);else if(v){const c=typeof g!="undefined",l=c?g:k(a.options,y);P=F(y,c,l)}else if(M){const c=typeof g!="undefined",l=c?g:de(a.options,y);P=F(y,c,l,!0)}else{p=[];const c=typeof a.options.getNextPageParam=="undefined";P=(o&&y[0]?o(y[0],0,y):!0)?F([],c,h[0]):Promise.resolve(S([],h[0],y[0]));for(let d=1;d<y.length;d++)P=P.then(D=>{if(o&&y[d]?o(y[d],d,y):!0){const x=c?h[d]:k(a.options,D);return F(D,c,x)}return Promise.resolve(S(D,h[d],y[d]))})}return P.then(c=>({pages:c,pageParams:p}))}}}}function k(a,e){return a.getNextPageParam==null?void 0:a.getNextPageParam(e[e.length-1],e)}function de(a,e){return a.getPreviousPageParam==null?void 0:a.getPreviousPageParam(e[0],e)}class fe{constructor(e={}){this.queryCache=e.queryCache||new z,this.mutationCache=e.mutationCache||new J,this.logger=e.logger||_,this.defaultOptions=e.defaultOptions||{},this.queryDefaults=[],this.mutationDefaults=[],this.mountCount=0}mount(){this.mountCount++,this.mountCount===1&&(this.unsubscribeFocus=H.subscribe(()=>{H.isFocused()&&(this.resumePausedMutations(),this.queryCache.onFocus())}),this.unsubscribeOnline=G.subscribe(()=>{G.isOnline()&&(this.resumePausedMutations(),this.queryCache.onOnline())}))}unmount(){var e,t;this.mountCount--,this.mountCount===0&&((e=this.unsubscribeFocus)==null||e.call(this),this.unsubscribeFocus=void 0,(t=this.unsubscribeOnline)==null||t.call(this),this.unsubscribeOnline=void 0)}isFetching(e,t){const[s]=U(e,t);return s.fetchStatus="fetching",this.queryCache.findAll(s).length}isMutating(e){return this.mutationCache.findAll({...e,fetching:!0}).length}getQueryData(e,t){var s;return(s=this.queryCache.find(e,t))==null?void 0:s.state.data}ensureQueryData(e,t,s){const r=w(e,t,s),i=this.getQueryData(r.queryKey);return i?Promise.resolve(i):this.fetchQuery(r)}getQueriesData(e){return this.getQueryCache().findAll(e).map(({queryKey:t,state:s})=>{const r=s.data;return[t,r]})}setQueryData(e,t,s){const r=this.queryCache.find(e),i=r==null?void 0:r.state.data,u=ne(t,i);if(typeof u=="undefined")return;const o=w(e),f=this.defaultQueryOptions(o);return this.queryCache.build(this,f).setData(u,{...s,manual:!0})}setQueriesData(e,t,s){return m.batch(()=>this.getQueryCache().findAll(e).map(({queryKey:r})=>[r,this.setQueryData(r,t,s)]))}getQueryState(e,t){var s;return(s=this.queryCache.find(e,t))==null?void 0:s.state}removeQueries(e,t){const[s]=U(e,t),r=this.queryCache;m.batch(()=>{r.findAll(s).forEach(i=>{r.remove(i)})})}resetQueries(e,t,s){const[r,i]=U(e,t,s),u=this.queryCache,o={type:"active",...r};return m.batch(()=>(u.findAll(r).forEach(f=>{f.reset()}),this.refetchQueries(o,i)))}cancelQueries(e,t,s){const[r,i={}]=U(e,t,s);typeof i.revert=="undefined"&&(i.revert=!0);const u=m.batch(()=>this.queryCache.findAll(r).map(o=>o.cancel(i)));return Promise.all(u).then(q).catch(q)}invalidateQueries(e,t,s){const[r,i]=U(e,t,s);return m.batch(()=>{var u,o;if(this.queryCache.findAll(r).forEach(g=>{g.invalidate()}),r.refetchType==="none")return Promise.resolve();const f={...r,type:(u=(o=r.refetchType)!=null?o:r.type)!=null?u:"active"};return this.refetchQueries(f,i)})}refetchQueries(e,t,s){const[r,i]=U(e,t,s),u=m.batch(()=>this.queryCache.findAll(r).filter(f=>!f.isDisabled()).map(f=>{var g;return f.fetch(void 0,{...i,cancelRefetch:(g=i==null?void 0:i.cancelRefetch)!=null?g:!0,meta:{refetchPage:r.refetchPage}})}));let o=Promise.all(u).then(q);return i!=null&&i.throwOnError||(o=o.catch(q)),o}fetchQuery(e,t,s){const r=w(e,t,s),i=this.defaultQueryOptions(r);typeof i.retry=="undefined"&&(i.retry=!1);const u=this.queryCache.build(this,i);return u.isStaleByTime(i.staleTime)?u.fetch(i):Promise.resolve(u.state.data)}prefetchQuery(e,t,s){return this.fetchQuery(e,t,s).then(q).catch(q)}fetchInfiniteQuery(e,t,s){const r=w(e,t,s);return r.behavior=ce(),this.fetchQuery(r)}prefetchInfiniteQuery(e,t,s){return this.fetchInfiniteQuery(e,t,s).then(q).catch(q)}resumePausedMutations(){return this.mutationCache.resumePausedMutations()}getQueryCache(){return this.queryCache}getMutationCache(){return this.mutationCache}getLogger(){return this.logger}getDefaultOptions(){return this.defaultOptions}setDefaultOptions(e){this.defaultOptions=e}setQueryDefaults(e,t){const s=this.queryDefaults.find(r=>A(e)===A(r.queryKey));s?s.defaultOptions=t:this.queryDefaults.push({queryKey:e,defaultOptions:t})}getQueryDefaults(e){if(!e)return;const t=this.queryDefaults.find(s=>N(e,s.queryKey));return t==null?void 0:t.defaultOptions}setMutationDefaults(e,t){const s=this.mutationDefaults.find(r=>A(e)===A(r.mutationKey));s?s.defaultOptions=t:this.mutationDefaults.push({mutationKey:e,defaultOptions:t})}getMutationDefaults(e){if(!e)return;const t=this.mutationDefaults.find(s=>N(e,s.mutationKey));return t==null?void 0:t.defaultOptions}defaultQueryOptions(e){if(e!=null&&e._defaulted)return e;const t={...this.defaultOptions.queries,...this.getQueryDefaults(e==null?void 0:e.queryKey),...e,_defaulted:!0};return!t.queryHash&&t.queryKey&&(t.queryHash=Y(t.queryKey,t)),typeof t.refetchOnReconnect=="undefined"&&(t.refetchOnReconnect=t.networkMode!=="always"),typeof t.useErrorBoundary=="undefined"&&(t.useErrorBoundary=!!t.suspense),t}defaultMutationOptions(e){return e!=null&&e._defaulted?e:{...this.defaultOptions.mutations,...this.getMutationDefaults(e==null?void 0:e.mutationKey),...e,_defaulted:!0}}clear(){this.queryCache.clear(),this.mutationCache.clear()}}class ye extends z{find(e,t){const s=n(e),r=n(t);return super.find(s,r)}findAll(e,t){const s=n(e),r=n(t);return C(s)?super.findAll(s,r):super.findAll(s)}}class pe extends J{find(e){return super.find(n(e))}findAll(e){return super.findAll(n(e))}}class j extends fe{constructor(e={}){const t=n(e),s={logger:n(t.logger),defaultOptions:n(t.defaultOptions),queryCache:t.queryCache||new ye,mutationCache:t.mutationCache||new pe};super(s),this.isRestoring=$(!1)}isFetching(e,t){const s=n(e),r=n(t);return C(s)?super.isFetching(s,r):super.isFetching(s)}isMutating(e){return super.isMutating(n(e))}getQueryData(e,t){return super.getQueryData(n(e),n(t))}getQueriesData(e){const t=n(e);return C(t)?super.getQueriesData(t):super.getQueriesData(t)}setQueryData(e,t,s){return super.setQueryData(n(e),t,n(s))}setQueriesData(e,t,s){const r=n(e),i=n(s);return C(r)?super.setQueriesData(r,t,i):super.setQueriesData(r,t,i)}getQueryState(e,t){return super.getQueryState(n(e),n(t))}removeQueries(e,t){const s=n(e);return C(s)?super.removeQueries(s,n(t)):super.removeQueries(s)}resetQueries(e,t,s){const r=n(e),i=n(t);return C(r)?super.resetQueries(r,i,n(s)):super.resetQueries(r,i)}cancelQueries(e,t,s){const r=n(e),i=n(t);return C(r)?super.cancelQueries(r,i,n(s)):super.cancelQueries(r,i)}invalidateQueries(e,t,s){const r=n(e),i=n(t);return C(r)?super.invalidateQueries(r,i,n(s)):super.invalidateQueries(r,i)}refetchQueries(e,t,s){const r=n(e),i=n(t);return C(r)?super.refetchQueries(r,i,n(s)):super.refetchQueries(r,i)}fetchQuery(e,t,s){const r=n(e),i=n(t);return C(r)?super.fetchQuery(r,i,n(s)):super.fetchQuery(r)}prefetchQuery(e,t,s){return super.prefetchQuery(n(e),n(t),n(s))}fetchInfiniteQuery(e,t,s){const r=n(e),i=n(t);return C(r)?super.fetchInfiniteQuery(r,i,n(s)):super.fetchInfiniteQuery(r)}prefetchInfiniteQuery(e,t,s){return super.prefetchInfiniteQuery(n(e),n(t),n(s))}setDefaultOptions(e){super.setDefaultOptions(n(e))}setQueryDefaults(e,t){super.setQueryDefaults(n(e),n(t))}getQueryDefaults(e){return super.getQueryDefaults(n(e))}setMutationDefaults(e,t){super.setMutationDefaults(n(e),n(t))}getMutationDefaults(e){return super.getMutationDefaults(n(e))}}const me={install:(a,e={})=>{const t=ae(e.queryClientKey);let s;if("queryClient"in e&&e.queryClient)s=e.queryClient;else if(e.contextSharing&&typeof window!="undefined")if(window.__VUE_QUERY_CONTEXT__)s=window.__VUE_QUERY_CONTEXT__;else{const u="queryClientConfig"in e?e.queryClientConfig:void 0;s=new j(u),window.__VUE_QUERY_CONTEXT__=s}else{const u="queryClientConfig"in e?e.queryClientConfig:void 0;s=new j(u)}B||s.mount();let r=()=>{};if(e.clientPersister){s.isRestoring.value=!0;const[u,o]=e.clientPersister(s);r=u,o.then(()=>{s.isRestoring.value=!1,e.clientPersisterOnSuccess==null||e.clientPersisterOnSuccess(s)})}const i=()=>{s.unmount(),r()};if(a.onUnmount)a.onUnmount(i);else{const u=a.unmount;a.unmount=function(){i(),u()}}a.provide(t,s)}};var Ce=ee(({app:a})=>{me.install(a,{queryClientConfig:{defaultOptions:{queries:{refetchOnWindowFocus:!1,staleTime:1e3*60*60*24}}}})});export{Ce as default};
