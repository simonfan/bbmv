/**
 * @module bb-model-view
 * @submodule model-to-dom
 */
define(function (require, exports, module) {
	'use strict';

	var filler = require('jquery.filler');


	// update function
	var _update = require('./update');


	/**
	 *
	 *
	 * @method bindModelToDOM
	 * @param $el {backbone.$el Object}
	 * @param map {Object}
	 */
	module.exports = function bindModelToDOM() {
		/**
		 * The function that will fill in html for us.
		 * Uses jquery.filler to build a cache of the
		 * jquery DOM selections.
		 *
		 * @method fill
		 * @param data {Object}
		 */
		this.fill = this.$el.filler(this.map);

		// Listen to modeld events
		// Dock proxies all events from the model

		// listenTo always invokes the event handler
		// in 'this' context
		this.listenTo(this.modeld, 'change attach', _update);
	};
});
