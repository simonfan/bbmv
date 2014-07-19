define(['jquery', 'should', 'bbmv', 'backbone'],
function ($     ,  should ,  bbmv ,  Backbone ) {

	describe('bbmv basics', function () {

		it(':)', function () {
			var $el   = $('#bbmv'),
				model = new Backbone.Model();


			bbmv({
				el   : $el,
				model: model,
			});

			model.set({
				name: 'Lemon',
				colors: ['green', 'yellow'],
				flavor: 'sour',
				format: 'round',
			});

			$el.find('[data-bind-out-name]').html().should.eql('Lemon');
			$el.find('input[name="colors"]').value().should.eql(['green', 'yellow']);
			$el.find('input[name="flavor"]').value().should.eql('sour');
			$el.find('[data-bind-format]').html().should.eql('round');
		});

	});

});
