define(function defPipeMethodsModelMethods(require, exports, module) {

	'use strict';

	exports.save = function saveModel($el) {
		return this.model.save();
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

});
