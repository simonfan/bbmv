define(function (require, exports, module) {
	'use strict';


	var _        = require('lodash'),
		$        = require('jquery');

	exports.directives = {
		'in': 'bindIn',
		'out': 'bindOut',
		'dual': 'bindDual',
		'set': 'bindSet',
		'': 'bindDual',
	};


	exports.defaultDOMEvents = {
		'INPUT': 'change',
		'BUTTON': 'click',
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
		pipe.map(map, 'from');

		var evt = $el.data(this.namespace + '-on') || this.defaultDOMEvents[$el.prop('tagName')];


		if (evt) {
			$el.on(evt, function () {
				pipe.drain({ force: true });
			});
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
		exclude: ['on'],
		fn: function bindDual($el, map) {

		//	console.log('bindDual');
		//	console.log($el[0]);
		//	console.log(map);

			var evt = $el.data(this.namespace + '-on') || this.defaultDOMEvents[$el.prop('tagName')];

			if (evt) {
				$el.on(evt, function () {
					pipe.drain({ force: true });
				});
			}

			var pipe = this.pipe($el);
			pipe.map(map, 'both');
		},
	};

	exports.bindSet = function bindSet($el, map) {

		var evt = $el.data(this.namespace + '-on') || this.defaultDOMEvents[$el.prop('tagName')];

		$el.on(evt, _.partial(_.bind(this.model.set, this.model), map) );
	};
});
