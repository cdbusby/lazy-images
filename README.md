# lazy-images

Super simple vanilla JS lazy loading of images, including srcset.

![Build Status](https://travis-ci.org/cdbusby/lazy-images.svg?branch=master)

## Installation

Add the lazyImages script to your page

```html
<script src="path/to/lazyImages.min.js" type="text/javascript"></script>
```

Add the lazy and src/srcset data attributes to images, and add the same image in a noscript tag for users without javascript

```html
<img data-src="path/to/image.jpg" data-srcset="path/to/image@2x.jpg 2x" data-lazy="true" alt="">
<noscript><img src="path/to/image.jpg" srcset="path/to/image@2x.jpg 2x" alt=""></noscript>
```

## Build Instructions

Install dependencies

```bash
$ npm install
```

Build/watch commands

```bash
$ npm run build
$ npm run watch
```

Production build

```bash
$ npm run prod
```

Eslint check and fix

```bash
$ npm run lint
$ npm run lintfix
```