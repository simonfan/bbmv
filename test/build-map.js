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

	describe('modelView build-map', function () {

		it('it correctly builds the map', function () {

			var testView = modelView.extend({
				map: 'attribute',
			});

			var testViewInstance = testView({
				el: $('#build-map-test'),
				model: new Backbone.Model()
			});

			testViewInstance.map.title.should.eql('[data-attribute="title"]');

		});

	});
});
