/**
 * @file create a Scaffold
 * @author X-Jray(z.xuanjian@gmail.com)
*/

var shell = require('shelljs');
var path = require('path');
var fs = require('fs');
var chalk = require('chalk');
var childProcess = require('child_process');
var util = require('./util');

function main(cmptName) {
    var oapath = util.getOaPath();
    if (!fs.existsSync(oapath)) {
        fs.writeFileSync(oapath, '{"username": "${username}","token": "${token}"}', {
            encoding: 'utf8'
        });
    }

    if (!cmptName) {
        console.log(chalk.red('请输入组件名!'));
        process.exit(1);
    }

    cmptName = cmptName.trim();

    var re = /\/|\-|\_/g;
    if (re.test(cmptName)) {
        console.log(chalk.red(cmptName + ' 组件名不合法!'));
        process.exit(1);
    }

    var isExist = fs.existsSync(cmptName);
    if (isExist) {
        console.log(chalk.red(cmptName + ' 当前组件目录已存在!'));
        process.exit(1);
    }

    console.log(chalk.blue(cmptName + ' 组件目录准备创建...'));

    var cp = childProcess.fork(path.join(__dirname, 'utils', 'copy'));

    console.log(chalk.yellow('脚手架创建中, 请稍后... '));

    cp.on('message', function (data) {
        if (data.progress === 1) {
            clearInterval(progress);
            console.log(chalk.green('\n' + cmptName + ' 组件开发脚手架创建完成!'));
            process.exit(0);
        }
    });

    cp.send({
        cmptName: cmptName
    });

    var outStr = ['O', '(', 'n', '_', 'n', ')', 'O', '~', '\t'];
    var n = 0;

    var progress = setInterval(function () {
        if (!(n % 8)) {
            n = 0;
        }
        process.stdout.write(outStr[n]);
        n++;
    }, 500);
}

module.exports = main;
