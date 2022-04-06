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

## 2. 项目结构

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

## 3. 连接mysql

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

