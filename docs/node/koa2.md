# koa  [转自廖雪峰](https://www.liaoxuefeng.com/wiki/1022910821149312/1023026038570336)

### 历史

#### 1. Express

Express是第一代最流行的web框架，它对Node.js的http进行了封装，用起来如下：

```js
var express = require('express');
var app = express();

app.get('/', function (req, res) {
    res.send('Hello World!');
});

app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});
```

虽然Express的API很简单，但是它是基于ES5的语法，要实现异步代码，只有一个方法：回调。如果异步嵌套层次过多，代码写起来就非常难看：

```js
app.get('/test', function (req, res) {
    fs.readFile('/file1', function (err, data) {
        if (err) {
            res.status(500).send('read file1 error');
        }
        fs.readFile('/file2', function (err, data) {
            if (err) {
                res.status(500).send('read file2 error');
            }
            res.type('text/plain');
            res.send(data);
        });
    });
});
```

虽然可以用async这样的库来组织异步代码，但是用回调写异步实在是太痛苦了！

#### 2. koa 1.0

随着新版Node.js开始支持ES6，Express的团队又基于ES6的generator重新编写了下一代web框架koa。和Express相比，koa 1.0使用generator实现异步，代码看起来像同步的：

```js
var koa = require('koa');
var app = koa();

app.use('/test', function *() {
    yield doReadFile1();
    var data = yield doReadFile2();
    this.body = data;
});

app.listen(3000);
```

用generator实现异步比回调简单了不少，但是generator的本意并不是异步。Promise才是为异步设计的，但是Promise的写法……想想就复杂。为了简化异步代码，ES7（目前是草案，还没有发布）引入了新的关键字`async`和`await`，可以轻松地把一个function变为异步模式：

```js
async function () {
    var data = await fs.read('/file1');
}
```

这是JavaScript未来标准的异步代码，非常简洁，并且易于使用。

#### 3. koa2

koa团队并没有止步于koa 1.0，他们非常超前地基于ES7开发了koa2，和koa 1相比，koa2完全使用Promise并配合`async`来实现异步。

koa2的代码看上去像这样：

```js
app.use(async (ctx, next) => {
    await next();
    var data = await doReadFile();
    ctx.response.type = 'text/plain';
    ctx.response.body = data;
});
```

出于兼容性考虑，目前koa2仍支持generator的写法，但下一个版本将会去掉。

### 选择哪个版本？

目前JavaScript处于高速进化中，ES7是大势所趋。为了紧跟时代潮流，教程将使用最新的koa2开发！

### 创建koa2工程

首先，我们创建一个目录`hello-koa`并作为工程目录用VS Code打开。然后，我们创建`app.js`，输入以下代码：

```js
// 导入koa，和koa 1.x不同，在koa2中，我们导入的是一个class，因此用大写的Koa表示:
const Koa = require('koa');

// 创建一个Koa对象表示web app本身:
const app = new Koa();

// 对于任何请求，app将调用该异步函数处理请求：
app.use(async (ctx, next) => {
    await next();
    ctx.response.type = 'text/html';
    ctx.response.body = '<h1>Hello, koa2!</h1>';
});

// 在端口3000监听:
app.listen(3000);
console.log('app started at port 3000...');
```

对于每一个http请求，koa将调用我们传入的异步函数来处理：

```js
async (ctx, next) => {
    await next();
    // 设置response的Content-Type:
    ctx.response.type = 'text/html';
    // 设置response的内容:
    ctx.response.body = '<h1>Hello, koa2!</h1>';
}
```

其中，参数`ctx`是由koa传入的封装了request和response的变量，我们可以通过它访问request和response，`next`是koa传入的将要处理的下一个异步函数。

上面的异步函数中，我们首先用`await next();`处理下一个异步函数，然后，设置response的Content-Type和内容。

由`async`标记的函数称为异步函数，在异步函数中，可以用`await`调用另一个异步函数，这两个关键字将在ES7中引入。

### koa middleware

让我们再仔细看看koa的执行逻辑。核心代码是：

```js
app.use(async (ctx, next) => {
    await next();
    ctx.response.type = 'text/html';
    ctx.response.body = '<h1>Hello, koa2!</h1>';
});
```

每收到一个http请求，koa就会调用通过`app.use()`注册的async函数，并传入`ctx`和`next`参数。

我们可以对`ctx`操作，并设置返回内容。但是为什么要调用`await next()`？

原因是koa把很多async函数组成一个处理链，每个async函数都可以做一些自己的事情，然后用`await next()`来调用下一个async函数。我们把每个async函数称为middleware，这些middleware可以组合起来，完成很多有用的功能。

例如，可以用以下3个middleware组成处理链，依次打印日志，记录处理时间，输出HTML：

```js
app.use(async (ctx, next) => {
    console.log(`${ctx.request.method} ${ctx.request.url}`); // 打印URL
    await next(); // 调用下一个middleware
});

app.use(async (ctx, next) => {
    const start = new Date().getTime(); // 当前时间
    await next(); // 调用下一个middleware
    const ms = new Date().getTime() - start; // 耗费时间
    console.log(`Time: ${ms}ms`); // 打印耗费时间
});

app.use(async (ctx, next) => {
    await next();
    ctx.response.type = 'text/html';
    ctx.response.body = '<h1>Hello, koa2!</h1>';
});
```

middleware的顺序很重要，也就是调用`app.use()`的顺序决定了middleware的顺序。

此外，如果一个middleware没有调用`await next()`，会怎么办？答案是后续的middleware将不再执行了。这种情况也很常见，例如，一个检测用户权限的middleware可以决定是否继续处理请求，还是直接返回403错误：

```js
app.use(async (ctx, next) => {
    if (await checkUserPermission(ctx)) {
        await next();
    } else {
        ctx.response.status = 403;
    }
});
```

理解了middleware，我们就已经会用koa了！

最后注意`ctx`对象有一些简写的方法，例如`ctx.url`相当于`ctx.request.url`，`ctx.type`相当于`ctx.response.type`。

### 参考源码

