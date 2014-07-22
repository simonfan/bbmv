define(function (require, exports, module) {
	'use strict';


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
		var format = dest.format;
		if (format) {
			// get format "out"
			var formatter = bbmv[format.method];
			formatter = _.isFunction(formatter) ? formatter : formatter.out;

			if (!formatter) {
				throw new Error('[bbmv|destGet] ' + format.method + ' could not be found.');
			}

			// clone args so that they remain unmodified
			var args = _.clone(format.args);
			args.push(value);

			value = formatter.apply(bbmv, args);
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
	module.exports = function destSet($el, destStr, value) {

		var dests = this.parseDestStr(destStr);

		_.each(dests, function (dest) {

			return destSetSingle(this, $el, dest, value);

		}, this);
	};
});
