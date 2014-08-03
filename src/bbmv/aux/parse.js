define(function (require, exports, module) {
	'use strict';

	var _ = require('lodash');

	// load main aux
	var aux = require('bbmv/aux/index');

	/**
	 * Cache for parsing.
	 * @type {Object}
	 */
	var cache = {};


	var newline = /\n/g;



	// 'currency|.selector->attr:value'
	// 'format|.selector -> method:partial1'
	// 'currency|html'
	// 'html'
	var arrow = /\s*->\s*/;

	function parseMethodString(str) {

		var res = {};

		// attempt to split the 'method' in .selector->method
		var split = str.split(arrow);

		if (split.length === 2) {
			// there is a selector
			// split = [selector, method]
			res.method   = aux.trim(split[1]);
			res.selector = aux.trim(split[0]);
		} else {
			// no selector
			res.method = aux.trim(str);
		}

		return res;
	}
	exports.parseMethodString = parseMethodString;



	/**
	 * Parses a string into methodName and args.
	 * Example string: 'css(background-color)'
	 *                 'attr(href)'
	 *                 'val'
	 *                 'someMethod(arg1, arg2, arg3)'
	 * @param  {[type]} str [description]
	 * @return {[type]}     [description]
	 */
	// \s*(.*?)\s*   match anything that precedes
	// (?:
	//   \(            parenthesis opening
	//   \s*(.*)       whatever is within
	//   \)(?!\s*->)   until a closing parenthesis not followed by any arrow
	// )
	// $
	var methodStrRegExp = /\s*(.*?)\s*(?:\(\s*(.*)\s*\)\s*(?!->))?$/,
		commaSplitter   = /\s*,\s*/g;

	function parseInvocationString(str) {
		// only do parsing if result is not found in cache.
		if (cache[str]) {
			return cache[str];
		}


		// create a var to hold the method invoking definition.
		var idef = {};

		// remove newlines from str
		// and attempt match.
		var match = str.replace(newline, '').match(methodStrRegExp);

		// parse out invocationString
		var invocationString = match[1];
		_.assign(idef, parseMethodString(invocationString));

		// parse out methodArgs
		idef.args = match[2] ? match[2].split(commaSplitter) : [];
		if (idef.args.length > 0) {
			// trim first and last
			idef.args[0]                    = aux.trim(idef.args[0]);
			idef.args[idef.args.length - 1] = aux.trim(_.last(idef.args));
		}

		// save to cache using original str value
		cache[str] = idef;

		return idef;
	}
	exports.parseInvocationString = parseInvocationString;

});
