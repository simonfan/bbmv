define(['jquery', 'should', 'bbmv/pipe/dest-get', 'bbmv/pipe/aux/parse-dest-str', 'q', 'lodash'],
function ($     ,  should ,  pipeDestGet        ,  parseDestStr                 ,  q ,  _      ) {

	describe('bbmv pipe-dest-get', function () {

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
