# Proxy

### 1.定义

```js
//proxy函数接受两个参数，target、handler
const p = new Proxy(target,handler)
//target--要使用proxy包装的目标对象，可以是任何类型的对象，甚至另一个代理
//handler--一个通常以函数作为属性的对象，分别定义了在执行各种操作时代理p的行为
```

### 2. Handler 对象常用的方法

handler.has()	——	in 操作符的捕捉器

handler.get()	——	属性读取操作的捕捉器

handler.set()	——	 属性设置操作的捕捉器

handler.deleteProperty()	——	delete 操作符的捕捉器

handler.ownKeys()	——	Object.getOwnPropertyNames 方法和 Object.getOwnPropertySymbols 方法的捕捉器

handler.apply()	——	 函数调用操作的捕捉器

handler.construct()	——	 new 操作符的捕捉器



### 3. handler.get

接受三个参数`get(target, propKey, ?receiver)`

- target 目标对象
- propkey 属性名
- receiver Proxy 实例本身