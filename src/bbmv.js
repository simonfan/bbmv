//     bbmv
//     (c) simonfan
//     bbmv is licensed under the MIT terms.

/**
 * The modeld is the object that links together $els and models.
 *
 * @module bbmv
 */

define(function (require, exports, module) {
	'use strict';

	require('jquery-selector-data-prefix');

	var _        = require('lodash'),
		$        = require('jquery'),
		bbdv     = require('bbdv'),
		backbone = require('lowercase-backbone');

	var aux = require('bbmv/aux/index');

	function genPipeIdAttr() {
		return ['bbdv', this.namespace, this.cid, 'id'].join('_');
	}

	// direct reference to incorporate
	var _incorporate = bbdv.prototype.incorporate;

	var bbmv = module.exports = bbdv.extend({

		initialize: function initializeBbmv(options) {
			options = options || {};

			// pick some options
			_.each(['namespace', 'binding', 'event', 'bindingEventAttribute'], function (opt) {
				this[opt] = options[opt] || this[opt];
			}, this);

			this.namespace = options.namespace || this.namespace;

			/**
			 * The attribute used to store the pipe id
			 * onto the $dest elements.
			 *
			 * @type {[type]}
			 */
			this.pipeIdAttr = genPipeIdAttr.call(this);

			this.pipes = {};

			bbdv.prototype.initialize.call(this, options);

			if (!this.model) { throw new Error('No model set for model view.'); }
			if (!this.$el) { throw new Error('No el set on model view.'); }

			// listen to changes on model
			this.model.on(this.event, function () {
				this.pump();
			}, this);

			// initial pump
			this.pump();

		},

		/**
		 * Event to listen on the model.
		 * @type {String}
		 */
		event: 'change',

		/**
		 * Data atttribute for the binding event name.
		 * @type {String}
		 */
		bindingEventAttribute: 'binding-event',

		///////////////
		// OVERRIDES //
		///////////////

		/**
		 * Directive namespace
		 * used for bbdv.
		 * @type {String}
		 */
		namespace: 'bind',
		/**
		 * Builds the selector to get the elements to be
		 * in the directive view.
		 *
		 * If the binding attribute is set, use it to build
		 * a custom selector.
		 * Otherwise. use the data-prefix selector.
		 *
		 * @param  {[type]} namespace [description]
		 * @return {[type]}           [description]
		 */
		selector: function bbmvBoundSelector(namespace) {

			// use data prefix selector
			return ':data-prefix(' + aux.camelCase(namespace) + ')';

		},

		/**
		 * Override the incorporate method in order to insert a call
		 * to '.pump' right after the incorporation.
		 */
		incorporate: function incorporateElToModelView($el) {

			// invoke original incorporate function
			_incorporate.call(this, $el);

			// invoke pump
			this.pump();

			return this;

		},


	});

	bbmv.assignProto(require('bbmv/directives/index'))

		// methods
		.assignProto(require('bbmv/methods/aux'))
		.assignProto(require('bbmv/methods/if'))
		.assignProto(require('bbmv/methods/model'))
		.assignProto(require('bbmv/methods/jquery/native'))
		.assignProto(require('bbmv/methods/jquery/extensions/value'))
		.assignProto(require('bbmv/methods/pipe'));
});
