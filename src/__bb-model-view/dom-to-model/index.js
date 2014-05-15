/**
 * @module bb-model-view
 * @submodule dom-to-model
 */
define(function (require, exports, module) {
	'use strict';

	var _ = require('lodash');

	// internal
	var update = require('./update');


	/**
	 * Removes the method part from the bbmvSelector.
	 *
	 * @method parseJqSelector
	 * @param  {[type]} str [description]
	 * @return {[type]}     [description]
	 */
	function parseJqSelector(str) {
		// it refers to an input
		return str.replace(/\s*->.*$/, '');
	}

	/**
	 * This method tries to find and bind an element
	 * to the view.
	 *
	 * @method bindElement
	 * @param  {[type]} view         [description]
	 * @param  {[type]} bbmvSelector [description]
	 * @param  {[type]} attribute    [description]
	 * @return {[type]}              [description]
	 */
	function bindElement(view, bbmvSelector, attribute) {
		// bbmvSelector samples:
		// array          : ['.class->css:cssprop', '.class']
		// pure jquery    : '[data-attribute="url"]'
		// jquery + method: '[data-attribute="url"] -> css:color'

		if (_.isArray(bbmvSelector)) {
			// array          : ['.class->css:cssprop', '.class']
			// [1] if it is an array, just go recursive.
			_.each(bbmvSelector, function (bbmvSel) {
				bindElement(view, bbmvSel, attribute);
			});

		} else {
			// pure jquery    : '[data-attribute="url"]'
			// jquery + method: '[data-attribute="url"] -> css:color'

			// [1] generate BBMVUID
			var BBMVUID = _.uniqueId('bbmvEl_');

			// retrieve $el and check if it
			// is an input
			// [2] select the element.
				// [2.1] parse out the jquery element selector
			var selector = parseJqSelector(bbmvSelector),
				// [2.2] effectively select AND filter for the inputs.
				el = view.$el.find(selector).filter(':input');

			if (el.length > 0) {
				// [3] the el has an input, thus create the binding
				// using the BBMVUID
				view.bindings[BBMVUID] = {
					// the input element found
					el       : el,
					// pure jquery selector
					selector : selector,
					// attribute to which the element is bound to
					attribute: attribute,
				};

				// [3.1] store the BBMVUID onto the element using jquery.data method
				//       keyed by the bbmvUIDAttribute property of the view.
				el.data(view.bbmvUIDAttribute, BBMVUID);
			}
		}

	};



	/**
	 * Initialization logic for binding html input tags values
	 * to the models attributes.
	 *
	 * @method bindDOMToModel
	 */
	module.exports = function bindDOMToModel() {

		/**
		 * Hash where elements are referenced
		 * by their uuids (created by us)
		 *
		 * @property bindings
		 * @type Object
		 */
		this.bindings = {};

		// bind inputs.
		_.each(this.map, _.partial(bindElement, this));

		// build a jquery selector from the selectors
		// saved on bindings object.
		// The selector does not necessarily select
		// input elements EXCLUSIVELY.
		// The individual resulting selection from each
		// selector has at least one input element.
		// That is the closest we can get.
		var mightBeInputSelector = _.map(this.bindings, function (data, BBMVUID) {
			return data.selector;
		})
		.join(', ');

		this.$el.on('change', mightBeInputSelector, _.bind(update, this));
	};
});
