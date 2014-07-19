define(function (require, exports, module) {
	'use strict';

	var _ = require('lodash');

	_.assign(exports, require('bbmv/pipe/aux/general'));

	exports.parseDestStr = require('bbmv/pipe/aux/parse-dest-str');

	exports.extractMaps = require('bbmv/pipe/aux/extract-maps');
});
