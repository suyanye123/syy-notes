# Array

### 遍历数组

```js
fruits.forEach(function (item, index, array) {
    console.log(item, index);
});
// Apple 0
// Banana 1
```



### 复制数组

```js
var shallowCopy = fruits.slice(); // this is how to make a copy
// ["Strawberry", "Mango"]
```



### 数组原型方法

push pop shift unshift slice indexof reverse …



### [Array.from()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/from)

从一个类数组对象或可迭代对象创建一个新的，浅拷贝的数组实例。

那么什么是类数组对象呢？所谓类数组对象，最基本的要求就是具有length属性的对象。

```js
Array.from(arrayLike[, mapFn[, thisArg]])
//arrayLike	想要转换成数组的伪数组对象或可迭代对象。
//mapFn 可选,如果指定了该参数，新数组中的每个元素会执行该回调函数。
//thisArg 可选参数，执行回调函数 mapFn 时 this 对象。
```

- 将类数组对象转换为真正数组：

```js
let arrayLike = {
    0: 'tom', 
    1: '65',
    2: '男',
    3: ['jane','john','Mary'],
    'length': 4
}
let arr = Array.from(arrayLike)
console.log(arr) // ['tom','65','男',['jane','john','Mary']]
//如果将上面代码中length属性去掉呢？实践证明，答案会是一个长度为0的空数组

//将代码再改一下，就是具有length属性，但是对象的属性名不再是数字类型的，而是其他字符串型的
let arrayLike = {
    'name': 'tom', 
    'age': '65',
    'sex': '男',
    'friends': ['jane','john','Mary'],
    length: 4
}
let arr = Array.from(arrayLike)
console.log(arr)  // [ undefined, undefined, undefined, undefined ]

/**由此可见，要将一个类数组对象转换为一个真正的数组，必须具备以下条件：
　　1、该类数组对象必须具有length属性，用于指定数组的长度。如果没有length属性，那么转换后的数组是一个空数组。
　　2、该类数组对象的属性名必须为数值型或字符串型的数字。
　　ps: 该类数组对象的属性名可以加引号，也可以不加引号
*/
```

- 将Set结构的数据转换为真正的数组

```js
let arr = [12,45,97,9797,564,134,45642]
let set = new Set(arr)
console.log(Array.from(set))  // [ 12, 45, 97, 9797, 564, 134, 45642 ]
console.log(Array.from(set, item => item + 1)) // [ 13, 46, 98, 9798, 565, 135, 45643 ]
```

- 将字符串转换为数组

```js
let  str = 'hello world!';
console.log(Array.from(str)) // ["h", "e", "l", "l", "o", " ", "w", "o", "r", "l", "d", "!"]
```

- 参数是一个真正的数组：

```js
//像这种情况，Array.from会返回一个一模一样的新数组
```




### [Array.isArray()]()

用来判断某个变量是否是一个数组对象。

### [Array.of()]()

根据一组参数来创建新的数组实例，支持任意的参数数量和类型。



### Array.length

`Array` 构造函数的 length 属性，其值为1（注意该属性为静态属性，不是数组实例的 length 属性）。

### get Array[@@species]

返回 `Array` 构造函数。

### Array.prototype

通过数组的原型对象可以为所有数组对象添加属性。

