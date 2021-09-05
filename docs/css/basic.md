# HTML+CSS

## 1.元信息类标签

元信息类标签，就是 **HTML 用于描述文档自身的一类标签**，它们通常出现在 head 标签中，一般都不会在页面被显示出来（与此相对，其它标签，如语义类标签，描述的是业务）。元信息多数情况下是给浏览器、搜索引擎等机器阅读的，有时候这些信息会在页面之外显示给用户，有时候则不会。

### head 标签

head 标签本身并不携带任何信息，它主要是作为盛放其它语义类标签的容器使用。

head 标签规定了自身必须是 html 标签中的第一个标签，它的内容必须包含一个 title，并且最多只能包含一个 base。如果文档作为 iframe，或者有其他方式指定了文档标题时，可以允许不包含 title 标签。

### title 标签

title 标签表示文档的标题。title 应该是完整地概括整个网页内容的。而 h1 则仅仅用于页面展示，它可以默认具有上下文，并且有链接辅助，所以可以简写，即便无法概括全文，也不会有很大的影响。

### base 标签

base 标签实际上是个历史遗留标签。它的作用是给页面上所有的 URL 相对地址提供一个基础。base 标签最多只有一个，它改变全局的链接地址，它是一个非常危险的标签，容易造成跟 JavaScript 的配合问题，所以在实际开发中，建议使用 JavaScript 来代替 base 标签。

### meta 标签

meta 标签是一组键值对，它是一种通用的元信息表示标签。在 head 中可以出现任意多个 meta 标签。一般的 meta 标签由 name 和 content 两个属性来定义。name 表示元信息的名，content 则用于表示元信息的值。如：

```
<meta name="application-name" content="lsForums">
```

这个标签表示页面所在的 web-application，名为 IsForums。

这里的 name 是一种比较自由的约定，HTTP 标准规定了一些 name 作为大家使用的共识，也鼓励大家发明自己的 name 来使用。

除了基本用法，meta 标签还有一些变体，主要用于简化书写方式或者声明自动化行为。下面展示几种重点的内容：

#### 具有 charset 属性的 meta

meta 标签新增了 charset 属性。添加了 charset 属性的 meta 标签无需再有 name 和 content。

```
<meta charset="UTF-8" >
```

charset 型 meta 标签非常关键，它描述了 HTML 文档自身的编码形式。因此，建议这个标签放在 head 的**第一个**。

#### 具有 http-equiv 属性的 meta

具有 http-equiv 属性的 meta 标签，表示执行一个命令，这样的 meta 标签可以不需要 name 属性了。

如，下面一段代码，相当于添加了 content-type 这个 http 头，并且指定了 http 编码方式。

```
<meta http-equiv="content-type" content="text/html;charset=UTF-8">
```

除了content-type，还有以下几种命令：

- content-language 指定内容的语言；
- default-style 指定默认样式表；
- refresh 刷新；
- set-cookie 模拟 http 头 set-cookie，设置 cookie;
- x-ua-compatible 模拟 http 头 x-ua-compatible，声明ua兼容性；
- content-security-policy 模拟 http 头 content-security-policy，声明内容安全策略。

#### name 为 viewport 的 meta

实际上，meta 标签可以被自由定义，只要写入和读取的双方约定好 name 和 content 的格式就可以了。

还有一种 meta 类型，它没有在 HTML 标准中定义，却是移动端开发的事实标准：它就是 name 为 viewport 的 meta。

这类 meta 的 name 属性为 viewport，它的 content 是一个复杂结构，是用逗号分隔的键值对，键值对的格式是 key=value。

```
<meta name="viewport" content="width=500, initial-scale=1">
```

这里只指定了两个属性，宽度和缩放，实际上 viewport 能控制的更多，它能表示的全部属性如下：

- width：页面宽度，可以取值具体的数字，也可以是 device-width，表示跟设备宽度相等。
- height：页面高度，可以取值具体的数字，也可以是 device-height，表示跟设备高度相等。
- initial-scale：初始缩放比例。
- minimum-scale：最小缩放比例。
- maximum-scale：最大缩放比例。
- user-scalable：是否允许用户缩放。

对于已经做好了移动端适配的网页，应该把**用户缩放功能禁止掉**，宽度设为设备宽度，一个标准的 meta 如下：

```
<meta name="viewport" content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no">
```

#### 其它预定义的 meta

在 HTML 标准中，还定义了一批 meta 标签的 name，可以视为一种有约定的 meta，在这里列出来，可以简单了解一下。

application-name：如果页面是 Web application，用这个标签表示应用名称。

- author: 页面作者。
- description：页面描述，这个属性可能被用于搜索引擎或者其它场合。
- generator: 生成页面所使用的工具，主要用于可视化编辑器，如果是手写 HTML 的网页，不需要加这个 meta。
- keywords: 页面关键字，对于 SEO 场景非常关键。
- referrer: 跳转策略，是一种安全考量。
- theme-color: 页面风格颜色，实际并不会影响页面，但是浏览器可能据此调整页面之外的 UI（如窗口边框或者 tab 的颜色）。

## 2.选择器

**选择器的基本意义是：根据一些特征，选中元素树上的一批元素。**

按选择器的结构分类，由简单到复杂可以分成以下几种：

- 简单选择器：针对某一特征判断是否选中元素。
- 复合选择器：连续写在一起的简单选择器，针对元素自身特征选择单个元素。
- 复杂选择器：由“（空格）”“ >”“ ~”“ +”“ ||”等符号连接的复合选择器，根据父元素或者前序元素检查单个元素。
- 选择器列表：由逗号分隔的复杂选择器，表示“或”的关系。

选择器是由简单选择器逐级组合而成的结构。

### 简单选择器

简单选择器是针对某一特征判断是否为选中元素。

