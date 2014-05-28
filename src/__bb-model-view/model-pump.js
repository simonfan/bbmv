define(function (require, exports, module) {
	'use strict';

	var jqPump = require('jquery-pump'),
		_      = require('lodash');

	function _echo(v) {
		return v;
	}

	/**
	 * get parser or stringifier
	 * @private
	 * @return {[type]} [description]
	 */
	function _retrieveFunction(hash, property) {

		if (!hash) {
			return _echo;
		}

		// get the func for the property
		var func = hash[property];

		if (!func) {
			return _echo;
		}

		// if func happens to be a string, get the referred func.
		return _.isFunction(func) ? func : hash[func];
	}

	exports.modelPump = jqPump.extend({


		/**
		 * Initializes pump and picks strngifiers and parser options.
		 *
		 * @param  {[type]} source  [description]
		 * @param  {[type]} options [description]
		 * @return {[type]}         [description]
		 */
		initialize: function initializeModelPump(source, options) {


			// bind methods
			_.bindAll(this, ['srcGet', 'srcSet']);

			// initialize pump
			jqPump.prototype.initialize.call(this, source, options);
			// set the bbmvID as data attribute to the destination els.
			// that is for the html->model binding



			// pick strngifier and parser methods
			options = options || {};
			_.each(['stringify', 'stringifiers', 'parsers', 'parse'], function (prop) {
				this[prop] = options[prop] || this[prop];
			}, this);



			var pump = this;

			_.each(this.pipes, function (pipe, pipeId) {
				var $el = pipe.destination;

				// set bbmvID
				$el.data(this.bbmvIDAttribute, pipeId);
			}, this);
		},

		/**
		 * The name of the data attribute that should store the uuid for element.
		 * Used to listen to changes.
		 *
		 * @property bbmvID description]
		 * @type {String}
		 */
		bbmvIDAttribute: 'bbmvID',

		/**
		 * Method specified by pump API
		 * @param  {[type]} model    [description]
		 * @param  {[type]} property [description]
		 * @return {[type]}          [description]
		 */
		srcGet: function getFromModel(model, property) {
			var value = model.get(property);

			return this.stringify(property, value);
		},

		/**
		 * Method specified by pump API
		 * @param  {[type]} model    [description]
		 * @param  {[type]} property [description]
		 * @param  {[type]} value    [description]
		 * @return {[type]}          [description]
		 */
		srcSet: function setToModel(model, property, value) {

			var value = model.set(property, value);

			return this.parse(property, value);
		},

		/**
		 * Hash to hold stringifiers.
		 * @type {Object}
		 */
		stringifiers: {},
		stringify: function stringify(property, value) {


			var stringifier = _retrieveFunction(this.stringifiers, property);

			return stringifier(value);
		},

		parsers: {},
		parse: function parse(property, value) {

			var parser = _retrieveFunction(this.parsers, property);

			return parser(value);
		},



	});

});
