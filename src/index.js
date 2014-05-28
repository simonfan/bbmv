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


	// :data-prefix(prefix) selector
	require('jquery-selector-data-prefix');

	var _        = require('lodash'),
		backbone = require('lowercase-backbone'),
		jqValue  = require('jquery-value');

	/**
	 * Name of parser and stringifier option names.
	 * @type {Array}
	 */
	var pumpOptionNames = ['parse', 'parsers', 'stringify', 'stringifiers', 'prefix'];

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
			if (!this.model) { throw new Error('No model set for model view.'); }
			if (!this.$el) { throw new Error('No el set on model view.'); }

			// [1] find all elements that have bindings defined.
			var $boundElements = this.boundElements();

			// [2] create a jquery pump with those elements.
			// [2.1] get stringifiers and parsers
			var pumpOptions = _.pick(options, pumpOptionNames);
			_.defaults(pumpOptions, _.pick(this, pumpOptionNames));

			// [2.2] set destination
			pumpOptions.destination = $boundElements;

			// [2.2] effectively create the pump
			this.pump = this.modelPump(this.model, pumpOptions);

			// [3] listen to change events on $boundElements
			$boundElements.filter(':input').on('change', _.bind(function (e) {

				var pipeId = $(e.target).data(this.pump.bbmvIDAttribute);

				this.pump.drain(pipeId);
			}, this));


			// [4] listen to change events on the model
			this.model.on('change', _.bind(function (model) {

				this.pump.pump();
			}, this));

			// [3] initialize view by pumping the model data.
			this.updateView();
		},
	});

	bbModelView
		.assignProto(require('./__bb-model-view/update'))
		.assignProto(require('./__bb-model-view/model-pump'))
		.assignProto(require('./__bb-model-view/elements'));
});
