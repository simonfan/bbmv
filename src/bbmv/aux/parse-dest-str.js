define(function (require, exports, module) {
	'use strict';

	var _ = require('lodash');

	/**
	 * Parses a string into methodName and args.
	 * Example string: 'css:background-color'
	 *                 'attr:href'
	 *                 'val'
	 *                 'someMethod:arg1, arg2, arg3;'
	 * @param  {[type]} str [description]
	 * @return {[type]}     [description]
	 */
	var colonSplitter = /\s*:\s*/g,
		commaSplitter = /\s*,\s*/g;

	function parseMethodString(str) {

			// method:$argsString
		var methodAndArgsSplit = str.split(colonSplitter),
			method             = methodAndArgsSplit[0],
			argsString         = methodAndArgsSplit[1];

			// arg1, arg2, arg3
		var args = argsString ? argsString.split(commaSplitter) : [];

		return {
			method  : method,
			args    : args
		};
	};
	exports.methodString = parseMethodString;

	/**
	 * Returns optionally destProp string and method string
	 * [0] full match
	 * [1] selector
	 * [2] method string
	 */
//	var destPropMatcher = /(?:(.+?)\s*->)?\s*(.+)\s*/;
//	function parseDestProp(str) {
//
//		var match = str.match(destPropMatcher);
//
//		return {
//			selector    : match[1],
//			methodString: match[2]
//		};
//	};



	var destPropMatcher = /\s*(?:(.+?)\s*\|)?\s*(?:(.+?)\s*->)?\s*(.+)\s*/,
		newLine         = /\n/g;
	// \s*(?:(.+?)\s*\|)? -> optional format |
	// \s*(?:(.+?)\s*->)? -> optional selector ->
	// \s*(.+)\s*/     -> required methodString
	//

	// 'currency|.selector->attr:value'
	// 'format|.selector -> method:partial1'
	// 'currency|html'
	// 'html'
	/**
	 * Parses the destination property of the jquery-pump.
	 *
	 * @param  {[type]} str [description]
	 * @return {[type]}     [description]
	 */
	function parseDestProp(str) {
		// remove new lines :)
		str = str.replace(newLine, '');

		var match = str.match(destPropMatcher);

		// match[0] the full matched string
		// match[1] the format
		// match[2] the selector
		// match[3] the methodString

		// parse out the methodString
		var res = parseMethodString(match[3]);

		// set format and selector onto res;
		if (match[2]) {
			res.selector = match[2];
		}

		if (match[1]) {
			res.format   = parseMethodString(match[1]);
		}

		return res;
	}


	var semiColonSplitter = /\s*;\s*/g;
	// "method: arg1, arg2; method1: arg;"
	module.exports = function parseDestStr(destStr) {
		return _(destStr.split(semiColonSplitter)).map(parseDestProp).compact().value();
	};
});
