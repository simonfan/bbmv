define(['bb-model-view', 'jquery', 'backbone'], function (bbmv, $, Backbone) {


	var model = window.model = new Backbone.Model();

	var view  = bbmv({
		el: $('#view'),
		model: model,

		methods: {
			animateMarginLeft: function (value) {

				console.log(this);
				console.log(value);
				this.stop().animate({ marginLeft: value }, 10000);
			}
		}
	});

	model.set('marginLeft', 1000);

});
