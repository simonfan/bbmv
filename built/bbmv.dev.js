//     Bbdv
//     (c) simonfan
//     Bbdv is licensed under the MIT terms.

define("bbdv/aux",["require","exports","module"],function(e,t){t.camelCase=function(e){return e.replace(/[-_\s]+(.)?/g,function(e,t){return t?t.toUpperCase():""})},t.buildPrefixRegExp=function(e){return new RegExp("^"+e+"([A-Z$_].*$|$)")},t.lowercaseFirst=function(e){return e.charAt(0).toLowerCase()+e.slice(1)},t.uppercaseFirst=function(e){return e.charAt(0).toUpperCase()+e.slice(1)}}),define("bbdv/extract-directive-arguments",["require","exports","module","lodash","bbdv/aux"],function(e,t,i){function r(e,t){return s.camelCase(e+"-"+t)}var n=e("lodash"),s=e("bbdv/aux");i.exports=function(e,t,i){e=e||"",t.sort(function(e,t){return t.length-e.length});var a={};return n.each(i,function(i,c){n.any(t,function(t){var u=r(e,t);if(n.has(a,t)&&!n.isObject(a[t]))return!1;if(u===c)return a[t]=i,!0;var o=s.buildPrefixRegExp(u),d=c.match(o);if(d){var v=a[t];return v||(v=a[t]={}),v[s.lowercaseFirst(d[1])]=i,!0}return!1},this)},this),a}}),define("bbdv/execute-directives",["require","exports","module","lodash","bbdv/extract-directive-arguments","bbdv/aux"],function(e,t,i){{var r=e("lodash"),n=e("bbdv/extract-directive-arguments");e("bbdv/aux")}i.exports=function(e,t,i){var s=n(t,r.keys(i),e.data());r.each(s,function(t,r){if(""===r){var n=i[""]||i["default"];n.call(this,e,t)}else i[r].call(this,e,t)},this)}}),define("bbdv",["require","exports","module","jquery-selector-data-prefix","lowercase-backbone","jquery","lodash","bbdv/execute-directives","bbdv/aux"],function(e,t,i){function r(e,t){var i;return i=e.is(t)?e.add(e.find(t)):e.find(t)}e("jquery-selector-data-prefix");var n=e("lowercase-backbone"),s=e("jquery");_=e("lodash");var a=e("bbdv/execute-directives"),c=e("bbdv/aux"),u=n.view.prototype.initialize,o=i.exports=n.view.extend({initialize:function(e){u.call(this,e),_.each(["namespace","directives"],function(t){this[t]=e[t]||this[t]},this);var t=this.selector(this.namespace),i=r(this.$el,t);this.directives=_.reduce(this.directives,function(e,t,i){return e[c.camelCase(i)]=_.isFunction(t)?t:this[t],e},{},this);var n=this.namespace,o=this.directives;_.each(i,function(e){a.call(this,s(e),n,o)},this)},directives:{},namespace:"dir",selector:function(e){return":data-prefix("+e+")"}});o.assignStatic("directive",function(){_.isObject(arguments[0])?_.assign(this.prototype.directives,arguments[0]):this.prototype.directives[arguments[0]]=arguments[1]}),o.assignStatic("extendDirectives",function(e){var t=_.create(this.prototype.directives);_.assign(t,e);var i=this.extend({directives:t});return i})});
define('bbmv/pipe/aux/general',['require','exports','module','lodash'],function (require, exports, module) {
	

	var _ = require('lodash');


//	/^prefix([A-Z$_].*$|$)/;

	/**
	 * Creates a Regular Expression to capture property name.
	 *
	 *
	 */
	exports.buildPrefixRegExp = function buildPrefixRegExp(prefixes) {

		prefixes = _.isArray(prefixes) ? prefixes : [prefixes];

		return new RegExp('^(?:' + prefixes.join('|') + ')([A-Z$_].*$)?');
	};

	/**
	 * Returns the string with the first letter to lowercase.
	 */
	exports.lowercaseFirst = function lowercaseFirst(str) {
		return str.charAt(0).toLowerCase() + str.slice(1);
	};

	/**
	 * Returns the string with the first letter to uppercase.
	 */
	exports.uppercaseFirst = function uppercaseFirst(str) {
		return str.charAt(0).toUpperCase() + str.slice(1);
	};
});

