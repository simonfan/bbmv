define(function (require, exports, module) {
	'use strict';


	var _        = require('lodash'),
		backbone = require('lowercase-backbone'),
		jqValue  = require('jquery-value');


	exports.DOMToModel = function bindDOMToModel($boundElements) {

		$boundElements.on('change', _.bind(function (e) {

			var $target = $(e.target);

			this.updateModel($target);

			return false;
		}, this));
	};


	exports.modelToDOM = function bindModelToDOM(model) {
	// [4] listen to change events on the model
		model.on('change', _.bind(function (model) {

			this.updateView();

		}, this));
	};
});
