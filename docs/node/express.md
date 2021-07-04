# express学习记录

### express安装脚手架工具+淘宝镜像地址

npm install express-generator -g --registry=https://registry.npm.taobao.org

通过express生成项目

```
express express-test // 生成express-test 项目
```

安装包并运行

```
npm install --registry=https://registry.npm.taobao.org // 装包
npm start // 运行
```

之后会看到如下图片的项目目录，红色框是脚手架的创建的项目，整个目录是全栈的环境，若项目为前后端分离的情况，则忽略public和views目录即可

bin/www中端口是3000，浏览器访问localhost:300 

### 安装nodemon， cross-env

nodemon支持node热重启，cross-env配置全局环境变量

```
npm install nodemon cross-env --save
```

新增环境变量，用nodemon重新启动项目
在package.json中新增或更改dev属性

```
“scripts”: {
“start”: “node ./bin/www”,
“dev”: “cross-env NODE_ENV=dev nodemon ./bin/www.js”,
},
```

获取全局变量的api为`process.env.NODE_ENV`

重新启动项目`npm run dev`