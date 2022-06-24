###                    访问数据库

程序运行的时候，数据都是在内存中的。当程序终止的时候，通常都需要将数据保存到磁盘上，无论是保存到本地磁盘，还是通过网络保存到服务器上，最终都会将数据写入磁盘文件。

而如何定义数据的存储格式就是一个大问题。如果我们自己来定义存储格式，比如保存一个班级所有学生的成绩单：

| 名字    | 成绩 |
| :------ | :--- |
| Michael | 99   |
| Bob     | 85   |
| Bart    | 59   |
| Lisa    | 87   |

你可以用一个文本文件保存，一行保存一个学生，用`,`隔开：

```
Michael,99
Bob,85
Bart,59
Lisa,87
```

你还可以用JSON格式保存，也是文本文件：

```
[
    {"name":"Michael","score":99},
    {"name":"Bob","score":85},
    {"name":"Bart","score":59},
    {"name":"Lisa","score":87}
]
```

你还可以定义各种保存格式，但是问题来了：

存储和读取需要自己实现，JSON还是标准，自己定义的格式就各式各样了；

不能做快速查询，只有把数据全部读到内存中才能自己遍历，但有时候数据的大小远远超过了内存（比如蓝光电影，40GB的数据），根本无法全部读入内存。

为了便于程序保存和读取数据，而且，能直接通过条件快速查询到指定的数据，就出现了数据库（Database）这种专门用于集中存储和查询的软件。

数据库软件诞生的历史非常久远，早在1950年数据库就诞生了。经历了网状数据库，层次数据库，我们现在广泛使用的关系数据库是20世纪70年代基于关系模型的基础上诞生的。

关系模型有一套复杂的数学理论，但是从概念上是十分容易理解的。举个学校的例子：

假设某个XX省YY市ZZ县第一实验小学有3个年级，要表示出这3个年级，可以在Excel中用一个表格画出来：

