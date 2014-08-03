define(['jquery', 'should', 'bbmv', 'bbmv/pipe/dest-set', 'q', 'lodash', 'backbone'],
function ($     ,  should ,  bbmv ,  pipeDestSet        ,  q ,  _      ,  Backbone ) {

	describe('bbmv pipe-dest-set', function () {

		beforeEach(function () {
			this.$el = $([
				'<div>',
					'<input type="checkbox" name="colors" value="red" checked>',
					'<input type="checkbox" name="colors" value="green">',
					'<input type="checkbox" name="colors" value="blue">',
				'</div>'
			].join(' ')).appendTo($('#pipe-dest-get-set'));



			var bbmvInstance = bbmv({
				model: new Backbone.Model(),
				el: this.$el
			});

			// emulate the pipe object
			// in order to make the parseDestStr available
			this.pipeStub = {
				bbmvInstance: bbmvInstance
			};
		});

		it('straight jq method invocation', function () {

			// html
			pipeDestSet.call(this.pipeStub, this.$el, 'html', 'some crazy value');

			this.$el.html().should.eql('some crazy value');


		});

		it('with partialized arguments', function () {

			pipeDestSet.call(this.pipeStub, this.$el, 'css:top', '500px');

			this.$el.css('top').should.eql('500px');

		});

		it('with selector defined', function () {


			pipeDestSet.call(
				this.pipeStub,
				this.$el,
				'input[name="colors"] -> value',
				['green', 'blue']
			);

			this.$el
				.find('input[name="colors"]')
				.value()
				.should.eql(['green', 'blue']);

		});

		it('with format defined', function () {

			var extendedBbmv = bbmv.extend({
				someFormat: function (value) {
					return value + '-formatted';
				}
			});

			var pipeStub = {
				// formatting methods are looked for on the bbmv object.
				bbmvInstance: extendedBbmv({
					el: this.$el,
					model: new Backbone.Model()
				})
			};

			pipeDestSet.call(pipeStub, this.$el, 'someFormat | html', 'some-value');


			this.$el.html().should.eql('some-value-formatted');
		});

		it('with format args defined')
	});

});
