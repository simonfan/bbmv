define('bbmv/aux/general',['require','exports','module','lodash'],function (require, exports, module) {
	

	var _ = require('lodash');


	/**
	 * Copied from Epeli's underscore.string "camelize"
	 * https://github.com/epeli/underscore.string/blob/master/lib/underscore.string.js
	 *
	 * @param  {[type]} str [description]
	 * @return {[type]}     [description]
	 */
	exports.camelCase = function camelCase(str) {
		return str.replace(/[-_\s]+(.)?/g, function(match, c){ return c ? c.toUpperCase() : ""; });
	};



	/**
	 * Adapted from Epeli's underscore.string "trim"
	 * https://github.com/epeli/underscore.string/blob/master/lib/underscore.string.js
	 *
	 * @param  {[type]} str        [description]
	 * @param  {[type]} characters [description]
	 * @return {[type]}            [description]
	 */
	var leftAndRightWhitespace = /^\s+|\s+$/g;
	exports.trim = function trim(str){
		if (str == null) return '';
		if (String.prototype.trim) return str.trim();
		return String(str).replace(leftAndRightWhitespace, '');
	};

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

define('bbmv/aux/parse',['require','exports','module','lodash','bbmv/aux/index'],function (require, exports, module) {
	

	var _ = require('lodash');

	// load main aux
	var aux = require('bbmv/aux/index');

	/**
	 * Cache for parsing.
	 * @type {Object}
	 */
	var cache = {};


	var newline = /\n/g;



	// 'currency|.selector->attr:value'
	// 'format|.selector -> method:partial1'
	// 'currency|html'
	// 'html'
	var arrow = /\s*->\s*/;

	function parseMethodString(str) {

		var res = {};

		// attempt to split the 'method' in .selector->method
		var split = str.split(arrow);

		if (split.length === 2) {
			// there is a selector
			// split = [selector, method]
			res.method   = aux.trim(split[1]);
			res.selector = aux.trim(split[0]);
		} else {
			// no selector
			res.method = aux.trim(str);
		}

		return res;
	}
	exports.parseMethodString = parseMethodString;



	/**
	 * Parses a string into methodName and args.
	 * Example string: 'css(background-color)'
	 *                 'attr(href)'
	 *                 'val'
	 *                 'someMethod(arg1, arg2, arg3)'
	 * @param  {[type]} str [description]
	 * @return {[type]}     [description]
	 */
	// \s*(.*?)\s*   match anything that precedes
	// (?:
	//   \(            parenthesis opening
	//   \s*(.*)       whatever is within
	//   \)(?!\s*->)   until a closing parenthesis not followed by any arrow
	// )
	// $
	var methodStrRegExp = /\s*(.*?)\s*(?:\(\s*(.*)\s*\)\s*(?!->))?$/,
		commaSplitter   = /\s*,\s*/g;

	function parseInvocationString(str) {
		// only do parsing if result is not found in cache.
		if (cache[str]) {
			return cache[str];
		}


		// create a var to hold the method invoking definition.
		var idef = {};

		// remove newlines from str
		// and attempt match.
		var match = str.replace(newline, '').match(methodStrRegExp);

		// parse out invocationString
		var invocationString = match[1];
		_.assign(idef, parseMethodString(invocationString));

		// parse out methodArgs
		idef.args = match[2] ? match[2].split(commaSplitter) : [];
		if (idef.args.length > 0) {
			// trim first and last
			idef.args[0]                    = aux.trim(idef.args[0]);
			idef.args[idef.args.length - 1] = aux.trim(_.last(idef.args));
		}

		// save to cache using original str value
		cache[str] = idef;

		return idef;
	}
	exports.parseInvocationString = parseInvocationString;

});

define('bbmv/aux/index',['require','exports','module','lodash','bbmv/aux/general','bbmv/aux/parse'],function (require, exports, module) {
	

	var _ = require('lodash');

	_.assign(exports, require('bbmv/aux/general'));
	_.assign(exports, require('bbmv/aux/parse'));


	/**
	 * Finds the default DOM event
	 * for an $el.
	 * Must take an events hash as second argument.
	 *
	 * @param  {[type]} $el        [description]
	 * @param  {[type]} eventsHash [description]
	 * @return {[type]}            [description]
	 */
	exports.getDefaultDOMEvent = function getDefaultDOMEvent($el, eventsHash) {

		return _.find(eventsHash, function (event, selector) {

			return $el.is(selector);

		});

	};

});

define('bbmv/directives/data-bind',['require','exports','module','lodash','bbmv/aux/index'],function defBindDirectives(require, exports, module) {

	

	var _   = require('lodash'),
		aux = require('bbmv/aux/index')



	/**
	 * Binds the $el data to the model in
	 * uni-directional mode:
	 * from DOM to MODEL
	 *
	 * @param  {[type]} $el [description]
	 * @param  {[type]} map [description]
	 * @return {[type]}     [description]
	 */
	exports['in'] = function bindIn($el, map) {

		//	console.log('bindIn');
		//	console.log($el[0]);
		//	console.log(map);

		var pipe = this.pipe($el);
		pipe.map(map, { direction: 'from' });

		var evt =
			$el.data(this.bindingEventAttribute) ||
			aux.getDefaultDOMEvent($el, this.defaultDOMEvents);


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
	exports.out = function bindOut($el, map) {


		var pipe = this.pipe($el);
		pipe.map(map, { direction: 'to' });

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
	exports.dual = exports[''] = function bindDual($el, map) {

	//	console.log('bindDual');
	//	console.log($el[0]);
	//	console.log(map);


		var pipe = this.pipe($el);
		pipe.map(map, { direction: 'both' });

		var evt =
			$el.data(this.bindingEventAttribute) ||
			aux.getDefaultDOMEvent($el, this.defaultDOMEvents);

		if (evt) {
			$el.on(evt, function () {
				pipe.drain({ force: true });
			});
		}

	};

	/**
	 * Set directive.
	 *
	 * @param  {[type]} $el [description]
	 * @param  {[type]} map [description]
	 * @return {[type]}     [description]
	 */
/*
	exports.set = function bindSet($el, map) {
		var evt =
			$el.data(this.bindingEventAttribute) ||
			aux.getDefaultDOMEvent($el, this.defaultDOMEvents);

		if (evt) {
			$el.on(evt, _.partial(_.bind(this.model.set, this.model), map));
		}

	};
*/



});

define('bbmv/directives/on',['require','exports','module','lodash'],function defEventDirectives(require, exports, module) {

	

	var _ = require('lodash');

	var arrow = /\s*=>\s*/;
	/**
	 * Event directive, binds events to actions on the view.
	 *
	 * @param  {[type]} $el           [description]
	 * @param  {[type]} evtStr_evtMap [description]
	 * @return {[type]}               [description]
	 */
	exports.on = function bindEvent($el, evtStr_evtMap) {

		// keep reference to the view.
		var view = this;

		if (_.isObject(evtStr_evtMap)) {

			// loop through events.
			_.each(evtStr_evtMap, function (invocationString, evtName) {

				$el.on(evtName, function () {
					view.execInvocationString(invocationString, $el);
				});

			}, this);

		} else {

			// parse evtStr
			var evtStrSplit = evtStr_evtMap.split(arrow),
				evtName     = evtStrSplit[0],
				invocationString   = evtStrSplit[1];

			// set event listener
			$el.on(evtName, function () {
				view.execInvocationString(invocationString, $el);
			});
		}

	};

});

define('bbmv/directives/index',['require','exports','module','lodash','jquery','bbmv/directives/data-bind','bbmv/directives/on'],function (require, exports, module) {
	

	var _        = require('lodash'),
		$        = require('jquery');

	exports.defaultDOMEvents = {

		// selector: event
		':text,textarea'                            : 'keyup',
		'input[type="checkbox"],input[type="radio"]': 'change',
		':button'                                   : 'click',
		'input[type="hidden"]'                      : 'change',
	};



	/**
	 * The directives to be exported.
	 */
	var directives = {};
	exports.directives = directives;

	// extend directives
	_.assign(directives, require('bbmv/directives/data-bind'));
	_.assign(directives, require('bbmv/directives/on'));
});

define('bbmv/methods/aux',['require','exports','module','lodash','jquery','bbmv/aux/index'],function defBbdvParsers(require, exports) {
	

	var _ = require('lodash'),
		$ = require('jquery');

	var aux = require('bbmv/aux/index');


	exports.execInvocationString = function execInvocationString(invocationString, $el /* args */) {

		var invocation = aux.parseInvocationString(invocationString);

		// find the right $el to apply action
		$el = invocation.selector ? $el.find(invocation.selector) : $el;

		// build arguments array
		var executionArgs = invocation.args.concat(_.toArray(arguments).slice(2));
		executionArgs.unshift($el);

		// get fn
		var fn = this[invocation.method];
		if (!_.isFunction(fn)) {
			throw new Error(invocation.method + ' is not a function.');
		}

		return fn.apply(this, executionArgs);
	};
});

define('bbmv/methods/if',['require','exports','module','lodash','bbmv/aux/index'],function (require, exports, module) {
	

	var _ = require('lodash');

	// load aux
	var aux = require('bbmv/aux/index');

	var conditions = {
		'>'  : function gt(condition, value) { return parseFloat(value) > parseFloat(condition); },
		'>=' : function gte(condition, value) { return parseFloat(value) >= parseFloat(condition); },
		'<'  : function lt(condition, value) { return parseFloat(value) < parseFloat(condition); },
		'<=' : function lte(condition, value) { return parseFloat(value) <= parseFloat(condition); },
		's>' : function stringGt(condition, value) { return value > condition; },
		's>=': function stringGte(condition, value) { return value >= condition; },
		's<' : function stringLt(condition, value) { return value < condition; },
		's<=': function stringLte(condition, value) { return value <= condition; },
		'n=' : function numberEqual(condition, value) { return parseFloat(value) == parseFloat(condition); },
		'='  : function equal(condition, value) { return value == condition; },
		'==' : function strictEqual(condition, value) { return value === condition; },
		'!'  : function notEqual(condition, value) { return value != condition; },
		'!=' : function notStrictEqual(condition, value) { return value !== condition; },
		'#'  : function exists(condition, value) { return !_.isUndefined(value); },
		'!#' : function notExist(condition, value) { return _.isUndefined(value); }
	};

	var conditionRegExp = /^(>=|>|<=|<|s>=|s>|s<=|s<|n=|==|=|#|!#|!=|!)?\s*(.*)\s*/;

	function evaluateCondition(condition, value) {

		var match = condition.match(conditionRegExp);

		var operator = match[1] || '=';
		condition = match[2];

		return conditions[operator](condition, value);
	}

	// data-bind-if-lala="lalala:do"
	// data-bind-lala="if:lalala ~> do, value ~> doOther, doDefault;"


	var arrowSplitter = /\s*=>\s*/;


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
	exports['if'] = function ifdo($el) {


		// arguments = [$el, case, ..., case, value]

		var cases = _.toArray(arguments).slice(1),
			value = cases.pop();


		// loop cases
		_.any(cases, function (pairStr) {

			var split = pairStr.split(arrowSplitter);

			if (split.length === 1) {

				this.execInvocationString(split[0], $el, value);

				// break loop
				return true;

			} else {

				// split = [condition, destString]
				//
				// check if condition is valid
				if (evaluateCondition(split[0], value)) {
					this.execInvocationString(split[1], $el, value);

					// break loop
					return true;
				}
			}

			// continue looping, no one found
			return false;

		}, this);

	};
});

define('bbmv/methods/model',['require','exports','module'],function defModelMethods(require, exports, module) {

	

	////////////
	// Native //
	////////////
	exports.save = function saveModel($el) {
		return this.model.save();
	};


	exports.set = function setModel($el, attr, value) {
		return this.model.set(attr, value);
	};

	exports.fetch = function fetchModel($el) {
		return this.model.fetch();
	};

	exports.clear = function clearModel() {
		return this.model.clear();
	};

	exports.destroy = function destroyModel() {
		return this.model.destroy();
	};

	exports.validate = function validateModel() {
		return this.model.validate();
	};

	//////////////
	// Extended //
	//////////////
});

define('bbmv/methods/jquery/native',['require','exports','module','lodash'],function defJqMethods(require, exports, module) {

	

	var _ = require('lodash');



	// animations
	var animations = ['fadeIn', 'fadeOut', 'fadeTo', 'fadeToggle', 'hide', 'show', 'toggle', 'remove'];


	var arity1 = [
		'addClass', 'after', 'append',
		'height', 'html',
		'offset',
		'prepend',
		'removeAttr', 'removeClass', 'removeData', 'removeProp',
		'replaceAll', 'replaceWith',
		'scrollLeft', 'scrollTop',
		'text', 'toggleClass',
		'val',
		'width',
	];
	// _.each(arity1, function defJqMethod(method) {

	// 	exports[method] = function proxyJqMethod($el) {
	// 		if (arguments.length === 1) {
	// 			// get
	// 			return $el[method]();
	// 		} else if (arguments.length > 2) {
	// 			// set
	// 			return $el[method](arguments[1])
	// 		}
	// 	}
	// });

	var arity2 = ['attr', 'css', 'data', 'prop'];
	// _.each(arity2, function defJqMethod(method) {
	// 	exports[method] = function proxyJqMethod($el) {

	// 		if (arguments.length === 2) {
	// 			// get
	// 			return $el[method](arguments[1]);
	// 		} else if (arguments.length > 3) {

	// 			// set
	// 			return $el[method](arguments[2], arguments[1])
	// 		}
	// 	}
	// });


	var all = arity1.concat(arity2);

	_.each(all, function (method) {

		exports[method] = function proxyJqMethod($el) {

			var args = _.toArray(arguments).slice(1);

			return $el[method].apply($el, args);
		};
	});

	// always run these methods without arguments
	exports.hide = function hideEl($el) {
		return $el.hide();
	};

	exports.show = function showEl($el) {
		return $el.show();
	};
});

define('bbmv/methods/jquery/extensions/value',['require','exports','module','jquery'],function defJqMethods(require, exports, module) {

	

	var $ = require('jquery');

	/**
	 * Hash of functions that will return a value
	 * given an jquery $el.
	 * Keyed by tagName
	 *
	 * @property jqValueGetters
	 * @private
	 * @type Object
	 */
	var jqValueGetters = {
		'default': function readDefault($el) {
			return $el.val();
		},

		'DIV': function readDiv($el) {
			return $el.html();
		},

		'INPUT': function readInput($el) {

			var type = $el.prop('type');

			if (type === 'checkbox') {

				return $el.filter(':checked').map(function () {

					return $(this).val();

				}).get();

			} else if (type === 'radio') {

				return $el.filter(':checked').val();

			} else {
				return $el.val();
			}
		}
	};

	/**
	 * Takes a selector string and returns the value of it.
	 *
	 * @method jqValueGet
	 * @param selector {String}
	 */
	function jqValueGet($el) {

		// [1] retrieve get function
		var tagName = $el.prop('tagName'),
			get = jqValueGetters[tagName] || jqValueGetters['default'];

		// [2] read and return.
		return get($el);
	};






	/**
	 * Holds the html tag jqValueSetters.
	 *
	 * @class jqValueSetters
	 * @static
	 */
	var jqValueSetters = {
		default: function ($el, value) {
			return $el.html(value);
		},
		INPUT: function ($el, value) {
			/**
			 * intercept only filling for checkboxes and radios
			 * as the default jquery .val() method sets the checkboxes and radio input
			 * values instead of checking them (if the value is not passed in as an array)
			 */
			var type = $el.prop('type');

			if (type === 'checkbox' || type === 'radio') {
				value = $.isArray(value) ? value : [value];
			}

			return $el.val(value);
		},
		SELECT: function ($el, value) {
			return $el.val(value);
		},
		IMG: function ($el, value) {
			// trigger a change event when changing the image src
			return $el.prop('src', value).trigger('change', value);
		},

		TEXTAREA: function ($el, value) {
			return $el.val(value);
		},
	};


	/**
	 * Generates a filler function.
	 *
	 * @method jqValueSet
	 * @param $el {jQuery} The element on which perform task
	 */
	function jqValueSet($el, value) {

		// [2] loop through the $el
		$el.each(function (index, el) {

			var $el = $(el);

			// [2.1] get $el tagName
			var tagName = $el.prop('tagName');


			var set = jqValueSetters[tagName] || jqValueSetters['default'];
			set($el, value);
		});

		return $el;
	};





	exports.value = function jqValue($el, value) {

		if (arguments.length === 1) {
			return jqValueGet($el);
		} else if (arguments.length === 2) {
			return jqValueSet($el, value);
		}
	};
});

define('bbmv/pipe/aux',['require','exports','module','lodash','bbmv/aux/index'],function defPipeAux(require, exports) {
	

	var _ = require('lodash');

	var aux = require('bbmv/aux/index');

	var cache = {};

	var semicolonSplitter = /\s*;\s*/,
		pipeSplitter      = /\s*\|\s*/,
		newline           = /\n/g;

	// format | .selector -> method; another-format -> method
	exports.parseDestStr = function parseDestStr(str) {

		if (cache[str]) {
			return cache[str];
		}

		// break the string
		var destDefStrArr = str.replace(newline, '').split(semicolonSplitter);

		// loop and build the dest definition
		var destDefs = _.map(destDefStrArr, function (s) {

			var d = {};

			var formatSplit = s.split(pipeSplitter);

			if (formatSplit.length === 2) {
				// format available
				d.format       = aux.parseInvocationString(formatSplit[0]);
				d.invocationString = formatSplit[1];
			} else {
				// no format
				d.invocationString = formatSplit[0];
			}

			return d;
		});

		cache[str] = destDefs;

		return destDefs;

	};

});

define('bbmv/pipe/dest-get',['require','exports','module','lodash','bbmv/aux/index','bbmv/pipe/aux'],function (require, exports, module) {
	


	// make jquery.value available for reading usage.
	var _       = require('lodash');

	var aux     = require('bbmv/aux/index'),
		pipeAux = require('bbmv/pipe/aux');


	var semicolonSplitter = /\s*;\s*/,
		pipeSplitter      = /\s*\|\s*/;

	/**
	 * Get from the jquery object
	 *
	 * @param  {[type]} $el [description]
	 * @param  {[type]} dest        [description]
	 * @return {[type]}             [description]
	 */
	module.exports = function destGet($el, destStr) {

		// reference to the bbmv
		var bbmvInstance = this.bbmvInstance;

		// parse destStr
		// destDef = [{ format: String|undefined, invocationString: String}];
		var destDef = pipeAux.parseDestStr(destStr)[0];

		var value = bbmvInstance.execInvocationString(destDef.invocationString, $el);

		////////////////
		// formatting //
		////////////////
		// check if a format was defined
		var format = destDef.format;
		if (format) {

			// get "in" formatter
			var formatter = bbmvInstance[format.method];
			formatter = _.isFunction(formatter) ? formatter : formatter['in'];

			if (!formatter) { throw new Error('[bbmv|destGet] ' + format.method + ' could not be found.'); }

			// clone args so that the original ones remain unchanged
			var formatterArgs = _.clone(format.args);

			// value as last
			formatterArgs.push(value);

			// run formatting.
			value = formatter.apply(bbmvInstance, formatterArgs);
		}

		return value;
	};
});

define('bbmv/pipe/dest-set',['require','exports','module','lodash','bbmv/aux/index','bbmv/pipe/aux'],function (require, exports, module) {
	


	// make jquery.value available for reading usage.
	var _       = require('lodash');

	var aux     = require('bbmv/aux/index'),
		pipeAux = require('bbmv/pipe/aux');

	/**
	 * [destSetSingle description]
	 * @param  {[type]} bbmvInstance
	 *         The instance of bbmv to which this pipe is
	 *         attached.
	 * @param  {[type]} $el
	 *         Destination element on which set the value
	 * @param  {[type]} dest         [description]
	 * @param  {[type]} value        [description]
	 * @return {[type]}              [description]
	 */
	function destSetSingle(bbmvInstance, $el, destDef, value) {
		// bb
		// if $el is active, do not set it.
		if ($el.is(':focus')) { return; }


		// dest:
		//   - method
		//   - args
		//   - format
		//   - selector

		//////////////////////
		// value formatting //
		//////////////////////
		var format = destDef.format;
		if (format) {


			// get format "in"
			var formatter = bbmvInstance[format.method];
			formatter = _.isFunction(formatter) ? formatter : formatter.out;

			if (!formatter) { throw new Error('[bbmv|destGet/destSet] ' + format.method + ' could not be found.'); }

			// clone args so that the original ones remain unchanged
			//
			// value as last!
			var formatterArgs = _.clone(format.args);
			formatterArgs.push(value);

			value = formatter.apply(bbmvInstance, formatterArgs);

		}

		return bbmvInstance.execInvocationString(destDef.invocationString, $el, value);
	}



	/**
	 * Set to the jquery object
	 * @param  {[type]} $el [description]
	 * @param  {[type]} dest        [description]
	 * @param  {[type]} value       [description]
	 * @return {[type]}             [description]
	 */
	module.exports = function destSet($el, destStr, value) {

		var bbmvInstance = this.bbmvInstance,
			// parse destStr
			// destDef = [{ format: String|undefined, invocationString: String}];
			destDefs      = pipeAux.parseDestStr(destStr);


		_.each(destDefs, function (destDef) {

			return destSetSingle(bbmvInstance, $el, destDef, value);

		}, this);
	};
});

define('bbmv/pipe/index',['require','exports','module','pipe','lodash','bbmv/aux/index','bbmv/pipe/dest-get','bbmv/pipe/dest-set'],function defPipe(require, exports, module) {

	

	var pipe = require('pipe'),
		_    = require('lodash');

		// parses out the maps defined on the $el.
	var aux = require('bbmv/aux/index');

	// direct reference to original methods
	var _to         = pipe.prototype.to,
		_from       = pipe.prototype.from,
		_mapSingle  = pipe.prototype.mapSingle,
		_initialize = pipe.prototype.initialize;

	var mvPipe = module.exports = pipe.extend({

		initialize: function initializeMvPipe(src, dest, map, options) {



			// normal initialization
			_initialize.apply(this, _.toArray(arguments));

			options = options || {};

			_.each(['namespace', 'bbmvInstance'], function (opt) {

				this[opt] = options[opt] || this[opt];

			}, this);



		},

		srcGet: function getFromModel(src, property) {
			return src.get(property);
		},

		srcSet: function setOnModel(src, property, value) {
			return src.set(property, value);
		},
	});

	mvPipe.assignProto({
		destGet: require('bbmv/pipe/dest-get'),
		destSet: require('bbmv/pipe/dest-set')
	});

});

define('bbmv/methods/pipe',['require','exports','module','lodash','bbmv/pipe/index'],function (require, exports) {
	

	var _ = require('lodash');

	// the mv pipe object builder.
	var mvPipe = require('bbmv/pipe/index');



	/**
	 * Private function used to instantiate a new data pipe.
	 *
	 * @param  {Object (bbmv)}   bbmvInstance
	 *     The instance of bbmv to which this pipe will be attached.
	 *     The pipe will use multiple methods from the main object
	 *     in order to read from and set to DOM.
	 * @param  {Object (jquery)} $dest
	 *     The jQuery object that should be the destination of the pipe.
	 * @param  {Object (pojo)}   map
	 *     A map describing the pipe sources and destinations.
	 * @param  {Object (pojo)}   options
	 *     Options.
	 *
	 * @return {Object (pipe)}                [description]
	 */
	function instantiatePipe(bbmvInstance, $dest, map, options) {

		// generate a unique id
		var pipeid = _.uniqueId(this.pipeIdAttr);

		// set namespace onto options
		options = options || {};
		options.bbmvInstance = this;

		// create pipe
		var pipe = this.pipes[pipeid] = mvPipe(this.model, $dest, map, options);

		// save pipe id on el.
		$dest.data(this.pipeIdAttr, pipeid);
	}


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
	exports.pipe = function definePipe($dest, map, options) {

		var pipe;

		// get the pipeid
		var pipeid = $dest.data(this.pipeIdAttr);

		if (pipeid && this.pipes[pipeid]) {
			// get pipe from cache
			pipe = this.pipes[pipeid];

			// if map is set,
			// set it onto the pipe.
			if (map) {
				pipe.map(map, options);
			}

		} else {
			// generate a unique id
			pipeid = _.uniqueId(this.pipeIdAttr);

			// set namespace onto options
			options = options || {};
			options.bbmvInstance = this;

			// create pipe
			pipe = this.pipes[pipeid] = mvPipe(this.model, $dest, map, options);

			// save pipe id on el.
			$dest.data(this.pipeIdAttr, pipeid);
		}

		return pipe;
	};

	// alias.
	exports.map = exports.pipe;


	/**
	 * Pump data.
	 *
	 * @param  {[type]} argument [description]
	 * @return {[type]}          [description]
	 */
	exports.pump = function pump() {

		_.each(this.pipes, function (pipe) {
			pipe.pump();
		});

		return this;
	};


	/**
	 * Drains data from a single element
	 * @param  {[type]} $el [description]
	 * @return {[type]}     [description]
	 */
	exports.drain = function drain($el, attributes, options) {

		this.pipe($el).drain(attributes, options);

		return this;
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

define('bbmv',['require','exports','module','jquery-selector-data-prefix','lodash','jquery','bbdv','lowercase-backbone','bbmv/aux/index','bbmv/directives/index','bbmv/methods/aux','bbmv/methods/if','bbmv/methods/model','bbmv/methods/jquery/native','bbmv/methods/jquery/extensions/value','bbmv/methods/pipe'],function (require, exports, module) {
	

	require('jquery-selector-data-prefix');

	var _        = require('lodash'),
		$        = require('jquery'),
		bbdv     = require('bbdv'),
		backbone = require('lowercase-backbone');

	var aux = require('bbmv/aux/index');

	function genPipeIdAttr() {
		return ['bbdv', this.namespace, this.cid, 'id'].join('_');
	}

	// direct reference to incorporate
	var _incorporate = bbdv.prototype.incorporate;

	var bbmv = module.exports = bbdv.extend({

		initialize: function initializeBbmv(options) {
			options = options || {};

			// pick some options
			_.each(['namespace', 'binding', 'event', 'bindingEventAttribute'], function (opt) {
				this[opt] = options[opt] || this[opt];
			}, this);

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

		/**
		 * Event to listen on the model.
		 * @type {String}
		 */
		event: 'change',

		/**
		 * Data atttribute for the binding event name.
		 * @type {String}
		 */
		bindingEventAttribute: 'binding-event',

		///////////////
		// OVERRIDES //
		///////////////

		/**
		 * Directive namespace
		 * used for bbdv.
		 * @type {String}
		 */
		namespace: 'bind',
		/**
		 * Builds the selector to get the elements to be
		 * in the directive view.
		 *
		 * If the binding attribute is set, use it to build
		 * a custom selector.
		 * Otherwise. use the data-prefix selector.
		 *
		 * @param  {[type]} namespace [description]
		 * @return {[type]}           [description]
		 */
		selector: function bbmvBoundSelector(namespace) {

			// use data prefix selector
			return ':data-prefix(' + aux.camelCase(namespace) + ')';

		},

		/**
		 * Override the incorporate method in order to insert a call
		 * to '.pump' right after the incorporation.
		 */
		incorporate: function incorporateElToModelView($el) {

			// invoke original incorporate function
			_incorporate.call(this, $el);

			// invoke pump
			this.pump();

			return this;

		},


	});

	bbmv.assignProto(require('bbmv/directives/index'))

		// methods
		.assignProto(require('bbmv/methods/aux'))
		.assignProto(require('bbmv/methods/if'))
		.assignProto(require('bbmv/methods/model'))
		.assignProto(require('bbmv/methods/jquery/native'))
		.assignProto(require('bbmv/methods/jquery/extensions/value'))
		.assignProto(require('bbmv/methods/pipe'));
});

