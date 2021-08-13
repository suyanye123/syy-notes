# ECMAScript

ES的几个重要版本

- ES5：09年发布
- ES6(ES2015)：15年发布
- ES7(ES2016)：16年发布(变化不大)

[ 别人总结的ES6-12 ](https://juejin.cn/post/6995334897065787422?utm_source=gold_browser_extension#heading-33)

##  ES5

### 1.1 严格模式

除了正常运行模式，ES5 添加了第二种模式“严格模式”，使得 JS 在更严格的语法条件下运行。

目的：消除 JS 语法的不合理/不严谨/不安全之处，为代码的安全运行保驾护航。

使用：

- 在全局或函数的第一条语句定义为：'use strict'
- 如果浏览器不支持，只解析为一条简单的语句，没有任何副作用

语法和行为改变：

- 必须使用 var 声明变量
- 禁止自定义的函数中的 this 指向 window

```js
'use strict'
function Person(name, age) {
  this.name = name;
  this.age = age;
}
new Person('kb', 39)// 不加上new
// 报错Uncaught TypeError: Cannot set property 'name' of undefined

new Person('kb', 39) // 加上new
// 不报错Person {name: "kb", age: 39}
```

> 因为此时 Person 中的 this 指向的是 window；只有加上 new，this 才指向 new 出来的一个实例对象

- 创建 eval 作用域(目前不推荐使用)
- 对象不能有重名的属性



### 1.2 JSON 对象

1. JSON.stringify(obj/arr)

   将 js 对象(数组)转换为 json 对象(数组)

2. JSON.parse(json)

   将 json 对象(数组)转换为 js 对象(数组)

```js
var obj = {username: 'kb'}; // 创建一个js对象

obj = JSON.stringify(obj); // 转换成JSON对象
console.log(obj) // {"username":"kb"}
console.log(typeof obj) // string

obj = JSON.parse(obj) // 转换成JS对象
console.log(obj) // {username: "kb"}
console.log(typeof obj) // object
```



### 1.3 Object 对象方法扩展

ES5 给 Object 扩展了一些静态方法，常用的2个：

##### object.create(prototype, [descriptors])

作用：以指定对象为原型创建新的对象

```js
var obj = {username: 'dm', age: 30};
var obj1 = {};
obj1 = Object.create(obj, {
    // 扩展的新属性，为新的对象指定新的属性，并对属性进行描述
  sex: { 
    value: 'male',	//value：指定值
    writable: true, // 标识当前属性值是否可修改，默认为false，只有指定writable为true才能修改sex的值
    configurable: true, // 标识当前属性是否可以被删除，默认为false，只有指定configurable为true才能删除sex的值
    enumerable: true // enumerable：标识当前属性是否能用for in 枚举，默认为false，只有指定enumerable为true才能枚举sex的值
  },

});
console.log(obj1.age); // 30
console.log(obj1);
/*
  sex: "male"
 >__proto__:
    age: 30
    username: "dm"
*/
console.log(obj1.sex); // male
obj1.sex = 'female';
console.log(obj1.sex); // female
//delete obj1.sex;
//console.log(obj1.sex); // undefined
for(var i in obj1) {
  console.log(i) // sex也能打印出来
}
```

#### Object.defineProperties(object, descriptors)

作用：为指定对象定义扩展多个属性

get：用来获取当前**属性值**的回调函数

set：监听当前**属性值**的回调函数(属性值发生变化会自动调用)，调用后会将修改后的值作为实参注入到 set 函数

存取器属性：setter，getter 一个用来存值，一个用来取值

```js
var obj2 = {firstName: 'kb', lastName: 'brt'};
Object.defineProperties(obj2, {
  fullName: {
    get: function() { // 获取当前扩展属性的值的回调函数，每次获取属性值时get方法自动调用
      console.log('get()');
      return this.firstName + ' ' + this.lastName;
    },
    set: function(data) { // 监听当前扩展属性，只有当他发生变化时才自动调用(data就是想要修改成的值)
      console.log('set()', data) // set() tim dc
      var names = data.split(' '); // 不能直接改变fullName的值但是可以通过这种方式间接改变
      this.firstName = names[0];
      this.lastName = names[1];
    }
  }
})

console.log(obj2.fullName)
obj2.fullName = 'tim dc' // 修改fullName属性的值
console.log(obj2.fullName)
```

#### 对象本身的两个方法

get propertyName() {}：用来得到当前属性值的回调函数

set propertyName() {} ：用来监听当前属性值变化的回调函数

```js
var obj = {
  firstName: 'cr',
  lastName: 'stp',
  get fullName() {
    return this.firstName + ' ' + this.lastName;
  },
  set fullName(data) {
    var names = data.split(' ');
    this.firstName = names[0];
    this.lastName = names[1];
  }
};
console.log(obj);
obj.fullName = 'kb brt';
console.log(obj.fullName);
```

**这两种写法不同但是结果是完全相同的。**



### 1.4 Array 扩展

Array.prototype.indexOf(value)：得到值在数组中的第一个下标

Array.prototype.lastIndexOf(value)：得到值在数组中的最后一个下标

Array.prototype.forEach(function(item, index) {})：遍历数组

Array.prototype.map(function(item, index) {})：遍历数组返回一个新的数组，返回加工之后的值

Array.prototype.filter(function(item, index) {})：遍历过滤出一个新的子数组，返回条件为true的值

```js
// 输出第一个6的下标
// 输出最后一个6的下标
// 输出所有元素的值和下标
// 根据arr产生一个新数组，要求每个元素都比原来大10
// 根据arr产生一个新数组，返回的每个元素要大于4
var arr = [5,7,6,4,5,1,6,2,3,8]
console.log(arr.indexOf(6))
console.log(arr.lastIndexOf(6))
arr.forEach((item, index) => {
  console.log(item, index)
})
var arr1 = arr.map(item => {
  return item + 10
})
console.log(arr1)
var arr2 = arr.filter(item => {
  return item > 4
})
console.log(arr2)
```



### 1.5 Function 扩展

新增`bind()`方法， [详见aply、call、bind详解](./this)

`Function.prototype.bind(obj)`：将函数内的 `this` 绑定为 `obj`，并将函数返回



------



##  ES6

### 2.1 let、const 关键字

let：声明一个变量

- 在块级作用域内有效
- 不能重复声明
- 不会预处理，不存在变量提升

const：定义一个常量

- 不能修改
- 其他特点同 let

#### var、let、const 的区别

1. var 定义的变量，没有块的概念，可以跨块访问, 不能跨函数访问。
2. let 定义的变量，只能在块作用域里访问，不能跨块访问，也不能跨函数访问。
3. const 用来定义常量，使用时必须初始化(即必须赋值)，只能在块作用域里访问，而且不能修改。



### 2.2 变量的解构赋值

从对象或数组中提取数组，并赋值给变量（多个）

对象的解构赋值：

 let {n, a} = {n: 'tom', a:12}

数组的解构赋值：

 let [a, b] = [1, 'atguigu']

用途

 给多个形参赋值

##### 获取数组中的值

```
var foo = ["one", "two", "three", "four"];

var [a, b, c] = foo;
console.log(a); // "one"
console.log(b); // "two"
console.log(c); // "three"
// or
var a, b;
[a, b] = [1, 2];
console.log(a); // 1
console.log(b); // 2
```

##### 获取对象中的值

```
const student = {
  name: 'Ming',
  age: 18,
  city: 'Shanghai'
}

const {name, age, city} = student;
console.log(name); // 'Ming'
console.log(age); // 18
console.log(city); // 'Shanghai'
```



### 2.3 模板字符串

简化字符串的拼接

- 必须用``包含
- 变化的部分使用 ${xxx} 定义

```
var name = 'Your name is ' + first + ' ' + last + '.'
// 使用模板字符串
var name = `Your name is ${first} ${last}.`
```



### 2.4 对象的简写方式

省略同名的属性值，省略方法的function

```js
const name='Ming', age='18', city='Shanghai';
//ES5
const student = {
    name: name,
    age: age,
    city: city,
    getName: function() {
      return this.name;
    }
};

//ES6
const student = {
    name, // 同名的属性可以省略不写
    age,
    city,
    getName() { // 可以省略函数的function
      return this.name;
    }
};
console.log(student);//{name: "Ming", age: "18", city: "Shanghai"}
console.log(student.getName()); // Ming
```



### 2.5 箭头函数

作用：定义匿名函数

语法：

- 没有参数：() => console.log('xxxx')
- 一个参数：i => i+2
- 大于一个参数：(i, j) => i+j
- 函数体不用大括号：默认返回结果
- 函数体如果有多个语句，需要用{}包围，若有需要返回的内容，需要手动 return 返回

使用场景：多用于定义回调函数

```
// 形参的情况
// 1.没有形参的时候
let fun1 = () => console.log('我是箭头函数')
fun1()
// 2.只有一个形参的时候，()可以省略
let fun2 = a => console.log(a)
fun2('aaa')
// 3.两个及两个以上形参的时候，()不能省略
let fun3 = (x, y) => console.log(x, y)
fun3(25, 35)
// 函数体的情况
// 1.函数体只有一条语句或表达式的时候，{}可以省略-->会自动返回（return）语句/表达式的结果
fun4 = (x, y) => x + y
console.log(fun4(24, 36))

// 2.函数体不止一条语句或表达式的时候，{}不可以省略
let fun5 = (x, y) => {
  console.log(x, y)
  return x + y
}
console.log(fun5(20, 30))
```

箭头函数的特点：

1. 箭头函数没有自己 this，箭头函数的 this 不是调用的时候决定的，而是在定义的时候处在的对象就是它的 this（这个规则与常规函数的 this 指向相反）
2. 扩展理解：箭头函数的 this 看外层的是否有函数，如果有，外层函数的 this 就是内部箭头函数的 this，如果没有，则 this 是 window

```
<button id="btn1">btn1</button>
<button id="btn2">btn2</button>

let btn1 = document.getElementById('btn1')
let btn2 = document.getElementById('btn2')

btn1.onclick = function() {
  console.log(this) // [object HTMLbuttonElement]
}
btn2.onclick = () => {
  console.log(this) // [object Window]
}
```

将箭头函数改为外层有函数的形式：

```
var obj = {
  name: '箭头函数',
  getNmae() {
    btn2.onclick = () => {
          console.log(this.name) // 箭头函数
        }
  }
}
// 此时箭头函数中的this指向这个obj
```

再举个栗子：

```
let a = {
  b: 'wy',
  c() {
    let d = () => {
      console.log(this.b)
    }
    return d // 注意一定要有这个return
  }
}
let b = 'ss'
a.c()() // wy
```

箭头函数外层有函数c，和函数c的 this 一样。

```
var a = {
    b: 'wy',
    c: () => {
        console.log(this.b)
    }
}
var b = 'ss'
a.c() // ss
```

由于箭头函数外没有函数，所以this指向window



### 2.6 三点运算符

用途

1.rest（不定/可变）参数

用来取代 arguments，但比 arguments 灵活，只能是最后部分形参参数

```
function foo(a, ...value) {
  console.log(value) // [7, 45, 22]
}
foo(5, 7, 45, 22)
```

> 不定参数 value 会返回一个数组，可以用数组的所有方法；而 arguments 只是伪数组，没有数组的各种方法。

2.扩展运算符

```
let arr = [1, 6]
let arr1 = [2, 3, 4, 5]
arr = [1, ...arr1, 6]
console.log(...arr) //[1, 2, 3, 4, 5, 6]
```

相当于会自动遍历这个数组，拿到每一项值



### 2.7 形参默认值

当不传入参数的时候默认使用形参里的默认值

```
function Point(x = 0, y = 0) {
  this.x = x;
  this.y = y;
}
let point = new Point(23, 35)
console.log(point) // {x:23, y:35}
let point2 = new Point() // 不传参数
console.log(point) // {x:0, y:0}
```



### 2.8 Promise

[详见promise专栏](./promise)



### 2.9 Symbol 属性

ES5 中对象的属性名都是字符串，容易造成重名，污染环境。ES6 中添加了一种原始数据类型 symbol。

特点：

1. Symbol 属性值对应的值是唯一的，解决命名冲突问题
2. Symbol 值不能与其他数据进行计算，包括同字符串拼串
3. for in，for of 遍历时不会遍历 symbol 属性

使用：

**1.调用 Symbol 函数得到 symbol 值**

```
// 创建symbol属性值
let symbol = Symbol()
let obj = {username: 'wy', age: 18}
obj[symbol] = 'hi'
console.log(obj) // {username: 'wy', age: 18, symbol(): 'hi'}
// for in，for of 不能遍历symbol属性
for(let i in obj) {
  console.log(i) // username age
}
```

**2.传参标识**

```
let symbol2 = Symbol('owe')
let symbol3 = Symbol('two')
console.log(symbol2 == symbol3) // false
console.log(symbol2, symbol3) // Symbol(owe) Symbol(two)
// 还可以去定义常量，可以作为当前常量的标识
const Person_key = Symbol('Person_key')
console.log(Person_key) // Symbol(Person_key)
```

**3.内置 Symbol 值**

除了定义自己使用的 Symbol 值以外，ES6 还提供了11个内置 Symbol 值，指向语言内部使用的方法：

Symbol.iterator：对象的 Symbol.iterator 属性，指向该对象的默认遍历方法



### 2.10 iterator 接口机制

iterator 是一种接口机制，为各种不同的数据结构提供统一的访问机制

作用：

1. 为各种数据结构，提供一个统一的、简便的访问接口
2. 使得数据结构成员能够按某种次序排列
3. ES6 创造了一种新的遍历命令 for of 循环，Iterator 接口主要供 for of 消费

工作原理：

- 创建一个指针对象（遍历器对象），指向数据结构的起始位置

- 第一次调用 next 方法，指针自动指向数据结构的第一个成员

- 接下来不断调用 next 方法，指针会一直往后移动，直到指向最后一个成员

- 每调用 next 方法返回的是一个包含 value 和 done 的对象，{value: 当前成员的值, done: 布尔值}

  - value 表示当前成员的值，done 对应的布尔值表示当前的数据的结构是否遍历结束
  - 当遍历结束的时候返回的 value 值是 undefined，done 值为 true

  原生具备 iterator 接口的数据（可用for of遍历）

  扩展理解：

  1. 当数据结构上部署了 Symbol.iterator 接口，该数据就是可以用 for of 遍历
  2. 当使用 for of 去遍历目标数据的时候，该数据会自动去找 Symbol.iterator 属性

  // Symbol.iterator 属性指向对象的默认遍历器方法

  1. Array

  2. arguments

  3. set 容器

  4. map 容器

  5. String

     ...

```
// 模拟指针对象（遍历器对象）
function myIterator(arr) { // iterator接口
  let nextIndex = 0;
  return { // 遍历器对象
    next: function() {
      return nextIndex < arr.length ? {value: arr[nextIndex++], done: false}:{value: undefined, done: true}
    }
  }
}
// 准备一个数据
let arr = [1, 4, 65, 'abc']
let iteratorObj = myIterator(arr);
console.log(iteratorObj.next()) // {value: 1, done: false}
console.log(iteratorObj.next()) // {value: 4, done: false}
console.log(iteratorObj.next()) // {value: 65, done: false}
console.log(iteratorObj.next()) // {value: "abc", done: false}
console.log(iteratorObj.next()) // {value: undefined, done: true}
console.log(iteratorObj.next()) // {value: undefined, done: true}
for(let i of arr) {
  console.log(i) // 1 4 65 abc
}
```

部署了 iterator 接口的数据类型可以使用 for of 遍历。

这些数据结构已经部署了上面的 iterator：数组、字符串、arguments、set 容器、map 容器

```
// string可以使用 for of 遍历
let str = 'abcdefg'
for(let i of str) {
  console.log(i) // a b c d e f g
}
// arguments可以使用 for of 遍历
funtion fun() {
    for(let i of aguments) {
    console.log(i) // 1 4 65 abc
  }
}
fun(1, 4, 65, 'abc')
// 但是 arguments不可以使用 for each 遍历（因为它是伪数组）
// object不可以使用 for of 遍历（因为它没有部署iterator接口）
let obj = {username: 'wy', age: 18}
for(let i of obj) {
  console.log(i) // Uncaught TypeError:obj is not iterable
}
```

前面 Symbol 属性中提到的：

对象的Symbol.iterator属性，指向该对象的默认遍历器方法。

其用法：

```
// 等同于在指定的数据结构上部署了iterator接口
// 当使用for of去遍历某一个数据结构的时候，首先去找Symbol.iterator，找到了就可以遍历，否则不能遍历，报错：xxx is not iterable
let obj = {
    username: 'wy',
    age: 18,
    [Symbol.iterator](){
    let nextIndex = 0;
    return { // 遍历器对象
      next: () => {
        const arr = Object.values(this)
        return nextIndex < arr.length ? {value: arr[nextIndex++], done: false}:{value: undefined, done: true}
      }
    }
  }
}
for(let i of obj) {
  console.log(i) // wy 18
}
```

其实，使用三点运算符、解构赋值时，也默认会调用iterator接口



### 2.11 Generator 函数

概念：

1. ES6 提供的解决异步编程的方案之一
2. Generator 函数是一个状态机，内部封装了不同状态的数据
3. 用来生成遍历器对象
4. 可暂停函数（惰性求值），yield 可暂停，next 方法可启动。每次返回的是 yield 后的表达式结果

特点：

1. function 与函数名之间有一个星号
2. 内部用 yield 表达式来定义不同的状态
3. generator 函数返回的是指针对象（iterator），而不会执行函数内部逻辑
4. 调用 next 方法函数内部逻辑开始执行，遇到 yield 表达式停止，返回{value: yield 后的表达式结果/undefined, done:true/false}
5. 再次调用 next 方法会从上一次停止时的 yield 处开始，直到最后
6. yield 语句返回结果通常为 undefined，当调用 next 方法时传参内容会作为启动时（上一个）yield 语句的返回值

简单使用：

```js
function* myGenerator() {
  console.log('开始执行console.log语句不会阻断')
  let result = yield 'hi'; //result的值是从这里启动的next()的参数
  console.log(result)
  console.log('yield后跟一个语句而不是值时')
  yield console.log('console.log会直接打印出来');//yield后跟一个语句时，返回的对象的value就是undefined
  console.log('暂停执行')
  yield 'generator'; //yield后跟一个值时，返回的对象的value就是这个值
  console.log('遍历完毕')
  return '返回结果' //没有return，最后一个yield的value会为undefined
}
// 生成遍历器对象
let MG = myGenerator()
// 执行函数，遇到yield后即暂停
console.log(MG) // 遍历器对象
console.log(MG.next()) // 函数执行。遇到yield暂停
console.log(MG.next('这个值会作为启动时yield语句的返回值'))
console.log(MG.next())
console.log(MG.next())
// 开始执行console.log语句不会阻断
// {value: "hi", done: false}
// 这个值会作为启动时yield语句的返回值
// yield后跟一个语句而不是值时
// console.log会直接打印出来
// {value: undefined, done: false}
// 暂停执行
// {value: "generator", done: false}
// 遍历完毕
// {value: "返回结果", done: true}
```

next() 会一直执行直到遇到一个 yield，就会执行其后表达式然后停止在这一步。

对象的 symbol.iterator 属性，指向遍历器对象，结合 generator 的用法：

```js
let obj = {username: 'wy', age: 18}
obj[Symbol.iterator] = function* myTest() {
  yield 1
  yield 2
  yield 3
}
for(let i of obj) {
  console.log(i) // 1 2 3
}
```

下面是 Promise 中的案例用 Generator 写的练习（用 setTimeout 来模拟 ajax 请求）

```js
function getData(url) {
  setTimeout(() => { // 模拟一个get请求
    var news = {id: 1, content: 'lalala', commentsUrl: '/comments?newsId=1'} // 模拟news数据
    var comments = [{comments: 'aaa', newsId: '1'}, {comments: 'bbb', newsId: '1'}] // 模拟comments数据
    if(url === 'http://localhost:3000/news?id=1') { // 假设news数据请求成功
      console.log(`根据${url}获取data内容：${news.content}`)
      let newUrl = `http://localhost:3000/news?id=1${news.commentsUrl}` // 新的url
      SX.next(newUrl) // 将新的url传输出去
    } else if(url === 'http://localhost:3000/news?id=1/comments?newsId=1') { // 假设comments数据请求成功
      console.log(`根据${url}获取data内容：`)
      console.log(comments)
    } else { // 假设请求失败
      console.log('失败')
    }
  }, 2000)
}
function* sendXml() {
  let newUrl = yield getData('http://localhost:3000/news?id=1') // url就是传输过来的新的url
  yield getData(newUrl) // 用新的url再次调用get请求
}
// 获取遍历器对象
let SX = sendXml()
SX.next()
// 根据http://localhost:3000/news?id=1获取data内容：lalala
// 根据http://localhost:3000/news?id=1/comments?newsId=1获取data内容： 
// [{comments: "aaa", newsId: "1"}, {comments: "bbb", newsId: "1"}]
```



### 2.12 async 函数

概念：真正意义上去解决异步回调的问题，同步流程表达异步操作

本质：Generator 的语法糖

语法：

```
async function foo() {
    await 异步操作;
  await 异步操作;
}
```

特点：

1. 不需要像 Generator 去调用 next 方法，遇到 await 等待，当前的异步操作完成就往下执行
2. 返回的总是 Promise 对象，可以用 then 方法进行下一步操作
3. async 取代 Generator 函数的星号，await 取代 Generator 的 yield
4. 语意上更为明确，使用简单

简单使用：

```
async function foo() {
  return new Promise(resolve => {
    /*
    setTimeout(() => {
      resolve()
    }, 2000)
    */
    setTimeout(resolve, 2000) // 简洁写法
  })
}
async function test() {
  console.log('开始执行', new Date().toTimeString())
  await foo();
  console.log('执行完毕', new Date().toTimeString())
}
test()
// 开始执行 01:25:09 GMT+0800 (中国标准时间)
// 执行完毕 01:25:11 GMT+0800 (中国标准时间)
```

async 里 await 返回值：

```
function test2() {
  return 'xxx'
}
async function asyncPrint() {
  let result = await test2();
  let result2 = await Promise.resolve('成功了');
  let result3 = await Promise.reject('失败了');
  console.log(result); // xxx
  console.log(result2); // 成功了
  console.log(result3); // Uncaught (in promise) 失败了
}
asyncPrint();
```

还是同一个案例

```
// 获取新闻内容
async function getNews(url) {
  return new Promise((resolve, reject) => {
    $.get({
      method: 'GET',
      url,
      success: value => resolve(value),
      error: reason => resolve(false)
    })
  })
}

