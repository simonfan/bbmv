define('__bb-model-view/bind',['require','exports','module','lodash','lowercase-backbone','jquery-value'],function (require, exports, module) {
	


	var _        = require('lodash'),
		backbone = require('lowercase-backbone'),
		jqValue  = require('jquery-value');


	exports.DOMToModel = function bindDOMToModel($boundElements) {

		$boundElements.on('change', _.bind(function (e) {

			var $target = $(e.target);

			this.updateModel($target);

			return false;
		}, this));
	};


	exports.modelToDOM = function bindModelToDOM(model) {
	// [4] listen to change events on the model
		model.on('change', _.bind(function (model) {

			this.updateView();

		}, this));
	};
});

define('__bb-model-view/update',['require','exports','module','lodash'],function (require, exports, module) {
	

	var _ = require('lodash');

	/**
	 * Updates the view by pumping data from the source model.
	 *
	 * @return {[type]} [description]
	 */
	exports.updateView = function pumpModelDataToView() {

		this.pump.pump();

		return this;
	};

	/**
	 * Updates the model draining data from the view.
	 *
	 * @param  {[type]} pipe [description]
	 * @return {[type]}      [description]
	 */
	exports.updateModel = function drainViewDataToModel(pipe) {
		this.pump.drain(pipe);

		return this;
	};


});

define('__bb-model-view/model-pump',['require','exports','module','jquery-pump','lodash'],function (require, exports, module) {
	

	var jqPump = require('jquery-pump'),
		_      = require('lodash');

	exports.modelPump = jqPump.extend({


		/**
		 * Initializes pump and picks strngifiers and parser options.
		 *
		 * @param  {[type]} source  [description]
		 * @param  {[type]} options [description]
		 * @return {[type]}         [description]
		 */
		initialize: function initializeModelPump(source, options) {

			// bind methods
			_.bindAll(this, ['srcGet', 'srcSet']);

			// initialize pump
			jqPump.prototype.initialize.call(this, source, options);
			// set the bbmvID as data attribute to the destination els.
			// that is for the html->model binding

			// pick strngifier and parser methods
			options = options || {};
			_.each(['stringify', 'stringifiers', 'parse', 'parsers'], function (prop) {
				this[prop] = options[prop] || this[prop];
			}, this);
		},

		/**
		 * Method specified by pump API
		 * @param  {[type]} model    [description]
		 * @param  {[type]} property [description]
		 * @return {[type]}          [description]
		 */
		srcGet: function getFromModel(model, property) {

			return model.get(property);
		},

		/**
		 * Method specified by pump API
		 * @param  {[type]} model    [description]
		 * @param  {[type]} property [description]
		 * @param  {[type]} value    [description]
		 * @return {[type]}          [description]
		 */
		srcSet: function setToModel(model, property, value) {

			return model.set(property, value);
		},
	});

});

define('__bb-model-view/elements',['require','exports','module','jquery-selector-data-prefix'],function (require, exports, module) {
	



	// :data-prefix(prefix) selector
	require('jquery-selector-data-prefix');

	/**
	 * The string by which binding ddata attributes are prefixed.
	 * data-bind-somekey="method"
	 *
	 * @type {String}
	 */
	exports.prefix = 'bind';

	/**
	 * Method that returns ALL jquery elements that should
	 * have any data-binding.
	 *
	 * @return {[type]} [description]
	 */
	exports.boundElements = function boundElements() {
		// $el.add() creates a NEW SELECTION :)
		// it does not add to the existing jq object.
		var $boundChildElements = this.$el.find(':data-prefix(' + this.prefix + ')');
		return this.$el.add($boundChildElements);
	};


});

//     bb-model-view
//     (c) simonfan
//     bb-model-view is licensed under the MIT terms.

/**
 * The modeld is the object that links together $els and models.
 *
 * @module bb-model-view
 */

/* jshint ignore:start */

/* jshint ignore:end */

define('bb-model-view',['require','exports','module','lodash','lowercase-backbone','jquery-value','./__bb-model-view/bind','./__bb-model-view/update','./__bb-model-view/model-pump','./__bb-model-view/elements'],function (require, exports, module) {
	


	var _        = require('lodash'),
		backbone = require('lowercase-backbone'),
		jqValue  = require('jquery-value');


	var bind = require('./__bb-model-view/bind');

	/**
	 * Name of parser and stringifier option names.
	 * @type {Array}
	 */
	var pumpOptionNames = ['parse', 'parsers', 'stringify', 'stringifiers', 'prefix', 'formats'];


	var bbModelView = module.exports = backbone.view.extend({

		initialize: function initialize() {
			// initialize basic backbone view
			backbone.view.prototype.initialize.apply(this, arguments);

			this.initializeModelView.apply(this, arguments);
		},

		/**
		 * Holds initialization logic for modelmodeld.
		 *
		 * @method initializeModelView
		 * @param options {Object}
		 */
		initializeModelView: function initializeModelView(options) {
			if (!this.model) { throw new Error('No model set for model view.'); }
			if (!this.$el) { throw new Error('No el set on model view.'); }

			// [1] find all elements that have bindings defined.
			var $boundElements = this.boundElements();

			// [2] create a jquery pump with those elements.
			// [2.1] get stringifiers and parsers
			var pumpOptions = _.pick(options, pumpOptionNames);
			_.defaults(pumpOptions, _.pick(this, pumpOptionNames));

			// [2.2] set destination
			pumpOptions.destination = $boundElements;

			// [2.2] effectively create the pump
			this.pump = this.modelPump(this.model, pumpOptions);

			// [3] listen to change events on $boundElements
			bind.DOMToModel.call(this, $boundElements);

			// [4] listen to change events on the model
			bind.modelToDOM.call(this, this.model);

			// [5] initialize view by pumping the model data.
			this.updateView();
		},
	});

	bbModelView
		.assignProto(require('./__bb-model-view/update'))
		.assignProto(require('./__bb-model-view/model-pump'))
		.assignProto(require('./__bb-model-view/elements'));
});

