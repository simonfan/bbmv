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
