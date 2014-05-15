require.config({
	urlArgs: 'bust=0.8202391087543219',
	baseUrl: '/src',
	paths: {
		requirejs: '../bower_components/requirejs/require',
		text: '../bower_components/requirejs-text/text',
		mocha: '../node_modules/mocha/mocha',
		should: '../node_modules/should/should',
		'bb-model-view': 'index',
		lodash: '../bower_components/lodash/dist/lodash.compat',
		'lowercase-backbone': '../bower_components/lowercase-backbone/built/lowercase-backbone',
		jquery: '../bower_components/jquery/jquery',
		backbone: '../bower_components/backbone/backbone',
		qunit: '../bower_components/qunit/qunit/qunit',
		subject: '../bower_components/subject/built/subject',
		'requirejs-text': '../bower_components/requirejs-text/text',
		underscore: '../bower_components/underscore/underscore',
		'jquery.filler': '../bower_components/jquery.filler/built/jquery.filler',
		'model-dock': '../bower_components/model-dock/built/model-dock',
		'bb-dock': '../bower_components/bb-dock/built/bb-dock',
		dock: '../bower_components/dock/built/dock'
	},
	shim: {
		backbone: {
			exports: 'Backbone',
			deps: [
				'jquery',
				'underscore'
			]
		},
		underscore: {
			exports: '_'
		},
		mocha: {
			exports: 'mocha'
		},
		should: {
			exports: 'should'
		}
	}
});
