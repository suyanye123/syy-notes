# Proxy

### 一、定义

Proxy对象用于创建一个对象的代理,从而实现对对象的基本操作的拦截和自定义(如属性查找、赋值、枚举、函数调用等)

proxy函数接受两个参数，target、handler

`target`--要使用proxy包装的目标对象，可以是任何类型的对象，甚至另一个代理

`handler`--一个通常以函数作为属性的对象，分别定义了在执行各种操作时代理p的行为

```js
const p = new Proxy(target,handler)
```

### 二、 [Handler 对象的方法](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Proxy)

`handler` 对象是一个容纳一批特定属性的占位符对象。它包含有 `Proxy` 的各个捕获器（trap）。

所有的捕捉器是可选的。如果没有定义某个捕捉器，那么就会保留源对象的默认行为。

```js
//常用方法
handler.has()	——	in 操作符的捕捉器（如果指定的属性在指定的对象或其原型链中，则in 运算符返回true）

handler.get()	——	属性读取操作的捕捉器

handler.set()	——	 属性设置操作的捕捉器

handler.deleteProperty()	——	delete 操作符的捕捉器

handler.ownKeys()	——	Object.getOwnPropertyNames 方法和 Object.getOwnPropertySymbols 方法的捕捉器

handler.apply()	——	 函数调用操作的捕捉器

handler.construct()	——	 new 操作符的捕捉器

//其他
handler.getPrototypeOf()--拦截读取代理对象的原型	handler.setPrototypeOf()--拦截设置原型
handler.isExtensible()--判断对象是否是可扩展的（是否可以在它上面添加新的属性）		handler.preventExtensions()--让一个对象变的不可扩展
handler.getOwnPropertyDescriptor()--查询对象上一个自有属性对应的属性描述符		handler.defineProperty()——拦截definePrperty
```



### 三、 handler.get

`handler.get`用于代理目标对象的属性读取操作，接受三个参数`get(target, propKey, ?receiver)`

`target` 	——	目标对象
`propkey` 	——	属性名
`receiver` 	——	Proxy 实例本身

举个栗子

```js
const person = {
	like:'vuejs'
}
const obj = new Proxy(person,{
    get: function(target,propKey){
        //in 操作符（如果指定的属性在指定的对象或其原型链中，则in 运算符返回true）
        if(propKey in target){	
            return target[propKey]
        }else{
            throw new ReferenceError('Prop name '+propKey+'does not exist')
        }
    }
})
```

**注意:**

- 如果要访问的目标属性是不可写以及不可配置的，则返回的值必须与该目标属性的值相同
- 如果要访问的目标属性没有配置访问方法，即get方法是undefined的，则返回值必须为undefined

如下面的例子

```js
const obj = {};
Object.defineProperty(obj, "a", { 
  configurable: false, 
  enumerable: false, 
  value: 10, 
  writable: false 
})

const p = new Proxy(obj, {
  get: function(target, prop) {
    return 20;
  }
})

p.a // Uncaught TypeError: 'get' on proxy: property 'a' is a read-only and non-configurable..
```

### 四、 handler.set

`handler.set()` 方法用于拦截设置属性值的操作，返回一个布尔值。

#### 参数 ( 注意`this` 绑定在 handler 对象上。)

```js
const p = new Proxy(target, {
  set: function(target, property, value, receiver) {
  }
});
target   // 目标对象。
property   //将被设置的属性名，或Symbol
value    //新属性值。
receiver  //最初被调用的对象。通常是 proxy 本身，但 handler 的 set 方法也有可能在原型链上，或以其他方式被间接地调用（因此不一定是 proxy 本身）。**比如：**假设有一段代码执行 `obj.name = "jen"`， `obj` 不是一个 proxy，且自身不含 `name` 属性，但是它的原型链上有一个 proxy，那么，那个 proxy 的 `set()` 处理器会被调用，而此时，`obj` 会作为 receiver 参数传进来。
```

#### 该方法会拦截目标对象的以下操作:

- 指定属性值：`proxy[foo] = bar` 和 `proxy.foo = bar`
- 指定继承者的属性值：`Object.create(proxy)[foo] = bar`
- `Reflect.set()`  

#### 如果违背以下的约束条件，proxy 会抛出一个 [`TypeError`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/TypeError) 异常：

- 若目标属性是一个不可写及不可配置的数据属性，则不能改变它的值。
- 如果目标属性没有配置存储方法，即 `[[Set]]` 属性的是 `undefined`，则不能设置它的值。
- 在严格模式下，如果 `set()` 方法返回 `false`，那么也会抛出一个 [`TypeError`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/TypeError) 异常。



以下代码演示如何捕获属性的设置操作。

```js
var p = new Proxy({}, {
  set: function(target, prop, value, receiver) {
    target[prop] = value;
    console.log('property set: ' + prop + ' = ' + value);
    return true;
  }
})

console.log('a' in p);  // false

p.a = 10;               // "property set: a = 10"
console.log('a' in p);  // true
console.log(p.a);       // 10
```



### 五、可撤销的Proxy

`proxy`有一个唯一的静态方法，`Proxy.revocable(target, handler)`


`Proxy.revocable()`方法可以用来创建一个可撤销的代理对象

该方法的返回值是一个对象，其结构为： `{"proxy": proxy, "revoke": revoke}`

