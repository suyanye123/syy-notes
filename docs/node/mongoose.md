# Mongoose基本操作

## mongoose简介

在使用mongodb数据库开发项目中，nodejs环境下可能会使用到mongoose模块连接并操作mongodb数据库。mongoose模块相当于Java中的数据库驱动，例如mysql-connector-driver-xxx.jar等，大体作用都是连接数据库，对数据库中的表增删改查等。

使用方法很简单：

> npm install mongoose //在项目中安装模块

```
var mongoose = require('mongoose');//获取模块的引用
```

**在mongoose中连接数据有几种方法，有区别又有一定的联系，下面一一记录个人的理解：**

### connect()

- mongoose.connect(uri(s), [options], [options.useMongoClient], [callback])

此方法打开一个默认的mongoose连接（`Opens the default mongoose connection.`）,返回一个`MongooseThenable`对象，值得一提的是，mongoose new了一个实例作为`MongooseThenable`中的属性，一起返回，它在源码中是这样的：

```
Mongoose.prototype.connect = function() {
  var conn = this.connection;
  if ((arguments.length === 2 || arguments.length === 3) &&
      typeof arguments[0] === 'string' &&
      typeof arguments[1] === 'object' &&
      arguments[1].useMongoClient === true) {
    return conn.openUri(arguments[0], arguments[1], arguments[2]);
  }
  if (rgxReplSet.test(arguments[0]) || checkReplicaSetInUri(arguments[0])) {
    return new MongooseThenable(this, conn.openSet.apply(conn, arguments));
  }

  return new MongooseThenable(this, conn.open.apply(conn, arguments));
};
```

```
......
MongooseThenable.prototype = new Mongoose;
......
```

####  使用方法，获取连接

```
var mongoose = require('mongoose');

var URL = 'mongodb://localhost:27017/test3';

mongoose.connect(URL,function(err){
    if(err){
        console.warn('数据库连接失败：'+err);
    }else {
        console.log('数据库成功连接到：'+URL);
    }
});
```

#### 生成model，操作数据

```
//创建一个Schema
var kittenSchema = mongoose.Schema({
    name:String,
    createDate:Date
});

var Kitten = mongoose.model('kitten',kittenSchema);//生成一个model

var silence = new Kitten({name:'silence',createDate:new Date()});//创建一个实例

//保存方法，保存实例进入到数据库中
silence.save(function(err){
    if (err){
        console.log(err);
    }else{
        console.log('保存成功');
    }
});
```

> 注意： mongoose中**能够操作数据的是model**，model需要使用Schema生成，Schema定义collection字段，数据类型等

#### 在这个使用方法中，值得注意的是，connect()方法生成model的方式和返回值类型，这将是跟createConnection()最大的不同之处

### createConnection()

- mongoose.createConnection([uri], [options], [options.config], [options.config.autoIndex], [options.useMongoClient])

此方法获取数据库连接，操作database层面，**返回一个Connection对象**。Connection对象中包含model，collection，dropDatabase等操作数据库的方法，也包含connected，disconnected，error等事件触发方法。**但是没有Schema哦**

#### 1 使用方法，获取连接

```
var mongoose = require('mongoose');
var URL = 'mongodb://localhost:27017/test2';

//实际上只是创建了一个Connection对象,能够操作数据库，但是不能操作具体的document
var db = mongoose.createConnection(URL);

db.on('connected',function(err){
    if(err){
        console.log('连接数据库失败：'+err);
    }else{
        console.log('连接数据库成功！');
    }
});
```

#### 2 生成model，操作数据库

```
var Schema = mongoose.Schema;

var userSchema = new Schema({
    name:String
},{
    collection:'tb_user'
})
var User = db.model('user',userSchema);

var userModel = new User({
    name:'luoxia'
});

userModel.save(function(err,result){
    if(err){
        console.log(err);
    }else{
        console.log('保存成功！');
    }
});
```

 

#### 在这个方法中，连接数据之后并不能直接操作Schema生成model，然后操作实例保存数据，而是还需要引用mongoose中的Schema来生成model。



###  connection

connection是mongoose模块的默认引用，返回一个Connetion对象。因为connect()方法并不能监听数据库连接情况，所以，一般情况下此方法跟connet()方法搭配使用：

```
var mongoose = require('mongoose');
//var Schema = mongoose.Schema;
var URL = 'mongodb://localhost:27017/test3';

mongoose.connect(URL);

var db = mongoose.connection;//获取connection实例
//使用Connetion监听连接状态
db.on('connected',function(err){
    if(err){
        console.log('连接数据库失败：'+err);
    }else{
        console.log('连接数据库成功！');
    }
});

var userSchema = new Schema({
    name:String,
    date:Date
});
var User = mongoose.model('usert',userSchema);//默认表名：usertts

var userm = new User({
    name:'yanghao',
    date:new Date()
});
```



