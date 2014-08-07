define(function (require, exports, module) {
	'use strict';

	var _        = require('lodash'),
		$        = require('jquery');

	exports.defaultDOMEvents = {

		// selector: event
		':text,textarea'                            : 'keyup',
		'input[type="checkbox"],input[type="radio"]': 'change',
		':button'                                   : 'click',
		'input[type="hidden"]'                      : 'change',
	};



	/**
	 * The directives to be exported.
	 */
	var directives = {};
	exports.directives = directives;

	// extend directives
	_.assign(directives, require('bbmv/directives/data-bind'));
	_.assign(directives, require('bbmv/directives/on'));
});