![img](https://static001.geekbang.org/resource/image/4c/ce/4c9ac78870342dc802137ea9c848c0ce.png)

### 类型选择器和全体选择器

我们要介绍的第一个简单选择器就是**类型选择器**，它根据一个元素的**标签名**来选中元素。

```
div {

}
```

这看上去非常简单，但是实际上，我们还必须要考虑 HTML 或者 XML 元素的命名空间问题。

比如我们的 svg 元素，实际上在： http://www.w3.org/2000/svg 命名空间之下。

**svg** 和 **HTML** 中都有 `a` 元素，我们若要想区分选择 svg 中的 a 和 HTML 中的 a，就必须**用带命名空间的类型选择器**。

```
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>JS Bin</title>
</head>
<body>
<svg width="100" height="28" viewBox="0 0 100 28" version="1.1"
     xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <desc>Example link01 - a link on an ellipse
  </desc>
  <a xlink:href="http://www.w3.org">
    <text y="100%">name</text>
  </a>
</svg>
<br/>
<a href="javascript:void 0;">name</a>
</body>
</html>

@namespace svg url(http://www.w3.org/2000/svg); 
@namespace html url(http://www.w3.org/1999/xhtml);
svg|a {
  stroke:blue;
  stroke-width:1;
}

html|a {
  font-size:40px
}
```

有一个特殊的选择器，就是“ * ” ，它称为**全体选择器**，可以**选中任意元素**。它的用法跟类型选择器是完全一致的。

### id 选择器与 class 选择器

id 选择器和 class 选择器都是针对特定属性的选择器。id 选择器是“#”号后面跟随 id 名，class 选择器是“.”后面跟随 class 名。

基本用法：

```
#myid {
  stroke:blue;
  stroke-width:1;
}

.mycls {
  font-size:40px
}
```

class 选择器识别的是：用空格分隔的 class 语法。

```
<a class="a b c">xxx</a>
.a {
    color:red;
}
```

使用了用空格分隔的 class 属性，使用“.a”“.b”或者“.c”都能够选中元素，也可以使用多个 class 选择器来要求元素具有多个类。

### 属性选择器

属性选择器根据 HTML 元素的属性来选中元素。属性选择器有四种形态。

- 第一种，[att]

直接在方括号中放入属性名，检查元素是否具有这个属性，只要元素有这个属性，不论属性是什么值，都可以被选中。

- 第二种，[att=val]

精确匹配，检查一个元素属性的值是否是val。

- 第三种，[att~=val]

多种匹配，检查一个元素的值是否是若干值之一，这里的 val 不是一个单一的值了，可以是用空格分隔的一个序列。

- 第四种，[att|=val]

开头匹配，检查一个元素的值是否是以 val 开头，它跟精确匹配的区别是属性只要以 val 开头即可，后面内容不管。

### 伪类选择器

**伪类选择器**是一系列由 CSS 规定好的选择器，它们**以冒号开头**。伪类选择器有**普通型**和**函数型**两种。

首先来介绍一下伪类中最常用的部分：树结构关系伪类。

#### 树结构关系伪类选择器

`:root` 伪类表示**树的根元素**，在选择器是针对完整的 HTML 文档情况，我们一般用 HTML 标签即可选中根元素。但是随着 scoped css 和 shadow root 等场景出现，选择器可以针对某一子树来选择，这时候就很需要 root 伪类了。

- `:empty` 伪类表示**没有子节点的元素**，这里有个例外就是子节点为空白文本节点的情况。
- `:nth-child` 和 `:nth-last-child` 这是两个**函数型的伪类**，CSS 的 An+B 语法设计的是比较复杂的，我们这里仅仅介绍基本用法。我们还是看几个例子：

![img](https://static001.geekbang.org/resource/image/1e/a9/1ebdba2978a22c13844d108318b271a9.png)

- `:nth-last-child` 的区别仅仅是**从后往前数**。
- `:first-child` `:last-child` 分别表示**第一个**和**最后一个**元素。
- `:only-child` 按字面意思理解即可，选中**唯一一个子元素**。

> of-type 系列，是一个变形的语法糖，S:nth-of-type(An+B) 是:nth-child(|An+B| of S) 的另一种写法。以此类推，还有 nth-last-of-type、first-of-type、last-of-type、only-of-type。

#### 链接与行为伪类选择器

链接与行为是第一批设计出来的伪类，也是最常用的一批。

- :any-link 表示任意的链接，包括 a、area 和 link 标签都可能匹配到这个伪类。
- :link 表示未访问过的链接， :visited 表示已经访问过的链接。
- :hover 表示鼠标悬停在上的元素。
- :active 表示用户正在激活这个元素，如用户按下按钮，鼠标还未抬起时，这个按钮就处于激活状态。
- :focus 表示焦点落在这个元素之上。
- :target 用于选中浏览器 URL 的 hash 部分所指示的元素。如：

```
<p><a href="#news1">跳转至内容 1</a></p> 

<p><a href="#news2">跳转至内容 2</a></p>

<p id="news1"><b>内容 1...</b></p>
<p id="news2"><b>内容 2...</b></p>

:target { /* 设置样式 */
border: 2px solid #D4D4D4;
background-color: #e5eecc;
}
```

#### 逻辑伪类选择器

逻辑伪类 —— :not 伪类。

这个伪类是个函数型伪类，它的作用是选中内部的简单选择器**没命中的元素**。

```
*|*:not(:hover)
```

id 和 class 来标识元素，约束伪类的使伪类是很大的一类简单选择器，它是选择器能力的一种补充。在实际使用中，建议尽量通过合适的用。最好只在不得不使用伪类的场景使用伪类，这对于 CSS 代码的性能和可读性都有好处。



## 3.选择器的机制

### 选择器的组合

在 CSS 规则中，选择器部分是一个选择器列表。

选择器列表是用逗号分隔的复杂选择器序列；

复杂选择器则是用空格、大于号、波浪线等符号连接的复合选择器；

复合选择器则是连写的简单选择器组合。

根据选择器列表的语法，选择器的连接方式可以理解为像四则运算一样有优先级。

- 第一优先级
  - 无连接符号
- 第二优先级
  - “空格”
  - “~”
  - “+”
  - “>”
  - “||”
- 第三优先级
  - “,”

例如以下选择器：

```
.c,.a>.b.d {
  /*...*/
}
```

我们应该理解为这样的结构：

- .c,.a>.b.d
  - .c
  - .a>.b.d
    - .a
    - .b.d
      - .b
      - .d

**复合选择器**表示简单选择器中“且”的关系，例如，例子中的“ .b.d ”，表示选中的元素必须同时具有 b 和 d 两个 class。

**复杂选择器**是针对节点关系的选择，它规定了五种连接符号。

- **“空格”**：后代，表示选中所有符合条件的后代节点， 例如“ .a .b ”表示选中所有具有 class 为 a 的后代节点中 class 为 b 的节点。
- **“>”** ：子代，表示选中符合条件的子节点，例如“ .a>.b ”表示：选中所有“具有 class 为 a 的子节点中，class 为 b 的节点”。
- **“~”** : 后继，表示选中所有符合条件的后继节点，后继节点即跟当前节点具有同一个父元素，并出现在它之后的节点，例如“ .a~.b ”表示选中所有具有 class 为 a 的后继中，class 为 b 的节点。
- **“+”**：直接后继，表示选中符合条件的直接后继节点，直接后继节点即 nextSlibling。例如 “.a+.b ”表示选中所有具有 class 为 a 的下一个 class 为 b 的节点。
- **“||”**：列选择器，表示选中对应列中符合条件的单元格。

**空格和子代**选择器通常用于组件化场景，当组件是独立开发时，很难完全避免 class 重名的情况，如果为组件的最外层容器元素设置一个特别的 class 名，生成 CSS 规则时，则全部使用后代或者子代选择器，这样可以有效避免 CSS 规则的命名污染问题。

**逗号**表示“或”的关系，实际上，可以把它理解为“两条内容一样的 CSS 规则”的一种简写。

### 选择器的优先级

CSS 标准用一个三元组 (a, b, c) 来构成一个复杂选择器的优先级。

- id 选择器的数目记为 a；
- 伪类选择器和 class 选择器的数目记为 b；
- 伪元素选择器和标签选择器数目记为 c；
- “*” 不影响优先级。

行内属性的优先级永远高于 CSS 规则，浏览器提供了一个“口子”，就是在选择器前加上“!important”。这个用法非常危险，因为它相当于一个新的优先级，而且此优先级会高于行内属性。

同一优先级的选择器遵循“后面的覆盖前面的”原则，如：

```
<div id="my" class="x y">text</div>

.x {
  background-color: lightblue;
}
.y {
  background-color: lightgreen; /*显示*/
}
```

调换“.x”和“.y”我们可以得到不同的显示效果。选择器的优先级是针对单条规则的，多条规则的选择器同时命中元素，优先级不会发生叠加。如：

```
<div id="my" class="x y z">text</div>

.x {
    background-color:lightblue;
}
.z {
    background-color:lightblue;
}
.y {
    background-color:lightgreen; /*显示*/
}
```

在这个例子中，“.x ”和“.z ”都指定了背景色为浅蓝色，但是因为“.y ”规则在最后，所以最终显示结果为浅绿色。

另外一个需要注意的是，选择器的优先级是针对复杂选择器的优先级，选择器列表不会合并计算优先级。如：

```
<div id="my" class="x y z">text</div>

.x, .z {
    background-color:lightblue;
}
.y {
    background-color:lightgreen; /*显示*/
}
```

这里选择器列表“ .x, .z”命中了 div，但是它的两项分别计算优先级，所以最终优先级仍跟“ .y” 规则相同。

但是实践中，建议“根据 id 选单个元素”“class 和 class 的组合选成组元素”“tag 选择器确定页面风格”这样的简单原则来使用选择器，不要搞出过于复杂的选择器。如果产生复杂的优先级计算，代码的可读性一定是有问题的。

### 伪元素

伪元素的语法跟伪类相似，但是实际产生的效果却是把不存在的元素硬选出来。

目前兼容性达到可用的伪元素有以下几种。

- ::first-line
- ::first-letter
- ::before
- ::after

**::first-line** 和 **::first-letter** 是比较类似的伪元素，其中一个表示元素的**第一行**，一个表示元素的**第一个字母**。

示例：

```
<p>This is a somewhat long HTML
paragraph that will be broken into several
lines. The first line will be identified
by a fictional tag sequence. The other lines
will be treated as ordinary lines in the
paragraph.</p>

p::first-line {
    text-transform: uppercase; /*把段落的第一行字母变为大写*/
}
p::first-letter {
  text-transform: uppercase; /*首字母变大并向左浮动*/
  font-size:2em;
  float:left;
}
```

注意这里的第一行指的是排版后显示的第一行，跟 HTML 代码中的换行无关。

CSS 标准规定了 **first-line 必须出现在最内层的块级元素之内**。

考虑以下代码：

```
<div>
  <p id=a>First paragraph</p>
  <p>Second paragraph</p>
</div>

div::first-line { 
    color:blue; /*显示*/
}
div>p#a {
    color:green;
}
```

这段代码最终结果第一行是蓝色，因为 p 是块级元素，所以**伪元素出现在块级元素之内**，所以**内层的 color 覆盖了外层的 color 属性**。（如果我们把 p 换成 span，结果就是相反的）

**::first-letter** 的行为又有所不同，**它的位置在所有标签之内**，我们把前面的代码换成::first-letter。

```
<div>
  <span id=a>First paragraph</span><br/>
  <span>Second paragraph</span>
</div>

div>span#a {
    color:green;
}

div::first-letter {
    color:blue; /*显示*/
}
```

首字母变成了蓝色，这说明伪元素出现在 span 之内。

CSS 标准只要求 ::first-line 和 ::first-letter 实现有限的几个 CSS 属性，都是文本相关，这些属性是下面这些。

![img](https://static001.geekbang.org/resource/image/6e/48/6e050ee9f7a0b1657388271cceb0c548.png)

**接下来我们说说 ::before 和 ::after 伪元素。**

这两个伪元素跟前面两个不同的是，它不是把已有的内容套上一个元素，而是真正的无中生有，造出一个元素。

::before 表示在元素内容之前插入一个虚拟的元素，::after 则表示在元素内容之后插入。

这两个伪元素所在的 CSS 规则必须指定 content 属性才会生效，例子：

```
<p class="special">I'm real element</p>

p.special::before {
    display: block;
    content: "pseudo! ";
}
```

这里要注意一点，::before 和 ::after 还支持 content 为 counter，如：

```
<div class="special">I'm real element</p>
div.special::before {
    content: counter(section, upper-roman) ". ";
}
div.special {
    counter-increment: section;
}
```

section表示你给这个计数器取得名字，upper-roman表示罗马数字（decimal为阿拉伯数字），counter-increment表示计数器自增。

::before 和 ::after 中支持所有的 CSS 属性。实际开发中，这两个伪元素非常有用，有了这两个伪元素，一些修饰性元素，可以使用纯粹的 CSS 代码添加进去，这能够很好地保持 HTML 代码中的语义，既完成了显示效果，又不会让 DOM 中出现很多无语义的空元素。

## 4.链接

链接是 HTML 中的一种机制，它是 HTML 文档和其它文档或者资源的连接关系。在 HTML 中，链接有两种类型：一种是**超链接型标签**，一种是**外部资源链接**。

链接的家族中有 a 标签、area 标签和 link 标签。

![img](https://static001.geekbang.org/resource/image/ca/51/caab7832c425b3af2b3adae747e6f551.png)

### link 标签

HTML 标准并没有规定浏览器如何使用元信息，元信息中有不少是被设计成“无需被浏览器识别，而是专门用于搜索引擎看的”。

**link 标签**也是元信息的一种，在很多时候，它也是不会对浏览器产生任何效果的，这也是很多人会忽略 link 标签学习的原因。

link 标签会生成一个链接，它可能生成超链接，也可能生成外部资源链接。

一些 link 标签：

会生成超链接，这些超链接又不会像 a 标签那样显示在网页中。这就是**超链接型的 link 标签**。这意味着多数浏览器中，这些 link 标签不产生任何作用。但是，这些 link 标签能够被搜索引擎和一些浏览器插件识别，从而产生关键性作用。

比如，到页面 RSS 的 link 标签，能够被浏览器的 RSS 订阅插件识别，提示用户当前页面是可以 RSS 订阅的。

另外一些 link 标签：

则会把外部的资源链接到文档中，也就是说，会实际下载这些资源，并且做出一些处理，比如我们常见的用 link 标签**引入样式表**。

除了元信息的用法之外，多数外部资源型的 link 标签还能够被放在 body 中使用，从而起到把外部资源链接进文档的作用。

link 标签的链接类型主要通过 rel 属性来区分，在本篇文章中，我们提到 xx 型 link 即表示属性 rel 为 xx 的 link，其代码类似：

```
<link rel="xx" ...>
```

### 超链接类 link 标签

超链接型 link 标签是一种**被动型链接**，在用户不操作的情况下，它们不会被主动下载。

link 标签具有特定的 rel 属性，会成为特定类型的 link 标签。产生超链接的 link 标签包括：具有 rel=“canonical” 的 link、具有 rel="alternate"的 link、具有 rel=“prev” rel="next"的 link 等等。

#### canonical 型 link

```
<link rel="canonical" href="...">
```

这个标签**提示页面它的主 URL**，在网站中常常有多个 URL 指向同一页面的情况，搜索引擎访问这类页面时会去掉重复的页面，这个 link 会提示搜索引擎保留哪一个 URL。

#### alternate 型 link

```
<link rel="alternate" href="...">
```

这个标签**提示页面它的变形形式**，这个所谓的变形可能是当前页面内容的不同格式、不同语言或者为不同的设备设计的版本，这种 link 通常也是提供给搜索引擎来使用的。

alternate 型的 link 的一个典型应用场景是，页面提供 rss 订阅时，可以用这样的 link 来引入：

```
<link rel="alternate" type="application/rss+xml" title="RSS" href="...">
```

除了搜索引擎外，很多浏览器插件都能识别这样的 link。

#### prev 型 link 和 next 型 link

在互联网应用中，很多网页都属于一个**序列**，比如分页浏览的场景，或者图片展示的场景，每个网页是序列中的一个项。

这种时候，就适合使用 **prev** 和 **next** 型的 link 标签，来**告诉搜索引擎或者浏览器它的前一项和后一项**，这有助于页面的批量展示。

因为 next 型 link 告诉浏览器“这是很可能访问的下一个页面”，HTML 标准还建议对 next 型 link 做预处理。

#### 其它超链接类的 link

其它超链接类 link 标签都表示一个跟当前文档相关联的信息，可以把这样的 link 标签视为一种带链接功能的 meta 标签。

- rel=“author” 链接到本页面的作者，一般是 mailto: 协议
- rel=“help” 链接到本页面的帮助页
- rel=“license” 链接到本页面的版权信息页
- rel=“search” 链接到本页面的搜索页面（一般是站内提供搜索时使用）

### 外部资源类 link 标签

外部资源型 link 标签**会被主动下载**，并且根据 rel 类型做不同的处理。

外部资源型的标签包括：具有 icon 型的 link、预处理类 link、modulepreload 型的 link、stylesheet、pingback。

#### icon 型 link

这类链接表示页面的 icon。多数浏览器会读取 icon 型 link，并且把页面的 icon 展示出来。

icon 型 link 是唯一一个外部资源类的元信息 link，其它元信息类 link 都是超链接，这意味着，icon 型 link 中的图标地址默认会被浏览器下载和使用。

如果没有指定这样的 link，多数浏览器会使用域名根目录下的 favicon.ico，即使它并不存在。所以从性能的角度考虑，建议一定要保证页面中有 icon 型的 link。

只有 icon 型 link 有有效的 sizes 属性，HTML 标准允许一个页面出现多个 icon 型 link，并且用 sizes 指定它适合的 icon 尺寸。

```
lt;link rel="shortcut icon" href="/static/images/icon.jpg" type="image/x-icon" sizes="16x16">
```

#### 预处理类 link

导航到一个网站需要经过 dns 查询域名、建立连接、传输数据、加载进内存和渲染等一系列的步骤。

预处理类 link 标签就是允许我们控制浏览器，提前针对一些资源去做这些操作，以提高性能（当然如果你乱用的话，性能反而更差）。

这些link 类型：

- dns-prefetch 型 link：提前对一个域名做 dns 查询，这样的 link 里面的 href 实际上只有域名有意义。
- preconnect 型 link：提前对一个服务器建立 tcp 连接。
- prefetch 型 link：提前取 href 指定的 url 的内容。
- preload 型 link：提前加载 href 指定的 url。
- prerender 型 link：提前渲染 href 指定的 url。

#### modulepreload 型的 link

modulepreload 型 link 的作用是**预先加载一个 JavaScript 的模块**。这可以保证 JS 模块不必等到执行时才加载。这里的加载，是指完成下载并放入内存，并不会执行对应的 JavaScript。

```
<link rel="modulepreload" href="app.js">
<link rel="modulepreload" href="helpers.js">
<link rel="modulepreload" href="irc.js">
<link rel="modulepreload" href="fog-machine.js">
<script type="module" src="app.js">
```

假设 app.js 中有 import “irc” 和 import “fog-machine”, 而 irc.js 中有 import “helpers”。

这段代码使用 moduleload 型 link 来**预加载了四个 js 模块**。尽管，单独使用 script 标签引用 app.js 也可以正常工作，但是我们通过加入对四个 JS 文件的 link 标签，使得四个 JS 文件有机会被并行地下载，这样提高了性能。

#### stylesheet 型 link

样式表大概是所有人最熟悉的 link 标签用法了。

```
<link rel="stylesheet" href="xxx.css" type="text/css">
```

基本用法是从一个 CSS 文件创建一个样式表。这里 type 属性可以没有，如果有，必须是"text/css"才会生效。

#### pingback 型 link

这样的 link 表示本网页被引用时，应该使用的 pingback 地址，这个机制是一份独立的标准，遵守 pingback 协议的网站在引用本页面时，会向这个 pingback url 发送一个消息。

### a 标签

a 标签是“anchor”的缩写，它是锚点的意思。锚点，实际上也是一种比喻的用法，古代船舶用锚来固定自己的位置，避免停泊时被海浪冲走，所以 anchor 标签的意思也是**标识文档中的特定位置**。

a 标签其实同时充当了链接和目标点的角色，当 a 标签有 href 属性时，它是链接，当它有 name 时，它是链接的目标。

具有 href 的 a 标签跟一些 link 一样，会产生超链接，也就是在用户不操作的情况下，它们不会被主动下载的被动型链接。

重点的内容是，a 标签也可以有 rel 属性，首先是**跟 link 相同的一些 rel**，包括下面的几种。

- alternate
- author
- help
- license
- next
- prev
- search

这些跟 link 语义完全一致，不同的是，a 标签产生的链接是会实际显示在网页中的，而 link 标签仅仅是元信息。

除了这些之外，a 标签**独有的 rel 类型**：

- tag 表示本网页所属的标签；
- bookmark 到上级章节的链接。

a 标签还有一些**辅助的 rel 类型**，用于提示浏览器或者搜索引擎做一些处理：

- nofollow 此链接不会被搜索引擎索引；
- noopener 此链接打开的网页无法使用 opener 来获得当前页面的窗口；
- noreferrer 此链接打开的网页无法使用 referrer 来获得当前页面的 url；
- opener 打开的网页可以使用 window.opener 来访问当前页面的 window 对象，这是 a 标签的默认行为。

a 标签基本解决了在页面中插入文字型和整张图片超链接的需要，但是如果我们想要在**图片的某个区域产生超链接**，那么就要用到另一种标签了——area 标签。

### area 标签

area 标签与 a 标签非常相似，不同的是，它**不是文本型的链接，而是区域型的链接**。area 标签支持的 rel 与 a **完全一样**，这里就不多说了。

area 是整个 html 规则中唯一支持非矩形热区的标签，它的 shape 属性支持三种类型。

- 圆形：circle 或者 circ，coords 支持三个值，分别表示中心点的 x,y 坐标和圆形半径 r。
- 矩形：rect 或者 rectangle，coords 支持两个值，分别表示两个对角顶点 x1，y1 和 x2，y2。
- 多边形：poly 或者 polygon，coords 至少包括 6 个值，表示多边形的各个顶点。

因为 area 设计的时间较早，所以不支持含有各种曲线的路径，但是它也是唯一一个支持了非矩形触发区域的元素，所以，对于一些效果而言，area 是必不可少的。

area 必须跟 img 和 map 标签配合使用。示例如下：

```
<p>
 Please select a shape:
 <img src="shapes.png" usemap="#shapes"
      alt="Four shapes are available: a red hollow box, a green circle, a blue triangle, and a yellow four-pointed star.">
  <!-- usemap="#shapes"与map中的name对应 -->
 <map name="shapes">
  <area shape=rect coords="50,50,100,100"> <!-- the hole in the red box -->
  <area shape=rect coords="25,25,125,125" href="red.html" alt="Red box.">
  <area shape=circle coords="200,75,50" href="green.html" alt="Green circle.">
  <area shape=poly coords="325,25,262,125,388,125" href="blue.html" alt="Blue triangle.">
  <area shape=poly coords="450,25,435,60,400,75,435,90,450,125,465,90,500,75,465,60"
        href="yellow.html" alt="Yellow star.">
 </map>
</p>
```

这个例子展示了在一张图片上画热区并且产生链接，分别使用了矩形、圆形和多边形三种 area。

## 5.CSS的正常流

### 正常流的行为

**我们可以用一句话来描述正常流的排版行为，那就是：依次排列，排不下了换行。**

理解了正常流的基本概念，剩下的功能只需要在它的基础上延伸一下就好。

在正常流基础上，我们有 **float** 相关规则，使得一些盒占据了正常流需要的空间，我们可以把 float 理解为“**文字环绕**”。

![img](https://static001.geekbang.org/resource/image/af/65/aff7250eac6064158021aea86dd4ac65.png)

还有 **vertical-align** 相关规则规定了如何在垂直方向对齐盒。看起来复杂，但是实际上，基线、文字顶 / 底、行顶 / 底都是我们正常书写文字时需要用到的概念。

下图展示了在不同的 vertical-align 设置时，盒与文字是如何混合排版的。

![img](https://static001.geekbang.org/resource/image/aa/e3/aa6611b00f71f606493f165294410ee3.png)

除此之外，我们可以把 **margin** 理解为“**一个元素规定了自身周围至少需要的空间**”。

### 正常流的原理

在 CSS 标准中，规定了如何排布每一个文字或者盒的算法，这个算法依赖一个排版的“**当前状态**”，CSS 把这个当前状态称为“**格式化上下文**”。

我们可以认为排版过程是这样的：

\> 格式化上下文 + 盒 / 文字 = 位置

我们需要排版的盒，是分为**块级盒**和**行内级盒**的，所以排版需要分别为它们规定了**块级格式化上下文**和**行内级格式化上下文**。

块级格式化上下文顺次排列元素：

![img](https://static001.geekbang.org/resource/image/a5/e7/a5e1b9a77d9745499f96d25cf0a0dbe7.png)

行内级格式化上下文顺次排列元素：

![img](https://static001.geekbang.org/resource/image/1c/cf/1ced4fa809b30343df45e559cf0c08cf.png)

当我们要把正常流中的一个盒或者文字排版，需要分成三种情况处理。

- **当遇到块级盒**：排入块级格式化上下文。
- **当遇到行内级盒或者文字**：首先尝试排入行内级格式化上下文，如果排不下，那么创建一个行盒，先将行盒排版（行盒是块级，所以到第一种情况），行盒会创建一个行内级格式化上下文。
- **遇到 float 盒**：把盒的顶部跟当前行内级上下文上边缘对齐，然后根据 float 的方向把盒的对应边缘对到块级格式化上下文的边缘，之后重排当前行盒。

我们以上讲的都是一个块级格式化上下文中的排版规则，实际上，页面中的布局没有那么简单，一些元素**会在其内部创建新的块级格式化上下文**，这些元素有：

1. 浮动元素；
2. 绝对定位元素；
3. 非块级但仍能包含块级元素的容器（如 inline-blocks, table-cells, table-captions）；
4. 块级的、能包含块级元素的容器，且属性 overflow 不为 visible。

最后一条理解：自身为块级，且 overflow 为 visible 的块级元素容器，它的块级格式化上下文和外部的块级格式化上下文发生了融合，也就是说，如果不考虑盒模型相关的属性，这样的元素从排版的角度就好像根本不存在。

### 正常流的使用技巧

### 等分布局问题

横向等分布局是一个很常见的需求，按照一般的思路，我们可以使用百分比宽度来解决。

```
<div class="outer">
    <div class="inner"></div>
    <div class="inner"></div>
    <div class="inner"></div>
</div>
.inner {
    width:33.33%;
    height:300px;
    display:inline-block;
    outline:solid 1px blue;
}
```

放了三个 div，用 CSS 给它们指定了百分比宽度，并且指定为 inline-block。

但是这段代码执行之后，效果跟预期不同，可以发现，**每个 div 并非紧挨，中间有空白**，这是因为我们为了代码格式加入的换行和空格被 HTML 当作空格文本，跟 inline 盒混排了的缘故。

解决方案是修改 HTML 代码，去掉空格和换行：

```
<div class="outer"><div class="inner"></div><div class="inner"></div><div class="inner"></div></div>
```

但是这样做影响了源代码的可读性，一个变通的方案是，**改变 outer 中的字号为 0**。

```
.inner {
    width:33.33%;
    height:300px;
    display:inline-block;
    outline:solid 1px blue;
    font-size:30px;
}
.outer {
    font-size:0;
}
```

在某些浏览器中，因为像素计算精度问题，还是会出现换行，我们**给 outer 添加一个特定宽度**：

```
.inner {
    width:33.33%;
    height:300px;
    display:inline-block;
    outline:solid 1px blue;
}
.outer {
    width:101px
}
```

这个代码在某些旧版本浏览器中会出现换行。为了保险起见，我们**给最后一个 div 加上一个负的右 margin**：

```
.outer {
    width:101px
}

.inner {
    width:33.33%;
    height:300px;
    display:inline-block;
    outline:solid 1px blue;
}

.inner:last-child {
    margin-right:-10px;
}
```

这样就可以解决旧版本浏览器的问题了。除了使用 inline-block，float 也可以实现类似的效果，但是 float 元素只能做顶对齐，不如 inline-block 灵活。

### 自适应宽

```
<div class="outer">
    <div class="fixed"></div>
    <div class="auto"></div>
</div>
.fixed {
    width:200px;
}
.fixed, .auto {
    height:300px;
    outline:solid 1px blue;
}
```

这里 fixed 这个 div 宽度已经被指定好，我们需要添加 css 代码尝试让.auto 填满剩余宽度。

使用正常流解决这个问题的思路是，利用负 margin：

```
.fixed {
    display:inline-block;
    vertical-align:top;
}
.auto {
    margin-left:-200px;
    width:100%;
    display:inline-block;
    vertical-align:top;
}
```

但是，这样做会导致 auto 中的内容位置不对，所以我们还需要使用 padding 把内容挤出来，最终完整代码如下：

```
<div class="outer">
<div class="fixed">123</div>
<div class="auto">456</div>
</div>
.outer {
  font-size: 0;
}

body {
  display: block;
  margin: 0px;
}

.fixed {
  width: 200px;
}

.fixed,
.auto {
  height: 100px;
  outline: solid 1px blue;
  color: black;
  font-size: 20px;
}

.fixed {
  display: inline-block;
  vertical-align: top;
  background-color: aqua;
  transform: translateZ(1px);
}

.auto {
  background-color: salmon;
  margin-left: -200px;
  padding-left: 200px;
  box-sizing: border-box;
  width: 100%;
  display: inline-block;
  vertical-align: top;

}
```

这样就给 auto 添加了 padding-left 和 box-sizing 两个属性。

总的来说，正常流布局主要是使用 inline-block 来作为内容的容器，利用块级格式化上下文的纵向排布和行内级格式化上下文的横向排布来完成布局的，我们需要根据需求的横向和纵向排布要求，来选择元素的 display 属性。

## 6.替换型元素

替换型元素是把文件的内容引入，替换掉自身位置的一类标签。

### script

script 标签是为数不多的既可以作为替换型标签，又可以不作为替换型标签的元素。

script 标签的两种用法：

```
<script type="text/javascript">
console.log("Hello world!");
</script>

<script type="text/javascript" src="my.js"></script>
```

一种是**直接把脚本代码写在 script 标签之间**，另一种是**把代码放到独立的 js 文件中，用 src 属性引入**。

这两种写法是等效的。这种等效性可以帮助理解替换型元素的“替换”是怎么一回事。

凡是`替换型元素`，都是**使用 src 属性来引用文件的**，而`链接型元素`是**使用 href 标签的**。

style 标签并非替换型元素，不能使用 src 属性，这样，我们用 link 标签引入 CSS 文件，当然就是用 href 标签啦。

### img

我们最熟悉的替换型标签就是 img 标签。img 标签的作用是引入一张图片。这个标签是没有办法像 script 标签那样作为非替换型标签来使用的，它必须有 src 属性才有意义。

如果一定不想要引入独立文件，可以使用 data uri，例子：

```
<img src='data:image/svg+xml;charset=utf8,<svg version="1.1" xmlns="http://www.w3.org/2000/svg"><rect width="300" height="100" style="fill:rgb(0,0,255);stroke-width:1;stroke:rgb(0,0,0)"/></svg>'/>
```

这个例子中我们使用了 data uri 作为图片的 src，这样，并没有产生独立的文件，客观上做到了和内联相同的结果，这是一个常用的技巧。

img 标签可以使用 width 和 height 指定宽度和高度。也可以只指定其中之一。例子：

```
<img src='data:image/svg+xml;charset=utf8,<svg width="600" height="400" version="1.1"
xmlns="http://www.w3.org/2000/svg"><ellipse cx="300" cy="150" rx="200" ry="80"
style="fill:rgb(200,100,50);
stroke:rgb(0,0,100);stroke-width:2"/></svg>' width="100"/>
```

这个例子中，图片换成了椭圆。可以看到，当指定了宽度后，图片被**等比例缩放**了。这个特性非常重要，适用于那种我们既要限制图片尺寸，又要保持图片比例的场景。

如果从性能的角度考虑，建议你同时给出图片的宽高，因为替换型元素加载完文件后，如果尺寸发生变换，会触发重排版。

此处要重点提到一个属性，**alt 属性**，这个属性很难被普通用户感知，对于视障用户非常重要，可以毫不夸张地讲，给 img 加上 alt 属性，已经做完了可访问性的一半。

img 标签还有一组重要的属性，那就是 **srcset** 和 **sizes**，它们是 src 属性的升级版。

这两个属性的作用是在不同的屏幕大小和特性下，使用不同的图片源。

```
<img srcset="elva-fairy-320w.jpg 320w,
             elva-fairy-480w.jpg 480w,
             elva-fairy-800w.jpg 800w"
     sizes="(max-width: 320px) 280px,
            (max-width: 480px) 440px,
            800px"
     src="elva-fairy-800w.jpg" alt="Elva dressed as a fairy">
```

srcset 提供了根据屏幕条件选取图片的能力，但是其实更好的做法，是使用 picture 元素。

### picture

picture 元素可以**根据屏幕的条件为其中的 img 元素提供不同的源**，它的基本用法如下：

```
<picture>
  <source srcset="image-wide.png" media="(min-width: 600px)">
  <img src="image-narrow.png">
</picture>
```

picture 元素的设计跟 audio 和 video 保持了一致，它跟 img 搭配 srcset 和 sizes 不同，它使用 **source** 元素来指定图片源，并且支持多个。这里的 **media** 属性是 media query，跟 CSS 的 @media 规则一致。

### video

下面例子是一个古典的 video 用法：

```
<video controls="controls" src="movie.ogg">
</video>
```

这个例子中的代码用 src 来指定视频的源文件。但是因为一些历史原因，浏览器对视频的编码格式兼容问题分成了几个派系，这样，对于一些兼容性要求高的网站，我们使用单一的视频格式是不合适的。

现在的 video 标签可以使用 source 标签来指定接入多个视频源。

```
<video controls="controls" >
  <source src="movie.webm" type="video/webm" >
  <source src="movie.ogg" type="video/ogg" >
  <source src="movie.mp4" type="video/mp4">
  You browser does not support video.
</video>
```

从这个例子中，我们可以看到，source 标签除了支持 media 之外，还可以使用 type 来区分源文件的使用场景。video 标签的内容默认会被当做不支持 video 的浏览器显示的内容。

video 中还支持一种标签：track。

**track** 是一种**播放时序相关的标签**，它最常见的用途就是字幕。track 标签中，必须使用 srclang 来指定语言，此外，track 具有 kind 属性，共有五种。

- subtitles：就是字幕了，不一定是翻译，也可能是补充性说明。
- captions：报幕内容，可能包含演职员表等元信息，适合听障人士或者没有打开声音的人了解音频内容。
- descriptions：视频描述信息，适合视障人士或者没有视频播放功能的终端打开视频时了解视频内容。
- chapters：用于浏览音视频内容。
- metadata：给代码提供的元信息，对普通用户不可见。

一个完整的 video 标签可能会包含多种 track 和多个 source，这些共同构成了一个视频播放所需的全部信息。

### audio

```
<audio controls>
  <source src="song.mp3" type="audio/mpeg">
  <source src="song.ogg" type="audio/ogg">
  <p>You browser does not support audio.</p>
</audio>
```

### iframe

最后我们来讲一下 iframe，这个标签能够嵌入一个完整的网页。

不过，在移动端，iframe 受到了相当多的限制，它无法指定大小，里面的内容会被完全平铺到父级页面上。

同时很多网页也会通过 http 协议头禁止自己被放入 iframe 中。

iframe 标签也是各种安全问题的重灾区。opener、window.name、甚至 css 的 opacity 都是黑客可以利用的漏洞。

因此，目前任何情况下都不推荐在实际开发中用以前的 iframe。

```
<iframe src="http://time.geekbang.org"></iframe>
```

在新标准中，为 iframe 加入了 `sandbox` 模式和 `srcdoc` 属性，这样，给 iframe 带来了一定的新场景。例子：

```
<iframe sandbox srcdoc="<p>Yeah, you can see it <a href="/gallery?mode=cover&amp;page=1">in my gallery</a>."></iframe>
```

这个例子中，使用 srcdoc 属性创建了一个新的文档，嵌入在 iframe 中展示，并且使用了 sandbox 来隔离。这样，这个 iframe 就不涉及任何跨域问题了。

## 7.CSS 水平垂直居中

```
<div class="parent">
    <div class="child"></div>
</div>

.parent {
    width: 300px;
    height: 300px;
    background-color:blue;
}
.child {
    width: 100px;
    height: 100px;
    background-color: red;
}
```

要实现的效果是让子元素在父元素中水平垂直居中。

![img](https://img-blog.csdnimg.cn/20200811153459793.png)

**仅适用于居中元素固定宽高**

- absolute + 负 margin
- absolute + margin auto
- absolute + calc

**居中元素不定宽高**

- flex
- grid
- absolute + transform
- line-height
- text-align + vertical-align + line-height
- text-align + vertical-align + table-cell
- writing-mode

### 一、absolute + 负 margin

**该方法适用于知道固定宽高的情况。**（父元素 parent 的 position 设置为 relative，否则 child 的 absolute 无效）

```
.parent {
    position: relative;
}
.child {
    position: absolute;
    top: 50%;
    left: 50%;
    margin-top: -50px; /* -16.6% */
    margin-left: -50px; /* -16.6% */
}
```

利用绝对定位使元素 `top: 50%; left: 50%;` 时，是以左上角为原点定位，所以实现的是**子元素的左上角**为原点处于父元素的中心位置，因为元素自身有一定的高度和宽度，所以元素本身并不居中。

所以，还需要设置 margin-top/margin-left 的值为 child 长/宽一半的负值。或者还可以设为百分比 `-(50px/300px)%` 即 16.6%

### 二、absolute + calc

**该方法适用于知道固定宽高的情况。**

与上面的原理差不多。

```
.parent {
    position: relative;
}
.child {
    position: absolute;
    top: calc(50% - 50px);
    left: calc(50% - 50px);
}
```

> 50px 还可以 写为 16.6%

### 三、absolute + margin auto

**该方法适用于知道固定宽高的情况。**

```
.parent {
    position: relative;
}
.child {
    position: absolute;
    margin: auto;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
}
```

因为对于 absolute 元素来说，`left: 0;right: 0;top: 0;bottom: 0;` 可以实现全屏拉伸，如果同时设置 left 和 right 会水平拉伸，同时设置 top 和 bottom 会垂直拉伸。但由于此时设置了 height/width 为固定值，所以在 `margin: auto` 的情况下，会自动平均分配四周的剩余空间。

### 四、flex 布局

```
.parent {
    display: flex;
    justify-content: center;
    align-items: center;
}
```

`justify-content`：定义项目在主轴（水平）上的对齐方式。

`align-items`：定义项目在交叉轴（垂直）上的对齐方式。

或者：

```
.parent {
      display: flex;
}
.child {
    margin: auto;
}
```

> `margin: auto` 在伸缩盒中具有强大的功能。某个方向上定义为 “auto” 的 margin ，它会**计算平均分配这个方向上的剩余空间**，这样其他项目会被挤到其它位置。
>
> 使用了 `margin: auto` 的 flex 子项目，它们父元素设置的 justify-content 以及它们本身的 align-self 将不再生效。

### 五、Grid

```
.parent {
    display: grid;
}
.child {
    align-self: center;
    justify-self: center;
}
```

`justify-self`：设置单元格内容的水平位置，只作用于单个项目。

`align-self`：设置单元格内容的垂直位置，只作用于单个项目。

### 六、absolute + transform

```
.parent {
    position: relative;
}
.child {
    position: absolute;
    margin: auto;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%)
}
```

`transform: translate(-50%, -50%)` 的作用是：x轴（负方向），y轴（负方向）都移动**自身长宽**的 50%，以使其居于中心位置。

### 七、text-align + vertical-align

### 方法1 + line-height

```
.parent {
    text-align: center;
    line-height: 300px; /* 等于parent的height */
}
.child {
    display: inline-block;
    vertical-align: middle;
    line-height: initial; /* 这样child内的文字就不会超出跑到下面 */
}
```

**text-align：水平居中的属性**

**vertical-align：垂直居中属性**

水平居中：

在设置父元素具有 text-align: center 属性的基础上，必须设置子元素的 display: inline-block 或者 display: inline，即实现行内块的水平居中，否则，子元素右侧 margin 将占据一整行。

垂直居中：

line-height: 300px 设置了**父元素的行高**，此时子元素的基线在父元素居中。如果要实现子元素居中，只需要通过设置 vertical-align: middle 让子元素的**基线在子元素中垂直居中**。

但此时子元素的 line-height 默认为 inherit 继承了父元素的 300px，导致子元素中的文字会跑到下面。所以，需要设置 line-height 为 initial 或 normal。

### 方法2 + table-cell

```
.parent {
    display: table-cell;
    text-align: center;
    vertical-align: middle;
}
.child {
    display: inline-block;
}
```

垂直居中：

将 display 属性设置为 table-cell，**块元素转化为单元格**，然后加上 vertical-align: middle

### 八、writing-mode

```
.parent {
    writing-mode: vertical-lr;
    text-align: center;
}
.child {
    display: inline-block;
    writing-mode: horizontal-tb; /* 子元素文字水平方向 */
    margin: 0 calc(50% - 50px);
}
```

writing-mode 可以改变文档流的显示方式。

`vertical-lr`：垂直方向内内容从上到下，水平方向从左到右

`horizontal-tb`：水平方向自上而下的书写方式。即 left-right-top-bottom

margin: 0 calc(50% - 50px); 可以实现水平居中。

writing-mode: vertical-lr; 改变父元素的文档流向为垂直方向，text-align: center; 使得子元素垂直方向居中（同时需要设置 display: inline-block; 使得子元素为行内块元素）

但由于子元素继承了父元素的 `vertical-lr`，所以需要设置 writing-mode: horizontal-tb; 使得子元素中的文字水平方向。

### 参考

[CSS水平垂直居中回顾总结](https://juejin.im/post/6858826987688722446)



## H5布局和传统有什么不同？

所谓H5布局，说简单点，就是用H5特有的新标签（语义化）来替代传统布局方式。几点注意如下：

1）css写法不变，比如你定义标签，那css里就要这样写header{}。另外，H5标签也是可以加class或id的，css写法没啥区别，比如，**.样式名{}  #样式名{}**；

2）移动端网站H5标签（包括css3）是支持的，放心大胆去弄，不要去考虑狗屁的兼容。如果是单纯PC网站，建议传统div方式布局比较合适；

3）响应式网站，技术强迫症，必须要用H5来做，那html5shiv.js或modernizr.js是不错的IE兼容解决方案。（比如李勇的小拼sem博客）。注意：ie8以下是没办法的，可以页面顶部弹出提醒升级你的IE，算友好体验的一部分吧。

4）bootstrap

**H5布局标签如何选择？**

个人理解

```markdown
全局：
<header><header>：相当于<div class="header"></div>

<footer></footer>：相当于<div class="footer"></div>

<section></section>：相当于<div></div>，以前习惯的div改为section，当然你继续用div也一样

<aside></aside>：相当于<div class="sidebar"></div>，比如常见的侧边栏
```

```markdown
导航或者分页：
<nav></nav>：相当于<div class="nav"><ul></ul></div>
```

```markdown
文章、帖子或者其它独立的页面：
<article></article>:相当于<div class="article"></div>

<time></time>：日期时间什么的放里面就好了，相当于<div class="time">2016-05-21 15:43:21</div>，支持pubdate属性，表示为发布日期

<summary></summary>：标签包含 details 元素的标题，”details” 元素用于描述有关文档或文档片段的详细信息。”summary” 元素应该是 “details” 元素的第一个子元素。
<details>
	<summary>HTML 5</summary>
	This document teaches you everything you have to learn about HTML 5.
</details>
```

```markdown
其它新标签：
<audio></audio>：标签定义声音，比如音乐或其他音频流。
<audio src="someaudio.wav">您的浏览器不支持 audio 标签。</audio>

<video></video>：标签定义视频，比如电影片段或其他视频流。
<video src="movie.ogg" controls="controls">您的浏览器不支持 video 标签。</video>

<source>：标签为媒介元素（比如 <video> 和 <audio>）定义媒介资源。
<audio controls>
	<source src="horse.ogg" type="audio/ogg">
	<source src="horse.mp3" type="audio/mpeg"> 
	Your browser does not support the audio element.
</audio>

<datalist></datalist>：标签定义可选数据的列表。与 input 元素配合使用，就可以制作出输入值的下拉列表。

<figure> 标签用于对元素进行组合。使用 <figcaption> 元素为元素组添加标题。
<figure>
	<figcaption>PRC</figcaption>
	<p>The People's Republic of China was born in 1949...</p>
</figure>（是不是类似dl dt dd）

<mark></mark>：主要用来在视觉上向用户呈现那些需要突出的文字。<mark>标签的一个比较典型的应用就是在搜索结果中向用户高亮显示搜索关键词。传统如<span></span>

<hgroup></hgroup>：标签用于对网页或区段（section）的标题进行组合。
```

H5还有很多新标签，一般你也用不着，H5布局只是引入了新的语义化标签，比如em、i、span、ul、li、p、pre这些常用的传统标签，一样可以在H5页面中正常使用。



## css伪元素

css的`伪元素`，之所以被称为伪元素，是因为他们不是真正的页面元素，html没有对应的元素，但是其所有用法和表现行为与真正的页面元素一样，可以对其使用诸如页面元素一样的css样式，表面上看上去貌似是页面的某些元素来展现，实际上是css样式展现的行为，因此被称为伪元素。如下图，是伪元素在html代码机构中的展现，可以看出无法伪元素的结构无法审查。

![img](http://segmentfault.com/img/bVb9y2)

css有一系列的伪元素，如:before，:after，:first-line，:first-letter等，本文就详述一下:before和:after元素的使用

### 一、伪元素:before和:after用法

这个两个伪元素在真正页面*元素内部*`之前`和`之后`添加新内容（当然了，可以对伪元素应用定位可以置于任何位置）。可以用以下例子来说明：

```html
<p>wonyun!</p>
<style>
    p:before{content: "hello "}
    p:after{content: "you are handsome!"}
</style>
```

上面例子从技术角度看，等价于下面的html结构：

```html
<p>
<span>hello </span>
wonyun!
<span> you are handsome!</span>
</p>
```

由此可知：**伪元素:before和:after添加的内容默认是`inline`元素**；这个两个伪元素的`content`属性，表示伪元素的内容,设置:before和:after时必须设置其`content`属性，否则伪元素就不起作用。那么问题来了，`content`属性的值可以有哪些内容呢，具体有以下几种情况：

- `字符串`，字符串作为伪元素的内容添加到主元素中

  > **注意**：字符串中若有html字符串，添加到主元素后不会进行html转义，也不会转化为真正的html内容显示，而是会原样输出

- `attr(attr_name)`, 伪元素的内容跟主元素的某个属性值进行关联，及其内容为主元素的某指定属性的值

  > **好处**：可以通过js动态改变主元素的指定属性值，这时伪元素的内容也会跟着改变，可以实现某些特殊效果，如图片加载失败用一段文字替换。

- `url()/uri()`, 引用外部资源，例如图片；

- `counter()`, 调用计数器，可以不使用列表元素实现序号问题。

------

### 二、:before和:after特点

上面说了，伪元素是通过样式来达到元素效果的，也就是说伪元素不占用dom元素节点，引用[:before,:after伪元素妙用](http://www.alloyteam.com/2015/04/beforeafter伪元素妙用/)里面总结的，:before和:after伪元素的主要特点如下：

- **伪元素不属于文档**，所以js无法操作它
- 伪元素属于主元素的一部分，因此**点击伪元素触发的是主元素的click事件**
- 原文说块级元素才能有:before, :after，其实是不妥的，大部分行级元素也可以设置伪元素，但是像img可替换元素，因为其外观和尺寸有外部资源决定，那么如果外部资源正确加载，就会替换掉其内部内容，这时伪元素也会被替换掉，但是当外部资源加载失败时，设置的伪元素是可以起作用的。

基于伪元素的特点可以知道其优缺点，也引用别人文章的话：

- 优点
  - 减少dom节点数
  - 让css帮助解决部分js问题，让问题变得简单
- 缺点
  - 不利于SEO
  - 无法审查元素，不利于调试

------

### 三、:before和:after常见使用场景

1. 清除浮动

```html
清除浮动是前端最常见的问题，有一种做法是使用一个空的页面元素如div来清除浮动，但是这种做法增加毫无语义的页面元素，而且占用dom节点。更可取的做法是利用伪元素来清除浮动：
<div class="l-form-row">
<div class="l-form-label"></div>
....
</div>
<style>
.l-form-row:after {
    clear: both;
    content: "\0020";
    display: block;
    height: 0;
    overflow: hidden
}
</style>
```

这样，class=l-form-row的元素内部任何浮动都能清除掉，不用额外添加无意义的元素。

1. 利用`attr()`来实现某些动态功能

在页面中常见这种问题，页面上加载的图片在无法加载时会显示一个破损图片，直接影响页面的美观；
![img](http://cdn2.w3cplus.com/cdn/farfuture/A2Bz5jXo1C3l2A3tc7h4QIkXhZ-eKXh8QjxO-f79fKQ/mtime:1468406046/sites/default/files/blogs/2016/1607/dirty-tricks3.png)

那么可以通过伪元素配合样式能够让未加载的图片看起来真的像破裂的效果，如下图所示：
![img](https://images2015.cnblogs.com/blog/408483/201608/408483-20160825213155866-395524514.png)

<img>是一个替换元素，其外观和尺寸是由外部资源来决定的，当外部图片资源加载失败时其会显示破裂图片和alt文字，尺寸仅由其自身内容决定。这时<img>元素可以使用伪元素:before和:after，因为其元素内容没有被替换；利用attr()来获取图片alt属性值作为伪元素:after的content内容来替换img的内容，并运用适当的样式从而完成：图片加载成功时显示正常的图片，加载失败时显示图片破裂效果的样式，具体代码参考：

```css
img{
  min-height: 50px;
 position: relative;
}
img:before: {
   content: " ";
   display: block;
  position: absolute;
  top: -10px;
  left: 0;
  height: calc(100% + 10px);
  width: 100%;
  backgound-color: rgb(230, 230,230);
  border: 2px dotted rgb(200,200,200);
  border-radius: 5px;
}
img: {
  content: '\f127" " Broken Image of " attr(alt);
  display: block;
  font-size: 16px;
  font-style: normal;
  font-family: FontAwesome;
  color: rgb(100,100,100)
  position: absolute;
  top: 5px;
  left: 0;
  width: 100%;
  text-align: center;
}
```

1. 与counter()结合实现序号问题，而不用使用列表元素。具体还要结合css的 counter-increment 和 counter-reset 属性的用法 。

代码如下：

```html
<h2></h2>
<h2></h2>
<style>
   body {counter-reset:section;}
   h2:before { 
   counter-increment: section; 
   content: "Chapter"  counter(section) ".";
   }
</style>
```

结果如下：
![img](https://images2015.cnblogs.com/blog/408483/201608/408483-20160825220412882-1283938733.png)

1. 特效使用

利用这两个伪元素，可以实现各种效果，如放大镜、叉叉、箭头、三角符等，也可轻易实现如下效果
![img](http://img1.dimpurr.com/dimblog/2013/10/6cc221614774e78add77d4e7a1171f591.gif)
代码实现如下：

```css
a {
  position: relative;
  display: inline-block;
  outline: none;
  text-decoration: none;
  color: #000;
  font-size: 32px;
  padding: 5px 10px;
}

a:hover::before,
a:hover::after {
  position: absolute;
}
a:hover::before {
  content: "\5B";
  left: -20px;
}
a:hover::after {
  content: "\5D";
  right: -20px;
}
```

![img](http://cdn2.w3cplus.com/cdn/farfuture/1To616umvPEkmTcTiE_2FeVW3MraP89IwuzpzV1Z4E0/mtime:1468406052/sites/default/files/blogs/2016/1607/dirty-tricks7.gif)

代码实现如下：

```css
table{overflow: hidden;}
td, th{
    padding: 10px;
    position: relative;
    outline: 0;
}
td:hover::after,
th:hover::after { 
      content: '';  
      background-color: lightblue;
      position: absolute;  
      left: 0;
      height: 10000px;
      top: -5000px;
      width: 100%;
      z-index: -1;
}

td:hover::before {
      background-color: lightblue;
      content: '';  
      height: 100%;
      top: 0;
      left: -5000px;
      position: absolute;  
      width: 10000px;
      z-index: -1;
}
```

具体代码：

```css
.empty__bg {
  display: inline-block;
  width: 95px;
  height: 92px;
  background: url(http://7tszky.com1.z0.glb.clouddn.com/FvD_sYY4Fmp_yKS0E07H-5jhuKTB) no-repeat;
  background-size: 95px 92px;
  position: relative;
  margin-bottom: 16px;/*注意这里需要留好位置放置after元素（它是absolute进去的）*/
}
.empty__bg:after {
  content: "暂无学习计划";
  display: block;
  font-size: 14px;
  line-height: 24px;
  text-align: center;
  width: 100%;
  color: #909090;
  position: absolute;
  top: 100%;
  left: 0;
}
```

上述可以实现`扩大可点击区域`，这对应手机用户来说更加友好一些，否则用户点击不会触发相应的事件；具体代码实现如下：

```css
.play-cover {position: relative}
.play-cover:before{
    content: "";
    display: block;
    position: absolute;
    width: 0;
    height: 0;
    border-left: 8px solid white;
    border-top: 5px solid transparent;
    border-bottom: 5px solid transparent;
    margin-left: 9px;
    margin-bottom: 7px;
    z-index: 5;
}
.play-cover:after{
    content: '';
    display: block;
    position: absolute;
    width: 20px;
    height: 20px;
    border: 2px solid white;
    background: rgba(0, 0, 0, .6);
    border-radius: 12px;
    background-clip: padding-box;
}
```

CSS美化radio和checkbox的样式[magic-check](http://forsigner.com/magic-check/)，就是利用伪元素:before和:after来实现的；
具体是为每个真正的表单元素radio和checkbox搭配一个label，然后隐藏真正的radio和checkbox，label元素单击的时候隐藏的radio或者checkbox实际上是处于checked状态，这跟label的具体用法有关；利用label的伪元素:before和:after来实现美化radio和checkbox。



下面是checkbox的美化的css代码：

```css
.magic-checkbox {
  position: absolute;
  display: none; //先隐藏真正的checkboxbox
}
.magic-checkbox + label {
  //为与checkbox搭配的label使用样式
  position: relative; //相对定位，方便其内容的伪元素进行定位
  display: block; //块元素
  padding-left: 30px;
  cursor: pointer;
  vertical-align: middle;
}
.magic-checkbox + label:before {
  //label添加:before伪元素，用于生成一个带边界的正方形，模拟复选框的轮廓
  position: absolute;
  top: 0;
  left: 0;
  display: inline-block;
  width: 20px;
  height: 20px;
  content: "";
  border: 1px solid #c0c0c0;
  border-radius: 3px;
}
//为checkbox添加:after伪元素，作用是生成一个√图形，模拟checkbox选中状态，未选中状态下会被隐藏
.magic-checkbox + label:after {
  top: 2px;
  left: 7px;
  box-sizing: border-box;
  width: 6px; //实现√图形很简单：设置一个长方形，去掉其上边界和左边界，剩下的2个边界旋转45度就得到√形状
  height: 12px;
  transform: rotate(45deg);
  border-width: 2px;
  border-style: solid;
  border-color: #fff;
  border-top: 0;
  border-left: 0;
  position: absolute;
  display: none; //√形状先隐藏
  content: "";
}
//单击label，隐藏的checkbox为checked状态，这时设置checked状态下搭配label的:before伪元素背景和边界颜色
.magic-checkbox:checked + label:before {
  animation-name: none;
  border: #3e97eb;
  background: #3e97eb;
}
//checked状态的checkbox搭配的label伪元素:after此时设置显示，那么√就显示出来了
.magic-checkbox:checked + label:after {
  display: block;
}

```

利用:before和:after能轻易实现美化的radio和checkbox





## box-sizing

全局设置 border-box 很好，更符合我们通常对一个「盒子」尺寸的认知。，其次它可以省去一次又一次的加加减减，它还有一个关键作用——让有边框的盒子正常使用百分比宽度。但是使用了 border-box 可能会与一些依赖默认 box-sizing 的库冲突，不过这种问题大多数时候可以通过把交由这些库处理的块的 box-sizing 设置回 content-box 来解决。

推荐写法是：

```
html {
  box-sizing: border-box;
}
*, *:before, *:after {
  box-sizing: inherit;
}
```

（出自 [Inheriting box-sizing Probably Slightly Better Best-Practice](https://link.zhihu.com/?target=http%3A//css-tricks.com/inheriting-box-sizing-probably-slightly-better-best-practice/)）
选择器 * 无法覆盖到伪元素，所以需要给 :before 和 :after 分别设置。而通过继承的方式应用到所有元素，需要时可以方便的将某个元素及其后代元素的 box-sizing 改成 content-box。

