/**
 * @module bb-model-view
 * @submodule model-to-dom-update
 */
define('__bb-model-view/model-to-dom/update',['require','exports','module','lodash'],function (require, exports, module) {
	

	var _ = require('lodash');

	/**
	 * Method used internally to update the html.
	 *
	 * @method update
	 * @_private_
	 * @param model
	 */
	var update = module.exports = function update(model) {

		var stringifiers = this.stringifiers,
			// map out data.
			data = _.mapValues(model.attributes, function (value, attribute) {

			//	// console.log(value);
			//	// console.log(attribute);

				var stringify = stringifiers[attribute];

				// if no stringify is defined, return the value
				return stringify ? stringify.call(this, value) : value;
			});

		this.fill(data);
	};
});

/**
 * @module bb-model-view
 * @submodule model-to-dom
 */
define('__bb-model-view/model-to-dom/index',['require','exports','module','jquery.filler','./update'],function (require, exports, module) {
	

	var filler = require('jquery.filler');


	// update function
	var update = require('./update');


	/**
	 *
	 *
	 * @method bindModelToDOM
	 * @param $el {backbone.$el Object}
	 * @param map {Object}
	 */
	module.exports = function bindModelToDOM() {
		/**
		 * The function that will fill in html for us.
		 * Uses jquery.filler to build a cache of the
		 * jquery DOM selections.
		 *
		 * @method fill
		 * @param data {Object}
		 */
		this.fill = this.$el.filler(this.map);

		// Listen to model events
		// Dock proxies all events from the model

		// listenTo always invokes the event handler
		// in 'this' context
		this.listenTo(this.model, 'change', update);

		// initialize by calling update
		update.call(this, this.model);
	};
});

/**
 * @module bb-model-view
 * @submodule dom-to-model-read
 */
define('__bb-model-view/dom-to-model/read-dom-value',['require','exports','module','lodash','jquery'],function (require, exports, module) {
	

	var _ = require('lodash'),
		$ = require('jquery');

	/**
	 * Hash of functions that will return a value
	 * given an jquery $el.
	 * Keyed by tagName
	 *
	 * @property $readers
	 * @private
	 * @type Object
	 */
	var $readers = {
		'default': function readDefault($el) {
			return $el.val();
		},

		'DIV': function readDiv($el) {
			return $el.html();
		},

		'INPUT': function readInput($el) {
			if ($el.prop('type') === 'checkbox') {
				return _.map($el.filter(':checked'), function (el) {
					return $(el).val();
				});

			} else {
				return $el.val();
			}
		}
	};

	/**
	 * Takes a selector string and returns the value of it.
	 *
	 * @method readDomValue
	 * @param selector {String}
	 */
	module.exports = function readDomValue($el) {

		// [1] retrieve reader function
		var tagName = $el.prop('tagName'),
			reader = $readers[tagName] || $readers['default'];

		// [2] read and return.
		return reader($el);
	};
});

/**
 * @module bb-model-view
 * @submodule dom-to-model-update
 */
define('__bb-model-view/dom-to-model/update',['require','exports','module','jquery','./read-dom-value'],function (require, exports, module) {
	

	var $ = require('jquery');

	// reads the value from DOM elements.
	var readDomValue = require('./read-dom-value');

	/**
	 * 'change' event handler for all elements selected by selectors
	 * defined on map that select at least one input element.
	 *
	 * Only propagates modifications from REGISTERED elements.
	 *
	 * @method updateModel
	 * @private
	 * @param e {Event}
	 */
	module.exports = function updateModel(e) {
			// [0] wrap the target into a jquery object
		var $target = $(e.target),
			// [1] retrieve the BBMVUID set on the $target.
			BBMVUID = $target.data(this.bbmvUIDAttribute);

		// [2] verify that the BBMVUID effectively exists
		//     and refers to a binding of THIS view (not from another bb-model-view)
		if (!_.isUndefined(BBMVUID) && this.bindings[BBMVUID]) {

			// [2.1] get the binding data description
			var bindingData = this.bindings[BBMVUID];

			// [2.2] read the value and parse it
			var attribute = bindingData.attribute,
				value     = readDomValue($target),
				parse     = this.parsers[attribute];

			// [2.3] do parsing.
			value = parse ? parse.call(this, value) : value;

			// [2.4] set.
			this.model.set(attribute, value);
		}
	};
});

/**
 * @module bb-model-view
 * @submodule dom-to-model
 */
