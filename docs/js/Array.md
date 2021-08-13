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

------



# 数组原型方法

push pop shift unshift slice indexof reverse …

在任意位置添加删除元素 splice（index,deletNumber） 、delete number[0] 将数组该位置的值变成undefined

splice（index，0，add1，add2，add3...）在指定位置添加哪些元素

## reduce()

> `reduce()` 方法对数组中的每个元素执行一个由您提供的reducer函数(升序执行)，将其结果汇总为单个返回值。

### **reducer** 函数接收4个参数:

1. Accumulator (acc) (累计器)
2. Current Value (cur) (当前值)
3. Current Index (idx) (当前索引)
4. Source Array (src) (源数组)

```js
//一段代码总结 Array.prototype.reduce() 正确使用姿势
const array1 = [1, 2, 3, 4];
const reducer = (accumulator, currentValue) => accumulator + currentValue;

// 1 + 2 + 3 + 4
console.log(array1.reduce(reducer));
// expected output: 10

// 5 + 1 + 2 + 3 + 4
console.log(array1.reduce(reducer, 5));
// expected output: 15

```

### reduce如何运行的呢

```js
[0, 1, 2, 3, 4].reduce(function(accumulator, currentValue, currentIndex, array){
  return accumulator + currentValue;
});
```

| callback    | accumulator | currentValue | currentIndex | array             | return value |
| ----------- | ----------- | ------------ | ------------ | ----------------- | ------------ |
| first call  | `0`         | `1`          | `1`          | `[0, 1, 2, 3, 4]` | `1`          |
| second call | `1`         | `2`          | `2`          | `[0, 1, 2, 3, 4]` | `3`          |
| third call  | `3`         | `3`          | `3`          | `[0, 1, 2, 3, 4]` | `6`          |
| fourth call | `6`         | `4`          | `4`          | `[0, 1, 2, 3, 4]` |              |

### reduce的使用场景

场景一：求数组里的所有值的和

```js
var total = [ 0, 1, 2, 3 ].reduce(
  ( acc, cur ) => acc + cur,
  0
);
```

场景二：累加对象数组里的值

```js
var initialValue = 0;
var sum = [{x: 1}, {x:2}, {x:3}].reduce(
    (accumulator, currentValue) => accumulator + currentValue.x
    ,initialValue
);
console.log(sum) // logs 6
```

场景三：数组扁平化

```js
var flattened = [[0, 1], [2, 3], [4, 5]].reduce(
 ( acc, cur ) => acc.concat(cur),
 []
);
```

场景四：计算数组中每个元素出现的次数

```js
var names = ['Alice', 'Bob', 'Tiff', 'Bruce', 'Alice'];
var countedNames = names.reduce(function (allNames, name) {
  if (name in allNames) {
    allNames[name]++;
  }
  else {
    allNames[name] = 1;
  }
  return allNames;
}, {});
// countedNames is:
// { 'Alice': 2, 'Bob': 1, 'Tiff': 1, 'Bruce': 1 }
```

场景五：数组去重

```js
let myArray = ['a', 'b', 'a', 'b', 'c', 'e', 'e', 'c', 'd', 'd', 'd', 'd']
let myOrderedArray = myArray.reduce(function (accumulator, currentValue) {
  if (accumulator.indexOf(currentValue) === -1) {
    accumulator.push(currentValue)
  }
  return accumulator
}, [])

console.log(myOrderedArray)
```





------



# 迭代

### 1.使用every方法迭代

```js
const isEven=x => x%2 === 0 ;
number.every(isEven) //every方法会迭代数组中的每个元素，直到返回false,every执行结束;
```



### 2.some方法



### 3.reduce方法

reduce() 给数组中每个元素执行一次回调