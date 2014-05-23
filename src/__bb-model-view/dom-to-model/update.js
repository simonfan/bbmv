/**
 * @module bb-model-view
 * @submodule dom-to-model-update
 */
define(function (require, exports, module) {
	'use strict';

	var $ = require('jquery'),
		_ = require('lodash');

	// reads the value from DOM elements.
	var readDomValue = require('./read-dom-value');

	/**
	 * 'change' event handler for all elements selected by selectors
	 * defined on map that select at least one input element.
	 *
	 * Only propagates modifications from REGISTERED elements.
	 *
	 * @method updateModel
	 * @private
	 * @param e {Event}
	 */
	module.exports = function updateModel(e) {
			// [0] wrap the target into a jquery object
		var $target = $(e.target),
			// [1] retrieve the BBMVUID set on the $target.
			BBMVUID = $target.data(this.bbmvUIDAttribute);

		// [2] verify that the BBMVUID effectively exists
		//     and refers to a binding of THIS view (not from another bb-model-view)
		if (!_.isUndefined(BBMVUID) && this.bindings[BBMVUID]) {

			// [2.1] get the binding data description
			var bindingData = this.bindings[BBMVUID];

			// [2.2] read the value and parse it
			var attribute = bindingData.attribute,
				value     = readDomValue($target),
				parse     = this.parsers[attribute];

			// [2.3] do parsing.
			value = parse ? parse.call(this, value) : value;

			// [2.4] set.
			this.model.set(attribute, value);
		}
	};
});
