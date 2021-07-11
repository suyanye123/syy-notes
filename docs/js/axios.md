## AJAX——原生|JQuery|fetch|axios

**AJAX（Asynchronous JavaScript And XML）**

AJAX 就是异步的 JS 和 XML。它不是新的编程语言，而是一种将现有的标准组合在一起使用的新方式。

通过它可以在浏览器中向服务器发送异步请求，最大的优势：无刷新获取数据。

**XML（eXtensible Markup Language）**

XML 是可扩展标记语言。XML 和 HTML 类似，不同的是 HTML 中都是预定义标签，用来**呈现数据**；而 XML 中没有预定义标签，全是自定义标签，用来**传输和存储数据**。比如有一个学生数据：name = 'wy';age = 18;gender = '男'，用 XML 表示：

```
<student>
  <name>wy</name>
    <age>18</age>
    <gender>男</gender>
</student>
```

以前，AJAX 在进行数据交换时，服务器端返回给客户端的结果就是 XML 格式的字符串，然后前端接收到后对其进行解析，把数据提取出来。

然而，现在 XML 已经被 JSON 取代了。JSON 更加简洁灵活，而且在数据转换上更加容易，可以借助 JSON 的 一些 API 方法快速将 JSON 格式的字符串转换成 JS 对象。用 JSON 表示：

```
{
  "name": "wy",
  "age": 18,
  "gender": "男"
}
```

## AJAX 的特点

**优点**

1. 可以无需刷新页面与服务器端进行通信
2. 允许根据用户事件来更新部分页面内容

**缺点**

1. 没有浏览历史，不能回退
2. 存在跨域问题（同源）
3. SEO（Search Engine Optimization）搜索引擎优化不友好

## 一、原生 AJAX

### ajax 请求与一般 http 请求的区别

1. ajax 请求是一种特别的 http 请求
2. 在服务器端没有任何区别，但是在浏览器端有
3. 浏览器端发送请求：只有 XHR 或 fetch 发出的才是 ajax 请求，其他所有都是非 ajax 请求。
4. 浏览器端接收到响应
   1. 一般 http 请求：浏览器一般会直接显示响应体数据，也就是我们常说的刷新/跳转页面
   2. ajax 请求：浏览器不会对界面进行任何更新操作，只是调用监视的回调函数并传入响应相关数据

### API

1. XMLHttpRequest()：创建 XHR 对象的构造函数
2. status：响应状态码值，如 200、404
3. statusText：响应状态文本，如 ’ok‘、'not found'
4. readyState：标识请求状态的只读属性 0. 初始
   1. open() 之后
   2. send() 之后
   3. 请求中
   4. 请求完成（但不代表成功，还要判断 status 在 200~300 范围）
5. onreadystatechange：绑定 readyState 改变的监听
6. responseType：指定响应数据类型，如果是 'json'，得到响应后自动解析响应
7. response：响应体数据，类型取决于 responseType 的指定
8. timeout：指定请求超时时间，默认为 0 代表没有限制
9. ontimeout：绑定超时的监听
10. onerror：绑定请求网络错误的监听
11. open()：初始化一个请求，参数为：(method, url[, async])
12. send(data)：发送请求
13. abort()：中断请求
14. getResponseHeader(name)：获取指定名称的响应头值
15. getAllResponseHeaders()：获取所有响应头组成的字符串
16. setRequestHeader(name, value)：设置请求头

```
node.addEventListener('mouseover', () => {
  // 1.创建对象
  const xhr = new XMLHttpRequest()
  // 超时设置 2s
  xhr.timeout = 2000
  // 超时回调
  xhr.ontimeout = () => {
    alert('网络异常，请稍后重试！')
  }
  // 网络异常回调
  xhr.onerror = () => {
    alert('你的网络似乎出了一些问题！')
  }
  // 设置响应体数据的类型
  xhr.responseType = 'json'
  // 2.初始化
  xhr.open('POST', 'http://127.0.0.1:8000/server')
  // 设置请求头
  xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded') // Content-Type设置请求体类型
  xhr.setRequestHeader('name', 'wy') // 设置自定义的请求头
  // 3.发送(设置请求体)
  xhr.send('a=100&b=200&c=300')
  // 4.处理返回结果
  xhr.onreadystatechange = () => {
    if (xhr.readyState === 4) {
      if (xhr.status >= 200 && xhr.status < 300) {
        result.innerHTML = xhr.response
      }
    }
  }
})

// abort 取消请求
btns[1].onclick = function () {
  x.abort()
}
```

## 二、JQuery AJAX

