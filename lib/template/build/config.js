/**
 * @file config
 * @author X-Jray(z.xuanjian@gmail.com)
 */

const path = require('path');

module.exports = {
    build: {
        env: 'production',
        assetsRoot: path.resolve(__dirname, '../dist'),
        assetsSubDirectory: '',
        assetsPublicPath: '/',
        cssSourceMap: false
    },
    preview: {
        env: 'preview',
        port: 8002,
        assetsRoot: path.resolve(__dirname, '../preview'),
        assetsSubDirectory: '',
        assetsPublicPath: '/',
        // 如果组件需要与服务端通信, 在此处配置代理
        proxyTable: {
        },
        cssSourceMap: false
    }
}
