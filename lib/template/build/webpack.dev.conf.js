/**
 * @file webpack dev conf
 * @author X-Jray(z.xuanjian@gmail.com)
 */

const nib = require('nib');

const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const styleLoaders = require('./util').styleLoaders;
const assetsPath = require('./util').assetsPath;
const config = require('./config');

const ROOT = path.resolve(__dirname, '../');
const SRC_ROOT = path.resolve(__dirname, '../src');
const EXAMPLE_ROOT = path.resolve(__dirname, '../example');

const preview = process.env.NODE_ENV === 'preview';

module.exports = {

    context: ROOT,

    entry:  preview ? ['./build/dev-client', './preview/index']
                    : ['./build/dev-client', './example/index'],

    output: {
        path: preview ? config.preview.assetsRoot : config.dev.assetsRoot,
        publicPath: preview ? config.preview.assetsPublicPath : config.dev.assetsPublicPath,
        filename: '[name].js'
    },

    module: {
        rules: [
            {
                test: /\.md$/,
                loader: 'san-markdown-doc-loader'
            },
            {
                test: /\.san$/,
                loader: 'san-loader'
            },
            {
                test: /\.js?$/,
                loader: 'babel-loader',
			    exclude: path.resolve(__dirname, '../node_modules')
            },
            {
                test: /\.json$/,
                loader: 'json-loader'
            },
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                loader: 'url-loader',
                query: {
                    // limit: 100000,
                    name: assetsPath('img/[name].[hash:7].[ext]')
                }
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                loader: 'url-loader',
                query: {
                    limit: 100000,
                    name: assetsPath('fonts/[name].[hash:7].[ext]')
                }
            },
            {
                test: /\.(html|tpl)(\?.*)?$/,
                loader: 'html-loader'
            }
        ].concat(styleLoaders({sourceMap: config.preview.cssSourceMap}))
    },

    resolve: {
        extensions: ['.js', '.san'],
        modules: [
            path.resolve(__dirname, '../src'),
            'node_modules'
        ],
        alias: {
            src: SRC_ROOT
        }
    },

    plugins: [
        new webpack.LoaderOptionsPlugin({
            options: {
                stylus: {
                    'use': [nib()],
                    // ~ resolves to node_modules
                    'import': ['~nib/lib/nib/index.styl']
                }
            }
        }),
        new webpack.WatchIgnorePlugin([
            /\.cache/
        ]),
        new webpack.HotModuleReplacementPlugin(),
        new HtmlWebpackPlugin({
            filename: 'entry.html',
            template: preview ? path.join(__dirname, '../preview/index.html')
                              : path.join(__dirname, '../example/index.html'),
            inject: true
        }),
        // new webpack.NoEmitOnErrorsPlugin()
    ],

    devtool: 'eval-source-map'
};
