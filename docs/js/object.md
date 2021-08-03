## Object

## 一、Object的属性

JavaScript 中对象的属性分为：数据属性和访问器属性

### 数据属性：

定义在对象内部的数据，具有四个特征

#### configurable：

是否可以被 delete 删除或者改变特征值

```markdown
configurable(可配置性）返回一个布尔值，决定了是否可以修改属性描述对象。
也就是说，configurable为false时，value、writable、enumerable和configurable都不能被修改了， configurable修改成false是单向操作，无法撤销！以及无法被删除
注意，writable只有在false改为true会报错，true改为false是允许的。
至于value，只要writable和configurable有一个为true，就允许改动。
另外，configurable为false时，直接目标属性赋值，不报错，但不会成功。
```

####  enumerable：

是否能通过 for-in 循环遍历返回属性

```markdown
enumerable（可遍历性）返回一个布尔值，表示目标属性在 for…in、Object.keys、JSON.stringify 中是否可遍历。但是可以直接获取它的值。
注意，for…in循环包括继承的属性，Object.keys方法不包括继承的属性。如果需要获取对象自身的所有属性，不管是否可枚举，可以使用Object.getOwnPropertyNames方法。
```

####  writabe：

是否可以修改属性的值

```markdown
writable属性是一个布尔值，决定了目标属性的值（value）是否可以被改变。如果原型对象的某个属性的writable为false，那么子对象将无法自定义这个属性。
```

####  value：

保存这个属性的数据值



### 注意：

**1.使用对象直接量创建的属性**，**它的 writable、enumerable 和 configurable 特性默认为 true**。例如：

```js
var o = { a: 1 };
o.b = 2;
//a和b皆为数据属性
console.log(Object.getOwnPropertyDescriptor(o,"a"))
// {value: 1, writable: true, enumerable: true, configurable: true}
console.log(Object.getOwnPropertyDescriptor(o,"b"))
// {value: 2, writable: true, enumerable: true, configurable: true}
```

> `Object.getOwnPropertyDescriptor(obj, prop)`：返回指定对象上一个自有属性对应的属性描述符。（自有属性指的是直接赋予该对象的属性，不需要从原型链上进行查找的属性）
>
> obj：需要查找的目标对象
>
> prop：目标对象内属性名称
>
> `Object.getOwnPropertyDescriptors(obj)`：获取一个对象的所有自身属性的描述符



**2**.要修改属性默认的特性，可以使用 `Object.defineProperty()` 方法，**在使用 Object.defineProperty、Object.defineProperties 或 Object.create 函数的情况下添加数据属性，writable、enumerable 和 configurable 默认值为 false。**

例如：

```js
//输出是什么?
const person = { name: "Lydia" };
Object.defineProperty(person, "age", { value: 21 });
console.log(person);
console.log(Object.keys(person));

A: { name: “Lydia”, age: 21 }, [“name”, “age”]
B: { name: “Lydia”, age: 21 }, [“name”]
C: { name: “Lydia”}, [“name”, “age”]
D: { name: “Lydia”}, [“age”]

//答案: B

//通过defineProperty方法，我们可以给对象添加一个新属性，或者修改已经存在的属性。而我们使用defineProperty方法给对象添加了一个属性之后，属性默认为 不可枚举(not enumerable). Object.keys方法仅返回对象中 可枚举(enumerable) 的属性，因此只剩下了"name".
//用defineProperty方法添加的属性默认不可变。你可以通过writable, configurable 和 enumerable属性来改变这一行为。这样的话， 相比于自己添加的属性，defineProperty方法添加的属性有了更多的控制权。
```

> `Object.defineProperty(obj, prop, descriptor)`：会直接在一个对象上定义一个新属性，或者修改一个对象的现有属性，并返回此对象。
>
> obj：要定义属性的对象
>
> prop：要定义或修改的属性的名称
>
> descriptor：要定义或修改的属性描述符
>
> `Object.defineProperties(obj, {prop1 : descriptor1, prop2 : descriptor2, ...})`：直接在一个对象上定义新的属性或修改现有属性，并返回该对象。
>
> obj：在其上定义或修改属性的对象
>
> prop/descriptor：要定义的可枚举属性和修改的属性描述符的对象



