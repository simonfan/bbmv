define(function defJqMethods(require, exports, module) {

	'use strict';

	var _ = require('lodash');

	var arity1 = ['html', 'val'];
	_.each(arity1, function defJqMethod(method) {

		exports[method] = function proxyJqMethod($el) {
			if (arguments.length === 1) {
				// get
				return $el[method]();
			} else if (arguments.length === 2) {
				// set
				return $el[method](arguments[1])
			}
		}
	});

	var arity2 = ['css', 'data'];
	_.each(arity2, function defJqMethod(method) {
		exports[method] = function proxyJqMethod($el) {

			if (arguments.length === 2) {
				// get
				return $el[method](arguments[1]);
			} else if (arguments.length === 3) {

				// set
				return $el[method](arguments[2], arguments[1])
			}
		}
	})

});
