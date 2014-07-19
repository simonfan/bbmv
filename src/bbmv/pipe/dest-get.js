define(function (require, exports, module) {
	'use strict';


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
