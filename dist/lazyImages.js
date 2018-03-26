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
/***/ (function(module, exports) {

const defaults = {
    selector: 'data-lazy',
    classes: { loaded: 'is-loaded' }
};

class lazyImages
{

    constructor (selector)
    {
        this.selector = !selector ? selector : defaults.selector;
        this.images = document.querySelectorAll(`[${this.selector}]`);
    }

    isInViewport (el)
    {
        var bounding = el.getBoundingClientRect();

        return (
            bounding.top >= 0 &&
            bounding.left >= 0 &&
            bounding.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            bounding.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }

    loadImage (image)
    {
        var src = image.getAttribute('data-src');
        var srcset = image.getAttribute('data-srcset');

        if (this.isInViewport(image))
        {
            image.src = src;
            image.removeAttribute('data-src', '');

            if (srcset)
            {
                image.srcset = srcset;
                image.removeAttribute('data-srcset', '');
            }

            setTimeout(function ()
            {
                var currentSource = image.currentSrc;

                var tempImage = new Image();
                tempImage.onload = function ()
                {
                    image.removeAttribute('data-lazy', '');

                    setTimeout(function ()
                    {
                        image.classList.add(defaults.classes.loaded);
                    });
                };
                tempImage.src = currentSource;
            });
        }
    }

    loadImages ()
    {
        if (this.images.length)
        {
            this.images.forEach((image) =>
            {
                this.loadImage(image);
            });
        }
    }

}

let lazy = new lazyImages('data-lazy');
lazy.loadImages();


/***/ })
/******/ ]);
});