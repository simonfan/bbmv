define(['mocha'], function (mocha) {
	// use mocha with bdd
	mocha.setup('bdd');

	require(['../test/dom-to-model', '../test/model-to-dom'], function () {


		// run mocha
		mocha.checkLeaks();
		mocha.run();

	});
});