```
// jQuery发送AJAX GET请求
$('button')
  .eq(0)
  .click(() => {
    /*
    第一个参数：url给谁发
    第二个参数：请求体对象
    第三个参数：回调（接收一个参数是响应体）
    第四个参数：响应体结果类型
  */
    $.get(
      'http://127.0.0.1:8000/jquery-server',
      {
        a: 100,
        b: 200,
      },
      data => {
        console.log(data)
      },
      'json'
    )
  })
// jQuery发送AJAX POST请求
$('button')
  .eq(1)
  .click(() => {
    $.post(
      'http://127.0.0.1:8000/jquery-server',
      {
        a: 100,
        b: 200,
      },
      data => {
        console.log(data)
      },
      'json'
    )
  })
// 通用型方法ajax
$('button')
  .eq(2)
  .click(() => {
    /*
    接收一个对象，里面有很多属性来设置请求参数
    url：给谁发
    data：请求体
    type：请求类型
    dataType：响应体结果类型
    success：成功的回调
    timeout：超时时间
    error：失败的回调
    headers：请求头信息
  */
    $.ajax({
      url: 'http://127.0.0.1:8000/jquery-server',
      data: {
        a: 100,
        b: 200,
      },
      type: 'GET',
      dataType: 'json',
      success(data) {
        console.log(data)
      },
      timeout: 2000,
      error() {
        console.log('出错啦！！')
      },
      headers: {
        c: 300, // 自定义的请求头
      },
    })
  })
```

## 三、fetch AJAX

### fetch 优点

1. 语法简单，更加语义化
2. 基于标准 Promise 实现，支持 async/await
3. 更加底层，提供丰富的 API（request、response）
4. 脱离了 XHR，是 ES 规范里新的实现方式

### fetch 缺点

**fetch 是一个底层的 API，可以把它考虑成原生的 XHR，所以使用起来并不是很舒服，需要进行封装**。

1. fetch 只对网络请求报错，会把 400、500 都当作成功的请求，只有网络错误导致这些请求不能完成时，fetch 才会被 reject
2. fetch 默认不会带 cookie，需要添加配置项：fetch(url, {credentials: 'include'})
3. fetch 默认不支持 abort，不支持超时控制，使用 setTimeout 及 Promise.reject 实现的超时控制并不能阻止请求过程继续在后台运行，造成了流量的浪费
4. fetch 没有办法原生监测请求的进度，而 XHR 可以

```
btn.onclick = function () {
  /*
    第一个参数：url
    第二个参数：可选，配置对象 {
      method
      headers
      body：请求体
    }
  */
  fetch('http://127.0.0.1:8000/fetch-server?vip=10', {
    method: 'POST',
    headers: {
      name: 'wy',
    },
    body: 'username=admin&password=123',
  })
    .then(res => {
      // return res.text() // 有text方法会返回promise包裹的响应体内容
      return res.json() // json格式被解析为对象
    })
    .then(data => {
      console.log(data)
    })
}
```

## 三、axios

### XHR 的 ajax 封装（简单版 axios）

```
function axios({ url, method = 'GET', params = {}, data = {} }) {
  // 返回一个promise对象
  return new Promise((resolve, reject) => {
    // 处理method（转大写）
    method = method.toUpperCase()
    // 处理query参数（拼接到url上）id=1&xxx=abc
    let queryString = ''
    Object.keys(params).forEach(key => {
      queryString += `${key}=${params[key]}&`
    })
    if (queryString) {
      // 去除最后一个多余的&
      queryString = queryString.substring(0, queryString.length - 1)
      // 接到url
      url += '?' + queryString
    }
    // 1. 执行异步ajax请求
    // 创建xhr对象
    const xhr = new XMLHttpRequest()
    // 打开连接（初始化请求，还没开始请求）
    xhr.open(method, url, true)
    // 发送请求
    if (method === 'GET' || method === 'DELETE') {
      xhr.send()
    } else if (method === 'POST' || method === 'PUT') {
      // 告诉服务器请求题的格式是json
      xhr.setRequestHeader('Content-Type', 'application/json;charset=utf-8')
      xhr.send(JSON.stringify(data)) // 发送json格式的请求体
    }
    // 绑定状态改变的监听
    xhr.onreadystatechange = function () {
      // 如果请求没有完成，直接结束
      if (xhr.readyState !== 4) {
        return
      }
      // 如果响应状态码在[200, 300)之间代表成功，否则失败
      const { status, statusText } = xhr
      // 2.1 如果请求成功了，调用resolve()
      if (status >= 200 && status < 300) {
        // 准备结果对象
        const response = {
          data: JSON.parse(xhr.response),
          status,
          statusText,
        }
        resolve(response)
      } else {
        reject(new Error(`request error status is ${status}`))
      }
    }
  })
}
```

