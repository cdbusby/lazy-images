'use strict';

const webpack = require('webpack')

module.exports = {
    mode: 'development',

    context: `${__dirname}/src/`,

    cache: true,

    entry: {
        lazyImages: './lazyImages.js'
    },

    output: {
        path: `${__dirname}/build/`,
        filename: '[name].js',
        library: 'LazyImages',
        libraryTarget: 'umd',
        sourceMapFilename: '[file].map',
        devtoolModuleFilenameTemplate: 'webpack:///[resource-path]', // string
        devtoolFallbackModuleFilenameTemplate: 'webpack:///[resource-path]?[hash]', // string
        umdNamedDefine: true
    },

    resolve: {
        modules: ["node_modules"]
    },

    plugins: [
        new webpack.NoEmitOnErrorsPlugin()
    ],

    devtool: 'source-map'
};
