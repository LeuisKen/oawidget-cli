/**
 * @file dev server
 * @author X-Jray(z.xuanjian@gmail.com)
 */

const express = require('express');
const path = require('path');
const fs = require('fs');
const webpack = require('webpack');
const proxyMiddleware = require('http-proxy-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const webpackDevMiddleware = require('webpack-dev-middleware');
const getIP = require('./util').getIP;
const opn = require('opn');

const webpackDevConf = require('./webpack.dev.conf');
const config = require('./config');

const port = (process.env.NODE_ENV === 'dev')
    ? config.dev.port
    : config.preview.port;
const proxyTable = (process.env.NODE_ENV === 'dev')
    ? config.dev.proxyTable
    : config.preview.proxyTable;

const app = express();

const compiler = webpack(webpackDevConf);

const devMiddleware = webpackDevMiddleware(compiler, {
    publicPath: webpackDevConf.output.publicPath,
    index: 'entry.html',
    stats: {
        colors: true
    }
});

const hotMiddleware = webpackHotMiddleware(compiler);
compiler.plugin('compilation', compilation => {
    compilation.plugin('html-webpack-plugin-after-emit', (data, cb) => {
        hotMiddleware.publish({
            action: 'reload'
        });
        cb();
    });
});

Object.keys(proxyTable).forEach(context => {
    let options = proxyTable[context];
    if (typeof options === 'string') {
        options = {
            target: options
        };
    }
    app.use(proxyMiddleware(context, options));
});

app.use(devMiddleware);

app.use(hotMiddleware);

app.use('/api', function (req, res) {
    req.filePath = '.' + req.url + '.js';
    let mockEntry = path.resolve(__dirname, '../mock');
    require(mockEntry)(req, res);
});

app.listen(port, err => {
    if (err) {
        console.log(err);
        return;
    }
    let url = 'http://127.0.0.1:' + port + '/#/';
    console.log('Listening at http://127.0.0.1:' + port + ' or http://' + getIP() + ':' + port + '\n');
    opn(url);
});