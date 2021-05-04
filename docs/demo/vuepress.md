# 前端小札

## 前言

VuePress是尤大为了支持 Vue 及其子项目的文档需求而写的一个项目，VuePress界面十分简洁，并且**非常容易上手，一个小时就可以将项目架构搭好**。

现在已经有很多这种类型的文档，如果你有写技术文档的项目的话，VuePress绝对可以成为你的备选项之一。

### VuePress特性：

- 为技术文档而优化的 内置 Markdown 拓展
- 在 Markdown 文件中使用 Vue 组件的能力
- Vue 驱动的自定义主题系统
- 自动生成 Service Worker
- Google Analytics 集成
- 基于 Git 的 “最后更新时间”
- 多语言支持
- 默认主题包含：

建议先看一下[官方文档](https://vuepress.vuejs.org/zh/guide/)

## 搭建

### 全局安装VuePress

```bash
yarn global add vuepress # 或者 npm install -g vuepress
```

### 在project的根目录下新建docs文件夹：

这个文档将作为项目文档的根目录来使用：

```bash
mkdir docs
```

### 在docs文件夹下创建`.vuepress`文件夹：

```bash
mkdir .vuepress
```

所有 VuePress 相关的文件都将会被放在这里

### 在`.vuepress`文件夹下面创建`config.js`:

```bash
touch config.js
```

config.js是VuePress必要的配置文件，它导出一个javascript对象。

### 在`.vuepress`文件夹下面创建public文件夹:

```bash
mkdir public
```

这个文件夹是用来放置静态资源的，打包出来之后会放在.vuepress/dist/的根目录。

### 首页(像VuePress文档主页一样)

在docs文件夹下面创建一个`README.md`：

默认的主题提供了一个首页，像下面一样设置`home:true`即可，可以把下面的设置放入`README.md`中，待会儿你将会看到跟`VuePress`一样的主页。

```markdown
---
home: true
heroImage: /logo.jpg
actionText: 快速上手 →
actionLink: /zh/guide/
features:
- title: 简洁至上
  details: 以 Markdown 为中心的项目结构，以最少的配置帮助你专注于写作。
- title: Vue驱动
  details: 享受 Vue + webpack 的开发体验，在 Markdown 中使用 Vue 组件，同时可以使用 Vue 来开发自定义主题。
- title: 高性能
  details: VuePress 为每个页面预渲染生成静态的 HTML，同时在页面被加载的时候，将作为 SPA 运行。
footer: MIT Licensed | Copyright © 2018-present Evan You
---
```

ps：你需要放一张图片到public文件夹中。

### 我们的项目结构已经搭好了：

```json
project
├─── docs
│   ├── README.md
│   └── .vuepress
│       ├── public
│       └── config.js
└── package.json
```

### 在 `package.json` 里添加两个启动命令:

```json
{
  "scripts": {
    "docs:dev": "vuepress dev docs",
    "docs:build": "vuepress build docs"
  }
}
```

### 启动你的VuePress：

默认是`localhost:8080`端口。

```bash
yarn docs:dev # 或者 npm run docs:dev
```

### 构建

build生成静态的HTML文件,默认会在 `.vuepress/dist` 文件夹下

```bash
yarn docs:build # 或者 npm run docs:build
```

## 基本配置

最标准的当然是[官方文档](https://vuepress.vuejs.org/zh/default-theme-config/),可以自己的需求来配置`config.js`。

可以参考一下我的`config.js`的配置：

```js
module.exports = {
  title: '网站标题',
  description: '网站描述',
  // 注入到当前页面的 HTML <head> 中的标签
  head: [
    ['link', { rel: 'icon', href: '/favicon.ico' }], // 增加一个自定义的 favicon(网页标签的图标)
  ],
  base: '/web_accumulate/', // 这是部署到github相关的配置 下面会讲
  markdown: {
    lineNumbers: true // 代码块显示行号
  },
  themeConfig: {
    sidebarDepth: 2, // e'b将同时提取markdown中h2 和 h3 标题，显示在侧边栏上。
    lastUpdated: 'Last Updated' // 文档更新时间：每个文件git最后提交的时间
  }
};
```

### 导航栏配置：

```js
module.exports = {
  themeConfig: {
    nav:[
      { text: '前端算法', link: '/algorithm/' }, // 内部链接 以docs为根目录
      { text: '博客', link: 'http://obkoro1.com/' }, // 外部链接
      // 下拉列表
      {
        text: 'GitHub',
        items: [
          { text: 'GitHub地址', link: 'https://github.com/OBKoro1' },
          {
            text: '算法仓库',
            link: 'https://github.com/OBKoro1/Brush_algorithm'
          }
        ]
      }        
    ]
  }
}
```

### 侧边栏配置：

侧边栏的配置相对麻烦点，我里面都做了详细的注释，仔细看，自己鼓捣鼓捣 就知道怎么搞了。

```js
module.exports = {
  themeConfig: {
      sidebar:{
        // docs文件夹下面的accumulate文件夹 文档中md文件 书写的位置(命名随意)
        '/accumulate/': [
            '/accumulate/', // accumulate文件夹的README.md 不是下拉框形式
            {
              title: '侧边栏下拉框的标题1',
              children: [
                '/accumulate/JS/test', // 以docs为根目录来查找文件 
                // 上面地址查找的是：docs>accumulate>JS>test.md 文件
                // 自动加.md 每个子选项的标题 是该md文件中的第一个h1/h2/h3标题
              ]
            }
          ],
          // docs文件夹下面的algorithm文件夹 这是第二组侧边栏 跟第一组侧边栏没关系
          '/algorithm/': [
            '/algorithm/', 
            {
              title: '第二组侧边栏下拉框的标题1',
              children: [
                '/algorithm/simple/test' 
              ]
            }
          ]
```

## 发布到github上

### 在 `docs/.vuepress/config.js` 中设置正确的 base:

如果你打算发布到 `https://<USERNAME>.github.io/`，则可以省略这一步，因为 base 默认即是 `"/"`。

如果你打算发布到 `https://<USERNAME>.github.io/<REPO>/`（也就是说你的仓库在 `https://github.com/<USERNAME>/<REPO>`），则将 base 设置为 `"/<REPO>/"`。

```js
module.exports = {
  base: '/test/', // 比如你的仓库是test
}
```

### 创建脚步文件

在`project`的根目录下，创建一个`deploy.sh`文件：

```sh
#!/usr/bin/env sh

# 确保脚本抛出遇到的错误
set -e

# 生成静态文件
npm run docs:build

# 进入生成的文件夹
cd docs/.vuepress/dist

# 如果是发布到自定义域名
# echo 'www.example.com' > CNAME

git init
git add -A
git commit -m 'deploy'

# 如果发布到 https://<USERNAME>.github.io  USERNAME=你的用户名 
# git push -f git@github.com:<USERNAME>/<USERNAME>.github.io.git master

# 如果发布到 https://<USERNAME>.github.io/<REPO>  REPO=github上的项目
# git push -f git@github.com:<USERNAME>/<REPO>.git master:gh-pages

cd -
```

### 设置package.json

```js
"scripts": {
"d": "bash deploy.sh"
  },
```

### 部署：

然后你每次可以运行下面的命令行，来把最新更改推到`github`上：

```bash
    npm run d
```

如果你对运行项目和构建项目的命令行觉得很烦，你也可以像我这么做：

```js
"scripts": {
    "dev": "vuepress dev docs", // 本地运行项目 npm run dev
    "build": "vuepress build docs", // 构建项目 nom run build
    "d": "bash deploy.sh" // 部署项目 npm run d
  },
```



##### <br>##以上教程转载、整理自网上其他平台##

##### 



------

## 重点补充

我用到的插件及部分配置与网上有一些不同，请参考下面教程及我的项目源码：

#### 自动化部署：

\- [GitHub Actions 入门教程 ]( http://www.ruanyifeng.com/blog/2019/09/getting-started-with-github-actions.html) 
<br>阮一峰老师写的教程，设置workflow文件，用于源码推送后，自动deploy部署发布到服务器

需要注意的是，如果部署到码云，是没有Action自动部署的，除非花钱开通 Gitee Pages Pro，这时候需要自己手动打包将dist文件上传，或者 [ 其他方法 ](https://blog.csdn.net/ylb0109/article/details/106346061)



#### 评论系统：

\- [ gitalk ](https://github.com/gitalk/gitalk/blob/master/readme-cn.md) 
<br>一个基于 GitHub Issue 和 Preact 开发的评论插件，简单易用快捷
<br>需要选择一个公共github存储库（已存在或创建一个新的github存储库）用于存储评论
<br>然后需要创建 GitHub Application，如果没有 [点击这里申请](https://github.com/settings/applications/new)



\- [ utteranc ](https://utteranc.es/) 
<br>由于 gitalk 存在一些痛点，比如每新发布一篇文章居然要手动去初始化 Gitalk 评论<br>还有一个公认度比较高的三方评论插件，即 utteranc [ 教程参考 ](https://www.lshell.com/post/use-github-action-and-python-to-automatically-initialize-gitalk-comments/)



#### 自动发布：

\- [ gh-pages ](https://github.com/tschaub/gh-pages) 
<br>当push到master远程主分支后，自动发布到gh-pages分支，如果没有则创建该分支

需要注意的是，如果部署到码云，这里是不能自动实现的



#### 自动维护：

\- [ Dependabot ](https://github.com/dependabot) 
<br>自动检查项目依赖项是否有更新版本，然后pr提交的机器人<br>
<br>[参考教程](https://www.jianshu.com/p/9ac44e72a04e)





##  前端小札2.0(重构中)

基于[ vitePress ](https://github.com/vuejs/vitepress)——vuePress升级版，Vite & Vue 驱动的静态网站生成器，整体重构静态博客

建议参考[官方文档](https://vitepress.vuejs.org/)

### VitePress新特性：

**1. 使用Vue 3** 

**2. 在后台使用vite**

- 开发服务器启动更快
- 更快的热更新
- 更快的构建（内部使用汇总）

**3. 页面更轻**

- 不为每个请求的每个页面发送元数据。这将使页面权重与页面总数解耦。只发送当前页面的元数据。客户端导航会将新页面的组件和元数据一起获取。
- Vue 3 tree-shaking + Rollup 代码分割。
- 不使用vue-router，因为VitePress的需求是非常简单和具体的--使用一个简单的自定义路由器（200LOC以下）来代替。
- (WIP) i18n locale数据也要按需获取。

### 其他的区别

更多固定内容，可配置性更低。VitePress的目标是缩减当前VuePress的复杂性，并从极简主义的根源上重新出发。 面向未来：VitePress只针对支持原生ES模块导入的浏览器。它鼓励使用原生JavaScript和CSS变量进行主题设计。

### 搭建

#### 定制化

可以通过.vitepress/config.js进行配置（见src/config.ts）。 您可以通过添加以下文件来开发您的自定义主题。

##### Layout.vue文件

```vue
<template>
  <h1>Custom Layout!</h1>
  <Content/><!-- make sure to include markdown outlet -->
</template>
```

##### index.js文件

```js
import Layout from './Layout.vue'

export default {
  Layout,
  NotFound: () => 'custom 404', // <- this is a Vue 3 functional component
  enhanceApp({ app, router, siteData }) {
    // app is the Vue 3 app instance from createApp()
    // router is VitePress' custom router (see `lib/app/router.js`)
    // siteData is a ref of current site-level metadata.
  }
}
```

与VuePress不同，在一个主题中唯一有固定位置的文件是index.js

其他的东西都是在那里导入和导出，就像在一个普通的应用程序中一样。