# lazy-images

Super simple vanilla JS lazy loading of images, including srcset.

[![Build Status](https://travis-ci.org/cdbusby/lazy-images.svg?branch=master)](https://travis-ci.org/cdbusby/lazy-images)

## Installation

Add the lazyImages script to your page

```html
<script src="path/to/LazyImages.min.js" type="text/javascript"></script>
```

Init the lazyImages class and run the loadImages function

```javascript
var lazy = new LazyImages();
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

### 0.3.2

* e49f765 Change viewport check to only need the top left of the image.
* d4df7d5 Fix changelog format.

### 0.3.1

* 9ff8493 Fix capitalization of source file.
* 6d71677 Update changelog.

### 0.3.0

* 63bad89 Fix issue with src being unset, moved from complete class to data attribute, capitalize class.
* 17a35b4 Add dist to eslintignore and add new capitalization to readme.
* 9213623 Updating webpack configs with new class capitalization.
* 9bf1f77 Updating changelog.

### 0.2.2

* f5ae6d9 Build dist files after 0.2.1 fixes.

### 0.2.1

* 490d194 Fix assignment of selector and removal of data attributes.
* 490d194 Updating readme with changelog.

### 0.2.0

* 75e065e Fixing issue with ES6 transpiling and proper exporting -- no more global var.
* 262a8a4 Change package name for npm.
* 93f2233 Updating readme with new install instructions.
* 1bccf2c Switching to using a global variable for export.
* b854b22 Update README with link to TravisCI.
* d468267 Splitting source into modules, removing setTimeout() in favour of promises, commenting code, adding to readme.
* 41ff8f1 Rename webpack production config file.
* 709e8b5 Adding build status to readme.
* a37378f Adding eslint.
* e0f505c Adding .travis.yml for CI.

### 0.1.0

* b48af46 Adding project files and initial plugin code.
* bdcfc26 Initial commit