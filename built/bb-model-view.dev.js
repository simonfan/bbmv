//     subject
//     (c) simonfan
//     subject is licensed under the MIT terms.

define("__subject/private/assign",["require","exports","module","lodash"],function(e,t,r){function s(e,t,r){if(n.defaults(r,o),!n.isArray(t))throw new Error("Currently subject.assign does not accept non-array properties for accessor assignment.");n.each(t,function(t){var s=n.extend({},r);s.get&&(s.get=n.partial(s.get,t)),s.set&&(s.set=n.partial(s.set,t)),Object.defineProperty(e,t,s)})}function i(e,t,r){n.defaults(r,a),n.each(t,function(t,s){var i=n.assign({value:t},r);Object.defineProperty(e,s,i)})}var n=e("lodash"),o={configurable:!0,enumerable:!0},a=n.extend({writable:!0},o);r.exports=function(e,t,r){return r?r.get||r.set?s(e,t,r):i(e,t,r):n.assign(e,t),e}}),define("__subject/public/assign-proto",["require","exports","module","lodash","../private/assign"],function(e,t,r){var s=e("lodash"),i=e("../private/assign");r.exports=function(){var e,t;return s.isObject(arguments[0])?(e=arguments[0],t=arguments[1]):s.isString(arguments[0])&&(e={},e[arguments[0]]=arguments[1],t=arguments[2]),i(this.prototype,e,t),this}}),define("__subject/public/proto-merge",["require","exports","module","lodash","../private/assign"],function(e,t,r){var s=e("lodash"),i=e("../private/assign");r.exports=function(){var e,t,r;if(s.isString(arguments[0])){var n=arguments[0];e=this.prototype[n],t=arguments[1],r=arguments[2],this.prototype[n]=i(s.create(e),t,r)}else r=arguments[1],s.each(arguments[0],s.bind(function(e,t){this.protoMerge(t,e,r)},this));return this}}),define("__subject/public/extend",["require","exports","module","lodash","../private/assign"],function(e,t,r){var s=e("lodash"),i=e("../private/assign");r.exports=function(e,t){var r,n=this;return r=function(){var e=s.create(r.prototype);return e.initialize.apply(e,arguments),e},i(r,s.pick(n,n.staticProperties),{enumerable:!1}),r.prototype=s.create(n.prototype),r.assignProto(e,t),i(r.prototype,{constructor:r,__super__:n.prototype},{enumerable:!1}),r}}),define("subject",["require","exports","module","lodash","./__subject/private/assign","./__subject/public/assign-proto","./__subject/public/assign-proto","./__subject/public/proto-merge","./__subject/public/extend"],function(e,t,r){var s=e("lodash"),i=e("./__subject/private/assign"),n=function(){};n.prototype=i({},{initialize:function(){}},{enumerable:!1}),i(n,{staticProperties:["proto","assignProto","protoMerge","staticProperties","assignStatic","extend"],assignStatic:function(e,t){return this.staticProperties=s.union(this.staticProperties,s.keys(e)),i(this,e,t)},assignProto:e("./__subject/public/assign-proto"),proto:e("./__subject/public/assign-proto"),protoMerge:e("./__subject/public/proto-merge"),extend:e("./__subject/public/extend")},{enumerable:!1}),r.exports=s.bind(n.extend,n);var o={assign:i};i(r.exports,o,{enumerable:!1,writable:!1,configurable:!1})});
//     lowercase-backbone
//     (c) simonfan
//     lowercase-backbone is licensed under the MIT terms.

