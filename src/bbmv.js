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
		bbdv     = require('bbdv'),
		backbone = require('lowercase-backbone');

	var mvPipe = require('bbmv/pipe/index'),
		aux    = require('bbmv/aux');


	function genPipeIdAttr() {
		return ['bbdv', this.namespace, this.cid, 'id'].join('_');
	}

	var bbmv = module.exports = bbdv.extend({

		initialize: function initializeBbmv(options) {

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

				console.log('change')

				this.pump();

			}, this);

			// initial pump
			this.pump();

		},

		event: 'change',


		namespace: 'bind',

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
		drain: function drain($el) {

			this.pipe($el).drain();

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

			} else {
				// generate a unique id
				pipeid = _.uniqueId(this.pipeIdAttr);

				// set namespace onto options
				options = options || {};
				options.context = this;

				// create pipe
				pipe = this.pipes[pipeid] = mvPipe(this.model, $dest, map, options);

				// save pipe id on el.
				$dest.data(this.pipeIdAttr, pipeid);
			}

			return pipe;
		},

		hide: function ($el) {
			$el.hide();
		}
	});

	bbmv.assignProto(require('bbmv/directives'));
});
