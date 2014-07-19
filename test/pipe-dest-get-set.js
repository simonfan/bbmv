define(['jquery', 'should', 'bbmv/pipe/dest-get-set', 'bbmv/pipe/aux/parse-dest-str', 'q', 'lodash'],
function ($     ,  should ,  pipeDestGetSet         ,  parseDestStr                 ,  q ,  _      ) {

	describe('bbmv pipe-dest-get-set', function () {

		beforeEach(function () {
			this.$el = $([
				'<div>',
					'<input type="checkbox" name="colors" value="red" checked>',
					'<input type="checkbox" name="colors" value="green">',
					'<input type="checkbox" name="colors" value="blue">',
				'</div>'
			].join(' ')).appendTo($('#pipe-dest-get-set'));


			// emulate the pipe object
			// in order to make the parseDestStr available
			this.pipeStub = {
				parseDestStr: parseDestStr
			};
		});


		describe('set', function () {

			it('straight jq method invocation', function () {

				var destSet = pipeDestGetSet.destSet;

				// html
				destSet.call(this.pipeStub, this.$el, 'html', 'some crazy value');

				this.$el.html().should.eql('some crazy value');


			});

			it('with partialized arguments', function () {


				var destSet = pipeDestGetSet.destSet;

				destSet.call(this.pipeStub, this.$el, 'css:top', '500px');

				this.$el.css('top').should.eql('500px');

			});

			it('with selector defined', function () {


				pipeDestGetSet
					.destSet.call(
						this.pipeStub,
						this.$el,
						'input[name="colors"] -> value',
						['green', 'blue']
					);

				this.$el
					.find('input[name="colors"]')
					.value()
					.should.eql(['green', 'blue']);

				'usd | input[name="usd"] -> value'

			});

			it('with format defined')

		});



		describe('get', function () {

			it('straight jq method invocation', function () {
				// set html
				this.$el.html('some crazy value');
								// html
				pipeDestGetSet
					.destGet.call(this.pipeStub, this.$el, 'html')
					.should.eql('some crazy value');

			});

			it('partial args', function () {
				this.$el.css('right', '600px');

				pipeDestGetSet
					.destGet.call(this.pipeStub, this.$el, 'css:right')
					.should.eql('600px');
			});

			it('selector defined', function () {
				pipeDestGetSet
					.destGet.call(this.pipeStub, this.$el, 'input[name="colors"] -> value')
					.should.eql(['red']);
			})
		});
	});

});
