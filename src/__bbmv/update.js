define(function (require, exports, module) {
	'use strict';

	var _ = require('lodash');

	/**
	 * Updates the view by pumping data from the source model.
	 *
	 * @return {[type]} [description]
	 */
	exports.updateView = function pumpModelDataToView() {

		this.pump.pump();

		return this;
	};

	/**
	 * Updates the model draining data from the view.
	 *
	 * @param  {[type]} pipe [description]
	 * @return {[type]}      [description]
	 */
	exports.updateModel = function drainViewDataToModel(pipe) {
		this.pump.drain(pipe);

		return this;
	};


});
