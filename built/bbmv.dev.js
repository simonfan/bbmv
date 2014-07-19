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
		var parsedMethodString = parseMethodString(match[3]);

		return {
			format  : match[1],
			selector: match[2],
			method  : parsedMethodString.method,
			args    : parsedMethodString.args
		};
	}


	module.exports = function parseDestStr(destStr) {
		return _.map(destStr.split(/\s*,\s*/g), parseDestProp);
	};
});

define('bbmv/pipe/aux/extract-maps',['require','exports','module','jquery','lodash','bbmv/pipe/aux/general'],function (require, exports, module) {

	var $ = require('jquery'),
		_ = require('lodash');

	// circular...
	var aux = require('bbmv/pipe/aux/general');


	// reserved 'post-namespacees' (the word that goes after the namespace.)
	var reserved = ['Event', 'Scope'];


	function buildRegExps(namespace) {

		return {
			'in'    : aux.buildPrefixRegExp(namespace + 'In'),
			out     : aux.buildPrefixRegExp(namespace + 'Out'),
			dual    : aux.buildPrefixRegExp(namespace + 'Dual'),
			reserved: aux.buildPrefixRegExp(_.map(reserved, function (word) {
				return namespace + word;
			})),

			all     : aux.buildPrefixRegExp(namespace),
		};
	}

	/**
	 * [exports description]
	 * @param  {[type]} $el [description]
	 * @return {[type]}     [description]
	 */
	module.exports = function extractBindingsMap($el, namespace) {

		if (!namespace) {
			throw new Error('[bbmv-pipe-extract-maps] No namespace defined for binding map extraction.')
		}

		var maps = {
			in: {},
			out: {},
			dual: {}
		};

		var data = $el.data();

		// build regexps
		var re = buildRegExps(namespace);

		_.each(data, function (value, key) {

			var match;

			// try to match "in"
			if (match = key.match(re.in)) {
				// <div data-bind-in-attribute="html"></div>
				// in bind
				key = aux.lowercaseFirst(match[1]);

				maps.in[key] = value;

			} else if (match = key.match(re.out)) {
				// <div data-bind-out-attribute="html"></div>
				// out bind
				key = aux.lowercaseFirst(match[1]);

				maps.out[key] = value;

			} else if (match = key.match(re.dual)) {
				// <div data-bind-dual-attribute="html"></div>
				// dual bind
				key = aux.lowercaseFirst(match[1]);

				maps.dual[key] = value;

			} else if (!re.reserved.test(key) && re.all.test(key)) {

				// <div data-bind-attribute="method"></div>
				//
				// check if there is a reserved keyword in
				// the data value.
				// if no reserved keywords,
				// set them for dual binding.
				// not reserved, thus, dual bind
				match = key.match(re.all);
				key   = aux.lowercaseFirst(match[1]);

				maps.dual[key] = value;
			}

		});

		return maps;
	};
});

