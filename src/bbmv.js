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

	var mvPipe = require('bbmv/pipe/index'),
		aux    = require('bbmv/aux');


	function genPipeIdAttr() {
		return ['bbdv', this.namespace, this.cid, 'id'].join('_');
	}

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
		 * Binding namespace.
		 * Used to build custom selectors for custom bindings.
		 */
	//	binding: 'data',

		/**
		 * Data atttribute for the binding event name.
		 * @type {String}
		 */
		bindingEventAttribute: 'binding-event',


		// OVERRIDES //

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

			if (this.binding) {
				// use binding selector
				return '[data-binding="' + this.binding + '"]';
			} else {
				// use data prefix selector
				// (default)
				return ':data-prefix(' + namespace + ')';
			}

		},

		// OVERRIDES //


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
		 * Drains data from a single element
		 * @param  {[type]} $el [description]
		 * @return {[type]}     [description]
		 */
		drain: function drain($el, attributes, options) {

			this.pipe($el).drain(attributes, options);

			return this;
		},

		/**
		 * Attempts to get the pipe id from the $dest object
		 * and then checks for a pipe in cache.
		 *
		 * If no pipe is found in cache, instantiate a pipe
		 * set id onto $dest using the .data method
		 * and save pipe to cache using that id.
		 *
		 * @param  {[type]} $dest   [description]
		 * @param  {[type]} map     [description]
		 * @param  {[type]} options [description]
		 * @return {[type]}         [description]
		 */
		pipe: function definePipe($dest, map, options) {

			var pipe;

			// get the pipeid
			var pipeid = $dest.data(this.pipeIdAttr);

			if (pipeid && this.pipes[pipeid]) {
				// get pipe from cache
				pipe = this.pipes[pipeid];

				// if map is set,
				// set it.
				if (map) {

				}

			} else {
				// generate a unique id
				pipeid = _.uniqueId(this.pipeIdAttr);

				// set namespace onto options
				options = options || {};
				options.bbmvInstance = this;

				// create pipe
				pipe = this.pipes[pipeid] = mvPipe(this.model, $dest, map, options);

				// save pipe id on el.
				$dest.data(this.pipeIdAttr, pipeid);
			}

			return pipe;
		},
	});

	bbmv.assignProto(require('bbmv/directives/index'))
		.assignProto(require('bbmv/methods/if'))
		.assignProto(require('bbmv/methods/model-methods'));
});
