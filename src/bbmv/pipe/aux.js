define(function defPipeAux(require, exports, module) {

	var _ = require('lodash');

	/**
	 * Shared formatting logic for dest-get and dest-set.
	 *
	 * @param  {[type]} bbmvInstance [description]
	 * @param  {[type]} $el          [description]
	 * @param  {[type]} direction    [description]
	 * @param  {[type]} format       [description]
	 * @param  {[type]} value        [description]
	 * @return {[type]}              [description]
	 */
	exports.format = function format(bbmvInstance, $el, direction, format, value) {


		// get format "in"
		var formatter = bbmvInstance[format.method];
		formatter = _.isFunction(formatter) ? formatter : formatter[direction];

		// clone args so that the original ones remain unchanged
		var formatterArgs = _.clone(format.args);
		formatterArgs.push(value);

		if (!formatter) { throw new Error('[bbmv|destGet/destSet] ' + format.method + ' could not be found.'); }

		return formatter.apply(bbmvInstance, formatterArgs);

	};

	/**
	 * Very specific execution method.
	 * Does method execution logic,
	 * is shared by both dest-get and dest-set.
	 *
	 * @param  {[type]} bbmvInstance [description]
	 * @param  {[type]} $el          [description]
	 * @param  {[type]} methodName   [description]
	 * @param  {[type]} methodArgs   [description]
	 * @return {[type]}              [description]
	 */
	exports.executeMethod = function executeMethod(bbmvInstance, $el, methodName, methodArgs) {

		// get the method
		if ($el[methodName]) {
			return $el[methodName].apply($el, methodArgs);
		} else {
			// add the $el to the args
			methodArgs.unshift($el);

			return bbmvInstance[methodName].apply(bbmvInstance, methodArgs);
		}

	};

});
