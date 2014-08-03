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
	function destSetSingle(bbmvInstance, $el, destDef, value) {
		// bb
		// if $el is active, do not set it.
		if ($el.is(':focus')) { return; }


		// dest:
		//   - method
		//   - args
		//   - format
		//   - selector

		//////////////////////
		// value formatting //
		//////////////////////
		var format = destDef.format;
		if (format) {


			// get format "in"
			var formatter = bbmvInstance[format.method];
			formatter = _.isFunction(formatter) ? formatter : formatter.out;

			if (!formatter) { throw new Error('[bbmv|destGet/destSet] ' + format.method + ' could not be found.'); }

			// clone args so that the original ones remain unchanged
			//
			// value as last!
			var formatterArgs = _.clone(format.args);
			formatterArgs.push(value);

			value = formatter.apply(bbmvInstance, formatterArgs);

		}

		return bbmvInstance.execInvocationString(destDef.invocationString, $el, value);
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
			// parse destStr
			// destDef = [{ format: String|undefined, invocationString: String}];
			destDefs      = pipeAux.parseDestStr(destStr);


		_.each(destDefs, function (destDef) {

			return destSetSingle(bbmvInstance, $el, destDef, value);

		}, this);
	};
});
