define(['bbmv', 'jquery', 'backbone'], function (bbmv, $, Backbone) {


	var control = window.control = new Backbone.Model(),
		$el     = $('#demo');

	var view = bbmv.extend({
		hideIf: function (condition, value) {


			if (condition === value) {
				this.css({ opacity: 0.5 });
			} else {
				this.css({ opacity: 1 });
			}
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
		}
	})

	window.demo = view({
		model: control,
		el   : $el,
	});
});
