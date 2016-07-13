## About this repo

`personal-resume` 是一个简历生成器，从json中读取数据，可部署到`github pages`
在线浏览，也可生成pdf格式简历。 http://wlyu.cn.com/personal-resume/

 - 简历数据存放在`resume.json`文件中
 - 简历中的代码可高亮

## 环境安装

an'zhaung安装Node
Node.js：https://nodejs.org/en/，

安装gulp和bowerode（quan'ju全局an'zhuang）：

```js
$ npm install --g gulp
$ npm install -g bower
```

## Build

 1.执行 `npm install` 安装依赖

 2.执行 `bower install`安装所需库

 3.填写你的个人信息于`resume.json`文件

 4.执行 `gulp dev`来构建项目

## 生成PDF文件

请使用chrome或者Safari浏览器来打印。

或者点击下方的`print it`打印

 Copyright (c) 2016 WLinYu