async function sendXml() {
  let result = await getNews('http://localhost:3000/news?id=7');
  console.log(result);
  if(!result) {console.log('暂时没有新闻');return}
  let result = await getNews('http://localhost:3000/news?id=7' + result.commentsUrl);
  console.log(result);
}
sendXml();
```



### 2.13 class 类

1. 通过 class 定义类/实现类的继承
2. 在类中通过 constructor 定义构造方法
3. 通过 new 来创建类的实例
4. 通过 extends 来实现类的继承
5. 通过 super 调用父类的构造方法
6. 重写从父类中继承的一般方法

```
// ES5
function Person(name, age) {
  this.name = name
  this.age = age
}
let person = new Person('wy', 18)
console.log(person)
// ES6
// 定义一个人物的类
class Person {
  // 类的构造方法
  constructor(name, age) {
    this.name = name
    this.age = age
  }
  // 类的一般方法
  showName() {
    console.log('父类方法:', this.name)
  }
}
let person = new Person('wy', 18)
console.log(person)
person.showName() // 父类方法: wy
// 子类
class StarPerson extends Person {
  constructor(name, age, salary) {
    super(name, age) // 调用父类的构造方法
    this.salary = salary
  }
  // 父类的方法重写
  showName() {
    console.log('子类方法:', this.name, this.age, this.salary)
  }
}
let p1 = new StarPerson('wd', 36, 1000)
console.log(p1)
p1.showName() // 子类方法: wd 36 1000
```

子类必须在 `constructor` 方法中调用 `super` 方法，否则新建实例时会报错。

这是因为子类没有自己的 `this` 对象，必须先通过父类的构造函数完成塑造，得到与父类同样的实例属性和方法，然后再对其进行加工，加上子类自己的实例属性和方法。**如果不在子类的 `constructor` 中调用 `super` 方法，子类就得不到 `this` 对象。就不可以使用 `this` 关键字，否则会报错。**

> ES5 的继承，实质是先创造子类的实例对象 `this`，然后再将父类的方法添加到 `this` 上面（`Parent.apply(this)`）。
>
> ES6 的继承机制完全不同，实质是先将父类实例对象的属性和方法，加到 `this` 上面（所以必须先调用 `super` 方法），然后再用子类的构造函数修改 `this`。
>
> 如果子类没有定义`constructor`方法，这个方法会被**默认添加**。

#### super 关键字

`super` 这个关键字，既可以当作**函数**使用，也可以当作**对象**使用。在这两种情况下，它的用法完全不同。

**1.作为函数调用：**

代表父类的构造函数，但是返回的是子类的实例，即 `super` 内部的 `this` 指的是子类的实例。

```
class A {
  constructor() {
    console.log(this);
  }
}
class B extends A {
  constructor() {
    super();
  }
}
new A() // A {}
new B() // B {}
```

在 `super()` 执行时，它指向的是子类 `B` 的构造函数，而不是父类 `A` 的构造函数。也就是说，`super()` 内部的 `this` 指向的是 `B`。

因此 `super()` 在这里相当于 `A.prototype.constructor.call(this)`。

**举个栗子**

```
class A {
  constructor() {
    this.x = 1;
  }
  print() {
    console.log(this.x);
  }
}

