# 跨域

## 什么是跨域

浏览器的**同源策略**限制我们只能在**协议、IP 地址、端口号**相同的情况下相互的获取数据。如果有任何一个不通，这就算是跨域 HTTP 请求，可以正常发起，但是返回的结果会被浏览器拦截。

## 常用解决方案

### 1. jsonp

jsonp 是使用 script、img、iframe，没有同源限制的标签，向服务端发送请求。返回的数据作为一个指定的回调函数的参数，在另一个 script 中指定这个回调函数，这样就可以获取到服务端数据了。

```
<script>
  const btn = document.getElementById('btn');
  const msg = document.getElementById('msg');
  btn.onclick = () => {
    let script = document.createElement('script');
    script.setAttribute('src', 'http://127.0.0.1:8888/api/getdata?callback=displayData');
    document.getElementsByTagName('head')[0].appendChild(script);
  }

  function displayData(data) { // data是src中作为参数返回的
    msg.innerText = JSON.stringify(data);
  }
</script>
```

上面的栗子中，相当于在 `<head>` 中动态创建了一个`script`

```
<script src="http://127.0.0.1:8888/api/getdata?callback=displayData"></script>
```

这个 `script` 的 src 运行在另一个端口，返回的结果是 `displayData(data)`，执行了 `displayData()` 函数，将 data 展示在页面上。

```
//接收 callback 参数
let cb = request.query.callback
//返回结果
response.send(`${cb}(${str})`)
```

#### 优缺点

缺点：只支持 `GET` 请求

优点：它可以兼容低版本的浏览器

### 2. CORS

**CORS** （Cross-Origin Resource Sharing，跨域资源共享）是 W3C 推荐的一种官方方案。它允许浏览器向跨源服务器，发出 XMLHttpRequest 请求，从而克服了 AJAX 只能同源使用的限制。

CORS 需要浏览器（IE 浏览器不能低于 IE10）和服务器同时支持。

它由一系列传输的 HTTP 头组成，这些 HTTP 头决定浏览器是否阻止前端 JavaScript 代码获取跨域请求的响应。我们可以利用 CORS 在保证安全性的前提下访问跨域资源。

> 对于跨域资源的请求，浏览器已经把我们的请求发放给了服务器，浏览器也接受到了服务器的响应，只是浏览器根据同源策略，把消息给拦截了，不给我们显示。所以我们如果我们在服务器的响应中告诉浏览器这个数据是每个源都可以获取的就可以了。这就是 CORS 跨域资源共享。

#### 浏览器

> 整个 CORS 通信过程，都是浏览器自动完成，不需要用户参与。前端代码与同源完全一样。浏览器一旦发现 AJAX 请求跨源，就会自动添加一些附加的头信息，有时还会多出一次附加的请求，但用户不会有感觉。

Web 程序发出跨域请求后，浏览器会**自动**向我们的 HTTP header 添加一个额外的请求头字段：`Origin`，标记了请求的站点来源。

如：一个由 `https://www.mywebsite.com` 向 `https://api.website.com/users` 发送的跨域 get 请求

```
GET https://api.website.com/users HTTP/1/1
Origin: https://www.mywebsite.com // <- 浏览器自己加的
```

#### 服务端

我们可以通过在服务器端的 HTTP 响应中添加额外的响应头字段 `Access-Control-*` 来表明是否允许跨域请求。根据这些 CORS 响应头字段，浏览器可以允许一些被同源策略限制的跨源响应。

虽然有好几个 CORS 响应头字段，但有一个字段是**必加**的，那就是 `Access-Control-Allow-Origin`。

如果我们有服务器的开发权限，可以将发送请求的域添加到这个响应头字段中。

```
Access-Control-Allow-Origin: <origin> | *
```

其中，origin 参数的值指定了允许访问该资源的外域 URI，也就是发送请求的那个 URI。

> 对于不需要携带身份凭证的请求，服务器可以指定该字段的值为通配符（*），表示允许来自**所有域**的请求。

收到服务器返回的 response 后，浏览器中的 CORS 机制会检查 `Access-Control-Allow-Origin` 的值是否等于 request 中 `Origin` 的值。一样的话，前端成功接收到跨域资源；否则，浏览器 CORS 机制就阻止了这个响应，我们无法在我们的代码中获取响应数据。

#### 简单请求

CORS 有两种类型的请求：一种是**简单请求（simple request）**，一种是**预检请求（preflight request）**。

