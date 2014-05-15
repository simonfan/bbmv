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

	var _ = require('lodash'),
		modelDock = require('bb-dock').model,
		backbone = require('lowercase-backbone');

	// initializers
	var bindModelToDOM = require('./__bb-model-view/model-to-dom/index'),
		bindDOMToModel = require('./__bb-model-view/dom-to-model/index');

	/**
	 * The constructor for the bbModelView object.
	 *
	 * @method bbModelView
	 * @constructor
	 * @param extensions {Object}
	 *     @param $el {Object}
	 *         The $el that owns the bbModelView object
	 *     @param map {Object}
	 *         Map that links selectors to attributes
	 *     @param [model] {Object}
	 *         Optionally provide a model that will initially fill the $el.
	 */
	var bbModelView = module.exports = backbone.view.extend({

		initialize: function initialize() {
			// initialize basic backbone view
			backbone.view.prototype.initialize.apply(this, arguments);

			this.initializeModelView.apply(this, arguments);
		},

		/**
		 * Holds initialization logic for modelmodeld.
		 *
		 * @method initializeModelView
		 * @param options {Object}
		 */
		initializeModelView: function initializeModelView(options) {

			if (!this.model) {
				throw new Error('No model set for model view.');
			}

			options = options || {};

			this.map = options.map || this.map;
			this.parsers = options.parsers || this.parsers;
			this.sringifiers = options.stringifiers || this.stringifiers;

			// initialize model-to-dom attach logic.
			bindModelToDOM.call(this);
			bindDOMToModel.call(this);
		},

		/**
		 * Map that identifies selectors for attribvutes.
		 *
		 * @property map
		 */
		map: {},


		stringifiers: {},

		/**
		 * Hash for the parsers. Every parser function is called
		 * within the's context and takes the value read
		 * from the DOM as arugment.
		 *
		 * @property parsers
		 * @type Object
		 */
		parsers: {},
	});
});
