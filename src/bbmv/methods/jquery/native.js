define(function defJqMethods(require, exports, module) {

	'use strict';

	var _ = require('lodash');

	var methods = ['html', 'val', 'css'];

	_.each(methods, function defJqMethod(method) {

		exports[method] = function mapToJqMethod() {
			var args = _.toArray(arguments),
				$el  = args.shift();

			return $el[method].apply($el, args);
		}
	});

});
