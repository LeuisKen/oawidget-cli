#!/usr/bin/env node

var program = require('commander');

program
    .version('1.0.0')
    .option('-c, --create <component-name>', '创建项目脚手架')
    .option('-v, --view', '组件效果预览')
    .option('-t, --test', '组件规范检查')
    .option('-b, --build', '组件打包构建')
    .option('-p, --publish', '组件发布上线')
    .parse(process.argv);
