/**
 * @file webpack prod conf
 * @author X-Jray(z.xuanjian@gmail.com)
 */
const nib = require('nib');
const fs = require('fs');
const path = require('path');
const webpack = require('webpack');
const CompressionPlugin = require('compression-webpack-plugin');

const styleLoaders = require('./util').styleLoaders;
const assetsPath = require('./util').assetsPath;
const config = require('./config');

const ROOT = path.resolve(__dirname, '../');
const SRC_ROOT = path.resolve(__dirname, '../src');

const SRC_ITEMS = fs.readdirSync(SRC_ROOT);

module.exports = {

    context: ROOT,

    entry: () => {
        const widgetEntry = {};
        SRC_ITEMS.forEach(item => {
            if (!path.extname(item)) {
                widgetEntry[item] = './src/' + item;
            }
        });
        // widgetEntry['index'] = './src/index';
        return widgetEntry;
    },

    output: {
        path: config.build.assetsRoot,
        filename: '[name]/[name].js',
        libraryTarget: 'umd',
        umdNamedDefine: true
    },

    module: {
        rules: [
            {
                test: /\.js$/,
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
                    limit: 100000,
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
        ].concat(styleLoaders({sourceMap: config.dev.cssSourceMap}))
    },

    resolve: {
        extensions: ['.js', '.json'],
        modules: [path.resolve(__dirname, 'src'), 'node_modules']
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
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        }),
        // new CompressionPlugin({
        //     asset: '[file]',
        //     algorithm: 'gzip',
        //     test: /\.(js|css)$/,
        //     threshold: 512,
        //     minRatio: 0.8
        // })
    ],

    devtool: 'cheap-source-map'
};
