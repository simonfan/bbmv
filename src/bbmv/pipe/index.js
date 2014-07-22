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


	var defaultSetEvents = {
		'INPUT': 'change',
		'BUTTON': 'click',
	};

	var mvpipe = module.exports = pipe.extend({

		initialize: function initializeMvPipe(src, dest, map, options) {


			// var to hold parsed dest strings
			this._parsedDestStrs = {};

			// normal initialization
			_initialize.apply(this, _.toArray(arguments));

			options = options || {};

			_.each(['namespace', 'bbmv'], function (opt) {

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


		/**
		 * The default namespace used for binding map extraction.
		 *
		 * @type {String}
		 */
		namespace: 'bind',


		/**
		 * Override the to method in order to
		 * listen to events on the destination object.
		 *
		 * @param  {[type]} dest [description]
		 * @return {[type]}      [description]
		 */
		to: function to($dest) {

			var namespace = this.namespace;

			//////////////////
			// set mappings //
			//////////////////

			// get mappings from the $dest
			var maps = aux.extractMaps($dest, namespace);

			// set mappings
			this.map(maps['in'], 'from')
				.map(maps.out,   'to')
				.map(maps.dual,  'both');

			////////////////
			// set events //
			////////////////

			// <div data-bind-event-in="click"></div>
			var setEvent =
				$dest.data(namespace + '-event') ||
				defaultSetEvents[$dest.prop('tagName')];

			if (setEvent) {

				var attributes = _.union(_.keys(maps['in']), _.keys(maps.dual));

				$dest.on(setEvent, _.bind(function () {

					// drain attributes, force = true;
					this.drain(attributes, { force: true });

				}, this));
			}

			// continue flow.
			return _to.call(this, $dest);
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
