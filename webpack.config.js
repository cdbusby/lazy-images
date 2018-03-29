'use strict';

const webpack = require('webpack')

module.exports = {
    mode: 'development',

    context: `${__dirname}/src/`,

    cache: true,

    entry: {
        LazyImages: './LazyImages.js'
    },

    output: {
        path: `${__dirname}/build/`,
        filename: '[name].js',
        sourceMapFilename: '[file].map',
        devtoolModuleFilenameTemplate: 'webpack:///[resource-path]', // string
        devtoolFallbackModuleFilenameTemplate: 'webpack:///[resource-path]?[hash]', // string
        library: 'LazyImages',
        libraryTarget: 'umd',
    },

    resolve: {
        modules: ["node_modules"]
    },

    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                }
            }
        ]
    },

    plugins: [
        new webpack.NoEmitOnErrorsPlugin()
    ],

    devtool: 'source-map'
};
