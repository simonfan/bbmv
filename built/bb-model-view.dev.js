//     bb-dock
//     (c) simonfan
//     bb-dock is licensed under the MIT terms.

define("bb-dock",["require","exports","module","lodash","subject","backbone"],function(t,e,i){var a=t("lodash"),n=t("subject"),r=t("backbone"),s=i.exports=n({initialize:function(t){this.initializeBbDock(t)},initializeBbDock:function(t){t&&t.attach&&this.attach(t.attach)},invoke:function(t){if(this.attachment){var e=Array.prototype.slice.call(arguments,1);return this.attachment[t].apply(this.attachment,e)}throw new Error("No attachment attached to dock. Unable to invoke "+t)},retrieve:function(t){if(this.attachment)return this.attachment[t];throw new Error("No attachment attached to dock. Unable to retrieve "+t)},attach:function(t,e){return this.detach(),this.attachment=t,this.listenTo(t,"all",this.trigger),e&&e.silent||this.trigger("attach",t),this},detach:function(t){if(this.attachment){var e=this.attachment;this.stopListening(e),delete this.attachment,t&&t.silent||this.trigger("detach",e)}return this}});s.extendProxyMethods=function(t){var e={};return a.each(t,function(t){e[t]=a.partial(s.prototype.invoke,t)}),this.extend(e)},s.proto(r.Events);var o=s.extendProxyMethods(["get","set","escape","has","unset","clear","toJSON","sync","fetch","save","destroy","validate","isValid","url","parse","clone","isNew","hasChanged","changedAttributes","previous","previousAttributes","keys","values","pairs","invert","pick","omit"]);s.model=o;var c=s.extendProxyMethods(["toJSON","sync","add","remove","reset","set","get","at","push","pop","unshift","shift","slice","sort","pluck","where","findWhere","parse","clone","fetch","create","forEach","each","map","collect","reduce","foldl","inject","reduceRight","foldr","find","detect","filter","select","reject","every","all","some","any","include","contains","invoke","max","min","toArray","size","first","head","take","initial","rest","tail","drop","last","without","difference","indexOf","shuffle","lastIndexOf","isEmpty","chain","sample","partition"]);s.collection=c});
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
	var _update = require('./update');


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

		// Listen to dock events
		// Dock proxies all events from the model

		// listenTo always invokes the event handler
		// in 'this' context
		this.listenTo(this.dock, 'change attach', _update);
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
	 * Method used to hanlde changes on input elements within
	 * the.
	 *
	 * Very close-bound to the way bindInput works.
	 *
	 * @method updateModel
	 * @_private_
	 * @param e {Event}
	 */
	module.exports = function updateModel(e) {
			// wrap the target into a jquery object
		var $target = $(e.target),
			// retrieve the attribute that the target is bound to
			attribute = $target.data('_dock_-bound-attribute');

		if (attribute) {
			// only update if the element
			// has an attribute bound to it.

			// [1] retrieve the $el
			var selector = $target.data('_dock_-selector'),
				$el = this.$els[selector];

			// console.log(this.$els);

			// console.log('read ' + selector);
			// console.log($el);

			// [2] read the value and parse it
			var value = readDomValue($el),
				parse = this.parsers[attribute];

			value = parse ? parse.call(this, value) : value;

			// [3] set.
			this.dock.set(attribute, value);
		}
	};
});

/**
 * @module bb-model-view
 * @submodule dom-to-model-bind-input
 */
define('__bb-model-view/dom-to-model/bind-input',['require','exports','module','lodash','jquery','./bind-input'],function (require, exports, module) {
	

	var _ = require('lodash'),
		$ = require('jquery');

	var bindInput = require('./bind-input');

	/**
	 * Binds the value of the element selected to the attribute.
	 *
	 * @method bindInput
	 * @param selector {String|Array}
	 * @param attribute {String}
	 */
	module.exports = function bindInput(selector, attribute) {

		if (_.isArray(selector)) {

			_.each(selector, _.bind(function (sel) {

				bindInput.call(this, sel, attribute);

			}, this));

		} else {

			// console.log(typeof selector);
			// console.log('store ' + selector);

			// retrieve $el and store it.
			var $el = this.$els[selector] = this.$el.find(selector);

			if ($el.length > 0) {
				$el.data('_dock_-bound-attribute', attribute)
					.data('_dock_-selector', selector);
			}
		}
	};

});

/**
 * @module bb-model-view
 * @submodule dom-to-model
 */
define('__bb-model-view/dom-to-model/index',['require','exports','module','lodash','./update','./bind-input'],function (require, exports, module) {
	

	var _ = require('lodash');

	// internal
	var update = require('./update'),
		bindInput = require('./bind-input');

	/**
	 * Initialization logic for binding html input tags values
	 * to the models attributes.
	 *
	 * @method bindDOMToModel
	 */
	module.exports = function bindDOMToModel() {

		/**
		 * Hash where elements are referenced
		 * by their selector strings.
		 *
		 * @property $els
		 * @type Object
		 */
		this.$els = {};

		// bind inputs.
		_.each(this.map, _.bind(function (selector, attribute) {

			bindInput.call(this, selector, attribute);
		}, this));

		// build a selector string that selects the
		// elements that are input
		var selectors = _(this.$els).mapValues(function ($el, selector) {

			if ($el.is(':input')) {
				// it refers to an input
				return selector.replace(/\s*->.*$/, '');
			} else {
				return false;
			}
		})
		.values()
		.compact()
		.join(', ');

		this.$el.on('change', selectors, _.bind(update, this));
	};
});

//     bb-model-view
//     (c) simonfan
//     bb-model-view is licensed under the MIT terms.

/**
 * The dock is the object that links together $els and models.
 *
 * @module bb-model-view
 * @submodule $el.dock
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

		initialize: function initialize() {
			// initialize basic backbone view
			backbone.view.prototype.initialize.apply(this, arguments);

			this.initializeModelDock.apply(this, arguments);
		},

		/**
		 * Holds initialization logic for modeldock.
		 *
		 * @method initializeModelDock
		 * @param options {Object}
		 */
		initializeModelDock: function initializeModelDock(options) {

			this.map = options.map || this.map;
			this.parsers = options.parsers || this.parsers;
			this.sringifiers = options.stringifiers || this.stringifiers;

			// create the dock
			this.dock = options.dock || modelDock();

			// initialize model-to-dom attach logic.
			bindModelToDOM.call(this);
			bindDOMToModel.call(this);

			// attach the initial model
			if (typeof options.model === 'object') {
				this.dock.attach(options.model);
			}
		},


		attach: function attach(model, options) {

			this.dock.attach(model, options);

			return this;
		},

		detach: function detach(options) {
			this.dock.detach(options);

			return this;
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

