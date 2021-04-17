# 前端小札 2.0（重构中）

## 前言

### [VitePress](https://github.com/vuejs/vitepress)：Vite & Vue 驱动的静态网站生成器
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

## 搭建

### 定制化

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