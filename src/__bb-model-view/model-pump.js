//     bb-model-view
//     (c) simonfan
//     bb-model-view is licensed under the MIT terms.

/**
 * The modeld is the object that links together $els and models.
 *
 * @module bb-model-view
 */

/* jshint ignore:start */
if (typeof define !== 'function') { var define = require('amdefine')(module) }
/* jshint ignore:end */

define(function (require, exports, module) {
	'use strict';

	var jqPump = require('jquery-pump');



	var modelPump = module.exports = jqPump.extend({

		srcGet: function getFromModel(model, property) {
			return model.get(property);
		},

		srcSet: function setToModel(model, property, value) {
			return model.set(property, value);
		}

	});

});