define("lowercase-backbone",["require","exports","module","subject","backbone","lodash"],function(e,i,t){var o=e("subject"),n=e("backbone"),s=e("lodash"),a=t.exports={};a.model=o(n.Model.prototype),a.model.proto({initialize:function(){this.initializeBackboneModel.apply(this,arguments)},initializeBackboneModel:function(e,i){var t=e||{};i||(i={}),this.cid=s.uniqueId("c"),this.attributes={},i.collection&&(this.collection=i.collection),i.parse&&(t=this.parse(t,i)||{}),t=s.defaults({},t,s.result(this,"defaults")),this.set(t,i),this.changed={}}}),a.collection=o(n.Collection.prototype),a.collection.proto({initialize:function(){this.initializeBackboneCollection.apply(this,arguments)},initializeBackboneCollection:function(e,i){i||(i={}),i.model&&(this.model=i.model),void 0!==i.comparator&&(this.comparator=i.comparator),this._reset(),e&&this.reset(e,s.extend({silent:!0},i))}});var l=["model","collection","el","id","attributes","className","tagName","events"];a.view=o(n.View.prototype);var l=["model","collection","el","id","attributes","className","tagName","events"];a.view.proto({initialize:function(){this.initializeBackboneView.apply(this,arguments)},initializeBackboneView:function(e){this.cid=s.uniqueId("view"),e||(e={}),s.extend(this,s.pick(e,l)),this._ensureElement(),this.delegateEvents()}}),a.router=o(n.Router.prototype),a.router.proto({initialize:function(){this.initializeBackboneRouter.apply(this,arguments)},initializeBackboneRouter:function(e){e||(e={}),e.routes&&(this.routes=e.routes),this._bindRoutes()}}),a.history=n.history});
//     jquery-value
//     (c) simonfan
//     jquery-value is licensed under the MIT terms.

define("__jquery-value/get",["require","exports","module","jquery"],function(e,r,t){var u=e("jquery"),n={"default":function(e){return e.val()},DIV:function(e){return e.html()},INPUT:function(e){var r=e.prop("type");return"checkbox"===r?e.filter(":checked").map(function(){return u(this).val()}).get():"radio"===r?e.filter(":checked").val():e.val()}};t.exports=function(e){var r=e.prop("tagName"),t=n[r]||n["default"];return t(e)}}),define("__jquery-value/set",["require","exports","module","jquery"],function(e,r,t){var u=e("jquery"),n={"default":function(e,r){return e.html(r)},INPUT:function(e,r){var t=e.prop("type");return("checkbox"===t||"radio"===t)&&(r=u.isArray(r)?r:[r]),e.val(r)},SELECT:function(e,r){return e.val(r)},IMG:function(e,r){return e.prop("src",r).trigger("change",r)},TEXTAREA:function(e,r){return e.val(r)}};t.exports=function(e,r){return e.each(function(e,t){var a=u(t),o=a.prop("tagName"),i=n[o]||n["default"];i(a,r)}),e}}),define("jquery-value",["require","exports","module","jquery","./__jquery-value/get","./__jquery-value/set"],function(e,r,t){var u=e("jquery"),n=e("./__jquery-value/get"),a=e("./__jquery-value/set"),o=t.exports=function(e,r){return 1===arguments.length?n(e):2===arguments.length?a(e,r):void 0};u.prototype.value=function(e){return 0===arguments.length?o(this):o(this,e)}});
define('__bb-model-view/bind',['require','exports','module','lodash','lowercase-backbone','jquery-value'],function (require, exports, module) {
	


	var _        = require('lodash'),
		backbone = require('lowercase-backbone'),
		jqValue  = require('jquery-value');


	exports.DOMToModel = function bindDOMToModel($boundElements) {

		$boundElements.on('change', _.bind(function (e) {

			var $target = $(e.target);

			this.updateModel($target);

			return false;
		}, this));
	};


	exports.modelToDOM = function bindModelToDOM(model) {
	// [4] listen to change events on the model
		model.on('change', _.bind(function (model) {

			this.updateView();

		}, this));
	};
});

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

//     pipe
//     (c) simonfan
//     pipe is licensed under the MIT terms.

