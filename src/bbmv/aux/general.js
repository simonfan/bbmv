define(function (require, exports, module) {
	'use strict';

	var _ = require('lodash');


	/**
	 * Copied from Epeli's underscore.string "camelize"
	 * https://github.com/epeli/underscore.string/blob/master/lib/underscore.string.js
	 *
	 * @param  {[type]} str [description]
	 * @return {[type]}     [description]
	 */
	exports.camelCase = function camelCase(str) {
		return str.replace(/[-_\s]+(.)?/g, function(match, c){ return c ? c.toUpperCase() : ""; });
	};



	/**
	 * Adapted from Epeli's underscore.string "trim"
	 * https://github.com/epeli/underscore.string/blob/master/lib/underscore.string.js
	 *
	 * @param  {[type]} str        [description]
	 * @param  {[type]} characters [description]
	 * @return {[type]}            [description]
	 */
	var leftAndRightWhitespace = /^\s+|\s+$/g;
	exports.trim = function trim(str){
		if (str == null) return '';
		if (String.prototype.trim) return str.trim();
		return String(str).replace(leftAndRightWhitespace, '');
	};

//	/^prefix([A-Z$_].*$|$)/;

	/**
	 * Creates a Regular Expression to capture property name.
	 *
	 *
	 */
	exports.buildPrefixRegExp = function buildPrefixRegExp(prefixes) {

		prefixes = _.isArray(prefixes) ? prefixes : [prefixes];

		return new RegExp('^(?:' + prefixes.join('|') + ')([A-Z$_].*$)?');
	};

	/**
	 * Returns the string with the first letter to lowercase.
	 */
	exports.lowercaseFirst = function lowercaseFirst(str) {
		return str.charAt(0).toLowerCase() + str.slice(1);
	};

	/**
	 * Returns the string with the first letter to uppercase.
	 */
	exports.uppercaseFirst = function uppercaseFirst(str) {
		return str.charAt(0).toUpperCase() + str.slice(1);
	};
});
