# cyml

### 目录结构

```
cyhl
|	node_modules			// 依赖包
│   public                  // 静态文件
└───static
|	|	js
|	|	└───jquery.min.js	// jquery生产版本包
|	favicon.ico				// 图标
|	index.html				// 打包后渲染页面
|	src                     // 业务逻辑代码
│   └───api                 // http api 层
|	|	assets				// wx-js-sdk等
│   |   components          // 公共组件
|	|	font				// 字体
│   │   utils               // 工具库
|	|	views				// 页面布局
│   │   store               // vuex
|	|	router				// 路由
|	|	App.vue				// 根组件
│   │   main.js             // 入口文件
|	|	main.scss			// 全局样式
|	.env.dev				// 开发环境全局环境变量
|	.env.prod				// 生产环境全局环境变量
|	vue.config.js			// webpack配置
```



### 依赖

#### 









### 难点

#### 1.localstorage的跨域存储

HTML5 的 postMessage 为解决跨域页面通信提供了一套可控的机制，假设有 a.com 和 b.com 两个页面。我们想通过 a 页面去修改 b 页面的本地数据。 我们需要做如下步奏：

- 在 a 页面创建一个 iframe ，嵌入 b 页面
- a 页面通过 postMessage 传递指定格式的消息给 b 页面
- b 页面解析 a 页面传递过来的消息内容，调用localStorage API 操作本地数据
- b 页面包装 localStorage 的操作结果，并通过 postMessage 传递给 a 页面
- a 页面解析 b 页面传递回来的消息内容，得到 localStorage 的操作结果

![img](https://images0.cnblogs.com/blog/546511/201503/011534167685799.png)