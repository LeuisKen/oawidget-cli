/**
 * @file preview, preview the componets by webpack
 * @author X-Jray(z.xuanjian@gmail.com)
*/

require('babel-register');

var path = require('path');
var fs = require('fs');
var shell = require('shelljs');
var spawn = require('child_process').spawn;

var util = require('./util');

// editor config parser, only get name-value key then return
function getProps(pathName) {
    pathName = pathName.slice(0, -3);
    delete require.cache[require.resolve(pathName)];
    var content = require(pathName).default;
    var props = {};
    if (Object.prototype.toString.call(content.propertiesGroup) !== '[object Array]') {
        console.log(chalk.red(cmptName + 'Type Error, propertiesGroup should be an array'));
        process.exit(1);
    }
    content.propertiesGroup.forEach(function (group) {
        if (Object.prototype.toString.call(group.properties) !== '[object Array]') {
            console.log(chalk.red(cmptName + 'Type Error, properties should be an array'));
            process.exit(1);
        }
        group.properties.forEach(function (item) {
            if (item.type === 'number') {
                props[item.name] = item.value + item.unit;
            }
            else {
                props[item.name] = item.value;
            }
        });
    });
    return props;
}

function replaceContent(pathName, props) {
    /* TO BE REPLACED */
        // xxx
    /* TO BE REPLACED */
    var regExp = /\/\*\s*TO\s*BE\s*REPLACED\s*\*\/[\n\r\s\t\v.]*((?:.|\n|\r\n|\r)*\})(?=[\n\r\s\t\v.]*\/\*\s*TO\s*BE\s*REPLACED\s*\*\/[\n\r\s\t\v.]*)/g;
    var exampleContent = fs.readFileSync(pathName, {
        encoding: 'utf8'
    });
    var replaceContent = exampleContent.replace(regExp, function (m, p1) {
        if (m) {
            return `/* TO BE REPLACED */
            props: ${props}`;
        }
    });

    fs.writeFileSync(pathName, replaceContent, {
        encoding: 'utf8'
    });
}

function main() {
    var packageObj = require(path.join(process.cwd(), 'package.json'));
    var cmptName = packageObj.config.cmptName;
    var pathName = path.join(process.cwd(), 'src', cmptName, cmptName + '.editor.js');
    var replacePathName = path.join(process.cwd(), 'preview', 'App.js');
    // editor parser
    var props = JSON.stringify(getProps(pathName));
    // inject editor config
    replaceContent(replacePathName, props);

    fs.watch(pathName, function (eventType, fileName) {
        console.log('changed: ' + eventType + ' ' + fileName);
        props = JSON.stringify(getProps(pathName));
        replaceContent(replacePathName, props);
    });

    var optName = util.getNpmOpr();
    var output = spawn(optName, ['run', 'preview']);

    output.stdout.on('data', function (data) {
        console.log(data.toString());
    });

    output.stderr.on('data', function (data) {
        console.log(data.toString());
    });
}

module.exports = main;
