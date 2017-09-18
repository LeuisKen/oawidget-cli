/**
 * @file create, create a Scaffold
 * @author X-Jray(z.xuanjian@gmail.com)
*/

var shell = require('shelljs');
var path = require('path');
var etpl = require('etpl');
var fs = require('fs');

var util = require('./util');

var tplEngine = new etpl.Engine({
    variableOpen: '${',
    variableClose: '}',
    encoding: 'UTF-8'
});

var TEMPLATE_DEST_PATH = path.join(__dirname, '/template/');
var SRCTPL_DEST_PATH = path.join(__dirname, '/srcTpl/');
var PREVIEWTPL_DEST_PATH = path.join(__dirname, '/previewTpl/');

function compile(compileFilePath, data) {
    var content = fs.readFileSync(compileFilePath, {
        encoding: 'utf8'
    });
    var render = tplEngine.compile(content);
    return render(data);
}

function writeFiles(dirDestPath, dirTargetPath, data, cmptName) {
    var files = fs.readdirSync(dirDestPath);
    var oriDirTargetPath = '';
    files.forEach(function (item) {
        var filePath = path.join(dirDestPath, item);
        var compileContent = compile(filePath, data);
        if (cmptName) {
            shell.mkdir('-p', 'src/' + cmptName);
            oriDirTargetPath = dirTargetPath;
            dirTargetPath = dirTargetPath + '/' + cmptName;
            item = item.replace('demo', cmptName);
        }
        var fileTargetPath = path.join(dirTargetPath, item);
        fs.writeFileSync(fileTargetPath, compileContent);
        dirTargetPath = oriDirTargetPath;
    });
}

function main(cmptName) {
    var data = {
        cmptName: cmptName,
        cmptTagName: util.cmptName2Tag(cmptName) 
    };

    shell.mkdir('-p', cmptName);
    shell.cd(cmptName);

    shell.cp('-R', TEMPLATE_DEST_PATH + '*', '.');
    shell.cp('-R', TEMPLATE_DEST_PATH + '.babelrc', '.');
    shell.cp('-R', TEMPLATE_DEST_PATH + '.gitignore', '.');
    writeFiles(SRCTPL_DEST_PATH, 'src', data, cmptName);
    writeFiles(PREVIEWTPL_DEST_PATH, 'preview', data);

    shell.cd('..');
}

module.exports = main;
