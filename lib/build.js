/**
 * @file build, build the src files to dist by webpack
 * @author X-Jray(z.xuanjian@gmail.com)
*/

var spawn = require('child_process').spawn;
var chalk = require('chalk');

function main(cmptName) {

    var output = spawn('npm', ['run', 'build']);

    console.log(chalk.green('开始组件构建...'));

    output.stdout.on('data', function (data) {
        console.log(data.toString());
    });

    output.stderr.on('data', function (data) {
        console.log(data.toString());
    });

    output.stderr.on('end', function (data) {
        saySucc()
    });
}

module.exports = main;
