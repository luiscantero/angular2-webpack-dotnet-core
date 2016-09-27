var webpackMerge = require('webpack-merge');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var commonConfig = require('./webpack.common.js');
var helpers = require('./helpers');
var webpack = require('webpack');

module.exports = webpackMerge(commonConfig, {
    output: {
        path: helpers.root('./wwwroot'),
        publicPath: '/',
        filename: '[name].js',
        chunkFilename: '[id].chunk.js'
    },

    plugins: [
      new ExtractTextPlugin('[name].css'),

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