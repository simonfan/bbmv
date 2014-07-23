define(['jquery', 'should', 'bbmv/pipe/index', 'backbone'],
function ($     ,  should ,  mvPipe          ,  Backbone ) {

	describe('bbmv mvPipe', function () {

		beforeEach(function () {
			this.$el = $('#pipe');
		});

		it.skip(':) general demo', function () {

			// create a model
			var model = new Backbone.Model();


			// craete a pipe
			var pipe = mvPipe(model, this.$el);

			// set data on model.
			model.set('colors', ['blue', 'green']);

			// pump
			pipe.pump();

			// expect the dom to reflect model data
			var $colors = this.$el.find('input[name="colors"]');

			$colors.value().should.eql(['blue', 'green']);

			// set values on the inputs
			$colors.value(['red']);

			// drain
			pipe.drain();

			// expect model to reflect dom
			model.get('colors').should.eql(['red']);
		});

		it.skip('instantiation mapping', function () {
			var model = new Backbone.Model(),
				pipe  = mvPipe(model, this.$el, {
					height: 'css:height',
					left  : 'css:left'
				});

			model.set({
				colors: ['red'],
				height: '400px',
				left  : '500px'
			});

			// pump
			pipe.pump();

			// check values on $el
			this.$el.css('height').should.eql('400px');
			this.$el.css('left').should.eql('500px');


			// check that the mappings defined on the $el are still valid.
			this.$el.find('input[name="colors"]').value().should.eql(['red']);

		});

		it('dinamic mapping (post instantiation)', function () {
			var model = new Backbone.Model();

			// create pipe
			var pipe = mvPipe(model, this.$el);

			// map fruits (originally unmapped)
			pipe.map('fruits', 'input[name="fruits"] -> value');

			// drain!
			pipe.drain();

			model.get('fruits').should.eql(['apple', 'watermelon']);
		});


		it.skip('show (to-only) piping', function () {

			var model = new Backbone.Model(),
				pipe  = mvPipe().from(model).to(this.$el);

			model.set('something', 'somevalue');

			pipe.pump();

			this.$el.data('something').should.eql('somevalue');

			// set data on the $el and try to drain the value
			// (should be unsuccessful)
			this.$el.data('something', 'some-other-value');

			pipe.drain();

			// model remains unchanged
			model.get('something').should.eql('somevalue');
			this.$el.data('something').should.eql('some-other-value');
		});
	});

});
