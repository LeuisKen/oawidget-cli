/**
 * @file create a Scaffold
 * @author X-Jray(z.xuanjian@gmail.com)
*/

var path = require('path');
var fs = require('fs');
var chalk = require('chalk');
var util = require('./util');

let defaultUrl = 'http://eop.baidu.com/v2/upload/widget';

function updateUser(name, value) {
    var oapath = util.getOaPath();
    if (!fs.existsSync(oapath)) {
        fs.writeFileSync(oapath, '{"username": "${username}","token": "${token}"}', {
            encoding: 'utf8'
        });
    }
    var userConfig = require(oapath);
    userConfig[name] = value;
    fs.writeFileSync(oapath, JSON.stringify(userConfig));
    console.log(chalk.green('配置成功'));
    logInfo();
}

function updateHost(value) {
    var packagePath = path.join(process.cwd(), 'package.json');
    var packageObj = require(packagePath);
    packageObj.config.uploadHost = value;
    fs.writeFileSync(packagePath, JSON.stringify(packageObj, null, '  '));
    console.log(chalk.green('配置成功'));
    logInfo();
}

function logInfo() {
    var info = {};
    var oapath = util.getOaPath();
    var userConfig = require(oapath);
    var packagePath = path.join(process.cwd(), 'package.json');
    delete require.cache[require.resolve(packagePath)];
    var packageObj = require(packagePath);
    Object.assign(info, userConfig, {
        uploadHost: packageObj.config.uploadHost || defaultUrl
    });
    console.log(chalk.green('当前环境配置信息: ' + JSON.stringify(info)));
    process.exit(0);
}

function main(option) {
    var [key, val] = option.split('=');
    if ((option !== 'list') && (!key || !val)) {
        console.log(chalk.red('配置信息非法, e.g. token=987654321'));
    }

    if (!val) {
        logInfo();
    }

    if (val) {
        var re = /['"]?([-\w_\\:\?]+)['"]?/g;
        val = val.trim();
        val = val.replace(re, function (p, m1) {
            return m1;
        });
    }

    switch (key) {
        case 'username':
        case 'token':
            updateUser(key, val);
            break;
        case 'uploadHost':
            updateHost(val);
            break;
        default:
            console.log(chalk.red('配置信息非法, 可配置项 username, token, uploadHost'));
    }
}

module.exports = main;
