### Promise 对象

1. Promise 对象：代表了未来某个将要发生的事件（通常是一个异步操作）

   有了 promise 对象，可以将异步操作以同步的流程表达出来，避免了层层嵌套的回调函数（回调地狱）

   ES6的 Promise 是一个构造函数，用来生成 Promise 实例

2. 使用 promise 基本步骤（2步）：

   - 创建 promise 对象
   - 调用 promise 的 then()

3. promise 对象的3个状态

   - pending ：初始化状态
   - fullfilled（resolved）：成功状态
   - rejected：失败状态

4. 应用

   - 使用 promise 实现超时处理
   - 使用 promise 封装处理 ajax 请求

```js
const p = new Promise((resolve, reject) => { // 同步执行
  // 初始化promise状态：pending
  console.log(111)
  // 执行异步操作，通常是发送ajax请求 或 开启定时器
  setTimeout(() => {
    console.log(333)
    // 根据异步任务的返回结果来去修改promise的状态
    // 异步任务成功
    resolve('xixi'); // 修改promise的状态为fullfilled（成功的状态）
    // 异步任务失败
    //reject('555') // 修改promise的状态为rejected（失败的状态）
  }, 1000)
})
console.log(222)
p.then(
  value => { // 成功的回调
      console.log('成功了',value)
  },
  reason => { // 失败的回调
      console.log('失败了',reason)
  }
)
```

下面是一个案例练习

需求：

1. 发送 ajax 请求获取新闻内容
2. 新闻内容获取成功后再次发送请求，获取对应的新闻评论内容
3. 新闻内容获取失败则不需要再次发送请求

```js
// 定义获取新闻的功能函数
function getData(url) {
  let promise = new Promise((resolve, reject) => {
    // 状态：初始化
    // 执行异步任务
    // 创建 xmlHttp 实例对象
    let xmlHttp = new XMLHttpRequest();
    console.log(xmlHttp.readyState);
    // 绑定监听 readyState
    xmlHttp.onreadystatechange = function() {
      if(xmlHttp.readyState === 4) {
        if(xmlHttp.status === 200) {
          // 修改状态
          resolve(xmlHttp.responseText); // 修改promise的状态为成功的状态
        } else {
          reject('暂时没有新闻内容')
        }
      }
    }

    //open 设置请求的方式以及url
    xmlHttp.open('GET', url);
    // 发送
    xmlHttp.send();
  })
  return promise;
}

getData('http://localhost:3000/news?if=2').then(
  (value) => {
    console.log(value);
    // 发送请求获取评论内容准备url
    let commentsUrl = JSON.parse(value).commentsUrl;
    let url = 'https://localhost:3000' + commentsUrl;
    // 发送请求
    return getData(url);
  }),
  (reason) => {
    console.log(reason);
  }
```

### 

前言
---

在异步编程中，Promise 扮演了举足轻重的角色，比传统的解决方案（回调函数和事件）更合理和更强大。有些朋友对于这个几乎每天都在打交道的“老朋友”，貌似全懂,但稍加深入就可能疑问百出，本文带大家深入理解这个熟悉的陌生人—— Promise.

基本用法
----

### 1.语法

`new Promise( function(resolve, reject) {...} /* executor */  )`

