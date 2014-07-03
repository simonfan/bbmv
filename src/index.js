//     bbmv
//     (c) simonfan
//     bbmv is licensed under the MIT terms.

/**
 * The modeld is the object that links together $els and models.
 *
 * @module bbmv
 */

/* jshint ignore:start */
if (typeof define !== 'function') { var define = require('amdefine')(module) }
/* jshint ignore:end */

define(function (require, exports, module) {
	'use strict';


	var _        = require('lodash'),
		backbone = require('lowercase-backbone'),
		jqValue  = require('jquery-value');


	var bind = require('./__bbmv/bind');

	/**
	 * Name of parser and stringifier option names.
	 * @type {Array}
	 */
	var pumpOptionNames = ['parse', 'parsers', 'stringify', 'stringifiers', 'prefix', 'formats', 'methods'];


	/**
	 * Options that will be picked and set onto the object
	 * on initialization.
	 * @type {Array}
	 */
	var initializationOptions = ['prefix'];



	/**
	 * Exports.
	 * @param  {[type]} )                    {						backbone.view.prototype.initialize.apply(this, arguments);			this.initializeModelView.apply(this, arguments);		} [description]
	 * @param  {[type]} initializeModelView: function                                               initializeModelView(options)                       {			if         (!this.model) { throw new Error('No model set for model view.'); }			if (!this.$el) { throw new Error('No el set on model view.'); }						var $boundElements = this.boundElements();									var pumpOptions = _.pick(options, pumpOptionNames [description]
	 * @return {[type]}                      [description]
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

			// [0] pick initialization options
			_.each(initializationOptions, function (opt) {
				this[opt] = options[opt] || this[opt];
			}, this);

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
			bind.DOMToModel.call(this, $boundElements);

			// [4] listen to change events on the model
			bind.modelToDOM.call(this, this.model);

			// [5] initialize view by pumping the model data.
			this.updateView();
		},
	});

	bbModelView
		.assignProto(require('./__bbmv/update'))
		.assignProto(require('./__bbmv/model-pump'))
		.assignProto(require('./__bbmv/elements'));
});
