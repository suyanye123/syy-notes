# 关于websocket和http协议

## 背景分析:

完整的HTTP服务过程包括
1.对www.xxx.com这个网址进行DNS域名解析,获取对应的请求
2.根据这个IP,找到对应的服务器,发起TCP三次握手
3.建立TCP连接后发起HTTP请求
4.服务器响应HTTP请求,浏览器得到HTML代码
5.浏览器解析HTML代码,并请求HTML代码的资源
6.浏览器对页面进行渲染呈现给用户
7.服务器关闭TCP连接

HTTP协议是无状态的，服务器只会响应来自客户端的请求，但是它与客户端之间不具备持续连接。

当用户在浏览器上进行操作时，可以请求服务器上的api；但是反过来却不可能：服务器端发生了一个事件，无法将这个事件的信息实时主动地通知客户端。只有在客户端查询服务器当前状态时，所发生事件的信息才会从服务器传递到客户端。



## 那怎么去实时地知道服务器的状态呢？

方法有两个：

（1）轮询：客户端每隔很短的时间，都会对服务器发出请求，查看是否有新的消息，只要轮询速度足够快，例如1秒，就能给人造成交互是实时进行的印象。这种做法是无奈之举，实际上对服务器、客户端双方都造成了大量的性能浪费。

（2）长连接：客户端只请求一次，但是服务器会将连接保持，不会返回结果。当服务器有了新数据时，实时地发给客户端，而一直保持挂起状态。这种做法的也造成了大量的性能浪费。



## WebSocket 协议

最新的 HTML5协议，制定了 WebSocket 协议标准，允许客户端和服务器端以全双工的方式进行通信。

WebSocket 的原理非常简单：利用HTTP请求产生握手，HTTP头部含有 WebSocket 协议的请求，*握手之后，二者转用TCP协议进行交流（QQ的协议）。

WebSocket协议需要浏览器和服务器都支持才可以使用：

支持WebSocket协议的浏览器有：Chrome 4、火狐4、IE10、Safari5

支持WebSocket协议的服务器有：Node 0、Apach7.0.2、Nginx1.3



## http 长连接和 websocket 的长连接区别

HTTP1.1通过使用Connection:keep-alive进行长连接，HTTP 1.1默认进行持久连接。在一次 TCP 连接中可以完成多个 HTTP 请求，但是对每个请求仍然要单独发 header，Keep-Alive不会永久保持连接，它有一个保持时间，可以在不同的服务器软件（如Apache）中设定这个时间。

websocket是一个真正的全双工。长连接第一次tcp链路建立之后，后续数据可以双方都进行发送，不需要发送请求头。

keep-alive双方并没有建立正真的连接会话，服务端可以在任何一次请求完成后关闭。WebSocket 它本身就规定了是正真的、双工的长连接，两边都必须要维持住连接的状态。



## Socket.IO 的引入

Node.js上需要写一些程序，来处理TCP请求。

Node.js从诞生之日起，就支持 WebSocket 协议。不过，从底层一步一步搭建一个Socket服务器很费劲（想象一下Node写一个静态文件服务都那么费劲）。所以，有大神帮我们写了一个库 Socket.IO。

Socket.IO 是业界良心，新手福音。它屏蔽了所有底层细节，让顶层调用非常简单。并且还为不支持 WebSocket 协议的浏览器，提供了长轮询的透明模拟机制。

Node的单线程、非阻塞I/O、事件驱动机制，使它非常适合Socket服务器。