[hello-koa](https://github.com/michaelliao/learn-javascript/tree/master/samples/node/web/koa/hello-koa)

在hello-koa工程中，我们处理http请求一律返回相同的HTML，这样虽然非常简单，但是用浏览器一测，随便输入任何URL都会返回相同的网页。

![buduijin](https://www.liaoxuefeng.com/files/attachments/1099851451809856/l)

正常情况下，我们应该对不同的URL调用不同的处理函数，这样才能返回不同的结果。例如像这样写：

```js
app.use(async (ctx, next) => {
    if (ctx.request.path === '/') {
        ctx.response.body = 'index page';
    } else {
        await next();
    }
});

app.use(async (ctx, next) => {
    if (ctx.request.path === '/test') {
        ctx.response.body = 'TEST page';
    } else {
        await next();
    }
});

app.use(async (ctx, next) => {
    if (ctx.request.path === '/error') {
        ctx.response.body = 'ERROR page';
    } else {
        await next();
    }
});
```

这么写是可以运行的，但是好像有点蠢。

应该有一个能集中处理URL的middleware，它根据不同的URL调用不同的处理函数，这样，我们才能专心为每个URL编写处理函数。

### koa-router

为了处理URL，我们需要引入`koa-router`这个middleware，让它负责处理URL映射。

我们把上一节的`hello-koa`工程复制一份，重命名为`url-koa`。

先在`package.json`中添加依赖项：

```
"koa-router": "7.0.0"
```

然后用`npm install`安装。

接下来，我们修改`app.js`，使用`koa-router`来处理URL：

```js
const Koa = require('koa');

// 注意require('koa-router')返回的是函数:
const router = require('koa-router')();

const app = new Koa();

// log request URL:
app.use(async (ctx, next) => {
    console.log(`Process ${ctx.request.method} ${ctx.request.url}...`);
    await next();
});

// add url-route:
router.get('/hello/:name', async (ctx, next) => {
    var name = ctx.params.name;
    ctx.response.body = `<h1>Hello, ${name}!</h1>`;
});

router.get('/', async (ctx, next) => {
    ctx.response.body = '<h1>Index</h1>';
});

// add router middleware:
app.use(router.routes());

app.listen(3000);
console.log('app started at port 3000...');
```

注意导入`koa-router`的语句最后的`()`是函数调用：

```
const router = require('koa-router')();
```

相当于：

```
const fn_router = require('koa-router');
const router = fn_router();
```

然后，我们使用`router.get('/path', async fn)`来注册一个GET请求。可以在请求路径中使用带变量的`/hello/:name`，变量可以通过`ctx.params.name`访问。

再运行`app.js`，我们就可以测试不同的URL：

输入首页：http://localhost:3000/

![url-index](https://www.liaoxuefeng.com/files/attachments/1099853782317472/l)

输入：http://localhost:3000/hello/koa

![url-hello](https://www.liaoxuefeng.com/files/attachments/1099853801191008/l)

### 处理post请求

用`router.get('/path', async fn)`处理的是get请求。如果要处理post请求，可以用`router.post('/path', async fn)`。

用post请求处理URL时，我们会遇到一个问题：post请求通常会发送一个表单，或者JSON，它作为request的body发送，但无论是Node.js提供的原始request对象，还是koa提供的request对象，都*不提供*解析request的body的功能！

所以，我们又需要引入另一个middleware来解析原始request请求，然后，把解析后的参数，绑定到`ctx.request.body`中。

`koa-bodyparser`就是用来干这个活的。

我们在`package.json`中添加依赖项：

```
"koa-bodyparser": "3.2.0"
```

然后使用`npm install`安装。

下面，修改`app.js`，引入`koa-bodyparser`：

```
const bodyParser = require('koa-bodyparser');
```

在合适的位置加上：

```
app.use(bodyParser());
```

由于middleware的顺序很重要，这个`koa-bodyparser`必须在`router`之前被注册到`app`对象上。

现在我们就可以处理post请求了。写一个简单的登录表单：

```js
router.get('/', async (ctx, next) => {
    ctx.response.body = `<h1>Index</h1>
        <form action="/signin" method="post">
            <p>Name: <input name="name" value="koa"></p>
            <p>Password: <input name="password" type="password"></p>
            <p><input type="submit" value="Submit"></p>
        </form>`;
});

router.post('/signin', async (ctx, next) => {
    var
        name = ctx.request.body.name || '',
        password = ctx.request.body.password || '';
    console.log(`signin with name: ${name}, password: ${password}`);
    if (name === 'koa' && password === '12345') {
        ctx.response.body = `<h1>Welcome, ${name}!</h1>`;
    } else {
        ctx.response.body = `<h1>Login failed!</h1>
        <p><a href="/">Try again</a></p>`;
    }
});
```

注意到我们用`var name = ctx.request.body.name || ''`拿到表单的`name`字段，如果该字段不存在，默认值设置为`''`。

类似的，put、delete、head请求也可以由router处理。

### 重构

现在，我们已经可以处理不同的URL了，但是看看`app.js`，总觉得还是有点不对劲。

![still-buduijin](https://www.liaoxuefeng.com/files/attachments/1099855426483264/l)

所有的URL处理函数都放到`app.js`里显得很乱，而且，每加一个URL，就需要修改`app.js`。随着URL越来越多，`app.js`就会越来越长。

如果能把URL处理函数集中到某个js文件，或者某几个js文件中就好了，然后让`app.js`自动导入所有处理URL的函数。这样，代码一分离，逻辑就显得清楚了。最好是这样：

```js
url2-koa/
|
+- .vscode/
|  |
|  +- launch.json <-- VSCode 配置文件
|
+- controllers/
|  |
|  +- login.js <-- 处理login相关URL
|  |
|  +- users.js <-- 处理用户管理相关URL
|
+- app.js <-- 使用koa的js
|
+- package.json <-- 项目描述文件
|
+- node_modules/ <-- npm安装的所有依赖包
```

于是我们把`url-koa`复制一份，重命名为`url2-koa`，准备重构这个项目。

我们先在`controllers`目录下编写`index.js`：

```js
var fn_index = async (ctx, next) => {
    ctx.response.body = `<h1>Index</h1>
        <form action="/signin" method="post">
            <p>Name: <input name="name" value="koa"></p>
            <p>Password: <input name="password" type="password"></p>
            <p><input type="submit" value="Submit"></p>
        </form>`;
};

var fn_signin = async (ctx, next) => {
    var
        name = ctx.request.body.name || '',
        password = ctx.request.body.password || '';
    console.log(`signin with name: ${name}, password: ${password}`);
    if (name === 'koa' && password === '12345') {
        ctx.response.body = `<h1>Welcome, ${name}!</h1>`;
    } else {
        ctx.response.body = `<h1>Login failed!</h1>
        <p><a href="/">Try again</a></p>`;
    }
};

module.exports = {
    'GET /': fn_index,
    'POST /signin': fn_signin
};
```

这个`index.js`通过`module.exports`把两个URL处理函数暴露出来。

类似的，`hello.js`把一个URL处理函数暴露出来：

```
var fn_hello = async (ctx, next) => {
    var name = ctx.params.name;
    ctx.response.body = `<h1>Hello, ${name}!</h1>`;
};

module.exports = {
    'GET /hello/:name': fn_hello
};
```

现在，我们修改`app.js`，让它自动扫描`controllers`目录，找到所有`js`文件，导入，然后注册每个URL：

```js
// 先导入fs模块，然后用readdirSync列出文件
// 这里可以用sync是因为启动时只运行一次，不存在性能问题:
var files = fs.readdirSync(__dirname + '/controllers');

// 过滤出.js文件:
var js_files = files.filter((f)=>{
    return f.endsWith('.js');
});

// 处理每个js文件:
for (var f of js_files) {
    console.log(`process controller: ${f}...`);
    // 导入js文件:
    let mapping = require(__dirname + '/controllers/' + f);
    for (var url in mapping) {
        if (url.startsWith('GET ')) {
            // 如果url类似"GET xxx":
            var path = url.substring(4);
            router.get(path, mapping[url]);
            console.log(`register URL mapping: GET ${path}`);
        } else if (url.startsWith('POST ')) {
            // 如果url类似"POST xxx":
            var path = url.substring(5);
            router.post(path, mapping[url]);
            console.log(`register URL mapping: POST ${path}`);
        } else {
            // 无效的URL:
            console.log(`invalid URL: ${url}`);
        }
    }
}
```

如果上面的大段代码看起来还是有点费劲，那就把它拆成更小单元的函数：

```js
function addMapping(router, mapping) {
    for (var url in mapping) {
        if (url.startsWith('GET ')) {
            var path = url.substring(4);
            router.get(path, mapping[url]);
            console.log(`register URL mapping: GET ${path}`);
        } else if (url.startsWith('POST ')) {
            var path = url.substring(5);
            router.post(path, mapping[url]);
            console.log(`register URL mapping: POST ${path}`);
        } else {
            console.log(`invalid URL: ${url}`);
        }
    }
}

function addControllers(router) {
    var files = fs.readdirSync(__dirname + '/controllers');
    var js_files = files.filter((f) => {
        return f.endsWith('.js');
    });

    for (var f of js_files) {
        console.log(`process controller: ${f}...`);
        let mapping = require(__dirname + '/controllers/' + f);
        addMapping(router, mapping);
    }
}

addControllers(router);
```

确保每个函数功能非常简单，一眼能看明白，是代码可维护的关键。

### Controller Middleware

最后，我们把扫描`controllers`目录和创建`router`的代码从`app.js`中提取出来，作为一个简单的middleware使用，命名为`controller.js`：

```js
const fs = require('fs');

function addMapping(router, mapping) {
    ...
}

function addControllers(router, dir) {
    ...
}

module.exports = function (dir) {
    let
        controllers_dir = dir || 'controllers', // 如果不传参数，扫描目录默认为'controllers'
        router = require('koa-router')();
    addControllers(router, controllers_dir);
    return router.routes();
};
```

这样一来，我们在`app.js`的代码又简化了：

```js
...

// 导入controller middleware:
const controller = require('./controller');

...

// 使用middleware:
app.use(controller());

...
```

经过重新整理后的工程`url2-koa`目前具备非常好的模块化，所有处理URL的函数按功能组存放在`controllers`目录，今后我们也只需要不断往这个目录下加东西就可以了，`app.js`保持不变。

### 参考源码

[url-koa](https://github.com/michaelliao/learn-javascript/tree/master/samples/node/web/koa/url-koa)

[url2-koa](https://github.com/michaelliao/learn-javascript/tree/master/samples/node/web/koa/url2-koa)

### Nunjucks

Nunjucks是什么东东？其实它是一个模板引擎。

那什么是模板引擎？

模板引擎就是基于模板配合数据构造出字符串输出的一个组件。比如下面的函数就是一个模板引擎：

```js
function examResult (data) {
    return `${data.name}同学一年级期末考试语文${data.chinese}分，数学${data.math}分，位于年级第${data.ranking}名。`
}
```

如果我们输入数据如下：

```js
examResult({
    name: '小明',
    chinese: 78,
    math: 87,
    ranking: 999
});
```

该模板引擎把模板字符串里面对应的变量替换以后，就可以得到以下输出：

```
小明同学一年级期末考试语文78分，数学87分，位于年级第999名。
```

模板引擎最常见的输出就是输出网页，也就是HTML文本。当然，也可以输出任意格式的文本，比如Text，XML，Markdown等等。

有同学要问了：既然JavaScript的模板字符串可以实现模板功能，那为什么我们还需要另外的模板引擎？

因为JavaScript的模板字符串必须写在JavaScript代码中，要想写出新浪首页这样复杂的页面，是非常困难的。

输出HTML有几个特别重要的问题需要考虑：

#### 转义

对特殊字符要转义，避免受到XSS攻击。比如，如果变量`name`的值不是`小明`，而是`小明<script>...</script>`，模板引擎输出的HTML到了浏览器，就会自动执行恶意JavaScript代码。

#### 格式化

对不同类型的变量要格式化，比如，货币需要变成`12,345.00`这样的格式，日期需要变成`2016-01-01`这样的格式。

#### 简单逻辑

模板还需要能执行一些简单逻辑，比如，要按条件输出内容，需要if实现如下输出：

```js
{{ name }}同学，
{% if score >= 90 %}
    成绩优秀，应该奖励
{% elif score >=60 %}
    成绩良好，继续努力
{% else %}
    不及格，建议回家打屁股
{% endif %}
```

所以，我们需要一个功能强大的模板引擎，来完成页面输出的功能。

### Nunjucks

我们选择Nunjucks作为模板引擎。Nunjucks是Mozilla开发的一个纯JavaScript编写的模板引擎，既可以用在Node环境下，又可以运行在浏览器端。但是，主要还是运行在Node环境下，因为浏览器端有更好的模板解决方案，例如MVVM框架。

如果你使用过Python的模板引擎[jinja2](https://www.liaoxuefeng.com/wiki/1016959663602400/1017806952856928)，那么使用Nunjucks就非常简单，两者的语法几乎是一模一样的，因为Nunjucks就是用JavaScript重新实现了jinjia2。

从上面的例子我们可以看到，虽然模板引擎内部可能非常复杂，但是使用一个模板引擎是非常简单的，因为本质上我们只需要构造这样一个函数：

```
function render(view, model) {
    // TODO:...
}
```

其中，`view`是模板的名称（又称为视图），因为可能存在多个模板，需要选择其中一个。`model`就是数据，在JavaScript中，它就是一个简单的Object。`render`函数返回一个字符串，就是模板的输出。

下面我们来使用Nunjucks这个模板引擎来编写几个HTML模板，并且用实际数据来渲染模板并获得最终的HTML输出。

我们创建一个`use-nunjucks`的VS Code工程结构如下：

```
use-nunjucks/
|
+- .vscode/
|  |
|  +- launch.json <-- VSCode 配置文件
|
+- views/
|  |
|  +- hello.html <-- HTML模板文件
|
+- app.js <-- 入口js
|
+- package.json <-- 项目描述文件
|
+- node_modules/ <-- npm安装的所有依赖包
```

其中，模板文件存放在`views`目录中。

我们先在`package.json`中添加`nunjucks`的依赖：

```
"nunjucks": "2.4.2"
```

注意，模板引擎是可以独立使用的，并不需要依赖koa。用`npm install`安装所有依赖包。

紧接着，我们要编写使用Nunjucks的函数`render`。怎么写？方法是查看Nunjucks的[官方文档](http://mozilla.github.io/nunjucks/)，仔细阅读后，在`app.js`中编写代码如下：

```js
const nunjucks = require('nunjucks');

function createEnv(path, opts) {
    var
        autoescape = opts.autoescape === undefined ? true : opts.autoescape,
        noCache = opts.noCache || false,
        watch = opts.watch || false,
        throwOnUndefined = opts.throwOnUndefined || false,
        env = new nunjucks.Environment(
            new nunjucks.FileSystemLoader('views', {
                noCache: noCache,
                watch: watch,
            }), {
                autoescape: autoescape,
                throwOnUndefined: throwOnUndefined
            });
    if (opts.filters) {
        for (var f in opts.filters) {
            env.addFilter(f, opts.filters[f]);
        }
    }
    return env;
}

var env = createEnv('views', {
    watch: true,
    filters: {
        hex: function (n) {
            return '0x' + n.toString(16);
        }
    }
});
```

变量`env`就表示Nunjucks模板引擎对象，它有一个`render(view, model)`方法，正好传入`view`和`model`两个参数，并返回字符串。

创建`env`需要的参数可以查看文档获知。我们用`autoescape = opts.autoescape && true`这样的代码给每个参数加上默认值，最后使用`new nunjucks.FileSystemLoader('views')`创建一个文件系统加载器，从`views`目录读取模板。

我们编写一个`hello.html`模板文件，放到`views`目录下，内容如下：

```html
<h1>Hello {{ name }}</h1>
```

然后，我们就可以用下面的代码来渲染这个模板：

```js
var s = env.render('hello.html', { name: '小明' });
console.log(s);
```

获得输出如下：

```html
<h1>Hello 小明</h1>
```

咋一看，这和使用JavaScript模板字符串没啥区别嘛。不过，试试：

```js
var s = env.render('hello.html', { name: '<script>alert("小明")</script>' });
console.log(s);
```

获得输出如下：

```jsx
<h1>Hello &lt;script&gt;alert("小明")&lt;/script&gt;</h1>
```

这样就避免了输出恶意脚本。

此外，可以使用Nunjucks提供的功能强大的tag，编写条件判断、循环等功能，例如：

```jsx
<!-- 循环输出名字 -->
<body>
    <h3>Fruits List</h3>
    {% for f in fruits %}
    <p>{{ f }}</p>
    {% endfor %}
</body>
```

Nunjucks模板引擎最强大的功能在于模板的继承。仔细观察各种网站可以发现，网站的结构实际上是类似的，头部、尾部都是固定格式，只有中间页面部分内容不同。如果每个模板都重复头尾，一旦要修改头部或尾部，那就需要改动所有模板。

更好的方式是使用继承。先定义一个基本的网页框架`base.html`：

```
<html><body>
{% block header %} <h3>Unnamed</h3> {% endblock %}
{% block body %} <div>No body</div> {% endblock %}
{% block footer %} <div>copyright</div> {% endblock %}
</body>
```

`base.html`定义了三个可编辑的块，分别命名为`header`、`body`和`footer`。子模板可以有选择地对块进行重新定义：

```
{% extends 'base.html' %}

{% block header %}<h1>{{ header }}</h1>{% endblock %}

{% block body %}<p>{{ body }}</p>{% endblock %}
```

然后，我们对子模板进行渲染：

```
console.log(env.render('extend.html', {
    header: 'Hello',
    body: 'bla bla bla...'
}));
```

输出HTML如下：

```html
<html><body>
<h1>Hello</h1>
<p>bla bla bla...</p>
<div>copyright</div> <-- footer没有重定义，所以仍使用父模板的内容
</body>
```

### 性能

最后我们要考虑一下Nunjucks的性能。

对于模板渲染本身来说，速度是非常非常快的，因为就是拼字符串嘛，纯CPU操作。

性能问题主要出现在从文件读取模板内容这一步。这是一个IO操作，在Node.js环境中，我们知道，单线程的JavaScript最不能忍受的就是同步IO，但Nunjucks默认就使用同步IO读取模板文件。

好消息是Nunjucks会缓存已读取的文件内容，也就是说，模板文件最多读取一次，就会放在内存中，后面的请求是不会再次读取文件的，只要我们指定了`noCache: false`这个参数。

在开发环境下，可以关闭cache，这样每次重新加载模板，便于实时修改模板。在生产环境下，一定要打开cache，这样就不会有性能问题。

Nunjucks也提供了异步读取的方式，但是这样写起来很麻烦，有简单的写法我们就不会考虑复杂的写法。保持代码简单是可维护性的关键。

### 参考源码

[use-nunjucks](https://github.com/michaelliao/learn-javascript/tree/master/samples/node/web/koa/use-nunjucks)

### MVC

我们已经可以用koa处理不同的URL，还可以用Nunjucks渲染模板。现在，是时候把这两者结合起来了！

当用户通过浏览器请求一个URL时，koa将调用某个异步函数处理该URL。在这个异步函数内部，我们用一行代码：

```
ctx.render('home.html', { name: 'Michael' });
```

通过Nunjucks把数据用指定的模板渲染成HTML，然后输出给浏览器，用户就可以看到渲染后的页面了：

![mvc](https://www.liaoxuefeng.com/files/attachments/1100575804488000/l)

这就是传说中的MVC：Model-View-Controller，中文名“模型-视图-控制器”。

异步函数是C：Controller，Controller负责业务逻辑，比如检查用户名是否存在，取出用户信息等等；

包含变量`{{ name }}`的模板就是V：View，View负责显示逻辑，通过简单地替换一些变量，View最终输出的就是用户看到的HTML。

MVC中的Model在哪？Model是用来传给View的，这样View在替换变量的时候，就可以从Model中取出相应的数据。

上面的例子中，Model就是一个JavaScript对象：

```
{ name: 'Michael' }
```

下面，我们根据原来的`url2-koa`创建工程`view-koa`，把koa2、Nunjucks整合起来，然后，把原来直接输出字符串的方式，改为`ctx.render(view, model)`的方式。

工程`view-koa`结构如下：

```
view-koa/
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
+- controller.js <-- 扫描注册Controller
|
+- app.js <-- 使用koa的js
|
+- package.json <-- 项目描述文件
|
+- node_modules/ <-- npm安装的所有依赖包
```

在`package.json`中，我们将要用到的依赖包有：

```
"koa": "2.0.0",
"koa-bodyparser": "3.2.0",
"koa-router": "7.0.0",
"nunjucks": "2.4.2",
"mime": "1.3.4",
"mz": "2.4.0"
```

先用`npm install`安装依赖包。

然后，我们准备编写以下两个Controller：

#### 处理首页 GET /

我们定义一个async函数处理首页URL`/`：

```
async (ctx, next) => {
    ctx.render('index.html', {
        title: 'Welcome'
    });
}
```

注意到koa并没有在`ctx`对象上提供`render`方法，这里我们假设应该这么使用，这样，我们在编写Controller的时候，最后一步调用`ctx.render(view, model)`就完成了页面输出。

#### 处理登录请求 POST /signin

我们再定义一个async函数处理登录请求`/signin`：

```
async (ctx, next) => {
    var
        email = ctx.request.body.email || '',
        password = ctx.request.body.password || '';
    if (email === 'admin@example.com' && password === '123456') {
        // 登录成功:
        ctx.render('signin-ok.html', {
            title: 'Sign In OK',
            name: 'Mr Node'
        });
    } else {
        // 登录失败:
        ctx.render('signin-failed.html', {
            title: 'Sign In Failed'
        });
    }
}
```

由于登录请求是一个POST，我们就用`ctx.request.body.<name>`拿到POST请求的数据，并给一个默认值。

登录成功时我们用`signin-ok.html`渲染，登录失败时我们用`signin-failed.html`渲染，所以，我们一共需要以下3个View：

- index.html
- signin-ok.html
- signin-failed.html

### 编写View

在编写View的时候，我们实际上是在编写HTML页。为了让页面看起来美观大方，使用一个现成的CSS框架是非常有必要的。我们用[Bootstrap](http://getbootstrap.com/)这个CSS框架。从首页下载zip包后解压，我们把所有静态资源文件放到`/static`目录下：

```
view-koa/
|
+- static/
   |
   +- css/ <- 存放bootstrap.css等
   |
   +- fonts/ <- 存放字体文件
   |
   +- js/ <- 存放bootstrap.js等   
```

这样我们在编写HTML的时候，可以直接用Bootstrap的CSS，像这样：

```
<link rel="stylesheet" href="/static/css/bootstrap.css">
```

现在，在使用MVC之前，第一个问题来了，如何处理静态文件？

我们把所有静态资源文件全部放入`/static`目录，目的就是能统一处理静态文件。在koa中，我们需要编写一个middleware，处理以`/static/`开头的URL。

### 编写middleware

我们来编写一个处理静态文件的middleware。编写middleware实际上一点也不复杂。我们先创建一个`static-files.js`的文件，编写一个能处理静态文件的middleware：

```
const path = require('path');
const mime = require('mime');
const fs = require('mz/fs');

// url: 类似 '/static/'
// dir: 类似 __dirname + '/static'
function staticFiles(url, dir) {
    return async (ctx, next) => {
        let rpath = ctx.request.path;
        // 判断是否以指定的url开头:
        if (rpath.startsWith(url)) {
            // 获取文件完整路径:
            let fp = path.join(dir, rpath.substring(url.length));
            // 判断文件是否存在:
            if (await fs.exists(fp)) {
                // 查找文件的mime:
                ctx.response.type = mime.lookup(rpath);
                // 读取文件内容并赋值给response.body:
                ctx.response.body = await fs.readFile(fp);
            } else {
                // 文件不存在:
                ctx.response.status = 404;
            }
        } else {
            // 不是指定前缀的URL，继续处理下一个middleware:
            await next();
        }
    };
}

module.exports = staticFiles;
```

`staticFiles`是一个普通函数，它接收两个参数：URL前缀和一个目录，然后返回一个async函数。这个async函数会判断当前的URL是否以指定前缀开头，如果是，就把URL的路径视为文件，并发送文件内容。如果不是，这个async函数就不做任何事情，而是简单地调用`await next()`让下一个middleware去处理请求。

我们使用了一个`mz`的包，并通过`require('mz/fs');`导入。`mz`提供的API和Node.js的`fs`模块完全相同，但`fs`模块使用回调，而`mz`封装了`fs`对应的函数，并改为Promise。这样，我们就可以非常简单的用`await`调用`mz`的函数，而不需要任何回调。

所有的第三方包都可以通过npm官网搜索并查看其文档：

https://www.npmjs.com/

最后，这个middleware使用起来也很简单，在`app.js`里加一行代码：

```
let staticFiles = require('./static-files');
app.use(staticFiles('/static/', __dirname + '/static'));
```

*注意*：也可以去npm搜索能用于koa2的处理静态文件的包并直接使用。

### 集成Nunjucks

集成Nunjucks实际上也是编写一个middleware，这个middleware的作用是给`ctx`对象绑定一个`render(view, model)`的方法，这样，后面的Controller就可以调用这个方法来渲染模板了。

我们创建一个`templating.js`来实现这个middleware：

```
const nunjucks = require('nunjucks');

function createEnv(path, opts) {
    var
        autoescape = opts.autoescape === undefined ? true : opts.autoescape,
        noCache = opts.noCache || false,
        watch = opts.watch || false,
        throwOnUndefined = opts.throwOnUndefined || false,
        env = new nunjucks.Environment(
            new nunjucks.FileSystemLoader(path || 'views', {
                noCache: noCache,
                watch: watch,
            }), {
                autoescape: autoescape,
                throwOnUndefined: throwOnUndefined
            });
    if (opts.filters) {
        for (var f in opts.filters) {
            env.addFilter(f, opts.filters[f]);
        }
    }
    return env;
}

function templating(path, opts) {
    // 创建Nunjucks的env对象:
    var env = createEnv(path, opts);
    return async (ctx, next) => {
        // 给ctx绑定render函数:
        ctx.render = function (view, model) {
            // 把render后的内容赋值给response.body:
            ctx.response.body = env.render(view, Object.assign({}, ctx.state || {}, model || {}));
            // 设置Content-Type:
            ctx.response.type = 'text/html';
        };
        // 继续处理请求:
        await next();
    };
}

module.exports = templating;
```

注意到`createEnv()`函数和前面使用Nunjucks时编写的函数是一模一样的。我们主要关心`tempating()`函数，它会返回一个middleware，在这个middleware中，我们只给`ctx`“安装”了一个`render()`函数，其他什么事情也没干，就继续调用下一个middleware。

使用的时候，我们在`app.js`添加如下代码：

```
const isProduction = process.env.NODE_ENV === 'production';

app.use(templating('views', {
    noCache: !isProduction,
    watch: !isProduction
}));
```

这里我们定义了一个常量`isProduction`，它判断当前环境是否是production环境。如果是，就使用缓存，如果不是，就关闭缓存。在开发环境下，关闭缓存后，我们修改View，可以直接刷新浏览器看到效果，否则，每次修改都必须重启Node程序，会极大地降低开发效率。

Node.js在全局变量`process`中定义了一个环境变量`env.NODE_ENV`，为什么要使用该环境变量？因为我们在开发的时候，环境变量应该设置为`'development'`，而部署到服务器时，环境变量应该设置为`'production'`。在编写代码的时候，要根据当前环境作不同的判断。

*注意*：生产环境上必须配置环境变量`NODE_ENV = 'production'`，而开发环境不需要配置，实际上`NODE_ENV`可能是`undefined`，所以判断的时候，不要用`NODE_ENV === 'development'`。

类似的，我们在使用上面编写的处理静态文件的middleware时，也可以根据环境变量判断：

```
if (! isProduction) {
    let staticFiles = require('./static-files');
    app.use(staticFiles('/static/', __dirname + '/static'));
}
```

这是因为在生产环境下，静态文件是由部署在最前面的反向代理服务器（如Nginx）处理的，Node程序不需要处理静态文件。而在开发环境下，我们希望koa能顺带处理静态文件，否则，就必须手动配置一个反向代理服务器，这样会导致开发环境非常复杂。

### 编写View

在编写View的时候，非常有必要先编写一个`base.html`作为骨架，其他模板都继承自`base.html`，这样，才能大大减少重复工作。

编写HTML不在本教程的讨论范围之内。这里我们参考Bootstrap的官网简单编写了`base.html`。

### 运行

一切顺利的话，这个`view-koa`工程应该可以顺利运行。运行前，我们再检查一下`app.js`里的middleware的顺序：

第一个middleware是记录URL以及页面执行时间：

```
app.use(async (ctx, next) => {
    console.log(`Process ${ctx.request.method} ${ctx.request.url}...`);
    var
        start = new Date().getTime(),
        execTime;
    await next();
    execTime = new Date().getTime() - start;
    ctx.response.set('X-Response-Time', `${execTime}ms`);
});
```

第二个middleware处理静态文件：

```
if (! isProduction) {
    let staticFiles = require('./static-files');
    app.use(staticFiles('/static/', __dirname + '/static'));
}
```

第三个middleware解析POST请求：

```
app.use(bodyParser());
```

第四个middleware负责给`ctx`加上`render()`来使用Nunjucks：

```
app.use(templating('view', {
    noCache: !isProduction,
    watch: !isProduction
}));
```

最后一个middleware处理URL路由：

```
app.use(controller());
```

现在，在VS Code中运行代码，不出意外的话，在浏览器输入`localhost:3000/`，可以看到首页内容：

![koa-index](https://www.liaoxuefeng.com/files/attachments/1100575873273408/l)

直接在首页登录，如果输入正确的Email和Password，进入登录成功的页面：

![koa-signin-ok](https://www.liaoxuefeng.com/files/attachments/1100575896762496/l)

如果输入的Email和Password不正确，进入登录失败的页面：

![koa-signin-failed](https://www.liaoxuefeng.com/files/attachments/1100575918131328/l)

怎么判断正确的Email和Password？目前我们在`signin.js`中是这么判断的：

```
if (email === 'admin@example.com' && password === '123456') {
    ...
}
```

当然，真实的网站会根据用户输入的Email和Password去数据库查询并判断登录是否成功，不过这需要涉及到Node.js环境如何操作数据库，我们后面再讨论。

### 扩展

注意到`ctx.render`内部渲染模板时，Model对象并不是传入的model变量，而是：

```
Object.assign({}, ctx.state || {}, model || {})
```

这个小技巧是为了扩展。

首先，`model || {}`确保了即使传入`undefined`，model也会变为默认值`{}`。`Object.assign()`会把除第一个参数外的其他参数的所有属性复制到第一个参数中。第二个参数是`ctx.state || {}`，这个目的是为了能把一些公共的变量放入`ctx.state`并传给View。

例如，某个middleware负责检查用户权限，它可以把当前用户放入`ctx.state`中：

```
app.use(async (ctx, next) => {
    var user = tryGetUserFromCookie(ctx.request);
    if (user) {
        ctx.state.user = user;
        await next();
    } else {
        ctx.response.status = 403;
    }
});
```

这样就没有必要在每个Controller的async函数中都把user变量放入model中。

### 参考源码

[view-koa](https://github.com/michaelliao/learn-javascript/tree/master/samples/node/web/koa/view-koa)





## koa基础

### 2. 中间件

koa是从第一个中间件开始执行，遇到 await next() 进入下一个中间件，一直执行到最后一个中间件，在逆序，执行上一个中间件，一直到第一个中间件执行结束才发出响应。

#### 2.1 自定义中间件

创建文件夹middleware存放各种自定义中间件；
创建文件 koa-pv.js:

```
// 自定义中间件 koa-pv

function pv (ctx) {
    global.console.log('当前路由', ctx.path) // 打印当前路由，node中全局不能用window，需要用global代替
}

module.exports = function () {
    return async function(ctx, next) {
        pv(ctx)
        await next() // 每个中间件都必须有这一句，用以执行下一个中间件
    }
}
```

然后，在app.js中引入中间件

```
const pv = require('./middleware/koa-pv')

app.use(pv())
```

### 3. mongoose的使用

#### 3.1 判断是否安装了mongo:

```
$ which mongod
```

#### 3.2 运行 MongoDB

```
$ sudo mongod  

<!--

首先创建一个数据库存储目录 /data/db：

sudo mkdir -p /data/db

启动 mongodb，默认数据库目录即为 /data/db

参考：http://www.runoob.com/mongodb/mongodb-osx-install.html

如果已经有进程27017，需要先停止：

停止进程：
    lsof -i :27017
    kill  -9 3243
-->
```

#### 3.3 配置mongoose

在文件夹dbs中创建文件 config.js:

```
// 配置mongo 地址
module.exports =  {
    dbs: 'mongodb://127.0.0.1:27017/dbs'
}
```

#### 3.4 创建数据表

在文件dbs 中创建文件夹models 用来存放不同的数据表。
创建文件person.js, 文件名person即为数据表名称。

person.js:

```
const mongoose = require('mongoose')

// 创建数据表模型，该文件的名字，即person，就是数据表的名字
// 下面给 person 表声明两个字段name和age

let personSchema = new mongoose.Schema({
    name: String,
    age: Number
})

// 通过建 model 给 person 赋予增删改查等读写的功能
module.exports = mongoose.model('Person', personSchema)
```

#### 3.5 连接koa2和mongoose

```
// 一、引入mongoose
const mongoose = require('mongoose')
const dbConfig = require('./dbs/config')


// 二、 连接数据库的服务
mongoose.connect(dbConfig.dbs, {
  useNewUrlParser: true
})
```

#### 3.6 通过mongoose进行数据的增删改查

进入文件 routes/uses.js:

```js
const router = require('koa-router')()
// 引入mongo模型
const Person = require('../dbs/models/person')

router.prefix('/users')

router.get('/', function (ctx, next) {
  ctx.body = 'this is a users response!'
})

router.get('/bar', function (ctx, next) {
  ctx.body = 'this is a users/bar response'
})


/**
 *  一、 增加 内容 向person数据模型中
 *
 *     可以通过命令行执行：curl -d 'name=cck&age=27' http://localhost:3000/users/addPerson
 *     若返回: {
                "code": 0
              }
       证明添加数据成功。

       注意： save()方法是model自带的写入数据的方法, 通过实例 person 写入
 */

router.post('/addPerson', async function (ctx) {
  // 创建实例
  const person = new Person({
    name: ctx.request.body.name,
    age: ctx.request.body.age
  })

  let code = 0 // 状态码

  try {
    await person.save()
    code = 0
  } catch(e) {
    code = -1
  }

  // 返回状态（成功为0， 错误为-1）
  ctx.body = {
    code
  }
})

/**
 *  二、 读取 内容 从person数据模型中
 *      命令行中输入：curl -d 'name=cck' http://localhost:3000/users/getPerson
 *      返回：{
                "code": 0,
                "result": {
                  "_id": "5beb91bcd6e7060ffcca6a46",
                  "name": "cck",
                  "age": 27,
                  "__v": 0
                },
                "results": [
                  {
                    "_id": "5beb91bcd6e7060ffcca6a46",
                    "name": "cck",
                    "age": 27,
                    "__v": 0
                  }
                ]
              }
 *
 *    注意： findOne()和find()方法是model自带的读取数据的方法, 注意：这里直接通过模型 Person 写入 ！！！
 *          findOne() 只是找到一条符合条件的内容
 *          find() 可以找到整个符合条件的集合(数组)
 */

router.post('/getPerson', async function (ctx) {
  const result = await Person.findOne({
    name: ctx.request.body.name
  })

  const results = await Person.find({
    name: ctx.request.body.name
  })

  // 这里没有考虑异常，直接返回了结果
  ctx.body = {
    code: 0,
    result,
    results
  }
})

/**
 *  三、 修改 内容 从person数据模型中
 *      命令行中输入：curl -d 'name=wy&age=19' http://localhost:3000/users/updatePerson
 *      返回：{
                "code": 0,
              }
 *
 *    注意： where()和update()方法是model自带的读取数据的方法, 注意：这里直接通过模型 Person 写入 ！！！
 *          where() 找到符合条件的内容
 *          update() 修改该内容
 */

router.post('/updatePerson', async function (ctx) {
  // 找到符合条件的name,并修改其age
  const result = await Person.where({
    name: ctx.request.body.name
  }).update({
    age: ctx.request.body.age
  })

  // 这里没有考虑异常，直接返回了结果
  ctx.body = {
    code: 0
  }
})

/**
 *  四、 删除 内容 从person数据模型中
 *
 *    注意： where()和update()方法是model自带的读取数据的方法, 注意：这里直接通过模型 Person 写入 ！！！
 *          where() 找到符合条件的内容
 *          remove() 删除该内容
 */

router.post('/removePerson', async function (ctx) {
  // 找到符合条件的name,并修改其age
  const result = await Person.where({
    name: ctx.request.body.name
  }).remove()

  // 这里没有考虑异常，直接返回了结果
  ctx.body = {
    code: 0
  }
})

module.exports = router
```





## 

# koa2

## 1. 安装koa脚手架

- 脚手架生成工具 `koa-generator`

```shell
npm i -g koa-generator
```

- 创建 koa 项目

  > -e 是基于 ejs 模板引擎，不写默认是使用的是pug 类似jade的模板

```javascript
koa2 myapp -e  // 创建koa2 的项目
koa -e myapp   // 创建koa1 的项目
```

- 安装依赖

```js
npm install
```

>  dbs为后来创建的操作mongo的文件目录；middleware为后来创建的自定义中间件目录

然后就是运行了

```javascript
npm run start  
```

## 2. 连接mysql

### sql语句

- 安装mysql

```undefined
cnpm install mysql --save -g
```

- 连接mysql，新建root.js文件（注意：我这里连接的是我本机的mysql）

```jsx
var mysql = require('mysql');
var connection = mysql.createConnection({
    host: 'localhost', // 连接的本地mysql
    user: 'root', // 用户名
    password: '***', // 密码
    port: '3306', // 端口号
    database: 'test' // 表名
});

connection.connect(); // 建立链接

var sql = 'select * from test'; // 查询的表名
connection.query(sql, function (err, result) {
    if (err) {
        console.log('error', err.message);
        return;
    }
    console.log('--------------------------SELECT----------------------------');
    console.log(result);
    
});

connection.end();
```

- 输出sql语句查询的结果

```css
node root.js
```



### sequelize驱动

> [sequelize](https://www.sequelize.com.cn/) 是一个基于 promise 的 Node.js ORM, 目前支持 Postgres, MySQL, MariaDB, SQLite 以及 Microsoft SQL Server. 它具有强大的事务支持, 关联关系, 预读和延迟加载,读取复制等功能。

```js
// sequelizeMysql.js
import Sequelize from 'sequelize'

const DBConfig = {
  host: 'localhost', // 服务器地址
  port: 3306, // 数据库端口号
  username: 'root', // 数据库用户名
  password: '111111', // 数据库密码
  database: 'demo', // 数据库名称
  prefix: 'api_', // 默认"api_"
}

export default new Sequelize(
  DBConfig.database,
  DBConfig.username,
  DBConfig.password,
  {
    host: DBConfig.host,
    port: DBConfig.port,
    dialect: 'mysql', // 要连接的数据库：mysql、postgres、sqlite 和 mssql 之一
    pool: {
      max: 50, // 池中最大连接数 默认：5
      min: 0, // 池中最小连接数 默认：0
      idle: 10000, // 连接在被释放之前可以空闲的最长时间（以毫秒为单位）默认：10000
    },
    timezone: '+08:00',
  }
)

```

```js
//创建表模型
// UserModel.js
import Sequelize from 'sequelize'
import sequelizeMysql from '../utils/sequelizeMysql'

// 创建 model
const User = sequelizeMysql.define(
  'user',
  {
    id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV1,
      primaryKey: true,
    },
    username: {
      type: Sequelize.STRING(255),
      allowNull: false, // allowNull不设置默认为true
    },
    avatarUrl: {
      type: Sequelize.STRING(255),
      field: 'avatar_url', // 自定义表中的列名称
    },
    createtime: {
      type: Sequelize.STRING(255),
      defaultValue: Date.now(),
    },
    isdelete: {
      type: Sequelize.INTEGER,
      defaultValue: 0,
      allowNull: false,
    },
  },
  {
    // true 表名称和 model 相同: user
    // false 创建表名称会是复数: users
    freezeTableName: true,
    // 是否使用默认的 createdAt updatedAt
    timestamps: false,
  }
)

// 创建表
User.sync({ force: false })

export default User
```

```js
//读写操作
// UserDao.js
import UserModel from '../model/UserModel'

export default class UserDao {
  // 查询用户
  async findById(data) {
    const { id } = data
    return await UserModel.findAll({
      attributes: { exclude: ['isdelete'] }, // exclude: 返回值排除字段
      where: {
        isdelete: 0,
        id,
      },
    })
  }
  // 添加用户
  async add(data) {
    return await UserModel.create(data)
  }
}
```



## 4.配置

### - 配置环境变量

https://blog.csdn.net/qq_25804071/article/details/68954130



### - 配置swagger-jsdoc

```shell
npm install swagger-jsdoc koa2-swagger-ui --save
```

**新建swagger.js**

```js
const router = require('koa-router')()
const jsdoc = require('swagger-jsdoc')
const path = require('path')

const swaggerDefinition = {
    info: {
        title: 'API文档',
        version: '1.0',
        description: '文档',
    },
    host: 'localhost:8000',//localhost:8000/swagger
    basePath: '/'
};
const options = {
    swaggerDefinition,
    apis: ['./controller/*.js'],
};
const swaggerSpec = jsdoc(options)
// 通过路由获取生成的注解文件
router.get('/swagger.json', async function (ctx) {
    ctx.set('Content-Type', 'application/json');
    ctx.body = swaggerSpec;
})
module.exports = router
```

**修改app.js**

```js
const swagger = require('./service/swagger.js')
const { koaSwagger } = require('koa2-swagger-ui')

app.use(swagger.routes(), swagger.allowedMethods())
app.use(koaSwagger({
  routePrefix: '/swagger', // api文档访问地址
  swaggerOptions: {
    url: '/swagger.json', // example path to json
  }
}))
```

**接口配置**

```js
/**
 * @swagger
 * /getNum:
 *   get:
 *     tags:
 *       - tes
 *     summary: 测试
 *     parameters:
 *       - name: num
 *         description: 数量
 *         type: integer
 */
router.get('/getNum', async (ctx, next) => {
	console.log(ctx.query.num)
	ctx.body = ctx.query.num
})
```

**查看效果**

打开本地`http://localhost:3000/swagger`

### - 配置swagger-decorator

> 介绍几种基于 swagger 的维护项目接口文档的方式，并分析各种方式的优劣，并且提出了一种基于decorator来自动生成swagger json文档的方法
>
> https://zhuanlan.zhihu.com/p/37837618

1. 引入

```js
import { SwaggerRouter } from 'koa-swagger-decorator';
import * as path from 'path'

const router = new SwaggerR
outer();

// swagger docs avaliable at http://localhost:3000/swagger-html
router.swagger({
    title: '排课系统',
    description: 'API DOC',
    version: '1.0.0'
});

// 查找对应目录下的controller类
router.mapDir(path.resolve(__dirname, '../api/'));

export default router;
```

这是router配置的地方mapDir会去你指定的文件下面找对应注册api方法的class，再将对应api方法注册到路由上。这里，他其实就是对koa-router的一个装饰器函数的封装。值得一提的是，这边许多函数的装饰器都用了ramda进行[柯里化](https://www.zhihu.com/search?q=柯里化&search_source=Entity&hybrid_search_source=Entity&hybrid_search_extra={"sourceType"%3A"article"%2C"sourceId"%3A"140457829"})。

router初始化方法写完了之前，需要把它倒入到主函数里，这里和我们koa-router的引入方式是一样的：

```text
app.use(router.routes())
   .use(router.allowedMethods());
```

这样，router的初始化就完成了。接下来就是我们接口的地方，这边以mongodb为例，schema和modal模块的话我们不需要做特殊处理，需要处理的其实就是api实现的方法类里面。我们拿User这里模块来说。decorator这要是对类或者类中的方法，属性进行一个包装（其实就是一个高阶函数的处理）。

```js
const userSchema = {
    username: { type: 'string', required: true },
    password: { type: 'string', required: true }
}    

    @request('post', '/register')
    @summary('注册')
    @tag
    @responses({ 200: { description: 'success' }, 400: { description: 'error' } })
    @body(userSchema)
    public async register(ctx: any) {
        const params = ctx.request.query;
        try {
            if (params.password && params.password === params.passwordConfim) {
                let result = await User.create({ ...params });
                ctx.body = { code: 200, msg: "成功", data: result };
            }
        } catch (err) {
            console.log(err);
        }
    };
//1.request	 是必须的，它其实就是为你提供了router.get('/register', ()=>{ 需要执行的逻辑 })；
//2.summary	提供了一个头部的注释
//3.description	提供较详细的接口描述
//4.responses	response返回结果的描述
//5.body	提供请求参数到body
//6.query	提供请求参数到query中
```

### 注解式路由工具 koa-swagger-decorator

### 1. 需引入 babel 支持

```json
// npm install --save-dev babel-plugin-transform-decorators-legacy
// .babelrc
{
  "presets": [["env", { "targets": { "node": "current" } }]],
  "plugins": ["transform-decorators-legacy"]
}
```

### 2. 写入配置

```javascript
// SwaggerRouter.js
import { SwaggerRouter } from 'koa-swagger-decorator'
import * as path from 'path'

const router = new SwaggerRouter()
// swagger 文档地址： http://localhost:3000/api/swagger-html
router.swagger({
  title: 'A project',
  description: 'Api doc',
  version: '1.0.0',
})

// 查找对应目录下的controller类: 会将 controller 文件夹下的注解式接口生成一个个的 router
router.mapDir(path.resolve(__dirname, '../controller/'))

export default router

// app.js
import router from './router/SwaggerRouter'
app.use(router.routes())
```

[![img](https://img2020.cnblogs.com/blog/1855591/202108/1855591-20210826165025381-1001811507.png)](https://img2020.cnblogs.com/blog/1855591/202108/1855591-20210826165025381-1001811507.png)

### 3. controller 下接口写法

```javascript
// UserController.js
import {
  request,
  summary,
  description, // 接口名称下方的描述信息
  query, // get时参数
  path, // post, put, delete 时地址栏参数
  body, // body中的参数
  tags,
} from 'koa-swagger-decorator'
// 引入我的业务操作
import UserService from '../service/UserService'

const userService = new UserService()
const tag = tags(['User'])

export default class UserController {
  @request('post', '/user/findById')
  @summary('根据id查询用户数据')
  @tag
  @body({
    id: { type: 'string', required: true },
  })
  async findById(ctx) {
    const bObj = ctx.request.body
    const data = await userService.findById(bObj)
    ctx.rest(data)
  }
}
```

## 总结

[ koa-swagger-decorator ](https://link.zhihu.com/?target=https%3A//github.com/Cody2333/koa-swagger-decorator)开箱即用的特点省去了我们 不少写decorator的工程，但这也造成了它的一个缺点：入侵性很强，二次开发变得不那么灵活。当然对于我们想要速成的项目来说还是挺方便的。



## 5.项目实操

### 项目目录

> https://www.jianshu.com/p/47259f48c153  参考项目结构搭建过程，[仓库](https://github.com/bayi-lzp/koa-template/blob/master/README.md )

```js
├─.gitignore                // 忽略文件配置
├─app.js                    // 应用入口
├─config                 // 公共配置文件
├─views                    // 应用入口
|   ├─dev.js                 
|   ├─prd.js              
|   ├─test.js              
|   └index.js             // 根据环境变量返回对应配置
├─ecosystem.config.js       // pm2配置文件
├─package.json              // 依赖文件配置
├─README.md                 // README.md文档
├─routes                    // 路由
|   ├─private.js                // 校验接口
|   └public.js                  // 公开接口
├─models                    // 数据库配置及模型
|   ├─index.js                  // 数据库配置
|   └user.js                    // 用户的schema文件
├─middlewares               // 中间件
|      ├─cors.js                // 跨域中间件
|      ├─jwt.js                 // jwt中间件
|      ├─logger.js              // 日志打印中间件
|      └response.js             // 响应及异常处理中间件
├─logs                      // 日志目录
|  └─koa-template.log
├─lib                       // 工具库
|  ├─error.js                   // 异常处理
|  ├─utils.js                   // 自定义方法
|  └mongoDB.js                  // mongoDB配置
├─controllers               // 操作业务逻辑
|      ├─index.js               // 配置
|      ├─login.js               // 登录
|      └test.js                 // 测试
├─services               // 操作数据库
|      ├─index.js               // 配置
|      ├─user.js               // 用户
├─bin                       // 启动目录
|  └www                         // 启动文件配置
```

### 中间件

> https://www.jianshu.com/p/9a04e809f393 中间件介绍

在middleware文件夹中创建三个文件，分别是koa_response_data.js、koa_response_duration.js、koa_response_header.js

这三个文件代表三个中间件：

koa_response_data.js：处理业务逻辑的中间件,读取某个json文件的数据

![img](https://img-blog.csdnimg.cn/20201122212655393.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2xpYW5nbWVuZ2Jr,size_16,color_FFFFFF,t_70)



koa_response_duration.js：计算服务器消耗时长的中间件

![img](https://img-blog.csdnimg.cn/2020112221271463.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2xpYW5nbWVuZ2Jr,size_16,color_FFFFFF,t_70)

 

koa_response_header.js：设置响应头的中间件

![img](https://img-blog.csdnimg.cn/202011222127323.png)

 

接下来创建工具方法，在utils文件夹中创建file_utils.js文件，读取json文件的数据，返回给中间件。

![img](https://img-blog.csdnimg.cn/20201122212932489.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2xpYW5nbWVuZ2Jr,size_16,color_FFFFFF,t_70)

 

以上代码编写完成后，接着完成app.js的功能，在入口文件中，需要完成四个事情：创建koa的实例对象、绑定中间件、绑定端口号、允许跨域请求。

 ![img](https://img-blog.csdnimg.cn/2020112221455950.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2xpYW5nbWVuZ2Jr,size_16,color_FFFFFF,t_70)



3、在server目录中输入咱们要查询的sql语句，然后把查询到的内容return出去

```jsx
test: async () => { // 如果函数没使用async 函数内部不可以使用await; 
//async 确保了返回值是一个promise
//await 不能再顶部作用域，等待await后面的内容返回之后才会执行下面的操作
        const task_countSql = mysql.getSql("select * from test", []);
        let data = await mysql.operateDB(task_countSql, []);
        console.log(data);
        return {
            code: 0,
            message: '成功',
            list: data
        };
    },
```

### 路由

- #### 不同请求方式

```js
// Koa-router 请求方式： get 、 put 、 post 、 patch 、 delete 、 del ，而使用方法就是 router.方式() ，比如 router.get() 和 router.post() 。
//而 router.all() 会匹配所有的请求方法

// 指定一个url匹配
router.get('/', async (ctx) => {
    ctx.type = 'html';
    ctx.body = '<h1>hello world!</h1>';
})
    .get("/users", async (ctx) => {
        ctx.body = '获取用户列表';
    })
    .get("/users/:id", async (ctx) => {
        const { id } = ctx.params
        ctx.body = `获取id为${id}的用户`;
    })
    .post("/users", async (ctx) => {
        ctx.body = `创建用户`;
    })
    .put("/users/:id", async (ctx) => {
        const { id } = ctx.params
        ctx.body = `修改id为${id}的用户`;
    })
    .del("/users/:id", async (ctx) => {
        const { id } = ctx.params
        ctx.body = `删除id为${id}的用户`;
    })
    .all("/users/:id", async (ctx) => {
        ctx.body = ctx.params;
    });

// ...
```

- #### 从请求参数取值

有些时候需要从请求URL上获取特定参数，主要分为两类： `params` 和 `query` 。 这两种参数获取的方式如下：

```js
//params参数
router.get('/:category/:title', (ctx, next) => {
  console.log(ctx.params);
  // => { category: 'programming', title: 'how-to-node' }
});


//query参数
router.get("/users", async (ctx) => {
    console.log('查询参数', ctx.query);
    ctx.body = '获取用户列表';
})
```



- #### 路由使用中间件

`router` 还支持使用中间件，并且可以针对特定的URL或者多个URL使用中间件：

```js
// 先后设置两个中间件
router
  .use(session())
  .use(authorize());

// 给指定地址使用中间件
router.use('/users', userAuth());

// 给数组里面的地址使用中间件
router.use(['/users', '/admin'], userAuth());

app.use(router.routes());
```



- #### 路由重定向

```js
//使用 `router.redirect(source, destination, [code])` 可以对路由进行重定向，
router.redirect('/login', 'sign-in');
```

等价于：

```js
router.all('/login', ctx => {
  ctx.redirect('/sign-in');
  ctx.status = 301;
});
```





5、浏览器访问接口，看输出内容

```json
{
  "data": [
    {
      "id": 1,
      "name": "nodejs in action test!!"
    }
  ]
}
```

6、在页面中请求接口

```xml
<tr>
      <td><a href="/api/test.do?a=1">/api/test.do</a></td>
      <td>测试页面访问接口:</td>
 </tr>
```

7、访问页面地址看输出

```cpp
127.0.0.1:3000/page/
//输出内容
{
  "data": [
    {
      "id": 1,
      "name": "nodejs in action test!!"
    }
  ]
}
```







## 6.项目打包

```js
// webpack.config.js
 
const path = require('path')
const webpack = require('webpack')
const _externals = require('externals-dependencies')
module.exports = {
  mode: 'production',
  devtool: 'source-map',
  cache: true,
  entry: {
    app: [
      // 如果polyfill放在这里，打包的时候将不会被external,必须在js里require才能有效external
      // 'babel-polyfill',
      './src/app.js'
    ]
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
    publicPath: '/dist/',
    chunkFilename: 'js/[id].chunk.js'
  },
  resolve: {
    extensions: ['.js']
  },
  target: 'node',
  externals: [_externals()],
  context: __dirname,
  node: {
    console: true,
    global: true,
    process: true,
    Buffer: true,
    __filename: true,
    __dirname: true,
    setImmediate: true,
    path: true
  },
  module: {
    rules: [
      {
        test: /\.js/,
        exclude: /node_modules/,
        use: ['babel-loader']
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    })
  ]
}

```

### 下面是打包后的文件

![clipboard.png](https://segmentfault.com/img/bVbuI2P?w=357&h=476)

externals具体用法可参考[这篇文章](https://segmentfault.com/a/1190000012113011)

