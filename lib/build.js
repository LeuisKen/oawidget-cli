/**
 * @file build, build the src files to dist by webpack
 * @author X-Jray(z.xuanjian@gmail.com)
*/

var spawn = require('child_process').spawn;
var chalk = require('chalk');
var util = require('./util');

function main(cmptName) {

    var optName = util.getNpmOpr();
    var output = spawn(optName, ['run', 'build']);

    console.log(chalk.green('开始组件构建...'));

    output.stdout.on('data', function (data) {
        console.log(data.toString());
    });

    output.stderr.on('data', function (data) {
        console.log(data.toString());
    });
}

module.exports = main;
