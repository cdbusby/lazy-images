import defaults from './includes/defaults.js';

/**
 * Define lazyImages class.
 */
class LazyImages {

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

        // Return true as long as the top left of the image is within the viewport
        return (
            bounding.top >= 0 &&
            bounding.left >= 0 &&
            bounding.top <= (window.innerHeight || document.documentElement.clientHeight)
        );
    }

    /**
     * Load a temporary image to simulate the loading effect
     * @param {Object} image - Image object
     */
    simulateLoading (image) {
        // Let the browser decide what source to load (if applicable)
        // and capture it as our temporary image source
        var currentSource = image.currentSrc ? image.currentSrc : image.src;

        // Create new empty image object
        var tempImage = new Image();

        // On image load, remove lazy attribute and add
        // css class since image has been loaded
        tempImage.onload = () => {
            image.removeAttribute(this.selector);

            // Remove relevant data attributes
            if (image.getAttribute('data-src')) {
                image.removeAttribute('data-src');
            }
            if (image.getAttribute('data-srcset')) {
                image.removeAttribute('data-srcset');
            }

            image.setAttribute(defaults.attributes.loaded, 'true');
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
                    // Assign src if defined
                    if (src) {
                        image.src = src;
                    }

                    // Assign srcset if defined
                    if (srcset) {
                        image.srcset = srcset;
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

module.exports = LazyImages;
