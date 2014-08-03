define(function defBbdvParsers(require, exports) {

	var _ = require('lodash'),
		$ = require('jquery');

	var aux = require('bbmv/aux/index');


	exports.execInvocationString = function execInvocationString(invocationString, $el /* args */) {

		var invocation = aux.parseInvocationString(invocationString);

		// find the right $el to apply action
		$el = invocation.selector ? $el.find(invocation.selector) : $el;

		// build arguments array
		var executionArgs = _.toArray(arguments).slice(2).concat(invocation.args);
		executionArgs.unshift($el);


		return this[invocation.method].apply(this, executionArgs);
	};
});
