# 2.2.4 拷贝

浅拷贝和深拷贝针对的是`对象/数组`，因为基本`数据类型`没有浅/深一说，它复制都会生成新数据，原数据永远不会被影响。

> 深拷贝和浅拷贝最根本的区别在于是否是真正获取了一个对象的复制实体，而不是引用。深拷贝在计算机中开辟了一块内存地址用于存放复制的对象，而浅拷贝仅仅是指向被拷贝的内存地址，如果原地址中对象被改变了，那么浅拷贝出来的对象也会相应改变。

也就是说：

 **浅拷贝**：拷贝的引用，修改拷贝后**会影响**原数据，使得原数据不安全

 **深拷贝(深度克隆)**：拷贝后生成新数据，修改拷贝后**不会影响**原数据

## 浅拷贝数据的几种方法：

### 1. 直接赋值给一个变量

基本数据类型：拷贝后会生成一份新的数据，修改拷贝以后的数据**不会影响**原数据

对象/数组：拷贝后不会生成新的数据，而是复制的引用。修改拷贝后的数据**会影响**原来的数据

```js
// 不会影响原数据 生成新数据
let str = 'abc'
let str2 = str
console.log(str2) // abc
str2 = ''
console.log(str) // abc

let bool1 = true
let bool2 = bool1
bool2 = false
console.log(bool1) // true

// 拷贝数组/对象，没有生成新的数据而是复制了一份引用，改变会影响原数据
let obj = {username: 'wy', age: 18}
let obj1 = obj
console.log(obj1) // {username: 'wy', age: 18}
obj1.username = 'wd'
console.log(obj.username) // wd

let arr = [1, 4, {username: 'wy', age: 18}]
let arr2 = arr
arr2[0] = 'abc'
console.log(arr) // ['abc', 4, {username: 'wy', age: 18}]
```



### 2. Object.assign()

Object.assign(target,source1,source2..)：将源对象的属性复制到目标对象上，并返回目标对象。

**注意： 当对象只有一级属性为深拷贝；当对象中有多级属性时，二级属性后就是浅拷贝**

```js
let obj = {username: 'wy', info: {num: 101}}
let obj2 = Object.assign({}, obj)
console.log(obj2) // {username: 'wy', info: {num: 101}}
// 修改obj2中的一级属性，不会影响原数组
obj2.username = 'wd'
console.log(obj) // {username: 'wy', info: {num: 101}}
// 修改obj2中的二级属性，会影响原数组
obj2.info.num = 102
console.log(obj) // {username: 'wy', info: {num: 102}}
```

上面代码将原始对象拷贝到一个空对象，就得到了原始对象的克隆，这时候 obj 与 obj2 指向的是不同的栈对象，所以对 obj.username 重新复制也不会影响到 obj.username。

**但是 obj.info 是一个栈对象的引用，而不是一个字符串，那么赋值给 obj2 时，obj2.info 也同样是这个栈对象的引用**。



### 3. Array.prototype.concat()

与 Object.assign() 相似，**当数组中的元素均为一维是深拷贝，数组中元素一维以上是值的引用**

```js
let arr = [1, 3, {username: 'wy'}, [4]]

// 如果不传参,相当于拷贝了一份
let arr3 = arr.concat() // 还可以写为 let arr3 = [].concat(arr)
console.log(arr3) // [1, 3, {username: 'wy'}, [4]]

// 修改arr3中的一维，不会影响原数组
arr3[1] = 'abc'
arr3.push('test')
console.log(arr) // [1, 3, {username: 'wy'}, [4]]

// 修改arr3中的二维，会影响原数组
arr3[2].username = 'wd'
console.log(arr) // [1, 3, {username: 'wd'}, [4]]
arr3[3].push('test')
console.log(arr) // [1, 3, {username: 'wd'}, [4, "test"]]
```



### 4. Array.prototype.slice()

slice(idx1, idx2)

1）没有参数是拷贝数组

2）只有一个参数是从该位置起到结束拷贝数组元素

3）两个参数，拷贝从起始位置到结束位置的元素（不包含结束位置的元素：含头不含尾）

同样，**当数组中的元素均为一维是深拷贝，数组中元素一维以上是值的引用**

```js
let arr = [1, 3, {username: 'wy'}, [4]]
// 返回截取的数组片段
let arr2 = arr.slice(0, 2)
console.log(arr2) // [1, 3]
// 如果不传参,相当于拷贝了一份
let arr3 = arr.slice()
console.log(arr3)// [1, 3, {username: 'wy'}, [4]]

// 修改arr3中的一维，不会影响原数组
arr3[1] = 'abc'
arr3.push('test')
console.log(arr) // [1, 3, {username: 'wy'}, [4]]

// 修改arr3中的二维，会影响原数组
arr3[2].username = 'wd'
console.log(arr) // [1, 3, {username: 'wd'}, [4]]
arr3[3].push('test')
console.log(arr) // [1, 3, {username: 'wd'}, [4, "test"]]
```



