# 关于request封装

请求数据这部分，贯穿着整个前端生涯，

微信小程序的 javascript运行环境和浏览器不同，页面的脚本逻辑是在`JsCore`中运行，

`JsCore`是一个没有窗口对象的环境，所以不能在脚本中使用`window`，也无法在脚本中操作组件，

JsCore中也没有 XmlhttpRequest对象，所以jquery 、zepto、axios这些在小程序中都不能用，

而此时，正是 fly 大显身手的时候。



最近想通过Mock.js ，劫持ajax请求，达到实现拟数据模拟后端接口的效果

查了一下网上的资料，大多都是通过引入 axios 或 fly.js 这种第三方请求插件的请求拦截器实现的

