"use strict";(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[703],{79902:function(e,t,n){n.d(t,{$:function(){return lV},A:function(){return lG},B:function(){return lf},C:function(){return nV},D:function(){return uW},E:function(){return tP},F:function(){return u9},G:function(){return uO},H:function(){return lj},I:function(){return ea},J:function(){return aq},K:function(){return uU},L:function(){return oD},M:function(){return iN},N:function(){return q},O:function(){return nx},P:function(){return iH},Q:function(){return uJ},R:function(){return Q},S:function(){return og},T:function(){return rw},U:function(){return S},V:function(){return oy},W:function(){return l_},X:function(){return rO},Y:function(){return lm},Z:function(){return lF},_:function(){return p},a:function(){return F},a$:function(){return lH},a0:function(){return rj},a1:function(){return uL},a2:function(){return uR},a3:function(){return uA},a4:function(){return uF},a5:function(){return uV},a6:function(){return u0},a7:function(){return n2},a8:function(){return uk},a9:function(){return lh},aA:function(){return lw},aB:function(){return tH},aC:function(){return t9},aD:function(){return U},aE:function(){return R},aF:function(){return J},aG:function(){return C},aH:function(){return l0},aI:function(){return lZ},aJ:function(){return tQ},aK:function(){return X},aL:function(){return lW},aM:function(){return lJ},aN:function(){return la},aO:function(){return uX},aP:function(){return uZ},aQ:function(){return uH},aR:function(){return lQ},aS:function(){return ll},aT:function(){return lg},aU:function(){return lr},aV:function(){return li},aW:function(){return lu},aX:function(){return le},aY:function(){return lY},aZ:function(){return u7},a_:function(){return u1},aa:function(){return ld},ab:function(){return uP},ac:function(){return uM},ad:function(){return b},ae:function(){return lz},af:function(){return ef},ag:function(){return el},ah:function(){return em},ai:function(){return uq},aj:function(){return uz},ak:function(){return I},al:function(){return uB},am:function(){return r2},an:function(){return nk},ao:function(){return rY},ap:function(){return uh},aq:function(){return uu},ar:function(){return uo},as:function(){return ul},at:function(){return uc},au:function(){return u8},av:function(){return uY},aw:function(){return lp},ax:function(){return ly},ay:function(){return u6},az:function(){return eo},b:function(){return L},b0:function(){return v},b1:function(){return lc},b2:function(){return lX},b3:function(){return lo},c:function(){return t7},d:function(){return D},e:function(){return N},f:function(){return n7},g:function(){return lx},h:function(){return lO},i:function(){return nR},j:function(){return lq},k:function(){return re},l:function(){return rt},m:function(){return ei},n:function(){return rn},o:function(){return rr},p:function(){return es},q:function(){return n3},r:function(){return nf},s:function(){return t4},t:function(){return nC},u:function(){return n5},v:function(){return W},w:function(){return en},x:function(){return u2},y:function(){return er},z:function(){return lt}});var r,i,s,a,o=n(39551),u=n(68804),l=n(71014),c=n(82038),h=n(36384),d=n(20357),f=n(58262).lW;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class m{constructor(e){this.uid=e}isAuthenticated(){return null!=this.uid}toKey(){return this.isAuthenticated()?"uid:"+this.uid:"anonymous-user"}isEqual(e){return e.uid===this.uid}}m.UNAUTHENTICATED=new m(null),m.GOOGLE_CREDENTIALS=new m("google-credentials-uid"),m.FIRST_PARTY=new m("first-party-uid"),m.MOCK_USER=new m("mock-user");/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let g="12.12.0";function p(e){g=e}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let y=new c.Yd("@firebase/firestore");function w(){return y.logLevel}function v(e){y.setLogLevel(e)}function I(e,...t){if(y.logLevel<=c.in.DEBUG){let n=t.map(E);y.debug(`Firestore (${g}): ${e}`,...n)}}function T(e,...t){if(y.logLevel<=c.in.ERROR){let n=t.map(E);y.error(`Firestore (${g}): ${e}`,...n)}}function b(e,...t){if(y.logLevel<=c.in.WARN){let n=t.map(E);y.warn(`Firestore (${g}): ${e}`,...n)}}function E(e){if("string"==typeof e)return e;try{return JSON.stringify(e)}catch(t){return e}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function S(e,t,n){let r="Unexpected state";"string"==typeof t?r=t:n=t,x(e,r,n)}function x(e,t,n){let r=`FIRESTORE (${g}) INTERNAL ASSERTION FAILED: ${t} (ID: ${e.toString(16)})`;if(void 0!==n)try{r+=" CONTEXT: "+JSON.stringify(n)}catch(e){r+=" CONTEXT: "+n}throw T(r),Error(r)}function _(e,t,n,r){let i="Unexpected state";"string"==typeof n?i=n:r=n,e||x(t,i,r)}function C(e,t){e||S(57014,t)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let N={OK:"ok",CANCELLED:"cancelled",UNKNOWN:"unknown",INVALID_ARGUMENT:"invalid-argument",DEADLINE_EXCEEDED:"deadline-exceeded",NOT_FOUND:"not-found",ALREADY_EXISTS:"already-exists",PERMISSION_DENIED:"permission-denied",UNAUTHENTICATED:"unauthenticated",RESOURCE_EXHAUSTED:"resource-exhausted",FAILED_PRECONDITION:"failed-precondition",ABORTED:"aborted",OUT_OF_RANGE:"out-of-range",UNIMPLEMENTED:"unimplemented",INTERNAL:"internal",UNAVAILABLE:"unavailable",DATA_LOSS:"data-loss"};class D extends u.ZR{constructor(e,t){super(e,t),this.code=e,this.message=t,this.toString=()=>`${this.name}: [code=${this.code}]: ${this.message}`}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class k{constructor(){this.promise=new Promise((e,t)=>{this.resolve=e,this.reject=t})}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class A{constructor(e,t){this.user=t,this.type="OAuth",this.headers=new Map,this.headers.set("Authorization",`Bearer ${e}`)}}class R{getToken(){return Promise.resolve(null)}invalidateToken(){}start(e,t){e.enqueueRetryable(()=>t(m.UNAUTHENTICATED))}shutdown(){}}class V{constructor(e){this.token=e,this.changeListener=null}getToken(){return Promise.resolve(this.token)}invalidateToken(){}start(e,t){this.changeListener=t,e.enqueueRetryable(()=>t(this.token.user))}shutdown(){this.changeListener=null}}class F{constructor(e){this.t=e,this.currentUser=m.UNAUTHENTICATED,this.i=0,this.forceRefresh=!1,this.auth=null}start(e,t){_(void 0===this.o,42304);let n=this.i,r=e=>this.i!==n?(n=this.i,t(e)):Promise.resolve(),i=new k;this.o=()=>{this.i++,this.currentUser=this.u(),i.resolve(),i=new k,e.enqueueRetryable(()=>r(this.currentUser))};let s=()=>{let t=i;e.enqueueRetryable(async()=>{await t.promise,await r(this.currentUser)})},a=e=>{I("FirebaseAuthCredentialsProvider","Auth detected"),this.auth=e,this.o&&(this.auth.addAuthTokenListener(this.o),s())};this.t.onInit(e=>a(e)),setTimeout(()=>{if(!this.auth){let e=this.t.getImmediate({optional:!0});e?a(e):(I("FirebaseAuthCredentialsProvider","Auth not yet detected"),i.resolve(),i=new k)}},0),s()}getToken(){let e=this.i,t=this.forceRefresh;return this.forceRefresh=!1,this.auth?this.auth.getToken(t).then(t=>this.i!==e?(I("FirebaseAuthCredentialsProvider","getToken aborted due to token change."),this.getToken()):t?(_("string"==typeof t.accessToken,31837,{l:t}),new A(t.accessToken,this.currentUser)):null):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.auth&&this.o&&this.auth.removeAuthTokenListener(this.o),this.o=void 0}u(){let e=this.auth&&this.auth.getUid();return _(null===e||"string"==typeof e,2055,{h:e}),new m(e)}}class O{constructor(e,t,n){this.P=e,this.T=t,this.I=n,this.type="FirstParty",this.user=m.FIRST_PARTY,this.R=new Map}A(){return this.I?this.I():null}get headers(){this.R.set("X-Goog-AuthUser",this.P);let e=this.A();return e&&this.R.set("Authorization",e),this.T&&this.R.set("X-Goog-Iam-Authorization-Token",this.T),this.R}}class M{constructor(e,t,n){this.P=e,this.T=t,this.I=n}getToken(){return Promise.resolve(new O(this.P,this.T,this.I))}start(e,t){e.enqueueRetryable(()=>t(m.FIRST_PARTY))}shutdown(){}invalidateToken(){}}class P{constructor(e){this.value=e,this.type="AppCheck",this.headers=new Map,e&&e.length>0&&this.headers.set("x-firebase-appcheck",this.value)}}class L{constructor(e,t){this.V=t,this.forceRefresh=!1,this.appCheck=null,this.m=null,this.p=null,(0,o.rh)(e)&&e.settings.appCheckToken&&(this.p=e.settings.appCheckToken)}start(e,t){_(void 0===this.o,3512);let n=e=>{null!=e.error&&I("FirebaseAppCheckTokenProvider",`Error getting App Check token; using placeholder token instead. Error: ${e.error.message}`);let n=e.token!==this.m;return this.m=e.token,I("FirebaseAppCheckTokenProvider",`Received ${n?"new":"existing"} token.`),n?t(e.token):Promise.resolve()};this.o=t=>{e.enqueueRetryable(()=>n(t))};let r=e=>{I("FirebaseAppCheckTokenProvider","AppCheck detected"),this.appCheck=e,this.o&&this.appCheck.addTokenListener(this.o)};this.V.onInit(e=>r(e)),setTimeout(()=>{if(!this.appCheck){let e=this.V.getImmediate({optional:!0});e?r(e):I("FirebaseAppCheckTokenProvider","AppCheck not yet detected")}},0)}getToken(){if(this.p)return Promise.resolve(new P(this.p));let e=this.forceRefresh;return this.forceRefresh=!1,this.appCheck?this.appCheck.getToken(e).then(e=>e?(_("string"==typeof e.token,44558,{tokenResult:e}),this.m=e.token,new P(e.token)):null):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.appCheck&&this.o&&this.appCheck.removeTokenListener(this.o),this.o=void 0}}class U{getToken(){return Promise.resolve(new P(""))}invalidateToken(){}start(e,t){}shutdown(){}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class q{static newId(){let e=62*Math.floor(256/62),t="";for(;t.length<20;){let n=/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function(e){let t="undefined"!=typeof self&&(self.crypto||self.msCrypto),n=new Uint8Array(40);if(t&&"function"==typeof t.getRandomValues)t.getRandomValues(n);else for(let e=0;e<40;e++)n[e]=Math.floor(256*Math.random());return n}(0);for(let r=0;r<n.length;++r)t.length<20&&n[r]<e&&(t+="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789".charAt(n[r]%62))}return t}}function B(e,t){return e<t?-1:e>t?1:0}function z(e,t){let n=Math.min(e.length,t.length);for(let r=0;r<n;r++){let n=e.charAt(r),i=t.charAt(r);if(n!==i)return K(n)===K(i)?B(n,i):K(n)?1:-1}return B(e.length,t.length)}function K(e){let t=e.charCodeAt(0);return t>=55296&&t<=57343}function $(e,t,n){return e.length===t.length&&e.every((e,r)=>n(e,t[r]))}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let G="__name__";class j{constructor(e,t,n){void 0===t?t=0:t>e.length&&S(637,{offset:t,range:e.length}),void 0===n?n=e.length-t:n>e.length-t&&S(1746,{length:n,range:e.length-t}),this.segments=e,this.offset=t,this.len=n}get length(){return this.len}isEqual(e){return 0===j.comparator(this,e)}child(e){let t=this.segments.slice(this.offset,this.limit());return e instanceof j?e.forEach(e=>{t.push(e)}):t.push(e),this.construct(t)}limit(){return this.offset+this.length}popFirst(e){return e=void 0===e?1:e,this.construct(this.segments,this.offset+e,this.length-e)}popLast(){return this.construct(this.segments,this.offset,this.length-1)}firstSegment(){return this.segments[this.offset]}lastSegment(){return this.get(this.length-1)}get(e){return this.segments[this.offset+e]}isEmpty(){return 0===this.length}isPrefixOf(e){if(e.length<this.length)return!1;for(let t=0;t<this.length;t++)if(this.get(t)!==e.get(t))return!1;return!0}isImmediateParentOf(e){if(this.length+1!==e.length)return!1;for(let t=0;t<this.length;t++)if(this.get(t)!==e.get(t))return!1;return!0}forEach(e){for(let t=this.offset,n=this.limit();t<n;t++)e(this.segments[t])}toArray(){return this.segments.slice(this.offset,this.limit())}static comparator(e,t){let n=Math.min(e.length,t.length);for(let r=0;r<n;r++){let n=j.compareSegments(e.get(r),t.get(r));if(0!==n)return n}return B(e.length,t.length)}static compareSegments(e,t){let n=j.isNumericId(e),r=j.isNumericId(t);return n&&!r?-1:!n&&r?1:n&&r?j.extractNumericId(e).compare(j.extractNumericId(t)):z(e,t)}static isNumericId(e){return e.startsWith("__id")&&e.endsWith("__")}static extractNumericId(e){return l.z8.fromString(e.substring(4,e.length-2))}}class Q extends j{construct(e,t,n){return new Q(e,t,n)}canonicalString(){return this.toArray().join("/")}toString(){return this.canonicalString()}toUriEncodedString(){return this.toArray().map(encodeURIComponent).join("/")}static fromString(...e){let t=[];for(let n of e){if(n.indexOf("//")>=0)throw new D(N.INVALID_ARGUMENT,`Invalid segment (${n}). Paths must not contain // in them.`);t.push(...n.split("/").filter(e=>e.length>0))}return new Q(t)}static emptyPath(){return new Q([])}}let H=/^[_a-zA-Z][_a-zA-Z0-9]*$/;class J extends j{construct(e,t,n){return new J(e,t,n)}static isValidIdentifier(e){return H.test(e)}canonicalString(){return this.toArray().map(e=>(e=e.replace(/\\/g,"\\\\").replace(/`/g,"\\`"),J.isValidIdentifier(e)||(e="`"+e+"`"),e)).join(".")}toString(){return this.canonicalString()}isKeyField(){return 1===this.length&&this.get(0)===G}static keyField(){return new J([G])}static fromServerFormat(e){let t=[],n="",r=0,i=()=>{if(0===n.length)throw new D(N.INVALID_ARGUMENT,`Invalid field path (${e}). Paths must not be empty, begin with '.', end with '.', or contain '..'`);t.push(n),n=""},s=!1;for(;r<e.length;){let t=e[r];if("\\"===t){if(r+1===e.length)throw new D(N.INVALID_ARGUMENT,"Path has trailing escape character: "+e);let t=e[r+1];if("\\"!==t&&"."!==t&&"`"!==t)throw new D(N.INVALID_ARGUMENT,"Path has invalid escape sequence: "+e);n+=t,r+=2}else"`"===t?s=!s:"."!==t||s?n+=t:i(),r++}if(i(),s)throw new D(N.INVALID_ARGUMENT,"Unterminated ` in path: "+e);return new J(t)}static emptyPath(){return new J([])}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class W{constructor(e){this.path=e}static fromPath(e){return new W(Q.fromString(e))}static fromName(e){return new W(Q.fromString(e).popFirst(5))}static empty(){return new W(Q.emptyPath())}get collectionGroup(){return this.path.popLast().lastSegment()}hasCollectionId(e){return this.path.length>=2&&this.path.get(this.path.length-2)===e}getCollectionGroup(){return this.path.get(this.path.length-2)}getCollectionPath(){return this.path.popLast()}isEqual(e){return null!==e&&0===Q.comparator(this.path,e.path)}toString(){return this.path.toString()}static comparator(e,t){return Q.comparator(e.path,t.path)}static isDocumentKey(e){return e.length%2==0}static fromSegments(e){return new W(new Q(e.slice()))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Y(e,t,n){if(!n)throw new D(N.INVALID_ARGUMENT,`Function ${e}() cannot be called with an empty ${t}.`)}function X(e,t,n,r){if(!0===t&&!0===r)throw new D(N.INVALID_ARGUMENT,`${e} and ${n} cannot be used together.`)}function Z(e){if(!W.isDocumentKey(e))throw new D(N.INVALID_ARGUMENT,`Invalid document reference. Document references must have an even number of segments, but ${e} has ${e.length}.`)}function ee(e){if(W.isDocumentKey(e))throw new D(N.INVALID_ARGUMENT,`Invalid collection reference. Collection references must have an odd number of segments, but ${e} has ${e.length}.`)}function et(e){return"object"==typeof e&&null!==e&&(Object.getPrototypeOf(e)===Object.prototype||null===Object.getPrototypeOf(e))}function en(e){if(void 0===e)return"undefined";if(null===e)return"null";if("string"==typeof e)return e.length>20&&(e=`${e.substring(0,20)}...`),JSON.stringify(e);if("number"==typeof e||"boolean"==typeof e)return""+e;if("object"==typeof e){if(e instanceof Array)return"an array";{var t;let n=(t=e).constructor?t.constructor.name:null;return n?`a custom ${n} object`:"an object"}}return"function"==typeof e?"a function":S(12329,{type:typeof e})}function er(e,t){if("_delegate"in e&&(e=e._delegate),!(e instanceof t)){if(t.name===e.constructor.name)throw new D(N.INVALID_ARGUMENT,"Type does not match the expected instance. Did you pass a reference from a different Firestore SDK?");{let n=en(e);throw new D(N.INVALID_ARGUMENT,`Expected type '${t.name}', but it was: ${n}`)}}return e}function ei(e,t){if(t<=0)throw new D(N.INVALID_ARGUMENT,`Function ${e}() requires a positive number, but it was: ${t}.`)}/**
 * @license
 * Copyright 2025 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function es(e,t){let n={typeString:e};return t&&(n.value=t),n}function ea(e,t){let n;if(!et(e))throw new D(N.INVALID_ARGUMENT,"JSON must be an object");for(let r in t)if(t[r]){let i=t[r].typeString,s="value"in t[r]?{value:t[r].value}:void 0;if(!(r in e)){n=`JSON missing required field: '${r}'`;break}let a=e[r];if(i&&typeof a!==i){n=`JSON field '${r}' must be a ${i}.`;break}if(void 0!==s&&a!==s.value){n=`Expected '${r}' field to equal '${s.value}'`;break}}if(n)throw new D(N.INVALID_ARGUMENT,n);return!0}class eo{static now(){return eo.fromMillis(Date.now())}static fromDate(e){return eo.fromMillis(e.getTime())}static fromMillis(e){let t=Math.floor(e/1e3);return new eo(t,Math.floor((e-1e3*t)*1e6))}constructor(e,t){if(this.seconds=e,this.nanoseconds=t,t<0||t>=1e9)throw new D(N.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+t);if(e<-62135596800||e>=253402300800)throw new D(N.INVALID_ARGUMENT,"Timestamp seconds out of range: "+e)}toDate(){return new Date(this.toMillis())}toMillis(){return 1e3*this.seconds+this.nanoseconds/1e6}_compareTo(e){return this.seconds===e.seconds?B(this.nanoseconds,e.nanoseconds):B(this.seconds,e.seconds)}isEqual(e){return e.seconds===this.seconds&&e.nanoseconds===this.nanoseconds}toString(){return"Timestamp(seconds="+this.seconds+", nanoseconds="+this.nanoseconds+")"}toJSON(){return{type:eo._jsonSchemaVersion,seconds:this.seconds,nanoseconds:this.nanoseconds}}static fromJSON(e){if(ea(e,eo._jsonSchema))return new eo(e.seconds,e.nanoseconds)}valueOf(){return String(this.seconds- -62135596800).padStart(12,"0")+"."+String(this.nanoseconds).padStart(9,"0")}}eo._jsonSchemaVersion="firestore/timestamp/1.0",eo._jsonSchema={type:es("string",eo._jsonSchemaVersion),seconds:es("number"),nanoseconds:es("number")};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class eu{static fromTimestamp(e){return new eu(e)}static min(){return new eu(new eo(0,0))}static max(){return new eu(new eo(253402300799,999999999))}constructor(e){this.timestamp=e}compareTo(e){return this.timestamp._compareTo(e.timestamp)}isEqual(e){return this.timestamp.isEqual(e.timestamp)}toMicroseconds(){return 1e6*this.timestamp.seconds+this.timestamp.nanoseconds/1e3}toString(){return"SnapshotVersion("+this.timestamp.toString()+")"}toTimestamp(){return this.timestamp}}class el{constructor(e,t,n,r){this.indexId=e,this.collectionGroup=t,this.fields=n,this.indexState=r}}function ec(e){return e.fields.find(e=>2===e.kind)}function eh(e){return e.fields.filter(e=>2!==e.kind)}function ed(e,t){let n=B(e.collectionGroup,t.collectionGroup);if(0!==n)return n;for(let r=0;r<Math.min(e.fields.length,t.fields.length);++r)if(0!==(n=function(e,t){let n=J.comparator(e.fieldPath,t.fieldPath);return 0!==n?n:B(e.kind,t.kind)}(e.fields[r],t.fields[r])))return n;return B(e.fields.length,t.fields.length)}el.UNKNOWN_ID=-1;class ef{constructor(e,t){this.fieldPath=e,this.kind=t}}class em{constructor(e,t){this.sequenceNumber=e,this.offset=t}static empty(){return new em(0,ey.min())}}function eg(e,t){let n=e.toTimestamp().seconds,r=e.toTimestamp().nanoseconds+1;return new ey(eu.fromTimestamp(1e9===r?new eo(n+1,0):new eo(n,r)),W.empty(),t)}function ep(e){return new ey(e.readTime,e.key,-1)}class ey{constructor(e,t,n){this.readTime=e,this.documentKey=t,this.largestBatchId=n}static min(){return new ey(eu.min(),W.empty(),-1)}static max(){return new ey(eu.max(),W.empty(),-1)}}function ew(e,t){let n=e.readTime.compareTo(t.readTime);return 0!==n?n:0!==(n=W.comparator(e.documentKey,t.documentKey))?n:B(e.largestBatchId,t.largestBatchId)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let ev="The current tab is not in the required state to perform this operation. It might be necessary to refresh the browser tab.";class eI{constructor(){this.onCommittedListeners=[]}addOnCommittedListener(e){this.onCommittedListeners.push(e)}raiseOnCommittedEvent(){this.onCommittedListeners.forEach(e=>e())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function eT(e){if(e.code!==N.FAILED_PRECONDITION||e.message!==ev)throw e;I("LocalStore","Unexpectedly lost primary lease")}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class eb{constructor(e){this.nextCallback=null,this.catchCallback=null,this.result=void 0,this.error=void 0,this.isDone=!1,this.callbackAttached=!1,e(e=>{this.isDone=!0,this.result=e,this.nextCallback&&this.nextCallback(e)},e=>{this.isDone=!0,this.error=e,this.catchCallback&&this.catchCallback(e)})}catch(e){return this.next(void 0,e)}next(e,t){return this.callbackAttached&&S(59440),this.callbackAttached=!0,this.isDone?this.error?this.wrapFailure(t,this.error):this.wrapSuccess(e,this.result):new eb((n,r)=>{this.nextCallback=t=>{this.wrapSuccess(e,t).next(n,r)},this.catchCallback=e=>{this.wrapFailure(t,e).next(n,r)}})}toPromise(){return new Promise((e,t)=>{this.next(e,t)})}wrapUserFunction(e){try{let t=e();return t instanceof eb?t:eb.resolve(t)}catch(e){return eb.reject(e)}}wrapSuccess(e,t){return e?this.wrapUserFunction(()=>e(t)):eb.resolve(t)}wrapFailure(e,t){return e?this.wrapUserFunction(()=>e(t)):eb.reject(t)}static resolve(e){return new eb((t,n)=>{t(e)})}static reject(e){return new eb((t,n)=>{n(e)})}static waitFor(e){return new eb((t,n)=>{let r=0,i=0,s=!1;e.forEach(e=>{++r,e.next(()=>{++i,s&&i===r&&t()},e=>n(e))}),s=!0,i===r&&t()})}static or(e){let t=eb.resolve(!1);for(let n of e)t=t.next(e=>e?eb.resolve(e):n());return t}static forEach(e,t){let n=[];return e.forEach((e,r)=>{n.push(t.call(this,e,r))}),this.waitFor(n)}static mapArray(e,t){return new eb((n,r)=>{let i=e.length,s=Array(i),a=0;for(let o=0;o<i;o++){let u=o;t(e[u]).next(e=>{s[u]=e,++a===i&&n(s)},e=>r(e))}})}static doWhile(e,t){return new eb((n,r)=>{let i=()=>{!0===e()?t().next(()=>{i()},r):n()};i()})}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let eE="SimpleDb";class eS{static open(e,t,n,r){try{return new eS(t,e.transaction(r,n))}catch(e){throw new eN(t,e)}}constructor(e,t){this.action=e,this.transaction=t,this.aborted=!1,this.S=new k,this.transaction.oncomplete=()=>{this.S.resolve()},this.transaction.onabort=()=>{t.error?this.S.reject(new eN(e,t.error)):this.S.resolve()},this.transaction.onerror=t=>{let n=eV(t.target.error);this.S.reject(new eN(e,n))}}get D(){return this.S.promise}abort(e){e&&this.S.reject(e),this.aborted||(I(eE,"Aborting transaction:",e?e.message:"Client-initiated abort"),this.aborted=!0,this.transaction.abort())}C(){let e=this.transaction;this.aborted||"function"!=typeof e.commit||e.commit()}store(e){return new ek(this.transaction.objectStore(e))}}class ex{static delete(e){return I(eE,"Removing database:",e),eA((0,u.Rd)().indexedDB.deleteDatabase(e)).toPromise()}static v(){if(!(0,u.hl)())return!1;if(ex.F())return!0;let e=(0,u.z$)(),t=ex.M(e),n=e_(e);return!(e.indexOf("MSIE ")>0||e.indexOf("Trident/")>0||e.indexOf("Edge/")>0||0<t&&t<10||0<n&&n<4.5)}static F(){return void 0!==d&&"YES"===d.__PRIVATE_env?.__PRIVATE_USE_MOCK_PERSISTENCE}static O(e,t){return e.store(t)}static M(e){let t=e.match(/i(?:phone|pad|pod) os ([\d_]+)/i);return Number(t?t[1].split("_").slice(0,2).join("."):"-1")}constructor(e,t,n){this.name=e,this.version=t,this.N=n,this.B=null,12.2===ex.M((0,u.z$)())&&T("Firestore persistence suffers from a bug in iOS 12.2 Safari that may cause your app to stop working. See https://stackoverflow.com/q/56496296/110915 for details and a potential workaround.")}async L(e){return this.db||(I(eE,"Opening database:",this.name),this.db=await new Promise((t,n)=>{let r=indexedDB.open(this.name,this.version);r.onsuccess=e=>{t(e.target.result)},r.onblocked=()=>{n(new eN(e,"Cannot upgrade IndexedDB schema while another tab is open. Close all tabs that access Firestore and reload this page to proceed."))},r.onerror=t=>{let r=t.target.error;"VersionError"===r.name?n(new D(N.FAILED_PRECONDITION,"A newer version of the Firestore SDK was previously used and so the persisted data is not compatible with the version of the SDK you are now using. The SDK will operate with persistence disabled. If you need persistence, please re-upgrade to a newer version of the SDK or else clear the persisted IndexedDB data for your app to start fresh.")):"InvalidStateError"===r.name?n(new D(N.FAILED_PRECONDITION,"Unable to open an IndexedDB connection. This could be due to running in a private browsing session on a browser whose private browsing sessions do not support IndexedDB: "+r)):n(new eN(e,r))},r.onupgradeneeded=e=>{I(eE,'Database "'+this.name+'" requires upgrade from version:',e.oldVersion);let t=e.target.result;this.N.k(t,r.transaction,e.oldVersion,this.version).next(()=>{I(eE,"Database upgrade to version "+this.version+" complete")})}})),this.q&&(this.db.onversionchange=e=>this.q(e)),this.db}K(e){this.q=e,this.db&&(this.db.onversionchange=t=>e(t))}async runTransaction(e,t,n,r){let i="readonly"===t,s=0;for(;;){++s;try{this.db=await this.L(e);let t=eS.open(this.db,e,i?"readonly":"readwrite",n),s=r(t).next(e=>(t.C(),e)).catch(e=>(t.abort(e),eb.reject(e))).toPromise();return s.catch(()=>{}),await t.D,s}catch(t){let e="FirebaseError"!==t.name&&s<3;if(I(eE,"Transaction failed with error:",t.message,"Retrying:",e),this.close(),!e)return Promise.reject(t)}}}close(){this.db&&this.db.close(),this.db=void 0}}function e_(e){let t=e.match(/Android ([\d.]+)/i);return Number(t?t[1].split(".").slice(0,2).join("."):"-1")}class eC{constructor(e){this.U=e,this.$=!1,this.W=null}get isDone(){return this.$}get G(){return this.W}set cursor(e){this.U=e}done(){this.$=!0}j(e){this.W=e}delete(){return eA(this.U.delete())}}class eN extends D{constructor(e,t){super(N.UNAVAILABLE,`IndexedDB transaction '${e}' failed: ${t}`),this.name="IndexedDbTransactionError"}}function eD(e){return"IndexedDbTransactionError"===e.name}class ek{constructor(e){this.store=e}put(e,t){let n;return void 0!==t?(I(eE,"PUT",this.store.name,e,t),n=this.store.put(t,e)):(I(eE,"PUT",this.store.name,"<auto-key>",e),n=this.store.put(e)),eA(n)}add(e){return I(eE,"ADD",this.store.name,e,e),eA(this.store.add(e))}get(e){return eA(this.store.get(e)).next(t=>(void 0===t&&(t=null),I(eE,"GET",this.store.name,e,t),t))}delete(e){return I(eE,"DELETE",this.store.name,e),eA(this.store.delete(e))}count(){return I(eE,"COUNT",this.store.name),eA(this.store.count())}J(e,t){let n=this.options(e,t),r=n.index?this.store.index(n.index):this.store;if("function"==typeof r.getAll){let e=r.getAll(n.range);return new eb((t,n)=>{e.onerror=e=>{n(e.target.error)},e.onsuccess=e=>{t(e.target.result)}})}{let e=this.cursor(n),t=[];return this.H(e,(e,n)=>{t.push(n)}).next(()=>t)}}Z(e,t){let n=this.store.getAll(e,null===t?void 0:t);return new eb((e,t)=>{n.onerror=e=>{t(e.target.error)},n.onsuccess=t=>{e(t.target.result)}})}X(e,t){I(eE,"DELETE ALL",this.store.name);let n=this.options(e,t);n.Y=!1;let r=this.cursor(n);return this.H(r,(e,t,n)=>n.delete())}ee(e,t){let n;t?n=e:(n={},t=e);let r=this.cursor(n);return this.H(r,t)}te(e){let t=this.cursor({});return new eb((n,r)=>{t.onerror=e=>{r(eV(e.target.error))},t.onsuccess=t=>{let r=t.target.result;r?e(r.primaryKey,r.value).next(e=>{e?r.continue():n()}):n()}})}H(e,t){let n=[];return new eb((r,i)=>{e.onerror=e=>{i(e.target.error)},e.onsuccess=e=>{let i=e.target.result;if(!i)return void r();let s=new eC(i),a=t(i.primaryKey,i.value,s);if(a instanceof eb){let e=a.catch(e=>(s.done(),eb.reject(e)));n.push(e)}s.isDone?r():null===s.G?i.continue():i.continue(s.G)}}).next(()=>eb.waitFor(n))}options(e,t){let n;return void 0!==e&&("string"==typeof e?n=e:t=e),{index:n,range:t}}cursor(e){let t="next";if(e.reverse&&(t="prev"),e.index){let n=this.store.index(e.index);return e.Y?n.openKeyCursor(e.range,t):n.openCursor(e.range,t)}return this.store.openCursor(e.range,t)}}function eA(e){return new eb((t,n)=>{e.onsuccess=e=>{t(e.target.result)},e.onerror=e=>{n(eV(e.target.error))}})}let eR=!1;function eV(e){let t=ex.M((0,u.z$)());if(t>=12.2&&t<13){let t="An internal error was encountered in the Indexed Database server";if(e.message.indexOf(t)>=0){let e=new D("internal",`IOS_INDEXEDDB_BUG1: IndexedDb has thrown '${t}'. This is likely due to an unavoidable bug in iOS. See https://stackoverflow.com/q/56496296/110915 for details and a potential workaround.`);return eR||(eR=!0,setTimeout(()=>{throw e},0)),e}}return e}let eF="IndexBackfiller";class eO{constructor(e,t){this.asyncQueue=e,this.ne=t,this.task=null}start(){this.re(15e3)}stop(){this.task&&(this.task.cancel(),this.task=null)}get started(){return null!==this.task}re(e){I(eF,`Scheduled in ${e}ms`),this.task=this.asyncQueue.enqueueAfterDelay("index_backfill",e,async()=>{this.task=null;try{let e=await this.ne.ie();I(eF,`Documents written: ${e}`)}catch(e){eD(e)?I(eF,"Ignoring IndexedDB error during index backfill: ",e):await eT(e)}await this.re(6e4)})}}class eM{constructor(e,t){this.localStore=e,this.persistence=t}async ie(e=50){return this.persistence.runTransaction("Backfill Indexes","readwrite-primary",t=>this.se(t,e))}se(e,t){let n=new Set,r=t,i=!0;return eb.doWhile(()=>!0===i&&r>0,()=>this.localStore.indexManager.getNextCollectionGroupToUpdate(e).next(t=>{if(null!==t&&!n.has(t))return I(eF,`Processing collection: ${t}`),this.oe(e,t,r).next(e=>{r-=e,n.add(t)});i=!1})).next(()=>t-r)}oe(e,t,n){return this.localStore.indexManager.getMinOffsetFromCollectionGroup(e,t).next(r=>this.localStore.localDocuments.getNextDocuments(e,t,r,n).next(n=>{let i=n.changes;return this.localStore.indexManager.updateIndexEntries(e,i).next(()=>this._e(r,n)).next(n=>(I(eF,`Updating offset: ${n}`),this.localStore.indexManager.updateCollectionGroup(e,t,n))).next(()=>i.size)}))}_e(e,t){let n=e;return t.changes.forEach((e,t)=>{let r=ep(t);ew(r,n)>0&&(n=r)}),new ey(n.readTime,n.documentKey,Math.max(t.batchId,e.largestBatchId))}}/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class eP{constructor(e,t){this.previousValue=e,t&&(t.sequenceNumberHandler=e=>this.ae(e),this.ue=e=>t.writeSequenceNumber(e))}ae(e){return this.previousValue=Math.max(e,this.previousValue),this.previousValue}next(){let e=++this.previousValue;return this.ue&&this.ue(e),e}}function eL(e){return null==e}function eU(e){return 0===e&&1/e==-1/0}function eq(e){return"number"==typeof e&&Number.isInteger(e)&&!eU(e)&&e<=Number.MAX_SAFE_INTEGER&&e>=Number.MIN_SAFE_INTEGER}function eB(e){let t="";for(let n=0;n<e.length;n++)t.length>0&&(t+="\x01\x01"),t=function(e,t){let n=t,r=e.length;for(let t=0;t<r;t++){let r=e.charAt(t);switch(r){case"\0":n+="\x01\x10";break;case"\x01":n+="\x01\x11";break;default:n+=r}}return n}(e.get(n),t);return t+"\x01\x01"}function ez(e){let t=e.length;if(_(t>=2,64408,{path:e}),2===t)return _("\x01"===e.charAt(0)&&"\x01"===e.charAt(1),56145,{path:e}),Q.emptyPath();let n=t-2,r=[],i="";for(let s=0;s<t;){let t=e.indexOf("\x01",s);switch((t<0||t>n)&&S(50515,{path:e}),e.charAt(t+1)){case"\x01":let a;let o=e.substring(s,t);0===i.length?a=o:(i+=o,a=i,i=""),r.push(a);break;case"\x10":i+=e.substring(s,t)+"\0";break;case"\x11":i+=e.substring(s,t+1);break;default:S(61167,{path:e})}s=t+2}return new Q(r)}eP.ce=-1;/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let eK="remoteDocuments",e$="owner",eG="owner",ej="mutationQueues",eQ="mutations",eH="batchId",eJ="userMutationsIndex",eW=["userId","batchId"],eY={},eX="documentMutations",eZ="remoteDocumentsV14",e0=["prefixPath","collectionGroup","readTime","documentId"],e1="documentKeyIndex",e2=["prefixPath","collectionGroup","documentId"],e4="collectionGroupIndex",e5=["collectionGroup","readTime","prefixPath","documentId"],e3="remoteDocumentGlobal",e6="remoteDocumentGlobalKey",e8="targets",e9="queryTargetsIndex",e7=["canonicalId","targetId"],te="targetDocuments",tt=["targetId","path"],tn="documentTargetsIndex",tr=["path","targetId"],ti="targetGlobalKey",ts="targetGlobal",ta="collectionParents",to=["collectionId","parent"],tu="clientMetadata",tl="bundles",tc="namedQueries",th="indexConfiguration",td="collectionGroupIndex",tf="indexState",tm=["indexId","uid"],tg="sequenceNumberIndex",tp=["uid","sequenceNumber"],ty="indexEntries",tw=["indexId","uid","arrayValue","directionalValue","orderedDocumentKey","documentKey"],tv="documentKeyIndex",tI=["indexId","uid","orderedDocumentKey"],tT="documentOverlays",tb=["userId","collectionPath","documentId"],tE="collectionPathOverlayIndex",tS=["userId","collectionPath","largestBatchId"],tx="collectionGroupOverlayIndex",t_=["userId","collectionGroup","largestBatchId"],tC="globals",tN=[ej,eQ,eX,eK,e8,e$,ts,te,tu,e3,ta,tl,tc],tD=[...tN,tT],tk=[ej,eQ,eX,eZ,e8,e$,ts,te,tu,e3,ta,tl,tc,tT],tA=[...tk,th,tf,ty],tR=[...tA,tC];/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class tV extends eI{constructor(e,t){super(),this.le=e,this.currentSequenceNumber=t}}function tF(e,t){return ex.O(e.le,t)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function tO(e){let t=0;for(let n in e)Object.prototype.hasOwnProperty.call(e,n)&&t++;return t}function tM(e,t){for(let n in e)Object.prototype.hasOwnProperty.call(e,n)&&t(n,e[n])}function tP(e,t){let n=[];for(let r in e)Object.prototype.hasOwnProperty.call(e,r)&&n.push(t(e[r],r,e));return n}function tL(e){for(let t in e)if(Object.prototype.hasOwnProperty.call(e,t))return!1;return!0}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class tU{constructor(e,t){this.comparator=e,this.root=t||tB.EMPTY}insert(e,t){return new tU(this.comparator,this.root.insert(e,t,this.comparator).copy(null,null,tB.BLACK,null,null))}remove(e){return new tU(this.comparator,this.root.remove(e,this.comparator).copy(null,null,tB.BLACK,null,null))}get(e){let t=this.root;for(;!t.isEmpty();){let n=this.comparator(e,t.key);if(0===n)return t.value;n<0?t=t.left:n>0&&(t=t.right)}return null}indexOf(e){let t=0,n=this.root;for(;!n.isEmpty();){let r=this.comparator(e,n.key);if(0===r)return t+n.left.size;r<0?n=n.left:(t+=n.left.size+1,n=n.right)}return -1}isEmpty(){return this.root.isEmpty()}get size(){return this.root.size}minKey(){return this.root.minKey()}maxKey(){return this.root.maxKey()}inorderTraversal(e){return this.root.inorderTraversal(e)}forEach(e){this.inorderTraversal((t,n)=>(e(t,n),!1))}toString(){let e=[];return this.inorderTraversal((t,n)=>(e.push(`${t}:${n}`),!1)),`{${e.join(", ")}}`}reverseTraversal(e){return this.root.reverseTraversal(e)}getIterator(){return new tq(this.root,null,this.comparator,!1)}getIteratorFrom(e){return new tq(this.root,e,this.comparator,!1)}getReverseIterator(){return new tq(this.root,null,this.comparator,!0)}getReverseIteratorFrom(e){return new tq(this.root,e,this.comparator,!0)}}class tq{constructor(e,t,n,r){this.isReverse=r,this.nodeStack=[];let i=1;for(;!e.isEmpty();)if(i=t?n(e.key,t):1,t&&r&&(i*=-1),i<0)e=this.isReverse?e.left:e.right;else{if(0===i){this.nodeStack.push(e);break}this.nodeStack.push(e),e=this.isReverse?e.right:e.left}}getNext(){let e=this.nodeStack.pop(),t={key:e.key,value:e.value};if(this.isReverse)for(e=e.left;!e.isEmpty();)this.nodeStack.push(e),e=e.right;else for(e=e.right;!e.isEmpty();)this.nodeStack.push(e),e=e.left;return t}hasNext(){return this.nodeStack.length>0}peek(){if(0===this.nodeStack.length)return null;let e=this.nodeStack[this.nodeStack.length-1];return{key:e.key,value:e.value}}}class tB{constructor(e,t,n,r,i){this.key=e,this.value=t,this.color=null!=n?n:tB.RED,this.left=null!=r?r:tB.EMPTY,this.right=null!=i?i:tB.EMPTY,this.size=this.left.size+1+this.right.size}copy(e,t,n,r,i){return new tB(null!=e?e:this.key,null!=t?t:this.value,null!=n?n:this.color,null!=r?r:this.left,null!=i?i:this.right)}isEmpty(){return!1}inorderTraversal(e){return this.left.inorderTraversal(e)||e(this.key,this.value)||this.right.inorderTraversal(e)}reverseTraversal(e){return this.right.reverseTraversal(e)||e(this.key,this.value)||this.left.reverseTraversal(e)}min(){return this.left.isEmpty()?this:this.left.min()}minKey(){return this.min().key}maxKey(){return this.right.isEmpty()?this.key:this.right.maxKey()}insert(e,t,n){let r=this,i=n(e,r.key);return(r=i<0?r.copy(null,null,null,r.left.insert(e,t,n),null):0===i?r.copy(null,t,null,null,null):r.copy(null,null,null,null,r.right.insert(e,t,n))).fixUp()}removeMin(){if(this.left.isEmpty())return tB.EMPTY;let e=this;return e.left.isRed()||e.left.left.isRed()||(e=e.moveRedLeft()),(e=e.copy(null,null,null,e.left.removeMin(),null)).fixUp()}remove(e,t){let n,r=this;if(0>t(e,r.key))r.left.isEmpty()||r.left.isRed()||r.left.left.isRed()||(r=r.moveRedLeft()),r=r.copy(null,null,null,r.left.remove(e,t),null);else{if(r.left.isRed()&&(r=r.rotateRight()),r.right.isEmpty()||r.right.isRed()||r.right.left.isRed()||(r=r.moveRedRight()),0===t(e,r.key)){if(r.right.isEmpty())return tB.EMPTY;n=r.right.min(),r=r.copy(n.key,n.value,null,null,r.right.removeMin())}r=r.copy(null,null,null,null,r.right.remove(e,t))}return r.fixUp()}isRed(){return this.color}fixUp(){let e=this;return e.right.isRed()&&!e.left.isRed()&&(e=e.rotateLeft()),e.left.isRed()&&e.left.left.isRed()&&(e=e.rotateRight()),e.left.isRed()&&e.right.isRed()&&(e=e.colorFlip()),e}moveRedLeft(){let e=this.colorFlip();return e.right.left.isRed()&&(e=(e=(e=e.copy(null,null,null,null,e.right.rotateRight())).rotateLeft()).colorFlip()),e}moveRedRight(){let e=this.colorFlip();return e.left.left.isRed()&&(e=(e=e.rotateRight()).colorFlip()),e}rotateLeft(){let e=this.copy(null,null,tB.RED,null,this.right.left);return this.right.copy(null,null,this.color,e,null)}rotateRight(){let e=this.copy(null,null,tB.RED,this.left.right,null);return this.left.copy(null,null,this.color,null,e)}colorFlip(){let e=this.left.copy(null,null,!this.left.color,null,null),t=this.right.copy(null,null,!this.right.color,null,null);return this.copy(null,null,!this.color,e,t)}checkMaxDepth(){return Math.pow(2,this.check())<=this.size+1}check(){if(this.isRed()&&this.left.isRed())throw S(43730,{key:this.key,value:this.value});if(this.right.isRed())throw S(14113,{key:this.key,value:this.value});let e=this.left.check();if(e!==this.right.check())throw S(27949);return e+(this.isRed()?0:1)}}tB.EMPTY=null,tB.RED=!0,tB.BLACK=!1,tB.EMPTY=new class{constructor(){this.size=0}get key(){throw S(57766)}get value(){throw S(16141)}get color(){throw S(16727)}get left(){throw S(29726)}get right(){throw S(36894)}copy(e,t,n,r,i){return this}insert(e,t,n){return new tB(e,t)}remove(e,t){return this}isEmpty(){return!0}inorderTraversal(e){return!1}reverseTraversal(e){return!1}minKey(){return null}maxKey(){return null}isRed(){return!1}checkMaxDepth(){return!0}check(){return 0}};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class tz{constructor(e){this.comparator=e,this.data=new tU(this.comparator)}has(e){return null!==this.data.get(e)}first(){return this.data.minKey()}last(){return this.data.maxKey()}get size(){return this.data.size}indexOf(e){return this.data.indexOf(e)}forEach(e){this.data.inorderTraversal((t,n)=>(e(t),!1))}forEachInRange(e,t){let n=this.data.getIteratorFrom(e[0]);for(;n.hasNext();){let r=n.getNext();if(this.comparator(r.key,e[1])>=0)return;t(r.key)}}forEachWhile(e,t){let n;for(n=void 0!==t?this.data.getIteratorFrom(t):this.data.getIterator();n.hasNext();)if(!e(n.getNext().key))return}firstAfterOrEqual(e){let t=this.data.getIteratorFrom(e);return t.hasNext()?t.getNext().key:null}getIterator(){return new tK(this.data.getIterator())}getIteratorFrom(e){return new tK(this.data.getIteratorFrom(e))}add(e){return this.copy(this.data.remove(e).insert(e,!0))}delete(e){return this.has(e)?this.copy(this.data.remove(e)):this}isEmpty(){return this.data.isEmpty()}unionWith(e){let t=this;return t.size<e.size&&(t=e,e=this),e.forEach(e=>{t=t.add(e)}),t}isEqual(e){if(!(e instanceof tz)||this.size!==e.size)return!1;let t=this.data.getIterator(),n=e.data.getIterator();for(;t.hasNext();){let e=t.getNext().key,r=n.getNext().key;if(0!==this.comparator(e,r))return!1}return!0}toArray(){let e=[];return this.forEach(t=>{e.push(t)}),e}toString(){let e=[];return this.forEach(t=>e.push(t)),"SortedSet("+e.toString()+")"}copy(e){let t=new tz(this.comparator);return t.data=e,t}}class tK{constructor(e){this.iter=e}getNext(){return this.iter.getNext().key}hasNext(){return this.iter.hasNext()}}function t$(e){return e.hasNext()?e.getNext():void 0}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class tG{constructor(e){this.fields=e,e.sort(J.comparator)}static empty(){return new tG([])}unionWith(e){let t=new tz(J.comparator);for(let e of this.fields)t=t.add(e);for(let n of e)t=t.add(n);return new tG(t.toArray())}covers(e){for(let t of this.fields)if(t.isPrefixOf(e))return!0;return!1}isEqual(e){return $(this.fields,e.fields,(e,t)=>e.isEqual(t))}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class tj extends Error{constructor(){super(...arguments),this.name="Base64DecodeError"}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function tQ(){return"undefined"!=typeof atob}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class tH{constructor(e){this.binaryString=e}static fromBase64String(e){return new tH(function(e){try{return atob(e)}catch(e){throw"undefined"!=typeof DOMException&&e instanceof DOMException?new tj("Invalid base64 string: "+e):e}}(e))}static fromUint8Array(e){return new tH(function(e){let t="";for(let n=0;n<e.length;++n)t+=String.fromCharCode(e[n]);return t}(e))}[Symbol.iterator](){let e=0;return{next:()=>e<this.binaryString.length?{value:this.binaryString.charCodeAt(e++),done:!1}:{value:void 0,done:!0}}}toBase64(){return btoa(this.binaryString)}toUint8Array(){return function(e){let t=new Uint8Array(e.length);for(let n=0;n<e.length;n++)t[n]=e.charCodeAt(n);return t}(this.binaryString)}approximateByteSize(){return 2*this.binaryString.length}compareTo(e){return B(this.binaryString,e.binaryString)}isEqual(e){return this.binaryString===e.binaryString}}tH.EMPTY_BYTE_STRING=new tH("");let tJ=new RegExp(/^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d(?:\.(\d+))?Z$/);function tW(e){if(_(!!e,39018),"string"==typeof e){let t=0,n=tJ.exec(e);if(_(!!n,46558,{timestamp:e}),n[1]){let e=n[1];t=Number(e=(e+"000000000").substr(0,9))}return{seconds:Math.floor(new Date(e).getTime()/1e3),nanos:t}}return{seconds:tY(e.seconds),nanos:tY(e.nanos)}}function tY(e){return"number"==typeof e?e:"string"==typeof e?Number(e):0}function tX(e){return"string"==typeof e?tH.fromBase64String(e):tH.fromUint8Array(e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let tZ="server_timestamp",t0="__type__",t1="__previous_value__",t2="__local_write_time__";function t4(e){return(e?.mapValue?.fields||{})[t0]?.stringValue===tZ}function t5(e){let t=e.mapValue.fields[t1];return t4(t)?t5(t):t}function t3(e){let t=tW(e.mapValue.fields[t2].timestampValue);return new eo(t.seconds,t.nanos)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class t6{constructor(e,t,n,r,i,s,a,o,u,l,c){this.databaseId=e,this.appId=t,this.persistenceKey=n,this.host=r,this.ssl=i,this.forceLongPolling=s,this.autoDetectLongPolling=a,this.longPollingOptions=o,this.useFetchStreams=u,this.isUsingEmulator=l,this.apiKey=c}}let t8="(default)";class t9{constructor(e,t){this.projectId=e,this.database=t||t8}static empty(){return new t9("","")}get isDefaultDatabase(){return this.database===t8}isEqual(e){return e instanceof t9&&e.projectId===this.projectId&&e.database===this.database}}function t7(e,t){if(!Object.prototype.hasOwnProperty.apply(e.options,["projectId"]))throw new D(N.INVALID_ARGUMENT,'"projectId" not provided in firebase.initializeApp.');return new t9(e.options.projectId,t)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let ne="__type__",nt="__max__",nn={mapValue:{fields:{__type__:{stringValue:nt}}}},nr="__vector__",ni="value",ns={nullValue:"NULL_VALUE"};function na(e){return"nullValue"in e?0:"booleanValue"in e?1:"integerValue"in e||"doubleValue"in e?2:"timestampValue"in e?3:"stringValue"in e?5:"bytesValue"in e?6:"referenceValue"in e?7:"geoPointValue"in e?8:"arrayValue"in e?9:"mapValue"in e?t4(e)?4:nT(e)?9007199254740991:nv(e)?10:11:S(28295,{value:e})}function no(e,t){if(e===t)return!0;let n=na(e);if(n!==na(t))return!1;switch(n){case 0:case 9007199254740991:return!0;case 1:return e.booleanValue===t.booleanValue;case 4:return t3(e).isEqual(t3(t));case 3:return function(e,t){if("string"==typeof e.timestampValue&&"string"==typeof t.timestampValue&&e.timestampValue.length===t.timestampValue.length)return e.timestampValue===t.timestampValue;let n=tW(e.timestampValue),r=tW(t.timestampValue);return n.seconds===r.seconds&&n.nanos===r.nanos}(e,t);case 5:return e.stringValue===t.stringValue;case 6:return tX(e.bytesValue).isEqual(tX(t.bytesValue));case 7:return e.referenceValue===t.referenceValue;case 8:return tY(e.geoPointValue.latitude)===tY(t.geoPointValue.latitude)&&tY(e.geoPointValue.longitude)===tY(t.geoPointValue.longitude);case 2:return function(e,t){if("integerValue"in e&&"integerValue"in t)return tY(e.integerValue)===tY(t.integerValue);if("doubleValue"in e&&"doubleValue"in t){let n=tY(e.doubleValue),r=tY(t.doubleValue);return n===r?eU(n)===eU(r):isNaN(n)&&isNaN(r)}return!1}(e,t);case 9:return $(e.arrayValue.values||[],t.arrayValue.values||[],no);case 10:case 11:return function(e,t){let n=e.mapValue.fields||{},r=t.mapValue.fields||{};if(tO(n)!==tO(r))return!1;for(let e in n)if(n.hasOwnProperty(e)&&(void 0===r[e]||!no(n[e],r[e])))return!1;return!0}(e,t);default:return S(52216,{left:e})}}function nu(e,t){return void 0!==(e.values||[]).find(e=>no(e,t))}function nl(e,t){if(e===t)return 0;let n=na(e),r=na(t);if(n!==r)return B(n,r);switch(n){case 0:case 9007199254740991:return 0;case 1:return B(e.booleanValue,t.booleanValue);case 2:return function(e,t){let n=tY(e.integerValue||e.doubleValue),r=tY(t.integerValue||t.doubleValue);return n<r?-1:n>r?1:n===r?0:isNaN(n)?isNaN(r)?0:-1:1}(e,t);case 3:return nc(e.timestampValue,t.timestampValue);case 4:return nc(t3(e),t3(t));case 5:return z(e.stringValue,t.stringValue);case 6:return function(e,t){let n=tX(e),r=tX(t);return n.compareTo(r)}(e.bytesValue,t.bytesValue);case 7:return function(e,t){let n=e.split("/"),r=t.split("/");for(let e=0;e<n.length&&e<r.length;e++){let t=B(n[e],r[e]);if(0!==t)return t}return B(n.length,r.length)}(e.referenceValue,t.referenceValue);case 8:return function(e,t){let n=B(tY(e.latitude),tY(t.latitude));return 0!==n?n:B(tY(e.longitude),tY(t.longitude))}(e.geoPointValue,t.geoPointValue);case 9:return nh(e.arrayValue,t.arrayValue);case 10:return function(e,t){let n=e.fields||{},r=t.fields||{},i=n[ni]?.arrayValue,s=r[ni]?.arrayValue,a=B(i?.values?.length||0,s?.values?.length||0);return 0!==a?a:nh(i,s)}(e.mapValue,t.mapValue);case 11:return function(e,t){if(e===nn.mapValue&&t===nn.mapValue)return 0;if(e===nn.mapValue)return 1;if(t===nn.mapValue)return -1;let n=e.fields||{},r=Object.keys(n),i=t.fields||{},s=Object.keys(i);r.sort(),s.sort();for(let e=0;e<r.length&&e<s.length;++e){let t=z(r[e],s[e]);if(0!==t)return t;let a=nl(n[r[e]],i[s[e]]);if(0!==a)return a}return B(r.length,s.length)}(e.mapValue,t.mapValue);default:throw S(23264,{he:n})}}function nc(e,t){if("string"==typeof e&&"string"==typeof t&&e.length===t.length)return B(e,t);let n=tW(e),r=tW(t),i=B(n.seconds,r.seconds);return 0!==i?i:B(n.nanos,r.nanos)}function nh(e,t){let n=e.values||[],r=t.values||[];for(let e=0;e<n.length&&e<r.length;++e){let t=nl(n[e],r[e]);if(t)return t}return B(n.length,r.length)}function nd(e){var t,n;return"nullValue"in e?"null":"booleanValue"in e?""+e.booleanValue:"integerValue"in e?""+e.integerValue:"doubleValue"in e?""+e.doubleValue:"timestampValue"in e?function(e){let t=tW(e);return`time(${t.seconds},${t.nanos})`}(e.timestampValue):"stringValue"in e?e.stringValue:"bytesValue"in e?tX(e.bytesValue).toBase64():"referenceValue"in e?(t=e.referenceValue,W.fromName(t).toString()):"geoPointValue"in e?(n=e.geoPointValue,`geo(${n.latitude},${n.longitude})`):"arrayValue"in e?function(e){let t="[",n=!0;for(let r of e.values||[])n?n=!1:t+=",",t+=nd(r);return t+"]"}(e.arrayValue):"mapValue"in e?function(e){let t=Object.keys(e.fields||{}).sort(),n="{",r=!0;for(let i of t)r?r=!1:n+=",",n+=`${i}:${nd(e.fields[i])}`;return n+"}"}(e.mapValue):S(61005,{value:e})}function nf(e,t){return{referenceValue:`projects/${e.projectId}/databases/${e.database}/documents/${t.path.canonicalString()}`}}function nm(e){return!!e&&"integerValue"in e}function ng(e){return!!e&&"arrayValue"in e}function np(e){return!!e&&"nullValue"in e}function ny(e){return!!e&&"doubleValue"in e&&isNaN(Number(e.doubleValue))}function nw(e){return!!e&&"mapValue"in e}function nv(e){return(e?.mapValue?.fields||{})[ne]?.stringValue===nr}function nI(e){if(e.geoPointValue)return{geoPointValue:{...e.geoPointValue}};if(e.timestampValue&&"object"==typeof e.timestampValue)return{timestampValue:{...e.timestampValue}};if(e.mapValue){let t={mapValue:{fields:{}}};return tM(e.mapValue.fields,(e,n)=>t.mapValue.fields[e]=nI(n)),t}if(e.arrayValue){let t={arrayValue:{values:[]}};for(let n=0;n<(e.arrayValue.values||[]).length;++n)t.arrayValue.values[n]=nI(e.arrayValue.values[n]);return t}return{...e}}function nT(e){return(((e.mapValue||{}).fields||{}).__type__||{}).stringValue===nt}let nb={mapValue:{fields:{[ne]:{stringValue:nr},[ni]:{arrayValue:{}}}}};function nE(e,t){let n=nl(e.value,t.value);return 0!==n?n:e.inclusive&&!t.inclusive?-1:!e.inclusive&&t.inclusive?1:0}function nS(e,t){let n=nl(e.value,t.value);return 0!==n?n:e.inclusive&&!t.inclusive?1:!e.inclusive&&t.inclusive?-1:0}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class nx{constructor(e){this.value=e}static empty(){return new nx({mapValue:{}})}field(e){if(e.isEmpty())return this.value;{let t=this.value;for(let n=0;n<e.length-1;++n)if(!nw(t=(t.mapValue.fields||{})[e.get(n)]))return null;return(t=(t.mapValue.fields||{})[e.lastSegment()])||null}}set(e,t){this.getFieldsMap(e.popLast())[e.lastSegment()]=nI(t)}setAll(e){let t=J.emptyPath(),n={},r=[];e.forEach((e,i)=>{if(!t.isImmediateParentOf(i)){let e=this.getFieldsMap(t);this.applyChanges(e,n,r),n={},r=[],t=i.popLast()}e?n[i.lastSegment()]=nI(e):r.push(i.lastSegment())});let i=this.getFieldsMap(t);this.applyChanges(i,n,r)}delete(e){let t=this.field(e.popLast());nw(t)&&t.mapValue.fields&&delete t.mapValue.fields[e.lastSegment()]}isEqual(e){return no(this.value,e.value)}getFieldsMap(e){let t=this.value;t.mapValue.fields||(t.mapValue={fields:{}});for(let n=0;n<e.length;++n){let r=t.mapValue.fields[e.get(n)];nw(r)&&r.mapValue.fields||(r={mapValue:{fields:{}}},t.mapValue.fields[e.get(n)]=r),t=r}return t.mapValue.fields}applyChanges(e,t,n){for(let r of(tM(t,(t,n)=>e[t]=n),n))delete e[r]}clone(){return new nx(nI(this.value))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class n_{constructor(e,t,n,r,i,s,a){this.key=e,this.documentType=t,this.version=n,this.readTime=r,this.createTime=i,this.data=s,this.documentState=a}static newInvalidDocument(e){return new n_(e,0,eu.min(),eu.min(),eu.min(),nx.empty(),0)}static newFoundDocument(e,t,n,r){return new n_(e,1,t,eu.min(),n,r,0)}static newNoDocument(e,t){return new n_(e,2,t,eu.min(),eu.min(),nx.empty(),0)}static newUnknownDocument(e,t){return new n_(e,3,t,eu.min(),eu.min(),nx.empty(),2)}convertToFoundDocument(e,t){return this.createTime.isEqual(eu.min())&&(2===this.documentType||0===this.documentType)&&(this.createTime=e),this.version=e,this.documentType=1,this.data=t,this.documentState=0,this}convertToNoDocument(e){return this.version=e,this.documentType=2,this.data=nx.empty(),this.documentState=0,this}convertToUnknownDocument(e){return this.version=e,this.documentType=3,this.data=nx.empty(),this.documentState=2,this}setHasCommittedMutations(){return this.documentState=2,this}setHasLocalMutations(){return this.documentState=1,this.version=eu.min(),this}setReadTime(e){return this.readTime=e,this}get hasLocalMutations(){return 1===this.documentState}get hasCommittedMutations(){return 2===this.documentState}get hasPendingWrites(){return this.hasLocalMutations||this.hasCommittedMutations}isValidDocument(){return 0!==this.documentType}isFoundDocument(){return 1===this.documentType}isNoDocument(){return 2===this.documentType}isUnknownDocument(){return 3===this.documentType}isEqual(e){return e instanceof n_&&this.key.isEqual(e.key)&&this.version.isEqual(e.version)&&this.documentType===e.documentType&&this.documentState===e.documentState&&this.data.isEqual(e.data)}mutableCopy(){return new n_(this.key,this.documentType,this.version,this.readTime,this.createTime,this.data.clone(),this.documentState)}toString(){return`Document(${this.key}, ${this.version}, ${JSON.stringify(this.data.value)}, {createTime: ${this.createTime}}), {documentType: ${this.documentType}}), {documentState: ${this.documentState}})`}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class nC{constructor(e,t){this.position=e,this.inclusive=t}}function nN(e,t,n){let r=0;for(let i=0;i<e.position.length;i++){let s=t[i],a=e.position[i];if(r=s.field.isKeyField()?W.comparator(W.fromName(a.referenceValue),n.key):nl(a,n.data.field(s.field)),"desc"===s.dir&&(r*=-1),0!==r)break}return r}function nD(e,t){if(null===e)return null===t;if(null===t||e.inclusive!==t.inclusive||e.position.length!==t.position.length)return!1;for(let n=0;n<e.position.length;n++)if(!no(e.position[n],t.position[n]))return!1;return!0}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class nk{constructor(e,t="asc"){this.field=e,this.dir=t}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class nA{}class nR extends nA{constructor(e,t,n){super(),this.field=e,this.op=t,this.value=n}static create(e,t,n){return e.isKeyField()?"in"===t||"not-in"===t?this.createKeyFieldInFilter(e,t,n):new nU(e,t,n):"array-contains"===t?new nK(e,n):"in"===t?new n$(e,n):"not-in"===t?new nG(e,n):"array-contains-any"===t?new nj(e,n):new nR(e,t,n)}static createKeyFieldInFilter(e,t,n){return"in"===t?new nq(e,n):new nB(e,n)}matches(e){let t=e.data.field(this.field);return"!="===this.op?null!==t&&void 0===t.nullValue&&this.matchesComparison(nl(t,this.value)):null!==t&&na(this.value)===na(t)&&this.matchesComparison(nl(t,this.value))}matchesComparison(e){switch(this.op){case"<":return e<0;case"<=":return e<=0;case"==":return 0===e;case"!=":return 0!==e;case">":return e>0;case">=":return e>=0;default:return S(47266,{operator:this.op})}}isInequality(){return["<","<=",">",">=","!=","not-in"].indexOf(this.op)>=0}getFlattenedFilters(){return[this]}getFilters(){return[this]}}class nV extends nA{constructor(e,t){super(),this.filters=e,this.op=t,this.Pe=null}static create(e,t){return new nV(e,t)}matches(e){return nF(this)?void 0===this.filters.find(t=>!t.matches(e)):void 0!==this.filters.find(t=>t.matches(e))}getFlattenedFilters(){return null!==this.Pe||(this.Pe=this.filters.reduce((e,t)=>e.concat(t.getFlattenedFilters()),[])),this.Pe}getFilters(){return Object.assign([],this.filters)}}function nF(e){return"and"===e.op}function nO(e){return"or"===e.op}function nM(e){return nP(e)&&nF(e)}function nP(e){for(let t of e.filters)if(t instanceof nV)return!1;return!0}function nL(e,t){let n=e.filters.concat(t);return nV.create(n,e.op)}class nU extends nR{constructor(e,t,n){super(e,t,n),this.key=W.fromName(n.referenceValue)}matches(e){let t=W.comparator(e.key,this.key);return this.matchesComparison(t)}}class nq extends nR{constructor(e,t){super(e,"in",t),this.keys=nz("in",t)}matches(e){return this.keys.some(t=>t.isEqual(e.key))}}class nB extends nR{constructor(e,t){super(e,"not-in",t),this.keys=nz("not-in",t)}matches(e){return!this.keys.some(t=>t.isEqual(e.key))}}function nz(e,t){return(t.arrayValue?.values||[]).map(e=>W.fromName(e.referenceValue))}class nK extends nR{constructor(e,t){super(e,"array-contains",t)}matches(e){let t=e.data.field(this.field);return ng(t)&&nu(t.arrayValue,this.value)}}class n$ extends nR{constructor(e,t){super(e,"in",t)}matches(e){let t=e.data.field(this.field);return null!==t&&nu(this.value.arrayValue,t)}}class nG extends nR{constructor(e,t){super(e,"not-in",t)}matches(e){if(nu(this.value.arrayValue,{nullValue:"NULL_VALUE"}))return!1;let t=e.data.field(this.field);return null!==t&&void 0===t.nullValue&&!nu(this.value.arrayValue,t)}}class nj extends nR{constructor(e,t){super(e,"array-contains-any",t)}matches(e){let t=e.data.field(this.field);return!(!ng(t)||!t.arrayValue.values)&&t.arrayValue.values.some(e=>nu(this.value.arrayValue,e))}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class nQ{constructor(e,t=null,n=[],r=[],i=null,s=null,a=null){this.path=e,this.collectionGroup=t,this.orderBy=n,this.filters=r,this.limit=i,this.startAt=s,this.endAt=a,this.Te=null}}function nH(e,t=null,n=[],r=[],i=null,s=null,a=null){return new nQ(e,t,n,r,i,s,a)}function nJ(e){if(null===e.Te){let t=e.path.canonicalString();null!==e.collectionGroup&&(t+="|cg:"+e.collectionGroup),t+="|f:"+e.filters.map(e=>(function e(t){if(t instanceof nR)return t.field.canonicalString()+t.op.toString()+nd(t.value);if(nM(t))return t.filters.map(t=>e(t)).join(",");{let n=t.filters.map(t=>e(t)).join(",");return`${t.op}(${n})`}})(e)).join(",")+"|ob:"+e.orderBy.map(e=>e.field.canonicalString()+e.dir).join(","),eL(e.limit)||(t+="|l:"+e.limit),e.startAt&&(t+="|lb:"+(e.startAt.inclusive?"b:":"a:")+e.startAt.position.map(e=>nd(e)).join(",")),e.endAt&&(t+="|ub:"+(e.endAt.inclusive?"a:":"b:")+e.endAt.position.map(e=>nd(e)).join(",")),e.Te=t}return e.Te}function nW(e,t){if(e.limit!==t.limit||e.orderBy.length!==t.orderBy.length)return!1;for(let i=0;i<e.orderBy.length;i++){var n,r;if(n=e.orderBy[i],r=t.orderBy[i],!(n.dir===r.dir&&n.field.isEqual(r.field)))return!1}if(e.filters.length!==t.filters.length)return!1;for(let n=0;n<e.filters.length;n++)if(!function e(t,n){return t instanceof nR?n instanceof nR&&t.op===n.op&&t.field.isEqual(n.field)&&no(t.value,n.value):t instanceof nV?n instanceof nV&&t.op===n.op&&t.filters.length===n.filters.length&&t.filters.reduce((t,r,i)=>t&&e(r,n.filters[i]),!0):void S(19439)}(e.filters[n],t.filters[n]))return!1;return e.collectionGroup===t.collectionGroup&&!!e.path.isEqual(t.path)&&!!nD(e.startAt,t.startAt)&&nD(e.endAt,t.endAt)}function nY(e){return W.isDocumentKey(e.path)&&null===e.collectionGroup&&0===e.filters.length}function nX(e,t){return e.filters.filter(e=>e instanceof nR&&e.field.isEqual(t))}function nZ(e,t,n){let r=ns,i=!0;for(let n of nX(e,t)){let e=ns,t=!0;switch(n.op){case"<":case"<=":var s;e="nullValue"in(s=n.value)?ns:"booleanValue"in s?{booleanValue:!1}:"integerValue"in s||"doubleValue"in s?{doubleValue:NaN}:"timestampValue"in s?{timestampValue:{seconds:Number.MIN_SAFE_INTEGER}}:"stringValue"in s?{stringValue:""}:"bytesValue"in s?{bytesValue:""}:"referenceValue"in s?nf(t9.empty(),W.empty()):"geoPointValue"in s?{geoPointValue:{latitude:-90,longitude:-180}}:"arrayValue"in s?{arrayValue:{}}:"mapValue"in s?nv(s)?nb:{mapValue:{}}:S(35942,{value:s});break;case"==":case"in":case">=":e=n.value;break;case">":e=n.value,t=!1;break;case"!=":case"not-in":e=ns}0>nE({value:r,inclusive:i},{value:e,inclusive:t})&&(r=e,i=t)}if(null!==n){for(let s=0;s<e.orderBy.length;++s)if(e.orderBy[s].field.isEqual(t)){let e=n.position[s];0>nE({value:r,inclusive:i},{value:e,inclusive:n.inclusive})&&(r=e,i=n.inclusive);break}}return{value:r,inclusive:i}}function n0(e,t,n){let r=nn,i=!0;for(let n of nX(e,t)){let e=nn,t=!0;switch(n.op){case">=":case">":var s;e="nullValue"in(s=n.value)?{booleanValue:!1}:"booleanValue"in s?{doubleValue:NaN}:"integerValue"in s||"doubleValue"in s?{timestampValue:{seconds:Number.MIN_SAFE_INTEGER}}:"timestampValue"in s?{stringValue:""}:"stringValue"in s?{bytesValue:""}:"bytesValue"in s?nf(t9.empty(),W.empty()):"referenceValue"in s?{geoPointValue:{latitude:-90,longitude:-180}}:"geoPointValue"in s?{arrayValue:{}}:"arrayValue"in s?nb:"mapValue"in s?nv(s)?{mapValue:{}}:nn:S(61959,{value:s}),t=!1;break;case"==":case"in":case"<=":e=n.value;break;case"<":e=n.value,t=!1;break;case"!=":case"not-in":e=nn}nS({value:r,inclusive:i},{value:e,inclusive:t})>0&&(r=e,i=t)}if(null!==n){for(let s=0;s<e.orderBy.length;++s)if(e.orderBy[s].field.isEqual(t)){let e=n.position[s];nS({value:r,inclusive:i},{value:e,inclusive:n.inclusive})>0&&(r=e,i=n.inclusive);break}}return{value:r,inclusive:i}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class n1{constructor(e,t=null,n=[],r=[],i=null,s="F",a=null,o=null){this.path=e,this.collectionGroup=t,this.explicitOrderBy=n,this.filters=r,this.limit=i,this.limitType=s,this.startAt=a,this.endAt=o,this.Ee=null,this.Ie=null,this.Re=null,this.startAt,this.endAt}}function n2(e){return new n1(e)}function n4(e){return 0===e.filters.length&&null===e.limit&&null==e.startAt&&null==e.endAt&&(0===e.explicitOrderBy.length||1===e.explicitOrderBy.length&&e.explicitOrderBy[0].field.isKeyField())}function n5(e){return null!==e.collectionGroup}function n3(e){if(null===e.Ee){let t;e.Ee=[];let n=new Set;for(let t of e.explicitOrderBy)e.Ee.push(t),n.add(t.field.canonicalString());let r=e.explicitOrderBy.length>0?e.explicitOrderBy[e.explicitOrderBy.length-1].dir:"asc";(t=new tz(J.comparator),e.filters.forEach(e=>{e.getFlattenedFilters().forEach(e=>{e.isInequality()&&(t=t.add(e.field))})}),t).forEach(t=>{n.has(t.canonicalString())||t.isKeyField()||e.Ee.push(new nk(t,r))}),n.has(J.keyField().canonicalString())||e.Ee.push(new nk(J.keyField(),r))}return e.Ee}function n6(e){return e.Ie||(e.Ie=n9(e,n3(e))),e.Ie}function n8(e){return e.Re||(e.Re=n9(e,e.explicitOrderBy)),e.Re}function n9(e,t){if("F"===e.limitType)return nH(e.path,e.collectionGroup,t,e.filters,e.limit,e.startAt,e.endAt);{t=t.map(e=>{let t="desc"===e.dir?"asc":"desc";return new nk(e.field,t)});let n=e.endAt?new nC(e.endAt.position,e.endAt.inclusive):null,r=e.startAt?new nC(e.startAt.position,e.startAt.inclusive):null;return nH(e.path,e.collectionGroup,t,e.filters,e.limit,n,r)}}function n7(e,t){let n=e.filters.concat([t]);return new n1(e.path,e.collectionGroup,e.explicitOrderBy.slice(),n,e.limit,e.limitType,e.startAt,e.endAt)}function re(e,t){let n=e.explicitOrderBy.concat([t]);return new n1(e.path,e.collectionGroup,n,e.filters.slice(),e.limit,e.limitType,e.startAt,e.endAt)}function rt(e,t,n){return new n1(e.path,e.collectionGroup,e.explicitOrderBy.slice(),e.filters.slice(),t,n,e.startAt,e.endAt)}function rn(e,t){return new n1(e.path,e.collectionGroup,e.explicitOrderBy.slice(),e.filters.slice(),e.limit,e.limitType,t,e.endAt)}function rr(e,t){return new n1(e.path,e.collectionGroup,e.explicitOrderBy.slice(),e.filters.slice(),e.limit,e.limitType,e.startAt,t)}function ri(e,t){return nW(n6(e),n6(t))&&e.limitType===t.limitType}function rs(e){return`${nJ(n6(e))}|lt:${e.limitType}`}function ra(e){var t;let n;return`Query(target=${n=(t=n6(e)).path.canonicalString(),null!==t.collectionGroup&&(n+=" collectionGroup="+t.collectionGroup),t.filters.length>0&&(n+=`, filters: [${t.filters.map(e=>(function e(t){return t instanceof nR?`${t.field.canonicalString()} ${t.op} ${nd(t.value)}`:t instanceof nV?t.op.toString()+" {"+t.getFilters().map(e).join(" ,")+"}":"Filter"})(e)).join(", ")}]`),eL(t.limit)||(n+=", limit: "+t.limit),t.orderBy.length>0&&(n+=`, orderBy: [${t.orderBy.map(e=>`${e.field.canonicalString()} (${e.dir})`).join(", ")}]`),t.startAt&&(n+=", startAt: "+(t.startAt.inclusive?"b:":"a:")+t.startAt.position.map(e=>nd(e)).join(",")),t.endAt&&(n+=", endAt: "+(t.endAt.inclusive?"a:":"b:")+t.endAt.position.map(e=>nd(e)).join(",")),`Target(${n})`}; limitType=${e.limitType})`}function ro(e,t){return t.isFoundDocument()&&function(e,t){let n=t.key.path;return null!==e.collectionGroup?t.key.hasCollectionId(e.collectionGroup)&&e.path.isPrefixOf(n):W.isDocumentKey(e.path)?e.path.isEqual(n):e.path.isImmediateParentOf(n)}(e,t)&&function(e,t){for(let n of n3(e))if(!n.field.isKeyField()&&null===t.data.field(n.field))return!1;return!0}(e,t)&&function(e,t){for(let n of e.filters)if(!n.matches(t))return!1;return!0}(e,t)&&(!e.startAt||!!function(e,t,n){let r=nN(e,t,n);return e.inclusive?r<=0:r<0}(e.startAt,n3(e),t))&&(!e.endAt||!!function(e,t,n){let r=nN(e,t,n);return e.inclusive?r>=0:r>0}(e.endAt,n3(e),t))}function ru(e){return e.collectionGroup||(e.path.length%2==1?e.path.lastSegment():e.path.get(e.path.length-2))}function rl(e){return(t,n)=>{let r=!1;for(let i of n3(e)){let e=function(e,t,n){let r=e.field.isKeyField()?W.comparator(t.key,n.key):function(e,t,n){let r=t.data.field(e),i=n.data.field(e);return null!==r&&null!==i?nl(r,i):S(42886)}(e.field,t,n);switch(e.dir){case"asc":return r;case"desc":return -1*r;default:return S(19790,{direction:e.dir})}}(i,t,n);if(0!==e)return e;r=r||i.field.isKeyField()}return 0}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class rc{constructor(e,t){this.mapKeyFn=e,this.equalsFn=t,this.inner={},this.innerSize=0}get(e){let t=this.mapKeyFn(e),n=this.inner[t];if(void 0!==n){for(let[t,r]of n)if(this.equalsFn(t,e))return r}}has(e){return void 0!==this.get(e)}set(e,t){let n=this.mapKeyFn(e),r=this.inner[n];if(void 0===r)return this.inner[n]=[[e,t]],void this.innerSize++;for(let n=0;n<r.length;n++)if(this.equalsFn(r[n][0],e))return void(r[n]=[e,t]);r.push([e,t]),this.innerSize++}delete(e){let t=this.mapKeyFn(e),n=this.inner[t];if(void 0===n)return!1;for(let r=0;r<n.length;r++)if(this.equalsFn(n[r][0],e))return 1===n.length?delete this.inner[t]:n.splice(r,1),this.innerSize--,!0;return!1}forEach(e){tM(this.inner,(t,n)=>{for(let[t,r]of n)e(t,r)})}isEmpty(){return tL(this.inner)}size(){return this.innerSize}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let rh=new tU(W.comparator),rd=new tU(W.comparator);function rf(...e){let t=rd;for(let n of e)t=t.insert(n.key,n);return t}function rm(e){let t=rd;return e.forEach((e,n)=>t=t.insert(e,n.overlayedDocument)),t}function rg(){return new rc(e=>e.toString(),(e,t)=>e.isEqual(t))}let rp=new tU(W.comparator),ry=new tz(W.comparator);function rw(...e){let t=ry;for(let n of e)t=t.add(n);return t}let rv=new tz(B);/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function rI(e,t){if(e.useProto3Json){if(isNaN(t))return{doubleValue:"NaN"};if(t===1/0)return{doubleValue:"Infinity"};if(t===-1/0)return{doubleValue:"-Infinity"}}return{doubleValue:eU(t)?"-0":t}}function rT(e){return{integerValue:""+e}}function rb(e,t){return eq(t)?rT(t):rI(e,t)}/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class rE{constructor(){this._=void 0}}function rS(e,t){return e instanceof rk?nm(t)||t&&"doubleValue"in t?t:{integerValue:0}:null}class rx extends rE{}class r_ extends rE{constructor(e){super(),this.elements=e}}function rC(e,t){let n=rR(t);for(let t of e.elements)n.some(e=>no(e,t))||n.push(t);return{arrayValue:{values:n}}}class rN extends rE{constructor(e){super(),this.elements=e}}function rD(e,t){let n=rR(t);for(let t of e.elements)n=n.filter(e=>!no(e,t));return{arrayValue:{values:n}}}class rk extends rE{constructor(e,t){super(),this.serializer=e,this.Ae=t}}function rA(e){return tY(e.integerValue||e.doubleValue)}function rR(e){return ng(e)&&e.arrayValue.values?e.arrayValue.values.slice():[]}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class rV{constructor(e,t){this.field=e,this.transform=t}}class rF{constructor(e,t){this.version=e,this.transformResults=t}}class rO{constructor(e,t){this.updateTime=e,this.exists=t}static none(){return new rO}static exists(e){return new rO(void 0,e)}static updateTime(e){return new rO(e)}get isNone(){return void 0===this.updateTime&&void 0===this.exists}isEqual(e){return this.exists===e.exists&&(this.updateTime?!!e.updateTime&&this.updateTime.isEqual(e.updateTime):!e.updateTime)}}function rM(e,t){return void 0!==e.updateTime?t.isFoundDocument()&&t.version.isEqual(e.updateTime):void 0===e.exists||e.exists===t.isFoundDocument()}class rP{}function rL(e,t){if(!e.hasLocalMutations||t&&0===t.fields.length)return null;if(null===t)return e.isNoDocument()?new rj(e.key,rO.none()):new rB(e.key,e.data,rO.none());{let n=e.data,r=nx.empty(),i=new tz(J.comparator);for(let e of t.fields)if(!i.has(e)){let t=n.field(e);null===t&&e.length>1&&(e=e.popLast(),t=n.field(e)),null===t?r.delete(e):r.set(e,t),i=i.add(e)}return new rz(e.key,r,new tG(i.toArray()),rO.none())}}function rU(e,t,n,r){return e instanceof rB?function(e,t,n,r){if(!rM(e.precondition,t))return n;let i=e.value.clone(),s=rG(e.fieldTransforms,r,t);return i.setAll(s),t.convertToFoundDocument(t.version,i).setHasLocalMutations(),null}(e,t,n,r):e instanceof rz?function(e,t,n,r){if(!rM(e.precondition,t))return n;let i=rG(e.fieldTransforms,r,t),s=t.data;return(s.setAll(rK(e)),s.setAll(i),t.convertToFoundDocument(t.version,s).setHasLocalMutations(),null===n)?null:n.unionWith(e.fieldMask.fields).unionWith(e.fieldTransforms.map(e=>e.field))}(e,t,n,r):rM(e.precondition,t)?(t.convertToNoDocument(t.version).setHasLocalMutations(),null):n}function rq(e,t){var n,r;return e.type===t.type&&!!e.key.isEqual(t.key)&&!!e.precondition.isEqual(t.precondition)&&(n=e.fieldTransforms,r=t.fieldTransforms,!!(void 0===n&&void 0===r||!(!n||!r)&&$(n,r,(e,t)=>{var n,r;return e.field.isEqual(t.field)&&(n=e.transform,r=t.transform,n instanceof r_&&r instanceof r_||n instanceof rN&&r instanceof rN?$(n.elements,r.elements,no):n instanceof rk&&r instanceof rk?no(n.Ae,r.Ae):n instanceof rx&&r instanceof rx)})))&&(0===e.type?e.value.isEqual(t.value):1!==e.type||e.data.isEqual(t.data)&&e.fieldMask.isEqual(t.fieldMask))}class rB extends rP{constructor(e,t,n,r=[]){super(),this.key=e,this.value=t,this.precondition=n,this.fieldTransforms=r,this.type=0}getFieldMask(){return null}}class rz extends rP{constructor(e,t,n,r,i=[]){super(),this.key=e,this.data=t,this.fieldMask=n,this.precondition=r,this.fieldTransforms=i,this.type=1}getFieldMask(){return this.fieldMask}}function rK(e){let t=new Map;return e.fieldMask.fields.forEach(n=>{if(!n.isEmpty()){let r=e.data.field(n);t.set(n,r)}}),t}function r$(e,t,n){let r=new Map;_(e.length===n.length,32656,{Ve:n.length,de:e.length});for(let s=0;s<n.length;s++){var i;let a=e[s],o=a.transform,u=t.data.field(a.field);r.set(a.field,(i=n[s],o instanceof r_?rC(o,u):o instanceof rN?rD(o,u):i))}return r}function rG(e,t,n){let r=new Map;for(let i of e){let e=i.transform,s=n.data.field(i.field);r.set(i.field,e instanceof rx?function(e,t){let n={fields:{[t0]:{stringValue:tZ},[t2]:{timestampValue:{seconds:e.seconds,nanos:e.nanoseconds}}}};return t&&t4(t)&&(t=t5(t)),t&&(n.fields[t1]=t),{mapValue:n}}(t,s):e instanceof r_?rC(e,s):e instanceof rN?rD(e,s):function(e,t){let n=rS(e,t),r=rA(n)+rA(e.Ae);return nm(n)&&nm(e.Ae)?rT(r):rI(e.serializer,r)}(e,s))}return r}class rj extends rP{constructor(e,t){super(),this.key=e,this.precondition=t,this.type=2,this.fieldTransforms=[]}getFieldMask(){return null}}class rQ extends rP{constructor(e,t){super(),this.key=e,this.precondition=t,this.type=3,this.fieldTransforms=[]}getFieldMask(){return null}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class rH{constructor(e,t,n,r){this.batchId=e,this.localWriteTime=t,this.baseMutations=n,this.mutations=r}applyToRemoteDocument(e,t){let n=t.mutationResults;for(let t=0;t<this.mutations.length;t++){let i=this.mutations[t];if(i.key.isEqual(e.key)){var r;r=n[t],i instanceof rB?function(e,t,n){let r=e.value.clone(),i=r$(e.fieldTransforms,t,n.transformResults);r.setAll(i),t.convertToFoundDocument(n.version,r).setHasCommittedMutations()}(i,e,r):i instanceof rz?function(e,t,n){if(!rM(e.precondition,t))return void t.convertToUnknownDocument(n.version);let r=r$(e.fieldTransforms,t,n.transformResults),i=t.data;i.setAll(rK(e)),i.setAll(r),t.convertToFoundDocument(n.version,i).setHasCommittedMutations()}(i,e,r):function(e,t,n){t.convertToNoDocument(n.version).setHasCommittedMutations()}(0,e,r)}}}applyToLocalView(e,t){for(let n of this.baseMutations)n.key.isEqual(e.key)&&(t=rU(n,e,t,this.localWriteTime));for(let n of this.mutations)n.key.isEqual(e.key)&&(t=rU(n,e,t,this.localWriteTime));return t}applyToLocalDocumentSet(e,t){let n=rg();return this.mutations.forEach(r=>{let i=e.get(r.key),s=i.overlayedDocument,a=this.applyToLocalView(s,i.mutatedFields),o=rL(s,a=t.has(r.key)?null:a);null!==o&&n.set(r.key,o),s.isValidDocument()||s.convertToNoDocument(eu.min())}),n}keys(){return this.mutations.reduce((e,t)=>e.add(t.key),rw())}isEqual(e){return this.batchId===e.batchId&&$(this.mutations,e.mutations,(e,t)=>rq(e,t))&&$(this.baseMutations,e.baseMutations,(e,t)=>rq(e,t))}}class rJ{constructor(e,t,n,r){this.batch=e,this.commitVersion=t,this.mutationResults=n,this.docVersions=r}static from(e,t,n){_(e.mutations.length===n.length,58842,{me:e.mutations.length,fe:n.length});let r=rp,i=e.mutations;for(let e=0;e<i.length;e++)r=r.insert(i[e].key,n[e].version);return new rJ(e,t,n,r)}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class rW{constructor(e,t){this.largestBatchId=e,this.mutation=t}getKey(){return this.mutation.key}isEqual(e){return null!==e&&this.mutation===e.mutation}toString(){return`Overlay{
      largestBatchId: ${this.largestBatchId},
      mutation: ${this.mutation.toString()}
    }`}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class rY{constructor(e,t,n){this.alias=e,this.aggregateType=t,this.fieldPath=n}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class rX{constructor(e,t){this.count=e,this.unchangedNames=t}}function rZ(e){switch(e){case N.OK:return S(64938);case N.CANCELLED:case N.UNKNOWN:case N.DEADLINE_EXCEEDED:case N.RESOURCE_EXHAUSTED:case N.INTERNAL:case N.UNAVAILABLE:case N.UNAUTHENTICATED:return!1;case N.INVALID_ARGUMENT:case N.NOT_FOUND:case N.ALREADY_EXISTS:case N.PERMISSION_DENIED:case N.FAILED_PRECONDITION:case N.ABORTED:case N.OUT_OF_RANGE:case N.UNIMPLEMENTED:case N.DATA_LOSS:return!0;default:return S(15467,{code:e})}}function r0(e){if(void 0===e)return T("GRPC error has no .code"),N.UNKNOWN;switch(e){case r.OK:return N.OK;case r.CANCELLED:return N.CANCELLED;case r.UNKNOWN:return N.UNKNOWN;case r.DEADLINE_EXCEEDED:return N.DEADLINE_EXCEEDED;case r.RESOURCE_EXHAUSTED:return N.RESOURCE_EXHAUSTED;case r.INTERNAL:return N.INTERNAL;case r.UNAVAILABLE:return N.UNAVAILABLE;case r.UNAUTHENTICATED:return N.UNAUTHENTICATED;case r.INVALID_ARGUMENT:return N.INVALID_ARGUMENT;case r.NOT_FOUND:return N.NOT_FOUND;case r.ALREADY_EXISTS:return N.ALREADY_EXISTS;case r.PERMISSION_DENIED:return N.PERMISSION_DENIED;case r.FAILED_PRECONDITION:return N.FAILED_PRECONDITION;case r.ABORTED:return N.ABORTED;case r.OUT_OF_RANGE:return N.OUT_OF_RANGE;case r.UNIMPLEMENTED:return N.UNIMPLEMENTED;case r.DATA_LOSS:return N.DATA_LOSS;default:return S(39323,{code:e})}}(i=r||(r={}))[i.OK=0]="OK",i[i.CANCELLED=1]="CANCELLED",i[i.UNKNOWN=2]="UNKNOWN",i[i.INVALID_ARGUMENT=3]="INVALID_ARGUMENT",i[i.DEADLINE_EXCEEDED=4]="DEADLINE_EXCEEDED",i[i.NOT_FOUND=5]="NOT_FOUND",i[i.ALREADY_EXISTS=6]="ALREADY_EXISTS",i[i.PERMISSION_DENIED=7]="PERMISSION_DENIED",i[i.UNAUTHENTICATED=16]="UNAUTHENTICATED",i[i.RESOURCE_EXHAUSTED=8]="RESOURCE_EXHAUSTED",i[i.FAILED_PRECONDITION=9]="FAILED_PRECONDITION",i[i.ABORTED=10]="ABORTED",i[i.OUT_OF_RANGE=11]="OUT_OF_RANGE",i[i.UNIMPLEMENTED=12]="UNIMPLEMENTED",i[i.INTERNAL=13]="INTERNAL",i[i.UNAVAILABLE=14]="UNAVAILABLE",i[i.DATA_LOSS=15]="DATA_LOSS";/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let r1=null;function r2(e){if(r1)throw Error("a TestingHooksSpi instance is already set");r1=e}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function r4(){return new TextEncoder}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let r5=new l.z8([4294967295,4294967295],0);function r3(e){let t=r4().encode(e),n=new l.V8;return n.update(t),new Uint8Array(n.digest())}function r6(e){let t=new DataView(e.buffer),n=t.getUint32(0,!0),r=t.getUint32(4,!0),i=t.getUint32(8,!0),s=t.getUint32(12,!0);return[new l.z8([n,r],0),new l.z8([i,s],0)]}class r8{constructor(e,t,n){if(this.bitmap=e,this.padding=t,this.hashCount=n,t<0||t>=8)throw new r9(`Invalid padding: ${t}`);if(n<0||e.length>0&&0===this.hashCount)throw new r9(`Invalid hash count: ${n}`);if(0===e.length&&0!==t)throw new r9(`Invalid padding when bitmap length is 0: ${t}`);this.ge=8*e.length-t,this.pe=l.z8.fromNumber(this.ge)}ye(e,t,n){let r=e.add(t.multiply(l.z8.fromNumber(n)));return 1===r.compare(r5)&&(r=new l.z8([r.getBits(0),r.getBits(1)],0)),r.modulo(this.pe).toNumber()}we(e){return!!(this.bitmap[Math.floor(e/8)]&1<<e%8)}mightContain(e){if(0===this.ge)return!1;let[t,n]=r6(r3(e));for(let e=0;e<this.hashCount;e++){let r=this.ye(t,n,e);if(!this.we(r))return!1}return!0}static create(e,t,n){let r=new r8(new Uint8Array(Math.ceil(e/8)),e%8==0?0:8-e%8,t);return n.forEach(e=>r.insert(e)),r}insert(e){if(0===this.ge)return;let[t,n]=r6(r3(e));for(let e=0;e<this.hashCount;e++){let r=this.ye(t,n,e);this.Se(r)}}Se(e){this.bitmap[Math.floor(e/8)]|=1<<e%8}}class r9 extends Error{constructor(){super(...arguments),this.name="BloomFilterError"}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class r7{constructor(e,t,n,r,i){this.snapshotVersion=e,this.targetChanges=t,this.targetMismatches=n,this.documentUpdates=r,this.resolvedLimboDocuments=i}static createSynthesizedRemoteEventForCurrentChange(e,t,n){let r=new Map;return r.set(e,ie.createSynthesizedTargetChangeForCurrentChange(e,t,n)),new r7(eu.min(),r,new tU(B),rh,rw())}}class ie{constructor(e,t,n,r,i){this.resumeToken=e,this.current=t,this.addedDocuments=n,this.modifiedDocuments=r,this.removedDocuments=i}static createSynthesizedTargetChangeForCurrentChange(e,t,n){return new ie(n,t,rw(),rw(),rw())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class it{constructor(e,t,n,r){this.be=e,this.removedTargetIds=t,this.key=n,this.De=r}}class ir{constructor(e,t){this.targetId=e,this.Ce=t}}class ii{constructor(e,t,n=tH.EMPTY_BYTE_STRING,r=null){this.state=e,this.targetIds=t,this.resumeToken=n,this.cause=r}}class is{constructor(){this.ve=0,this.Fe=iu(),this.Me=tH.EMPTY_BYTE_STRING,this.xe=!1,this.Oe=!0}get current(){return this.xe}get resumeToken(){return this.Me}get Ne(){return 0!==this.ve}get Be(){return this.Oe}Le(e){e.approximateByteSize()>0&&(this.Oe=!0,this.Me=e)}ke(){let e=rw(),t=rw(),n=rw();return this.Fe.forEach((r,i)=>{switch(i){case 0:e=e.add(r);break;case 2:t=t.add(r);break;case 1:n=n.add(r);break;default:S(38017,{changeType:i})}}),new ie(this.Me,this.xe,e,t,n)}qe(){this.Oe=!1,this.Fe=iu()}Ke(e,t){this.Oe=!0,this.Fe=this.Fe.insert(e,t)}Ue(e){this.Oe=!0,this.Fe=this.Fe.remove(e)}$e(){this.ve+=1}We(){this.ve-=1,_(this.ve>=0,3241,{ve:this.ve})}Qe(){this.Oe=!0,this.xe=!0}}class ia{constructor(e){this.Ge=e,this.ze=new Map,this.je=rh,this.Je=io(),this.He=io(),this.Ze=new tU(B)}Xe(e){for(let t of e.be)e.De&&e.De.isFoundDocument()?this.Ye(t,e.De):this.et(t,e.key,e.De);for(let t of e.removedTargetIds)this.et(t,e.key,e.De)}tt(e){this.forEachTarget(e,t=>{let n=this.nt(t);switch(e.state){case 0:this.rt(t)&&n.Le(e.resumeToken);break;case 1:n.We(),n.Ne||n.qe(),n.Le(e.resumeToken);break;case 2:n.We(),n.Ne||this.removeTarget(t);break;case 3:this.rt(t)&&(n.Qe(),n.Le(e.resumeToken));break;case 4:this.rt(t)&&(this.it(t),n.Le(e.resumeToken));break;default:S(56790,{state:e.state})}})}forEachTarget(e,t){e.targetIds.length>0?e.targetIds.forEach(t):this.ze.forEach((e,n)=>{this.rt(n)&&t(n)})}st(e){let t=e.targetId,n=e.Ce.count,r=this.ot(t);if(r){let i=r.target;if(nY(i)){if(0===n){let e=new W(i.path);this.et(t,e,n_.newNoDocument(e,eu.min()))}else _(1===n,20013,{expectedCount:n})}else{let r=this._t(t);if(r!==n){let n=this.ut(e),i=n?this.ct(n,e,r):1;0!==i&&(this.it(t),this.Ze=this.Ze.insert(t,2===i?"TargetPurposeExistenceFilterMismatchBloom":"TargetPurposeExistenceFilterMismatch")),r1?.o(function(e,t,n,r,i){let s={localCacheCount:e,existenceFilterCount:t.count,databaseId:n.database,projectId:n.projectId},a=t.unchangedNames;return a&&(s.bloomFilter={applied:0===i,hashCount:a?.hashCount??0,bitmapLength:a?.bits?.bitmap?.length??0,padding:a?.bits?.padding??0,mightContain:e=>r?.mightContain(e)??!1}),s}(r,e.Ce,this.Ge.ht(),n,i))}}}}ut(e){let t,n;let r=e.Ce.unchangedNames;if(!r||!r.bits)return null;let{bits:{bitmap:i="",padding:s=0},hashCount:a=0}=r;try{t=tX(i).toUint8Array()}catch(e){if(e instanceof tj)return b("Decoding the base64 bloom filter in existence filter failed ("+e.message+"); ignoring the bloom filter and falling back to full re-query."),null;throw e}try{n=new r8(t,s,a)}catch(e){return b(e instanceof r9?"BloomFilter error: ":"Applying bloom filter failed: ",e),null}return 0===n.ge?null:n}ct(e,t,n){return t.Ce.count===n-this.Pt(e,t.targetId)?0:2}Pt(e,t){let n=this.Ge.getRemoteKeysForTarget(t),r=0;return n.forEach(n=>{let i=this.Ge.ht(),s=`projects/${i.projectId}/databases/${i.database}/documents/${n.path.canonicalString()}`;e.mightContain(s)||(this.et(t,n,null),r++)}),r}Tt(e){let t=new Map;this.ze.forEach((n,r)=>{let i=this.ot(r);if(i){if(n.current&&nY(i.target)){let t=new W(i.target.path);this.Et(t).has(r)||this.It(r,t)||this.et(r,t,n_.newNoDocument(t,e))}n.Be&&(t.set(r,n.ke()),n.qe())}});let n=rw();this.He.forEach((e,t)=>{let r=!0;t.forEachWhile(e=>{let t=this.ot(e);return!t||"TargetPurposeLimboResolution"===t.purpose||(r=!1,!1)}),r&&(n=n.add(e))}),this.je.forEach((t,n)=>n.setReadTime(e));let r=new r7(e,t,this.Ze,this.je,n);return this.je=rh,this.Je=io(),this.He=io(),this.Ze=new tU(B),r}Ye(e,t){if(!this.rt(e))return;let n=this.It(e,t.key)?2:0;this.nt(e).Ke(t.key,n),this.je=this.je.insert(t.key,t),this.Je=this.Je.insert(t.key,this.Et(t.key).add(e)),this.He=this.He.insert(t.key,this.Rt(t.key).add(e))}et(e,t,n){if(!this.rt(e))return;let r=this.nt(e);this.It(e,t)?r.Ke(t,1):r.Ue(t),this.He=this.He.insert(t,this.Rt(t).delete(e)),this.He=this.He.insert(t,this.Rt(t).add(e)),n&&(this.je=this.je.insert(t,n))}removeTarget(e){this.ze.delete(e)}_t(e){let t=this.nt(e).ke();return this.Ge.getRemoteKeysForTarget(e).size+t.addedDocuments.size-t.removedDocuments.size}$e(e){this.nt(e).$e()}nt(e){let t=this.ze.get(e);return t||(t=new is,this.ze.set(e,t)),t}Rt(e){let t=this.He.get(e);return t||(t=new tz(B),this.He=this.He.insert(e,t)),t}Et(e){let t=this.Je.get(e);return t||(t=new tz(B),this.Je=this.Je.insert(e,t)),t}rt(e){let t=null!==this.ot(e);return t||I("WatchChangeAggregator","Detected inactive target",e),t}ot(e){let t=this.ze.get(e);return t&&t.Ne?null:this.Ge.At(e)}it(e){this.ze.set(e,new is),this.Ge.getRemoteKeysForTarget(e).forEach(t=>{this.et(e,t,null)})}It(e,t){return this.Ge.getRemoteKeysForTarget(e).has(t)}}function io(){return new tU(W.comparator)}function iu(){return new tU(W.comparator)}let il={asc:"ASCENDING",desc:"DESCENDING"},ic={"<":"LESS_THAN","<=":"LESS_THAN_OR_EQUAL",">":"GREATER_THAN",">=":"GREATER_THAN_OR_EQUAL","==":"EQUAL","!=":"NOT_EQUAL","array-contains":"ARRAY_CONTAINS",in:"IN","not-in":"NOT_IN","array-contains-any":"ARRAY_CONTAINS_ANY"},ih={and:"AND",or:"OR"};class id{constructor(e,t){this.databaseId=e,this.useProto3Json=t}}function im(e,t){return e.useProto3Json||eL(t)?t:{value:t}}function ig(e,t){return e.useProto3Json?`${new Date(1e3*t.seconds).toISOString().replace(/\.\d*/,"").replace("Z","")}.${("000000000"+t.nanoseconds).slice(-9)}Z`:{seconds:""+t.seconds,nanos:t.nanoseconds}}function ip(e,t){return e.useProto3Json?t.toBase64():t.toUint8Array()}function iy(e){return _(!!e,49232),eu.fromTimestamp(function(e){let t=tW(e);return new eo(t.seconds,t.nanos)}(e))}function iw(e,t){return iv(e,t).canonicalString()}function iv(e,t){let n=new Q(["projects",e.projectId,"databases",e.database]).child("documents");return void 0===t?n:n.child(t)}function iI(e){let t=Q.fromString(e);return _(iP(t),10190,{key:t.toString()}),t}function iT(e,t){return iw(e.databaseId,t.path)}function ib(e,t){let n=iI(t);if(n.get(1)!==e.databaseId.projectId)throw new D(N.INVALID_ARGUMENT,"Tried to deserialize key from different project: "+n.get(1)+" vs "+e.databaseId.projectId);if(n.get(3)!==e.databaseId.database)throw new D(N.INVALID_ARGUMENT,"Tried to deserialize key from different database: "+n.get(3)+" vs "+e.databaseId.database);return new W(i_(n))}function iE(e,t){return iw(e.databaseId,t)}function iS(e){let t=iI(e);return 4===t.length?Q.emptyPath():i_(t)}function ix(e){return new Q(["projects",e.databaseId.projectId,"databases",e.databaseId.database]).canonicalString()}function i_(e){return _(e.length>4&&"documents"===e.get(4),29091,{key:e.toString()}),e.popFirst(5)}function iC(e,t,n){return{name:iT(e,t),fields:n.value.mapValue.fields}}function iN(e,t,n){let r=ib(e,t.name),i=iy(t.updateTime),s=t.createTime?iy(t.createTime):eu.min(),a=new nx({mapValue:{fields:t.fields}}),o=n_.newFoundDocument(r,i,s,a);return n&&o.setHasCommittedMutations(),n?o.setHasCommittedMutations():o}function iD(e,t){var n;let r;if(t instanceof rB)r={update:iC(e,t.key,t.value)};else if(t instanceof rj)r={delete:iT(e,t.key)};else if(t instanceof rz)r={update:iC(e,t.key,t.data),updateMask:function(e){let t=[];return e.fields.forEach(e=>t.push(e.canonicalString())),{fieldPaths:t}}(t.fieldMask)};else{if(!(t instanceof rQ))return S(16599,{dt:t.type});r={verify:iT(e,t.key)}}return t.fieldTransforms.length>0&&(r.updateTransforms=t.fieldTransforms.map(e=>(function(e,t){let n=t.transform;if(n instanceof rx)return{fieldPath:t.field.canonicalString(),setToServerValue:"REQUEST_TIME"};if(n instanceof r_)return{fieldPath:t.field.canonicalString(),appendMissingElements:{values:n.elements}};if(n instanceof rN)return{fieldPath:t.field.canonicalString(),removeAllFromArray:{values:n.elements}};if(n instanceof rk)return{fieldPath:t.field.canonicalString(),increment:n.Ae};throw S(20930,{transform:t.transform})})(0,e))),t.precondition.isNone||(r.currentDocument=void 0!==(n=t.precondition).updateTime?{updateTime:ig(e,n.updateTime.toTimestamp())}:void 0!==n.exists?{exists:n.exists}:S(27497)),r}function ik(e,t){var n;let r=t.currentDocument?void 0!==(n=t.currentDocument).updateTime?rO.updateTime(iy(n.updateTime)):void 0!==n.exists?rO.exists(n.exists):rO.none():rO.none(),i=t.updateTransforms?t.updateTransforms.map(t=>{let n;return n=null,"setToServerValue"in t?(_("REQUEST_TIME"===t.setToServerValue,16630,{proto:t}),n=new rx):"appendMissingElements"in t?n=new r_(t.appendMissingElements.values||[]):"removeAllFromArray"in t?n=new rN(t.removeAllFromArray.values||[]):"increment"in t?n=new rk(e,t.increment):S(16584,{proto:t}),new rV(J.fromServerFormat(t.fieldPath),n)}):[];if(t.update){t.update.name;let n=ib(e,t.update.name),s=new nx({mapValue:{fields:t.update.fields}});return t.updateMask?new rz(n,s,new tG((t.updateMask.fieldPaths||[]).map(e=>J.fromServerFormat(e))),r,i):new rB(n,s,r,i)}return t.delete?new rj(ib(e,t.delete),r):t.verify?new rQ(ib(e,t.verify),r):S(1463,{proto:t})}function iA(e,t){return{documents:[iE(e,t.path)]}}function iR(e,t){var n,r;let i;let s={structuredQuery:{}},a=t.path;null!==t.collectionGroup?(i=a,s.structuredQuery.from=[{collectionId:t.collectionGroup,allDescendants:!0}]):(i=a.popLast(),s.structuredQuery.from=[{collectionId:a.lastSegment()}]),s.parent=iE(e,i);let o=function(e){if(0!==e.length)return function e(t){return t instanceof nR?function(e){if("=="===e.op){if(ny(e.value))return{unaryFilter:{field:iO(e.field),op:"IS_NAN"}};if(np(e.value))return{unaryFilter:{field:iO(e.field),op:"IS_NULL"}}}else if("!="===e.op){if(ny(e.value))return{unaryFilter:{field:iO(e.field),op:"IS_NOT_NAN"}};if(np(e.value))return{unaryFilter:{field:iO(e.field),op:"IS_NOT_NULL"}}}return{fieldFilter:{field:iO(e.field),op:ic[e.op],value:e.value}}}(t):t instanceof nV?function(t){let n=t.getFilters().map(t=>e(t));return 1===n.length?n[0]:{compositeFilter:{op:ih[t.op],filters:n}}}(t):S(54877,{filter:t})}(nV.create(e,"and"))}(t.filters);o&&(s.structuredQuery.where=o);let u=function(e){if(0!==e.length)return e.map(e=>({field:iO(e.field),direction:il[e.dir]}))}(t.orderBy);u&&(s.structuredQuery.orderBy=u);let l=im(e,t.limit);return null!==l&&(s.structuredQuery.limit=l),t.startAt&&(s.structuredQuery.startAt={before:(n=t.startAt).inclusive,values:n.position}),t.endAt&&(s.structuredQuery.endAt={before:!(r=t.endAt).inclusive,values:r.position}),{ft:s,parent:i}}function iV(e,t,n,r){let{ft:i,parent:s}=iR(e,t),a={},o=[],u=0;return n.forEach(e=>{let t=r?e.alias:"aggregate_"+u++;a[t]=e.alias,"count"===e.aggregateType?o.push({alias:t,count:{}}):"avg"===e.aggregateType?o.push({alias:t,avg:{field:iO(e.fieldPath)}}):"sum"===e.aggregateType&&o.push({alias:t,sum:{field:iO(e.fieldPath)}})}),{request:{structuredAggregationQuery:{aggregations:o,structuredQuery:i.structuredQuery},parent:i.parent},gt:a,parent:s}}function iF(e){var t;let n,r=iS(e.parent),i=e.structuredQuery,s=i.from?i.from.length:0,a=null;if(s>0){_(1===s,65062);let e=i.from[0];e.allDescendants?a=e.collectionId:r=r.child(e.collectionId)}let o=[];i.where&&(o=function(e){let t=function e(t){return void 0!==t.unaryFilter?function(e){switch(e.unaryFilter.op){case"IS_NAN":let t=iM(e.unaryFilter.field);return nR.create(t,"==",{doubleValue:NaN});case"IS_NULL":let n=iM(e.unaryFilter.field);return nR.create(n,"==",{nullValue:"NULL_VALUE"});case"IS_NOT_NAN":let r=iM(e.unaryFilter.field);return nR.create(r,"!=",{doubleValue:NaN});case"IS_NOT_NULL":let i=iM(e.unaryFilter.field);return nR.create(i,"!=",{nullValue:"NULL_VALUE"});case"OPERATOR_UNSPECIFIED":return S(61313);default:return S(60726)}}(t):void 0!==t.fieldFilter?nR.create(iM(t.fieldFilter.field),function(e){switch(e){case"EQUAL":return"==";case"NOT_EQUAL":return"!=";case"GREATER_THAN":return">";case"GREATER_THAN_OR_EQUAL":return">=";case"LESS_THAN":return"<";case"LESS_THAN_OR_EQUAL":return"<=";case"ARRAY_CONTAINS":return"array-contains";case"IN":return"in";case"NOT_IN":return"not-in";case"ARRAY_CONTAINS_ANY":return"array-contains-any";case"OPERATOR_UNSPECIFIED":return S(58110);default:return S(50506)}}(t.fieldFilter.op),t.fieldFilter.value):void 0!==t.compositeFilter?nV.create(t.compositeFilter.filters.map(t=>e(t)),function(e){switch(e){case"AND":return"and";case"OR":return"or";default:return S(1026)}}(t.compositeFilter.op)):S(30097,{filter:t})}(e);return t instanceof nV&&nM(t)?t.getFilters():[t]}(i.where));let u=[];i.orderBy&&(u=i.orderBy.map(e=>new nk(iM(e.field),function(e){switch(e){case"ASCENDING":return"asc";case"DESCENDING":return"desc";default:return}}(e.direction))));let l=null;i.limit&&(l=eL(n="object"==typeof(t=i.limit)?t.value:t)?null:n);let c=null;i.startAt&&(c=function(e){let t=!!e.before;return new nC(e.values||[],t)}(i.startAt));let h=null;return i.endAt&&(h=function(e){let t=!e.before;return new nC(e.values||[],t)}(i.endAt)),new n1(r,a,u,o,l,"F",c,h)}function iO(e){return{fieldPath:e.canonicalString()}}function iM(e){return J.fromServerFormat(e.fieldPath)}function iP(e){return e.length>=4&&"projects"===e.get(0)&&"databases"===e.get(2)}function iL(e){return!!e&&"function"==typeof e._toProto&&"ProtoValue"===e._protoValueType}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class iU{constructor(e,t,n,r,i=eu.min(),s=eu.min(),a=tH.EMPTY_BYTE_STRING,o=null){this.target=e,this.targetId=t,this.purpose=n,this.sequenceNumber=r,this.snapshotVersion=i,this.lastLimboFreeSnapshotVersion=s,this.resumeToken=a,this.expectedCount=o}withSequenceNumber(e){return new iU(this.target,this.targetId,this.purpose,e,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken,this.expectedCount)}withResumeToken(e,t){return new iU(this.target,this.targetId,this.purpose,this.sequenceNumber,t,this.lastLimboFreeSnapshotVersion,e,null)}withExpectedCount(e){return new iU(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken,e)}withLastLimboFreeSnapshotVersion(e){return new iU(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,e,this.resumeToken,this.expectedCount)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class iq{constructor(e){this.yt=e}}function iB(e,t){let n=t.key,r={prefixPath:n.getCollectionPath().popLast().toArray(),collectionGroup:n.collectionGroup,documentId:n.path.lastSegment(),readTime:iz(t.readTime),hasCommittedMutations:t.hasCommittedMutations};if(t.isFoundDocument()){var i;r.document={name:iT(i=e.yt,t.key),fields:t.data.value.mapValue.fields,updateTime:ig(i,t.version.toTimestamp()),createTime:ig(i,t.createTime.toTimestamp())}}else if(t.isNoDocument())r.noDocument={path:n.path.toArray(),readTime:iK(t.version)};else{if(!t.isUnknownDocument())return S(57904,{document:t});r.unknownDocument={path:n.path.toArray(),version:iK(t.version)}}return r}function iz(e){let t=e.toTimestamp();return[t.seconds,t.nanoseconds]}function iK(e){let t=e.toTimestamp();return{seconds:t.seconds,nanoseconds:t.nanoseconds}}function i$(e){let t=new eo(e.seconds,e.nanoseconds);return eu.fromTimestamp(t)}function iG(e,t){let n=(t.baseMutations||[]).map(t=>ik(e.yt,t));for(let e=0;e<t.mutations.length-1;++e){let n=t.mutations[e];if(e+1<t.mutations.length&&void 0!==t.mutations[e+1].transform){let r=t.mutations[e+1];n.updateTransforms=r.transform.fieldTransforms,t.mutations.splice(e+1,1),++e}}let r=t.mutations.map(t=>ik(e.yt,t)),i=eo.fromMillis(t.localWriteTimeMs);return new rH(t.batchId,i,n,r)}function ij(e){let t=i$(e.readTime),n=void 0!==e.lastLimboFreeSnapshotVersion?i$(e.lastLimboFreeSnapshotVersion):eu.min();return new iU(void 0!==e.query.documents?function(e){let t=e.documents.length;return _(1===t,1966,{count:t}),n6(n2(iS(e.documents[0])))}(e.query):n6(iF(e.query)),e.targetId,"TargetPurposeListen",e.lastListenSequenceNumber,t,n,tH.fromBase64String(e.resumeToken))}function iQ(e,t){let n;let r=iK(t.snapshotVersion),i=iK(t.lastLimboFreeSnapshotVersion);n=nY(t.target)?iA(e.yt,t.target):iR(e.yt,t.target).ft;let s=t.resumeToken.toBase64();return{targetId:t.targetId,canonicalId:nJ(t.target),readTime:r,resumeToken:s,lastListenSequenceNumber:t.sequenceNumber,lastLimboFreeSnapshotVersion:i,query:n}}function iH(e){let t=iF({parent:e.parent,structuredQuery:e.structuredQuery});return"LAST"===e.limitType?rt(t,t.limit,"L"):t}function iJ(e,t){return new rW(t.largestBatchId,ik(e.yt,t.overlayMutation))}function iW(e,t){let n=t.path.lastSegment();return[e,eB(t.path.popLast()),n]}function iY(e,t,n,r){return{indexId:e,uid:t,sequenceNumber:n,readTime:iK(r.readTime),documentKey:eB(r.documentKey.path),largestBatchId:r.largestBatchId}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class iX{getBundleMetadata(e,t){return tF(e,tl).get(t).next(e=>{if(e)return{id:e.bundleId,createTime:i$(e.createTime),version:e.version}})}saveBundleMetadata(e,t){return tF(e,tl).put({bundleId:t.id,createTime:iK(iy(t.createTime)),version:t.version})}getNamedQuery(e,t){return tF(e,tc).get(t).next(e=>{if(e)return{name:e.name,query:iH(e.bundledQuery),readTime:i$(e.readTime)}})}saveNamedQuery(e,t){return tF(e,tc).put({name:t.name,readTime:iK(iy(t.readTime)),bundledQuery:t.bundledQuery})}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class iZ{constructor(e,t){this.serializer=e,this.userId=t}static wt(e,t){return new iZ(e,t.uid||"")}getOverlay(e,t){return tF(e,tT).get(iW(this.userId,t)).next(e=>e?iJ(this.serializer,e):null)}getOverlays(e,t){let n=rg();return eb.forEach(t,t=>this.getOverlay(e,t).next(e=>{null!==e&&n.set(t,e)})).next(()=>n)}saveOverlays(e,t,n){let r=[];return n.forEach((n,i)=>{let s=new rW(t,i);r.push(this.St(e,s))}),eb.waitFor(r)}removeOverlaysForBatchId(e,t,n){let r=new Set;t.forEach(e=>r.add(eB(e.getCollectionPath())));let i=[];return r.forEach(t=>{let r=IDBKeyRange.bound([this.userId,t,n],[this.userId,t,n+1],!1,!0);i.push(tF(e,tT).X(tE,r))}),eb.waitFor(i)}getOverlaysForCollection(e,t,n){let r=rg(),i=eB(t),s=IDBKeyRange.bound([this.userId,i,n],[this.userId,i,Number.POSITIVE_INFINITY],!0);return tF(e,tT).J(tE,s).next(e=>{for(let t of e){let e=iJ(this.serializer,t);r.set(e.getKey(),e)}return r})}getOverlaysForCollectionGroup(e,t,n,r){let i;let s=rg(),a=IDBKeyRange.bound([this.userId,t,n],[this.userId,t,Number.POSITIVE_INFINITY],!0);return tF(e,tT).ee({index:tx,range:a},(e,t,n)=>{let a=iJ(this.serializer,t);s.size()<r||a.largestBatchId===i?(s.set(a.getKey(),a),i=a.largestBatchId):n.done()}).next(()=>s)}St(e,t){return tF(e,tT).put(function(e,t,n){let[r,i,s]=iW(t,n.mutation.key);return{userId:t,collectionPath:i,documentId:s,collectionGroup:n.mutation.key.getCollectionGroup(),largestBatchId:n.largestBatchId,overlayMutation:iD(e.yt,n.mutation)}}(this.serializer,this.userId,t))}}/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class i0{bt(e){return tF(e,tC)}getSessionToken(e){return this.bt(e).get("sessionToken").next(e=>{let t=e?.value;return t?tH.fromUint8Array(t):tH.EMPTY_BYTE_STRING})}setSessionToken(e,t){return this.bt(e).put({name:"sessionToken",value:t.toUint8Array()})}}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class i1{constructor(){}Dt(e,t){this.Ct(e,t),t.vt()}Ct(e,t){if("nullValue"in e)this.Ft(t,5);else if("booleanValue"in e)this.Ft(t,10),t.Mt(e.booleanValue?1:0);else if("integerValue"in e)this.Ft(t,15),t.Mt(tY(e.integerValue));else if("doubleValue"in e){let n=tY(e.doubleValue);isNaN(n)?this.Ft(t,13):(this.Ft(t,15),eU(n)?t.Mt(0):t.Mt(n))}else if("timestampValue"in e){let n=e.timestampValue;this.Ft(t,20),"string"==typeof n&&(n=tW(n)),t.xt(`${n.seconds||""}`),t.Mt(n.nanos||0)}else if("stringValue"in e)this.Ot(e.stringValue,t),this.Nt(t);else if("bytesValue"in e)this.Ft(t,30),t.Bt(tX(e.bytesValue)),this.Nt(t);else if("referenceValue"in e)this.Lt(e.referenceValue,t);else if("geoPointValue"in e){let n=e.geoPointValue;this.Ft(t,45),t.Mt(n.latitude||0),t.Mt(n.longitude||0)}else"mapValue"in e?nT(e)?this.Ft(t,Number.MAX_SAFE_INTEGER):nv(e)?this.kt(e.mapValue,t):(this.qt(e.mapValue,t),this.Nt(t)):"arrayValue"in e?(this.Kt(e.arrayValue,t),this.Nt(t)):S(19022,{Ut:e})}Ot(e,t){this.Ft(t,25),this.$t(e,t)}$t(e,t){t.xt(e)}qt(e,t){let n=e.fields||{};for(let e of(this.Ft(t,55),Object.keys(n)))this.Ot(e,t),this.Ct(n[e],t)}kt(e,t){let n=e.fields||{};this.Ft(t,53);let r=n[ni].arrayValue?.values?.length||0;this.Ft(t,15),t.Mt(tY(r)),this.Ot(ni,t),this.Ct(n[ni],t)}Kt(e,t){let n=e.values||[];for(let e of(this.Ft(t,50),n))this.Ct(e,t)}Lt(e,t){this.Ft(t,37),W.fromName(e).path.forEach(e=>{this.Ft(t,60),this.$t(e,t)})}Ft(e,t){e.Mt(t)}Nt(e){e.Mt(2)}}function i2(e){return Math.ceil((64-function(e){let t=0;for(let n=0;n<8;++n){let r=function(e){if(0===e)return 8;let t=0;return e>>4||(t+=4,e<<=4),e>>6||(t+=2,e<<=2),e>>7||(t+=1),t}(255&e[n]);if(t+=r,8!==r)break}return t}(e))/8)}i1.Wt=new i1;class i4{constructor(){this.buffer=new Uint8Array(1024),this.position=0}Qt(e){let t=e[Symbol.iterator](),n=t.next();for(;!n.done;)this.Gt(n.value),n=t.next();this.zt()}jt(e){let t=e[Symbol.iterator](),n=t.next();for(;!n.done;)this.Jt(n.value),n=t.next();this.Ht()}Zt(e){for(let t of e){let e=t.charCodeAt(0);if(e<128)this.Gt(e);else if(e<2048)this.Gt(960|e>>>6),this.Gt(128|63&e);else if(t<"\ud800"||"\udbff"<t)this.Gt(480|e>>>12),this.Gt(128|63&e>>>6),this.Gt(128|63&e);else{let e=t.codePointAt(0);this.Gt(240|e>>>18),this.Gt(128|63&e>>>12),this.Gt(128|63&e>>>6),this.Gt(128|63&e)}}this.zt()}Xt(e){for(let t of e){let e=t.charCodeAt(0);if(e<128)this.Jt(e);else if(e<2048)this.Jt(960|e>>>6),this.Jt(128|63&e);else if(t<"\ud800"||"\udbff"<t)this.Jt(480|e>>>12),this.Jt(128|63&e>>>6),this.Jt(128|63&e);else{let e=t.codePointAt(0);this.Jt(240|e>>>18),this.Jt(128|63&e>>>12),this.Jt(128|63&e>>>6),this.Jt(128|63&e)}}this.Ht()}Yt(e){let t=this.en(e),n=i2(t);this.tn(1+n),this.buffer[this.position++]=255&n;for(let e=t.length-n;e<t.length;++e)this.buffer[this.position++]=255&t[e]}nn(e){let t=this.en(e),n=i2(t);this.tn(1+n),this.buffer[this.position++]=~(255&n);for(let e=t.length-n;e<t.length;++e)this.buffer[this.position++]=~(255&t[e])}rn(){this.sn(255),this.sn(255)}_n(){this.an(255),this.an(255)}reset(){this.position=0}seed(e){this.tn(e.length),this.buffer.set(e,this.position),this.position+=e.length}un(){return this.buffer.slice(0,this.position)}en(e){let t=function(e){let t=new DataView(new ArrayBuffer(8));return t.setFloat64(0,e,!1),new Uint8Array(t.buffer)}(e),n=!!(128&t[0]);t[0]^=n?255:128;for(let e=1;e<t.length;++e)t[e]^=n?255:0;return t}Gt(e){let t=255&e;0===t?(this.sn(0),this.sn(255)):255===t?(this.sn(255),this.sn(0)):this.sn(t)}Jt(e){let t=255&e;0===t?(this.an(0),this.an(255)):255===t?(this.an(255),this.an(0)):this.an(e)}zt(){this.sn(0),this.sn(1)}Ht(){this.an(0),this.an(1)}sn(e){this.tn(1),this.buffer[this.position++]=e}an(e){this.tn(1),this.buffer[this.position++]=~e}tn(e){let t=e+this.position;if(t<=this.buffer.length)return;let n=2*this.buffer.length;n<t&&(n=t);let r=new Uint8Array(n);r.set(this.buffer),this.buffer=r}}class i5{constructor(e){this.cn=e}Bt(e){this.cn.Qt(e)}xt(e){this.cn.Zt(e)}Mt(e){this.cn.Yt(e)}vt(){this.cn.rn()}}class i3{constructor(e){this.cn=e}Bt(e){this.cn.jt(e)}xt(e){this.cn.Xt(e)}Mt(e){this.cn.nn(e)}vt(){this.cn._n()}}class i6{constructor(){this.cn=new i4,this.ascending=new i5(this.cn),this.descending=new i3(this.cn)}seed(e){this.cn.seed(e)}ln(e){return 0===e?this.ascending:this.descending}un(){return this.cn.un()}reset(){this.cn.reset()}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class i8{constructor(e,t,n,r){this.hn=e,this.Pn=t,this.Tn=n,this.En=r}In(){let e=this.En.length,t=0===e||255===this.En[e-1]?e+1:e,n=new Uint8Array(t);return n.set(this.En,0),t!==e?n.set([0],this.En.length):++n[n.length-1],new i8(this.hn,this.Pn,this.Tn,n)}Rn(e,t,n){return{indexId:this.hn,uid:e,arrayValue:se(this.Tn),directionalValue:se(this.En),orderedDocumentKey:se(t),documentKey:n.path.toArray()}}An(e,t,n){let r=this.Rn(e,t,n);return[r.indexId,r.uid,r.arrayValue,r.directionalValue,r.orderedDocumentKey,r.documentKey]}}function i9(e,t){let n=e.hn-t.hn;return 0!==n?n:0!==(n=i7(e.Tn,t.Tn))?n:0!==(n=i7(e.En,t.En))?n:W.comparator(e.Pn,t.Pn)}function i7(e,t){for(let n=0;n<e.length&&n<t.length;++n){let r=e[n]-t[n];if(0!==r)return r}return e.length-t.length}function se(e){return(0,u.WO)()?function(e){let t="";for(let n=0;n<e.length;n++)t+=String.fromCharCode(e[n]);return t}(e):e}function st(e){return"string"!=typeof e?e:function(e){let t=new Uint8Array(e.length);for(let n=0;n<e.length;n++)t[n]=e.charCodeAt(n);return t}(e)}class sn{constructor(e){for(let t of(this.Vn=new tz((e,t)=>J.comparator(e.field,t.field)),this.collectionId=null!=e.collectionGroup?e.collectionGroup:e.path.lastSegment(),this.dn=e.orderBy,this.mn=[],e.filters))t.isInequality()?this.Vn=this.Vn.add(t):this.mn.push(t)}get fn(){return this.Vn.size>1}gn(e){if(_(e.collectionGroup===this.collectionId,49279),this.fn)return!1;let t=ec(e);if(void 0!==t&&!this.pn(t))return!1;let n=eh(e),r=new Set,i=0,s=0;for(;i<n.length&&this.pn(n[i]);++i)r=r.add(n[i].fieldPath.canonicalString());if(i===n.length)return!0;if(this.Vn.size>0){let e=this.Vn.getIterator().getNext();if(!r.has(e.field.canonicalString())){let t=n[i];if(!this.yn(e,t)||!this.wn(this.dn[s++],t))return!1}++i}for(;i<n.length;++i){let e=n[i];if(s>=this.dn.length||!this.wn(this.dn[s++],e))return!1}return!0}Sn(){if(this.fn)return null;let e=new tz(J.comparator),t=[];for(let n of this.mn)if(!n.field.isKeyField()){if("array-contains"===n.op||"array-contains-any"===n.op)t.push(new ef(n.field,2));else{if(e.has(n.field))continue;e=e.add(n.field),t.push(new ef(n.field,0))}}for(let n of this.dn)n.field.isKeyField()||e.has(n.field)||(e=e.add(n.field),t.push(new ef(n.field,"asc"===n.dir?0:1)));return new el(el.UNKNOWN_ID,this.collectionId,t,em.empty())}pn(e){for(let t of this.mn)if(this.yn(t,e))return!0;return!1}yn(e,t){if(void 0===e||!e.field.isEqual(t.fieldPath))return!1;let n="array-contains"===e.op||"array-contains-any"===e.op;return 2===t.kind===n}wn(e,t){return!!e.field.isEqual(t.fieldPath)&&(0===t.kind&&"asc"===e.dir||1===t.kind&&"desc"===e.dir)}}function sr(e){return e instanceof nR}function si(e){return e instanceof nV&&nM(e)}function ss(e){return sr(e)||si(e)||function(e){if(e instanceof nV&&nO(e)){for(let t of e.getFilters())if(!sr(t)&&!si(t))return!1;return!0}return!1}(e)}function sa(e,t){return _(e instanceof nR||e instanceof nV,38388),_(t instanceof nR||t instanceof nV,25473),su(e instanceof nR?t instanceof nR?nV.create([e,t],"and"):so(e,t):t instanceof nR?so(t,e):function(e,t){if(_(e.filters.length>0&&t.filters.length>0,48005),nF(e)&&nF(t))return nL(e,t.getFilters());let n=nO(e)?e:t,r=nO(e)?t:e,i=n.filters.map(e=>sa(e,r));return nV.create(i,"or")}(e,t))}function so(e,t){if(nF(t))return nL(t,e.getFilters());{let n=t.filters.map(t=>sa(e,t));return nV.create(n,"or")}}function su(e){if(_(e instanceof nR||e instanceof nV,11850),e instanceof nR)return e;let t=e.getFilters();if(1===t.length)return su(t[0]);if(nP(e))return e;let n=t.map(e=>su(e)),r=[];return n.forEach(t=>{t instanceof nR?r.push(t):t instanceof nV&&(t.op===e.op?r.push(...t.filters):r.push(t))}),1===r.length?r[0]:nV.create(r,e.op)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class sl{constructor(){this.bn=new sc}addToCollectionParentIndex(e,t){return this.bn.add(t),eb.resolve()}getCollectionParents(e,t){return eb.resolve(this.bn.getEntries(t))}addFieldIndex(e,t){return eb.resolve()}deleteFieldIndex(e,t){return eb.resolve()}deleteAllFieldIndexes(e){return eb.resolve()}createTargetIndexes(e,t){return eb.resolve()}getDocumentsMatchingTarget(e,t){return eb.resolve(null)}getIndexType(e,t){return eb.resolve(0)}getFieldIndexes(e,t){return eb.resolve([])}getNextCollectionGroupToUpdate(e){return eb.resolve(null)}getMinOffset(e,t){return eb.resolve(ey.min())}getMinOffsetFromCollectionGroup(e,t){return eb.resolve(ey.min())}updateCollectionGroup(e,t,n){return eb.resolve()}updateIndexEntries(e,t){return eb.resolve()}}class sc{constructor(){this.index={}}add(e){let t=e.lastSegment(),n=e.popLast(),r=this.index[t]||new tz(Q.comparator),i=!r.has(n);return this.index[t]=r.add(n),i}has(e){let t=e.lastSegment(),n=e.popLast(),r=this.index[t];return r&&r.has(n)}getEntries(e){return(this.index[e]||new tz(Q.comparator)).toArray()}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let sh="IndexedDbIndexManager",sd=new Uint8Array(0);class sf{constructor(e,t){this.databaseId=t,this.Dn=new sc,this.Cn=new rc(e=>nJ(e),(e,t)=>nW(e,t)),this.uid=e.uid||""}addToCollectionParentIndex(e,t){if(!this.Dn.has(t)){let n=t.lastSegment(),r=t.popLast();e.addOnCommittedListener(()=>{this.Dn.add(t)});let i={collectionId:n,parent:eB(r)};return tF(e,ta).put(i)}return eb.resolve()}getCollectionParents(e,t){let n=[],r=IDBKeyRange.bound([t,""],[t+"\0",""],!1,!0);return tF(e,ta).J(r).next(e=>{for(let r of e){if(r.collectionId!==t)break;n.push(ez(r.parent))}return n})}addFieldIndex(e,t){let n=tF(e,th),r={indexId:t.indexId,collectionGroup:t.collectionGroup,fields:t.fields.map(e=>[e.fieldPath.canonicalString(),e.kind])};delete r.indexId;let i=n.add(r);if(t.indexState){let n=tF(e,tf);return i.next(e=>{n.put(iY(e,this.uid,t.indexState.sequenceNumber,t.indexState.offset))})}return i.next()}deleteFieldIndex(e,t){let n=tF(e,th),r=tF(e,tf),i=tF(e,ty);return n.delete(t.indexId).next(()=>r.delete(IDBKeyRange.bound([t.indexId],[t.indexId+1],!1,!0))).next(()=>i.delete(IDBKeyRange.bound([t.indexId],[t.indexId+1],!1,!0)))}deleteAllFieldIndexes(e){let t=tF(e,th),n=tF(e,ty),r=tF(e,tf);return t.X().next(()=>n.X()).next(()=>r.X())}createTargetIndexes(e,t){return eb.forEach(this.vn(t),t=>this.getIndexType(e,t).next(n=>{if(0===n||1===n){let n=new sn(t).Sn();if(null!=n)return this.addFieldIndex(e,n)}}))}getDocumentsMatchingTarget(e,t){let n=tF(e,ty),r=!0,i=new Map;return eb.forEach(this.vn(t),t=>this.Fn(e,t).next(e=>{r&&(r=!!e),i.set(t,e)})).next(()=>{if(r){let e=rw(),r=[];return eb.forEach(i,(i,s)=>{I(sh,`Using index id=${i.indexId}|cg=${i.collectionGroup}|f=${i.fields.map(e=>`${e.fieldPath}:${e.kind}`).join(",")} to execute ${nJ(t)}`);let a=function(e,t){let n=ec(t);if(void 0===n)return null;for(let t of nX(e,n.fieldPath))switch(t.op){case"array-contains-any":return t.value.arrayValue.values||[];case"array-contains":return[t.value]}return null}(s,i),o=function(e,t){let n=new Map;for(let r of eh(t))for(let t of nX(e,r.fieldPath))switch(t.op){case"==":case"in":n.set(r.fieldPath.canonicalString(),t.value);break;case"not-in":case"!=":return n.set(r.fieldPath.canonicalString(),t.value),Array.from(n.values())}return null}(s,i),u=function(e,t){let n=[],r=!0;for(let i of eh(t)){let t=0===i.kind?nZ(e,i.fieldPath,e.startAt):n0(e,i.fieldPath,e.startAt);n.push(t.value),r&&(r=t.inclusive)}return new nC(n,r)}(s,i),l=function(e,t){let n=[],r=!0;for(let i of eh(t)){let t=0===i.kind?n0(e,i.fieldPath,e.endAt):nZ(e,i.fieldPath,e.endAt);n.push(t.value),r&&(r=t.inclusive)}return new nC(n,r)}(s,i),c=this.Mn(i,s,u),h=this.Mn(i,s,l),d=this.xn(i,s,o),f=this.On(i.indexId,a,c,u.inclusive,h,l.inclusive,d);return eb.forEach(f,i=>n.Z(i,t.limit).next(t=>{t.forEach(t=>{let n=W.fromSegments(t.documentKey);e.has(n)||(e=e.add(n),r.push(n))})}))}).next(()=>r)}return eb.resolve(null)})}vn(e){let t=this.Cn.get(e);return t||(t=0===e.filters.length?[e]:(function(e){if(0===e.getFilters().length)return[];let t=function e(t){if(_(t instanceof nR||t instanceof nV,34018),t instanceof nR)return t;if(1===t.filters.length)return e(t.filters[0]);let n=t.filters.map(t=>e(t)),r=nV.create(n,t.op);return ss(r=su(r))?r:(_(r instanceof nV,64498),_(nF(r),40251),_(r.filters.length>1,57927),r.filters.reduce((e,t)=>sa(e,t)))}(/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function e(t){if(_(t instanceof nR||t instanceof nV,20012),t instanceof nR){if(t instanceof n$){let e=t.value.arrayValue?.values?.map(e=>nR.create(t.field,"==",e))||[];return nV.create(e,"or")}return t}let n=t.filters.map(t=>e(t));return nV.create(n,t.op)}(e));return _(ss(t),7391),sr(t)||si(t)?[t]:t.getFilters()})(nV.create(e.filters,"and")).map(t=>nH(e.path,e.collectionGroup,e.orderBy,t.getFilters(),e.limit,e.startAt,e.endAt)),this.Cn.set(e,t)),t}On(e,t,n,r,i,s,a){let o=(null!=t?t.length:1)*Math.max(n.length,i.length),u=o/(null!=t?t.length:1),l=[];for(let c=0;c<o;++c){let o=t?this.Nn(t[c/u]):sd,h=this.Bn(e,o,n[c%u],r),d=this.Ln(e,o,i[c%u],s),f=a.map(t=>this.Bn(e,o,t,!0));l.push(...this.createRange(h,d,f))}return l}Bn(e,t,n,r){let i=new i8(e,W.empty(),t,n);return r?i:i.In()}Ln(e,t,n,r){let i=new i8(e,W.empty(),t,n);return r?i.In():i}Fn(e,t){let n=new sn(t),r=null!=t.collectionGroup?t.collectionGroup:t.path.lastSegment();return this.getFieldIndexes(e,r).next(e=>{let t=null;for(let r of e)n.gn(r)&&(!t||r.fields.length>t.fields.length)&&(t=r);return t})}getIndexType(e,t){let n=2,r=this.vn(t);return eb.forEach(r,t=>this.Fn(e,t).next(e=>{e?0!==n&&e.fields.length<function(e){let t=new tz(J.comparator),n=!1;for(let r of e.filters)for(let e of r.getFlattenedFilters())e.field.isKeyField()||("array-contains"===e.op||"array-contains-any"===e.op?n=!0:t=t.add(e.field));for(let n of e.orderBy)n.field.isKeyField()||(t=t.add(n.field));return t.size+(n?1:0)}(t)&&(n=1):n=0})).next(()=>null!==t.limit&&r.length>1&&2===n?1:n)}kn(e,t){let n=new i6;for(let r of eh(e)){let e=t.data.field(r.fieldPath);if(null==e)return null;let i=n.ln(r.kind);i1.Wt.Dt(e,i)}return n.un()}Nn(e){let t=new i6;return i1.Wt.Dt(e,t.ln(0)),t.un()}qn(e,t){let n=new i6;return i1.Wt.Dt(nf(this.databaseId,t),n.ln(function(e){let t=eh(e);return 0===t.length?0:t[t.length-1].kind}(e))),n.un()}xn(e,t,n){if(null===n)return[];let r=[];r.push(new i6);let i=0;for(let s of eh(e)){let e=n[i++];for(let n of r)if(this.Kn(t,s.fieldPath)&&ng(e))r=this.Un(r,s,e);else{let t=n.ln(s.kind);i1.Wt.Dt(e,t)}}return this.$n(r)}Mn(e,t,n){return this.xn(e,t,n.position)}$n(e){let t=[];for(let n=0;n<e.length;++n)t[n]=e[n].un();return t}Un(e,t,n){let r=[...e],i=[];for(let e of n.arrayValue.values||[])for(let n of r){let r=new i6;r.seed(n.un()),i1.Wt.Dt(e,r.ln(t.kind)),i.push(r)}return i}Kn(e,t){return!!e.filters.find(e=>e instanceof nR&&e.field.isEqual(t)&&("in"===e.op||"not-in"===e.op))}getFieldIndexes(e,t){let n=tF(e,th),r=tF(e,tf);return(t?n.J(td,IDBKeyRange.bound(t,t)):n.J()).next(e=>{let t=[];return eb.forEach(e,e=>r.get([e.indexId,this.uid]).next(n=>{t.push(function(e,t){let n=t?new em(t.sequenceNumber,new ey(i$(t.readTime),new W(ez(t.documentKey)),t.largestBatchId)):em.empty(),r=e.fields.map(([e,t])=>new ef(J.fromServerFormat(e),t));return new el(e.indexId,e.collectionGroup,r,n)}(e,n))})).next(()=>t)})}getNextCollectionGroupToUpdate(e){return this.getFieldIndexes(e).next(e=>0===e.length?null:(e.sort((e,t)=>{let n=e.indexState.sequenceNumber-t.indexState.sequenceNumber;return 0!==n?n:B(e.collectionGroup,t.collectionGroup)}),e[0].collectionGroup))}updateCollectionGroup(e,t,n){let r=tF(e,th),i=tF(e,tf);return this.Wn(e).next(e=>r.J(td,IDBKeyRange.bound(t,t)).next(t=>eb.forEach(t,t=>i.put(iY(t.indexId,this.uid,e,n)))))}updateIndexEntries(e,t){let n=new Map;return eb.forEach(t,(t,r)=>{let i=n.get(t.collectionGroup);return(i?eb.resolve(i):this.getFieldIndexes(e,t.collectionGroup)).next(i=>(n.set(t.collectionGroup,i),eb.forEach(i,n=>this.Qn(e,t,n).next(t=>{let i=this.Gn(r,n);return t.isEqual(i)?eb.resolve():this.zn(e,r,n,t,i)}))))})}jn(e,t,n,r){return tF(e,ty).put(r.Rn(this.uid,this.qn(n,t.key),t.key))}Jn(e,t,n,r){return tF(e,ty).delete(r.An(this.uid,this.qn(n,t.key),t.key))}Qn(e,t,n){let r=tF(e,ty),i=new tz(i9);return r.ee({index:tv,range:IDBKeyRange.only([n.indexId,this.uid,se(this.qn(n,t))])},(e,r)=>{i=i.add(new i8(n.indexId,t,st(r.arrayValue),st(r.directionalValue)))}).next(()=>i)}Gn(e,t){let n=new tz(i9),r=this.kn(t,e);if(null==r)return n;let i=ec(t);if(null!=i){let s=e.data.field(i.fieldPath);if(ng(s))for(let i of s.arrayValue.values||[])n=n.add(new i8(t.indexId,e.key,this.Nn(i),r))}else n=n.add(new i8(t.indexId,e.key,sd,r));return n}zn(e,t,n,r,i){I(sh,"Updating index entries for document '%s'",t.key);let s=[];return function(e,t,n,r,i){let s=e.getIterator(),a=t.getIterator(),o=t$(s),u=t$(a);for(;o||u;){let e=!1,t=!1;if(o&&u){let r=n(o,u);r<0?t=!0:r>0&&(e=!0)}else null!=o?t=!0:e=!0;e?(r(u),u=t$(a)):t?(i(o),o=t$(s)):(o=t$(s),u=t$(a))}}(r,i,i9,r=>{s.push(this.jn(e,t,n,r))},r=>{s.push(this.Jn(e,t,n,r))}),eb.waitFor(s)}Wn(e){let t=1;return tF(e,tf).ee({index:tg,reverse:!0,range:IDBKeyRange.upperBound([this.uid,Number.MAX_SAFE_INTEGER])},(e,n,r)=>{r.done(),t=n.sequenceNumber+1}).next(()=>t)}createRange(e,t,n){n=n.sort((e,t)=>i9(e,t)).filter((e,t,n)=>!t||0!==i9(e,n[t-1]));let r=[];for(let i of(r.push(e),n)){let n=i9(i,e),s=i9(i,t);if(0===n)r[0]=e.In();else if(n>0&&s<0)r.push(i),r.push(i.In());else if(s>0)break}r.push(t);let i=[];for(let e=0;e<r.length;e+=2){if(this.Hn(r[e],r[e+1]))return[];let t=r[e].An(this.uid,sd,W.empty()),n=r[e+1].An(this.uid,sd,W.empty());i.push(IDBKeyRange.bound(t,n))}return i}Hn(e,t){return i9(e,t)>0}getMinOffsetFromCollectionGroup(e,t){return this.getFieldIndexes(e,t).next(sm)}getMinOffset(e,t){return eb.mapArray(this.vn(t),t=>this.Fn(e,t).next(e=>e||S(44426))).next(sm)}}function sm(e){_(0!==e.length,28825);let t=e[0].indexState.offset,n=t.largestBatchId;for(let r=1;r<e.length;r++){let i=e[r].indexState.offset;0>ew(i,t)&&(t=i),n<i.largestBatchId&&(n=i.largestBatchId)}return new ey(t.readTime,t.documentKey,n)}/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let sg={didRun:!1,sequenceNumbersCollected:0,targetsRemoved:0,documentsRemoved:0};class sp{static withCacheSize(e){return new sp(e,sp.DEFAULT_COLLECTION_PERCENTILE,sp.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT)}constructor(e,t,n){this.cacheSizeCollectionThreshold=e,this.percentileToCollect=t,this.maximumSequenceNumbersToCollect=n}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function sy(e,t,n){let r=e.store(eQ),i=e.store(eX),s=[],a=IDBKeyRange.only(n.batchId),o=0,u=r.ee({range:a},(e,t,n)=>(o++,n.delete()));s.push(u.next(()=>{_(1===o,47070,{batchId:n.batchId})}));let l=[];for(let e of n.mutations){var c,h;let r=(c=e.key.path,h=n.batchId,[t,eB(c),h]);s.push(i.delete(r)),l.push(e.key)}return eb.waitFor(s).next(()=>l)}function sw(e){let t;if(!e)return 0;if(e.document)t=e.document;else if(e.unknownDocument)t=e.unknownDocument;else{if(!e.noDocument)throw S(14731);t=e.noDocument}return JSON.stringify(t).length}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */sp.DEFAULT_COLLECTION_PERCENTILE=10,sp.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT=1e3,sp.DEFAULT=new sp(41943040,sp.DEFAULT_COLLECTION_PERCENTILE,sp.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT),sp.DISABLED=new sp(-1,0,0);class sv{constructor(e,t,n,r){this.userId=e,this.serializer=t,this.indexManager=n,this.referenceDelegate=r,this.Zn={}}static wt(e,t,n,r){return _(""!==e.uid,64387),new sv(e.isAuthenticated()?e.uid:"",t,n,r)}checkEmpty(e){let t=!0,n=IDBKeyRange.bound([this.userId,Number.NEGATIVE_INFINITY],[this.userId,Number.POSITIVE_INFINITY]);return sT(e).ee({index:eJ,range:n},(e,n,r)=>{t=!1,r.done()}).next(()=>t)}addMutationBatch(e,t,n,r){let i=tF(e,eX),s=sT(e);return s.add({}).next(a=>{_("number"==typeof a,49019);let o=new rH(a,t,n,r),u=function(e,t,n){let r=n.baseMutations.map(t=>iD(e.yt,t)),i=n.mutations.map(t=>iD(e.yt,t));return{userId:t,batchId:n.batchId,localWriteTimeMs:n.localWriteTime.toMillis(),baseMutations:r,mutations:i}}(this.serializer,this.userId,o),l=[],c=new tz((e,t)=>B(e.canonicalString(),t.canonicalString()));for(let e of r){let t=[this.userId,eB(e.key.path),a];c=c.add(e.key.path.popLast()),l.push(s.put(u)),l.push(i.put(t,eY))}return c.forEach(t=>{l.push(this.indexManager.addToCollectionParentIndex(e,t))}),e.addOnCommittedListener(()=>{this.Zn[a]=o.keys()}),eb.waitFor(l).next(()=>o)})}lookupMutationBatch(e,t){return sT(e).get(t).next(e=>e?(_(e.userId===this.userId,48,"Unexpected user for mutation batch",{userId:e.userId,batchId:t}),iG(this.serializer,e)):null)}Xn(e,t){return this.Zn[t]?eb.resolve(this.Zn[t]):this.lookupMutationBatch(e,t).next(e=>{if(e){let n=e.keys();return this.Zn[t]=n,n}return null})}getNextMutationBatchAfterBatchId(e,t){let n=t+1,r=IDBKeyRange.lowerBound([this.userId,n]),i=null;return sT(e).ee({index:eJ,range:r},(e,t,r)=>{t.userId===this.userId&&(_(t.batchId>=n,47524,{Yn:n}),i=iG(this.serializer,t)),r.done()}).next(()=>i)}getHighestUnacknowledgedBatchId(e){let t=IDBKeyRange.upperBound([this.userId,Number.POSITIVE_INFINITY]),n=-1;return sT(e).ee({index:eJ,range:t,reverse:!0},(e,t,r)=>{n=t.batchId,r.done()}).next(()=>n)}getAllMutationBatches(e){let t=IDBKeyRange.bound([this.userId,-1],[this.userId,Number.POSITIVE_INFINITY]);return sT(e).J(eJ,t).next(e=>e.map(e=>iG(this.serializer,e)))}getAllMutationBatchesAffectingDocumentKey(e,t){let n=[this.userId,eB(t.path)],r=IDBKeyRange.lowerBound(n),i=[];return tF(e,eX).ee({range:r},(n,r,s)=>{let[a,o,u]=n,l=ez(o);if(a===this.userId&&t.path.isEqual(l))return sT(e).get(u).next(e=>{if(!e)throw S(61480,{er:n,batchId:u});_(e.userId===this.userId,10503,"Unexpected user for mutation batch",{userId:e.userId,batchId:u}),i.push(iG(this.serializer,e))});s.done()}).next(()=>i)}getAllMutationBatchesAffectingDocumentKeys(e,t){let n=new tz(B),r=[];return t.forEach(t=>{let i=[this.userId,eB(t.path)],s=IDBKeyRange.lowerBound(i),a=tF(e,eX).ee({range:s},(e,r,i)=>{let[s,a,o]=e,u=ez(a);s===this.userId&&t.path.isEqual(u)?n=n.add(o):i.done()});r.push(a)}),eb.waitFor(r).next(()=>this.tr(e,n))}getAllMutationBatchesAffectingQuery(e,t){let n=t.path,r=n.length+1,i=[this.userId,eB(n)],s=IDBKeyRange.lowerBound(i),a=new tz(B);return tF(e,eX).ee({range:s},(e,t,i)=>{let[s,o,u]=e,l=ez(o);s===this.userId&&n.isPrefixOf(l)?l.length===r&&(a=a.add(u)):i.done()}).next(()=>this.tr(e,a))}tr(e,t){let n=[],r=[];return t.forEach(t=>{r.push(sT(e).get(t).next(e=>{if(null===e)throw S(35274,{batchId:t});_(e.userId===this.userId,9748,"Unexpected user for mutation batch",{userId:e.userId,batchId:t}),n.push(iG(this.serializer,e))}))}),eb.waitFor(r).next(()=>n)}removeMutationBatch(e,t){return sy(e.le,this.userId,t).next(n=>(e.addOnCommittedListener(()=>{this.nr(t.batchId)}),eb.forEach(n,t=>this.referenceDelegate.markPotentiallyOrphaned(e,t))))}nr(e){delete this.Zn[e]}performConsistencyCheck(e){return this.checkEmpty(e).next(t=>{if(!t)return eb.resolve();let n=IDBKeyRange.lowerBound([this.userId]),r=[];return tF(e,eX).ee({range:n},(e,t,n)=>{if(e[0]===this.userId){let t=ez(e[1]);r.push(t)}else n.done()}).next(()=>{_(0===r.length,56720,{rr:r.map(e=>e.canonicalString())})})})}containsKey(e,t){return sI(e,this.userId,t)}ir(e){return tF(e,ej).get(this.userId).next(e=>e||{userId:this.userId,lastAcknowledgedBatchId:-1,lastStreamToken:""})}}function sI(e,t,n){let r=[t,eB(n.path)],i=r[1],s=IDBKeyRange.lowerBound(r),a=!1;return tF(e,eX).ee({range:s,Y:!0},(e,n,r)=>{let[s,o,u]=e;s===t&&o===i&&(a=!0),r.done()}).next(()=>a)}function sT(e){return tF(e,eQ)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class sb{constructor(e){this.sr=e}next(){return this.sr+=2,this.sr}static _r(){return new sb(0)}static ar(){return new sb(-1)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class sE{constructor(e,t){this.referenceDelegate=e,this.serializer=t}allocateTargetId(e){return this.ur(e).next(t=>{let n=new sb(t.highestTargetId);return t.highestTargetId=n.next(),this.cr(e,t).next(()=>t.highestTargetId)})}getLastRemoteSnapshotVersion(e){return this.ur(e).next(e=>eu.fromTimestamp(new eo(e.lastRemoteSnapshotVersion.seconds,e.lastRemoteSnapshotVersion.nanoseconds)))}getHighestSequenceNumber(e){return this.ur(e).next(e=>e.highestListenSequenceNumber)}setTargetsMetadata(e,t,n){return this.ur(e).next(r=>(r.highestListenSequenceNumber=t,n&&(r.lastRemoteSnapshotVersion=n.toTimestamp()),t>r.highestListenSequenceNumber&&(r.highestListenSequenceNumber=t),this.cr(e,r)))}addTargetData(e,t){return this.lr(e,t).next(()=>this.ur(e).next(n=>(n.targetCount+=1,this.hr(t,n),this.cr(e,n))))}updateTargetData(e,t){return this.lr(e,t)}removeTargetData(e,t){return this.removeMatchingKeysForTargetId(e,t.targetId).next(()=>tF(e,e8).delete(t.targetId)).next(()=>this.ur(e)).next(t=>(_(t.targetCount>0,8065),t.targetCount-=1,this.cr(e,t)))}removeTargets(e,t,n){let r=0,i=[];return tF(e,e8).ee((s,a)=>{let o=ij(a);o.sequenceNumber<=t&&null===n.get(o.targetId)&&(r++,i.push(this.removeTargetData(e,o)))}).next(()=>eb.waitFor(i)).next(()=>r)}forEachTarget(e,t){return tF(e,e8).ee((e,n)=>{t(ij(n))})}ur(e){return tF(e,ts).get(ti).next(e=>(_(null!==e,2888),e))}cr(e,t){return tF(e,ts).put(ti,t)}lr(e,t){return tF(e,e8).put(iQ(this.serializer,t))}hr(e,t){let n=!1;return e.targetId>t.highestTargetId&&(t.highestTargetId=e.targetId,n=!0),e.sequenceNumber>t.highestListenSequenceNumber&&(t.highestListenSequenceNumber=e.sequenceNumber,n=!0),n}getTargetCount(e){return this.ur(e).next(e=>e.targetCount)}getTargetData(e,t){let n=nJ(t),r=IDBKeyRange.bound([n,Number.NEGATIVE_INFINITY],[n,Number.POSITIVE_INFINITY]),i=null;return tF(e,e8).ee({range:r,index:e9},(e,n,r)=>{let s=ij(n);nW(t,s.target)&&(i=s,r.done())}).next(()=>i)}addMatchingKeys(e,t,n){let r=[],i=sS(e);return t.forEach(t=>{let s=eB(t.path);r.push(i.put({targetId:n,path:s})),r.push(this.referenceDelegate.addReference(e,n,t))}),eb.waitFor(r)}removeMatchingKeys(e,t,n){let r=sS(e);return eb.forEach(t,t=>{let i=eB(t.path);return eb.waitFor([r.delete([n,i]),this.referenceDelegate.removeReference(e,n,t)])})}removeMatchingKeysForTargetId(e,t){let n=sS(e),r=IDBKeyRange.bound([t],[t+1],!1,!0);return n.delete(r)}getMatchingKeysForTargetId(e,t){let n=IDBKeyRange.bound([t],[t+1],!1,!0),r=sS(e),i=rw();return r.ee({range:n,Y:!0},(e,t,n)=>{let r=new W(ez(e[1]));i=i.add(r)}).next(()=>i)}containsKey(e,t){let n=eB(t.path),r=IDBKeyRange.bound([n],[n+"\0"],!1,!0),i=0;return sS(e).ee({index:tn,Y:!0,range:r},([e,t],n,r)=>{0!==e&&(i++,r.done())}).next(()=>i>0)}At(e,t){return tF(e,e8).get(t).next(e=>e?ij(e):null)}}function sS(e){return tF(e,te)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let sx="LruGarbageCollector";function s_([e,t],[n,r]){let i=B(e,n);return 0===i?B(t,r):i}class sC{constructor(e){this.Pr=e,this.buffer=new tz(s_),this.Tr=0}Er(){return++this.Tr}Ir(e){let t=[e,this.Er()];if(this.buffer.size<this.Pr)this.buffer=this.buffer.add(t);else{let e=this.buffer.last();0>s_(t,e)&&(this.buffer=this.buffer.delete(e).add(t))}}get maxValue(){return this.buffer.last()[0]}}class sN{constructor(e,t,n){this.garbageCollector=e,this.asyncQueue=t,this.localStore=n,this.Rr=null}start(){-1!==this.garbageCollector.params.cacheSizeCollectionThreshold&&this.Ar(6e4)}stop(){this.Rr&&(this.Rr.cancel(),this.Rr=null)}get started(){return null!==this.Rr}Ar(e){I(sx,`Garbage collection scheduled in ${e}ms`),this.Rr=this.asyncQueue.enqueueAfterDelay("lru_garbage_collection",e,async()=>{this.Rr=null;try{await this.localStore.collectGarbage(this.garbageCollector)}catch(e){eD(e)?I(sx,"Ignoring IndexedDB error during garbage collection: ",e):await eT(e)}await this.Ar(3e5)})}}class sD{constructor(e,t){this.Vr=e,this.params=t}calculateTargetCount(e,t){return this.Vr.dr(e).next(e=>Math.floor(t/100*e))}nthSequenceNumber(e,t){if(0===t)return eb.resolve(eP.ce);let n=new sC(t);return this.Vr.forEachTarget(e,e=>n.Ir(e.sequenceNumber)).next(()=>this.Vr.mr(e,e=>n.Ir(e))).next(()=>n.maxValue)}removeTargets(e,t,n){return this.Vr.removeTargets(e,t,n)}removeOrphanedDocuments(e,t){return this.Vr.removeOrphanedDocuments(e,t)}collect(e,t){return -1===this.params.cacheSizeCollectionThreshold?(I("LruGarbageCollector","Garbage collection skipped; disabled"),eb.resolve(sg)):this.getCacheSize(e).next(n=>n<this.params.cacheSizeCollectionThreshold?(I("LruGarbageCollector",`Garbage collection skipped; Cache size ${n} is lower than threshold ${this.params.cacheSizeCollectionThreshold}`),sg):this.gr(e,t))}getCacheSize(e){return this.Vr.getCacheSize(e)}gr(e,t){let n,r,i,s,a,o,u;let l=Date.now();return this.calculateTargetCount(e,this.params.percentileToCollect).next(t=>(t>this.params.maximumSequenceNumbersToCollect?(I("LruGarbageCollector",`Capping sequence numbers to collect down to the maximum of ${this.params.maximumSequenceNumbersToCollect} from ${t}`),r=this.params.maximumSequenceNumbersToCollect):r=t,s=Date.now(),this.nthSequenceNumber(e,r))).next(r=>(n=r,a=Date.now(),this.removeTargets(e,n,t))).next(t=>(i=t,o=Date.now(),this.removeOrphanedDocuments(e,n))).next(e=>(u=Date.now(),w()<=c.in.DEBUG&&I("LruGarbageCollector",`LRU Garbage Collection
	Counted targets in ${s-l}ms
	Determined least recently used ${r} in `+(a-s)+"ms\n"+`	Removed ${i} targets in `+(o-a)+"ms\n"+`	Removed ${e} documents in `+(u-o)+"ms\n"+`Total Duration: ${u-l}ms`),eb.resolve({didRun:!0,sequenceNumbersCollected:r,targetsRemoved:i,documentsRemoved:e})))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class sk{constructor(e,t){this.db=e,this.garbageCollector=new sD(this,t)}dr(e){let t=this.pr(e);return this.db.getTargetCache().getTargetCount(e).next(e=>t.next(t=>e+t))}pr(e){let t=0;return this.mr(e,e=>{t++}).next(()=>t)}forEachTarget(e,t){return this.db.getTargetCache().forEachTarget(e,t)}mr(e,t){return this.yr(e,(e,n)=>t(n))}addReference(e,t,n){return sA(e,n)}removeReference(e,t,n){return sA(e,n)}removeTargets(e,t,n){return this.db.getTargetCache().removeTargets(e,t,n)}markPotentiallyOrphaned(e,t){return sA(e,t)}wr(e,t){let n;return n=!1,tF(e,ej).te(r=>sI(e,r,t).next(e=>(e&&(n=!0),eb.resolve(!e)))).next(()=>n)}removeOrphanedDocuments(e,t){let n=this.db.getRemoteDocumentCache().newChangeBuffer(),r=[],i=0;return this.yr(e,(s,a)=>{if(a<=t){let t=this.wr(e,s).next(t=>{if(!t)return i++,n.getEntry(e,s).next(()=>(n.removeEntry(s,eu.min()),sS(e).delete([0,eB(s.path)])))});r.push(t)}}).next(()=>eb.waitFor(r)).next(()=>n.apply(e)).next(()=>i)}removeTarget(e,t){let n=t.withSequenceNumber(e.currentSequenceNumber);return this.db.getTargetCache().updateTargetData(e,n)}updateLimboDocument(e,t){return sA(e,t)}yr(e,t){let n=sS(e),r,i=eP.ce;return n.ee({index:tn},([e,n],{path:s,sequenceNumber:a})=>{0===e?(i!==eP.ce&&t(new W(ez(r)),i),i=a,r=s):i=eP.ce}).next(()=>{i!==eP.ce&&t(new W(ez(r)),i)})}getCacheSize(e){return this.db.getRemoteDocumentCache().getSize(e)}}function sA(e,t){var n;return sS(e).put((n=e.currentSequenceNumber,{targetId:0,path:eB(t.path),sequenceNumber:n}))}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class sR{constructor(){this.changes=new rc(e=>e.toString(),(e,t)=>e.isEqual(t)),this.changesApplied=!1}addEntry(e){this.assertNotApplied(),this.changes.set(e.key,e)}removeEntry(e,t){this.assertNotApplied(),this.changes.set(e,n_.newInvalidDocument(e).setReadTime(t))}getEntry(e,t){this.assertNotApplied();let n=this.changes.get(t);return void 0!==n?eb.resolve(n):this.getFromCache(e,t)}getEntries(e,t){return this.getAllFromCache(e,t)}apply(e){return this.assertNotApplied(),this.changesApplied=!0,this.applyChanges(e)}assertNotApplied(){}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class sV{constructor(e){this.serializer=e}setIndexManager(e){this.indexManager=e}addEntry(e,t,n){return tF(e,eZ).put(n)}removeEntry(e,t,n){return tF(e,eZ).delete(function(e,t){let n=e.path.toArray();return[n.slice(0,n.length-2),n[n.length-2],iz(t),n[n.length-1]]}(t,n))}updateMetadata(e,t){return this.getMetadata(e).next(n=>(n.byteSize+=t,this.Sr(e,n)))}getEntry(e,t){let n=n_.newInvalidDocument(t);return tF(e,eZ).ee({index:e1,range:IDBKeyRange.only(sO(t))},(e,r)=>{n=this.br(t,r)}).next(()=>n)}Dr(e,t){let n={size:0,document:n_.newInvalidDocument(t)};return tF(e,eZ).ee({index:e1,range:IDBKeyRange.only(sO(t))},(e,r)=>{n={document:this.br(t,r),size:sw(r)}}).next(()=>n)}getEntries(e,t){let n=rh;return this.Cr(e,t,(e,t)=>{let r=this.br(e,t);n=n.insert(e,r)}).next(()=>n)}vr(e,t){let n=rh,r=new tU(W.comparator);return this.Cr(e,t,(e,t)=>{let i=this.br(e,t);n=n.insert(e,i),r=r.insert(e,sw(t))}).next(()=>({documents:n,Fr:r}))}Cr(e,t,n){if(t.isEmpty())return eb.resolve();let r=new tz(sP);t.forEach(e=>r=r.add(e));let i=IDBKeyRange.bound(sO(r.first()),sO(r.last())),s=r.getIterator(),a=s.getNext();return tF(e,eZ).ee({index:e1,range:i},(e,t,r)=>{let i=W.fromSegments([...t.prefixPath,t.collectionGroup,t.documentId]);for(;a&&0>sP(a,i);)n(a,null),a=s.getNext();a&&a.isEqual(i)&&(n(a,t),a=s.hasNext()?s.getNext():null),a?r.j(sO(a)):r.done()}).next(()=>{for(;a;)n(a,null),a=s.hasNext()?s.getNext():null})}getDocumentsMatchingQuery(e,t,n,r,i){let s=t.path,a=[s.popLast().toArray(),s.lastSegment(),iz(n.readTime),n.documentKey.path.isEmpty()?"":n.documentKey.path.lastSegment()],o=[s.popLast().toArray(),s.lastSegment(),[Number.MAX_SAFE_INTEGER,Number.MAX_SAFE_INTEGER],""];return tF(e,eZ).J(IDBKeyRange.bound(a,o,!0)).next(e=>{i?.incrementDocumentReadCount(e.length);let n=rh;for(let i of e){let e=this.br(W.fromSegments(i.prefixPath.concat(i.collectionGroup,i.documentId)),i);e.isFoundDocument()&&(ro(t,e)||r.has(e.key))&&(n=n.insert(e.key,e))}return n})}getAllFromCollectionGroup(e,t,n,r){let i=rh,s=sM(t,n),a=sM(t,ey.max());return tF(e,eZ).ee({index:e4,range:IDBKeyRange.bound(s,a,!0)},(e,t,n)=>{let s=this.br(W.fromSegments(t.prefixPath.concat(t.collectionGroup,t.documentId)),t);(i=i.insert(s.key,s)).size===r&&n.done()}).next(()=>i)}newChangeBuffer(e){return new sF(this,!!e&&e.trackRemovals)}getSize(e){return this.getMetadata(e).next(e=>e.byteSize)}getMetadata(e){return tF(e,e3).get(e6).next(e=>(_(!!e,20021),e))}Sr(e,t){return tF(e,e3).put(e6,t)}br(e,t){if(t){let e=function(e,t){let n;if(t.document)n=iN(e.yt,t.document,!!t.hasCommittedMutations);else if(t.noDocument){let e=W.fromSegments(t.noDocument.path),r=i$(t.noDocument.readTime);n=n_.newNoDocument(e,r),t.hasCommittedMutations&&n.setHasCommittedMutations()}else{if(!t.unknownDocument)return S(56709);{let e=W.fromSegments(t.unknownDocument.path),r=i$(t.unknownDocument.version);n=n_.newUnknownDocument(e,r)}}return t.readTime&&n.setReadTime(function(e){let t=new eo(e[0],e[1]);return eu.fromTimestamp(t)}(t.readTime)),n}(this.serializer,t);if(!(e.isNoDocument()&&e.version.isEqual(eu.min())))return e}return n_.newInvalidDocument(e)}}class sF extends sR{constructor(e,t){super(),this.Mr=e,this.trackRemovals=t,this.Or=new rc(e=>e.toString(),(e,t)=>e.isEqual(t))}applyChanges(e){let t=[],n=0,r=new tz((e,t)=>B(e.canonicalString(),t.canonicalString()));return this.changes.forEach((i,s)=>{let a=this.Or.get(i);if(t.push(this.Mr.removeEntry(e,i,a.readTime)),s.isValidDocument()){let o=iB(this.Mr.serializer,s);r=r.add(i.path.popLast());let u=sw(o);n+=u-a.size,t.push(this.Mr.addEntry(e,i,o))}else if(n-=a.size,this.trackRemovals){let n=iB(this.Mr.serializer,s.convertToNoDocument(eu.min()));t.push(this.Mr.addEntry(e,i,n))}}),r.forEach(n=>{t.push(this.Mr.indexManager.addToCollectionParentIndex(e,n))}),t.push(this.Mr.updateMetadata(e,n)),eb.waitFor(t)}getFromCache(e,t){return this.Mr.Dr(e,t).next(e=>(this.Or.set(t,{size:e.size,readTime:e.document.readTime}),e.document))}getAllFromCache(e,t){return this.Mr.vr(e,t).next(({documents:e,Fr:t})=>(t.forEach((t,n)=>{this.Or.set(t,{size:n,readTime:e.get(t).readTime})}),e))}}function sO(e){let t=e.path.toArray();return[t.slice(0,t.length-2),t[t.length-2],t[t.length-1]]}function sM(e,t){let n=t.documentKey.path.toArray();return[e,iz(t.readTime),n.slice(0,n.length-2),n.length>0?n[n.length-1]:""]}function sP(e,t){let n=e.path.toArray(),r=t.path.toArray(),i=0;for(let e=0;e<n.length-2&&e<r.length-2;++e)if(i=B(n[e],r[e]))return i;return(i=B(n.length,r.length))||(i=B(n[n.length-2],r[r.length-2]))||B(n[n.length-1],r[r.length-1])}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class sL{constructor(e,t){this.overlayedDocument=e,this.mutatedFields=t}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class sU{constructor(e,t,n,r){this.remoteDocumentCache=e,this.mutationQueue=t,this.documentOverlayCache=n,this.indexManager=r}getDocument(e,t){let n=null;return this.documentOverlayCache.getOverlay(e,t).next(r=>(n=r,this.remoteDocumentCache.getEntry(e,t))).next(e=>(null!==n&&rU(n.mutation,e,tG.empty(),eo.now()),e))}getDocuments(e,t){return this.remoteDocumentCache.getEntries(e,t).next(t=>this.getLocalViewOfDocuments(e,t,rw()).next(()=>t))}getLocalViewOfDocuments(e,t,n=rw()){let r=rg();return this.populateOverlays(e,r,t).next(()=>this.computeViews(e,t,r,n).next(e=>{let t=rf();return e.forEach((e,n)=>{t=t.insert(e,n.overlayedDocument)}),t}))}getOverlayedDocuments(e,t){let n=rg();return this.populateOverlays(e,n,t).next(()=>this.computeViews(e,t,n,rw()))}populateOverlays(e,t,n){let r=[];return n.forEach(e=>{t.has(e)||r.push(e)}),this.documentOverlayCache.getOverlays(e,r).next(e=>{e.forEach((e,n)=>{t.set(e,n)})})}computeViews(e,t,n,r){let i=rh,s=rg(),a=rg();return t.forEach((e,t)=>{let a=n.get(t.key);r.has(t.key)&&(void 0===a||a.mutation instanceof rz)?i=i.insert(t.key,t):void 0!==a?(s.set(t.key,a.mutation.getFieldMask()),rU(a.mutation,t,a.mutation.getFieldMask(),eo.now())):s.set(t.key,tG.empty())}),this.recalculateAndSaveOverlays(e,i).next(e=>(e.forEach((e,t)=>s.set(e,t)),t.forEach((e,t)=>a.set(e,new sL(t,s.get(e)??null))),a))}recalculateAndSaveOverlays(e,t){let n=rg(),r=new tU((e,t)=>e-t),i=rw();return this.mutationQueue.getAllMutationBatchesAffectingDocumentKeys(e,t).next(e=>{for(let i of e)i.keys().forEach(e=>{let s=t.get(e);if(null===s)return;let a=n.get(e)||tG.empty();a=i.applyToLocalView(s,a),n.set(e,a);let o=(r.get(i.batchId)||rw()).add(e);r=r.insert(i.batchId,o)})}).next(()=>{let s=[],a=r.getReverseIterator();for(;a.hasNext();){let r=a.getNext(),o=r.key,u=r.value,l=rg();u.forEach(e=>{if(!i.has(e)){let r=rL(t.get(e),n.get(e));null!==r&&l.set(e,r),i=i.add(e)}}),s.push(this.documentOverlayCache.saveOverlays(e,o,l))}return eb.waitFor(s)}).next(()=>n)}recalculateAndSaveOverlaysForDocumentKeys(e,t){return this.remoteDocumentCache.getEntries(e,t).next(t=>this.recalculateAndSaveOverlays(e,t))}getDocumentsMatchingQuery(e,t,n,r){return W.isDocumentKey(t.path)&&null===t.collectionGroup&&0===t.filters.length?this.getDocumentsMatchingDocumentQuery(e,t.path):n5(t)?this.getDocumentsMatchingCollectionGroupQuery(e,t,n,r):this.getDocumentsMatchingCollectionQuery(e,t,n,r)}getNextDocuments(e,t,n,r){return this.remoteDocumentCache.getAllFromCollectionGroup(e,t,n,r).next(i=>{let s=r-i.size>0?this.documentOverlayCache.getOverlaysForCollectionGroup(e,t,n.largestBatchId,r-i.size):eb.resolve(rg()),a=-1,o=i;return s.next(t=>eb.forEach(t,(t,n)=>(a<n.largestBatchId&&(a=n.largestBatchId),i.get(t)?eb.resolve():this.remoteDocumentCache.getEntry(e,t).next(e=>{o=o.insert(t,e)}))).next(()=>this.populateOverlays(e,t,i)).next(()=>this.computeViews(e,o,t,rw())).next(e=>({batchId:a,changes:rm(e)})))})}getDocumentsMatchingDocumentQuery(e,t){return this.getDocument(e,new W(t)).next(e=>{let t=rf();return e.isFoundDocument()&&(t=t.insert(e.key,e)),t})}getDocumentsMatchingCollectionGroupQuery(e,t,n,r){let i=t.collectionGroup,s=rf();return this.indexManager.getCollectionParents(e,i).next(a=>eb.forEach(a,a=>{let o=new n1(a.child(i),null,t.explicitOrderBy.slice(),t.filters.slice(),t.limit,t.limitType,t.startAt,t.endAt);return this.getDocumentsMatchingCollectionQuery(e,o,n,r).next(e=>{e.forEach((e,t)=>{s=s.insert(e,t)})})}).next(()=>s))}getDocumentsMatchingCollectionQuery(e,t,n,r){let i;return this.documentOverlayCache.getOverlaysForCollection(e,t.path,n.largestBatchId).next(s=>(i=s,this.remoteDocumentCache.getDocumentsMatchingQuery(e,t,n,i,r))).next(e=>{i.forEach((t,n)=>{let r=n.getKey();null===e.get(r)&&(e=e.insert(r,n_.newInvalidDocument(r)))});let n=rf();return e.forEach((e,r)=>{let s=i.get(e);void 0!==s&&rU(s.mutation,r,tG.empty(),eo.now()),ro(t,r)&&(n=n.insert(e,r))}),n})}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class sq{constructor(e){this.serializer=e,this.Nr=new Map,this.Br=new Map}getBundleMetadata(e,t){return eb.resolve(this.Nr.get(t))}saveBundleMetadata(e,t){return this.Nr.set(t.id,{id:t.id,version:t.version,createTime:iy(t.createTime)}),eb.resolve()}getNamedQuery(e,t){return eb.resolve(this.Br.get(t))}saveNamedQuery(e,t){return this.Br.set(t.name,{name:t.name,query:iH(t.bundledQuery),readTime:iy(t.readTime)}),eb.resolve()}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class sB{constructor(){this.overlays=new tU(W.comparator),this.Lr=new Map}getOverlay(e,t){return eb.resolve(this.overlays.get(t))}getOverlays(e,t){let n=rg();return eb.forEach(t,t=>this.getOverlay(e,t).next(e=>{null!==e&&n.set(t,e)})).next(()=>n)}saveOverlays(e,t,n){return n.forEach((n,r)=>{this.St(e,t,r)}),eb.resolve()}removeOverlaysForBatchId(e,t,n){let r=this.Lr.get(n);return void 0!==r&&(r.forEach(e=>this.overlays=this.overlays.remove(e)),this.Lr.delete(n)),eb.resolve()}getOverlaysForCollection(e,t,n){let r=rg(),i=t.length+1,s=new W(t.child("")),a=this.overlays.getIteratorFrom(s);for(;a.hasNext();){let e=a.getNext().value,s=e.getKey();if(!t.isPrefixOf(s.path))break;s.path.length===i&&e.largestBatchId>n&&r.set(e.getKey(),e)}return eb.resolve(r)}getOverlaysForCollectionGroup(e,t,n,r){let i=new tU((e,t)=>e-t),s=this.overlays.getIterator();for(;s.hasNext();){let e=s.getNext().value;if(e.getKey().getCollectionGroup()===t&&e.largestBatchId>n){let t=i.get(e.largestBatchId);null===t&&(t=rg(),i=i.insert(e.largestBatchId,t)),t.set(e.getKey(),e)}}let a=rg(),o=i.getIterator();for(;o.hasNext()&&(o.getNext().value.forEach((e,t)=>a.set(e,t)),!(a.size()>=r)););return eb.resolve(a)}St(e,t,n){let r=this.overlays.get(n.key);if(null!==r){let e=this.Lr.get(r.largestBatchId).delete(n.key);this.Lr.set(r.largestBatchId,e)}this.overlays=this.overlays.insert(n.key,new rW(t,n));let i=this.Lr.get(t);void 0===i&&(i=rw(),this.Lr.set(t,i)),this.Lr.set(t,i.add(n.key))}}/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class sz{constructor(){this.sessionToken=tH.EMPTY_BYTE_STRING}getSessionToken(e){return eb.resolve(this.sessionToken)}setSessionToken(e,t){return this.sessionToken=t,eb.resolve()}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class sK{constructor(){this.kr=new tz(s$.qr),this.Kr=new tz(s$.Ur)}isEmpty(){return this.kr.isEmpty()}addReference(e,t){let n=new s$(e,t);this.kr=this.kr.add(n),this.Kr=this.Kr.add(n)}$r(e,t){e.forEach(e=>this.addReference(e,t))}removeReference(e,t){this.Wr(new s$(e,t))}Qr(e,t){e.forEach(e=>this.removeReference(e,t))}Gr(e){let t=new W(new Q([])),n=new s$(t,e),r=new s$(t,e+1),i=[];return this.Kr.forEachInRange([n,r],e=>{this.Wr(e),i.push(e.key)}),i}zr(){this.kr.forEach(e=>this.Wr(e))}Wr(e){this.kr=this.kr.delete(e),this.Kr=this.Kr.delete(e)}jr(e){let t=new W(new Q([])),n=new s$(t,e),r=new s$(t,e+1),i=rw();return this.Kr.forEachInRange([n,r],e=>{i=i.add(e.key)}),i}containsKey(e){let t=new s$(e,0),n=this.kr.firstAfterOrEqual(t);return null!==n&&e.isEqual(n.key)}}class s${constructor(e,t){this.key=e,this.Jr=t}static qr(e,t){return W.comparator(e.key,t.key)||B(e.Jr,t.Jr)}static Ur(e,t){return B(e.Jr,t.Jr)||W.comparator(e.key,t.key)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class sG{constructor(e,t){this.indexManager=e,this.referenceDelegate=t,this.mutationQueue=[],this.Yn=1,this.Hr=new tz(s$.qr)}checkEmpty(e){return eb.resolve(0===this.mutationQueue.length)}addMutationBatch(e,t,n,r){let i=this.Yn;this.Yn++,this.mutationQueue.length>0&&this.mutationQueue[this.mutationQueue.length-1];let s=new rH(i,t,n,r);for(let t of(this.mutationQueue.push(s),r))this.Hr=this.Hr.add(new s$(t.key,i)),this.indexManager.addToCollectionParentIndex(e,t.key.path.popLast());return eb.resolve(s)}lookupMutationBatch(e,t){return eb.resolve(this.Zr(t))}getNextMutationBatchAfterBatchId(e,t){let n=this.Xr(t+1),r=n<0?0:n;return eb.resolve(this.mutationQueue.length>r?this.mutationQueue[r]:null)}getHighestUnacknowledgedBatchId(){return eb.resolve(0===this.mutationQueue.length?-1:this.Yn-1)}getAllMutationBatches(e){return eb.resolve(this.mutationQueue.slice())}getAllMutationBatchesAffectingDocumentKey(e,t){let n=new s$(t,0),r=new s$(t,Number.POSITIVE_INFINITY),i=[];return this.Hr.forEachInRange([n,r],e=>{let t=this.Zr(e.Jr);i.push(t)}),eb.resolve(i)}getAllMutationBatchesAffectingDocumentKeys(e,t){let n=new tz(B);return t.forEach(e=>{let t=new s$(e,0),r=new s$(e,Number.POSITIVE_INFINITY);this.Hr.forEachInRange([t,r],e=>{n=n.add(e.Jr)})}),eb.resolve(this.Yr(n))}getAllMutationBatchesAffectingQuery(e,t){let n=t.path,r=n.length+1,i=n;W.isDocumentKey(i)||(i=i.child(""));let s=new s$(new W(i),0),a=new tz(B);return this.Hr.forEachWhile(e=>{let t=e.key.path;return!!n.isPrefixOf(t)&&(t.length===r&&(a=a.add(e.Jr)),!0)},s),eb.resolve(this.Yr(a))}Yr(e){let t=[];return e.forEach(e=>{let n=this.Zr(e);null!==n&&t.push(n)}),t}removeMutationBatch(e,t){_(0===this.ei(t.batchId,"removed"),55003),this.mutationQueue.shift();let n=this.Hr;return eb.forEach(t.mutations,r=>{let i=new s$(r.key,t.batchId);return n=n.delete(i),this.referenceDelegate.markPotentiallyOrphaned(e,r.key)}).next(()=>{this.Hr=n})}nr(e){}containsKey(e,t){let n=new s$(t,0),r=this.Hr.firstAfterOrEqual(n);return eb.resolve(t.isEqual(r&&r.key))}performConsistencyCheck(e){return this.mutationQueue.length,eb.resolve()}ei(e,t){return this.Xr(e)}Xr(e){return 0===this.mutationQueue.length?0:e-this.mutationQueue[0].batchId}Zr(e){let t=this.Xr(e);return t<0||t>=this.mutationQueue.length?null:this.mutationQueue[t]}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class sj{constructor(e){this.ti=e,this.docs=new tU(W.comparator),this.size=0}setIndexManager(e){this.indexManager=e}addEntry(e,t){let n=t.key,r=this.docs.get(n),i=r?r.size:0,s=this.ti(t);return this.docs=this.docs.insert(n,{document:t.mutableCopy(),size:s}),this.size+=s-i,this.indexManager.addToCollectionParentIndex(e,n.path.popLast())}removeEntry(e){let t=this.docs.get(e);t&&(this.docs=this.docs.remove(e),this.size-=t.size)}getEntry(e,t){let n=this.docs.get(t);return eb.resolve(n?n.document.mutableCopy():n_.newInvalidDocument(t))}getEntries(e,t){let n=rh;return t.forEach(e=>{let t=this.docs.get(e);n=n.insert(e,t?t.document.mutableCopy():n_.newInvalidDocument(e))}),eb.resolve(n)}getDocumentsMatchingQuery(e,t,n,r){let i=rh,s=t.path,a=new W(s.child("__id-9223372036854775808__")),o=this.docs.getIteratorFrom(a);for(;o.hasNext();){let{key:e,value:{document:a}}=o.getNext();if(!s.isPrefixOf(e.path))break;e.path.length>s.length+1||0>=ew(ep(a),n)||(r.has(a.key)||ro(t,a))&&(i=i.insert(a.key,a.mutableCopy()))}return eb.resolve(i)}getAllFromCollectionGroup(e,t,n,r){S(9500)}ni(e,t){return eb.forEach(this.docs,e=>t(e))}newChangeBuffer(e){return new sQ(this)}getSize(e){return eb.resolve(this.size)}}class sQ extends sR{constructor(e){super(),this.Mr=e}applyChanges(e){let t=[];return this.changes.forEach((n,r)=>{r.isValidDocument()?t.push(this.Mr.addEntry(e,r)):this.Mr.removeEntry(n)}),eb.waitFor(t)}getFromCache(e,t){return this.Mr.getEntry(e,t)}getAllFromCache(e,t){return this.Mr.getEntries(e,t)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class sH{constructor(e){this.persistence=e,this.ri=new rc(e=>nJ(e),nW),this.lastRemoteSnapshotVersion=eu.min(),this.highestTargetId=0,this.ii=0,this.si=new sK,this.targetCount=0,this.oi=sb._r()}forEachTarget(e,t){return this.ri.forEach((e,n)=>t(n)),eb.resolve()}getLastRemoteSnapshotVersion(e){return eb.resolve(this.lastRemoteSnapshotVersion)}getHighestSequenceNumber(e){return eb.resolve(this.ii)}allocateTargetId(e){return this.highestTargetId=this.oi.next(),eb.resolve(this.highestTargetId)}setTargetsMetadata(e,t,n){return n&&(this.lastRemoteSnapshotVersion=n),t>this.ii&&(this.ii=t),eb.resolve()}lr(e){this.ri.set(e.target,e);let t=e.targetId;t>this.highestTargetId&&(this.oi=new sb(t),this.highestTargetId=t),e.sequenceNumber>this.ii&&(this.ii=e.sequenceNumber)}addTargetData(e,t){return this.lr(t),this.targetCount+=1,eb.resolve()}updateTargetData(e,t){return this.lr(t),eb.resolve()}removeTargetData(e,t){return this.ri.delete(t.target),this.si.Gr(t.targetId),this.targetCount-=1,eb.resolve()}removeTargets(e,t,n){let r=0,i=[];return this.ri.forEach((s,a)=>{a.sequenceNumber<=t&&null===n.get(a.targetId)&&(this.ri.delete(s),i.push(this.removeMatchingKeysForTargetId(e,a.targetId)),r++)}),eb.waitFor(i).next(()=>r)}getTargetCount(e){return eb.resolve(this.targetCount)}getTargetData(e,t){let n=this.ri.get(t)||null;return eb.resolve(n)}addMatchingKeys(e,t,n){return this.si.$r(t,n),eb.resolve()}removeMatchingKeys(e,t,n){this.si.Qr(t,n);let r=this.persistence.referenceDelegate,i=[];return r&&t.forEach(t=>{i.push(r.markPotentiallyOrphaned(e,t))}),eb.waitFor(i)}removeMatchingKeysForTargetId(e,t){return this.si.Gr(t),eb.resolve()}getMatchingKeysForTargetId(e,t){let n=this.si.jr(t);return eb.resolve(n)}containsKey(e,t){return eb.resolve(this.si.containsKey(t))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class sJ{constructor(e,t){this._i={},this.overlays={},this.ai=new eP(0),this.ui=!1,this.ui=!0,this.ci=new sz,this.referenceDelegate=e(this),this.li=new sH(this),this.indexManager=new sl,this.remoteDocumentCache=new sj(e=>this.referenceDelegate.hi(e)),this.serializer=new iq(t),this.Pi=new sq(this.serializer)}start(){return Promise.resolve()}shutdown(){return this.ui=!1,Promise.resolve()}get started(){return this.ui}setDatabaseDeletedListener(){}setNetworkEnabled(){}getIndexManager(e){return this.indexManager}getDocumentOverlayCache(e){let t=this.overlays[e.toKey()];return t||(t=new sB,this.overlays[e.toKey()]=t),t}getMutationQueue(e,t){let n=this._i[e.toKey()];return n||(n=new sG(t,this.referenceDelegate),this._i[e.toKey()]=n),n}getGlobalsCache(){return this.ci}getTargetCache(){return this.li}getRemoteDocumentCache(){return this.remoteDocumentCache}getBundleCache(){return this.Pi}runTransaction(e,t,n){I("MemoryPersistence","Starting transaction:",e);let r=new sW(this.ai.next());return this.referenceDelegate.Ti(),n(r).next(e=>this.referenceDelegate.Ei(r).next(()=>e)).toPromise().then(e=>(r.raiseOnCommittedEvent(),e))}Ii(e,t){return eb.or(Object.values(this._i).map(n=>()=>n.containsKey(e,t)))}}class sW extends eI{constructor(e){super(),this.currentSequenceNumber=e}}class sY{constructor(e){this.persistence=e,this.Ri=new sK,this.Ai=null}static Vi(e){return new sY(e)}get di(){if(this.Ai)return this.Ai;throw S(60996)}addReference(e,t,n){return this.Ri.addReference(n,t),this.di.delete(n.toString()),eb.resolve()}removeReference(e,t,n){return this.Ri.removeReference(n,t),this.di.add(n.toString()),eb.resolve()}markPotentiallyOrphaned(e,t){return this.di.add(t.toString()),eb.resolve()}removeTarget(e,t){this.Ri.Gr(t.targetId).forEach(e=>this.di.add(e.toString()));let n=this.persistence.getTargetCache();return n.getMatchingKeysForTargetId(e,t.targetId).next(e=>{e.forEach(e=>this.di.add(e.toString()))}).next(()=>n.removeTargetData(e,t))}Ti(){this.Ai=new Set}Ei(e){let t=this.persistence.getRemoteDocumentCache().newChangeBuffer();return eb.forEach(this.di,n=>{let r=W.fromPath(n);return this.mi(e,r).next(e=>{e||t.removeEntry(r,eu.min())})}).next(()=>(this.Ai=null,t.apply(e)))}updateLimboDocument(e,t){return this.mi(e,t).next(e=>{e?this.di.delete(t.toString()):this.di.add(t.toString())})}hi(e){return 0}mi(e,t){return eb.or([()=>eb.resolve(this.Ri.containsKey(t)),()=>this.persistence.getTargetCache().containsKey(e,t),()=>this.persistence.Ii(e,t)])}}class sX{constructor(e,t){this.persistence=e,this.fi=new rc(e=>eB(e.path),(e,t)=>e.isEqual(t)),this.garbageCollector=new sD(this,t)}static Vi(e,t){return new sX(e,t)}Ti(){}Ei(e){return eb.resolve()}forEachTarget(e,t){return this.persistence.getTargetCache().forEachTarget(e,t)}dr(e){let t=this.pr(e);return this.persistence.getTargetCache().getTargetCount(e).next(e=>t.next(t=>e+t))}pr(e){let t=0;return this.mr(e,e=>{t++}).next(()=>t)}mr(e,t){return eb.forEach(this.fi,(n,r)=>this.wr(e,n,r).next(e=>e?eb.resolve():t(r)))}removeTargets(e,t,n){return this.persistence.getTargetCache().removeTargets(e,t,n)}removeOrphanedDocuments(e,t){let n=0,r=this.persistence.getRemoteDocumentCache(),i=r.newChangeBuffer();return r.ni(e,r=>this.wr(e,r,t).next(e=>{e||(n++,i.removeEntry(r,eu.min()))})).next(()=>i.apply(e)).next(()=>n)}markPotentiallyOrphaned(e,t){return this.fi.set(t,e.currentSequenceNumber),eb.resolve()}removeTarget(e,t){let n=t.withSequenceNumber(e.currentSequenceNumber);return this.persistence.getTargetCache().updateTargetData(e,n)}addReference(e,t,n){return this.fi.set(n,e.currentSequenceNumber),eb.resolve()}removeReference(e,t,n){return this.fi.set(n,e.currentSequenceNumber),eb.resolve()}updateLimboDocument(e,t){return this.fi.set(t,e.currentSequenceNumber),eb.resolve()}hi(e){let t=e.key.toString().length;return e.isFoundDocument()&&(t+=function e(t){switch(na(t)){case 0:case 1:return 4;case 2:return 8;case 3:case 8:return 16;case 4:let n=t5(t);return n?16+e(n):16;case 5:return 2*t.stringValue.length;case 6:return tX(t.bytesValue).approximateByteSize();case 7:return t.referenceValue.length;case 9:return(t.arrayValue.values||[]).reduce((t,n)=>t+e(n),0);case 10:case 11:var r;let i;return r=t.mapValue,i=0,tM(r.fields,(t,n)=>{i+=t.length+e(n)}),i;default:throw S(13486,{value:t})}}(e.data.value)),t}wr(e,t,n){return eb.or([()=>this.persistence.Ii(e,t),()=>this.persistence.getTargetCache().containsKey(e,t),()=>{let e=this.fi.get(t);return eb.resolve(void 0!==e&&e>n)}])}getCacheSize(e){return this.persistence.getRemoteDocumentCache().getSize(e)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class sZ{constructor(e){this.serializer=e}k(e,t,n,r){let i=new eS("createOrUpgrade",t);n<1&&r>=1&&(!function(e){e.createObjectStore(e$)}(e),e.createObjectStore(ej,{keyPath:"userId"}),e.createObjectStore(eQ,{keyPath:eH,autoIncrement:!0}).createIndex(eJ,eW,{unique:!0}),e.createObjectStore(eX),s0(e),function(e){e.createObjectStore(eK)}(e));let s=eb.resolve();return n<3&&r>=3&&(0!==n&&(e.deleteObjectStore(te),e.deleteObjectStore(e8),e.deleteObjectStore(ts),s0(e)),s=s.next(()=>(function(e){let t=e.store(ts),n={highestTargetId:0,highestListenSequenceNumber:0,lastRemoteSnapshotVersion:eu.min().toTimestamp(),targetCount:0};return t.put(ti,n)})(i))),n<4&&r>=4&&(0!==n&&(s=s.next(()=>i.store(eQ).J().next(t=>{e.deleteObjectStore(eQ),e.createObjectStore(eQ,{keyPath:eH,autoIncrement:!0}).createIndex(eJ,eW,{unique:!0});let n=i.store(eQ),r=t.map(e=>n.put(e));return eb.waitFor(r)}))),s=s.next(()=>{!function(e){e.createObjectStore(tu,{keyPath:"clientId"})}(e)})),n<5&&r>=5&&(s=s.next(()=>this.gi(i))),n<6&&r>=6&&(s=s.next(()=>((function(e){e.createObjectStore(e3)})(e),this.pi(i)))),n<7&&r>=7&&(s=s.next(()=>this.yi(i))),n<8&&r>=8&&(s=s.next(()=>this.wi(e,i))),n<9&&r>=9&&(s=s.next(()=>{e.objectStoreNames.contains("remoteDocumentChanges")&&e.deleteObjectStore("remoteDocumentChanges")})),n<10&&r>=10&&(s=s.next(()=>this.Si(i))),n<11&&r>=11&&(s=s.next(()=>{(function(e){e.createObjectStore(tl,{keyPath:"bundleId"})})(e),function(e){e.createObjectStore(tc,{keyPath:"name"})}(e)})),n<12&&r>=12&&(s=s.next(()=>{!function(e){let t=e.createObjectStore(tT,{keyPath:tb});t.createIndex(tE,tS,{unique:!1}),t.createIndex(tx,t_,{unique:!1})}(e)})),n<13&&r>=13&&(s=s.next(()=>(function(e){let t=e.createObjectStore(eZ,{keyPath:e0});t.createIndex(e1,e2),t.createIndex(e4,e5)})(e)).next(()=>this.bi(e,i)).next(()=>e.deleteObjectStore(eK))),n<14&&r>=14&&(s=s.next(()=>this.Di(e,i))),n<15&&r>=15&&(s=s.next(()=>{e.createObjectStore(th,{keyPath:"indexId",autoIncrement:!0}).createIndex(td,"collectionGroup",{unique:!1}),e.createObjectStore(tf,{keyPath:tm}).createIndex(tg,tp,{unique:!1}),e.createObjectStore(ty,{keyPath:tw}).createIndex(tv,tI,{unique:!1})})),n<16&&r>=16&&(s=s.next(()=>{t.objectStore(tf).clear()}).next(()=>{t.objectStore(ty).clear()})),n<17&&r>=17&&(s=s.next(()=>{!function(e){e.createObjectStore(tC,{keyPath:"name"})}(e)})),n<18&&r>=18&&(0,u.WO)()&&(s=s.next(()=>{t.objectStore(tf).clear()}).next(()=>{t.objectStore(ty).clear()})),s}pi(e){let t=0;return e.store(eK).ee((e,n)=>{t+=sw(n)}).next(()=>{let n={byteSize:t};return e.store(e3).put(e6,n)})}gi(e){let t=e.store(ej),n=e.store(eQ);return t.J().next(t=>eb.forEach(t,t=>{let r=IDBKeyRange.bound([t.userId,-1],[t.userId,t.lastAcknowledgedBatchId]);return n.J(eJ,r).next(n=>eb.forEach(n,n=>{_(n.userId===t.userId,18650,"Cannot process batch from unexpected user",{batchId:n.batchId});let r=iG(this.serializer,n);return sy(e,t.userId,r).next(()=>{})}))}))}yi(e){let t=e.store(te),n=e.store(eK);return e.store(ts).get(ti).next(e=>{let r=[];return n.ee((n,i)=>{let s=new Q(n),a=[0,eB(s)];r.push(t.get(a).next(n=>n?eb.resolve():t.put({targetId:0,path:eB(s),sequenceNumber:e.highestListenSequenceNumber})))}).next(()=>eb.waitFor(r))})}wi(e,t){e.createObjectStore(ta,{keyPath:to});let n=t.store(ta),r=new sc,i=e=>{if(r.add(e)){let t=e.lastSegment(),r=e.popLast();return n.put({collectionId:t,parent:eB(r)})}};return t.store(eK).ee({Y:!0},(e,t)=>i(new Q(e).popLast())).next(()=>t.store(eX).ee({Y:!0},([e,t,n],r)=>i(ez(t).popLast())))}Si(e){let t=e.store(e8);return t.ee((e,n)=>{let r=ij(n),i=iQ(this.serializer,r);return t.put(i)})}bi(e,t){let n=t.store(eK),r=[];return n.ee((e,n)=>{let i=t.store(eZ),s=(n.document?new W(Q.fromString(n.document.name).popFirst(5)):n.noDocument?W.fromSegments(n.noDocument.path):n.unknownDocument?W.fromSegments(n.unknownDocument.path):S(36783)).path.toArray(),a={prefixPath:s.slice(0,s.length-2),collectionGroup:s[s.length-2],documentId:s[s.length-1],readTime:n.readTime||[0,0],unknownDocument:n.unknownDocument,noDocument:n.noDocument,document:n.document,hasCommittedMutations:!!n.hasCommittedMutations};r.push(i.put(a))}).next(()=>eb.waitFor(r))}Di(e,t){let n=t.store(eQ),r=new sV(this.serializer),i=new sJ(sY.Vi,this.serializer.yt);return n.J().next(e=>{let n=new Map;return e.forEach(e=>{let t=n.get(e.userId)??rw();iG(this.serializer,e).keys().forEach(e=>t=t.add(e)),n.set(e.userId,t)}),eb.forEach(n,(e,n)=>{let s=new m(n),a=iZ.wt(this.serializer,s),o=i.getIndexManager(s);return new sU(r,sv.wt(s,this.serializer,o,i.referenceDelegate),a,o).recalculateAndSaveOverlaysForDocumentKeys(new tV(t,eP.ce),e).next()})})}}function s0(e){e.createObjectStore(te,{keyPath:tt}).createIndex(tn,tr,{unique:!0}),e.createObjectStore(e8,{keyPath:"targetId"}).createIndex(e9,e7,{unique:!0}),e.createObjectStore(ts)}let s1="IndexedDbPersistence",s2="Failed to obtain exclusive access to the persistence layer. To allow shared access, multi-tab synchronization has to be enabled in all tabs. If you are using `experimentalForceOwningTab:true`, make sure that only one tab has persistence enabled at any given time.",s4="main";class s5{constructor(e,t,n,r,i,s,a,o,u,l,c=18){if(this.allowTabSynchronization=e,this.persistenceKey=t,this.clientId=n,this.Ci=i,this.window=s,this.document=a,this.Fi=u,this.Mi=l,this.xi=c,this.ai=null,this.ui=!1,this.isPrimary=!1,this.networkEnabled=!0,this.Oi=null,this.inForeground=!1,this.Ni=null,this.Bi=null,this.Li=Number.NEGATIVE_INFINITY,this.ki=e=>Promise.resolve(),!s5.v())throw new D(N.UNIMPLEMENTED,"This platform is either missing IndexedDB or is known to have an incomplete implementation. Offline persistence has been disabled.");this.referenceDelegate=new sk(this,r),this.qi=t+s4,this.serializer=new iq(o),this.Ki=new ex(this.qi,this.xi,new sZ(this.serializer)),this.ci=new i0,this.li=new sE(this.referenceDelegate,this.serializer),this.remoteDocumentCache=new sV(this.serializer),this.Pi=new iX,this.window&&this.window.localStorage?this.Ui=this.window.localStorage:(this.Ui=null,!1===l&&T(s1,"LocalStorage is unavailable. As a result, persistence may not work reliably. In particular enablePersistence() could fail immediately after refreshing the page."))}start(){return this.$i().then(()=>{if(!this.isPrimary&&!this.allowTabSynchronization)throw new D(N.FAILED_PRECONDITION,s2);return this.Wi(),this.Qi(),this.Gi(),this.runTransaction("getHighestListenSequenceNumber","readonly",e=>this.li.getHighestSequenceNumber(e))}).then(e=>{this.ai=new eP(e,this.Fi)}).then(()=>{this.ui=!0}).catch(e=>(this.Ki&&this.Ki.close(),Promise.reject(e)))}zi(e){return this.ki=async t=>{if(this.started)return e(t)},e(this.isPrimary)}setDatabaseDeletedListener(e){this.Ki.K(async t=>{null===t.newVersion&&await e()})}setNetworkEnabled(e){this.networkEnabled!==e&&(this.networkEnabled=e,this.Ci.enqueueAndForget(async()=>{this.started&&await this.$i()}))}$i(){return this.runTransaction("updateClientMetadataAndTryBecomePrimary","readwrite",e=>tF(e,tu).put({clientId:this.clientId,updateTimeMs:Date.now(),networkEnabled:this.networkEnabled,inForeground:this.inForeground}).next(()=>{if(this.isPrimary)return this.ji(e).next(e=>{e||(this.isPrimary=!1,this.Ci.enqueueRetryable(()=>this.ki(!1)))})}).next(()=>this.Ji(e)).next(t=>this.isPrimary&&!t?this.Hi(e).next(()=>!1):!!t&&this.Zi(e).next(()=>!0))).catch(e=>{if(eD(e))return I(s1,"Failed to extend owner lease: ",e),this.isPrimary;if(!this.allowTabSynchronization)throw e;return I(s1,"Releasing owner lease after error during lease refresh",e),!1}).then(e=>{this.isPrimary!==e&&this.Ci.enqueueRetryable(()=>this.ki(e)),this.isPrimary=e})}ji(e){return tF(e,e$).get(eG).next(e=>eb.resolve(this.Xi(e)))}Yi(e){return tF(e,tu).delete(this.clientId)}async es(){if(this.isPrimary&&!this.ts(this.Li,18e5)){this.Li=Date.now();let e=await this.runTransaction("maybeGarbageCollectMultiClientState","readwrite-primary",e=>{let t=tF(e,tu);return t.J().next(e=>{let n=this.ns(e,18e5),r=e.filter(e=>-1===n.indexOf(e));return eb.forEach(r,e=>t.delete(e.clientId)).next(()=>r)})}).catch(()=>[]);if(this.Ui)for(let t of e)this.Ui.removeItem(this.rs(t.clientId))}}Gi(){this.Bi=this.Ci.enqueueAfterDelay("client_metadata_refresh",4e3,()=>this.$i().then(()=>this.es()).then(()=>this.Gi()))}Xi(e){return!!e&&e.ownerId===this.clientId}Ji(e){return this.Mi?eb.resolve(!0):tF(e,e$).get(eG).next(t=>{if(null!==t&&this.ts(t.leaseTimestampMs,5e3)&&!this.ss(t.ownerId)){if(this.Xi(t)&&this.networkEnabled)return!0;if(!this.Xi(t)){if(!t.allowTabSynchronization)throw new D(N.FAILED_PRECONDITION,s2);return!1}}return!(!this.networkEnabled||!this.inForeground)||tF(e,tu).J().next(e=>void 0===this.ns(e,5e3).find(e=>{if(this.clientId!==e.clientId){let t=!this.networkEnabled&&e.networkEnabled,n=!this.inForeground&&e.inForeground,r=this.networkEnabled===e.networkEnabled;if(t||n&&r)return!0}return!1}))}).next(e=>(this.isPrimary!==e&&I(s1,`Client ${e?"is":"is not"} eligible for a primary lease.`),e))}async shutdown(){this.ui=!1,this._s(),this.Bi&&(this.Bi.cancel(),this.Bi=null),this.us(),this.cs(),await this.Ki.runTransaction("shutdown","readwrite",[e$,tu],e=>{let t=new tV(e,eP.ce);return this.Hi(t).next(()=>this.Yi(t))}),this.Ki.close(),this.ls()}ns(e,t){return e.filter(e=>this.ts(e.updateTimeMs,t)&&!this.ss(e.clientId))}hs(){return this.runTransaction("getActiveClients","readonly",e=>tF(e,tu).J().next(e=>this.ns(e,18e5).map(e=>e.clientId)))}get started(){return this.ui}getGlobalsCache(){return this.ci}getMutationQueue(e,t){return sv.wt(e,this.serializer,t,this.referenceDelegate)}getTargetCache(){return this.li}getRemoteDocumentCache(){return this.remoteDocumentCache}getIndexManager(e){return new sf(e,this.serializer.yt.databaseId)}getDocumentOverlayCache(e){return iZ.wt(this.serializer,e)}getBundleCache(){return this.Pi}runTransaction(e,t,n){var r;let i;I(s1,"Starting transaction:",e);let s=18===(r=this.xi)?tR:17===r?tR:16===r?tA:15===r?tA:14===r?tk:13===r?tk:12===r?tD:11===r?tN:void S(60245);return this.Ki.runTransaction(e,"readonly"===t?"readonly":"readwrite",s,r=>(i=new tV(r,this.ai?this.ai.next():eP.ce),"readwrite-primary"===t?this.ji(i).next(e=>!!e||this.Ji(i)).next(t=>{if(!t)throw T(`Failed to obtain primary lease for action '${e}'.`),this.isPrimary=!1,this.Ci.enqueueRetryable(()=>this.ki(!1)),new D(N.FAILED_PRECONDITION,ev);return n(i)}).next(e=>this.Zi(i).next(()=>e)):this.Ps(i).next(()=>n(i)))).then(e=>(i.raiseOnCommittedEvent(),e))}Ps(e){return tF(e,e$).get(eG).next(e=>{if(null!==e&&this.ts(e.leaseTimestampMs,5e3)&&!this.ss(e.ownerId)&&!this.Xi(e)&&!(this.Mi||this.allowTabSynchronization&&e.allowTabSynchronization))throw new D(N.FAILED_PRECONDITION,s2)})}Zi(e){let t={ownerId:this.clientId,allowTabSynchronization:this.allowTabSynchronization,leaseTimestampMs:Date.now()};return tF(e,e$).put(eG,t)}static v(){return ex.v()}Hi(e){let t=tF(e,e$);return t.get(eG).next(e=>this.Xi(e)?(I(s1,"Releasing primary lease."),t.delete(eG)):eb.resolve())}ts(e,t){let n=Date.now();return!(e<n-t)&&(!(e>n)||(T(`Detected an update time that is in the future: ${e} > ${n}`),!1))}Wi(){null!==this.document&&"function"==typeof this.document.addEventListener&&(this.Ni=()=>{this.Ci.enqueueAndForget(()=>(this.inForeground="visible"===this.document.visibilityState,this.$i()))},this.document.addEventListener("visibilitychange",this.Ni),this.inForeground="visible"===this.document.visibilityState)}us(){this.Ni&&(this.document.removeEventListener("visibilitychange",this.Ni),this.Ni=null)}Qi(){"function"==typeof this.window?.addEventListener&&(this.Oi=()=>{this._s();let e=/(?:Version|Mobile)\/1[456]/;(0,u.G6)()&&(navigator.appVersion.match(e)||navigator.userAgent.match(e))&&this.Ci.enterRestrictedMode(!0),this.Ci.enqueueAndForget(()=>this.shutdown())},this.window.addEventListener("pagehide",this.Oi))}cs(){this.Oi&&(this.window.removeEventListener("pagehide",this.Oi),this.Oi=null)}ss(e){try{let t=null!==this.Ui?.getItem(this.rs(e));return I(s1,`Client '${e}' ${t?"is":"is not"} zombied in LocalStorage`),t}catch(e){return T(s1,"Failed to get zombied client id.",e),!1}}_s(){if(this.Ui)try{this.Ui.setItem(this.rs(this.clientId),String(Date.now()))}catch(e){T("Failed to set zombie client id.",e)}}ls(){if(this.Ui)try{this.Ui.removeItem(this.rs(this.clientId))}catch(e){}}rs(e){return`firestore_zombie_${this.persistenceKey}_${e}`}}function s3(e,t){let n=e.projectId;return e.isDefaultDatabase||(n+="."+e.database),"firestore/"+t+"/"+n+"/"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class s6{constructor(e,t,n,r){this.targetId=e,this.fromCache=t,this.Ts=n,this.Es=r}static Is(e,t){let n=rw(),r=rw();for(let e of t.docChanges)switch(e.type){case 0:n=n.add(e.doc.key);break;case 1:r=r.add(e.doc.key)}return new s6(e,t.fromCache,n,r)}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class s8{constructor(){this._documentReadCount=0}get documentReadCount(){return this._documentReadCount}incrementDocumentReadCount(e){this._documentReadCount+=e}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class s9{constructor(){this.Rs=!1,this.As=!1,this.Vs=100,this.ds=(0,u.G6)()?8:e_((0,u.z$)())>0?6:4}initialize(e,t){this.fs=e,this.indexManager=t,this.Rs=!0}getDocumentsMatchingQuery(e,t,n,r){let i={result:null};return this.gs(e,t).next(e=>{i.result=e}).next(()=>{if(!i.result)return this.ps(e,t,r,n).next(e=>{i.result=e})}).next(()=>{if(i.result)return;let n=new s8;return this.ys(e,t,n).next(r=>{if(i.result=r,this.As)return this.ws(e,t,n,r.size)})}).next(()=>i.result)}ws(e,t,n,r){return n.documentReadCount<this.Vs?(w()<=c.in.DEBUG&&I("QueryEngine","SDK will not create cache indexes for query:",ra(t),"since it only creates cache indexes for collection contains","more than or equal to",this.Vs,"documents"),eb.resolve()):(w()<=c.in.DEBUG&&I("QueryEngine","Query:",ra(t),"scans",n.documentReadCount,"local documents and returns",r,"documents as results."),n.documentReadCount>this.ds*r?(w()<=c.in.DEBUG&&I("QueryEngine","The SDK decides to create cache indexes for query:",ra(t),"as using cache indexes may help improve performance."),this.indexManager.createTargetIndexes(e,n6(t))):eb.resolve())}gs(e,t){if(n4(t))return eb.resolve(null);let n=n6(t);return this.indexManager.getIndexType(e,n).next(r=>0===r?null:(null!==t.limit&&1===r&&(n=n6(t=rt(t,null,"F"))),this.indexManager.getDocumentsMatchingTarget(e,n).next(r=>{let i=rw(...r);return this.fs.getDocuments(e,i).next(r=>this.indexManager.getMinOffset(e,n).next(n=>{let s=this.Ss(t,r);return this.bs(t,s,i,n.readTime)?this.gs(e,rt(t,null,"F")):this.Ds(e,s,t,n)}))})))}ps(e,t,n,r){return n4(t)||r.isEqual(eu.min())?eb.resolve(null):this.fs.getDocuments(e,n).next(i=>{let s=this.Ss(t,i);return this.bs(t,s,n,r)?eb.resolve(null):(w()<=c.in.DEBUG&&I("QueryEngine","Re-using previous result from %s to execute query: %s",r.toString(),ra(t)),this.Ds(e,s,t,eg(r,-1)).next(e=>e))})}Ss(e,t){let n=new tz(rl(e));return t.forEach((t,r)=>{ro(e,r)&&(n=n.add(r))}),n}bs(e,t,n,r){if(null===e.limit)return!1;if(n.size!==t.size)return!0;let i="F"===e.limitType?t.last():t.first();return!!i&&(i.hasPendingWrites||i.version.compareTo(r)>0)}ys(e,t,n){return w()<=c.in.DEBUG&&I("QueryEngine","Using full collection scan to execute query:",ra(t)),this.fs.getDocumentsMatchingQuery(e,t,ey.min(),n)}Ds(e,t,n,r){return this.fs.getDocumentsMatchingQuery(e,n,r).next(e=>(t.forEach(t=>{e=e.insert(t.key,t)}),e))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let s7="LocalStore";class ae{constructor(e,t,n,r){this.persistence=e,this.Cs=t,this.serializer=r,this.vs=new tU(B),this.Fs=new rc(e=>nJ(e),nW),this.Ms=new Map,this.xs=e.getRemoteDocumentCache(),this.li=e.getTargetCache(),this.Pi=e.getBundleCache(),this.Os(n)}Os(e){this.documentOverlayCache=this.persistence.getDocumentOverlayCache(e),this.indexManager=this.persistence.getIndexManager(e),this.mutationQueue=this.persistence.getMutationQueue(e,this.indexManager),this.localDocuments=new sU(this.xs,this.mutationQueue,this.documentOverlayCache,this.indexManager),this.xs.setIndexManager(this.indexManager),this.Cs.initialize(this.localDocuments,this.indexManager)}collectGarbage(e){return this.persistence.runTransaction("Collect garbage","readwrite-primary",t=>e.collect(t,this.vs))}}async function at(e,t){return await e.persistence.runTransaction("Handle user change","readonly",n=>{let r;return e.mutationQueue.getAllMutationBatches(n).next(i=>(r=i,e.Os(t),e.mutationQueue.getAllMutationBatches(n))).next(t=>{let i=[],s=[],a=rw();for(let e of r)for(let t of(i.push(e.batchId),e.mutations))a=a.add(t.key);for(let e of t)for(let t of(s.push(e.batchId),e.mutations))a=a.add(t.key);return e.localDocuments.getDocuments(n,a).next(e=>({Ns:e,removedBatchIds:i,addedBatchIds:s}))})})}function an(e){return e.persistence.runTransaction("Get last remote snapshot version","readonly",t=>e.li.getLastRemoteSnapshotVersion(t))}function ar(e,t,n){let r=rw(),i=rw();return n.forEach(e=>r=r.add(e)),t.getEntries(e,r).next(e=>{let r=rh;return n.forEach((n,s)=>{let a=e.get(n);s.isFoundDocument()!==a.isFoundDocument()&&(i=i.add(n)),s.isNoDocument()&&s.version.isEqual(eu.min())?(t.removeEntry(n,s.readTime),r=r.insert(n,s)):!a.isValidDocument()||s.version.compareTo(a.version)>0||0===s.version.compareTo(a.version)&&a.hasPendingWrites?(t.addEntry(s),r=r.insert(n,s)):I(s7,"Ignoring outdated watch update for ",n,". Current version:",a.version," Watch version:",s.version)}),{Bs:r,Ls:i}})}function ai(e,t){return e.persistence.runTransaction("Allocate target","readwrite",n=>{let r;return e.li.getTargetData(n,t).next(i=>i?(r=i,eb.resolve(r)):e.li.allocateTargetId(n).next(i=>(r=new iU(t,i,"TargetPurposeListen",n.currentSequenceNumber),e.li.addTargetData(n,r).next(()=>r))))}).then(n=>{let r=e.vs.get(n.targetId);return(null===r||n.snapshotVersion.compareTo(r.snapshotVersion)>0)&&(e.vs=e.vs.insert(n.targetId,n),e.Fs.set(t,n.targetId)),n})}async function as(e,t,n){let r=e.vs.get(t);try{n||await e.persistence.runTransaction("Release target",n?"readwrite":"readwrite-primary",t=>e.persistence.referenceDelegate.removeTarget(t,r))}catch(e){if(!eD(e))throw e;I(s7,`Failed to update sequence numbers for target ${t}: ${e}`)}e.vs=e.vs.remove(t),e.Fs.delete(r.target)}function aa(e,t,n){let r=eu.min(),i=rw();return e.persistence.runTransaction("Execute query","readwrite",s=>(function(e,t,n){let r=e.Fs.get(n);return void 0!==r?eb.resolve(e.vs.get(r)):e.li.getTargetData(t,n)})(e,s,n6(t)).next(t=>{if(t)return r=t.lastLimboFreeSnapshotVersion,e.li.getMatchingKeysForTargetId(s,t.targetId).next(e=>{i=e})}).next(()=>e.Cs.getDocumentsMatchingQuery(s,t,n?r:eu.min(),n?i:rw())).next(n=>(al(e,ru(t),n),{documents:n,ks:i})))}function ao(e,t){let n=e.li,r=e.vs.get(t);return r?Promise.resolve(r.target):e.persistence.runTransaction("Get target data","readonly",e=>n.At(e,t).next(e=>e?e.target:null))}function au(e,t){let n=e.Ms.get(t)||eu.min();return e.persistence.runTransaction("Get new document changes","readonly",r=>e.xs.getAllFromCollectionGroup(r,t,eg(n,-1),Number.MAX_SAFE_INTEGER)).then(n=>(al(e,t,n),n))}function al(e,t,n){let r=e.Ms.get(t)||eu.min();n.forEach((e,t)=>{t.readTime.compareTo(r)>0&&(r=t.readTime)}),e.Ms.set(t,r)}async function ac(e,t,n,r){let i=rw(),s=rh;for(let e of n){let n=t.qs(e.metadata.name);e.document&&(i=i.add(n));let r=t.Ks(e);r.setReadTime(t.Us(e.metadata.readTime)),s=s.insert(n,r)}let a=e.xs.newChangeBuffer({trackRemovals:!0}),o=await ai(e,n6(n2(Q.fromString(`__bundle__/docs/${r}`))));return e.persistence.runTransaction("Apply bundle documents","readwrite",t=>ar(t,a,s).next(e=>(a.apply(t),e)).next(n=>e.li.removeMatchingKeysForTargetId(t,o.targetId).next(()=>e.li.addMatchingKeys(t,i,o.targetId)).next(()=>e.localDocuments.getLocalViewOfDocuments(t,n.Bs,n.Ls)).next(()=>n.Bs)))}async function ah(e,t,n=rw()){let r=await ai(e,n6(iH(t.bundledQuery)));return e.persistence.runTransaction("Save named query","readwrite",i=>{let s=iy(t.readTime);if(r.snapshotVersion.compareTo(s)>=0)return e.Pi.saveNamedQuery(i,t);let a=r.withResumeToken(tH.EMPTY_BYTE_STRING,s);return e.vs=e.vs.insert(a.targetId,a),e.li.updateTargetData(i,a).next(()=>e.li.removeMatchingKeysForTargetId(i,r.targetId)).next(()=>e.li.addMatchingKeys(i,n,r.targetId)).next(()=>e.Pi.saveNamedQuery(i,t))})}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let ad="firestore_clients";function af(e,t){return`${ad}_${e}_${t}`}let am="firestore_mutations";function ag(e,t,n){let r=`${am}_${e}_${n}`;return t.isAuthenticated()&&(r+=`_${t.uid}`),r}let ap="firestore_targets";function ay(e,t){return`${ap}_${e}_${t}`}/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let aw="SharedClientState";class av{constructor(e,t,n,r){this.user=e,this.batchId=t,this.state=n,this.error=r}static $s(e,t,n){let r=JSON.parse(n),i,s="object"==typeof r&&-1!==["pending","acknowledged","rejected"].indexOf(r.state)&&(void 0===r.error||"object"==typeof r.error);return s&&r.error&&(s="string"==typeof r.error.message&&"string"==typeof r.error.code)&&(i=new D(r.error.code,r.error.message)),s?new av(e,t,r.state,i):(T(aw,`Failed to parse mutation state for ID '${t}': ${n}`),null)}Ws(){let e={state:this.state,updateTimeMs:Date.now()};return this.error&&(e.error={code:this.error.code,message:this.error.message}),JSON.stringify(e)}}class aI{constructor(e,t,n){this.targetId=e,this.state=t,this.error=n}static $s(e,t){let n=JSON.parse(t),r,i="object"==typeof n&&-1!==["not-current","current","rejected"].indexOf(n.state)&&(void 0===n.error||"object"==typeof n.error);return i&&n.error&&(i="string"==typeof n.error.message&&"string"==typeof n.error.code)&&(r=new D(n.error.code,n.error.message)),i?new aI(e,n.state,r):(T(aw,`Failed to parse target state for ID '${e}': ${t}`),null)}Ws(){let e={state:this.state,updateTimeMs:Date.now()};return this.error&&(e.error={code:this.error.code,message:this.error.message}),JSON.stringify(e)}}class aT{constructor(e,t){this.clientId=e,this.activeTargetIds=t}static $s(e,t){let n=JSON.parse(t),r="object"==typeof n&&n.activeTargetIds instanceof Array,i=rv;for(let e=0;r&&e<n.activeTargetIds.length;++e)r=eq(n.activeTargetIds[e]),i=i.add(n.activeTargetIds[e]);return r?new aT(e,i):(T(aw,`Failed to parse client data for instance '${e}': ${t}`),null)}}class ab{constructor(e,t){this.clientId=e,this.onlineState=t}static $s(e){let t=JSON.parse(e);return"object"==typeof t&&-1!==["Unknown","Online","Offline"].indexOf(t.onlineState)&&"string"==typeof t.clientId?new ab(t.clientId,t.onlineState):(T(aw,`Failed to parse online state: ${e}`),null)}}class aE{constructor(){this.activeTargetIds=rv}Qs(e){this.activeTargetIds=this.activeTargetIds.add(e)}Gs(e){this.activeTargetIds=this.activeTargetIds.delete(e)}Ws(){return JSON.stringify({activeTargetIds:this.activeTargetIds.toArray(),updateTimeMs:Date.now()})}}class aS{constructor(e,t,n,r,i){var s,a,o;this.window=e,this.Ci=t,this.persistenceKey=n,this.zs=r,this.syncEngine=null,this.onlineStateHandler=null,this.sequenceNumberHandler=null,this.js=this.Js.bind(this),this.Hs=new tU(B),this.started=!1,this.Zs=[];let u=n.replace(/[.*+?^${}()|[\]\\]/g,"\\$&");this.storage=this.window.localStorage,this.currentUser=i,this.Xs=af(this.persistenceKey,this.zs),this.Ys=(s=this.persistenceKey,`firestore_sequence_number_${s}`),this.Hs=this.Hs.insert(this.zs,new aE),this.eo=RegExp(`^${ad}_${u}_([^_]*)$`),this.no=RegExp(`^${am}_${u}_(\\d+)(?:_(.*))?$`),this.ro=RegExp(`^${ap}_${u}_(\\d+)$`),this.io=(a=this.persistenceKey,`firestore_online_state_${a}`),this.so=(o=this.persistenceKey,`firestore_bundle_loaded_v2_${o}`),this.window.addEventListener("storage",this.js)}static v(e){return!(!e||!e.localStorage)}async start(){for(let e of(await this.syncEngine.hs())){if(e===this.zs)continue;let t=this.getItem(af(this.persistenceKey,e));if(t){let n=aT.$s(e,t);n&&(this.Hs=this.Hs.insert(n.clientId,n))}}this.oo();let e=this.storage.getItem(this.io);if(e){let t=this._o(e);t&&this.ao(t)}for(let e of this.Zs)this.Js(e);this.Zs=[],this.window.addEventListener("pagehide",()=>this.shutdown()),this.started=!0}writeSequenceNumber(e){this.setItem(this.Ys,JSON.stringify(e))}getAllActiveQueryTargets(){return this.uo(this.Hs)}isActiveQueryTarget(e){let t=!1;return this.Hs.forEach((n,r)=>{r.activeTargetIds.has(e)&&(t=!0)}),t}addPendingMutation(e){this.co(e,"pending")}updateMutationState(e,t,n){this.co(e,t,n),this.lo(e)}addLocalQueryTarget(e,t=!0){let n="not-current";if(this.isActiveQueryTarget(e)){let t=this.storage.getItem(ay(this.persistenceKey,e));if(t){let r=aI.$s(e,t);r&&(n=r.state)}}return t&&this.ho.Qs(e),this.oo(),n}removeLocalQueryTarget(e){this.ho.Gs(e),this.oo()}isLocalQueryTarget(e){return this.ho.activeTargetIds.has(e)}clearQueryState(e){this.removeItem(ay(this.persistenceKey,e))}updateQueryState(e,t,n){this.Po(e,t,n)}handleUserChange(e,t,n){t.forEach(e=>{this.lo(e)}),this.currentUser=e,n.forEach(e=>{this.addPendingMutation(e)})}setOnlineState(e){this.To(e)}notifyBundleLoaded(e){this.Eo(e)}shutdown(){this.started&&(this.window.removeEventListener("storage",this.js),this.removeItem(this.Xs),this.started=!1)}getItem(e){let t=this.storage.getItem(e);return I(aw,"READ",e,t),t}setItem(e,t){I(aw,"SET",e,t),this.storage.setItem(e,t)}removeItem(e){I(aw,"REMOVE",e),this.storage.removeItem(e)}Js(e){if(e.storageArea===this.storage){if(I(aw,"EVENT",e.key,e.newValue),e.key===this.Xs)return void T("Received WebStorage notification for local change. Another client might have garbage-collected our state");this.Ci.enqueueRetryable(async()=>{if(this.started){if(null!==e.key){if(this.eo.test(e.key)){if(null==e.newValue){let t=this.Io(e.key);return this.Ro(t,null)}{let t=this.Ao(e.key,e.newValue);if(t)return this.Ro(t.clientId,t)}}else if(this.no.test(e.key)){if(null!==e.newValue){let t=this.Vo(e.key,e.newValue);if(t)return this.mo(t)}}else if(this.ro.test(e.key)){if(null!==e.newValue){let t=this.fo(e.key,e.newValue);if(t)return this.po(t)}}else if(e.key===this.io){if(null!==e.newValue){let t=this._o(e.newValue);if(t)return this.ao(t)}}else if(e.key===this.Ys){let t=function(e){let t=eP.ce;if(null!=e)try{let n=JSON.parse(e);_("number"==typeof n,30636,{yo:e}),t=n}catch(e){T(aw,"Failed to read sequence number from WebStorage",e)}return t}(e.newValue);t!==eP.ce&&this.sequenceNumberHandler(t)}else if(e.key===this.so){let t=this.wo(e.newValue);await Promise.all(t.map(e=>this.syncEngine.So(e)))}}}else this.Zs.push(e)})}}get ho(){return this.Hs.get(this.zs)}oo(){this.setItem(this.Xs,this.ho.Ws())}co(e,t,n){let r=new av(this.currentUser,e,t,n),i=ag(this.persistenceKey,this.currentUser,e);this.setItem(i,r.Ws())}lo(e){let t=ag(this.persistenceKey,this.currentUser,e);this.removeItem(t)}To(e){let t={clientId:this.zs,onlineState:e};this.storage.setItem(this.io,JSON.stringify(t))}Po(e,t,n){let r=ay(this.persistenceKey,e),i=new aI(e,t,n);this.setItem(r,i.Ws())}Eo(e){let t=JSON.stringify(Array.from(e));this.setItem(this.so,t)}Io(e){let t=this.eo.exec(e);return t?t[1]:null}Ao(e,t){let n=this.Io(e);return aT.$s(n,t)}Vo(e,t){let n=this.no.exec(e),r=Number(n[1]),i=void 0!==n[2]?n[2]:null;return av.$s(new m(i),r,t)}fo(e,t){let n=Number(this.ro.exec(e)[1]);return aI.$s(n,t)}_o(e){return ab.$s(e)}wo(e){return JSON.parse(e)}async mo(e){if(e.user.uid===this.currentUser.uid)return this.syncEngine.bo(e.batchId,e.state,e.error);I(aw,`Ignoring mutation for non-active user ${e.user.uid}`)}po(e){return this.syncEngine.Do(e.targetId,e.state,e.error)}Ro(e,t){let n=t?this.Hs.insert(e,t):this.Hs.remove(e),r=this.uo(this.Hs),i=this.uo(n),s=[],a=[];return i.forEach(e=>{r.has(e)||s.push(e)}),r.forEach(e=>{i.has(e)||a.push(e)}),this.syncEngine.Co(s,a).then(()=>{this.Hs=n})}ao(e){this.Hs.get(e.clientId)&&this.onlineStateHandler(e.onlineState)}uo(e){let t=rv;return e.forEach((e,n)=>{t=t.unionWith(n.activeTargetIds)}),t}}class ax{constructor(){this.vo=new aE,this.Fo={},this.onlineStateHandler=null,this.sequenceNumberHandler=null}addPendingMutation(e){}updateMutationState(e,t,n){}addLocalQueryTarget(e,t=!0){return t&&this.vo.Qs(e),this.Fo[e]||"not-current"}updateQueryState(e,t,n){this.Fo[e]=t}removeLocalQueryTarget(e){this.vo.Gs(e)}isLocalQueryTarget(e){return this.vo.activeTargetIds.has(e)}clearQueryState(e){delete this.Fo[e]}getAllActiveQueryTargets(){return this.vo.activeTargetIds}isActiveQueryTarget(e){return this.vo.activeTargetIds.has(e)}start(){return this.vo=new aE,Promise.resolve()}handleUserChange(e,t,n){}setOnlineState(e){}shutdown(){}writeSequenceNumber(e){}notifyBundleLoaded(e){}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class a_{Mo(e){}shutdown(){}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let aC="ConnectivityMonitor";class aN{constructor(){this.xo=()=>this.Oo(),this.No=()=>this.Bo(),this.Lo=[],this.ko()}Mo(e){this.Lo.push(e)}shutdown(){window.removeEventListener("online",this.xo),window.removeEventListener("offline",this.No)}ko(){window.addEventListener("online",this.xo),window.addEventListener("offline",this.No)}Oo(){for(let e of(I(aC,"Network connectivity changed: AVAILABLE"),this.Lo))e(0)}Bo(){for(let e of(I(aC,"Network connectivity changed: UNAVAILABLE"),this.Lo))e(1)}static v(){return"undefined"!=typeof window&&void 0!==window.addEventListener&&void 0!==window.removeEventListener}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let aD=null;function ak(){return null===aD?aD=268435456+Math.round(2147483648*Math.random()):aD++,"0x"+aD.toString(16)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let aA="RestConnection",aR={BatchGetDocuments:"batchGet",Commit:"commit",RunQuery:"runQuery",RunAggregationQuery:"runAggregationQuery",ExecutePipeline:"executePipeline"};class aV{get qo(){return!1}constructor(e){this.databaseInfo=e,this.databaseId=e.databaseId;let t=e.ssl?"https":"http",n=encodeURIComponent(this.databaseId.projectId),r=encodeURIComponent(this.databaseId.database);this.Ko=t+"://"+e.host,this.Uo=`projects/${n}/databases/${r}`,this.$o=this.databaseId.database===t8?`project_id=${n}`:`project_id=${n}&database_id=${r}`}Wo(e,t,n,r,i){let s=ak(),a=this.Qo(e,t.toUriEncodedString());I(aA,`Sending RPC '${e}' ${s}:`,a,n);let o={"google-cloud-resource-prefix":this.Uo,"x-goog-request-params":this.$o};this.Go(o,r,i);let{host:l}=new URL(a),c=(0,u.Xx)(l);return this.zo(e,a,o,n,c).then(t=>(I(aA,`Received RPC '${e}' ${s}: `,t),t),t=>{throw b(aA,`RPC '${e}' ${s} failed with error: `,t,"url: ",a,"request:",n),t})}jo(e,t,n,r,i,s){return this.Wo(e,t,n,r,i)}Go(e,t,n){e["X-Goog-Api-Client"]="gl-js/ fire/"+g,e["Content-Type"]="text/plain",this.databaseInfo.appId&&(e["X-Firebase-GMPID"]=this.databaseInfo.appId),t&&t.headers.forEach((t,n)=>e[n]=t),n&&n.headers.forEach((t,n)=>e[n]=t)}Qo(e,t){let n=aR[e],r=`${this.Ko}/v1/${t}:${n}`;return this.databaseInfo.apiKey&&(r=`${r}?key=${encodeURIComponent(this.databaseInfo.apiKey)}`),r}terminate(){}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class aF{constructor(e){this.Jo=e.Jo,this.Ho=e.Ho}Zo(e){this.Xo=e}Yo(e){this.e_=e}t_(e){this.n_=e}onMessage(e){this.r_=e}close(){this.Ho()}send(e){this.Jo(e)}i_(){this.Xo()}s_(){this.e_()}o_(e){this.n_(e)}__(e){this.r_(e)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let aO="WebChannelConnection",aM=(e,t,n)=>{e.listen(t,e=>{try{n(e)}catch(e){setTimeout(()=>{throw e},0)}})};class aP extends aV{constructor(e){super(e),this.a_=[],this.forceLongPolling=e.forceLongPolling,this.autoDetectLongPolling=e.autoDetectLongPolling,this.useFetchStreams=e.useFetchStreams,this.longPollingOptions=e.longPollingOptions}static u_(){aP.c_||(aM((0,h.FJ)(),h.ju.STAT_EVENT,e=>{e.stat===h.kN.PROXY?I(aO,"STAT_EVENT: detected buffering proxy"):e.stat===h.kN.NOPROXY&&I(aO,"STAT_EVENT: detected no buffering proxy")}),aP.c_=!0)}zo(e,t,n,r,i){let s=ak();return new Promise((i,a)=>{let o=new h.JJ;o.setWithCredentials(!0),o.listenOnce(h.tw.COMPLETE,()=>{try{switch(o.getLastErrorCode()){case h.jK.NO_ERROR:let t=o.getResponseJson();I(aO,`XHR for RPC '${e}' ${s} received:`,JSON.stringify(t)),i(t);break;case h.jK.TIMEOUT:I(aO,`RPC '${e}' ${s} timed out`),a(new D(N.DEADLINE_EXCEEDED,"Request time out"));break;case h.jK.HTTP_ERROR:let n=o.getStatus();if(I(aO,`RPC '${e}' ${s} failed with status:`,n,"response text:",o.getResponseText()),n>0){let e=o.getResponseJson();Array.isArray(e)&&(e=e[0]);let t=e?.error;if(t&&t.status&&t.message){let e=function(e){let t=e.toLowerCase().replace(/_/g,"-");return Object.values(N).indexOf(t)>=0?t:N.UNKNOWN}(t.status);a(new D(e,t.message))}else a(new D(N.UNKNOWN,"Server responded with status "+o.getStatus()))}else a(new D(N.UNAVAILABLE,"Connection failed."));break;default:S(9055,{l_:e,streamId:s,h_:o.getLastErrorCode(),P_:o.getLastError()})}}finally{I(aO,`RPC '${e}' ${s} completed.`)}});let u=JSON.stringify(r);I(aO,`RPC '${e}' ${s} sending request:`,r),o.send(t,"POST",u,n,15)})}T_(e,t,n){let i=ak(),s=[this.Ko,"/","google.firestore.v1.Firestore","/",e,"/channel"],a=this.createWebChannelTransport(),o={httpSessionIdParam:"gsessionid",initMessageHeaders:{},messageUrlParams:{database:`projects/${this.databaseId.projectId}/databases/${this.databaseId.database}`},sendRawJson:!0,supportsCrossDomainXhr:!0,internalChannelParams:{forwardChannelRequestTimeoutMs:6e5},forceLongPolling:this.forceLongPolling,detectBufferingProxy:this.autoDetectLongPolling},u=this.longPollingOptions.timeoutSeconds;void 0!==u&&(o.longPollingTimeout=Math.round(1e3*u)),this.useFetchStreams&&(o.useFetchStreams=!0),this.Go(o.initMessageHeaders,t,n),o.encodeInitMessageHeaders=!0;let l=s.join("");I(aO,`Creating RPC '${e}' stream ${i}: ${l}`,o);let c=a.createWebChannel(l,o);this.E_(c);let d=!1,f=!1,m=new aF({Jo:t=>{f?I(aO,`Not sending because RPC '${e}' stream ${i} is closed:`,t):(d||(I(aO,`Opening RPC '${e}' stream ${i} transport.`),c.open(),d=!0),I(aO,`RPC '${e}' stream ${i} sending:`,t),c.send(t))},Ho:()=>c.close()});return aM(c,h.ii.EventType.OPEN,()=>{f||(I(aO,`RPC '${e}' stream ${i} transport opened.`),m.i_())}),aM(c,h.ii.EventType.CLOSE,()=>{f||(f=!0,I(aO,`RPC '${e}' stream ${i} transport closed`),m.o_(),this.I_(c))}),aM(c,h.ii.EventType.ERROR,t=>{f||(f=!0,b(aO,`RPC '${e}' stream ${i} transport errored. Name:`,t.name,"Message:",t.message),m.o_(new D(N.UNAVAILABLE,"The operation could not be completed")))}),aM(c,h.ii.EventType.MESSAGE,t=>{if(!f){let n=t.data[0];_(!!n,16349);let s=n?.error||n[0]?.error;if(s){I(aO,`RPC '${e}' stream ${i} received error:`,s);let t=s.status,n=function(e){let t=r[e];if(void 0!==t)return r0(t)}(t),a=s.message;"NOT_FOUND"===t&&a.includes("database")&&a.includes("does not exist")&&a.includes(this.databaseId.database)&&b(`Database '${this.databaseId.database}' not found. Please check your project configuration.`),void 0===n&&(n=N.INTERNAL,a="Unknown error status: "+t+" with message "+s.message),f=!0,m.o_(new D(n,a)),c.close()}else I(aO,`RPC '${e}' stream ${i} received:`,n),m.__(n)}}),aP.u_(),setTimeout(()=>{m.s_()},0),m}terminate(){this.a_.forEach(e=>e.close()),this.a_=[]}E_(e){this.a_.push(e)}I_(e){this.a_=this.a_.filter(t=>t===e)}Go(e,t,n){super.Go(e,t,n),this.databaseInfo.apiKey&&(e["x-goog-api-key"]=this.databaseInfo.apiKey)}createWebChannelTransport(){return(0,h.UE)()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function aL(){return"undefined"!=typeof window?window:null}function aU(){return"undefined"!=typeof document?document:null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function aq(e){return new id(e,!0)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */aP.c_=!1;class aB{constructor(e,t,n=1e3,r=1.5,i=6e4){this.Ci=e,this.timerId=t,this.R_=n,this.A_=r,this.V_=i,this.d_=0,this.m_=null,this.f_=Date.now(),this.reset()}reset(){this.d_=0}g_(){this.d_=this.V_}p_(e){this.cancel();let t=Math.floor(this.d_+this.y_()),n=Math.max(0,Date.now()-this.f_),r=Math.max(0,t-n);r>0&&I("ExponentialBackoff",`Backing off for ${r} ms (base delay: ${this.d_} ms, delay with jitter: ${t} ms, last attempt: ${n} ms ago)`),this.m_=this.Ci.enqueueAfterDelay(this.timerId,r,()=>(this.f_=Date.now(),e())),this.d_*=this.A_,this.d_<this.R_&&(this.d_=this.R_),this.d_>this.V_&&(this.d_=this.V_)}w_(){null!==this.m_&&(this.m_.skipDelay(),this.m_=null)}cancel(){null!==this.m_&&(this.m_.cancel(),this.m_=null)}y_(){return(Math.random()-.5)*this.d_}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let az="PersistentStream";class aK{constructor(e,t,n,r,i,s,a,o){this.Ci=e,this.S_=n,this.b_=r,this.connection=i,this.authCredentialsProvider=s,this.appCheckCredentialsProvider=a,this.listener=o,this.state=0,this.D_=0,this.C_=null,this.v_=null,this.stream=null,this.F_=0,this.M_=new aB(e,t)}x_(){return 1===this.state||5===this.state||this.O_()}O_(){return 2===this.state||3===this.state}start(){this.F_=0,4!==this.state?this.auth():this.N_()}async stop(){this.x_()&&await this.close(0)}B_(){this.state=0,this.M_.reset()}L_(){this.O_()&&null===this.C_&&(this.C_=this.Ci.enqueueAfterDelay(this.S_,6e4,()=>this.k_()))}q_(e){this.K_(),this.stream.send(e)}async k_(){if(this.O_())return this.close(0)}K_(){this.C_&&(this.C_.cancel(),this.C_=null)}U_(){this.v_&&(this.v_.cancel(),this.v_=null)}async close(e,t){this.K_(),this.U_(),this.M_.cancel(),this.D_++,4!==e?this.M_.reset():t&&t.code===N.RESOURCE_EXHAUSTED?(T(t.toString()),T("Using maximum backoff delay to prevent overloading the backend."),this.M_.g_()):t&&t.code===N.UNAUTHENTICATED&&3!==this.state&&(this.authCredentialsProvider.invalidateToken(),this.appCheckCredentialsProvider.invalidateToken()),null!==this.stream&&(this.W_(),this.stream.close(),this.stream=null),this.state=e,await this.listener.t_(t)}W_(){}auth(){this.state=1;let e=this.Q_(this.D_),t=this.D_;Promise.all([this.authCredentialsProvider.getToken(),this.appCheckCredentialsProvider.getToken()]).then(([e,n])=>{this.D_===t&&this.G_(e,n)},t=>{e(()=>{let e=new D(N.UNKNOWN,"Fetching auth token failed: "+t.message);return this.z_(e)})})}G_(e,t){let n=this.Q_(this.D_);this.stream=this.j_(e,t),this.stream.Zo(()=>{n(()=>this.listener.Zo())}),this.stream.Yo(()=>{n(()=>(this.state=2,this.v_=this.Ci.enqueueAfterDelay(this.b_,1e4,()=>(this.O_()&&(this.state=3),Promise.resolve())),this.listener.Yo()))}),this.stream.t_(e=>{n(()=>this.z_(e))}),this.stream.onMessage(e=>{n(()=>1==++this.F_?this.J_(e):this.onNext(e))})}N_(){this.state=5,this.M_.p_(async()=>{this.state=0,this.start()})}z_(e){return I(az,`close with error: ${e}`),this.stream=null,this.close(4,e)}Q_(e){return t=>{this.Ci.enqueueAndForget(()=>this.D_===e?t():(I(az,"stream callback skipped by getCloseGuardedDispatcher."),Promise.resolve()))}}}class a$ extends aK{constructor(e,t,n,r,i,s){super(e,"listen_stream_connection_backoff","listen_stream_idle","health_check_timeout",t,n,r,s),this.serializer=i}j_(e,t){return this.connection.T_("Listen",e,t)}J_(e){return this.onNext(e)}onNext(e){this.M_.reset();let t=function(e,t){let n;if("targetChange"in t){var r,i;t.targetChange;let s="NO_CHANGE"===(r=t.targetChange.targetChangeType||"NO_CHANGE")?0:"ADD"===r?1:"REMOVE"===r?2:"CURRENT"===r?3:"RESET"===r?4:S(39313,{state:r}),a=t.targetChange.targetIds||[],o=(i=t.targetChange.resumeToken,e.useProto3Json?(_(void 0===i||"string"==typeof i,58123),tH.fromBase64String(i||"")):(_(void 0===i||i instanceof f||i instanceof Uint8Array,16193),tH.fromUint8Array(i||new Uint8Array))),u=t.targetChange.cause;n=new ii(s,a,o,u&&new D(void 0===u.code?N.UNKNOWN:r0(u.code),u.message||"")||null)}else if("documentChange"in t){t.documentChange;let r=t.documentChange;r.document,r.document.name,r.document.updateTime;let i=ib(e,r.document.name),s=iy(r.document.updateTime),a=r.document.createTime?iy(r.document.createTime):eu.min(),o=new nx({mapValue:{fields:r.document.fields}}),u=n_.newFoundDocument(i,s,a,o);n=new it(r.targetIds||[],r.removedTargetIds||[],u.key,u)}else if("documentDelete"in t){t.documentDelete;let r=t.documentDelete;r.document;let i=ib(e,r.document),s=r.readTime?iy(r.readTime):eu.min(),a=n_.newNoDocument(i,s);n=new it([],r.removedTargetIds||[],a.key,a)}else if("documentRemove"in t){t.documentRemove;let r=t.documentRemove;r.document;let i=ib(e,r.document);n=new it([],r.removedTargetIds||[],i,null)}else{if(!("filter"in t))return S(11601,{Vt:t});{t.filter;let e=t.filter;e.targetId;let{count:r=0,unchangedNames:i}=e,s=new rX(r,i);n=new ir(e.targetId,s)}}return n}(this.serializer,e),n=function(e){if(!("targetChange"in e))return eu.min();let t=e.targetChange;return t.targetIds&&t.targetIds.length?eu.min():t.readTime?iy(t.readTime):eu.min()}(e);return this.listener.H_(t,n)}Z_(e){let t={};t.database=ix(this.serializer),t.addTarget=function(e,t){let n;let r=t.target;if((n=nY(r)?{documents:iA(e,r)}:{query:iR(e,r).ft}).targetId=t.targetId,t.resumeToken.approximateByteSize()>0){n.resumeToken=ip(e,t.resumeToken);let r=im(e,t.expectedCount);null!==r&&(n.expectedCount=r)}else if(t.snapshotVersion.compareTo(eu.min())>0){n.readTime=ig(e,t.snapshotVersion.toTimestamp());let r=im(e,t.expectedCount);null!==r&&(n.expectedCount=r)}return n}(this.serializer,e);let n=function(e,t){let n=function(e){switch(e){case"TargetPurposeListen":return null;case"TargetPurposeExistenceFilterMismatch":return"existence-filter-mismatch";case"TargetPurposeExistenceFilterMismatchBloom":return"existence-filter-mismatch-bloom";case"TargetPurposeLimboResolution":return"limbo-document";default:return S(28987,{purpose:e})}}(t.purpose);return null==n?null:{"goog-listen-tags":n}}(this.serializer,e);n&&(t.labels=n),this.q_(t)}X_(e){let t={};t.database=ix(this.serializer),t.removeTarget=e,this.q_(t)}}class aG extends aK{constructor(e,t,n,r,i,s){super(e,"write_stream_connection_backoff","write_stream_idle","health_check_timeout",t,n,r,s),this.serializer=i}get Y_(){return this.F_>0}start(){this.lastStreamToken=void 0,super.start()}W_(){this.Y_&&this.ea([])}j_(e,t){return this.connection.T_("Write",e,t)}J_(e){return _(!!e.streamToken,31322),this.lastStreamToken=e.streamToken,_(!e.writeResults||0===e.writeResults.length,55816),this.listener.ta()}onNext(e){var t,n;_(!!e.streamToken,12678),this.lastStreamToken=e.streamToken,this.M_.reset();let r=(t=e.writeResults,n=e.commitTime,t&&t.length>0?(_(void 0!==n,14353),t.map(e=>{let t;return(t=e.updateTime?iy(e.updateTime):iy(n)).isEqual(eu.min())&&(t=iy(n)),new rF(t,e.transformResults||[])})):[]),i=iy(e.commitTime);return this.listener.na(i,r)}ra(){let e={};e.database=ix(this.serializer),this.q_(e)}ea(e){let t={streamToken:this.lastStreamToken,writes:e.map(e=>iD(this.serializer,e))};this.q_(t)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class aj{}class aQ extends aj{constructor(e,t,n,r){super(),this.authCredentials=e,this.appCheckCredentials=t,this.connection=n,this.serializer=r,this.ia=!1}sa(){if(this.ia)throw new D(N.FAILED_PRECONDITION,"The client has already been terminated.")}Wo(e,t,n,r){return this.sa(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then(([i,s])=>this.connection.Wo(e,iv(t,n),r,i,s)).catch(e=>{throw"FirebaseError"===e.name?(e.code===N.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),e):new D(N.UNKNOWN,e.toString())})}jo(e,t,n,r,i){return this.sa(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then(([s,a])=>this.connection.jo(e,iv(t,n),r,s,a,i)).catch(e=>{throw"FirebaseError"===e.name?(e.code===N.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),e):new D(N.UNKNOWN,e.toString())})}terminate(){this.ia=!0,this.connection.terminate()}}class aH{constructor(e,t){this.asyncQueue=e,this.onlineStateHandler=t,this.state="Unknown",this.oa=0,this._a=null,this.aa=!0}ua(){0===this.oa&&(this.ca("Unknown"),this._a=this.asyncQueue.enqueueAfterDelay("online_state_timeout",1e4,()=>(this._a=null,this.la("Backend didn't respond within 10 seconds."),this.ca("Offline"),Promise.resolve())))}ha(e){"Online"===this.state?this.ca("Unknown"):(this.oa++,this.oa>=1&&(this.Pa(),this.la(`Connection failed 1 times. Most recent error: ${e.toString()}`),this.ca("Offline")))}set(e){this.Pa(),this.oa=0,"Online"===e&&(this.aa=!1),this.ca(e)}ca(e){e!==this.state&&(this.state=e,this.onlineStateHandler(e))}la(e){let t=`Could not reach Cloud Firestore backend. ${e}
This typically indicates that your device does not have a healthy Internet connection at the moment. The client will operate in offline mode until it is able to successfully connect to the backend.`;this.aa?(T(t),this.aa=!1):I("OnlineStateTracker",t)}Pa(){null!==this._a&&(this._a.cancel(),this._a=null)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let aJ="RemoteStore";class aW{constructor(e,t,n,r,i){this.localStore=e,this.datastore=t,this.asyncQueue=n,this.remoteSyncer={},this.Ta=[],this.Ea=new Map,this.Ia=new Set,this.Ra=[],this.Aa=i,this.Aa.Mo(e=>{n.enqueueAndForget(async()=>{a3(this)&&(I(aJ,"Restarting streams for network reachability change."),await async function(e){e.Ia.add(4),await aX(e),e.Va.set("Unknown"),e.Ia.delete(4),await aY(e)}(this))})}),this.Va=new aH(n,r)}}async function aY(e){if(a3(e))for(let t of e.Ra)await t(!0)}async function aX(e){for(let t of e.Ra)await t(!1)}function aZ(e,t){e.Ea.has(t.targetId)||(e.Ea.set(t.targetId,t),a5(e)?a4(e):oh(e).O_()&&a1(e,t))}function a0(e,t){let n=oh(e);e.Ea.delete(t),n.O_()&&a2(e,t),0===e.Ea.size&&(n.O_()?n.L_():a3(e)&&e.Va.set("Unknown"))}function a1(e,t){if(e.da.$e(t.targetId),t.resumeToken.approximateByteSize()>0||t.snapshotVersion.compareTo(eu.min())>0){let n=e.remoteSyncer.getRemoteKeysForTarget(t.targetId).size;t=t.withExpectedCount(n)}oh(e).Z_(t)}function a2(e,t){e.da.$e(t),oh(e).X_(t)}function a4(e){e.da=new ia({getRemoteKeysForTarget:t=>e.remoteSyncer.getRemoteKeysForTarget(t),At:t=>e.Ea.get(t)||null,ht:()=>e.datastore.serializer.databaseId}),oh(e).start(),e.Va.ua()}function a5(e){return a3(e)&&!oh(e).x_()&&e.Ea.size>0}function a3(e){return 0===e.Ia.size}async function a6(e){e.Va.set("Online")}async function a8(e){e.Ea.forEach((t,n)=>{a1(e,t)})}async function a9(e,t){e.da=void 0,a5(e)?(e.Va.ha(t),a4(e)):e.Va.set("Unknown")}async function a7(e,t,n){if(e.Va.set("Online"),t instanceof ii&&2===t.state&&t.cause)try{await async function(e,t){let n=t.cause;for(let r of t.targetIds)e.Ea.has(r)&&(await e.remoteSyncer.rejectListen(r,n),e.Ea.delete(r),e.da.removeTarget(r))}(e,t)}catch(n){I(aJ,"Failed to remove targets %s: %s ",t.targetIds.join(","),n),await oe(e,n)}else if(t instanceof it?e.da.Xe(t):t instanceof ir?e.da.st(t):e.da.tt(t),!n.isEqual(eu.min()))try{let t=await an(e.localStore);n.compareTo(t)>=0&&await function(e,t){let n=e.da.Tt(t);return n.targetChanges.forEach((n,r)=>{if(n.resumeToken.approximateByteSize()>0){let i=e.Ea.get(r);i&&e.Ea.set(r,i.withResumeToken(n.resumeToken,t))}}),n.targetMismatches.forEach((t,n)=>{let r=e.Ea.get(t);if(!r)return;e.Ea.set(t,r.withResumeToken(tH.EMPTY_BYTE_STRING,r.snapshotVersion)),a2(e,t);let i=new iU(r.target,t,n,r.sequenceNumber);a1(e,i)}),e.remoteSyncer.applyRemoteEvent(n)}(e,n)}catch(t){I(aJ,"Failed to raise snapshot:",t),await oe(e,t)}}async function oe(e,t,n){if(!eD(t))throw t;e.Ia.add(1),await aX(e),e.Va.set("Offline"),n||(n=()=>an(e.localStore)),e.asyncQueue.enqueueRetryable(async()=>{I(aJ,"Retrying IndexedDB access"),await n(),e.Ia.delete(1),await aY(e)})}function ot(e,t){return t().catch(n=>oe(e,n,t))}async function on(e){let t=od(e),n=e.Ta.length>0?e.Ta[e.Ta.length-1].batchId:-1;for(;a3(e)&&e.Ta.length<10;)try{let r=await function(e,t){return e.persistence.runTransaction("Get next mutation batch","readonly",n=>(void 0===t&&(t=-1),e.mutationQueue.getNextMutationBatchAfterBatchId(n,t)))}(e.localStore,n);if(null===r){0===e.Ta.length&&t.L_();break}n=r.batchId,function(e,t){e.Ta.push(t);let n=od(e);n.O_()&&n.Y_&&n.ea(t.mutations)}(e,r)}catch(t){await oe(e,t)}or(e)&&oi(e)}function or(e){return a3(e)&&!od(e).x_()&&e.Ta.length>0}function oi(e){od(e).start()}async function os(e){od(e).ra()}async function oa(e){let t=od(e);for(let n of e.Ta)t.ea(n.mutations)}async function oo(e,t,n){let r=e.Ta.shift(),i=rJ.from(r,t,n);await ot(e,()=>e.remoteSyncer.applySuccessfulWrite(i)),await on(e)}async function ou(e,t){t&&od(e).Y_&&await async function(e,t){var n;if(rZ(n=t.code)&&n!==N.ABORTED){let n=e.Ta.shift();od(e).B_(),await ot(e,()=>e.remoteSyncer.rejectFailedWrite(n.batchId,t)),await on(e)}}(e,t),or(e)&&oi(e)}async function ol(e,t){e.asyncQueue.verifyOperationInProgress(),I(aJ,"RemoteStore received new credentials");let n=a3(e);e.Ia.add(3),await aX(e),n&&e.Va.set("Unknown"),await e.remoteSyncer.handleCredentialChange(t),e.Ia.delete(3),await aY(e)}async function oc(e,t){t?(e.Ia.delete(2),await aY(e)):t||(e.Ia.add(2),await aX(e),e.Va.set("Unknown"))}function oh(e){var t,n,r;return e.ma||(e.ma=(t=e.datastore,n=e.asyncQueue,r={Zo:a6.bind(null,e),Yo:a8.bind(null,e),t_:a9.bind(null,e),H_:a7.bind(null,e)},t.sa(),new a$(n,t.connection,t.authCredentials,t.appCheckCredentials,t.serializer,r)),e.Ra.push(async t=>{t?(e.ma.B_(),a5(e)?a4(e):e.Va.set("Unknown")):(await e.ma.stop(),e.da=void 0)})),e.ma}function od(e){var t,n,r;return e.fa||(e.fa=(t=e.datastore,n=e.asyncQueue,r={Zo:()=>Promise.resolve(),Yo:os.bind(null,e),t_:ou.bind(null,e),ta:oa.bind(null,e),na:oo.bind(null,e)},t.sa(),new aG(n,t.connection,t.authCredentials,t.appCheckCredentials,t.serializer,r)),e.Ra.push(async t=>{t?(e.fa.B_(),await on(e)):(await e.fa.stop(),e.Ta.length>0&&(I(aJ,`Stopping write stream with ${e.Ta.length} pending writes`),e.Ta=[]))})),e.fa}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class of{constructor(e,t,n,r,i){this.asyncQueue=e,this.timerId=t,this.targetTimeMs=n,this.op=r,this.removalCallback=i,this.deferred=new k,this.then=this.deferred.promise.then.bind(this.deferred.promise),this.deferred.promise.catch(e=>{})}get promise(){return this.deferred.promise}static createAndSchedule(e,t,n,r,i){let s=new of(e,t,Date.now()+n,r,i);return s.start(n),s}start(e){this.timerHandle=setTimeout(()=>this.handleDelayElapsed(),e)}skipDelay(){return this.handleDelayElapsed()}cancel(e){null!==this.timerHandle&&(this.clearTimeout(),this.deferred.reject(new D(N.CANCELLED,"Operation cancelled"+(e?": "+e:""))))}handleDelayElapsed(){this.asyncQueue.enqueueAndForget(()=>null!==this.timerHandle?(this.clearTimeout(),this.op().then(e=>this.deferred.resolve(e))):Promise.resolve())}clearTimeout(){null!==this.timerHandle&&(this.removalCallback(this),clearTimeout(this.timerHandle),this.timerHandle=null)}}function om(e,t){if(T("AsyncQueue",`${t}: ${e}`),eD(e))return new D(N.UNAVAILABLE,`${t}: ${e}`);throw e}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class og{static emptySet(e){return new og(e.comparator)}constructor(e){this.comparator=e?(t,n)=>e(t,n)||W.comparator(t.key,n.key):(e,t)=>W.comparator(e.key,t.key),this.keyedMap=rf(),this.sortedSet=new tU(this.comparator)}has(e){return null!=this.keyedMap.get(e)}get(e){return this.keyedMap.get(e)}first(){return this.sortedSet.minKey()}last(){return this.sortedSet.maxKey()}isEmpty(){return this.sortedSet.isEmpty()}indexOf(e){let t=this.keyedMap.get(e);return t?this.sortedSet.indexOf(t):-1}get size(){return this.sortedSet.size}forEach(e){this.sortedSet.inorderTraversal((t,n)=>(e(t),!1))}add(e){let t=this.delete(e.key);return t.copy(t.keyedMap.insert(e.key,e),t.sortedSet.insert(e,null))}delete(e){let t=this.get(e);return t?this.copy(this.keyedMap.remove(e),this.sortedSet.remove(t)):this}isEqual(e){if(!(e instanceof og)||this.size!==e.size)return!1;let t=this.sortedSet.getIterator(),n=e.sortedSet.getIterator();for(;t.hasNext();){let e=t.getNext().key,r=n.getNext().key;if(!e.isEqual(r))return!1}return!0}toString(){let e=[];return this.forEach(t=>{e.push(t.toString())}),0===e.length?"DocumentSet ()":"DocumentSet (\n  "+e.join("  \n")+"\n)"}copy(e,t){let n=new og;return n.comparator=this.comparator,n.keyedMap=e,n.sortedSet=t,n}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class op{constructor(){this.ga=new tU(W.comparator)}track(e){let t=e.doc.key,n=this.ga.get(t);n?0!==e.type&&3===n.type?this.ga=this.ga.insert(t,e):3===e.type&&1!==n.type?this.ga=this.ga.insert(t,{type:n.type,doc:e.doc}):2===e.type&&2===n.type?this.ga=this.ga.insert(t,{type:2,doc:e.doc}):2===e.type&&0===n.type?this.ga=this.ga.insert(t,{type:0,doc:e.doc}):1===e.type&&0===n.type?this.ga=this.ga.remove(t):1===e.type&&2===n.type?this.ga=this.ga.insert(t,{type:1,doc:n.doc}):0===e.type&&1===n.type?this.ga=this.ga.insert(t,{type:2,doc:e.doc}):S(63341,{Vt:e,pa:n}):this.ga=this.ga.insert(t,e)}ya(){let e=[];return this.ga.inorderTraversal((t,n)=>{e.push(n)}),e}}class oy{constructor(e,t,n,r,i,s,a,o,u){this.query=e,this.docs=t,this.oldDocs=n,this.docChanges=r,this.mutatedKeys=i,this.fromCache=s,this.syncStateChanged=a,this.excludesMetadataChanges=o,this.hasCachedResults=u}static fromInitialDocuments(e,t,n,r,i){let s=[];return t.forEach(e=>{s.push({type:0,doc:e})}),new oy(e,t,og.emptySet(t),s,n,r,!0,!1,i)}get hasPendingWrites(){return!this.mutatedKeys.isEmpty()}isEqual(e){if(!(this.fromCache===e.fromCache&&this.hasCachedResults===e.hasCachedResults&&this.syncStateChanged===e.syncStateChanged&&this.mutatedKeys.isEqual(e.mutatedKeys)&&ri(this.query,e.query)&&this.docs.isEqual(e.docs)&&this.oldDocs.isEqual(e.oldDocs)))return!1;let t=this.docChanges,n=e.docChanges;if(t.length!==n.length)return!1;for(let e=0;e<t.length;e++)if(t[e].type!==n[e].type||!t[e].doc.isEqual(n[e].doc))return!1;return!0}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ow{constructor(){this.wa=void 0,this.Sa=[]}ba(){return this.Sa.some(e=>e.Da())}}class ov{constructor(){this.queries=oI(),this.onlineState="Unknown",this.Ca=new Set}terminate(){!function(e,t){let n=e.queries;e.queries=oI(),n.forEach((e,n)=>{for(let e of n.Sa)e.onError(t)})}(this,new D(N.ABORTED,"Firestore shutting down"))}}function oI(){return new rc(e=>rs(e),ri)}async function oT(e,t){let n=3,r=t.query,i=e.queries.get(r);i?!i.ba()&&t.Da()&&(n=2):(i=new ow,n=t.Da()?0:1);try{switch(n){case 0:i.wa=await e.onListen(r,!0);break;case 1:i.wa=await e.onListen(r,!1);break;case 2:await e.onFirstRemoteStoreListen(r)}}catch(n){let e=om(n,`Initialization of query '${ra(t.query)}' failed`);return void t.onError(e)}e.queries.set(r,i),i.Sa.push(t),t.va(e.onlineState),i.wa&&t.Fa(i.wa)&&ox(e)}async function ob(e,t){let n=t.query,r=3,i=e.queries.get(n);if(i){let e=i.Sa.indexOf(t);e>=0&&(i.Sa.splice(e,1),0===i.Sa.length?r=t.Da()?0:1:!i.ba()&&t.Da()&&(r=2))}switch(r){case 0:return e.queries.delete(n),e.onUnlisten(n,!0);case 1:return e.queries.delete(n),e.onUnlisten(n,!1);case 2:return e.onLastRemoteStoreUnlisten(n);default:return}}function oE(e,t){let n=!1;for(let r of t){let t=r.query,i=e.queries.get(t);if(i){for(let e of i.Sa)e.Fa(r)&&(n=!0);i.wa=r}}n&&ox(e)}function oS(e,t,n){let r=e.queries.get(t);if(r)for(let e of r.Sa)e.onError(n);e.queries.delete(t)}function ox(e){e.Ca.forEach(e=>{e.next()})}(a=s||(s={})).Ma="default",a.Cache="cache";class o_{constructor(e,t,n){this.query=e,this.xa=t,this.Oa=!1,this.Na=null,this.onlineState="Unknown",this.options=n||{}}Fa(e){if(!this.options.includeMetadataChanges){let t=[];for(let n of e.docChanges)3!==n.type&&t.push(n);e=new oy(e.query,e.docs,e.oldDocs,t,e.mutatedKeys,e.fromCache,e.syncStateChanged,!0,e.hasCachedResults)}let t=!1;return this.Oa?this.Ba(e)&&(this.xa.next(e),t=!0):this.La(e,this.onlineState)&&(this.ka(e),t=!0),this.Na=e,t}onError(e){this.xa.error(e)}va(e){this.onlineState=e;let t=!1;return this.Na&&!this.Oa&&this.La(this.Na,e)&&(this.ka(this.Na),t=!0),t}La(e,t){return!(e.fromCache&&this.Da())||(!this.options.qa||!("Offline"!==t))&&(!e.docs.isEmpty()||e.hasCachedResults||"Offline"===t)}Ba(e){if(e.docChanges.length>0)return!0;let t=this.Na&&this.Na.hasPendingWrites!==e.hasPendingWrites;return!(!e.syncStateChanged&&!t)&&!0===this.options.includeMetadataChanges}ka(e){e=oy.fromInitialDocuments(e.query,e.docs,e.mutatedKeys,e.fromCache,e.hasCachedResults),this.Oa=!0,this.xa.next(e)}Da(){return this.options.source!==s.Cache}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class oC{constructor(e,t){this.Ka=e,this.byteLength=t}Ua(){return"metadata"in this.Ka}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class oN{constructor(e){this.serializer=e}qs(e){return ib(this.serializer,e)}Ks(e){return e.metadata.exists?iN(this.serializer,e.document,!1):n_.newNoDocument(this.qs(e.metadata.name),this.Us(e.metadata.readTime))}Us(e){return iy(e)}}class oD{constructor(e,t){this.$a=e,this.serializer=t,this.Wa=[],this.Qa=[],this.collectionGroups=new Set,this.progress=ok(e)}get queries(){return this.Wa}get documents(){return this.Qa}Ga(e){this.progress.bytesLoaded+=e.byteLength;let t=this.progress.documentsLoaded;if(e.Ka.namedQuery)this.Wa.push(e.Ka.namedQuery);else if(e.Ka.documentMetadata){this.Qa.push({metadata:e.Ka.documentMetadata}),e.Ka.documentMetadata.exists||++t;let n=Q.fromString(e.Ka.documentMetadata.name);this.collectionGroups.add(n.get(n.length-2))}else e.Ka.document&&(this.Qa[this.Qa.length-1].document=e.Ka.document,++t);return t!==this.progress.documentsLoaded?(this.progress.documentsLoaded=t,{...this.progress}):null}za(e){let t=new Map,n=new oN(this.serializer);for(let r of e)if(r.metadata.queries){let e=n.qs(r.metadata.name);for(let n of r.metadata.queries){let r=(t.get(n)||rw()).add(e);t.set(n,r)}}return t}async ja(e){let t=await ac(e,new oN(this.serializer),this.Qa,this.$a.id),n=this.za(this.documents);for(let t of this.Wa)await ah(e,t,n.get(t.name));return this.progress.taskState="Success",{progress:this.progress,Ja:this.collectionGroups,Ha:t}}}function ok(e){return{taskState:"Running",documentsLoaded:0,bytesLoaded:0,totalDocuments:e.totalDocuments,totalBytes:e.totalBytes}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class oA{constructor(e){this.key=e}}class oR{constructor(e){this.key=e}}class oV{constructor(e,t){this.query=e,this.Za=t,this.Xa=null,this.hasCachedResults=!1,this.current=!1,this.Ya=rw(),this.mutatedKeys=rw(),this.eu=rl(e),this.tu=new og(this.eu)}get nu(){return this.Za}ru(e,t){let n=t?t.iu:new op,r=t?t.tu:this.tu,i=t?t.mutatedKeys:this.mutatedKeys,s=r,a=!1,o="F"===this.query.limitType&&r.size===this.query.limit?r.last():null,u="L"===this.query.limitType&&r.size===this.query.limit?r.first():null;if(e.inorderTraversal((e,t)=>{let l=r.get(e),c=ro(this.query,t)?t:null,h=!!l&&this.mutatedKeys.has(l.key),d=!!c&&(c.hasLocalMutations||this.mutatedKeys.has(c.key)&&c.hasCommittedMutations),f=!1;l&&c?l.data.isEqual(c.data)?h!==d&&(n.track({type:3,doc:c}),f=!0):this.su(l,c)||(n.track({type:2,doc:c}),f=!0,(o&&this.eu(c,o)>0||u&&0>this.eu(c,u))&&(a=!0)):!l&&c?(n.track({type:0,doc:c}),f=!0):l&&!c&&(n.track({type:1,doc:l}),f=!0,(o||u)&&(a=!0)),f&&(c?(s=s.add(c),i=d?i.add(e):i.delete(e)):(s=s.delete(e),i=i.delete(e)))}),null!==this.query.limit)for(;s.size>this.query.limit;){let e="F"===this.query.limitType?s.last():s.first();s=s.delete(e.key),i=i.delete(e.key),n.track({type:1,doc:e})}return{tu:s,iu:n,bs:a,mutatedKeys:i}}su(e,t){return e.hasLocalMutations&&t.hasCommittedMutations&&!t.hasLocalMutations}applyChanges(e,t,n,r){let i=this.tu;this.tu=e.tu,this.mutatedKeys=e.mutatedKeys;let s=e.iu.ya();s.sort((e,t)=>(function(e,t){let n=e=>{switch(e){case 0:return 1;case 2:case 3:return 2;case 1:return 0;default:return S(20277,{Vt:e})}};return n(e)-n(t)})(e.type,t.type)||this.eu(e.doc,t.doc)),this.ou(n),r=r??!1;let a=t&&!r?this._u():[],o=0===this.Ya.size&&this.current&&!r?1:0,u=o!==this.Xa;return(this.Xa=o,0!==s.length||u)?{snapshot:new oy(this.query,e.tu,i,s,e.mutatedKeys,0===o,u,!1,!!n&&n.resumeToken.approximateByteSize()>0),au:a}:{au:a}}va(e){return this.current&&"Offline"===e?(this.current=!1,this.applyChanges({tu:this.tu,iu:new op,mutatedKeys:this.mutatedKeys,bs:!1},!1)):{au:[]}}uu(e){return!this.Za.has(e)&&!!this.tu.has(e)&&!this.tu.get(e).hasLocalMutations}ou(e){e&&(e.addedDocuments.forEach(e=>this.Za=this.Za.add(e)),e.modifiedDocuments.forEach(e=>{}),e.removedDocuments.forEach(e=>this.Za=this.Za.delete(e)),this.current=e.current)}_u(){if(!this.current)return[];let e=this.Ya;this.Ya=rw(),this.tu.forEach(e=>{this.uu(e.key)&&(this.Ya=this.Ya.add(e.key))});let t=[];return e.forEach(e=>{this.Ya.has(e)||t.push(new oR(e))}),this.Ya.forEach(n=>{e.has(n)||t.push(new oA(n))}),t}cu(e){this.Za=e.ks,this.Ya=rw();let t=this.ru(e.documents);return this.applyChanges(t,!0)}lu(){return oy.fromInitialDocuments(this.query,this.tu,this.mutatedKeys,0===this.Xa,this.hasCachedResults)}}let oF="SyncEngine";class oO{constructor(e,t,n){this.query=e,this.targetId=t,this.view=n}}class oM{constructor(e){this.key=e,this.hu=!1}}class oP{constructor(e,t,n,r,i,s){this.localStore=e,this.remoteStore=t,this.eventManager=n,this.sharedClientState=r,this.currentUser=i,this.maxConcurrentLimboResolutions=s,this.Pu={},this.Tu=new rc(e=>rs(e),ri),this.Eu=new Map,this.Iu=new Set,this.Ru=new tU(W.comparator),this.Au=new Map,this.Vu=new sK,this.du={},this.mu=new Map,this.fu=sb.ar(),this.onlineState="Unknown",this.gu=void 0}get isPrimaryClient(){return!0===this.gu}}async function oL(e,t,n=!0){let r;let i=us(e),s=i.Tu.get(t);return s?(i.sharedClientState.addLocalQueryTarget(s.targetId),r=s.view.lu()):r=await oq(i,t,n,!0),r}async function oU(e,t){let n=us(e);await oq(n,t,!0,!1)}async function oq(e,t,n,r){let i;let s=await ai(e.localStore,n6(t)),a=s.targetId,o=e.sharedClientState.addLocalQueryTarget(a,n);return r&&(i=await oB(e,t,a,"current"===o,s.resumeToken)),e.isPrimaryClient&&n&&aZ(e.remoteStore,s),i}async function oB(e,t,n,r,i){e.pu=(t,n,r)=>(async function(e,t,n,r){let i=t.view.ru(n);i.bs&&(i=await aa(e.localStore,t.query,!1).then(({documents:e})=>t.view.ru(e,i)));let s=r&&r.targetChanges.get(t.targetId),a=r&&null!=r.targetMismatches.get(t.targetId),o=t.view.applyChanges(i,e.isPrimaryClient,s,a);return o1(e,t.targetId,o.au),o.snapshot})(e,t,n,r);let s=await aa(e.localStore,t,!0),a=new oV(t,s.ks),o=a.ru(s.documents),u=ie.createSynthesizedTargetChangeForCurrentChange(n,r&&"Offline"!==e.onlineState,i),l=a.applyChanges(o,e.isPrimaryClient,u);o1(e,n,l.au);let c=new oO(t,n,a);return e.Tu.set(t,c),e.Eu.has(n)?e.Eu.get(n).push(t):e.Eu.set(n,[t]),l.snapshot}async function oz(e,t,n){let r=e.Tu.get(t),i=e.Eu.get(r.targetId);if(i.length>1)return e.Eu.set(r.targetId,i.filter(e=>!ri(e,t))),void e.Tu.delete(t);e.isPrimaryClient?(e.sharedClientState.removeLocalQueryTarget(r.targetId),e.sharedClientState.isActiveQueryTarget(r.targetId)||await as(e.localStore,r.targetId,!1).then(()=>{e.sharedClientState.clearQueryState(r.targetId),n&&a0(e.remoteStore,r.targetId),oZ(e,r.targetId)}).catch(eT)):(oZ(e,r.targetId),await as(e.localStore,r.targetId,!0))}async function oK(e,t){let n=e.Tu.get(t),r=e.Eu.get(n.targetId);e.isPrimaryClient&&1===r.length&&(e.sharedClientState.removeLocalQueryTarget(n.targetId),a0(e.remoteStore,n.targetId))}async function o$(e,t,n){let r=ua(e);try{var i;let e;let s=await function(e,t){let n,r;let i=eo.now(),s=t.reduce((e,t)=>e.add(t.key),rw());return e.persistence.runTransaction("Locally write mutations","readwrite",a=>{let o=rh,u=rw();return e.xs.getEntries(a,s).next(e=>{(o=e).forEach((e,t)=>{t.isValidDocument()||(u=u.add(e))})}).next(()=>e.localDocuments.getOverlayedDocuments(a,o)).next(r=>{n=r;let s=[];for(let e of t){let t=function(e,t){let n=null;for(let r of e.fieldTransforms){let e=t.data.field(r.field),i=rS(r.transform,e||null);null!=i&&(null===n&&(n=nx.empty()),n.set(r.field,i))}return n||null}(e,n.get(e.key).overlayedDocument);null!=t&&s.push(new rz(e.key,t,function e(t){let n=[];return tM(t.fields,(t,r)=>{let i=new J([t]);if(nw(r)){let t=e(r.mapValue).fields;if(0===t.length)n.push(i);else for(let e of t)n.push(i.child(e))}else n.push(i)}),new tG(n)}(t.value.mapValue),rO.exists(!0)))}return e.mutationQueue.addMutationBatch(a,i,s,t)}).next(t=>{r=t;let i=t.applyToLocalDocumentSet(n,u);return e.documentOverlayCache.saveOverlays(a,t.batchId,i)})}).then(()=>({batchId:r.batchId,changes:rm(n)}))}(r.localStore,t);r.sharedClientState.addPendingMutation(s.batchId),i=s.batchId,(e=r.du[r.currentUser.toKey()])||(e=new tU(B)),e=e.insert(i,n),r.du[r.currentUser.toKey()]=e,await o4(r,s.changes),await on(r.remoteStore)}catch(t){let e=om(t,"Failed to persist write");n.reject(e)}}async function oG(e,t){try{let n=await function(e,t){let n=t.snapshotVersion,r=e.vs;return e.persistence.runTransaction("Apply remote event","readwrite-primary",i=>{let s=e.xs.newChangeBuffer({trackRemovals:!0});r=e.vs;let a=[];t.targetChanges.forEach((s,o)=>{var u;let l=r.get(o);if(!l)return;a.push(e.li.removeMatchingKeys(i,s.removedDocuments,o).next(()=>e.li.addMatchingKeys(i,s.addedDocuments,o)));let c=l.withSequenceNumber(i.currentSequenceNumber);null!==t.targetMismatches.get(o)?c=c.withResumeToken(tH.EMPTY_BYTE_STRING,eu.min()).withLastLimboFreeSnapshotVersion(eu.min()):s.resumeToken.approximateByteSize()>0&&(c=c.withResumeToken(s.resumeToken,n)),r=r.insert(o,c),u=c,(0===l.resumeToken.approximateByteSize()||u.snapshotVersion.toMicroseconds()-l.snapshotVersion.toMicroseconds()>=3e8||s.addedDocuments.size+s.modifiedDocuments.size+s.removedDocuments.size>0)&&a.push(e.li.updateTargetData(i,c))});let o=rh,u=rw();if(t.documentUpdates.forEach(n=>{t.resolvedLimboDocuments.has(n)&&a.push(e.persistence.referenceDelegate.updateLimboDocument(i,n))}),a.push(ar(i,s,t.documentUpdates).next(e=>{o=e.Bs,u=e.Ls})),!n.isEqual(eu.min())){let t=e.li.getLastRemoteSnapshotVersion(i).next(t=>e.li.setTargetsMetadata(i,i.currentSequenceNumber,n));a.push(t)}return eb.waitFor(a).next(()=>s.apply(i)).next(()=>e.localDocuments.getLocalViewOfDocuments(i,o,u)).next(()=>o)}).then(t=>(e.vs=r,t))}(e.localStore,t);t.targetChanges.forEach((t,n)=>{let r=e.Au.get(n);r&&(_(t.addedDocuments.size+t.modifiedDocuments.size+t.removedDocuments.size<=1,22616),t.addedDocuments.size>0?r.hu=!0:t.modifiedDocuments.size>0?_(r.hu,14607):t.removedDocuments.size>0&&(_(r.hu,42227),r.hu=!1))}),await o4(e,n,t)}catch(e){await eT(e)}}function oj(e,t,n){var r;if(e.isPrimaryClient&&0===n||!e.isPrimaryClient&&1===n){let n;let i=[];e.Tu.forEach((e,n)=>{let r=n.view.va(t);r.snapshot&&i.push(r.snapshot)}),(r=e.eventManager).onlineState=t,n=!1,r.queries.forEach((e,r)=>{for(let e of r.Sa)e.va(t)&&(n=!0)}),n&&ox(r),i.length&&e.Pu.H_(i),e.onlineState=t,e.isPrimaryClient&&e.sharedClientState.setOnlineState(t)}}async function oQ(e,t,n){e.sharedClientState.updateQueryState(t,"rejected",n);let r=e.Au.get(t),i=r&&r.key;if(i){let n=new tU(W.comparator);n=n.insert(i,n_.newNoDocument(i,eu.min()));let r=rw().add(i),s=new r7(eu.min(),new Map,new tU(B),n,r);await oG(e,s),e.Ru=e.Ru.remove(i),e.Au.delete(t),o2(e)}else await as(e.localStore,t,!1).then(()=>oZ(e,t,n)).catch(eT)}async function oH(e,t){var n;let r=t.batch.batchId;try{let i=await (n=e.localStore).persistence.runTransaction("Acknowledge batch","readwrite-primary",e=>{let r=t.batch.keys(),i=n.xs.newChangeBuffer({trackRemovals:!0});return(function(e,t,n,r){let i=n.batch,s=i.keys(),a=eb.resolve();return s.forEach(e=>{a=a.next(()=>r.getEntry(t,e)).next(t=>{let s=n.docVersions.get(e);_(null!==s,48541),0>t.version.compareTo(s)&&(i.applyToRemoteDocument(t,n),t.isValidDocument()&&(t.setReadTime(n.commitVersion),r.addEntry(t)))})}),a.next(()=>e.mutationQueue.removeMutationBatch(t,i))})(n,e,t,i).next(()=>i.apply(e)).next(()=>n.mutationQueue.performConsistencyCheck(e)).next(()=>n.documentOverlayCache.removeOverlaysForBatchId(e,r,t.batch.batchId)).next(()=>n.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(e,function(e){let t=rw();for(let n=0;n<e.mutationResults.length;++n)e.mutationResults[n].transformResults.length>0&&(t=t.add(e.batch.mutations[n].key));return t}(t))).next(()=>n.localDocuments.getDocuments(e,r))});oX(e,r,null),oY(e,r),e.sharedClientState.updateMutationState(r,"acknowledged"),await o4(e,i)}catch(e){await eT(e)}}async function oJ(e,t,n){var r;try{let i=await (r=e.localStore).persistence.runTransaction("Reject batch","readwrite-primary",e=>{let n;return r.mutationQueue.lookupMutationBatch(e,t).next(t=>(_(null!==t,37113),n=t.keys(),r.mutationQueue.removeMutationBatch(e,t))).next(()=>r.mutationQueue.performConsistencyCheck(e)).next(()=>r.documentOverlayCache.removeOverlaysForBatchId(e,n,t)).next(()=>r.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(e,n)).next(()=>r.localDocuments.getDocuments(e,n))});oX(e,t,n),oY(e,t),e.sharedClientState.updateMutationState(t,"rejected",n),await o4(e,i)}catch(e){await eT(e)}}async function oW(e,t){var n;a3(e.remoteStore)||I(oF,"The network is disabled. The task returned by 'awaitPendingWrites()' will not complete until the network is enabled.");try{let r=await (n=e.localStore).persistence.runTransaction("Get highest unacknowledged batch id","readonly",e=>n.mutationQueue.getHighestUnacknowledgedBatchId(e));if(-1===r)return void t.resolve();let i=e.mu.get(r)||[];i.push(t),e.mu.set(r,i)}catch(n){let e=om(n,"Initialization of waitForPendingWrites() operation failed");t.reject(e)}}function oY(e,t){(e.mu.get(t)||[]).forEach(e=>{e.resolve()}),e.mu.delete(t)}function oX(e,t,n){let r=e.du[e.currentUser.toKey()];if(r){let i=r.get(t);i&&(n?i.reject(n):i.resolve(),r=r.remove(t)),e.du[e.currentUser.toKey()]=r}}function oZ(e,t,n=null){for(let r of(e.sharedClientState.removeLocalQueryTarget(t),e.Eu.get(t)))e.Tu.delete(r),n&&e.Pu.yu(r,n);e.Eu.delete(t),e.isPrimaryClient&&e.Vu.Gr(t).forEach(t=>{e.Vu.containsKey(t)||o0(e,t)})}function o0(e,t){e.Iu.delete(t.path.canonicalString());let n=e.Ru.get(t);null!==n&&(a0(e.remoteStore,n),e.Ru=e.Ru.remove(t),e.Au.delete(n),o2(e))}function o1(e,t,n){for(let r of n)r instanceof oA?(e.Vu.addReference(r.key,t),function(e,t){let n=t.key,r=n.path.canonicalString();e.Ru.get(n)||e.Iu.has(r)||(I(oF,"New document in limbo: "+n),e.Iu.add(r),o2(e))}(e,r)):r instanceof oR?(I(oF,"Document no longer in limbo: "+r.key),e.Vu.removeReference(r.key,t),e.Vu.containsKey(r.key)||o0(e,r.key)):S(19791,{wu:r})}function o2(e){for(;e.Iu.size>0&&e.Ru.size<e.maxConcurrentLimboResolutions;){let t=e.Iu.values().next().value;e.Iu.delete(t);let n=new W(Q.fromString(t)),r=e.fu.next();e.Au.set(r,new oM(n)),e.Ru=e.Ru.insert(n,r),aZ(e.remoteStore,new iU(n6(n2(n.path)),r,"TargetPurposeLimboResolution",eP.ce))}}async function o4(e,t,n){let r=[],i=[],s=[];e.Tu.isEmpty()||(e.Tu.forEach((a,o)=>{s.push(e.pu(o,t,n).then(t=>{if((t||n)&&e.isPrimaryClient){let r=t?!t.fromCache:n?.targetChanges.get(o.targetId)?.current;e.sharedClientState.updateQueryState(o.targetId,r?"current":"not-current")}if(t){r.push(t);let e=s6.Is(o.targetId,t);i.push(e)}}))}),await Promise.all(s),e.Pu.H_(r),await async function(e,t){try{await e.persistence.runTransaction("notifyLocalViewChanges","readwrite",n=>eb.forEach(t,t=>eb.forEach(t.Ts,r=>e.persistence.referenceDelegate.addReference(n,t.targetId,r)).next(()=>eb.forEach(t.Es,r=>e.persistence.referenceDelegate.removeReference(n,t.targetId,r)))))}catch(e){if(!eD(e))throw e;I(s7,"Failed to update sequence numbers: "+e)}for(let n of t){let t=n.targetId;if(!n.fromCache){let n=e.vs.get(t),r=n.snapshotVersion,i=n.withLastLimboFreeSnapshotVersion(r);e.vs=e.vs.insert(t,i)}}}(e.localStore,i))}async function o5(e,t){var n;if(!e.currentUser.isEqual(t)){I(oF,"User change. New user:",t.toKey());let r=await at(e.localStore,t);e.currentUser=t,n="'waitForPendingWrites' promise is rejected due to a user change.",e.mu.forEach(e=>{e.forEach(e=>{e.reject(new D(N.CANCELLED,n))})}),e.mu.clear(),e.sharedClientState.handleUserChange(t,r.removedBatchIds,r.addedBatchIds),await o4(e,r.Ns)}}function o3(e,t){let n=e.Au.get(t);if(n&&n.hu)return rw().add(n.key);{let n=rw(),r=e.Eu.get(t);if(!r)return n;for(let t of r){let r=e.Tu.get(t);n=n.unionWith(r.view.nu)}return n}}async function o6(e,t){let n=await aa(e.localStore,t.query,!0),r=t.view.cu(n);return e.isPrimaryClient&&o1(e,t.targetId,r.au),r}async function o8(e,t){return au(e.localStore,t).then(t=>o4(e,t))}async function o9(e,t,n,r){let i=await function(e,t){let n=e.mutationQueue;return e.persistence.runTransaction("Lookup mutation documents","readonly",r=>n.Xn(r,t).next(t=>t?e.localDocuments.getDocuments(r,t):eb.resolve(null)))}(e.localStore,t);null!==i?("pending"===n?await on(e.remoteStore):"acknowledged"===n||"rejected"===n?(oX(e,t,r||null),oY(e,t),function(e,t){e.mutationQueue.nr(t)}(e.localStore,t)):S(6720,"Unknown batchState",{Su:n}),await o4(e,i)):I(oF,"Cannot apply mutation batch with id: "+t)}async function o7(e,t){if(us(e),ua(e),!0===t&&!0!==e.gu){let t=e.sharedClientState.getAllActiveQueryTargets(),n=await ue(e,t.toArray());for(let t of(e.gu=!0,await oc(e.remoteStore,!0),n))aZ(e.remoteStore,t)}else if(!1===t&&!1!==e.gu){let t=[],n=Promise.resolve();e.Eu.forEach((r,i)=>{e.sharedClientState.isLocalQueryTarget(i)?t.push(i):n=n.then(()=>(oZ(e,i),as(e.localStore,i,!0))),a0(e.remoteStore,i)}),await n,await ue(e,t),e.Au.forEach((t,n)=>{a0(e.remoteStore,n)}),e.Vu.zr(),e.Au=new Map,e.Ru=new tU(W.comparator),e.gu=!1,await oc(e.remoteStore,!1)}}async function ue(e,t,n){let r=[],i=[];for(let n of t){let t;let s=e.Eu.get(n);if(s&&0!==s.length)for(let n of(t=await ai(e.localStore,n6(s[0])),s)){let t=e.Tu.get(n),r=await o6(e,t);r.snapshot&&i.push(r.snapshot)}else{let r=await ao(e.localStore,n);t=await ai(e.localStore,r),await oB(e,ut(r),n,!1,t.resumeToken)}r.push(t)}return e.Pu.H_(i),r}function ut(e){var t,n,r,i;return t=e.path,n=e.collectionGroup,r=e.orderBy,i=e.filters,new n1(t,n,r,i,e.limit,"F",e.startAt,e.endAt)}function un(e){return e.localStore.persistence.hs()}async function ur(e,t,n,r){if(e.gu)return void I(oF,"Ignoring unexpected query state notification.");let i=e.Eu.get(t);if(i&&i.length>0)switch(n){case"current":case"not-current":{let r=await au(e.localStore,ru(i[0])),s=r7.createSynthesizedRemoteEventForCurrentChange(t,"current"===n,tH.EMPTY_BYTE_STRING);await o4(e,r,s);break}case"rejected":await as(e.localStore,t,!0),oZ(e,t,r);break;default:S(64155,n)}}async function ui(e,t,n){let r=us(e);if(r.gu){for(let e of t){if(r.Eu.has(e)&&r.sharedClientState.isActiveQueryTarget(e)){I(oF,"Adding an already active target "+e);continue}let t=await ao(r.localStore,e),n=await ai(r.localStore,t);await oB(r,ut(t),n.targetId,!1,n.resumeToken),aZ(r.remoteStore,n)}for(let e of n)r.Eu.has(e)&&await as(r.localStore,e,!1).then(()=>{a0(r.remoteStore,e),oZ(r,e)}).catch(eT)}}function us(e){return e.remoteStore.remoteSyncer.applyRemoteEvent=oG.bind(null,e),e.remoteStore.remoteSyncer.getRemoteKeysForTarget=o3.bind(null,e),e.remoteStore.remoteSyncer.rejectListen=oQ.bind(null,e),e.Pu.H_=oE.bind(null,e.eventManager),e.Pu.yu=oS.bind(null,e.eventManager),e}function ua(e){return e.remoteStore.remoteSyncer.applySuccessfulWrite=oH.bind(null,e),e.remoteStore.remoteSyncer.rejectFailedWrite=oJ.bind(null,e),e}class uo{constructor(){this.kind="memory",this.synchronizeTabs=!1}async initialize(e){this.serializer=aq(e.databaseInfo.databaseId),this.sharedClientState=this.Du(e),this.persistence=this.Cu(e),await this.persistence.start(),this.localStore=this.vu(e),this.gcScheduler=this.Fu(e,this.localStore),this.indexBackfillerScheduler=this.Mu(e,this.localStore)}Fu(e,t){return null}Mu(e,t){return null}vu(e){var t;return t=this.persistence,new ae(t,new s9,e.initialUser,this.serializer)}Cu(e){return new sJ(sY.Vi,this.serializer)}Du(e){return new ax}async terminate(){this.gcScheduler?.stop(),this.indexBackfillerScheduler?.stop(),this.sharedClientState.shutdown(),await this.persistence.shutdown()}}uo.provider={build:()=>new uo};class uu extends uo{constructor(e){super(),this.cacheSizeBytes=e}Fu(e,t){return _(this.persistence.referenceDelegate instanceof sX,46915),new sN(this.persistence.referenceDelegate.garbageCollector,e.asyncQueue,t)}Cu(e){let t=void 0!==this.cacheSizeBytes?sp.withCacheSize(this.cacheSizeBytes):sp.DEFAULT;return new sJ(e=>sX.Vi(e,t),this.serializer)}}class ul extends uo{constructor(e,t,n){super(),this.xu=e,this.cacheSizeBytes=t,this.forceOwnership=n,this.kind="persistent",this.synchronizeTabs=!1}async initialize(e){await super.initialize(e),await this.xu.initialize(this,e),await ua(this.xu.syncEngine),await on(this.xu.remoteStore),await this.persistence.zi(()=>(this.gcScheduler&&!this.gcScheduler.started&&this.gcScheduler.start(),this.indexBackfillerScheduler&&!this.indexBackfillerScheduler.started&&this.indexBackfillerScheduler.start(),Promise.resolve()))}vu(e){var t;return t=this.persistence,new ae(t,new s9,e.initialUser,this.serializer)}Fu(e,t){return new sN(this.persistence.referenceDelegate.garbageCollector,e.asyncQueue,t)}Mu(e,t){let n=new eM(t,this.persistence);return new eO(e.asyncQueue,n)}Cu(e){let t=s3(e.databaseInfo.databaseId,e.databaseInfo.persistenceKey),n=void 0!==this.cacheSizeBytes?sp.withCacheSize(this.cacheSizeBytes):sp.DEFAULT;return new s5(this.synchronizeTabs,t,e.clientId,n,e.asyncQueue,aL(),aU(),this.serializer,this.sharedClientState,!!this.forceOwnership)}Du(e){return new ax}}class uc extends ul{constructor(e,t){super(e,t,!1),this.xu=e,this.cacheSizeBytes=t,this.synchronizeTabs=!0}async initialize(e){await super.initialize(e);let t=this.xu.syncEngine;this.sharedClientState instanceof aS&&(this.sharedClientState.syncEngine={bo:o9.bind(null,t),Do:ur.bind(null,t),Co:ui.bind(null,t),hs:un.bind(null,t),So:o8.bind(null,t)},await this.sharedClientState.start()),await this.persistence.zi(async e=>{await o7(this.xu.syncEngine,e),this.gcScheduler&&(e&&!this.gcScheduler.started?this.gcScheduler.start():e||this.gcScheduler.stop()),this.indexBackfillerScheduler&&(e&&!this.indexBackfillerScheduler.started?this.indexBackfillerScheduler.start():e||this.indexBackfillerScheduler.stop())})}Du(e){let t=aL();if(!aS.v(t))throw new D(N.UNIMPLEMENTED,"IndexedDB persistence is only available on platforms that support LocalStorage.");let n=s3(e.databaseInfo.databaseId,e.databaseInfo.persistenceKey);return new aS(t,e.asyncQueue,n,e.clientId,e.initialUser)}}class uh{async initialize(e,t){this.localStore||(this.localStore=e.localStore,this.sharedClientState=e.sharedClientState,this.datastore=this.createDatastore(t),this.remoteStore=this.createRemoteStore(t),this.eventManager=this.createEventManager(t),this.syncEngine=this.createSyncEngine(t,!e.synchronizeTabs),this.sharedClientState.onlineStateHandler=e=>oj(this.syncEngine,e,1),this.remoteStore.remoteSyncer.handleCredentialChange=o5.bind(null,this.syncEngine),await oc(this.remoteStore,this.syncEngine.isPrimaryClient))}createEventManager(e){return new ov}createDatastore(e){let t=aq(e.databaseInfo.databaseId),n=new aP(e.databaseInfo);return new aQ(e.authCredentials,e.appCheckCredentials,n,t)}createRemoteStore(e){var t;return t=this.localStore,new aW(t,this.datastore,e.asyncQueue,e=>oj(this.syncEngine,e,0),aN.v()?new aN:new a_)}createSyncEngine(e,t){return function(e,t,n,r,i,s,a){let o=new oP(e,t,n,r,i,s);return a&&(o.gu=!0),o}(this.localStore,this.remoteStore,this.eventManager,this.sharedClientState,e.initialUser,e.maxConcurrentLimboResolutions,t)}async terminate(){await async function(e){I(aJ,"RemoteStore shutting down."),e.Ia.add(5),await aX(e),e.Aa.shutdown(),e.Va.set("Unknown")}(this.remoteStore),this.datastore?.terminate(),this.eventManager?.terminate()}}function ud(e,t=10240){let n=0;return{async read(){if(n<e.byteLength){let r={value:e.slice(n,n+t),done:!1};return n+=t,r}return{done:!0}},async cancel(){},releaseLock(){},closed:Promise.resolve()}}uh.provider={build:()=>new uh};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class uf{constructor(e){this.observer=e,this.muted=!1}next(e){this.muted||this.observer.next&&this.Ou(this.observer.next,e)}error(e){this.muted||(this.observer.error?this.Ou(this.observer.error,e):T("Uncaught Error in snapshot listener:",e.toString()))}Nu(){this.muted=!0}Ou(e,t){setTimeout(()=>{this.muted||e(t)},0)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class um{constructor(e,t){this.Bu=e,this.serializer=t,this.metadata=new k,this.buffer=new Uint8Array,this.Lu=new TextDecoder("utf-8"),this.ku().then(e=>{e&&e.Ua()?this.metadata.resolve(e.Ka.metadata):this.metadata.reject(Error(`The first element of the bundle is not a metadata, it is
             ${JSON.stringify(e?.Ka)}`))},e=>this.metadata.reject(e))}close(){return this.Bu.cancel()}async getMetadata(){return this.metadata.promise}async bu(){return await this.getMetadata(),this.ku()}async ku(){let e=await this.qu();if(null===e)return null;let t=this.Lu.decode(e),n=Number(t);return isNaN(n)&&this.Ku(`length string (${t}) is not valid number`),new oC(JSON.parse(await this.Uu(n)),e.length+n)}$u(){return this.buffer.findIndex(e=>123===e)}async qu(){for(;0>this.$u()&&!await this.Wu(););if(0===this.buffer.length)return null;let e=this.$u();e<0&&this.Ku("Reached the end of bundle when a length string is expected.");let t=this.buffer.slice(0,e);return this.buffer=this.buffer.slice(e),t}async Uu(e){for(;this.buffer.length<e;)await this.Wu()&&this.Ku("Reached the end of bundle when more is expected.");let t=this.Lu.decode(this.buffer.slice(0,e));return this.buffer=this.buffer.slice(e),t}Ku(e){throw this.Bu.cancel(),Error(`Invalid bundle format: ${e}`)}async Wu(){let e=await this.Bu.read();if(!e.done){let t=new Uint8Array(this.buffer.length+e.value.length);t.set(this.buffer),t.set(e.value,this.buffer.length),this.buffer=t}return e.done}}/**
 * @license
 * Copyright 2025 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ug{constructor(e,t){this.bundleData=e,this.serializer=t,this.cursor=0,this.elements=[];let n=this.bu();if(!n||!n.Ua())throw Error(`The first element of the bundle is not a metadata object, it is
         ${JSON.stringify(n?.Ka)}`);this.metadata=n;do null!==(n=this.bu())&&this.elements.push(n);while(null!==n)}getMetadata(){return this.metadata}Qu(){return this.elements}bu(){if(this.cursor===this.bundleData.length)return null;let e=this.qu();return new oC(JSON.parse(this.Uu(e)),e)}Uu(e){if(this.cursor+e>this.bundleData.length)throw new D(N.INTERNAL,"Reached the end of bundle when more is expected.");return this.bundleData.slice(this.cursor,this.cursor+=e)}qu(){let e=this.cursor,t=this.cursor;for(;t<this.bundleData.length;){if("{"===this.bundleData[t]){if(t===e)throw Error("First character is a bracket and not a number");return this.cursor=t,Number(this.bundleData.slice(e,t))}t++}throw Error("Reached the end of bundle when more is expected.")}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class up{constructor(e){this.datastore=e,this.readVersions=new Map,this.mutations=[],this.committed=!1,this.lastTransactionError=null,this.writtenDocs=new Set}async lookup(e){if(this.ensureCommitNotCalled(),this.mutations.length>0)throw this.lastTransactionError=new D(N.INVALID_ARGUMENT,"Firestore transactions require all reads to be executed before all writes."),this.lastTransactionError;let t=await async function(e,t){let n={documents:t.map(t=>iT(e.serializer,t))},r=await e.jo("BatchGetDocuments",e.serializer.databaseId,Q.emptyPath(),n,t.length),i=new Map;r.forEach(t=>{var n;let r=(n=e.serializer,"found"in t?function(e,t){_(!!t.found,43571),t.found.name,t.found.updateTime;let n=ib(e,t.found.name),r=iy(t.found.updateTime),i=t.found.createTime?iy(t.found.createTime):eu.min(),s=new nx({mapValue:{fields:t.found.fields}});return n_.newFoundDocument(n,r,i,s)}(n,t):"missing"in t?function(e,t){_(!!t.missing,3894),_(!!t.readTime,22933);let n=ib(e,t.missing),r=iy(t.readTime);return n_.newNoDocument(n,r)}(n,t):S(7234,{result:t}));i.set(r.key.toString(),r)});let s=[];return t.forEach(e=>{let t=i.get(e.toString());_(!!t,55234,{key:e}),s.push(t)}),s}(this.datastore,e);return t.forEach(e=>this.recordVersion(e)),t}set(e,t){this.write(t.toMutation(e,this.precondition(e))),this.writtenDocs.add(e.toString())}update(e,t){try{this.write(t.toMutation(e,this.preconditionForUpdate(e)))}catch(e){this.lastTransactionError=e}this.writtenDocs.add(e.toString())}delete(e){this.write(new rj(e,this.precondition(e))),this.writtenDocs.add(e.toString())}async commit(){if(this.ensureCommitNotCalled(),this.lastTransactionError)throw this.lastTransactionError;let e=this.readVersions;this.mutations.forEach(t=>{e.delete(t.key.toString())}),e.forEach((e,t)=>{let n=W.fromPath(t);this.mutations.push(new rQ(n,this.precondition(n)))}),await async function(e,t){let n={writes:t.map(t=>iD(e.serializer,t))};await e.Wo("Commit",e.serializer.databaseId,Q.emptyPath(),n)}(this.datastore,this.mutations),this.committed=!0}recordVersion(e){let t;if(e.isFoundDocument())t=e.version;else{if(!e.isNoDocument())throw S(50498,{Gu:e.constructor.name});t=eu.min()}let n=this.readVersions.get(e.key.toString());if(n){if(!t.isEqual(n))throw new D(N.ABORTED,"Document version changed between two reads.")}else this.readVersions.set(e.key.toString(),t)}precondition(e){let t=this.readVersions.get(e.toString());return!this.writtenDocs.has(e.toString())&&t?t.isEqual(eu.min())?rO.exists(!1):rO.updateTime(t):rO.none()}preconditionForUpdate(e){let t=this.readVersions.get(e.toString());if(!this.writtenDocs.has(e.toString())&&t){if(t.isEqual(eu.min()))throw new D(N.INVALID_ARGUMENT,"Can't update a document that doesn't exist.");return rO.updateTime(t)}return rO.exists(!0)}write(e){this.ensureCommitNotCalled(),this.mutations.push(e)}ensureCommitNotCalled(){}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class uy{constructor(e,t,n,r,i){this.asyncQueue=e,this.datastore=t,this.options=n,this.updateFunction=r,this.deferred=i,this.zu=n.maxAttempts,this.M_=new aB(this.asyncQueue,"transaction_retry")}ju(){this.zu-=1,this.Ju()}Ju(){this.M_.p_(async()=>{let e=new up(this.datastore),t=this.Hu(e);t&&t.then(t=>{this.asyncQueue.enqueueAndForget(()=>e.commit().then(()=>{this.deferred.resolve(t)}).catch(e=>{this.Zu(e)}))}).catch(e=>{this.Zu(e)})})}Hu(e){try{let t=this.updateFunction(e);return!eL(t)&&t.catch&&t.then?t:(this.deferred.reject(Error("Transaction callback must return a Promise")),null)}catch(e){return this.deferred.reject(e),null}}Zu(e){this.zu>0&&this.Xu(e)?(this.zu-=1,this.asyncQueue.enqueueAndForget(()=>(this.Ju(),Promise.resolve()))):this.deferred.reject(e)}Xu(e){if("FirebaseError"===e?.name){let t=e.code;return"aborted"===t||"failed-precondition"===t||"already-exists"===t||!rZ(t)}return!1}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let uw="FirestoreClient";class uv{constructor(e,t,n,r,i){this.authCredentials=e,this.appCheckCredentials=t,this.asyncQueue=n,this._databaseInfo=r,this.user=m.UNAUTHENTICATED,this.clientId=q.newId(),this.authCredentialListener=()=>Promise.resolve(),this.appCheckCredentialListener=()=>Promise.resolve(),this._uninitializedComponentsProvider=i,this.authCredentials.start(n,async e=>{I(uw,"Received user=",e.uid),await this.authCredentialListener(e),this.user=e}),this.appCheckCredentials.start(n,e=>(I(uw,"Received new app check token=",e),this.appCheckCredentialListener(e,this.user)))}get configuration(){return{asyncQueue:this.asyncQueue,databaseInfo:this._databaseInfo,clientId:this.clientId,authCredentials:this.authCredentials,appCheckCredentials:this.appCheckCredentials,initialUser:this.user,maxConcurrentLimboResolutions:100}}setCredentialChangeListener(e){this.authCredentialListener=e}setAppCheckTokenChangeListener(e){this.appCheckCredentialListener=e}terminate(){this.asyncQueue.enterRestrictedMode();let e=new k;return this.asyncQueue.enqueueAndForgetEvenWhileRestricted(async()=>{try{this._onlineComponents&&await this._onlineComponents.terminate(),this._offlineComponents&&await this._offlineComponents.terminate(),this.authCredentials.shutdown(),this.appCheckCredentials.shutdown(),e.resolve()}catch(n){let t=om(n,"Failed to shutdown persistence");e.reject(t)}}),e.promise}}async function uI(e,t){e.asyncQueue.verifyOperationInProgress(),I(uw,"Initializing OfflineComponentProvider");let n=e.configuration;await t.initialize(n);let r=n.initialUser;e.setCredentialChangeListener(async e=>{r.isEqual(e)||(await at(t.localStore,e),r=e)}),t.persistence.setDatabaseDeletedListener(()=>e.terminate()),e._offlineComponents=t}async function uT(e,t){e.asyncQueue.verifyOperationInProgress();let n=await ub(e);I(uw,"Initializing OnlineComponentProvider"),await t.initialize(n,e.configuration),e.setCredentialChangeListener(e=>ol(t.remoteStore,e)),e.setAppCheckTokenChangeListener((e,n)=>ol(t.remoteStore,n)),e._onlineComponents=t}async function ub(e){if(!e._offlineComponents){if(e._uninitializedComponentsProvider){I(uw,"Using user provided OfflineComponentProvider");try{await uI(e,e._uninitializedComponentsProvider._offline)}catch(t){if(!("FirebaseError"===t.name?t.code===N.FAILED_PRECONDITION||t.code===N.UNIMPLEMENTED:!("undefined"!=typeof DOMException&&t instanceof DOMException)||22===t.code||20===t.code||11===t.code))throw t;b("Error using user provided cache. Falling back to memory cache: "+t),await uI(e,new uo)}}else I(uw,"Using default OfflineComponentProvider"),await uI(e,new uu(void 0))}return e._offlineComponents}async function uE(e){return e._onlineComponents||(e._uninitializedComponentsProvider?(I(uw,"Using user provided OnlineComponentProvider"),await uT(e,e._uninitializedComponentsProvider._online)):(I(uw,"Using default OnlineComponentProvider"),await uT(e,new uh))),e._onlineComponents}function uS(e){return ub(e).then(e=>e.persistence)}function ux(e){return ub(e).then(e=>e.localStore)}function u_(e){return uE(e).then(e=>e.remoteStore)}function uC(e){return uE(e).then(e=>e.syncEngine)}function uN(e){return uE(e).then(e=>e.datastore)}async function uD(e){let t=await uE(e),n=t.eventManager;return n.onListen=oL.bind(null,t.syncEngine),n.onUnlisten=oz.bind(null,t.syncEngine),n.onFirstRemoteStoreListen=oU.bind(null,t.syncEngine),n.onLastRemoteStoreUnlisten=oK.bind(null,t.syncEngine),n}function uk(e,t,n,r){let i=new uf(r),s=new o_(t,i,n);return e.asyncQueue.enqueueAndForget(async()=>oT(await uD(e),s)),()=>{i.Nu(),e.asyncQueue.enqueueAndForget(async()=>ob(await uD(e),s))}}function uA(e,t){let n=new k;return e.asyncQueue.enqueueAndForget(async()=>(async function(e,t,n){try{let r=await e.persistence.runTransaction("read document","readonly",n=>e.localDocuments.getDocument(n,t));r.isFoundDocument()?n.resolve(r):r.isNoDocument()?n.resolve(null):n.reject(new D(N.UNAVAILABLE,"Failed to get document from cache. (However, this document may exist on the server. Run again without setting 'source' in the GetOptions to attempt to retrieve the document from the server.)"))}catch(r){let e=om(r,`Failed to get document '${t} from cache`);n.reject(e)}})(await ux(e),t,n)),n.promise}function uR(e,t,n={}){let r=new k;return e.asyncQueue.enqueueAndForget(async()=>(function(e,t,n,r,i){let s=new uf({next:o=>{s.Nu(),t.enqueueAndForget(()=>ob(e,a));let u=o.docs.has(n);!u&&o.fromCache?i.reject(new D(N.UNAVAILABLE,"Failed to get document because the client is offline.")):u&&o.fromCache&&r&&"server"===r.source?i.reject(new D(N.UNAVAILABLE,'Failed to get document from server. (However, this document does exist in the local cache. Run again without setting source to "server" to retrieve the cached document.)')):i.resolve(o)},error:e=>i.reject(e)}),a=new o_(n2(n.path),s,{includeMetadataChanges:!0,qa:!0});return oT(e,a)})(await uD(e),e.asyncQueue,t,n,r)),r.promise}function uV(e,t){let n=new k;return e.asyncQueue.enqueueAndForget(async()=>(async function(e,t,n){try{let r=await aa(e,t,!0),i=new oV(t,r.ks),s=i.ru(r.documents),a=i.applyChanges(s,!1);n.resolve(a.snapshot)}catch(r){let e=om(r,`Failed to execute query '${t} against cache`);n.reject(e)}})(await ux(e),t,n)),n.promise}function uF(e,t,n={}){let r=new k;return e.asyncQueue.enqueueAndForget(async()=>(function(e,t,n,r,i){let s=new uf({next:n=>{s.Nu(),t.enqueueAndForget(()=>ob(e,a)),n.fromCache&&"server"===r.source?i.reject(new D(N.UNAVAILABLE,'Failed to get documents from server. (However, these documents may exist in the local cache. Run again without setting source to "server" to retrieve the cached documents.)')):i.resolve(n)},error:e=>i.reject(e)}),a=new o_(n,s,{includeMetadataChanges:!0,qa:!0});return oT(e,a)})(await uD(e),e.asyncQueue,t,n,r)),r.promise}function uO(e,t,n){let r=new k;return e.asyncQueue.enqueueAndForget(async()=>{try{let i=await uN(e);r.resolve(async function(e,t,n){let{request:r,gt:i,parent:s}=iV(e.serializer,n8(t),n);e.connection.qo||delete r.parent;let a=(await e.jo("RunAggregationQuery",e.serializer.databaseId,s,r,1)).filter(e=>!!e.result);_(1===a.length,64727);let o=a[0].result?.aggregateFields;return Object.keys(o).reduce((e,t)=>(e[i[t]]=o[t],e),{})}(i,t,n))}catch(e){r.reject(e)}}),r.promise}function uM(e,t){let n=new k;return e.asyncQueue.enqueueAndForget(async()=>o$(await uC(e),t,n)),n.promise}function uP(e,t){let n=new uf(t);return e.asyncQueue.enqueueAndForget(async()=>{(await uD(e)).Ca.add(n),n.next()}),()=>{n.Nu(),e.asyncQueue.enqueueAndForget(async()=>(function(e,t){e.Ca.delete(t)})(await uD(e),n))}}function uL(e,t,n){let r=new k;return e.asyncQueue.enqueueAndForget(async()=>{let i=await uN(e);new uy(e.asyncQueue,i,n,t,r).ju()}),r.promise}function uU(e,t){return new ug(e,t)}function uq(e,t){return e.asyncQueue.enqueue(async()=>(async function(e,t){let n=e.indexManager,r=[];return e.persistence.runTransaction("Configure indexes","readwrite",e=>n.getFieldIndexes(e).next(i=>/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */(function(e,t,n,r,i){t=[...t],(e=[...e]).sort(n),t.sort(n);let s=e.length,a=t.length,o=0,u=0;for(;o<a&&u<s;){let s=n(e[u],t[o]);s<0?i(e[u++]):s>0?r(t[o++]):(o++,u++)}for(;o<a;)r(t[o++]);for(;u<s;)i(e[u++])})(i,t,ed,t=>{r.push(n.addFieldIndex(e,t))},t=>{r.push(n.deleteFieldIndex(e,t))})).next(()=>eb.waitFor(r)))})(await ux(e),t))}function uB(e,t){return e.asyncQueue.enqueue(async()=>{(await ux(e)).Cs.As=t})}function uz(e){return e.asyncQueue.enqueue(async()=>(function(e){let t=e.indexManager;return e.persistence.runTransaction("Delete All Indexes","readwrite",e=>t.deleteAllFieldIndexes(e))})(await ux(e)))}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function uK(e){let t={};return void 0!==e.timeoutSeconds&&(t.timeoutSeconds=e.timeoutSeconds),t}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let u$=new Map,uG="firestore.googleapis.com";class uj{constructor(e){if(void 0===e.host){if(void 0!==e.ssl)throw new D(N.INVALID_ARGUMENT,"Can't provide ssl option if host option is not set");this.host=uG,this.ssl=!0}else this.host=e.host,this.ssl=e.ssl??!0;if(this.isUsingEmulator=void 0!==e.emulatorOptions,this.credentials=e.credentials,this.ignoreUndefinedProperties=!!e.ignoreUndefinedProperties,this.localCache=e.localCache,void 0===e.cacheSizeBytes)this.cacheSizeBytes=41943040;else{if(-1!==e.cacheSizeBytes&&e.cacheSizeBytes<1048576)throw new D(N.INVALID_ARGUMENT,"cacheSizeBytes must be at least 1048576");this.cacheSizeBytes=e.cacheSizeBytes}X("experimentalForceLongPolling",e.experimentalForceLongPolling,"experimentalAutoDetectLongPolling",e.experimentalAutoDetectLongPolling),this.experimentalForceLongPolling=!!e.experimentalForceLongPolling,this.experimentalForceLongPolling?this.experimentalAutoDetectLongPolling=!1:void 0===e.experimentalAutoDetectLongPolling?this.experimentalAutoDetectLongPolling=!0:this.experimentalAutoDetectLongPolling=!!e.experimentalAutoDetectLongPolling,this.experimentalLongPollingOptions=uK(e.experimentalLongPollingOptions??{}),function(e){if(void 0!==e.timeoutSeconds){if(isNaN(e.timeoutSeconds))throw new D(N.INVALID_ARGUMENT,`invalid long polling timeout: ${e.timeoutSeconds} (must not be NaN)`);if(e.timeoutSeconds<5)throw new D(N.INVALID_ARGUMENT,`invalid long polling timeout: ${e.timeoutSeconds} (minimum allowed value is 5)`);if(e.timeoutSeconds>30)throw new D(N.INVALID_ARGUMENT,`invalid long polling timeout: ${e.timeoutSeconds} (maximum allowed value is 30)`)}}(this.experimentalLongPollingOptions),this.useFetchStreams=!!e.useFetchStreams}isEqual(e){var t,n;return this.host===e.host&&this.ssl===e.ssl&&this.credentials===e.credentials&&this.cacheSizeBytes===e.cacheSizeBytes&&this.experimentalForceLongPolling===e.experimentalForceLongPolling&&this.experimentalAutoDetectLongPolling===e.experimentalAutoDetectLongPolling&&(t=this.experimentalLongPollingOptions,n=e.experimentalLongPollingOptions,t.timeoutSeconds===n.timeoutSeconds)&&this.ignoreUndefinedProperties===e.ignoreUndefinedProperties&&this.useFetchStreams===e.useFetchStreams}}class uQ{constructor(e,t,n,r){this._authCredentials=e,this._appCheckCredentials=t,this._databaseId=n,this._app=r,this.type="firestore-lite",this._persistenceKey="(lite)",this._settings=new uj({}),this._settingsFrozen=!1,this._emulatorOptions={},this._terminateTask="notTerminated"}get app(){if(!this._app)throw new D(N.FAILED_PRECONDITION,"Firestore was not initialized using the Firebase SDK. 'app' is not available");return this._app}get _initialized(){return this._settingsFrozen}get _terminated(){return"notTerminated"!==this._terminateTask}_setSettings(e){if(this._settingsFrozen)throw new D(N.FAILED_PRECONDITION,"Firestore has already been started and its settings can no longer be changed. You can only modify settings before calling any other methods on a Firestore object.");this._settings=new uj(e),this._emulatorOptions=e.emulatorOptions||{},void 0!==e.credentials&&(this._authCredentials=function(e){if(!e)return new R;switch(e.type){case"firstParty":return new M(e.sessionIndex||"0",e.iamToken||null,e.authTokenFactory||null);case"provider":return e.client;default:throw new D(N.INVALID_ARGUMENT,"makeAuthCredentialsProvider failed due to invalid credential type")}}(e.credentials))}_getSettings(){return this._settings}_getEmulatorOptions(){return this._emulatorOptions}_freezeSettings(){return this._settingsFrozen=!0,this._settings}_delete(){return"notTerminated"===this._terminateTask&&(this._terminateTask=this._terminate()),this._terminateTask}async _restart(){"notTerminated"===this._terminateTask?await this._terminate():this._terminateTask="notTerminated"}toJSON(){return{app:this._app,databaseId:this._databaseId,settings:this._settings}}_terminate(){return function(e){let t=u$.get(e);t&&(I("ComponentProvider","Removing Datastore"),u$.delete(e),t.terminate())}(this),Promise.resolve()}}function uH(e,t,n,r={}){e=er(e,uQ);let i=(0,u.Xx)(t),s=e._getSettings(),a={...s,emulatorOptions:e._getEmulatorOptions()},o=`${t}:${n}`;i&&(0,u.Uo)(`https://${o}`),s.host!==uG&&s.host!==o&&b("Host has been set in both settings() and connectFirestoreEmulator(), emulator host will be used.");let l={...s,host:o,ssl:i,emulatorOptions:r};if(!(0,u.vZ)(l,a)&&(e._setSettings(l),r.mockUserToken)){let t,n;if("string"==typeof r.mockUserToken)t=r.mockUserToken,n=m.MOCK_USER;else{t=(0,u.Sg)(r.mockUserToken,e._app?.options.projectId);let i=r.mockUserToken.sub||r.mockUserToken.user_id;if(!i)throw new D(N.INVALID_ARGUMENT,"mockUserToken must contain 'sub' or 'user_id' field!");n=new m(i)}e._authCredentials=new V(new A(t,n))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class uJ{constructor(e,t,n){this.converter=t,this._query=n,this.type="query",this.firestore=e}withConverter(e){return new uJ(this.firestore,e,this._query)}}class uW{constructor(e,t,n){this.converter=t,this._key=n,this.type="document",this.firestore=e}get _path(){return this._key.path}get id(){return this._key.path.lastSegment()}get path(){return this._key.path.canonicalString()}get parent(){return new uY(this.firestore,this.converter,this._key.path.popLast())}withConverter(e){return new uW(this.firestore,e,this._key)}toJSON(){return{type:uW._jsonSchemaVersion,referencePath:this._key.toString()}}static fromJSON(e,t,n){if(ea(t,uW._jsonSchema))return new uW(e,n||null,new W(Q.fromString(t.referencePath)))}}uW._jsonSchemaVersion="firestore/documentReference/1.0",uW._jsonSchema={type:es("string",uW._jsonSchemaVersion),referencePath:es("string")};class uY extends uJ{constructor(e,t,n){super(e,t,n2(n)),this._path=n,this.type="collection"}get id(){return this._query.path.lastSegment()}get path(){return this._query.path.canonicalString()}get parent(){let e=this._path.popLast();return e.isEmpty()?null:new uW(this.firestore,null,new W(e))}withConverter(e){return new uY(this.firestore,e,this._path)}}function uX(e,t,...n){if(e=(0,u.m9)(e),Y("collection","path",t),e instanceof uQ){let r=Q.fromString(t,...n);return ee(r),new uY(e,null,r)}{if(!(e instanceof uW||e instanceof uY))throw new D(N.INVALID_ARGUMENT,"Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore");let r=e._path.child(Q.fromString(t,...n));return ee(r),new uY(e.firestore,null,r)}}function uZ(e,t){if(e=er(e,uQ),Y("collectionGroup","collection id",t),t.indexOf("/")>=0)throw new D(N.INVALID_ARGUMENT,`Invalid collection ID '${t}' passed to function collectionGroup(). Collection IDs must not contain '/'.`);return new uJ(e,null,new n1(Q.emptyPath(),t))}function u0(e,t,...n){if(e=(0,u.m9)(e),1==arguments.length&&(t=q.newId()),Y("doc","path",t),e instanceof uQ){let r=Q.fromString(t,...n);return Z(r),new uW(e,null,new W(r))}{if(!(e instanceof uW||e instanceof uY))throw new D(N.INVALID_ARGUMENT,"Expected first argument to doc() to be a CollectionReference, a DocumentReference or FirebaseFirestore");let r=e._path.child(Q.fromString(t,...n));return Z(r),new uW(e.firestore,e instanceof uY?e.converter:null,new W(r))}}function u1(e,t){return e=(0,u.m9)(e),t=(0,u.m9)(t),(e instanceof uW||e instanceof uY)&&(t instanceof uW||t instanceof uY)&&e.firestore===t.firestore&&e.path===t.path&&e.converter===t.converter}function u2(e,t){return e=(0,u.m9)(e),t=(0,u.m9)(t),e instanceof uJ&&t instanceof uJ&&e.firestore===t.firestore&&ri(e._query,t._query)&&e.converter===t.converter}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let u4="AsyncQueue";class u5{constructor(e=Promise.resolve()){this.Yu=[],this.ec=!1,this.tc=[],this.nc=null,this.rc=!1,this.sc=!1,this.oc=[],this.M_=new aB(this,"async_queue_retry"),this._c=()=>{let e=aU();e&&I(u4,"Visibility state changed to "+e.visibilityState),this.M_.w_()},this.ac=e;let t=aU();t&&"function"==typeof t.addEventListener&&t.addEventListener("visibilitychange",this._c)}get isShuttingDown(){return this.ec}enqueueAndForget(e){this.enqueue(e)}enqueueAndForgetEvenWhileRestricted(e){this.uc(),this.cc(e)}enterRestrictedMode(e){if(!this.ec){this.ec=!0,this.sc=e||!1;let t=aU();t&&"function"==typeof t.removeEventListener&&t.removeEventListener("visibilitychange",this._c)}}enqueue(e){if(this.uc(),this.ec)return new Promise(()=>{});let t=new k;return this.cc(()=>this.ec&&this.sc?Promise.resolve():(e().then(t.resolve,t.reject),t.promise)).then(()=>t.promise)}enqueueRetryable(e){this.enqueueAndForget(()=>(this.Yu.push(e),this.lc()))}async lc(){if(0!==this.Yu.length){try{await this.Yu[0](),this.Yu.shift(),this.M_.reset()}catch(e){if(!eD(e))throw e;I(u4,"Operation failed with retryable error: "+e)}this.Yu.length>0&&this.M_.p_(()=>this.lc())}}cc(e){let t=this.ac.then(()=>(this.rc=!0,e().catch(e=>{throw this.nc=e,this.rc=!1,T("INTERNAL UNHANDLED ERROR: ",u3(e)),e}).then(e=>(this.rc=!1,e))));return this.ac=t,t}enqueueAfterDelay(e,t,n){this.uc(),this.oc.indexOf(e)>-1&&(t=0);let r=of.createAndSchedule(this,e,t,n,e=>this.hc(e));return this.tc.push(r),r}uc(){this.nc&&S(47125,{Pc:u3(this.nc)})}verifyOperationInProgress(){}async Tc(){let e;do e=this.ac,await e;while(e!==this.ac)}Ec(e){for(let t of this.tc)if(t.timerId===e)return!0;return!1}Ic(e){return this.Tc().then(()=>{for(let t of(this.tc.sort((e,t)=>e.targetTimeMs-t.targetTimeMs),this.tc))if(t.skipDelay(),"all"!==e&&t.timerId===e)break;return this.Tc()})}Rc(e){this.oc.push(e)}hc(e){let t=this.tc.indexOf(e);this.tc.splice(t,1)}}function u3(e){let t=e.message||"";return e.stack&&(t=e.stack.includes(e.message)?e.stack:e.message+"\n"+e.stack),t}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class u6{constructor(){this._progressObserver={},this._taskCompletionResolver=new k,this._lastProgress={taskState:"Running",totalBytes:0,totalDocuments:0,bytesLoaded:0,documentsLoaded:0}}onProgress(e,t,n){this._progressObserver={next:e,error:t,complete:n}}catch(e){return this._taskCompletionResolver.promise.catch(e)}then(e,t){return this._taskCompletionResolver.promise.then(e,t)}_completeWith(e){this._updateProgress(e),this._progressObserver.complete&&this._progressObserver.complete(),this._taskCompletionResolver.resolve(e)}_failWith(e){this._lastProgress.taskState="Error",this._progressObserver.next&&this._progressObserver.next(this._lastProgress),this._progressObserver.error&&this._progressObserver.error(e),this._taskCompletionResolver.reject(e)}_updateProgress(e){this._lastProgress=e,this._progressObserver.next&&this._progressObserver.next(e)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let u8=-1;class u9 extends uQ{constructor(e,t,n,r){super(e,t,n,r),this.type="firestore",this._queue=new u5,this._persistenceKey=r?.name||"[DEFAULT]"}async _terminate(){if(this._firestoreClient){let e=this._firestoreClient.terminate();this._queue=new u5(e),this._firestoreClient=void 0,await e}}}function u7(e,t,n){n||(n=t8);let r=(0,o.qX)(e,"firestore");if(r.isInitialized(n)){let e=r.getImmediate({identifier:n}),i=r.getOptions(n);if((0,u.vZ)(i,t))return e;throw new D(N.FAILED_PRECONDITION,"initializeFirestore() has already been called with different options. To avoid this error, call initializeFirestore() with the same options as when it was originally called, or call getFirestore() to return the already initialized instance.")}if(void 0!==t.cacheSizeBytes&&void 0!==t.localCache)throw new D(N.INVALID_ARGUMENT,"cache and cacheSizeBytes cannot be specified at the same time as cacheSizeBytes willbe deprecated. Instead, specify the cache size in the cache object");if(void 0!==t.cacheSizeBytes&&-1!==t.cacheSizeBytes&&t.cacheSizeBytes<1048576)throw new D(N.INVALID_ARGUMENT,"cacheSizeBytes must be at least 1048576");return t.host&&(0,u.Xx)(t.host)&&(0,u.Uo)(t.host),r.initialize({options:t,instanceIdentifier:n})}function le(e,t){let n="object"==typeof e?e:(0,o.Mq)(),r="string"==typeof e?e:t||t8,i=(0,o.qX)(n,"firestore").getImmediate({identifier:r});if(!i._initialized){let e=(0,u.P0)("firestore");e&&uH(i,...e)}return i}function lt(e){if(e._terminated)throw new D(N.FAILED_PRECONDITION,"The client has already been terminated.");return e._firestoreClient||ln(e),e._firestoreClient}function ln(e){var t,n,r,i;let s=e._freezeSettings(),a=(t=e._databaseId,n=e._app?.options.appId||"",r=e._persistenceKey,i=e._app?.options.apiKey,new t6(t,n,r,s.host,s.ssl,s.experimentalForceLongPolling,s.experimentalAutoDetectLongPolling,uK(s.experimentalLongPollingOptions),s.useFetchStreams,s.isUsingEmulator,i));e._componentsProvider||s.localCache?._offlineComponentProvider&&s.localCache?._onlineComponentProvider&&(e._componentsProvider={_offline:s.localCache._offlineComponentProvider,_online:s.localCache._onlineComponentProvider}),e._firestoreClient=new uv(e._authCredentials,e._appCheckCredentials,e._queue,a,e._componentsProvider&&function(e){let t=e?._online.build();return{_offline:e?._offline.build(t),_online:t}}(e._componentsProvider))}function lr(e,t){b("enableIndexedDbPersistence() will be deprecated in the future, you can use `FirestoreSettings.cache` instead.");let n=e._freezeSettings();return ls(e,uh.provider,{build:e=>new ul(e,n.cacheSizeBytes,t?.forceOwnership)}),Promise.resolve()}async function li(e){b("enableMultiTabIndexedDbPersistence() will be deprecated in the future, you can use `FirestoreSettings.cache` instead.");let t=e._freezeSettings();ls(e,uh.provider,{build:e=>new uc(e,t.cacheSizeBytes)})}function ls(e,t,n){if((e=er(e,u9))._firestoreClient||e._terminated)throw new D(N.FAILED_PRECONDITION,"Firestore has already been started and persistence can no longer be enabled. You can only enable persistence before calling any other methods on a Firestore object.");if(e._componentsProvider||e._getSettings().localCache)throw new D(N.FAILED_PRECONDITION,"SDK cache is already specified.");e._componentsProvider={_online:t,_offline:n},ln(e)}function la(e){if(e._initialized&&!e._terminated)throw new D(N.FAILED_PRECONDITION,"Persistence can only be cleared before a Firestore instance is initialized or after it is terminated.");let t=new k;return e._queue.enqueueAndForgetEvenWhileRestricted(async()=>{try{await async function(e){if(!ex.v())return Promise.resolve();await ex.delete(e+s4)}(s3(e._databaseId,e._persistenceKey)),t.resolve()}catch(e){t.reject(e)}}),t.promise}function lo(e){return function(e){let t=new k;return e.asyncQueue.enqueueAndForget(async()=>oW(await uC(e),t)),t.promise}(lt(e=er(e,u9)))}function lu(e){var t;return(t=lt(e=er(e,u9))).asyncQueue.enqueue(async()=>{let e=await uS(t),n=await u_(t);return e.setNetworkEnabled(!0),n.Ia.delete(0),aY(n)})}function ll(e){var t;return(t=lt(e=er(e,u9))).asyncQueue.enqueue(async()=>{let e=await uS(t),n=await u_(t);return e.setNetworkEnabled(!1),async function(e){e.Ia.add(0),await aX(e),e.Va.set("Offline")}(n)})}function lc(e){return(0,o.wN)(e.app,"firestore",e._databaseId.database),e._delete()}function lh(e,t){let n=lt(e=er(e,u9)),r=new u6;return function(e,t,n,r){var i;let s=(i=aq(t),new um(function(e,t){if(e instanceof Uint8Array)return ud(e,void 0);if(e instanceof ArrayBuffer)return ud(new Uint8Array(e),void 0);if(e instanceof ReadableStream)return e.getReader();throw Error("Source of `toByteStreamReader` has to be a ArrayBuffer or ReadableStream")}("string"==typeof n?r4().encode(n):n),i));e.asyncQueue.enqueueAndForget(async()=>{!function(e,t,n){(async function(e,t,n){try{var r;let i=await t.getMetadata();if(await function(e,t){let n=iy(t.createTime);return e.persistence.runTransaction("hasNewerBundle","readonly",n=>e.Pi.getBundleMetadata(n,t.id)).then(e=>!!e&&e.createTime.compareTo(n)>=0)}(e.localStore,i))return await t.close(),n._completeWith({taskState:"Success",documentsLoaded:i.totalDocuments,bytesLoaded:i.totalBytes,totalDocuments:i.totalDocuments,totalBytes:i.totalBytes}),Promise.resolve(new Set);n._updateProgress(ok(i));let s=new oD(i,t.serializer),a=await t.bu();for(;a;){let e=await s.Ga(a);e&&n._updateProgress(e),a=await t.bu()}let o=await s.ja(e.localStore);return await o4(e,o.Ha,void 0),await (r=e.localStore).persistence.runTransaction("Save bundle","readwrite",e=>r.Pi.saveBundleMetadata(e,i)),n._completeWith(o.progress),Promise.resolve(o.Ja)}catch(e){return b(oF,`Loading bundle failed with ${e}`),n._failWith(e),Promise.resolve(new Set)}})(e,t,n).then(t=>{e.sharedClientState.notifyBundleLoaded(t)})}(await uC(e),s,r)})}(n,e._databaseId,t,r),r}function ld(e,t){var n;return(n=lt(e=er(e,u9))).asyncQueue.enqueue(async()=>{var e;return(e=await ux(n)).persistence.runTransaction("Get named query","readonly",n=>e.Pi.getNamedQuery(n,t))}).then(t=>t?new uJ(e,null,t.query):null)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class lf{constructor(e){this._byteString=e}static fromBase64String(e){try{return new lf(tH.fromBase64String(e))}catch(e){throw new D(N.INVALID_ARGUMENT,"Failed to construct data from Base64 string: "+e)}}static fromUint8Array(e){return new lf(tH.fromUint8Array(e))}toBase64(){return this._byteString.toBase64()}toUint8Array(){return this._byteString.toUint8Array()}toString(){return"Bytes(base64: "+this.toBase64()+")"}isEqual(e){return this._byteString.isEqual(e._byteString)}toJSON(){return{type:lf._jsonSchemaVersion,bytes:this.toBase64()}}static fromJSON(e){if(ea(e,lf._jsonSchema))return lf.fromBase64String(e.bytes)}}lf._jsonSchemaVersion="firestore/bytes/1.0",lf._jsonSchema={type:es("string",lf._jsonSchemaVersion),bytes:es("string")};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class lm{constructor(...e){for(let t=0;t<e.length;++t)if(0===e[t].length)throw new D(N.INVALID_ARGUMENT,"Invalid field name at argument $(i + 1). Field names must not be empty.");this._internalPath=new J(e)}isEqual(e){return this._internalPath.isEqual(e._internalPath)}}function lg(){return new lm(G)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class lp{constructor(e){this._methodName=e}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ly{constructor(e,t){if(!isFinite(e)||e<-90||e>90)throw new D(N.INVALID_ARGUMENT,"Latitude must be a number between -90 and 90, but was: "+e);if(!isFinite(t)||t<-180||t>180)throw new D(N.INVALID_ARGUMENT,"Longitude must be a number between -180 and 180, but was: "+t);this._lat=e,this._long=t}get latitude(){return this._lat}get longitude(){return this._long}isEqual(e){return this._lat===e._lat&&this._long===e._long}_compareTo(e){return B(this._lat,e._lat)||B(this._long,e._long)}toJSON(){return{latitude:this._lat,longitude:this._long,type:ly._jsonSchemaVersion}}static fromJSON(e){if(ea(e,ly._jsonSchema))return new ly(e.latitude,e.longitude)}}ly._jsonSchemaVersion="firestore/geoPoint/1.0",ly._jsonSchema={type:es("string",ly._jsonSchemaVersion),latitude:es("number"),longitude:es("number")};/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class lw{constructor(e){this._values=(e||[]).map(e=>e)}toArray(){return this._values.map(e=>e)}isEqual(e){return function(e,t){if(e.length!==t.length)return!1;for(let n=0;n<e.length;++n)if(e[n]!==t[n])return!1;return!0}(this._values,e._values)}toJSON(){return{type:lw._jsonSchemaVersion,vectorValues:this._values}}static fromJSON(e){if(ea(e,lw._jsonSchema)){if(Array.isArray(e.vectorValues)&&e.vectorValues.every(e=>"number"==typeof e))return new lw(e.vectorValues);throw new D(N.INVALID_ARGUMENT,"Expected 'vectorValues' field to be a number array")}}}lw._jsonSchemaVersion="firestore/vectorValue/1.0",lw._jsonSchema={type:es("string",lw._jsonSchemaVersion),vectorValues:es("object")};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let lv=/^__.*__$/;class lI{constructor(e,t,n){this.data=e,this.fieldMask=t,this.fieldTransforms=n}toMutation(e,t){return null!==this.fieldMask?new rz(e,this.data,this.fieldMask,t,this.fieldTransforms):new rB(e,this.data,t,this.fieldTransforms)}}class lT{constructor(e,t,n){this.data=e,this.fieldMask=t,this.fieldTransforms=n}toMutation(e,t){return new rz(e,this.data,this.fieldMask,t,this.fieldTransforms)}}function lb(e){switch(e){case 0:case 2:case 1:return!0;case 3:case 4:return!1;default:throw S(40011,{dataSource:e})}}class lE{constructor(e,t,n,r,i,s){this.settings=e,this.databaseId=t,this.serializer=n,this.ignoreUndefinedProperties=r,void 0===i&&this.Ac(),this.fieldTransforms=i||[],this.fieldMask=s||[]}get path(){return this.settings.path}get dataSource(){return this.settings.dataSource}i(e){return new lE({...this.settings,...e},this.databaseId,this.serializer,this.ignoreUndefinedProperties,this.fieldTransforms,this.fieldMask)}dc(e){let t=this.path?.child(e),n=this.i({path:t,arrayElement:!1});return n.mc(e),n}fc(e){let t=this.path?.child(e),n=this.i({path:t,arrayElement:!1});return n.Ac(),n}gc(e){return this.i({path:void 0,arrayElement:!0})}yc(e){return lK(e,this.settings.methodName,this.settings.hasConverter||!1,this.path,this.settings.targetDoc)}contains(e){return void 0!==this.fieldMask.find(t=>e.isPrefixOf(t))||void 0!==this.fieldTransforms.find(t=>e.isPrefixOf(t.field))}Ac(){if(this.path)for(let e=0;e<this.path.length;e++)this.mc(this.path.get(e))}mc(e){if(0===e.length)throw this.yc("Document fields must not be empty");if(lb(this.dataSource)&&lv.test(e))throw this.yc('Document fields cannot begin and end with "__"')}}class lS{constructor(e,t,n){this.databaseId=e,this.ignoreUndefinedProperties=t,this.serializer=n||aq(e)}I(e,t,n,r=!1){return new lE({dataSource:e,methodName:t,targetDoc:n,path:J.emptyPath(),arrayElement:!1,hasConverter:r},this.databaseId,this.serializer,this.ignoreUndefinedProperties)}}function lx(e){let t=e._freezeSettings(),n=aq(e._databaseId);return new lS(e._databaseId,!!t.ignoreUndefinedProperties,n)}function l_(e,t,n,r,i,s={}){let a,o;let u=e.I(s.merge||s.mergeFields?2:0,t,n,i);lU("Data must be an object, but it was:",u,r);let l=lP(r,u);if(s.merge)a=new tG(u.fieldMask),o=u.fieldTransforms;else if(s.mergeFields){let e=[];for(let r of s.mergeFields){let i=lq(t,r,n);if(!u.contains(i))throw new D(N.INVALID_ARGUMENT,`Field '${i}' is specified in your field mask but missing from your input data.`);l$(e,i)||e.push(i)}a=new tG(e),o=u.fieldTransforms.filter(e=>a.covers(e.field))}else a=null,o=u.fieldTransforms;return new lI(new nx(l),a,o)}class lC extends lp{_toFieldTransform(e){if(2!==e.dataSource)throw 1===e.dataSource?e.yc(`${this._methodName}() can only appear at the top level of your update data`):e.yc(`${this._methodName}() cannot be used with set() unless you pass {merge:true}`);return e.fieldMask.push(e.path),null}isEqual(e){return e instanceof lC}}function lN(e,t,n){return new lE({dataSource:3,targetDoc:t.settings.targetDoc,methodName:e._methodName,arrayElement:n},t.databaseId,t.serializer,t.ignoreUndefinedProperties)}class lD extends lp{_toFieldTransform(e){return new rV(e.path,new rx)}isEqual(e){return e instanceof lD}}class lk extends lp{constructor(e,t){super(e),this.Sc=t}_toFieldTransform(e){let t=lN(this,e,!0),n=new r_(this.Sc.map(e=>lM(e,t)));return new rV(e.path,n)}isEqual(e){return e instanceof lk&&(0,u.vZ)(this.Sc,e.Sc)}}class lA extends lp{constructor(e,t){super(e),this.Sc=t}_toFieldTransform(e){let t=lN(this,e,!0),n=new rN(this.Sc.map(e=>lM(e,t)));return new rV(e.path,n)}isEqual(e){return e instanceof lA&&(0,u.vZ)(this.Sc,e.Sc)}}class lR extends lp{constructor(e,t){super(e),this.bc=t}_toFieldTransform(e){let t=new rk(e.serializer,rb(e.serializer,this.bc));return new rV(e.path,t)}isEqual(e){return e instanceof lR&&this.bc===e.bc}}function lV(e,t,n,r){let i=e.I(1,t,n);lU("Data must be an object, but it was:",i,r);let s=[],a=nx.empty();return tM(r,(e,r)=>{let o=lz(t,e,n);r=(0,u.m9)(r);let l=i.fc(o);if(r instanceof lC)s.push(o);else{let e=lM(r,l);null!=e&&(s.push(o),a.set(o,e))}}),new lT(a,new tG(s),i.fieldTransforms)}function lF(e,t,n,r,i,s){let a=e.I(1,t,n),o=[lq(t,r,n)],l=[i];if(s.length%2!=0)throw new D(N.INVALID_ARGUMENT,`Function ${t}() needs to be called with an even number of arguments that alternate between field names and values.`);for(let e=0;e<s.length;e+=2)o.push(lq(t,s[e])),l.push(s[e+1]);let c=[],h=nx.empty();for(let e=o.length-1;e>=0;--e)if(!l$(c,o[e])){let t=o[e],n=l[e];n=(0,u.m9)(n);let r=a.fc(t);if(n instanceof lC)c.push(t);else{let e=lM(n,r);null!=e&&(c.push(t),h.set(t,e))}}return new lT(h,new tG(c),a.fieldTransforms)}function lO(e,t,n,r=!1){return lM(n,e.I(r?4:3,t))}function lM(e,t){if(lL(e=(0,u.m9)(e)))return lU("Unsupported field value:",t,e),lP(e,t);if(e instanceof lp)return function(e,t){if(!lb(t.dataSource))throw t.yc(`${e._methodName}() can only be used with update() and set()`);if(!t.path)throw t.yc(`${e._methodName}() is not currently supported inside arrays`);let n=e._toFieldTransform(t);n&&t.fieldTransforms.push(n)}(e,t),null;if(void 0===e&&t.ignoreUndefinedProperties)return null;if(t.path&&t.fieldMask.push(t.path),e instanceof Array){if(t.settings.arrayElement&&4!==t.dataSource)throw t.yc("Nested arrays are not supported");return function(e,t){let n=[],r=0;for(let i of e){let e=lM(i,t.gc(r));null==e&&(e={nullValue:"NULL_VALUE"}),n.push(e),r++}return{arrayValue:{values:n}}}(e,t)}return function(e,t){if(null===(e=(0,u.m9)(e)))return{nullValue:"NULL_VALUE"};if("number"==typeof e)return rb(t.serializer,e);if("boolean"==typeof e)return{booleanValue:e};if("string"==typeof e)return{stringValue:e};if(e instanceof Date){let n=eo.fromDate(e);return{timestampValue:ig(t.serializer,n)}}if(e instanceof eo){let n=new eo(e.seconds,1e3*Math.floor(e.nanoseconds/1e3));return{timestampValue:ig(t.serializer,n)}}if(e instanceof ly)return{geoPointValue:{latitude:e.latitude,longitude:e.longitude}};if(e instanceof lf)return{bytesValue:ip(t.serializer,e._byteString)};if(e instanceof uW){let n=t.databaseId,r=e.firestore._databaseId;if(!r.isEqual(n))throw t.yc(`Document reference is for database ${r.projectId}/${r.database} but should be for database ${n.projectId}/${n.database}`);return{referenceValue:iw(e.firestore._databaseId||t.databaseId,e._key.path)}}if(e instanceof lw){var n;return{mapValue:{fields:{[ne]:{stringValue:nr},[ni]:{arrayValue:{values:((n=e)instanceof lw?n.toArray():n).map(e=>{if("number"!=typeof e)throw t.yc("VectorValues must only contain numeric values.");return rI(t.serializer,e)})}}}}}}if(iL(e))return e._toProto(t.serializer);throw t.yc(`Unsupported field value: ${en(e)}`)}(e,t)}function lP(e,t){let n={};return tL(e)?t.path&&t.path.length>0&&t.fieldMask.push(t.path):tM(e,(e,r)=>{let i=lM(r,t.dc(e));null!=i&&(n[e]=i)}),{mapValue:{fields:n}}}function lL(e){return!("object"!=typeof e||null===e||e instanceof Array||e instanceof Date||e instanceof eo||e instanceof ly||e instanceof lf||e instanceof uW||e instanceof lp||e instanceof lw||iL(e))}function lU(e,t,n){if(!lL(n)||!et(n)){let r=en(n);throw"an object"===r?t.yc(e+" a custom object"):t.yc(e+" "+r)}}function lq(e,t,n){if((t=(0,u.m9)(t))instanceof lm)return t._internalPath;if("string"==typeof t)return lz(e,t);throw lK("Field path arguments must be of type string or ",e,!1,void 0,n)}let lB=RegExp("[~\\*/\\[\\]]");function lz(e,t,n){if(t.search(lB)>=0)throw lK(`Invalid field path (${t}). Paths must not contain '~', '*', '/', '[', or ']'`,e,!1,void 0,n);try{return new lm(...t.split("."))._internalPath}catch(r){throw lK(`Invalid field path (${t}). Paths must not be empty, begin with '.', end with '.', or contain '..'`,e,!1,void 0,n)}}function lK(e,t,n,r,i){let s=r&&!r.isEmpty(),a=void 0!==i,o=`Function ${t}() called with invalid data`;n&&(o+=" (via `toFirestore()`)"),o+=". ";let u="";return(s||a)&&(u+=" (found",s&&(u+=` in field ${r}`),a&&(u+=` in document ${i}`),u+=")"),new D(N.INVALID_ARGUMENT,o+e+u)}function l$(e,t){return e.some(e=>e.isEqual(t))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class lG{convertValue(e,t="none"){switch(na(e)){case 0:return null;case 1:return e.booleanValue;case 2:return tY(e.integerValue||e.doubleValue);case 3:return this.convertTimestamp(e.timestampValue);case 4:return this.convertServerTimestamp(e,t);case 5:return e.stringValue;case 6:return this.convertBytes(tX(e.bytesValue));case 7:return this.convertReference(e.referenceValue);case 8:return this.convertGeoPoint(e.geoPointValue);case 9:return this.convertArray(e.arrayValue,t);case 11:return this.convertObject(e.mapValue,t);case 10:return this.convertVectorValue(e.mapValue);default:throw S(62114,{value:e})}}convertObject(e,t){return this.convertObjectMap(e.fields,t)}convertObjectMap(e,t="none"){let n={};return tM(e,(e,r)=>{n[e]=this.convertValue(r,t)}),n}convertVectorValue(e){return new lw(e.fields?.[ni].arrayValue?.values?.map(e=>tY(e.doubleValue)))}convertGeoPoint(e){return new ly(tY(e.latitude),tY(e.longitude))}convertArray(e,t){return(e.values||[]).map(e=>this.convertValue(e,t))}convertServerTimestamp(e,t){switch(t){case"previous":let n=t5(e);return null==n?null:this.convertValue(n,t);case"estimate":return this.convertTimestamp(t3(e));default:return null}}convertTimestamp(e){let t=tW(e);return new eo(t.seconds,t.nanos)}convertDocumentKey(e,t){let n=Q.fromString(e);_(iP(n),9688,{name:e});let r=new t9(n.get(1),n.get(3)),i=new W(n.popFirst(5));return r.isEqual(t)||T(`Document ${i} contains a document reference within a different database (${r.projectId}/${r.database}) which is not supported. It will be treated as a reference in the current database (${t.projectId}/${t.database}) instead.`),i}}/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class lj extends lG{constructor(e){super(),this.firestore=e}convertBytes(e){return new lf(e)}convertReference(e){let t=this.convertDocumentKey(e,this.firestore._databaseId);return new uW(this.firestore,null,t)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function lQ(){return new lC("deleteField")}function lH(){return new lD("serverTimestamp")}function lJ(...e){return new lk("arrayUnion",e)}function lW(...e){return new lA("arrayRemove",e)}function lY(e){return new lR("increment",e)}function lX(e){return new lw(e)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function lZ(e){let t=lt(er(e.firestore,u9)),n=t._onlineComponents?.datastore.serializer;return void 0===n?null:iR(n,n6(e._query)).ft}function l0(e,t){let n=tP(t,(e,t)=>new rY(t,e.aggregateType,e._internalFieldPath)),r=lt(er(e.firestore,u9)),i=r._onlineComponents?.datastore.serializer;return void 0===i?null:iV(i,n8(e._query),n,!0).request}}}]);