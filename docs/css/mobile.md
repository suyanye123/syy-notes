# 移动端适配

## 先来了解几个概念

**屏幕尺寸**：对角线的长度就是这个屏幕的尺寸。

### 像素

#### 设备像素

设备像素也可以叫**物理像素**。就是一个小方块，它具有特定的位置和颜色，作为图片或屏幕的最小组成单位。单位面积内的像素越多，图像的效果就越好。

注意：每个像素的大小是不固定的，他是根据设备的分辨率决定的。

#### 分辨率

通常我们所说的分辨率有两种，屏幕分辨率和图像分辨率。

屏幕（图像）分辨率：指一个屏幕（图片）具体由多少个像素点组成。

分辨率是 1242 x 2688，表示屏幕（图片）是由水平 1242 个像素，垂直 2688 个像素组成。分辨率高不代表屏幕（图片）就清晰，其清晰程度还与尺寸有关。

#### PPI

`PPI(Pixel Per Inch)`：每英寸包括的像素数。可以用于描述屏幕的清晰度以及一张图片的质量。`PI` 越高，质量越高.

由于手机尺寸为手机对角线的长度，通常使用如下的方法计算 `PPI`：

![img](https://img-blog.csdnimg.cn/2020080712344986.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQwNTA4ODMy,size_16,color_FFFFFF,t_70)

#### DPI

`DPI(Dot Per Inch)`：即每英寸包括的点数。这里的点是一个抽象的单位，它可以是屏幕像素点、图片像素点也可以是打印机的墨点。

DPI 包含 PPI：DPI 用来描述一切需要用点来构成的图像，PPI 是由像素点构成的电子图像。

#### 设备独立像素

上面描述的像素都是`物理像素`，即设备上真实的物理单元。而设备独立像素(Device Independent Pixels)简称 DIP 或 DP，是一种可以被程序所控制的虚拟像素。在 Web 开发中，缩放比例（scale）为1时，1设备独立像素就等于1 CSS像素（也称为逻辑像素）。

> ```
> 页面的缩放系数 = CSS像素 / 设备独立像素
> ```

写页面时如果还用物理像素单位：由于设备之间的分辨率不同，物理像素的值相同的情况下，分辨率越高的设备（相同尺寸上的物理像素越多），页面元素就会越小。所以就产生了设备独立像素，即一种用来同时告诉不同分辨率的手机，它们在界面上显示元素的大小是多少的单位。

> 比如，chrome 的开发者工具中模拟各个手机型号的显示情况，每种型号上面会显示一个尺寸，iPhone X 显示的尺寸是 375 x 812，实际 iPhone X 的分辨率会比这高很多，这里显示的就是设备独立像素。

#### 设备像素比（dpr）

设备像素比（device pixel ratio）简称 `dpr`，即设备像素和设备独立像素的比值。

> ```
> dpr = 设备的物理分辨率/(设备独立像素 * scale)
> ```

如果设备像素大于设备独立像素（DPR 大于1的设备，我们常说的高清屏/Retina屏），就会出现一个设备独立像素对应多个设备像素的情况：

![img](https://img-blog.csdnimg.cn/20200807123448990.png)

在 web 中，window.devicePixelRatio 用来获取 dpr。

在 css 中，可以使用媒体查询 min-device-pixel-ratio 来区分 dpr：

```
@media (min-device-pixel-ratio: 2){ }
```

在写 CSS 时，我们用到最多的单位是 `px`，即 `CSS像素`，当页面缩放比例为 100% 时，一个 CSS 像素等于一个设备独立像素。

但是 CSS 像素是很容易被改变的，当用户对浏览器进行了放大，CSS 像素也会被放大，这时一个 CSS 像素会跨越更多的物理像素。

`页面的缩放系数 = CSS像素 / 设备独立像素`。

> Retina 屏幕有可以让多个物理像素渲染一个独立像素的技术，可以使肉眼看不见单个物理像素点。不是所有 DPR > 1 的屏幕都是 Retina 屏幕。
>
> 高清屏就是屏幕的物理分辨率达到或超过 1920X1080（1080P）的屏幕。

### 视口

视口(viewport)，当前可见的计算机图形区域。在 Web 浏览器术语中，通常与浏览器窗口相同，但不包括浏览器的 UI， 菜单栏等。

一般我们所说的视口共包括三种：布局视口、视觉视口和理想视口，它们在屏幕适配中起着非常重要的作用。

#### 布局视口

布局视口(layout viewport)是在 html 元素之上的容器，我们的页面就“装”在布局视口中。

在 PC 浏览器上，布局视口就等于当前浏览器的窗口大小（不包括 borders、margins、滚动条）。

在移动端，布局视口被赋予一个默认值，一般在 768px ~ 1024px 间。这样网页的布局就不再受限于设备的尺寸， PC 的网页也可以在小屏幕的移动端设备中呈现，但是非常小，用户可以手动对网页进行放大。

我们可以通过调用 `document.documentElement.clientWidth / clientHeight` 来获取布局视口大小。

#### 视觉视口

视觉视口(visual viewport)是用户通过设备屏幕真实看到的区域，默认等于当前浏览器的窗口大小（包括滚动条宽度）。当用户对浏览器进行缩放时，不会改变布局视口的大小，所以页面布局是不变的，但是缩放会改变视觉视口的大小。

> 缩放改变的是 CSS 像素的大小，放大时 CSS 像素增大，则一个 CSS 像素可以跨越更多的物理像素，视觉视口会变小。
>
> 例如：用户将浏览器窗口放大了 200%，这时 CSS 像素也放大。假设屏幕上本来需要 200 个 CSS 像素才能占满屏幕，由于放大，现在只需要 100 个 CSS 像素就能占满，所以视觉视口的宽就变成 100px。

视觉视口的大小可以通过 `window.innerWidth / innerHeight` 获取。

布局视口会限制你的 CSS 布局，而视觉视口决定用户具体能看到什么。

![img](https://img-blog.csdnimg.cn/20200807123449168.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQwNTA4ODMy,size_16,color_FFFFFF,t_70)

#### 理想视口

布局视口在移动端展示的效果并不是一个理想的效果，所以产生了理想视口：网站页面在移动端展示的理想大小。

> 不理想的效果：我们在浏览一个没经过移动适配的网站时，由于布局视口在 768px ~ 1024px 之间，整个网站就“画”在一个这么大的“画布”上，但由于手机屏幕比“画布”小，所以需要经过缩小才能塞进手机屏幕，但里面的东西都变得很小，需要放大一下才能看得清。
>
> 假设现在画布跟屏幕一样大，就在这个画布上作画，效果就变得理想。

所以总结起来，**理想视口说白了就是理想的布局视口**，通过 `<meta name="viewport" content="width=device-width, initial-scale=1">` 来设置。

在 Chrome 浏览器开发者工具中调试移动端时，上面给定的像素大小 `375x812` 就是理想视口大小，它的单位正是设备独立像素。

`页面的缩放系数 = CSS像素 / 设备独立像素`，实际上说 `页面的缩放系数 = 理想视口宽度 / 视觉视口宽度` 更为准确。

所以，当页面缩放比例为 `100%` 时，`CSS像素 = 设备独立像素`，`理想视口 = 视觉视口`。

我们可以通过调用 `screen.width / height` 来获取理想视口大小。

### Meta viewport

<meta> 元素可提供有关页面的元信息，不会显示在页面上，可以用来告诉浏览器怎样解析页面。我们可以借助 <meta> 元素的 viewport 来帮助我们设置视口、缩放等，从而让移动端得到更好的展示效果。

首先 meta viewport 的设置格式是 `<meta name="viewport" content="name=value,name=value"`，其中 name 的值可设为：

1. width：将布局视口设置为固定的值，比如 375px 或者 device-width（设备宽度）
2. initial-scale：设置页面的初始缩放
3. minimum-scale：设置最小的缩小程度
4. maximum-scale：设置最大的放大程度
5. user-scalable：设置为 no 时禁用缩放，默认值为 yes

最常用的：

```
<meta name="viewport" content="width=device-width; initial-scale=1; maximum-scale=1; minimum-scale=1; user-scalable=no;">
```

#### 设置initial-scale的影响

根据公式`缩放系数 = 理想视口宽度 / 视觉视口宽度`，如果设置了 initial-scale 为 0.5，那么以 iPhone6 为例，设备宽度是 375px，即理想视口宽度也为 375px，所以视觉视口宽度 = 375px（理想视口宽度）/ 0.5（缩放系数）。很明显设置了 initial-scale 就相当于**初始化了视觉视口**，而且它会**将布局视口初始化为这个视觉视口的值**。

width 与 initial-scale 都会初始化布局视口，但浏览器会取其最大值。

## 移动端适配方案

### 1.媒体查询的方式

`meida queries` 的方式主要是通过查询设备的宽度来执行不同的 `css` 代码，最终达到界面的配置。核心语法是：

```
@media screen and (max-width: 600px) { /*当屏幕尺寸小于600px时，应用下面的CSS样式*/
  /*你的css代码*/
}
```

### 2.设置 viewport

1.通设置缩放，让 **CSS 像素等于真正的物理像素**。页面上所有的布局按照物理像素来写。

例如：当设备像素比为`3`时，我们将页面缩放`1/3`倍，这时`1px`等于一个真正的屏幕像素。

```
const scale = 1 / window.devicePixelRatio; // 缩放比例
const viewport = document.querySelector('meta[name="viewport"]');
if (!viewport) {
    viewport = document.createElement('meta');
    viewport.setAttribute('name', 'viewport');
    window.document.head.appendChild(viewport);
}
viewport.setAttribute('content', 'width=device-width,user-scalable=no,initial-scale=' + scale + ',maximum-scale=' + scale + ',minimum-scale=' + scale);
```

2.或者，以**设计图为基准**等比缩放布局视口从而适配。这样，可以直接将设计图量得的尺寸写到 css 上

```
const scale = window.screen.width / 750
```

缺点：太简单粗暴，viewport 的设置是影响全局的，然而还有一些不需要等比缩放，需要设置固定尺寸的地方。

### 3.动态 rem

px 是固定尺寸单位，rem 是相对单位，相对于 html 标签字体大小的单位。借助 rem 我们同样可以达到等比缩放的效果。

scale 为1，设计稿宽度为750，在2倍屏下设备宽度为 750 / 2 = 375。将设备宽度10等分，html 的 font-size 为 375 / 10 = 37.5，那么，1rem = 37.5px

**设置 rem：**

```
function setRem() {
  var screen = document.documentElement.clientWidth // 布局视口
  document.getElementsByTagName('html')[0].style.fontSize = screen / 10 + "px"
} 
```

之后可以使用less/sass自动将设计稿的px转换为rem。

### 4.vh、vw 方案

`vh、vw` 方案即将视觉视口宽度 `window.innerWidth` 和视觉视口高度 `window.innerHeight` 等分为 100 份。1 vw 就是视觉视口宽度的 1% 。

如果视觉视口为 375px，那么 1vw = 3.75px，这时 UI 给定一个元素的宽为 75px（设备独立像素），我们只需要将它设置为`75 / 3.75 = 20vw`。

我们可以通过配置`PostCSS`的 `postcss-px-to-viewport` 插件帮我们完成换算。写代码时，我们只需要根据 UI 给的设计图写 `px` 单位即可。

目前其[兼容性](https://caniuse.com/#feat=viewport-units)也比较好，是最推荐的方案。

## 经典问题

### 图片模糊

图片模糊问题：高清/Retina屏下图片会显示得比较模糊。

> 产生原因：dpr > 1的屏幕上，1像素横跨了多个物理像素，而位图图像需要1个像素点对应1个物理像素才清晰。
>
> 假设一张 100 x 100 的图片放在普通屏上看是清晰的，放到高清/Retina屏上就会显得比较模糊。那是因为本来 100 x 100 的图片在普通屏上图片像素与物理像素一一对应。而到了高清/Retina屏上一个图片像素却要对应多个物理像素，然而这些物理像素点并不能被准确的分配上对应位图像素的颜色，只能取近似值，这样一来看起来图片就比较模糊。

**解决方案**

对不同`DPR`的屏幕，展示不同分辨率的图片。如：在 `dpr = 2` 的屏幕上展示 200 x 200 的两倍图 (@2x)；在 `dpr = 3` 的屏幕上展示三倍图 `(@3x)`。

### 1px 边框

为了适配各种屏幕，我们写代码时一般使用设备独立像素来对页面进行布局。而在设备像素比 > 1的屏幕上，我们写的 1px 实际上是被多个物理像素渲染，这就会出现 1px 在有些屏幕上看起来很粗的现象。

![img](https://img-blog.csdnimg.cn/20200807123448943.png)

**解决方案**

1.transform + 伪类：(最推荐)

```
.border_1px:before{
  content: '';
  position: absolute;
  top: 0;
  height: 1px;
  width: 100%;
  background-color: #000;
  transform-origin: 50% 0%;
}
@media only screen and (-webkit-min-device-pixel-ratio:2){
  .border_1px:before{
      transform: scaleY(0.5);
  }
}
@media only screen and (-webkit-min-device-pixel-ratio:3){
  .border_1px:before{
      transform: scaleY(0.33);
  }
}
```

这种方式可以满足各种场景，如果需要满足圆角，只需要给伪类也加上`border-radius`即可。

2.基于 media 查询判断不同的设备像素比给定不同的 border-image 的 url。

3.类似的，根据 media 查询判断不同的设备像素比给定不同的 background-image 的 url，模拟在背景上。

上面两种都需要单独准备图片，而且圆角不是很好处理，但是可以应对大部分场景。

4.借助 PostCSS 的 postcss-write-svg 直接使用 border-image/background-image 创建 svg 的 1px 边框，不需要外部引入位图。

## 参考

[不要再问我移动适配的问题了](https://segmentfault.com/a/1190000017784801)

[关于移动端适配，你必须要知道的](https://segmentfault.com/a/1190000019207842)

[漫画形式：分辨率小科普](https://ac.qq.com/ComicView/index/id/536332/cid/254)