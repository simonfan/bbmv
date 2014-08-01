define(function (require, exports, module) {
	'use strict';


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





		///////////////////////
		// element retrieval //
		///////////////////////
		// if therer is a selector defined,
		// call the find method on the dest object.
		$el = dest.selector ?
			$el.find(dest.selector) : $el;

		//////////////////////
		// value formatting //
		//////////////////////
		var format = dest.format;
		if (format) {


			// get format "in"
			var formatter = bbmvInstance[format.method];
			formatter = _.isFunction(formatter) ? formatter : formatter.out;

			if (!formatter) { throw new Error('[bbmv|destGet/destSet] ' + format.method + ' could not be found.'); }

			// clone args so that the original ones remain unchanged
			//
			// $el as first, value as last
			var formatterArgs = _.clone(format.args);
			formatterArgs.unshift($el);
			formatterArgs.push(value);

			return formatter.apply(bbmvInstance, formatterArgs);

		}



		//////////////////////
		// method execution //
		//////////////////////
		// clone the args array, so that the original one remains untouched
		// AND add the value to the arguments array
		var methodArgs = _.clone(dest.args);
		methodArgs.push(value);

		return bbmvInstance._exec(dest.method, methodArgs, $el);
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
			// use bbmvInstance's parseDestStr method.
			dests        = bbmvInstance.parseDestStr(destStr);

		_.each(dests, function (dest) {

			return destSetSingle(bbmvInstance, $el, dest, value);

		}, this);
	};
});
