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
		$        = require('jquery');

	exports.directives = {
		'in': 'bindIn',
		'out': 'bindOut',
		'dual': 'bindDual',
		'event': 'bindEvent',
		'': 'bindDual',
	};


	exports.defaultDOMEvents = {
		'INPUT': 'change',
		'BUTTON': 'click',
	};

	/**
	 * Establishes a specific event on the DOM element
	 * to listen for drains.
	 *
	 * Does not remove the default event listeners set on input
	 * elements ('change').
	 *
	 * Those should be set on the 'defaultDOMEvents' hash.
	 *
	 *
	 * @param  {[type]} $el   [description]
	 * @param  {[type]} event [description]
	 * @return {[type]}       [description]
	 */
	exports.bindEvent = function bindEvent($el, event) {

		var pipe = this.pipe($el);

		if (_.isObject(event)) {

			_.each(event, function (attr, evt) {

				$el.on(evt, function () {
					pipe.drain(attr.split(/\s*,\s*/), { force: true });
				});
			});

		} else {

			event = (_.isString(event) && event !== '') ? event : this.defaultDOMEvents[$el.prop('tagName')];

			$el.on(event, _.partial(_.bind(pipe.drain, pipe), { force: true }));
		}
	};

	/**
	 * Binds the $el data to the model in
	 * uni-directional mode:
	 * from DOM to MODEL
	 *
	 * @param  {[type]} $el [description]
	 * @param  {[type]} map [description]
	 * @return {[type]}     [description]
	 */
	exports.bindIn = function bindIn($el, map) {

	//	console.log('bindIn');
	//	console.log($el[0]);
	//	console.log(map);

		var pipe = this.pipe($el);


		var evt = this.defaultDOMEvents[$el.prop('tagName')];

		console.log(this)

		if (evt) {
			$el.on(evt, function () {
				pipe.drain({ force: true });
			});
		}

		pipe.map(map, 'from');
	};

	/**
	 * Binds the model data to the $el in
	 * uni-directional mode:
	 * from MODEL to DOM
	 *
	 * @param  {[type]} $el [description]
	 * @param  {[type]} map [description]
	 * @return {[type]}     [description]
	 */
	exports.bindOut = function bindOut($el, map) {


	//	console.log('bindOut');
	//	console.log($el[0]);
	//	console.log(map);

		var pipe = this.pipe($el);
		pipe.map(map, 'to');
	};

	/**
	 * Dual way data binding.
	 *
	 * @param  {[type]} $el [description]
	 * @param  {[type]} map [description]
	 * @return {[type]}     [description]
	 */
	exports.bindDual = function bindDual($el, map) {

	//	console.log('bindDual');
	//	console.log($el[0]);
	//	console.log(map);

		var evt = this.defaultDOMEvents[$el.prop('tagName')];

		if (evt) {
			$el.on(evt, function () {
				pipe.drain({ force: true });
			});
		}

		var pipe = this.pipe($el);
		pipe.map(map, 'both');

	};
});
