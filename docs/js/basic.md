# JS基础

## 1.DOM 接口

DOM 是想象的树形结构模型，它提供的 API 的作用就是修改或查看 HTML 代码。

1. D 指的是 **Document**，可以认为是 HTML 文档
2. O 指的是 **Object**，表示在内存中按照树型结构，通过构造函数(包括`Node`，`Element(标签)`，`Document` 三个构造函数)，构造出对象，将 DOM 展现到内存中
3. M 指的是 **Model**，因为 HTML 结构在内存中不好用笔表示，所以用一个树型结构的模型来表示

DOM 会将web页面和脚本或程序语言连接起来，我们可以使用脚本或者程序语言通过DOM 来改变或者控制web页面。

### DOM 树型结构

![img](https://img-blog.csdnimg.cn/20200604000019277.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQwNTA4ODMy,size_16,color_FFFFFF,t_70)

上图就是 DOM，其中的**每个节点**(矩形节点和椭圆形节点)都是 `Node 类型`。

**document 节点**是 `Document 构造函数`的一个**实例对象**，document 节点代表了**整个文档**(整个树型结构)。我们可以通过直接输入 `document` 来获取 document 节点。

**html 节点**是 `Element 构造函数`的一个**实例对象**，html 节点又叫根节点。我们可以通过输入 `document.documentElement` 来获得 html 节点。

椭圆形的**文本节点**：“你好,我叫饶家俊” 是 `Text 构造函数`的一个**实例对象**(文本节点是 Text 构造函数的一个实例对象)。

### Node,Element,Text 的关系

![img](https://img-blog.csdnimg.cn/20200604000026526.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQwNTA4ODMy,size_16,color_FFFFFF,t_70)

### Node 节点

`node` 节点是 DOM 的最小组成单位 。DOM 树，就是由各种不同类型的节点组成。所有DOM节点对象都继承了`Node`接口，拥有一些共同的属性和方法。

节点的类型有七种。

- `Document`：整个文档树的顶层节点
- `DocumentType`：`doctype`标签（比如`<!DOCTYPE html>`）
- `Element`：网页的各种HTML标签（比如`<body>、<a>`等）
- `Attribute`：网页元素的属性（比如`class="right"`中的class）
- `Text`：标签之间或标签包含的文本
- `Comment`：注释
- `DocumentFragment`：文档的片段

所有 DOM 节点对象都继承了 `Node` 接口，拥有一些共同的属性和方法。

下面列举一些常用的属性和方法

#### 属性

nodeType 属性返回一个整数值，表示节点的类型。

nodeName 属性返回节点的名称。

nodeValue 属性返回一个字符串，表示当前节点本身的文本值，该属性可读写。

textContent 属性返回当前节点和它的所有后代节点的文本内容。

previousSibling/nextSibling 属性返回紧跟在当前节点前/后面的第一个同级节点。如果当前节点前/后面没有同级节点，则返回null。

parentNode 属性返回当前节点的父节点。对于一个节点来说，它的父节点只可能是三种类型：元素节点（element）、文档节点（document）和文档片段节点（documentfragment）。

parentElement 属性返回当前节点的父元素节点。如果当前节点没有父节点，或者父节点类型不是元素节点，则返回null。

firstChild/lastChild 属性返回当前节点的第一个/最后一个子节点，如果当前节点没有子节点，则返回null。

#### 方法

appendChild() 方法接受一个节点对象作为参数，将其作为最后一个子节点，插入当前节点。该方法的返回值就是插入文档的子节点。如果参数节点是 DOM 已经存在的节点，`appendChild()`方法会将其从原来的位置，移动到新位置。

cloneNode() 方法用于克隆一个节点。它接受一个布尔值作为参数，表示是否同时克隆子节点。它的返回值是一个克隆出来的新节点。

insertBefore() 方法用于添加一个节点到一个参照节点之前。

removeChild() 方法接受一个子节点作为参数，用于删除指定的子节点并返回。

replaceChild() 方法用于将一个新的节点，替换当前节点的某一个子节点。

### Document 节点

`document` 节点对象代表整个文档，每张网页都有自己的 `document` 对象。`window.document` or `document` 属就指向这个对象。只要浏览器开始载入 HTML 文档，该对象就存在了，可以直接使用。

`document`对象继承了`EventTarget`接口、`Node`接口、`ParentNode`接口。这意味着，这些接口的方法都可以在`document`对象上调用。除此之外，`document`对象还有很多自己的属性和方法。

#### 属性

body 提供对 `<body>`元素的直接访问。对于定义了框架集的文档，该属性引用最外层的 `<frameset>`。

#### 方法

querySelector() 方法接受一个 CSS 选择器作为参数，返回匹配该选择器的元素节点。如果有多个节点满足匹配条件，则返回第一个匹配的节点。如果没有发现匹配的节点，则返回null。

querySelectorAll() 返回的是所有匹配的元素，而且可以匹配多个选择符。

getElementsByTagName() 方法搜索 HTML 标签名，返回符合条件的元素。它的返回值是一个类似数组对象（HTMLCollection实例），可以实时反映 HTML 文档的变化。如果没有任何匹配的元素，就返回一个空集。

getElementsByClassName() 方法返回一个类似数组的对象（HTMLCollection实例），包括了所有class名字符合指定条件的元素，元素的变化实时反映在返回结果中。

getElementsByName() 方法用于选择拥有 name 属性的 HTML 元素（比如`<form>、<radio>、<img>、<frame>、<embed>、<object>`等），返回一个类似数组的的对象（NodeList实例），因为name属性相同的元素可能不止一个。

createEvent() 方法生成一个事件对象（`Event`实例），该对象可以被`element.dispatchEvent`方法使用，触发指定事件。

getElementById() 方法返回匹配指定 id 属性的元素节点。如果没有发现匹配的节点，则返回null。

createElement() 方法用来生成元素节点，并返回该节点。

### Element 节点

`element` 节点对象对应网页的 HTML 元素。每一个 HTML 元素，在 DOM 树上都会转化成一个 `Element` 节点对象。

`Element`对象继承了`Node`接口，因此`Node`的属性和方法在`Element`对象都存在。

#### 属性

id 返回指定元素的`id`属性，该属性可读写。

tagName 返回指定元素的大写标签名，与`nodeName`属性的值相等。

#### 方法

setAttribute() 设置指定元素上的一个属性值。如果属性已经存在，则更新该值; 否则将添加一个新的属性用指定的名称和值。

getAttribute() 返回元素上一个指定的属性值。如果指定的属性不存在，则返回`null`或""。

removeAttribute() 从指定的元素中删除一个属性。

getBoundingClientRect() 返回一个对象，提供当前元素节点的大小、位置等信息，基本上就是 CSS 盒状模型的所有信息。

getClientRects 方法返回一个类似数组的对象，里面是当前元素在页面上形成的所有矩形。每个矩形都有`bottom`、`height`、`left`、`right`、`top`和`width`六个属性，表示它们相对于视口的四个坐标，以及本身的高度和宽度。

### Text 节点

`Text` 文本节点代表元素节点（`Element`）和属性节点（`Attribute`）的文本内容。如果一个节点只包含一段文本，那么它就有一个文本子节点，代表该节点的文本内容。

文本节点除了继承`Node`接口，还继承了`CharacterData`接口。

#### 属性

data 属性等同于`nodeValue`属性，用来设置或读取文本节点的内容。

length 属性返回当前文本节点的文本长度。

#### 方法

appendData() 在`Text`节点尾部追加字符串。

### DocumentFragment 节点

`DocumentFragment` 节点不是主DOM树的一部分，操作`DocumentFragment`节点，要比直接操作 DOM 树快得多。一般用于构建一个 DOM 结构，然后插入当前文档。

`DocumentFragment`节点对象没有自己的属性和方法，全部继承自`Node`节点和`ParentNode`接口。

> 注意：`DocumentFragment`节点本身不能被插入当前文档。当它作为`appendChild()`、`insertBefore()`、`replaceChild()`等方法的参数时，是它的所有子节点插入当前文档，而不是它自身。一旦`DocumentFragment`节点被添加进当前文档，它自身就变成了空节点，可以被再次使用。如果想要保存`DocumentFragment`节点的内容，可以使用`cloneNode`方法。

### EventTarget 接口

`EventTarget` 是一个 DOM 接口，由可以接收事件、并且可以创建侦听器的对象实现。

该接口主要提供三个实例方法：

- `addEventListener`：绑定事件的监听函数
- `removeEventListener`：移除事件的监听函数
- `dispatchEvent`：触发事件

### Event 接口

**`Event`** 接口表示在 DOM 中出现的事件。事件发生以后，会产生一个事件对象，作为参数传给监听函数。浏览器原生提供一个`Event`对象，所有的事件都是这个对象的实例，或者说继承了`Event.prototype`。

#### 构造器

`Event`对象本身就是一个构造函数，可以用来自定义一个新的实例。

```
var ev = new Event(
  'look',
  {
    'bubbles': true,
    'cancelable': false
  }
);
document.dispatchEvent(ev);
//新建一个look事件实例，然后使用dispatchEvent方法触发该事件。
```

第一个参数`type`是字符串，表示事件的名称；

第二个参数`options`是一个对象，表示事件对象的配置。该对象主要有下面两个属性。

- `bubbles`：布尔值，可选，默认为`false`，表示事件对象是否冒泡。
- `cancelable`：布尔值，可选，默认为`false`，表示事件是否可以被取消，即能否用`Event.preventDefault()`取消这个事件。一旦事件被取消，就好像从来没有发生过，不会触发浏览器对该事件的默认行为。

#### 属性

`Event.currentTarget` 属性返回事件当前所在的节点，即事件当前正在通过的节点，也就是当前正在执行的监听函数所在的那个节点。随着事件的传播，这个属性的值会变。

`Event.target` 属性返回原始触发事件的那个节点，即事件最初发生的节点。这个属性不会随着事件的传播而改变。

#### 方法

`Event.preventDefault` 方法取消浏览器对当前事件的默认行为。比如点击链接后，浏览器默认会跳转到另一个页面，使用这个方法以后，就不会跳转了；再比如，按一下空格键，页面向下滚动一段距离，使用这个方法以后也不会滚动了。该方法生效的前提是，事件对象的`cancelable`属性为`true`，如果为`false`，调用该方法没有任何效果。

`stopPropagation` 方法阻止事件在 DOM 中继续传播，防止再触发定义在别的节点上的监听函数，但是不包括在当前节点上其他的事件监听函数。

### 参考

[阮一峰DOM](https://wangdoc.com/javascript/dom/index.html)

[[译\]13 种有用的 JavaScript DOM 操作](https://juejin.im/post/5cf65369f265da1bc94edad8#heading-8)

[JavaScript操作DOM常用的API](https://juejin.im/post/5af43bd5f265da0b8336c6f7#heading-21)



## 2.事件的捕获和冒泡

事件传播流程主要分三个阶段：事件捕获阶段、目标阶段、事件冒泡阶段。

1. 捕获阶段：事件从根节点流向目标节点，途中流经各个 DOM 节点，在各个节点上触发捕获事件，直到达到目标节点。
2. 目标（target）阶段：在此阶段中，事件传导到目标节点。浏览器在查找到已经指定给目标事件的监听器后，就会运行该监听器。
3. 事件冒泡：当为多个嵌套的元素设置了相同的事件处理程序，它们将触发事件冒泡机制。在事件冒泡中，最内部的元素将首先触发其事件，然后是栈内的下一个元素触发该事件，以此类推，直到到达最外面的元素。如果把事件处理程序指定给所有的元素，那么这些事件将依次触发。

为什么会有捕获过程和冒泡过程？

实际上点击事件来自触摸屏或者鼠标，鼠标点击并没有位置信息。但是一般操作系统会根据位移的累积计算出来，跟触摸屏一样，提供一个坐标给浏览器。那么，把这个坐标转换为具体的元素上事件的过程，就是**捕获过程**（由外向内）；而**冒泡过程**，则是符合人类理解逻辑的：当你按电视开关时，你也按到了电视机（由内向外）。

所以可以认为，捕获是计算机处理事件的逻辑，而冒泡是人类处理事件的逻辑。

### addEventListener() 方法

HTML DOM 的 addEventListener() 方法，用于向指定元素添加事件句柄。

#### 语法

*element*.addEventListener(*event*, *function*, *useCapture*)

#### 参数

| 参数       | 描述                                                         |
| ---------- | ------------------------------------------------------------ |
| event      | 必须。字符串，指定事件名。 注意:不要使用 "on" 前缀。 例如，使用 "click" ,而不是使用 "onclick"。 |
| function   | 必须。指定要事件触发时执行的函数。 当事件对象会作为第一个参数传入函数。 事件对象的类型取决于特定的事件。例如， "click" 事件属于 MouseEvent(鼠标事件) 对象。 |
| useCapture | **可选**。布尔值，指定事件是否在捕获或冒泡阶段执行。 true：事件句柄在捕获阶段执行；false：默认，事件句柄在冒泡阶段执行。 |

第三个参数不一定是 bool 值，也可以是个对象，它提供了更多选项。

- once：只执行一次。
- passive：承诺此事件监听不会调用 preventDefault，这有助于性能。
- capture：是否捕获（否则冒泡）。

#### 一个栗子

```js
<div id="div">
  <p>
    <span>test</span>
  </p>
</div>
let div = document.getElementById('div')
let p = document.querySelector('p')
let span = document.querySelector('span')
let body = document.body

window.addEventListener('click', capture, true)
window.addEventListener('click', bubble)

body.addEventListener('click', capture, true)
body.addEventListener('click', bubble)

div.addEventListener('click', capture, true)
div.addEventListener('click', bubble)

p.addEventListener('click', capture, true)
p.addEventListener('click', bubble)

span.addEventListener('click', bubble)
span.addEventListener('click', capture, true)
//两个函数
function capture(e) {
  var nodeName = e.currentTarget == window ? 'window' : e.currentTarget.nodeName
  console.log('捕获:' + nodeName)
}
function bubble(e) {
  var nodeName = e.currentTarget == window ? 'window' : e.currentTarget.nodeName
  console.log('冒泡:' + nodeName)
}
//输出
// 捕获:window
// 捕获:BODY
// 捕获:DIV
// 捕获:P
// 冒泡:SPAN
// 捕获:SPAN
// 冒泡:P
// 冒泡:DIV
// 冒泡:BODY
// 冒泡:window
```

注意：最底层盒子，如果冒泡绑定事件 useCapture 参数为 false 时的代码写在 true 的代码前面，就先输出冒泡；反之，如果 true 代码在 false 代码的前面，就先输出捕获，哪个写在前面就先执行哪个。

> 所有事件的顺序是：其他元素捕获阶段事件 -> 本元素代码顺序事件 -> 其他元素冒泡阶段事件

在实际监听事件时，建议这样使用冒泡和捕获机制：默认使用冒泡模式，当开发组件时，遇到需要父元素控制子元素的行为，可以使用捕获机制。

#### Event 对象

HTML DOM 的 Event 对象代表事件的状态，比如事件在其中发生的元素、键盘按键的状态、鼠标的位置、鼠标按钮的状态。

#### 事件句柄　(Event Handlers)

能够使 HTML 事件触发浏览器中的行为，比如当用户点击某个 HTML 元素时启动一段 JavaScript。

几个常用的例子：（完整可以看[MDN](https://developer.mozilla.org/zh-CN/docs/Web/Events)）

| 属性                                                         | 此事件发生在何时...                  |
| ------------------------------------------------------------ | ------------------------------------ |
| [blur](https://developer.mozilla.org/zh-CN/docs/Web/Reference/Events/blur) | 元素失去焦点。                       |
| [click](https://developer.mozilla.org/zh-CN/docs/Web/Reference/Events/click) | 当用户点击某个对象时调用的事件句柄。 |
| [dblclick](https://developer.mozilla.org/zh-CN/docs/Web/Reference/Events/dblclick) | 当用户双击某个对象时调用的事件句柄。 |
| [focus](https://developer.mozilla.org/zh-CN/docs/Web/Reference/Events/focus) | 元素获得焦点。                       |
| [[mousedown](https://developer.mozilla.org/zh-CN/docs/Web/Reference/Events/mousedown)] | 鼠标按钮被按下。                     |
| [mouseout](https://developer.mozilla.org/zh-CN/docs/Web/Reference/Events/mouseout) | 鼠标从某元素移开。                   |
| [mouseover](https://developer.mozilla.org/zh-CN/docs/Web/Reference/Events/mouseover) | 鼠标移到某元素之上。                 |
| [submit](https://developer.mozilla.org/en-US/docs/Web/API/HTMLFormElement/submit_event) | 确认按钮被点击。                     |

上例中，`function clickCallback(e)` 中的 `e` 是指 click 的 event 对象——`MouseEvent 对象`。（当鼠标进行某种操作时，就会生成一个 event 对象，该对象记录着鼠标触发事件时的所有属性）

console.log(e) 打印出来的 MouseEvent 如下：

![img](https://img-blog.csdnimg.cn/20200603234816120.jpg?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQwNTA4ODMy,size_16,color_FFFFFF,t_70)

#### currentTarget 事件

currentTarget 事件属性返回其监听器触发事件的节点，即当前处理该事件的元素、文档或窗口。

如果在修改两个 callback 函数为：

```
function clickCallback(e) {
  var nodeName = e.currentTarget == window ? 'window' : e.currentTarget.nodeName
  console.log(e.currentTarget)
  console.log('捕获:' + nodeName)
}
function clickCallback1(e) {
  var nodeName = e.currentTarget == window ? 'window' : e.currentTarget.nodeName
  console.log(e.currentTarget)
  console.log('冒泡:' + nodeName)
}
```

运行结果为：

![img](https://img-blog.csdnimg.cn/20200603234838389.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQwNTA4ODMy,size_16,color_FFFFFF,t_70)

### 阻止传播

一般来说，如果我们希望事件只触发在目标上，这时候可以使用 `stopPropagation` 来阻止事件的进一步传播。

1. `stopPropagation`：是用来阻止事件冒泡的，其实该函数也可以阻止捕获事件。
2. `stopImmediatePropagation`：同样也能实现阻止事件，但是还能阻止该事件目标执行别的注册事件。

修改上面例子中的冒泡调用的函数：

```
function bubble(e) {
  e.stopImmediatePropagation()
  var nodeName = e.currentTarget == window ? 'window' : e.currentTarget.nodeName
  console.log('冒泡:' + nodeName)
}
// 捕获:window
// 捕获:BODY
// 捕获:DIV
// 捕获:P
// 冒泡:SPAN
// 后面不会再继续传播，同时捕获调用的函数也不会执行
```

## 3.事件委托(代理)

> 传统的事件处理中，我们为每一个需要触发事件的元素添加事件处理器，但是如果我们有 100 个 li，每个 li 都有相同的 click 点击事件，可能我们会用 for 循环的方法，来遍历所有的 li，然后给它们添加事件，但是这样会有问题：需要不断的与 dom 节点进行交互，访问 dom 的次数越多，引起浏览器重绘与重排的次数也就越多，就会延长整个页面的交互就绪时间，这就是为什么性能优化的主要思想之一就是减少 DOM 操作的原因；如果要用事件委托，就会将所有的操作放到 js 程序里面，与 dom 的操作就只需要交互一次，这样就能大大的减少与 dom 的交互次数，提高性能。

**事件代理**是利用事件的冒泡原理来实现的：将事件处理器绑定到一个父级元素上，避免了频繁的绑定多个子级元素，依靠**事件冒泡**机制与**事件捕获**机制，子级元素的事件将委托给父级元素。

> 举个例子：页面上有一个节点树，div>ul>li>a；给最里面的 a 加一个 click 点击事件，那么这个事件就会一层一层的往外执行，执行顺序 a>li>ul>div，那么我们给最外面的 div 加点击事件，那么里面的 ul，li，a 做点击事件的时候，都会冒泡到最外层的 div 上，所以都会触发，这就是事件委托，委托它们父级代为执行事件。

实现：

```js
<input type="button" name="" id="btn" value="添加" />
<ul id="ul1">
  <li>1</li>
  <li>2</li>
  <li>3</li>
  <li>4</li>
</ul>
<script>
  var oBtn = document.getElementById('btn')
  var oUl = document.getElementById('ul1')
  var aLi = oUl.getElementsByTagName('li')
  var num = 4

  //事件委托到父元素上，添加的子元素也有事件
  oUl.onmouseover = function (ev) {
    var ev = ev || window.event
    var target = ev.target || ev.srcElement
    if (target.nodeName.toLowerCase() == 'li') {
      target.style.background = 'red'
    }
  }
  oUl.onmouseout = function (ev) {
    var ev = ev || window.event
    var target = ev.target || ev.srcElement
    if (target.nodeName.toLowerCase() == 'li') {
      target.style.background = '#fff'
    }
  }

  //添加新节点
  oBtn.onclick = function () {
    num++
    var oLi = document.createElement('li')
    oLi.innerHTML = 1 * num
    oUl.appendChild(oLi)
  }
</script>
```

**事件代理的方式相较于直接给目标注册事件来说，有以下优点**：

- 不用频繁的绑定事件，节省内存
- 不需要给子节点注销事件，减少了内存泄露的概率。

#### 参考

[鼠标事件-MouseEvent](https://www.cnblogs.com/hanguozhi/p/7382719.html)

[浏览器的事件机制-捕获与冒泡](https://www.jianshu.com/p/3e8d56d040ed)

[JS 中的事件、事件冒泡和事件捕获、事件委托](https://www.cnblogs.com/leftJS/p/10948138.html)



## 4.原型

### prototype 属性

prototype 是构造函数特有的属性，它的值是一个对象，这个对象包含的是构造函数想要共享的属性和方法。

### `__proto__` 属性

在 JS 里，万物皆对象（函数是对象、原型也是对象...）。对象都具有属性 `__proto__`，这个属性会指向该对象的原型。

实例对象的 `__proto__` 属性指向这个实例构造函数的 prototype 属性。

它的作用是: 对象通过 `__proto__` 属性来共享构造函数想要传递的属性和方法

也就是说，【实例对象】. __proto__ = 【构造函数】.prototype

#### 举个栗子

```
function Dog(name) {
    this.name = name
}
// prototype是函数才会有的属性
Dog.prototype = {
    species : '犬'
}

const dogA = new Dog('大')
const dogB = new Dog('小')
console.log(dogA.species) // 犬

Dog.prototype.species = '猫'
console.log(dogA.species) // 猫
console.log(dogB.species) // 猫

console.log(dogA.__proto__ === Dog.prototype) // true
```

使用构造函数创建一个对象，Dog 就是一个构造函数（注：首字母大写只是约定俗成，不大写照样可以），我们使用 new 创建了两个实例对象 dogA 和 dogB。

现在，species 属性放在 prototype 对象里，是两个实例对象共享的。只要修改了 prototype 对象，就会同时影响到两个实例对象。

其中 ，**dogA.__proto__ === Dog.prototype**。也就是说，（构造）函数 Dog 有一个 prototype 属性，指向了实例原型；实例对象 dogA 的__proto__指向的也是对象的原型。

既然`实例对象`和`构造函数`都可以指向原型，那么原型是否有属性指向构造函数或者实例呢？

指向实例倒是没有，因为一个构造函数可以生成多个实例，但是原型指向构造函数是有的：

（由于实例对象可以继承原型对象的属性，所以实例对象也拥有 constructor 属性，同样指向原型对象对应的构造函数）

```
function Person() {
}
console.log(Person === Person.prototype.constructor); // true
var p = new Person;
console.log(p.constructor === Person); // true
```

如下图所示

![img](https://img-blog.csdnimg.cn/20200802222310800.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQwNTA4ODMy,size_16,color_FFFFFF,t_70)

### **原型链**

原型链就是依托 __proto__ 和 prototype 连接起来的一个原型链条。

#### 举个栗子

```
dogA.species = '猫'

console.log(dogA.species) // 猫
console.log(dogB.species) // 犬
```

当我们读取一个属性的时候，如果在实例属性上找到了，就读取它，不管原型属性上是否还有相同的属性。这其实就是属性屏蔽，即当实例属性和原型属性拥有相同名字的时候，实例属性会屏蔽原型属性，记住只是屏蔽，不会修改，原型属性那个值还在。

但是如果在实例属性上没有找到的话，就会在实例的原型上去找，如果原型上还没有，就继续到原型的原型上去找，一直找到最顶层为止。

这个顶层是什么？

由于原型也是对象，所以也会有__proto__属性，也就是原型的原型；而所有原型对象都是通过 Object 构造函数生成的。

所以最后就可以找到 Object.prototype。

```
console.log(Object.prototype.__proto__) // null
```

而 Object.prototype 的原型为 null。

正是因为所有的原型最终都会指向 Object.prototype，所以对象的很多方法其实都是继承于此，比如 toString()、valueOf()、hasOwnProperty，甚至是 constructor、proto。

关系图：

![img](https://img-blog.csdnimg.cn/20200802222310917.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQwNTA4ODMy,size_16,color_FFFFFF,t_70)

图中由相互关联的原型组成的链状结构就是原型链，也就是蓝色的这条线。

### 总结

由于所有的实例对象共享同一个 prototype 对象，那么从外界看起来，prototype 对象就好像是实例对象的原型，而实例对象则好像"继承"了 prototype 对象一样。

**一张图解释原型链**

![img](https://img-blog.csdnimg.cn/20200827180544129.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQwNTA4ODMy,size_16,color_FFFFFF,t_70#pic_center)

**注意**

1. 最顶层的 Object 是函数，所以它的构造函数也是 Function，它的隐式原型指向 Function 的显式原型。`Object.__proto__ = Function.prototype`
2. Object 的显式原型的隐式原型指向 null。即 `Object.prototype.__proto__ = null`
3. 一般情况下，构造函数的隐式原型和显式原型并不相等。但有一个例外，Function 的隐式原型和显式原型相等。`Function.prototype = Function.__proto__`

### 参考

[JavaScript 深入之从原型到原型链](https://segmentfault.com/a/1190000008959943)

[Javascript 继承机制的设计思想](http://www.ruanyifeng.com/blog/2011/06/designing_ideas_of_inheritance_mechanism_in_javascript.html)



## 6.JS的异步操作

### 回调函数

先执行func1()，执行成功后callback()告知，再执行func2()。

```
var func1 = function(callback){
    console.log(1);
    (callback && typeof(callback)==='function') && callback();
}
var func2 = function(){
    console.log(2);
}
func1(func2);
//1 2
```

异步回调中最常见的形式是Ajax。

```
$.ajax({
    url:"/getmsg",
    type: 'GET',
    dataType: 'json',
    success: function(ret) {
        if (ret && ret.status) {
            //...
        }
    },
    error: function(xhr) {
        //...
    }
})
```

### 事件监听

```
var elem = document.querySelector('#div');
var event = document.createEvent('Event');
event.initEvent('myEvent', true, true); // 定义事件名称myEvent
elem.addEventListener('myEvent', function (e) { // 监听myEvent
  console.log('触发事件');
  console.log(e);
}, false);
elem.dispatchEvent(event);  // 使用目标对象去派发事件，可以是元素节点/事件对象
//触发事件
//[object Event]
```

### 发布订阅

它定义对象间的一对多的依赖关系，当一个对象的状态发生改变时，所有依赖于它的对象都将得到通知

```
//发布-订阅
//有个消息池，存放所有消息
let pubsub = {};
(function(myObj) {
    topics = {}
    subId = -1;
    //发布者接受参数(消息名称，参数)
    myObj.publish = function(topic, msg) {
            //如果发布的该消息没有订阅者，直接返回
            if (!topics[topic]) {
                return
            }
            //对该消息的所有订阅者，遍历去执行各自的回调函数
            let subs = topics[topic]
            subs.forEach(function(sub) {
                sub.func(topic, msg)
            })
        }
    //订阅者接受参数：（消息名称，回调函数）
    myObj.subscribe = function(topic, func) {
        //如果订阅的该事件还未定义，初始化
        if (!topics[topic]) {
            topics[topic] = []
        }
        //使用不同的token来作为订阅者的索引
        let token = (++subId).toString()
        topics[topic].push({
                token: token,
                func: func
            })
        return token
    }
    myObj.unsubscribe = function(token) {
        //对消息列表遍历查找该token是哪个消息中的哪个订阅者
        for (let t in topics) {
            //如果某个消息没有订阅者，直接返回
            if (!topics[t]) {
                return }
            topics[t].forEach(function(sub,index) {
                if (sub.token === token) {
                    //找到了，从订阅者的数组中去掉该订阅者
                    topics[t].splice(index, 1)
                }
            })
        }
    }
})(pubsub)

let sub1 = pubsub.subscribe('Msg::Name', function(topic, msg) {
    console.log("event is :" + topic + "; data is :" + msg)
});
let sub2 = pubsub.subscribe('Msg::Name', function(topic, msg) {
    console.log("this is another subscriber, data is :" + msg)
});
pubsub.publish('Msg::Name', '123')

pubsub.unsubscribe(sub2)
pubsub.publish('Msg::Name', '456')
//> event is :Msg::Name; data is :123
//> this is another subscriber, data is :123
//> event is :Msg::Name; data is :456
```

其中存储消息的结构用json可以表示为：

```
topics = {
  Msg::Name: [{
    token: 0,
    func: function(topic, msg) {
      console.log("event is :" + topic + "; data is :" + msg)
    }
  }, {
    token: 1,
    func: function(topic, msg) {
      console.log("this is another subscriber, data is :" + msg)
    }
  }],
  topic2: [{ token: 2, func: callback3 }, { token: 3, func: callback4 }],
  topic3: []
}
```

消息池的结构是发布订阅模式与事件监听模式的最大区别。每个消息也可以看做是一个个的事件，topics对象就相当于一个事件处理中心，每个事件都有各自的订阅者。*事件监听其实就是发布订阅模式的一个简化版本。*

而发布订阅模式的优点就是我们可以查看消息中心的信息，了解有多少信号，每个信号有多少订阅者。

### 观察者

很多情况下，我们都将观察者模式和发布-订阅模式混为一谈，因为都可用来进行异步通信，实现代码的解耦，而不再细究其不同，但是内部实现还是有很多不同的。

1. **整体模型**的不同：发布订阅模式是靠信息池作为发布者和订阅者的中转站的，订阅者订阅的是信息池中的某个信息；而观察者模式是直接将订阅者订阅到发布者内部的，目标对象需要负责维护观察者，也就是观察者模式中订阅者是依赖发布者的。
2. **触发回调的方式**不同：发布-订阅模式中，订阅者通过监听特定消息来触发回调；而观察者模式是发布者暴露一个接口(方法)，当目标对象发生变化时调用此接口，以保持自身状态的及时改变。

观察者模式很好的应用是MVC架构，当数据模型更新时，视图也发生变化。从数据模型中将视图解耦出来，从而减少了依赖。但是当观察者数量上升时，性能会有显著下降。

```
//观察者模式
var Subject=function(){
    this.observers=[];
}
Subject.prototype={
    subscribe:function(observer){
        this.observers.push(observer);
    },
    unsubscribe:function(observer){
        var index=this.observers.indexOf(observer);
        if (index>-1) {
            this.observers.splice(index,1);
        }
    },
    notify:function(observer,msg){
        var index=this.observers.indexOf(observer);
        if (index>-1) {
            this.observers[index].notify(msg)
        }
    },
    notifyAll:function(msg){
        console.log(msg) //all notified
        this.observers.forEach(function(observe,msg){
            console.log(msg) //0 1 2 3,这里的msg相当于forEach的index
            observe.notify(msg) 
        })
    }
}
var Observer=function(){
    return {
        notify:function(msg){
            console.log("received: "+msg);
        }
    }
}
var subject=new Subject();
var observer0=new Observer();
var observer1=new Observer();
var observer2=new Observer();
var observer3=new Observer();
subject.subscribe(observer0);
subject.subscribe(observer1);
subject.subscribe(observer2);
subject.subscribe(observer3);
subject.notifyAll('all notified'); //received: 0, received: 1, received: 2, received: 3
subject.notify(observer2,'asda'); //received: asda
```

### Promise

Promise，就是一个**对象**，用来传递异步操作的消息。

Promise 对象代表一个异步操作，有**三种状态**：`Pending`（进行中）、`Resolved`（已完成，又称 Fulfilled）和 `Rejected`（已失败）。

只有异步操作的结果，可以决定当前是哪一种状态，任何其他操作都无法改变这个状态。这也是 Promise 这个名字的由来，它的英语意思就是「承诺」，表示其他手段**无法改变**。

**resolve**函数的作用是，将 Promise 对象的状态从 `未处理` 变成 `处理成功` (unresolved => resolved)， 在异步操作成功时调用，并将异步操作的**结果**作为参数**传递出去**。

**reject**函数的作用是，将 Promise 对象的状态从 `未处理` 变成 `处理失败`(unresolved => rejected), 在异步操作失败时调用，并将异步操作报出的**错误**作为参数**传递出去**。

Promise 实例生成以后，可以用 **then** 方法和 **catch** 方法分别指定 resolved 状态和 rejected 状态的**回调函数**。

做饭、吃饭、洗碗（cook、eat、wash）示例

定义这三个方法，它们是层层依赖的关系，下一步的的操作需要使用上一部操作的结果。（这里使用 setTimeout 模拟异步操作）

```
//做饭
function cook(){
    console.log('开始做饭');
    var p = new Promise(function(resolve, reject){        //做一些异步操作
        setTimeout(function(){
            console.log('做饭完毕');
            resolve('鸡蛋炒饭');
        }, 1000);
    });
    return p;
}

//吃饭
function eat(data){
    console.log('开始吃饭：' + data);
    var p = new Promise(function(resolve, reject){        //做一些异步操作
        setTimeout(function(){
            console.log('吃饭完毕');
            resolve('一块碗一双筷子');
        }, 2000);
    });
    return p;
}

function wash(data){
    console.log('开始洗碗：' + data);
    var p = new Promise(function(resolve, reject){        //做一些异步操作
        setTimeout(function(){
            console.log('洗碗完毕');
            resolve('干净的碗筷');
        }, 2000);
    });
    return p;
}
```

使用 then 链式调用这三个方法：

```
cook()
.then(function(data){
    return eat(data);
})
.then(function(data){
    return wash(data);
})
.then(function(data){
    console.log(data);
});
//上面代码还可以简化成如下：
cook()
.then(eat)
.then(wash)
.then(function(data){
    console.log(data);
});
//运行结果:
开始做饭
做饭完毕
开始吃饭：鸡蛋炒饭
吃饭完毕
开始洗碗：一块碗一双筷子
洗碗完毕
干净的碗筷
```

### 再举一个需要多层回调的例子

```
function takeLongTime(n){
    return new Promise(resolve=>{
        setTimeout(()=>resolve(n+200),n)
    })
}

function step1(n){
    console.log(`step1 with ${n}`);
    return takeLongTime(n);
}

function step2(n){
    console.log(`step2 with ${n}`);
    return takeLongTime(n);
}

function step3(n){
    console.log(`step3 with ${n}`);
    return takeLongTime(n);
}
```

使用Promise的方式将其3个步骤处理为链式操作，每一步都返回一个promise对象，将输出的结果作为下一步新的输入：

```
function dolt(){
    console.time('dolt');
    const time1=300;
    step1(time1)
    .then(time2=>step2(time2))
    .then(time3=>step3(time3))
    .then(result=>{
        console.log(`result is ${result}`);
        console.timeEnd('dolt')
    });
}
dolt();
//输出结果为:
step1 with 300
step2 with 500
step3 with 700
result is 900
dolt: 1506.291ms
```

缺点：对于长的链式操作来说，看起来是一堆then方法的堆砌，代码冗余，语义也不清楚，靠着箭头函数才使得代码略微简短一些。还有一个痛点，就是传递参数太麻烦，尤其是需要传递多参数的情况下。

### Generator函数

generator是一个封装的异步任务，在需要暂停的地方，使用yield语句注明。

```
function* gen(x){
    let y=yield x+2;
    return y;
}
let g=gen(1);
g.next(); //{value: 3, done: false}
g.next(); //{value: undefined, done: true}
```

调用generator函数返回的是内部的指针对象，调用next方法就会移动内部指针。Generator函数之所以能被用来处理异步操作，因为它可以暂停执行和恢复执行、函数体内外的数据交换和错误处理机制。

### 前面多任务的例子，使用generator实现

```
function* dolt(){
    console.time('dolt');
    const time1 = 300;
    const time2 = yield step1(time1);
    const time3 = yield step2(time2);
    const result = yield step3(time3);
    console.log(`result is ${result}`);
    console.timeEnd('dolt');
}
// Generator 函数的执行必须靠执行器
function spawn(genF) {
  return new Promise(function(resolve, reject) {
    var gen = genF();
    function step(nextF) {
      try {
        var next = nextF();
      } catch(e) {
        return reject(e); 
      }
      if(next.done) {
        return resolve(next.value);
      } 
      Promise.resolve(next.value).then(function(v) {
        step(function() { return gen.next(v); });      
      }, function(e) {
        step(function() { return gen.throw(e); });
      });
    }
    step(function() { return gen.next(undefined); });
  });
}
spawn(dolt); //输出相同
```

### async/await

async函数基于Generator又做了几点改进：

- 内置执行器，将Generator函数和自动执行器进一步包装。
- 语义更清楚，async表示函数中有异步操作，await表示等待着紧跟在后边的表达式的结果。
- 适用性更广泛，await后面可以跟promise对象和原始类型的值(Generator中不支持)

它基于Promise使用async/await来优化then链的调用,其实也是Generator函数的语法糖。 async 将其后的函数（函数表达式或 Lambda）的返回值封装成一个 Promise 对象， await 会等待这个 Promise 完成，并将其 resolve 的结果返回出来。

### 用async/await重写前面的回调任务

```
async function dolt(){
    console.time('dolt');
    const time1=300;
    const time2=await step1(time1);
    const time3=await step2(time2);
    const result=await step3(time3);
    console.log(`result is ${result}`);
    console.timeEnd('dolt');
}

dolt(); //输出相同
```

await只能用在async函数中，否则会报错。

## 7.JS实现继承的几种方式

### 1、借助原型链实现继承

**步骤**：

1）定义父类型构造函数

2）给父类型的原型添加方法

3）定义子类型的构造函数

4）创建父类型的实例对象赋给子类型的原型

5）将子类型原型的构造属性设置为子类型（没有这一步也不影响继承，但是 constructor 的指向是错误的）

6）给子类型原型添加方法

7）创建子类型的实例对象：可以调用父类型的方法

**关键**：**将父类的一个实例对象作为子类的原型**

```js
function Parent() {
  this.name = 'wo'
  this.gender = '男'
  this.list = [1, 2, 3]
}
Parent.prototype.eat = function () {
  console.log('晚餐时间到')
}
function Child(age) {
  this.age = age
}
Child.prototype = new Parent() // 关键
Child.prototype.constructor = Child // 让子类型的原型的constructor指向子类型，否则它指向的是Parent
Child.prototype.sleep = function () {
  console.log('睡觉时间到')
}

var child = new Child(20)
var child2 = new Child(30)
child.eat() // 晚餐时间到，eat 继承自父类型的原型，在 child.__proto__.__proto__ 上

console.log(child.list) // [1, 2, 3]
console.log(child2.list) // [1, 2, 3]
child.list.push(4)
console.log(child.list) // [1, 2, 3, 4]
console.log(child2.list) // [1, 2, 3, 4]
```

**缺点**：

因为 Child 的原型对象都是 New Parent，所以实例化出来的对象的属性都是一样的。Parent 上面的**引用类型**的属性只要有一个实例对象修改了，其他也会跟着修改。因为他们原型对象都是共用的。并且创建子类实例时，无法向父类构造函数传参。

### 2、借助构造函数实现继承（call）

**步骤**：

1）定义父类型构造函数

2）定义子类型构造函数

3）在子类型构造函数中调用 call 或 apply 把 Parent 的 this 指向改变为是 Child 的 this 指向。这样就可以实现复制父类的实例属性给子类。

**关键**：**在子类型构造函数中通过 call 调用父类型构造函数**

```js
function Parent(name, age) {
  this.name = name
  this.age = age
}
Parent.prototype.sayHi = function () {
  console.log('hello')
}
function Child(name, age, gender) {
  Parent.call(this, name, age) // 相当于将 this.name = name; this.age = age; 这两行代码放在这里执行
  this.gender = gender
}
let child = new Child('王', 20, '男')
console.log(child.name, child.age) // 王, 20
child.sayHi() // Uncaught TypeError:child.sayHi is not a function
```

**优点**：可以向父类传递参数，而且解决了原型链继承中父类属性使用 this 声明的引用类型属性会在所有实例共享的问题。

**缺点**：只能解决父类型上的属性和方法的继承，但是父类型原型上的不能继承

### 3、组合式继承（原型链 + 构造函数）

组合上述两种方法，用**原型链**实现对原型属性和方法的继承，用**构造函数**技术来实现实例属性的继承。（常用）

```js
function Parent(name) {
  this.name = name
}
Parent.prototype.say = function () {
  console.log('say')
}

function Child(name, age) {
  Parent.call(this, name) // 实现Parent属性"name"的继承
  this.age = age
}
Child.prototype = new Parent() // 实现子继承父的所有属性和方法包括原型上的
Child.prototype.constructor = Child // prototype构造器指回自己，否则构造函数指向的是Parent

const c = new Child('wy', 18)
c.say() // say
```

**优点**：

1)可以继承父类原型上的属性，可以传参，可复用。

2)每个新子类对象实例引入的构造函数属性是私有的。

**缺点**：

1)两次调用父类函数（new Parent() 和 Parent.call(this)），造成一定的性能损耗。

2)在使用子类创建实例对象时，其原型中会存在两份相同属性/方法的问题。

### 4、原型式继承（Object.create()）

是组合式的优化

```js
var Parent = {
  name: 'jacky',
  age: 22,
  courses: ['前端'],
}
var child = Object.create(Parent)
var child2 = Object.create(Parent)
child.courses.push('后端')
child2.courses.push('全栈')

console.log(child2.courses) //  ["前端", "后端", "全栈"]
```

**优点**：解决了组合式继承中，父类的构造函数被调用了两次，会产生两组相同属性，一组在实例上 一组在原型上的问题。

**缺点**：与原型链继承一样。多个实例共享被继承对象的属性，存在篡改的可能。

### Object.create() 也可以替换为 ES5 的写法

```js
function create(o) {
    function F() {} // 创建一个空的构造函数
    F.prototype = o // 原型指向o
    return new F() // 返回的是new构造函数的实例对象
}
```

### 加上构造函数的另一种写法

仅仅就是把组合式中的 new Parent() 替换为了原型式 Object.create()，这样就解决了引用类型值的属性会共享的问题

```js
function Parent(name, courses) {
  this.name = name
  this.courses = courses
}
Parent.prototype.say = function () {
  console.log('say')
}

function Child(name, age, courses) {
  Parent.call(this, name, courses)
  this.age = age
}
Child.prototype = Object.create(Parent.prototype) // 用Object.create复制了Parent的原型到Child的原型上
Child.prototype.constructor = Child

const c = new Child('wy', 18, [1])
const c2 = new Child('woo', 18, [1])
console.log(c.courses) // [1]
console.log(c2.courses) // [1]
c.courses.push(2)
console.log(c.courses) // [1, 2]
console.log(c2.courses) // [1]
```

### 5、寄生式继承

仅仅在原型式继承的基础上，创建一个封装继承过程的函数（创建、增强、返回）

使用场景：专门为对象来做某种固定方式的增强。

```js
function createAnother(o) {
  var clone = Object.create(o)
  clone.say = function () {
    // 增加的新的方法和属性
    console.log('say')
  }
  return clone
}

var Parent = {
  name: 'jacky',
  age: 22,
  courses: ['前端'],
}

var child = createAnother(Parent)
var child2 = createAnother(Parent)
child.courses.push('后端')

console.log(child2.courses) //  ["前端", "后端"]
child2.say() // say
```

**优点**：没有创建自定义构造函数类型，因为只是套了个壳子增加特定属性/方法返回对象，以达到增强对象的目的

**缺点**：同原型链继承相同，多个实例的引用类型属性指向相同，存在篡改的可能，也无法传递参数

### 6、寄生-组合式继承

借用**寄生式**实现封装，**组合式**实现继承。（**构造函数**（call）传递参数并实现继承父类自身属性/方法+ **原型式**（Object.create()）实现继承父类原型的属性/方法）

```js
function Parent(name) {
    this.name = name
}
Parent.prototype.say = function () {
    console.log('say')
}

function Child(name, age) {
    Parent.call(this, name) // 借用构造函数继承：继承父类通过this声明的属性和方法至子类实例的属性上
    this.age = age
}

// 寄生式继承：封装了child.prototype对象原型式继承parent.prototype的过程，并且增强了传入的对象。
function inheritPrototype(child, parent) {
    var clone = Object.create(parent.prototype) // 原型式继承：浅拷贝parent原型对象到clone的隐式原型上
    clone.constructor = child // 增强对象，弥补child因重写原型而失去的默认的constructor属性
    child.prototype = clone // 将新创建的拷贝的对象赋值给子类的原型
}
inheritPrototype(Child, Parent); // 子类原型继承父类原型

// 新增子类原型属性，必须在执行过继承函数inheritPrototype之后
Child.prototype.eat = function(){
    console.log('eat')
}

var c = new Child('wy', 18)
c.say() // say
c.eat() // eat
// c.__proto__ = clone
// clone.__proto__ = Parent.prototype
```

**优点**：

1）只调用一次父类 Parent 构造函数。不必为了指定子类的原型而调用构造函数，而是间接的使用原型式继承 Object.create 让 Parent.prototype 赋给 Child.prototype。保持了原型链上下文不变， instanceof 和 isPrototypeOf() 也能正常使用。

2）避免在子类 prototype 上创建多余的属性（父类自身属性 name）。

3）寄生组合式继承是最成熟的继承方法，也是现在最常用的继承方法，众多 JS 库采用的继承方案也是它。

还可以这样写：

```js
function Parent(value) {
  this.val = value
}
Parent.prototype.getValue = function() {
  console.log(this.val)
}

function Child(value) {
  Parent.call(this, value)
}
Child.prototype = Object.create(Parent.prototype, {
  constructor: {
    value: Child, // constructor指回Child
    enumerable: false,
    writable: true,
    configurable: true
  }
})

const child = new Child(1)

child.getValue() // 1
child instanceof Parent // true
```



### 7、ES6 extends 继承（最优方式）

```js
class Father {
  constructor(name, age) {
    this.name = name
    this.age = age
  }
  skill() {
    console.log('父类的技能')
  }
}

class Son extends Father {
  constructor(name, age, job) {
    super(name, age) // 调用父类的constructor，只有调用super之后，才可以使用this关键字
    this.job = job
  }

  getInfo() {
    console.log(this.name, this.age, this.job)
  }
}

let son = new Son('jacky', 22, '前端开发')
son.skill() // 父类的技能
son.getInfo() // jacky 22 前端开发
```

子类必须在 constructor 方法中调用 super 方法，否则新建实例时会报错。因为子类没有自己的 this 对象，必须先通过父类的构造函数完成塑造，得到与父类同样的实例属性和方法，然后再对其进行加工，加上子类自己的实例属性和方法。如果不调用 super 方法，子类就得不到 this 对象。

### 总结

### ES5 继承

1. 借助原型链实现继承：`Child.prototype = new Parent()`
2. 借助构造函数实现继承：`Parent.call(this)`
3. 组合式继承：综合上面两种方式，既有 `Child.prototype = new Parent()` 又有 `Parent.call(this)`
4. 原型式继承：优化版组合式，将 `new Parent()` 改为 `Object.create(Parent.prototype)`
5. 寄生式继承：在原型式外面套了个函数壳子（创建、增强、返回）
6. 寄生-组合式：寄生式 + 构造函数的 call + 原型式的 Object.create()

### ES5 继承与 ES6 继承的区别

1. ES5 的继承实质上是先创建子类的实例对象，再将父类的方法添加到 this 上( Father.call(this) )。
2. ES6 的继承是先创建父类的实例对象 this，再用子类的构造函数修改 this。
3. 因为子类没有自己的 this 对象，所以必须先调用父类的 super() 方法。





## 8.call、apply、prototype



## 9.类

**基于类的编程语言：C++、Java**提倡使用一个关注分类和类之间关系开发模型。 总是先有类，再从类去实例化一个对象。类与类之间又可能会形成继承、组合等关系。

**基于原型：JS**更为提倡程序员去关注一系列对象实例的行为，而后才去关心如何将这些对象，划分到最近的使用方式相似的原型对象，而不是将它们分成类。

### JS的原型模拟类

用两条概括：

- 如果所有对象都有私有字段([prototype])，就是对象的原型；
- 读一个属性，如果对象本身没有，则会继续访问对象的原型，知道原型为空或者找到为止。

ES6提供了一些列内置函数，以便更为直接地访问操纵原型。

三个方法分别为：

- Object.create 根据指定的原型创建新对象，原型可以是null;
- Object.getPrototypeOf 获得一个对象的原型
- Object.setPrototypeOf 设置一个对象的原型；

```js
var cat = {
  say() {
    console.log("meow~");
  },
  jump() {
    console.log("jump");
  }
}

var tiger = Object.create(cat, {
  say: {
    writable: true,
    configurable: true,
    enumerable: true,
    value: function() {
      console.log("roar!");
    }
  }
})

var anotherCat = Object.create(cat);
anotherCat.say(); // meow~
var anotherTiger = Object.create(tiger);
anotherTiger.say(); // roar!
```

### new 运算

new 运算接受一个构造函数和一组调用参数，实际上做了几件事：

- 以构造器的 prototype 属性为原型，创建新对象；
- 将构造函数的作用域赋给新对象(因此 this 就指向了这个新对象)；
- 执行构造函数中的代码(为这个新对象添加属性) ；
- 如果构造函数返回的是对象，则返回，否则返回第一步创建的对象。

接下来我们就封装一个函数来模拟 new 操作符：

```
function newFunc(fn, ...argv) {
    const o = {} // 创建一个新对象
    o.__proto__ = fn.prototype // 新对象的原型指向构造函数的原型
    const val = fn.apply(o, argv)
    return typeof val === 'object' ? val : o
}

function Person(name, age) {
    this.name = name
    this.age = age
    this.say = function() {
        console.log('hello!')
    }
}
const person = newFunc(Person, 'wy', 18)
console.log(person.name, person.age) // wy 18
person.say() // hello!
```

也可以运用ES6 中的一些新特性：

```
function newFunc(fn, ...argv) {
    const o = Object.create(fn.prototype)
    const val = fn.apply(o, argv)
    return typeof val === 'object' ? val : o;
}

function Person(name, age) {
    this.name = name
    this.age = age
    this.say = function() {
        console.log('hello!')
    }
    return { // 构造函数返回一个对象
        name: name,
        age: age,
        say() {
            console.log('Hi!')
        }
    }
}
const person = newFunc(Person, 'wy', 18)
console.log(person.name, person.age) // wy 18
person.say() // Hi!
```

### ES6中的类

ES5中没有类的概念，所以只能new function搭配，ES6 中加入了新特性 class

### 类的基本写法

```
class Rectangle {
  // 构造器
  constructor(height, width) {
    this.height = height;
    this.width = width;
  }
  // Getter
  get area() {
    return this.calcArea();
  }
  // Method
  calcArea() {
    return this.height * this.width;
  }
}
```

最重要的是，类提供了**继承能力**：

```
class Animal {
  constructor(name) {
    this.name = name;
  }

  speak() {
    console.log(this.name + ' makes a noise.');
  }
}

class Dog extends Animal {
  constructor(name) {
    super(name); // call the super class constructor and pass in the name parameter
  }

  speak() {
    console.log(this.name + ' barks.');
  }
}

let d = new Dog('Mitzie');
d.speak(); // Mitzie barks.
```

使用 extends 关键字自动设置了 constructor，并且会自动调用父类的构造函数，这是一种更少坑的设计。所以当我们使用类的思想来设计代码时，应该尽量使用 class 来声明类，而不是用旧语法，拿函数来模拟对象。

## 10.立即执行函数(IIFE)

```
(function() {
  ...
})();
(function() {
  ...
}());
```

上面这两种写法都是JS立即执行函数的常见写法。

### 定义

### 函数声明

使用function关键字声明一个函数，再指定一个函数名，叫函数声明。

```
function fnName() {
  ...
};
```

### 函数表达式

使用function关键字声明一个函数，但未给函数命名，最后将匿名函数赋予一个变量，叫函数表达式。这是最常见的函数表达式语法形式。

```
var fnName = function() {
  ...
};
```

### 匿名函数

使用function关键字声明一个函数，但未给函数命名，所以叫匿名函数。匿名函数也**属于函数表达式**，匿名函数有很多作用，赋予一个变量则创建函数，赋予一个事件则成为事件处理程序或创建闭包等等。

```
function() {
  ...
}; 
```

### 函数声明和函数表达式不同之处

1. JS引擎在解析代码时会‘函数声明提升’（Function declaration Hoisting）当前执行环境（作用域）上的函数声明；而函数表达式必须等到JS引擎执行到它所在行时，才会从上而下一行一行地解析函数表达式。
2. 函数表达式后面可以加括号立即调用该函数；函数声明不可以，只能以fnName()形式调用。

如：

1.

```
fnName();
function fnName() {
  ...
}
//正常，因为‘提升’了函数声明，函数调用可在函数声明之前

fnName();
var fnName = function() {
  ...
}
//报错，变量fnName还未保存对函数的引用，函数调用必须在函数表达式之后
```

2.

```
var fnName = function() {
  alert('Hello World');
}();
//函数表达式后面加括号，当JS引擎解析到此处时能立即调用函数
function fnName() {
  alert('Hello World');
}();
//不会报错，但是JS引擎只解析函数声明，忽略后面的括号，函数声明不会被调用
function() {
  console.log('Hello World');
}();
//语法错误，虽然匿名函数属于函数表达式，但是未进行赋值操作，
//所以JS引擎将开头的function关键字当做函数声明，报错：要求需要一个函数名
```

所以，如果要在函数体后面加括号就能**立即调用**，则这个函数**必须是函数表达式，不能是函数声明**。

### 其他写法

但是，在function前加 '!'、'+'、'-'、','等都可以起到函数定义后立即执行的效果。因为它们可以**将函数声明转换成函数表达式**。

如：

```
(function(a){
    console.log(a); //1，使用()运算符
}(1));

!function(a){
    console.log(a); //1,使用!运算符
}(1);

+function(a){
    console.log(a); //1,使用+运算符
}(1);

-function(a){
    console.log(a); //1,使用-运算符
}(1);
```

### 作用

JS中没有`私有作用域`的概念，如果在多人开发的项目上，你在全局或局部作用域中声明了一些变量，可能会被其他人不小心用同名的变量给**覆盖**掉，这时，可以模仿一个私有作用域，用匿名函数作为一个`容器`，内部**可以访问外部的变量**，而外部环境**不能访问其内部的变量**，所以内部定义的变量不会和外部的变量发生冲突，俗称“匿名包裹器”或“命名空间”。

> JQuery使用的就是这种方法，将JQuery代码包裹在( function (window,undefined){…jquery代码…} (window)中，在全局作用域中调用JQuery代码时，可以达到保护JQuery内部变量的作用。

一个立即执行函数表达式可以用于**封锁函数值**并且**有效的存储状态**。

### 举个栗子

```
<a>1</a>
<a>2</a>
<a>3</a>
var elems = document.getElementsByTagName( 'a' );

for ( var i = 0; i < elems.length; i++ ) {

  elems[ i ].addEventListener( 'click', function(e){
    e.preventDefault();
    alert( 'I am link #' + i );
  }, 'false' );

}
```

不管你点击的是1、2还是3，alert的结果都是I am link #3

因为 `i` 的值不会被锁定。相反，当点击每个链接的时候 (循环已经结束), 会显示元素的总数, 因为那才是点击时 `i` 实际的值.

```
var elems = document.getElementsByTagName( 'a' );

for ( var i = 0; i < elems.length; i++ ) {

  (function( lockedInIndex ){
    elems[ i ].addEventListener( 'click', function(e){
      e.preventDefault();
      alert( 'I am link #' + lockedInIndex );
    }, 'false' );

  })( i );

}
```

而上面这种写法，点击1 2 3链接，分别alert:0 1 2。因为在 IIFE 中, `i` 的值会作为 `lockedInIndex` 被锁定。 循环结束之后, 尽管 `i` 的值是元素总数, 但是在 IIFE 中`lockedInIndex` 的值是函数表达式调用时传入的(`i`)的值。因此当点击链接时, 显示的值是正确的。

### 再举个栗子

```
var arr = [];
for(var i=0; i<3; i++) {
  arr[i] = function() {
    return i;
   };
}
console.log(arr[0]()); // 3
console.log(arr[1]()); // 3
console.log(arr[2]()); // 3
```

**由于ES5没有块作用域，`for` 循环条件中定义的变量 `i` 实际上是一个全局变量，这个 `i` 会随着 `for` 的执行，不断被覆写。**直到它的值变为3，当页面加载完来执行 `arr[0]()` 函数时，`arr[0]()` 中待命的 `i` 会找 `i` 的最终结果，所以最后打印出来的是3，3，3。

可以使用IIFE+闭包解决：

```
var arr = [];
  for (var i=0;i<3;i++){
    //使用IIFE
    (function (i) {
      arr[i] = function () {
        return i;
      };
    })(i);
  }
console.log(arr[0]()); // 0
console.log(arr[1]()); // 1
console.log(arr[2]()); // 2
```

因为IIFE是立即执行，所以 `i` 具体值会被写进 `arr[0]()` 中，最后打印结果为：0，1，2

而在ES6中有块作用域：

```
var arr = [];
  for (let i=0;i<3;i++){
    arr[i] = function () {
      return i;
    };
  }
console.log(arr[0]()); // 0
console.log(arr[1]()); // 1
console.log(arr[2]()); // 2
```

因为ES6语法增加了块作用域，`for` 循环的值不会再随着循环执行不断覆写，而是每次循环都把 `i` 的值单独保存下来。

### IIFE和闭包的区别

闭包需要满足的条件有：

1. 访问所在作用域；
2. 函数嵌套；
3. 在所在作用域外被调用

如：

```
function makeAddThree() {
  var starter = 3;
  return function add(num) {
    return starter + num;
  }
}

 const addThree = makeAddThree();
 console.log(addThree(6)); // 9
```

### 所以IIFE不是闭包，因为没有满足这3个条件。

## 11.脚本和模块

### 脚本和模块

JS 有两种源文件，一种叫做脚本，一种叫做模块。这个区分是在 ES6 引入了模块机制开始的，在这之前就只有脚本。

### 区别

1. **脚本**是可以由**浏览器**或者 **node 环境**引入执行的，而**模块**只能由 JS 代码用 **import** 引入执行。
2. 从概念上，**脚本**是具有**主动性**的 JS 代码段，是控制宿主完成一定任务的代码；而**模块**是**被动性**的 JS 代码段，是等待被调用的库。
3. 对标准中的语法产生式做一些对比，实际上模块和脚本之间的区别仅仅在于是**否包含 import 和 export**。

现代浏览器支持用 `script` 标签引入模块或者脚本，如果要引入**模块**，必须给 script 标签添加 `type=“module”`。如果引入**脚本**，则不需要 `type`。

如：

```
<script type="module" src="xxxxx.js"></script>
```

所以，script 标签如果不加 `type=“module”`，默认我们加载的文件是**脚本而非模块**，如果我们在脚本中写了 export，当然会**抛错**。

脚本中可以包含语句。

模块中可以包含：import声明、export声明和语句。

### import 声明

import 声明有两种用法：

1. 直接 import 一个模块。
2. 带 from 的 import，它能引入模块里的一些信息。

```
import "mod"; //引入一个模块
import v from "mod";  //把模块默认的导出值放入变量v
```

直接 import 一个模块，只是保证了这个模块代码被执行，无法获得它的任何信息。

带 from 的 import 意思是引入模块中的一部分信息，可以把它们变成本地的变量。注意，这里的变量实际上仍然可以受到原来模块的控制。

如：

```
//模块 a：
export var a = 1;

export function modify(){ 
  a = 2;
}
//模块 b：
import {a, modify} from "./a.js";
console.log(a); // 1

modify();
console.log(a); // 2
```

调用修改变量的函数后，b 模块变量也跟着发生了改变。这说明导入与一般的赋值不同，导入后的变量只是改变了名字，它仍然与原来的变量是同一个。

### export 声明

导出变量的方式有两种：

1. 独立使用 export 声明。如：export {a, b, c};
2. 直接在声明型语句前添加 export 关键字。如：

- var
- function (含 async 和 generator)
- class
- let
- const

export 还有一种特殊的用法，就是跟 default 联合使用。

export default 表示导出一个默认变量值，它可以用于 function 和 class。这里导出的变量是没有名称的，可以使用import x from "./a.js"这样的语法，在模块中引入。

export default 还支持一种语法，后面跟一个表达式，如：

```
var a = {};
export default a;
```

但是，这里的行为跟**导出变量**是不一致的，这里导出的是值，即普通变量 a 的值，以后 a 的变化与导出的值就**无关**了，修改变量 a，不会使得其他模块中引入的 default 值发生改变。

### 函数体

JS 引擎除了执行`脚本`和`模块`之外，还可以执行`函数`。而函数体跟脚本和模块有一定的相似之处。

执行函数的行为通常是在 JavaScript 代码执行时，注册宿主环境的某些事件触发的，而执行的过程，就是执行函数体（函数的花括号中间的部分）。

```
setTimeout(function(){
    console.log("go go go");
}, 10000)
```

这段代码通过 setTimeout 函数注册了一个函数给宿主，当一定时间之后，宿主就会执行这个函数。

### 预处理

讲完了三种语法结构，我再来介绍两个 JS 语法的全局机制：预处理和指令序言。

JS 执行前，会对`脚本`、`模块`和`函数体`中的语句进行预处理。预处理过程将会提前处理 var、函数声明、class、const 和 let 这些语句，以确定其中变量的意义。

### var 声明

var 声明永远作用于脚本、模块和函数体这个级别，在预处理阶段，不关心赋值的部分，只管在当前作用域声明这个变量。

```
var a = 1;

function foo() {
    console.log(a);
    var a = 2;
}

foo(); // undefined
```

这段代码声明了一个**脚本级别**的 a，又声明了 **foo 函数体级别**的 a。

函数体级的var出现在 console.log 语句之后。

但是预处理过程在执行之前，所以有函数体级的变量 a，就不会去访问外层作用域中的变量 a 了，而函数体级的变量 a 此时还没有赋值，所以是 undefined。(如果没有在函数体中声明a = 2,那么打印出的结果是1)

```
var a = 1;

function foo() {
    console.log(a);
    if(false) {
        var a = 2;
    }
}

foo(); // undefined
```

if(false) 中的代码永远不会被执行，但是预处理阶段并不管这个，**var 的作用能够穿透一切语句结构**，它只认脚本、模块和函数体三种语法结构。所以这里结果跟前一段代码完全一样，我们会得到 undefined。

```
var a = 1;

function foo() {
    var o = {a:3}
    with(o) {
        var a = 2;
    } 
    console.log(o.a); // 2
    console.log(a); // undefined
}

foo();
```

with(o) 创建了一个o的作用域，在其中改变o的a为2。

在预处理阶段，只认var中声明的变量，所以同样为 foo 的作用域创建了 a 这个变量，但是没有赋值。所以，同样，console.log(a);就不会去访问外层作用域中的变量 a 了，而foo的变量 a 此时还没有赋值，所以是undefined。

一个语句中的 a 在预处理阶段和执行阶段被当做两个不同的变量，严重违背了直觉，这个行为是 JavaScript 公认的设计失误之一。

因为早年 JavaScript 没有 let 和 const，只能用 var，又因为 var 除了脚本和函数体都会穿透，发明了“立即执行的函数表达式（IIFE）”这一用法，用来产生作用域。（在上一篇博客【立即执行函数(IIFE)】中有详细说明）

例如：

```
for(var i = 0; i < 20; i ++) {
    // void function(i){
        var div = document.createElement("div");
        div.innerHTML = i;
        div.onclick = function(){
            console.log(i);
        }
        document.body.appendChild(div);
    // }(i);
}
```

这段代码的结果将会是点每个 div 都打印 20，因为全局只有一个 i，执行完循环后，i 变成了 20。

如果用 IIFE：

```
for(var i = 0; i < 20; i ++) {
     void function(i){
        var div = document.createElement("div");
        div.innerHTML = i;
        div.onclick = function(){
            console.log(i);
        }
        document.body.appendChild(div);
     }(i);
}
```

通过 IIFE 在循环内构造了作用域，每次循环都产生一个新的环境记录，这样，每个 div 都能访问到环境中的 i。

### function 声明

在全局（脚本、模块和函数体），function 声明表现跟 var 相似，不同之处在于，function 声明不但在作用域中加入变量，还会给它赋值。

```
console.log(foo); // function foo(){}
function foo(){}
```

这里声明了函数 foo，在声明之前，我们用 console.log 打印函数 foo，我们可以发现，已经是函数 foo 的值了。

function 声明出现在 if 等语句中的情况有点复杂，它仍然作用于脚本、模块和函数体级别，在预处理阶段，仍然会产生变量，它不再被提前赋值：

```
console.log(foo); // undefined
if(true) {
    function foo(){}
}
```

如果没有函数声明，则会抛出错误。(Uncaught ReferenceError: foo is not defined)

这说明 function 在预处理阶段仍然发生了作用，在作用域中产生了变量，没有产生赋值，赋值行为发生在了执行阶段。

### class 声明

class 声明在全局的行为跟 function 和 var 都不一样。

在 class 声明之前使用 class 名，会抛错：

```
console.log(c); 
// Uncaught ReferenceError: Cannot access 'c' before initialization
class c{}
```

试图在 class 前打印变量 c，得到了个错误，这个行为很像是 class 没有预处理，但是实际上并非如此。

```
var c = 1;
function foo(){
    console.log(c); // Uncaught ReferenceError: Cannot access 'c' before initialization
    class c {}
}
foo();
```

这个例子中，class 放进了一个函数体中，在外层作用域中有变量 c。然后试图在 class 之前打印 c。

执行后，我们看到，仍然抛出了错误。

如果去掉 class 声明，则会正常打印出 1。

也就是说，出现在后面的 class 声明影响了前面语句的结果。这说明，class 声明也是会被预处理的，它会在作用域中创建变量，并且要求访问它时抛出错误。

**class 的声明作用不会穿透 if 等语句结构**，所以只有写在全局环境才会有声明作用。

这样的 class 设计比 function 和 var 更符合直觉，而且在遇到一些比较奇怪的用法时，倾向于抛出错误。

### 指令序言机制

脚本和模块都支持一种特别的语法，叫做指令序言（Directive Prologs）。

这里的指令序言最早是为了 use strict 设计的，它规定了一种给 JavaScript 代码添加元信息的方式。

```
"use strict";
function f(){
    console.log(this); // null
};
f.call(null);
```

定义了函数 f，f 中打印 this 值，然后用 call 的方法调用 f，传入 null 作为 this 值，结果是 null 原封不动地被当做 this 值打印了出来，这是严格模式的特征。(如果去掉严格模式的指令序言，打印的结果将会变成 global）

JavaScript 的指令序言是只有一个字符串直接量的表达式语句，它只能出现在脚本、模块和函数体的最前面。



## 12.语句声明

在 JS 标准中，把语句分成了两种：声明和语句。

普通语句：![img](https://static001.geekbang.org/resource/image/81/55/8186219674547691cf59e5c095304d55.png)

声明型语句：![img](https://static001.geekbang.org/resource/image/0e/38/0e5327528df12d1eaad52c4005efff38.jpg)

### 普通语句

#### 语句块

语句块就是一对大括号。

```
{
    var x, y;
    x = 10;
    y = 20;
}
```

语句块的好处在于：

让我们可以把**多行语句**视为**同一行语句**，这样，if、for 等语句定义起来比较简单。

需要注意的是，语句块会**产生作用域**，如：

```
{
    let x = 1;
}
console.log(x); // 报错
```

这里我们的 let 声明，仅仅对语句块作用域生效，于是我们在语句块外试图访问语句块内的变量 x 就会报错。

#### 空语句

空语句就是一个独立的分号，实际上没什么大用。存在仅仅是从语言设计完备性的角度考虑，允许插入多个分号而不抛出错误。

```
;
```

#### if 语句

```
if(a < 10) {
    //...
} else if(a < 20) {
    //...
} else if(a < 30) {
    //...
} else {
    //...
}
```

这段代码表示四个互斥的分支，分别在满足 a<10、a<20、a<30 和其它情况时执行。

#### switch 语句

switch 语句继承自 Java，Java 中的 switch 语句继承自 C 和 C++，原本 switch 语句是跳转的变形，所以我们如果要用它来实现分支，必须要加上 break。

```
switch(num) {
case 1:
    print(1);
case 2:
    print 2;
case 3:
    print 3;
}
```

这段代码当 num 为 1 时输出 1 2 3，当 num 为 2 时输出 2 3，当 num 为 3 时输出 3。如果我们要把它变成分支型，则需要在每个 case 后加上 break。

```
switch(num) {
case 1:
    print 1;
    break;
case 2:
    print 2;
    break;
case 3:
    print 3;
    break;
}
```

### 循环语句

#### while 循环和 do while 循环

```
let a = 100
while(a--) {
    console.log("*");
}
let a = 101;
do {
    console.log(a);
} while(a < 100)
// 这里 do while 循环无论如何至少会执行一次。
```

#### 普通 for 循环

```
for(i = 0; i < 100; i++)
    console.log(i);

for(var i = 0; i < 100; i++)
    console.log(i);

for(let i = 0; i < 100; i++)
    console.log(i);

var j = 0;
// const 在这里声明和初始化的变量，按惯例是用于控制循环的，但是它如果是 const 就没法改了。
for(const i = 0; j < 100; j++)
    console.log(i);
```

#### for in 循环

for in 循环枚举对象的属性，这里体现了属性的 enumerable 特征。

```
let o = { a: 10, b: 20}
Object.defineProperty(o, "c", {enumerable:false, value:30})

for(let p in o) //用 for in 循环枚举o的属性
    console.log(p); //a b
```

输出没有c，因为属性c的enumerable为false，表示不可枚举。

如果我们定义 c 这个属性时，enumerable 为 true，则 for in 循环中也能枚举到它。

#### for of 循环和 for await of 循环

```
for(let e of [1, 2, 3, 4, 5])
    console.log(e); // 1 2 3 4 5
```

背后的机制是 iterator 机制。

我们可以给任何一个对象添加 iterator，使它可以用于 for of 语句。

示例：

```
let o = {  
    [Symbol.iterator]:() => ({
        _value: 0,
        next(){
            if(this._value == 10)
                return {
                    done: true
                }
            else return {
                value: this._value++,
                done: false
            };
        }
    })
}
for(let e of o)
    console.log(e);
// 0 1 2 3 4 5 6 7 8 9
```

这段代码展示了如何为一个对象添加 iterator。但是，在实际操作中，我们一般不需要这样定义 iterator，我们可以使用 generator function。

```
function* foo(){
    yield 0;
    yield 1;
    yield 2;
    yield 3;
}
for(let e of foo())
    console.log(e);
// 0 1 2 3
```

此外，JS 还为异步生成器函数配备了异步的 for of。

如：

```
function sleep(duration) {
    return new Promise(function(resolve, reject) {
        setTimeout(resolve, duration);
    })
}
async function* foo(){
    i = 0;
    while(true) {
        await sleep(1000);
        yield i++;
    }

}
for await(let e of foo())
    console.log(e);
```

这段代码定义了一个异步生成器函数，异步生成器函数每隔一秒生成一个数字，这是一个无限的生成器。用 for await of 来访问这个异步生成器函数的结果，这形成了一个每隔一秒打印一个数字的无限循环。

### return

return 语句用于函数中，它终止函数的执行，并且指定函数的返回值。

```
function squre(x){
    return x * x;
}
```

### break 语句和 continue 语句

break 语句用于跳出循环语句或者 switch 语句，continue 语句用于结束本次循环并继续循环。它们都有带标签的用法。

```
outer:for(let i = 0; i < 100; i++)
    inner:for(let j = 0; j < 100; j++)
        if( i == 50 && j == 50)
            break outer; //当i和j都是50时跳出outer循环
outer:for(let i = 0; i < 100; i++)
    inner:for(let j = 0; j < 100; j++)
        if( i >= 50 && j == 50)
            continue outer; //当i>=50，j==50时，跳出inner循环继续outer循环
```

带标签的 break 和 continue 可以控制自己被外层的哪个语句结构消费，这可以跳出复杂的语句结构。

### with 语句

with 语句是个非常巧妙的设计，但它把 JS 的变量引用关系变得不可分析，所以一般都认为这种语句都属于糟粕。

```
let o = {a:1, b:2}
with(o){
    console.log(a, b);
}
```

with 语句把对象的属性在它内部的作用域内变成变量。

#### try 语句和 throw 语句

```
try {
    throw new Error("error"); 
  // throw 语句创建自定义错误，抛出错误信息。
} catch(e) {
    console.log(e); // Error: error
} finally {
    console.log("finally"); // finally
}
```

> 一般来说，throw 用于抛出异常。但是单纯从语言的角度，我们可以抛出任何值，也不一定是异常逻辑，然而为了保证语义清晰，不建议用 throw 表达任何非异常逻辑。

try 部分用于标识捕获异常的代码段，catch 部分则用于捕获异常后做一些处理，而 finally 则是用于执行后做一些必须执行的清理工作。

**try 语句**用于捕获异常，用 throw 抛出的异常，可以在 try 语句的结构中被处理掉。

**catch 结构**会创建一个局部的作用域，并且把一个变量写入其中，需要注意，在这个作用域，不能再声明变量 e 了，否则会出错。在 catch 中重新抛出错误的情况非常常见，在设计比较底层的函数时，常常会这样做，保证抛出的错误能被理解。

**finally 语句**一般用于释放资源，它**一定会被执行**。即使在 try 中出现了 return，finally 中的语句也一定要被执行。

### debugger 语句

debugger 语句的作用是：通知调试器在此断点。在没有调试器挂载时，它不产生任何效果。

### 声明语句

声明型语句跟普通语句最大区别就是声明型语句响应预处理过程，普通语句只有执行过程。

#### var

循以下三条规则：

- 声明同时必定初始化；
- 尽可能在离使用的位置近处声明；
- 不要在意重复声明。

```
var x = 1, y = 2;
console.log(x, y);

for(var x = 0; x < 10; x++)
    console.log(x);
```

这个例子中，两次声明了变量 x，完成了两段逻辑，这两个 x 意义上可能不一定相关，这样，不论我们把代码复制粘贴在哪里，都不会出错。

更好的办法是使用 let 改造：

javas
{
let x = 1, y = 2;
console.log(x, y);
}

for(let x = 0; x < 10; x++)
console.log(x);

用代码块限制了第一个 x 的作用域，这样就更难发生变量命名冲突引起的错误了。

#### let 和 const

let 和 const 的作用范围是 if、for 等结构型语句。

```
const a = 2;
if(true){
    const a = 1;
    console.log(a); // 1
}
console.log(a); // 2
```

先在全局声明了变量 a，接下来又在 if 内声明了 a，if 内构成了一个独立的作用域。

const 和 let 语句在重复声明时会抛错，这能够有效地避免变量名无意中冲突：

```
let a = 2
const a = 1;
// Uncaught SyntaxError: Identifier 'a' has already been declared
```

let 和 const 声明虽然看上去是执行到了才会生效，但是实际上，它们还是会被预处理。如果当前作用域内有声明，就无法访问到外部的变量。

如：

<pre><code class="javascript">const a = 2; if(true){ console.log(a); //抛错 const a = 1; } </code></pre>

在 if 的作用域中，变量 a 声明执行到之前，我们访问了变量 a，这时会抛出一个错误，这说明 const 声明仍然是有预处理机制的。

在执行到 const 语句前，我们的 JavaScript 引擎就已经知道后面的代码将会声明变量 a，从而不允许我们访问外层作用域中的 a。（如果没有在if里声明a则输出2）

#### class 声明

class 最基本的用法只需要 class 关键字、名称和一对大括号。

它的声明特征跟 const 和 let 类似，都是作用于块级作用域，预处理阶段则会屏蔽外部变量。

```
const a = 2;
if(true){
    console.log(a); //抛错
    class a {}
}
```

class 内部，可以使用 `constructor` 关键字来定义构造函数。还能定义 **getter/setter** 和方法。

```
class Rectangle {
  constructor(height, width) {
    this.height = height;
    this.width = width;
  }
  // Getter
  get area() {
    return this.calcArea();
  }
  // Method
  calcArea() {
    return this.height * this.width;
  }
}
var a = new Rectangle(2,5);
var cal = a.calcArea();
console.log(cal) // 10
console.log(a.area) // 10
```

### 函数声明

函数声明的几种类型：

```
function foo(){

}

function* foo(){
    yield 1;
    yield 2;
    yield 3;
}

async function foo(){
    await sleep(3000);

}

async function* foo(){
    await sleep(3000);
    yield 1;
}
```

带 * 的函数是 **generator**。生成器函数可以理解为返回一个序列的函数，它的底层是 iterator 机制。

**async 函数**是可以暂停执行，等待异步操作的函数，它的底层是 Promise 机制。

异步生成器函数则是二者的结合。

函数的参数，可以只写形参名，现在还可以写默认参数和指定多个参数

```
function foo(a = 1, ...other) {
    console.log(a, other)
}
foo(4,7,8) // 4, 7,8
foo() // 1
```

## 13.表达式

表达式语句实际上就是一个表达式，它是由运算符连接变量或者直接量构成的。

一般来说，我们的表达式语句要么是函数调用，要么是赋值，要么是自增、自减，否则表达式计算的结果没有任何意义。

但是从语法上，并没有这样的限制，任何合法的表达式都可以当做表达式语句使用。

如：

```
a + b;
```

这句代码计算了 a 和 b 相加的值，但是不会显示出来，也不会产生任何执行效果（除非 a 和 b 是 getter），但是不妨碍它符合语法也能够被执行。

### PrimaryExpression 主要表达式

Primary Expression，它是表达式的**最小单位**，它所涉及的语法结构也是优先级最高的。

Primary Expression 的几种形式:

它包含了各种“直接量”(直接用某种语法写出来的具有特定类型的值)如：

```
"abc";
123;
null;
true;
false;
```

除这些之外，JS 还能够**直接量的形式定义对象**，针对函数、类、数组、正则表达式等**特殊对象类型**，JS 提供了语法层面的支持。

```
({});
(function(){});
(class{ });
[];
/abc/g;
```

在语法层面，function、{ 和 class 开头的**表达式语句**与**声明语句**有语法冲突，所以，我们要想使用这样的表达式，必须加上**括号**来回避语法冲突。

Primary Expression 还可以是 **this** 或者**变量**，在语法上，把变量称作“**标识符引用**”。

```
this;
myVar;
```

任何表达式加上圆括号，都被认为是 Primary Expression，这个机制使得圆括号成为改变运算优先顺序的手段。

```
(a + b);
```

### MemberExpression 成员表达式

Member Expression 是由 Primary Expression 构成的更复杂的表达式。通常是用于访问对象成员的。它有几种形式：

```
a.b; // 标识符的属性访问
a["b"]; // 字符串的属性访问
new.target; // 判断函数是否是被 new 调用
super.b; // 构造函数中，用于访问父类的属性
```

以下两种在 JS 标准中当做 Member Expression：

```
f`a${b}c`;
//这是一个是带函数的模板，这个带函数名的模板
//表示把模板的各个部分算好后传递给一个函数。
new Cls();
//带参数列表的 new 运算，
//而不带参数列表的 new 运算优先级更低，不属于 Member Expression。
```

实际上，这两种被放入 Member Expression，仅仅意味着它们跟属性运算属于同一优先级，没有任何语义上的关联。

补充：

f`a${b}c`是es6的标签模板，用法：

```
function foo(strings,...values){
    console.log(strings)
    console.log(values)
}
const b = 'ddd';
foo`a${b}c`;
// ["a", "c"]
// ["ddd"]
```

### Member Expression 能组成什么

#### NewExpression NEW 表达式

Member Expression 加上 new 就是 New Expression。

这里的 New Expression 特指没有参数列表的表达式。

```
new new Cls(1);
// 它可能有两种意思：
new (new Cls(1)); //等价于这种
new (new Cls)(1);
```

示例：

```
class Cls{
  constructor(n){
    console.log("cls", n);
    return class {
      constructor(n) {
        console.log("returned", n);
      }
    }
  }
}

new new Cls(1);
//cls 1
//returned undefined
```

这里就说明了，1 被当做调用 Cls 时的参数传入了。

#### CallExpression 函数调用表达式

除了 New Expression，Member Expression 还能构成 Call Expression。

它的基本形式是 Member Expression 后加一个**括号里的参数列表**，或者我们可以用上 `super` 关键字代替 Member Expression。

```
a.b(c);
super();
```

它有一些变体。比如：

```
a.b(c)(d)(e);
a.b(c)[3];
a.b(c).d;
a.b(c)`xyz`;
```

这些变体的形态，跟 Member Expression 几乎是一一对应的。

实际上，可以理解为，Member Expression 中的某一子结构**具有函数调用**，那么整个表达式就成为了一个 Call Expression。

而 Call Expression 就**失去**了比 New Expression **优先级高的特性**，这是一个主要的区分。

### LeftHandSideExpression 左值表达式

接下来，我们需要理解一个概念：

**New Expression 和 Call Expression 统称 LeftHandSideExpression，左值表达式。**

**左值表达式**就是可以**放到等号左边的表达式**。

JS 语法则是下面这样。

```
a() = b;
```

这样的用法其实是**符合语法**的，只是，原生的 JS 函数，**返回的值都不能被赋值**。

如：

```
function a() {
  return {
    c: 1
  }
}
var b = 2;
console.log(a().c); // 1
a().c = b;
console.log(a().c); // 1
```

### AssignmentExpression 赋值表达式

左值表达式最经典的用法是用于构成赋值表达式。

赋值表达式的使用，还可以结合一些运算符，例如：

```
a += b;
```

能有这样用的运算符有下面这几种：

*=、/=、%=、+=、-=、<<=、>>=、>>>=、&=、^=、|=、**=

### Expression 表达式

赋值表达式可以构成 Expression 表达式的一部分。在 JS 中，表达式就是用逗号运算符连接的赋值表达式。

在 JS 中，比赋值运算优先级更低的就是逗号运算符了。我们可以把逗号可以理解为一种小型的分号。

如：

```
a = b, b = 1, null;
```

逗号分隔的表达式会顺次执行，就像不同的表达式语句一样。

“**整个表达式的结果**”就是“**最后一个逗号后的表达式结果**”，即null。在很多场合，都不允许使用带逗号的表达式，比如export 后只能跟赋值表达式，意思就是表达式中不能含有逗号。



### 右值表达式

对于右值表达式来说，我们可以理解为以左值表达式为最小单位开始构成的。接下来我们就来看看左值表达式是如何一步步构成更为复杂的语法结构。

### 更新表达式 UpdateExpression

左值表达式搭配 ++ -- 运算符，可以形成更新表达式。

```
-- a;
++ a;
a --
a ++
```

更新表达式会改变一个左值表达式的值。分为前后自增，前后自减一共四种。（它们的优先级是一样的）

### 一元运算表达式 UnaryExpression

**更新表达式**搭配**一元运算符**，可以形成**一元运算表达式**。

```
delete a.b;
void a;
typeof a;
- a;
~ a;
! a;
await a;
```

### 乘方表达式 ExponentiationExpression

乘方表达式也是由更新表达式构成的。它使用**号。

```
++i ** 30
2 ** 30 // 正确
-2 ** 30 //报错
```

-2 这样的一元运算表达式，是不可以放入乘方表达式的，如果需要表达类似的逻辑，必须**加括号**。

** 运算是右结合的，这跟其它正常的运算符（也就是左结合运算符）都不一样。如：

```
4 ** 3 ** 2 //=262144
// 实际上，它是这样被运算的：
4 ** (3 ** 2)
```

### 乘法表达式 MultiplicativeExpression

乘方表达式可以构成乘法表达式，用乘号或者除号、取余符号连接就可以了。乘法表达式有三种运算符：（它们的优先级是一样的）

```
* //乘
/ // 除
% // 取余
x * 2;
```

### 加法表达式 AdditiveExpression

加法表达式是由乘法表达式用加号或者减号连接构成的。有加号和减号两种运算符:

```
+ 
-
a + b * c
```

### 移位表达式 ShiftExpression

移位表达式由加法表达式构成，移位是一种位运算，分成三种：

```
<< 向左移位
>> 向右移位
>>> 无符号向右移位
```

移位运算把操作数看做二进制表示的整数，然后移动特定位数。所以左移 n 位相当于乘以 2 的 n 次方，右移 n 位相当于除以 2 取整 n 次。

普通移位会保持正负数。无符号移位会把减号视为符号位 1，同时参与移位：

```
-1 >>> 1 // 2147483647,也就是 2 的 31 次方
```

### 关系表达式 RelationalExpression

移位表达式可以构成关系表达式，这里的关系表达式就是大于、小于、大于等于、小于等于等运算符号连接，统称为关系运算。

```
<=
>=
<
>
instanceof
in
```

> 注意，这里的 <= 和 >= 关系运算，完全是**针对数字**的，所以 <= 并不等价于 < 或 ==。例如：
>
> ```
> null <= undefined
> //false
> null == undefined
> //true
> ```

### 相等表达式 EqualityExpression

在语法上，相等表达式是由关系表达式用相等比较运算符（如 ==）连接构成的。所以我们可以像下面这段代码一样使用，而**不需要加括号**。

```
a instanceof "object" == true
```

相等表达式由四种运算符和关系表达式构成：

```
==
!=
===
!==
```

> 相等表达式又包含一个 JS 中著名的设计失误，那就是 == 的行为。一些编程规范甚至要求完全避免使用 == 运算。

类型不同的变量比较时==运算只有三条规则：

- undefined 与 null 相等；
- 字符串和 bool 都转为数字再比较；
- 对象转换成 primitive 类型再比较。

> ECMAScript中包含五种primitive(原始)类型，Undefined、Null、Number、Boolean、String。

如：

```
false == '0' // true
true == 'true' // false
[] == 0 // true
[] == false // true
new Boolean('false') == false // false
```

这里不太符合直觉的有两点：

- 即使字符串与 boolean 比较，也都要转换成数字；
- 对象如果转换成了 primitive 类型跟等号另一边类型恰好相同，则不需要转换成数字。

此外，== 的行为也经常跟 if 的行为（转换为 boolean）混淆。总之，仅在**Number 和 String 类型之间**时使用 == ，比如：

```
document.getElementsByTagName('input')[0].value == 100
```

等号左边必然是 string，右边的直接量必然是 number，这样使用 == 就没有问题了。

### 位运算表达式

位运算表达式含有三种：

- 按位与表达式 BitwiseANDExpression
- 按位异或表达式 BitwiseANDExpression
- 按位或表达式 BitwiseORExpression。

**按位与表达式**由按位与运算符（`&`）**连接**`按位异或表达式`构成，按位与表达式把操作数视为二进制整数，然后把两个操作数按位做与运算。

**按位异或表达式**由按位异或运算符（`^`）**连接**`按位与表达式`构成，按位异或表达式把操作数视为二进制整数，然后把两个操作数按位做异或运算。异或两位相同时得 0，两位不同时得 1。

> 异或运算有个特征，那就是两次异或运算相当于取消。所以有一个异或运算的小技巧，就是用异或运算来交换两个整数的值。

```
let a = 102, b = 324

a = a ^ b;
b = a ^ b;
a = a ^ b;

console.log(a, b); // 324, 102
```

**按位或表达式**由按位或运算符（`|`）**连接**`相等表达式`构成，按位或表达式把操作数视为二进制整数，然后把两个操作数按位做或运算。

### 逻辑与表达式和逻辑或表达式

**逻辑与表达式**由`按位或表达式`经逻辑与运算符连接构成。

**逻辑或表达式**则由`逻辑与表达式`经逻辑或运算符连接构成。

这里需要注意的是，这两种表达式都不会做类型转换，所以尽管是逻辑运算，但是最终的结果可能是其它类型。

如：

```
false || 1; // 1
false && undefined; // false
```

另外还有一点，就是逻辑表达式具有短路的特性，如：

```
true || foo();
```

这里的 foo 将不会被执行，这种中断后面表达式执行的特性就叫做短路。

### 条件表达式 ConditionalExpression

条件表达式由逻辑或表达式和条件运算符构成，条件运算符又称三目运算符，它有三个部分，由两个运算符，`?`和`:`配合使用。

```
condition ? branch1 : branch2
```

条件表达式实际上就是 JS 中的右值表达式RightHandSideExpression，是可以放到赋值运算后面的表达式。

具体的JS运算符的优先级可以参考[MDN运算符优先级](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/Operator_Precedence)

## 14.执行函数和this

### 函数

**第一种，普通函数：用 function 关键字定义的函数**

```
function foo(){
    // code
}
```

**第二种，箭头函数：用 => 运算符定义的函数**

```
const foo = () => {
    // code
}
```

**第三种，在 class 中定义的函数**

```
class C {
    foo(){
        //code
    }
}
```

**第四种，生成器函数：用 function \* 定义的函数**

```
function* foo(){
    // code
}
```

**第五种，类：用 class 定义的类，实际上也是函数**

```
class Foo {
    constructor(){
        //code
    }
}
```

**第六种，异步函数：普通函数、箭头函数和生成器函数加上 async 关键字**

```
async function foo(){
    // code
}
const foo = async () => {
    // code
}
async function foo*(){
    // code
}
```

对普通变量而言，这些函数并没有本质区别，都是遵循了“继承定义时环境”的规则，它们的一个行为差异在于 this 关键字。

### this 关键字的行为

this 是执行上下文中很重要的一个组成部分。同一个函数调用方式不同，得到的 this 值也不同。

```
function showThis(){
    console.log(this);
}

var o = {
    showThis: showThis
}

showThis(); // global
o.showThis(); // o
```

在这个例子中，定义了函数 showThis，并把它赋值给一个对象 o 的属性，然后尝试分别使用两个引用来调用同一个函数，结果得到了不同的 this 值。

**调用函数时使用的引用，决定了函数执行时刻的 this 值。**

换成箭头函数，结果就不一样了：

```
const showThis = () => {
    console.log(this);
}

var o = {
    showThis: showThis
}

showThis(); // global
o.showThis(); // global
```

**改为箭头函数后，不论用什么引用来调用它，都不影响它的 this 值。**

换成"方法"：

```
class C {
    showThis() {
        console.log(this);
    }
}
var o = new C();
var showThis = o.showThis;

showThis(); // undefined
o.showThis(); // o
```

创建了一个类 C，并且实例化出对象 o，再把 o 的方法赋值给了变量 showThis。

使用 showThis 这个引用去调用方法时，得到了 undefined。

所以，在方法中， this 的行为也不太一样，它得到了 undefined 的结果。方法的行为跟普通函数有差异，是因为 **class** 设计成了默认按 **strict 模式**执行。

再举个栗子：

```
var name = "Jay Global";
var person = {
    name: 'Jay Person',
    details: {
        name: 'Jay Details',
        print: function() {
            return this.name;
        }
    },
    print: function() {
        return this.name;
    }
};
console.log(person.details.print());  // Jay Details
console.log(person.print());          // Jay Person
var name1 = person.print;
var name2 = person.details;
console.log(name1()); // Jay Global
console.log(name2.print()) // Jay Details
```

### this 关键字的机制

#### 切换上下文

函数能够引用定义时的变量，如上文分析，函数也能记住定义时的 this，因此，函数内部必定有一个机制来保存这些信息。

在 JS 中，为函数规定了用来保存定义时上下文的私有属性[[Environment]]。当一个函数执行时，会创建一条新的执行环境记录，记录的外层词法环境（outer lexical environment）会被设置成函数的[[Environment]]。

这个动作就是**切换上下文**.

```
// foo.js 文件
var b = 2;
exports.foo = function () {
  console.log(b); // 2
  console.log(a); // error
}
// main.js 文件
const { foo } = require('./foo');
var a = 1;
foo();

// 在Node环境下执行 main.js，b打印成功，a发生 ReferenceError错误
```

这里的 foo 能够访问 b（定义时词法环境），却不能访问 a（执行时的词法环境），这就是执行上下文的切换机制。

JS 用一个栈来管理执行上下文，这个栈中的每一项又包含一个链表。当函数调用时，会入栈一个新的执行上下文，函数调用结束时，执行上下文被出栈。

而 this 则是一个更为复杂的机制，JavaScript 标准定义了 [[thisMode]] 私有属性。

[[thisMode]] 私有属性有三个取值。

- lexical：表示从上下文中找 this，这对应了箭头函数。
- global：表示当 this 为 undefined 时，取全局对象，对应了普通函数。
- strict：当严格模式时使用，this 严格按照调用时传入的值，可能为 null 或者 undefined。

方法的行为跟普通函数有差异，恰恰是因为 class 设计成了默认按 strict 模式执行。

可以用 strict 达成与上一节中方法的例子一样的效果:

```
"use strict"
function showThis(){
    console.log(this);
}

var o = {
    showThis: showThis
}

showThis(); // undefined
o.showThis(); // o
```

函数创建新的执行上下文中的词法环境记录时，会根据[[thisMode]]来标记新纪录的[[ThisBindingStatus]]私有属性。代码执行遇到 this 时，会逐层检查当前词法环境记录中的[[ThisBindingStatus]]，当找到有 this 的环境记录时获取 this 的值。

这样的规则的实际效果是，**嵌套的箭头函数中的代码都指向外层 this**

如：

```
var o = {}
o.foo = function foo(){ 
  console.log(this); 
  return () => { 
    console.log(this); 
    return () => console.log(this); 
  }
}
o.foo()()(); // o, o, o
```

这个例子中，我们定义了三层嵌套的函数，最外层为普通函数，两层都是箭头函数。这里调用三个函数，获得的 this 值是一致的，都是对象 o。

### 操作 this 的内置函数

Function.prototype.call 和 Function.prototype.apply 可以指定函数调用时传入的 this 值。

如：

```
function foo(a, b, c){
    console.log(this);
    console.log(a, b, c);
}
foo.call({}, 1, 2, 3);
//{}
//1 2 3
foo.apply({}, [1, 2, 3]);
//{}
//1 2 3
```

call 和 apply 作用是一样的，只是传参方式有区别。

此外，还有 Function.prototype.bind 它可以生成一个绑定过的函数，这个函数的 this 值固定了参数。

如：

```
function foo(a, b, c){
  console.log(this);
  console.log(a, b, c)
}
foo.bind({}, 1, 2, 3)();
//{}
//1 2 3
```

call、bind 和 apply 用于不接受 this 的函数类型如箭头、class 都不会报错。这时候，它们无法实现改变 this 的能力，但是可以实现传参。

this 关键字是为了在 JS 中加入动态作用域而做的努力。 所谓动态作用域，就是说变量的作用范围，是根据函数调用的位置而定的。从这个角度来理解 this，就简单的多。

this 是 JS 中的动态作用域机制, 具体来说有四种, 优先级有低到高分别如下：

1. 默认的 this 绑定，就是说 在一个函数中使用了 this，但是没有为 this 绑定对象。这种情况下，非严格默认，this 就是全局变量 Node 环境中的 global，浏览器环境中的 window。严格模式下，默认的 this 就是 undefined 了。
2. 隐式绑定: 使用 obj.foo() 这样的语法来调用函数的时候，函数 foo 中的 this 绑定到 obj 对象。
3. 显示绑定: foo.call(obj, ...)， foo.apply(obj,[...])，foo.bind(obj,...)
4. 构造绑定: new foo() ， 这种情况,，无论 foo 是否做了绑定, 都要创建一个新的对象， 然后 foo 中的 this 引用这个对象。



## 15.闭包和执行上下文

### 闭包

闭包其实只是一个绑定了执行环境的函数。
闭包包含两个部分：

- 环境部分
  - 环境：函数的词法环境（执行上下文的一部分）
  - 标识符列表：函数中用到的未声明的变量
- 表达式部分：函数体

### 执行上下文：执行的基础设施

一段代码（包括函数），执行所需的所有信息定义为：“执行上下文”。
在 ES2018 中，执行上下文是这样的：

- lexical environment：词法环境，当获取变量或者 this 值时使用。
- variable environment：变量环境，当声明变量时使用。
- code evaluation state：用于恢复代码执行位置。
- Function：执行的任务是函数时使用，表示正在被执行的函数。
- ScriptOrModule：执行的任务是脚本或者模块时使用，表示正在被执行的代码。
- Realm：使用的基础库和内置对象实例。
- Generator：仅生成器上下文有这个属性，表示当前生成器。

```
var b = {}
let c = 1
this.a = 2;
```

要想正确执行它，我们需要知道以下信息：

1. var 把 b 声明到哪里；
2. b 表示哪个变量；
3. b 的原型是哪个对象；
4. let 把 c 声明到哪里；
5. this 指向哪个对象。

#### var 声明与赋值

```
var b = 1
```

var 会穿透 for 、if 等语句。

在只有 var，没有 let 的旧 JavaScript 时代，诞生了一个技巧，叫做：立即执行的函数表达式（IIFE），通过创建一个函数，并且立即执行，来构造一个新的域，从而控制 var 的范围。

比较推荐的写法是使用 void 关键字：

```
void function() {
  var a;
  //code
}();
```

这有效避免了语法问题，同时，语义上 void 运算表示忽略后面表达式的值，变成 undefined，我们确实不关心 IIFE 的返回值，所以语义也更为合理。

使用 with 的时候，var 的特性会导致声明的变量和被赋值的变量是两个 b：

```
var b;
void function(){
    var env = {b:1};
    b = 2;
    console.log("In function b:", b); //2
    with(env) {
        var b = 3;
        console.log("In with b:", b); //3
    }
}();
console.log("Global b:", b); //undefined
```

在这个例子中，利用立即执行的函数表达式（IIFE）构造了一个函数的执行环境。

在 Global function with 三个环境中，b 的值都不一样，而在 function 环境中，并没有出现 var b，这说明 with 内的 var b 作用到了 function 这个环境当中。

var b = {} 这样一句对两个域产生了作用，从语言的角度是个非常糟糕的设计，这也是一些人坚定地反对在任何场景下使用 with 的原因之一。

#### let

et 是 ES6 开始引入的新的变量声明模式。为了实现 let，JS在运行时引入了块级作用域。在 let 出现之前，JS 的 if for 等语句皆不产生作用域。

以下语句会产生 let 使用的作用域：

- for；
- if；
- switch；
- try/catch/finally。

#### Realm

在最新的标准（9.0）中，JavaScript 引入了一个新概念 Realm，它的中文意思是“国度”“领域”“范围”，但是都不太适合JS的语境。

Realm 中包含一组完整的内置对象，而且是复制关系。对不同 Realm 中的对象操作，会有一些需要格外注意的问题，比如 instanceOf 几乎是失效的。

如：

```
var iframe = document.createElement('iframe')
document.documentElement.appendChild(iframe)
iframe.src="javascript:var b = {};"

var b1 = iframe.contentWindow.b;
var b2 = {};

console.log(typeof b1, typeof b2); //object object

console.log(b1 instanceof Object, b2 instanceof Object); //false true
```

由于 b1、 b2 由同样的代码“ {} ”在不同的 Realm 中执行，所以表现出了不同的行为。

### JS 的作用域

许多开发人员经常混淆作用域和执行上下文的概念，误以为是相同的，但其实并非如此。

JS 属于解释型语言，它的执行分为两个阶段，这两个阶段做的事情并不一样：

- 解释阶段
  - 词法分析
  - 语法分析
  - 确定作用域规则
- 执行
  - 创建执行上下文
  - 执行函数代码
  - 垃圾回收

作用域规则是由编写代码的结构决定的，即在函数定义时就确定了，而执行上下文的 this 指向是执行时（随着函数的调用）确定的。两者最大区别是：**执行上下文在运行时确定，随时可能改变；作用域在定义时就确定，并不会改变。**

一个作用域下可能包含若干个上下文环境；也有可能从来没有过上下文环境（函数没有被调用过）；还有可能有过，但是函数被调用完毕后，上下文环境被销毁了；有可能同时存在一个或多个（闭包）。**同一个作用域下，不同的调用会产生不同的执行上下文环境，继而产生不同的变量的值。**

### 作用域（Scope)

**作用域**指程序中定义变量的区域，它决定了当前执行代码对变量的访问权限。由于作用域的限制，每段独立的执行代码块**只能访问自己作用域和外层作用域中的变量，无法访问到内层作用域的变量**。

**举个栗子**

```
function outFun() {
  // outFun函数作用域开始
  var inVariable = '内层变量'
} // outFun函数作用域结束

outFun()
console.log(inVariable) // Uncaught ReferenceError: inVariable is not defined
```

上面例子中，变量 inVariable 在全局作用域没有声明，所以在全局作用域下取值会报错。

我们可以这样理解：**作用域就是一个独立的地盘，让变量不会外泄、暴露出去**。也就是说**作用域最大的用处就是隔离变量，不同作用域下同名变量不会有冲突。**

**ES6 之前 JS 只有两个作用域，就是全局作用域和函数作用域。**ES6 之后才有了块级作用域。

### 全局作用域

**在代码中任何地方都能访问到**的对象就拥有全局作用域（也就是，在全局作用域中），一般来说以下几种情形拥有全局作用域：

**1.最外层函数 和 在最外层函数外定义的变量**

```
var outVariable = '我是最外层变量' //最外层变量

function outFun() {
  var inVariable = '内层变量'
  function innerFun() {
    //内层函数
    console.log(outVariable) // 我是最外层变量
    console.log(inVariable) // 内层变量
  }
  innerFun()
}

outFun()
console.log(inVariable) // Uncaught ReferenceError: inVariable is not defined
```

outVariable 是在最外层函数外定义的变量，拥有全局作用域，所以可以在内层函数中被访问到。而内层变量 inVariable 是在函数中声明的，所以只拥有函数作用域，只能在内层函数中被访问，在外面访问会报错。

**2.所有末定义直接赋值的变量自动声明为拥有全局作用域**

```
function outFun2() {
  variable = '未定义直接赋值的变量'
  var inVariable2 = '内层变量2'
}
outFun2() // 要先执行这个函数，否则根本没有声明里面的变量
console.log(variable) // 未定义直接赋值的变量
console.log(inVariable2) // inVariable2 is not defined
```

**3.所有 window 对象的属性拥有全局作用域**

一般情况下，window 对象的内置属性都拥有全局作用域，例如 window.name、window.location、window.top 等。

全局作用域有个弊端：如果我们写了很多行 JS 代码，变量定义都没有用函数包裹，那么它们就全部都在全局作用域中。这样就会污染全局命名空间，容易引起命名冲突。

这就是为何 jQuery、Zepto 等库的源码，所有的代码都会放在 `(function(){....})()`（即 IIFE，立即执行函数）中。

IIFE 是匿名函数会被自动调用，它模仿了一个私有作用域，放在里面的所有变量，都不会被外泄和暴露，就不会污染外部的全局命名空间，也不会对其他的库或者 JS 脚本造成影响。这是函数作用域的一个体现。

### 函数作用域

函数作用域是指**声明在函数内部的变量**，和全局作用域相反，局部作用域一般只在固定的代码片段内可访问到，最常见的例如函数内部。

```
function doSomething() {
  var blogName = 'www'
  function innerSay() {
    console.log(blogName) // www
  }
  innerSay()
}
doSomething()
console.log(blogName) // Uncaught ReferenceError: blogName is not defined
innerSay() // Uncaught ReferenceError: innerSay is not defined
```

**作用域是分层的，内层作用域可以访问外层作用域的变量，反之则不行**。

> 值得注意的是：ES6 之前，没有块作用域。块语句（即大括号“{}”中间的语句），例如 if 和 switch 条件语句、for 和 while 循环语句，不像函数，它们不会创建一个新的作用域。在块语句中定义的变量将保留在它们已经存在的作用域中。

### 块级作用域

但是在 ES6 中，新增了块作用域。块级作用域可通过新增命令 let 和 const 声明，所声明的变量在指定块的作用域外无法被访问。不能跨块作用域访问，也不能跨函数作用域访问。

> 而在块语句中用 var 定义的变量将保留在它们已经存在的全局或者函数作用域中。可以跨块作用域访问，但不能跨函数作用域访问。

```
if (true) {
  // 'if' 条件语句块会创建一个新的块作用域
  var name = 'wy' // name 依然在全局作用域中
  let age = 18 // age 在块作用域中
  const height = '160' // height 在块作用域中
  for (let i of [0]) {
    console.log(name) // wy
    console.log(age) // 18
    console.log(height) // 160
  }
}
console.log(name) // wy
console.log(age) // Uncaught ReferenceError: age is not defined
console.log(height) // Uncaught ReferenceError: height is not defined
```

### 作用域链（Scope Chain）

举个栗子，用泡泡来比喻作用域：

![img](https://img-blog.csdnimg.cn/2020100300175082.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQwNTA4ODMy,size_16,color_FFFFFF,t_70#pic_center)

最后输出的结果为 2, 4, 12

- 泡泡 1 是全局作用域，有标识符 foo
- 泡泡 2 是作用域 foo，有标识符 a，b，bar
- 泡泡 3 是作用域 bar，仅有标识符 c（函数参数也在函数作用域中）

**当可执行代码内部访问变量时，会先查找本地作用域，如果找到目标变量即返回，否则会去父级作用域一层一层向上寻找，直到找到全局作用域还是没找到，就宣布放弃。**我们把这种作用域的嵌套机制，称为**作用域链**。

### 自由变量

上面例子中，`console.log(a, b, c)` 要得到 a、b、c 变量，但是在当前的 bar 函数作用域中没有定义 a、b（c 是参数）。**当前作用域没有定义的变量**，这就是**自由变量** 。

关于自由变量的值，上文提到要到父级作用域中取，其实有时候这种解释会产生歧义。

```
var x = 10
function fn() {
  console.log(x)
}
function show(f) {
  var x = 20
  f()
}
show(fn) // 10
```

fn 函数是在全局作用域中创建的，但是是在 show 函数作用域中执行的，那么自由变量 x 要到哪个“父级作用域”中取呢？

**无论 fn 函数将在哪里调用，要到创建 fn 函数的那个作用域中取**。

所以，不要在用父级作用域的说法了。相比而言，用这句话描述会更加贴切：

**要到创建这个函数的那个作用域中取值，这里强调的是“创建”，而不是“调用”**，其实这就是所谓的"静态作用域"。

```
var a = 10
function fn() {
  var b = 20
  function bar() {
    console.log(a + b)
  }
  return bar
}
var x = fn()
b = 200
x() // 30
```

- fn() 返回的是 bar 函数，赋值给 x。
- 执行 x()，即执行 bar 函数代码。
- bar 函数作用域中没有 b 的值，直接在创建 bar 函数的 fn 作用域取出。
- 取 a 的值时，试图在 bar、fn 作用域取，但是取不到，转向创建 fn 的那个作用域中去查找，结果找到了，所以最后的结果是 30。

> function 声明的函数中的 this 指向**调用**这个函数的对象。箭头函数的 this 就是外层函数的 this。

### 声明提升

```
b() // call b
console.log(a) // undefined
var a = 'Hello world'
function b() {
  console.log('call b')
}
```

JS 将 var 声明的函数或变量代码移动到了顶部。更准确的解释是：

在生成执行环境时，会有两个阶段。第一个阶段是创建的阶段，JS 解释器会找出需要提升的变量和函数，并且给他们**提前在内存中开辟好空间**。声明的如果是函数的话会将整个函数存入内存中；如果变量的话赋值为 `undefined`。所以在第二个阶段，也就是代码执行阶段，就算声明代码在最下面也可以提前使用。

而 let 声明的变量或函数不能在声明前使用，但是这并不是常说的 let 不会提升，let 提升了，在第一阶段内存也已经为他开辟好了空间，但是因为 let 有暂时死区，导致了它不能在声明前使用。因此你需要手动将 let/const 声明放置到顶部，以便让变量在整个代码块内部可用。

#### var 声明的过程

```
console.log(x) // undefined
var x = 1
console.log(x) // 1
```

1. 找到所有用 var 声明的变量，在这个环境中**「创建」**这些变量（即 x）。
2. 将这些变量**「初始化」**为 undefined。
3. 开始执行代码
4. x = 1 将 x 变量**「赋值」**为 1

也就是说，var 声明会在代码执行之前就**「创建变量，并将其初始化为 undefined」**。

#### function 声明的过程

```
fn2()

function fn2() {
  console.log(2) // 2
}
```

1. 找到所有用 function 声明的变量，在环境中**「创建」**这些变量。
2. 将这些变量**「初始化」**并**「赋值」**为 function(){ console.log(2) }。
3. 开始执行代码 fn2()

也就是说，function 声明会在代码执行之前就**「创建、初始化并赋值」**。

#### let 声明的过程

```
let x = 'global'
{
  console.log(x) // Uncaught ReferenceError: Cannot access 'x' before initialization
  let x // 初始化为 undefined
  console.log(x) // undefined
  x = 2 // 赋值为 2
  console.log(x) // 2
}
```

1. 找到所有用 let 声明的变量，在环境中**「创建」**这些变量
2. 开始执行代码（注意只是创建并没有初始化）
3. 执行 let x，将 x **「初始化」**为 undefined（这并不是一次赋值，如果代码是 let x = 1，就将 x 初始化为 1）
4. 执行 x = 2，对 x 进行**「赋值」**

这就解释了为什么在 let x 之前使用 x 会报错：

- console.log(x) 中的 x 指的是下面代码块中的 x，而不是全局的 x
- 执行 log 时 x 还没「初始化」，所以不能使用（也就是所谓的**暂时死区**，就是不能在初始化之前使用变量）

#### 总结

1. let 的「创建」过程被提升了，但是初始化没有提升。
2. var 的「创建」和「初始化」都被提升了。
3. function 的「创建」「初始化」和「赋值」都被提升了。
4. const 和 let 只有一个区别，那就是 const 只有「创建」和「初始化」，没有「赋值」过程。

### 什么是执行上下文（Execution Context, EC）

JS 执行上下文，即 JS 的**执行环境**。当我们的**代码执行时**，会进入到不同的执行上下文，即不同的环境。在不同的环境中，有着不同的作用域（scope），代码所能访问到的资源也就不同。 在 JS 中，执行上下文有如下两种情况：

- 全局执行上下文

  代码默认运行的环境，代码执行时会首先进入全局环境。它是最外围的一个执行环境。在 web 浏览器中，全局执行上下文就是 window 对象。全局变量和函数都是作为全局对象 window 的变量和方法来创建的。一个程序中只会有一个全局执行上下文。

- 函数执行上下文

  函数被调用执行时，所创建的执行环境。

### 执行上下文的特点

1. 单线程，只在主线程上运行；
2. 同步执行，从上向下按顺序执行；
3. 全局上下文只有一个，也就是`window`对象；
4. 函数执行上下文没有限制；
5. 函数每调用一次就会产生一个新的执行上下文环境。

### ES3 执行上下文

### 内容

执行上下文是一个抽象的概念，我们可以将它理解为一个 `object` ，一个执行上下文里包括以下内容：

1. 变量对象 VO
2. 活动对象 AO
3. 作用域链
4. 调用者信息 this

变量对象(Variable Object, VO)

每个执行上下文都有一个表示变量的对象——**变量对象**。

- **全局执行上下文的变量对象**
  - 始终存在，**就是全局对象**，以浏览器环境来说，就是 `window` 对象。
- **函数执行上下文中的变量对象**
  - 只会在创建阶段（具体的函数代码运行之前），JS 引擎用当前函数的**参数列表**（`arguments`）初始化一个 “变量对象” 并将当前执行上下文与之关联 ，函数代码块中声明的 **变量** 和 **函数** 将作为属性添加到这个变量对象上。
  - 并且，其中定义的属性是不能被直接访问的，只有当函数被调用进入执行阶段时，变量对象（`VO`）被激活为活动对象（`AO`）时，我们才能访问到其中的属性和方法。

#### 活动对象（Active Object, AO）

函数进入执行阶段时，原本不能访问的变量对象被激活成为一个活动对象，自此，我们可以访问到其中的各种属性。

> **其实变量对象和活动对象是一个东西，只不过处于不同的状态和阶段而已。**

##### 创建阶段

变量对象的创建过程大致如下:

- 创建 arguments 对象，检查当前环境的参数，初始化属性和属性值。
- 检查函数声明，当前环境中每发现一个函数就在 VO 中用函数名创建一个属性，以此来引用函数。如果函数名存在，就覆盖这个属性。
- 检查变量声明，当前环境中每发现一个 var 声明的变量，就在 VO 中用变量名创建一个属性，并初始化其值为 undefined。如果变量名存在， 则不进行任何处理（注意这是在创建阶段，执行阶段会被赋值），继续检查。

##### 代码执行阶段

函数环境的变量对象会变成活动对象 AO（Active Object），变成活动对象前，其内部属性不能被访问。对于全局环境，其变量对象就是 window 对象自身，可以直接访问其内部属性。

### 数据结构模拟

用代码形式表现出来，大概如下：

```
ExecutionContext = {
    [variable object | activation object]: {
        arguments,
        variables: [...],
        funcions: [...]
    },
    scope chain: variable object + all parents scopes,
    thisValue: context object
}
```

### 生命周期

执行上下文的生命周期大概分为三个阶段，即创建阶段、执行阶段和销毁阶段：

#### 1.创建阶段

发生在函数调用时且在执行函数体内的具体代码之前，JS 引擎做如下操作：

**全局执行上下文**

- 在执行全局代码前，创建一个全局执行上下文，将 window 确定为全局执行上下文
- 对全局数据进行的预处理：
  - var 定义的全局变量 ==> undefined，并添加为 window 的属性
  - function 声明的全局函数 ==> 赋值（fun），并添加为 window 的方法
  - this ==> 赋值为 window
- 开始执行全局代码

**函数执行上下文**

- 在调用函数，准备执行函数体之前，创建对应的函数执行上下文对象（虚拟的，存在于栈中）
- 对局部数据进行预处理
  - 形参变量 ==> 赋值（实参） ==> 添加为执行上下文的属性
  - arguments ==> 赋值（实参列表），添加为执行上下文的属性
  - var 定义的局部变量 ==> undefined，添加为执行上下文的属性
  - function 声明的函数 ==> 赋值（fun），添加为执行上下文的方法
  - this ==> 赋值（调用函数的对象）
- 开始执行函数体代码

#### 2.代码执行阶段

执行阶段中，JS 代码开始逐条执行，在这个阶段，JS 引擎开始对定义的变量赋值、开始顺着作用域链访问变量、如果内部有函数调用就创建一个新的执行上下文压入执行栈并把控制权交出

#### 3.销毁阶段

一般来讲当函数执行完成后，当前执行上下文（局部环境）会被弹出执行上下文栈并且销毁，控制权被重新交给执行栈上一层的执行上下文。

> 但这只是一般情况，闭包的情况又有所不同。
>
> 闭包的定义：**有权访问另一个函数内部变量的函数**。简单说来，如果一个函数被作为另一个函数的返回值，并在外部被引用，那么这个函数就被称为闭包。

### 总结

对于 `ES3` 中的执行上下文，可以用下面这个列表来概括程序执行的整个过程：

1. 函数被调用
2. 在执行具体的函数代码之前，创建了执行上下文
3. 进入执行上下文的创建阶段：
   1. 初始化作用域链
   2. 创建 `arguments object` 检查上下文中的参数，初始化名称和值并创建引用副本
   3. 扫描上下文找到所有函数声明：
      1. 对于每个找到的函数，用它们的原生函数名，在变量对象中创建一个属性，该属性里存放的是一个指向实际内存地址的指针
      2. 如果函数名称已经存在了，属性的引用指针将会被覆盖
   4. 扫描上下文找到所有 var 声明的变量：
      1. 对于每个找到的变量声明，用它们的原生变量名，在变量对象中创建一个属性，并且使用 `undefined` 来初始化
      2. 如果变量名作为属性在变量对象中已存在，则不做任何处理并接着扫描
   5. 确定 `this` 值（调用函数的对象）
4. 进入执行上下文的执行阶段：
   1. 在上下文中运行/解释函数代码，并在代码逐行执行时分配变量值。

### ES5 中的执行上下文

`ES5` 规范又对 `ES3` 中执行上下文的部分概念做了调整，最主要的调整，就是去除了 `ES3` 中变量对象和活动对象。

替代为：

- **词法环境组件（** **LexicalEnvironment component）**
- **变量环境组件（** **VariableEnvironment component）**

### 生命周期

ES5 执行上下文的生命周期，也分为这三个阶段：

#### 1.创建阶段

1. 确定 **this** 的值，也就是**绑定 this（This Binding）**
2. **词法环境（LexicalEnvironment）**组件被创建
3. **变量环境（VariableEnvironment）**组件被创建

![img](https://img-blog.csdnimg.cn/20201003001926884.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQwNTA4ODMy,size_16,color_FFFFFF,t_70#pic_center)

##### 数据结构模拟

`ES5` 的执行上下文概念上表示大概如下：

```
ExecutionContext = {
  ThisBinding: <this value>,
  LexicalEnvironment: { ... },
  VariableEnvironment: { ... },
}
```

#### 2.执行阶段

执行阶段主要做三件事情:

1. 变量赋值
2. 函数引用
3. 执行其他的代码

#### 3.销毁阶段

执行完毕出栈，等待回收被销毁

### This Binding

- **全局**执行上下文中，`this` 的值指向全局对象，在浏览器中 `this` 的值指向 `window`对象，而在 `nodejs`中指向这个文件的 `module` 对象。
- **函数**执行上下文中，`this` 的值取决于函数的调用方式。具体有：默认绑定、隐式绑定、显式绑定（硬绑定）、`new` 绑定、箭头函数。

### 词法环境（Lexical Environment）

词法环境有两个**组成部分**

1. **环境记录**：存储变量和函数声明的实际位置
2. **对外部环境的引用**：可以访问其外部词法环境

词法环境有两种**类型**：

1. **全局环境**：是一个没有外部环境的词法环境，其外部环境引用为 **null**。拥有一个全局对象（window 对象）及其关联的方法和属性以及任何用户自定义的全局变量，`this` 的值指向这个全局对象。
2. **函数环境**：用户在函数中定义的变量被存储在**环境记录**中，包含了 `arguments` 对象。对外部环境的引用可以是全局环境，也可以是包含内部函数的外部函数环境。

伪代码：

```
GlobalExectionContext = {  // 全局执行上下文
  LexicalEnvironment: {        // 词法环境
    EnvironmentRecord: {       // 环境记录
      Type: "Object",             // 全局环境
      // 标识符绑定在这里
      outer: <null>              // 对外部环境的引用
  }
}

FunctionExectionContext = { // 函数执行上下文
  LexicalEnvironment: {      // 词法环境
    EnvironmentRecord: {      // 环境记录
      Type: "Declarative",       // 函数环境
      // 标识符绑定在这里         // 对外部环境的引用
      outer: <Global or outer function environment reference>
  }
}
```

### 变量环境

变量环境也是一个词法环境，因此它具有上面定义的词法环境的所有属性。

在 ES6 中，**词法**环境和**变量**环境的区别在于前者用于存储**函数声明和变量（let 和 const）**绑定，而后者仅用于存储**变量（var）**绑定。

**举个栗子**

```
let a = 20
const b = 30
var c

function multiply(e, f) {
  var g = 20
  return e * f * g
}

c = multiply(20, 30)
```

执行上下文如下：

```
GlobalExectionContext = { // 全局执行上下文
  ThisBinding: <Global Object>,
  LexicalEnvironment: { // 词法环境
    EnvironmentRecord: { // 环境记录
      Type: 'Object', // 对象式
      // 标识符绑定在这里
      a: < uninitialized >, // let 声明的变量，只是创建还没有初始化
      b: < uninitialized >,
      multiply: < func >
    }
    outer: <null> // 全局环境对外部环境引用为 null
  },

  VariableEnvironment: { // 变量环境
      EnvironmentRecord: { // 环境记录
        Type: "Object", // 对象式
        // 标识符绑定在这里
        c: undefined, // var 声明的变量，创建、初始化为 undefined
      }
      outer: <null> // 全局词法环境对外部词法环境引用为 null
    }
  }

FunctionExectionContext = { // 函数执行上下文
  ThisBinding: <Global Object>,
  LexicalEnvironment: { // 词法环境
    EnvironmentRecord: { // 环境记录
      Type: "Declarative", // 声明式
      // 标识符绑定在这里
      Arguments: {0: 20, 1: 30, length: 2}, // 函数的参数列表
    },
    outer: <GlobalLexicalEnvironment> // multiply 函数词法环境对外部环境引用为外部全局词法环境
  },

  VariableEnvironment: { // 变量环境
    EnvironmentRecord: { // 环境记录
      Type: "Declarative", // 声明式
      // 标识符绑定在这里
      g: undefined // var 声明的变量，创建、初始化为 undefined
    },
    outer: <GlobalLexicalEnvironment> // multiply 函数词法环境对外部环境引用为外部全局词法环境
  }
}
```

### 总结

对于 `ES5` 中的执行上下文，可以用下面这个列表来概括程序执行的整个过程：

1. 程序启动，全局上下文被创建

   1. 创建全局上下文的

      词法环境

      1. 创建 **对象式环境记录器** ，它用来定义出现在 **全局上下文** 中的变量和函数的关系（负责处理 `let` 和 `const` 定义的变量）
      2. 创建 **外部环境引用**，值为 **null**

   2. 创建全局上下文的

      变量环境

      1. 创建 **对象式环境记录器**，它持有 **变量声明语句** 在执行上下文中创建的绑定关系（负责处理 `var` 定义的变量，初始值为 `undefined` 造成声明提升）
      2. 创建 **外部环境引用**，值为 **null**

   3. 确定 `this` 值为全局对象（以浏览器为例，就是 `window` ）

2. 函数被调用，函数上下文被创建

   1. 创建函数上下文的

      词法环境

      1. 创建 **声明式环境记录器** ，存储变量、函数和参数，它包含了一个传递给函数的 **arguments** 对象（此对象存储索引和参数的映射）和传递给函数的参数的 **length**。（负责处理 `let` 和 `const` 定义的变量）
      2. 创建 **外部环境引用**，值为全局对象，或者为父级词法环境（作用域）

   2. 创建函数上下文的

      变量环境

      1. 创建 **声明式环境记录器** ，存储变量、函数和参数，它包含了一个传递给函数的 **arguments** 对象（此对象存储索引和参数的映射）和传递给函数的参数的 **length**。（负责处理 `var` 定义的变量，初始值为 `undefined` 造成声明提升）
      2. 创建 **外部环境引用**，值为全局对象，或者为父级词法环境（作用域）

   3. 确定 `this` 值（调用函数的对象）

3. 进入函数执行上下文的执行阶段：

   1. 在上下文中运行/解释函数代码，并在代码逐行执行时分配变量值。

### 执行上下文栈（Execution Context Stack, ECS）

执行上下文栈，也就是调用栈，用来管理多个执行上下文。

1. 在全局代码执行前，JS 引擎就会创建这个栈来存储管理所有的执行上下文对象
2. 在全局执行上下文（window）确定后，将其添加到栈中（压栈）
3. 在函数执行上下文创建后，将其添加到栈中（压栈）
4. 在当前函数执行完后，将栈顶的执行上下文对象移除（出栈）
5. 当所有的代码执行完后，栈中只剩下 window

**举个栗子**

```
var firstName = 'snow'

function getName() {
  var lastName = 'John'

  function fullName() {
    var name = lastName + firstName
    return name
  }
  var name = fullName()
  return name
}

getName()
```

![img](https://img-blog.csdnimg.cn/2020100300184158.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQwNTA4ODMy,size_16,color_FFFFFF,t_70#pic_center)

> ES3 之前的变量对象与活动对象的概念被融合到了词法环境（lexical environments）模型（环境记录：Environment Record 和对外部环境的引用：outer reference）中，ES5 后到现在还有一些新的概念（Realms 领域，作业 Job 等）被提出。两者概念不冲突，后者理解更为通俗易懂。

**var foo 和 function foo 同时存在会怎样？**

```
var foo
function foo() {}
console.log(foo) // ƒ foo(){}
```

或

```
function foo() {}
var foo
console.log(foo) // ƒ foo(){}
```

由于 function 比 var 多一个「赋值」过程，所以两个代码的输出都是函数。

但是，如果是下面这种情况：

```
console.log(foo) // ƒ foo(){}
var foo = 1
function foo() {}
console.log(foo) // 1
```

执行流程：

1. 首先进入**全局环境创建阶段**，检查函数声明，将函数 foo 创建、初始化、赋值，放入变量对象(全局环境为 window 对象)。
2. 检查变量声明，发现变量 foo 已经存在，则跳过（不需要再创建、初始化）。
3. 进入**执行阶段**，执行第一行代码 `console.log(foo)` 时，会在全局环境的变量对象中寻找 foo，找到了函数 foo。
4. 执行第二行代码，foo 赋值为 1（第三行代码在创建阶段已经预处理过了）
5. 执行第四行代码 `console.log(foo)`，在全局环境的变量对象中寻找 foo，找到了 foo 为 1。

> 那如果 function foo 和 let foo 同时出现呢？不会有这种情况的，因为 let 发现重名就会报错。

### 参考

[深入理解 JavaScript 作用域和作用域链](https://segmentfault.com/a/1190000018513150)

[我用了两个月的时间才理解 let](https://zhuanlan.zhihu.com/p/28140450)

[JS 执行上下文](https://juejin.im/post/6844903810310111239)

[JavaScript 执行上下文-执行栈](https://juejin.im/post/6844904199063339015)

[JavaScript 进阶-执行上下文](https://juejin.im/post/6844903983438381069)

## 16.对象分类和创建

对象可以分成几类：

- 宿主对象：JS 宿主环境提供的对象，行为完全由素质环境决定。
- 内置对象：JS 提供的对象。
  - 固有对象：由标准规定，随着 JS 运行时创建而自动创建的对象实例。
  - 原生对象：用户可以通过 Array、RegExp 等内置构造器或者特殊语法创建的对象。
  - 普通对象：由{}语法、Object 构造器或者 class 关键字定义的对象，能被原型继承。

### 宿主对象

浏览器环境中的宿主：全局对象是 window，window 上的属性一部分来自 JS，一部分来自浏览器环境。

### 内置对象·固有对象

固有对象在 js 代码执行前就已经被创建了，它们扮演着类似基础库的角色。“类”就是固有对象的一种。

### 内置对象·原生对象

js 中能够通过语言本身的构造器创建的对象。

js 提供了 30 多个**构造器**（内置对象），分成以下几个种类：

<img src="https://static001.geekbang.org/resource/image/6c/d0/6cb1df319bbc7c7f948acfdb9ffd99d0.png" style="width: 100%;">

通过这些构造器，我们可以用 new 运算创建新的对象。这些构造器就是原生对象。

几乎所有这些构造器的能力都是无法用纯 JavaScript 代码实现的，它们也无法用 class/extend 语法来继承。

这些字段使得原型继承方法无法正常工作，所以，我们可以认为，所有这些原生对象都是为了特定能力或者性能，而设计出来的“**特权对象**”。

### 用对象来模拟函数与构造器：函数对象与构造器对象

函数对象的定义是：具有[[call]]私有字段的对象。

构造器对象的定义是：具有私有字段[[construct]]的对象。

任何对象只需要实现[[call]]，它就是一个函数对象，可以去作为函数被调用。而如果它能实现[[construct]]，它就是一个构造器对象，可以作为构造器被调用。

用户用 **function** 关键字创建的函数必定**同时是函数和构造器**。不过，它们表现出来的行为效果却并不相同。

对于用户使用 function 语法或者 Function 构造器创建的对象来说，[[call]]和[[construct]]行为总是相似的，它们执行同一段代码。

```
function f(){
    return 1;
}
var v = f(); //把f作为函数调用
var o = new f(); //把f作为构造器调用
```

[[construct]]的执行过程如下：

- 以 Object.prototype 为原型创建一个新对象；
- 以新对象为 this，执行函数的[[call]]；
- 如果[[call]]的返回值是对象，那么，返回这个对象，否则返回第一步创建的新对象。

这样的规则造成了个有趣的现象，如果我们的构造器返回了一个新的对象，那么 new 创建的新对象就变成了一个构造函数之外完全无法访问的对象，这一定程度上可以实现“私有”。

```
function cls(){
    this.a = 100;
      console.log(this) // window
    return { //返回了一个新的对象
        getValue:() => { // 箭头函数的this继承外部函数的this
          console.log(this) // window
          return this.a
        }
    }
}
var o = new cls;
console.log(o.getValue()); //100
console.log(o.a); // undefined
console.log(this.a); // 100
//这相当于一个闭包
```

构造函数一般不应该用 return 来返回值。而这个构造函数 cls 用 return 来返回值。并且**返回值是一个对象**（函数也是对象）则会用这个对象代替自动创建的实例对象返回给 o。也就是说你设置的是实例对象的 a，返回给 o 的却是 getValue 一个箭头函数，箭头函数没有 a 属性。

如果想要访问 a 可以设置 getValue 为 cls 的方法：

```
function cls(){
    this.a = 100;
    this.getValue =()=> {
        return this.a;
    }
}
var o = new cls();
console.log(o.a); //100
console.log(o.getValue()); //100
```

### 特殊行为的对象

在固有对象和原生对象中，有一些对象的行为跟正常对象有很大区别。

它们常见的下标运算（就是使用中括号或者点来做属性访问）或者设置原型跟普通对象不同。

- Array：Array 的 length 属性根据最大的下标自动发生变化。
- Object.prototype：作为所有正常对象的默认原型，不能再给它设置原型了。
- String：为了支持下标运算，String 的正整数属性访问会去字符串里查找。
- Arguments：arguments 的非负整数型下标属性跟对应的变量联动。
- 模块的 namespace 对象：特殊的地方非常多，跟一般对象完全不一样，尽量只用于 import 吧。
- 类型数组和数组缓冲区：跟内存块相关联，下标运算比较特殊。
- bind 后的 function：跟原来的函数相关联。

### 创建对象的几种模式

#### 1、new 操作符 + Object 创建对象

先创建空 Object 对象，再动态添加属性和方法

**适用场景：**起始时不确定对象内部数据

**问题：**语句太多

```
var person = new Object();
person.name = "lisi";
person.age = 21;
person.family = ["lida","lier","wangwu"];
person.say = function(){
  alert(this.name);
}
```

#### 2、字面式创建对象

使用 {} 创建对象，同时指定属性和方法

**适用场景：**起始对象内部数据是确定的

**问题：**如果创建多个对象时，会产生大量重复代码，为了解决此问题，工厂模式被开发。

```
var person = {
  name: "lisi",
  age: 21,
  family: ["lida","lier","wangwu"],
  say: function(){
    alert(this.name);
  }
};
// var o = function(){} 也可以
```

#### 3、工厂模式

通过工厂函数动态创建对象并返回

**适用场景：**需要创建多个对象

**问题：**对象没有一个具体的类型，都是 Object 类型

```
function createPerson(name,age,family) {
    var o = new Object();
    o.name = name;
    o.age = age;
    o.family = family;
    o.say = function(){
        alert(this.name);
    }
    return o;
}

var person1 =  createPerson("lisi",21,["lida","lier","wangwu"]);   //instanceof无法判断它是谁的实例，只能判断他是对象，构造函数都可以判断出
var person2 =  createPerson("wangwu",18,["lida","lier","lisi"]);
console.log(person1 instanceof Object); //true
```

#### 4、构造函数模式

自定义构造函数，通过 new 创建对象

**适用场景：**需要创建多个类型确定的对象

**问题：**每个对象都有相同的数据，浪费内存

```
function Person(name,age,family) {
    this.name = name;
    this.age = age;
    this.family = family;
    this.say = function(){
        alert(this.name);
    }
}
var person1 = new Person("lisi",21,["lida","lier","wangwu"]);
var person2 = new Person("lisi",21,["lida","lier","lisi"]);
console.log(person1 instanceof Object); //true
console.log(person1 instanceof Person); //true
console.log(person2 instanceof Object); //true
console.log(person2 instanceof Person); //true
console.log(person1.constructor);      //constructor 属性返回对创建此对象的构造函数的引用
```

构造函数知道自己从哪里来（通过 instanceof 可以看出其既是 Object 的实例，又是 Person 的实例）

构造函数的缺陷是每个实例的方法是一样的但是每次 new 都会创建一个新的，浪费内存，因此产生了原型模式

#### 5、原型模式

**好处**：

方法是共享的了，所有的实例的方法都指向同一个。

问题：

1.**引用类型**的属性只要有一个实例对象修改了，其他也会跟着修改。因为所有实例对象的属性都是共用的。

2.所有都是共享的，没有办法创建实例自己的属性和方法，也没有办法像构造函数那样传递参数。

```
function Person() {
}

Person.prototype.name = "lisi";
Person.prototype.age = 21;
Person.prototype.arr = [1, 2, 3];
Person.prototype.say = function(){
    alert(this.name);
};


var person1 = new Person()
var person2 = new Person();

console.log(person.family) // [1, 2, 3]
console.log(person2.family) // [1, 2, 3]
person.arr.push(4)
console.log(person.family) // [1, 2, 3, 4]
console.log(person2.family) // [1, 2, 3, 4]
```

#### 6、混合模式（构造函数模式+原型模式）

**优点**：

1. 解决了原型模式没有办法传递参数的问题
2. 保证了每个实例有自己的私有属性，解决了原型模式对于引用类型的属性的问题
3. 通过原型链`__proto__`共享着对相同方法的引用，解决了构造函数模式不能共享方法的问题，最大限度的节省了内存。

```
function Person(name,age,family){
    this.name = name;
    this.age = age;
    this.family = family;
}

Person.prototype = {
    say: function(){
        console.log(this.name);
    }
}

var person1 = new Person("lisi",21,["lida","lier","wangwu"]);
console.log(person1); // {name: "lisi", age: 21, family: Array(3)}
person1.say(); // lisi
var person2 = new Person("wangwu",22,["lida","lier","lisi"]);
console.log(person2); // {name: "wangwu", age: 22, family: Array(3)}
person2.say(); // wangwu
```

> **注意**：在使用 prototype 的时候，不要用字面量的写法。否则，会重新生成一个新对象，切断与之前的联系。



## 17.语句执行及词法

### Completion 类型

```
function foo() {
  try {
    return 0;
  } catch(err) {

  } finally {
    console.log("a")
  }
}
console.log(foo());
// a
// 0
```

虽然 return 执行了，但是函数并没有立即返回，又执行了 finally 里面的内容。

```
function foo(){
  try{
    return 0;
  } catch(err) {

  } finally {
    return 1;
  }
}
console.log(foo()); // 1
```

finally中的return“**覆盖**”了try中的return。（后文有解释原因）

JS 使用 Completion Record 类型，控制语句执行的过程。Completion Record 表示一个语句执行完之后的结果，它有三个字段：

- [[type]] 表示完成的类型，有 break continue return throw 和 normal 几种类型；
- [[value]] 表示语句的返回值，如果语句没有，则是 empty；
- [[target]] 表示语句的目标，通常是一个 JavaScript 标签。

**语句的分类：**

![img](https://static001.geekbang.org/resource/image/98/d5/98ce53be306344c018cddd6c083392d5.jpg)

### 普通的语句

不带控制能力的语句称为普通语句。

- 声明类语句
  - var 声明
  - const 声明
  - let 声明
  - 函数声明
  - 类声明
- 表达式语句
- 空语句
- debugger 语句

这些普通语句在执行时，从前到后顺次执行（忽略 var 和函数声明的预处理机制），没有任何分支或者重复执行逻辑。

普通语句执行后，会得到 [[type]] 为 normal 的 Completion Record。JS 引擎遇到这样的 Completion Record，会继续执行下一条语句。这些语句中，只有表达式语句会产生 [[value]]。

### 语句块

语句块就是拿大括号括起来的一组语句，它是一种语句的复合结构，可以嵌套。

注意的是语句块内部的语句的 Completion Record 的`[[type]]`如果不为 **normal**，会**打断**语句块后续的语句执行。

比如，一个[[type]]为 return 的语句，出现在一个语句块中的情况。return 语句可能产生 return 或者 throw 类型的 Completion Record。

先给出一个内部为普通语句的语句块：

```
{
  var i = 1; // normal, empty, empty
  i ++; // normal, 1, empty
  console.log(i) //normal, undefined, empty
} // normal, undefined, empty
```

在每一行的注释中，给出了语句的 Completion Record。在一个 block 中，如果每一个语句都是 normal 类型，那么它会顺次执行。

接下来加入 return :

```
{
  var i = 1; // normal, empty, empty
  return i; // return, 1, empty
  i ++; 
  console.log(i)
} // return, 1, empty
```

假如我们在 block 中插入了一条 return 语句，产生了一个非 normal 记录，那么整个 block 会成为非 normal。

这个结构就保证了非 normal 的完成类型可以穿透复杂的语句嵌套结构，产生控制效果。

### 控制型语句

控制型语句带有 if、switch 关键字，它们会对不同类型的 Completion Record 产生反应。

控制类语句分成两部分：

- 一类 对其**内部**造成影响，如 if、switch、while/for、try。
- 另一类 对**外部**造成影响如 break、continue、return、throw。

这两类语句的配合，会产生控制代码**执行顺序**和**执行逻辑**的效果，这也是我们编程的主要工作。

一般来说， for/while - break/continue 和 try - throw 这样比较符合逻辑的组合。但是，实际上，我们需要控制语句跟 break 、continue 、return 、throw 四种类型与控制语句两两组合产生的效果。

![img](https://static001.geekbang.org/resource/image/77/d3/7760027d7ee09bdc8ec140efa9caf1d3.png)

通过这个表，发现最初的 case 中的 try 和 return 的组合。

> 穿透”就是指不在当前这一层处理，向外逐层寻找可以“消费”的那一层，直到最后都没找到就报错。
>
> 比如：function里面有while, while里面有switch, switch里面又有continue，按图表来看，switch-continue应该是穿透，向上层寻找消费，碰到while-contine,那就是消费，再如switch里面是return, switch-return穿透，向上层whlie-return穿透，最后function-return是消费。

**原因：**

因为 finally 中的内容必须保证执行，所以 try/catch 执行完毕，即使得到的结果是非 normal 型的完成记录，也必须要执行 finally。而当 finally 执行也得到了非 normal 记录，则会使 finally 中的记录作为整个 try 结构的结果。

### 带标签的语句

Completion Record 最后一个字段：target，涉及了 JS 中的一个语法，带标签的语句。

实际上，任何 JS 语句都是可以加标签的，在语句前加冒号即可。

如：

```
firstStatement: var i = 1;
```

大部分时候，这个东西类似于注释，没有任何用处。唯一有作用的时候是：与完成记录类型中的 target 相配合，用于跳出多层循环。

如：

```
outer: while(true) {
  inner: while(true) {
    break outer;
  }
}
console.log("finished") // finished
```

break/continue 语句如果后跟了关键字，会产生带 target 的完成记录。一旦完成记录带了 target，那么只有拥有对应 label(标签) 的循环语句会消费它。

### 词法

JS 的词法定义， 源代码中的输入可以这样分类：

- WhiteSpace 空白字符
- LineTerminator 换行符
- Comment 注释
- Token 词
  - IdentifierName 标识符名称，典型案例是我们使用的变量名，注意这里关键字也包含在内了。
  - Punctuator 符号，我们使用的运算符和大括号等符号。
  - NumericLiteral 数字直接量，就是我们写的数字。
  - StringLiteral 字符串直接量，就是我们用单引号或者双引号引起来的直接量。
  - Template 字符串模板，用反引号` 括起来的直接量。

#### 数字直接量 NumericLiteral

JS 规范中规定的数字直接量可以支持四种写法：十进制数、二进制整数、八进制整数和十六进制整数。

十进制的 Number 可以带小数，小数点前后部分都可以省略，但是不能同时省略，如：

```
.01
12.
12.01
```

这里就有一个问题

```
12.toString() //Uncaught SyntaxError: Invalid or unexpected token
```

这时候12. 会被当做省略了小数点后面部分的数字而看成一个**整体**，所以我们要想让点单独成为一个 token，就要加入空格：

```
12 .toString() //"12"
```

## 19.EventLoop事件流

javascript 语言是一门"单线程"语言，也就是说它就像**一条**流水线，同一时间只能干一件事，不能同时进行多个任务和流程。

好处是：不用担心并发问题。

但这也意味着：无法在不阻塞主线程的情况下去执行一些耗时较长的操作。（比如处理网络请求、文件读写等耗时操作时，阻塞了后面任务的执行，后面的任务不得不一直等着，结果出来才能继续往下执行）

于是，为了处理这种情况，所有任务分成了两种，一种是同步任务，另一种是异步任务。

### 理解同步和异步

同步任务指的是：在主线程上排队执行的任务，只有前一个任务执行完毕，才能执行后一个任务；

异步任务指的是：不进入主线程、而进入"任务队列"（task queue）的任务，只有等主线程任务执行完毕，"任务队列"开始通知主线程，请求执行任务，该任务才会进入主线程执行。

> 换个思路解释：
>
> 在一个块内，语句大体上从上到下依次执行（除了“声明提升”等个别例外，但那是发生在编译阶段），这些语句便是**同步代码**；
>
> 而有一些语句，即所谓的回调函数，并不会按照“正常的”顺序执行，而是会在将来的某一时刻被调用执行，这部分语句便是**异步代码**。
>
> 简单来说，异步编程就是：执行一个指令不会马上返回结果而执行下一个任务，而是等到特定的事件触发后，才能得到结果。

同步和异步的**本质区别**在于：一个**现在**执行，一个**将来**执行。此处的“现在”和“将来”与时间长短无关，而是指“是否在同一个块内执行”。

具体来说，**异步执行的运行机制**如下：（同步执行也是如此，只不过没有异步任务）

（1）所有同步任务都在主线程上执行，形成一个执行栈（execution context stack）。

（2）主线程之外，还存在一个"任务队列"（task queue）。只要异步任务有了运行结果，就在"任务队列"之中放置一个事件。

（3）一旦"执行栈"中的所有同步任务执行完毕，系统就会读取"任务队列"，看看里面有哪些事件。那些对应的异步任务，于是结束等待状态，进入执行栈，开始执行。

（4）主线程不断重复上面的第三步。

只要主线程空了，就会去读取"任务队列"，这个过程会不断重复。

### 一些概念

**执行上下文**

执行上下文是 JS 代码执行环境中的一个抽象的概念。JS 任何代码都是在执行上下文中执行的。

函数内部的代码会在函数执行上下文中执行，全局的代码会在全局执行上下文中执行，每一个函数都有自己的执行上下文。

**执行栈**

执行栈是一种**后进先出**(LIFO)的栈结构，它用来**存储**在代码执行阶段创建的所有的执行上下文。因为 JS 是单线程，它 只有一个执行栈，只能从栈的顶层添加或是删除执行上下文。

**任务队列（消息队列）**

任务队列是一个先进先出的队列，它里面存放着各种任务。而这些任务就是注册异步任务时添加的回调函数。

**事件循环**

事件循环的工作就是去查看**执行栈**，确定执行栈是否为空，如果执行栈为空，那么就去检查任务队列，看看任务队列中是否有待执行的回调函数。

**浏览器和 JS 引擎**

之所以说 JS 是单线程，就是因为浏览器在运行时只开启了一个 JS 引擎线程来解析和执行 JS。但是浏览器内部不是单线程的。一些 I/O 操作、定时器的计时和事件监听（click, keydown...）等都是由浏览器提供的**其他线程**来完成的。

一个浏览器通常由以下几个常驻的线程：

- 渲染引擎线程：负责页面的渲染
- JS 引擎线程：负责 JS 的解析和执行
- 定时触发器线程：处理定时事件，比如 setTimeout，setInterval
- 事件触发线程：处理 DOM 事件
- 异步 http 请求线程：处理 http 请求

需要注意的是，渲染线程和 JS 引擎线程是不能同时进行的。渲染线程在执行任务的时候，JS 引擎线程会被挂起。因为 JS 可以操作 DOM，若在渲染中 JS 处理了 DOM，浏览器可能就不知所措了。

### 举个栗子

使用 setTimeout 方法去模拟网络请求函数。即异步的回调函数，有了异步的回调函数就**不会阻塞**主线程。

```
const networkRequest = () => {
  setTimeout(() => {
    console.log('Async Code');
  }, 2000);
};
console.log('Hello World');
networkRequest();
console.log('The End');
```

> **注意**：
>
> **事件循环**、**Web API** 和**任务队列**（消息队列）并不是 JS 引擎的一部分，而是浏览器的 JS 运行环境或 Nodejs 的 JS 运行环境的一部分，在 Nodejs 中，Web API 被 C/C++ API 替代。
>
> 如，`setTimeout` 就是浏览器或 Nodejs 提供的。

上面的代码是如何执行的，如图所示：

![img](https://img-blog.csdnimg.cn/20200819173903294.png#pic_center)

1.代码开始执行，`console.log(‘Hello World’)` 函数的执行上下文首先被压入执行栈，执行结束后被弹出。

2.然后调用 `networkRequest()`，其对应的函数执行上下文被压入执行栈。

紧接着 `setTimeout()` 函数被调用，对应的函数执行上下文被压入执行栈。`setTimeout()` 函数会挂在 web API 运行环境中进行 `2s` 的倒计时。

这个时候 `setTimeout()` 函数就**已经在执行栈中执行完了**，执行上下文弹出。

3.在 `setTimeout()` 进行 2s 倒计时的**同时**， `console.log('The End')` 函数进入执行栈被执行，结束后弹出执行栈。

4.等到倒计时结束，`setTimeout()` 的**回调函数**被推到**任务队列**中，但回调函数不会立即执行，而是开始**事件循环**。

5.执行栈已经为空，任务队列包含一个 `setTimeout` 函数的回调函数，因此事件循环把回调函数的执行上下文压入执行栈的顶端。然后 `console.log(‘Async Code’)` 函数的执行上下文被压入执行栈，结束后从执行栈弹出。这时候回调函数执行结束，对应的执行上下文也从执行栈中弹出。

### 使用异步编程

### 1. DOM 事件处理

一类很重要的异步过程：**DOM 事件**。

#### handler 属性

早期 JS 的异步的实现类似于这种类的属性的方式：每个类实例的相关回调事件有相应的 handler(onclick，onchange，onload 等)。

DOM0 级事件处理方法有两种：

```
// 1.在标签内写onclick事件
<input id="myButton" type="button" value="Press Me" onclick="alert('thanks');">
// 2.或者，在JS中写.onlicke=function(){}函数
document.getElementById("myButton").onclick = function () {
    alert('thanks');
}
```

即将函数赋给元素的属性。这样达成条件就会触发响应的函数。

这种写法简单明了，但是会有以下几个问题

- 耦合度高
- 不安全，容易被重写

#### addEventListener 的回调（发布/订阅）

由于 JS 支持函数式编程，对异步编程的实现可以用回调函数。

DOM2 级事件处理方法：addEventListener 添加监听。

`addEventListener()` 可以为元素添绑定多个事件，每个事件可以指定多个**事件处理程序**（即回调函数，并且之前的不会被覆盖），触发时会按照添加顺序依次调用。

```
element.addEventListener("click", function(){
    alert("clicked");
})
```

web API 中会有一个事件侦听器监听某个事件(在这里是 click 事件)，当其被触发时，就会把相应的回调函数放入任务队列中。

> 它实际上是一个发布订阅模式，addEventListener 相当于 subscribe，dispatchEvent 相当于 publish。

### 2. 回调函数（callback）

什么是回调函数：并不会按照“正常的”顺序执行，而是会在将来的某一时刻被调用执行。

除了 `addEventListener` 之外，还有 `setTimeout` 和 `ajax` 也可以添加回调函数。

`setTimeout` 的作用是在间隔一定的时间后，将回调函数插入消息队列（宏队列）中，等栈中的同步任务都执行完毕后，再执行。因为栈中的同步任务也会耗时，**所以间隔的时间一般会大于等于指定的时间**。

```
setTimeout(function() {
    console.log("a")
}, 0)

for(let i=0; i<10000; i++) {}
console.log("b")
// b
// a
```

打印结果表明回调函数并没有立刻执行，而是等待栈中的任务执行完毕后才执行的。栈中的任务执行多久，它就得等多久。

#### 举个栗子

执行下面这段代码，执行后，在 5s 内点击两下，过一段时间（>5s）后，再点击两下，整个过程的输出结果是什么？

```
setTimeout(function() { // 回调1
    for(var i = 0; i < 100000000; i++){}
    console.log('timer a');
}, 0)

for(var j = 0; j < 5; j++){
    console.log(j);
}

setTimeout(function(){ // 回调2
    console.log('timer b');
}, 0)

function waitFiveSeconds(){
    var now = (new Date()).getTime();
    while(((new Date()).getTime() - now) < 5000){}
    console.log('finished waiting');
}

document.addEventListener('click', function(){ // 回调3
    console.log('click');
})

console.log('click begin');
waitFiveSeconds();
```

1.首先，先执行同步任务。其中 `waitFiveSeconds` 是耗时操作，持续执行长达 5s。输出：

```
0
1
2
3
4
click begin
finished waiting
```

2.然后，在 JS 引擎线程执行的时候，**定时器产生的回调 1、回调 2 和两次 click 触发的回调 3 被先后放入消息队列**。由于执行完同步任务，JS 引擎线程空闲后，会先查看是否有**事件**可执行，接着再处理**其他异步任务**。因此输出顺序：

```
click
click
timer a
timer b
```

3.最后，5s 后的两次 click 事件被放入消息队列，由于此时 JS 引擎线程空闲，便被立即执行了。输出：

```
click
click
```

#### 回调地狱

但是，通过回调函数来实现的异步方案，可能会导致**回调地狱**的问题。多层回调嵌套，代码可读性差。

这里演示一个对 setTimeout 的封装，规定时间后打印相应结果并执行回调函数：

```
var i = 0;
function sleep(ms, callback) {
    setTimeout(function () {
        console.log('我执行完啦！');
        i++;
        if (i >= 3) callback(new Error('i大于3'), null);
        else callback(null, i);
    }, ms);
}
sleep(1000, function (err, val) {
    if (err) return console.log(err.message);;
    console.log(val);
    sleep(1000, function (err, val) {
        if (err) return console.log(err.message);
        console.log(val);
        sleep(1000, function (err, val) {
            if (err) console.log(err.message);
            else console.log(val);
        })
    })
})
// 我执行完啦！
// 1
// 我执行完啦！
// 2
// 我执行完啦！
// i大于等于3
```

像上面那样，嵌套很深的时候看的很不舒服，并且如果回调函数出错了也难以判断在哪里出错的。

#### 异常无法捕捉

由于 js 的回调异步特性，无法通过 try catch 来捕捉所有的异常：

```
try {
  setTimeout(function() {
    JSON.parse("{'a':'1'}") // {}应该用单引号包裹，里面值用双引号，否则会报错
    console.log("aaaa")
  }, 0)
} catch(ex) {
  console.log(ex); //不能catch到这个异常
}
```

对于这些问题，比较普遍的解决方案是 Promise。

### 3. Promise

> promise 和事件类似，它可以看成只触发两个事件的 event 对象。
>
> 但是事件具有即时性，触发之后这个状态就不存在了，这个事件已经触发过了，就再也拿不到值了，而 promise 不同，promise 只有两个状态 resolved 和 rejected。相当于一种代理，promise 把成功和失败分别代理到 resolve 和 reject。
>
> 当它触发任何一个状态后它会将当前的值缓存起来，并在有回调函数添加进来的时候尝试调用回调函数，如果这个时候还没有触发 resolve 或者 reject，那么回调函数会被缓存，等待调用；如果已经有了状态(resolve 或者 reject)，则立刻调用回调函数。并且所有回调函数在执行后都立即被销毁。具体可以看[这篇](http://www.woc12138.com/article/43)

#### 举个栗子

将上面例子改写为 Promise 形式：

```
var i = 0
function sleep(ms) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log('我执行完了')
            i++
            if (i>=3) {
                reject(new Error('i大于等于3')) // 这里需要reject
            } else {
                resolve(i) // 这里需要resolve
            }
        }, ms)
    })
}

sleep(1000).then((val) => {
    console.log(val)
    return sleep(1000)
}).then((val) => {
    console.log(val)
    return sleep(1000)
}).then((val) => {
    console.log(val)
}).catch((err) => {
    console.log(err.message)
})
// 我执行完了
// 1
// 我执行完了
// 2
// 我执行完了
// i大于等于3
```

它将原本嵌套的回调函数展开了，现在看的更舒服了，并且由于 promise 的冒泡性质，promise 链中的任意一个函数出错都会直接抛出到链的最底部，所以统一用 catch 去捕获，每次 promise 的回调返回一个 promise，这个 promise 把下一个 then 当作自己的回调数，并在 resolve 之后执行，或在 reject 后被 catch 出来。这种链式的写法让函数的流程比较清楚。

#### 微任务队列/宏任务队列

需要注意的是：ES6 的 Promise 引入了**宏任务队列/微任务队列**的概念 。**微任务队列**的优先级要高于**消息队列（宏任务队列）**。事件循环会先清空**微任务队列**的回调函数才会去执行**消息队列**中的回调函数。

也就是说在**微任务队列**的 **promise 回调函数**会比在**宏任务队列**中的回调函数更先执行。

##### 举个栗子

```
console.log('Script start');

setTimeout(() => { // setTimeout的回调函数被添加到宏任务队列
    console.log('setTimeout');
}, 0);

new Promise((resolve, reject) => {
    resolve('Promise 1 resolved');
})
.then(res => console.log(res)); // 回调函数被添加到微任务队列

new Promise((resolve, reject) => {
    resolve('Promise 2 resolved');
    }).then(res => { // 回调函数被添加到微任务队列
        console.log(res);
        return new Promise((resolve, reject) => {
            resolve('Promise 3 resolved');
        })
    }).then(res => console.log(res)); // 回调函数被添加到微任务队列

console.log('Script End');
// Script start
// Script End
// Promise 1 resolved
// Promise 2 resolved
// Promise 3 resolved
// setTimeout
```

当事件循环正在执行微任务队列中的任务时，又有另一个 promise 被 resolve 了，它将会被添加到同一个微任务队列的队尾，同样也会被优先执行于消息队列中的回调函数，无论这个回调函数等待了多久。

但 promise 只是解决了回调嵌套的问题，并没有解决回调本身。在指明 resolved 和 rejected 的时候，用的还是最原始的回调的方式。ES6 的语法引入了 Generator，yeild 的关键字可以用同步的语法写异步的程序。

### 4. Generator

简单来说 generator 可以理解为一个**可遍历的状态机**，所以需要手动调用 next 才能执行。

#### 举个栗子

改写为 generator 的形式：

```
var i = 0
function sleep(ms) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log('我执行完了')
            i++
            if (i>=3) {
                gen.throw(new Error('i大于等于3')) // 这里需要gen.throw
            } else {
                gen.next(i) // 这里需要gen.next
            }
        }, ms)
    })
}
function* g(){
    try {
        let val = yield sleep(1000)
        console.log(val)
        val = yield sleep(1000)
        console.log(val)
        val = yield sleep(1000)
        console.log(val)
    } catch(err) {
        console.log(err.message)
    }
}
var gen = g();
gen.next()
console.log('主程序没有被阻塞')
// 主程序没有被阻塞
// 我执行完了
// 1
// 我执行完了
// 2
// 我执行完了
// i大于等于3
```

#### 问题

1.不会立即执行函数，必须调用遍历器对象的 `next` 方法，使得指针移向下一个状态。

2.不够直观，没有语义化。

于是这里就引入了 async/await 关键字。

### 5. async/await

async 函数跟生成器函数极为相似，只是将之前的 `*` 变成了 `async` ，`yield` 变成了 `await` 。其实它就是一个能够自动执行的 generator 函数，我们不用再通过手动执行 `gen.next(..)` 来控制生成器函数的暂停与启动。

`async` 表示函数里有异步操作，`await` 表示紧跟在后面的表达式需要等待结果。

> async 函数 return 返回的是一个 Promise 对象，可以使用 `then` 方法给 async 函数添加回调函数。`async` 函数完全可以看作多个异步操作，包装成的一个 Promise 对象，而 `await` 命令就是内部 `then` 命令的语法糖。
>
> await 关键字后可以是 Promise 对象和原始类型的值（会自动转成立即 resolved 的 Promise 对象）。函数执行到 await 后会退出该函数，先去执行外面的**同步代码**，直到主线程空闲，然后事件轮询去检查 `await` 命令后面的 Promise 对象是否执行完，如果有了状态 resolve 或 reject，才继续执行这个 async 函数后面的内容。

```
function timeout(ms) {
    return new Promise((resolve) => { // 同步执行
        setTimeout(() => { // 任务队列
            console.log(2)
            resolve(4)
        }, ms)
        console.log(3)
    })
}

async function asyncPrint(val, ms) {
    let a = await timeout(ms) // 等timeout返回promise的状态为resolve后才继续往下执行
    console.log(a, val)
}
asyncPrint('hi', 1000)
console.log(1)
// 3
// 1
// 2
// 4, hi
```

1.调用 asyncPrint 异步函数，执行 await 后面的 timeout，setTimeout 的回调函数放入任务队列等待同步代码执行完毕，执行同步代码 console.log(3)

2.退出 asyncPrint 函数，先执行函数外面的同步代码 console.log(1)

3.同步代码执行完毕，主线程清空，执行任务队列中的 setTimeout 的回调函数，console.log(2)

4.promise 状态改变为 resolve 后，继续执行 await 后面的代码 console.log(a, val)

#### 举个栗子

改写成 async/await 形式：

```
var i = 0
function sleep(ms) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log('我执行完了')
            i++
            if (i>=3) {
                reject(new Error('i大于等于3'))
            } else {
                resolve(i)
            }
        }, ms)
    })
}

(async () => {
    try {
        let val = await sleep(1000)
        console.log(val)
        val = await sleep(1000)
        console.log(val)
        val = await sleep(1000)
        console.log(val)
    } catch(err) {
        console.log(err.message)
    }
})()
console.log('主程序没有被阻塞')
// 主程序没有被阻塞
// 我执行完了
// 1
// 我执行完了
// 2
// 我执行完了
// i大于等于3
```

1.async 函数立即执行，遇到了 await 会退出该 async 函数执行后面的 `console.log('主程序没有被阻塞')`。

2.执行完同步代码后主程序空闲，回到 async 函数中判断 await 后面的 sleep 返回的 promise 的状态是否为 resolve/reject，不断检查直到返回值才继续执行 await 后面的代码。

这样，没有任何 callback，**流程和异常捕获是完全同步的写法**。可以说这是异步的终极解决方案了。

### 参考

[【译】理解 JavaScript 异步编程](https://juejin.im/post/6858145135272820743)

[JavaScript 异步机制详解](https://juejin.im/post/6844903556084924423)

[node.js 异步控制流程 回调，事件，promise 和 async/await](https://www.cnblogs.com/kazetotori/p/6043983.html)

[async 函数](https://es6.ruanyifeng.com/#docs/async)



## 20.数组方法

### 1.concat()

用于连接两个或多个数组。返回一个新的数组

> 语法：arrayObject.concat(arrayX,arrayX,......,arrayX)
>
> arrayX 必需，该参数可以是具体的值，也可以是数组对象。可以是任意多个。
>
> 注意：该方法**不会改变原有的数组** arrayObject，而仅仅会返回一个新，该数组是通过把所有 arrayX 参数添加到 arrayObject 中生成的。如果要进行 concat() 操作的参数是数组，那么添加的是数组中的元素，而不是数组。

```
const a = [1, 2, 13]
const b = [7, 9, 3]
const c = a.concat(65, b)
console.log(c) // [1,2,13,65,7,9,3]
```

### 2.join()

用于把数组中的所有元素放入一个字符串。返回一个字符串,不改变原数组。

> 语法：arrayObject.join(separator)
>
> separator 可选，指定要使用的分隔符。如果省略该参数，则使用逗号作为分隔符。

```
const arr = [1, 2, 13]
const str = arr.join('|')
console.log(str) // "1|2|13"
```

### 3.reverse()

用于颠倒数组中元素的顺序，该方法会改变原来的数组，而不会创建新的数组。

> 语法：arrayObject.reverse()

```
const a = [1, 2, 13]
a.reverse()
console.log(a) // [13,2,1]
```

### 4.slice() 和 splice()

#### slice()

从已有的数组中返回选定的元素构成一个新的数组。不改变原数组。

> 语法：arrayObject.slice(start,end) **返回的新数组包含从 start 到 end （不包括该元素）的 arrayObject 中的元素。**
>
> start 必需，规定从何处开始选取。如果是负数，那么它规定从数组尾部开始算起的位置。也就是说，-1 指最后一个元素，-2 指倒数第二个元素，以此类推。
>
> end 可选，。规定从何处结束选取。该参数是数组片断结束处的数组下标。如果没有指定该参数，那么切分的数组包含从 start 到数组结束的所有元素。如果这个参数是负数，那么它规定的是从数组尾部开始算起的元素。

```
const arr = [1, 2, 13, 15, 13, 45, 32, 55, 7, 5]
const newArr = arr.slice(-5, -1)
console.log(newArr) // [45, 32, 55, 7]
```

#### splice()

向/从数组中添加/删除项目，然后返回被删除的项目组成的数组。该方法会改变原始数组。

> 语法：arrayObject.splice(index,howmany,item1,.....,itemX)
>
> 删除从 index 处开始的 howmany 个元素，并且可用列表中声明的一个或者多个值（item1,.....,itemX）来替换那些被删除的元素。
>
> index 必需，整数，规定添加/删除项目的位置，使用负数可从数组结尾处规定位置。
>
> howmany 必需，要删除的项目数量。如果设置为 0，则不会删除项目。
>
> item1,.....,itemX 可选，向数组添加的新项目。

```
const arr = [10, 20, 1, 2, 7, 32];
const newArr = arr.splice(1, 1)
console.log(newArr); // 20
console.log(arr); // 10, 1, 2, 7, 32
console.log(arr.splice(-2, 2, 66, 66)); // 7, 32
console.log(arr); // 10, 1, 2, 66, 66
```

#### slice() 和 splice() 异同

1. 都会返回一个新数组
2. slice() 将从原数组中截取出来的一些元素作为新数组返回，而 splice() 是返回被删除的元素组成的新数组
3. splice() 还可以在原数组中删除的元素的位置添加新元素
4. splice() 会改变原数组，slice() 不会

### 5.sort()

使数组中的元素按照一定的顺序进行重新排序，该方法会改变原来的数组。

> 语法：arrayObject.sort(sortby)
>
> sortby 可选，若使用时未传入参数，默认排序规则，是按照字符编码的顺序进行排序；若使用该参数，必须是函数（比较函数）规定排序顺序，即接收一个比较函数来实现自定义的排序。
>
> 比较函数要比较两个值，应该具有两个参数 a 和 b，然后返回一个用于说明这两个值的相对顺序的数字。

```
var sortby = function(a,b){
    return a - b;   
  // 注：开始时 a=arrayObject[0],b=arrayObject[1];然后a=调整后的arrayObject[1],b=调整后的arrayObject[2]；以此类推，直到数组合中的元素全部循环判断一遍
}
```

其返回值如下：

- 若 a 小于 b，在排序后的数组中 a 应该出现在 b 之前，则返回一个小于 0 的值，此时不调换 a、b 顺序。
- 若 a 等于 b，则返回 0，此时不调换 a、b 顺序。
- 若 a 大于 b，则返回一个大于 0 的值，此时调换 a、b 的顺序。

```
var arr = [10, 20, 1, 2];
//将数组中的元素按从小到大排列
arr.sort(function(a, b){
    return a - b; // <0
});
document.write(arr);//1,2,10,20
//将数组中的元素按从大到小排列
arr.sort(function(a, b){
    return b - a; // >0
});
document.write(arr);//20,10,2,1
```

### 6.forEach()、map()、reduce() 和 filter()

#### forEach()

用于调用数组的每个元素，并将元素传递给回调函数。返回值为 undefined。

> 语法：array.forEach(function(currentValue, index, arr), thisValue)

#### map()

按照原始数组元素顺序依次处理元素，可以方便的遍历数组。返回一个新数组，不会改变原始数组。

> 语法：arrayObject.map(function(currentValue,index,arr), thisValue)
>
> 1. function(currentValue, index,arr) 必需，函数，数组中的每个元素都会执行这个函数。
>
>    map() 方法可给该回调函数传入三个值：
>
>    - currentValue （必选 当前元素的值）
>    - index （可选，当前元素的索引）
>    - arr（可选，当前元素属于的数组对象。后两者在回调函数中根据是否需要来决定是否作为参数传入）
>
> 2. thisValue 可选，运行该函数的作用域对象，影响 “this” 的值。如果省略了 thisValue ，"this" 的值为 "undefined"。一般用不到该参数。

```
const arr = [10, 20, 1];
const newArr = arr.map((val) => {
    return val + 1
})
console.log(newArr); // 11,21,2
console.log(arr); // 10,20,1
```

#### reduce()

接收一个函数作为累加器，数组中的每个值（从左到右）开始缩减，最终计算为一个值。reduce()方法可以方便的迭代数组。不会改变原数组。

> 语法：arrayObject.reduce(function(previousValue, currentValue, currentIndex, arr), initialValue)
>
> 1. function(previousValue, currentValue, currentIndex, arr) 必需，函数
>
>    reduce()方法可给该回调函数传入四个值：
>
>    - previousValue （必选，上一次调用回调返回的值，或者是提供的初始值（initialValue））
>    - currentValue （必选， 数组中当前被处理的元素）
>    - currentIndex（可选，当前元素在数组中的索引）
>    - arr （可选，调用 reduce 的数组对象本身）
>
> 2. initialValue 可选，若不设置。则初始值将变成数组中的第一项，而 currentValue 即从数组中的第二项开始。

```
const arr = [10, 20, 1];
const val = arr.reduce((preVal, currentVal) => {
    return preVal + currentVal
}, 0)
console.log(val); // 31
/* 计算过程：
0 + 10
10 + 20
30 + 1
*/
```

#### filter()

创建一个新的数组，新数组中的元素是通过检查指定数组中符合条件的所有元素。filter()方法可以方便的遍历数组，对元素进行过滤。不会改变原始数组。

> 语法：arrayObject.filter(function(currentValue,index,arr), thisValue)
>
> 1. function(currentValue,index,arr) 必选，函数
>
>    filter() 方法可给该回调函数传入三个值：
>
>    - currentValue（必选，当前元素的值）
>    - index（可选，当前元素在数组中的索引）
>    - arr（可选，调用 filter 的数组对象本身）
>
> 2. thisValue 可选，运行该函数的作用域对象，影响 “this” 的值。如果省略了 thisValue ，"this" 的值为 "undefined"。一般用不到该参数。

```
const oldArr = [1,2,3,55,65,34];
const newArr = oldArr.filter((val) => {
    return val > 30;
});
5 document.write(newArr); // 55,65,34
```

#### forEach() 、reduce()、map() 和 filter() 异同

1. 都会对数组遍历
2. map() 和 filter() 返回一个经过处理的新数组（不会改变原数组），forEach() 返回 undefined，reduce() 返回一个经过计算的值

### 7.pop、push、shift 和 unshift

#### arrayObject.pop()

移除 arrayObject 中的最后一个元素，并返回该元素，改变原数组

#### arrayObject.push(item1,item2,....)

将一个或多个参数 item 添加到数组 arrayObject 的尾部，改变原数组，并返回改变后的数组的长度

#### arrayObject.shift()

移除 arrayObject 中的第一个元素，并返回该元素，改变原数组

#### arrayObject.unshift(item1,item2,....)

将一个或多个参数 item 添加到数组 arrayObject 的头部，改变原数组，并返回改变后的数组的长度

### 8.every() 和 some()

#### every()

用于检测所有数组元素是否符合指定方法。如果数组中有一个元素不满足，剩余元素不再进行检测，直接返回 false。所有元素都满足则返回 true。

#### some()

用于检测数据中是否存在元素符合条件。如果有一个元素满足函数，剩余元素不再进行检测，直接返回 true。所有元素都不满足则返回 false。

### 9.includes()、indexOf() 和 lastIndexOf()

#### includes(value)

判断数组中是否包含指定 value

```
let arr = [1, 4, 5, 6, 'abc']
console.log(arr.includes('a')) // false
```

#### indexOf()

返回数组中第一个与指定值相等的元素的索引，如果找不到这样的元素，则返回 -1。

#### lastIndexOf()

返回数组中最后一个（从右边数第一个）与指定值相等的元素的索引，如果找不到这样的元素，则返回 -1。

### 10.Array.from() 和 Array.of()

#### Array.from(v)

将伪数组对象或可遍历对象转换为真数组

#### Array.of(v1, v2, v3)

将一系列值转换成数组

### 11.find() 和 findIndex()

#### find(function(value, index, arr) {return true})

找出第一个满足条件返回 true 的元素

#### findIndex(function(value,index,arr) {return true})

找出第一个满足条件返回 true 的元素下标

### 12.其他

push 添加到数组的末尾        pop 删除数组末尾元素

unshift  在数组开头插入元素    shift 删除数组第一个元素

Math.floor() 返回小于或等于一个给定数字的最大整数。



## 21.字符串方法

### 1.charAt()、charCodeAt() 和 formCharCode()

#### charAt()

用于返回指定索引处的字符。返回的字符是长度为 1 的字符串。

```
var str="fighting 2020!";
str.charAt(3); // h
```

#### charCodeAt()

可返回指定位置的字符的 Unicode 编码。这个返回值是 0 - 65535 之间的整数。

> 语法：stringObject.charCodeAt(index)
>
> index 必需，表示字符串中某个位置的数字，即字符在字符串中的下标。

```
var str = "Hello world!";
str.charCodeAt(1); // 101
```

#### formCharCode()

接受一个指定的 Unicode 值，然后返回一个字符串。

> 语法：String.fromCharCode(numX,numX,...,numX)
>
> numX 必需，一个或多个 Unicode 值，即要创建的字符串中的字符的 Unicode 编码。

```
String.fromCharCode(72,69,76,76,79) // HELLO
String.fromCharCode(65,66,67) // ABC
```

### 2.indexOf()、lastIndexOf() 和 includes()

#### indexOf()

从字符串对象中返回首个被发现的给定值的索引值，如果没有找到则返回-1。

> 语法：`stringObject.indexOf(str,startpos)`
>
> str 必需，给定的需要检索的字符串
>
> startpos 可选的整数参数，规定在字符串中开始检索的位置。它的合法取值是 0 到 stringObject.length - 1。如省略该参数，则将从字符串的首字符开始检索。

```
var str = "fighting 2020!";
str.indexOf('i',2); // 5
```

#### lastIndexOf()

从字符串对象中返回最后一个被发现的给定值的索引值，如果没有找到则返回-1。

#### includes(str)

判断是否包含指定的字符串

### 3.split()

将字符串分割成字符串数组，并返回此数组。

> 语法：stringObject.split(separator,limit)
>
> separator 必需，从该参数指定的地方分割。 limit 可选，分割的次数。

```
var str = "fighting 2020 !";
var a = str.split(' ', 3) // ["fighting", "2020", "!"]
```

### 4.substring()、substr() 和 slice()

#### substring()

用于提取字符串中介于两个指定下标之间的字符，其内容是 start 处到 stop-1 处的所有字符，其长度为 stop 减 start。

> 语法：stringObject.substring(start, stop)
>
> start 必需，一个非负的整数，规定要提取的子串的第一个字符在 stringObject 中的位置。
>
> stop 可选，一个非负的整数，比要提取的子串的最后一个字符在 stringObject 中的位置多 1。如果省略该参数，那么返回的子串会一直到字符串的结尾。

```
var str = "fighting 2020!";
str.substring(5) // ing 2020!
str.substring(3,5) // ht
```

#### substr()

在字符串中抽取从 start 下标开始的指定数目的字符。

> 语法：stringObject.substr(start,length)
>
> start 必需，要抽取的子串的起始下标。必须是数值。如果是负数，那么该参数声明从字符串的尾部开始算起的位置。也就是说，-1 指字符串中最后一个字符，-2 指倒数第二个字符，以此类推。
>
> length 可选，必须是数值。如果省略了该参数，那么返回从 *stringObject* 的开始位置到结尾的字串。

```
var str = "fighting 2020!";
str.substring(3,5) // ht
str.substr(3,5) // hting
str.substr(-5,5) // 2020!
```

#### slice()

可提取字符串的某个部分，并以新的字符串返回被提取的部分。(与 array 中的相似)

#### slice()、substr() 与 substring() 的异同：

1. slice()、substring() 和 substr() （不建议使用）都可返回字符串的指定部分
2. slice() 和 substring() 的参数都是 start end，但是 substr() 的第二个参数是 length。
3. slice() 和 substr() 允许使用负数作为参数，但 substring() 不可以。
4. 还要注意的是，String.slice() 与 Array.slice() 相似。

### 5.replace()

用于在字符串中用一些字符替换掉另一些字符，或替换掉一个与正则表达式匹配的子串。**返回经过替换操作后形成的新的字符串，不改变原字符串**。

> 语法：stringObject.replace(regexp/substr,newsubstr/function)
>
> regexp/substr 必需，规定要替换掉的子字符串或要替换掉的模式的 RegExp 对象。
>
> newsubstr/function 必需，规定了替换文本或生成替换文本的函数。
>
> 当为 stringObject.replace(substr,newsubstr) 时，只能替换掉**第一次匹配**的 substr；
>
> stringObject.replace(regexp,newsubstr/function) 时，若 reg 有全局标志 g，则才替换所有匹配的子串。
>
> 注意：`stringObject.replace(regexp,function($,$1,$2...))`，`$`为匹配正则表达式的子串内容，`$1`、`$2`为捕获组对应的内容。

```
var str = "fighting 2020!";

str.replace(/fighting/, 'hello') // hello 2020!
str.replace(/(\w+)\s*(\w+)/, "$2 $1") // 2020 fighting!

var name = "Doe  , John";
name.replace(/(\w+)\s*,\s*(\w+)/, "$2, $1") // John, Doe
```

### 6.concat()

方法用于连接两个或多个字符串（stringObject.concat() 与 Array.concat() 很相似。）

### 7.startsWith()、endsWith() 和 repeat()

#### startsWith(str)：判断是否以指定字符串开头

#### endsWith(str)：判断是否以指定字符串结尾

#### repeat(count)：重复指定次数

### 8.match() 和 search()

#### match(searchvalue/Regexp)

只接受一个参数，由字符串或 RegExp 对象指定的一个正则表达式 ，返回存放结果的数组

#### search(searchvalue/Regexp)

返回第一个与 regexp 相匹配的子串的起始位置。不执行全局匹配，它将忽略标志 g，总是从字符串的开始进行检索。

### 总结

string 和 array 都有的方法：concat slice indexOf lastIndexOf includes

只在 array 中有：join splice reverse sort

只在 string 中有：split



## 22.面向对象、基于对象

### 对象的基本特征

1. 对象具有唯一标识性：即使完全相同的两个对象，也并非同一个对象。
2. 对象有状态：同一对象可能处于不同状态之下。
3. 对象有行为：对象的状态可能因为它的行为产生变迁。

### 第一个特征：

```
var o1 = {a : 1};
var o2 = {a : 1};
console.log(o1 == o2); //false
```

### 第二个和第三个特征：

| JS   | C++      | JAVA |
| ---- | -------- | ---- |
| 状态 | 成员变量 | 属性 |
| 行为 | 成员函数 | 方法 |

js中状态和行为统一抽象为“属性”

```
var o = {
  f: 1,
  f() {
    console.log(this.d);
  }
}
```

o是对象，d和函数f，尽管写法不太相同，但是在js中就都是普通属性。

### JS中对象独有特征

对象具有高度的动态性，因为js赋予了使用者在运行时为对象添加状态和行为的能力。

```
var o = {a : 1};
o.b = 2;
console.log(o.a,o.b); // 1 2
```

### JS对象的两类属性

js属性并非知识简单的名称和值，js用一组特征(attribute)来描述属性(property)

### 第一类属性：数据属性

它具有四个**特征**：

- value: 属性的值。
- writable: 决定属性能否被赋值。
- enumerable: 决定for in能否枚举该属性。
- configurable: 决定该属性能否被删除或者改变特征值。

### 第二类属性：访问器(getter/setter)属性

它也具有四个**特征**：

- getter: 函数或undefined，在取属性值时被调用。
- setter: 函数或undefined，在设置属性值时被调用。
- enumerable: 决定for in能否枚举该属性。
- configurable: 决定该属性能否被删除或者改变特征值。

访问器属性使得属性在读和写时执行代码，它允许使用者在写和读属性时，得到完全不同的值，它可以视为一种函数的语法糖。

我们通常在用代码定义属性时，会产生数据属性。其中的writable、enumerable、configurable 都默认为 true。

**使用对象直接量创建的属性，writable、enumerable和configurable特性默认为true。**

我们可以使用**内置函数 Object.getOwnPropertyDescripter** 来**查看** ：

```
var o = { a: 1 };
o.b = 2;
//a和b皆为数据属性
console.log(Object.getOwnPropertyDescriptor(o,"a"))
// {value: 1, writable: true, enumerable: true, configurable: true}
console.log(Object.getOwnPropertyDescriptor(o,"b"))
// {value: 2, writable: true, enumerable: true, configurable: true}
```

如果我们要想**改变属性的特征**，或者**定义访问器属性**，我们可以使用 **Object.defineProperty**:

**在使用Object.defineProperty、Object.defineProperties 或 Object.create 函数的情况下添加数据属性，writable、enumerable和configurable默认值为false。**

```
var o = { a: 1 }; 
Object.defineProperty(o, "b", {value: 2, writable: false, enumerable: false,configurable: true}); 
//a和b都是数据属性，但特征值变化了 
Object.getOwnPropertyDescriptor(o,"a"); 
//{value: 1, writable: true, enumerable: true, configurable: true} Object.getOwnPropertyDescriptor(o,"b"); 
//{value: 2, writable: false, enumerable: false, configurable: true} 
o.b = 3; //这时想重新赋值
console.log(o.b); // 2，因为writable被改为了false
```

在创建对象时，也可以使用 get 和 set 关键字来创建访问器属性

```
var o = {
  get a() {
    return 1
  }
};
console.log(o.a); //1
```

js对象运行时是一个“属性的集合”：

| key           | value                           |
| ------------- | ------------------------------- |
| 字符串/Symbol | 数据属性特征值/访问器属性特征值 |

以上面的对象 o 为例:

key:a

value:{writable:true,value:1,configurable:true,enumerable:true}

### js中的对象函数类实例方法究竟是什么

### 对象

在JS中一切皆为对象，它是一种无序数据的集合，由若干个“键值对”（key-value）构成。对象就好比是一个容器，它里面包含了属性和方法。

```
//实例创建方式：
var person = new Object();
person.name="l";
person.age=24;
//字面量式：
var person = {
  name="李",
  age=24
};
```

JS 是基于原型的面向对象语言, 所有数据都可以当作对象处理。

第一个 person 是对象, 可以把它当作是 Object 的实例。

第二个采用对象字面量的方式生成的person也是如此。它内部没有调用 new Object()，而是采用 JSON 的初始化方式：将现有的引用指向person。

类

**“类”是对象的模板，对象就是“类”的实例。**类实例化的结果是对象，而对象的抽象就是类。类描述了一组有相同特性（属性）和相同行为的对象。

> 比如：人是类，具体的人就是对象，小明、小红都是对象。动物是类，具体的小猫、小狗都是对象。

“对象”是单个实物的抽象。所以，通常需要一个模板，表示某一类实物的共同特征，然后“对象”根据这个模板生成。

JS在ES6之前没有“类”的语法，而改用构造函数（constructor）作为对象的模板。“构造函数”，就是专门用来生成“对象”的函数。它提供模板，作为对象的基本结构。一个构造函数，可以生成多个对象，这些对象都有相同的结构。

### 几种创建类的写法

（此部分内容与【JavaScript】对象分类(四)中的补充内容相似）

#### 构造函数法

构造函数的优点是：我们可以根据参数来构造不同的对象实例 ，缺点是每次构造实例对象时都会生成getName、setName方法，造成了内存的浪费。

```
function information() {
  this.name = '';
  this.setName = (name) => {
    this.name = name;
  }
  this.getName = () => {
    console.log(this.name);
  }
}

var myName = new information;//没有参数可以省略小括号
myName.setName('wy');//调用实例的setName方法
myName.getName();//调用实例的getName方法
```

还可以用一个外部函数代替类的方法，达到每个对象共享一个方法。

```
function getColor() { //外部函数
  return this.color;
}
function Cloth(color) {
  this.color = color;
  this.getColor = getColor;
}
var c1 = new Cloth('red');
console.log(c1.getColor()); // red
```

#### 原型方式

```
function Pen() {
  Pen.prototype.name = 'pencil';
  Pen.prototype.getPenName = function() {
    console.log("It is " + this.name);
  }
}
var pen1 = new Pen();
console.log(pen1.name); //pencil
console.log(pen1.prototype.name); //报错
console.log(pen1.__proto__.name);//pencil
pen1.getPenName(); //It is pencil
```

当我们创建一个函数在浏览器中被解析时，解析器会向函数中添加一个属性prototype，也就是原型对象，包含了构造器。如果函数作为普通函数调用，prototype没有任何作用；当函数以构造函数形式调用时，它所创建的对象都会有一个隐含属性指向该构造函数的原型对象，就是**隐含属性`__proto__`，指向原型对象**，我们可以通过它访问原型对象。

```
console.dir(Pen); // 输出Pen
console.dir(Pen.prototype == pen1.__proto__); //Person.prototype 与 pen1.__proto__ 指向同一个对象
```

原型方式的缺点就是**不能通过参数来构造对象实例**（一般每个对象的属性是不相同的），优点是所有对象实例都共享getName()方法（相对于构造函数方式）没有造成内存浪费。

```
var pen1 = new Pen('wy');
var pen2 = new Pen('woc');

console.log(pen1.name); //woc
console.log(pen2.name); //woc
```

像上面那样，设置实例自己的属性（方法）（即所谓的私有属性）后将**覆盖原型对象上的同名属性（方法）**。

#### 构造函数+原型方式

```
function Pen(name) {
  this.name = name; //构造函数方式
  Pen.prototype.getPenName = function() { ////原型方式
    return "It is " + this.name;
  }
}
var pen1 = new Pen('wy');
var pen2 = new Pen('woc');

console.log(pen1.name); //wy
console.log(pen2.name);//woc
console.log(pen1.getPenName());//It is wy
console.log(pen2.getPenName());//It is woc
```

或者还可以写成这样：

```
function Pen(name){
    this.name =name;
}
Pen.prototype = {
    constructor:Pen, //指定构造器为Pen
    getPenName: function(){
        console.log(this.name);
    }
}
var pen1 = new Pen('wy');
```

> 需要注意的是，上面这种写法中Person.prototype的constructor必须指定为Pen，否则实例对象的构造器`pen1.__proto__.constructor`为*ƒ* *Object()\*而不是\*f* *Pen(name)*。

这种方式只是将函数中的属性用`构造函数`中的`this`，方法用`原型方式`中的`prototype`。这样即避免了内存浪费，又不会造成参数的覆盖。

#### Object.create()方法

```
var Pen = {
  name: 'wy',
  getPenName: function() {
    console.log(this.name);
  }
}
var pen1 = Object.create(Pen);
pen1.getPenName(); //wy
```

用这个方法，"类"**就是一个对象，而不是函数**。然后，直接用Object.create()生成实例，不需要用到new。这种方法比"构造函数法"简单，但是**不能实现私有属性和私有方法**，实例对象之间也不能共享数据，对"类"的模拟不够全面。

#### 工厂模式

```
function createPen(name) {
  var obj = new Object();
  obj.name = name;
  obj.getPenName = function() {
    console.log(this.name);
  }
  return obj;
}
var pen1 = createPen('wy');
pen1.getPenName(); //wy
```

这种方式主要是通过在函数内部创建一个对象，为其添加属性和方法，并将对象返回，从而实现创建多个对象的目的。缺点是构造器为Object，没有解决对象识别的问题，不能知道一个对象的类型。

#### ES6中的类

ES6中加入的新特性（【JavaScript】类(三)中有相似内容）

```
class Pen {
  constructor(first) {
    this.first = first;
  }
  //getter
  get firstName() {
    return this.first;
  }
  //method
  name(last) {
    return this.first + last;
  }
}
let n = new Pen('w');
console.log(n.first); //w
console.log(n.firstName); //w
console.log(n.name('y')); //wy
```

`n.__proto__.constructor`为*class* *Pen*。

### 实例

实例是类的具象化产品，**就是通过new关键字调用的对象**。

**实例都是对象，而对象不全是实例。**

```
var obj = new Object;//对象实例
var arr = new Array;//数组实例
```

### 函数

就是使用function关键字定义(或声明)的表达式语句。

两种写法：

```
//函数定义表达式：
var aa = function() {...};
//函数声明语句：（会被提升到所在作用域的最顶端）
function aa() {...};
```

### 方法

当对象的属性是一个函数时，这个函数就是该对象的方法。简而言之，方法就是作为对象属性的函数！

```
var bb = {
  cc: function() {
    ...
  }
}
```

上面代码中，函数cc在这里就是对象bb的方法。一般叫做bb的cc方法。

## 其他

index of 返回指定的字符串首次出现的位置

substr(start [，length]) 第一个字符的索引是0，start必选 length可选

substring(start [, end]) 第一个字符的索引是0，start必选 end可选

相同点：当有一个参数时，两者的功能是一样的，返回从start指定的位置直到字符串结束的子串

不同点：有两个参数时

（1）substr(start,length) 返回从start位置开始length长度的子串

“goodboy”.substr(1,6);    //注意substr在ECMAscript 没有对该方法进行标准化 

 注：当length为0或者负数，返回空字符串

（2）substring(start,end) 返回从start位置开始到end位置的子串（不包含end）

“goodboy”.substring(1,6); 

【注】:

（1）substring 方法使用 start 和 end 两者中的较小值作为子字符串的起始点

（2）start 或 end 为 NaN 或者负数，那么将其替换为0

### Object 对象方法

Object.create()：使用指定的原型对象和属性创建一个新对象。

Object.assign(target,source1,source2..)：将所有可枚举属性的值从一个或多个源对象复制到目标对象。它将返回目标对象。

Object.defineProperty()：给对象添加一个属性并指定该属性的配置。

Object.getOwnPropertyDescriptor()：返回对象指定的属性配置。

Object.getOwnPropertyNames()：返回一个数组，它包含了指定对象所有的可枚举或不可枚举的属性名。

Object.is(v1,v2)：比较两个值是否相同（是以类型和字符串来判断的）。所有 NaN 值都相等（这与==和===不同）。

Object.keys()：返回一个所有元素为字符串的数组，其元素来自于从给定的`object`上面可直接枚举的属性。

Object.values()：返回一个给定对象自身的所有可枚举属性值的数组。

### Math

### 1.ceil()、floor() 、 round() 和 trunc()

#### ceil()：对一个数进行向上取整

语法：Math.ceil(x) 返回大于等于 x 并且与 x 最接近的整数

#### floor()：对一个数进行向下取整

语法：Math.floor(x) 返回小于等于 x 并且与 x 最接近的整数

#### round()：对一个数进行四舍五入取整

语法：Math.round(x) 返回最接近 x 的整数

#### Math.trunc()：直接去除小数部分

### 2.random()

返回介于 0 ~ 1 之间的一个随机数，不包括 0 和 1

语法：Math.random() 返回 0.0 ~ 1.0 之间的一个随机数。

> 如果想大于这个范围的话，可以套用一下公式：
>
>  值 = Math.floor(Math.random() * 总数 + 第一个值)
>
> 比如：Math.floor(Math.random() * 10 + 1) 表示随机产生一个 1~10 的整数

### 3.max() 和 min()

#### max()

返回指定的数中带有较大的值的那个数

语法：Math.max(x1,x2,.....) 返回 x1,x2,.....中带有最高值的数字，如果有某个参数为 NaN，或是不能转换成数字的非数字值，则返回 NaN。

#### min()

返回指定的数中带有较小的值的那个数

语法：Math.min(x1,x2,......) 返回 x1,x2,.....中带有最小值的数字，如果有某个参数为 NaN，或是不能转换成数字的非数字值，则返回 NaN。

```
Math.ceil(3.2);//4
Math.floor(3.7);//3
Math.round(3.5);//4
Math.trunc(123.123);//123
Math.random();//一个随机数
Math.max(3,6,6.2);//6.2
Math.min(3,4,34);//3
```

### Number

1. Number.isFinite(i)：判断是否是有限大的数
2. Number.isNaN(i)：判断是否是 NaN
3. Number.isInteger(i)：判断是否是整数
4. Number.parseInt(str)：将字符串转换为对应的数值