使用此方法，在不确定数据库是否需要多连接的情况下，也更为灵活一些



因为connect()方法并不能监听数据库连接情况,所以需要connection;

connection是mongoose模块的默认引用，返回一个Connetion对象

```js
mongoose.connect('mongodb:****');
const db = mongoose.connection;
db.on('error', function () {
    console.error('数据库连接错误!');
});
db.once('open', function () {
    console.log('数据库打开成功')
});
```

### createConnection

连接多个数据库使用createConnection 返回一个Connection对象

```js
const db = mongoose.createConnection('mongodb:****');
db.on('error', function () {
    console.error('数据库连接错误!');
});
db.once('open', function () {
    console.log('数据库打开成功')
});
```

### 两种连接方式下model的绑定

mongoose.model访问默认连接，当存在多个连接时可能无法按预期工作；当默认连接使用createConnection创建时，mongoose.model绑定失效

```js
const mongoose = require('mongoose');
mongoose.model('consult', consultSchema);
```

无论哪种连接方式使用Connection去绑定model都是没问题的

```js
const mongoose = require('mongoose');
const db = require('../database/db');
db.model('consult', consultSchema);
```

### 总结

1、createConnetion()方法的返回值是一个Connetion，虽然提供了操作collection、model等的方法，但是需要引用Schema来单独操作，也就是说在操作model之前，都需要

```
var mongoose = require('monggose');
var Schema = mongoose.Schema;
```

这两句代码来获取Schema，这应该就是使用createConnetion可以操作多个数据库的原因。 
2、connet()方法的返回值中包含了一个mongoose的引用，所以在项目中只能对一个数据库操作，不需要重新引用Schema，所以只能在操作单数据库的情况下使用；而在操作多个数据库的情况下，可以使用createConnetion()方法。 
3、connection是mongoose模块的默认连接。返回一个Connetion对象



## Model的方法（增删改查）

> 官方文档 http://www.mongoosejs.net/docs/api.html#Model

- Create   新建一个或多个文档并添加到数据库中

```
模型对象.create(文档对象，回调函数)
```

- Read 查询

```js
模型对象.find(查询条件[,投影],[options],callback(err,docs))		不管有没有数据，都返回一个数组
模型对象.findOne(查询条件[,投影],[options],callback(err,doc))     找到了返回一个对象，没找到返回null
//options 查询选项{skip:3,limit:1}    投影 “name age -_id"  设置需要获取到的字段
用 mongoose 查询文档相当容易啦，它支持 MongoDB 的高级（ rich ）查询语法。 查询文档可以用 model 的 find, findById, findOne, 和 where 这些静态方法。

Tank.find({ size: 'small' }).where('createdDate').gt(oneYearAgo).exec(callback);
```

- Update	更新

```markdown
model 的 update 方法可以修改数据库中的文档，不过不会把文档返回给应用层
如果想更新单独一条文档并且返回给应用层，可以使用 findOneAndUpdate 方法

模型对象.updateOne(查询条件,要更新的内容[,配置对象])
模型对象.updateMany(查询条件,要更新的内容[,配置对象])
## 备注：存在update方法，但是即将废弃，查询条件匹配到多个时，依然只修改一个，强烈建议用updateOne或updateMany
```

- Delete	删除

```
model 的 remove 方法可以删除所有匹配查询条件（ conditions ）的文档。
模型对象.deleteOne(查询条件)
模型对象.deleteMany(查询条件)
备注：没有delete方法，会报错！
```

- count	统计文档数量

```js
Model.count(conditions,callback(err,count))		
```

备注： 以上所有方法，如果没有指定回调函数，则返回值是一个Promise对象


备注： 以上所有方法，如果没有指定回调函数，则返回值是一个Promise对象



## 查询数据

### db.collection.find()

#### 语法

db.collection.find(querys, fields, options)

#### 参数

1. querys: 可选，使用查询操作符指定查询条件;

   ```
   db.Article.find({"article_state":"1"}) //查询Article中所有article_state值为1的数据
   ```

其中，可以添加各种查询操作符，如:$or,$in,$not等

1. fields: 指定使用投影运算符返回的字段，省略此参数返回匹配文档中的所有字段;

   ```
   {
   field1: , //1或者true表示返回字段,0或者false表示不返回该字段
   field2: 
   }
   ```

_id:默认是1，没指定返回该字段时默认会返回，设置为0时才不会返回。
注意:投影里除了_id以外，要么全是1，要么全是0，否则会报错

1. options: 指定sort，skip，limit等条件;

### 举个栗子