define('bbmv/pipe/aux/parse-dest-str',['require','exports','module','lodash'],function (require, exports, module) {
	

	var _ = require('lodash');

	/**
	 * Parses a string into methodName and args.
	 * Example string: 'css:background-color'
	 *                 'attr:href'
	 *                 'val'
	 * @param  {[type]} str [description]
	 * @return {[type]}     [description]
	 */
	var colonSplitter = /\s*:\s*/g;
	function parseMethodString(str) {

		// parsing out the method string
		var tokens = str.split(colonSplitter),
			method = tokens.shift();

		return {
			method  : method,
			args    : tokens
		};
	};
	exports.methodString = parseMethodString;

	/**
	 * Returns optionally destProp string and method string
	 * [0] full match
	 * [1] selector
	 * [2] method string
	 */
//	var destPropMatcher = /(?:(.+?)\s*->)?\s*(.+)\s*/;
//	function parseDestProp(str) {
//
//		var match = str.match(destPropMatcher);
//
//		return {
//			selector    : match[1],
//			methodString: match[2]
//		};
//	};



	var destPropMatcher = /\s*(?:(.+?)\s*\|)?\s*(?:(.+?)\s*->)?\s*(.+)\s*/;
	// \s*(?:(.+?)\s*\|)? -> optional format |
	// \s*(?:(.+?)\s*->)? -> optional selector ->
	// \s*(.+)\s*/     -> required methodString
	//

	// 'currency|.selector->attr:value'
	// 'format|.selector -> method:partial1'
	// 'currency|html'
	// 'html'
	/**
	 * Parses the destination property of the jquery-pump.
	 *
	 * @param  {[type]} str [description]
	 * @return {[type]}     [description]
	 */
	function parseDestProp(str) {
		var match = str.match(destPropMatcher);

		// match[0] the full matched string
		// match[1] the format
		// match[2] the selector
		// match[3] the methodString

		// parse out the methodString
		var res = parseMethodString(match[3]);

		// set format and selector onto res;
		if (match[2]) {
			res.selector = match[2];
		}

		if (match[1]) {
			res.format   = parseMethodString(match[1]);
		}

		return res;
	}


	module.exports = function parseDestStr(destStr) {
		return _.map(destStr.split(/\s*,\s*/g), parseDestProp);
	};
});

define('bbmv/pipe/aux/index',['require','exports','module','lodash','bbmv/pipe/aux/general','bbmv/pipe/aux/parse-dest-str'],function (require, exports, module) {
	

	var _ = require('lodash');

	_.assign(exports, require('bbmv/pipe/aux/general'));

	exports.parseDestStr = require('bbmv/pipe/aux/parse-dest-str');
});