- proxy 表示新生成的代理对象本身，和用一般方式 `new Proxy(target, handler)` 创建的代理对象没什么不同，只是它可以被撤销掉。
- revoke 撤销方法，调用的时候不需要加任何参数，就可以撤销掉和它一起生成的那个代理对象。

该方法常用于完全封闭对目标对象的访问, 如下示例

```js
const target = { name: 'vuejs'}
const {proxy, revoke} = Proxy.revocable(target, handler)
proxy.name // 正常取值输出 vuejs
revoke() // 取值完成对proxy进行封闭，撤消代理
proxy.name // TypeError: Revoked
```



### 六、Proxy的实际应用（较多）

#### 1.校验器 使用`Proxy`实现一个逻辑分离的数据类型格式验证器

```js
const target = {
  _id: '1024',
  name:  'vuejs'
}

const validators = {  
    name(val) {
        return typeof val === 'string';
    },
    _id(val) {
        return typeof val === 'number' && val > 1024;
    }
}

const createValidator = (target, validator) => {
  return new Proxy(target, {
    _validator: validator,
    set(target, propkey, value, proxy){
      let validator = this._validator[propkey](value)
      if(validator){
        return Reflect.set(target, propkey, value, proxy)
      }else {
        throw Error(`Cannot set ${propkey} to ${value}. Invalid type.`)
      }
    }
  })
}

const proxy = createValidator(target, validators)

proxy.name = 'vue-js.com' // vue-js.com
proxy.name = 10086 // Uncaught Error: Cannot set name to 10086. Invalid type.
proxy._id = 1025 // 1025
proxy._id = 22  // Uncaught Error: Cannot set _id to 22. Invalid type 

```

#### 2.使用Proxy实现私有属性拦截

```js
const target = {
  _id: '1024',
  name:  'vuejs'
}

const proxy = new Proxy(target, {
  get(target, propkey, proxy){
    if(propkey[0] === '_'){
      throw Error(`${propkey} is restricted`)
    }
    return Reflect.get(target, propkey, proxy)
  },
  set(target, propkey, value, proxy){
    if(propkey[0] === '_'){
      throw Error(`${propkey} is restricted`)
    }
    return Reflect.set(target, propkey, value, proxy)
  }
})

proxy.name // vuejs
proxy._id // Uncaught Error: _id is restricted
proxy._id = '1025' // Uncaught Error: _id is restricted
```



# Reflect

## 定义

**Reflect** 是一个内置的对象，它提供拦截 JavaScript 操作的方法。这些方法与 `proxy handlers` 的方法相同。`Reflect`不是一个函数对象，因此它是不可构造的。



与大多数全局对象不同`Reflect`并非一个构造函数，所以不能通过[new运算符](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/new)对其进行调用，或者将`Reflect`对象作为一个函数来调用。`Reflect`的所有属性和方法都是静态的（就像[`Math`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Math)对象）。

`Reflect` 对象提供了以下静态方法，这些方法与 `proxy handler methods` 的命名相同.

其中的一些方法与 [`Object`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object)相同, 尽管二者之间存在 [某些细微上的差别](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Reflect/Comparing_Reflect_and_Object_methods) .



## 静态方法

```js
Reflect.apply(target, thisArgument, argumentsList)
//对一个函数进行调用操作，同时可以传入一个数组作为调用参数。和 Function.prototype.apply() 功能类似。

Reflect.construct(target, argumentsList[, newTarget])
//对构造函数进行 new 操作，相当于执行 new target(...args)。

Reflect.defineProperty(target, propertyKey, attributes)
//和 Object.defineProperty() 类似。如果设置成功就会返回 true

Reflect.deleteProperty(target, propertyKey)
//作为函数的delete操作符，相当于执行 delete target[name]。

Reflect.get(target, propertyKey[, receiver])
//获取对象身上某个属性的值，类似于 target[name]。

Reflect.getOwnPropertyDescriptor(target, propertyKey)
//类似于 Object.getOwnPropertyDescriptor()。如果对象中存在该属性，则返回对应的属性描述符,  否则返回 undefined.

Reflect.getPrototypeOf(target)
//类似于 Object.getPrototypeOf()。

Reflect.has(target, propertyKey)
//判断一个对象是否存在某个属性，和 in 运算符 的功能完全相同。

Reflect.isExtensible(target)
//类似于 Object.isExtensible().

Reflect.ownKeys(target)
//返回一个包含所有自身属性（不包含继承属性）的数组。(类似于 Object.keys(), 但不会受enumerable影响).

Reflect.preventExtensions(target)
//类似于 Object.preventExtensions()。返回一个Boolean。

Reflect.set(target, propertyKey, value[, receiver])
//将值分配给属性的函数。返回一个Boolean，如果更新成功，则返回true。

Reflect.setPrototypeOf(target, prototype)
//设置对象原型的函数. 返回一个 Boolean， 如果更新成功，则返回true。
```



## Examples

```js
//检测一个对象是否存在特定属性
const duck = {
  name: 'Maurice',
  color: 'white',
  greeting: function() {
    console.log(`Quaaaack! My name is ${this.name}`);
  }
}

Reflect.has(duck, 'color');
// true
Reflect.has(duck, 'haircut');
// false


//返回这个对象自身的属性
Reflect.ownKeys(duck);
// [ "name", "color", "greeting" ]


//为这个对象添加一个新的属性
Reflect.set(duck, 'eyes', 'black');
// returns "true" if successful
// "duck" now contains the property "eyes: 'black'"
```

