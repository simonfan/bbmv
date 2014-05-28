define(function (require, exports, module) {
	'use strict';

	var _ = require('lodash');

	/**
	 * Updates the view by pumping data from the source model.
	 *
	 * @return {[type]} [description]
	 */
	exports.updateView = function pumpModelDataToView() {
		var promise = this.pump.pump();

		this.ready = _.bind(promise.done, promise);

		return promise;
	};

	/**
	 * Updates the model draining data from the view.
	 *
	 * @param  {[type]} pipe [description]
	 * @return {[type]}      [description]
	 */
	exports.updateModel = function drainViewDataToModel(pipe) {
		var promise = this.pump.drain(pipe);

		this.ready = _.bind(promise.done, promise);

		return promise;
	};


});
