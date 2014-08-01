define(function defPipe(require, exports, module) {

	'use strict';

	var pipe = require('pipe'),
		_    = require('lodash');

		// parses out the maps defined on the $el.
	var aux = require('bbmv/aux/index');

	// direct reference to original methods
	var _to         = pipe.prototype.to,
		_from       = pipe.prototype.from,
		_mapSingle  = pipe.prototype.mapSingle,
		_initialize = pipe.prototype.initialize;

	var mvPipe = module.exports = pipe.extend({

		initialize: function initializeMvPipe(src, dest, map, options) {



			// normal initialization
			_initialize.apply(this, _.toArray(arguments));

			options = options || {};

			_.each(['namespace', 'bbmvInstance'], function (opt) {

				this[opt] = options[opt] || this[opt];

			}, this);



		},

		srcGet: function getFromModel(src, property) {
			return src.get(property);
		},

		srcSet: function setOnModel(src, property, value) {
			return src.set(property, value);
		},
	});

	mvPipe.assignProto({
		destGet: require('bbmv/pipe/dest-get'),
		destSet: require('bbmv/pipe/dest-set')
	});

});