[Socket.IO 的官网](http://socket.io/)



- [背景分析:](https://106.54.190.214/index.php/archives/21/#menu_index_1)
- [那怎么去实时地知道服务器的状态呢？](https://106.54.190.214/index.php/archives/21/#menu_index_2)
- [WebSocket 协议](https://106.54.190.214/index.php/archives/21/#menu_index_3)
- [http 长连接和 websocket 的长连接区别](https://106.54.190.214/index.php/archives/21/#menu_index_4)
- [Socket.IO 的引入](https://106.54.190.214/index.php/archives/21/#menu_index_5)



本文由 [简素言也](https://106.54.190.214/index.php/author/1/) 创作，采用 [知识共享署名4.0](https://creativecommons.org/licenses/by/4.0/) 国际许可协议进行许可



WebSocket是HTML5新增的协议，它的目的是在浏览器和服务器之间建立一个不受限的双向通信的通道，比如说，服务器可以在任意时刻发送消息给浏览器。

为什么传统的HTTP协议不能做到WebSocket实现的功能？这是因为HTTP协议是一个请求－响应协议，请求必须先由浏览器发给服务器，服务器才能响应这个请求，再把数据发送给浏览器。换句话说，浏览器不主动请求，服务器是没法主动发数据给浏览器的。

这样一来，要在浏览器中搞一个实时聊天，在线炒股（不鼓励），或者在线多人游戏的话就没法实现了，只能借助Flash这些插件。

也有人说，HTTP协议其实也能实现啊，比如用轮询或者Comet。轮询是指浏览器通过JavaScript启动一个定时器，然后以固定的间隔给服务器发请求，询问服务器有没有新消息。这个机制的缺点一是实时性不够，二是频繁的请求会给服务器带来极大的压力。

Comet本质上也是轮询，但是在没有消息的情况下，服务器先拖一段时间，等到有消息了再回复。这个机制暂时地解决了实时性问题，但是它带来了新的问题：以多线程模式运行的服务器会让大部分线程大部分时间都处于挂起状态，极大地浪费服务器资源。另外，一个HTTP连接在长时间没有数据传输的情况下，链路上的任何一个网关都可能关闭这个连接，而网关是我们不可控的，这就要求Comet连接必须定期发一些ping数据表示连接“正常工作”。

以上两种机制都治标不治本，所以，HTML5推出了WebSocket标准，让浏览器和服务器之间可以建立无限制的全双工通信，任何一方都可以主动发消息给对方。

### WebSocket协议

WebSocket并不是全新的协议，而是利用了HTTP协议来建立连接。我们来看看WebSocket连接是如何创建的。

首先，WebSocket连接必须由浏览器发起，因为请求协议是一个标准的HTTP请求，格式如下：

```
GET ws://localhost:3000/ws/chat HTTP/1.1
Host: localhost
Upgrade: websocket
Connection: Upgrade
Origin: http://localhost:3000
Sec-WebSocket-Key: client-random-string
Sec-WebSocket-Version: 13
```

该请求和普通的HTTP请求有几点不同：

1. GET请求的地址不是类似`/path/`，而是以`ws://`开头的地址；
2. 请求头`Upgrade: websocket`和`Connection: Upgrade`表示这个连接将要被转换为WebSocket连接；
3. `Sec-WebSocket-Key`是用于标识这个连接，并非用于加密数据；
4. `Sec-WebSocket-Version`指定了WebSocket的协议版本。

随后，服务器如果接受该请求，就会返回如下响应：

```
HTTP/1.1 101 Switching Protocols
Upgrade: websocket
Connection: Upgrade
Sec-WebSocket-Accept: server-random-string
```

该响应代码`101`表示本次连接的HTTP协议即将被更改，更改后的协议就是`Upgrade: websocket`指定的WebSocket协议。

版本号和子协议规定了双方能理解的数据格式，以及是否支持压缩等等。如果仅使用WebSocket的API，就不需要关心这些。

现在，一个WebSocket连接就建立成功，浏览器和服务器就可以随时主动发送消息给对方。消息有两种，一种是文本，一种是二进制数据。通常，我们可以发送JSON格式的文本，这样，在浏览器处理起来就十分容易。

为什么WebSocket连接可以实现全双工通信而HTTP连接不行呢？实际上HTTP协议是建立在TCP协议之上的，TCP协议本身就实现了全双工通信，但是HTTP协议的请求－应答机制限制了全双工通信。WebSocket连接建立以后，其实只是简单规定了一下：接下来，咱们通信就不使用HTTP协议了，直接互相发数据吧。

安全的WebSocket连接机制和HTTPS类似。首先，浏览器用`wss://xxx`创建WebSocket连接时，会先通过HTTPS创建安全的连接，然后，该HTTPS连接升级为WebSocket连接，底层通信走的仍然是安全的SSL/TLS协议。

### 浏览器

很显然，要支持WebSocket通信，浏览器得支持这个协议，这样才能发出`ws://xxx`的请求。目前，支持WebSocket的主流浏览器如下：

- Chrome
- Firefox
- IE >= 10
- Sarafi >= 6
- Android >= 4.4
- iOS >= 8

### 服务器

由于WebSocket是一个协议，服务器具体怎么实现，取决于所用编程语言和框架本身。Node.js本身支持的协议包括TCP协议和HTTP协议，要支持WebSocket协议，需要对Node.js提供的HTTPServer做额外的开发。已经有若干基于Node.js的稳定可靠的WebSocket实现，我们直接用npm安装使用即可。

要使用WebSocket，关键在于服务器端支持，这样，我们才有可能用支持WebSocket的浏览器使用WebSocket。

### ws模块

在Node.js中，使用最广泛的WebSocket模块是`ws`，我们创建一个`hello-ws`的VS Code工程，然后在`package.json`中添加`ws`的依赖：

```
"dependencies": {
    "ws": "1.1.1"
}
```

整个工程结构如下：

```
hello-ws/
|
+- .vscode/
|  |
|  +- launch.json <-- VSCode 配置文件
|
+- app.js <-- 启动js文件
|
+- package.json <-- 项目描述文件
|
+- node_modules/ <-- npm安装的所有依赖包
```

运行`npm install`后，我们就可以在`app.js`中编写WebSocket的服务器端代码。

创建一个WebSocket的服务器实例非常容易：

```
// 导入WebSocket模块:
const WebSocket = require('ws');

// 引用Server类:
const WebSocketServer = WebSocket.Server;

// 实例化:
const wss = new WebSocketServer({
    port: 3000
});
```

这样，我们就在3000端口上打开了一个WebSocket Server，该实例由变量`wss`引用。

接下来，如果有WebSocket请求接入，`wss`对象可以响应`connection`事件来处理这个WebSocket：

```
wss.on('connection', function (ws) {
    console.log(`[SERVER] connection()`);
    ws.on('message', function (message) {
        console.log(`[SERVER] Received: ${message}`);
        ws.send(`ECHO: ${message}`, (err) => {
            if (err) {
                console.log(`[SERVER] error: ${err}`);
            }
        });
    })
});
```

在`connection`事件中，回调函数会传入一个`WebSocket`的实例，表示这个WebSocket连接。对于每个WebSocket连接，我们都要对它绑定某些事件方法来处理不同的事件。这里，我们通过响应`message`事件，在收到消息后再返回一个`ECHO: xxx`的消息给客户端。

### 创建WebSocket连接

现在，这个简单的服务器端WebSocket程序就编写好了。如何真正创建WebSocket并且给服务器发消息呢？方法是在浏览器中写JavaScript代码。

先在VS Code中执行`app.js`，或者在命令行用`npm start`执行。然后，在当前页面下，直接打开可以执行JavaScript代码的浏览器Console，依次输入代码：

```
// 打开一个WebSocket:
var ws = new WebSocket('ws://localhost:3000/test');
// 响应onmessage事件:
ws.onmessage = function(msg) { console.log(msg); };
// 给服务器发送一个字符串:
ws.send('Hello!');
```

一切正常的话，可以看到Console的输出如下：

```
MessageEvent {isTrusted: true, data: "ECHO: Hello!", origin: "ws://localhost:3000", lastEventId: "", source: null…}
```

这样，我们就在浏览器中成功地收到了服务器发送的消息！

如果嫌在浏览器中输入JavaScript代码比较麻烦，我们还可以直接用`ws`模块提供的`WebSocket`来充当客户端。换句话说，`ws`模块既包含了服务器端，又包含了客户端。

`ws`的`WebSocket`就表示客户端，它其实就是WebSocketServer响应`connection`事件时回调函数传入的变量`ws`的类型。

客户端的写法如下：

```
let ws = new WebSocket('ws://localhost:3000/test');

// 打开WebSocket连接后立刻发送一条消息:
ws.on('open', function () {
    console.log(`[CLIENT] open()`);
    ws.send('Hello!');
});

// 响应收到的消息:
ws.on('message', function (message) {
    console.log(`[CLIENT] Received: ${message}`);
}
```

在Node环境下，`ws`模块的客户端可以用于测试服务器端代码，否则，每次都必须在浏览器执行JavaScript代码。

### 同源策略

从上面的测试可以看出，WebSocket协议本身不要求同源策略（Same-origin Policy），也就是某个地址为`http://a.com`的网页可以通过WebSocket连接到`ws://b.com`。但是，浏览器会发送`Origin`的HTTP头给服务器，服务器可以根据`Origin`拒绝这个WebSocket请求。所以，是否要求同源要看服务器端如何检查。

### 路由

还需要注意到服务器在响应`connection`事件时并未检查请求的路径，因此，在客户端打开`ws://localhost:3000/any/path`可以写任意的路径。

实际应用中还需要根据不同的路径实现不同的功能。

### 参考源码

[hello-ws](https://github.com/michaelliao/learn-javascript/tree/master/samples/node/web/ws/hello-ws)

上一节我们用`ws`模块创建了一个WebSocket应用。但是它只能简单地响应`ECHO: xxx`消息，还属于Hello, world级别的应用。

要创建真正的WebSocket应用，首先，得有一个基于MVC的Web应用，也就是我们在前面用koa2和Nunjucks创建的Web，在此基础上，把WebSocket添加进来，才算完整。

因此，本节的目标是基于WebSocket创建一个在线聊天室。

首先，我们把前面编写的MVC工程复制一份，先创建一个完整的MVC的Web应用，结构如下：

```
ws-with-koa/
|
+- .vscode/
|  |
|  +- launch.json <-- VSCode 配置文件
|
+- controllers/ <-- Controller
|
+- views/ <-- html模板文件
|
+- static/ <-- 静态资源文件
|
+- app.js <-- 使用koa的js
|
+- controller.js <-- 扫描注册Controller
|
+- static-files.js <-- 处理静态文件
|
+- templating.js <-- 模版引擎入口
|
+- package.json <-- 项目描述文件
|
+- node_modules/ <-- npm安装的所有依赖包
```

然后，把我们需要的依赖包添加到`package.json`：

```
"dependencies": {
    "ws": "1.1.1",
    "koa": "2.0.0",
    "koa-bodyparser": "3.2.0",
    "koa-router": "7.0.0",
    "nunjucks": "2.4.2",
    "mime": "1.3.4",
    "mz": "2.4.0"
}
```

使用`npm install`安装后，我们首先得到了一个标准的基于MVC的koa2应用。该应用的核心是一个代表koa应用的`app`变量：

```
const app = new Koa();

// TODO: app.use(...);

app.listen(3000);
```

现在第一个问题来了：koa通过3000端口响应HTTP，我们要新加的WebSocketServer还能否使用3000端口？

答案是肯定的。虽然WebSocketServer可以使用别的端口，但是，统一端口有个最大的好处：

实际应用中，HTTP和WebSocket都使用标准的80和443端口，不需要暴露新的端口，也不需要修改防火墙规则。

在3000端口被koa占用后，WebSocketServer如何使用该端口？

实际上，3000端口并非由koa监听，而是koa调用Node标准的http模块创建的http.Server监听的。koa只是把响应函数注册到该http.Server中了。类似的，WebSocketServer也可以把自己的响应函数注册到http.Server中，这样，同一个端口，根据协议，可以分别由koa和ws处理：

![http-ws-koa](https://www.liaoxuefeng.com/files/attachments/1103337711728000/l)

把WebSocketServer绑定到同一个端口的关键代码是先获取koa创建的`http.Server`的引用，再根据`http.Server`创建WebSocketServer：

```
// koa app的listen()方法返回http.Server:
let server = app.listen(3000);

// 创建WebSocketServer:
let wss = new WebSocketServer({
    server: server
});
```

要始终注意，浏览器创建WebSocket时发送的仍然是标准的HTTP请求。无论是WebSocket请求，还是普通HTTP请求，都会被http.Server处理。具体的处理方式则是由koa和WebSocketServer注入的回调函数实现的。WebSocketServer会首先判断请求是不是WS请求，如果是，它将处理该请求，如果不是，该请求仍由koa处理。

所以，WS请求会直接由WebSocketServer处理，它根本不会经过koa，koa的任何middleware都没有机会处理该请求。

现在第二个问题来了：在koa应用中，可以很容易地认证用户，例如，通过session或者cookie，但是，在响应WebSocket请求时，如何识别用户身份？

一个简单可行的方案是把用户登录后的身份写入Cookie，在koa中，可以使用middleware解析Cookie，把用户绑定到`ctx.state.user`上。

WS请求也是标准的HTTP请求，所以，服务器也会把Cookie发送过来，这样，我们在用WebSocketServer处理WS请求时，就可以根据Cookie识别用户身份。

先把识别用户身份的逻辑提取为一个单独的函数：

```
function parseUser(obj) {
    if (!obj) {
        return;
    }
    console.log('try parse: ' + obj);
    let s = '';
    if (typeof obj === 'string') {
        s = obj;
    } else if (obj.headers) {
        let cookies = new Cookies(obj, null);
        s = cookies.get('name');
    }
    if (s) {
        try {
            let user = JSON.parse(Buffer.from(s, 'base64').toString());
            console.log(`User: ${user.name}, ID: ${user.id}`);
            return user;
        } catch (e) {
            // ignore
        }
    }
}
```

*注意*：出于演示目的，该Cookie并没有作Hash处理，实际上它就是一个JSON字符串。

在koa的middleware中，我们很容易识别用户：

```
app.use(async (ctx, next) => {
    ctx.state.user = parseUser(ctx.cookies.get('name') || '');
    await next();
});
```

在WebSocketServer中，就需要响应`connection`事件，然后识别用户：

```
wss.on('connection', function (ws) {
    // ws.upgradeReq是一个request对象:
    let user = parseUser(ws.upgradeReq);
    if (!user) {
        // Cookie不存在或无效，直接关闭WebSocket:
        ws.close(4001, 'Invalid user');
    }
    // 识别成功，把user绑定到该WebSocket对象:
    ws.user = user;
    // 绑定WebSocketServer对象:
    ws.wss = wss;
});
```

紧接着，我们要对每个创建成功的WebSocket绑定`message`、`close`、`error`等事件处理函数。对于聊天应用来说，每收到一条消息，就需要把该消息广播到所有WebSocket连接上。

先为`wss`对象添加一个`broadcase()`方法：

```
wss.broadcast = function (data) {
    wss.clients.forEach(function (client) {
        client.send(data);
    });
};
```

在某个WebSocket收到消息后，就可以调用`wss.broadcast()`进行广播了：

```
ws.on('message', function (message) {
    console.log(message);
    if (message && message.trim()) {
        let msg = createMessage('chat', this.user, message.trim());
        this.wss.broadcast(msg);
    }
});
```

消息有很多类型，不一定是聊天的消息，还可以有获取用户列表、用户加入、用户退出等多种消息。所以我们用`createMessage()`创建一个JSON格式的字符串，发送给浏览器，浏览器端的JavaScript就可以直接使用：

```
// 消息ID:
var messageIndex = 0;

function createMessage(type, user, data) {
    messageIndex ++;
    return JSON.stringify({
        id: messageIndex,
        type: type,
        user: user,
        data: data
    });
}
```

### 编写页面

相比服务器端的代码，页面的JavaScript代码会更复杂。

聊天室页面可以划分为左侧会话列表和右侧用户列表两部分：

![chat](https://www.liaoxuefeng.com/files/attachments/1103341687929120/l)

这里的DOM需要动态更新，因此，状态管理是页面逻辑的核心。

为了简化状态管理，我们用Vue控制左右两个列表：

```
var vmMessageList = new Vue({
    el: '#message-list',
    data: {
        messages: []
    }
});

var vmUserList = new Vue({
    el: '#user-list',
    data: {
        users: []
    }
});
```

会话列表和用户列表初始化为空数组。

紧接着，创建WebSocket连接，响应服务器消息，并且更新会话列表和用户列表：

```
var ws = new WebSocket('ws://localhost:3000/ws/chat');

ws.onmessage = function(event) {
    var data = event.data;
    console.log(data);
    var msg = JSON.parse(data);
    if (msg.type === 'list') {
        vmUserList.users = msg.data;
    } else if (msg.type === 'join') {
        addToUserList(vmUserList.users, msg.user);
        addMessage(vmMessageList.messages, msg);
    } else if (msg.type === 'left') {
        removeFromUserList(vmUserList.users, msg.user);
        addMessage(vmMessageList.messages, msg);
    } else if (msg.type === 'chat') {
        addMessage(vmMessageList.messages, msg);
    }
};
```

这样，JavaScript负责更新状态，Vue负责根据状态刷新DOM。以用户列表为例，HTML代码如下：

```
<div id="user-list">
    <div class="media" v-for="user in users">
        <div class="media-left">
            <img class="media-object" src="/static/user.png">
        </div>
        <div class="media-body">
            <h4 class="media-heading" v-text="user.name"></h4>
        </div>
    </div>
</div>
```

测试的时候，如果在本机测试，需要同时用几个不同的浏览器，这样Cookie互不干扰。

最终的聊天室效果如下：

![websocket](https://www.liaoxuefeng.com/files/attachments/1103342640036736/l)

### 配置反向代理

如果网站配置了反向代理，例如Nginx，则HTTP和WebSocket都必须通过反向代理连接Node服务器。HTTP的反向代理非常简单，但是要正常连接WebSocket，代理服务器必须支持WebSocket协议。

我们以Nginx为例，编写一个简单的反向代理配置文件。

详细的配置可以参考Nginx的官方博客：[Using NGINX as a WebSocket Proxy](https://www.nginx.com/blog/websocket-nginx/)

首先要保证Nginx版本>=1.3，然后，通过`proxy_set_header`指令，设定：

```
proxy_set_header Upgrade $http_upgrade;
proxy_set_header Connection "upgrade";
```

Nginx即可理解该连接将使用WebSocket协议。

一个示例配置文件内容如下：

```
server {
    listen      80;
    server_name localhost;

    # 处理静态资源文件:
    location ^~ /static/ {
        root /path/to/ws-with-koa;
    }

    # 处理WebSocket连接:
    location ^~ /ws/ {
        proxy_pass         http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header   Upgrade $http_upgrade;
        proxy_set_header   Connection "upgrade";
    }

    # 其他所有请求:
    location / {
        proxy_pass       http://127.0.0.1:3000;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header Host $host;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    }
}
```

### 参考源码

[ws-with-koa](https://github.com/michaelliao/learn-javascript/tree/master/samples/node/web/ws/ws-with-koa)



# WebSocket 简介

传统的客户端和服务器通信协议是HTTP：客户端发起请求，服务端进行响应，服务端从不主动勾搭客户端。

这种模式有个明显软肋，就是同步状态。而实际应用中有大量需要客户端和服务器实时同步状态的场景，比如聊天室、股票行情、在线共享文档等都需要客户端实时拿到服务器的最新状态。

针对这种实时同步的需求，一种简单的方式是轮询，比如每隔5s发一次http请求去拿服务器最新的状态数据。但这种方式会存在数据延迟，浪费带宽等副作用。

更完美的方式是使用WebSocket，浏览器原生支持，W3C标准协议，客户端和服务器建立持久性连接可以互发消息。

# socket.io 简介

socket.io 是一个类库，内部封装了WebSocket，可以在浏览器与服务器之间建立实时通信。

如果某些旧版本的浏览器不支持WebSocket，socket.io会使用轮询代替。另外它还具有可发送二进制消息、多路复用、创建房间等特性，因此相比直接使用原生WebSocket，socket.io是更好的选择。

开发一个实时应用主要分两部分：服务端和客户端，socket.io分别提供了相应的npm包供我们方便地调用。

接下来就通过一个生动形象且有趣的栗子分别介绍这两大块。

现在假设李白，瑶，吕布，后羿，貂蝉5个人加入了一个叫 KPL 的房间，在文章结束时我们将拥有一个麻雀虽小五脏俱全的峡谷英雄在线聊天室

# [服务端api](https://socket.io/docs/server-api/)

首先安装socket.io提供的服务端npm包：

```sh
npm i socket.io
```

**可以与 Express 框架配合使用：**

```js
const http = require('http')
const app = require('express')()
const server = http.createServer(app)
const io = require('socket.io')(server)
server.listen(3000)
```

**也可以与 Koa 框架配合使用**

```js
const http = require('http')
const Koa = require('koa')
const app = new Koa()
const server = http.createServer(app.callback())
const io = require('socket.io')(server)
server.listen(3000)
```

使用起来就是这么简单。接下来就可以写业务逻辑啦

```js
io.on('connect', client => { // client 即是连接上来的一个客户端
  console.log(client.id) // id 是区分客户端的唯一标识

  client.on('disconnect', () => {}) // 客户端断开连接时调用(可能是关掉页面，网络不通了等)
})
```

`connect` 和 `disconnect` 是 socket.io 内置的事件类型，用于在客户端连接和断开的时候做一些事情。

在客户端建立连接时需要把他们加入到一个房间里去，类似创建了一个聊天室

```diff
  console.log(client.id)
+ client.join('KPL') // 将客户端加入到 KPL 房间内
  client.on('disconnect', () => {})
```

紧接着瑶进来秒发了首条消息：我打野，不给就送

服务器在收到这条振奋人心的消息后需要立即同步给其他四位队友

```diff
  client.join('KPL')
+ client.on('talk', message => {
+   client.to('KPL').emit('talk', message) // 发送给房间里的每个人，除了发送者
+ })
  client.on('disconnect', () => {})
```

服务端的功能到这基本上就开发完了。创建了一个房间，并在收到成员消息时立即同步给房间里的其他成员

# [客户端api](https://socket.io/docs/client-api/)

socket.io 为客户端提供了另一个npm包，直接安装

```sh
npm i socket.io-client
```

接下来就可以在页面上建立到服务器的连接啦

```js
import io from 'socket.io-client'

const socket = io() // 建立连接
```

向服务器发送消息

```diff
  const socket = io()
+ socket.emit('talk', '我打野，不给就送')
```

接收服务器发来的消息

```diff
  const socket = io()
+ socket.on('talk', message => {
+ })
```

李白看到了瑶的消息，强忍住问候对方家人的冲动，像哄那啥似地说道：

```diff
  socket.on('talk', message => {
+   socket.emit('talk', '你买个石头骑在我头上他不香么')
  })
```

客户端的功能到这基本上也开发完了。核心api就是on和emit用于收发消息，既简单又优雅。

# 最后

至此一个可以实时发送接收消息的聊天室就完成了，虽然简陋，但核心功能完备。

瑶最终倔强地打了野，李白选择了上路，3分钟被对面捶到高地，后羿在家里等鸟，吕布和貂蝉躲在蓝buff旁边的草丛里聊天，就这样在李白和瑶互相拉票举报对方的全局消息中游戏结束