const webpackMerge = require('webpack-merge');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const commonConfig = require('./webpack.common.js');
const helpers = require('./helpers');
const webpack = require('webpack');

module.exports = webpackMerge(commonConfig, {
    mode: 'development',

    devtool: false, // Use SourceMapDevToolPlugin.

    output: {
        path: helpers.root('./wwwroot'),
        publicPath: '',
        filename: '[name].js',
        chunkFilename: '[id].chunk.js'
    },

    plugins: [
        new MiniCssExtractPlugin({
            filename: '[name].css',
            chunkFilename: '[id].css',
        }),

        new webpack.SourceMapDevToolPlugin({
            test: /\.js$/,
            moduleFilenameTemplate: '[absolute-resource-path]',
            fallbackModuleFilenameTemplate: '[resource-path]?[hash]',
            filename: "[file].map"
        }),
    ],

    devServer: {
        historyApiFallback: true,
        stats: 'minimal'
    }
});