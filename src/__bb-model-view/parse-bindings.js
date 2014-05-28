/**
 * @module bb-model-view
 * @submodule dom-to-model
 */
define(function (require, exports, module) {
	'use strict';

	require('jquery-selector-data-prefix');

	var _ = require('lodash'),
		$ = require('jquery');

	module.exports = function parseBindings(el) {

		// find elements to be bound to an attribute of the model.
		var boundEls = el.find(this.bindingSelector);

	};
});
