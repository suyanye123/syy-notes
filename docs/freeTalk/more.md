## JS篇

### 一、ES6新特性

- 迭代器 ，新增for of	 for...of 循环可以遍历数组、Set 和 Map 结构、某些类似数组的对象、对象，以及字符串
- set map数据结构   Set 数据结构，类似数组。所有的数据都是唯一的，没有重复的值。它本身是一个构造函数
- promise   async await(ES7)
- let const
- 箭头函数、解构赋值、三点展开运算符、模板字符串
- import、export（Commonjs -- require 引入 module.expose暴露）
- class
- proxy、reflect

### 二、在new的过程发生了什么

提示：4件事  

- 创建一个新对象，
- 将新对象指定为构造函数的this，
- 执行函数中的代码，
- 返回新对象



### 三、 ES5和ES6的继承 todo

- ES5的继承是通过构造函数和prototype来实现的，先创建子类的实例对象，然后将父类的方法指向新的this

- ES6 的继承机制完全不同，实质上是先创建父类的实例对象 this（所以必须先调用父类的 super()方法），然后再用子类的构造函数修改this。

  具体的：ES6 通过 class 关键字定义类，里面有构造方法，类之间通过 extends 关键字实现继承。子类必须在 constructor 方法中调用 super 方法，否则新建实例报错。因为子类没有自己的 this 对象，而是继承了父类的 this 对象，然后对其进行加工。如果不调用 super 方法，子类得不到 this 对象。

  ps：super 关键字指代父类的实例，即父类的 this 对象。在子类构造函数中，调用 super 后，才可使用 this 关键字，否则报错。

### 四、数组有哪些方法

push-返回新长度； pop-删除并返回最后一个 ； concat-数组拼接，返回新数组；

join(',') - 数组转成字符串拼接，默认符号为，返回新字符串，传' '时为无拼接符号；

 reverse-反转数组，更改原数组并返回； 	 shift-删除返回第一个元素；

 slice(start,end)-截取数组一部分，包含开始，不包含结束，返回新数组； 	 sort：排序，改变原数组；

 tostring-转字符串； unshift-开头添加，返回新长度；

forEach (item,index,items)遍历;

### 五、对象有哪些方法

map foreach

### 六、拷贝，浅拷贝有哪些方法

浅拷贝： …展开 ， 



### 七、Event Loop   todo

事件循环机制：Js是单线程为了模仿多线程进行并发执行，js引擎划分除了两种内存空间，一种是可执行栈，用来存放同步任务（注意是栈，先进后出）；另一种是任务队列，用来存放异步任务（注意时队列，先进先出）

每一个任务有一个或多个回调函数（callback），当前一个任务结束后，此时不是执行后一个任务，而是执行回调函数，后一个任务则是不等前一个任务结束就会执行，所以程序的执行顺序与任务的排列顺序是不一致的、异步的。这种模式所执行的任务被称为异步任务。
异步任务指的是，不进入主线程、而进入"任务队列”（task queue）的任务，只有"任务队列"通知主线程，某个异步任务可以执行了，该任务才会进入主线程执行。所有同步任务都在主线程（由JS引擎维护，用来负责解释和执行JavaScript代码）上执行，形成一个执行栈（execution context stack）。
2、主线程之外，还存在一个"消息队列"（queue）（特点：先进先出）。只要异步任务有了运行结果，就在"消息队列"之中放置一个事件。
3、一旦"执行栈"中的所有同步任务执行完毕，系统就会读取"消息队列"，看看里面有哪些事件。那些对应的异步任务，于是结束等待状态，进入执行栈，开始执行。
4、主线程不断重复上面的第三步。

宏任务： dom事件回调 ajax回调 定时器回调 

微任务：promise回调 mutation回调

微任务的执行时机，晚于当前本轮事件循环的 Call Stack（调用栈）中的代码（宏任务），早于事件处理函数和定时器函数。减少操作中用户可感知到的延迟。确保任务顺序的一致性，即便当结果或数据是同步可用的。批量操作的优化



### 八、http协议流程

三次握手四次挥手



### 九、get、post区别

get传参方式是通过地址栏URL传递，是可以直接看到get传递的参数，post传参方式参数URL不可见，get把请求的数据在URL后通过？连接，通过&进行参数分割。psot将参数存放在HTTP的包体内

.get传递数据是通过URL进行传递，对传递的数据长度是受到URL大小的限制，URL最大长度是2048个字符。post没有长度限制

.get后退不会有影响，post后退会重新进行提交

.get请求可以被缓存，post不可以被缓存

.get请求只URL编码，post支持多种编码方式

.get请求的记录会留在历史记录中，post请求不会留在历史记录

.get只支持ASCII字符，post没有字符类型限制

什么是ajax，axios

①　创建对象 const xhr = new XMLhttpRequest()