### 访问器属性：

不包含数据值，它包含一对 getter/setter 函数，也具有四个特征

- configurable：能否通过 delete 删除，能否修改属性特性
- enumerable：能否通过 for-in 循环返回属性
- getter：读取属性时调用的函数，默认为 undefined
- setter：写入属性时调用的函数，默认为 undefined



### 原型属性和实例属性

据具体的上下文环境的不同，又可以将属性分为：

- **原型属性**：定义在对象的原型（prototype）中的属性
- **实例属性**：来自构造函数实例化后添加的新属性



### 可枚举属性与不可枚举属性

 在JavaScript中，对象的属性分为可枚举和不可枚举之分，它们是由属性的enumerable值决定的。可枚举性决定了这个属性能否被for…in查找遍历到。

#### 一、怎么判断属性是否可枚举

 js中**基本包装类型**的原型属性是不可枚举的，如Object, Array, Number等，如果你写出这样的代码遍历其中的属性：

```js
var num = new Number();
for(var pro in num){  
    console.log("num." + pro + " = " + num[pro]);
}
```

它的输出结果会是空。这是因为Number中内置的属性是不可枚举的，所以不能被for…in访问到。

Object对象的propertyIsEnumerable()方法可以判断此对象是否包含某个属性，并且这个属性是否可枚举。

需要注意的是：如果判断的属性存在于Object对象的原型内，不管它是否可枚举都会返回false。

#### 二、枚举性的作用

属性的枚举性会影响以下三个函数的结果：`for…in`、`Object.keys()`、`JSON.stringify()`

先看一个例子，按如下方法创建kxy对象：

```js
function Person() {
    this.name = "KXY";
}
Person.prototype = {
    constructor: Person,
    job: "student",
};
var kxy = new Person();
//其中用defineProperty为对象定义了一个名为”sex”的不可枚举属性
Object.defineProperty(kxy, "sex", {
    value: "female",
    enumerable: false
});
```

接下来做以下验证：

**1.for…in**

```js
for(var pro in kxy) {
    console.log("kxy." + pro + " = " + kxy[pro]);
  }
//遍历结果如下：
kxy.name = KXY
kxy.constructor = function Person() {
this.name = "KXY";
}
kxy.job = student
```

可以看到除了”sex“之外的属性都遍历到了

```js
for(var pro in kxy) {
	if(kxy.hasOwnProperty(pro)) 
    console.log("kxy." + pro + " = " + kxy[pro]);
}
//打印结果是：
kxy.name = KXY
```

**2.Object.keys()**

```js
console.log(Object.keys(kxy));
//打印结果是：
['name']	//只包含”name”属性，说明该方法只能返回对象本身具有的可枚举属性。
```

**3.JSON.stringify()**

```js
console.log(JSON.stringify(kxy));
//打印结果是：
{'name':'KXY'}	//此方法也只能读取对象本身的可枚举属性，并序列化为JSON对象。
```



## 二、Object属性的遍历

在JavaScript中除了检测对象的属性是否存在，还会经常对对象的属性进行遍历(枚举)。而在JavaScript中遍历一个对象的属性并不太简单，主要有两个原因：

- JavaScript中的对象通常都处在某个原型链中，它会从一个或多个的上层原型上继承一些属性
- JavaScript中的属性不光有值，它还有一些除了值以外的其他特性，其中一个影响属性遍历的特性就是`[Enumerable]`，如果该值为`true`，则这个属性是可枚举的，否则反之

JavaScript中对象属性枚举的四种方法：`for ... in`、`Object.keys()`、`Object.getOwnPropertyNames()`、`for ... of`

**举个栗子**

定义一个 obj 对象