## 2. 如何实现深度拷贝（克隆）

### 1.for in 循环 对象(属性名) 数组(下标)

拷贝的数据都是基本数据时，确保都是深度克隆，不会影响到原数据。

如果有对象/数组，可以遍历它们，拿到里面的每一项值，直到拿到的是基本数据类型，然后再去复制，可以实现对象/数组的深度拷贝。

##### 知识点储备

如何判断数据类型：arr ---> Array，null ---> Null

1. **typeOf 返回的数据类型：**String，Number，Boolean，Undefined，Object（null也会返回一个Object，因为null默认是一个空对象），Function
2. Object.prototype.toString()

```js
let result = 'abc'
console.log(Object.prototype.toString.call(result)) // [object String]
result = null
console.log(Object.prototype.toString.call(result)) // [object Null]
result = [1, 2, 3]
console.log(Object.prototype.toString.call(result)) // [object Array]
console.log(Object.prototype.toString.call(result).slice(8, -1)) // Array
```

```js
let obj = {username: 'wy', age: 18}
for(let i in obj) {
  console.log(i) // username age
}
let arr = [1, 3, 'abc']
for(let i in arr) {
  console.log(i) // 0 1 2
}
```

完整实现深度克隆：

```js
// 定义检测数据类型的功能函数
function checkedType(target) {
  return Object.prototype.toString.call(target).slice(8, -1)
}
// 实现深度克隆 ---> 对象/数组
function clone(target) {
  // 判断拷贝的数据类型
  // 初始化变量result成为最终克隆的数据
  let result, targetType = checkedType(target);
  if(targetType === 'Object') {
    result = {};
  } else if(targetType === 'Array') {
    result = [];
  } else {
    return target;
  }
  // 遍历目标数据
  for(let i in target) {
    // 获取遍历数据结构的每一项值
    let value = target[i];
    // 判断目标结构里的每一项值是否存在对象/数组
    if(checkedType(value) === 'Object' || checkedType(value) === 'Array') { // 对象/数组中又嵌套着对象/数组
      // 继续遍历获取到的value
      result[i] = clone(value);
    } else { //　获取到的value是基本的数据类型或函数
      result[i] = value;
    }
  }
  return result;
}
let arr = [1, 3, [5, 7, {username: 'wy', age: 18}, 15], 9]
let arr2 = clone(arr)
console.log(arr2) // [1, 3, [5, 7, {username: 'wy', age: 18}, 15], 9]
arr2[2][2].username = 'wd'
console.log(arr, arr2) // [1, 3, [5, 7, {username: 'wy', age: 18}, 15], 9] [1, 3, [5, 7, {username: 'wd', age: 18}, 15], 9]

let obj = {username: 'wy', age: 18}
let obj2 = clone(obj)
console.log(obj2) // {username: "wy", age: 18}
obj2.username = 'wd'
console.log(obj, obj2) //{username: "wy", age: 18} {username: "wd", age: 18}
```



### 2. JSON.parse(JSON.stringify())

```js
let arr = [1, 3, {username: 'wy'}]
// 相当于拷贝了一份
let arr2 = JSON.parse(JSON.stringify(arr))
console.log(arr2) // [1, 3, {username: 'wy'}]

// 修改arr2中的基本数据类型number，不会影响原数组
arr2[1] = 'abc'
console.log(arr) // [1, 3, {username: 'wy'}]

// 修改arr2中的Object类型，不会影响原数组
arr2[2].username = 'wd'
console.log(arr, arr2) // [1, 3, {username: 'wy'}] [1, 3, {username: 'wd'}]
```

> 需要注意的是：这种拷贝方法不可以拷贝一些特殊的属性（例如正则表达式，undefined，function函数）

更重要的是，这种方法只能克隆原始对象自身的值，不能克隆它继承的值，参考如下代码：

```js
var clone = function (obj) {
  return JSON.parse(JSON.stringify(obj));
}
function Person (name) {
  this.name = name
}
Person.prototype = {
  age: 18,
}
var wanger = new Person('王二')
var newwanger = clone(wanger)
console.log(wanger) // Person {name: "王二", __proto__: {age: 18}}
console.log(newwanger) // {name: "王二"}
wanger instanceof Person // true
newwanger instanceof Person // false
newwanger instanceof Object // true
```

克隆的对象的构造函数已经变成了 Object，而原来的对象的构造是 Person。

