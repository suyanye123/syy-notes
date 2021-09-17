# Flex布局

## Flex 的设计

Flex 排版的核心是 display:flex 和 flex 属性，它们配合使用。具有 display:flex 的元素我们称为 flex 容器，它的子元素或者盒被称作 flex 项。

flex 项如果有 flex 属性，会根据 flex 方向代替宽 / 高属性，形成“填补剩余尺寸”的特性，这是一种典型的“根据外部容器决定内部尺寸”的思路，也是我们最常用的 Windows 和 Apple 窗口系统的设计思路。

## Flex 的原理

首先，Flex 布局支持**横向**和纵向，这样我们就需要做一个抽象，我们把 Flex 延伸的方向称为“**主轴**”，把跟它垂直的方向称为“**交叉轴**”。这样，flex 项中的 `width` 和 `height` 就会称为交叉轴尺寸或者主轴尺寸。

而 Flex 又支持**反向排布**，这样，我们又需要抽象出**交叉轴起点、交叉轴终点、主轴起点、主轴终点**，它们可能是 `top`、`left`、`bottom`、`right`。

Flex 布局中有一种特殊的情况，那就是 f**lex 容器没有被指定主轴尺寸**，这个时候，实际上 Flex 属性完全没有用了，所有 Flex 尺寸都可以被当做 0 来处理，Flex 容器的主轴尺寸等于其它所有 flex 项主轴尺寸之和。

## Flex 排版

Flex 排版三个步骤：分行、计算主轴、计算交叉轴。

**第一步把 flex 项分行，有 flex 属性的 flex 项可以暂且认为主轴尺寸为 0，所以，它可以一定放进当前行。**

接下来我们把 flex 项逐个放入行，不允许换行的话，我们就“无脑地”把 flex 项放进同一行。允许换行的话，我们就先设定主轴剩余空间为 Flex 容器主轴尺寸，每放入一个就把主轴剩余空间减掉它的主轴尺寸，直到某个 flex 项放不进去为止，换下一行，重复前面动作。

分行过程中，我们会顺便**对每一行计算两个属性**：交叉轴尺寸和主轴剩余空间，交叉轴尺寸是本行所有交叉轴尺寸的最大值，而主轴剩余空间前面已经说过。

**第二步计算每个 flex 项主轴尺寸和位置。**

如果 Flex 容器是不允许换行的，并且最后主轴尺寸超出了 Flex 容器，就要做等比缩放。

如果 Flex 容器有多行，那么根据我们前面的分行算法，必然有主轴剩余空间，这时候，我们要找出本行所有的带 Flex 属性的 flex 项，把剩余空间按 Flex 比例分给它们即可。

之后，我们就可以根据主轴排布方向，确定每个 flex 项的主轴位置坐标了。

如果本行**完全没有带 flex 属性的 flex 项**，**justify-content** 机制就要生效了，它有几个不同的值会影响剩余空白如何分配，作为实现者，我们只要在计算 flex 项坐标的时候，加上一个数值即可。

例如，如果 justify-content 是 flex-start 就要加到第一个 flex 项身上，如果是 center 就给第一个 flex 项加一半的尺寸，如果是 space-between，就要给除了第一个以外的每个 flex 项加上“（flex 项数减一）分之一”。

**第三步计算 flex 项的交叉轴尺寸和位置。**

交叉轴的计算首先是根据 align-content 计算每一行的位置，这部分跟 justify-content 非常类似。

再根据 alignItems 和 flex 项的 alignSelf 来确定每个元素在行内的位置。

计算完主轴和交叉轴，每个 flex 项的坐标、尺寸就都确定了，这样就完成了整个的 Flex 布局。

## Flex 的应用

### 垂直居中

```
<div id="parent">
  <div id="child"></div>
</div>

#parent {
  display: flex;
  width: 300px;
  height: 300px;
  outline: solid 1px;
  justify-content: center; //每一项在交叉轴的中点对齐
  align-items: center; //多跟轴线与交叉轴的中点对齐
}
#child {
  width: 100px;
  height: 100px;
  outline: solid 1px;
}
```