```js
function Foo() {
    this.a = 1 // 实例属性
    this.b = 2
}
Foo.prototype = {
    c: 3, // 原型属性
    d: 4
}
var obj = new Foo()

Object.defineProperty(obj, 'a', {
    enumerable: false
})
```

### 1. for ... in

`for...in` 循环可以遍历对象中**所有可枚举的对象属性（包括对象自有属性和继承的属性）**。不过需要注意的是，使用 `for...in` 循环遍历对象属性时返回的属性会因为各个浏览器不同导致对象属性遍历的顺序有可能不是当初构建时的顺序。

```js
for (prop in obj) {
    console.log(prop); // 输出b,c,d；但不会输出a
}
console.log(obj.propertyIsEnumerable('a')) // a的Enumerable设定为false不可枚举

console.log(Object.getOwnPropertyDescriptors(obj)) // 打印obj自有属性的属性描述符
// a: {value: 1, writable: true, enumerable: false, configurable: true}
// b: {value: 2, writable: true, enumerable: true, configurable: true}
console.log(Object.getOwnPropertyDescriptors(obj.__proto__)) // 打印obj原型链上的属性的属性描述符
// c: {value: 3, writable: true, enumerable: true, configurable: true}
// d: {value: 4, writable: true, enumerable: true, configurable: true}
```

> propertyIsEnumerable(prop)：此方法可以确定对象中指定的属性是否可以被 for...in 循环枚举，但是通过原型链继承的属性除外。如果对象没有指定的属性，则此方法返回 false。
>
> prop：String 类型的被测试的属性名

如此一来，可以封装一个 `getEnumPropertyNames()` 方法，用来循环遍历对象属性，返回**自身的可枚举属性**名称组成的数组：（类似 `Object.keys()` ）

```js
var getEnumPropertyNames = function (obj) {
  if (typeof obj !== 'object') throw TypeError(); // 参数必须是对象
  var props = []; // 将要返回的数组
  for (var prop in obj) { // 遍历所有可枚举的属性
    if (obj.hasOwnProperty(prop)) { //判断是否是自有属性
      props.push(prop); //将属性名添加到数组中
    }
  }
  return props; //返回这个数组
}

console.log(getEnumPropertyNames(obj)); // ["b"] 自有属性中的可枚举属性
```

> hasOwnProperty(prop)方法：会返回一个布尔值，指示对象**自身属性中是否具有指定的属性**（也就是，是否有指定的键）
>
> prop：要检测的属性的 String 字符串形式表示的名称



### 2. Object.keys()

`Object.keys(obj)` 方法会返回一个由给定对象的**所有可枚举自身属性**的属性名组成的**数组**。

数组中属性名的排列顺序和使用 for...in 循环遍历该对象时返回的顺序一致。两者最大的区别在于 for...in **还会遍历出从其原型链上继承到的可枚举属性**。

> 注意：在 ES5 环境，如果传入的参数不是一个对象，而是一个字符串，那么它会报 TypeError。在 ES6 环境，如果传入的是一个非对象参数，内部会对参数作一次强制对象转换，如果转换不成功会抛出 TypeError。

```js
console.log(Object.keys(obj)); // ["b"]  	//a被修改为不可枚举了

// 在 ES5 环境
Object.keys('foo'); // TypeError: "foo" is not an object

// 在 ES6 环境
Object.keys('foo'); // ["0", "1", "2"]
// 传入 null 对象
Object.keys(null); // Uncaught TypeError: Cannot convert undefined or null to object
// 传入 undefined
Object.keys(undefined); // Uncaught TypeError: Cannot convert undefined or null to object
```



### 3. Object.getOwnPropertyNames()

`Object.getOwnPropertyNames(obj)` 方法返回一个由指定对象的**所有自身属性的属性名（包括不可枚举属性）组成的数组**，但不会获取原型链上的属性。

数组中枚举属性的顺序与 for...in（或 Object.keys()）迭代该对象属性时一致。 数组中不可枚举属性的顺序未定义。

```js
console.log(Object.getOwnPropertyNames(obj)) // ["a", "b"]
```



