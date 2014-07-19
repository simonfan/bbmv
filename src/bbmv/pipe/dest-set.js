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
