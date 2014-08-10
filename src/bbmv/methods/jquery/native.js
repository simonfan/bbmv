define(function defJqMethods(require, exports, module) {

	'use strict';

	var _ = require('lodash');



	// animations
	var animations = ['fadeIn', 'fadeOut', 'fadeTo', 'fadeToggle', 'hide', 'show', 'toggle', 'remove'];


	var arity1 = [
		'addClass', 'after', 'append',
		'height', 'html',
		'offset',
		'prepend',
		'removeAttr', 'removeClass', 'removeData', 'removeProp',
		'replaceAll', 'replaceWith',
		'scrollLeft', 'scrollTop',
		'text', 'toggleClass',
		'val',
		'width',
	];
	// _.each(arity1, function defJqMethod(method) {

	// 	exports[method] = function proxyJqMethod($el) {
	// 		if (arguments.length === 1) {
	// 			// get
	// 			return $el[method]();
	// 		} else if (arguments.length > 2) {
	// 			// set
	// 			return $el[method](arguments[1])
	// 		}
	// 	}
	// });

	var arity2 = ['attr', 'css', 'data', 'prop'];
	// _.each(arity2, function defJqMethod(method) {
	// 	exports[method] = function proxyJqMethod($el) {

	// 		if (arguments.length === 2) {
	// 			// get
	// 			return $el[method](arguments[1]);
	// 		} else if (arguments.length > 3) {

	// 			// set
	// 			return $el[method](arguments[2], arguments[1])
	// 		}
	// 	}
	// });


	var all = arity1.concat(arity2);

	_.each(all, function (method) {

		exports[method] = function proxyJqMethod($el) {

			var args = _.toArray(arguments).slice(1);

			return $el[method].apply($el, args);
		};
	});

	// always run these methods without arguments
	exports.hide = function hideEl($el) {
		return $el.hide();
	};

	exports.show = function showEl($el) {
		return $el.show();
	};
});