define('bbmv/pipe/aux/index',['require','exports','module','lodash','bbmv/pipe/aux/general','bbmv/pipe/aux/parse-dest-str','bbmv/pipe/aux/extract-maps'],function (require, exports, module) {
	

	var _ = require('lodash');

	_.assign(exports, require('bbmv/pipe/aux/general'));

	exports.parseDestStr = require('bbmv/pipe/aux/parse-dest-str');

	exports.extractMaps = require('bbmv/pipe/aux/extract-maps');
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
	exports.destGet = function destGet($el, destStr) {

		// reference to the bbmv
		var bbmv = this.bbmv;

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
			method     = $el[methodName] || bbmv[methodName];

		if (!method) {
			throw new Error('[bbmv|destGet] ' + methodName + ' could not be found.')
		}

		// if selector is defined,
		// ge tthe right $el
		$el = dest.selector ? $el.find(dest.selector) : $el;

		// get result
		var res = method.apply($el, dest.args);

		// check if a format was defined
		var formatName = dest.format;
		if (formatName) {

			// get format "in"
			var formatter = bbmv[formatName];
			formatter = _.isFunction(formatter) ? formatter : formatter['in'];

			if (!formatter) {
				throw new Error('[bbmv|destGet] ' + formatName + ' could not be found.');
			}

			res = formatter.call(bbmv, res);
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
		var bbmv = pipe.bbmv;


		// format
		var formatName = dest.format;
		if (formatName) {
			// get format "out"
			var formatter = bbmv[formatName];
			formatter = _.isFunction(formatter) ? formatter : formatter.out;

			if (!formatter) {
				throw new Error('[bbmv|destGet] ' + formatName + ' could not be found.');
			}

			value = formatter.call(bbmv, value);
		}

		// clone the args array, so that the original one remains untouched
		// AND add the value to the arguments array
		var args = _.clone(dest.args);
		args.push(value);

		// get the method
		var methodName = dest.method,
			method     = $el[methodName] || bbmv[methodName];

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
	exports.destSet = function destSet($el, destStr, value) {

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


	var defaultSetEvents = {
		'INPUT': 'change',
		'BUTTON': 'click',
	};

	var mvpipe = module.exports = pipe.extend({

		initialize: function initializeMvPipe(src, dest, map, options) {


			// var to hold parsed dest strings
			this._parsedDestStrs = {};

			// normal initialization
			_initialize.apply(this, _.toArray(arguments));

			options = options || {};

			_.each(['namespace', 'bbmv'], function (opt) {

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


		/**
		 * The default namespace used for binding map extraction.
		 *
		 * @type {String}
		 */
		namespace: 'bind',


		/**
		 * Override the to method in order to
		 * listen to events on the destination object.
		 *
		 * @param  {[type]} dest [description]
		 * @return {[type]}      [description]
		 */
		to: function to($dest) {

			var namespace = this.namespace;

			//////////////////
			// set mappings //
			//////////////////

			// get mappings from the $dest
			var maps = aux.extractMaps($dest, namespace);

			// set mappings
			this.map(maps['in'], 'from')
				.map(maps.out,   'to')
				.map(maps.dual,  'both');

			////////////////
			// set events //
			////////////////

			// <div data-bind-event-in="click"></div>
			var setEvent =
				$dest.data(namespace + '-event') ||
				defaultSetEvents[$dest.prop('tagName')];

			if (setEvent) {

				var attributes = _.union(_.keys(maps['in']), _.keys(maps.dual));

				$dest.on(setEvent, _.bind(function () {

					// drain attributes, force = true;
					this.drain(attributes, { force: true });

				}, this));
			}

			// continue flow.
			return _to.call(this, $dest);
		},

		srcGet: function getFromModel(src, property) {
			return src.get(property);
		},

		srcSet: function setOnModel(src, property, value) {
			return src.set(property, value);
		},
	});

	mvpipe
		.assignProto(require('bbmv/pipe/dest-get'))
		.assignProto(require('bbmv/pipe/dest-set'));

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

define('bbmv',['require','exports','module','lodash','jquery','lowercase-backbone','bbmv/pipe/index','bbmv/aux'],function (require, exports, module) {
	


	var _        = require('lodash'),
		$        = require('jquery'),
		backbone = require('lowercase-backbone');

	var mvPipe = require('bbmv/pipe/index'),
		aux    = require('bbmv/aux');


	/**
	 * Exports.
	 * @param  {[type]} initializeModelView: function                                               initializeModelView(options)                       {			if         (!this.model) { throw new Error('No model set for model view.'); }			if (!this.$el) { throw new Error('No el set on model view.'); }						var $boundElements = this.boundElements();									var pumpOptions = _.pick(options, pumpOptionNames [description]
	 * @return {[type]}                      [description]
	 */
	var bbmv = module.exports = backbone.view.extend({

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

			/**
			 * Array of pipes defined in the view.
			 *
			 * @type {Array}
			 */
			this.pipes = [];

			// [0] pick initialization options
			_.each(['namespace', 'event'], function (opt) {
				this[opt] = options[opt] || this[opt];
			}, this);

			// [1] find all elements that have bindings defined.
			var $boundElements = aux.findBoundElements(this.$el, this.namespace);

			// [2] set up pipes
			_.each($boundElements, function (el) {

				this.pipe($(el));

			}, this);


			// listen to changes on model
			this.model.on(this.event, function () {

				this.pump();

			}, this);
		},

		/**
		 * Event to be listened on the model.
		 *
		 * @type {String}
		 */
		event: 'change',

		/**
		 * The namespace that designates bound elements.
		 *
		 * @type {String}
		 */
		namespace: 'bind',


		mvPipe: mvPipe,

		/**
		 * Create a pipe.
		 *
		 * @param  {[type]} $dest [description]
		 * @return {[type]}             [description]
		 */
		pipe: function definePipe($dest, map, options) {

			options = options || {};

			options.namespace = options.namespace || this.namespace;
			options.bbmv      = this;

			var _pipe = mvPipe(this.model, $dest, map, options);

			// save pipe
			this.pipes.push(_pipe);

			return _pipe;
		},

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
		drain: function drain() {
			_.each(this.pipes, function (pipe) {
				pipe.drain();
			});

			return this;
		}
	});
});

