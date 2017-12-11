/**
 * @file publish, publish the dist to server
 * @author X-Jray(z.xuanjian@gmail.com)
*/

var fs = require('fs');
var path = require('path');
var prompt = require('prompt');
var request = require('superagent');
var util = require('./util');
var chalk = require('chalk');

function sendPost(metaPostData) {
    request
        .post(metaPostData.postUrl)
        .type('form')
        .field('token', metaPostData.token)
        .field('username', metaPostData.username)
        .field('name', metaPostData.cmptName)
        .field('displayName', metaPostData.displayName)
        .field('previewImg', metaPostData.previewImg)
        .field('type', metaPostData.type)
        .attach('file', metaPostData.file)
        .set('Accept', 'application/json')
        .end(function (err, res) {
            if (err) {
                console.log(chalk.red(err.message));
                process.exit(1);
            }
            if (res.ok) {
                var resData = JSON.parse(res.text);
                if (resData.status === 0) {
                    console.log('发布组件成功, 组件地址: ' + resData.data.url);
                    process.exit(0);
                }
                console.log('发布组件失败: ' + resData.statusInfo);
                process.exit(1);
            }
        });
}

function main() {
    var packageObj = require(path.join(process.cwd(), 'package.json'));
    var cmptName = packageObj.config.cmptName;

    var metaPostData = {};
    metaPostData.cmptName = cmptName;
    var pathName = path.join(process.cwd(), 'src', cmptName, cmptName + '.editor');
    var content = require(pathName).default;
    if (!content.name || !content.displayName || !content.imgViewSrc) {
        console.log(chalk.red('请完善你的组件配置文件'));
        process.exit(1);
    }
    else {
        metaPostData.name = content.name;
        metaPostData.displayName = content.displayName;
        metaPostData.type = content.type;
        metaPostData.previewImg = content.imgViewSrc;
    }

    var postUrl = packageObj.config.uploadHost || 'http://eop.baidu.com/v2/upload/widget';

    console.log(`组件上传目标路径：${postUrl}`);

    metaPostData.postUrl = postUrl;
    var distPath = path.join(process.cwd(), 'dist', cmptName, cmptName + '.js');
    var file = fs.readFileSync(distPath);
    metaPostData.file = file;
    var oapath = util.getOaPath();

    var promptFiledsArr = [];
    var oapathObj = require(oapath);

    var nameExist = /^[A-Za-z0-9_]+$/.test(oapathObj.username);
    if (!nameExist) {
        promptFiledsArr.push({
            name: 'username',
            required: true,
            message: '请输入你的运营平台用户名，回车结束'
        });
    }
    else {
        metaPostData.username = oapathObj.username;
        console.log(`你的运营平台用户名: ${oapathObj.username}`);
    }

    var tokenExist = /^[-A-Za-z0-9_]+$/.test(oapathObj.token);
    if (!tokenExist) {
        promptFiledsArr.push({
            name: 'token',
            required: true,
            message: '请输入你的运营平台用户token，回车结束'
        });
    }
    else {
        metaPostData.token = oapathObj.token;
        console.log(`你的运营平台用户token: ${oapathObj.token}`);
    }

    prompt.start();

    if (promptFiledsArr.length === 0) {
        sendPost(metaPostData);
        return;
    }

    prompt.get(promptFiledsArr, function (err, result) {
        result.token && (metaPostData.token = result.token);
        result.username && (metaPostData.username = result.username);

        // 写入记录
        if (result.token || result.username) {
            var oaFileData = util.compile(oapath, metaPostData);
            fs.writeFileSync(oapath, oaFileData);
        }

        sendPost(metaPostData);
    });
}

module.exports = main;
