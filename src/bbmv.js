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
		return ['bbdv', this.cid, this.namespace, 'id'].join('_');
	}

	var bbmv = bbdv.extend({

		initialize: function initializeBbmv(options) {

			this.namespace = options.namespace || this.namespace;


			this.pipeIdAttr = genPipeIdAttr.call(this);

			this.pipes = {};

			bbdv.prototype.initialize.call(this, options);

		},

		namespace: 'bind',


		directives: {
			'in': 'bindIn',
			'out': 'bindOut',
			'': 'bindDual',
			'dual': 'bindDual',
			'event': 'bindEvent'
		},

		pipe: function definePipe($el) {

			var pipe;

			// get the pipeid
			var pipeid = $el.data(this.pipeIdAttr);

			if (pipeid && this.pipes[pipeid]) {
				// get pipe from cache
				pipe = this.pipes[pipeid];

			} else {
				// generate a unique id
				pipeid = _.uniqueId(this.pipeIdAttr);

				// create pipe
				pipe = this.pipes[pipeid] = mvPipe(this.model, $el);

				// save pipe id on el.
				$el.data(this.pipeIdAttr, pipeid);
			}

			return pipe;
		},

		bindEvent: function bindEvent($el, event) {

			var pipe = this.pipe($el);

			if (_.isObject(event)) {

				_.each(event, function (attr, evt) {

					$el.on(evt, function () {
						pipe.drain(attr.split(/\s*,\s*/), { force: true });
					});
				});

			} else if (_.isString(event)) {
				$el.on(event, function () {
					pipe.drain({ force: true });
				});
			}
		},

		bindIn: function bindIn($el, map) {

			var pipe = this.pipe($el);

			pipe.map(map, 'from');
		},

		bindOut: function bindOut($el, map) {

			var pipe = this.pipe($el);
			pipe.map(map, 'to');
		},

		bindDual: function bindDual($el, map) {
			var pipe = this.pipe($el);
			pipe.map(map, 'both');
		}
	});


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

			// initial pump
			this.pump();
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
