# [How]运营活动组件开发

## 准备工作

```
// 安装CLI工具
npm i -g oawidget-cli
// 查看CLI工具帮助
oawidget-cli -h

Usage: oawidget [options]
基于san(MVVM framework)的组件库cli工具
Options:
-V, --version                   output the version number
-c, --create <component-name>   创建项目脚手架
-v, --view <component-name>     组件效果预览
-t, --test <component-name>     组件规范检查
-b, --build <component-name>    组件打包构建
-p, --publish <component-name>  组件发布上线
-h, --help                      output usage information
```

### 创建项目脚手架

```
// 组件名命名规范 [YourName]/[common/which activity][cmptName], 如下例
oawidget-cli -c zxuanjian/CommonButton
```

脚手架目录结构

```
-- build
|
-- mock  // 本地mock时，在文件夹下添加mock js文件，若引入APIM，则rm该功能
|
-- node_modules
|
-- preview // 自动完成配置注入和组件引入，不用写preview代码，一键调试
|
-- src // 组件源码文件在这里编写
|    |
|    -- ZhangXJCommonButton
|         |
|          -- ZhangXJCommonButton.js // 组件js源码，需开发者编写
|          |
|          -- ZhangXJCommonButton.editor.js // 对运营活动配置平台暴露的可编辑属性，需开发者编写
|          |
|          -- index.js // 组件入口文件，自动生成
|          |
|          -- index.styl // 组件样式文件，需开发者编写
|          |
|          -- xx.png|jpeg|jpg|webp //若小图（80K以下），可添加至这里；大图，一定作为配置项，到运营活动配置平台自行上传
|
-- test
|
-- .babelrc
|
-- .gitignore
|
__ package.json
|
-- README.md
```

### 介入开发

```
// cd [YourName]/[common/whichactivity], 如下例
cd zxuanjian/CommonButton
// 如果你在用sublime
subl ./
```

请确保在coding前，你已经对你要开发的组件有了完整的设计思路，这样，你就可以写 `[YourName]/[common/whichactivity].eidtor.js`了，配置文件里设置暴露给平台供用户配置的属性

支持用户配置的数据类型：

- type: 'number', unit: 'px'
- type: 'text', unit: '' // input type=text
- type: 'color', unit: ''
- type: 'image', unit: ''
- type: 'action', unit: '' // 事件
- type: 'select', unit: '' // 列表
- type: 'time', unit: ''
- type: 'radio', unit: '' // 单选框
- type: 'checkbox', unit: '' // 多选框
- type: 'textarea', unit: '' // 多行文本框
- type: 'array', unit: '' // 数组

运营活动组件平台化的设计中，抽离了组件的运行时，以确保构成页面/活动的组件在平台化提供的统一san环境下运行。所以在组件开发环境下，开发者需要写的是 `plain Object`， 运行时会完成自动包装，成为真正的`San Component`。

目前样式的Scope隔离通过`namespace`方式实现， 组件最外层元素的 Class 与组件名相同。

### 开发调试

```
oawidget-cli -v zxuanjian/CommonButton
```

自动完成配置注入和组件引入，打开一个浏览器窗口，供开发者开发调试。


### 测试配置文件有效性

完成组件开发，准备提交到平台仓库前，执行检查命令，测试下配置文件的有效性吧！

```
oawidget-cli -t zxuanjian/CommonButton
```

### 打包构建

配置文件有效性已测试通过，马上就要大功告成了，记得执行构建命令，打包编译你的开发成果.

```
oawidget-cli -b zxuanjian/CommonButton
```

### 上传组件到平台组件中心

执行这个命令，你的组件就进入了平台组件中心。

```
oawidget-cli -p zxuanjian/CommonButton
```
