# Typescript

### 类型推论

> TypeScript 会在没有明确的指定类型的时候推测出一个类型，这就是类型推论。

**如果定义的时候没有赋值，不管之后有没有赋值，都会被推断成 `any` 类型而完全不被类型检查**：

```js
let myFavoriteNumber;
myFavoriteNumber = 'seven';
myFavoriteNumber = 7;
```

### 基础 类型

- any	任意类型，会传染
- unknown    任意类型，安全的any，不会传染

- void	 空值（null）或undefined
- never    不能是任何值，永远不会返回结果

- object	 

```typescript
//在属性名后面加问号，表示属性可选，否则必选
let b:{name:string, age?:number}
//propName代表任意属性 （propname可以为任意名字，但是限制类型为string）
let c:{name:string,[propName:string]:any}
//用箭头函数，限定函数结构的参数和返回值属性
let d:(a:number,b:number)=>number
```

- string	设置数组中元素的类型

```typescript
let e:string[]; let f:number[]
let g:Array<number>;
```

- tuple	元祖，固定长度的数组,，效率更快

```typescript
let h:[string,string]
```

- enum    枚举

```typescript
//定义枚举
enum Gender{male=0,female=1};
let i:{name:string, gender:Gender};
i= {name:'孙武',gender:Gender.male}
```



类型断言，告诉解析器变量的实际类型

```typescript
ts = e as string;
s = <string>e;
```

&和|

```typescript
let j: {name:string} & {age:number}
j = {name:'xxx',age:18}			//必须同时满足存在两个属性
let j:string| number         //表示j是字符串或 数字类型
```

类型的 别名

```typescript
type myType = 1|2|3|4|5;
let k: myType;
let l: myType;
```



一、TS 开发环境搭建，npm i -g typescript
在终端，执行 tsc 文件名，即能将 ts 文件转换为 JS

二、TS 的类型声明
声明一个变量 a，同时指定它的类型为 number
let a: number; let b: string;
声明完变量直接进行赋值(TS 可以自动判断变量类型)
let c:boolean = false; let c = false;
函数参数的类型声明
function sum(a:number, b:number){
return a+b;
}
函数返回值的类型
function sum():number{return a+b} 返回值为数字

三、TS 的类型
number/string/boolean
/字面量 其本身，限制变量的值就是该字面量的值
/any 任意类型
/unknown 类型安全的 any
/void 空值或 undifined
/never 没有值
/object /array
/tuple 元素，TS 新增类型，固定 长度的数组
/enum 枚举，TS 新增类型， enum{A,B}

1）可以使用字面量进行类型声明
let a:10 即 a 的类型为 10（只能为本身）
let c：boolean | string； 可以使用|连接多个类型，称为联合类型

2）类型断言
s = e as string;

四、编译选项
1）自动编译文件,使用 -w 指令 (watch)
tsc xxx.ts -w
2）自动编译项目
在项目根目录创建 tsconfig,json 配置文件
配置选项 "include":["src/**/*","tests/**/*"]
定义被编译文件所在的目录 默认值["**/*"]
exclude 排除在外的目录，默认值 node_modules,bower_components,jspm_packages
终端使用 tsc 指令，可以编译整个项目； 使用 tsc -w 自动监听编译
3）extends 定义被继承的配置文件
4）files 指定被编译文件的列表，只有需要编译的文件少时才会用到
5）compilerOptions 编译器的选项
子选项：
"target":"es6" 用来指定被编译为的 ES 版本
"module":"es2015" 指定要使用模块化的规范
"lib":["es2015","dom"] 用来指定项目中要使用的库,一般情况下不需要更改，当运行在终端时可能需要更改
"outDoir":"./dist" 用来指定编译或文件所在目录,与源码分离
"outFile":"./dist/app.js" 将全局作用域中的代码合并为一个文件（模块的模块化规范必须一样）
"allowJs":false 是否对 js 文件进行编译，默认是 false
"checkJs":false 检测 js 代码是否符合语法规范，默认是 false
"removeComments":true 编译后不要注释
"noEmit":true 不生成编译后的文件，默认为 false
"noEmitonError":true 当有错误时不生成编译后的文件，默认为 false
语法检查相关编译选项
"alwaysStrict":false 默认编译后的文件不使用严格模式 （有模块化时自动选择版本为 ES6，默认在严格模式下）
"noImplicitAny":true 在不指定类型时，默认为 any。设置为 true 时，不允许出现隐式的 any 类型
"noImplicitThis":false 不允许不明确类型的 this（解决方法，在函数的参数中指定 this 的类型）
"strictNullChecks":false 严格的检查空值
"strict":false 所以严格模式的总开关，默认为 false，打开后所有严格检查选项全都打开了

五、使用 webpack 打包 ts 代码
初始化配置 package.json (npm init)
配置 webpack.config.js 引入包，设定规则，配置插件
配置 tsconfig.json
在 package.json 中添加 html-webpack-plugin 插件，在 webpack.config.js 中配置，打包后，会根据模板，自动生成 html 文件
webpack-dev-server 内置服务器插件
webpack 中配置 resolve: "extensions" 设置引入模块类型

六、类，构造函数，继承，super，属性封装，泛型