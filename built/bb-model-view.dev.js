/**
 * @license
 * Lo-Dash 2.4.1 (Custom Build) <http://lodash.com/>
 * Build: `lodash -o ./dist/lodash.compat.js`
 * Copyright 2012-2013 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.5.2 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2013 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <http://lodash.com/license>
 */

//     jquery-selector-data-prefix
//     (c) simonfan
//     jquery-selector-data-prefix is licensed under the MIT terms.

(function(){function n(n,e,r){for(var t=(r||0)-1,o=n?n.length:0;++t<o;)if(n[t]===e)return t;return-1}function e(e,r){var t=typeof r;if(e=e.cache,"boolean"==t||null==r)return e[r]?0:-1;"number"!=t&&"string"!=t&&(t="object");var o="number"==t?r:m+r;return e=(e=e[t])&&e[o],"object"==t?e&&n(e,r)>-1?0:-1:e?0:-1}function r(n){var e=this.cache,r=typeof n;if("boolean"==r||null==n)e[n]=!0;else{"number"!=r&&"string"!=r&&(r="object");var t="number"==r?n:m+n,o=e[r]||(e[r]={});"object"==r?(o[t]||(o[t]=[])).push(n):o[t]=!0}}function t(n){return n.charCodeAt(0)}function o(n,e){for(var r=n.criteria,t=e.criteria,o=-1,u=r.length;++o<u;){var a=r[o],i=t[o];if(a!==i){if(a>i||"undefined"==typeof a)return 1;if(i>a||"undefined"==typeof i)return-1}}return n.index-e.index}function u(n){var e=-1,t=n.length,o=n[0],u=n[t/2|0],a=n[t-1];if(o&&"object"==typeof o&&u&&"object"==typeof u&&a&&"object"==typeof a)return!1;var i=l();i["false"]=i["null"]=i["true"]=i.undefined=!1;var c=l();for(c.array=n,c.cache=i,c.push=r;++e<t;)c.push(n[e]);return c}function a(n){return"\\"+Y[n]}function i(){return v.pop()||[]}function l(){return y.pop()||{array:null,cache:null,criteria:null,"false":!1,index:0,"null":!1,number:null,object:null,push:null,string:null,"true":!1,undefined:!1,value:null}}function c(n){return"function"!=typeof n.toString&&"string"==typeof(n+"")}function f(n){n.length=0,v.length<x&&v.push(n)}function s(n){var e=n.cache;e&&s(e),n.array=n.cache=n.criteria=n.object=n.number=n.string=n.value=null,y.length<x&&y.push(n)}function p(n,e,r){e||(e=0),"undefined"==typeof r&&(r=n?n.length:0);for(var t=-1,o=r-e||0,u=Array(0>o?0:o);++t<o;)u[t]=n[e+t];return u}function g(r){function v(n){return n&&"object"==typeof n&&!fo(n)&&zt.call(n,"__wrapped__")?n:new y(n)}function y(n,e){this.__chain__=!!e,this.__wrapped__=n}function x(n){function e(){if(t){var n=p(t);Kt.apply(n,arguments)}if(this instanceof e){var u=ee(r.prototype),a=r.apply(u,n||arguments);return De(a)?a:u}return r.apply(o,n||arguments)}var r=n[0],t=n[2],o=n[4];return co(e,n),e}function Y(n,e,r,t,o){if(r){var u=r(n);if("undefined"!=typeof u)return u}var a=De(n);if(!a)return n;var l=$t.call(n);if(!Z[l]||!io.nodeClass&&c(n))return n;var s=uo[l];switch(l){case B:case H:return new s(+n);case K:case V:return new s(n);case M:return u=s(n.source,O.exec(n)),u.lastIndex=n.lastIndex,u}var g=fo(n);if(e){var h=!t;t||(t=i()),o||(o=i());for(var v=t.length;v--;)if(t[v]==n)return o[v];u=g?s(n.length):{}}else u=g?p(n):wo({},n);return g&&(zt.call(n,"index")&&(u.index=n.index),zt.call(n,"input")&&(u.input=n.input)),e?(t.push(n),o.push(u),(g?xo:Co)(n,function(n,a){u[a]=Y(n,e,r,t,o)}),h&&(f(t),f(o)),u):u}function ee(n){return De(n)?Jt(n):{}}function re(n,e,r){if("function"!=typeof n)return ot;if("undefined"==typeof e||!("prototype"in n))return n;var t=n.__bindData__;if("undefined"==typeof t&&(io.funcNames&&(t=!n.name),t=t||!io.funcDecomp,!t)){var o=Ht.call(n);io.funcNames||(t=!S.test(o)),t||(t=N.test(o),co(n,t))}if(t===!1||t!==!0&&1&t[1])return n;switch(r){case 1:return function(r){return n.call(e,r)};case 2:return function(r,t){return n.call(e,r,t)};case 3:return function(r,t,o){return n.call(e,r,t,o)};case 4:return function(r,t,o,u){return n.call(e,r,t,o,u)}}return Hr(n,e)}function te(n){function e(){var n=l?a:this;if(o){var h=p(o);Kt.apply(h,arguments)}if((u||f)&&(h||(h=p(arguments)),u&&Kt.apply(h,u),f&&h.length<i))return t|=16,te([r,s?t:-4&t,h,null,a,i]);if(h||(h=arguments),c&&(r=n[g]),this instanceof e){n=ee(r.prototype);var v=r.apply(n,h);return De(v)?v:n}return r.apply(n,h)}var r=n[0],t=n[1],o=n[2],u=n[3],a=n[4],i=n[5],l=1&t,c=2&t,f=4&t,s=8&t,g=r;return co(e,n),e}function oe(r,t){var o=-1,a=ve(),i=r?r.length:0,l=i>=_&&a===n,c=[];if(l){var f=u(t);f?(a=e,t=f):l=!1}for(;++o<i;){var p=r[o];a(t,p)<0&&c.push(p)}return l&&s(t),c}function ae(n,e,r,t){for(var o=(t||0)-1,u=n?n.length:0,a=[];++o<u;){var i=n[o];if(i&&"object"==typeof i&&"number"==typeof i.length&&(fo(i)||me(i))){e||(i=ae(i,e,r));var l=-1,c=i.length,f=a.length;for(a.length+=c;++l<c;)a[f++]=i[l]}else r||a.push(i)}return a}function ie(n,e,r,t,o,u){if(r){var a=r(n,e);if("undefined"!=typeof a)return!!a}if(n===e)return 0!==n||1/n==1/e;var l=typeof n,s=typeof e;if(!(n!==n||n&&X[l]||e&&X[s]))return!1;if(null==n||null==e)return n===e;var p=$t.call(n),g=$t.call(e);if(p==q&&(p=U),g==q&&(g=U),p!=g)return!1;switch(p){case B:case H:return+n==+e;case K:return n!=+n?e!=+e:0==n?1/n==1/e:n==+e;case M:case V:return n==St(e)}var h=p==F;if(!h){var v=zt.call(n,"__wrapped__"),y=zt.call(e,"__wrapped__");if(v||y)return ie(v?n.__wrapped__:n,y?e.__wrapped__:e,r,t,o,u);if(p!=U||!io.nodeClass&&(c(n)||c(e)))return!1;var b=!io.argsObject&&me(n)?Et:n.constructor,d=!io.argsObject&&me(e)?Et:e.constructor;if(b!=d&&!($e(b)&&b instanceof b&&$e(d)&&d instanceof d)&&"constructor"in n&&"constructor"in e)return!1}var m=!o;o||(o=i()),u||(u=i());for(var _=o.length;_--;)if(o[_]==n)return u[_]==e;var x=0;if(a=!0,o.push(n),u.push(e),h){if(_=n.length,x=e.length,a=x==_,a||t)for(;x--;){var w=_,j=e[x];if(t)for(;w--&&!(a=ie(n[w],j,r,t,o,u)););else if(!(a=ie(n[x],j,r,t,o,u)))break}}else ko(e,function(e,i,l){return zt.call(l,i)?(x++,a=zt.call(n,i)&&ie(n[i],e,r,t,o,u)):void 0}),a&&!t&&ko(n,function(n,e,r){return zt.call(r,e)?a=--x>-1:void 0});return o.pop(),u.pop(),m&&(f(o),f(u)),a}function le(n,e,r,t,o){(fo(e)?tr:Co)(e,function(e,u){var a,i,l=e,c=n[u];if(e&&((i=fo(e))||Po(e))){for(var f=t.length;f--;)if(a=t[f]==e){c=o[f];break}if(!a){var s;r&&(l=r(c,e),(s="undefined"!=typeof l)&&(c=l)),s||(c=i?fo(c)?c:[]:Po(c)?c:{}),t.push(e),o.push(c),s||le(c,e,r,t,o)}}else r&&(l=r(c,e),"undefined"==typeof l&&(l=e)),"undefined"!=typeof l&&(c=l);n[u]=c})}function ce(n,e){return n+Bt(oo()*(e-n+1))}function fe(r,t,o){var a=-1,l=ve(),c=r?r.length:0,p=[],g=!t&&c>=_&&l===n,h=o||g?i():p;if(g){var v=u(h);l=e,h=v}for(;++a<c;){var y=r[a],b=o?o(y,a,r):y;(t?!a||h[h.length-1]!==b:l(h,b)<0)&&((o||g)&&h.push(b),p.push(y))}return g?(f(h.array),s(h)):o&&f(h),p}function se(n){return function(e,r,t){var o={};if(r=v.createCallback(r,t,3),fo(e))for(var u=-1,a=e.length;++u<a;){var i=e[u];n(o,i,r(i,u,e),e)}else xo(e,function(e,t,u){n(o,e,r(e,t,u),u)});return o}}function pe(n,e,r,t,o,u){var a=1&e,i=2&e,l=4&e,c=16&e,f=32&e;if(!i&&!$e(n))throw new At;c&&!r.length&&(e&=-17,c=r=!1),f&&!t.length&&(e&=-33,f=t=!1);var s=n&&n.__bindData__;if(s&&s!==!0)return s=p(s),s[2]&&(s[2]=p(s[2])),s[3]&&(s[3]=p(s[3])),!a||1&s[1]||(s[4]=o),!a&&1&s[1]&&(e|=8),!l||4&s[1]||(s[5]=u),c&&Kt.apply(s[2]||(s[2]=[]),r),f&&Zt.apply(s[3]||(s[3]=[]),t),s[1]|=e,pe.apply(null,s);var g=1==e||17===e?x:te;return g([n,e,r,t,o,u])}function ge(){Q.shadowedProps=$,Q.array=Q.bottom=Q.loop=Q.top="",Q.init="iterable",Q.useHas=!0;for(var n,e=0;n=arguments[e];e++)for(var r in n)Q[r]=n[r];var t=Q.args;Q.firstArg=/^[^,]+/.exec(t)[0];var o=kt("baseCreateCallback, errorClass, errorProto, hasOwnProperty, indicatorObject, isArguments, isArray, isString, keys, objectProto, objectTypes, nonEnumProps, stringClass, stringProto, toString","return function("+t+") {\n"+lo(Q)+"\n}");return o(re,W,Lt,zt,d,me,fo,We,Q.keys,Nt,X,ao,V,Rt,$t)}function he(n){return yo[n]}function ve(){var e=(e=v.indexOf)===kr?n:e;return e}function ye(n){return"function"==typeof n&&Dt.test(n)}function be(n){var e,r;return!n||$t.call(n)!=U||(e=n.constructor,$e(e)&&!(e instanceof e))||!io.argsClass&&me(n)||!io.nodeClass&&c(n)?!1:io.ownLast?(ko(n,function(n,e,t){return r=zt.call(t,e),!1}),r!==!1):(ko(n,function(n,e){r=e}),"undefined"==typeof r||zt.call(n,r))}function de(n){return bo[n]}function me(n){return n&&"object"==typeof n&&"number"==typeof n.length&&$t.call(n)==q||!1}function _e(n,e,r,t){return"boolean"!=typeof e&&null!=e&&(t=r,r=e,e=!1),Y(n,e,"function"==typeof r&&re(r,t,1))}function xe(n,e,r){return Y(n,!0,"function"==typeof e&&re(e,r,1))}function we(n,e){var r=ee(n);return e?wo(r,e):r}function je(n,e,r){var t;return e=v.createCallback(e,r,3),Co(n,function(n,r,o){return e(n,r,o)?(t=r,!1):void 0}),t}function ke(n,e,r){var t;return e=v.createCallback(e,r,3),Pe(n,function(n,r,o){return e(n,r,o)?(t=r,!1):void 0}),t}function Ce(n,e,r){var t=[];ko(n,function(n,e){t.push(e,n)});var o=t.length;for(e=re(e,r,3);o--&&e(t[o--],t[o],n)!==!1;);return n}function Pe(n,e,r){var t=po(n),o=t.length;for(e=re(e,r,3);o--;){var u=t[o];if(e(n[u],u,n)===!1)break}return n}function Ee(n){var e=[];return ko(n,function(n,r){$e(n)&&e.push(r)}),e.sort()}function Oe(n,e){return n?zt.call(n,e):!1}function Se(n){for(var e=-1,r=po(n),t=r.length,o={};++e<t;){var u=r[e];o[n[u]]=u}return o}function Ae(n){return n===!0||n===!1||n&&"object"==typeof n&&$t.call(n)==B||!1}function Ie(n){return n&&"object"==typeof n&&$t.call(n)==H||!1}function Le(n){return n&&1===n.nodeType||!1}function Ne(n){var e=!0;if(!n)return e;var r=$t.call(n),t=n.length;return r==F||r==V||(io.argsClass?r==q:me(n))||r==U&&"number"==typeof t&&$e(n.splice)?!t:(Co(n,function(){return e=!1}),e)}function Re(n,e,r,t){return ie(n,e,"function"==typeof r&&re(r,t,2))}function Te(n){return Xt(n)&&!Yt(parseFloat(n))}function $e(n){return"function"==typeof n}function De(n){return!(!n||!X[typeof n])}function qe(n){return Be(n)&&n!=+n}function Fe(n){return null===n}function Be(n){return"number"==typeof n||n&&"object"==typeof n&&$t.call(n)==K||!1}function He(n){return n&&X[typeof n]&&$t.call(n)==M||!1}function We(n){return"string"==typeof n||n&&"object"==typeof n&&$t.call(n)==V||!1}function ze(n){return"undefined"==typeof n}function Ke(n,e,r){var t={};return e=v.createCallback(e,r,3),Co(n,function(n,r,o){t[r]=e(n,r,o)}),t}function Ue(n){var e=arguments,r=2;if(!De(n))return n;if("number"!=typeof e[2]&&(r=e.length),r>3&&"function"==typeof e[r-2])var t=re(e[--r-1],e[r--],2);else r>2&&"function"==typeof e[r-1]&&(t=e[--r]);for(var o=p(arguments,1,r),u=-1,a=i(),l=i();++u<r;)le(n,o[u],t,a,l);return f(a),f(l),n}function Me(n,e,r){var t={};if("function"!=typeof e){var o=[];ko(n,function(n,e){o.push(e)}),o=oe(o,ae(arguments,!0,!1,1));for(var u=-1,a=o.length;++u<a;){var i=o[u];t[i]=n[i]}}else e=v.createCallback(e,r,3),ko(n,function(n,r,o){e(n,r,o)||(t[r]=n)});return t}function Ve(n){for(var e=-1,r=po(n),t=r.length,o=_t(t);++e<t;){var u=r[e];o[e]=[u,n[u]]}return o}function Ze(n,e,r){var t={};if("function"!=typeof e)for(var o=-1,u=ae(arguments,!0,!1,1),a=De(n)?u.length:0;++o<a;){var i=u[o];i in n&&(t[i]=n[i])}else e=v.createCallback(e,r,3),ko(n,function(n,r,o){e(n,r,o)&&(t[r]=n)});return t}function Ge(n,e,r,t){var o=fo(n);if(null==r)if(o)r=[];else{var u=n&&n.constructor,a=u&&u.prototype;r=ee(a)}return e&&(e=v.createCallback(e,t,4),(o?xo:Co)(n,function(n,t,o){return e(r,n,t,o)})),r}function Je(n){for(var e=-1,r=po(n),t=r.length,o=_t(t);++e<t;)o[e]=n[r[e]];return o}function Qe(n){var e=arguments,r=-1,t=ae(e,!0,!1,1),o=e[2]&&e[2][e[1]]===n?1:t.length,u=_t(o);for(io.unindexedChars&&We(n)&&(n=n.split(""));++r<o;)u[r]=n[t[r]];return u}function Xe(n,e,r){var t=-1,o=ve(),u=n?n.length:0,a=!1;return r=(0>r?eo(0,u+r):r)||0,fo(n)?a=o(n,e,r)>-1:"number"==typeof u?a=(We(n)?n.indexOf(e,r):o(n,e,r))>-1:xo(n,function(n){return++t>=r?!(a=n===e):void 0}),a}function Ye(n,e,r){var t=!0;if(e=v.createCallback(e,r,3),fo(n))for(var o=-1,u=n.length;++o<u&&(t=!!e(n[o],o,n)););else xo(n,function(n,r,o){return t=!!e(n,r,o)});return t}function nr(n,e,r){var t=[];if(e=v.createCallback(e,r,3),fo(n))for(var o=-1,u=n.length;++o<u;){var a=n[o];e(a,o,n)&&t.push(a)}else xo(n,function(n,r,o){e(n,r,o)&&t.push(n)});return t}function er(n,e,r){if(e=v.createCallback(e,r,3),!fo(n)){var t;return xo(n,function(n,r,o){return e(n,r,o)?(t=n,!1):void 0}),t}for(var o=-1,u=n.length;++o<u;){var a=n[o];if(e(a,o,n))return a}}function rr(n,e,r){var t;return e=v.createCallback(e,r,3),or(n,function(n,r,o){return e(n,r,o)?(t=n,!1):void 0}),t}function tr(n,e,r){if(e&&"undefined"==typeof r&&fo(n))for(var t=-1,o=n.length;++t<o&&e(n[t],t,n)!==!1;);else xo(n,e,r);return n}function or(n,e,r){var t=n,o=n?n.length:0;if(e=e&&"undefined"==typeof r?e:re(e,r,3),fo(n))for(;o--&&e(n[o],o,n)!==!1;);else{if("number"!=typeof o){var u=po(n);o=u.length}else io.unindexedChars&&We(n)&&(t=n.split(""));xo(n,function(n,r,a){return r=u?u[--o]:--o,e(t[r],r,a)})}return n}function ur(n,e){var r=p(arguments,2),t=-1,o="function"==typeof e,u=n?n.length:0,a=_t("number"==typeof u?u:0);return tr(n,function(n){a[++t]=(o?e:n[e]).apply(n,r)}),a}function ar(n,e,r){var t=-1,o=n?n.length:0,u=_t("number"==typeof o?o:0);if(e=v.createCallback(e,r,3),fo(n))for(;++t<o;)u[t]=e(n[t],t,n);else xo(n,function(n,r,o){u[++t]=e(n,r,o)});return u}function ir(n,e,r){var o=-1/0,u=o;if("function"!=typeof e&&r&&r[e]===n&&(e=null),null==e&&fo(n))for(var a=-1,i=n.length;++a<i;){var l=n[a];l>u&&(u=l)}else e=null==e&&We(n)?t:v.createCallback(e,r,3),xo(n,function(n,r,t){var a=e(n,r,t);a>o&&(o=a,u=n)});return u}function lr(n,e,r){var o=1/0,u=o;if("function"!=typeof e&&r&&r[e]===n&&(e=null),null==e&&fo(n))for(var a=-1,i=n.length;++a<i;){var l=n[a];u>l&&(u=l)}else e=null==e&&We(n)?t:v.createCallback(e,r,3),xo(n,function(n,r,t){var a=e(n,r,t);o>a&&(o=a,u=n)});return u}function cr(n,e,r,t){var o=arguments.length<3;if(e=v.createCallback(e,t,4),fo(n)){var u=-1,a=n.length;for(o&&(r=n[++u]);++u<a;)r=e(r,n[u],u,n)}else xo(n,function(n,t,u){r=o?(o=!1,n):e(r,n,t,u)});return r}function fr(n,e,r,t){var o=arguments.length<3;return e=v.createCallback(e,t,4),or(n,function(n,t,u){r=o?(o=!1,n):e(r,n,t,u)}),r}function sr(n,e,r){return e=v.createCallback(e,r,3),nr(n,function(n,r,t){return!e(n,r,t)})}function pr(n,e,r){if(n&&"number"!=typeof n.length?n=Je(n):io.unindexedChars&&We(n)&&(n=n.split("")),null==e||r)return n?n[ce(0,n.length-1)]:h;var t=gr(n);return t.length=ro(eo(0,e),t.length),t}function gr(n){var e=-1,r=n?n.length:0,t=_t("number"==typeof r?r:0);return tr(n,function(n){var r=ce(0,++e);t[e]=t[r],t[r]=n}),t}function hr(n){var e=n?n.length:0;return"number"==typeof e?e:po(n).length}function vr(n,e,r){var t;if(e=v.createCallback(e,r,3),fo(n))for(var o=-1,u=n.length;++o<u&&!(t=e(n[o],o,n)););else xo(n,function(n,r,o){return!(t=e(n,r,o))});return!!t}function yr(n,e,r){var t=-1,u=fo(e),a=n?n.length:0,c=_t("number"==typeof a?a:0);for(u||(e=v.createCallback(e,r,3)),tr(n,function(n,r,o){var a=c[++t]=l();u?a.criteria=ar(e,function(e){return n[e]}):(a.criteria=i())[0]=e(n,r,o),a.index=t,a.value=n}),a=c.length,c.sort(o);a--;){var p=c[a];c[a]=p.value,u||f(p.criteria),s(p)}return c}function br(n){return n&&"number"==typeof n.length?io.unindexedChars&&We(n)?n.split(""):p(n):Je(n)}function dr(n){for(var e=-1,r=n?n.length:0,t=[];++e<r;){var o=n[e];o&&t.push(o)}return t}function mr(n){return oe(n,ae(arguments,!0,!0,1))}function _r(n,e,r){var t=-1,o=n?n.length:0;for(e=v.createCallback(e,r,3);++t<o;)if(e(n[t],t,n))return t;return-1}function xr(n,e,r){var t=n?n.length:0;for(e=v.createCallback(e,r,3);t--;)if(e(n[t],t,n))return t;return-1}function wr(n,e,r){var t=0,o=n?n.length:0;if("number"!=typeof e&&null!=e){var u=-1;for(e=v.createCallback(e,r,3);++u<o&&e(n[u],u,n);)t++}else if(t=e,null==t||r)return n?n[0]:h;return p(n,0,ro(eo(0,t),o))}function jr(n,e,r,t){return"boolean"!=typeof e&&null!=e&&(t=r,r="function"!=typeof e&&t&&t[e]===n?null:e,e=!1),null!=r&&(n=ar(n,r,t)),ae(n,e)}function kr(e,r,t){if("number"==typeof t){var o=e?e.length:0;t=0>t?eo(0,o+t):t||0}else if(t){var u=Nr(e,r);return e[u]===r?u:-1}return n(e,r,t)}function Cr(n,e,r){var t=0,o=n?n.length:0;if("number"!=typeof e&&null!=e){var u=o;for(e=v.createCallback(e,r,3);u--&&e(n[u],u,n);)t++}else t=null==e||r?1:e||t;return p(n,0,ro(eo(0,o-t),o))}function Pr(){for(var r=[],t=-1,o=arguments.length,a=i(),l=ve(),c=l===n,p=i();++t<o;){var g=arguments[t];(fo(g)||me(g))&&(r.push(g),a.push(c&&g.length>=_&&u(t?r[t]:p)))}var h=r[0],v=-1,y=h?h.length:0,b=[];n:for(;++v<y;){var d=a[0];if(g=h[v],(d?e(d,g):l(p,g))<0){for(t=o,(d||p).push(g);--t;)if(d=a[t],(d?e(d,g):l(r[t],g))<0)continue n;b.push(g)}}for(;o--;)d=a[o],d&&s(d);return f(a),f(p),b}function Er(n,e,r){var t=0,o=n?n.length:0;if("number"!=typeof e&&null!=e){var u=o;for(e=v.createCallback(e,r,3);u--&&e(n[u],u,n);)t++}else if(t=e,null==t||r)return n?n[o-1]:h;return p(n,eo(0,o-t))}function Or(n,e,r){var t=n?n.length:0;for("number"==typeof r&&(t=(0>r?eo(0,t+r):ro(r,t-1))+1);t--;)if(n[t]===e)return t;return-1}function Sr(n){for(var e=arguments,r=0,t=e.length,o=n?n.length:0;++r<t;)for(var u=-1,a=e[r];++u<o;)n[u]===a&&(Vt.call(n,u--,1),o--);return n}function Ar(n,e,r){n=+n||0,r="number"==typeof r?r:+r||1,null==e&&(e=n,n=0);for(var t=-1,o=eo(0,qt((e-n)/(r||1))),u=_t(o);++t<o;)u[t]=n,n+=r;return u}function Ir(n,e,r){var t=-1,o=n?n.length:0,u=[];for(e=v.createCallback(e,r,3);++t<o;){var a=n[t];e(a,t,n)&&(u.push(a),Vt.call(n,t--,1),o--)}return u}function Lr(n,e,r){if("number"!=typeof e&&null!=e){var t=0,o=-1,u=n?n.length:0;for(e=v.createCallback(e,r,3);++o<u&&e(n[o],o,n);)t++}else t=null==e||r?1:eo(0,e);return p(n,t)}function Nr(n,e,r,t){var o=0,u=n?n.length:o;for(r=r?v.createCallback(r,t,1):ot,e=r(e);u>o;){var a=o+u>>>1;r(n[a])<e?o=a+1:u=a}return o}function Rr(){return fe(ae(arguments,!0,!0))}function Tr(n,e,r,t){return"boolean"!=typeof e&&null!=e&&(t=r,r="function"!=typeof e&&t&&t[e]===n?null:e,e=!1),null!=r&&(r=v.createCallback(r,t,3)),fe(n,e,r)}function $r(n){return oe(n,p(arguments,1))}function Dr(){for(var n=-1,e=arguments.length;++n<e;){var r=arguments[n];if(fo(r)||me(r))var t=t?fe(oe(t,r).concat(oe(r,t))):r}return t||[]}function qr(){for(var n=arguments.length>1?arguments:arguments[0],e=-1,r=n?ir(Ao(n,"length")):0,t=_t(0>r?0:r);++e<r;)t[e]=Ao(n,e);return t}function Fr(n,e){var r=-1,t=n?n.length:0,o={};for(e||!t||fo(n[0])||(e=[]);++r<t;){var u=n[r];e?o[u]=e[r]:u&&(o[u[0]]=u[1])}return o}function Br(n,e){if(!$e(e))throw new At;return function(){return--n<1?e.apply(this,arguments):void 0}}function Hr(n,e){return arguments.length>2?pe(n,17,p(arguments,2),null,e):pe(n,1,null,null,e)}function Wr(n){for(var e=arguments.length>1?ae(arguments,!0,!1,1):Ee(n),r=-1,t=e.length;++r<t;){var o=e[r];n[o]=pe(n[o],1,null,null,n)}return n}function zr(n,e){return arguments.length>2?pe(e,19,p(arguments,2),null,n):pe(e,3,null,null,n)}function Kr(){for(var n=arguments,e=n.length;e--;)if(!$e(n[e]))throw new At;return function(){for(var e=arguments,r=n.length;r--;)e=[n[r].apply(this,e)];return e[0]}}function Ur(n,e){return e="number"==typeof e?e:+e||n.length,pe(n,4,null,null,null,e)}function Mr(n,e,r){var t,o,u,a,i,l,c,f=0,s=!1,p=!0;if(!$e(n))throw new At;if(e=eo(0,e)||0,r===!0){var g=!0;p=!1}else De(r)&&(g=r.leading,s="maxWait"in r&&(eo(e,r.maxWait)||0),p="trailing"in r?r.trailing:p);var v=function(){var r=e-(Lo()-a);if(0>=r){o&&Ft(o);var s=c;o=l=c=h,s&&(f=Lo(),u=n.apply(i,t),l||o||(t=i=null))}else l=Mt(v,r)},y=function(){l&&Ft(l),o=l=c=h,(p||s!==e)&&(f=Lo(),u=n.apply(i,t),l||o||(t=i=null))};return function(){if(t=arguments,a=Lo(),i=this,c=p&&(l||!g),s===!1)var r=g&&!l;else{o||g||(f=a);var h=s-(a-f),b=0>=h;b?(o&&(o=Ft(o)),f=a,u=n.apply(i,t)):o||(o=Mt(y,h))}return b&&l?l=Ft(l):l||e===s||(l=Mt(v,e)),r&&(b=!0,u=n.apply(i,t)),!b||l||o||(t=i=null),u}}function Vr(n){if(!$e(n))throw new At;var e=p(arguments,1);return Mt(function(){n.apply(h,e)},1)}function Zr(n,e){if(!$e(n))throw new At;var r=p(arguments,2);return Mt(function(){n.apply(h,r)},e)}function Gr(n,e){if(!$e(n))throw new At;var r=function(){var t=r.cache,o=e?e.apply(this,arguments):m+arguments[0];return zt.call(t,o)?t[o]:t[o]=n.apply(this,arguments)};return r.cache={},r}function Jr(n){var e,r;if(!$e(n))throw new At;return function(){return e?r:(e=!0,r=n.apply(this,arguments),n=null,r)}}function Qr(n){return pe(n,16,p(arguments,1))}function Xr(n){return pe(n,32,null,p(arguments,1))}function Yr(n,e,r){var t=!0,o=!0;if(!$e(n))throw new At;return r===!1?t=!1:De(r)&&(t="leading"in r?r.leading:t,o="trailing"in r?r.trailing:o),G.leading=t,G.maxWait=e,G.trailing=o,Mr(n,e,G)}function nt(n,e){return pe(e,16,[n])}function et(n){return function(){return n}}function rt(n,e,r){var t=typeof n;if(null==n||"function"==t)return re(n,e,r);if("object"!=t)return lt(n);var o=po(n),u=o[0],a=n[u];return 1!=o.length||a!==a||De(a)?function(e){for(var r=o.length,t=!1;r--&&(t=ie(e[o[r]],n[o[r]],null,!0)););return t}:function(n){var e=n[u];return a===e&&(0!==a||1/a==1/e)}}function tt(n){return null==n?"":St(n).replace(_o,he)}function ot(n){return n}function ut(n,e,r){var t=!0,o=e&&Ee(e);e&&(r||o.length)||(null==r&&(r=e),u=y,e=n,n=v,o=Ee(e)),r===!1?t=!1:De(r)&&"chain"in r&&(t=r.chain);var u=n,a=$e(u);tr(o,function(r){var o=n[r]=e[r];a&&(u.prototype[r]=function(){var e=this.__chain__,r=this.__wrapped__,a=[r];Kt.apply(a,arguments);var i=o.apply(n,a);if(t||e){if(r===i&&De(i))return this;i=new u(i),i.__chain__=e}return i})})}function at(){return r._=Tt,this}function it(){}function lt(n){return function(e){return e[n]}}function ct(n,e,r){var t=null==n,o=null==e;if(null==r&&("boolean"==typeof n&&o?(r=n,n=1):o||"boolean"!=typeof e||(r=e,o=!0)),t&&o&&(e=1),n=+n||0,o?(e=n,n=0):e=+e||0,r||n%1||e%1){var u=oo();return ro(n+u*(e-n+parseFloat("1e-"+((u+"").length-1))),e)}return ce(n,e)}function ft(n,e){if(n){var r=n[e];return $e(r)?n[e]():r}}function st(n,e,r){var t=v.templateSettings;n=St(n||""),r=jo({},r,t);var o,u=jo({},r.imports,t.imports),i=po(u),l=Je(u),c=0,f=r.interpolate||L,s="__p += '",p=Ot((r.escape||L).source+"|"+f.source+"|"+(f===A?E:L).source+"|"+(r.evaluate||L).source+"|$","g");n.replace(p,function(e,r,t,u,i,l){return t||(t=u),s+=n.slice(c,l).replace(R,a),r&&(s+="' +\n__e("+r+") +\n'"),i&&(o=!0,s+="';\n"+i+";\n__p += '"),t&&(s+="' +\n((__t = ("+t+")) == null ? '' : __t) +\n'"),c=l+e.length,e}),s+="';\n";var g=r.variable,y=g;y||(g="obj",s="with ("+g+") {\n"+s+"\n}\n"),s=(o?s.replace(j,""):s).replace(C,"$1").replace(P,"$1;"),s="function("+g+") {\n"+(y?"":g+" || ("+g+" = {});\n")+"var __t, __p = '', __e = _.escape"+(o?", __j = Array.prototype.join;\nfunction print() { __p += __j.call(arguments, '') }\n":";\n")+s+"return __p\n}";var b="\n/*\n//# sourceURL="+(r.sourceURL||"/lodash/template/source["+D++ +"]")+"\n*/";try{var d=kt(i,"return "+s+b).apply(h,l)}catch(m){throw m.source=s,m}return e?d(e):(d.source=s,d)}function pt(n,e,r){n=(n=+n)>-1?n:0;var t=-1,o=_t(n);for(e=re(e,r,1);++t<n;)o[t]=e(t);return o}function gt(n){return null==n?"":St(n).replace(mo,de)}function ht(n){var e=++b;return St(null==n?"":n)+e}function vt(n){return n=new y(n),n.__chain__=!0,n}function yt(n,e){return e(n),n}function bt(){return this.__chain__=!0,this}function dt(){return St(this.__wrapped__)}function mt(){return this.__wrapped__}r=r?ue.defaults(ne.Object(),r,ue.pick(ne,T)):ne;var _t=r.Array,xt=r.Boolean,wt=r.Date,jt=r.Error,kt=r.Function,Ct=r.Math,Pt=r.Number,Et=r.Object,Ot=r.RegExp,St=r.String,At=r.TypeError,It=[],Lt=jt.prototype,Nt=Et.prototype,Rt=St.prototype,Tt=r._,$t=Nt.toString,Dt=Ot("^"+St($t).replace(/[.*+?^${}()|[\]\\]/g,"\\$&").replace(/toString| for [^\]]+/g,".*?")+"$"),qt=Ct.ceil,Ft=r.clearTimeout,Bt=Ct.floor,Ht=kt.prototype.toString,Wt=ye(Wt=Et.getPrototypeOf)&&Wt,zt=Nt.hasOwnProperty,Kt=It.push,Ut=Nt.propertyIsEnumerable,Mt=r.setTimeout,Vt=It.splice,Zt=It.unshift,Gt=function(){try{var n={},e=ye(e=Et.defineProperty)&&e,r=e(n,n,n)&&e}catch(t){}return r}(),Jt=ye(Jt=Et.create)&&Jt,Qt=ye(Qt=_t.isArray)&&Qt,Xt=r.isFinite,Yt=r.isNaN,no=ye(no=Et.keys)&&no,eo=Ct.max,ro=Ct.min,to=r.parseInt,oo=Ct.random,uo={};uo[F]=_t,uo[B]=xt,uo[H]=wt,uo[z]=kt,uo[U]=Et,uo[K]=Pt,uo[M]=Ot,uo[V]=St;var ao={};ao[F]=ao[H]=ao[K]={constructor:!0,toLocaleString:!0,toString:!0,valueOf:!0},ao[B]=ao[V]={constructor:!0,toString:!0,valueOf:!0},ao[W]=ao[z]=ao[M]={constructor:!0,toString:!0},ao[U]={constructor:!0},function(){for(var n=$.length;n--;){var e=$[n];for(var r in ao)zt.call(ao,r)&&!zt.call(ao[r],e)&&(ao[r][e]=!1)}}(),y.prototype=v.prototype;var io=v.support={};!function(){var n=function(){this.x=1},e={0:1,length:1},t=[];n.prototype={valueOf:1,y:1};for(var o in new n)t.push(o);for(o in arguments);io.argsClass=$t.call(arguments)==q,io.argsObject=arguments.constructor==Et&&!(arguments instanceof _t),io.enumErrorProps=Ut.call(Lt,"message")||Ut.call(Lt,"name"),io.enumPrototypes=Ut.call(n,"prototype"),io.funcDecomp=!ye(r.WinRTError)&&N.test(g),io.funcNames="string"==typeof kt.name,io.nonEnumArgs=0!=o,io.nonEnumShadows=!/valueOf/.test(t),io.ownLast="x"!=t[0],io.spliceObjects=(It.splice.call(e,0,1),!e[0]),io.unindexedChars="x"[0]+Et("x")[0]!="xx";try{io.nodeClass=!($t.call(document)==U&&!({toString:0}+""))}catch(u){io.nodeClass=!0}}(1),v.templateSettings={escape:/<%-([\s\S]+?)%>/g,evaluate:/<%([\s\S]+?)%>/g,interpolate:A,variable:"",imports:{_:v}};var lo=function(n){var e="var index, iterable = "+n.firstArg+", result = "+n.init+";\nif (!iterable) return result;\n"+n.top+";";n.array?(e+="\nvar length = iterable.length; index = -1;\nif ("+n.array+") {  ",io.unindexedChars&&(e+="\n  if (isString(iterable)) {\n    iterable = iterable.split('')\n  }  "),e+="\n  while (++index < length) {\n    "+n.loop+";\n  }\n}\nelse {  "):io.nonEnumArgs&&(e+="\n  var length = iterable.length; index = -1;\n  if (length && isArguments(iterable)) {\n    while (++index < length) {\n      index += '';\n      "+n.loop+";\n    }\n  } else {  "),io.enumPrototypes&&(e+="\n  var skipProto = typeof iterable == 'function';\n  "),io.enumErrorProps&&(e+="\n  var skipErrorProps = iterable === errorProto || iterable instanceof Error;\n  ");var r=[];if(io.enumPrototypes&&r.push('!(skipProto && index == "prototype")'),io.enumErrorProps&&r.push('!(skipErrorProps && (index == "message" || index == "name"))'),n.useHas&&n.keys)e+="\n  var ownIndex = -1,\n      ownProps = objectTypes[typeof iterable] && keys(iterable),\n      length = ownProps ? ownProps.length : 0;\n\n  while (++ownIndex < length) {\n    index = ownProps[ownIndex];\n",r.length&&(e+="    if ("+r.join(" && ")+") {\n  "),e+=n.loop+";    ",r.length&&(e+="\n    }"),e+="\n  }  ";else if(e+="\n  for (index in iterable) {\n",n.useHas&&r.push("hasOwnProperty.call(iterable, index)"),r.length&&(e+="    if ("+r.join(" && ")+") {\n  "),e+=n.loop+";    ",r.length&&(e+="\n    }"),e+="\n  }    ",io.nonEnumShadows){for(e+="\n\n  if (iterable !== objectProto) {\n    var ctor = iterable.constructor,\n        isProto = iterable === (ctor && ctor.prototype),\n        className = iterable === stringProto ? stringClass : iterable === errorProto ? errorClass : toString.call(iterable),\n        nonEnum = nonEnumProps[className];\n      ",k=0;7>k;k++)e+="\n    index = '"+n.shadowedProps[k]+"';\n    if ((!(isProto && nonEnum[index]) && hasOwnProperty.call(iterable, index))",n.useHas||(e+=" || (!nonEnum[index] && iterable[index] !== objectProto[index])"),e+=") {\n      "+n.loop+";\n    }      ";e+="\n  }    "}return(n.array||io.nonEnumArgs)&&(e+="\n}"),e+=n.bottom+";\nreturn result"};Jt||(ee=function(){function n(){}return function(e){if(De(e)){n.prototype=e;var t=new n;n.prototype=null}return t||r.Object()}}());var co=Gt?function(n,e){J.value=e,Gt(n,"__bindData__",J)}:it;io.argsClass||(me=function(n){return n&&"object"==typeof n&&"number"==typeof n.length&&zt.call(n,"callee")&&!Ut.call(n,"callee")||!1});var fo=Qt||function(n){return n&&"object"==typeof n&&"number"==typeof n.length&&$t.call(n)==F||!1},so=ge({args:"object",init:"[]",top:"if (!(objectTypes[typeof object])) return result",loop:"result.push(index)"}),po=no?function(n){return De(n)?io.enumPrototypes&&"function"==typeof n||io.nonEnumArgs&&n.length&&me(n)?so(n):no(n):[]}:so,go={args:"collection, callback, thisArg",top:"callback = callback && typeof thisArg == 'undefined' ? callback : baseCreateCallback(callback, thisArg, 3)",array:"typeof length == 'number'",keys:po,loop:"if (callback(iterable[index], index, collection) === false) return result"},ho={args:"object, source, guard",top:"var args = arguments,\n    argsIndex = 0,\n    argsLength = typeof guard == 'number' ? 2 : args.length;\nwhile (++argsIndex < argsLength) {\n  iterable = args[argsIndex];\n  if (iterable && objectTypes[typeof iterable]) {",keys:po,loop:"if (typeof result[index] == 'undefined') result[index] = iterable[index]",bottom:"  }\n}"},vo={top:"if (!objectTypes[typeof iterable]) return result;\n"+go.top,array:!1},yo={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"},bo=Se(yo),mo=Ot("("+po(bo).join("|")+")","g"),_o=Ot("["+po(yo).join("")+"]","g"),xo=ge(go),wo=ge(ho,{top:ho.top.replace(";",";\nif (argsLength > 3 && typeof args[argsLength - 2] == 'function') {\n  var callback = baseCreateCallback(args[--argsLength - 1], args[argsLength--], 2);\n} else if (argsLength > 2 && typeof args[argsLength - 1] == 'function') {\n  callback = args[--argsLength];\n}"),loop:"result[index] = callback ? callback(result[index], iterable[index]) : iterable[index]"}),jo=ge(ho),ko=ge(go,vo,{useHas:!1}),Co=ge(go,vo);$e(/x/)&&($e=function(n){return"function"==typeof n&&$t.call(n)==z});var Po=Wt?function(n){if(!n||$t.call(n)!=U||!io.argsClass&&me(n))return!1;var e=n.valueOf,r=ye(e)&&(r=Wt(e))&&Wt(r);return r?n==r||Wt(n)==r:be(n)}:be,Eo=se(function(n,e,r){zt.call(n,r)?n[r]++:n[r]=1}),Oo=se(function(n,e,r){(zt.call(n,r)?n[r]:n[r]=[]).push(e)}),So=se(function(n,e,r){n[r]=e}),Ao=ar,Io=nr,Lo=ye(Lo=wt.now)&&Lo||function(){return(new wt).getTime()},No=8==to(w+"08")?to:function(n,e){return to(We(n)?n.replace(I,""):n,e||0)};return v.after=Br,v.assign=wo,v.at=Qe,v.bind=Hr,v.bindAll=Wr,v.bindKey=zr,v.chain=vt,v.compact=dr,v.compose=Kr,v.constant=et,v.countBy=Eo,v.create=we,v.createCallback=rt,v.curry=Ur,v.debounce=Mr,v.defaults=jo,v.defer=Vr,v.delay=Zr,v.difference=mr,v.filter=nr,v.flatten=jr,v.forEach=tr,v.forEachRight=or,v.forIn=ko,v.forInRight=Ce,v.forOwn=Co,v.forOwnRight=Pe,v.functions=Ee,v.groupBy=Oo,v.indexBy=So,v.initial=Cr,v.intersection=Pr,v.invert=Se,v.invoke=ur,v.keys=po,v.map=ar,v.mapValues=Ke,v.max=ir,v.memoize=Gr,v.merge=Ue,v.min=lr,v.omit=Me,v.once=Jr,v.pairs=Ve,v.partial=Qr,v.partialRight=Xr,v.pick=Ze,v.pluck=Ao,v.property=lt,v.pull=Sr,v.range=Ar,v.reject=sr,v.remove=Ir,v.rest=Lr,v.shuffle=gr,v.sortBy=yr,v.tap=yt,v.throttle=Yr,v.times=pt,v.toArray=br,v.transform=Ge,v.union=Rr,v.uniq=Tr,v.values=Je,v.where=Io,v.without=$r,v.wrap=nt,v.xor=Dr,v.zip=qr,v.zipObject=Fr,v.collect=ar,v.drop=Lr,v.each=tr,v.eachRight=or,v.extend=wo,v.methods=Ee,v.object=Fr,v.select=nr,v.tail=Lr,v.unique=Tr,v.unzip=qr,ut(v),v.clone=_e,v.cloneDeep=xe,v.contains=Xe,v.escape=tt,v.every=Ye,v.find=er,v.findIndex=_r,v.findKey=je,v.findLast=rr,v.findLastIndex=xr,v.findLastKey=ke,v.has=Oe,v.identity=ot,v.indexOf=kr,v.isArguments=me,v.isArray=fo,v.isBoolean=Ae,v.isDate=Ie,v.isElement=Le,v.isEmpty=Ne,v.isEqual=Re,v.isFinite=Te,v.isFunction=$e,v.isNaN=qe,v.isNull=Fe,v.isNumber=Be,v.isObject=De,v.isPlainObject=Po,v.isRegExp=He,v.isString=We,v.isUndefined=ze,v.lastIndexOf=Or,v.mixin=ut,v.noConflict=at,v.noop=it,v.now=Lo,v.parseInt=No,v.random=ct,v.reduce=cr,v.reduceRight=fr,v.result=ft,v.runInContext=g,v.size=hr,v.some=vr,v.sortedIndex=Nr,v.template=st,v.unescape=gt,v.uniqueId=ht,v.all=Ye,v.any=vr,v.detect=er,v.findWhere=er,v.foldl=cr,v.foldr=fr,v.include=Xe,v.inject=cr,ut(function(){var n={};return Co(v,function(e,r){v.prototype[r]||(n[r]=e)}),n}(),!1),v.first=wr,v.last=Er,v.sample=pr,v.take=wr,v.head=wr,Co(v,function(n,e){var r="sample"!==e;v.prototype[e]||(v.prototype[e]=function(e,t){var o=this.__chain__,u=n(this.__wrapped__,e,t);return o||null!=e&&(!t||r&&"function"==typeof e)?new y(u,o):u})}),v.VERSION="2.4.1",v.prototype.chain=bt,v.prototype.toString=dt,v.prototype.value=mt,v.prototype.valueOf=mt,xo(["join","pop","shift"],function(n){var e=It[n];v.prototype[n]=function(){var n=this.__chain__,r=e.apply(this.__wrapped__,arguments);return n?new y(r,n):r}}),xo(["push","reverse","sort","unshift"],function(n){var e=It[n];v.prototype[n]=function(){return e.apply(this.__wrapped__,arguments),this}}),xo(["concat","slice","splice"],function(n){var e=It[n];v.prototype[n]=function(){return new y(e.apply(this.__wrapped__,arguments),this.__chain__)}}),io.spliceObjects||xo(["pop","shift","splice"],function(n){var e=It[n],r="splice"==n;v.prototype[n]=function(){var n=this.__chain__,t=this.__wrapped__,o=e.apply(t,arguments);return 0===t.length&&delete t[0],n||r?new y(o,n):o}}),v}var h,v=[],y=[],b=0,d={},m=+new Date+"",_=75,x=40,w=" 	\f ﻿\n\r\u2028\u2029 ᠎             　",j=/\b__p \+= '';/g,C=/\b(__p \+=) '' \+/g,P=/(__e\(.*?\)|\b__t\)) \+\n'';/g,E=/\$\{([^\\}]*(?:\\.[^\\}]*)*)\}/g,O=/\w*$/,S=/^\s*function[ \n\r\t]+\w/,A=/<%=([\s\S]+?)%>/g,I=RegExp("^["+w+"]*0+(?=.$)"),L=/($^)/,N=/\bthis\b/,R=/['\n\r\t\u2028\u2029\\]/g,T=["Array","Boolean","Date","Error","Function","Math","Number","Object","RegExp","String","_","attachEvent","clearTimeout","isFinite","isNaN","parseInt","setTimeout"],$=["constructor","hasOwnProperty","isPrototypeOf","propertyIsEnumerable","toLocaleString","toString","valueOf"],D=0,q="[object Arguments]",F="[object Array]",B="[object Boolean]",H="[object Date]",W="[object Error]",z="[object Function]",K="[object Number]",U="[object Object]",M="[object RegExp]",V="[object String]",Z={};
Z[z]=!1,Z[q]=Z[F]=Z[B]=Z[H]=Z[K]=Z[U]=Z[M]=Z[V]=!0;var G={leading:!1,maxWait:0,trailing:!1},J={configurable:!1,enumerable:!1,value:null,writable:!1},Q={args:"",array:null,bottom:"",firstArg:"",init:"",keys:null,loop:"",shadowedProps:null,support:null,top:"",useHas:!1},X={"boolean":!1,"function":!0,object:!0,number:!1,string:!1,undefined:!1},Y={"\\":"\\","'":"'","\n":"n","\r":"r","	":"t","\u2028":"u2028","\u2029":"u2029"},ne=X[typeof window]&&window||this,ee=X[typeof exports]&&exports&&!exports.nodeType&&exports,re=X[typeof module]&&module&&!module.nodeType&&module,te=re&&re.exports===ee&&ee,oe=X[typeof global]&&global;!oe||oe.global!==oe&&oe.window!==oe||(ne=oe);var ue=g();"function"==typeof define&&"object"==typeof define.amd&&define.amd?(ne._=ue,define("lodash",[],function(){return ue})):ee&&re?te?(re.exports=ue)._=ue:ee._=ue:ne._=ue}).call(this),define("jquery-selector-data-prefix",["require","exports","module","jquery","lodash"],function(n){var e=n("jquery"),r=n("lodash");e.expr[":"]["data-prefix"]=function(n,t,o){var u=e(n).data(),a=o[3],i=new RegExp("^"+a+"([A-Z$_].*$)");return r.some(u,function(n,e){return i.test(e)})}});
//     jquery-value
//     (c) simonfan
//     jquery-value is licensed under the MIT terms.

define("__jquery-value/get",["require","exports","module","jquery"],function(e,r,t){var u=e("jquery"),n={"default":function(e){return e.val()},DIV:function(e){return e.html()},INPUT:function(e){var r=e.prop("type");return"checkbox"===r?e.filter(":checked").map(function(){return u(this).val()}).get():"radio"===r?e.filter(":checked").val():e.val()}};t.exports=function(e){var r=e.prop("tagName"),t=n[r]||n["default"];return t(e)}}),define("__jquery-value/set",["require","exports","module","jquery"],function(e,r,t){var u=e("jquery"),n={"default":function(e,r){return e.html(r)},INPUT:function(e,r){var t=e.prop("type");return("checkbox"===t||"radio"===t)&&(r=u.isArray(r)?r:[r]),e.val(r)},SELECT:function(e,r){return e.val(r)},IMG:function(e,r){return e.prop("src",r).trigger("change",r)},TEXTAREA:function(e,r){return e.val(r)}};t.exports=function(e,r){return e.each(function(e,t){var a=u(t),o=a.prop("tagName"),i=n[o]||n["default"];i(a,r)}),e}}),define("jquery-value",["require","exports","module","jquery","./__jquery-value/get","./__jquery-value/set"],function(e,r,t){var u=e("jquery"),n=e("./__jquery-value/get"),a=e("./__jquery-value/set"),o=t.exports=function(e,r){return 1===arguments.length?n(e):2===arguments.length?a(e,r):void 0};u.prototype.value=function(e){return 0===arguments.length?o(this):o(this,e)}});
define('__bb-model-view/update',['require','exports','module','lodash'],function (require, exports, module) {
	

	var _ = require('lodash');

	/**
	 * Updates the view by pumping data from the source model.
	 *
	 * @return {[type]} [description]
	 */
	exports.updateView = function pumpModelDataToView() {
		var promise = this.pump.pump();

		this.ready = _.bind(promise.done, promise);

		return promise;
	};

	/**
	 * Updates the model draining data from the view.
	 *
	 * @param  {[type]} pipe [description]
	 * @return {[type]}      [description]
	 */
	exports.updateModel = function drainViewDataToModel(pipe) {
		var promise = this.pump.drain(pipe);

		this.ready = _.bind(promise.done, promise);

		return promise;
	};


});

// vim:ts=4:sts=4:sw=4:
/*!
 *
 * Copyright 2009-2012 Kris Kowal under the terms of the MIT
 * license found at http://github.com/kriskowal/q/raw/master/LICENSE
 *
 * With parts by Tyler Close
 * Copyright 2007-2009 Tyler Close under the terms of the MIT X license found
 * at http://www.opensource.org/licenses/mit-license.html
 * Forked at ref_send.js version: 2009-05-11
 *
 * With parts by Mark Miller
 * Copyright (C) 2011 Google Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 */

(function (definition) {
    // Turn off strict mode for this function so we can assign to global.Q
    /* jshint strict: false */

    // This file will function properly as a <script> tag, or a module
    // using CommonJS and NodeJS or RequireJS module formats.  In
    // Common/Node/RequireJS, the module exports the Q API and when
    // executed as a simple <script>, it creates a Q global instead.

    // Montage Require
    if (typeof bootstrap === "function") {
        bootstrap("promise", definition);

    // CommonJS
    } else if (typeof exports === "object") {
        module.exports = definition();

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
        define('q',definition);

    // SES (Secure EcmaScript)
    } else if (typeof ses !== "undefined") {
        if (!ses.ok()) {
            return;
        } else {
            ses.makeQ = definition;
        }

    // <script>
    } else {
        Q = definition();
    }

})(function () {


var hasStacks = false;
try {
    throw new Error();
} catch (e) {
    hasStacks = !!e.stack;
}

// All code after this point will be filtered from stack traces reported
// by Q.
var qStartingLine = captureLine();
var qFileName;

// shims

// used for fallback in "allResolved"
var noop = function () {};

// Use the fastest possible means to execute a task in a future turn
// of the event loop.
var nextTick =(function () {
    // linked list of tasks (single, with head node)
    var head = {task: void 0, next: null};
    var tail = head;
    var flushing = false;
    var requestTick = void 0;
    var isNodeJS = false;

    function flush() {
        /* jshint loopfunc: true */

        while (head.next) {
            head = head.next;
            var task = head.task;
            head.task = void 0;
            var domain = head.domain;

            if (domain) {
                head.domain = void 0;
                domain.enter();
            }

            try {
                task();

            } catch (e) {
                if (isNodeJS) {
                    // In node, uncaught exceptions are considered fatal errors.
                    // Re-throw them synchronously to interrupt flushing!

                    // Ensure continuation if the uncaught exception is suppressed
                    // listening "uncaughtException" events (as domains does).
                    // Continue in next event to avoid tick recursion.
                    if (domain) {
                        domain.exit();
                    }
                    setTimeout(flush, 0);
                    if (domain) {
                        domain.enter();
                    }

                    throw e;

                } else {
                    // In browsers, uncaught exceptions are not fatal.
                    // Re-throw them asynchronously to avoid slow-downs.
                    setTimeout(function() {
                       throw e;
                    }, 0);
                }
            }

            if (domain) {
                domain.exit();
            }
        }

        flushing = false;
    }

    nextTick = function (task) {
        tail = tail.next = {
            task: task,
            domain: isNodeJS && process.domain,
            next: null
        };

        if (!flushing) {
            flushing = true;
            requestTick();
        }
    };

    if (typeof process !== "undefined" && process.nextTick) {
        // Node.js before 0.9. Note that some fake-Node environments, like the
        // Mocha test runner, introduce a `process` global without a `nextTick`.
        isNodeJS = true;

        requestTick = function () {
            process.nextTick(flush);
        };

    } else if (typeof setImmediate === "function") {
        // In IE10, Node.js 0.9+, or https://github.com/NobleJS/setImmediate
        if (typeof window !== "undefined") {
            requestTick = setImmediate.bind(window, flush);
        } else {
            requestTick = function () {
                setImmediate(flush);
            };
        }

    } else if (typeof MessageChannel !== "undefined") {
        // modern browsers
        // http://www.nonblocking.io/2011/06/windownexttick.html
        var channel = new MessageChannel();
        // At least Safari Version 6.0.5 (8536.30.1) intermittently cannot create
        // working message ports the first time a page loads.
        channel.port1.onmessage = function () {
            requestTick = requestPortTick;
            channel.port1.onmessage = flush;
            flush();
        };
        var requestPortTick = function () {
            // Opera requires us to provide a message payload, regardless of
            // whether we use it.
            channel.port2.postMessage(0);
        };
        requestTick = function () {
            setTimeout(flush, 0);
            requestPortTick();
        };

    } else {
        // old browsers
        requestTick = function () {
            setTimeout(flush, 0);
        };
    }

    return nextTick;
})();

// Attempt to make generics safe in the face of downstream
// modifications.
// There is no situation where this is necessary.
// If you need a security guarantee, these primordials need to be
// deeply frozen anyway, and if you don’t need a security guarantee,
// this is just plain paranoid.
// However, this **might** have the nice side-effect of reducing the size of
// the minified code by reducing x.call() to merely x()
// See Mark Miller’s explanation of what this does.
// http://wiki.ecmascript.org/doku.php?id=conventions:safe_meta_programming
var call = Function.call;
function uncurryThis(f) {
    return function () {
        return call.apply(f, arguments);
    };
}
// This is equivalent, but slower:
// uncurryThis = Function_bind.bind(Function_bind.call);
// http://jsperf.com/uncurrythis

var array_slice = uncurryThis(Array.prototype.slice);

var array_reduce = uncurryThis(
    Array.prototype.reduce || function (callback, basis) {
        var index = 0,
            length = this.length;
        // concerning the initial value, if one is not provided
        if (arguments.length === 1) {
            // seek to the first value in the array, accounting
            // for the possibility that is is a sparse array
            do {
                if (index in this) {
                    basis = this[index++];
                    break;
                }
                if (++index >= length) {
                    throw new TypeError();
                }
            } while (1);
        }
        // reduce
        for (; index < length; index++) {
            // account for the possibility that the array is sparse
            if (index in this) {
                basis = callback(basis, this[index], index);
            }
        }
        return basis;
    }
);

var array_indexOf = uncurryThis(
    Array.prototype.indexOf || function (value) {
        // not a very good shim, but good enough for our one use of it
        for (var i = 0; i < this.length; i++) {
            if (this[i] === value) {
                return i;
            }
        }
        return -1;
    }
);

var array_map = uncurryThis(
    Array.prototype.map || function (callback, thisp) {
        var self = this;
        var collect = [];
        array_reduce(self, function (undefined, value, index) {
            collect.push(callback.call(thisp, value, index, self));
        }, void 0);
        return collect;
    }
);

var object_create = Object.create || function (prototype) {
    function Type() { }
    Type.prototype = prototype;
    return new Type();
};

var object_hasOwnProperty = uncurryThis(Object.prototype.hasOwnProperty);

var object_keys = Object.keys || function (object) {
    var keys = [];
    for (var key in object) {
        if (object_hasOwnProperty(object, key)) {
            keys.push(key);
        }
    }
    return keys;
};

var object_toString = uncurryThis(Object.prototype.toString);

function isObject(value) {
    return value === Object(value);
}

// generator related shims

// FIXME: Remove this function once ES6 generators are in SpiderMonkey.
function isStopIteration(exception) {
    return (
        object_toString(exception) === "[object StopIteration]" ||
        exception instanceof QReturnValue
    );
}

// FIXME: Remove this helper and Q.return once ES6 generators are in
// SpiderMonkey.
var QReturnValue;
if (typeof ReturnValue !== "undefined") {
    QReturnValue = ReturnValue;
} else {
    QReturnValue = function (value) {
        this.value = value;
    };
}

// long stack traces

var STACK_JUMP_SEPARATOR = "From previous event:";

function makeStackTraceLong(error, promise) {
    // If possible, transform the error stack trace by removing Node and Q
    // cruft, then concatenating with the stack trace of `promise`. See #57.
    if (hasStacks &&
        promise.stack &&
        typeof error === "object" &&
        error !== null &&
        error.stack &&
        error.stack.indexOf(STACK_JUMP_SEPARATOR) === -1
    ) {
        var stacks = [];
        for (var p = promise; !!p; p = p.source) {
            if (p.stack) {
                stacks.unshift(p.stack);
            }
        }
        stacks.unshift(error.stack);

        var concatedStacks = stacks.join("\n" + STACK_JUMP_SEPARATOR + "\n");
        error.stack = filterStackString(concatedStacks);
    }
}

function filterStackString(stackString) {
    var lines = stackString.split("\n");
    var desiredLines = [];
    for (var i = 0; i < lines.length; ++i) {
        var line = lines[i];

        if (!isInternalFrame(line) && !isNodeFrame(line) && line) {
            desiredLines.push(line);
        }
    }
    return desiredLines.join("\n");
}

function isNodeFrame(stackLine) {
    return stackLine.indexOf("(module.js:") !== -1 ||
           stackLine.indexOf("(node.js:") !== -1;
}

function getFileNameAndLineNumber(stackLine) {
    // Named functions: "at functionName (filename:lineNumber:columnNumber)"
    // In IE10 function name can have spaces ("Anonymous function") O_o
    var attempt1 = /at .+ \((.+):(\d+):(?:\d+)\)$/.exec(stackLine);
    if (attempt1) {
        return [attempt1[1], Number(attempt1[2])];
    }

    // Anonymous functions: "at filename:lineNumber:columnNumber"
    var attempt2 = /at ([^ ]+):(\d+):(?:\d+)$/.exec(stackLine);
    if (attempt2) {
        return [attempt2[1], Number(attempt2[2])];
    }

    // Firefox style: "function@filename:lineNumber or @filename:lineNumber"
    var attempt3 = /.*@(.+):(\d+)$/.exec(stackLine);
    if (attempt3) {
        return [attempt3[1], Number(attempt3[2])];
    }
}

function isInternalFrame(stackLine) {
    var fileNameAndLineNumber = getFileNameAndLineNumber(stackLine);

    if (!fileNameAndLineNumber) {
        return false;
    }

    var fileName = fileNameAndLineNumber[0];
    var lineNumber = fileNameAndLineNumber[1];

    return fileName === qFileName &&
        lineNumber >= qStartingLine &&
        lineNumber <= qEndingLine;
}

// discover own file name and line number range for filtering stack
// traces
function captureLine() {
    if (!hasStacks) {
        return;
    }

    try {
        throw new Error();
    } catch (e) {
        var lines = e.stack.split("\n");
        var firstLine = lines[0].indexOf("@") > 0 ? lines[1] : lines[2];
        var fileNameAndLineNumber = getFileNameAndLineNumber(firstLine);
        if (!fileNameAndLineNumber) {
            return;
        }

        qFileName = fileNameAndLineNumber[0];
        return fileNameAndLineNumber[1];
    }
}

function deprecate(callback, name, alternative) {
    return function () {
        if (typeof console !== "undefined" &&
            typeof console.warn === "function") {
            console.warn(name + " is deprecated, use " + alternative +
                         " instead.", new Error("").stack);
        }
        return callback.apply(callback, arguments);
    };
}

// end of shims
// beginning of real work

/**
 * Constructs a promise for an immediate reference, passes promises through, or
 * coerces promises from different systems.
 * @param value immediate reference or promise
 */
function Q(value) {
    // If the object is already a Promise, return it directly.  This enables
    // the resolve function to both be used to created references from objects,
    // but to tolerably coerce non-promises to promises.
    if (isPromise(value)) {
        return value;
    }

    // assimilate thenables
    if (isPromiseAlike(value)) {
        return coerce(value);
    } else {
        return fulfill(value);
    }
}
Q.resolve = Q;

/**
 * Performs a task in a future turn of the event loop.
 * @param {Function} task
 */
Q.nextTick = nextTick;

/**
 * Controls whether or not long stack traces will be on
 */
Q.longStackSupport = false;

/**
 * Constructs a {promise, resolve, reject} object.
 *
 * `resolve` is a callback to invoke with a more resolved value for the
 * promise. To fulfill the promise, invoke `resolve` with any value that is
 * not a thenable. To reject the promise, invoke `resolve` with a rejected
 * thenable, or invoke `reject` with the reason directly. To resolve the
 * promise to another thenable, thus putting it in the same state, invoke
 * `resolve` with that other thenable.
 */
Q.defer = defer;
function defer() {
    // if "messages" is an "Array", that indicates that the promise has not yet
    // been resolved.  If it is "undefined", it has been resolved.  Each
    // element of the messages array is itself an array of complete arguments to
    // forward to the resolved promise.  We coerce the resolution value to a
    // promise using the `resolve` function because it handles both fully
    // non-thenable values and other thenables gracefully.
    var messages = [], progressListeners = [], resolvedPromise;

    var deferred = object_create(defer.prototype);
    var promise = object_create(Promise.prototype);

    promise.promiseDispatch = function (resolve, op, operands) {
        var args = array_slice(arguments);
        if (messages) {
            messages.push(args);
            if (op === "when" && operands[1]) { // progress operand
                progressListeners.push(operands[1]);
            }
        } else {
            nextTick(function () {
                resolvedPromise.promiseDispatch.apply(resolvedPromise, args);
            });
        }
    };

    // XXX deprecated
    promise.valueOf = function () {
        if (messages) {
            return promise;
        }
        var nearerValue = nearer(resolvedPromise);
        if (isPromise(nearerValue)) {
            resolvedPromise = nearerValue; // shorten chain
        }
        return nearerValue;
    };

    promise.inspect = function () {
        if (!resolvedPromise) {
            return { state: "pending" };
        }
        return resolvedPromise.inspect();
    };

    if (Q.longStackSupport && hasStacks) {
        try {
            throw new Error();
        } catch (e) {
            // NOTE: don't try to use `Error.captureStackTrace` or transfer the
            // accessor around; that causes memory leaks as per GH-111. Just
            // reify the stack trace as a string ASAP.
            //
            // At the same time, cut off the first line; it's always just
            // "[object Promise]\n", as per the `toString`.
            promise.stack = e.stack.substring(e.stack.indexOf("\n") + 1);
        }
    }

    // NOTE: we do the checks for `resolvedPromise` in each method, instead of
    // consolidating them into `become`, since otherwise we'd create new
    // promises with the lines `become(whatever(value))`. See e.g. GH-252.

    function become(newPromise) {
        resolvedPromise = newPromise;
        promise.source = newPromise;

        array_reduce(messages, function (undefined, message) {
            nextTick(function () {
                newPromise.promiseDispatch.apply(newPromise, message);
            });
        }, void 0);

        messages = void 0;
        progressListeners = void 0;
    }

    deferred.promise = promise;
    deferred.resolve = function (value) {
        if (resolvedPromise) {
            return;
        }

        become(Q(value));
    };

    deferred.fulfill = function (value) {
        if (resolvedPromise) {
            return;
        }

        become(fulfill(value));
    };
    deferred.reject = function (reason) {
        if (resolvedPromise) {
            return;
        }

        become(reject(reason));
    };
    deferred.notify = function (progress) {
        if (resolvedPromise) {
            return;
        }

        array_reduce(progressListeners, function (undefined, progressListener) {
            nextTick(function () {
                progressListener(progress);
            });
        }, void 0);
    };

    return deferred;
}

/**
 * Creates a Node-style callback that will resolve or reject the deferred
 * promise.
 * @returns a nodeback
 */
defer.prototype.makeNodeResolver = function () {
    var self = this;
    return function (error, value) {
        if (error) {
            self.reject(error);
        } else if (arguments.length > 2) {
            self.resolve(array_slice(arguments, 1));
        } else {
            self.resolve(value);
        }
    };
};

/**
 * @param resolver {Function} a function that returns nothing and accepts
 * the resolve, reject, and notify functions for a deferred.
 * @returns a promise that may be resolved with the given resolve and reject
 * functions, or rejected by a thrown exception in resolver
 */
Q.Promise = promise; // ES6
Q.promise = promise;
function promise(resolver) {
    if (typeof resolver !== "function") {
        throw new TypeError("resolver must be a function.");
    }
    var deferred = defer();
    try {
        resolver(deferred.resolve, deferred.reject, deferred.notify);
    } catch (reason) {
        deferred.reject(reason);
    }
    return deferred.promise;
}

promise.race = race; // ES6
promise.all = all; // ES6
promise.reject = reject; // ES6
promise.resolve = Q; // ES6

// XXX experimental.  This method is a way to denote that a local value is
// serializable and should be immediately dispatched to a remote upon request,
// instead of passing a reference.
Q.passByCopy = function (object) {
    //freeze(object);
    //passByCopies.set(object, true);
    return object;
};

Promise.prototype.passByCopy = function () {
    //freeze(object);
    //passByCopies.set(object, true);
    return this;
};

/**
 * If two promises eventually fulfill to the same value, promises that value,
 * but otherwise rejects.
 * @param x {Any*}
 * @param y {Any*}
 * @returns {Any*} a promise for x and y if they are the same, but a rejection
 * otherwise.
 *
 */
Q.join = function (x, y) {
    return Q(x).join(y);
};

Promise.prototype.join = function (that) {
    return Q([this, that]).spread(function (x, y) {
        if (x === y) {
            // TODO: "===" should be Object.is or equiv
            return x;
        } else {
            throw new Error("Can't join: not the same: " + x + " " + y);
        }
    });
};

/**
 * Returns a promise for the first of an array of promises to become fulfilled.
 * @param answers {Array[Any*]} promises to race
 * @returns {Any*} the first promise to be fulfilled
 */
Q.race = race;
function race(answerPs) {
    return promise(function(resolve, reject) {
        // Switch to this once we can assume at least ES5
        // answerPs.forEach(function(answerP) {
        //     Q(answerP).then(resolve, reject);
        // });
        // Use this in the meantime
        for (var i = 0, len = answerPs.length; i < len; i++) {
            Q(answerPs[i]).then(resolve, reject);
        }
    });
}

Promise.prototype.race = function () {
    return this.then(Q.race);
};

/**
 * Constructs a Promise with a promise descriptor object and optional fallback
 * function.  The descriptor contains methods like when(rejected), get(name),
 * set(name, value), post(name, args), and delete(name), which all
 * return either a value, a promise for a value, or a rejection.  The fallback
 * accepts the operation name, a resolver, and any further arguments that would
 * have been forwarded to the appropriate method above had a method been
 * provided with the proper name.  The API makes no guarantees about the nature
 * of the returned object, apart from that it is usable whereever promises are
 * bought and sold.
 */
Q.makePromise = Promise;
function Promise(descriptor, fallback, inspect) {
    if (fallback === void 0) {
        fallback = function (op) {
            return reject(new Error(
                "Promise does not support operation: " + op
            ));
        };
    }
    if (inspect === void 0) {
        inspect = function () {
            return {state: "unknown"};
        };
    }

    var promise = object_create(Promise.prototype);

    promise.promiseDispatch = function (resolve, op, args) {
        var result;
        try {
            if (descriptor[op]) {
                result = descriptor[op].apply(promise, args);
            } else {
                result = fallback.call(promise, op, args);
            }
        } catch (exception) {
            result = reject(exception);
        }
        if (resolve) {
            resolve(result);
        }
    };

    promise.inspect = inspect;

    // XXX deprecated `valueOf` and `exception` support
    if (inspect) {
        var inspected = inspect();
        if (inspected.state === "rejected") {
            promise.exception = inspected.reason;
        }

        promise.valueOf = function () {
            var inspected = inspect();
            if (inspected.state === "pending" ||
                inspected.state === "rejected") {
                return promise;
            }
            return inspected.value;
        };
    }

    return promise;
}

Promise.prototype.toString = function () {
    return "[object Promise]";
};

Promise.prototype.then = function (fulfilled, rejected, progressed) {
    var self = this;
    var deferred = defer();
    var done = false;   // ensure the untrusted promise makes at most a
                        // single call to one of the callbacks

    function _fulfilled(value) {
        try {
            return typeof fulfilled === "function" ? fulfilled(value) : value;
        } catch (exception) {
            return reject(exception);
        }
    }

    function _rejected(exception) {
        if (typeof rejected === "function") {
            makeStackTraceLong(exception, self);
            try {
                return rejected(exception);
            } catch (newException) {
                return reject(newException);
            }
        }
        return reject(exception);
    }

    function _progressed(value) {
        return typeof progressed === "function" ? progressed(value) : value;
    }

    nextTick(function () {
        self.promiseDispatch(function (value) {
            if (done) {
                return;
            }
            done = true;

            deferred.resolve(_fulfilled(value));
        }, "when", [function (exception) {
            if (done) {
                return;
            }
            done = true;

            deferred.resolve(_rejected(exception));
        }]);
    });

    // Progress propagator need to be attached in the current tick.
    self.promiseDispatch(void 0, "when", [void 0, function (value) {
        var newValue;
        var threw = false;
        try {
            newValue = _progressed(value);
        } catch (e) {
            threw = true;
            if (Q.onerror) {
                Q.onerror(e);
            } else {
                throw e;
            }
        }

        if (!threw) {
            deferred.notify(newValue);
        }
    }]);

    return deferred.promise;
};

/**
 * Registers an observer on a promise.
 *
 * Guarantees:
 *
 * 1. that fulfilled and rejected will be called only once.
 * 2. that either the fulfilled callback or the rejected callback will be
 *    called, but not both.
 * 3. that fulfilled and rejected will not be called in this turn.
 *
 * @param value      promise or immediate reference to observe
 * @param fulfilled  function to be called with the fulfilled value
 * @param rejected   function to be called with the rejection exception
 * @param progressed function to be called on any progress notifications
 * @return promise for the return value from the invoked callback
 */
Q.when = when;
function when(value, fulfilled, rejected, progressed) {
    return Q(value).then(fulfilled, rejected, progressed);
}

Promise.prototype.thenResolve = function (value) {
    return this.then(function () { return value; });
};

Q.thenResolve = function (promise, value) {
    return Q(promise).thenResolve(value);
};

Promise.prototype.thenReject = function (reason) {
    return this.then(function () { throw reason; });
};

Q.thenReject = function (promise, reason) {
    return Q(promise).thenReject(reason);
};

/**
 * If an object is not a promise, it is as "near" as possible.
 * If a promise is rejected, it is as "near" as possible too.
 * If it’s a fulfilled promise, the fulfillment value is nearer.
 * If it’s a deferred promise and the deferred has been resolved, the
 * resolution is "nearer".
 * @param object
 * @returns most resolved (nearest) form of the object
 */

// XXX should we re-do this?
Q.nearer = nearer;
function nearer(value) {
    if (isPromise(value)) {
        var inspected = value.inspect();
        if (inspected.state === "fulfilled") {
            return inspected.value;
        }
    }
    return value;
}

/**
 * @returns whether the given object is a promise.
 * Otherwise it is a fulfilled value.
 */
Q.isPromise = isPromise;
function isPromise(object) {
    return isObject(object) &&
        typeof object.promiseDispatch === "function" &&
        typeof object.inspect === "function";
}

Q.isPromiseAlike = isPromiseAlike;
function isPromiseAlike(object) {
    return isObject(object) && typeof object.then === "function";
}

/**
 * @returns whether the given object is a pending promise, meaning not
 * fulfilled or rejected.
 */
Q.isPending = isPending;
function isPending(object) {
    return isPromise(object) && object.inspect().state === "pending";
}

Promise.prototype.isPending = function () {
    return this.inspect().state === "pending";
};

/**
 * @returns whether the given object is a value or fulfilled
 * promise.
 */
Q.isFulfilled = isFulfilled;
function isFulfilled(object) {
    return !isPromise(object) || object.inspect().state === "fulfilled";
}

Promise.prototype.isFulfilled = function () {
    return this.inspect().state === "fulfilled";
};

/**
 * @returns whether the given object is a rejected promise.
 */
Q.isRejected = isRejected;
function isRejected(object) {
    return isPromise(object) && object.inspect().state === "rejected";
}

Promise.prototype.isRejected = function () {
    return this.inspect().state === "rejected";
};

//// BEGIN UNHANDLED REJECTION TRACKING

// This promise library consumes exceptions thrown in handlers so they can be
// handled by a subsequent promise.  The exceptions get added to this array when
// they are created, and removed when they are handled.  Note that in ES6 or
// shimmed environments, this would naturally be a `Set`.
var unhandledReasons = [];
var unhandledRejections = [];
var trackUnhandledRejections = true;

function resetUnhandledRejections() {
    unhandledReasons.length = 0;
    unhandledRejections.length = 0;

    if (!trackUnhandledRejections) {
        trackUnhandledRejections = true;
    }
}

function trackRejection(promise, reason) {
    if (!trackUnhandledRejections) {
        return;
    }

    unhandledRejections.push(promise);
    if (reason && typeof reason.stack !== "undefined") {
        unhandledReasons.push(reason.stack);
    } else {
        unhandledReasons.push("(no stack) " + reason);
    }
}

function untrackRejection(promise) {
    if (!trackUnhandledRejections) {
        return;
    }

    var at = array_indexOf(unhandledRejections, promise);
    if (at !== -1) {
        unhandledRejections.splice(at, 1);
        unhandledReasons.splice(at, 1);
    }
}

Q.resetUnhandledRejections = resetUnhandledRejections;

Q.getUnhandledReasons = function () {
    // Make a copy so that consumers can't interfere with our internal state.
    return unhandledReasons.slice();
};

Q.stopUnhandledRejectionTracking = function () {
    resetUnhandledRejections();
    trackUnhandledRejections = false;
};

resetUnhandledRejections();

//// END UNHANDLED REJECTION TRACKING

/**
 * Constructs a rejected promise.
 * @param reason value describing the failure
 */
Q.reject = reject;
function reject(reason) {
    var rejection = Promise({
        "when": function (rejected) {
            // note that the error has been handled
            if (rejected) {
                untrackRejection(this);
            }
            return rejected ? rejected(reason) : this;
        }
    }, function fallback() {
        return this;
    }, function inspect() {
        return { state: "rejected", reason: reason };
    });

    // Note that the reason has not been handled.
    trackRejection(rejection, reason);

    return rejection;
}

/**
 * Constructs a fulfilled promise for an immediate reference.
 * @param value immediate reference
 */
Q.fulfill = fulfill;
function fulfill(value) {
    return Promise({
        "when": function () {
            return value;
        },
        "get": function (name) {
            return value[name];
        },
        "set": function (name, rhs) {
            value[name] = rhs;
        },
        "delete": function (name) {
            delete value[name];
        },
        "post": function (name, args) {
            // Mark Miller proposes that post with no name should apply a
            // promised function.
            if (name === null || name === void 0) {
                return value.apply(void 0, args);
            } else {
                return value[name].apply(value, args);
            }
        },
        "apply": function (thisp, args) {
            return value.apply(thisp, args);
        },
        "keys": function () {
            return object_keys(value);
        }
    }, void 0, function inspect() {
        return { state: "fulfilled", value: value };
    });
}

/**
 * Converts thenables to Q promises.
 * @param promise thenable promise
 * @returns a Q promise
 */
function coerce(promise) {
    var deferred = defer();
    nextTick(function () {
        try {
            promise.then(deferred.resolve, deferred.reject, deferred.notify);
        } catch (exception) {
            deferred.reject(exception);
        }
    });
    return deferred.promise;
}

/**
 * Annotates an object such that it will never be
 * transferred away from this process over any promise
 * communication channel.
 * @param object
 * @returns promise a wrapping of that object that
 * additionally responds to the "isDef" message
 * without a rejection.
 */
Q.master = master;
function master(object) {
    return Promise({
        "isDef": function () {}
    }, function fallback(op, args) {
        return dispatch(object, op, args);
    }, function () {
        return Q(object).inspect();
    });
}

/**
 * Spreads the values of a promised array of arguments into the
 * fulfillment callback.
 * @param fulfilled callback that receives variadic arguments from the
 * promised array
 * @param rejected callback that receives the exception if the promise
 * is rejected.
 * @returns a promise for the return value or thrown exception of
 * either callback.
 */
Q.spread = spread;
function spread(value, fulfilled, rejected) {
    return Q(value).spread(fulfilled, rejected);
}

Promise.prototype.spread = function (fulfilled, rejected) {
    return this.all().then(function (array) {
        return fulfilled.apply(void 0, array);
    }, rejected);
};

/**
 * The async function is a decorator for generator functions, turning
 * them into asynchronous generators.  Although generators are only part
 * of the newest ECMAScript 6 drafts, this code does not cause syntax
 * errors in older engines.  This code should continue to work and will
 * in fact improve over time as the language improves.
 *
 * ES6 generators are currently part of V8 version 3.19 with the
 * --harmony-generators runtime flag enabled.  SpiderMonkey has had them
 * for longer, but under an older Python-inspired form.  This function
 * works on both kinds of generators.
 *
 * Decorates a generator function such that:
 *  - it may yield promises
 *  - execution will continue when that promise is fulfilled
 *  - the value of the yield expression will be the fulfilled value
 *  - it returns a promise for the return value (when the generator
 *    stops iterating)
 *  - the decorated function returns a promise for the return value
 *    of the generator or the first rejected promise among those
 *    yielded.
 *  - if an error is thrown in the generator, it propagates through
 *    every following yield until it is caught, or until it escapes
 *    the generator function altogether, and is translated into a
 *    rejection for the promise returned by the decorated generator.
 */
Q.async = async;
function async(makeGenerator) {
    return function () {
        // when verb is "send", arg is a value
        // when verb is "throw", arg is an exception
        function continuer(verb, arg) {
            var result;

            // Until V8 3.19 / Chromium 29 is released, SpiderMonkey is the only
            // engine that has a deployed base of browsers that support generators.
            // However, SM's generators use the Python-inspired semantics of
            // outdated ES6 drafts.  We would like to support ES6, but we'd also
            // like to make it possible to use generators in deployed browsers, so
            // we also support Python-style generators.  At some point we can remove
            // this block.

            if (typeof StopIteration === "undefined") {
                // ES6 Generators
                try {
                    result = generator[verb](arg);
                } catch (exception) {
                    return reject(exception);
                }
                if (result.done) {
                    return result.value;
                } else {
                    return when(result.value, callback, errback);
                }
            } else {
                // SpiderMonkey Generators
                // FIXME: Remove this case when SM does ES6 generators.
                try {
                    result = generator[verb](arg);
                } catch (exception) {
                    if (isStopIteration(exception)) {
                        return exception.value;
                    } else {
                        return reject(exception);
                    }
                }
                return when(result, callback, errback);
            }
        }
        var generator = makeGenerator.apply(this, arguments);
        var callback = continuer.bind(continuer, "next");
        var errback = continuer.bind(continuer, "throw");
        return callback();
    };
}

/**
 * The spawn function is a small wrapper around async that immediately
 * calls the generator and also ends the promise chain, so that any
 * unhandled errors are thrown instead of forwarded to the error
 * handler. This is useful because it's extremely common to run
 * generators at the top-level to work with libraries.
 */
Q.spawn = spawn;
function spawn(makeGenerator) {
    Q.done(Q.async(makeGenerator)());
}

// FIXME: Remove this interface once ES6 generators are in SpiderMonkey.
/**
 * Throws a ReturnValue exception to stop an asynchronous generator.
 *
 * This interface is a stop-gap measure to support generator return
 * values in older Firefox/SpiderMonkey.  In browsers that support ES6
 * generators like Chromium 29, just use "return" in your generator
 * functions.
 *
 * @param value the return value for the surrounding generator
 * @throws ReturnValue exception with the value.
 * @example
 * // ES6 style
 * Q.async(function* () {
 *      var foo = yield getFooPromise();
 *      var bar = yield getBarPromise();
 *      return foo + bar;
 * })
 * // Older SpiderMonkey style
 * Q.async(function () {
 *      var foo = yield getFooPromise();
 *      var bar = yield getBarPromise();
 *      Q.return(foo + bar);
 * })
 */
Q["return"] = _return;
function _return(value) {
    throw new QReturnValue(value);
}

/**
 * The promised function decorator ensures that any promise arguments
 * are settled and passed as values (`this` is also settled and passed
 * as a value).  It will also ensure that the result of a function is
 * always a promise.
 *
 * @example
 * var add = Q.promised(function (a, b) {
 *     return a + b;
 * });
 * add(Q(a), Q(B));
 *
 * @param {function} callback The function to decorate
 * @returns {function} a function that has been decorated.
 */
Q.promised = promised;
function promised(callback) {
    return function () {
        return spread([this, all(arguments)], function (self, args) {
            return callback.apply(self, args);
        });
    };
}

/**
 * sends a message to a value in a future turn
 * @param object* the recipient
 * @param op the name of the message operation, e.g., "when",
 * @param args further arguments to be forwarded to the operation
 * @returns result {Promise} a promise for the result of the operation
 */
Q.dispatch = dispatch;
function dispatch(object, op, args) {
    return Q(object).dispatch(op, args);
}

Promise.prototype.dispatch = function (op, args) {
    var self = this;
    var deferred = defer();
    nextTick(function () {
        self.promiseDispatch(deferred.resolve, op, args);
    });
    return deferred.promise;
};

/**
 * Gets the value of a property in a future turn.
 * @param object    promise or immediate reference for target object
 * @param name      name of property to get
 * @return promise for the property value
 */
Q.get = function (object, key) {
    return Q(object).dispatch("get", [key]);
};

Promise.prototype.get = function (key) {
    return this.dispatch("get", [key]);
};

/**
 * Sets the value of a property in a future turn.
 * @param object    promise or immediate reference for object object
 * @param name      name of property to set
 * @param value     new value of property
 * @return promise for the return value
 */
Q.set = function (object, key, value) {
    return Q(object).dispatch("set", [key, value]);
};

Promise.prototype.set = function (key, value) {
    return this.dispatch("set", [key, value]);
};

/**
 * Deletes a property in a future turn.
 * @param object    promise or immediate reference for target object
 * @param name      name of property to delete
 * @return promise for the return value
 */
Q.del = // XXX legacy
Q["delete"] = function (object, key) {
    return Q(object).dispatch("delete", [key]);
};

Promise.prototype.del = // XXX legacy
Promise.prototype["delete"] = function (key) {
    return this.dispatch("delete", [key]);
};

/**
 * Invokes a method in a future turn.
 * @param object    promise or immediate reference for target object
 * @param name      name of method to invoke
 * @param value     a value to post, typically an array of
 *                  invocation arguments for promises that
 *                  are ultimately backed with `resolve` values,
 *                  as opposed to those backed with URLs
 *                  wherein the posted value can be any
 *                  JSON serializable object.
 * @return promise for the return value
 */
// bound locally because it is used by other methods
Q.mapply = // XXX As proposed by "Redsandro"
Q.post = function (object, name, args) {
    return Q(object).dispatch("post", [name, args]);
};

Promise.prototype.mapply = // XXX As proposed by "Redsandro"
Promise.prototype.post = function (name, args) {
    return this.dispatch("post", [name, args]);
};

/**
 * Invokes a method in a future turn.
 * @param object    promise or immediate reference for target object
 * @param name      name of method to invoke
 * @param ...args   array of invocation arguments
 * @return promise for the return value
 */
Q.send = // XXX Mark Miller's proposed parlance
Q.mcall = // XXX As proposed by "Redsandro"
Q.invoke = function (object, name /*...args*/) {
    return Q(object).dispatch("post", [name, array_slice(arguments, 2)]);
};

Promise.prototype.send = // XXX Mark Miller's proposed parlance
Promise.prototype.mcall = // XXX As proposed by "Redsandro"
Promise.prototype.invoke = function (name /*...args*/) {
    return this.dispatch("post", [name, array_slice(arguments, 1)]);
};

/**
 * Applies the promised function in a future turn.
 * @param object    promise or immediate reference for target function
 * @param args      array of application arguments
 */
Q.fapply = function (object, args) {
    return Q(object).dispatch("apply", [void 0, args]);
};

Promise.prototype.fapply = function (args) {
    return this.dispatch("apply", [void 0, args]);
};

/**
 * Calls the promised function in a future turn.
 * @param object    promise or immediate reference for target function
 * @param ...args   array of application arguments
 */
Q["try"] =
Q.fcall = function (object /* ...args*/) {
    return Q(object).dispatch("apply", [void 0, array_slice(arguments, 1)]);
};

Promise.prototype.fcall = function (/*...args*/) {
    return this.dispatch("apply", [void 0, array_slice(arguments)]);
};

/**
 * Binds the promised function, transforming return values into a fulfilled
 * promise and thrown errors into a rejected one.
 * @param object    promise or immediate reference for target function
 * @param ...args   array of application arguments
 */
Q.fbind = function (object /*...args*/) {
    var promise = Q(object);
    var args = array_slice(arguments, 1);
    return function fbound() {
        return promise.dispatch("apply", [
            this,
            args.concat(array_slice(arguments))
        ]);
    };
};
Promise.prototype.fbind = function (/*...args*/) {
    var promise = this;
    var args = array_slice(arguments);
    return function fbound() {
        return promise.dispatch("apply", [
            this,
            args.concat(array_slice(arguments))
        ]);
    };
};

/**
 * Requests the names of the owned properties of a promised
 * object in a future turn.
 * @param object    promise or immediate reference for target object
 * @return promise for the keys of the eventually settled object
 */
Q.keys = function (object) {
    return Q(object).dispatch("keys", []);
};

Promise.prototype.keys = function () {
    return this.dispatch("keys", []);
};

/**
 * Turns an array of promises into a promise for an array.  If any of
 * the promises gets rejected, the whole array is rejected immediately.
 * @param {Array*} an array (or promise for an array) of values (or
 * promises for values)
 * @returns a promise for an array of the corresponding values
 */
// By Mark Miller
// http://wiki.ecmascript.org/doku.php?id=strawman:concurrency&rev=1308776521#allfulfilled
Q.all = all;
function all(promises) {
    return when(promises, function (promises) {
        var countDown = 0;
        var deferred = defer();
        array_reduce(promises, function (undefined, promise, index) {
            var snapshot;
            if (
                isPromise(promise) &&
                (snapshot = promise.inspect()).state === "fulfilled"
            ) {
                promises[index] = snapshot.value;
            } else {
                ++countDown;
                when(
                    promise,
                    function (value) {
                        promises[index] = value;
                        if (--countDown === 0) {
                            deferred.resolve(promises);
                        }
                    },
                    deferred.reject,
                    function (progress) {
                        deferred.notify({ index: index, value: progress });
                    }
                );
            }
        }, void 0);
        if (countDown === 0) {
            deferred.resolve(promises);
        }
        return deferred.promise;
    });
}

Promise.prototype.all = function () {
    return all(this);
};

/**
 * Waits for all promises to be settled, either fulfilled or
 * rejected.  This is distinct from `all` since that would stop
 * waiting at the first rejection.  The promise returned by
 * `allResolved` will never be rejected.
 * @param promises a promise for an array (or an array) of promises
 * (or values)
 * @return a promise for an array of promises
 */
Q.allResolved = deprecate(allResolved, "allResolved", "allSettled");
function allResolved(promises) {
    return when(promises, function (promises) {
        promises = array_map(promises, Q);
        return when(all(array_map(promises, function (promise) {
            return when(promise, noop, noop);
        })), function () {
            return promises;
        });
    });
}

Promise.prototype.allResolved = function () {
    return allResolved(this);
};

/**
 * @see Promise#allSettled
 */
Q.allSettled = allSettled;
function allSettled(promises) {
    return Q(promises).allSettled();
}

/**
 * Turns an array of promises into a promise for an array of their states (as
 * returned by `inspect`) when they have all settled.
 * @param {Array[Any*]} values an array (or promise for an array) of values (or
 * promises for values)
 * @returns {Array[State]} an array of states for the respective values.
 */
Promise.prototype.allSettled = function () {
    return this.then(function (promises) {
        return all(array_map(promises, function (promise) {
            promise = Q(promise);
            function regardless() {
                return promise.inspect();
            }
            return promise.then(regardless, regardless);
        }));
    });
};

/**
 * Captures the failure of a promise, giving an oportunity to recover
 * with a callback.  If the given promise is fulfilled, the returned
 * promise is fulfilled.
 * @param {Any*} promise for something
 * @param {Function} callback to fulfill the returned promise if the
 * given promise is rejected
 * @returns a promise for the return value of the callback
 */
Q.fail = // XXX legacy
Q["catch"] = function (object, rejected) {
    return Q(object).then(void 0, rejected);
};

Promise.prototype.fail = // XXX legacy
Promise.prototype["catch"] = function (rejected) {
    return this.then(void 0, rejected);
};

/**
 * Attaches a listener that can respond to progress notifications from a
 * promise's originating deferred. This listener receives the exact arguments
 * passed to ``deferred.notify``.
 * @param {Any*} promise for something
 * @param {Function} callback to receive any progress notifications
 * @returns the given promise, unchanged
 */
Q.progress = progress;
function progress(object, progressed) {
    return Q(object).then(void 0, void 0, progressed);
}

Promise.prototype.progress = function (progressed) {
    return this.then(void 0, void 0, progressed);
};

/**
 * Provides an opportunity to observe the settling of a promise,
 * regardless of whether the promise is fulfilled or rejected.  Forwards
 * the resolution to the returned promise when the callback is done.
 * The callback can return a promise to defer completion.
 * @param {Any*} promise
 * @param {Function} callback to observe the resolution of the given
 * promise, takes no arguments.
 * @returns a promise for the resolution of the given promise when
 * ``fin`` is done.
 */
Q.fin = // XXX legacy
Q["finally"] = function (object, callback) {
    return Q(object)["finally"](callback);
};

Promise.prototype.fin = // XXX legacy
Promise.prototype["finally"] = function (callback) {
    callback = Q(callback);
    return this.then(function (value) {
        return callback.fcall().then(function () {
            return value;
        });
    }, function (reason) {
        // TODO attempt to recycle the rejection with "this".
        return callback.fcall().then(function () {
            throw reason;
        });
    });
};

/**
 * Terminates a chain of promises, forcing rejections to be
 * thrown as exceptions.
 * @param {Any*} promise at the end of a chain of promises
 * @returns nothing
 */
Q.done = function (object, fulfilled, rejected, progress) {
    return Q(object).done(fulfilled, rejected, progress);
};

Promise.prototype.done = function (fulfilled, rejected, progress) {
    var onUnhandledError = function (error) {
        // forward to a future turn so that ``when``
        // does not catch it and turn it into a rejection.
        nextTick(function () {
            makeStackTraceLong(error, promise);
            if (Q.onerror) {
                Q.onerror(error);
            } else {
                throw error;
            }
        });
    };

    // Avoid unnecessary `nextTick`ing via an unnecessary `when`.
    var promise = fulfilled || rejected || progress ?
        this.then(fulfilled, rejected, progress) :
        this;

    if (typeof process === "object" && process && process.domain) {
        onUnhandledError = process.domain.bind(onUnhandledError);
    }

    promise.then(void 0, onUnhandledError);
};

/**
 * Causes a promise to be rejected if it does not get fulfilled before
 * some milliseconds time out.
 * @param {Any*} promise
 * @param {Number} milliseconds timeout
 * @param {String} custom error message (optional)
 * @returns a promise for the resolution of the given promise if it is
 * fulfilled before the timeout, otherwise rejected.
 */
Q.timeout = function (object, ms, message) {
    return Q(object).timeout(ms, message);
};

Promise.prototype.timeout = function (ms, message) {
    var deferred = defer();
    var timeoutId = setTimeout(function () {
        deferred.reject(new Error(message || "Timed out after " + ms + " ms"));
    }, ms);

    this.then(function (value) {
        clearTimeout(timeoutId);
        deferred.resolve(value);
    }, function (exception) {
        clearTimeout(timeoutId);
        deferred.reject(exception);
    }, deferred.notify);

    return deferred.promise;
};

/**
 * Returns a promise for the given value (or promised value), some
 * milliseconds after it resolved. Passes rejections immediately.
 * @param {Any*} promise
 * @param {Number} milliseconds
 * @returns a promise for the resolution of the given promise after milliseconds
 * time has elapsed since the resolution of the given promise.
 * If the given promise rejects, that is passed immediately.
 */
Q.delay = function (object, timeout) {
    if (timeout === void 0) {
        timeout = object;
        object = void 0;
    }
    return Q(object).delay(timeout);
};

Promise.prototype.delay = function (timeout) {
    return this.then(function (value) {
        var deferred = defer();
        setTimeout(function () {
            deferred.resolve(value);
        }, timeout);
        return deferred.promise;
    });
};

/**
 * Passes a continuation to a Node function, which is called with the given
 * arguments provided as an array, and returns a promise.
 *
 *      Q.nfapply(FS.readFile, [__filename])
 *      .then(function (content) {
 *      })
 *
 */
Q.nfapply = function (callback, args) {
    return Q(callback).nfapply(args);
};

Promise.prototype.nfapply = function (args) {
    var deferred = defer();
    var nodeArgs = array_slice(args);
    nodeArgs.push(deferred.makeNodeResolver());
    this.fapply(nodeArgs).fail(deferred.reject);
    return deferred.promise;
};

/**
 * Passes a continuation to a Node function, which is called with the given
 * arguments provided individually, and returns a promise.
 * @example
 * Q.nfcall(FS.readFile, __filename)
 * .then(function (content) {
 * })
 *
 */
Q.nfcall = function (callback /*...args*/) {
    var args = array_slice(arguments, 1);
    return Q(callback).nfapply(args);
};

Promise.prototype.nfcall = function (/*...args*/) {
    var nodeArgs = array_slice(arguments);
    var deferred = defer();
    nodeArgs.push(deferred.makeNodeResolver());
    this.fapply(nodeArgs).fail(deferred.reject);
    return deferred.promise;
};

/**
 * Wraps a NodeJS continuation passing function and returns an equivalent
 * version that returns a promise.
 * @example
 * Q.nfbind(FS.readFile, __filename)("utf-8")
 * .then(console.log)
 * .done()
 */
Q.nfbind =
Q.denodeify = function (callback /*...args*/) {
    var baseArgs = array_slice(arguments, 1);
    return function () {
        var nodeArgs = baseArgs.concat(array_slice(arguments));
        var deferred = defer();
        nodeArgs.push(deferred.makeNodeResolver());
        Q(callback).fapply(nodeArgs).fail(deferred.reject);
        return deferred.promise;
    };
};

Promise.prototype.nfbind =
Promise.prototype.denodeify = function (/*...args*/) {
    var args = array_slice(arguments);
    args.unshift(this);
    return Q.denodeify.apply(void 0, args);
};

Q.nbind = function (callback, thisp /*...args*/) {
    var baseArgs = array_slice(arguments, 2);
    return function () {
        var nodeArgs = baseArgs.concat(array_slice(arguments));
        var deferred = defer();
        nodeArgs.push(deferred.makeNodeResolver());
        function bound() {
            return callback.apply(thisp, arguments);
        }
        Q(bound).fapply(nodeArgs).fail(deferred.reject);
        return deferred.promise;
    };
};

Promise.prototype.nbind = function (/*thisp, ...args*/) {
    var args = array_slice(arguments, 0);
    args.unshift(this);
    return Q.nbind.apply(void 0, args);
};

/**
 * Calls a method of a Node-style object that accepts a Node-style
 * callback with a given array of arguments, plus a provided callback.
 * @param object an object that has the named method
 * @param {String} name name of the method of object
 * @param {Array} args arguments to pass to the method; the callback
 * will be provided by Q and appended to these arguments.
 * @returns a promise for the value or error
 */
Q.nmapply = // XXX As proposed by "Redsandro"
Q.npost = function (object, name, args) {
    return Q(object).npost(name, args);
};

Promise.prototype.nmapply = // XXX As proposed by "Redsandro"
Promise.prototype.npost = function (name, args) {
    var nodeArgs = array_slice(args || []);
    var deferred = defer();
    nodeArgs.push(deferred.makeNodeResolver());
    this.dispatch("post", [name, nodeArgs]).fail(deferred.reject);
    return deferred.promise;
};

/**
 * Calls a method of a Node-style object that accepts a Node-style
 * callback, forwarding the given variadic arguments, plus a provided
 * callback argument.
 * @param object an object that has the named method
 * @param {String} name name of the method of object
 * @param ...args arguments to pass to the method; the callback will
 * be provided by Q and appended to these arguments.
 * @returns a promise for the value or error
 */
Q.nsend = // XXX Based on Mark Miller's proposed "send"
Q.nmcall = // XXX Based on "Redsandro's" proposal
Q.ninvoke = function (object, name /*...args*/) {
    var nodeArgs = array_slice(arguments, 2);
    var deferred = defer();
    nodeArgs.push(deferred.makeNodeResolver());
    Q(object).dispatch("post", [name, nodeArgs]).fail(deferred.reject);
    return deferred.promise;
};

Promise.prototype.nsend = // XXX Based on Mark Miller's proposed "send"
Promise.prototype.nmcall = // XXX Based on "Redsandro's" proposal
Promise.prototype.ninvoke = function (name /*...args*/) {
    var nodeArgs = array_slice(arguments, 1);
    var deferred = defer();
    nodeArgs.push(deferred.makeNodeResolver());
    this.dispatch("post", [name, nodeArgs]).fail(deferred.reject);
    return deferred.promise;
};

/**
 * If a function would like to support both Node continuation-passing-style and
 * promise-returning-style, it can end its internal promise chain with
 * `nodeify(nodeback)`, forwarding the optional nodeback argument.  If the user
 * elects to use a nodeback, the result will be sent there.  If they do not
 * pass a nodeback, they will receive the result promise.
 * @param object a result (or a promise for a result)
 * @param {Function} nodeback a Node.js-style callback
 * @returns either the promise or nothing
 */
Q.nodeify = nodeify;
function nodeify(object, nodeback) {
    return Q(object).nodeify(nodeback);
}

Promise.prototype.nodeify = function (nodeback) {
    if (nodeback) {
        this.then(function (value) {
            nextTick(function () {
                nodeback(null, value);
            });
        }, function (error) {
            nextTick(function () {
                nodeback(error);
            });
        });
    } else {
        return this;
    }
};

// All code before this point will be filtered from stack traces.
var qEndingLine = captureLine();

return Q;

});

//     pipe
//     (c) simonfan
//     pipe is licensed under the MIT terms.

define("__pipe/streams/pump",["require","exports","module","lodash","q"],function(t,i,e){function s(t,i,e){var s=n.map(e,function(e){return this._destSet(i,e,t)},this);return r.all(s)}var n=t("lodash"),r=t("q");e.exports=function(t,i,e){var h=this.destination;return r(this._srcGet(this.source,t)).then(n.bind(function(n){return!this.isCached(t,n)||e?s.call(this,n,h,i):void 0},this)).fail(function(t){throw t})}}),define("__pipe/streams/drain",["require","exports","module","lodash","q"],function(t,i,e){var s=t("lodash"),n=t("q");e.exports=function(t,i,e){return n(this._destGet(this.destination,i[0])).then(s.bind(function(i){return!this.isCached(t,i)||e?this._srcSet(this.source,t,i):void 0},this)).fail(function(t){throw t})}}),define("__pipe/streams/index",["require","exports","module","lodash","q","./pump","./drain"],function(t,i){function e(t,i,e){var r=n.defer();i=i?s.pick(this._map,i):this._map;var h=s.map(i,function(i,s){return t.call(this,s,i,e)},this);return n.all(h).done(function(){r.resolve()}),r.promise}var s=t("lodash"),n=t("q");i.pump=s.partial(e,t("./pump")),i.drain=s.partial(e,t("./drain")),i.inject=function(t,i){if(!this.source)throw new Error("No source for pipe");var e=s.map(t,function(t,e){return!this.isCached(e,t)||i?this._srcSet(this.source,e,t):void 0},this);return n.all(e).then(s.bind(function(){this.pump(void 0,!0)},this),function(t){throw t})}}),define("__pipe/mapping",["require","exports","module","lodash"],function(t,i){var e=t("lodash");i.map=function(){var t,i;return e.isString(arguments[0])?(t=arguments[0],i=arguments[1]||t,i=e.isArray(i)?i:[i],this._map[t]=i):e.isObject(arguments[0])&&e.each(arguments[0],function(t,i){this.map(i,t)},this),this},i.removeLine=function(t){return delete this._map[t],this}}),define("pipe",["require","exports","module","subject","lodash","./__pipe/streams/index","./__pipe/mapping"],function(t,i,e){var s=t("subject"),n=t("lodash"),r=["srcGet","srcSet","destGet","destSet"],h=e.exports=s({initialize:function(t,i){i=i||{},n.each(r,function(t){this[t]=i[t]||this[t]},this),this._srcGet=this.srcGet||this.get,this._srcSet=this.srcSet||this.set,this._destGet=this.destGet||this.get,this._destSet=this.destSet||this.set,i.cache!==!1&&this.clearCache(),i.source&&this.from(i.source),i.destination&&this.to(i.destination),this._map={},this.map(t)},get:function(t,i){return t[i]},set:function(t,i,e){return t[i]=e,t},clearCache:function(){return this.cache={},this},isCached:function(t,i){return this.cache?this.cache[t]!==i?(this.cache[t]=i,!1):!0:!1},to:function(t){return this.clearCache(),this.destination=t,this},from:function(t){return this.clearCache(),this.source=t,this}});h.assignProto(t("./__pipe/streams/index")).assignProto(t("./__pipe/mapping"))});
//     pump
//     (c) simonfan
//     pump is licensed under the MIT terms.

define("__pump/pipe",["require","exports","module","lodash"],function(i,e){var t=i("lodash");e.addPipe=function(){var i,e,s;t.isString(arguments[0])?(i=arguments[0],e=arguments[1],s=arguments[2]||{}):(i=t.uniqueId("pipe"),e=arguments[0],s=arguments[1]||{}),s.source=this.source;var n=this._buildPipe(e,s);return 0===t.size(this.pipes)&&this.setDrainingPipe(i),this.pipes[i]=n,n},e.pipe=e.addPipe,e.removePipe=function(i,e){return t.isFunction(i)?t.each(this.pipes,function(t,s){i.call(e,t,s)&&delete this.pipes[s]},this):t.isArray(i)?t.each(i,function(e,s){t.contains(i,s)&&delete this.pipes[s]},this):delete this.pipes[i],this},e.unpipe=e.removePipe}),define("__pump/streams/pump",["require","exports","module","lodash","q"],function(i,e){var t=i("lodash"),s=i("q");e.pump=function(i,e,n){var r;i?(i=t.isArray(i)?i:[i],r=t.pick(this.pipes,i)):r=this.pipes;var p=t.map(r,function(i){return i.pump(e,n)});return s.all(p)}}),define("__pump/streams/drain",["require","exports","module","lodash","q"],function(i,e){function t(i){return s.isString(this.drainingPipe)?this.pipes[this.drainingPipe]:s.isFunction(this.drainingPipe)?this.drainingPipe(i):s.isObject(this.drainingPipe)?this.drainingPipe:void 0}{var s=i("lodash");i("q")}e.drainingPipe=void 0,e.drain=function(i,e,s){var n=this.pipes[i]||t.call(this,e);if(!n)throw new Error('Pipe "'+i+'" not found.');return n.drain(e,s)},e.setDrainingPipe=function(i){return this.drainingPipe=i,this}}),define("__pump/streams/inject",["require","exports","module","lodash","q"],function(i,e){var t=i("lodash"),s=i("q");e.inject=function(i,e){var n=this.srcSet||this.set;if(!this.source)throw new Error("No source for pump");var r=t.map(i,function(i,e){return n.call(this,this.source,e,i)},this);return s.all(r).then(t.bind(function(){this.pump(e)},this)).fail(function(i){throw i})}}),define("pump",["require","exports","module","subject","lodash","pipe","./__pump/pipe","./__pump/streams/pump","./__pump/streams/drain","./__pump/streams/inject"],function(i,e,t){var s=i("subject"),n=i("lodash"),r=i("pipe"),p=["srcGet","srcSet","destGet","destSet"],u=t.exports=s({initialize:function(i,e){this.source=i,this._buildPipe=r.extend(n.pick(this,p)),this.pipes={},n.each(e,function(i,e){this.pipe(e,i)},this)},from:function(i){return this.source=i,n.each(this.pipes,function(e){e.from(i)}),this},get:function(i,e){return i[e]},set:function(i,e,t){return i[e]=t,this}});u.assignProto(i("./__pump/pipe")).assignProto(i("./__pump/streams/pump")).assignProto(i("./__pump/streams/drain")).assignProto(i("./__pump/streams/inject"))});
//     jquery-meta-data
//     (c) simonfan
//     jquery-meta-data is licensed under the MIT terms.

//     jquery-pump
//     (c) simonfan
//     jquery-pump is licensed under the MIT terms.

define("__jquery-meta-data/helpers",["require","exports","module","jquery","lodash"],function(e,t){e("jquery"),e("lodash"),t.buildPrefixRegExp=function(e){return new RegExp("^"+e+"([A-Z$_].*$)")},t.lowercaseFirst=function(e){return e.charAt(0).toLowerCase()+e.slice(1)},t.uppercaseFirst=function(e){return e.charAt(0).toUpperCase()+e.slice(1)},t.fullKey=function(e,r){return e?e+t.uppercaseFirst(r):r}}),define("__jquery-meta-data/read",["require","exports","module","lodash","./helpers"],function(e,t){function r(e){return e}var a=e("lodash"),n=e("./helpers");t.all=function(e,t){var i=e.data(),u=t.parse||r;if(t.prefix){var s=n.buildPrefixRegExp(t.prefix);return a.transform(i,function(r,a,i){var o=i.match(s);if(o){var p=n.lowercaseFirst(o[1]);a=u(a,p,i),t.replace&&e.data(i,a),r[p]=a}})}return a.mapValues(i,function(e,t){return u(e,t,t)})},t.single=function(e,t,r){var a=n.fullKey(t.prefix,r),i=e.data(a);return t.parse&&(i=t.parse(i,r,a),t.replace&&e.data(a,i)),i}}),define("__jquery-meta-data/set",["require","exports","module","lodash","./helpers"],function(e,t){var r=e("lodash"),a=e("./helpers");t.single=function(e,t,r,n){var i=a.fullKey(t.prefix,r);n=t.stringify?t.stringify(n,r,i):n,e.data(i,n)},t.multiple=function(e,a,n){r.each(n,function(r,n){t.single(e,a,n,r)})}}),define("jquery-meta-data",["require","exports","module","jquery","lodash","./__jquery-meta-data/read","./__jquery-meta-data/set"],function(e){var t=e("jquery"),r=e("lodash"),a=e("./__jquery-meta-data/read"),n=e("./__jquery-meta-data/set"),i={};t.metaData=function(){r.isObject(arguments[0])?r.assign(i,arguments[0]):i[arguments[0]]=arguments[1]},t.prototype.metaData=function(e){return e=r.isString(e)?i[e]:e,1===arguments.length?a.all(this,e):2!==arguments.length?(n.single(this,e,arguments[1],arguments[2]),this):r.isString(arguments[1])?a.single(this,e,arguments[1]):r.isObject(arguments[1])?(n.multiple(this,e,arguments[1]),this):void 0}}),define("__jquery-pump/parse-method-string",["require","exports","module"],function(e,t,r){var a=/\s*:\s*/g,n=/(?:(.+?)\|)?(.+?)$/;r.exports=function(e){var t=e.match(n),r=t[2].split(a),i=r.shift();return{selector:t[1],method:i,args:r}}}),define("__jquery-pump/getter-setter",["require","exports","module","jquery","./parse-method-string"],function(e,t){var r=(e("jquery"),e("./parse-method-string"));t.destGet=function(e,t){var a=r(t);return e[a.method].apply(e,a.args)},t.destSet=function(e,t,a){var n=r(t),i=n.selector,u=n.args;return u.push(a),e=i?e.find(i):e,e[n.method].apply(e,u)}}),define("jquery-pump",["require","exports","module","pump","jquery","jquery-meta-data","./__jquery-pump/getter-setter"],function(e,t,r){var a=e("pump"),n=e("jquery"),i=(e("jquery-meta-data"),r.exports=a.extend({initialize:function(e,t){t=t||{};var r=t.destination;_.defaults(t,this.metaDataOptions),_.defaults(t,{prefix:this.prefix}),a.prototype.initialize.call(this,e),_.each(r,function(e){var r=n(e),a=r.metaData(t),i=this.pipe(a);i.to(r)},this)},prefix:"pipe",metaDataOptions:{parse:function(e){return e.split(/\s*,\s*/g)}}}));i.assignProto(e("./__jquery-pump/getter-setter")),n.prototype.pump=function(e,t){return t=t||{},t.destination=this,i(e,t)}});

define('__bb-model-view/model-pump',['require','exports','module','jquery-pump','lodash'],function (require, exports, module) {
	

	var jqPump = require('jquery-pump'),
		_      = require('lodash');

	function _echo(v) {
		return v;
	}

	/**
	 * get parser or stringifier
	 * @private
	 * @return {[type]} [description]
	 */
	function _retrieveFunction(hash, property) {

		if (!hash) {
			return _echo;
		}

		// get the func for the property
		var func = hash[property];

		if (!func) {
			return _echo;
		}

		// if func happens to be a string, get the referred func.
		return _.isFunction(func) ? func : hash[func];
	}

	exports.modelPump = jqPump.extend({


		/**
		 * Initializes pump and picks strngifiers and parser options.
		 *
		 * @param  {[type]} source  [description]
		 * @param  {[type]} options [description]
		 * @return {[type]}         [description]
		 */
		initialize: function initializeModelPump(source, options) {


			// bind methods
			_.bindAll(this, ['srcGet', 'srcSet']);

			// initialize pump
			jqPump.prototype.initialize.call(this, source, options);
			// set the bbmvID as data attribute to the destination els.
			// that is for the html->model binding



			// pick strngifier and parser methods
			options = options || {};
			_.each(['stringify', 'stringifiers', 'parsers', 'parse'], function (prop) {
				this[prop] = options[prop] || this[prop];
			}, this);



			var pump = this;

			_.each(this.pipes, function (pipe, pipeId) {
				var $el = pipe.destination;

				// set bbmvID
				$el.data(this.bbmvIDAttribute, pipeId);
			}, this);
		},

		/**
		 * The name of the data attribute that should store the uuid for element.
		 * Used to listen to changes.
		 *
		 * @property bbmvID description]
		 * @type {String}
		 */
		bbmvIDAttribute: 'bbmvID',

		/**
		 * Method specified by pump API
		 * @param  {[type]} model    [description]
		 * @param  {[type]} property [description]
		 * @return {[type]}          [description]
		 */
		srcGet: function getFromModel(model, property) {
			var value = model.get(property);

			return this.stringify(property, value);
		},

		/**
		 * Method specified by pump API
		 * @param  {[type]} model    [description]
		 * @param  {[type]} property [description]
		 * @param  {[type]} value    [description]
		 * @return {[type]}          [description]
		 */
		srcSet: function setToModel(model, property, value) {

			var value = model.set(property, value);

			return this.parse(property, value);
		},

		/**
		 * Hash to hold stringifiers.
		 * @type {Object}
		 */
		stringifiers: {},
		stringify: function stringify(property, value) {


			var stringifier = _retrieveFunction(this.stringifiers, property);

			return stringifier(value);
		},

		parsers: {},
		parse: function parse(property, value) {

			var parser = _retrieveFunction(this.parsers, property);

			return parser(value);
		},



	});

});

define('__bb-model-view/elements',['require','exports','module'],function (require, exports, module) {
	

	/**
	 * The string by which binding ddata attributes are prefixed.
	 * data-bind-somekey="method"
	 *
	 * @type {String}
	 */
	exports.prefix = 'bind';

	/**
	 * Method that returns ALL jquery elements that should
	 * have any data-binding.
	 *
	 * @return {[type]} [description]
	 */
	exports.boundElements = function boundElements() {
		// $el.add() creates a NEW SELECTION :)
		// it does not add to the existing jq object.
		var $boundChildElements = this.$el.find(':data-prefix(' + this.prefix + ')');
		return this.$el.add($boundChildElements);
	};


});

//     bb-model-view
//     (c) simonfan
//     bb-model-view is licensed under the MIT terms.

/**
 * The modeld is the object that links together $els and models.
 *
 * @module bb-model-view
 */

/* jshint ignore:start */

/* jshint ignore:end */

define('bb-model-view',['require','exports','module','jquery-selector-data-prefix','lodash','lowercase-backbone','jquery-value','./__bb-model-view/update','./__bb-model-view/model-pump','./__bb-model-view/elements'],function (require, exports, module) {
	


	// :data-prefix(prefix) selector
	require('jquery-selector-data-prefix');

	var _        = require('lodash'),
		backbone = require('lowercase-backbone'),
		jqValue  = require('jquery-value');

	/**
	 * Name of parser and stringifier option names.
	 * @type {Array}
	 */
	var pumpOptionNames = ['parse', 'parsers', 'stringify', 'stringifiers', 'prefix'];

	/**
	 * The constructor for the bbModelView object.
	 *
	 * @method bbModelView
	 * @constructor
	 * @param extensions {Object}
	 *     @param $el {Object}
	 *         The $el that owns the bbModelView object
	 *     @param map {Object}
	 *         Map that links selectors to attributes
	 *     @param [model] {Object}
	 *         Optionally provide a model that will initially fill the $el.
	 */
	var bbModelView = module.exports = backbone.view.extend({

		initialize: function initialize() {
			// initialize basic backbone view
			backbone.view.prototype.initialize.apply(this, arguments);

			this.initializeModelView.apply(this, arguments);
		},

		/**
		 * Holds initialization logic for modelmodeld.
		 *
		 * @method initializeModelView
		 * @param options {Object}
		 */
		initializeModelView: function initializeModelView(options) {
			if (!this.model) { throw new Error('No model set for model view.'); }
			if (!this.$el) { throw new Error('No el set on model view.'); }

			// [1] find all elements that have bindings defined.
			var $boundElements = this.boundElements();

			// [2] create a jquery pump with those elements.
			// [2.1] get stringifiers and parsers
			var pumpOptions = _.pick(options, pumpOptionNames);
			_.defaults(pumpOptions, _.pick(this, pumpOptionNames));

			// [2.2] set destination
			pumpOptions.destination = $boundElements;

			// [2.2] effectively create the pump
			this.pump = this.modelPump(this.model, pumpOptions);

			// [3] listen to change events on $boundElements
			$boundElements.filter(':input').on('change', _.bind(function (e) {

				var pipeId = $(e.target).data(this.pump.bbmvIDAttribute);

				this.pump.drain(pipeId);
			}, this));


			// [4] listen to change events on the model
			this.model.on('change', _.bind(function (model) {

				this.pump.pump();
			}, this));

			// [3] initialize view by pumping the model data.
			this.updateView();
		},
	});

	bbModelView
		.assignProto(require('./__bb-model-view/update'))
		.assignProto(require('./__bb-model-view/model-pump'))
		.assignProto(require('./__bb-model-view/elements'));
});

