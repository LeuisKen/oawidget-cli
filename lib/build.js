/**
 * @file build, build the src files to dist by webpack
 * @author X-Jray(z.xuanjian@gmail.com)
*/

var spawn = require('child_process').spawn;

function main(cmptName) {

    var output = spawn('npm', ['run', 'build']);

    output.stdout.on('data', function (data) {
      console.log(data.toString());
    });

    output.stderr.on('data', function (data) {
      console.log(data.toString());
    });
}

module.exports = main;
