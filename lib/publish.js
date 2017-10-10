/**
 * @file publish, publish the dist to server
 * @author X-Jray(z.xuanjian@gmail.com)
*/

var spawn = require('child_process').spawn;
var fs = require('fs');
var path = require('path');
var readline = require('readline');

function main(cmptName) {

    var output;
    var gitPath = path.join(process.cwd(), '.git');

    if (!fs.existsSync(gitPath)) {
        output = spawn('git', ['init'], ['-y']);
    }

    output = spawn('git', ['remote', 'add', 'origin', 'https://zhangxuanjian@icode.baidu.com/baidu/jady/oap-widget']);
    output = spawn('git', ['add', '.']);

    // var ciMsg;

    // var rl = readline.createInterface({
    //     input: process.stdin,
    //     output: process.stdout
    // });

    // rl.question('请输入commit信息: ', function (answer) {
    //     ciMsg = answer;
    //     rl.close();
    // });
    // output = spawn('git', ['ci', '-m']);
    output = spawn('git', ['push', 'origin', 'HEAD:refs/for/master']);

    output.stdout.on('data', function (data) {
        console.log(data.toString());
    });

    output.stderr.on('data', function (data) {
        console.log(data.toString());
    });
}

module.exports = main;
