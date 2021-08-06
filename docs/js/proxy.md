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
- 指定继承者的属性值：`Object.create(proxy)[foo] = bar`    ([object.create](./object)参考)
- `Reflect.set()`  (Reflect.set参考本页下面)

#### 如果违背以下的约束条件，proxy 会抛出一个 [`TypeError`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/TypeError) 异常：

- 若目标属性是一个不可写及不可配置的数据属性，则不能改变它的值。
- 如果目标属性没有配置存储方法，即 `[Set] `属性的是 `undefined`，则不能设置它的值。
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

#### 3.扩展构造函数

```js
//方法代理可以轻松地通过一个新构造函数来扩展一个已有的构造函数。这个例子使用了construct和apply。
function extend(sup, base) {
  var descriptor = Object.getOwnPropertyDescriptor(
    base.prototype, "constructor"
  );
  base.prototype = Object.create(sup.prototype);
  var handler = {
    construct: function(target, args) {
      var obj = Object.create(base.prototype);
      this.apply(target, obj, args);
      return obj;
    },
    apply: function(target, that, args) {
      sup.apply(that, args);
      base.apply(that, args);
    }
  };
  var proxy = new Proxy(base, handler);
  descriptor.value = proxy;
  Object.defineProperty(base.prototype, "constructor", descriptor);
  return proxy;
}

var Person = function (name) {
  this.name = name
};

var Boy = extend(Person, function (name, age) {
  this.age = age;
});

Boy.prototype.sex = "M";

var Peter = new Boy("Peter", 13);
console.log(Peter.sex);  // "M"
console.log(Peter.name); // "Peter"
console.log(Peter.age);  // 13
```

#### 4.操作 DOM 节点

有时，我们可能需要互换两个不同的元素的属性或类名。下面的代码以此为目标，展示了 [`set`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Proxy/Proxy/set) handler 的使用场景。

```js
let view = new Proxy({
  selected: null
}, {
  set: function(obj, prop, newval) {
    let oldval = obj[prop];

    if (prop === 'selected') {
      if (oldval) {
        oldval.setAttribute('aria-selected', 'false');
      }
      if (newval) {
        newval.setAttribute('aria-selected', 'true');
      }
    }

    // 默认行为是存储被传入 setter 函数的属性值
    obj[prop] = newval;

    // 表示操作成功
    return true;
  }
});

let i1 = view.selected = document.getElementById('item-1');
console.log(i1.getAttribute('aria-selected')); // 'true'

let i2 = view.selected = document.getElementById('item-2');
console.log(i1.getAttribute('aria-selected')); // 'false'
console.log(i2.getAttribute('aria-selected')); // 'true'

```

#### 5.值修正及附加属性

以下`products`代理会计算传值并根据需要转换为数组。这个代理对象同时支持一个叫做 `latestBrowser`的附加属性，这个属性可以同时作为 getter 和 setter。

```js
let products = new Proxy({
  browsers: ['Internet Explorer', 'Netscape']
}, {
  get: function(obj, prop) {
    // 附加一个属性
    if (prop === 'latestBrowser') {
      return obj.browsers[obj.browsers.length - 1];
    }

    // 默认行为是返回属性值
    return obj[prop];
  },
  set: function(obj, prop, value) {
    // 附加属性
    if (prop === 'latestBrowser') {
      obj.browsers.push(value);
      return;
    }

    // 如果不是数组，则进行转换
    if (typeof value === 'string') {
      value = [value];
    }

    // 默认行为是保存属性值
    obj[prop] = value;

    // 表示成功
    return true;
  }
});

console.log(products.browsers); // ['Internet Explorer', 'Netscape']
products.browsers = 'Firefox';  // 如果不小心传入了一个字符串
console.log(products.browsers); // ['Firefox'] <- 也没问题, 得到的依旧是一个数组

products.latestBrowser = 'Chrome';
console.log(products.browsers);      // ['Firefox', 'Chrome']
console.log(products.latestBrowser); // 'Chrome'

```

#### 6.通过属性查找数组中的特定对象

以下代理为数组扩展了一些实用工具。

