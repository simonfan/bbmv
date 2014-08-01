define(function (require, exports) {

	var _ = require('lodash');

	var aux = require('bbmv/aux/index');


	exports._parseDestStr = function _parseDestStr(destStr) {
		// attempt to get the parsed version from cache.
		// if available in cache, return it.
		// otherwise, parse it out and then return

		var parsed = this._parsedDestStrs[destStr];

		if (!parsed) {
			parsed = this._parsedDestStrs[destStr] = aux.parseDestStr(destStr);
		}

		return parsed;
	};



	exports._exec = function _exec(methodName, args, $el) {

		args = _.clone(args);
		args.unshift($el);

		return this[method.name].apply(this, args);
	};

});
