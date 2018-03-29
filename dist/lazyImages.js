(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["lazyImages"] = factory();
	else
		root["lazyImages"] = factory();
})(window, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
/**
 * Create object of default settings that can be overrriden on plugin init.
 */
exports.default = {
    selector: 'data-lazy',
    classes: {
        loaded: 'is-loaded'
    }
};

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _defaults = __webpack_require__(0);

var _defaults2 = _interopRequireDefault(_defaults);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Define lazyImages class.
 */
var lazyImages = function () {

    /**
     * Constructor -- assign selector and grab imaages
     * @param {string} selector - Selector string for lazy images
     */
    function lazyImages(selector) {
        _classCallCheck(this, lazyImages);

        this.selector = selector ? selector : _defaults2.default.selector;
        this.images = document.querySelectorAll('[' + this.selector + ']');
    }

    /**
     * Check to see if HTML element is inside viewport
     * @param {Object} el - HTML element
     * @return {boolean} True if element is visible
     */


    _createClass(lazyImages, [{
        key: 'isInViewport',
        value: function isInViewport(el) {
            // Get bounding attributes of element
            var bounding = el.getBoundingClientRect();

            return bounding.top >= 0 && bounding.left >= 0 && bounding.bottom <= (window.innerHeight || document.documentElement.clientHeight) && bounding.right <= (window.innerWidth || document.documentElement.clientWidth);
        }

        /**
         * Load a temporary image to simulate the loading effect
         * @param {Object} image - Image object
         */

    }, {
        key: 'simulateLoading',
        value: function simulateLoading(image) {
            // Let the browser decide what source to load
            // and capture it as our temporary image source
            var currentSource = image.currentSrc;

            // Create new empty image object
            var tempImage = new Image();

            // On image load, remove lazy attribute and add
            // css class since image has been loaded
            tempImage.onload = function () {
                image.removeAttribute(this.selector, '');
                image.classList.add(_defaults2.default.classes.loaded);
            };

            // Assign source and initialize image load event
            tempImage.src = currentSource;
        }

        /**
         * Load image by turning data attributes into real attributes
         * @param {Object} image - Image element
         */

    }, {
        key: 'loadImage',
        value: function loadImage(image) {
            var _this = this;

            // Assing data attribute values to variables
            var src = image.getAttribute('data-src');
            var srcset = image.getAttribute('data-srcset');

            // Check to see if the image is inside the viewport
            // and only load the image if true
            if (this.isInViewport(image)) {
                // Create a promise and assign data-src and data-srcset
                // to real values if they exist
                var loadSrcs = new Promise(function (resolve, reject) {
                    // Assign src and remove data attribute
                    image.src = src;
                    image.removeAttribute('data-src', '');

                    // If image has a srcset defined
                    if (srcset) {
                        // Assign srcset and remove data attribute
                        image.srcset = srcset;
                        image.removeAttribute('data-srcset', '');
                    }

                    // Resolve or reject the promise if src/srcset
                    // are now defined
                    image.src || image.srcset ? resolve() : reject('Image source could not be loaded.');
                });

                // Simulate loading of image or log error ro console
                // TODO: Remove console log
                loadSrcs.then(function () {
                    _this.simulateLoading(image);
                }, function (reason) {
                    console.log(reason);
                });
            }
        }

        /**
         * Loop through array of targetted images and load
         */

    }, {
        key: 'loadImages',
        value: function loadImages() {
            var _this2 = this;

            if (this.images.length) {
                this.images.forEach(function (image) {
                    _this2.loadImage(image);
                });
            }
        }
    }]);

    return lazyImages;
}();

module.exports = lazyImages;

/***/ })
/******/ ]);
});