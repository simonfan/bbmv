define(function (require, exports) {
	'use strict';

	var _ = require('lodash');

	// the mv pipe object builder.
	var mvPipe = require('bbmv/pipe/index');



	/**
	 * Private function used to instantiate a new data pipe.
	 *
	 * @param  {Object (bbmv)}   bbmvInstance
	 *     The instance of bbmv to which this pipe will be attached.
	 *     The pipe will use multiple methods from the main object
	 *     in order to read from and set to DOM.
	 * @param  {Object (jquery)} $dest
	 *     The jQuery object that should be the destination of the pipe.
	 * @param  {Object (pojo)}   map
	 *     A map describing the pipe sources and destinations.
	 * @param  {Object (pojo)}   options
	 *     Options.
	 *
	 * @return {Object (pipe)}                [description]
	 */
	function instantiatePipe(bbmvInstance, $dest, map, options) {

		// generate a unique id
		var pipeid = _.uniqueId(this.pipeIdAttr);

		// set namespace onto options
		options = options || {};
		options.bbmvInstance = this;

		// create pipe
		var pipe = this.pipes[pipeid] = mvPipe(this.model, $dest, map, options);

		// save pipe id on el.
		$dest.data(this.pipeIdAttr, pipeid);
	}


	/**
	 * Attempts to get the pipe id from the $dest object
	 * and then checks for a pipe in cache.
	 *
	 * If no pipe is found in cache, instantiate a pipe
	 * set id onto $dest using the .data method
	 * and save pipe to cache using that id.
	 *
	 * @param  {[type]} $dest   [description]
	 * @param  {[type]} map     [description]
	 * @param  {[type]} options [description]
	 * @return {[type]}         [description]
	 */
	exports.pipe = function definePipe($dest, map, options) {

		var pipe;

		// get the pipeid
		var pipeid = $dest.data(this.pipeIdAttr);

		if (pipeid && this.pipes[pipeid]) {
			// get pipe from cache
			pipe = this.pipes[pipeid];

			// if map is set,
			// set it onto the pipe.
			if (map) {
				pipe.map(map, options);
			}

		} else {
			// generate a unique id
			pipeid = _.uniqueId(this.pipeIdAttr);

			// set namespace onto options
			options = options || {};
			options.bbmvInstance = this;

			// create pipe
			pipe = this.pipes[pipeid] = mvPipe(this.model, $dest, map, options);

			// save pipe id on el.
			$dest.data(this.pipeIdAttr, pipeid);
		}

		return pipe;
	};

	// alias.
	exports.map = exports.pipe;


	/**
	 * Pump data.
	 *
	 * @param  {[type]} argument [description]
	 * @return {[type]}          [description]
	 */
	exports.pump = function pump() {

		_.each(this.pipes, function (pipe) {
			pipe.pump();
		});

		return this;
	};


	/**
	 * Drains data from a single element
	 * @param  {[type]} $el [description]
	 * @return {[type]}     [description]
	 */
	exports.drain = function drain($el, attributes, options) {

		this.pipe($el).drain(attributes, options);

		return this;
	};

});
