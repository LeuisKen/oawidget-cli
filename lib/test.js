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
        throw new Error('Type Error, propertiesGroup should be an array');
    }
    content.propertiesGroup.forEach(function (group) {
        if (Object.prototype.toString.call(group.properties) !== '[object Array]') {
            throw new Error('Type Error, properties should be an array');
        }
        var re4Type = /\s*number|text|color|image|action|select|time|radio|checkbox\s*/;
        group.properties.forEach(function (item) {
            if (!re4Type.test(item.type)) {
                throw new Error('Type Error, config type number|text|color|image|action|select|time|radio|checkbox');
                process.exit(1);
            }
            if (item.unit && !/\s*px\s*/.test(item.unit)) {
                throw new Error('Type Error, unit type px | \'\'');
                process.exit(1);
            }
        });
    });
    console.log('检查通过！')
}

module.exports = main;
