define(function (require, exports, module) {

	var $ = require('jquery'),
		_ = require('lodash');

	// circular...
	var aux = require('bbmv/pipe/aux/general');


	// reserved 'post-namespacees' (the word that goes after the namespace.)
	var reserved = ['Event', 'Scope'];


	function buildRegExps(namespace) {

		return {
			'in'    : aux.buildPrefixRegExp(namespace + 'In'),
			out     : aux.buildPrefixRegExp(namespace + 'Out'),
			dual    : aux.buildPrefixRegExp(namespace + 'Dual'),
			reserved: aux.buildPrefixRegExp(_.map(reserved, function (word) {
				return namespace + word;
			})),

			all     : aux.buildPrefixRegExp(namespace),
		};
	}

	/**
	 * [exports description]
	 * @param  {[type]} $el [description]
	 * @return {[type]}     [description]
	 */
	module.exports = function extractBindingsMap($el, namespace) {

		if (!namespace) {
			throw new Error('[bbmv-pipe-extract-maps] No namespace defined for binding map extraction.')
		}

		var maps = {
			in: {},
			out: {},
			dual: {}
		};

		var data = $el.data();

		// build regexps
		var re = buildRegExps(namespace);

		_.each(data, function (value, key) {

			var match;

			// try to match "in"
			if (match = key.match(re.in)) {
				// <div data-bind-in-attribute="html"></div>
				// in bind
				key = aux.lowercaseFirst(match[1]);

				maps.in[key] = value;

			} else if (match = key.match(re.out)) {
				// <div data-bind-out-attribute="html"></div>
				// out bind
				key = aux.lowercaseFirst(match[1]);

				maps.out[key] = value;

			} else if (match = key.match(re.dual)) {
				// <div data-bind-dual-attribute="html"></div>
				// dual bind
				key = aux.lowercaseFirst(match[1]);

				maps.dual[key] = value;

			} else if (!re.reserved.test(key) && re.all.test(key)) {

				// <div data-bind-attribute="method"></div>
				//
				// check if there is a reserved keyword in
				// the data value.
				// if no reserved keywords,
				// set them for dual binding.
				// not reserved, thus, dual bind
				match = key.match(re.all);
				key   = aux.lowercaseFirst(match[1]);

				maps.dual[key] = value;
			}

		});

		return maps;
	};
});
