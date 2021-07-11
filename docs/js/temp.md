# 分清Session、Cookie和Token

HTTP 是一种`无状态协议`，即每次服务端接收到客户端的请求时都是一个**全新的请求**。这样，服务器就不知道客户端的历史请求记录。为了弥补 HTTP 的无状态特性就有了 Session 和 Cookie。

## Session

Session 就是客户端请求服务端时，服务端为这次请求开辟的一块`内存对象`。服务器会利用 session **存储客户端在同一个会话期间的一些操作记录**。

#### Session 判断是否是同一会话

服务器第一次接收到请求，开辟一块 Session，生成一个 sessionId。然后通过响应头的**Set-Cookie：JSESSIONID=XXXXXXX \**命令发送响应，要求客户端设置 Cookie。客户端收到响应后在本机设置了一个**JSESSIONID=XXXXXXX **的 Cookie 信息。这个 Cookie 的过期时间就代表浏览器会话结束。

![img](https://img-blog.csdnimg.cn/20200524183705707.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQwNTA4ODMy,size_16,color_FFFFFF,t_70)

#### Session 的缺点

A 服务器存储了 Session，就是做了负载均衡后，假如一段时间内 A 的访问量激增，会转发到 B 进行访问，但是 B 服务器并没有存储 A 的 Session，会导致 Session 的失效。

## Cookie

Cookie 就是服务器发送到 Web 浏览器的一小块数据（即 Session）。**浏览器会存储这个 Cookie，并与下一次请求一起发送到服务器**。通常用于判断两个请求是否来自同一个浏览器，例如用户保持登录状态。

Cookie 的三个主要目的：

- `会话管理`：登录、购物车、游戏得分或者服务器应该记住的其他内容。
- `个性化`：用户偏好、主题或者其他设置。
- `追踪`：记录和分析用户的行为。

> Cookie 曾经用于一般的客户端存储。虽然是合法的，但如今建议使用现代存储 API。因为 Cookie 随每个请求一起发送会降低性能。

有两种类型的 Cookies

一种是 Session Cookies：

不包含到期日期。会话 Cookie 存储在内存中，永远不会写入磁盘，当浏览器关闭时，此后 Cookie 将永久丢失。（但是，Web 浏览器可能会使用会话还原，这会使大多数会话 Cookie 保持永久状态，就像从未关闭过浏览器一样）

一种是 Persistent Cookies：

包含`有效期` 。在`特定日期（Expires）`或`特定时间长度（Max-Age）`外过期，Cookie 将从磁盘中删除。

### cookie 重要的属性

#### domain

指定 cookie 所属域名，默认是当前域名

#### path

**指定 cookie 在哪个路径（路由）下生效，默认是 '/'**。
如果设置为 `/abc`，则只有 `/abc` 下的路由可以访问到该 cookie，如：`/abc/read`。

#### maxAge

cookie 失效的时间，单位秒。如果为整数，则该 cookie 在 maxAge 秒后失效。如果为负数，该 cookie 为临时 cookie ，关闭浏览器即失效，浏览器也不会以任何形式保存该 cookie 。如果为 0，表示删除该 cookie 。默认为 -1。**比 expires 好用**。

#### expires

过期时间，在设置的某个时间点后该 cookie 就会失效。一般浏览器的 cookie 都是默认储存的，当关闭浏览器结束这个会话的时候，这个 cookie 也就会被删除 。

#### secure

该 cookie 是否仅被使用安全协议传输。安全协议有 HTTPS，SSL 等，在网络上传输数据之前先将数据加密。默认为 false。**当 secure 值为 true 时，cookie 在 HTTP 中是无效，在 HTTPS 中才有效。**

#### httpOnly

如果给某个 cookie 设置了 httpOnly 属性，则无法通过 JS 脚本 读取到该 cookie 的信息，但还是能通过 Application 中手动修改 cookie，所以只是在一定程度上可以防止 XSS 攻击，不是绝对的安全

## Json Web Tokens

Json Web Token 的简称就是 JWT，通常可以称为 `Json 令牌`。JWT 中存储的信息是经过`数字签名`的，因此可以被信任和理解。可以使用 HMAC 算法或使用 RSA/ECDSA 的公用/专用密钥对 JWT 进行签名。

JWT 主要用于以下两点：

- `认证`：一旦用户**登录**，后面每个请求都会包含 JWT，从而用户可以访问该令牌允许的路由、服务和资源。
- `信息交换`：JWT 是能够**安全传输信息**的一种方式。通过使用公钥、私钥对 JWT 进行签名认证。此外，由于签名是使用 `head` 和 `payload` 计算的，因此你还可以**验证内容是否遭到篡改**。

### JWT 的格式

JWT 主要由三部分组成，每个部分用 `.` 进行分割：

- Header（头部）

- Payload（负载）

- Signature（签名）（对 Header 和 Payload 做的加密签名）

  通常如下展示：**xxxxx.yyyyy.zzzz**

#### Header

标头，是一个 JSON 对象，由两部分组成：`令牌的类型(即 JWT)`和使用的 `签名算法`(如 HMAC SHA256 )

```
{
  "alg": "HS256", // 表示签名的算法，默认是 HMAC SHA256（写成 HS256）
  "typ": "JWT" // 表示Token的类型，JWT 令牌统一写为JWT
}
```

#### Payload

也是一个 JSON 对象，用来存放实际需要传递的数据

```
{
  // 7个官方字段
  "iss": "a.com", // issuer：签发人
  "exp": "1d", // expiration time： 过期时间
  "sub": "test", // subject: 主题
  "aud": "xxx", // audience： 受众
  "nbf": "xxx", // Not Before：生效时间
  "iat": "xxx", // Issued At： 签发时间
  "jti": "1111", // JWT ID：编号
  // 可以定义私有字段
  "name": "John Doe",
  "admin": true
}
```

#### Signature

用 HMAC SHA256 算法加上一个别人不知道的密钥对前两个部分 Header 和 Payload 进行的一个签名。防止数据被篡改。

首先，需要指定一个密钥(secret)。这个密钥只有服务器才知道，不能泄露给用户。然后，使用 Header 里面指定的签名算法（默认是 HMAC SHA256），按照下面的公式产生签名：

> ```
> HMACSHA256(
> base64UrlEncode(header) + "." +
> base64UrlEncode(payload),
> secret)
> // 将用Base64URL编码后的header，payload加上一个只有服务器才知道的密钥，三者同时用 HMAC SHA256 算法进行签名形成signature
> ```

算出签名后，把 Header、Payload、Signature 三个部分拼成一个字符串，每个部分之间用"点"（.）分隔，就可以返回给用户。

服务器发送这个 token 给客户端，服务端自己并不保存， 当客户端把这个 token 发给服务器的时候，服务器再用同样的 HMAC-SHA256 算法和同样的密钥对 header 和 payload 再计算一次签名， 和 token 中的 signature 做个比较。

如果相同，表示已经登录过了，并且可以直接取到 user id；如果不相同，数据部分肯定被人篡改过，告诉发送者：对不起，没有认证。如图：

![img](https://img-blog.csdnimg.cn/202005241837334.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQwNTA4ODMy,size_16,color_FFFFFF,t_70)

### JWT 的使用方式

用户输入用户名/密码登录，服务端认证成功后，会返回给客户端一个 JWT。

客户端收到服务器返回的 JWT，可以储存在 Cookie 里面，也可以储存在 localStorage。

此后，客户端每次与服务器通信，都要带上这个 JWT。可以把它放在 Cookie 里面自动发送，但是这样不能跨域，所以更好的做法是放在 HTTP 请求的头信息`Authorization`字段里面。

```
Authorization: Bearer <token>
```

### JWT 的作用

JWT 最开始的初衷是为了实现授权和身份认证作用的，可以实现无状态，分布式的 Web 应用授权。大致实现的流程如下：

![img](https://img-blog.csdnimg.cn/20201025093949562.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQwNTA4ODMy,size_16,color_FFFFFF,t_70#pic_center)

1. 客户端需要携带用户名/密码等可证明身份的的内容去授权服务器获取 JWT 信息；
2. 每次服务都携带该 Token 内容与 Web 服务器进行交互，由业务服务器来验证 Token 是否是授权发放的有效 Token，来验证当前业务是否请求合法。

需要注意：不是每次请求都要申请一次 Token，如果不是对于安全性要求的情况，不建议每次都申请，因为会增加业务耗时；比如只在登陆时申请，然后使用 JWT 的过期时间或其他手段来保证 JWT 的有效性

## JWT 和 Session Cookies 的不同

- JWT 具有加密签名，而 Session Cookies 则没有。
- JWT 声明被存储在`客户端`，而不是服务端内存中，节省服务器资源。
- JWT 支持`跨域认证`。

cookie 是解决无状态的机制，session 是解决无状态的常用实施方案，**session 是基于 cookie 的机制来完成的**；JWT 是针对 API 请求进行关键信息对称加密的验证方案。虽然三者都用在了解决无状态连接下的会话认证场景，但之间的本质属性根本不同。

#### 参考

[看完这篇 Session、Cookie、Token，和面试官扯皮就没问题了](https://juejin.im/post/5e893002f265da48094d8cd3)

[彻底搞懂 Cookie,Session,Token 三者的区别](https://www.cnblogs.com/meizhoulqp/p/11658724.html)

[详解 Cookie，Session，Token](https://juejin.im/post/6844903864810864647)



# HTTP 缓存机制

客户端向服务器请求数据时，会先查看浏览器缓存，如果浏览器有这个需要请求的资源的副本，就可以直接从浏览器的缓存中提取这个资源，而不用重新请求。

但是如果浏览器每次都使用缓存中的资源而不再发送请求，这样也可能导致获取到的资源不是最新的，所以浏览器缓存有如下两种策略：

1. 强缓存
2. 协商缓存（弱缓存）

## 强缓存

**定义**：当发起 HTTP 请求时，不会向服务器进行请求，只要当前时间在缓存有效期内，则直接从客户端缓存中获得，当缓存过期之后，才会真正想服务器发起请求重新获得资源。

**特征**：HTTP 请求返回的状态码为 200 并且后面跟着 from memory cache 或 from disk cache。如图：

![img](https://img-blog.csdnimg.cn/2020080817482076.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQwNTA4ODMy,size_16,color_FFFFFF,t_70)

强缓存主要是浏览器根据请求头部的两个字段来判断的：

1. expires（HTTP/1.0）
2. cache-control（HTTP/1.1）

### Expires

`Expires` 即过期时间，存在于**服务端返回的响应头**中，告诉浏览器在这个过期时间之前可以直接从缓存里面获取数据，无需再次请求。如：

```
Expires: Wed, 22 Nov 2019 08:41:00 GMT
```

**缺点**：由于使用具体时间，如果时间表示出错、服务器的时间和浏览器的时间不一致或者没有转换到正确的时区都可能造成缓存生命周期出错。因此这种方式很快在后来的 HTTP1.1 版本中被抛弃了。

### Cache-Control

Cache-Control 是 `HTTP1.1` 中为了弥补 Expires 的缺陷而加入的。**浏览器的请求头和服务器的响应头**中都有这个字段。

当 Expires 和 Cache-Control 同时存在时，Cache-Control 优先级高于 Expires。

它和 `Expires` 本质的不同在于它并没有采用**具体的过期时间点**这个方式，而是采用**过期时长**来控制缓存，对应的字段是 `max-age`。

代表这个响应返回后在 3600 秒，也就是一个小时之内可以直接使用缓存。

```
Cache-Control: max-age=3600
```

除此之外，`cache-control` 还有的配置：

| 属性            | 描述                                                         |
| --------------- | ------------------------------------------------------------ |
| max-age         | 设置缓存存储的最大周期，超过这个时间缓存被认为过期(单位秒)。 |
| public/private  | public 表示客户端和代理服务器都能缓存；private 表示只能用户的浏览器才能缓存 |
| no-cache        | 跳过当前的强缓存，发送 HTTP 请求（即直接进入协商缓存阶段）   |
| no-store        | 不强缓存，也不协商缓存                                       |
| must-revalidate | 缓存必须在使用之前验证旧资源的状态，并且不可使用过期资源。   |

**缺点**：如果服务器资源更新了，或者修正了一个 bug，而强制缓存时间太长，就会造成客户端信息更新落后。

> 为了解决这个问题，就出现了**协商缓存**：
>
> 每次请求资源，先问问服务器，我需要重新拿资源吗？服务器通过标识对比，缓存数据没有更改，缓存时间也没过期，然后告诉客户端，继续用存储的数据吧，我这没啥变更。这样既解决了缓存问题，也解决了更新问题。虽然依然是每次都发送请求，请求数量没减少，但是却可以降低数据量传输。

## 协商缓存

当缓存资源过期了，也就是`强缓存`失效了，浏览器就会调用**协商缓存**策略。

协商缓存：浏览器在请求头中携带相应的**缓存 tag** 来向服务器发请求，由服务器根据这个 tag，来决定是否使用缓存。

缓存 tag 分为两种：

1. last-modified（if-modified-since）-> http1.0
2. Etag（if-none-match）-> http1.1

响应头：last-modified、Etag

请求头：if-modified-since、if-none-match

### Last-Modified

即最后修改时间。在浏览器第一次向服务器发送请求后，服务器会在响应头中加上这个字段。

```
last-moified: Fri,08 Jun 2018 10:2:30: GMT
```

下次请求时，浏览器会在请求头携带 `if-modified-since` 字段，其值就是由服务器传来的最后修改时间 `last-modified` 的值。

服务器会根据这个值来判断缓存是否过期：

1. 如果没有过期，就返回 304 和一个空的响应体告知浏览器直接使用缓存
2. 否则，跟常规的 HTTP 请求响应一样，返回 200 及请求结果

### ETag

Etag 其实和 last-modified 的效果一样，都是后端针对相应的资源，返回的一个标识。

只是 last-modified 是资源最后的修改时间，而 etag 是根据资源生成的唯一标识 hash 值，只要内容有改动，其值就会改变。服务器通过响应头把这个值给浏览器。

```
etag: '5c20abbd-e2e8'
```

下次请求时，浏览器会在请求头携带 `if-none-match` 字段，其值为之前接收到的 `ETag` 的值。

服务器接收到 If-None-Match 后，会跟服务器上该资源的 ETag 进行比对：

1. 如果一样，返回 304，告诉浏览器用缓存
2. 否则，跟常规的HTTP请求响应的流程一样

### 比较 `last-modified` 和 `etag`

last-modified 和 etag 的功能一样，为什么要在 http1.1 推出 etag 呢？

1. 资源文件仅仅改变修改时间，内容并不改变，这个时候 last-modified 会造成缓存失效而 etag 不会。
2. last-modified 能够感知的单位时间是秒，当文件在 1 秒内修改了多次，last-modified 会触发缓存，而 etag 不会。

如果同时设置了 `last-modified` 和 `etag` ，服务器会优先考虑 `etag`。

## 强缓存与协商缓存的对比

**区别**

| 缓存类型 | 获取资源形式 | 状态码              | 发送请求到服务器                 |
| -------- | ------------ | ------------------- | -------------------------------- |
| 强缓存   | 从缓存取     | 200（from cache）   | 否，直接从缓存取                 |
| 协商缓存 | 从缓存取     | 304（Not Modified） | 是，通过服务器来告知缓存是否可用 |

**用户行为对缓存的影响**

| 用户操作               | Expires/Cache-Control | Last-Modified/Etag |
| ---------------------- | --------------------- | ------------------ |
| 地址栏回车             | 有效                  | 有效               |
| 页面链接跳转           | 有效                  | 有效               |
| 新开窗口               | 有效                  | 有效               |
| 前进回退               | 有效                  | 有效               |
| **F5 刷新**            | **无效**              | **有效**           |
| **Crtl + F5 强制刷新** | **无效**              | **无效**           |

## 总结

HTTP 缓存都是从第二次请求开始的。

- 第一次请求资源时，服务器返回对应资源，并在 response header 头中携带缓存数据（如：expires、cache-control、last-modified、ETag）

- 第二次请求，浏览器首先通过

   

  ```
  Cache-Control
  ```

   

  验证强缓存是否可用：

  - 命中强缓存，就直接使用缓存， 200 状态码后面跟着 from memory cache 或 from disk cache

  - 若

     

    ```
    Cache-Control
    ```

     

    为

     

    ```
    no-cache
    ```

     

    则直接判断强缓存失效。进入协商缓存，发送 HTTP 请求，服务器通过请求头中的

     

    ```
    If-Modified-Since
    ```

     

    或

     

    ```
    If-None-Match
    ```

     

    字段检查资源是否更新：

    - 命中则返回 304，浏览器直接从缓存获取资源
    - 否则服务器会返回 200 和全新的资源

如下图所示：

![img](https://img-blog.csdnimg.cn/2020080817490686.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQwNTA4ODMy,size_16,color_FFFFFF,t_70)

## 参考

[浏览器输入URL到 请求全过程以及相应的性能优化](https://juejin.im/post/6844903750746767374#heading-11)

[能不能说一说前端缓存?](http://47.98.159.95/my_blog/perform/001.html)

[说说你对浏览器缓存的理解](https://juejin.im/post/6854573208444600333)

[浏览器缓存](https://juejin.im/post/6844903763665240072)