*   构建 Promise 对象时，需要传入一个 executor 函数，主要业务流程都在 executor 函数中执行。
*   Promise构造函数执行时立即调用executor 函数， resolve 和 reject 两个函数作为参数传递给executor，resolve 和 reject 函数被调用时，分别将promise的状态改为fulfilled（完成）或rejected（失败）。**一旦状态改变，就不会再变**，任何时候都可以得到这个结果。
*   在 executor 函数中调用 resolve 函数后，会触发 promise.then 设置的回调函数；而调用 reject 函数后，会触发 promise.catch 设置的回调函数。
    ![](https://img-blog.csdnimg.cn/img_convert/2eee3761cf3ca9710a4e9ca98450601a.png)

值得注意的是，**Promise 是用来管理异步编程的，它本身不是异步的**，new Promise的时候会立即把executor函数执行，只不过我们一般会在executor函数中处理一个异步操作。比如下面代码中，一开始是会先打印出2。

```javascript
let p1 = new Promise(()=>{
    setTimeout(()=>{
      console.log(1)
    },1000)
    console.log(2)
  })
console.log(3) // 2 3 1
```

Promise 采用了回调函数延迟绑定技术，在执行 resolve 函数的时候，回调函数还没有绑定，那么只能**推迟回调函数的执行**。这具体是啥意思呢？我们先来看下面的例子：

```javascript
let p1 = new Promise((resolve,reject)=>{
  console.log(1);
  resolve('学致前端攻略')
  console.log(2)
})
// then:设置成功或者失败后处理的方法
p1.then(result=>{
 //p1延迟绑定回调函数
  console.log('成功 '+result)
},reason=>{
  console.log('失败 '+reason)
})
console.log(3)
// 1
// 2
// 3
// 成功 
```

new Promise的时候先执行executor函数，打印出 1、2，Promise在执行resolve时，触发微任务，还是继续往下执行同步任务，
执行p1.then时，存储起来两个函数（此时这两个函数还没有执行）,然后打印出3，此时同步任务执行完成，最后执行刚刚那个微任务，从而执行.then中成功的方法。

### 错误处理

Promise 对象的错误**具有“冒泡”性质，会一直向后传递**，直到被 onReject 函数处理或 catch 语句捕获为止。具备了这样“冒泡”的特性后，就不需要在每个 Promise 对象中单独捕获异常了。

要遇到一个then，要执行成功或者失败的方法，但如果此方法并没有在当前then中被定义，则顺延到下一个对应的函数

```javascript
function executor (resolve, reject) {
  let rand = Math.random()
  console.log(1)
  console.log(rand)
  if (rand > 0.5) {
    resolve()
  } else {
    reject()
  }
}
var p0 = new Promise(executor)
var p1 = p0.then((value) => {
  console.log('succeed-1')
  return new Promise(executor)
})
var p2 = p1.then((value) => {
  console.log('succeed-2')
  return new Promise(executor)
})
p2.catch((error) => {
  console.log('error', error)
})
console.log(2)
```

这段代码有三个 Promise 对象：p0～p2。无论哪个对象里面抛出异常，都可以通过最后一个对象 p2.catch 来捕获异常，通过这种方式可以将所有 Promise 对象的错误合并到一个函数来处理，这样就解决了每个任务都需要单独处理异常的问题。

通过这种方式，我们就消灭了嵌套调用和频繁的错误处理，这样使得我们写出来的代码更加优雅，更加符合人的线性思维。

### Promise链式调用

我们都知道可以把多个Promise连接到一起来表示一系列异步骤。这种方式可以实现的关键在于以下两个Promise 固有行为特性：

*   每次你对Promise调用then，它都会创建并返回一个新的Promise，我们可以将其链接起来；
*   不管从then调用的完成回调（第一个参数）返回的值是什么，它都会被自动设置为被链接Promise（第一点中的）的完成。

先通过下面的例子，来解释一下刚刚这段话是什么意思，然后详细介绍下链式调用的执行流程

```javascript
let p1=new Promise((resolve,reject)=>{
    resolve(100) // 决定了下个then中成功方法会被执行
})
// 连接p1
let p2=p1.then(result=>{
    console.log('成功1 '+result)
    return Promise.reject(1) 
// 返回一个新的Promise实例，决定了当前实例是失败的，所以决定下一个then中失败方法会被执行
},reason=>{
    console.log('失败1 '+reason)
    return 200
})
// 连接p2 
let p3=p2.then(result=>{
    console.log('成功2 '+result)
},reason=>{
    console.log('失败2 '+reason)
})
// 成功1 100
// 失败2 1
```

我们通过返回 Promise.reject(1) ，完成了第一个调用then创建并返回的promise p2。p2的then调用在运行时会从return Promise.reject(1) 语句接受完成值。当然，p2.then又创建了另一个新的promise，可以用变量p3存储。

new Promise出来的实例，成功或者失败，取决于executor函数执行的时候，**执行的是resolve还是reject决定的**，或**executor函数执行发生异常错误**，这两种情况都会把实例状态改为失败的。

p2执行then返回的新实例的状态，决定下一个then中哪一个方法会被执行，有以下几种情况：

*   不论是成功的方法执行，还是失败的方法执行（then中的两个方法），凡是执行抛出了异常，则都会把实例的状态改为失败。
*   方法中如果返回一个新的Promise实例（比如上例中的Promise.reject(1)），返回这个实例的结果是成功还是失败，也决定了当前实例是成功还是失败。
*   剩下的情况基本上都是让实例变为成功的状态，上一个then中方法返回的结果会传递到下一个then的方法中。

我们再来看个例子

```javascript
new Promise(resolve=>{
    resolve(a) // 报错 
// 这个executor函数执行发生异常错误，决定下个then失败方法会被执行
}).then(result=>{
    console.log(`成功：${result}`)
    return result*10
},reason=>{
    console.log(`失败：${reason}`)
// 执行这句时候，没有发生异常或者返回一个失败的Promise实例，所以下个then成功方法会被执行
// 这里没有return，最后会返回 undefined
}).then(result=>{
    console.log(`成功：${result}`)
},reason=>{
    console.log(`失败：${reason}`)
})
// 失败：ReferenceError: a is not defined
// 成功：undefined
```

### async & await

从上面一些例子，我们可以看出，虽然使用 Promise 能很好地解决回调地狱的问题，但是这种方式充满了 Promise 的 then() 方法，如果处理流程比较复杂的话，那么整段代码将充斥着 then，语义化不明显，代码不能很好地表示执行流程。

ES7中新增的异步编程方法，async/await的实现是基于 Promise的，简单而言就是async 函数就是返回Promise对象，是generator的语法糖。很多人认为async/await是异步操作的终极解决方案：

*   语法简洁，更像是同步代码，也更符合普通的阅读习惯；
*   改进JS中异步操作串行执行的代码组织方式，减少callback的嵌套；
*   Promise中不能自定义使用try/catch进行错误捕获，但是在Async/await中可以像处理同步代码处理错误。

不过也存在一些缺点，因为 await 将异步代码改造成了同步代码，如果多个异步代码没有依赖性却使用了 await 会导致性能上的降低。

```javascript
async function test() {
  // 以下代码没有依赖性的话，完全可以使用 Promise.all 的方式
  // 如果有依赖性的话，其实就是解决回调地狱的例子了
  await fetch(url1)
  await fetch(url2)
  await fetch(url3)
}
```

观察下面这段代码，你能判断出打印出来的内容是什么吗？

```javascript
let p1 = Promise.resolve(1)
let p2 = new Promise(resolve => {
  setTimeout(() => {
    resolve(2)
  }, 1000)
})
async function fn() {
  console.log(1)
// 当代码执行到此行（先把此行），构建一个异步的微任务
// 等待promise返回结果，并且await下面的代码也都被列到任务队列中
  let result1 = await p2
  console.log(3)
  let result2 = await p1
  console.log(4)
}
fn()
console.log(2)
// 1 2 3 4
```

如果 await 右侧表达逻辑是个 promise，await会等待这个promise的返回结果，**只有返回的状态是resolved情况**，才会把结果返回,如果promise是失败状态，则await不会接收其返回结果，await下面的代码也不会在继续执行。

```javascript
let p1 = Promise.reject(100)
async function fn1() {
  let result = await p1
  console.log(1) //这行代码不会执行
}
```

我们再来看道比较复杂的题目：

```javascript
console.log(1)
setTimeout(()=>{console.log(2)},1000)
async function fn(){    
    console.log(3)    
    setTimeout(()=>{console.log(4)},20)    
    return Promise.reject()
}
async function run(){    
    console.log(5)    
    await fn()    
    console.log(6)
}
run()//需要执行150ms左右
for(let i=0;i<90000000;i++){}
setTimeout(()=>{    
    console.log(7)    
new Promise(resolve=>{        
    console.log(8)        
    resolve()    
}).then(()=>{console.log(9)})},0)
console.log(10)// 1 5 3 10 4 7 8 9 2 
```

做这道题之前，读者需明白：

*   基于微任务的技术有 MutationObserver、Promise 以及以 Promise 为基础开发出来的很多其他的技术，本题中resolve()、await fn()都是微任务。
*   不管宏任务是否到达时间，以及放置的先后顺序，每次主线程执行栈为空的时候，引擎会优先处理微任务队列，**处理完微任务队列里的所有任务**，再去处理宏任务。

接下来，我们一步一步分析：

*   首先执行同步代码，输出 1，遇见第一个setTimeout，将其回调放入任务队列（宏任务）当中，继续往下执行
*   运行run(),打印出 5，并往下执行，遇见 await fn()，将其放入任务队列（微任务）
*   await fn() 当前这一行代码执行时，fn函数会立即执行的,打印出3，遇见第二个setTimeout，将其回调放入任务队列（宏任务），await fn() 下面的代码需要等待返回Promise成功状态才会执行，所以6是不会被打印的。
*   继续往下执行，遇到for循环同步代码，需要等150ms,虽然第二个setTimeout已经到达时间，但不会执行，遇见第三个setTimeout，将其回调放入任务队列（宏任务），然后打印出10。值得注意的是，这个定时器 推迟时间0毫秒实际上达不到的。根据HTML5标准，setTimeOut推迟执行的时间，最少是4毫秒。
*   同步代码执行完毕，此时没有微任务，就去执行宏任务，上面提到已经到点的setTimeout先执行，打印出4
*   然后执行下一个setTimeout的宏任务，所以先打印出7，new Promise的时候会立即把executor函数执行，打印出8，然后在执行resolve时，触发微任务，于是打印出9
*   最后执行第一个setTimeout的宏任务，打印出2

常用的方法
-----

### 1、Promise.resolve()

Promise.resolve(value)方法返回一个以给定值解析后的Promise 对象。
Promise.resolve()等价于下面的写法:

```javascript
Promise.resolve('foo')// 等价于new Promise(resolve => resolve('foo'))
```

Promise.resolve方法的参数分成四种情况。

（1）参数是一个 Promise 实例

如果参数是 Promise 实例，那么Promise.resolve将**不做任何修改、原封不动地**返回这个实例。

```javascript
const p1 = new Promise(function (resolve, reject) {  setTimeout(() => reject(new Error('fail')), 3000)})const p2 = new Promise(function (resolve, reject) {  setTimeout(() => resolve(p1), 1000)})p2  .then(result => console.log(result))  .catch(error => console.log(error))// Error: fail
```

上面代码中，p1是一个 Promise，3 秒之后变为rejected。p2的状态在 1 秒之后改变，resolve方法返回的是p1。由于p2返回的是另一个 Promise，导致p2自己的状态无效了，由p1的状态决定p2的状态。所以，后面的then语句都变成针对后者（p1）。又过了 2 秒，p1变为rejected，导致触发catch方法指定的回调函数。

（2）参数不是具有then方法的对象，或根本就不是对象

```javascript
Promise.resolve("Success").then(function(value) { // Promise.resolve方法的参数，会同时传给回调函数。  console.log(value); // "Success"}, function(value) {  // 不会被调用});
```

（3）不带有任何参数

Promise.resolve()方法允许调用时不带参数，直接返回一个resolved状态的 Promise 对象。如果希望得到一个 Promise 对象，比较方便的方法就是直接调用Promise.resolve()方法。

```javascript
Promise.resolve().then(function () {  console.log('two');});console.log('one');// one two
```

（4）参数是一个thenable对象

thenable对象指的是具有then方法的对象,Promise.resolve方法会将这个对象转为 Promise 对象，然后就立即执行thenable对象的then方法。

```javascript
let thenable = {  then: function(resolve, reject) {    resolve(42);  }};let p1 = Promise.resolve(thenable);p1.then(function(value) {  console.log(value);  // 42});
```

### 2、Promise.reject()

Promise.reject()方法返回一个带有拒绝原因的Promise对象。

```javascript
new Promise((resolve,reject) => {    reject(new Error("出错了"));});// 等价于 Promise.reject(new Error("出错了"));  // 使用方法Promise.reject(new Error("BOOM!")).catch(error => {    console.error(error);});
```

值得注意的是，调用resolve或reject以后，Promise 的使命就完成了，后继操作应该放到then方法里面，而**不应该直接写在resolve或reject的后面**。所以，最好在它们前面加上return语句，这样就不会有意外。

```javascript
new Promise((resolve, reject) => {  return reject(1);  // 后面的语句不会执行  console.log(2);})
```

### 3、Promise.all()

```javascript
let p1 = Promise.resolve(1)let p2 = new Promise(resolve => {  setTimeout(() => {    resolve(2)  }, 1000)})let p3 = Promise.resolve(3)Promise.all([p3, p2, p1])  .then(result => { // 返回的结果是按照Array中编写实例的顺序来    console.log(result) // [ 3, 2, 1 ]  })  .catch(reason => {    console.log("失败:reason")  })
```

Promise.all 生成并返回一个新的 Promise 对象，所以它可以使用 Promise 实例的所有方法。参数传递promise数组中**所有的 Promise 对象都变为resolve的时候**，该方法才会返回， 新创建的 Promise 则会使用这些 promise 的值。

如果参数中的**任何一个promise为reject的话**，则整个Promise.all调用会**立即终止**，并返回一个reject的新的 Promise 对象。

### 4、Promise.allSettled()

有时候，我们不关心异步操作的结果，只关心这些操作有没有结束。这时，ES2020 引入Promise.allSettled()方法就很有用。如果没有这个方法，想要确保所有操作都结束，就很麻烦。Promise.all()方法无法做到这一点。

假如有这样的场景：一个页面有三个区域，分别对应三个独立的接口数据，使用 Promise.all 来并发请求三个接口，如果其中任意一个接口出现异常，状态是reject,这会导致页面中该三个区域数据全都无法出来，显然这种状况我们是无法接受，Promise.allSettled的出现就可以解决这个痛点：

```javascript
Promise.allSettled([  Promise.reject({ code: 500, msg: '服务异常' }),  Promise.resolve({ code: 200, list: [] }),  Promise.resolve({ code: 200, list: [] })]).then(res => {  console.log(res)  /* 0: {status: "rejected", reason: {…}} 1: {status: "fulfilled", value: {…}} 2: {status: "fulfilled", value: {…}} */  // 过滤掉 rejected 状态，尽可能多的保证页面区域数据渲染  RenderContent(    res.filter(el => {      return el.status !== 'rejected'    })  )})
```

Promise.allSettled跟Promise.all类似, 其参数接受一个Promise的数组, 返回一个新的Promise, **唯一的不同在于, 它不会进行短路**, 也就是说当Promise全部处理完成后,我们可以拿到每个Promise的状态, 而不管是否处理成功。

### 5、Promise.race()

Promise.all()方法的效果是"谁跑的慢，以谁为准执行回调"，那么相对的就有另一个方法"谁跑的快，以谁为准执行回调"，这就是Promise.race()方法，这个词本来就是赛跑的意思。race的用法与all一样，接收一个promise对象数组为参数。

Promise.all在接收到的所有的对象promise都变为FulFilled或者Rejected状态之后才会继续进行后面的处理，与之相对的是Promise.race**只要有一个promise对象进入FulFilled或者Rejected状态的话**，就会继续进行后面的处理。

```javascript
// `delay`毫秒后执行resolvefunction timerPromisefy(delay) {    return new Promise(resolve => {        setTimeout(() => {            resolve(delay);        }, delay);    });}// 任何一个promise变为resolve或reject的话程序就停止运行Promise.race([    timerPromisefy(1),    timerPromisefy(32),    timerPromisefy(64)]).then(function (value) {    console.log(value);    // => 1});
```

上面的代码创建了3个promise对象，这些promise对象会分别在1ms、32ms 和 64ms后变为确定状态，即FulFilled，并且在第一个变为确定状态的1ms后，.then注册的回调函数就会被调用。

### 6、Promise.prototype.finally()

ES9 新增 finally() 方法返回一个Promise。在promise结束时，无论结果是fulfilled或者是rejected，都会执行指定的回调函数。**这为在Promise是否成功完成后都需要执行的代码提供了一种方式**。这避免了同样的语句需要在then()和catch()中各写一次的情况。

比如我们发送请求之前会出现一个loading，当我们请求发送完成之后，不管请求有没有出错，我们都希望关掉这个loading。

```javascript
this.loading = truerequest()  .then((res) => {    // do something  })  .catch(() => {    // log err  })  .finally(() => {    this.loading = false  })
```

finally方法的回调函数不接受任何参数，这表明，finally方法里面的操作，应该是与状态无关的，不依赖于 Promise 的执行结果。

实际应用
----

假设有这样一个需求：红灯 3s 亮一次，绿灯 1s 亮一次，黄灯 2s 亮一次；如何让三个灯不断交替重复亮灯？
三个亮灯函数已经存在：

```javascript
function red() {    console.log('red');}function green() {    console.log('green');}function yellow() {    console.log('yellow');}
```

这道题复杂的地方在于**需要“交替重复”亮灯**，而不是亮完一遍就结束的一锤子买卖，我们可以通过递归来实现：

```javascript
// 用 promise 实现let task = (timer, light) => {  return new Promise((resolve, reject) => {    setTimeout(() => {      if (light === 'red') {        red()      }      if (light === 'green') {        green()      }      if (light === 'yellow') {        yellow()      }      resolve()    }, timer);  })}let step = () => {  task(3000, 'red')    .then(() => task(1000, 'green'))    .then(() => task(2000, 'yellow'))    .then(step)}step()
```

同样也可以通过async/await 的实现：

```javascript
//  async/await 实现let step = async () => {  await task(3000, 'red')  await task(1000, 'green')  await task(2000, 'yellow')  step()}step()
```

使用 async/await 可以实现用同步代码的风格来编写异步代码,毫无疑问，还是 async/await 的方案更加直观，不过深入理解Promise 是掌握async/await的基础。



>作者：浪里行舟  
>链接：[你真的懂Promise吗](https://github.com/ljianshu/Blog/issues/81)  
>来源：github  
>著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处  

# Promise

### 理解



终极解决方法：async 、await

### 缺点

优点是可以解决一部嵌套问题且可以解决多个异步并发问题,

缺点也很明显,promise也是基于回调的且promise无法终止异步,

当时看到一个讨论为什么说promise不能取消是缺点,

个人觉得例子很形象

### 构造

先分析promise的用法,然后先根据他的功能写一个Promise类的大致构造,每一个new出来的promise都是独立出来的,且属性是实例上的,方法是私有的,then是原型上的,那么就先在这个类的constructor里去定义它的属性

```js
let promise = new Promise((resolve, reject) => { //executor 执行器
    reject("hello")
}).then(data => {
    console.log(data)
}, err => {
    console.log(err)
})
```

这里单纯的先来获取成功或者失败

```js
const PENDING = 'PENDING'
const RESOLVED = 'RESOLVED'
const REJECTED = 'REJECTED'

class Promise {
    //看这个属性 能否在原型上使用
    // 看属性是否公用
    constructor(executor) {
        this.status = PENDING //默认是pending状态
            // 成功失败函数在当前promise身上
            //成功函数
        this.value = undefined
        this.reason = undefined
        let resolve = (value) => { //value成功值
                //屏蔽调用的
                if (this.status === PENDING) {
                    this.value = value
                    this.status = RESOLVED
                }

            }
            //失败函数
        let reject = (reason) => { //reason失败的原因
            if (this.status === PENDING) {
                this.reason = reason
                this.status = REJECTED
            }
        }
        try {
         executor(resolve, reject); //默认执行器会立即执行
        } catch (e) {
            reject(e) //如果执行时发生错误 等价于调用了失败方法
        }

    }
    then(onfulfilled, onrejected) { //then 目前有两个参数
        if (this.status === RESOLVED) {
            onfulfilled(this.value)
        }
        if (this.status === REJECTED) {
            onrejected(this.reason)
        }
    }
}

module.exports = Promise
```

上面这段代码,先定义一个类,三个状态直接定义成常量,在class类中,constructor接收的是一个函数,对着例子看它就是(resolve, reject) => { //executor 执行器 reject("hello") }而且对应的,这个constructor在class类里也是立即执行的

而constructor接受的是两个函数,resolve, reject,那么就需要在class类中进行定义并且将这两个方法作为参数传给constructor,注意这里加上if判断是因为状态一旦从pending改变成其他状态,就直接跳过

这当我的实例调用reject,他就会走里面的流程,改变status,并且还需要使用try catch,如果在流程中实例抛出错误等价于调用了失败方法

等走到then的时候,有两个参数,一个是在成功的时候onfulfilled,一个是在失败的时候onrejected,结合实例看就懂了,对应的就是一个回调函数,这个时候大致构造就出来了,慢慢完善它吧



### then的实现

这时再举一个例子

```js
let promise = new Promise((resolve, reject) => { //executor 执行器
    setTimeout(() => {
        resolve('一秒后成功的哦')
    }, 1000);
})
promise.then(data => {
    console.log(data)
}, err => {
    console.log(err)
})
promise.then(data => {
    console.log(data)
}, err => {
    console.log(err)
})
promise.then(data => {
    console.log(data)
}, err => {
    console.log(err)
})
```

最开始是实现了同步的,这个例子中我们要实现异步的,类似于Ajax在1秒后获得数据,后面的then的操作要等它执行完在执行,解决思路就是当在这执行的时候,走到then这里状态如果为pending,说明这是一个异步,就将所有的成功回调存进一个数组,将所有的失败回调存进一个数组,这是订阅,然后等一秒过后,发现是成功的回调,就去将之前存进成功的那个数组循环执行一遍,这是发布,代码如下:

头和尾相比第一份构造代码没有改变就不加了

```js
......
constructor(executor) {
        this.status = PENDING //默认是pending状态
            // 成功失败函数在当前promise身上
            //成功函数
        this.value = undefined
        this.reason = undefined
        this.onResolvedCallbacks = []; //成功的回调 
        this.onRejectedCallbacks = []; //失败的回调


        let resolve = (value) => { //value成功值
                //屏蔽调用的
                if (this.status === PENDING) {
                    this.value = value
                    this.status = RESOLVED
                    this.onResolvedCallbacks.forEach(fn => fn())
                }

            }
            //失败函数
        let reject = (reason) => { //reason失败的原因
            if (this.status === PENDING) {
                this.reason = reason
                this.status = REJECTED
                this.onRejectedCallbacks.forEach(fn => fn())
            }
        }
        try {
            executor(resolve, reject); //默认执行器会立即执行
        } catch (e) {
            reject(e) //如果执行时发生错误 等价于调用了失败方法
        }
    }
    then(onfulfilled, onrejected) { //then 目前有两个参数
        if (this.status === RESOLVED) {
            onfulfilled(this.value)
        }
        if (this.status === REJECTED) {
            onrejected(this.reason)
        }
        if (this.status === PENDING) {
            //如果是异步就先定义好
            this.onResolvedCallbacks.push(() => {
                //todo...
                onfulfilled(this.value)
            })
            this.onRejectedCallbacks.push(() => {
                onrejected(this.reason)
            })
        }
    }
    ......
```

这里可以清晰地看到在constructor中定义了数组,在then中添加了对状态为pending也就是异步的处理,这里用的是传一个函数,而不是直接传onfulfilled或onrejected,因为后面对其进行改造,直接写就写死了
然后resolve 和reject里面多了两个循环数组并执行的方法,这正是当异步完成之后要执行的



# 回调函数-Promise

## 一、准备

### 1.1 区别实例对象与函数对象

1. 实例对象：new 函数产生的对象，称为实例对象，简称为对象
2. 函数对象：将函数作为对象使用时，称为函数对象

```
function Fn() { // Fn只能称为函数
}
const fn = new Fn() // Fn只有new过的才可以称为构造函数
//fn称为实例对象
console.log(Fn.prototype)// Fn作为对象使用时，才可以称为函数对象
Fn.bind({}) //Fn作为函数对象使用
$('#test') // $作为函数使用
$.get('/test') // $作为函数对象使用
```

> ()的左边必然是函数，点的左边必然是对象

### 1.2 回调函数

#### 同步回调

定义：立即执行，完全执行完了才结束，不会放入回调队列中

举例：数组遍历相关的回调 / Promise的excutor函数

```
const arr = [1, 3, 5];
arr.forEach(item => { // 遍历回调，同步回调，不会放入队列，一上来就要执行
  console.log(item);
})
console.log('forEach()之后')
// 1
// 3
// 5
// "forEach()之后"
```

#### 异步回调

定义：不会立即执行，会放入回调队列中将来执行

举例：定时器回调 / ajax回调 / Promise成功或失败的回调

```
// 定时器回调
setTimeout(() => { // 异步回调，会放入队列中将来执行
  console.log('timeout callback()')
}, 0)
console.log('setTimeout()之后')
// “setTimeout()之后”
// “timeout callback()”
// Promise 成功或失败的回调
new Promise((resolve, reject) => {
  resolve(1)
}).then(
  value => {console.log('value', value)},
  reason => {console.log('reason', reason)}
)
console.log('----')
// ----
// value 1
```

**js 引擎是先把初始化的同步代码都执行完成后，才执行回调队列中的代码**

### 1.3 JS 的 error 处理

#### 错误的类型

Error：所有错误的父类型

ReferenceError：引用的变量不存在

```
console.log(a) // ReferenceError:a is not defined
```

TypeError：数据类型不正确

```
let b
console.log(b.xxx)
// TypeError:Cannot read property 'xxx' of undefined
let b = {}
b.xxx()
// TypeError:b.xxx is not a function
```

RangeError：数据值不在其所允许的范围内

```
function fn() {
  fn()
}
fn()
// RangeError:Maximum call stack size exceeded
```

SyntaxError：语法错误

```
const c = """"
// SyntaxError:Unexpected string
```

#### 错误处理

捕获错误：try ... catch

抛出错误：throw error

```
function something() {
  if (Date.now()%2===1) {
    console.log('当前时间为奇数，可以执行任务')
  } else { //如果时间为偶数抛出异常，由调用来处理
    throw new Error('当前时间为偶数，无法执行任务')
  }
}

// 捕获处理异常
try {
  something()
} catch (error) {
  alert(error.message)
}
```

#### 错误对象

massage 属性：错误相关信息

stack 属性：函数调用栈记录信息

```
try {
  let d
  console.log(d.xxx)
} catch (error) {
  console.log(error.message)
  console.log(error.stack)
}
console.log('出错之后')
// Cannot read property 'xxx' of undefined
// TypeError:Cannot read property 'xxx' of undefined
// 出错之后
```

> 因为错误被捕获处理了，后面的代码才能运行下去，打印出‘出错之后’

## 二、Promise 的理解和使用

### 2.1 Promise 是什么

#### 2.1.1 Promise 的理解

抽象表达：Promise 是 JS 中进行异步编程的新的解决方案

具体表达：

1. 语法上：Promise 是一个构造函数
2. 功能上：Promise 对象用来封装一个异步操作并可以获取其结果

#### 2.1.2 Promise 的状态改变

1. pending 变为 resolved
2. pending 变为 rejected

只有这两种，且一个 promise 对象只能改变一次。无论成功还是失败，都会有一个结果数据。成功的结果数据一般称为 value，而失败的一般称为 reason。

#### 2.1.3 Promise 的基本流程

![img](https://img-blog.csdnimg.cn/20200703144207912.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQwNTA4ODMy,size_16,color_FFFFFF,t_70)

#### 2.1.4 Promise 的基本使用

```
// 创建一个新的p对象promise
const p = new Promise((resolve, reject) => { // 执行器函数
  // 执行异步操作任务
  setTimeout(() => {
    const time = Date.now() 
    // 如果当前时间是偶数代表成功，否则失败
    if (time % 2 == 0) {
      // 如果成功，调用resolve(value)
      resolve('成功的数据，time=' + time)
    } else {
      // 如果失败，调用reject(reason)
      reject('失败的数据，time=' + time)
    }
  }, 1000);
})

p.then(
  value => { // 接收得到成功的value数据 onResolved
    console.log('成功的回调', value)
  },
  reason => { // 接收得到失败的reason数据 onRejected
    console.log('失败的回调', reason)
  }
)
```

.then() 和执行器(excutor)同步执行，.then() 中的回调函数异步执行

### 2.2 为什么要用 Promise

#### 1.指定回调函数的方式更加灵活

旧的：必须在启动异步任务前指定

promise：启动异步任务 => 返回promise对象 => 给promise对象绑定回调函数(甚至可以在异步任务结束后指定)

#### 2.支持链式调用，可以解决回调地狱问题

##### 什么是回调地狱？

回调函数嵌套调用，**外部回调函数**异步执行的结果是其**内部嵌套的回调函数**执行的条件

```
doSomething(function(result) {
  doSomethingElse(result, function(newResult) {
    doThirdThing(newResult, function(finalResult) {
      console.log('Got the final result:' + finalResult)
    }, failureCallback)
  }, failureCallback)
}, failureCallback)
```

##### 回调地狱的缺点？

不便于阅读 / 不便于异常处理

##### 解决方案？

promise 链式调用

##### 终极解决方案？

async/await

##### 使用 promise 的链式调用解决回调地狱

```
doSomething()
  .then(result => doSomethingElse(result))
  .then(newResult => doThirdThing(newResult))
  .then(finalResult => {
  console.log('Got the final result:' + finalResult)
})
  .catch(failureCallback)
```

回调地狱的终极解决方案 async/await

```
async function request() {
  try{
    const result = await doSomething()
    const newResult = await doSomethingElse(result)
    const finalResult = await doThirdThing(newResult)
    console.log('Got the final result:' + finalResult)
  } catch (error) {
    failureCallback(error)
  }
}
```

### 2.3 如何使用 Promise

#### API

1. Promise 构造函数：Promise(excutor) {}

   excutor 函数：同步执行 (resolve, reject) => {}

   resolve 函数：内部定义成功时调用的函数 resove(value)

   reject 函数：内部定义失败时调用的函数 reject(reason)

   说明：excutor 是执行器，会在 Promise 内部立即同步回调，异步操作 `resolve/reject` 就在 excutor 中执行

2. Promise.prototype.then 方法：p.then(onResolved, onRejected)

   1）onResolved 函数：成功的回调函数 (value) => {}

   2）onRejected 函数：失败的回调函数 (reason) => {}

   说明：指定用于得到成功 value 的成功回调和用于得到失败 reason 的失败回调，返回一个新的 promise 对象

3. Promise.prototype.catch 方法：p.catch(onRejected)

   1）onRejected 函数：失败的回调函数 (reason) => {}

   说明：**then() 的语法糖**，相当于 then(undefined, onRejected)

```
new Promise((resolve, reject) => { // excutor执行器函数
 setTimeout(() => {
   if(...) {
     resolve('成功的数据') // resolve()函数
   } else { 
     reject('失败的数据') //reject()函数
    }
 }, 1000)
}).then(
 value => { // onResolved()函数
  console.log(value)
}
).catch(
 reason => { // onRejected()函数
  console.log(reason)
}
)
```

1. Promise.resolve 方法：Promise.resolve(value)

   value：将被 `Promise` 对象解析的参数，也可以是一个成功或失败的 `Promise` 对象

   返回：返回一个带着给定值解析过的 `Promise` 对象，如果参数本身就是一个 `Promise` 对象，则直接返回这个 `Promise` 对象。

2. Promise.reject 方法：Promise.resolve(reason)

   reason：失败的原因

   说明：返回一个失败的 promise 对象

```
//产生一个成功值为1的promise对象
new Promise((resolve, reject) => {
 resolve(1)
})
//相当于
const p1 = Promise.resolve(1)
const p2 = Promise.resolve(2)
const p3 = Promise.reject(3)

p1.then(value => {console.log(value)}) // 1
p2.then(value => {console.log(value)}) // 2
p3.catch(reason => {console.log(reason)}) // 3
```

`Promise.resolve()/Promise.reject()` 方法就是一个**语法糖**

1. Promise.all 方法：Promise.all(iterable)

   iterable：包含 n 个 promise 的可迭代对象，如 `Array` 或 `String`

   说明：返回一个新的 promise，只有所有的 promise 都成功才成功，只要有一个失败了就直接失败

```
const pAll = Promise.all([p1, p2, p3])
const pAll2 = Promise.all([p1, p2])
//因为其中p3是失败所以pAll失败
pAll.then(
value => {
   console.log('all onResolved()', value)
 },
reason => {
   console.log('all onRejected()', reason) 
 }
)
// all onRejected() 3
pAll2.then(
values => {
   console.log('all onResolved()', values)
 },
reason => {
   console.log('all onRejected()', reason) 
 }
)
// all onResolved() [1, 2]
```

1. Promise.race方法：Promise.race(iterable)

   iterable：包含 n 个 promise 的可迭代对象，如 `Array` 或 `String`

   说明：返回一个新的 promise，第一个完成的 promise 的结果状态就是最终的结果状态

```
const pRace = Promise.race([p1, p2, p3])
// 谁先完成就输出谁(不管是成功还是失败)
const p1 = new Promise((resolve, reject) => {
 setTimeout(() => {
   resolve(1)
 }, 1000)
})
const p2 = Promise.resolve(2)
const p3 = Promise.reject(3)

pRace.then(
value => {
   console.log('race onResolved()', value)
 },
reason => {
   console.log('race onRejected()', reason) 
 }
)
//race onResolved() 2
```

#### Promise 的几个关键问题

##### 1.如何改变 promise 的状态？

(1)resolve(value)：如果当前是 pending 就会变为 resolved

(2)reject(reason)：如果当前是 pending 就会变为 rejected

(3)抛出异常：如果当前是 pending 就会变为 rejected

```
const p = new Promise((resolve, reject) => {
  //resolve(1) // promise变为resolved成功状态
  //reject(2) // promise变为rejected失败状态
  throw new Error('出错了') // 抛出异常，promise变为rejected失败状态，reason为抛出的error
})
p.then(
  value => {},
  reason => {console.log('reason',reason)}
)
// reason Error:出错了
```

##### 2.一个 promise 指定多个成功/失败回调函数，都会调用吗？

当 promise 改变为对应状态时都会调用

```
const p = new Promise((resolve, reject) => {
  //resolve(1)
  reject(2)
})
p.then(
  value => {},
  reason => {console.log('reason',reason)}
)
p.then(
  value => {},
  reason => {console.log('reason2',reason)}
)
// reason 2
// reason2 2
```

##### 3.改变 promise 状态和指定回调函数谁先谁后？

1. 都有可能，常规是先指定回调再改变状态，但也可以先改状态再指定回调

2. 如何先改状态再指定回调？

   (1)在执行器中直接调用 resolve()/reject()

   (2)延迟更长时间才调用 then()

3. 什么时候才能得到数据？

   (1)如果先指定的回调，那当状态发生改变时，回调函数就会调用得到数据

   (2)如果先改变的状态，那当指定回调时，回调函数就会调用得到数据

```
new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve(1) // 改变状态
  }, 1000)
}).then( // 指定回调函数
  value => {},
  reason =>{}
)
```

**此时，先指定回调函数，保存当前指定的回调函数；后改变状态(同时指定数据)，然后异步执行之前保存的回调函数。**

```
new Promise((resolve, reject) => {
  resolve(1) // 改变状态
}).then( // 指定回调函数
  value => {},
  reason =>{}
)
```

**这种写法，先改变的状态(同时指定数据)，后指定回调函数(不需要再保存)，直接异步执行回调函数**

##### 4.promise.then() 返回的新 promise 的结果状态由什么决定？

(1)简单表达：由 then() 指定的回调函数执行的结果决定

(2)详细表达：

 ① 如果抛出异常，新 promise 变为 rejected，reason 为抛出的异常

 ② 如果返回的是非 promise 的任意值，新 promise 变为 resolved，value 为返回的值

 ③ 如果返回的是另一个新 promise，此 promise 的结果就会成为新 promise 的结果

```
new Promise((resolve, reject) => {
  resolve(1)
}).then(
  value => {
    console.log('onResolved1()', value)
  },
  reason => {
    console.log('onRejected1()', reason)
  }
).then(
  value => {
    console.log('onResolved2()', value)
  },
  reason => {
    console.log('onRejected2()', reason)
  }
)
// onResolved1() 1
// onResolved2() undefined
new Promise((resolve, reject) => {
  resolve(1)
}).then(
  value => {
    console.log('onResolved1()', value)
    //return 2                   // onResolved2() 2
    //return Promise.resolve(3)  // onResolved2() 3
    //return Promise.reject(4)   // onRejected2() 4
    //throw 5                    // onRejected2() 5
  },
  reason => {
    console.log('onRejected1()', reason)
  }
).then(
  value => {
    console.log('onResolved2()', value)
  },
  reason => {
    console.log('onRejected2()', reason)
  }
)
// onResolved1() 1
// 对应输出如上所示
```

##### 5.promise 如何串联多个操作任务？

(1)promise 的 then() 返回一个新的 promise，可以并成 then() 的链式调用

(2)通过 then 的链式调用串联多个同步/异步任务

```
new Promise((resolve, reject) => {
  setTimeout(() => {
    console.log('执行任务1(异步)')
    resolve(1)
  }, 1000)
}).then(
  value => {
    console.log('任务1的结果', value)
    console.log('执行任务2(同步)')
    return 2 // 同步任务直接return返回结果
  }
).then(
  value => {
    console.log('任务2的结果', value)
    return new Promise((resolve, reject) => { // 异步任务需要包裹在Promise对象中
      setTimeout(() => {
        console.log('执行任务3(异步)')
        resolve(3)
      }, 1000)
    })
  }
).then(
  value => {
    console.log('任务3的结果', value)
  }
)
// 执行任务1(异步)
// 任务1的结果 1
// 执行任务2(同步)
// 任务2的结果 2
// 执行任务3(异步)
// 任务3的结果 3
```

##### 6.Promise 异常穿透(传透)？

(1)当使用 promise 的 then 链式调用时，可以在最后指定失败的回调

(2)前面任何操作出了异常，都会传到最后失败的回调中处理

```
new Promise((resolve, reject) => {
   //resolve(1)
   reject(1)
}).then(
  value => {
    console.log('onResolved1()', value)
    return 2
  }
).then(
  value => {
    console.log('onResolved2()', value)
    return 3
  }
).then(
  value => {
    console.log('onResolved3()', value)
  }
).catch(
  reason => {
    console.log('onRejected1()', reason)
  }
)
// onRejected1() 1
```

相当于这种写法：

```
new Promise((resolve, reject) => {
   //resolve(1)
   reject(1)
}).then(
  value => {
    console.log('onResolved1()', value)
    return 2
  },
  reason => {throw reason} // 抛出失败的结果reason
).then(
  value => {
    console.log('onResolved2()', value)
    return 3
  },
  reason => {throw reason}
).then(
  value => {
    console.log('onResolved3()', value)
  },
  reason => {throw reason}
).catch(
  reason => {
    console.log('onRejected1()', reason)
  }
)
// onRejected1() 1
```

所以失败的结果是一层一层处理下来的，最后传递到 catch 中。

或者，将 `reason => {throw reason}` 替换为 `reason => Promise.reject(reason)` 也是一样的

##### 7.中断 promise 链？

当使用 promise 的 then 链式调用时，在中间中断，不再调用后面的回调函数

办法：在回调函数中返回一个 pending 状态的 promise 对象

```
new Promise((resolve, reject) => {
   //resolve(1)
   reject(1)
}).then(
  value => {
    console.log('onResolved1()', value)
    return 2
  }
).then(
  value => {
    console.log('onResolved2()', value)
    return 3
  }
).then(
  value => {
    console.log('onResolved3()', value)
  }
).catch(
  reason => {
    console.log('onRejected1()', reason)
  }
).then(
  value => {
    console.log('onResolved4()', value)
  },
  reason => {
    console.log('onRejected2()', reason)
  }
)
// onRejected1() 1
// onResolved4() undefined
```

为了在 catch 中就中断执行，可以这样写：

```
new Promise((resolve, reject) => {
   //resolve(1)
   reject(1)
}).then(
  value => {
    console.log('onResolved1()', value)
    return 2
  }
).then(
  value => {
    console.log('onResolved2()', value)
    return 3
  }
).then(
  value => {
    console.log('onResolved3()', value)
  }
).catch(
  reason => {
    console.log('onRejected1()', reason)
    return new Promise(() => {}) // 返回一个pending的promise
  }
).then(
  value => {
    console.log('onResolved4()', value)
  },
  reason => {
    console.log('onRejected2()', reason)
  }
)
// onRejected1() 1
```

在 catch 中返回一个新的 promise，且这个 promise 没有结果。

由于，返回的新的 promise 结果决定了后面 then 中的结果，所以后面的 then 中也没有结果。

这就实现了中断 promise 链的效果。

## 三、自定义(手写)Promise

代码见[Github](https://github.com/Woc12138/Promise-study)

## 四、async 与 await

### 4.1 async 函数

1. 函数的返回值为 promise 对象
2. promise 对象的结果由 async 函数执行的返回值决定

```
async function fn1() {
  //return 1
  // 返回一个Promise对象（PromiseStatus为resolved，PromiseValue为1）
  throw 2
  // 返回一个Promise对象（PromiseStatus为rejected，PromiseValue为2）
}
const result = fn1()
console.log(result)
```

这时，可以将 result.then()：

```
async function fn1() {
  //return 1
  throw 2
}
const result = fn1()
result.then(
  value => {
    console.log('onResolved()', value)
  },
  reason => {
    console.log('onRejected()', reason)
  },
)
// onRejected() 2
```

也可以在异步函数中返回一个 promise

```
async function fn1() {
  //return Promise.reject(3)
  return Promise.resolve(3)
}
const result = fn1()
result.then(
  value => {
    console.log('onResolved()', value)
  },
  reason => {
    console.log('onRejected()', reason)
  },
)
// onResolved() 3
```

也就是说，一旦在函数前加 async，它返回的值都将被包裹在 Promise 中，这个 Promise 的结果由函数执行的结果决定。

上面的栗子都是立即成功/失败的 promise，也可以返回延迟成功/失败的 promise：

```
async function fn1() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(4)
    }, 1000)
  })
}
const result = fn1()
result.then(
  value => { // 过1s后才异步执行回调函数 onResolved()
    console.log('onResolved()', value)
  },
  reason => {
    console.log('onRejected()', reason)
  },
)
// onResolved() 4
```

### 4.2 await 表达式

#### MDN

[async](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/async_function)

[await](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/await)

#### 语法

[return_value] = await expression;

**表达式**

 一个 `Promise` 对象或者任何要**等待**的`值`。

**返回值**

 返回 Promise 对象的处理结果。如果**等待**的不是 Promise 对象，则返回该值本身。

**解释**

**await 表达式会暂停当前 async function 的执行，等待 Promise 处理完成。**

1. await 右侧的表达式一般为 promise 对象，但也可以是其他的值
2. 如果表达式是 promise 对象，await 返回的是 promise 成功的值
3. 如果表达式是其他值，直接将此值作为 await 的返回值

注意：

await 必须写在 async 函数中，但 async 函数中可以没有 await

如果 await 的 promise 失败了，就会抛出异常，需要通过 try...catch 来捕获处理

```
function fn2() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(5)
    }, 1000)
  })
}

function fn4() {
  return 6
}

async function fn3() {
  //const p = fn2() // 这种写法只能得到一个promise对象
  const value = await fn2() // value 5
  //const value = await fn4() // value 6
  console.log('value', value)
}
fn3()
```

不写 await，只能得到一个 promise 对象。在表达式前面加上 await，1s后将得到 promise 的结果5，但是要用 await 必须在函数上声明 async。

await 右侧表达式 fn2() 为 promise，得到的结果就是 promise 成功的 value；await 右侧表达式 fn4() 不是 promise，得到的结果就是这个值本身。

Promise 对象的结果也有可能失败：

```
function fn2() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      reject(5)
    }, 1000)
  }) 
}

async function fn3() {
  const value = await fn2()
  console.log('value', value)
}
fn3()
// 报错：Uncaught (in promise) 5
```

await 只能得到成功的结果，要想得到失败的结果就要用try/catch：

```
function fn2() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      reject(5)
    }, 1000)
  })
}

async function fn3() {
  try {
    const value = await fn2()
     console.log('value', value)
  } catch (error) {
    console.log('得到失败的结果', error)
  }
}
fn3()
// 得到失败的结果 5
```

下面这个栗子中，fn1 是第 2 种情况，fn2 是第 3 种情况，fn3 也是第 3 种情况

```
async function fn1() { //async声明的异步回调函数将返回一个promise
  return 1
}
function fn2() {
  return 2
}
function fn3() {
  throw 3 // 抛出异常
}
async function fn3() {
  try {
    const value = await fn1() // value 1
    //const value = await fn2() // value 2
    //const value = await fn3() // 得到失败的结果 3
    console.log('value', value)
  } catch (error) {
    console.log('得到失败的结果', error)
  }
}
fn3()
```

## 五、JS异步之宏队列与微队列

![img](https://img-blog.csdnimg.cn/20200703144207979.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQwNTA4ODMy,size_16,color_FFFFFF,t_70)

1. JS 中用来存储待执行回调函数的队列包含2个不同特定的队列

2. 宏队列：用来保存待执行的宏任务（回调），比如：定时器回调/DOM 事件回调/ajax 回调

3. 微队列：用来保存待执行的微任务（回调），比如：promise 的回调/MutationObserver 的回调

4. JS 执行时会区别这2个队列

   (1) JS 引擎首先必须执行所有的初始化同步任务代码

   (2) 每次准备取出第一个宏任务前，都要将所有的微任务一个一个取出来执行

```
setTimeout(() => { // 会立即被放入宏队列
  console.log('timeout callback1()')
}, 0)
setTimeout(() => { // 会立即被放入宏队列
  console.log('timeout callback2()')
}, 0)
Promise.resolve(1).then(
  value => { // 会立即被放入微队列
    console.log('Promise onResolved1()', value)
  }
)
Promise.resolve(1).then(
  value => { // 会立即被放入微队列
    console.log('Promise onResolved2()', value)
  }
)
// Promise onResolved1() 1
// Promise onResolved2() 1
// timeout callback1()
// timeout callback2()
```

先执行所有的同步代码，再执行队列代码。队列代码中，微队列中的回调函数优先执行。

```
setTimeout(() => { // 会立即被放入宏队列
  console.log('timeout callback1()')
  Promise.resolve(1).then(
  value => { // 会立即被放入微队列
    console.log('Promise onResolved3()', value)
  }
}, 0)
setTimeout(() => { // 会立即被放入宏队列
  console.log('timeout callback2()')
}, 0)
Promise.resolve(1).then(
  value => { // 会立即被放入微队列
    console.log('Promise onResolved1()', value)
  }
)
Promise.resolve(1).then(
  value => { // 会立即被放入微队列
    console.log('Promise onResolved2()', value)
  }
)
// Promise onResolved1() 1
// Promise onResolved2() 1
// timeout callback1()
  // Promise onResolved3() 1
// timeout callback2()
```

执行完 `timeout callback1()` 后 `Promise onResolved3()` 会立即被放入微队列。在执行 `timeout callback2()` 前，`Promise onResolved3()` 已经在微队列中了，所以先执行 `Promise onResolved3()`。

## 六、相关面试题

### 6.1 面试题1

```
setTimeout(() => {
  console.log(1)
}, 0)
new Promise((resolve) => {
  console.log(2)
  resolve()
}).then(() => {
  console.log(3)
}).then(() => {
  console.log(4)
})
console.log(5)
// 2 5 3 4 1
/*
同步：[2,5]
异步：
宏队列：[1]
微队列：[3,4]
*/
```

**2 是 excutor 执行器，是同步回调函数，所以在同步代码中。.then() 中的函数才是异步回调**

其中，执行完 2 后改变状态为 resolve，第一个 .then() 中的 3 会放入微队列，但还没执行（promise 是 pending 状态），就不会把结果给第二个 then()，这时，4 就会缓存起来但不会被放入微队列。只有在微队列中的 3 执行完后才把 4 放入微队列。

所以顺序是：

1 放入宏队列，2 执行，3 放入微队列，4 缓存起来等待 Promise 的状态改变，5 执行，微队列中的 3 执行，4 放入微队列，微队列中的 4 执行，宏队列中的 1 执行。

### 6.2 面试题2

```
const first = () => ( // 省略return所以不用{}而用()
  new Promise((resolve, reject) => {
    console.log(3)
    let p = new Promise((resolve, reject) => {
      console.log(7)
      setTimeout(() => {
        console.log(5)
        resolve(6) //没用，状态只能改变一次，在resolve(1)时就改变了
      }, 0)
      resolve(1)
    })
    resolve(2)
    p.then((arg) => {
      console.log(arg)
    })
  })
)
first().then((arg) => {
  console.log(arg)
})
console.log(4)
// 3 7 4 1 2 5
/*
宏：[5]
微：[1,2]
*/
```

### 6.3 面试题3

```
setTimeout(() => {
  console.log("0")
}, 0)
new Promise((resolve, reject) => {
  console.log("1")
  resolve()
}).then(() => {
  console.log("2")
  new Promise((resolve, reject) => {
    console.log("3")
    resolve()
  }).then(() => {
    console.log("4")
  }).then(() => {
    console.log("5")
  })
}).then(() => {
  console.log("6")
})

new Promise((resolve, reject) => {
  console.log("7")
  resolve()
}).then(() => {
  console.log("8")
})
// 1 7 2 3 8 4 6 5 0
/*
宏：[0]
微：[2, 8, 4, 6, 5]
*/
```

顺序：

0 放入宏队列，同步执行 1，2 放入微队列，6 缓存到内部，同步执行 7，8 放入微队列，取出微队列中的 2 执行，同步执行 3，4 放入微队列，5 缓存到内部，6 放入微队列(因为 6 的前一个 promise 已经执行完了返回成功结果 undefined)，取出微队列中的 8 执行，取出微队列中的 4 执行，5 放入微队列，取出微队列中的 6 执行，取出微队列中的 5 执行，取出宏队列中的 0 执行

## 参考

[尚硅谷Promise教程(promise前端进阶必学)](https://www.bilibili.com/video/BV1MJ41197Eu?p=1)