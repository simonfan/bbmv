(function(name, factory) {

	var mod = typeof define !== 'function' ?
		// node
		'.././src' :
		// browser
		'bb-model-view',
		// dependencies for the test
		deps = [mod, 'should', 'backbone', 'jquery'];

	if (typeof define !== 'function') {
		// node
		factory.apply(null, deps.map(require));
	} else {
		// browser
		define(deps, factory);
	}

})('test', function(bbmv, should, backbone, $) {
	'use strict';

	describe('bbmv external-methods-hash', function () {
		beforeEach(function (done) {
			done();
		});

		it.skip('is fine (:', function () {
			var fruit = { name: 'banana' }
			fruit.should.have.property('name', 'banana');
		});
	});
});
