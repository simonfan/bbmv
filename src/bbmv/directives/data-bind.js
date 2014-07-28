define(function defBindDirectives(require, exports, module) {

	'use strict';

	var _ = require('lodash');



	/**
	 * Binds the $el data to the model in
	 * uni-directional mode:
	 * from DOM to MODEL
	 *
	 * @param  {[type]} $el [description]
	 * @param  {[type]} map [description]
	 * @return {[type]}     [description]
	 */
	exports['in'] = function bindIn($el, map) {

		//	console.log('bindIn');
		//	console.log($el[0]);
		//	console.log(map);

		var pipe = this.pipe($el);
		pipe.map(map, { direction: 'from' });

		var evt = $el.data(this.bindingEventAttribute) || this.defaultDOMEvents[$el.prop('tagName')];


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
	exports['out'] = function bindOut($el, map) {


		var pipe = this.pipe($el);
		pipe.map(map, { direction: 'to' });

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
	exports['dual'] = exports[''] = function bindDual($el, map) {

	//	console.log('bindDual');
	//	console.log($el[0]);
	//	console.log(map);

		var evt = $el.data(this.bindingEventAttribute) || this.defaultDOMEvents[$el.prop('tagName')];

		if (evt) {
			$el.on(evt, function () {
				pipe.drain({ force: true });
			});
		}

		var pipe = this.pipe($el);
		pipe.map(map, { direction: 'both' });
	};

	/**
	 * Set directive.
	 *
	 * @param  {[type]} $el [description]
	 * @param  {[type]} map [description]
	 * @return {[type]}     [description]
	 */
	exports['set'] = function bindSet($el, map) {

		var evt = $el.data(this.bindingEventAttribute) || this.defaultDOMEvents[$el.prop('tagName')];

		$el.on(evt, _.partial(_.bind(this.model.set, this.model), map));
	};



});