class B extends A {
  constructor() {
    super();
    this.x = 2; // 定义在实例b上
    super.x = 3; // super指向子类实例b，覆盖2
    console.log(super.x); // 读的是原型上的（A.prototype.x），所以返回undefined
  }
  m() {
    super.print(); //实际执行的是super.print.call(this)
  }
}

let b = new B();
b.m() // 3
```

super.print() 虽然调用的是 A.prototype.print()，但是其内部的 this 指向子类 B 的实例 b。

又因为 super.x 赋值的属性会变成子类实例 b 的属性，所以 b.m() 打印 3，而 console.log(super.x)，读的是`A.prototype.x`，所以打印 undefined。

**2.作为对象：**

**在普通方法中，指向父类的原型对象；在静态方法中，指向父类。**

```
class A {
  constructor() { // 属性s定义在A实例（也就是b）上
      this.s = 1
  }
  p() { // 方法p定义在原型（也就是A.proptotype）上
    return 2;
  }
}

class B extends A {
  constructor() {
    super();
    console.log(super.p()); // 2
    console.log(super.s); // undefined
  }
}

let b = new B();
console.log(b.__proto__ === B.prototype) // true
console.log(b.__proto__.__proto__ === A.prototype) // true
```

上面代码中，子类 `B` 当中的 `super.p()`，就是将 `super` 当作一个对象使用。这时，`super` 在普通方法之中，指向 `A.prototype`，所以 `super.p()` 就相当于`A.prototype.p()`。

> 这里需要注意：由于 `super` 指向**父类的原型对象**，所以定义在**父类实例上的方法或属性，是无法通过 `super` 调用的**。如果属性 x 定义在 `父类.prototype` 上面，那么 `super.x` 就可以取到它的值。
>
> 当 `super` 作为对象，用在静态方法之中时， 将指向父类，而不是父类的原型对象。并且其 this 指向子类而不是子类实例。



### 2.14 Module 模块化

ES6 将一个文件视为一个模块，一个模块中用 export 来导出多个变量或函数。

```
// 导出变量
export var name = 'Rainbow'
// or
var name = 'Rainbow';
var age = '21';
export {name, age};
// 导出函数
export function myModule(someArgs) {
  return someArgs;
}
```

在一个模块中定义好的导出可以在另外一个模块通过 import 引用

```
import {myModule} from 'main.js';
import {name, age} from 'test.js';
```

**import 后加花括号{}和不加花括号的区别：**

`export default` 命令用于指定模块的默认输出。一个模块只能有一个默认输出，因此 `export deault` 命令只能使用一次。

所以，import 命令后面才不用加大括号，相反其它的 export 输出可以有多个，且 import 时必须加大括号。

也就是说，通过 `import xxx from "..."` 引入的，xxx 已经是默认导出项的别名（自己取的其他名字）了。
而 `import { xxx } from "..."` 引入的，{ xxx } 只是导出项的名字（跟原名一致），而并非导入时的名字。



### 2.15  Proxy

[proxy详解](./proxy)



### 2.2.1 字符串、数组的扩展

#### 字符串

1. includes(str)：判断是否包含指定的字符串
2. startsWith(str)：判断是否以指定字符串开头
3. endsWith(str)：判断是否以指定字符串结尾
4. repeat(count)：重复指定次数

```
let str = 'asdfghjkl'

