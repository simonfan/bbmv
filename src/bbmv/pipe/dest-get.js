define(function (require, exports, module) {
	'use strict';


	// make jquery.value available for reading usage.
	var jqValue = require('jquery-value'),
		_       = require('lodash');

	var aux = require('bbmv/aux/index');

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
			var formatterArgs = _.clone(format.args);
			formatterArgs.push(res);

			res = formatter.apply(context, formatterArgs);
		}

		return res;
	};
});
