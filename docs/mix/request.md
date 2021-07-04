# 关于request封装

请求数据这部分，贯穿着整个前端生涯，在小程序中使用请求，只能使用原生的wx.request，

这是因为微信小程序的js运行环境和浏览器不同，页面的脚本逻辑是在`JsCore`中运行，

`JsCore`是一个没有窗口对象的环境，所以不能在脚本中使用`window`，也无法在脚本中操作组件，

JsCore中也没有 XmlhttpRequest对象，所以jquery 、zepto、axios这些在小程序中都不能用，

也不是不能用，只是需要修改 adapter适配器

## 1.uniapp之小程序开发中引入axios

1、下载依赖

```bash
 npm install axios --save
```

2、创建一个js工具类

![img](https://img-blog.csdnimg.cn/20201224135635445.png)

```js
import Vue from 'vue'
import axios from 'axios'

// create an axios instance
const service = axios.create({
	baseURL: 'http://localhost:9004', // url = base url + request url
	//withCredentials: true, // send cookies when cross-domain requests 注意：withCredentials和后端配置的cross跨域不可同时使用
	timeout: 6000, // request timeout
	crossDomain: true
})

// request拦截器,在请求之前做一些处理
service.interceptors.request.use(config => {
		//添加请求头
		config.headers["accessToken"] = "123";
		console.log('请求拦截成功')
		return config;
	},
	error => {
		console.log(error); // for debug
		return Promise.reject(error);
	}
);

//配置成功后的拦截器
service.interceptors.response.use(res => {
	if (res.data.status == 200) {
		return res.data
	} else {
		return Promise.reject(res.data.msg);
	}
}, error => {
	if (error.response.status) {
		switch (error.response.status) {
			case 401:
				break;
			default:
				break;
		}
	}
	return Promise.reject(error)
})
```

// 在main.js中放入这段自定义适配器的代码，

就可以实现uniapp的app和小程序开发中能使用axios进行跨域网络请求，并支持携带cookie

```js
axios.defaults.adapter = function(config) {
	return new Promise((resolve, reject) => {
		console.log(config)
		var settle = require('axios/lib/core/settle');
		var buildURL = require('axios/lib/helpers/buildURL');
		uni.request({
			method: config.method.toUpperCase(),
			url: config.baseURL + buildURL(config.url, config.params, config.paramsSerializer),
			header: config.headers,
			data: config.data,
			dataType: config.dataType,
			responseType: config.responseType,
			sslVerify: config.sslVerify,
			complete: function complete(response) {
				console.log("执行完成：", response)
				response = {
					data: response.data,
					status: response.statusCode,
					errMsg: response.errMsg,
					header: response.header,
					config: config
				};
				settle(resolve, reject, response);
			}
		})
	})
}
export default service
```
3、修改main.js配置文件，添加如下代码

```js
import axios from 'static/utils/https.js';
Vue.prototype.$axios = axios;
```

4、使用

```js
this.$axios({
	methods:'get',
	url:'/xxx',
	params:queryParam
}).then(res =>{
	console.log(res)
}).catch(err =>{
	console.log(err)
})
```

5、在测试环境下，小程序请求后端本地接口，需修改如下配置

![img](https://img-blog.csdnimg.cn/20201224135932674.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzM5NjQ4MDI5,size_16,color_FFFFFF,t_70)

## 2.使用自定义插件

































## 3.更多选择

- 使用flyio，但是看了一下这个库没有怎么更新维护，就没有使用了