define('bbmv/pipe/dest-get',['require','exports','module','jquery-value','lodash','bbmv/pipe/aux/index'],function (require, exports, module) {
	


	// make jquery.value available for reading usage.
	var jqValue = require('jquery-value'),
		_       = require('lodash');

	var aux = require('bbmv/pipe/aux/index');

	/**
	 * Get from the jquery object
	 *
	 * @param  {[type]} $el [description]
	 * @param  {[type]} dest        [description]
	 * @return {[type]}             [description]
	 */
	module.exports = function destGet($el, destStr) {

		// reference to the bbmv
		var context = this.context;

		// parse out dest string using the method
		// in order to get the in-cache version
		// GET ONLY THE FIRST :)
		var dest = this.parseDestStr(destStr)[0];

		// dest:
		//   - method
		//   - args
		//   - format
		//   - selector (to be ignored)

		// get the method		// get the method
		var methodName = dest.method,
			method     = $el[methodName] || context[methodName];

		if (!method) {
			throw new Error('[bbmv pipe|destGet] ' + methodName + ' could not be found.')
		}

		// if selector is defined,
		// ge tthe right $el
		$el = dest.selector ? $el.find(dest.selector) : $el;

		// get result
		var res = method.apply($el, dest.args);

		// check if a format was defined
		var format = dest.format;
		if (format) {

			// get format "in"
			var formatter = context[format.method];
			formatter = _.isFunction(formatter) ? formatter : formatter['in'];

			if (!formatter) {
				throw new Error('[bbmv|destGet] ' + format.method + ' could not be found.');
			}

			// clone args so that the original ones remain unchanged
			var args = _.clone(format.args);
			args.push(res);

			res = formatter.apply(context, args);
		}

		return res;
	};
});

define('bbmv/pipe/dest-set',['require','exports','module','jquery-value','lodash','bbmv/pipe/aux/index'],function (require, exports, module) {
	


	// make jquery.value available for reading usage.
	var jqValue = require('jquery-value'),
		_       = require('lodash');

	var aux = require('bbmv/pipe/aux/index');

	function destSetSingle(pipe, $el, dest, value) {
		// dest:
		//   - method
		//   - args
		//   - format
		//   - selector (to be ignored)

		// reference to bbmv
		var context = pipe.context;


		// format
		var format = dest.format;
		if (format) {
			// get format "out"
			var formatter = context[format.method];
			formatter = _.isFunction(formatter) ? formatter : formatter.out;

			if (!formatter) {
				throw new Error('[bbmv pipe|destGet] ' + format.method + ' could not be found.');
			}

			// clone args so that they remain unmodified
			var args = _.clone(format.args);
			args.push(value);

			value = formatter.apply(context, args);
		}

		// clone the args array, so that the original one remains untouched
		// AND add the value to the arguments array
		var args = _.clone(dest.args);
		args.push(value);

		// get the method
		var methodName = dest.method,
			method     = $el[methodName] || context[methodName];

		if (!method) {
			throw new Error('[bbmv|destSet] ' + methodName + ' could not be found.')
		}

		// if therer is a selector defined,
		// call the find method on the dest object.
		if (dest.selector) {
			$el = $el.find(dest.selector);
		}

		// run the method
		return method.apply($el, args);
	}



	/**
	 * Set to the jquery object
	 * @param  {[type]} $el [description]
	 * @param  {[type]} dest        [description]
	 * @param  {[type]} value       [description]
	 * @return {[type]}             [description]
	 */
	module.exports = function destSet($el, destStr, value) {

		var dests = this.parseDestStr(destStr);

		_.each(dests, function (dest) {

			return destSetSingle(this, $el, dest, value);

		}, this);
	};
});

define('bbmv/pipe/index',['require','exports','module','pipe','lodash','bbmv/pipe/aux/index','bbmv/pipe/dest-get','bbmv/pipe/dest-set'],function defPipe(require, exports, module) {

	var pipe = require('pipe')
		_    = require('lodash');

		// parses out the maps defined on the $el.
	var aux = require('bbmv/pipe/aux/index');

	// direct reference to original methods
	var _to         = pipe.prototype.to,
		_from       = pipe.prototype.from,
		_mapSingle  = pipe.prototype.mapSingle,
		_initialize = pipe.prototype.initialize;

	var mvpipe = module.exports = pipe.extend({

		initialize: function initializeMvPipe(src, dest, map, options) {


			// var to hold parsed dest strings
			this._parsedDestStrs = {};

			// normal initialization
			_initialize.apply(this, _.toArray(arguments));

			options = options || {};

			_.each(['namespace', 'context'], function (opt) {

				this[opt] = options[opt] || this[opt];

			}, this);



		},

		parseDestStr: function mvpipeParseDestStr(destStr) {
			// attempt to get the parsed version from cache.
			// if available in cache, return it.
			// otherwise, parse it out and then return

			var parsed = this._parsedDestStrs[destStr];

			if (!parsed) {
				parsed = this._parsedDestStrs[destStr] = aux.parseDestStr(destStr);
			}

			return parsed;
		},



		srcGet: function getFromModel(src, property) {
			return src.get(property);
		},

		srcSet: function setOnModel(src, property, value) {
			return src.set(property, value);
		},
	});

	mvpipe.assignProto({
		destGet: require('bbmv/pipe/dest-get'),
		destSet: require('bbmv/pipe/dest-set')
	});

});

