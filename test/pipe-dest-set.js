define(['jquery', 'should', 'bbmv/pipe/dest-set', 'bbmv/aux/parse-dest-str', 'q', 'lodash'],
function ($     ,  should ,  pipeDestSet        ,  parseDestStr            ,  q ,  _      ) {

	describe('bbmv pipe-dest-set', function () {

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

			var bbmvStub = {
				someFormat: function (value) {
					return value + '-formatted';
				}
			}

			var pipeStub = {
				parseDestStr: parseDestStr,

				// formatting methods are looked for on the bbmv object.
				bbmvInstance: bbmvStub
			};

			pipeDestSet.call(pipeStub, this.$el, 'someFormat | html', 'some-value');


			this.$el.html().should.eql('some-value-formatted');
		});

		it('with format args defined')
	});

});
