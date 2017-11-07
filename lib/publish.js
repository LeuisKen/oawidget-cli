/**
 * @file publish, publish the dist to server
 * @author X-Jray(z.xuanjian@gmail.com)
*/

var fs = require('fs');
var path = require('path');
var prompt = require('prompt');
var request = require('superagent');

function main(cmptName) {

    var nameList = cmptName.split('/');
    // user/cmpt
    if (nameList.length - 1) {
        cmptName = nameList.pop();
    }

    // var postUrl = 'http://eop.baidu.com/upload/widget';
    var postUrl = 'http://127.0.0.1:8008/';
    var distPath = path.join(process.cwd(), '/dist/', cmptName, '/', cmptName + '.js');
    var file = fs.readFileSync(distPath);

    prompt.start();

    var metaPostData = {};

    prompt.get([
        {
            name: 'token',
            required: true,
            message: '请输入您的运营平台用户token，回车结束'
        },
        {
            name: 'username',
            required: true,
            message: '请输入您的运营平台用户名，回车结束'
        },
        {
            name: 'name',
            required: true,
            message: '请输入您上传的组件名称，回车结束'
        },
        {
            name: 'displayName',
            required: true,
            message: '请输入您上传的组件中文显示名称，回车结束'
        },
        {
            description: '请输入您上传的组件数字类型(1: 私有; 2: 公用)，回车结束',
            name: 'type',
            required: true,
            message: '请输入您上传的组件数字类型(1: 私有; 2: 公用)，回车结束',
            pattern: /1|2/
        }
    ], function (err, result) {
        metaPostData.token = result.token;
        metaPostData.username = result.username;
        metaPostData.name = result.name;
        metaPostData.displayName = result.displayName;
        metaPostData.type = result.type;
        request
            .post(postUrl)
            .field('token', metaPostData.token)
            .field('username', metaPostData.username)
            .field('name', metaPostData.name)
            .field('displayName', metaPostData.displayName)
            .field('type', metaPostData.type)
            .attach('file', file)
            .set('Accept', 'application/json')
            .end(function (err, res) {
                if (err) {
                    process.exit(1);
                }
                if (res.ok) {
                    var resData = JSON.parse(res.text);
                    if (resData.status === 0) {
                        console.log('发布组件成功, 组件地址: ' + resData.data.url);
                        process.exit(0);
                    }
                    console.log('发布组件失败: ' + resData.data.statusInfo);
                    process.exit(1);
                }
            });
    });   
}

module.exports = main;
