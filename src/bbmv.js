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
		$        = require('jquery'),
		backbone = require('lowercase-backbone');

	var mvPipe = require('bbmv/pipe/index'),
		aux    = require('bbmv/aux');


	/**
	 * Exports.
	 * @param  {[type]} initializeModelView: function                                               initializeModelView(options)                       {			if         (!this.model) { throw new Error('No model set for model view.'); }			if (!this.$el) { throw new Error('No el set on model view.'); }						var $boundElements = this.boundElements();									var pumpOptions = _.pick(options, pumpOptionNames [description]
	 * @return {[type]}                      [description]
	 */
	var bbmv = module.exports = backbone.view.extend({

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

			/**
			 * Array of pipes defined in the view.
			 *
			 * @type {Array}
			 */
			this.pipes = [];

			// [0] pick initialization options
			_.each(['namespace', 'event'], function (opt) {
				this[opt] = options[opt] || this[opt];
			}, this);

			// [1] find all elements that have bindings defined.
			var $boundElements = aux.findBoundElements(this.$el, this.namespace);

			// [2] set up pipes
			_.each($boundElements, function (el) {

				this.pipe($(el));

			}, this);


			// listen to changes on model
			this.model.on(this.event, function () {

				this.pump();

			}, this);
		},

		/**
		 * Event to be listened on the model.
		 *
		 * @type {String}
		 */
		event: 'change',

		/**
		 * The namespace that designates bound elements.
		 *
		 * @type {String}
		 */
		namespace: 'bind',


		mvPipe: mvPipe,

		/**
		 * Create a pipe.
		 *
		 * @param  {[type]} $dest [description]
		 * @return {[type]}             [description]
		 */
		pipe: function definePipe($dest, map, options) {

			options = options || {};

			options.namespace = options.namespace || this.namespace;
			options.bbmv      = this;

			var _pipe = mvPipe(this.model, $dest, map, options);

			// save pipe
			this.pipes.push(_pipe);

			return _pipe;
		},

		/**
		 * Pump data.
		 *
		 * @param  {[type]} argument [description]
		 * @return {[type]}          [description]
		 */
		pump: function pump() {
			_.each(this.pipes, function (pipe) {
				pipe.pump();
			});

			return this;
		},

		/**
		 * [drain description]
		 * @return {[type]} [description]
		 */
		drain: function drain() {
			_.each(this.pipes, function (pipe) {
				pipe.drain();
			});

			return this;
		}
	});
});