define('bbmv/aux',['require','exports','module','jquery-selector-data-prefix'],function (require, exports, module) {

	// :data-prefix(prefix) selector
	require('jquery-selector-data-prefix');

	/**
	 * Finds all bound elements within the pipe.
	 *
	 * @param  {[type]} $el    [description]
	 * @param  {[type]} namespace [description]
	 * @return {[type]}        [description]
	 */
	exports.findBoundElements = function findBoundElements($el, namespace) {
		// $el.add() creates a NEW SELECTION :)
		// it does not add to the existing jq object.
		var $boundDescendantElements = $el.find(':data-prefix(' + namespace + ')');
		return $el.add($boundDescendantElements);
	};
});

//     bbmv
//     (c) simonfan
//     bbmv is licensed under the MIT terms.

/**
 * The modeld is the object that links together $els and models.
 *
 * @module bbmv
 */

/* jshint ignore:start */

/* jshint ignore:end */

define('bbmv/directives',['require','exports','module','lodash','jquery'],function (require, exports, module) {
	


	var _        = require('lodash'),
		$        = require('jquery');

	exports.directives = {
		'in': 'bindIn',
		'out': 'bindOut',
		'dual': 'bindDual',
		'event': 'bindEvent',
		'': 'bindDual',
	};


	exports.defaultDOMEvents = {
		'INPUT': 'change',
		'BUTTON': 'click',
	};

	/**
	 * Establishes a specific event on the DOM element
	 * to listen for drains.
	 *
	 * Does not remove the default event listeners set on input
	 * elements ('change').
	 *
	 * Those should be set on the 'defaultDOMEvents' hash.
	 *
	 *
	 * @param  {[type]} $el   [description]
	 * @param  {[type]} event [description]
	 * @return {[type]}       [description]
	 */
	exports.bindEvent = function bindEvent($el, event) {

		var pipe = this.pipe($el);

		if (_.isObject(event)) {

			_.each(event, function (attr, evt) {

				$el.on(evt, function () {
					pipe.drain(attr.split(/\s*,\s*/), { force: true });
				});
			});

		} else {

			event = (_.isString(event) && event !== '') ? event : this.defaultDOMEvents[$el.prop('tagName')];

			$el.on(event, _.partial(_.bind(pipe.drain, pipe), { force: true }));
		}
	};

	/**
	 * Binds the $el data to the model in
	 * uni-directional mode:
	 * from DOM to MODEL
	 *
	 * @param  {[type]} $el [description]
	 * @param  {[type]} map [description]
	 * @return {[type]}     [description]
	 */
	exports.bindIn = function bindIn($el, map) {

	//	console.log('bindIn');
	//	console.log($el[0]);
	//	console.log(map);

		var pipe = this.pipe($el);


		var evt = this.defaultDOMEvents[$el.prop('tagName')];

		console.log(this)

		if (evt) {
			$el.on(evt, function () {
				pipe.drain({ force: true });
			});
		}

		pipe.map(map, 'from');
	};

	/**
	 * Binds the model data to the $el in
	 * uni-directional mode:
	 * from MODEL to DOM
	 *
	 * @param  {[type]} $el [description]
	 * @param  {[type]} map [description]
	 * @return {[type]}     [description]
	 */
	exports.bindOut = function bindOut($el, map) {


	//	console.log('bindOut');
	//	console.log($el[0]);
	//	console.log(map);

		var pipe = this.pipe($el);
		pipe.map(map, 'to');
	};

	/**
	 * Dual way data binding.
	 *
	 * @param  {[type]} $el [description]
	 * @param  {[type]} map [description]
	 * @return {[type]}     [description]
	 */
	exports.bindDual = function bindDual($el, map) {

	//	console.log('bindDual');
	//	console.log($el[0]);
	//	console.log(map);

		var evt = this.defaultDOMEvents[$el.prop('tagName')];

		if (evt) {
			$el.on(evt, function () {
				pipe.drain({ force: true });
			});
		}

		var pipe = this.pipe($el);
		pipe.map(map, 'both');

	};
});

