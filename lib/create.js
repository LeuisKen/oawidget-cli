/**
 * @file create a Scaffold
 * @author X-Jray(z.xuanjian@gmail.com)
*/

var shell = require('shelljs');
var path = require('path');
var etpl = require('etpl');
var fs = require('fs');
var chalk = require('chalk');
var ProgressBar = require('progress');

var util = require('./util');

var tplEngine = new etpl.Engine({
    variableOpen: '${',
    variableClose: '}',
    encoding: 'UTF-8'
});

var TEMPLATE_SRC_PATH = path.join(__dirname, '/template/');
var SRCTPL_SRC_PATH = path.join(__dirname, '/srcTpl/');
var PREVIEWTPL_SRC_PATH = path.join(__dirname, '/previewTpl/');

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
    cmptName && (cmptName = cmptName.slice(cmptName.lastIndexOf('/') + 1, cmptName.length));
    files.forEach(function (item) {
        var templatePath = path.join(dirSrcPath, item);
        var fileContent = compile(templatePath, data);
        if (cmptName) {
            console.log('1234' + cmptName);
            shell.mkdir('-p', 'src/' + cmptName);
            oriTarDirPath = dirTarPath;
            dirTarPath = dirTarPath + '/' + cmptName;
            item = item.replace('demo', cmptName);
        }
        var targetPath = path.join(dirTarPath, item);
        console.log(chalk.blue('正在写入...' + targetPath));
        fs.writeFileSync(targetPath, fileContent);
        cmptName && (dirTarPath = oriTarDirPath);
    });
}

function main(cmptName) {
    var nameList = cmptName.split('/');
    // user/cmpt
    if (nameList.length - 1) {
        cmptName = nameList.pop();
        shell.mkdir('-p', nameList.join('/'));
        shell.cd(nameList.join('/'));
    }

    var isExist = fs.existsSync(cmptName);
    if (isExist) {
        console.log(chalk.red(cmptName + ' 组件目录已存在!'));
        process.exit(0);
    }

    console.log(chalk.blue(cmptName + ' 组件目录准备创建...'));

    /* 创建组件开发脚手架 */
    shell.mkdir('-p', cmptName);
    shell.cd(cmptName);

    console.log(chalk.blue('正在写入脚手架文件...'));
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

    // shell.cd('..');
    console.log(chalk.green(cmptName + ' 组件开发脚手架创建完成!'));

    process.exit(0);

}

module.exports = main;
