define(function (require, exports, module) {
	'use strict';

	var _        = require('lodash'),
		$        = require('jquery');

	exports.defaultDOMEvents = {
		'INPUT': 'change',
		'BUTTON': 'click',
	};


	/**
	 * The directives to be exported.
	 */
	var directives = {};
	exports.directives = directives;

	// extend directives
	_.assign(directives, require('bbmv/directives/data-bind'));
	_.assign(directives, require('bbmv/directives/event'));
});
