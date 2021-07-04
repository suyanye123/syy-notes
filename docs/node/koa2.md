# koa2学习经历

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

```
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





## 从0开始搭建api接口

### 1.创建项目，用koa脚手架生成目录结构

因为每个项目 起始阶段的配置 往往是相同的 这个时候 就可以使用脚手架 进行自动生成

项目的初始 阶段 就像 vue-cli 创建vue 项目那样

首先 先全局安装一个 koa 的脚手架工具

```
npm i -g koa-generator
```

然后是 创建 koa 项目了
-e 是基于 ejs 模板引擎
因为我学习的第一个模板引擎就是ejs 算是对它情有独钟把

```javascript
koa2 -e myapp   // 创建koa2 的项目
koa -e myapp   // 创建koa1 的项目
```

进入项目 安装依赖


![image](https://www.cnblogs.com/images/cnblogs_com/cckui/1341537/o_koa2.jpg)

dbs为后来创建的操作mongo的文件目录；middleware为后来创建的自定义中间件目录

然后就是运行了

```javascript
npm run start  
```

项目结构如下

```ruby
durian/（项目名称）
         |----  bin  
                     |---- www （启动文件）
         |----  node_modules
                     |---- 安装的各种依赖
         |----  public
                     |---- image
                     |---- style
                     |---- javascript
         |----  router
                     |---- index.js （路由）
                     |---- users.js
         |----  view  
                     |---- layout.jade（.jade 源于 Node.js 的 HTML 模板引擎，类似于.ejs模板 )
                     |---- index.jade
                     |---- error.jade
         |----  app.js
         |----  package.json
```

#### 2、连接mysql取数据

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



#### 3.项目实操

1、改造之后的项目目录长这样，如下：

```ruby
durian/（项目名称）
         |----  bin  
                     |---- www （启动文件）
         |----  dal  
                     |---- logger.js （打印logger）
         |----  logs  
                     |---- xxx （logger输出地址）
         |----  mysql  
                     |---- config.js （连接的数据库配置）
                     |---- mysql.js （sql查询等方法封装）
                     |---- pool.js （创建链接数据库）
         |----  node_modules
                     |---- 安装的各种依赖
         |----  public
                     |---- image
                     |---- style
                     |---- javascript
         |----  router
                     |---- index.js （接口路由）
                     |---- users.js
         |----  server
                     |---- index.js （sql语句）
         |----  view  
                     |---- layout.html
         |----  app.js
         |----  package.json
```

2、配置中间件

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

4、在router目录中写接口名称并把数据赋值给body

```dart
import testService from '../../../service/test/index'

export const test = {
    'path': '/test.do',
    'type': 'get',
    'control': async (ctx) => {
        const data = await testService.test();
        ctx.body = { data }
    }
}
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

8、以上所有功能代码编写完成后，可以测试下接口是否可用。

在终端中输入 `node app.js`  启动服务

参考 https://www.it610.com/article/1294597933408264192.htm



https://www.jb51.net/article/162230.htm





## 项目打包

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

