define(['jquery', 'should', 'bbmv', 'bbmv/pipe/dest-get', 'q', 'lodash', 'backbone'],
function ($     ,  should ,  bbmv ,  pipeDestGet        ,  q ,  _      ,  Backbone ) {

	describe('bbmv pipe-dest-get', function () {

		beforeEach(function () {
			this.$el = $([
				'<div>',
					'<input type="checkbox" name="colors" value="red" checked>',
					'<input type="checkbox" name="colors" value="green">',
					'<input type="checkbox" name="colors" value="blue">',
				'</div>'
			].join(' ')).appendTo($('#pipe-dest-get-set'));


			var bbmvInstance = bbmv({
				el: this.$el,
				model: new Backbone.Model()
			});

			// emulate the pipe object
			// in order to make the parseDestStr available
			this.pipeStub = {
				bbmvInstance: bbmvInstance
			};
		});


		it('straight jq method invocation', function () {
			// set html
			this.$el.html('some crazy value');
							// html
			pipeDestGet.call(this.pipeStub, this.$el, 'html')
				.should.eql('some crazy value');

		});

		it('partial args', function () {
			this.$el.css('right', '600px');

			pipeDestGet.call(this.pipeStub, this.$el, 'css:right')
				.should.eql('600px');
		});

		it('selector defined', function () {
			pipeDestGet.call(this.pipeStub, this.$el, 'input[name="colors"] -> value')
				.should.eql(['red']);
		})
	});

});
