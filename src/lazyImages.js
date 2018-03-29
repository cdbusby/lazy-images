import defaults from './includes/defaults.js';

/**
 * Define lazyImages class.
 */
class lazyImages {

    /**
     * Constructor -- assign selector and grab imaages
     * @param {string} selector - Selector string for lazy images
     */
    constructor (selector) {
        this.selector = selector ? selector : defaults.selector;
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
            image.removeAttribute(this.selector, '');
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

module.exports = lazyImages;
