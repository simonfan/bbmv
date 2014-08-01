define(function (require, exports, module) {
	'use strict';


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
		var dest = bbmvInstance._parseDestStr(destStr)[0];

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
			$el.find(dest.selector) : $el;

		//////////////////////
		// method execution //
		//////////////////////
		var value = bbmvInstance._exec(dest.method, _.clone(dest.args), $el);

		////////////////
		// formatting //
		////////////////
		// check if a format was defined
		var format = dest.format;
		if (format) {

			// get "in" formatter
			var formatter = bbmvInstance[format.method];
			formatter = _.isFunction(formatter) ? formatter : formatter['in'];

			if (!formatter) { throw new Error('[bbmv|destGet] ' + format.method + ' could not be found.'); }

			// clone args so that the original ones remain unchanged
			var formatterArgs = _.clone(format.args);

			// $el as first,
			// value as last
			formatterArgs.unshift($el);
			formatterArgs.push(value);

			// run formatting.
			value = formatter.apply(bbmvInstance, formatterArgs);
		}

		return value;
	};
});
