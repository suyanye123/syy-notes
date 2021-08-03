# Proxy

### 一、定义

Proxy对象用于创建一个对象的代理,从而实现对对象的基本操作的拦截和自定义(如属性查找、赋值、枚举、函数调用等)

proxy函数接受两个参数，target、handler

`target`--要使用proxy包装的目标对象，可以是任何类型的对象，甚至另一个代理

`handler`--一个通常以函数作为属性的对象，分别定义了在执行各种操作时代理p的行为

```js
const p = new Proxy(target,handler)
```

### 二、 Handler 对象常用的方法

handler.has()	——	in 操作符的捕捉器

handler.get()	——	属性读取操作的捕捉器

handler.set()	——	 属性设置操作的捕捉器

handler.deleteProperty()	——	delete 操作符的捕捉器

handler.ownKeys()	——	Object.getOwnPropertyNames 方法和 Object.getOwnPropertySymbols 方法的捕捉器

handler.apply()	——	 函数调用操作的捕捉器

handler.construct()	——	 new 操作符的捕捉器



### 三、 handler.get

接受三个参数`get(target, propKey, ?receiver)`

`target` 	——	目标对象
`propkey` 	——	属性名
`receiver` 	——	Proxy 实例本身





### 四、可撤销的Proxy

`proxy`有一个唯一的静态方法，Proxy.revocable(target, handler)


`Proxy.revocable()`方法可以用来创建一个可撤销的代理对象

该方法的返回值是一个对象，其结构为： `{"proxy": proxy, "revoke": revoke}`

- proxy 表示新生成的代理对象本身，和用一般方式 new Proxy(target, handler) 创建的代理对象没什么不同，只是它可以被撤销掉。
- revoke 撤销方法，调用的时候不需要加任何参数，就可以撤销掉和它一起生成的那个代理对象。

该方法常用于完全封闭对目标对象的访问, 如下示例

```js
const target = { name: 'vuejs'}
const {proxy, revoke} = Proxy.revocable(target, handler)
proxy.name // 正常取值输出 vuejs
revoke() // 取值完成对proxy进行封闭，撤消代理
proxy.name // TypeError: Revoked
```



### 五、Proxy的实际应用（较多）

1.校验器 使用`Proxy`实现一个逻辑分离的数据类型格式验证器

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

2.使用Proxy实现私有属性拦截

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

