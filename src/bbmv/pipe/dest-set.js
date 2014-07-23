define(function (require, exports, module) {
	'use strict';


	// make jquery.value available for reading usage.
	var jqValue = require('jquery-value'),
		_       = require('lodash');

	var aux = require('bbmv/aux/index');

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
