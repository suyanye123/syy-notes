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

