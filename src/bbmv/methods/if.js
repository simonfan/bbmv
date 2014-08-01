define(function (require, exports, module) {
	'use strict';

	var _ = require('lodash');

	// load aux
	var aux = require('bbmv/aux');

	var conditions = {
		'>'  : function gt(condition, value) { return parseFloat(value) > parseFloat(condition); },
		'>=' : function gte(condition, value) { return parseFloat(value) >= parseFloat(condition); },
		'<'  : function lt(condition, value) { return parseFloat(value) < parseFloat(condition); },
		'<=' : function lte(condition, value) { return parseFloat(value) <= parseFloat(condition); },
		's>' : function stringGt(condition, value) { return value > condition; },
		's>=': function stringGte(condition, value) { return value >= condition; },
		's<' : function stringLt(condition, value) { return value < condition; },
		's<=': function stringLte(condition, value) { return value <= condition; },
		'='  : function equal(condition, value) { return value == condition; },
		'==' : function strictEqual(condition, value) { return value === condition; },
		'!'  : function notEqual(condition, value) { return value != condition; },
		'!=' : function notStrictEqual(condition, value) { return value !== condition; },
		'#'  : function exists(condition, value) { return !_.isUndefined(value); },
		'!#' : function notExist(condition, value) { return _.isUndefined(value); }
	};

	var conditionRegExp = /^(>=|>|<=|<|s>=|s>|s<=|s<|==|=|#|!#|!=|!)?\s*(.*)\s*/;

	function evaluateCondition(condition, value) {

		var match = condition.match(conditionRegExp);

		var operator = match[1] || '=';
		condition = match[2];

		return conditions[operator](condition, value);
	}

	// data-bind-if-lala="lalala:do"
	// data-bind-lala="if:lalala ~> do, value ~> doOther, doDefault;"


	var arrowSplitter = /\s*=>\s*/,
		slashSplitter = /\s*\/\s*/;


	// data-bind-fruit="if:banana->yellow:apple->red:green"
	// ifDoElseDo($el, "banana->yellow", "apple->red", "green", $value)

	/**
	 * Takes variable number of arguments
	 * Each argument before the last is a 'condition->method' pair.
	 * If no '->' is found within the pair string, we assume the method is
	 * to be used in default cases.
	 *
	 * @return {[type]} [description]
	 */
	exports['if'] = function ifdo($el, casesString, value) {

		var cases = casesString.split(slashSplitter);

		// loop cases
		return _.find(cases, function (pairStr) {

			var split = pairStr.split(arrowSplitter);

			if (split.length === 1) {

				// split = [methodName[:args]]
				// directly execute, it is the default case
				this[split[0]].call(this, $el, value);

				// break loop
				return true;

			} else {
				// split = [condition, methodName]
				//
				// check if condition is valid
				if (evaluateCondition(split[0], value)) {
					this[split[1]].call(this, $el, value);

					// break loop
					return true;
				}
			}

			// continue looping, no one found
			return false;

		}, this);

	};
});
