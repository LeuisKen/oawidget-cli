/**
 * @file copy boilerplate
 * @author X-Jray(z.xuanjian@gmail.com)
*/

var shell = require('shelljs');
var path = require('path');
var etpl = require('etpl');
var fs = require('fs');

var util = require('../util');

var tplEngine = new etpl.Engine({
    variableOpen: '${',
    variableClose: '}',
    encoding: 'UTF-8'
});

var TEMPLATE_SRC_PATH = path.join(__dirname, '../template/');
var SRCTPL_SRC_PATH = path.join(__dirname, '../srcTpl/');
var PREVIEWTPL_SRC_PATH = path.join(__dirname, '../previewTpl/');

function compile(templatePath, data) {
    var content = fs.readFileSync(templatePath, {
        encoding: 'utf8'
    });
    var render = tplEngine.compile(content);
    return render(data);
}

function writeFiles(dirSrcPath, dirTarPath, data, cmptName) {
    var files = fs.readdirSync(dirSrcPath);
    var oriTarDirPath = '';
    files.forEach(function (item) {
        var templatePath = path.join(dirSrcPath, item);
        var fileContent = compile(templatePath, data);
        if (cmptName) {
            shell.mkdir('-p', 'src/' + cmptName);
            oriTarDirPath = dirTarPath;
            dirTarPath = dirTarPath + '/' + cmptName;
            item = item.replace('demo', cmptName);
        }
        var targetPath = path.join(dirTarPath, item);
        fs.writeFileSync(targetPath, fileContent);
        cmptName && (dirTarPath = oriTarDirPath);
    });
}

function run(cmptName) {
    /* 创建组件开发脚手架 */
    shell.mkdir('-p', cmptName);
    shell.cd(cmptName);

    // cp通用脚手架文件
    shell.cp('-r', TEMPLATE_SRC_PATH + '*', '.');
    shell.cp('-r', TEMPLATE_SRC_PATH + '.babelrc', '.');
    shell.cp('-r', TEMPLATE_SRC_PATH + '.gitignore', '.');

    // 写入与`cmptName`关联的需替换的模板文件
    var data = {
        cmptName: cmptName,
        cmptTagName: util.camel2kebab(cmptName) 
    };

    writeFiles(SRCTPL_SRC_PATH, 'src', data, cmptName);
    writeFiles(PREVIEWTPL_SRC_PATH, 'preview', data);

    // 组件名写入配置文件
    var packageContent = compile('package.json', {
        cmptName: cmptName
    });

    fs.writeFileSync('package.json', packageContent);

    shell.cd('..');

    process.send({
        progress: 1
    });
}

function main() {
    
    process.on('message', function (data) {
        run(data.cmptName);
    });  

}

module.exports = main();