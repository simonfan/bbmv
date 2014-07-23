define(function defPipe(require, exports, module) {

	var pipe = require('pipe')
		_    = require('lodash');

		// parses out the maps defined on the $el.
	var aux = require('bbmv/pipe/aux/index');

	// direct reference to original methods
	var _to         = pipe.prototype.to,
		_from       = pipe.prototype.from,
		_mapSingle  = pipe.prototype.mapSingle,
		_initialize = pipe.prototype.initialize;

	var mvpipe = module.exports = pipe.extend({

		initialize: function initializeMvPipe(src, dest, map, options) {


			// var to hold parsed dest strings
			this._parsedDestStrs = {};

			// normal initialization
			_initialize.apply(this, _.toArray(arguments));

			options = options || {};

			_.each(['namespace', 'context'], function (opt) {

				this[opt] = options[opt] || this[opt];

			}, this);



		},

		parseDestStr: function mvpipeParseDestStr(destStr) {
			// attempt to get the parsed version from cache.
			// if available in cache, return it.
			// otherwise, parse it out and then return

			var parsed = this._parsedDestStrs[destStr];

			if (!parsed) {
				parsed = this._parsedDestStrs[destStr] = aux.parseDestStr(destStr);
			}

			return parsed;
		},



		srcGet: function getFromModel(src, property) {
			return src.get(property);
		},

		srcSet: function setOnModel(src, property, value) {
			return src.set(property, value);
		},
	});

	mvpipe.assignProto({
		destGet: require('bbmv/pipe/dest-get'),
		destSet: require('bbmv/pipe/dest-set')
	});

});
