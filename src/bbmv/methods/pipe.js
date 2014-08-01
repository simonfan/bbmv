define(function (require, exports) {

	// the mv pipe object builder.
	var mvPipe = require('bbmv/pipe/index');

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
			// set it.
			if (map) {

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