思路是创建一个只有一行的 flexbox，然后用 **align-items:center**; 和 **align-content:center;** 来保证行位于容器中，元素位于行中。两列等高：

### 两列等高

```
<div class="parent">
  <div class="child" style="height:300px;">
  </div>
  <div class="child">
  </div>
</div>
<br/>
<div class="parent">
  <div class="child" >
  </div>
  <div class="child" style="height:300px;">
  </div>
</div>

.parent {
  display:flex;
  width:300px;
  justify-content:center;
  align-content:center;
  align-items:stretch; //伸展
}
.child {
  width:100px;
  outline:solid 1px;
}
```

思路是创建一个只有一行的 flexbox，然后用 **stretch** 属性让每个元素高度都等于行高。

### 自适应宽

```
<div class="parent">
  <div class="child1">
  </div>
  <div class="child2">
  </div>
</div>

.parent {
  display:flex;
  width:300px;
  height:200px;
  background-color:pink;
}
.child1 {
  width:100px;
  background-color:lightblue;
}
.child2 {
  width:100px;
  flex:1; //自适应
  outline:solid 1px;
}
```

给要自适应的元素添加 **flex** 属性即可。

## flex布局


flex 布局非常好用，但在开发过程中可能会碰到的一些坑

##### 1、内容超出容器

大致情况是：在一个设置了 `display:flex` 布局的大容器 A 中并排放置两个子容器，并且子容器设置 flex:1，子容器中都有一个元素包含一段文本，这段文本设置了不换行并且显示省略号的样式，当文本过长的时候，子容器会被撑开，如下效果：

相关代码：

```vue
<view class='hot-content-box'>
<view wx:for="{{hotCollageList}}" 
      wx:key="hci" 
      class='hot-item-box' 
      data-goodsid="{{item.goodsId}}" 
      data-activityid="{{item.activityId}}" 
      bindtap="goodsDetail">
<image src='{{item.goodsPic}}' mode='widthFix'></image>
<view class='goods-name'>{{item.goodsName}}</view>
<view class="goods-num">{{item.rule.numLimit}}人团</view>
<view class="goods-price-box">
<view class="goods-act-price goods-line">¥{{item.actualPrice}}</view>
<view class="goods-price-txt goods-line">拼团价</view>
<view class="goods-org-price goods-line">¥{{item.goodsPrice}}</view>
</view>
</view>
</view>
.hot-content-box {
padding: 0 30rpx 30rpx;
background: #fff;
display: flex;
}

.hot-item-box {
padding: 20rpx;
box-shadow: inset 0 -1px 1px 1px rgba(228, 221, 221, 0.50);
border-radius: 8px;
flex: 1;
}
.hot-item-box:first-child{
margin-right: 30rpx;
}
.goods-name {
font-size: 18px;
color: #000;
letter-spacing: 0.72px;
line-height: 22px;
width: 100%;
overflow: hidden;
text-overflow: ellipsis;
white-space: nowrap;
}
```

这里的 `text-overflow: ellipsis`不生效，省略号没有出现，并且过长的文字将子容器撑开，问题可能出在于子容器没有设置宽度，省略符可能需要对父元素设置宽度，设置为 100%无效，当设置为 0 的时候，省略号出现了

```css
.hot-item-box {
padding: 20rpx;
box-shadow: inset 0 -1px 1px 1px rgba(228, 221, 221, 0.50);
border-radius: 8px;
flex: 1;
width: 0;
}
```

因为不设置宽度，子容器会被文本节点无限撑开，通过测试发现，设置子容器 `overflow:hidden` 也可以满足效果。

这里参考：https://blog.csdn.net/zgh0711/article/details/78270555

------

##### 2、设置了固定宽高的图片被压缩、挤压

通常实现如下的效果，是把外层容器设置为 `display:flex`，容器中图片设置固定宽高度，右边元素设置为 `flex:1`，但当右边元素宽度超出剩余空间的时候，图片会被挤压，变成椭圆形。

