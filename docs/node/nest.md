# Nest.js 从零到壹系列

> Nest 是一个用于构建高效，可扩展的 Node.js 服务器端应用程序的框架。它使用渐进式 JavaScript，内置并完全支持 TypeScript（但仍然允许开发人员使用纯 JavaScript 编写代码）并结合了 OOP（面向对象编程），FP（函数式编程）和 FRP（函数式响应编程）的元素。
> 在底层，Nest 使用强大的 HTTP Server 框架，如 Express（默认）和 Fastify。Nest 在这些框架之上提供了一定程度的抽象，同时也将其 API 直接暴露给开发人员。这样可以轻松使用每个平台的无数第三方模块。

## 一、项目创建

项目环境：

- node.js: 11.13.0+
- npm: 6.13.4+
- nestjs: 7.0.3
- typescript: 3.8.3

```bash
 npm i -g @nestjs/cli		//安装cli
 nest new project-name		//新建项目
```



## 二、新增模块

如何使用快捷命令生成文件？https://www.bookstack.cn/read/nestjs-8-zh/recipes.md

> 主要命令：nest g --help，可以查看所有的快捷命令
> 常用命令：
> 创建控制器：nest g controller user module
> 创建服务：nest g service user module
> 创建模块：nest g module user module
> 生成一套资源  nest g resource users
> nest g resource users --no-spec  来避免生成测试文件
> nest g(固定写法) co(生成的内容) user(文件名) module(路径，默认以src为根路径



NestJS 的设计模式，主要就是 `Controller`、`Service`、`Module` 共同努力，形成了一个模块。

- `Controller`：传统意义上的控制器，提供 api 接口，负责处理路由、中转、验证等一些简洁的业务；
- `Service`：又称为 `Provider`， 是一系列服务、repo、工厂方法、helper 的总称，主要负责处理具体的业务，如数据库的增删改查、事务、并发等逻辑代码；
- `Module`：负责将 `Controller` 和 `Service` 连接起来，类似于 `namespace` 的概念；



### 1. Service

> 个人习惯先创建 Service，最后再创建 Module，因为 Controller 和 Module 都需要引入 Service，这样引入的时候就可以有提示了（当然，也可以事先写 import 语句，但 ESLint 的检查会冒红点，强迫症患者表示不接受）。

使用 nest-cli 提供的指令可以快速创建文件，语法如下：

```typescript
$ nest g [文件类型] [文件名] [文件目录（src目录下）]
```

```
nest g service user logical
```

![img](https://static.powerformer.com/c/@pRtgJQ4NP/1589284941294-5fa97734-fb92-4106-be61-31d8bace9074.webp) 

user.service.spec.ts 是类型声明，可以不用管，于是，我们可以仿照 app.service.ts 来写一个简单的业务了：

```ts
// src/logical/user/user.service.ts
import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
  findOne(username: string): string {
    if (username === 'Kid') {
      return 'Kid is here';
    }
    return 'No one here';
  }
}
```



### 2. Controller

现在，我们来写控制器，输入下列命令：

```typescript
$ nest g controller user logical
```

接下来，我们把 Service 的业务逻辑引入进来：

```ts
import { Controller, Post, Body } from '@nestjs/common';
import { UserService } from './user.service';

('user')
export class UserController {
  constructor(private readonly usersService: UserService) {}

  ('find-one')
  findOne(() body: any) {
    return this.usersService.findOne(body.username);
  }
}
```

需要先用构造器实例化，然后才能调用方法，这里使用的是 `POST` 来接收请求，通过 `@Body()` 来获取请求体（request.body）的参数。

至此 70% 的流程已经走完，以后开发业务（搬砖），基本都是在 Service 和 Controller 里面折腾了。。。

> 注意：千万不要往 Controller 里面添加乱七八糟的东西，尤其不要在里面写业务逻辑，Controller 就应该保持简洁、干净。很多前端刚写 Node 的时候，都喜欢在这里面写逻辑，只为了省事，殊不知这对后期的维护是个灾难。



### 3. Module

> 这个是连接 Service 和 Controller 的

很多人会奇怪，上文只是创建了 Service 和 Controller，怎么就可以访问了呢？

打开 app.module.ts：	

```ts
// src/app.module.ts
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserService } from './logical/user/user.service';
import { UserController } from './logical/user/user.controller';

({
  imports: [],
  controllers: [AppController, UserController],
  providers: [AppService, UserService],
})
export class AppModule {}
```

发现使用指令创建文件的时候，已经自动帮我们引入 User 相关文件了，而 main.ts 文件里，又已经引入了 `AppModule`，并使用 `NestFactory` 创建了实例。

因此，如果是新建无关痛痒的子模块，即使不新建 Module 文件，也能通过路由访问。



先创建文件：

```typescript
nest g module user logical
```

初始化的 Module 基本都长这个样：

```python
import { Module } from '@nestjs/common';

@Module({})
export class UserModule {}
```

我们把 Service 和 Controller 组装起来：

```python
import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';

@Module({
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
```

这样做有什么好处呢，就是其他 Module 想引入 User 的时候，就不用同时引入 Service 和 Controller 了，

最后我们修改一下 `app.module.ts`：

```python
// src/app.module.ts
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
// import { UserService } from './logical/user/user.service';
// import { UserController } from './logical/user/user.controller';
import { UserModule } from './logical/user/user.module';

@Module({
  imports: [UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
```

保存运行，发现路由依然生效



## 三、连接数据库

### 1.typeORM

使用typeORM操作数据库， 首先我们要安装以下依赖包：
```bash
npm install @nestjs/typeorm typeorm mysql2 -S
```

官方提供了两种连接数据库的方法

#### **方法1**

> 使用环境变量， 推荐使用官方提供的 @nestjs/config
>
> 依赖于dotenv，可以通过key=value形式配置环境变量，项目会默认加载根目录下的.env文件，我们只需在app.module.ts 中引入C onfigModule，使用 ConfigModule.forRoot() 方法即可，然后 ConfigService 读取相关的配置变量。

新建 .env 和 .env.prod 环境变量文件

```bash
DB_HOST=localhost  
DB_PORT=3306	// 数据库端口
DB_USER=root
DB_PASSWD=root
DB_DATABASE=blog
```

在根目录下创建一个文件夹config(与src同级)，然后再创建一个 env.ts

```ts
//env.ts
import * as fs from 'fs';

import * as path from 'path';
const isProd = process.env.NODE_ENV === 'production';
function parseEnv() {
  const localEnv = path.resolve('.env');
  const prodEnv = path.resolve('.env.prod');
  if (!fs.existsSync(localEnv) && !fs.existsSync(prodEnv)) {
    throw new Error('缺少环境配置文件');
  }
  const filePath = isProd && fs.existsSync(prodEnv) ? prodEnv : localEnv;
  return { path: filePath };
}
export default parseEnv();
```

连接数据库：

```ts
//app.module.ts
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { ConfigService, ConfigModule } from '@nestjs/config';
import envConfig from '../config/env';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      // 设置为全局
      envFilePath: [envConfig.path],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        type: 'mysql', // 数据库类型
        entities: [], // 数据表实体
        host: configService.get('DB_HOST', 'localhost'),
        // 主机，默认为localhost
        port: configService.get<number>('DB_PORT', 3306),
        // 端口号
        username: configService.get('DB_USER', 'root'), // 用户名
        password: configService.get('DB_PASSWORD', 'root'), // 密码
        database: configService.get('DB_DATABASE', 'blog'), //数据库名
        timezone: '+08:00', //服务器上配置的时区
        synchronize: true, //根据实体自动创建数据库表， 生产环境建议关闭
      }),
    }),
  ],
})
export class AppModule {}

```



#### **方法2**

在根目录下创建一个 ormconfig.json 文件(与src同级), 而不是将配置对象传递给forRoot()的方式。

```json
//ormconfig.json 
{
  "type": "mysql",
  "host": "localhost",
  "port": 3306,
  "username": "root",
  "password": "root",
  "database": "blog",
  "entities": ["dist/**/*.entity{.ts,.js}"],
  "synchronize": true // 自动载入的模型将同步
}
```

```ts
//app.module.ts
import { Module } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';
@Module({ imports: [TypeOrmModule.forRoot()] })
export class AppModule {}

```



### 2.数据库的迁移与初始化



## 四、DTO，管道

### 1.什么是 DTO？

> 数据传输对象（DTO)(Data Transfer Object)，是一种设计模式之间传输数据的软件应用系统。数据传输目标往往是数据访问对象从数据库中检索数据。数据传输对象与数据交互对象或数据访问对象之间的差异是一个以不具有任何行为除了存储和检索的数据（访问和存取器）。
> 根据定义，我们需要在代码中约定一下 DTO，还是以注册接口为例，先创建 `user.dto.ts` 简单定义一下：

```ts
// src/logical/user
export class RegisterInfoDTO {
  readonly accountName: string | number;
  readonly realName: string;
  readonly password: string;
  readonly repassword: string;
  readonly mobile: number;
}
```



### 2.管道

> **Nest.js 支持管道（Pipe），它会在请求到达 Controller 之前被调用，可以对参数做验证和转换，如果抛出了异常，则不会再传递给 Controller。**

这种管道的特性适合用来做一些跨 Controller 的通用逻辑，比如 string 到 int 的转换，参数验证等等。

Nest.js 内置了 8 个管道：

- ValidationPipe
- ParseIntPipe
- ParseBoolPipe
- ParseArrayPipe
- ParseUUIDPipe
- ParseEnumPipe
- ParseFloatPipe
- DefaultValuePipe

可以分为 3 类：

parseXxx，把参数转为某种类型；defaultValue，设置参数默认值；validation，做参数的验证。

[如何自定义管道](https://zhuanlan.zhihu.com/p/450516979)



## 六、Swagger

##### 初始化 Swagger

```bash
yarn add /swagger swagger-ui-express -S
```

```ts
// main.ts配置 Swagger
const setupSwagger = (app) => {
const options = new DocumentBuilder()
  .setTitle('Nest zero to one')
  .setDescription('The nest-zero-to-one API description')
  .setVersion('1.0')
  .addTag('test')
  .build();
const document = SwaggerModule.createDocument(app, options);
SwaggerModule.setup('api-doc', app, document);
};
async function bootstrap() {
	...
	setupSwagger(app);
	...
}
```

