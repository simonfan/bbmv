(function(name, factory) {

	var mod = typeof define !== 'function' ?
		// node
		'.././src' :
		// browser
		'bbmv',
		// dependencies for the test
		deps = [mod, 'should', 'bb-dock', 'text!/test/templates/fruit.html'];

	if (typeof define !== 'function') {
		// node
		factory.apply(null, deps.map(require));
	} else {
		// browser
		define(deps, factory);
	}

})('test', function(modelView, should, bbDock, fruitTemplate) {
	'use strict';

	describe('modelView bb-dock', function () {

		beforeEach(function () {

			// jquery elements
			var $fixture =
				$('<div id="fixture"></div>')
					.appendTo($('html'))
					.append(fruitTemplate);

			this.$fixture = $fixture;
			this.$fruit = $fixture.find('#fruit');

			this.fruitMap = {
				'name': ['input[name="name"]', '.name', '.name -> attr:href'],
				'colors': 'input[name="colors"]',
				'price': 'div[bound-attribute="price"]',
			};

		});


		it('is fine (:', function () {

			var fruitDock = bbDock.model();

		// instantiate the fruit view
			var fruitView = modelView({
				el: this.$fruit,
				map: this.fruitMap,
				model: fruitDock
			});

			// instantiate the model for the fruit.
			var fruitModel = new Backbone.Model({
				name: 'Banana',
				colors: ['yellow', 'green']
			});

			// attach
			fruitDock.attach(fruitModel);
		});
	});
});
