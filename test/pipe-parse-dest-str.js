define(['jquery', 'should', 'bbmv/pipe/aux/parse-dest-str'],
function ($     ,  should ,  pipeParseDestStr             ) {

	describe('bbmv pipe-parse-dest-str', function () {

		it('simple method and partial arg: "css:background-color"', function () {

			var destdef = pipeParseDestStr('css:background-color');

			destdef.length.should.eql(1);

			destdef[0].method.should.eql('css');
			destdef[0].args.should.eql(['background-color']);
		});

		it('selector: ".some-class -> css:background-color"', function () {
			var destdef = pipeParseDestStr('.some-class -> css:background-color');

			destdef.length.should.eql(1);

			destdef[0].method.should.eql('css');
			destdef[0].args.should.eql(['background-color']);
			destdef[0].selector.should.eql('.some-class');
		})

		it('multiple methods: "css:color, html, input -> val"', function () {

			var destdef = pipeParseDestStr('css:color, html, input -> val');

			destdef.length.should.eql(3);

			destdef[0].method.should.eql('css');
			destdef[0].args.should.eql(['color']);

			destdef[1].method.should.eql('html');

			destdef[2].selector.should.eql('input');
			destdef[2].method.should.eql('val');

		});

		it('format: "rgb | css:background-color"', function () {
			var destdef = pipeParseDestStr('rgb | css:background-color');

			destdef.length.should.eql(1);

			destdef[0].method.should.eql('css');
			destdef[0].args.should.eql(['background-color']);
			destdef[0].format.method.should.eql('rgb');
		});

		it('format and selector: "money | input -> value"', function () {
			var destdef = pipeParseDestStr('money | input -> value');

			destdef.length.should.eql(1);
			destdef = destdef[0];

			destdef.method.should.eql('value');
			destdef.selector.should.eql('input');
			destdef.format.method.should.eql('money');
		});

		it('format and format args: "currency:usd | input -> value"', function () {
			var destdef = pipeParseDestStr("currency:usd:no-comma | input -> value")[0];

			destdef.format.method.should.eql('currency');
			destdef.format.args.should.eql(['usd', 'no-comma']);
		})

	});

});
