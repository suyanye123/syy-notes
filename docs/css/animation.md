# 动画和交互动画和交互

在 CSS 属性中，有这么一类属性，它负责的不是静态的展现，而是根据用户行为产生交互。

CSS 中跟动画相关的属性有两个：`animation` `transition` 和 `transform`。

## animation 属性

```css
@keyframes mykf {
  from {background: red;}
  to {background: yellow;}
}

div {
  animation: mykf 5s infinite; //infinite表示无限播放
}
```

这里展示了 animation 的基本用法，主要分成8个部分：

- **animation-name 名称**(一个 keyframes 类型的值)；

- **animation-duration 持续时间**；

- **animation-timing-function 时间曲线**；

- **animation-delay 延迟时间**；

- **animation-iteration-count 播放次数**：

  可以设置有限次数，比如5，也可以设置无限次数，infinite

- **animation-direction 方向**：

  取值可以为：

  1）normal 正向播放（0%--100%）

  2) reverse 反向播放（100%--0%）

  3）alternate 奇数次正向播放，偶数次反向播放

  4）alternate-reverse 奇数次反向播放，偶数次正向播放

- **animation-fill-mode 填充模式** ：

  取值可以为：

  1）forwards 动画完成后，保持最后一个属性值（在最后一个关键帧中定义）

  2）backwards animation-delay 所指定的一段时间内，在动画显示之前，应用开始属性值（在第一个关键帧中定义）

- **animation-play-state 运行状态**：

  可以的取值为：

  1）running 动画运行

  2）paused 动画暂停

### animation-name

这个是一个 keyframes 类型，需要配合 @规则来使用。

keyframes 的主体结构是一个名称和花括号中的定义，它按照百分比来规定数值，例如：

```css
@keyframes mykf {
  0% { top: 0; }
  50% { top: 30px; }
  75% { top: 10px; }
  100% { top: 0; }
}
```

> 规定在开始时把 top 值设为 0，在 50% 是设为 30px，在 75% 时设为 10px，到 100% 时重新设为 0，这样，动画执行时就会按照我们指定的关键帧来变换数值。这里，0% 和 100% 可以写成 from 和 to，不过一般不会混用，画风会变得很奇怪。

### animation-fill-mode

动画结束之后，我们会立即从结束状态跳回到开始状态。如果想要动画保持结束的状态，我们需要使用`animation-fill-mode`属性。

可用值：

- `none`：默认值，回到动画没开始时的状态。
- `fowards`：让动画保持在结束的状态。
- `backwards`：让动画回到第一帧的状态。
- `both`：根据animation-direction轮流应用forwards和backwards规则。

### animation-play-state

用来设置动画的运行状态。

可以的取值为：

1）running 动画运行

2）paused 动画暂停

```css
div {
    animation: spin 1s linear infinite;
    animation-play-state: paused;
}

div:hover {
  animation-play-state: running;
}
```

## transition 属性

在 CSS 中使用该属性可对元素进行移动（translate）、旋转（rotate）、缩放（scale）、倾斜（skew）等效果。

它有四个部分：

- **transition-property 属性**：

  取值可以为：

  1）none 没有属性会获得过渡效果

  2）all 所有属性获得过渡效果

  3）property 指定获得过渡效果的属性名，多个用逗号隔开（如过渡属性是width）

- **transition-duration 持续时长**：

  默认为0，故不会有效果，就是从开始状态到结束状态的时间，单位是s

- **transition-timing-function 时间曲线**：

  取值可以为：

  1）ease 慢→快→慢

  2）linear 匀速

  3）ease-in 慢→快

  4）ease-out 快→慢

  5）ease-in-out 慢→快→慢

  6）cubic-bizier(n,n,n,n) 自己定义（0到1）的值，根据设置值的比例来分配

- **transition-delay 延迟**：就是动画开始前的一个延迟时间，单位为s

## transition 和 animation 组合

实际上，有时候我们会把 transition 和 animation 组合，抛弃 animation 的 timing-function，以编排不同段用不同的曲线。

```css
@keyframes mykf {
  0% { top: 0; transition: top ease }
  50% { top: 30px; transition: top ease-in }
  75% { top: 10px; transition: top ease-out }
  100% { top:0 transition: top linear }
}
```

## transform 属性

### 二维（2D）变换

#### translate

其语法为：`transform: translate(tx[, ty])`。其中 tx 表示 x 方向偏移，ty 表示 y 方向偏移，如果 ty 没有指定值则为0。

```
.box {
    transform: translate(50px, 30px);
}
```

注：tx，ty 如果为**百分比**值的话，其参考计算的是**元素本身的宽和高**，而不是父元素的宽和高。

所以经常使用该方法设置定位居中，如下：

```css
.demo {
  position: absolute;
  top: 50%; /* 父元素高度的一半位置 */
  left: 50%; /* 父元素宽度的一半位置 */
  transform: translate(-50%, -50%); /* 元素本身的一半宽、高 */
}
```

#### scale

其语法为：`transform: scale(sx[, sy])`。其中 sx 表示 x 方向的缩放比例，sy 表示 y 方向的缩放比例，如果 sy 没有指定值则与 sx 相等。

```css
.box {
  transform: scale(1.2);
}
```

#### rotate

其语法为：`transform: rotate(angle)`。angle 表示顺时针角度。

```css
.box {
  transform: rotate(15deg);
}
```

#### skew

其语法为：`transform: skew(ax[, ay])`。其中 ax 表示 x 方向的顺时针角度，ay 表示 y 方向的顺时针角度，如果 ay 没有指定值则 y 方向没有倾斜。

```css
.box {
    transform: skew(30deg);
}
```

### 复合变换

上面几个变换，都可以自由组合形成更复杂的复合变换。

```css
.box {
  transform: translate(30px);
  rotate(10deg) skew(0, 5deg);
}
```

### 变换中心点

默认上面所有的变换都是以元素的中心位置为参考原点的，不过我们可以通过属性 transform-origin 来改变参考原点。

其语法为：transform-origin: ox oy。其中 ox 表示 x 方向的位置，可使用 left、right、center、、，oy 表示 y 方向的位置，可使用top、bottom、center、、。如果只传入一个值，则另一个值默认为 50%

```css
.box {
    transform: rotate(15deg);
}
.box-origin-top-left {
    transform-origin: left top;
}
.box-origin-right {
    transform-origin: right; /* 设置一个值，则另一个为50% */
}
.box-origin-px {
    transform-origin: 200px 80%;
}
```

