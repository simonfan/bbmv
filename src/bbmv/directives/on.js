define(function defEventDirectives(require, exports, module) {

	'use strict';

	var _ = require('lodash');

	var arrow = /\s*=>\s*/;
	/**
	 * Event directive, binds events to actions on the view.
	 *
	 * @param  {[type]} $el           [description]
	 * @param  {[type]} evtStr_evtMap [description]
	 * @return {[type]}               [description]
	 */
	exports.on = function bindEvent($el, evtStr_evtMap) {

		// keep reference to the view.
		var view = this;

		if (_.isObject(evtStr_evtMap)) {

			// loop through events.
			_.each(evtStr_evtMap, function (invocationString, evtName) {

				$el.on(evtName, function () {
					view.execInvocationString(invocationString, $el);
				});

			}, this);

		} else {

			// parse evtStr
			var evtStrSplit = evtStr_evtMap.split(arrow),
				evtName     = evtStrSplit[0],
				invocationString   = evtStrSplit[1];

			// set event listener
			$el.on(evtName, function () {
				view.execInvocationString(invocationString, $el);
			});
		}

	};

});
