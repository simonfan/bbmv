define(['bbmv', 'jquery', 'backbone'], function (bbmv, $, Backbone) {


	var control = window.control = new Backbone.Model(),
		$el     = $('#demo');

	var view = bbmv.extend({
		hideIf: function ($el, condition, value) {
			if (condition === value) {
				$el.css({ opacity: 0.5 });
			} else {
				$el.css({ opacity: 1 });
			}
		},


		hide: function ($el, value) {
			$el.css({ opacity: value * 0.01 });
		},

		half: function ($el, value) {
			$el.css({ opacity: 0.5 });
		},

		show: function ($el, value) {
			$el.css({ opacity: 1 });
		},

		rates: {
			usd: 0.45,
			cny: 2.77,
			eur: 0.33
		},

		exchange: function exchange(currency) {

		},


		usd: {
			'in': function (amount) { return amount / this.rates.usd; },
			out : function (amount) { return amount * this.rates.usd; }
		},

		cny: {
			'in': function (amount) { return amount / this.rates.cny },
			out : function (amount) { return amount * this.rates.cny }
		},

		eur: {
			'in': function (amount) { return amount / this.rates.eur },
			out : function (amount) { return amount * this.rates.eur }
		},

		formatWidth: function (v) { return v + 'px'; }
	})

	window.demo = view({
		model: control,
		el   : $el,
	});
});
