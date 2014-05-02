//     bb-model-view
//     (c) simonfan
//     bb-model-view is licensed under the MIT terms.

/**
 * The dock is the object that links together $els and models.
 *
 * @module bb-model-view
 * @submodule $el.dock
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

			this.initializeModelDock.apply(this, arguments);
		},

		/**
		 * Holds initialization logic for modeldock.
		 *
		 * @method initializeModelDock
		 * @param options {Object}
		 */
		initializeModelDock: function initializeModelDock(options) {

			this.map = options.map || this.map;
			this.parsers = options.parsers || this.parsers;
			this.sringifiers = options.stringifiers || this.stringifiers;

			// create the dock
			this.dock = options.dock || modelDock();

			// initialize model-to-dom attach logic.
			bindModelToDOM.call(this);
			bindDOMToModel.call(this);

			// attach the initial model
			if (typeof options.model === 'object') {
				this.dock.attach(options.model);
			}
		},


		attach: function attach(model, options) {

			this.dock.attach(model, options);

			return this;
		},

		detach: function detach(options) {
			this.dock.detach(options);

			return this;
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