如你所见，通过 Proxy，我们可以灵活地“定义”属性，而不需要使用 `Object.defineProperties` 方法。

ps:以下例子可以用于通过单元格来查找表格中的一行。在这种情况下，target 是 `table.rows`。

```js
let products = new Proxy([
  { name: 'Firefox'    , type: 'browser' },
  { name: 'SeaMonkey'  , type: 'browser' },
  { name: 'Thunderbird', type: 'mailer' }
], {
  get: function(obj, prop) {
    // 默认行为是返回属性值， prop ?通常是一个整数
    if (prop in obj) {
      return obj[prop];
    }

    // 获取 products 的 number; 它是 products.length 的别名
    if (prop === 'number') {
      return obj.length;
    }

    let result, types = {};

    for (let product of obj) {
      if (product.name === prop) {
        result = product;
      }
      if (types[product.type]) {
        types[product.type].push(product);
      } else {
        types[product.type] = [product];
      }
    }

    // 通过 name 获取 product
    if (result) {
      return result;
    }
      
    // 通过 type 获取 products
    if (prop in types) {
      return types[prop];
    }

    // 获取 product type
    if (prop === 'types') {
      return Object.keys(types);
    }

    return undefined;
  }
});

console.log(products[0]); // { name: 'Firefox', type: 'browser' }
console.log(products['Firefox']); // { name: 'Firefox', type: 'browser' }
console.log(products['Chrome']); // undefined
console.log(products.browser); // [{ name: 'Firefox', type: 'browser' }, { name: 'SeaMonkey', type: 'browser' }]
console.log(products.types); // ['browser', 'mailer']
console.log(products.number); // 3

```

#### 7.一个完整的 `traps` 列表示例

出于教学目的，这里为了创建一个完整的 traps 列表示例，

我们将尝试代理化一个非原生对象，这特别适用于这类操作：由 [发布在 document.cookie页面上的“小型框架” ](https://developer.mozilla.org/zh-CN/docs/Web/API/document/cookie#%E4%B8%80%E4%B8%AA%E5%B0%8F%E6%A1%86%E6%9E%B6%EF%BC%9A%E4%B8%80%E4%B8%AA%E5%AE%8C%E6%95%B4%E6%94%AF%E6%8C%81unicode%E7%9A%84cookie%E8%AF%BB%E5%8F%96%E5%86%99%E5%85%A5%E5%99%A8)创建的`docCookies`全局对象。

```js
/*
  var docCookies = ... get the "docCookies" object here:
  https://developer.mozilla.org/zh-CN/docs/DOM/document.cookie#A_little_framework.3A_a_complete_cookies_reader.2Fwriter_with_full_unicode_support
*/

var docCookies = new Proxy(docCookies, {
  "get": function (oTarget, sKey) {
    return oTarget[sKey] || oTarget.getItem(sKey) || undefined;
  },
  "set": function (oTarget, sKey, vValue) {
    if (sKey in oTarget) { return false; }
    return oTarget.setItem(sKey, vValue);
  },
  "deleteProperty": function (oTarget, sKey) {
    if (sKey in oTarget) { return false; }
    return oTarget.removeItem(sKey);
  },
  "enumerate": function (oTarget, sKey) {
    return oTarget.keys();
  },
  "ownKeys": function (oTarget, sKey) {
    return oTarget.keys();
  },
  "has": function (oTarget, sKey) {
    return sKey in oTarget || oTarget.hasItem(sKey);
  },
  "defineProperty": function (oTarget, sKey, oDesc) {
    if (oDesc && "value" in oDesc) { oTarget.setItem(sKey, oDesc.value); }
    return oTarget;
  },
  "getOwnPropertyDescriptor": function (oTarget, sKey) {
    var vValue = oTarget.getItem(sKey);
    return vValue ? {
      "value": vValue,
      "writable": true,
      "enumerable": true,
      "configurable": false
    } : undefined;
  },
});

/* Cookies 测试 */

alert(docCookies.my_cookie1 = "First value");
alert(docCookies.getItem("my_cookie1"));

docCookies.setItem("my_cookie1", "Changed value");
alert(docCookies.my_cookie1);
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