这是因为在 flex 容器中，当空间不够的时候，`flex-shrink` 不为 0 的元素会被压缩，所以解决的方法就是给图片设置：`flex-shrink:0`。

```css
.existCollages .row image {
width: 40px;
height: 40px;
border-radius: 50%;
margin-right: 8px;
flex-shrink: 0;/_防止被压缩_/
```

------



# Grid布局

> Grid布局的缺点：兼容性不太好

Grid 布局把网页划分为一个个网格，任意组合不同的网格

将容器划分为行和列，产生单元格，然后指定项目所在的单元格，可以看做是二维布局

## 基本概念

#### 容器和项目

采用网格布局的区域，称为容器，容器内采用网格定位的子元素，称为项目

```html
<div>	//容器
  <div><p>1</p></div> //项目
  <div><p>2</p></div>
  <div><p>3</p></div>
</div>
```

注意：项目只能是容器的顶层子元素，不包含自身的子元素，比如上面代码的<p>元素就不是项目，Grid布局只对项目生效

#### 行、列、单元格、网格线

行（row）和列（column）的交叉区域称为 单元格

划分网格的线，称为网格线，正常情况下 n行有n+1根水平网格线，m列有m+1根垂直网格线



#### 容器属性

定义在容器上面的属性

```js
display:grid	//指定容器采用网格布局
display:inline-grid		//默认情况下，容器元素都是块级元素，但也可以设为行内元素
```

```js
grid-template-columns:100px 100px 100px	//定义每一列的列宽
grid-template-rows:100px 100px 100px	//定义每一行的行宽，也可以使用百分比

grid-template-columns: repeat(3,33.33%)
//重复写同样的值很麻烦，这时可以使用repeat()函数，函数接受两个值，第一个是重复次数，第二个是索要重复的值
//reapet重复某种模式也是可以的，例如：
grid-template-columns: repeat(2,100px 20px 80px)
```

```css
//有时，单元格的大小是固定的，但是容器的大小不确定，如果希望每一行每一列可以容纳尽量多的单元格，这时可以使用auto-fill关键字
.container{
	display:grid;
	grid-template-columns:repeat(auto-fill,100px)
}
```

```js
//为了方便表示比例关系，网格布局提供了fr关键字(fraction 的缩写，意为片段)，如果两列的宽度分别为1fr和2fr，就表示后者是前者的两倍
grid-template-columns: 1fr 2fr;
//fr也可以与绝对长度的单位结合使用
grid-template-columns: 150px 1fr 2fr;
```

```js
//maxmin()函数产生一个长度范围，表示长度就在这个范围之中
grid-template-columns: 1fr 1fr minmax(100px,1fr)
```

```js
//auto关键字表示由浏览器自己决定长度
grid-template-columns: 100px auto 100px;
```



#### 网格线的名称

在`grid-template-columns`属性和`grid-template-rows`属性里面，还可以使用方括号，指定每一根网格线的名字，方便以后的引用。

```css
.container{
  display:grid;
  grid-template-rows: [c1] 100px [c2] 100px [c3] auto [c4];
  grid-template-columns: [r1] 100px [r2] 100px [r3] auto [r4];
}
```



#### 间距

```js
//row-gap属性设置行与行的间隔（行间距），columns-gap属性设置列与列的间隔（列间距）row-gap:20px;columns-gap:20px;//gap是行间距与列间距的简写gap:20px 20px;//gap如果省略了第二个值，则 默认第二个值等于第一个值gap:20px;
```



#### 区域

网格布局允许指定 ”区域“ ，一个区域由多个或单个单元格组成，`grid-template-areas`属性用于定义

```css
.container{	display:grid;  grid-template-rows: 100px 100px 100px;  grid-template-columns: 100px 100px 100px;  grid-template-areas:'a b c'    									'd e f'    									'g h i'}//上面代码先划分出9个单元格，然后将其定名为a到i的九个区域，分别对应这九个单元格。
```

也可以将多个单元格合并成一个区域 

```js
grid-template-areas:'header header header'    								'main main sidebar'    								'footer footer footer'
```