### 4. for ... of

ES5 中 `forEach()` 可以用来遍历数组，但是它不能正确响应 break、continue 和 return 语句。

而 `for in` 遍历数组也有问题：

- 遍历出的是数组的 index 索引不是值，并且是字符串型数字，不能直接进行几何运算
- 会遍历数组所有的可枚举属性，包括原型上的

所以 `for in` 更适合遍历对象，不要使用它遍历数组。

ES6 新增了 for...of ，解决了以上的问题：

for...of 主要来遍历**可迭代的对象**（包括 Number、String、Array、Map、Set、arguments 等拥有迭代器对象的集合）。但不能用于遍历一般的 obj 对象，因为它没有 iterable 迭代器。

for...of 主要用来**获取对象的属性值**，而 for...in 主要获取对象的**属性名**。

```js
Object.prototype.objCustom = function() {}; // myArray继承属性objCustom和arrCustom属性
Array.prototype.arrCustom = function() {}; 

let myArray = [1, 2, 3]
myArray.name = "数组";

for (let key in myArray) {
  console.log(key); // 0 1 2 name arrCustom objCustom 
}

for (let value of myArray) {
  console.log(value); // 1 2 3
}
```

for in 循环以原始插入顺序记录 **myArray 对象的可枚举属性**，其中包括数组索引 0、1、2，自身可枚举属性 name 和继承的可枚举属性属性 arrCustom 、objCustom。

而 for of 循环 迭代并记录了 **myArray 作为可迭代对象定义的迭代值**，这些是数组元素 1、2、3。

> 解构赋值和展开操作符 `...` 也都需要用在可迭代对象上。



### 总结

这几个方法之间的区别差异主要在于：属性是否可枚举，是来自原型，还是实例。

| 方法                         | 适用范围                                  | 描述                                                         |
| ---------------------------- | ----------------------------------------- | ------------------------------------------------------------ |
| for...in                     | 对象                                      | 获取可枚举的实例和原型属性名                                 |
| Object.keys()                | 数组，对象                                | 返回可枚举的实例属性名组成的数组                             |
| Object.getOwnPropertyNames() | 数组、对象                                | 返回除原型属性以外的所有属性（包括不可枚举的属性）名组成的数组 |
| for...of                     | 可迭代对象(Array, Map, Set, arguments 等) | 返回可迭代对象定义的迭代值                                   |

满足条件：

| 可枚举                       | 实例                         | 原型     | 不可枚举                     |
| ---------------------------- | ---------------------------- | -------- | ---------------------------- |
| for...in                     | for...in                     | for...in |                              |
| Object.getOwnPropertyNames() | Object.getOwnPropertyNames() |          | Object.getOwnPropertyNames() |
| Object.keys()                | Object.keys()                |          |                              |

> - for...in 只需要是`可枚举`属性
> - Object.getOwnPropertyNames() 只需要是`实例`属性
> - Object.keys() 必须满足是`可枚举`的`实例`属性





## 三、Object 的方法

#### 1.`Object.getOwnPropertyDescriptor` 和 `Object.defineProperty`

```js
Object.getOwnPropertyDescriptor(obj, prop)
//返回指定对象上一个自有属性对应的属性描述符。（自有属性指的是直接赋予该对象的属性，不需要从原型链上进行查找的属性）

Object.getOwnPropertyDescriptors(obj)
//获取一个对象的所有自身属性的描述符

Object.defineProperty(obj, prop, descriptor)
//会直接在一个对象上定义一个新属性，或者修改一个对象的现有属性，并返回此对象。

Object.defineProperties(obj, {prop1 : descriptor1, prop2 : descriptor2, ...})
//直接在一个对象上定义新的多个属性或修改现有属性，并返回该对象。
```



#### 2.`Object.getOwnPropertyNames`

```js
Object.getOwnPropertyNames(obj)
//返回一个由指定对象的所有自身属性的属性名（包括不可枚举属性）组成的数组，但不会获取原型链上的属性
```



