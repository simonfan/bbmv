define(function defPipeAux(require, exports) {

	var _ = require('lodash');

	var aux = require('bbmv/aux/index');

	var cache = {};

	var semicolonSplitter = /\s*;\s*/,
		pipeSplitter      = /\s*\|\s*/,
		newline           = /\n/g;

	// format | .selector -> method; another-format -> method
	exports.parseDestStr = function parseDestStr(str) {

		if (cache[str]) {
			return cache[str];
		}

		// break the string
		var destDefStrArr = str.replace(newline, '').split(semicolonSplitter);

		// loop and build the dest definition
		var destDefs = _.map(destDefStrArr, function (s) {

			var d = {};

			var formatSplit = s.split(pipeSplitter);

			if (formatSplit.length === 2) {
				// format available
				d.format       = aux.parseInvocationString(formatSplit[0]);
				d.invocationString = formatSplit[1];
			} else {
				// no format
				d.invocationString = formatSplit[0];
			}

			return d;
		});

		cache[str] = destDefs;

		return destDefs;

	};

});
