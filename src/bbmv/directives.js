define(function (require, exports, module) {
	'use strict';


	var _        = require('lodash'),
		$        = require('jquery');

	exports.directives = {
		'in': 'bindIn',
		'out': 'bindOut',
		'dual': 'bindDual',
		'on': 'bindEvent',
		'set': 'bindSet',
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

		// var pipe = this.pipe($el);

		// if (_.isObject(event)) {

		// 	_.each(event, function (attr, evt) {

		// 		$el.on(evt, function () {
		// 			pipe.drain(attr.split(/\s*,\s*/), { force: true });
		// 		});
		// 	});

		// } else {

		// 	event = (_.isString(event) && event !== '') ? event : this.defaultDOMEvents[$el.prop('tagName')];

		// 	$el.on(event, _.partial(_.bind(pipe.drain, pipe), { force: true }));
		// }
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
	exports.bindIn = {
		args: ['on'],

		fn: function bindIn($el, map, on) {

		//	console.log('bindIn');
		//	console.log($el[0]);
		//	console.log(map);

			var pipe = this.pipe($el);
			pipe.map(map, 'from');

			var evt = on || this.defaultDOMEvents[$el.prop('tagName')];


			if (evt) {
				$el.on(evt, function () {
					pipe.drain({ force: true });
				});
			}
		}
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


		var pipe = this.pipe($el);
		pipe.map(map, 'to');

	//	console.log('bindOut');
	//	console.log($el[0]);
	//	console.log(map);
	};

	/**
	 * Dual way data binding.
	 *
	 * @param  {[type]} $el [description]
	 * @param  {[type]} map [description]
	 * @return {[type]}     [description]
	 */
	exports.bindDual = {
		args: ['on'],
		exclude: ['on'],
		fn: function bindDual($el, map, on) {

		//	console.log('bindDual');
		//	console.log($el[0]);
		//	console.log(map);

			var evt = on || this.defaultDOMEvents[$el.prop('tagName')];

			if (evt) {
				$el.on(evt, function () {
					pipe.drain({ force: true });
				});
			}

			var pipe = this.pipe($el);
			pipe.map(map, 'both');
		},
	};

	exports.bindSet = {
		args: ['on'],
		fn: function bindSet($el, map, on) {

			var evt = on || this.defaultDOMEvents[$el.prop('tagName')];

			$el.on(on, _.partial(_.bind(this.model.set, this.model), map) );
		}

	};

});
