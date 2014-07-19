define(['jquery', 'should', 'bbmv/pipe/aux/extract-maps'],
function ($     ,  should ,  pipeExtractMaps            ) {

	describe('bbmv pipe-extract-maps', function () {

		it(':)', function () {


			var $el = $('#pipe-extract-maps');

			var maps = pipeExtractMaps($el, 'prefix');

			maps['in'].should.eql({
				divColor: $el.data('prefix-in-div-color')
			});

			maps.out.should.eql({
				bgColor: $el.data('prefix-out-bg-color'),
				name: $el.data('prefix-out-name')
			});

			maps.dual.should.eql({
				top: $el.data('prefix-dual-top')
			})
		});

	});

});
