# Egg

> [官网入口](https://eggjs.org/zh-cn/intro/quickstart.html)



## 1.基础

### 特性

- 提供基于 Egg [定制上层框架](https://eggjs.org/zh-cn/advanced/framework.html)的能力
- 高度可扩展的[插件机制](https://eggjs.org/zh-cn/basics/plugin.html)
- 内置[多进程管理](https://eggjs.org/zh-cn/advanced/cluster-client.html)
- 基于 [Koa](http://koajs.com/) 开发，性能优异
- 框架稳定，测试覆盖率高
- [渐进式开发](https://eggjs.org/zh-cn/tutorials/progressive.html)



### 安装

```bash
npm init egg --type=simple
```

```bash
npm init egg --type=simple		#简版
npm init egg 		#自选模式
```

这里我们选择第一个 简版



### 扩展

框架提供了一种快速扩展的方式，只需在 `app/extend` 目录下提供扩展脚本即可，具体参见[扩展](https://www.eggjs.org/zh-CN/basics/extend)。

```bash
$ npm i moment --save
```

新建helper.js文件

```js
// app/extend/helper.js
const moment = require('moment');
exports.relativeTime = (time) => moment(new Date(time * 1000)).fromNow();
```





### Middleware

