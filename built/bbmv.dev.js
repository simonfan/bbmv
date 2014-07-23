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
	 *                 'someMethod:arg1, arg2, arg3;'
	 * @param  {[type]} str [description]
	 * @return {[type]}     [description]
	 */
	var colonSplitter = /\s*:\s*/g,
		commaSplitter = /\s*,\s*/g;

	function parseMethodString(str) {

			// method:$argsString
		var methodAndArgsSplit = str.split(colonSplitter),
			method             = methodAndArgsSplit[0],
			argsString         = methodAndArgsSplit[1];

			// arg1, arg2, arg3
		var args = argsString ? argsString.split(commaSplitter) : [];

		return {
			method  : method,
			args    : args
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


	var semiColonSplitter = /\s*;\s*/g;
	// "method: arg1, arg2; method1: arg;"
	module.exports = function parseDestStr(destStr) {
		return _(destStr.split(semiColonSplitter)).map(parseDestProp).compact().value();
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

		///////////////////////
		// element retrieval //
		///////////////////////
		// if selector is defined,
		// ge tthe right $el
		$el = dest.selector ? $el.find(dest.selector) : $el;

		// dest:
		//   - method
		//   - args
		//   - format
		//   - selector (to be ignored)

		//////////////////////
		// method execution //
		//////////////////////
		// get the method
		var methodName = dest.method,
			res;

		// if there is a jquery method with the given name,
		// use it. Otherwise, try to find the method on the context object.
		if (_.isFunction($el[methodName])) {
			// get method on the $el.
			// and execute it passing the args
			res = $el[methodName].apply($el, dest.args);

		} else {
			// get the method on the context object
			// passing the args
			// add $el to args
			var args = _.clone(dest.args);
			args.unshift($el);

			res = context[methodName].apply(context, args);
		}

		////////////////
		// formatting //
		////////////////
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

		// if $el is active, do not set it.
		if ($el.is(':focus')) { return; }

		// dest:
		//   - method
		//   - args
		//   - format
		//   - selector (to be ignored)

		// reference to bbmv
		var context = pipe.context;

		//////////////////////
		// value formatting //
		//////////////////////
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
			var formatArgs = _.clone(format.args);
			formatArgs.push(value);

			value = formatter.apply(context, formatArgs);
		}


		///////////////////////
		// element retrieval //
		///////////////////////
		// if therer is a selector defined,
		// call the find method on the dest object.
		if (dest.selector) {
			$el = $el.find(dest.selector);
		}

		//////////////////////
		// method execution //
		//////////////////////
		// clone the args array, so that the original one remains untouched
		// AND add the value to the arguments array
		var destArgs = _.clone(dest.args);
		destArgs.push(value);

		// get the method
		var methodName = dest.method;

		if ($el[methodName]) {
			return $el[methodName].apply($el, destArgs);
		} else {
			// add the $el to the args
			destArgs.unshift($el);

			return context[methodName].apply(context, destArgs);
		}
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

define('bbmv/directives',['require','exports','module','lodash','jquery'],function (require, exports, module) {
	


	var _        = require('lodash'),
		$        = require('jquery');

	exports.directives = {
		'in': 'bindIn',
		'out': 'bindOut',
		'dual': 'bindDual',
		'set': 'bindSet',
		'': 'bindDual',
	};


	exports.defaultDOMEvents = {
		'INPUT': 'change',
		'BUTTON': 'click',
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
		pipe.map(map, 'from');

		var evt = $el.data(this.namespace + '-on') || this.defaultDOMEvents[$el.prop('tagName')];


		if (evt) {
			$el.on(evt, function () {
				pipe.drain({ force: true });
			});
		}
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


		var pipe = this.pipe($el);
		pipe.map(map, 'to');

	//	console.log('bindOut');
	//	console.log($el[0]);
	//	console.log(map);
	};

	/**
	 * Dual way data binding.
	 *
	 * @param  {[type]} $el [description]
	 * @param  {[type]} map [description]
	 * @return {[type]}     [description]
	 */
	exports.bindDual = {
		exclude: ['on'],
		fn: function bindDual($el, map) {

		//	console.log('bindDual');
		//	console.log($el[0]);
		//	console.log(map);

			var evt = $el.data(this.namespace + '-on') || this.defaultDOMEvents[$el.prop('tagName')];

			if (evt) {
				$el.on(evt, function () {
					pipe.drain({ force: true });
				});
			}

			var pipe = this.pipe($el);
			pipe.map(map, 'both');
		},
	};

	exports.bindSet = function bindSet($el, map) {

		var evt = $el.data(this.namespace + '-on') || this.defaultDOMEvents[$el.prop('tagName')];

		$el.on(evt, _.partial(_.bind(this.model.set, this.model), map) );
	};
});

define('bbmv/pipe-methods/if',['require','exports','module'],function (require, exports, module) {
	

	var conditions = {
		'>'  : function gt(condition, value) { return parseFloat(value) > parseFloat(condition); },
		'>=' : function gte(condition, value) { return parseFloat(value) >= parseFloat(condition); },
		'<'  : function lt(condition, value) { return parseFloat(value) < parseFloat(condition); },
		'<=' : function lte(condition, value) { return parseFloat(value) <= parseFloat(condition); },
		's>' : function stringGt(condition, value) { return value > condition },
		's>=': function stringGte(condition, value) { return value >= condition },
		's<' : function stringLt(condition, value) { return value < condition },
		's<=': function stringLte(condition, value) { return value <= condition },
		'='  : function equal(condition, value) { return value == condition; },
		'==' : function strictEqual(condition, value) { return value === condition; },
		'!'  : function notEqual(condition, value) { return value != condition; },
		'!=' : function notStrictEqual(condition, value) { return value !== condition; },
		'#'  : function exists(condition, value) { return !_.isUndefined(value); },
		'!#' : function notExist(condition, value) { return _.isUndefined(value); }
	};

	var conditionRegExp = /^(>=|>|<=|<|s>=|s>|s<=|s<|==|=|#|!#|!=|!)?\s*(.*)\s*/;

	function evaluateCondition(condition, value) {

		var match = condition.match(conditionRegExp);

		var operator = match[1] || '=';
		condition = match[2];

		return conditions[operator](condition, value);
	}

	// data-bind-if-lala="lalala:do"
	// data-bind-lala="if:lalala ~> do, value ~> doOther, doDefault;"


	var arrowSplitter = /\s*=>\s*/,
		slashSplitter = /\s*\/\s*/;


	// data-bind-fruit="if:banana->yellow:apple->red:green"
	// ifDoElseDo($el, "banana->yellow", "apple->red", "green", $value)

	/**
	 * Takes variable number of arguments
	 * Each argument before the last is a 'condition->method' pair.
	 * If no '->' is found within the pair string, we assume the method is
	 * to be used in default cases.
	 *
	 * @return {[type]} [description]
	 */
	exports['if'] = function ifdo($el, casesString, value) {

		var cases = casesString.split(slashSplitter);

		// loop cases
		return _.find(cases, function (pairStr) {

			var split = pairStr.split(arrowSplitter);

			if (split.length === 1) {

				// split = [methodName]
				// directly execute, it is the default case
				this[split[0]].call(this, $el, value);

				// break loop
				return true;

			} else {
				// split = [condition, methodName]
				//
				// check if condition is valid
				if (evaluateCondition(split[0], value)) {
					this[split[1]].call(this, $el, value);

					// break loop
					return true;
				}
			}

			// continue looping, no one found
			return false;

		}, this);

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

define('bbmv',['require','exports','module','lodash','jquery','bbdv','lowercase-backbone','bbmv/pipe/index','bbmv/aux','bbmv/directives','bbmv/pipe-methods/if'],function (require, exports, module) {
	


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
		 * Drains data from a single element
		 * @param  {[type]} $el [description]
		 * @return {[type]}     [description]
		 */
		drain: function drain($el, attributes, options) {

			this.pipe($el).drain(attributes, options);

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

	bbmv.assignProto(require('bbmv/directives'))
		.assignProto(require('bbmv/pipe-methods/if'));
});

