(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("LazyImages", [], factory);
	else if(typeof exports === 'object')
		exports["LazyImages"] = factory();
	else
		root["LazyImages"] = factory();
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
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./includes/defaults.js
/**
 * Create object of default settings that can be overrriden on plugin init.
 */
/* harmony default export */ var defaults = ({
    selector: 'data-lazy',
    classes: {
        loaded: 'is-loaded'
    }
});

// CONCATENATED MODULE: ./lazyImages.js


/**
 * Define lazyImages class.
 */
class lazyImages_lazyImages {

    /**
     * Constructor -- assign selector and grab imaages
     * @param {string} selector - Selector string for lazy images
     */
    constructor (selector) {
        this.selector = !selector ? selector : defaults.selector;
        this.images = document.querySelectorAll(`[${this.selector}]`);
    }

    /**
     * Check to see if HTML element is inside viewport
     * @param {Object} el - HTML element
     * @return {boolean} True if element is visible
     */
    isInViewport (el) {
        // Get bounding attributes of element
        var bounding = el.getBoundingClientRect();

        return (
            bounding.top >= 0 &&
            bounding.left >= 0 &&
            bounding.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            bounding.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }

    /**
     * Load a temporary image to simulate the loading effect
     * @param {Object} image - Image object
     */
    simulateLoading (image) {
        // Let the browser decide what source to load
        // and capture it as our temporary image source
        var currentSource = image.currentSrc;

        // Create new empty image object
        var tempImage = new Image();

        // On image load, remove lazy attribute and add
        // css class since image has been loaded
        tempImage.onload = function () {
            image.removeAttribute('data-lazy', '');
            image.classList.add(defaults.classes.loaded);
        };

        // Assign source and initialize image load event
        tempImage.src = currentSource;
    }

    /**
     * Load image by turning data attributes into real attributes
     * @param {Object} image - Image element
     */
    loadImage (image) {
        // Assing data attribute values to variables
        var src = image.getAttribute('data-src');
        var srcset = image.getAttribute('data-srcset');

        // Check to see if the image is inside the viewport
        // and only load the image if true
        if (this.isInViewport(image)) {
            // Create a promise and assign data-src and data-srcset
            // to real values if they exist
            var loadSrcs = new Promise(
                function (resolve, reject) {
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
            loadSrcs.then(() => {
                this.simulateLoading(image);
            }, function (reason) {
                console.log(reason);
            });
        }
    }

    /**
     * Loop through array of targetted images and load
     */
    loadImages () {
        if (this.images.length) {
            this.images.forEach((image) => {
                this.loadImage(image);
            });
        }
    }

}

let lazyImages_lazy = new lazyImages_lazyImages('data-lazy');
lazyImages_lazy.loadImages();


/***/ })
/******/ ]);
});