//     bbmv
//     (c) simonfan
//     bbmv is licensed under the MIT terms.

/**
 * The modeld is the object that links together $els and models.
 *
 * @module bbmv
 */

/* jshint ignore:start */

/* jshint ignore:end */

define('bbmv',['require','exports','module','lodash','jquery','bbdv','lowercase-backbone','bbmv/pipe/index','bbmv/aux','bbmv/directives'],function (require, exports, module) {
	


	var _        = require('lodash'),
		$        = require('jquery'),
		bbdv     = require('bbdv'),
		backbone = require('lowercase-backbone');

	var mvPipe = require('bbmv/pipe/index'),
		aux    = require('bbmv/aux');


	function genPipeIdAttr() {
		return ['bbdv', this.namespace, this.cid, 'id'].join('_');
	}

	var bbmv = module.exports = bbdv.extend({

		initialize: function initializeBbmv(options) {

			this.namespace = options.namespace || this.namespace;

			/**
			 * The attribute used to store the pipe id
			 * onto the $dest elements.
			 *
			 * @type {[type]}
			 */
			this.pipeIdAttr = genPipeIdAttr.call(this);

			this.pipes = {};

			bbdv.prototype.initialize.call(this, options);

			if (!this.model) { throw new Error('No model set for model view.'); }
			if (!this.$el) { throw new Error('No el set on model view.'); }

			// listen to changes on model
			this.model.on(this.event, function () {

				console.log('change')

				this.pump();

			}, this);

			// initial pump
			this.pump();

		},

		event: 'change',


		namespace: 'bind',

		/**
		 * Pump data.
		 *
		 * @param  {[type]} argument [description]
		 * @return {[type]}          [description]
		 */
		pump: function pump() {

			_.each(this.pipes, function (pipe) {
				pipe.pump();
			});

			return this;
		},


		/**
		 * [drain description]
		 * @return {[type]} [description]
		 */
		drain: function drain($el) {

			this.pipe($el).drain();

			return this;
		},

		/**
		 * Attempts to get the pipe id from the $dest object
		 * and then checks for a pipe in cache.
		 *
		 * If no pipe is found in cache, instantiate a pipe
		 * set id onto $dest using the .data method
		 * and save pipe to cache using that id.
		 *
		 * @param  {[type]} $dest   [description]
		 * @param  {[type]} map     [description]
		 * @param  {[type]} options [description]
		 * @return {[type]}         [description]
		 */
		pipe: function definePipe($dest, map, options) {

			var pipe;

			// get the pipeid
			var pipeid = $dest.data(this.pipeIdAttr);

			if (pipeid && this.pipes[pipeid]) {
				// get pipe from cache
				pipe = this.pipes[pipeid];

			} else {
				// generate a unique id
				pipeid = _.uniqueId(this.pipeIdAttr);

				// set namespace onto options
				options = options || {};
				options.context = this;

				// create pipe
				pipe = this.pipes[pipeid] = mvPipe(this.model, $dest, map, options);

				// save pipe id on el.
				$dest.data(this.pipeIdAttr, pipeid);
			}

			return pipe;
		},
	});

	bbmv.assignProto(require('bbmv/directives'));
});

