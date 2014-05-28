define(function (require, exports, module) {
	'use strict';

	/**
	 * The string by which binding ddata attributes are prefixed.
	 * data-bind-somekey="method"
	 *
	 * @type {String}
	 */
	exports.prefix = 'bind';

	/**
	 * Method that returns ALL jquery elements that should
	 * have any data-binding.
	 *
	 * @return {[type]} [description]
	 */
	exports.boundElements = function boundElements() {
		// $el.add() creates a NEW SELECTION :)
		// it does not add to the existing jq object.
		var $boundChildElements = this.$el.find(':data-prefix(' + this.prefix + ')');
		return this.$el.add($boundChildElements);
	};


});