②　初始化  xhr.open(‘GET’, ‘URL ’ )      可以设置 setRequestHeader

③　发送   xhr.send()

④　事件绑定 xhr.onreadystatechange =function(){ if (xhr.readystate===4){

If(xhr.status==200) }     else{}    }

### 十、原型链、instance of、闭包

### 十一、Promise

### 十二、JS事件

事件绑定，事件冒泡，事件捕获

```js
//手写事件代理
```

### 十三、跨域

### 十四、手写练习

- 防抖、节流

```js
throttle(){

}

debounce(){

}
```



## Vue篇

### 一、回流、重绘

浏览器渲染整个过程

### 二、组件通信

vuex， props，$emit，provide/inject，eventbus事件总线，订阅发布，本地缓存，

Cookie,sessionstorage,localstorage的区别

Cookie大小限制为4KB左右。它的主要用途有保存登录信息，

Loaclstorage一直存在，存在于本地。。。。用来存放token，通过在请求头加jwt进行跨域验证

Sessionstorage会话期间存在，存在服务器

### 三、computed、watch

- computed-计算属性，是通过已有属性计算新值，然后挂载到vm实例上

底层还是借助object.defineProperty的get、set实现的

结算属性得到的值可以缓存，不会每次使用时都调用getter，
只有第一次初始化时，或者依赖的数据发生变化时才调用getter

并且vue中调用computed的是vm实例，取data里的数据要使用this，在computed中注意不要使用箭头函数

- watch



### 四、v-for中为什么要绑定key

虚拟dom，diff算法



### 六、数据双向绑定

### 七、webpack

### 十、vue2与vue3的差异

#### 1. 生命周期的改变

vue2: 

```

```
vue3:
```
 beforeCreated created beforeMounted mounted 
```

#### 2. template中支持多个子节点

用`fragment`作为根节点包裹，最终不会渲染fragent

#### 3. 响应性的改变

```js
// vue2响应式数据基于 object.defineProperty ，在初始化的时候需要递归遍历属性，然后通过数据劫持实现响应式。
// vue2不能检测到对象属性的添加、删除；可以使用 $set来添加对象属性
// 不能检测到数组内部元素根据index进行修改、length修改；但是可以使用vue2封装好的7个数组方法进行操作，或使用$set
```

```js
// vue3响应式基于 Proxy代理实现的，性能有很大提升，且响应式不区分数组和对象，可以检测到其内部的更改
//同时暴露了一些api,比如 ref、reactive 等等，用于声明响应式数据
```

#### 4. compositonAPI

vue3新增 setup函数，接受props和context两个参数，setup在beforeCreated与created之间执行，此时数据还未解析初始化，所以setup里的this被设定为undfined

在 `setup `中将同一业务逻辑代码写在一起，将返回的所有内容都暴露给组件的其余部分 ，即为组合API，可以很方便的进行抽离和复用，取代Vue2中的mixin

#### 5.`<script setup>`     todo

setup语法糖

- 组件自动注册：在 script setup 中，引入的组件可以直接使用，无需再通过`components`进行注册，并且无法指定当前组件的名字，它会自动以文件名为主，也就是不用再写`name`属性了。示例：

```vue
<template>
    <Child />
</template>
<script setup>
import Child from './Child.vue'
</script>
```

如果需要定义类似 name 的属性，可以再加个平级的 script 标签，在里面实现即可。

https://juejin.cn/post/6983626263327932429?utm_source=gold_browser_extension

https://www.jianshu.com/p/f97c029b1725

## CSS篇

### 一、flex布局题目

```html
<div class='box'>
	<span class='item'/>
</div>
```

```html
<div class="box">
  <div class="column">
    <span class="item"></span>
    <span class="item"></span>
  </div>
  <div class="column">
    <span class="item"></span>
    <span class="item"></span>
  </div>
</div>
```

<img src="..\.vuepress\alias\bqb\o35hYFvQkimzH8b.png" alt="1" style="zoom: 33%;" />

```css
.box{display:flex}	//1
.box{display:flex;justyfy-content:center} //2
```



### 二、grid布局





### 三、一些奇怪的练习

-  多种方法实现水平居中

```
flex 、 margin：auto 、text-align:center、position：absolute
```

- 清除浮动的几种方式，及原理

```
::after / <br> / clear: both
创建父级 BFC(overflow:hidden)
父级设置高度
触发条件:根元素position: absolute/fixed display: inline-block / table
float 元素ovevflow !== visible
规则:
属于同一个 BFC 的两个相邻 Box 垂直排列属于同一个 BFC 的两个相邻 Box 的 margin 会发生重叠BFC 的区域不会与 float 的元素区域重叠计算 BFC 的高度时，浮动子元素也参与计算文字层不会被浮动层覆盖，环绕于周围
```

- 用css画一个三角形
- 

### 四、定义

什么是BFC：

什么是盒模型



