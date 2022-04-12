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

至此，一个简单的sql查询就结束了，接下来咱们修改下脚手架目录，开始开发咱们所需要的api接口；



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

场景：目前项目koa2+ts的基础上，想用swagger的功能，由于koa-swagger-decorator支持decorator的写法，可以开箱即用，所以选择了这个插件。

1. 引入

```js
import { SwaggerRouter } from 'koa-swagger-decorator';
import * as path from 'path'

const router = new SwaggerRouter();

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

```java
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
```

**1.request**

这里request是必须的，它其实就是为你提供了router.get('/register', ()=>{ 需要执行的逻辑 })；

**2.summary**

提供了一个头部的注释

**3.description**

提供较详细的接口描述

**4.responses**

response返回结果的描述

**5.body**

提供请求参数到body

**6.query**

提供请求参数到query中

更多decorator请参考文档：[https://github.com/Cody2333/koa-swagger-decorator](https://link.zhihu.com/?target=https%3A//github.com/Cody2333/koa-swagger-decorator)

## 总结

[koa-swagger-decorator](https://link.zhihu.com/?target=https%3A//github.com/Cody2333/koa-swagger-decorator)开箱即用的特点省去了我们 不少写decorator的工程，但这也造成了它的一个缺点：入侵性很强，二次开发变得不那么灵活。当然对于我们想要速成的项目来说还是挺方便的。



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