#### 3.`propertyIsEnumerable` 和 `hasOwnProperty`

```js
propertyIsEnumerable(prop)
//返回一个布尔值，可以确定对象中指定的属性(非原型链继承的)是否可以被 for...in 循环枚举。如果对象没有这个属性，则此方法返回 false。

hasOwnProperty(prop)
//返回一个布尔值，指示对象自身属性中是否具有指定的属性
```



#### 4.`Object.keys` 和 `Object.values`

```js
Object.keys(obj)
//会返回一个由给定对象的所有可枚举自身属性的属性名组成的数组，数组中属性名的排列顺序和正常循环遍历该对象时返回的顺序一致 。

Object.values(obj)
//返回一个给定对象自身的所有可枚举属性值的数组，值的顺序与使用 for...in 循环的顺序相同 ( 区别在于 for-in 循环枚举原型链中的属性 )。
```



#### 5.`Object.getPrototypeOf`、`Object.setPrototypeOf` 和 `isPrototypeOf`

```js
Object.getPrototypeOf(obj)
//方法返回指定对象的原型（内部[[Prototype]]属性的值）

Object.setPrototypeOf(obj, prototype)
//设置一个指定的对象的原型 ( 即内部[[Prototype]]属性）为另一个对象或 null

obj1.prototype.isPrototypeOf(obj2)
//用于测试一个对象 obj2 是否存在于另一个对象 obj1 的原型链上
```



```js
if (Foo.prototype.isPrototypeOf(baz)) {
  // do something safe
}
// 和instanceof功能一样，判断对象是否继承自一个特定的原型链
```

#### 6.`Object.create`、`Object.assign` 和 `Object.is`

```js
Object.create(proto,[propertiesObject])
//创建一个新对象，使用现有的对象来提供新创建的对象的 __proto__
//proto---新创建对象的原型对象。
//propertiesObject 可选。需要传入一个对象，该对象的属性类型参照Object.defineProperties()的第二个参数。如果该参数被指定且不为 undefined，该传入对象的自有可枚举属性(即其自身定义的属性，而不是其原型链上的枚举属性)将为新创建的对象添加指定的属性值和对应的属性描述符。
//返回值--- 一个新对象，带着指定的原型对象和属性。
const obj = Object.create({a:1}, {b: {value: 2}})

//第一个参数为对象，对象为函数调用之后返回新对象的原型对象，第二个参数为对象本身的实例方法（默认不能修改,不能枚举）
obj.__proto__.a === 1      // true 

obj.b = 3;
console.log(obj.b)      // 2

//创建一个可写的,可枚举的,可配置的属性p
obj2 = Object.create({}, {
  p: {
    value: 2,       // 属性值
    writable: true,     //  是否可以重写值
    enumerable: true,   //是否可枚举
    configurable: true  //是否可以修改以上几项配置
  }
});

obj2.p = 3;
console.log(obj2.p)     // 3
```



```js
Object.assign(target, ...sources)//用于将所有可枚举属性的值从一个或多个源对象复制到目标对象。它将返回目标对象
const target = { a: 1, b: 2 };
const source = { b: 4, c: 5 };

const returnedTarget = Object.assign(target, source);

console.log(target);
// expected output: Object { a: 1, b: 4, c: 5 }

console.log(returnedTarget);
// expected output: Object { a: 1, b: 4, c: 5 }
```



```js
Object.is(value1, value2)
//判断两个值是否为同一个值（需要满足同值相等）
+0 === -0 //true
NaN === NaN // false
Object.is(+0, -0) // false
Object.is(NaN, NaN) // true
```

ES5 可以通过下面的代码实现：

```js
Object.defineProperty(Object, 'is', {
  value: function(x, y) {
    if (x === y) {
      // 针对+0 不等于 -0的情况
      return x !== 0 || 1 / x === 1 / y;
    }
    // 针对NaN的情况
    return x !== x && y !== y;
  },
  configurable: true,
  enumerable: false,
  writable: true
});
```