define('__bb-model-view/dom-to-model/index',['require','exports','module','lodash','./update'],function (require, exports, module) {
	

	var _ = require('lodash');

	// internal
	var update = require('./update');


	/**
	 * Removes the method part from the bbmvSelector.
	 *
	 * @method parseJqSelector
	 * @param  {[type]} str [description]
	 * @return {[type]}     [description]
	 */
	function parseJqSelector(str) {
		// it refers to an input
		return str.replace(/\s*->.*$/, '');
	}

	/**
	 * This method tries to find and bind an element
	 * to the view.
	 *
	 * @method bindElement
	 * @param  {[type]} view         [description]
	 * @param  {[type]} bbmvSelector [description]
	 * @param  {[type]} attribute    [description]
	 * @return {[type]}              [description]
	 */
	function bindElement(view, bbmvSelector, attribute) {
		// bbmvSelector samples:
		// array          : ['.class->css:cssprop', '.class']
		// pure jquery    : '[data-attribute="url"]'
		// jquery + method: '[data-attribute="url"] -> css:color'

		if (_.isArray(bbmvSelector)) {
			// array          : ['.class->css:cssprop', '.class']
			// [1] if it is an array, just go recursive.
			_.each(bbmvSelector, function (bbmvSel) {
				bindElement(view, bbmvSel, attribute);
			});

		} else {
			// pure jquery    : '[data-attribute="url"]'
			// jquery + method: '[data-attribute="url"] -> css:color'

			// [1] generate BBMVUID
			var BBMVUID = _.uniqueId('bbmvEl_');

			// retrieve $el and check if it
			// is an input
			// [2] select the element.
				// [2.1] parse out the jquery element selector
			var selector = parseJqSelector(bbmvSelector),
				// [2.2] effectively select AND filter for the inputs.
				el = view.$el.find(selector).filter(':input');

			if (el.length > 0) {
				// [3] the el has an input, thus create the binding
				// using the BBMVUID
				view.bindings[BBMVUID] = {
					// the input element found
					el       : el,
					// pure jquery selector
					selector : selector,
					// attribute to which the element is bound to
					attribute: attribute,
				};

				// [3.1] store the BBMVUID onto the element using jquery.data method
				//       keyed by the bbmvUIDAttribute property of the view.
				el.data(view.bbmvUIDAttribute, BBMVUID);
			}
		}

	};



	/**
	 * Initialization logic for binding html input tags values
	 * to the models attributes.
	 *
	 * @method bindDOMToModel
	 */
	module.exports = function bindDOMToModel() {

		/**
		 * Hash where elements are referenced
		 * by their uuids (created by us)
		 *
		 * @property bindings
		 * @type Object
		 */
		this.bindings = {};

		// bind inputs.
		_.each(this.map, _.partial(bindElement, this));

		// build a jquery selector from the selectors
		// saved on bindings object.
		// The selector does not necessarily select
		// input elements EXCLUSIVELY.
		// The individual resulting selection from each
		// selector has at least one input element.
		// That is the closest we can get.
		var mightBeInputSelector = _.map(this.bindings, function (data, BBMVUID) {
			return data.selector;
		})
		.join(', ');

		this.$el.on('change', mightBeInputSelector, _.bind(update, this));
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

define('bb-model-view',['require','exports','module','lodash','bb-dock','lowercase-backbone','./__bb-model-view/model-to-dom/index','./__bb-model-view/dom-to-model/index'],function (require, exports, module) {
	

	var _ = require('lodash'),
		modelDock = require('bb-dock').model,
		backbone = require('lowercase-backbone');

	// initializers
	var bindModelToDOM = require('./__bb-model-view/model-to-dom/index'),
		bindDOMToModel = require('./__bb-model-view/dom-to-model/index');

	/**
	 * The constructor for the bbModelView object.
	 *
	 * @method bbModelView
	 * @constructor
	 * @param extensions {Object}
	 *     @param $el {Object}
	 *         The $el that owns the bbModelView object
	 *     @param map {Object}
	 *         Map that links selectors to attributes
	 *     @param [model] {Object}
	 *         Optionally provide a model that will initially fill the $el.
	 */
	var bbModelView = module.exports = backbone.view.extend({

		/**
		 * The name of the data attribute that should store the uuid for element.
		 * Used to listen to changes.
		 *
		 * @property bbmvUIDAttribute description]
		 * @type {String}
		 */
		bbmvUIDAttribute: 'bbmvUID',

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

			if (!this.model) {
				throw new Error('No model set for model view.');
			}

			options = options || {};

			this.map = options.map || this.map;
			this.parsers = options.parsers || this.parsers;
			this.sringifiers = options.stringifiers || this.stringifiers;

			// initialize model-to-dom attach logic.
			bindModelToDOM.call(this);
			bindDOMToModel.call(this);
		},

		/**
		 * Map that identifies selectors for attribvutes.
		 *
		 * @property map
		 */
		map: {},


		stringifiers: {},

		/**
		 * Hash for the parsers. Every parser function is called
		 * within the's context and takes the value read
		 * from the DOM as arugment.
		 *
		 * @property parsers
		 * @type Object
		 */
		parsers: {},
	});
});