### axios 的理解和使用

axios 是目前最流行的 ajax 请求库

#### 特点

axios 是基于 Promise，既可以用于浏览器又可以用于 nodejs 的 HTTP 客户端。本质上也是对原生 XHR 的封装，只不过它是 Promise 的实现版本，符合最新的 ES 规范，具有以下特征：

1. 基于 Promise 的异步 ajax 请求库
2. 在浏览器端可以发送 ajax 请求（创建 XMLHttpRequest），在 node 端可以发送 http 请求
3. 支持请求和响应拦截
4. 支持请求和响应数据转换（JSON <=> 对象）
5. 支持取消请求
6. 客户端支持防止 CSRF
7. 提供了一些并发请求的接口（方便了很多操作）

#### axios 常用语法

axios(config)：通用/最本质的发任意类型请求的方式

axios(url[, config])：可以只指定 url 发 get 请求

axios.get(url[, config])：发 get 请求

axios.delete(url[, config])：发 delete 请求

axios.post(url[, data, config])：发 post 请求

axios.put(url[, data, config])：发 put 请求

axios.defaults.xxx：请求的默认全局配置

axios.interceptors.request.use()：添加请求拦截器

axios.interceptors.response.use()：添加响应拦截器

axios.create([config])：创建一个新的 axios

axios.Cancel()：用于创建取消请求的错误对象

axios.CancelTolen()：用于创建取消请求的 token 对象

axios.isCancel()：是否是一个取消请求的错误

axios.all(promises)：用于批量执行多个异步请求

作为对象使用：axios.get()、axios.post()

作为函数使用：axios({...})

```
// 配置 baseURL
axios.defaults.baseURL = 'http://127.0.0.1:8000'
// GET
btns[0].onclick = () => {
  /*
    第一个参数：url
    第二个参数：其他配置config对象{
      params：url上加的请求行参数
      headers：请求头信息
    }
    与jQuery不同，jQuery是基于成功/失败回调函数，而axios会返回一个promise对象需要用.then()定义回调函数来处理结果
  */
  axios
    .get('/axios-server', {
      params: {
        id: 100,
        vip: 7,
      },
      headers: {
        name: 'wy',
        age: 18,
      },
    })
    .then(res => {
      console.log(res)
    })
}
// POST
btns[1].onclick = () => {
  /*
  post比get多了个请求体
    第二个参数：请求体对象
    第三个参数：其他配置config对象
  */
  axios
    .post(
      '/axios-server',
      {
        username: 'admin',
        password: '123',
      },
      {
        params: {
          id: 200,
          vip: 9,
        },
        headers: {
          height: 160,
          weight: 50,
        },
      }
    )
    .then(res => {
      console.log(res)
    })
}
// AJAX
btns[2].onclick = () => {
  /*
    url
    method：请求方法
    params：url参数
    headers：请求头
    data：请求体
  */
  axios({
    url: '/axios-server',
    method: 'POST',
    params: {
      vip: 10,
      level: 30,
    },
    headers: {
      a: 100,
      b: 200,
    },
    data: {
      username: 'admin',
      password: '123',
    },
  }).then(res => {
    console.log(res)
  })
}
```

#### 难点语法的理解和使用

##### axios.create(config)

1. 根据指定配置创建一个新的 axios，每个新的 axios 都有机子的一套配置
2. 新 axios 只是没有取消请求和批量发请求的方法，其他所有语法都是一致的
3. 为什么要设计这个语法？
   1. 需求：项目中有部分接口需要的配置与另一部分接口需要的配置不一样
   2. 解决：创建 2 个新 axios，每个都有自己特有的配置，分别应用到不同要求的接口请求中

```
axios.defaults.baseURL = 'http://localhost:3000'
axios({
  url: '/posts', // 请求3000
})
const instance = axios.create({
  baseURL: 'http://localhost:4000', // 设置4000作为基础URL
})
// 使用instance发请求
instance({
  url: '/xxx', // 请求4000
})
// 或者还可以
instance.get('/xxx')
```

##### 取消请求

基本流程：

 配置 cancelToken 对象

 缓存用于取消请求的 cancel 函数

 在后面特定时机调用 cancel 函数取消请求

 在错误回调中判断如果 error 是 cancel，做相应处理

实现功能：

 点击按钮，取消某个正在请求中的请求

 在请求一个接口前，取消前面一个未完成的请求

