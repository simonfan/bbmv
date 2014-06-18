(function(name, factory) {

	var mod = typeof define !== 'function' ?
		// node
		'.././src' :
		// browser
		'bb-model-view',
		// dependencies for the test
		deps = [mod, 'should', 'jquery', 'backbone'];

	if (typeof define !== 'function') {
		// node
		factory.apply(null, deps.map(require));
	} else {
		// browser
		define(deps, factory);
	}

})('test', function(modelView, should, $, Backbone) {
	'use strict';

	describe('modelView prefix', function () {
		beforeEach(function (done) {
			done();
		});

		it('modified prefix', function () {


			var model = new Backbone.Model(),
				$el   = $('#prefix-test');

			// instantiate view with another prefix
			var view = modelView({
				model : model,
				el    : $el,
				prefix: 'anotherPrefix'
			});

			// set data onto model
			model.set({
				v1: 'value1',
				v2: 'value2'
			});

			// check binding effects
			$el.find('[data-another-prefix-v1]').html().should.eql('value1');
			$el.find('[data-another-prefix-v2]').data('value').should.eql('value2');


			// set again
			model.set({
				v1: 'another value',
				v2: 'changed v2'
			});

			$el.find('[data-another-prefix-v1]').html().should.eql('another value');
			$el.find('[data-another-prefix-v2]').data('value').should.eql('changed v2');

		});
	});
});
