# mongodb基本查询

### db.collection.find()查询数据

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

### mongoose踩的坑

koa连接mongodb数据库后，find查询数据始终是[]，空的。 原因是： mongoose.prototype.model()，会自动给 collection的 name 末尾添加一个's'，如果没有定义的话。 解决办法是：

```
let articleSchema = new Schema ({   article_title: String, }, {   collection: 'Article' }) //加上这个定义，确保collection是Article而不是Articles 
```

如图所示三种解决方法

![img](http://cdn.woc12138.com/article6_img.png)