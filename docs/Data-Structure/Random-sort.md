# 数组乱序

**一、面试题**

问：**有一个长度为 100 的数组，如何从中随机挑选 50 个元素，组成一个新的数组？**

答：这个...那个...emmmmmm

问：那先不挑 50 个，**就挑一个数，**知道怎么做吗？

答：这个我知道！**随机生成一个 0 ~ 99 的数，**然后去原数组取对应位置的元素就可以了～

```
let randomIndex = arr[Math.floor(Math.random() * arr.length)];
```

问：好，回到最初的问题，怎么挑选 50 个元素？

答：我知道了，**在 0 ～ 99 的范围内，随机生成 50 个不重复的数字！**

问：是这个思路，具体的实现呢？记得保证效率哦。

答：（吧啦吧啦吧啦）

问：现在假设数组的元素都是 String 类型，**如果要把这个数组元素的顺序打乱，有什么办法么？**

答：**数组的 sort() 方法可以传入一个函数作为参数，这个函数的返回值可以决定排列顺序。在这个函数中写一个随机数，然后就能乱序了。**

问：**这是一个思路，但这只是伪随机。**

答：啊咧？

问：听说过“**洗牌算法**”吗？

 

**二、随机取数**

按照上面随机挑选一个数的思路，从原数组中随机抽取一个数，然后使用 splice 删掉该元素

```
function getRandomArrElement(arr, count) {
    let res = []
    while (res.length < count) {
        // 生成随机 index
        let randomIdx = (Math.random() * arr.length) >> 0;
        // splice 返回的是一个数组
        res.push(arr.splice(randomIdx, 1)[0]);
    }
    return res
}
```

上面生成随机 index 用到了按位右移操作符 >> 

当后面的操作数是 0 的时候，该语句的结果就和 Math.floor() 一样，是向下取整

但位操作符是在数值表示的最底层执行操作，因此速度更快

```
// 按位右移
(Math.random() * 100) >> 0

// Math.floor
Math.floor(Math.random() * 100)

/* 这两种写法的结果是一样的，但位操作的效率更高 */
```

 

**三、通过 sort 乱序**

首先认识一下 [Array.prototype.sort()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/sort)

这个方法可以传入一个参数 **compareFunction**，这个参数必须是函数

同时 sort() 会暴露出 Array 中的两个元素 (a, b) 作为参数传给 compareFunction

sort() 会根据 compareFunction(a, b) 的返回值，来决定 a 和 b 的相对位置：

- 如果 compareFunction(a, b) 小于 0 ，那么 a 会被排列到 b 之前；
- 如果 compareFunction(a, b) 大于 0 ，那么 b 会被排列到 a 之前；
- 如果 compareFunction(a, b) 等于 0 ， a 和 b 的相对位置不变（不稳定！）

根据以上规则，可以在 compareFunction 中生成一个随机数，然后根据随机数做运算，返回一个正负未知的 Number，从而实现乱序

```
function randomSort(a,b) { 
    return .5 - Math.random(); 
}

let arr = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
arr.sort(randomSort);
```

**但这并不是真正的乱序**，计算机的 random 函数因为循环周期的存在，无法生成真正的随机数

 

**四、Fisher–Yates shuffle 洗牌算法**

洗牌算法的思路是：

**先从数组末尾开始，选取最后一个元素，与数组中随机一个位置的元素交换位置**

**然后在已经排好的最后一个元素以外的位置中，随机产生一个位置，让该位置元素与倒数第二个元素进行交换**

以此类推，打乱整个数组的顺序

```
function shuffle(arr) {
  let len = arr.length;

  while (len) {
    let i = (Math.random() * len--) >> 0;    // 交换位置
    let temp = arr[len];
    arr[len] = arr[i];
    arr[i] = temp;
  }

  return arr;
}
```

再结合 ES6 的解构赋值，使用洗牌算法就更方便了：

```
Array.prototype.shuffle = function() {
    let m = this.length, i;
    while (m) {
        i = (Math.random() * m--) >>> 0;
        [this[m], this[i]] = [this[i], this[m]]
    }
    return this;
}
```



**五、用洗牌算法随机取数**

再回到从长度为 100 的数组中取 50 个数的问题

之前用的是 splice 修改原数组，如果结合洗牌算法，又会有别的思路

最好是自己先思考一下，然后再展开代码进行比较

用洗牌算法从数组中随机取数

```
function getRandomArrElement(arr, count) {
    let shuffled = arr.slice(0), 
        i = arr.length, 
        min = i - count, 
        temp, 
        index;
    while (i > min) {
        index = Math.floor((i--) * Math.random());
        temp = shuffled[index];
        shuffled[index] = shuffled[i];
        shuffled[i] = temp;
    }
    return shuffled.slice(min);
}
```

最后放个彩蛋，关于两种随机取数的性能孰优孰劣

我用 Array.form 生成了一个长度为一百万的数组，然后从中随机取十万个数

首先是使用 splice 的方案：

![img](https://img2018.cnblogs.com/blog/1059788/201903/1059788-20190312175230959-1538496938.png)

 然后是洗牌算法：

![img](https://img2018.cnblogs.com/blog/1059788/201903/1059788-20190312175420021-363802993.png)

喵喵喵？！！ 

 

 

**附录：**

补充一个在范围内生成随机数的方法：

```
setRangeRandom(min: number, max: number) { //在范围内生成随机数
        let n = max - min;
        if (n == 0) {
            return max
        } else if (n < 0) {
            [max, min] = [min, max];
            n = Math.abs(n);
        }

        return ((Math.random() * ++n) >> 0) + min;
    }
```

 

参考资料：

[《js随机数组，js随机洗牌算法》](http://caibaojian.com/js-random-array.html)

[《也谈前端面试常见问题之『数组乱序』》](https://segmentfault.com/a/1190000005875191)

[《How to randomize (shuffle) a JavaScript array?》](https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array)