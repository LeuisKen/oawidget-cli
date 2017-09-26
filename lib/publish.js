/**
 * @file publish, publish the dist to server
 * @author X-Jray(z.xuanjian@gmail.com)
*/

var spawn = require('child_process').spawn;
var fs = require('fs');
var path = require('path');

function main(cmptName) {
    var output;
    var gitPath = path.join(process.cwd(), '.git');

    if (!fs.existsSync(gitPath)) {
        output = spawn('git', ['init'], ['-y']);
    }

    output = spawn('git', ['remote', 'add', 'origin', 'https://zhangxuanjian@icode.baidu.com/baidu/jady/oap-widget']);
    output = spawn('git', ['add', '.']);
    output = spawn('git', ['push', 'origin', 'HEAD:refs/for/master']);

    output.stdout.on('data', function (data) {
      console.log(data.toString());
    });

    output.stderr.on('data', function (data) {
      console.log(data.toString());
    });
}

module.exports = main;
