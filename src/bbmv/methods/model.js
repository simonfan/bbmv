define(function defModelMethods(require, exports, module) {

	'use strict';

	////////////
	// Native //
	////////////
	exports.save = function saveModel($el) {
		return this.model.save();
	};


	exports.set = function setModel($el, attr, value) {
		return this.model.set(attr, value);
	};

	exports.fetch = function fetchModel($el) {
		return this.model.fetch();
	};

	exports.clear = function clearModel() {
		return this.model.clear();
	};

	exports.destroy = function destroyModel() {
		return this.model.destroy();
	};

	exports.validate = function validateModel() {
		return this.model.validate();
	};

	//////////////
	// Extended //
	//////////////
});