```
let cancel // 用于保存取消请求的函数
function getProducts() {
  // 在准备发请求前，取消未完成的请求
  if (typeof cancel === 'function') {
    cancel('取消请求')
  }
  axios({
    url: 'http://localhost:4000/products',
    cancelToken: new axios.CancelToken(c => {
      // c是内部用于取消请求的函数，可以保存起来传到外面使用
      cancel = c
    }),
  }).then(
    res => {
      cancel = null
      console.log('请求成功', res.data)
    },
    error => {
      // 因为是异步回调，所以要区别对待
      if (axios.isCancel(error)) {
        console.log('请求取消', error.message)
      } else {
        cancel = null
        console.log('请求出错', error.message)
      }
    }
  )
}

function cancelReq() {
  // 执行取消请求的函数
  if (typeof cancel === 'function') {
    cancel('强制取消请求')
  } else {
    console.log('没有可取消的请求')
  }
}
```

为了避免在每个 axios 请求和响应中都需要写重复的代码，可以将取消请求相关的代码放到拦截器中。

##### 拦截器

调用 axios() 并不是立即发送 ajax 请求，而是需要经历一个较长的流程：

后声明的请求拦截器 2 => 先声明的请求拦截器 1 => 发 ajax 请求 => 先声明的响应拦截器 1 => 后声明的响应拦截器 2 => 处理请求的回调

注意：此流程是通过 promise 串连起来的，请求拦截器传递的是 config，响应拦截器传递的是 response

```
let cancel // 用于保存取消请求的函数
const btns = document.querySelectorAll('button')
axios.defaults.baseURL = 'http://127.0.0.1:8000'
btns[0].onclick = get
btns[1].onclick = cancelReq

axios.interceptors.request.use(
  // 后添加的请求拦截器先执行
  config => {
    // 在准备发请求前，取消未完成的请求
    if (typeof cancel === 'function') {
      cancel('取消请求')
    }
    // 添加一个cancelToken配置
    config.cancelToken = new axios.CancelToken(c => {
      cancel = c
    })
    return config
  },
  error => {
    return Promise.reject(error)
  }
)
axios.interceptors.response.use(
  // 响应拦截器在处理响应的回调之前执行
  response => {
    cancel = null
    return response
  },
  error => {
    if (axios.isCancel(error)) {
      // 因为是异步回调，所以要区别对待
      console.log('请求取消', error.message)
      return new Promise(() => {}) // 中断请求
    } else {
      cancel = null
      return Promise.reject(error) // 将错误继续向下传递
    }
  }
)

function get() {
  axios({
    url: '/delay',
  }).then(
    res => {
      console.log('请求成功', res.data)
    },
    error => {
      // 只用处理请求出错的情况，不用处理取消请求的情况
      console.log('请求出错', error.message)
    }
  )
}

function cancelReq() {
  // 执行取消请求的函数
  if (typeof cancel === 'function') {
    cancel('强制取消请求')
  } else {
    console.log('没有可取消的请求')
  }
}
```

### axios 源码分析

#### 目录结构

```
├── /dist/                     # 项目输出目录
├── /lib/                      # 项目源码目录
│ ├── /adapters/               # 定义请求的适配器 xhr、http
│ │ ├── http.js                # 实现http适配器(包装http包)
│ │ └── xhr.js                 # 实现xhr适配器(包装xhr对象)
│ ├── /cancel/                 # 定义取消功能
│ ├── /core/                   # 一些核心功能
│ │ ├── Axios.js               # axios的核心主类
│ │ ├── dispatchRequest.js     # 用来调用http请求适配器方法发送请求的函数
│ │ ├── InterceptorManager.js  # 拦截器的管理器
│ │ └── settle.js              # 根据http响应状态，改变Promise的状态
│ ├── /helpers/                # 一些辅助方法
│ ├── axios.js                 # 对外暴露接口
│ ├── defaults.js              # axios的默认配置
│ └── utils.js                 # 公用工具
├── package.json               # 项目信息
├── index.d.ts                 # 配置TypeScript的声明文件
└── index.js                   # 入口文件├── /dist/                     # 项目输出目录
├── /lib/                      # 项目源码目录
│ ├── /adapters/               # 定义请求的适配器 xhr、http
│ │ ├── http.js                # 实现http适配器(包装http包)
│ │ └── xhr.js                 # 实现xhr适配器(包装xhr对象)
│ ├── /cancel/                 # 定义取消功能
│ ├── /core/                   # 一些核心功能
│ │ ├── Axios.js               # axios的核心主类
│ │ ├── dispatchRequest.js     # 用来调用http请求适配器方法发送请求的函数
│ │ ├── InterceptorManager.js  # 拦截器的管理器
│ │ └── settle.js              # 根据http响应状态，改变Promise的状态
│ ├── /helpers/                # 一些辅助方法
│ ├── axios.js                 # 对外暴露接口
│ ├── defaults.js              # axios的默认配置
│ └── utils.js                 # 公用工具
├── package.json               # 项目信息
├── index.d.ts                 # 配置TypeScript的声明文件
└── index.js                   # 入口文件
```

