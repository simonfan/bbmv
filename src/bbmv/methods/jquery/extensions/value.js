define(function defJqMethods(require, exports, module) {

	'use strict';

	var $ = require('jquery');

	/**
	 * Hash of functions that will return a value
	 * given an jquery $el.
	 * Keyed by tagName
	 *
	 * @property jqValueGetters
	 * @private
	 * @type Object
	 */
	var jqValueGetters = {
		'default': function readDefault($el) {
			return $el.val();
		},

		'DIV': function readDiv($el) {
			return $el.html();
		},

		'INPUT': function readInput($el) {

			var type = $el.prop('type');

			if (type === 'checkbox') {

				return $el.filter(':checked').map(function () {

					return $(this).val();

				}).get();

			} else if (type === 'radio') {

				return $el.filter(':checked').val();

			} else {
				return $el.val();
			}
		}
	};

	/**
	 * Takes a selector string and returns the value of it.
	 *
	 * @method jqValueGet
	 * @param selector {String}
	 */
	function jqValueGet($el) {

		// [1] retrieve get function
		var tagName = $el.prop('tagName'),
			get = jqValueGetters[tagName] || jqValueGetters['default'];

		// [2] read and return.
		return get($el);
	};






	/**
	 * Holds the html tag jqValueSetters.
	 *
	 * @class jqValueSetters
	 * @static
	 */
	var jqValueSetters = {
		default: function ($el, value) {
			return $el.html(value);
		},
		INPUT: function ($el, value) {
			/**
			 * intercept only filling for checkboxes and radios
			 * as the default jquery .val() method sets the checkboxes and radio input
			 * values instead of checking them (if the value is not passed in as an array)
			 */
			var type = $el.prop('type');

			if (type === 'checkbox' || type === 'radio') {
				value = $.isArray(value) ? value : [value];
			}

			return $el.val(value);
		},
		SELECT: function ($el, value) {
			return $el.val(value);
		},
		IMG: function ($el, value) {
			// trigger a change event when changing the image src
			return $el.prop('src', value).trigger('change', value);
		},

		TEXTAREA: function ($el, value) {
			return $el.val(value);
		},
	};


	/**
	 * Generates a filler function.
	 *
	 * @method jqValueSet
	 * @param $el {jQuery} The element on which perform task
	 */
	function jqValueSet($el, value) {

		// [2] loop through the $el
		$el.each(function (index, el) {

			var $el = $(el);

			// [2.1] get $el tagName
			var tagName = $el.prop('tagName');


			var set = jqValueSetters[tagName] || jqValueSetters['default'];
			set($el, value);
		});

		return $el;
	};





	exports.value = function jqValue($el, value) {

		if (arguments.length === 1) {
			return jqValueGet($el);
		} else if (arguments.length === 2) {
			return jqValueSet($el, value);
		}
	};
});
