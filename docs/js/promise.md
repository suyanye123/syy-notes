---
sidebarDepth: 2
---
# Promise

### 理解

promise的用法就不多说了,优点是可以解决一部嵌套问题且可以解决多个异步并发问题,缺点也很明显,promise也是基于回调的且promise无法终止异步,当时看到一个讨论为什么说promise不能取消是缺点,个人觉得例子很形象



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