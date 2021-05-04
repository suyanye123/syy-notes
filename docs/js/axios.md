# Axios

### 1.根据环境变量区分接口地址

不同的环境变量使用不同的接口前缀,开发环境、测试环境和生产环境

```
switch (process.env.NODE_ENV) {
    case "production": //生产环境
        axios.defaults.baseURL = "http://aka.cjzblog.top"
        break;
    case "test": //测试环境
        axios.defaults.baseURL = "http://192.168.10.12"
        break;
    default: //开发环境
        axios.defaults.baseURL = "http://192.168.10.12"
}
```



### 2.设置请求超时

```
/**
 * 设置超时时间和跨域是否允许携带凭证
 */
axios.defaults.timeout = 10000;
axios.defaults.withCredentials = true
```



### 3.设置请求头

其实这一步主要看后端想要啥样的数据,一般都是formdata,所以如下:

```
axios.defaults.headers['Content-Type'] = 'application/x-www-form-url-urlencoded';
axios.defaults.transformRequest = data => qs.stringify(data) //数据转换  这个时候qs就是转化数据用的
```



### 4.设置请求拦截器

我们封装这里的时候可以借鉴一下官方文档的例子,大致流程就是 客户端发起请求-->[请求拦截器]-->服务器

```
axios.interceptors.request.use(config => {
    //header头携带token
    let token = localStorage.getItem('token')
    token && (config.headers.Authorization = token)
    return config
}, error => {
    return Promise.reject(error)
});
```

这一步就是拿到存本地的token放到header头里传出去

这里说一下token，一般是在登录完成之后，将用户的token通过localStorage或者cookie存在本地，然后用户每次在进入页面的时候（即在main.js中），会首先从本地存储中读取token，如果token存在说明用户已经登陆过，则更新vuex中的token状态。
然后，在每次请求接口的时候，都会在请求的header中携带token，后台人员就可以根据你携带的token来判断你的登录是否过期，如果没有携带，则说明没有登录过。

这时候或许有些小伙伴会有疑问了，就是每个请求都携带token，那么要是一个页面不需要用户登录就可以访问的怎么办呢？其实，你前端的请求可以携带token，但是后台可以选择不接收啊！

如果要显得更规范一点可以在token前面加上"Bearer "



### 5.设置响应拦截器

这个跟请求拦截器差不多,只不过位置不同 服务端返回信息 ->[拦截的同意处理]->客户端js获取到信息

```
axios.interceptors.request.use(response => {
    return response.data //js直接取响应主体内容
}, error => {
    let { response } = error
    if (response) {
        //=>服务器有响应
        switch (response.status) {
            case 401: //泛指权限 用户需要登陆(一般未登录)
                break;
            case 403: //泛指token过期  服务器拒绝执行
                break;
            case 404: //找不到页面
                break;
        }
    } else {
        //=>服务器没有结果返回,判断问题
        if (!window.navigator.onLine) {
            //断网处理:可以跳转到跳转到断网页面
            return
        }
        return Promise.reject(error);
    }
});
```

在这些错误处理中,需要用什么提示或者处理还得看项目需求,如果需要用elementUI的错误提示,直接引入vue,这样就OK了,做到了全局错误处理,断网处理

```
Vue.prototype.$message.error({
            type: "error",
            message: response.data.message
        })
```

