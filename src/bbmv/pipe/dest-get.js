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
		var dest = this.parseDestStr(destStr)[0];

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
			$el.find(dest.selector) :
			$el;

		//////////////////////
		// method retrieval //
		// and execution    //
		//////////////////////
		// get the method
		var methodName = dest.method,
			methodArgs = _.clone(dest.args),
			value      = pipeAux.executeMethod(bbmvInstance, $el, methodName, methodArgs);

		////////////////
		// formatting //
		////////////////
		// check if a format was defined
		value = dest.format ?
			pipeAux.format(bbmvInstance, $el, 'in', dest.format, value) :
			value;

		return value;
	};
});
