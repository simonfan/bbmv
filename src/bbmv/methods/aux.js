define(function defBbdvParsers(require, exports) {
	'use strict';

	var _ = require('lodash'),
		$ = require('jquery');

	var aux = require('bbmv/aux/index');


	exports.execInvocationString = function execInvocationString(invocationString, $el /* args */) {

		var invocation = aux.parseInvocationString(invocationString);

		// find the right $el to apply action
		$el = invocation.selector ? $el.find(invocation.selector) : $el;

		// build arguments array
		var executionArgs = invocation.args.concat(_.toArray(arguments).slice(2));
		executionArgs.unshift($el);

		// get fn
		var fn = this[invocation.method];
		if (!_.isFunction(fn)) {
			throw new Error(invocation.method + ' is not a function.');
		}

		return fn.apply(this, executionArgs);
	};
});
