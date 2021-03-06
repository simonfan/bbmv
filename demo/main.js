define(['bbmv', 'jquery', 'backbone'], function (bbmv, $, Backbone) {


	var control = window.control = new Backbone.Model({
			newField: '<input data-bind-name="value" placeholder="name"/>'
		}),
		$el     = $('#demo');




	control.on('change:name', function () {


		var error = this.validate(this.attributes);

		if (error) {
			this.set('invalidAttribute', error.attribute)
				.set('validationMessage', error.message);
		} else {
			this.set({
				invalidAttribute : 'none',
				validationMessage: 'Everything OK :)'
			});
		}

	});

	control.validate = function (attributes) {


		if (/[0-9]/.test(attributes.name)) {
			return {
				attribute: 'name',
				message  : 'Name should not have numbers.'
			};
		} else if (attributes.name == '') {
			return {
				attribute: 'name',
				message  : 'Name should not be empty.'
			}
		}

	};


	var view = bbmv.extend({
		hideIf: function ($el, condition, value) {
			if (condition === value) {
				$el.css({ opacity: 0.5 });
			} else {
				$el.css({ opacity: 1 });
			}
		},

		red: function ($el) {

			$el.css('background-color', 'red');

		},

		green: function ($el) {

			$el.css('background-color', 'green');

		},

		half: function ($el, value) {
			$el.css({ opacity: 0.5 });
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

		formatWidth: function (v) { return v + 'px'; },



		// dinamic field building
		addField: function addField() {

			var $field = $(this.model.get('newField'));

			// append dinamic fields
			this.$el.find('#dinamic-fields').append($field);

			// incorporate field
			this.incorporate($field);



		},



	})

	window.demo = view({
		model: control,
		el   : $el,
	});
});