console.log(str.includes('t')) // false
console.log(str.includes('a')) // true

console.log(str.startsWith('a')) // true
console.log(str.endsWith('l')) // true
console.log(str.repeat(3)) // asdfghjklasdfghjklasdfghjkl
```

#### 数值

1. 二进制与八进制数值表示法：二进制用0b，八进制用0o
2. Number.isFinite(i)：判断是否是有限大的数
3. Number.isNaN(i)：判断是否是NaN
4. Number.isInteger(i)：判断是否是整数
5. Number.parseInt(str)：将字符串转换为对应的数值
6. Math.trunc(i)：直接去除小数部分

```
console.log(0b1010) // 10
console.log(0o56) // 46

console.log(Number.isFinite(Infinity)) // false
console.log(Number.isNaN(NaN)) // true
console.log(Number.isInteger(123.12)) // false
console.log(Number.isInteger(123.0)) // true

console.log(Number.parseInt('123abc123')) // 123
console.log(Number.parseInt('a123abc123')) // NaN

console.log(Math.trunc(123.123)) // 123
```



### 2.2.2 数组方法的扩展

1. `Array.from(v)`：将伪数组对象或可遍历对象转换为真数组
2. `Array.of(v1, v2, v3)`：将一系列值转换成数组
3. `find(function(value, index, arr) {return true})`：找出第一个满足条件返回 true 的元素
4. `findIndex(function(value,index,arr) {return true})`：找出第一个满足条件返回 true 的元素下标

```js
<button>测试1</button>
<br>
<button>测试2</button>
<br>
<button>测试3</button>
<br>