define("__pipe/streams/pump",["require","exports","module","lodash","q"],function(t,i,e){function s(t,i,e){var s=n.map(e,function(e){return this._destSet(i,e,t)},this);return r.all(s)}var n=t("lodash"),r=t("q");e.exports=function(t,i,e){var h=this.destination;return r(this._srcGet(this.source,t)).then(n.bind(function(n){return!this.isCached(t,n)||e?s.call(this,n,h,i):void 0},this)).fail(function(t){throw t})}}),define("__pipe/streams/drain",["require","exports","module","lodash","q"],function(t,i,e){var s=t("lodash"),n=t("q");e.exports=function(t,i,e){return n(this._destGet(this.destination,i[0])).then(s.bind(function(i){return!this.isCached(t,i)||e?this._srcSet(this.source,t,i):void 0},this)).fail(function(t){throw t})}}),define("__pipe/streams/index",["require","exports","module","lodash","q","./pump","./drain"],function(t,i){function e(t,i,e){var r=n.defer();i=i?s.pick(this._map,i):this._map;var h=s.map(i,function(i,s){return t.call(this,s,i,e)},this);return n.all(h).done(function(){r.resolve()}),r.promise}var s=t("lodash"),n=t("q");i.pump=s.partial(e,t("./pump")),i.drain=s.partial(e,t("./drain")),i.inject=function(t,i){if(!this.source)throw new Error("No source for pipe");var e=s.map(t,function(t,e){return!this.isCached(e,t)||i?this._srcSet(this.source,e,t):void 0},this);return n.all(e).then(s.bind(function(){this.pump(void 0,!0)},this),function(t){throw t})}}),define("__pipe/mapping",["require","exports","module","lodash"],function(t,i){var e=t("lodash");i.map=function(){var t,i;return e.isString(arguments[0])?(t=arguments[0],i=arguments[1]||t,i=e.isArray(i)?i:[i],this._map[t]=i):e.isObject(arguments[0])&&e.each(arguments[0],function(t,i){this.map(i,t)},this),this},i.removeLine=function(t){return delete this._map[t],this}}),define("pipe",["require","exports","module","subject","lodash","./__pipe/streams/index","./__pipe/mapping"],function(t,i,e){var s=t("subject"),n=t("lodash"),r=["srcGet","srcSet","destGet","destSet"],h=e.exports=s({initialize:function(t,i){i=i||{},n.each(r,function(t){this[t]=i[t]||this[t]},this),this._srcGet=this.srcGet||this.get,this._srcSet=this.srcSet||this.set,this._destGet=this.destGet||this.get,this._destSet=this.destSet||this.set,i.cache!==!1&&this.clearCache(),i.source&&this.from(i.source),i.destination&&this.to(i.destination),this._map={},this.map(t)},get:function(t,i){return t[i]},set:function(t,i,e){return t[i]=e,t},clearCache:function(){return this.cache={},this},isCached:function(t,i){return this.cache?this.cache[t]!==i?(this.cache[t]=i,!1):!0:!1},to:function(t){return this.clearCache(),this.destination=t,this},from:function(t){return this.clearCache(),this.source=t,this}});h.assignProto(t("./__pipe/streams/index")).assignProto(t("./__pipe/mapping"))});
//     pump
//     (c) simonfan
//     pump is licensed under the MIT terms.

define("__pump/pipe",["require","exports","module","lodash"],function(e,i){var t=e("lodash");i.addPipe=function(){var e,i,s;t.isString(arguments[0])?(e=arguments[0],i=arguments[1],s=arguments[2]||{}):(e=t.uniqueId("pipe"),i=arguments[0],s=arguments[1]||{}),s.source=this.source;var r=this._buildPipe(i,s);return this.pipes[e]=r,r},i.pipe=i.addPipe,i.getPipe=function(e){return this.pipes[e]},i.removePipe=function(e,i){return t.isFunction(e)?t.each(this.pipes,function(t,s){e.call(i,t,s)&&delete this.pipes[s]},this):t.isArray(e)?t.each(e,function(i,s){t.contains(e,s)&&delete this.pipes[s]},this):delete this.pipes[e],this},i.unpipe=i.removePipe}),define("__pump/streams/pump",["require","exports","module","lodash","q"],function(e,i){var t=e("lodash"),s=e("q");i.pump=function(e,i,r){var p;e?(e=t.isArray(e)?e:[e],p=t.pick(this.pipes,e)):p=this.pipes;var n=t.map(p,function(e){return e.pump(i,r)});return s.all(n)}}),define("__pump/streams/drain",["require","exports","module","lodash","q"],function(e,i){e("lodash"),e("q");i.drain=function(e,i,t){if(!e&&0!==e)throw new Error("Drain must take a pipe id as first argument.");var s=this.pipes[e];if(!s)throw new Error('Pipe "'+e+'" not found.');return s.drain(i,t)}}),define("__pump/streams/inject",["require","exports","module","lodash","q"],function(e,i){var t=e("lodash"),s=e("q");i.inject=function(e,i){var r=this.srcSet||this.set;if(!this.source)throw new Error("No source for pump");var p=t.map(e,function(e,i){return r.call(this,this.source,i,e)},this);return s.all(p).then(t.bind(function(){this.pump(i)},this)).fail(function(e){throw e})}}),define("pump",["require","exports","module","subject","lodash","pipe","./__pump/pipe","./__pump/streams/pump","./__pump/streams/drain","./__pump/streams/inject"],function(e,i,t){var s=e("subject"),r=e("lodash"),p=e("pipe"),n=["srcGet","srcSet","destGet","destSet"],u=t.exports=s({initialize:function(e,i){this.source=e,this._buildPipe=p.extend(r.pick(this,n)),this.pipes={},r.each(i,function(e,i){this.pipe(i,e)},this)},from:function(e){return this.source=e,r.each(this.pipes,function(i){i.from(e)}),this},get:function(e,i){return e[i]},set:function(e,i,t){return e[i]=t,this}});u.assignProto(e("./__pump/pipe")).assignProto(e("./__pump/streams/pump")).assignProto(e("./__pump/streams/drain")).assignProto(e("./__pump/streams/inject"))});
//     jquery-meta-data
//     (c) simonfan
//     jquery-meta-data is licensed under the MIT terms.

