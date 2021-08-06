# call、apply、bind用法详解

### apply和call区别

**apply:**能劫持另外一个对象的方法，继承另外一个对象的属性。

> Function.apply(obj, args)
>
> obj: 这个对象将代替Function类里this对象
>
> args: 这个是数组，它将作为参数传给Function(args-->arguments)

**call:**和apply的意思一样，只不过是参数列表不一样

> Function.call(obj, [param1[, param2[,...[,paramN]]]])
>
> obj:这个对象将代替Function类里的this对象
>
> params:这个是一个参数列表

## apply

(实现一个简单的new方法示例

```
//构造函数
let Parent = function (name, age) {
    this.name = name;
    this.age = age;
};
Parent.prototype.sayName = function () {
    console.log(this.name);
};

let newMethod = function (Parent, ...rest) { //...rest为不定变量，指剩下的所有参数
    // 1.以构造器的prototype属性为原型，创建新对象；
    let child = Object.create(Parent.prototype);
    // 2.将this和调用参数传给构造器执行
    Parent.apply(child, rest);
    // 3.返回第一步的对象
    return child;
};
//创建一个实例，将构造函数Parent与形参作为参数传入
const child = newMethod(Parent, 'echo', 26);
child.sayName() //'echo';

//最后检验，与使用new的效果相同
child instanceof Parent//true
child.hasOwnProperty('name')//true
child.hasOwnProperty('age')//true
child.hasOwnProperty('sayName')//false
```

**Parent.apply(child, rest)：**
传入的rest为['echo', 26]
child去执行Parent类里面的内容，也就是把Parent中的属性引入新创建的child对象中。

## call

```
function People(name, age) {
    this.name = name;
    this.age = age;
}

function Student(name, age, grade) {
    People.call(this, name, age);
    this.grade = grade;
}

var student = new Student('小明', 21, '大三');
console.log(student.name + student.age + student.grade);//小明21大三
```

在这个例子中，我们并没有给`Student`的`name`和`age`赋值，但是存在这两个属性的值，这还是要归功于`call()`方法，它可以改变`this`的指向。

**People.call(this, name, age):**

`this`代表的是`Student`，这也就是之前说的，使得`Student`可以调用`People`中的方法，因为`People`中有`this.name = name;`等语句，这样就将`name`和`age`属性创建到了`Student`中。

### 不同点

`call()`和`apply()`的不同点就是**接收参数的方式不同**。

**apply()方法**接收两个参数，一个是函数运行的作用域（`this`），另一个是参数数组。

**call()方法**不一定接受两个参数，第一个参数也是函数运行的作用域（`this`），但是传递给函数的参数必须列举出来。

## apply妙用

##### 1） Math.max可以实现得到数组中最大的一项

但是因为`Math.max`参数里面不支持`Math.max([param1,param2])`，也就是数组，但是它支持`Math.max(param1,param2,param3…)`，所以可以根据`apply`的那个特点来解决：

```
var array = [1, 2, 3];
var max = Math.max.apply(null, array);
console.log(max);//3
```

这样轻易的可以得到一个数组中最大的一项，`apply`会将一个数组转换为一个参数接一个参数的传递给方法，这块在调用的时候第一个参数给了一个`null`，这个是因为没有对象去调用这个方法，我们只需要用这个方法帮我运算，得到返回的结果就行，所以直接传递了一个`null`过去，当然，第一个参数使用`this`也是可以的

同理 Math.min() 也是一样的

##### 2）Array.prototype.push可以实现两个数组合并

同样的，`push`方法没有提供`push`一个数组，但是它提供了`push(param1,param,…paramN)`所以同样也可以通过`apply`来装换一下这个数组，即:

```
var arr1 = [1, 2, 3];
var arr2 = [4, 5, 6];
Array.prototype.push.apply(arr1, arr2);
console.log(arr1);//[ 1, 2, 3, 4, 5, 6 ]
```

或者：

```
var arr1 = [1, 2, 3];
var arr2 = [4, 5, 6];
arr1.push.apply(arr1, arr2);
console.log(arr1);//[ 1, 2, 3, 4, 5, 6 ]
```

还有：

```
var arr1 = [1, 2, 3];
var arr2 = [4, 5, 6];
[].push.apply(arr1, arr2);
console.log(arr1);//[ 1, 2, 3, 4, 5, 6 ]
```

##### 总结

当目标函数只需要n个参数列表，不接收一个数组的形式（`[param1[,param2[,…[,paramN]]]]`）时，我们就可以通过`apply`的方式来巧妙地解决。

## prototype用法

注意点：new实例创建之后，再使用**对象字面量**重新赋值给prototype，**prototype**的指向地址换成了**新的**object的地址。而之前那个**实例**指向的还是**原有的**默认的prototype地址，使得之前的实例指向的曾经的prototype**变得不可联系**。

```
//如果要在实例之后用prototype的话不要用对象字面量方法：
Person.prototype={
    name: "Tom",
    age: 20,
    saySomething: function(){
        alert("What's up?");
    }
};
//而要用对prototype的属性直接赋值的方式：
Person.prototype.name = "Tom";
Person.prototype.age = 20;
Person.prototype.saySomething = function(){
    alert("What's up?");
};
```

### 举个栗子

```
function Person(){}
Person.prototype.name = "John";
var man = new Person();
Person.prototype = {
    name: "Mike"
};
Person.prototype.name = "Tom";
console.log(man.name);
```

结果为**John**,如果不直接给man添加一个自己的name属性的话，他会变成永远的John。

```
function Person(){}
Person.prototype.name = "John";
Person.prototype = { //使用对象字面量，指向地址变化
    name:"Mike"
};
var man = new Person(); //创建的实例指向的是新的地址
Person.prototype.name = "Tom"; //使用直接赋值的方式改变name
console.log(man.name);
```

结果为**Tom**,new创建新实例在已经改变为新地址之后。

```
function Person(){}
Person.prototype.name = "John";
Person.prototype = {
    name: "Mike"
};
var man = new Person();
console.log(man.name);
Person.prototype.name = "Tom";
```

结果为**Mike**，同样，实例创建在地址变化之后，而打印name在变为Tom之前。

所以对象字面量重写会使得之前创建的实例与之后创建的实例实际指向不同的prototype。慎用之。



## bind

ES5新增`Function.prototype.bind(obj)`：将函数内的 this 绑定为 obj，并将函数返回

### 区别 `bind()`、`call()` 和 `apply()`：

 都能指定函数中的 this

 `call()/apply()` 是立即调用函数，`bind()` 是将函数返回

```js
var obj = {username: 'wy'};
function foo() {
    console.log(this)
}
foo() // window
foo.call(obj) // {username: "wy"}
foo.apply(obj) // {username: "wy"}
```

> 不传参时，call 和 apply 的用法相同。

传入参数的形式不同：

```js
var obj = {username: 'wy'};
function foo(data) {
    console.log(this, data)
}
foo.call(obj, 33) // {username: "wy"} 33
foo.apply(obj, [33]) // {username: "wy"} 33
```

> call：直接从第二个参数开始，依次传入
>
> apply：第二参数必须是数组，传入值放在数组里

```js
var obj = {username: 'wy'}
function foo(data) {
    console.log(this, data)
}
foo.bind(obj, 33) // 没有输出
foo.bind(obj, 33)() // {username: "wy"} 33
```

> bind 的特点：绑定完 this 不会立即调用当前的函数，而是将函数返回。
>
> 传参的方式和 call 一样

什么时候用 bind：

```js
var obj = {username: 'wy'}
setTimeout(function() {
  console.log(this)
}.bind(obj), 1000)
```

