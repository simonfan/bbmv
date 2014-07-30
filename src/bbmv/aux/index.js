define(function (require, exports, module) {
	'use strict';

	var _ = require('lodash');

	_.assign(exports, require('bbmv/aux/general'));

	exports.parseDestStr = require('bbmv/aux/parse-dest-str');
});
