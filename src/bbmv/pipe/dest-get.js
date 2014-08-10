define(function (require, exports, module) {
	'use strict';


	// make jquery.value available for reading usage.
	var _       = require('lodash');

	var aux     = require('bbmv/aux/index'),
		pipeAux = require('bbmv/pipe/aux');


	var semicolonSplitter = /\s*;\s*/,
		pipeSplitter      = /\s*\|\s*/;

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

		// parse destStr
		// destDef = [{ format: String|undefined, invocationString: String}];
		var destDef = pipeAux.parseDestStr(destStr)[0];

		var value = bbmvInstance.execInvocationString(destDef.invocationString, $el);

		////////////////
		// formatting //
		////////////////
		// check if a format was defined
		var format = destDef.format;
		if (format) {

			// get "in" formatter
			var formatter = bbmvInstance[format.method];
			formatter = _.isFunction(formatter) ? formatter : formatter['in'];

			if (!formatter) { throw new Error('[bbmv|destGet] ' + format.method + ' could not be found.'); }

			// clone args so that the original ones remain unchanged
			var formatterArgs = _.clone(format.args);

			// value as last
			formatterArgs.push(value);

			// run formatting.
			value = formatter.apply(bbmvInstance, formatterArgs);
		}

		return value;
	};
});
