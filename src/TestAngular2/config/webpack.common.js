var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var OpenBrowserPlugin = require('open-browser-webpack-plugin');
var helpers = require('./helpers');

module.exports = {
    entry: {
        'polyfills': './config/polyfills.ts',
        'vendors': './config/vendors.ts',
        'app': './app/main.ts'
    },

    resolve: {
        extensions: ['.ts', '.js'] // Try .ts first, otherwise map will reference .js file.
    },

    module: {
        rules: [
            {
                test: /\.ts$/,
                use: [
                    'awesome-typescript-loader',
                    'angular2-template-loader',
                ]
            },
            {
                test: /\.html$/,
                use: { loader: 'html-loader' }
            },
            {
                test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)$/,
                use: {
                    loader: 'file-loader',
                    options: {
                        name: 'assets/[name].[hash].[ext]'
                    }
                }
            },
            {
                test: /\.css$/,
                exclude: helpers.root('app'),
                use: ExtractTextPlugin.extract({ fallback: 'style-loader', use: 'css-loader?source-map' })
            },
            {
                test: /\.css$/,
                include: helpers.root('app'),
                use: [
                    'to-string-loader',
                    'css-loader',
                ]
            }
        ]
    },

    plugins: [
        new webpack.optimize.CommonsChunkPlugin({
            name: ['app', 'vendor', 'polyfills']
        }),

        new webpack.ContextReplacementPlugin(
            /angular(\\|\/)core/,
            __dirname
        ),

        new HtmlWebpackPlugin({
            template: './index.html'
        }),

        new OpenBrowserPlugin({ url: 'http://localhost:3000' }),

        //new webpack.ProvidePlugin({
        //    jQuery: 'jquery',
        //    $: 'jquery',
        //    jquery: 'jquery'
        //}),
    ],

    //optimization: {
    //    splitChunks: {
    //        cacheGroups: {
    //            vendors: {
    //                name: "vendors",
    //                test: "vendors",
    //                enforce: true
    //            },
    //        }
    //    }
    //}
};