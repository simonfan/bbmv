define(['bb-model-view', 'should', 'backbone', 'text!/test/templates/fruit.html'],
function(modelView, should, Backbone, fruitTemplate) {

	'use strict';

	describe('modelView model-to-dom data binding', function () {


		beforeEach(function () {

			// jquery elements
			var $fixture =
				$('<div id="fixture"></div>')
					.appendTo($('html'))
					.append(fruitTemplate);

			this.$fixture = $fixture;
			this.$fruit = $fixture.find('#fruit');

		});

		afterEach(function () {
			this.$fixture.remove();
		});


		it('values on the html should be initialized to the ones on the model', function (testdone) {

			// instantiate the model for the fruit.
			var fruitModel = new Backbone.Model({
				name: 'Banana',
				colors: ['yellow', 'green']
			});

			// instantiate the fruit view
			var fruitView = modelView({
				el: this.$fruit,
				model: fruitModel,

			});

			fruitView.ready(_.bind(function () {

				// check that the values are correct
				this.$fruit.find('input[data-bind-name]').value().should.eql('Banana');

				_.map(this.$fruit.find('input[name="colors"]:checked'), function (box) {
					return $(box).val();
				}).should.eql(['green', 'yellow']);


				testdone();

			}, this))
		});

		it('whenever values on the model change, html should follow', function () {
			var fruitModel = new Backbone.Model(),
				$fruit     = this.$fruit;


			// instantiate the fruit view
			var fruitView = modelView({
				el: $fruit,
				model: fruitModel,
			});


			fruitModel.set({
				name: 'Apple',
				colors: ['red', 'yellow', 'green']
			});


			fruitView.ready(function () {

				$fruit.find('input[data-bind-name]').val().should.eql('Apple');

				$fruit.find('input[data-bind-colors]').value().should.eql(['red', 'yellow', 'green']);

			})
		});


		it('supports stringify modifications', function (testdone) {
			var fruitModel = new Backbone.Model({
				name: 'Pineapple',
				price: 40
			});


			var saleFruitDock = modelView.extend({
				formats: {
					brl: {
						stringify: function stringifyBRL(price) {
							return 'R$ ' + price + ',00';
						},
						parse: function parseBRL(price) {
							return parseInt(price);
						},
					},

					usd: {
						stringify: function stringifyUSD(price) {
							return 'US$ ' + price * 2 + ',00';
						},

						parse: function parseUSD(price) {
							return parseInt(price) / 2;
						}
					}
				}
			});

			// the element that hodls the price
			var $price = this.$fruit.find('[data-bind-price]');

			var fruitView = saleFruitDock({
				el: this.$fruit,
				model: fruitModel
			})
			.ready(function () {
				$price.html().should.eql('R$ 40,00');

				$price.data('usd').should.eql('US$ 80,00');

				testdone();
			});
		});

		it('supports parsing data from html', function (testdone) {
			var fruitModel = new Backbone.Model({
				name: 'Pineapple'
			});


			var saleFruitDock = modelView.extend({
				formats: {
					brl: {
						stringify: function stringifyBRL(price) {
							return 'R$ ' + price + ',00';
						},
						parse: function parseBRL(price) {
							console.log('parse')
							console.log(price)

							price = price.replace('R$', '');

							return parseInt(price);
						},
					},

					usd: {
						stringify: function stringifyUSD(price) {
							return 'US$ ' + price * 2 + ',00';
						},

						parse: function parseUSD(price) {
							return parseInt(price) / 2;
						}
					}
				}
			});

			// the element that hodls the price
			var $price = this.$fruit.find('[data-bind-price]');

			var fruitView = saleFruitDock({
				el: this.$fruit,
				model: fruitModel
			});

			// set values on $price
			$price.html('R$ 50,00');

			$price.trigger('change');

			setTimeout(function () {

				fruitModel.get('price').should.eql(50);

				testdone();
			}, 500);
		});


		it.skip('supports model attachment on instantiation', function () {
			var fruitModel = new Backbone.Model({
				name: 'Melancia',
				price: 20
			});

			var fruitView = modelView.extend({
				stringifiers: {
					price: function stringifyPrice(price) {
						return 'R$ ' + price + ',00';
					}
				},
				map: this.fruitMap
			});

			var fruitView = fruitView({
				el: this.$fruit,
				model: fruitModel
			});

			var $price = this.$fruit.find('div[bound-attribute="price"]');
			$price.html().should.eql('R$ 20,00')
		});


		describe.skip('css properties', function () {
			it('css properties', function (done) {
				var fruitModel = new Backbone.Model({
					name: 'Pineapple',
					color: 'yellow'
				});

				var fruitView = modelView.extend({
					map: {
						color: '->css:background-color'
					}
				});

				var fruitView = fruitView({
					el: this.$fruit,
					model: fruitModel,
				});


				fruitModel.set({ 'color': 'rgb(0, 20, 100)' });

				setTimeout(function () {
					fruitView.$el.css('background-color').should.eql('rgb(0, 20, 100)');

					done()
				}, 0)
			})
		})


	});
});