let btns = document.getElementsByTagName('button') // 获取一个伪数组，没有数组的一般方法
Array.from(btns).forEach(i => {
    console.log(i)
})

let arr = Array.of(1, 4, 'abc', true)
console.log(arr) // [1, 4, "abc", true]

let arr2 = [1, 4, 3, 7, 5, 8]
let result = arr2.find((item, index) => {
  return item > 4
})
console.log(result) // 7
let result2 = arr2.findIndex((item, index) => {
  return item > 4
})
console.log(result2) // 3
```



### 2.2.3 对象方法的扩展

1. `Object.is(v1,v2)`：判断2个数据是否完全相等
2. `Object.assign(target,source1,source2..)`：将源对象的属性复制到目标对象上
3. 直接操作`__proto__`属性：`let obj2 = {};obj2.__proto__ = obj1;`

```js
console.log(0 == -0) // true
console.log(NaN == NaN) // false(NaN和任何值都不相等)

//Object.is()是以类型和字符串来判断的
console.log(Object.is(0, -0)) // false
console.log(Object.is(NaN, NaN)) // true

let obj = {}
let obj1 = {username: 'wy', age: 18}
let obj2 = {sex: 'male'}
Object.assign(obj, obj1, obj2)
console.log(obj) // {username: 'wy', age: 18, sex: 'male'}

