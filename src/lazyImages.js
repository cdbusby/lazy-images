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
