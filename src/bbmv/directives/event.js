define(function defEventDirectives(require, exports, module) {

	'use strict';

	var _ = require('lodash');


	var arrowRegExp = /\s*=>\s*/,
		colonRegExp = /\s*:\s*/,
		commaRegExp = /\s*,\s*/;


	/**
	 * Parses the methos string into an object
	 * with name and arguments array.
	 *
	 * method: arg1, arg2
	 *
	 * @param  {[type]} methodStr [description]
	 * @return {[type]}           [description]
	 */
	function parseMethodStr(methodStr) {

		// parse methodStr
		var methodStrSplit = methodStr.split(colonRegExp),
			methodName     = methodStrSplit[0],
			methodArgsStr  = methodStrSplit[1];

		// parse argsStr
		var methodArgs = methodArgsStr ? methodArgsStr.split(commaRegExp) : [];

		return {
			name: methodName,
			args: methodArgs
		};
	}

	/**
	 * Parses the event string into an object
	 * with evetn name, method and arguments for the method.
	 *
	 * event=>method: arg1, arg2
	 *
	 * @param  {[type]} evtStr [description]
	 * @return {[type]}        [description]
	 */
	function parseEvtStr(evtStr) {

		// parse evtStr
		var evtStrSplit = evtStr.split(arrowRegExp),
			evtName     = evtStrSplit[0],
			methodStr   = evtStrSplit[1];

		return {
			name      : evtName,
			method    : parseMethodStr(methodStr)
		};
	}

	/**
	 * Sets an event listener that tries to invoke
	 * a method either on the $el or on the bbmv view instance.
	 *
	 * @param {[type]} view      [description]
	 * @param {[type]} $el       [description]
	 * @param {[type]} evtName   [description]
	 * @param {[type]} methodStr [description]
	 */
	function setEventListener(view, $el, evtName, methodStr) {

		// parse out the method.
		var method = parseMethodStr(methodStr);

		// set listener
		$el.on(evtName, function () {

			// if method is available on the $el,
			// use the $el method.
			// otherwise, use the view's method
			// passing the $el as first argument.

			if ($el[method.name]) {
				// run the method defined on $el.
				$el[method.name].apply($el, method.args);

			} else {
				// run the method defined on the view
				// passing the $el as the first argument
				method.args.unshift($el);
				view[method.name].apply(view, method.args);
			}
		});

	}

	/**
	 * Event directive, binds events to actions on the view.
	 *
	 * @param  {[type]} $el           [description]
	 * @param  {[type]} evtStr_evtMap [description]
	 * @return {[type]}               [description]
	 */
	exports['on'] = function bindEvent($el, evtStr_evtMap) {

		// keep reference to the view.
		var view = this;

		if (_.isObject(evtStr_evtMap)) {

			// loop through events.
			_.each(evtStr_evtMap, function (methodStr, evtName) {

				// set event listener
				setEventListener(this, $el, evtName, methodStr);

			}, this);

		} else {

			// parse evtStr
			var evtStrSplit = evtStr_evtMap.split(arrowRegExp),
				evtName     = evtStrSplit[0],
				methodStr   = evtStrSplit[1];

			// set event listener
			setEventListener(this, $el, evtName, methodStr);
		}

	};

});
