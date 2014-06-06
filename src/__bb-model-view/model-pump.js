define(function (require, exports, module) {
	'use strict';

	var jqPump = require('jquery-pump'),
		_      = require('lodash');

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
		},

		/**
		 * Method specified by pump API
		 * @param  {[type]} model    [description]
		 * @param  {[type]} property [description]
		 * @return {[type]}          [description]
		 */
		srcGet: function getFromModel(model, property) {

			return model.get(property);
		},

		/**
		 * Method specified by pump API
		 * @param  {[type]} model    [description]
		 * @param  {[type]} property [description]
		 * @param  {[type]} value    [description]
		 * @return {[type]}          [description]
		 */
		srcSet: function setToModel(model, property, value) {

			return model.set(property, value);
		},
	});

});
