define(['bbmv', 'should', 'backbone', 'text!/test/templates/fruit.html'],
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


		it('values on the html should be initialized to the ones on the model', function () {

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


			// check that the values are correct
			this.$fruit.find('input[data-bind-name]').value().should.eql('Banana');

			_.map(this.$fruit.find('input[name="colors"]:checked'), function (box) {
				return $(box).val();
			}).should.eql(['green', 'yellow']);
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

			$fruit.find('input[data-bind-name]').val().should.eql('Apple');

			$fruit.find('input[name="colors"]').value().should.eql(['red', 'green', 'yellow']);
		});


		it('supports stringify modifications', function () {
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


			$price.html().should.eql('R$ 40,00');

			$price.data('usd').should.eql('US$ 80,00');
		});

		it('supports parsing data from html', function () {
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



			fruitModel.get('price').should.eql(50);
		});


		it('supports model attachment on instantiation', function () {
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
				map: this.fruitMap,

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

			var fruitView = fruitView({
				el: this.$fruit,
				model: fruitModel
			});

			var $price = this.$fruit.find('div[data-bind-price]');
			$price.html().should.eql('R$ 20,00')
		});


		describe('css properties', function () {
			it('css properties', function () {
				var fruitModel = new Backbone.Model({
					name: 'Pineapple',
					color: 'yellow'
				});

				var fruitView = modelView.extend({
					prefix: 'bindStyle',
				});

				var fruitView = fruitView({
					el: this.$fruit,
					model: fruitModel,
				});


				fruitModel.set({ 'color': 'rgb(0, 20, 100)' });


				fruitView.$el.css('background-color').should.eql('rgb(0, 20, 100)');
			})
		})


	});
});
