/**
 * @module bb-model-view
 * @submodule dom-to-model
 */
define(function (require, exports, module) {
	'use strict';

	var _ = require('lodash');

	// internal
	var update = require('./update'),
		bindInput = require('./bind-input');

	/**
	 * Initialization logic for binding html input tags values
	 * to the models attributes.
	 *
	 * @method bindDOMToModel
	 */
	module.exports = function bindDOMToModel() {

		/**
		 * Hash where elements are referenced
		 * by their selector strings.
		 *
		 * @property $els
		 * @type Object
		 */
		this.$els = {};

		// bind inputs.
		_.each(this.map, _.bind(function (selector, attribute) {

			bindInput.call(this, selector, attribute);
		}, this));

		// build a selector string that selects the
		// elements that are input
		var selectors = _(this.$els).mapValues(function ($el, selector) {

			if ($el.is(':input')) {
				// it refers to an input
				return selector.replace(/\s*->.*$/, '');
			} else {
				return false;
			}
		})
		.values()
		.compact()
		.join(', ');

		this.$el.on('change', selectors, _.bind(update, this));
	};
});