> 简单请求需要满足一些条件：使用的方法是 GET、HEAD 或 POST，且没有自定义 Header 字段时，一般是简单请求。
>
> 其他请求，比如使用了 PUT、DELETE 方法，或者 `Content-Type` 字段的类型是 `application/json` ，就是非简单请求，将会产生预检。
>
> 具体可以看 [MDN](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Access_control_CORS#功能概述)

发送简单请求后，只要使用 `Origin` 和 `Access-Control-Allow-Origin` 对应，浏览器会直接将实际请求发送到服务器，然后服务器返回我们需要的资源。

#### 复杂请求

与简单请求不同，“需预检的请求”会在正式通信之前，增加一次 `OPTIONS` 查询请求（预检请求），以获知服务器是否允许该实际请求。

假如发送一个 PUT 请求：

##### 实际请求（actual request）

```
PUT http://api.website.com/user/1 HTTP/1.1
Origin: http://www.mywebsite.com
Content-Type:application/json
```

该请求使用 PUT 方法，并且 `Content-Type` 为 `application/json` 。所以是复杂请求，会有预检。

在发送实际请求之前，客户端先使用 [`OPTIONS`](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Methods/OPTIONS) 方法发起一个预检请求，同时携带了下面的两个首部字段，包含了我们将要处理的**实际请求**的有关信息（服务器据此决定，该实际请求是否被允许）：

##### 预检请求（preflighted request）

```
OPTIONS https://api.mywebsite.com/user/1 HTTP/1.1
Origin: https://www.mywebsite.com
Access-Control-Request-Method: PUT // 告知服务器，实际请求将使用 PUT 方法
Access-Control-Request-Headers: Content-Type // 告知服务器，实际请求将携带的自定义请求首部字段：Content-Type。
```

服务器接收到预检请求后，会返回一个没有 body 的 HTTP 响应：

##### 预检响应（preflighted response）

```
HTTP/1.1 204 No Content
Access-Control-Allow-Origin: https://www.mywebsite.com
Access-Control-Allow-Methods: GET, POST, PUT // 表明服务器允许客户端使用POST,GET和PUT方法发起请求
Access-Control-Allow-Headers: Content-Type // 表明服务器允许请求中携带字段Content-Type
Access-Control-Max-Age: 86400 // 表明该响应的有效时间为 86400 秒（即24小时）
```

> `Access-Control-Max-Age` 头字段是缓存预检响应的时间，在有效时间内，浏览器无须为同一请求再次发起预检请求，可以使用缓存来代替发送新的预检请求，减少了网络往返次数。

如果预检响应检测通过，浏览器会将实际请求发送到服务器，然后服务器返回我们需要的资源；否则，CORS 会阻止跨域访问，实际的请求永远不会被发送。

> 预检请求可以避免跨域请求对服务器的资源产生未预期的影响。（浏览器无法预测和确保一些请求的安全性，所以先向服务器发送一个预检请求协商一下。）

#### 附带凭证的请求

默认情况下，跨域请求不发送身份凭证。

如果要在跨域请求中包含 cookie 和其他授权信息，需要修改两个地方：

1.将 `XMLHttpRequest` 的 withCredentials 属性设置为 true，向服务器发送 Cookies。

2.服务器端的响应中需要携带 `Access-Control-Allow-Credentials: true`，浏览器才会把响应内容返回给请求的发送者。

> 注意：如果要发送 Cookie，`Access-Control-Allow-Origin` 就不能设为星号，必须指定明确的、与请求网页一致的域名。

#### 优缺点

优点：可以访问多种请求方式，处理机制完善，符合 http 规范，对于复杂请求，多一次验证，安全性更好。

缺点：不支持 IE10 以下浏览器

### 3. 反向代理

#### 正向代理和反向代理

![img](https://img-blog.csdnimg.cn/202008091602457.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQwNTA4ODMy,size_16,color_FFFFFF,t_70)

**正向代理**：它隐藏了真实的请求客户端， 服务端不知道真实的客户端是谁，客户端请求的服务都被代理服务器代替来请求， 某些科学上网工具扮演的就是典型的正向代理角色。用浏览器访问网站时，被残忍的 block，于是你可以在国外搭建一台代理服务器 ，让代理帮我去清求该网站，代理把请求返回的相应结构再返回给我。

**反向代理**：反向代理隐藏了真实的服务端，当我们请求 [www.baidu.com](http://www.baidu.com/) 的时候，背后可能有成千上万台服务器为我们服务，但具体是哪一台，你不知道，也不需要知道，你只需要知道反向代理服务器是谁就好了，[www.baidu.com](http://www.baidu.com/) 就是我们的反向代理服务器，反向代理服务器会帮我们把请求转发到真实的服务器那里去。Nginx 就是性能非常好的反向代理服务器,用来做负载均衡。

两者的区别在于代理的对象不一样：正向代理代理的对象是客户端，反向代理代理的对象是服务端。

##### 反向代理解决跨域的原理

反向代理服务器伪造与客户端为同源的 url，客户端的请求发送到反向代理服务器上，由反向代理服务器去请求真正的 url，这样就绕过客户端直接请求真正的 url 导致的跨域问题。

#### 3.1 webpack 反向代理

webpack 中 devServer 可以配置 proxy 属性。工作原理实质上是利用 `http-proxy-middleware` 这个 http 代理中间件，实现请求转发给其他服务器。

> webpack 中的 `proxy` 只是一层代理，用于把指定的 `path`，代理去后端提供的地址，背后使用 node 来做 server。因为该技术只是在 webpack 打包阶段在本地临时生成了 node server，来实现类似 nginx 的 `proxy_pass` 的反向代理效果，所以只能在本地开发时使用。

-- webpack.config.js --

```
devServer: {
  host: 'localhost', // 域名
  port: 8080, // 端口号
  // 服务器代理，--> 解决开发环境的跨域问题
  proxy: {
    // 一旦 devServer(8080)服务器接收到/api/xxx的请求，就会把请求转发到另外一个服务器(3000)
    '/api': {
      target: 'http://localhost:3000', // 表示目标资源的地址
      //secure: false, // 设置支持https协议的代理
      //changeOrigin: true, // target是域名的话，需要这个参数
      // 发送请求时，请求路径重写：将/api/xxx --> /xxx （去掉/api）
      pathRewrite: {
        '^/api': '' //如果本身的接口地址没有 '/api' 这种通用前缀，则需要rewrite
      }
    }
  }
},
```

在上面栗子中，前端代码运行在 A `http://localhost:8080`，浏览器发送一个请求，接口为 `/api`，这个请求的数据（响应）运行在另外一个端口 B `http://localhost:3000` 上，这时，形成跨域。通过设置 webpack proxy，先将 A 的请求发送给代理服务器，代理服务器再转发到 B（代理服务器和 B 之间没有跨域），解决跨域问题。

webpack 下 vue 跨域需要配置 ProxyTable：

将上面 proxy 中的配置写到 config -> index.js -> module.exports -> dev -> proxyTable 中即可。

#### 3.2 Nginx 反向代理

> nginx 和 proxy 十分类似，都是访问中间层，由中间层去访问目标服务器。但是 Vue-cli 提供的代理功能，只能在开发环境下使用，http-server-middleware 依赖于 node 环境，生产代码应该 npm run build 然后把 dist 放到 nginx 服务器上，在 nginx 上配置代理地址。

比如说现在客户端的域名为 `client.com`，服务器的域名为 `server.com`，客户端向服务器发送 Ajax 请求，当然会跨域了，那这个时候就该让 Nginx 登场了，通过下面这个配置：

-- nginx.conf --

```
server {
  listen  80;
  server_name  client.com;
  # 只代理 /api 开头的接口，其他接口不代理
  location /api {
    # 需要代理的地址，输入后台api地址
    proxy_pass server.com;
  }
}
```

Nginx 相当于起了一个跳板机，这个跳板机的域名也是 `client.com`，让客户端首先访问 `client.com/api`，这当然没有跨域，然后 Nginx 服务器作为反向代理，将请求转发给 `server.com`，当响应返回时又将响应给到客户端，这就完成整个跨域请求的过程。

> 注意：修改完 nginx 中的配置一定要重启 nginx 才可以

这样的步骤是相较于传统的跨域是最简单也是最有效的一种方法，因为 nginx 又没有同源策略。不用考虑兼容性也不用考虑数据大小。

## 参考

[15 张精美动图全面讲解 CORS](https://juejin.im/post/6856556746706518024)

[解锁跨域的九种姿势](https://juejin.im/post/6844903767507206151#heading-13)

[(建议精读)HTTP 灵魂之问，巩固你的 HTTP 知识体系](https://juejin.im/post/6844904100035821575#heading-67)