define(function (require, exports, module) {
	'use strict';

	var _ = require('lodash');

	_.assign(exports, require('bbmv/aux/general'));

	exports.parseDestStr = require('bbmv/aux/parse-dest-str');


	/**
	 * Finds the default DOM event
	 * for an $el.
	 * Must take an events hash as second argument.
	 *
	 * @param  {[type]} $el        [description]
	 * @param  {[type]} eventsHash [description]
	 * @return {[type]}            [description]
	 */
	exports.getDefaultDOMEvent = function getDefaultDOMEvent($el, eventsHash) {

		return _.find(eventsHash, function (event, selector) {

			return $el.is(selector);

		});

	};

});
