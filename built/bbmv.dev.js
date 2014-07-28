define('bbmv/aux/general',['require','exports','module','lodash'],function (require, exports, module) {
	

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

define('bbmv/aux/parse-dest-str',['require','exports','module','lodash'],function (require, exports, module) {
	

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

define('bbmv/aux/index',['require','exports','module','lodash','bbmv/aux/general','bbmv/aux/parse-dest-str','jquery-selector-data-prefix'],function (require, exports, module) {
	

	var _ = require('lodash');

	_.assign(exports, require('bbmv/aux/general'));

	exports.parseDestStr = require('bbmv/aux/parse-dest-str');

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

define('bbmv/pipe/aux',['require','exports','module','lodash'],function defPipeAux(require, exports, module) {

	var _ = require('lodash');

	/**
	 * Shared formatting logic for dest-get and dest-set.
	 *
	 * @param  {[type]} bbmvInstance [description]
	 * @param  {[type]} $el          [description]
	 * @param  {[type]} direction    [description]
	 * @param  {[type]} format       [description]
	 * @param  {[type]} value        [description]
	 * @return {[type]}              [description]
	 */
	exports.format = function format(bbmvInstance, $el, direction, format, value) {


		// get format "in"
		var formatter = bbmvInstance[format.method];
		formatter = _.isFunction(formatter) ? formatter : formatter[direction];

		// clone args so that the original ones remain unchanged
		var formatterArgs = _.clone(format.args);
		formatterArgs.push(value);

		if (!formatter) { throw new Error('[bbmv|destGet/destSet] ' + format.method + ' could not be found.'); }

		return formatter.apply(bbmvInstance, formatterArgs);

	};

	/**
	 * Very specific execution method.
	 * Does method execution logic,
	 * is shared by both dest-get and dest-set.
	 *
	 * @param  {[type]} bbmvInstance [description]
	 * @param  {[type]} $el          [description]
	 * @param  {[type]} methodName   [description]
	 * @param  {[type]} methodArgs   [description]
	 * @return {[type]}              [description]
	 */
	exports.executeMethod = function executeMethod(bbmvInstance, $el, methodName, methodArgs) {

		// get the method
		if ($el[methodName]) {
			return $el[methodName].apply($el, methodArgs);
		} else {
			// add the $el to the args
			methodArgs.unshift($el);

			return bbmvInstance[methodName].apply(bbmvInstance, methodArgs);
		}

	};

});

define('bbmv/pipe/dest-get',['require','exports','module','jquery-value','lodash','bbmv/aux/index','bbmv/pipe/aux'],function (require, exports, module) {
	


	// make jquery.value available for reading usage.
	var jqValue = require('jquery-value'),
		_       = require('lodash');

	var aux     = require('bbmv/aux/index'),
		pipeAux = require('bbmv/pipe/aux');

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

		// parse out dest string using the method
		// in order to get the in-cache version
		// GET ONLY THE FIRST :)
		var dest = this.parseDestStr(destStr)[0];

		// dest:
		//   - method
		//   - args
		//   - format
		//   - selector (to be ignored)

		///////////////////////
		// element retrieval //
		///////////////////////
		// if selector is defined,
		// ge tthe right $el
		$el = dest.selector ?
			$el.find(dest.selector) :
			$el;

		//////////////////////
		// method retrieval //
		// and execution    //
		//////////////////////
		// get the method
		var methodName = dest.method,
			methodArgs = _.clone(dest.args),
			value      = pipeAux.executeMethod(bbmvInstance, $el, methodName, methodArgs);

		////////////////
		// formatting //
		////////////////
		// check if a format was defined
		value = dest.format ?
			pipeAux.format(bbmvInstance, $el, 'in', dest.format, value) :
			value;

		return value;
	};
});

define('bbmv/pipe/dest-set',['require','exports','module','jquery-value','lodash','bbmv/aux/index','bbmv/pipe/aux'],function (require, exports, module) {
	


	// make jquery.value available for reading usage.
	var jqValue = require('jquery-value'),
		_       = require('lodash');

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
	function destSetSingle(bbmvInstance, $el, dest, value) {
		// bb
		// if $el is active, do not set it.
		if ($el.is(':focus')) { return; }

		// dest:
		//   - method
		//   - args
		//   - format
		//   - selector (to be ignored)

		//////////////////////
		// value formatting //
		//////////////////////
		value = dest.format ?
			pipeAux.format(bbmvInstance, $el, 'out', dest.format, value) :
			value;

		///////////////////////
		// element retrieval //
		///////////////////////
		// if therer is a selector defined,
		// call the find method on the dest object.
		$el = dest.selector ?
			$el.find(dest.selector) :
			$el;

		//////////////////////
		// method execution //
		//////////////////////
		// clone the args array, so that the original one remains untouched
		// AND add the value to the arguments array
		var methodArgs = _.clone(dest.args);
		methodArgs.push(value);

		// execute the method
		var methodName = dest.method;

		return pipeAux.executeMethod(bbmvInstance, $el, methodName, methodArgs);
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

			return destSetSingle(this.bbmvInstance, $el, dest, value);

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

	var mvpipe = module.exports = pipe.extend({

		initialize: function initializeMvPipe(src, dest, map, options) {


			// var to hold parsed dest strings
			this._parsedDestStrs = {};

			// normal initialization
			_initialize.apply(this, _.toArray(arguments));

			options = options || {};

			_.each(['namespace', 'bbmvInstance'], function (opt) {

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

define('bbmv/directives/data-bind',['require','exports','module','lodash'],function defBindDirectives(require, exports, module) {

	

	var _ = require('lodash');



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

		var evt = $el.data('binding-event') || this.defaultDOMEvents[$el.prop('tagName')];


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
	exports['out'] = function bindOut($el, map) {


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
	exports['dual'] = exports[''] = function bindDual($el, map) {

	//	console.log('bindDual');
	//	console.log($el[0]);
	//	console.log(map);

		var evt = $el.data('binding-event') || this.defaultDOMEvents[$el.prop('tagName')];

		if (evt) {
			$el.on(evt, function () {
				pipe.drain({ force: true });
			});
		}

		var pipe = this.pipe($el);
		pipe.map(map, { direction: 'both' });
	};

	/**
	 * Set directive.
	 *
	 * @param  {[type]} $el [description]
	 * @param  {[type]} map [description]
	 * @return {[type]}     [description]
	 */
	exports['set'] = function bindSet($el, map) {

		var evt = $el.data('binding-event') || this.defaultDOMEvents[$el.prop('tagName')];

		$el.on(evt, _.partial(_.bind(this.model.set, this.model), map));
	};



});

define('bbmv/directives/event',['require','exports','module','lodash'],function defEventDirectives(require, exports, module) {

	

	var _ = require('lodash');


	var arrowRegExp = /\s*=>\s*/,
		colonRegExp = /\s*:\s*/,
		commaRegExp = /\s*,\s*/;


	/**
	 * Parses the methos string into an object
	 * with name and arguments array.
	 *
	 * method: arg1, arg2
	 *
	 * @param  {[type]} methodStr [description]
	 * @return {[type]}           [description]
	 */
	function parseMethodStr(methodStr) {

		// parse methodStr
		var methodStrSplit = methodStr.split(colonRegExp),
			methodName     = methodStrSplit[0],
			methodArgsStr  = methodStrSplit[1];

		// parse argsStr
		var methodArgs = methodArgsStr ? methodArgsStr.split(commaRegExp) : [];

		return {
			name: methodName,
			args: methodArgs
		};
	}

	/**
	 * Parses the event string into an object
	 * with evetn name, method and arguments for the method.
	 *
	 * event=>method: arg1, arg2
	 *
	 * @param  {[type]} evtStr [description]
	 * @return {[type]}        [description]
	 */
	function parseEvtStr(evtStr) {

		// parse evtStr
		var evtStrSplit = evtStr.split(arrowRegExp),
			evtName     = evtStrSplit[0],
			methodStr   = evtStrSplit[1];

		return {
			name      : evtName,
			method    : parseMethodStr(methodStr)
		};
	}

	/**
	 * Sets an event listener that tries to invoke
	 * a method either on the $el or on the bbmv view instance.
	 *
	 * @param {[type]} view      [description]
	 * @param {[type]} $el       [description]
	 * @param {[type]} evtName   [description]
	 * @param {[type]} methodStr [description]
	 */
	function setEventListener(view, $el, evtName, methodStr) {

		// parse out the method.
		var method = parseMethodStr(methodStr);

		// set listener
		$el.on(evtName, function () {

			// if method is available on the $el,
			// use the $el method.
			// otherwise, use the view's method
			// passing the $el as first argument.

			if ($el[method.name]) {
				// run the method defined on $el.
				$el[method.name].apply($el, method.args);

			} else {
				// run the method defined on the view
				// passing the $el as the first argument
				method.args.unshift($el);
				view[method.name].apply(view, method.args);
			}
		});

	}

	/**
	 * Event directive, binds events to actions on the view.
	 *
	 * @param  {[type]} $el           [description]
	 * @param  {[type]} evtStr_evtMap [description]
	 * @return {[type]}               [description]
	 */
	exports['on'] = function bindEvent($el, evtStr_evtMap) {

		// keep reference to the view.
		var view = this;

		if (_.isObject(evtStr_evtMap)) {

			// loop through events.
			_.each(evtStr_evtMap, function (methodStr, evtName) {

				// set event listener
				setEventListener(this, $el, evtName, methodStr);

			}, this);

		} else {

			// parse evtStr
			var evtStrSplit = evtStr_evtMap.split(arrowRegExp),
				evtName     = evtStrSplit[0],
				methodStr   = evtStrSplit[1];

			// set event listener
			setEventListener(this, $el, evtName, methodStr);
		}

	};

});

define('bbmv/directives/index',['require','exports','module','lodash','jquery','bbmv/directives/data-bind','bbmv/directives/event'],function (require, exports, module) {
	

	var _        = require('lodash'),
		$        = require('jquery');

	exports.defaultDOMEvents = {
		'INPUT': 'change',
		'BUTTON': 'click',
	};


	/**
	 * The directives to be exported.
	 */
	var directives = {};
	exports.directives = directives;

	// extend directives
	_.assign(directives, require('bbmv/directives/data-bind'));
	_.assign(directives, require('bbmv/directives/event'));
});

define('bbmv/methods/if',['require','exports','module','lodash'],function (require, exports, module) {
	

	var _ = require('lodash');

	var conditions = {
		'>'  : function gt(condition, value) { return parseFloat(value) > parseFloat(condition); },
		'>=' : function gte(condition, value) { return parseFloat(value) >= parseFloat(condition); },
		'<'  : function lt(condition, value) { return parseFloat(value) < parseFloat(condition); },
		'<=' : function lte(condition, value) { return parseFloat(value) <= parseFloat(condition); },
		's>' : function stringGt(condition, value) { return value > condition; },
		's>=': function stringGte(condition, value) { return value >= condition; },
		's<' : function stringLt(condition, value) { return value < condition; },
		's<=': function stringLte(condition, value) { return value <= condition; },
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

define('bbmv/methods/model-methods',['require','exports','module'],function defPipeMethodsModelMethods(require, exports, module) {

	

	exports.save = function save($el) {
		return this.model.save();
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

define('bbmv',['require','exports','module','lodash','jquery','bbdv','lowercase-backbone','bbmv/pipe/index','bbmv/aux','bbmv/directives/index','bbmv/methods/if','bbmv/methods/model-methods'],function (require, exports, module) {
	


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

				// if map is set,
				// set it.
				if (map) {

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
		},
	});

	bbmv.assignProto(require('bbmv/directives/index'))
		.assignProto(require('bbmv/methods/if'))
		.assignProto(require('bbmv/methods/model-methods'));
});