```
let querys = {};
let fields = { //设置fields，表示返回除了article_content之外的所有字段内容
  article_content:false
}
if(keyword != ''){
  let keywordReg = new RegExp(keyword)
  querys.$or = [ //$or条件查询
    { 'article_title': keywordReg },
    { 'article_content': keywordReg },
    { 'article_desc': keywordReg }
  ]
}
if(tag != ''){
  querys.article_tags = {$in:[tag]} //$in条件查询
}
if(state != ''){
  querys.article_state = state;
}
let options = {
  sort: {'article_update_time': '-1'}, //表示按article_update_time倒序查询
  skip: 0, //跳过0条数据
  limit: 5 //每次查询5条数据
}
let res = Article.find({querys,fields,options});
```

------

### $in $or $all查询

1. $in:满足其中一个元素的数据
   db.user.find({age: {$in:[13,73]}})
   查询到age为13或者73的数据
   db.user.find({age: {$in:[13,73]}})
   查询到age既不是13也不是73的数据
2. $or:满足其中一个字段的元素数据
   db.user.find({$or:[{age:11},{name:'xttt'}]} )
   查询到age为11或者name为xttt的数据
3. 几个比较的查询
   - $gt:>
   - $gte:>=
   - $lt:<
   - $lte:<=
   - $ne:!=
     db.user.find({age:{$lt:100}}) //查询到age<100的数据
4. $not:与特定模式不匹配的文档,与正则表达式联合使用时极为有效
   db.inventory.find( { price: { $not: { $gt: 1.99 } } } )
   查询条件如下：price字段小于等于1.99或者price不存在。
5. $all:满足所有元素的数据
   db.user.find({hobby:{$all:["足球","桌球"]} })
   查询到hobby中既有足球也有桌球的数据
6. $mod:将查询的值除以第一个给定的值，若余数等于第二个给定的值，则返回该结果
   db.user.find({age:{$mod:[11,0]}})
   查询到age是整除11的值得数据
7. and:查询指定同一个字段的多个查询条件
   db.inventory.find( { $and: [ { price: { $ne: 1.99 } }, { price: { $exists: true } } ] } )
   查询条件是price不等于1.99并且price字段存在；

------

### .populate()查询

因为MongoDB是文档型数据库，所以它没有关系型数据库(数据库的两张表通过"外键"，建立连接关系) 特性。也就是在建立数据的关联时会比较麻烦。为了解决这个问题，Mongoose封装了一个Population功能。使用Population可以实现在一个 document 中填充其他 collection(s) 的 document(s)。

建表，schema如下:

```
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// 文章表
let articleSchema = new Schema({
  article_title: String,
  article_tags: [{
    type: mongoose.Schema.ObjectId, //表示关联的为ObjectId属性的值，如Tag表的_id
    ref: 'Tag' //指定与Tag表建立关联
  }],
   article_content: String
})
// 标签表
let TagsSchema = new Schema({
  tags_name: String,
  tags_desc: String
})
exports.Article = mongoose.model('Article', articleSchema);
exports.Tag = mongoose.model('Tag', TagsSchema);
```

Article表的article_tags属性对应的是一个 ObjectId 的数组。ref表示关联Tag表(注意: 被关联的model的 type 必须是ObjectId, Number, String, 和 Buffer 才有效)。
如上所示可以设置article_tags关联Tag，那么在获取articleSchema的document的时候就可以使用Population功能找到关联的TagsSchema的document，并且用它的内容替换掉原来关联字段article_tags的内容。
其中一个article有许多的tag。

> 用.populate()查询：
>
> ```
> Article.find(querys,fields,options).populate({
>  path: 'article_tags', //表示填充的是article_tags字段
>  select: "_id tags_name tags_desc" //指定用Tag中哪些字段填充
> }
> ```

语法：
Query.populate(path, [select], [model], [match], [options])
model
　　类型：Model，可选，指定关联字段的 model，如果没有指定就会使用Schema的ref。
match
　　类型：Object，可选，指定附加的查询条件。
options
　　类型：Object，可选，指定附加的其他查询选项，如排序以及条数限制等等。

### 推荐两个图形化工具：

navicat for mongodb[安装链接](http://www.ddooo.com/softdown/130308.htm)和 mongodb compass[安装和使用链接](https://jingyan.baidu.com/article/925f8cb884f6f8c0dce0565a.html)





## mongoose踩的坑

koa连接mongodb数据库后，find查询数据始终是[]，空的。 原因是： mongoose.prototype.model()，会自动给 collection的 name 末尾添加一个's'，如果没有定义的话。 解决办法是：

```
let articleSchema = new Schema ({   article_title: String, }, {   collection: 'Article' }) //加上这个定义，确保collection是Article而不是Articles 
```

如图所示三种解决方法

![img](http://cdn.woc12138.com/article6_img.png)