define(function (require, exports, module) {
	'use strict';

	var _ = require('lodash');

	_.assign(exports, require('bbmv/aux/general'));

	exports.parseDestStr = require('bbmv/aux/parse-dest-str');

	// :data-prefix(prefix) selector
	require('jquery-selector-data-prefix');
	/**
	 * Finds all bound elements within the pipe.
	 *
	 * @param  {[type]} $el    [description]
	 * @param  {[type]} namespace [description]
	 * @return {[type]}        [description]
	 */
	exports.findBoundElements = function findBoundElements($el, namespace) {
		// $el.add() creates a NEW SELECTION :)
		// it does not add to the existing jq object.
		var $boundDescendantElements = $el.find(':data-prefix(' + namespace + ')');
		return $el.add($boundDescendantElements);
	};

});
