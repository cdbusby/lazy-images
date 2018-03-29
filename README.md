# lazy-images

Super simple vanilla JS lazy loading of images, including srcset.

[![Build Status](https://travis-ci.org/cdbusby/lazy-images.svg?branch=master)](https://travis-ci.org/cdbusby/lazy-images)

## Installation

Add the lazyImages script to your page

```html
<script src="path/to/lazyImages.min.js" type="text/javascript"></script>
```

Init the lazyImages class and run the loadImages function

```javascript
var lazy = new lazyImages();
lazy.loadImages();
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
## Changelog

### 0.2.0

* Fixing issue with ES6 transpiling and proper exporting -- no more global var.
* Change package name for npm.
* Updating readme with new install instructions.
* Switching to using a global variable for export.
* Update README with link to TravisCI.
* Splitting source into modules, removing setTimeout() in favour of promises, commenting code, adding to readme.
* Rename webpack production config file.
* Adding build status to readme.
* Adding eslint.
* Adding .travis.yml for CI.

### 0.1.0

* Initial version