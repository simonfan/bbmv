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

			this.fruitMap = {
				'name': ['input[name="name"]', '.name', '.name -> attr:href'],
				'colors': 'input[name="colors"]',
				'price': 'div[bound-attribute="price"]',
			};

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
				map: this.fruitMap
			});


			// attach model
			fruitView.attach(fruitModel);

			// check that the values are correct
			this.$fruit.find('input[name="name"]').val().should.eql('Banana');

			_.map(this.$fruit.find('input[name="colors"]:checked'), function (box) {
				return $(box).val();
			}).should.eql(['green', 'yellow']);

			// set some values..
			fruitModel.set({
				name: 'lalalalalalalala',
				colors: ['red', 'orange']
			});

			// verify that values have changed with

		});

		it('whenever values on the model change, html should follow', function () {
			var fruitModel = new Backbone.Model({
				name: 'Apple',
				colors: ['red', 'yellow', 'green']
			});

			// instantiate the fruit view
			var fruitView = modelView({
				el: this.$fruit,
				map: this.fruitMap
			});

			// attach model
			fruitView.attach(fruitModel);

			this.$fruit.find('.name').html().should.eql('Apple');

			// set some changes
			fruitModel.set({
				name: 'Melon',
				colors: ['yellow', 'green']
			});

			this.$fruit.find('.name').html().should.eql('Melon');
		});


		it('supports stringify modifications', function () {
			var fruitModel = new Backbone.Model({
				name: 'Pineapple',
				price: 40
			});


			var saleFruitDock = modelView.extend({
				stringifiers: {
					price: function stringifyPrice(price) {
						return 'R$ ' + price + ',00';
					}
				}
			});

			var fruitView = saleFruitDock({
				el: this.$fruit,
				map: this.fruitMap
			});

			fruitView.attach(fruitModel)

			var $price = this.$fruit.find('div[bound-attribute="price"]');
			$price.html().should.eql('R$ 40,00')
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
				map: this.fruitMap
			});

			var fruitView = fruitView({
				el: this.$fruit,
				model: fruitModel
			});

			var $price = this.$fruit.find('div[bound-attribute="price"]');
			$price.html().should.eql('R$ 20,00')
		});

		it('supports detaching models', function () {
			var melancia = new Backbone.Model({
					name: 'Melancia',
					price: 20,
				}),
				papaya = new Backbone.Model({
					name: 'Mamao',
					price: 10,
				});

			var fruitView = modelView.extend({
				map: this.fruitMap
			});

			// start view with melancia model
			var fruitView = fruitView({
				el: this.$fruit,
				model: melancia
			});

			// detach melancia model
			fruitView.detach();

			// set value on melancia
			melancia.set('price', 40);

			// expect the fruitview not to be modified
			var $price = this.$fruit.find('div[bound-attribute="price"]');
			$price.html().should.eql('20');


		})


		describe('css properties', function () {
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
				});

				fruitView.attach(fruitModel);


				fruitModel.set({ 'color': 'rgb(0, 20, 100)' });

				setTimeout(function () {
					fruitView.$el.css('background-color').should.eql('rgb(0, 20, 100)');

					done()
				}, 0)
			})
		})


	});
});