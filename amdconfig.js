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
		jquery: '../bower_components/jquery/dist/jquery',
		backbone: '../bower_components/backbone/backbone',
		qunit: '../bower_components/qunit/qunit/qunit',
		subject: '../bower_components/subject/built/subject',
		'requirejs-text': '../bower_components/requirejs-text/text',
		underscore: '../bower_components/underscore/underscore',
		'jquery.filler': '../bower_components/jquery.filler/built/jquery.filler',
		'model-dock': '../bower_components/model-dock/built/model-dock',
		'bb-dock': '../bower_components/bb-dock/built/bb-dock',
		dock: '../bower_components/dock/built/dock',
		'jquery-meta-data': '../bower_components/jquery-meta-data/built/jquery-meta-data',
		'jquery-pipe': '../bower_components/jquery-pipe/built/jquery-pipe',
		'jquery-selector-data-prefix': '../bower_components/jquery-selector-data-prefix/built/jquery-selector-data-prefix',
		pipe: '../bower_components/pipe/built/pipe',
		q: '../bower_components/q/q',
		'jquery-pump': '../bower_components/jquery-pump/built/jquery-pump',
		pump: '../bower_components/pump/built/pump',
		'jquery-value': '../bower_components/jquery-value/built/jquery-value'
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
