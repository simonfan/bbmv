define(function defBbdvParsers(require, exports) {

	var _ = require('lodash');

	var aux = require('bbmv/aux/index');


	exports.execInvocationString = function execInvocationString(invocationString /* args */) {

		var invocation = aux.parseInvocationString(invocationString);

		// build arguments array
		var executionArgs = _.toArray(arguments).slice(1).concat(invocation.args);

		return this[invocation.method].apply(this, executionArgs);
	};
});