let obj3 = {}
let obj4 = {money: 5000}
obj3.__proto__ = obj4 // 设置obj4为obj3的原型（父类）
console.log(obj3) // {}>__proto__:money: 5000
console.log(obj3.money) // 5000
```



### 2.2.4 Set 和 Map 数据结构

[详见set-map数据结构页](./set-map)



### 2.2.5 for of 用法

#### `for(let value of target) {}` 循环遍历（必须部署 iterator）

1. 遍历数组
2. 遍历 Set
3. 遍历 Map
4. 遍历字符串
5. 遍历伪数组

前面 Set 去重的方法用 for of 可以这样写：

```js
let arr1 = [1, 2, 4, 5, 5, 6, 8, 2]
let arr = []
let set = new Set(arr1)
for(let i of set) {
  arr.push(i) 
}
console.log(arr) // [1, 2, 4, 5, 6, 8]
```

####  对比 `for in`

```js
//for-in遍历数组的坑
for (var index in myArray) { // 千万别这样做
  console.log(myArray[index]);
}
//在这段代码中，赋给index的值不是实际的数字，而是字符串“0”、“1”、“2”，此时很可能在无意之间进行字符串算数计算，例如：“2” + 1 == “21”，这给编码过程带来极大的不便。
//作用于数组的for-in循环体除了遍历数组元素外，还会遍历自定义属性。举个例子，如果你的数组中有一个可枚举属性myArray.name，循环将额外执行一次，遍历到名为“name”的索引。就连数组原型链上的属性都能被访问到。
//最让人震惊的是，在某些情况下，这段代码可能按照随机顺序遍历数组元素。
//简而言之，for-in是为普通对象设计的，你可以遍历得到字符串类型的键，因此不适用于数组遍历。
```

#### for of 的优点

- 这是最简洁、最直接的遍历数组元素的语法
- 这个方法避开了for-in循环的所有缺陷
- 与forEach()不同的是，它可以正确响应break、continue和return语句

for-in循环用来遍历对象属性。

for-of循环用来遍历数据—例如数组中的值。

or-of循环不仅支持数组，还支持大多数类数组对象，例如DOM [NodeList对象](https://developer.mozilla.org/en-US/docs/Web/API/NodeList)。

for-of循环也支持字符串遍历，它将字符串视为一系列的Unicode字符来进行遍历

```js
for (var chr of "") {
  alert(chr);
}
```



## ES7

1. 指数运算符`**`（幂）

```
console.log(3 ** 3) // 27
```

1. Array.prototype.includes(value)：判断数组中是否包含指定 value

   > ES6 中只有 String 的 includes，ES7 中补上了 Array 的 includes

```
let arr = [1, 4, 5, 6, 'abc']
console.log(arr.includes('a')) // false
```

### 参考

[尚硅谷ECMAScript教程(ecmascript详解含es5、es6)](https://www.bilibili.com/video/BV18s411E7Nd?p=1)