#### 1. axios 与 Axios 的关系

1. 从语法上来说：axios 不是 Axios 的实例
2. 从功能上来说：axios 是 Axios 的实例
3. axios 是 Axios.prototype.request 函数 bind() 返回的函数
4. axios 作为对象有 Axios 原型对象上的所有方法，有 Axios 对象上所有属性

#### 2. instance 与 axios 的区别

instance 和 axios 都是调用 createInstance() 返回的

相同：

1. 都是一个能发任意请求的函数：request(config)
2. 都有发特定请求的各种方法：get()/post()/put()/delete()
3. 都有默认配置和拦截器的属性：defaults/interceptors

不同：

1. 默认匹配的值很可能不一样
2. instance 没有 axios 后面添加的一些方法：create()/CanceToken()/all()

#### 3. axios 运行的整体流程

![img](https://img-blog.csdnimg.cn/20201201211645354.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQwNTA4ODMy,size_16,color_FFFFFF,t_70)

1）整体流程

request(config) ==> dispatchRequest(config) ==> xhrAdapter(config)

2）request(config)

主要作用是将请求拦截器 / dispatchRequest() / 响应拦截器 通过 promise 链串联起来，返回 promise

```
// foreach 对 chain： unshift + push
chain: [
fufilled2, rejected2, fulfilled1, rejected1,
dispatchRequest, undefined,
fulfilled11, rejected11, fulfilled22, rejected22
]
// while 循环 promise链回调：
config:
=> (fulfilled2, rejected2) => (fulfilled1, rejected1) // 请求拦截器处理
=> (dispatchRequest, undefined) // 发请求
=> (fulfilled11, rejected11) => (fulfilled22, rejected22) // 响应拦截器处理
=> (onResolved, onRejected) // 我们定义的回调处理
```

![img](https://img-blog.csdnimg.cn/2020120121164929.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQwNTA4ODMy,size_16,color_FFFFFF,t_70)

3）dispatchRequest(config)

用来转换请求数据 ==> 调用 xhrAdapter() 发请求 ==> 请求返回后转换响应数据，返回 promise

4）xhrAdapter(config)

创建 XHR 对象，根据 config 进行相应设置，发送特定请求，并接收响应数据，返回 promise

#### 4. axios 的请求/响应拦截器

1. 请求拦截器：在真正发送请求前执行的回调函数，可以对请求进行检查或配置进行特定处理。成功的回调函数，传递的默认是 config（也必须是），失败的回调函数，传递的默认是 error
2. 响应拦截器：在请求得到响应后执行的回调函数，可以对响应数据进行特定处理，成功的回调函数，传递的默认是 response，失败的回调函数，传递的默认是 error

#### 5. axios 的请求/响应数据转换器

1. 请求转换器：对请求头和请求体数据进行特定处理的函数

```
if (util.isObject(data)) {
  setContentTypeIfUnset(headers, 'application/json;charset=utf-8')
  return JSON.stringify(data)
}
```

1. 响应转换器：将响应体 json 字符串解析为 js 对象或数组的函数

```
response.data = JSON.parse(response.data)
```

#### 6. 如何取消未完成的请求的请求

1. 当配置了 cancelToken 对象时，保存 cancel 函数
   1. 内部创建一个用于将来中断请求的 cancelPromise
   2. excutor 执行器中定义了一个用于取消请求的 cancel 函数
   3. 并将这个 cancel 函数传递出来
2. 调用 cancel() 取消请求
   1. 执行 cancel 函数，传入错误信息 message
   2. 内部让 cancelPromise 变为成功，且成功的值为一个 new 出来的 Cancel 对象
   3. 在 cancelPromise 的成功回调中中断请求，并 reject xhr 里发请求的 promise，失败的 reason 为 Cancel

## 参考

[尚硅谷 Web 前端 Ajax 教程](https://www.bilibili.com/video/BV1WC4y1b78y)

[尚硅谷_axios 核心技术](https://www.bilibili.com/video/BV1NJ41197u6)

[Axios 源码深度剖析](https://juejin.im/post/5b0ba2d56fb9a00a1357a334)

## Axios

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

