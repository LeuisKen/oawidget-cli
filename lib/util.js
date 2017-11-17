/**
 * @file util
 * @author X-Jray(z.xuanjian@gmail.com)
*/

var fs = require('fs');
var etpl = require('etpl');
var tplEngine = new etpl.Engine({
    variableOpen: '${',
    variableClose: '}',
    encoding: 'UTF-8'
});

var util = {
    camel2kebab: function (cmptName) {
        var tagName = cmptName.trim().replace(/([A-Z])/g, function (match, p1) {
            if (match) {
                return '-' + p1.toLowerCase();
            }
        });
        return 'san' + tagName;
    },

    getHome: function () {
        return process.env[
            require( 'os' ).platform() === 'win32' 
                ? 'APPDATA'
                : 'HOME'
        ];
    },

    getOaPath: function () {
        var path = require('path');
        return path.resolve(util.getHome(), '.oawidget.json');
    },

    compile: function (templatePath, data) {
        var content = fs.readFileSync(templatePath, {
            encoding: 'utf8'
        });
        var render = tplEngine.compile(content);
        return render(data);
    }
};

module.exports = util;
