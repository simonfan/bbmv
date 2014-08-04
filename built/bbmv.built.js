//     bbmv
//     (c) simonfan
//     bbmv is licensed under the MIT terms.

define("bbmv/aux/general",["require","exports","module","lodash"],function(e,t){var n=e("lodash");t.camelCase=function(e){return e.replace(/[-_\s]+(.)?/g,function(e,t){return t?t.toUpperCase():""})};var i=/^\s+|\s+$/g;t.trim=function(e){return null==e?"":String.prototype.trim?e.trim():String(e).replace(i,"")},t.buildPrefixRegExp=function(e){return e=n.isArray(e)?e:[e],new RegExp("^(?:"+e.join("|")+")([A-Z$_].*$)?")},t.lowercaseFirst=function(e){return e.charAt(0).toLowerCase()+e.slice(1)},t.uppercaseFirst=function(e){return e.charAt(0).toUpperCase()+e.slice(1)}}),define("bbmv/aux/parse",["require","exports","module","lodash","bbmv/aux/index"],function(e,t){function n(e){var t={},n=e.split(u);return 2===n.length?(t.method=o.trim(n[1]),t.selector=o.trim(n[0])):t.method=o.trim(e),t}function i(e){if(a[e])return a[e];var t={},i=e.replace(s,"").match(d),u=i[1];return r.assign(t,n(u)),t.args=i[2]?i[2].split(c):[],t.args.length>0&&(t.args[0]=o.trim(t.args[0]),t.args[t.args.length-1]=o.trim(r.last(t.args))),a[e]=t,t}var r=e("lodash"),o=e("bbmv/aux/index"),a={},s=/\n/g,u=/\s*->\s*/;t.parseMethodString=n;var d=/\s*(.*?)\s*(?:\(\s*(.*)\s*\)\s*(?!->))?$/,c=/\s*,\s*/g;t.parseInvocationString=i}),define("bbmv/aux/index",["require","exports","module","lodash","bbmv/aux/general","bbmv/aux/parse"],function(e,t){var n=e("lodash");n.assign(t,e("bbmv/aux/general")),n.assign(t,e("bbmv/aux/parse")),t.getDefaultDOMEvent=function(e,t){return n.find(t,function(t,n){return e.is(n)})}}),define("bbmv/directives/data-bind",["require","exports","module","lodash","bbmv/aux/index"],function(e,t){var n=(e("lodash"),e("bbmv/aux/index"));t["in"]=function(e,t){var i=this.pipe(e);i.map(t,{direction:"from"});var r=e.data(this.bindingEventAttribute)||n.getDefaultDOMEvent(e,this.defaultDOMEvents);r&&e.on(r,function(){i.drain({force:!0})})},t.out=function(e,t){var n=this.pipe(e);n.map(t,{direction:"to"})},t.dual=t[""]=function(e,t){var i=this.pipe(e);i.map(t,{direction:"both"});var r=e.data(this.bindingEventAttribute)||n.getDefaultDOMEvent(e,this.defaultDOMEvents);r&&e.on(r,function(){i.drain({force:!0})})}}),define("bbmv/directives/on",["require","exports","module","lodash"],function(e,t){var n=e("lodash"),i=/\s*=>\s*/;t.on=function(e,t){var r=this;if(n.isObject(t))n.each(t,function(t,n){e.on(n,function(){r.execInvocationString(t,e)})},this);else{var o=t.split(i),a=o[0],s=o[1];e.on(a,function(){r.execInvocationString(s,e)})}}}),define("bbmv/directives/index",["require","exports","module","lodash","jquery","bbmv/directives/data-bind","bbmv/directives/on"],function(e,t){{var n=e("lodash");e("jquery")}t.defaultDOMEvents={":text":"keyup",'input[type="checkbox"],input[type="radio"]':"change",":button":"click"};var i={};t.directives=i,n.assign(i,e("bbmv/directives/data-bind")),n.assign(i,e("bbmv/directives/on"))}),define("bbmv/methods/aux",["require","exports","module","lodash","jquery","bbmv/aux/index"],function(e,t){var n=e("lodash"),i=(e("jquery"),e("bbmv/aux/index"));t.execInvocationString=function(e,t){var r=i.parseInvocationString(e);t=r.selector?t.find(r.selector):t;var o=n.toArray(arguments).slice(2).concat(r.args);return o.unshift(t),this[r.method].apply(this,o)}}),define("bbmv/methods/if",["require","exports","module","lodash","bbmv/aux/index"],function(e,t){function n(e,t){var n=e.match(o),i=n[1]||"=";return e=n[2],r[i](e,t)}var i=e("lodash"),r=(e("bbmv/aux/index"),{">":function(e,t){return parseFloat(t)>parseFloat(e)},">=":function(e,t){return parseFloat(t)>=parseFloat(e)},"<":function(e,t){return parseFloat(t)<parseFloat(e)},"<=":function(e,t){return parseFloat(t)<=parseFloat(e)},"s>":function(e,t){return t>e},"s>=":function(e,t){return t>=e},"s<":function(e,t){return e>t},"s<=":function(e,t){return e>=t},"n=":function(e,t){return parseFloat(t)==parseFloat(e)},"=":function(e,t){return t==e},"==":function(e,t){return t===e},"!":function(e,t){return t!=e},"!=":function(e,t){return t!==e},"#":function(e,t){return!i.isUndefined(t)},"!#":function(e,t){return i.isUndefined(t)}}),o=/^(>=|>|<=|<|s>=|s>|s<=|s<|n=|==|=|#|!#|!=|!)?\s*(.*)\s*/,a=/\s*=>\s*/;t["if"]=function(e,t){var r=i.toArray(arguments).slice(2);i.any(r,function(i){var r=i.split(a);return 1===r.length?(this.execInvocationString(r[0],e,t),!0):n(r[0],t)?(this.execInvocationString(r[1],e,t),!0):!1},this)}}),define("bbmv/methods/model",["require","exports","module"],function(e,t){t.save=function(){return this.model.save()},t.set=function(e,t,n){return this.model.set(t,n)},t.fetch=function(){return this.model.fetch()},t.clear=function(){return this.model.clear()},t.destroy=function(){return this.model.destroy()},t.validate=function(){return this.model.validate()}}),define("bbmv/methods/jquery/native",["require","exports","module","lodash"],function(e,t){var n=e("lodash"),i=["addClass","after","append","height","html","offset","prepend","scrollLeft","scrollTop","toggleClass","val","width"];n.each(i,function(e){t[e]=function(t){return 1===arguments.length?t[e]():2===arguments.length?t[e](arguments[1]):void 0}});var r=["attr","css","data","prop"];n.each(r,function(e){t[e]=function(t){return 2===arguments.length?t[e](arguments[1]):3===arguments.length?t[e](arguments[2],arguments[1]):void 0}})}),define("bbmv/methods/jquery/extensions/value",["require","exports","module","jquery"],function(e,t){function n(e){var t=e.prop("tagName"),n=o[t]||o["default"];return n(e)}function i(e,t){return e.each(function(e,n){var i=r(n),o=i.prop("tagName"),s=a[o]||a["default"];s(i,t)}),e}var r=e("jquery"),o={"default":function(e){return e.val()},DIV:function(e){return e.html()},INPUT:function(e){var t=e.prop("type");return"checkbox"===t?e.filter(":checked").map(function(){return r(this).val()}).get():"radio"===t?e.filter(":checked").val():e.val()}},a={"default":function(e,t){return e.html(t)},INPUT:function(e,t){var n=e.prop("type");return("checkbox"===n||"radio"===n)&&(t=r.isArray(t)?t:[t]),e.val(t)},SELECT:function(e,t){return e.val(t)},IMG:function(e,t){return e.prop("src",t).trigger("change",t)},TEXTAREA:function(e,t){return e.val(t)}};t.value=function(e,t){return 1===arguments.length?n(e):2===arguments.length?i(e,t):void 0}}),define("bbmv/pipe/aux",["require","exports","module","lodash","bbmv/aux/index"],function(e,t){var n=e("lodash"),i=e("bbmv/aux/index"),r={},o=/\s*;\s*/,a=/\s*\|\s*/,s=/\n/g;t.parseDestStr=function(e){if(r[e])return r[e];var t=e.replace(s,"").split(o),u=n.map(t,function(e){var t={},n=e.split(a);return 2===n.length?(t.format=i.parseInvocationString(n[0]),t.invocationString=n[1]):t.invocationString=n[0],t});return r[e]=u,u}}),define("bbmv/pipe/dest-get",["require","exports","module","jquery-value","lodash","bbmv/aux/index","bbmv/pipe/aux"],function(e,t,n){var i=(e("jquery-value"),e("lodash")),r=(e("bbmv/aux/index"),e("bbmv/pipe/aux"));n.exports=function(e,t){var n=this.bbmvInstance,o=r.parseDestStr(t)[0],a=n.execInvocationString(o.invocationString,e),s=o.format;if(s){var u=n[s.method];if(u=i.isFunction(u)?u:u["in"],!u)throw new Error("[bbmv|destGet] "+s.method+" could not be found.");var d=i.clone(s.args);d.push(a),a=u.apply(n,d)}return a}}),define("bbmv/pipe/dest-set",["require","exports","module","jquery-value","lodash","bbmv/aux/index","bbmv/pipe/aux"],function(e,t,n){function i(e,t,n,i){if(!t.is(":focus")){var o=n.format;if(o){var a=e[o.method];if(a=r.isFunction(a)?a:a.out,!a)throw new Error("[bbmv|destGet/destSet] "+o.method+" could not be found.");var s=r.clone(o.args);s.push(i),i=a.apply(e,s)}return e.execInvocationString(n.invocationString,t,i)}}var r=(e("jquery-value"),e("lodash")),o=(e("bbmv/aux/index"),e("bbmv/pipe/aux"));n.exports=function(e,t,n){var a=this.bbmvInstance,s=o.parseDestStr(t);r.each(s,function(t){return i(a,e,t,n)},this)}}),define("bbmv/pipe/index",["require","exports","module","pipe","lodash","bbmv/aux/index","bbmv/pipe/dest-get","bbmv/pipe/dest-set"],function(e,t,n){var i=e("pipe"),r=e("lodash"),o=(e("bbmv/aux/index"),i.prototype.to,i.prototype.from,i.prototype.mapSingle,i.prototype.initialize),a=n.exports=i.extend({initialize:function(e,t,n,i){o.apply(this,r.toArray(arguments)),i=i||{},r.each(["namespace","bbmvInstance"],function(e){this[e]=i[e]||this[e]},this)},srcGet:function(e,t){return e.get(t)},srcSet:function(e,t,n){return e.set(t,n)}});a.assignProto({destGet:e("bbmv/pipe/dest-get"),destSet:e("bbmv/pipe/dest-set")})}),define("bbmv/methods/pipe",["require","exports","module","bbmv/pipe/index"],function(e,t){var n=e("bbmv/pipe/index");t.pipe=function(e,t,i){var r,o=e.data(this.pipeIdAttr);return o&&this.pipes[o]?r=this.pipes[o]:(o=_.uniqueId(this.pipeIdAttr),i=i||{},i.bbmvInstance=this,r=this.pipes[o]=n(this.model,e,t,i),e.data(this.pipeIdAttr,o)),r},t.map=t.pipe,t.pump=function(){return _.each(this.pipes,function(e){e.pump()}),this},t.drain=function(e,t,n){return this.pipe(e).drain(t,n),this}}),define("bbmv",["require","exports","module","jquery-selector-data-prefix","lodash","jquery","bbdv","lowercase-backbone","bbmv/aux/index","bbmv/directives/index","bbmv/methods/aux","bbmv/methods/if","bbmv/methods/model","bbmv/methods/jquery/native","bbmv/methods/jquery/extensions/value","bbmv/methods/pipe"],function(e,t,n){function i(){return["bbdv",this.namespace,this.cid,"id"].join("_")}e("jquery-selector-data-prefix");var r=e("lodash"),o=(e("jquery"),e("bbdv")),a=(e("lowercase-backbone"),e("bbmv/aux/index")),s=n.exports=o.extend({initialize:function(e){if(e=e||{},r.each(["namespace","binding","event","bindingEventAttribute"],function(t){this[t]=e[t]||this[t]},this),this.namespace=e.namespace||this.namespace,this.pipeIdAttr=i.call(this),this.pipes={},o.prototype.initialize.call(this,e),!this.model)throw new Error("No model set for model view.");if(!this.$el)throw new Error("No el set on model view.");this.model.on(this.event,function(){this.pump()},this),this.pump()},event:"change",bindingEventAttribute:"binding-event",namespace:"bind",selector:function(e){return":data-prefix("+a.camelCase(e)+")"}});s.assignProto(e("bbmv/directives/index")).assignProto(e("bbmv/methods/aux")).assignProto(e("bbmv/methods/if")).assignProto(e("bbmv/methods/model")).assignProto(e("bbmv/methods/jquery/native")).assignProto(e("bbmv/methods/jquery/extensions/value")).assignProto(e("bbmv/methods/pipe"))});