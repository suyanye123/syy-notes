(window.webpackJsonp=window.webpackJsonp||[]).push([[26],{397:function(e,t,a){"use strict";a.r(t);var s=a(28),r=Object(s.a)({},(function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("ContentSlotsDistributor",{attrs:{"slot-key":e.$parent.slotKey}},[a("h1",{attrs:{id:"axios"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#axios"}},[e._v("#")]),e._v(" Axios")]),e._v(" "),a("h3",{attrs:{id:"_1-根据环境变量区分接口地址"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_1-根据环境变量区分接口地址"}},[e._v("#")]),e._v(" 1.根据环境变量区分接口地址")]),e._v(" "),a("p",[e._v("不同的环境变量使用不同的接口前缀,开发环境、测试环境和生产环境")]),e._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[e._v('switch (process.env.NODE_ENV) {\n    case "production": //生产环境\n        axios.defaults.baseURL = "http://aka.cjzblog.top"\n        break;\n    case "test": //测试环境\n        axios.defaults.baseURL = "http://192.168.10.12"\n        break;\n    default: //开发环境\n        axios.defaults.baseURL = "http://192.168.10.12"\n}\n')])])]),a("h3",{attrs:{id:"_2-设置请求超时"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_2-设置请求超时"}},[e._v("#")]),e._v(" 2.设置请求超时")]),e._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[e._v("/**\n * 设置超时时间和跨域是否允许携带凭证\n */\naxios.defaults.timeout = 10000;\naxios.defaults.withCredentials = true\n")])])]),a("h3",{attrs:{id:"_3-设置请求头"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_3-设置请求头"}},[e._v("#")]),e._v(" 3.设置请求头")]),e._v(" "),a("p",[e._v("其实这一步主要看后端想要啥样的数据,一般都是formdata,所以如下:")]),e._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[e._v("axios.defaults.headers['Content-Type'] = 'application/x-www-form-url-urlencoded';\naxios.defaults.transformRequest = data => qs.stringify(data) //数据转换  这个时候qs就是转化数据用的\n")])])]),a("h3",{attrs:{id:"_4-设置请求拦截器"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_4-设置请求拦截器"}},[e._v("#")]),e._v(" 4.设置请求拦截器")]),e._v(" "),a("p",[e._v("我们封装这里的时候可以借鉴一下官方文档的例子,大致流程就是 客户端发起请求--\x3e[请求拦截器]--\x3e服务器")]),e._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[e._v("axios.interceptors.request.use(config => {\n    //header头携带token\n    let token = localStorage.getItem('token')\n    token && (config.headers.Authorization = token)\n    return config\n}, error => {\n    return Promise.reject(error)\n});\n")])])]),a("p",[e._v("这一步就是拿到存本地的token放到header头里传出去")]),e._v(" "),a("p",[e._v("这里说一下token，一般是在登录完成之后，将用户的token通过localStorage或者cookie存在本地，然后用户每次在进入页面的时候（即在main.js中），会首先从本地存储中读取token，如果token存在说明用户已经登陆过，则更新vuex中的token状态。\n然后，在每次请求接口的时候，都会在请求的header中携带token，后台人员就可以根据你携带的token来判断你的登录是否过期，如果没有携带，则说明没有登录过。")]),e._v(" "),a("p",[e._v("这时候或许有些小伙伴会有疑问了，就是每个请求都携带token，那么要是一个页面不需要用户登录就可以访问的怎么办呢？其实，你前端的请求可以携带token，但是后台可以选择不接收啊！")]),e._v(" "),a("p",[e._v('如果要显得更规范一点可以在token前面加上"Bearer "')]),e._v(" "),a("h3",{attrs:{id:"_5-设置响应拦截器"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_5-设置响应拦截器"}},[e._v("#")]),e._v(" 5.设置响应拦截器")]),e._v(" "),a("p",[e._v("这个跟请求拦截器差不多,只不过位置不同 服务端返回信息 ->[拦截的同意处理]->客户端js获取到信息")]),e._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[e._v("axios.interceptors.request.use(response => {\n    return response.data //js直接取响应主体内容\n}, error => {\n    let { response } = error\n    if (response) {\n        //=>服务器有响应\n        switch (response.status) {\n            case 401: //泛指权限 用户需要登陆(一般未登录)\n                break;\n            case 403: //泛指token过期  服务器拒绝执行\n                break;\n            case 404: //找不到页面\n                break;\n        }\n    } else {\n        //=>服务器没有结果返回,判断问题\n        if (!window.navigator.onLine) {\n            //断网处理:可以跳转到跳转到断网页面\n            return\n        }\n        return Promise.reject(error);\n    }\n});\n")])])]),a("p",[e._v("在这些错误处理中,需要用什么提示或者处理还得看项目需求,如果需要用elementUI的错误提示,直接引入vue,这样就OK了,做到了全局错误处理,断网处理")]),e._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[e._v('Vue.prototype.$message.error({\n            type: "error",\n            message: response.data.message\n        })\n')])])])])}),[],!1,null,null,null);t.default=r.exports}}]);