![grade](https://www.liaoxuefeng.com/files/attachments/946658275213632/0)

每个年级又有若干个班级，要把所有班级表示出来，可以在Excel中再画一个表格：

![class](https://www.liaoxuefeng.com/files/attachments/946658306690400/0)

这两个表格有个映射关系，就是根据Grade_ID可以在班级表中查找到对应的所有班级：

![grade-classes](https://www.liaoxuefeng.com/files/attachments/946658423992288/0)

也就是Grade表的每一行对应Class表的多行，在关系数据库中，这种基于表（Table）的一对多的关系就是关系数据库的基础。

根据某个年级的ID就可以查找所有班级的行，这种查询语句在关系数据库中称为SQL语句，可以写成：

```
SELECT * FROM classes WHERE grade_id = '1';
```

结果也是一个表：

```
---------+----------+----------
grade_id | class_id | name
---------+----------+----------
1        | 11       | 一年级一班
---------+----------+----------
1        | 12       | 一年级二班
---------+----------+----------
1        | 13       | 一年级三班
---------+----------+----------
```

类似的，Class表的一行记录又可以关联到Student表的多行记录：

![class-students](https://www.liaoxuefeng.com/files/attachments/946658709643776/0)

由于本教程不涉及到关系数据库的详细内容，如果你想从零学习关系数据库和基本的SQL语句，请参考[SQL教程](https://www.liaoxuefeng.com/wiki/1177760294764384)。

### NoSQL

你也许还听说过NoSQL数据库，很多NoSQL宣传其速度和规模远远超过关系数据库，所以很多同学觉得有了NoSQL是否就不需要SQL了呢？千万不要被他们忽悠了，连SQL都不明白怎么可能搞明白NoSQL呢？

### 数据库类别

既然我们要使用关系数据库，就必须选择一个关系数据库。目前广泛使用的关系数据库也就这么几种：

付费的商用数据库：

- Oracle，典型的高富帅；
- SQL Server，微软自家产品，Windows定制专款；
- DB2，IBM的产品，听起来挺高端；
- Sybase，曾经跟微软是好基友，后来关系破裂，现在家境惨淡。

这些数据库都是不开源而且付费的，最大的好处是花了钱出了问题可以找厂家解决，不过在Web的世界里，常常需要部署成千上万的数据库服务器，当然不能把大把大把的银子扔给厂家，所以，无论是Google、Facebook，还是国内的BAT，无一例外都选择了免费的开源数据库：

- MySQL，大家都在用，一般错不了；
- PostgreSQL，学术气息有点重，其实挺不错，但知名度没有MySQL高；
- sqlite，嵌入式数据库，适合桌面和移动应用。

作为一个JavaScript全栈工程师，选择哪个免费数据库呢？当然是MySQL。因为MySQL普及率最高，出了错，可以很容易找到解决方法。而且，围绕MySQL有一大堆监控和运维的工具，安装和使用很方便。

### 安装MySQL

为了能继续后面的学习，你需要从MySQL官方网站下载并安装[MySQL Community Server 5.6](http://dev.mysql.com/downloads/mysql/)，这个版本是免费的，其他高级版本是要收钱的（请放心，收钱的功能我们用不上）。MySQL是跨平台的，选择对应的平台下载安装文件，安装即可。

安装时，MySQL会提示输入`root`用户的口令，请务必记清楚。如果怕记不住，就把口令设置为`password`。

在Windows上，安装时请选择`UTF-8`编码，以便正确地处理中文。

在Mac或Linux上，需要编辑MySQL的配置文件，把数据库默认的编码全部改为UTF-8。MySQL的配置文件默认存放在`/etc/my.cnf`或者`/etc/mysql/my.cnf`：

```
[client]
default-character-set = utf8

[mysqld]
default-storage-engine = INNODB
character-set-server = utf8
collation-server = utf8_general_ci
```

重启MySQL后，可以通过MySQL的客户端命令行检查编码：

```
$ mysql -u root -p
Enter password: 
Welcome to the MySQL monitor...
...

mysql> show variables like '%char%';
+--------------------------+--------------------------------------------------------+
| Variable_name            | Value                                                  |
+--------------------------+--------------------------------------------------------+
| character_set_client     | utf8                                                   |
| character_set_connection | utf8                                                   |
| character_set_database   | utf8                                                   |
| character_set_filesystem | binary                                                 |
| character_set_results    | utf8                                                   |
| character_set_server     | utf8                                                   |
| character_set_system     | utf8                                                   |
| character_sets_dir       | /usr/local/mysql-5.1.65-osx10.6-x86_64/share/charsets/ |
+--------------------------+--------------------------------------------------------+
8 rows in set (0.00 sec)
```

看到`utf8`字样就表示编码设置正确。

*注*：如果MySQL的版本≥5.5.3，可以把编码设置为`utf8mb4`，`utf8mb4`和`utf8`完全兼容，但它支持最新的Unicode标准，可以显示emoji字符。



### 访问MySQL

当我们安装好MySQL后，Node.js程序如何访问MySQL数据库呢？

访问MySQL数据库只有一种方法，就是通过网络发送SQL命令，然后，MySQL服务器执行后返回结果。

我们可以在命令行窗口输入`mysql -u root -p`，然后输入root口令后，就连接到了MySQL服务器。因为没有指定`--host`参数，所以我们连接到的是`localhost`，也就是本机的MySQL服务器。

在命令行窗口下，我们可以输入命令，操作MySQL服务器：

```
mysql> show databases;
+--------------------+
| Database           |
+--------------------+
| information_schema |
| mysql              |
| performance_schema |
| test               |
+--------------------+
4 rows in set (0.05 sec)
```

输入`exit`退出MySQL命令行模式。

对于Node.js程序，访问MySQL也是通过网络发送SQL命令给MySQL服务器。这个访问MySQL服务器的软件包通常称为MySQL驱动程序。不同的编程语言需要实现自己的驱动，MySQL官方提供了Java、.Net、Python、Node.js、C++和C的驱动程序，官方的Node.js驱动目前仅支持5.7以上版本，而我们上面使用的命令行程序实际上用的就是C驱动。

目前使用最广泛的MySQL Node.js驱动程序是开源的`mysql`，可以直接使用npm安装。

### ORM

如果直接使用`mysql`包提供的接口，我们编写的代码就比较底层，例如，查询代码：

```
connection.query('SELECT * FROM users WHERE id = ?', ['123'], function(err, rows) {
    if (err) {
        // error
    } else {
        for (let row in rows) {
            processRow(row);
        }
    }
});
```

考虑到数据库表是一个二维表，包含多行多列，例如一个`pets`的表：

```
mysql> select * from pets;
+----+--------+------------+
| id | name   | birth      |
+----+--------+------------+
|  1 | Gaffey | 2007-07-07 |
|  2 | Odie   | 2008-08-08 |
+----+--------+------------+
2 rows in set (0.00 sec)
```

每一行可以用一个JavaScript对象表示，例如第一行：

```
{
    "id": 1,
    "name": "Gaffey",
    "birth": "2007-07-07"
}
```

这就是传说中的ORM技术：Object-Relational Mapping，把关系数据库的表结构映射到对象上。是不是很简单？

但是由谁来做这个转换呢？所以ORM框架应运而生。

我们选择Node的ORM框架Sequelize来操作数据库。这样，我们读写的都是JavaScript对象，Sequelize帮我们把对象变成数据库中的行。

用Sequelize查询`pets`表，代码像这样：

```
Pet.findAll()
   .then(function (pets) {
       for (let pet in pets) {
           console.log(`${pet.id}: ${pet.name}`);
       }
   }).catch(function (err) {
       // error
   });
```

因为Sequelize返回的对象是Promise，所以我们可以用`then()`和`catch()`分别异步响应成功和失败。

但是用`then()`和`catch()`仍然比较麻烦。有没有更简单的方法呢？

可以用ES7的await来调用任何一个Promise对象，这样我们写出来的代码就变成了：

```
var pets = await Pet.findAll();
```

真的就是这么简单！

await只有一个限制，就是必须在async函数中调用。上面的代码直接运行还差一点，我们可以改成：

```
(async () => {
    var pets = await Pet.findAll();
})();
```

考虑到koa的处理函数都是async函数，所以我们实际上将来在koa的async函数中直接写await访问数据库就可以了！

这也是为什么我们选择Sequelize的原因：只要API返回Promise，就可以用await调用，写代码就非常简单！

### 实战

在使用Sequlize操作数据库之前，我们先在MySQL中创建一个表来测试。我们可以在`test`数据库中创建一个`pets`表。`test`数据库是MySQL安装后自动创建的用于测试的数据库。在MySQL命令行执行下列命令：

```
grant all privileges on test.* to 'www'@'%' identified by 'www';

use test;

create table pets (
    id varchar(50) not null,
    name varchar(100) not null,
    gender bool not null,
    birth varchar(10) not null,
    createdAt bigint not null,
    updatedAt bigint not null,
    version bigint not null,
    primary key (id)
) engine=innodb;
```

第一条`grant`命令是创建MySQL的用户名和口令，均为`www`，并赋予操作`test`数据库的所有权限。

第二条`use`命令把当前数据库切换为`test`。

第三条命令创建了`pets`表。

然后，我们根据前面的工程结构创建`hello-sequelize`工程，结构如下：

```
hello-sequelize/
|
+- .vscode/
|  |
|  +- launch.json <-- VSCode 配置文件
|
+- init.txt <-- 初始化SQL命令
|
+- config.js <-- MySQL配置文件
|
+- app.js <-- 使用koa的js
|
+- package.json <-- 项目描述文件
|
+- node_modules/ <-- npm安装的所有依赖包
```

然后，添加如下依赖包：

```
"sequelize": "3.24.1",
"mysql": "2.11.1"
```

注意`mysql`是驱动，我们不直接使用，但是`sequelize`会用。

用`npm install`安装。

`config.js`实际上是一个简单的配置文件：

```
var config = {
    database: 'test', // 使用哪个数据库
    username: 'www', // 用户名
    password: 'www', // 口令
    host: 'localhost', // 主机名
    port: 3306 // 端口号，MySQL默认3306
};

module.exports = config;
```

下面，我们就可以在`app.js`中操作数据库了。使用Sequelize操作MySQL需要先做两件准备工作：

第一步，创建一个sequelize对象实例：

```
const Sequelize = require('sequelize');
const config = require('./config');

var sequelize = new Sequelize(config.database, config.username, config.password, {
    host: config.host,
    dialect: 'mysql',
    pool: {
        max: 5,
        min: 0,
        idle: 30000
    }
});
```

第二步，定义模型Pet，告诉Sequelize如何映射数据库表：

```
var Pet = sequelize.define('pet', {
    id: {
        type: Sequelize.STRING(50),
        primaryKey: true
    },
    name: Sequelize.STRING(100),
    gender: Sequelize.BOOLEAN,
    birth: Sequelize.STRING(10),
    createdAt: Sequelize.BIGINT,
    updatedAt: Sequelize.BIGINT,
    version: Sequelize.BIGINT
}, {
        timestamps: false
    });
```

用`sequelize.define()`定义Model时，传入名称`pet`，默认的表名就是`pets`。第二个参数指定列名和数据类型，如果是主键，需要更详细地指定。第三个参数是额外的配置，我们传入`{ timestamps: false }`是为了关闭Sequelize的自动添加timestamp的功能。所有的ORM框架都有一种很不好的风气，总是自作聪明地加上所谓“自动化”的功能，但是会让人感到完全摸不着头脑。

接下来，我们就可以往数据库中塞一些数据了。我们可以用Promise的方式写：

```
var now = Date.now();

Pet.create({
    id: 'g-' + now,
    name: 'Gaffey',
    gender: false,
    birth: '2007-07-07',
    createdAt: now,
    updatedAt: now,
    version: 0
}).then(function (p) {
    console.log('created.' + JSON.stringify(p));
}).catch(function (err) {
    console.log('failed: ' + err);
});
```

也可以用await写：

```
(async () => {
    var dog = await Pet.create({
        id: 'd-' + now,
        name: 'Odie',
        gender: false,
        birth: '2008-08-08',
        createdAt: now,
        updatedAt: now,
        version: 0
    });
    console.log('created: ' + JSON.stringify(dog));
})();
```

显然await代码更胜一筹。

查询数据时，用await写法如下：

```
(async () => {
    var pets = await Pet.findAll({
        where: {
            name: 'Gaffey'
        }
    });
    console.log(`find ${pets.length} pets:`);
    for (let p of pets) {
        console.log(JSON.stringify(p));
    }
})();
```

如果要更新数据，可以对查询到的实例调用`save()`方法：

```
(async () => {
    var p = await queryFromSomewhere();
    p.gender = true;
    p.updatedAt = Date.now();
    p.version ++;
    await p.save();
})();
```

如果要删除数据，可以对查询到的实例调用`destroy()`方法：

```
(async () => {
    var p = await queryFromSomewhere();
    await p.destroy();
})();
```

运行代码，可以看到Sequelize打印出的每一个SQL语句，便于我们查看：

```
Executing (default): INSERT INTO `pets` (`id`,`name`,`gender`,`birth`,`createdAt`,`updatedAt`,`version`) VALUES ('g-1471961204219','Gaffey',false,'2007-07-07',1471961204219,1471961204219,0);
```

### Model

我们把通过`sequelize.define()`返回的`Pet`称为Model，它表示一个数据模型。

我们把通过`Pet.findAll()`返回的一个或一组对象称为Model实例，每个实例都可以直接通过`JSON.stringify`序列化为JSON字符串。但是它们和普通JSON对象相比，多了一些由Sequelize添加的方法，比如`save()`和`destroy()`。调用这些方法我们可以执行更新或者删除操作。

所以，使用Sequelize操作数据库的一般步骤就是：

首先，通过某个Model对象的`findAll()`方法获取实例；

如果要更新实例，先对实例属性赋新值，再调用`save()`方法；

如果要删除实例，直接调用`destroy()`方法。

注意`findAll()`方法可以接收`where`、`order`这些参数，这和将要生成的SQL语句是对应的。

### 文档

Sequelize的API可以参考[官方文档](http://docs.sequelizejs.com/)。

### 参考源码

[hello-sequelize](https://github.com/michaelliao/learn-javascript/tree/master/samples/node/web/db/hello-sequelize)

直接使用Sequelize虽然可以，但是存在一些问题。

团队开发时，有人喜欢自己加timestamp：

```
var Pet = sequelize.define('pet', {
    id: {
        type: Sequelize.STRING(50),
        primaryKey: true
    },
    name: Sequelize.STRING(100),
    createdAt: Sequelize.BIGINT,
    updatedAt: Sequelize.BIGINT
}, {
        timestamps: false
    });
```

有人又喜欢自增主键，并且自定义表名：

```
var Pet = sequelize.define('pet', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: Sequelize.STRING(100)
}, {
        tableName: 't_pet'
    });
```

一个大型Web App通常都有几十个映射表，一个映射表就是一个Model。如果按照各自喜好，那业务代码就不好写。Model不统一，很多代码也无法复用。

所以我们需要一个统一的模型，强迫所有Model都遵守同一个规范，这样不但实现简单，而且容易统一风格。

### Model

我们首先要定义的就是Model存放的文件夹必须在`models`内，并且以Model名字命名，例如：`Pet.js`，`User.js`等等。

其次，每个Model必须遵守一套规范：

1. 统一主键，名称必须是`id`，类型必须是`STRING(50)`；
2. 主键可以自己指定，也可以由框架自动生成（如果为null或undefined）；
3. 所有字段默认为`NOT NULL`，除非显式指定；
4. 统一timestamp机制，每个Model必须有`createdAt`、`updatedAt`和`version`，分别记录创建时间、修改时间和版本号。其中，`createdAt`和`updatedAt`以`BIGINT`存储时间戳，最大的好处是无需处理时区，排序方便。`version`每次修改时自增。

所以，我们不要直接使用Sequelize的API，而是通过`db.js`间接地定义Model。例如，`User.js`应该定义如下：

```
const db = require('../db');

module.exports = db.defineModel('users', {
    email: {
        type: db.STRING(100),
        unique: true
    },
    passwd: db.STRING(100),
    name: db.STRING(100),
    gender: db.BOOLEAN
});
```

这样，User就具有`email`、`passwd`、`name`和`gender`这4个业务字段。`id`、`createdAt`、`updatedAt`和`version`应该自动加上，而不是每个Model都去重复定义。

所以，`db.js`的作用就是统一Model的定义：

```
const Sequelize = require('sequelize');

console.log('init sequelize...');

var sequelize = new Sequelize('dbname', 'username', 'password', {
    host: 'localhost',
    dialect: 'mysql',
    pool: {
        max: 5,
        min: 0,
        idle: 10000
    }
});

const ID_TYPE = Sequelize.STRING(50);

function defineModel(name, attributes) {
    var attrs = {};
    for (let key in attributes) {
        let value = attributes[key];
        if (typeof value === 'object' && value['type']) {
            value.allowNull = value.allowNull || false;
            attrs[key] = value;
        } else {
            attrs[key] = {
                type: value,
                allowNull: false
            };
        }
    }
    attrs.id = {
        type: ID_TYPE,
        primaryKey: true
    };
    attrs.createdAt = {
        type: Sequelize.BIGINT,
        allowNull: false
    };
    attrs.updatedAt = {
        type: Sequelize.BIGINT,
        allowNull: false
    };
    attrs.version = {
        type: Sequelize.BIGINT,
        allowNull: false
    };
    return sequelize.define(name, attrs, {
        tableName: name,
        timestamps: false,
        hooks: {
            beforeValidate: function (obj) {
                let now = Date.now();
                if (obj.isNewRecord) {
                    if (!obj.id) {
                        obj.id = generateId();
                    }
                    obj.createdAt = now;
                    obj.updatedAt = now;
                    obj.version = 0;
                } else {
                    obj.updatedAt = Date.now();
                    obj.version++;
                }
            }
        }
    });
}
```

我们定义的`defineModel`就是为了强制实现上述规则。

Sequelize在创建、修改Entity时会调用我们指定的函数，这些函数通过`hooks`在定义Model时设定。我们在`beforeValidate`这个事件中根据是否是`isNewRecord`设置主键（如果主键为`null`或`undefined`）、设置时间戳和版本号。

这么一来，Model定义的时候就可以大大简化。

### 数据库配置

接下来，我们把简单的`config.js`拆成3个配置文件：

- config-default.js：存储默认的配置；
- config-override.js：存储特定的配置；
- config-test.js：存储用于测试的配置。

例如，默认的`config-default.js`可以配置如下：

```
var config = {
    dialect: 'mysql',
    database: 'nodejs',
    username: 'www',
    password: 'www',
    host: 'localhost',
    port: 3306
};

module.exports = config;
```

而`config-override.js`可应用实际配置：

```
var config = {
    database: 'production',
    username: 'www',
    password: 'secret-password',
    host: '192.168.1.199'
};

module.exports = config;
```

`config-test.js`可应用测试环境的配置：

```
var config = {
    database: 'test'
};

module.exports = config;
```

读取配置的时候，我们用`config.js`实现不同环境读取不同的配置文件：

```
const defaultConfig = './config-default.js';
// 可设定为绝对路径，如 /opt/product/config-override.js
const overrideConfig = './config-override.js';
const testConfig = './config-test.js';

const fs = require('fs');

var config = null;

if (process.env.NODE_ENV === 'test') {
    console.log(`Load ${testConfig}...`);
    config = require(testConfig);
} else {
    console.log(`Load ${defaultConfig}...`);
    config = require(defaultConfig);
    try {
        if (fs.statSync(overrideConfig).isFile()) {
            console.log(`Load ${overrideConfig}...`);
            config = Object.assign(config, require(overrideConfig));
        }
    } catch (err) {
        console.log(`Cannot load ${overrideConfig}.`);
    }
}

module.exports = config;
```

具体的规则是：

1. 先读取`config-default.js`；
2. 如果不是测试环境，就读取`config-override.js`，如果文件不存在，就忽略。
3. 如果是测试环境，就读取`config-test.js`。

这样做的好处是，开发环境下，团队统一使用默认的配置，并且无需`config-override.js`。部署到服务器时，由运维团队配置好`config-override.js`，以覆盖`config-override.js`的默认设置。测试环境下，本地和CI服务器统一使用`config-test.js`，测试数据库可以反复清空，不会影响开发。

配置文件表面上写起来很容易，但是，既要保证开发效率，又要避免服务器配置文件泄漏，还要能方便地执行测试，就需要一开始搭建出好的结构，才能提升工程能力。

### 使用Model

要使用Model，就需要引入对应的Model文件，例如：`User.js`。一旦Model多了起来，如何引用也是一件麻烦事。

自动化永远比手工做效率高，而且更可靠。我们写一个`model.js`，自动扫描并导入所有Model：

```
const fs = require('fs');
const db = require('./db');

let files = fs.readdirSync(__dirname + '/models');

let js_files = files.filter((f)=>{
    return f.endsWith('.js');
}, files);

module.exports = {};

for (let f of js_files) {
    console.log(`import model from file ${f}...`);
    let name = f.substring(0, f.length - 3);
    module.exports[name] = require(__dirname + '/models/' + f);
}

module.exports.sync = () => {
    db.sync();
};
```

这样，需要用的时候，写起来就像这样：

```
const model = require('./model');

let
    Pet = model.Pet,
    User = model.User;

var pet = await Pet.create({ ... });
```

### 工程结构

最终，我们创建的工程`model-sequelize`结构如下：

```
model-sequelize/
|
+- .vscode/
|  |
|  +- launch.json <-- VSCode 配置文件
|
+- models/ <-- 存放所有Model
|  |
|  +- Pet.js <-- Pet
|  |
|  +- User.js <-- User
|
+- config.js <-- 配置文件入口
|
+- config-default.js <-- 默认配置文件
|
+- config-test.js <-- 测试配置文件
|
+- db.js <-- 如何定义Model
|
+- model.js <-- 如何导入Model
|
+- init-db.js <-- 初始化数据库
|
+- app.js <-- 业务代码
|
+- package.json <-- 项目描述文件
|
+- node_modules/ <-- npm安装的所有依赖包
```

注意到我们其实不需要创建表的SQL，因为Sequelize提供了一个`sync()`方法，可以自动创建数据库。这个功能在开发和生产环境中没有什么用，但是在测试环境中非常有用。测试时，我们可以用`sync()`方法自动创建出表结构，而不是自己维护SQL脚本。这样，可以随时修改Model的定义，并立刻运行测试。开发环境下，首次使用`sync()`也可以自动创建出表结构，避免了手动运行SQL的问题。

`init-db.js`的代码非常简单：

```
const model = require('./model.js');
model.sync();

console.log('init db ok.');
process.exit(0);
```

它最大的好处是避免了手动维护一个SQL脚本。

### 参考源码

[model-sequelize](https://github.com/michaelliao/learn-javascript/tree/master/samples/node/web/db/model-sequelize)



# 1.用docker制作mysql容器

- 拉取mysql镜像：`docker pull mysql`，【我安装的mysql8.0，你也可以安装5.7`docker pull mysql:5.7`】
- 启动容器在3306端口，密码为默认root：

### 1.拉取镜像

```bash
-- 拉取镜像
#docker pull mysql

-- 查看本地镜像
#docker ps

-- 创建映射目录
mkdir  /home/mysql  -p
mkdir  /home/mysql/logs  -p
mkdir  /home/mysql/data   -p
```

-- 创建mysql8的配置文件my.cnf

```bash
[client]
port=3306
#socket = /usr/mysql/mysqld.sock

default-character-set = utf8mb4

[mysqld]

pid-file        = /var/run/mysqld/mysqld.pid
socket          = /var/run/mysqld/mysqld.sock
datadir         = /var/lib/mysql

# Disabling symbolic-links is recommended to prevent assorted security risks
symbolic-links=0

character_set_server = utf8mb4

collation_server = utf8mb4_bin

secure-file-priv= NULL

# Disabling symbolic-links is recommended to prevent assorted security risks

symbolic-links=0

# Custom config should go here

!includedir /etc/mysql/conf.d/
```

### 2.运行容器

```bash
-- 安装运行 端口13307
docker run -d  \		#在后台创建并启动名
--restart=always \
-v /home/mysql/my.cnf:/etc/mysql/my.cnf  \
-v /home/mysql/logs:/var/log/mysql  \
-v /home/mysql/data:/var/lib/mysql  \
-p 13307:3306  \
-e TZ=Asia/Shanghai		\	#时区
--name mysql8.0 \					#容器实例名
--privileged=true \					#容器内的root拥有真正root权限，否则容器内root只是外部普通用户权限
-e  MYSQL_ROOT_PASSWORD=123 \				#密码
mysql:latest  \				#镜像名称
--lower_case_table_names=1  

//-p 映射端口
//--name 名称
//-v 映射文件
//-e MYSQL_ROOT_PASSWORD mysql密码
//-d 后台运行并运行 

#完整命令
docker run -d --restart=always -v /home/mysql/my.cnf:/etc/mysql/my.cnf -v /home/mysql/logs:/var/log/mysql -v /home/mysql/data:/var/lib/mysql -p 13307:3306 -e TZ=Asia/Shanghai --name mysql --privileged=true -e  MYSQL_ROOT_PASSWORD=123 mysql:latest --lower_case_table_names=1 
```

### 3.进入容器、修改密码、创建用户，授权远程连接

```bash
docker exec -it mysql bash  #进入容器
mysql -uroot -p #登录
use mysql;	#切换数据库
select host,user,authentication_string,plugin from user;	#查询更改
ALTER USER 'root'@'%' IDENTIFIED BY '@1qa';  #修改密码
GRANT ALL PRIVILEGES ON *.* TO 'root'@'%';   #修改权限
CREATE USER 'xxx'@'%'  IDENTIFIED WITH mysql_native_password BY '456';  #创建用户
GRANT ALL PRIVILEGES ON *.* TO 'xxx'@'%' WITH GRANT OPTION;   #授权
flush privileges;  #刷新权限
exit;  #退出Mysql
```

### 4.可能报错

```
注意：启动mysql报如下错误，那是因为MYSQL新特性secure_file_priv对读写文件的影响。
ERROR: mysqld failed while attempting to check config
mysqld: Error on realpath() on '/var/lib/mysql-files' (Error 2 - No such file or directory)
2019-09-14T09:52:51.015937Z 0 [ERROR] [MY-010095] [Server] Failed to access directory for --secure-file-priv. Please make sure that directory exists and is accessible by MySQL Server. Supplied value : /var/lib/mysql-files

docker logs mysql	//打印mysql日志
[Server] Failed to access directory for --secure-file-priv.		#报错信息

解决问题:
windows下：修改my.ini 在[mysqld]内加入secure_file_priv=/var/lib/mysql
linux下：修改my.cnf 在[mysqld]内加入secure_file_priv=/var/lib/mysql
```

### 5.简配版

```bash
docker run -d --name mysql -p 宿主端口9221:3306 -e MYSQL_ROOT_PASSWORD=你的密码 mysql
docker exec -it mysql bash	#进入容器
mysql -u root -p	#进入mysql，并创建数据库“hkzf”
vi /mydata/mysql/conf/my.cnf		#编辑配置如下
[client]
default-character-set=utf8
​
[mysql]
default-character-set=utf8
​
[mysqld]
init_connect='SET conllation_connection = utf8_unicode_ci'
init_connect='SET NAMES utf8'
character-set-server=utf8
collation-server=utf8_unicode_ci
skip-character-set-client-handshake
skip-name-resolve

docker restart mysql		#重启
#验证mysql配置是否成功
docker exec -it mysql /bin/bash  //进入mysql容器中
cat /etc/mysql/my.cnf //检验mysql容器中的配置文件
exit		//退出mysql容器
```



## 2.下载mysql客户端

直接以client 端登陆mysql

```
 mysql -h127.0.0.1 -P3306 -u账号 -p密码
```

或者pull 一个phpmyadmin 的容器用于登录数据库

一、连接MySQL

　　格式： mysql -h 主机地址 -u 用户名 -p 用户密码

二、修改密码

　　格式：mysqladmin -u用户名 -p旧密码 password 新密码

三、增加新用户。

　　（注意：和上面不同，下面的因为是MySQL环境中的命令，所以后面都带一个分号作为命令结束符）

　　格式：grant select on 数据库.* to 用户名@登录主机 identified by \"密码\"

四、

1、MySQL常用命令MySQL常用命令，每个命令以分号结束

　　create database name; 创建数据库

　　use databasename; 选择数据库

　　drop database name 直接删除数据库，不提醒

　　show tables; 显示表

　　describe tablename; 表的详细描述

　　select中加上distinct去除重复字段

　　mysqladmin drop database name 删除数据库前，有提示。



2.修改mysql中root的密码：

　　shell>mysql -u root -p

　　mysql> update user set password=password(”xueok654123″) where user=’root’;

　　mysql> flush privileges //刷新数据库

　　mysql>use dbname； 打开数据库：

　　mysql>show databases; 显示所有数据库

　　mysql>show tables; 显示数据库mysql中所有的表：先use mysql；然后

　　mysql>describe user; 显示表mysql数据库中user表的列信息）；



　3、grant

　　创建一个可以从任何地方连接服务器的一个完全的超级用户，但是必须使用一个口令something做这个

　　mysql> grant all privileges on *.* to user@localhost identified by ’something’ with

　　增加新用户

　　格式：grant select on 数据库.* to 用户名@登录主机 identified by “密码”

　　GRANT ALL PRIVILEGES ON *.* TO monty@localhost IDENTIFIED BY ’something’ WITH GRANT OPTION;

　　GRANT ALL PRIVILEGES ON *.* TO monty@”%” IDENTIFIED BY ’something’ WITH GRANT OPTION;

　　删除授权：

　　mysql> revoke all privileges on *.* from root@”%”;

　　mysql> delete from user where user=”root” and host=”%”;

　　mysql> flush privileges;

　　创建一个用户custom在特定客户端it363.com登录，可访问特定数据库fangchandb

　　mysql >grant select, insert, update, delete, create,drop on fangchandb.* to custom@ it363.com identified by ‘ passwd’

　　重命名表:

　　mysql > alter table t1 rename t2;





## 修改默认密码

使用 `grep 'temporary password' /var/log/mysqld.log` 查看默认密码。然后 `mysql -u root -p` 输入查找到的默认密码登录 MySQL

![登录 MySQL](https://segmentfault.com/img/remote/1460000018442651)

输入 `ALTER USER 'root'@'localhost' IDENTIFIED BY 'youPassword';` 修改密码。注意，MySQL 5.7 要求密码**必须包含**大小写字母，数字和特殊字符。

## 安装mysql5.7

在D:\MySQL57下创建文件my.ini
内容如下：

```
[client]``port=3306``default-character-``set``=utf8mb4``[mysql]``default-character-``set``=utf8mb4``[mysqld]``port=3306``character-``set``-client-handshake=0``character-``set``-server=utf8mb4``collation-server=utf8mb4_unicode_ci``default-``time``-zone=``'+8:00'``lower_case_table_names=1``log-bin=mysql-bin``binlog-``format``=ROW``server_id=1``basedir=D:\MySQL57``datadir=D:\MySQL57\data``[WinMySQLAdmin]``D:\MySQL57\bin\mysqld.exe
```

在D:\MySQL57\bin目录下运行管理员命令提示符，并执行以下命令

```
安装服务：mysqld install MySQL57 --defaults-file="D:\MySQL57\my.ini"
初始化：mysqld --initialize-insecure --user=mysql
```

```
启动服务：net start MySQL57
```

设置root密码：mysqladmin -u root -p password 此处输入新的密码
要求输入密码，直接回车即可，设置完成后会有警告，无视即可，至此已经安装完毕了

```
启动命令：net start MySQL57
停止命令：net stop MySQL57
卸载命令：mysqld -remove
```

## 3.密码错误或初始密码问题

**方法描述：该方法是通过跳过权限安全检查，开启mysql服务，从而修改root的密码，来创建一个新的root密码，以供退出后重新登录mysql。**

**1.** **首先检查mysql服务是否启动**

　　若已启动则先将mysql服务停止，可在开始菜单使用以下命令来停掉服务。

```
　　net stop mysql57
```

![img](https://img2020.cnblogs.com/blog/1744003/202004/1744003-20200421111053659-1428587976.png)

　　我由于mysql57服务已经先停掉了，所以这里显示没有启动MySQL服务。

**2.** **先打开一个cmd窗口，切换到mysql的bin目录**（这是我的bin目录）

```
　　cd "C:\Program Files\MySQL\MySQL Server 5.7\bin"
```

　　运行命令：（my.ini配置文件默认和安装目录不在一起，大多数采用默认安装mysql的话大致是在下述路径）

```
　　mysqld --defaults-file="C:\ProgramData\MySQL\MySQL Server 5.7\my.ini" --skip-grant-tables
```

　　该命令通过跳过权限安全检查，开启mysql服务，这样连接mysql时，可以不用输入用户密码。

**3.** **重新打开一个cmd窗口，连接mysql**：
　　输入命令：（如果配置了环境变量可以一打开cmd就输入如下命令，如果没配置的话，请先切换到mysql的bin目录）

```
　　mysql -u root -p
```

　　出现：

```
Enter password:
```

　　**在这里直接回车，不用输入密码。**然后就会出现登录成功的信息，

![img](https://img2020.cnblogs.com/blog/1744003/202004/1744003-20200421134415674-1807835663.png)

**4.修改mysql的root密码**

（1）使用命令：

```
show databases;
```

显示/查看所有数据库。

（2）使用命令切换到mysql数据库：

```
use mysql;
```

（3）使用命令更改root密码：（'新密码' 的位置是要输入你想要设置的密码）

```
update user set password=password("新密码") where user="root';  5.7之前版本用这个命令

update mysql.user set authentication_string=password('新密码') where user='root';  这是5.7版本的命令
```

（4）刷新权限：

```
FLUSH PRIVILEGES;
```

（5）退出。

```
quit；
```

至此，忘记的root的密码已经修改好，以后登录的操作和之前常规登录的操作是一样的。重新登录后你就又可以正常使用mysql 5.7了。

**5.测试密码修改是否成功。**

（1）重新登录：

```
mysql -u root -p
```

（2）出现输入密码提示，输入新的密码，回车，即可登录：

```
Enter password:********
```

显示登录成功信息。 就一切ok了。



## 4.Docker容器中Mysql数据的导入/导出

Mysql数据的导入导出我们都知道一个mysqldump命令就能够解决，但如果是运行在docker环境下的mysql呢？

解决办法其实还是用mysqldump命令，但是我们需要进入docker的mysql容器内去执行它，并且通过配置volumes让导出的数据文件可以拷贝到宿主机的磁盘上

所以操作步骤就可以分为：

- 配置docker的volumes
- 进入docker的mysql容器，导出数据文件

至于数据导入，太过简单，就不说了

**先来看看mysqldump命令常见选项：**

- --all-databases, -A： 备份所有数据库
- --databases, -B： 用于备份多个数据库，如果没有该选项，mysqldump把第一个名字参数作为数据库名，后面的作为表名。使用该选项，mysqldum把每个名字都当作为数据库名。
- --force, -f：即使发现sql错误，仍然继续备份
- --host=host_name, -h host_name：备份主机名，默认为localhost
- --no-data, -d：只导出表结构
- --password[=password], -p[password]：密码
- --port=port_num, -P port_num：制定TCP/IP连接时的端口号
- --quick, -q：快速导出
- --tables：覆盖 --databases or -B选项，后面所跟参数被视作表名
- --user=user_name, -u user_name：用户名
- --xml, -X：导出为xml文件

**配置volumes**

首先我是利用docker-compose进行docker容器的编排，完整的配置代码请看这个项目: [liumapp/rabbitmq-mysql-redis-in-docker](https://github.com/liumapp/rabbitmq-mysql-redis-in-docker)

请注意这个项目的docker-compose.yml配置文件中，有以下几行：

```
mysql:``container_name: mysql``image: mysql:5.5.60``restart: always``volumes:`` ``- ./mysql/data:/var/lib/mysql`` ``- ./mysql/conf/mysqld.conf:/etc/mysql/mysql.conf.d/mysqld.cnf
```

我对mysql容器配置的volumes，是把项目的mysql/data目录和docker容器内的/var/lib/mysql建立映射关系

所以下面我进入docker的mysql容器内执行导出命令的时候，只需要把数据导出在/var/lib/mysql/目录下，就可以在宿主机的./mysql/data/目录下找到对应的数据文件

**进入容器导出数据**

然后执行

```
docker ``exec` `-it mysql ``/bin/bash
```

进入容器

执行命令

```
whereis` `mysql
```

找到mysql的运行路径，我这里是：/usr/local/mysql/bin，用cd进入

```
cd` `/usr/local/mysql/bin
```

**请注意，这里的路径是指docker容器内的路径，跟您的宿主机路径没有关系**

执行导出命令

```
mysqldump -u 用户名 -p 数据库名 > 保存文件.sql
```

输入密码后基本导出成功，请注意，保存文件的路径要设置在volumes下面，即/var/lib/mysql/下

随后输入

```
exit
```

退出容器内部，回到宿主机上，我们就能够找到导出的数据文件了

如果您要导出csv格式的话，将mysqldump的那句命令改为：

```
mysql -u 用户名 --password=密码 --database=数据库名 --execute=``'SELECT `FIELD`, `FIELD` FROM `TABLE` LIMIT 0, 10000 '` `-X > 保存文件.sql
```

即可



方法2：

```
执行导出（备份）数据库命令：
由第一步的结果可知，我们的 mysql 运行在一个叫 mysql_server 的 docker 容器中。而我们要备份的数据库就在里面，叫做 test_db。mysql 的用户名密码均为root，我们将文件备份到宿主机/opt/sql_bak文件夹下。

docker exec -it  mysql_server mysqldump -uroot -proot test_db > /opt/sql_bak/test_db.sql
导入数据
将宿主机上的数据sql复制到容器的文件下----因为是-v  启动  文件结构目录保持一致
docker cp /opt/gysql.sql  gysql （容器名称）:/opt/gysql.sql  
进入容器---》docker exec -it gysql （容器名称） bash
登录容器内的mysql数据库------》mysql -uroot -p123456
创建对象的数据库  create database somp;
使用use somp   --->执行 source  /opt/gysql.sql
exit;
```

