# JS 的垃圾回收机制

## 什么是垃圾回收机制

垃圾回收机制，即 Garbage Collection（GC）。

**Javascript 具有自动垃圾回收机制，会定期对那些我们不再使用的变量、对象所占用的内存进行释放。**

程序运行过程中也会产生垃圾，积攒过多以后会导致程序运行的速度过慢，所以我们需要一个垃圾回收的机制来处理程序运行过程中产生的垃圾。那么 GC 就是负责收走垃圾的，因为他工作在 **JavaScript 引擎内部**，所以对于前端开发者来说，GC 在“一定程度上”是悄无声息工作的。

GC 做了什么：

- 找到内存空间中的垃圾。
- 回收垃圾，让程序员能再次利用这部分空间。

**这里要注意的是**，不是所有的语言里面都有 GC，相对来说，高级语言里面一般会带 GC，比如 Java、JavaScript、Python。而没有 GC 的语言就需要程序员手动管理内存，比如 C 语言中常见的 malloc/free，其实就是 memory allocation 的缩写。还有 C++ 里面的 new/delete。

**举个栗子**

```
var obj = new Object()
// 此时创建一个obj对象，它保存在栈内存中一个引用地址，通过这个引用地址可以快速查找到保存在堆内存中的对象
// 对这个对象进行各种操作...
obj = null
// obj变量不再指向堆内存中的对象（连接断开）
```

