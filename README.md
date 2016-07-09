##简介：
`resume-master` 是一个简历生成器，从json中读取数据，可部署到`github pages` 在线浏览，也可生成pdf格式简历。[http://wlyu.cn.com/personal-resume/](http://wlyu.cn.com/personal-resume/)

 - 简历数据存放在`resume.json`文件中


## 环境安装

安装Node
Node.js：https://nodejs.org/en/，

然后在终端输入如下命令安装gulp和bower（全局安装）：

```js
$ npm install --global gulp
$ npm install -g bower
```

## Build

 1.执行 `npm install` 安装依赖

 2.执行 `bower install`安装所需库

 3.填写你的个人信息于`resume.json`文件

 4.执行 `gulp dev`来构建项目
