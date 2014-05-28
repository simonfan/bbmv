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

	var _        = require('lodash'),
		backbone = require('lowercase-backbone'),
		jqPipe   = require('jquery-pipe');

		// builds the map from a string.
	var buildMap       = require('./__bb-model-view/build-map'),
		// initializers
		bindModelToDOM = require('./__bb-model-view/model-to-dom/index'),
		bindDOMToModel = require('./__bb-model-view/dom-to-model/index');


	var parseBindings = require('./__bb-model-view/parse-bindings');


	var initializeOptionNames = ['map', 'parsers', 'stringifiers'];

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

		/**
		 * The name of the data attribute that should store the uuid for element.
		 * Used to listen to changes.
		 *
		 * @property bbmvUIDAttribute description]
		 * @type {String}
		 */
		bbmvUIDAttribute: 'bbmvUID',

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

			_.defaults(options, _.pick(this, initializeOptionNames));
			_.assign(this, options);


			this.pipes = [];

			var pipe = this.el.pipe()

			// build onw pipe
			this.pipe = this.el.pipe()

		},

		prefix: 'bind',

		bindingSelector: ':data-prefix(bind)',


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
