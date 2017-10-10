/**
 * @file check, check the component's validity
 * @author X-Jray(z.xuanjian@gmail.com)
*/

require('babel-register');
var path = require('path');

function main(cmptName) {
    var pathName = path.join(process.cwd(), 'src', cmptName, cmptName + '.editor');
    // editor parser
    delete require.cache[require.resolve(pathName)];
    var content = require(pathName).default;
    var props = {};
    if (Object.prototype.toString.call(content.propertiesGroup) !== '[object Array]') {
        console.log(chalk.red(cmptName + '组件配置文件Type Error, propertiesGroup should be an array！'));
        process.exit(1);
    }
    content.propertiesGroup.forEach(function (group) {
        if (Object.prototype.toString.call(group.properties) !== '[object Array]') {
            console.log(chalk.red(cmptName + '组件配置文件Type Error, properties should be an array'));
            process.exit(1);
        }

        var re4Type = /\s*number|text|color|image|action|select|time|radio|checkbox\s*/;

        group.properties.forEach(function (item) {
            if (!re4Type.test(item.type)) {
                console.log(chalk.red(cmptName + '组件配置文件Type Error, config type number|text|color|image|action|select|time|radio|checkbox'));
                process.exit(1);
            }
            if (item.unit && !/\s*px\s*/.test(item.unit)) {
                console.log(chalk.red(cmptName + 'Type Error, unit type px | \'\''));
                process.exit(1);
            }
        });
    });
    console.log(chalk.green(cmptName + ' 组件配置文件检查通过！'));
}

module.exports = main;
