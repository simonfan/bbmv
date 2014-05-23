/**
 * @module bb-model-view
 * @submodule dom-to-model
 */
define(function (require, exports, module) {
	'use strict';

	var _ = require('lodash'),
		$ = require('jquery');

	var hasDataPrefix = /^data-.*$/;


	module.exports = function buildMap(parent, dname_or_dattribute) {

		// [0] parse out the data name and the data attribute strings.
		var dname, dattribute;
		if (hasDataPrefix.test(dname)) {
			// has data prefix data-whatever

			dname      = dname_or_dattribute.replace(hasDataPrefix, '');
			dattribute = dname_or_dattribute;

		} else if (!hasDataPrefix.test(dattribute)) {
			// does not have data attribute whatever

			dname      = dname_or_dattribute;
			dattribute = 'data-' + dname_or_dattribute;
		}

		// [1] build the selector to get ALL ELs that have
		//     the data attribute
		var selector = '[' + dattribute + ']';

		// [2] select elements
		var elements = parent.find(selector);

		// [3] build up the map formatted as:
		//     { modelAttribute: '[data-attribute="modelAttribute"]'}
		var map = _.reduce(elements, function (res, el, index) {

			// [3.1] the modelAttribute to which bind the element.
			var modelAttribute = $(el).data(dname);

			// [3.2] set the modelAttribute to the selector.
			res[modelAttribute] = '[' + dattribute + '="' + modelAttribute + '"]';

			return res;

		}, {});


		return map;
	};
});