//     jquery-pump
//     (c) simonfan
//     jquery-pump is licensed under the MIT terms.

define("__jquery-meta-data/helpers",["require","exports","module","jquery","lodash"],function(e,t){e("jquery"),e("lodash"),t.buildPrefixRegExp=function(e){return new RegExp("^"+e+"([A-Z$_].*$)")},t.lowercaseFirst=function(e){return e.charAt(0).toLowerCase()+e.slice(1)},t.uppercaseFirst=function(e){return e.charAt(0).toUpperCase()+e.slice(1)},t.fullKey=function(e,r){return e?e+t.uppercaseFirst(r):r}}),define("__jquery-meta-data/read",["require","exports","module","lodash","./helpers"],function(e,t){function r(e){return e}var a=e("lodash"),i=e("./helpers");t.all=function(e,t){var u=e.data(),n=t.parse||r;if(t.prefix){var s=i.buildPrefixRegExp(t.prefix);return a.transform(u,function(r,a,u){var p=u.match(s);if(p){var o=i.lowercaseFirst(p[1]);a=n(a,o,u),t.replace&&e.data(u,a),r[o]=a}})}return a.mapValues(u,function(e,t){return n(e,t,t)})},t.single=function(e,t,r){var a=i.fullKey(t.prefix,r),u=e.data(a);return t.parse&&(u=t.parse(u,r,a),t.replace&&e.data(a,u)),u}}),define("__jquery-meta-data/set",["require","exports","module","lodash","./helpers"],function(e,t){var r=e("lodash"),a=e("./helpers");t.single=function(e,t,r,i){var u=a.fullKey(t.prefix,r);i=t.stringify?t.stringify(i,r,u):i,e.data(u,i)},t.multiple=function(e,a,i){r.each(i,function(r,i){t.single(e,a,i,r)})}}),define("jquery-meta-data",["require","exports","module","jquery","lodash","./__jquery-meta-data/read","./__jquery-meta-data/set"],function(e){var t=e("jquery"),r=e("lodash"),a=e("./__jquery-meta-data/read"),i=e("./__jquery-meta-data/set"),u={};t.metaData=function(){r.isObject(arguments[0])?r.assign(u,arguments[0]):u[arguments[0]]=arguments[1]},t.prototype.metaData=function(e){return e=r.isString(e)?u[e]:e,1===arguments.length?a.all(this,e):2!==arguments.length?(i.single(this,e,arguments[1],arguments[2]),this):r.isString(arguments[1])?a.single(this,e,arguments[1]):r.isObject(arguments[1])?(i.multiple(this,e,arguments[1]),this):void 0}}),define("__jquery-pump/parse",["require","exports","module","jquery"],function(e,t){function r(e){var t=e.split(i),r=t.shift();return{method:r,args:t}}function a(e){var t=e.match(u);return{selector:t[1],methodString:t[2]}}var i=(e("jquery"),/\s*:\s*/g);t.methodString=r;var u=/(?:(.+?)\s*\|)?\s*(.+)\s*/;t.destProp=a}),define("__jquery-pump/build-pipes",["require","exports","module","jquery","lodash","./parse"],function(e,t,r){function a(e,t){var r=this.generatePipeId(t);t.data(this.pipeIdDataAttribute,r);var a=this.pipe(r,e).to(t);return a}var i=e("jquery"),u=e("lodash"),n=e("./parse");r.exports=function(e,t){u.each(e,function(e){var r=i(e),s={},p=r.metaData(t);u.each(p,function(e,t){u.each(e,function(e){var i=n.destProp(e);if(i.selector){var u=r.find(i.selector),p={};p[t]=i.methodString,a.call(this,p,u)}else s[t]?s[t].push(e):s[t]=[e]},this)},this),a.call(this,s,r)},this)}}),define("__jquery-pump/getter-setter",["require","exports","module","jquery","./parse"],function(e,t){var r=(e("jquery"),e("./parse"));t.destGet=function(e,t){{var a=r.methodString(t);a.args}return e[a.method].apply(e,a.args)},t.destSet=function(e,t,a){var i=r.methodString(t),u=i.args;return u.push(a),e[i.method].apply(e,u)}}),define("__jquery-pump/id",["require","exports","module"],function(e,t){t.generatePipeId=function(){return _.uniqueId(this.pipeIdDataAttribute)},t.pipeIdDataAttribute="jq-pipe-id"}),define("jquery-pump",["require","exports","module","pump","jquery","jquery-meta-data","lodash","./__jquery-pump/build-pipes","./__jquery-pump/getter-setter","./__jquery-pump/id"],function(e,t,r){var a=e("pump"),i=e("jquery"),u=(e("jquery-meta-data"),e("lodash")),n=e("./__jquery-pump/build-pipes"),s=r.exports=a.extend({initialize:function(e,t){t=t||{};var r=t.destination;u.defaults(t,this.metaDataOptions),u.defaults(t,{prefix:this.prefix}),a.prototype.initialize.call(this,e),n.call(this,r,t)},prefix:"pipe",metaDataOptions:{parse:function(e){return e.split(/\s*,\s*/g)}},drain:function(e,t,r){return e=e instanceof i?e.data(this.pipeIdDataAttribute):e,a.prototype.drain.call(this,e,t,r)}});s.assignProto(e("./__jquery-pump/getter-setter")).assignProto(e("./__jquery-pump/id")),i.prototype.pump=function(e,t){return t=t||{},t.destination=this,s(e,t)}});
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
		},

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
		stringifiers: void(0),
		stringify: function stringify(property, value) {


			var stringifier = _retrieveFunction(this.stringifiers, property);

			return stringifier(value);
		},

		parsers: void(0),
		parse: function parse(property, value) {

			var parser = _retrieveFunction(this.parsers, property);

			return parser(value);
		},
	});

});

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
define('__bb-model-view/elements',['require','exports','module','jquery-selector-data-prefix'],function (require, exports, module) {
	



	// :data-prefix(prefix) selector
	require('jquery-selector-data-prefix');

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

define('bb-model-view',['require','exports','module','lodash','lowercase-backbone','jquery-value','./__bb-model-view/bind','./__bb-model-view/update','./__bb-model-view/model-pump','./__bb-model-view/elements'],function (require, exports, module) {
	


	var _        = require('lodash'),
		backbone = require('lowercase-backbone'),
		jqValue  = require('jquery-value');


	var bind = require('./__bb-model-view/bind');

	/**
	 * Name of parser and stringifier option names.
	 * @type {Array}
	 */
	var pumpOptionNames = ['parse', 'parsers', 'stringify', 'stringifiers', 'prefix'];


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

			console.log(options)

			// [2] create a jquery pump with those elements.
			// [2.1] get stringifiers and parsers
			var pumpOptions = _.pick(options, pumpOptionNames);
			_.defaults(pumpOptions, _.pick(this, pumpOptionNames));

			// [2.2] set destination
			pumpOptions.destination = $boundElements;

			// [2.2] effectively create the pump
			this.pump = this.modelPump(this.model, pumpOptions);

			// [3] listen to change events on $boundElements
			bind.DOMToModel.call(this, $boundElements);

			// [4] listen to change events on the model
			bind.modelToDOM.call(this, this.model);

			// [5] initialize view by pumping the model data.
			this.updateView();
		},
	});

	bbModelView
		.assignProto(require('./__bb-model-view/update'))
		.assignProto(require('./__bb-model-view/model-pump'))
		.assignProto(require('./__bb-model-view/elements'));
});

