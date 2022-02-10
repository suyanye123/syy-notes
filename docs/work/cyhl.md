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



跨域共享localStorage

```
window.addEventListener('message',)
```





#### 2.[v-if和:visible.sync的使用技巧](https://www.cnblogs.com/Leo-Do/p/13571368.html)

遇到点击按钮显示弹窗，输入部分数据后退出弹窗初始化弹窗信息的要求。

如果通过父子组件传数据的方式来实现就太麻烦了，可以通过结合v-if和:visible.sync的方式来实现：

其中，v-if控制元素的存在与否，:visible.sync控制el-dialog的显示，当我们退出弹窗时会销毁子组件的变量，实现子组件初始化，下次进入就不会携带上次输入的信息了。



#### 3.el-dialog被遮罩层挡住

1、在el-dialog标签中设置 :modal-append-to-body="false"，使遮罩层插入至 Dialog 的父元素上。

2、给position:fixed的父元素设置一个z-index，并且要比遮盖层的大。

3、el-dialog父元素不使用fixed定位。