![img](https://img-blog.csdnimg.cn/20200927175354486.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQwNTA4ODMy,size_16,color_FFFFFF,t_70#pic_center)

当一个对象没有任何对象或属性对它进行引用，此时我们将永远无法操作它，它就是一个垃圾。这种对象过多会占用大量的内存空间，导致程序运行变慢，所以必须清理。

在 JS 中拥有自动的垃圾回收机制，会自动将这些垃圾对象从内存中销毁，我们不需要也不能手动进行垃圾回收的操作。

我们需要做的只是将不再使用的对象设置为 null 即可。将变量设置为 null 意味着切断变量与它此前引用的值之间的联系。当垃圾收集器下次运行时，就会删除这些值并回收他们占用的内存。

## js 闭包必定引起内存泄漏吗

### 什么是内存泄漏（Memory Leak）

**如果某个或某些动态分配的变量没有了作用，并且占用的内存很大，足以影响整个程序的运行，这就叫内存泄漏。**

像 c，c++ 这种语言，需要手动地申请分配和释放内存。而像 js，java 这种语言，由 v8 或 jvm 等帮我们自动进行了内存的分配和管理，好让我们有更多的精力去专注于业务层面的复杂逻辑。但是随之带来的问题也是显而易见的，由于不用去手动管理内存，导致写代码的过程中不够严谨从而容易引发内存泄漏。

假设写了段代码：

```
let arr = new Array(1000000)
```

并没有将 arr 置为 null，并且以后也不会使用这个 arr。

那这段代码算是内存泄漏了吗？是的。每次有一个对象不用了，都需要手动将它的所有引用置为空。

#### 常见的内存泄漏

1.Foo 被调用时, this 指向全局变量（window），test 相当于是全局变量，Foo 函数执行完后，变量也不会被回收。

```
function Foo() {
  this.test = 'lala'
}
Foo()
```

2.当节点被干掉，定时器还是会不停执行

```
setInterval(function () {
  var node = document.getElementById('div')
  if (node) {
    console.log(1)
    node.innerHTML += '!.......'
  }
}, 1000)
```

不必要的内存，由于代码问题，造成 v8 不能回收，影响了程序的性能，就叫内存泄漏。

### 什么是 JS 闭包

在 js 中，实现外部作用域访问内部作用域中变量的方法叫做闭包。

```
let getInLeadFn = function () {
  let inLead = 2
  return function () {
    return inLead
  }
}
// console.log(inLead) // Uncaught ReferenceError: inLead is not defined

let getInLead = getInLeadFn()
console.log(getInLead()) // 2
```

inLead 并不能在外部直接访问，但是 getInLeadFn 作用域里可以访问。将匿名函数通过执行 getInLeadFn 引用到外部作用域，便可以间接访问 inLead。

### js 闭包会引起内存不能释放吗

![img](https://img-blog.csdnimg.cn/20200927175358709.png#pic_center)

> node 有一个 global.gc() 方法，能够全局 gc，但是需要 `--expose-gc` 参数来执行 node 进程
>
> node 还有一个方法，process.memoryUsage() 能够查看这个 node 进程的内存占用情况

写完整个闭包，可以看出，内存（heapUsed）从 3M 到了 11.4M，gc 后也还剩 11.2M。但是只要**将 outLeadFn 置为 null**，即将内部作用域的函数引用去掉，再 gc，便能释放内存。
所以 js 闭包，只不过是把内部作用域的对象延伸到了外部罢了。就像外部作用域的对象有引用内存不能 gc，通过 js 闭包得到的内部对象，如果有引用，也不能 gc。
有人会说，inLead 这个引用还在指向这个数组呢。引用的内存分配在栈上，对象的内存分配在堆上。当函数执行完之后，函数栈上的内存便可以释放了。当 fn 这个函数执行完之后，fn 里的 inLead 便被销毁了，不需要等待 gc。这也是为什么在外层作用域不能再找到 inLead 了。

**所以，js 闭包不会引发内存不能释放，更不会引起内存泄漏。只不过是把内部作用域的对象延伸到了外部罢了，想要通过 gc 释放这个对象的内存，只需要将引用去掉即可。 **

> 老浏览器（主要是 IE6）由于垃圾回收有问题导致很容易出现内存泄漏。但那是浏览器实现的 bug，跟 js 本身没有关系。

## 常用的几种 GC 算法

### 引用计数法

这是最初级的垃圾收集算法（IE9 之前采用，目前已经不再使用）。对象被引用的次数为 0 时，将被垃圾回收机制回收，内存被销毁。

此算法把“对象是否不再需要”简化定义为“对象有没有其他对象引用到它”。没有引用就是不再需要。

#### 优点

- 当被引用数值为 0 时，就即刻回收
- 不用去遍历堆里的所有活动对象和非活动对象

#### 缺点

- 计数器需要占很大的位置，因为不能预估被引用的上限
- 最大的劣势是无法处理**循环引用无法回收**的问题

```
function f() {
  var o = {}
  var o2 = {}
  o.a = o2 // o 引用 o2
  o2.a = o // o2 引用 o
}

f()
```

两个对象被创建，并互相引用，形成了一个循环。它们被调用之后会离开函数作用域，所以它们已经没有用了，可以被回收了。然而，因为它们互相都有一次引用，计数不为 0，所以它们不会被回收。

### 标记-清除算法（Mark-Sweep）

此算法可以分为两个阶段，一个是标记阶段（mark），一个是清除阶段（sweep）。

1. **标记阶段**，垃圾回收器会从根对象开始深度遍历。每一个可以从根对象访问到的对象都会被添加一个标识，记为可到达对象。
2. **清除阶段**，垃圾回收器会对堆内存从头到尾进行线性遍历，如果发现有对象没有被标识为可到达对象，那么就将此对象占用的内存回收，并且将原来标记为可到达对象的标识清除，以便进行下一次垃圾回收操作。

![img](https://img-blog.csdnimg.cn/20201006095635589.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQwNTA4ODMy,size_16,color_FFFFFF,t_70#pic_center)

如上图：

- 标记阶段，从根对象 1 可以访问到 B，从 B 又可以访问到 E。从根对象 2 可以访问到 G，G 又可以访问到 F。由此类推，B、E、G、F、J、K 都是**可到达对象**。
- 清除阶段，所有**未标记为可到达的对象**都会被垃圾回收器回收。

这个算法把“对象是否不再需要”简化定义为“对象是否可以获得”。不能获得就是不再需要。

相比前一个引用计数算法，此算法更好，因为“有零引用的对象”总是不可获得的，但是相反，不可获得的对象却不一定都是 0 引用的（例如循环引用）。

#### 何时开始垃圾回收

通常来说，在使用标记清除算法时，未引用对象并不会被立即回收。取而代之的做法是，垃圾对象将一直累计到内存耗尽为止。当内存耗尽时，程序将会被挂起，垃圾回收开始执行。

#### 优点

- 可以回收循环引用的对象

\####缺陷

- 那些无法从根对象查询到的对象都将被清除
- 垃圾收集后有可能会造成大量的内存碎片，像上图所示，垃圾收集后内存中存在三个空余的内存碎片。假设一个方格代表 1 个单位的内存，如果出现一个新对象需要占用多个（超过 3 个）内存单位的话，那么就会导致 Mutator 一直处于暂停状态，而 Collector 一直在尝试进行垃圾收集，直到 Out of Memory。

> **mutator**：在 GC 里面代表应用程序本身，我们暂且理解为 `mutator` 需要大量的内存。

### 分代回收（Generation GC）

V8 引擎的垃圾回收采用了**分代回收**的回收策略。

在 V8 内部，把内存空间分成了`新生代`和`老生代`区域，针对不同代采用不同的 GC 算法：

- 新生代：存活时间较短的对象（新生代区域空间较小，在 64 位操作系统上为 32M，在 32 位操作系统上为 16M）

- 老生代：存活时间较长或常驻内存的对象，比如全局对象、闭包等（在 64 位操作系统中，老生代内存的存储上限是 1.4G，

  在 32 位操作系统中是 700M）

#### 新生代对象回收（Scavenge）

V8 将新生代空间均分为两个等大空间，使用中的空间称为 from，空闲的空间称为 to。当 from 空间使用达到一定上限，就会触发垃圾回收机制。V8 新生代的垃圾回收采用的是 **Scavenge 策略**。

![img](https://img-blog.csdnimg.cn/20201006095811972.png#pic_center)

1. 分配对象时，首先分配在 From 空间中

![img](https://img-blog.csdnimg.cn/20201006095815497.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQwNTA4ODMy,size_16,color_FFFFFF,t_70#pic_center)

1. 当开始垃圾回收时，会检查 From 空间中的存活对象（可达对象），并将这些对象复制到 To 空间中

![img](https://img-blog.csdnimg.cn/20201006095818886.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQwNTA4ODMy,size_16,color_FFFFFF,t_70#pic_center)

1. 然后将 From 空间完全释放

![img](https://img-blog.csdnimg.cn/20201006095822178.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQwNTA4ODMy,size_16,color_FFFFFF,t_70#pic_center)

1. 最后将 From 空间和 To 空间进行互换，完成本次垃圾回收操作。

![img](https://img-blog.csdnimg.cn/20201006095825466.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQwNTA4ODMy,size_16,color_FFFFFF,t_70#pic_center)

简而言之，就是在垃圾回收过程中，将存活对象在两个空间中进行复制（Cheney 算法）。

**Scavenge 算法的缺点是只能使用堆内存中的一半，但由于它只复制存活的对象，对于生命周期短的场景存活对象只占少部分，所以在时间效率上有着优异的表现。**

#### 新生代对象向老生代晋升

**在一定条件下，需要将存活周期较长的对象移动到老生代中，这个过程称为对象晋升。**当新生代中一个对象多次出现在 to 空间里，或者当 to 空间内存超过 25% 时，该对象会被移入老生代空间，这种操作被成为`晋升`。

![img](https://img-blog.csdnimg.cn/20201006095828846.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQwNTA4ODMy,size_16,color_FFFFFF,t_70#pic_center)

#### 老生代对象回收（Mark-Sweep，Mark-Compact）

在老生代中的对象，再采用 Scavenge 方式会有问题：

- 老生代内存存储了大量对象，用这种算法复制对象，会使效率大幅降低
- 老生代对象的存储空间更大，使用分代回收的话将会损失更大的存储空间

为此，V8 在老生代中主要采用 Mark-Sweep 和 Mark-Compact 相结合的方式进行垃圾回收。

##### 标记- 清除算法（Mark-Sweep）

标记清除算法在标记阶段遍历堆内存中的所有对象，并标记活着的对象，在随后的清除阶段，只清除没有被标记的对象。

> 也就是说，Scavenge 算法只复制活着的对象，而标记清除算法只清除死了的对象。活对象在新生代中只占较少部分，死对象在老生代中只占较少部分，这就是两种回收方式都能高效处理的原因。

但是这个算法有个比较大的**问题**是：

内存碎片太多。如果出现需要分配一个大内存的情况，由于剩余的碎片空间不足以完成此次分配，就会提前触发垃圾回收，而这次回收是不必要的。

##### 标记- 整理算法（Mark-Compact）

因此，在标记清除算法的基础上，又发展出**标记整理算法**。标记整理算法在标记阶段和清除算法是一样的。不同的是，在标记完活跃对象后，**会将活跃对象移动到堆内存的另一端，然后将边界外的内存全部清除**。

**标记清除算法和标记整理算法的结合使用**：由于标记整理算法需要移动对象，所以速度不会很快。因此，老生代算法主要采用标记清除，当新生代晋升过来的对象大小大于老生代可用空间时，才启动标记整理算法。

## 参考

[js 闭包必定引起内存泄漏吗](https://my.oschina.net/u/3361610/blog/1606127)

[聊聊 JS 垃圾回收机制](https://juejin.im/post/6879259436129452045)

[JS 垃圾回收机制笔记](https://juejin.im/post/6844903695721709581)

[简单了解 JavaScript 垃圾回收机制](https://juejin.im/post/6844903556265279502)