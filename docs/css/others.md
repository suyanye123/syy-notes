# 其他

## 滚动条样式

```css
/* 滚动条 */
::-webkit-scrollbar {
  /* 纵向 */
  width: 8px;
  /* 横向 */
  height: 8px;
  background-color: #ededed;
}
/* 滚动条上的按钮(上下箭头) */
::-webkit-scrollbar-button {
  display: none;
}
/* 滚动条轨道 */
::-webkit-scrollbar-track {
  background-color: #ededed;
}
/* 滚动条轨道，没有滑块 */
::-webkit-scrollbar-track-piece {
  background-color: #ededed;
}
/* 垂直滚动条和水平滚动条交汇的部分 */
::-webkit-scrollbar-corner {
  background-color: #ededed;
}
/* 滚动条上的滚动滑块 */
::-webkit-scrollbar-thumb {
  border-radius: 10px;
  background-color: #d6d6d6;
}
/* 右下角拖动块 */
::-webkit-resizer {
  display: none;
}
```

[MDN](https://developer.mozilla.org/zh-CN/docs/Web/CSS/::-webkit-scrollbar)

## 模糊效果

#### 1.backdrop-filter

backdrop-filter可为一个元素**后面区域**添加图形效果（如模糊）

使用：添加伪元素对背景图进行模糊

```text
div{
  background:url("");
}
div:before{
 content: "";
 position: absolute;
 top: 0;
 left: 0;
 width: 100%;
 height: 100%;
 backdrop-filter: blur(10px); 
}
```

但因为其兼容性，一般不会用这个，毕竟支持的只有41%，移动端基本全军覆没。

#### 2.filter: blur()

filter与backdrop-filter的区别除了filter兼容性好太多外，主要的区别是 filter对元素自身产生效果，backdrop-filter对元素后面区域才有效果。

下面做backdrop-filter与filter模糊对比：红框为添加模糊属性的容器区域

![img](https://pic1.zhimg.com/80/v2-174e06b7d68368bfc80ff8483341b468_720w.jpg)原图

![img](https://pic2.zhimg.com/80/v2-ce3678cf06e3e1fd9b65e049afedc3d1_720w.jpg)backdrop-filter的效果 元素背后区域

![img](https://pic4.zhimg.com/80/v2-3030047271df5d9ded27825794c549df_720w.jpg)filter: blur(10px) 的效果 元素本身

这里比较匪夷所思的一点是 filter会对布局产生影响，这里表现为position:fixed的元素，上图多出的绿色的内容原本是固定在文档底部的内容，已脱离文档流，而使用模糊之后fixed失效。

filter可以满足大多数浏览器的效果，一般需要加前缀，对于ie低版本另外处理

```text
filter: blur(10px);
-webkit-filter: blur(10px); /* Chrome, Opera*/
-moz-filter: blur(10px);
-ms-filter: blur(10px);
filter: progid:DXImageTransform.Microsoft.Blur(PixelRadius='10'); /*IE6~IE9 */
```

#### 3.svg filter

svg提供filter容器做滤镜效果，它不能直接呈现，可以利用目标SVG元素上的filter属性引用一个滤镜，意思是<filter>不能直接出效果，必须引用到目标元素，比如<image>才可以

代码如下：

```html
<svg xmlns="http://www.w3.org/2000/svg"
    xmlns:xlink="http://www.w3.org/1999/xlink" class="wh100">
    <filter id="blur">
        <feGaussianBlur in="SourceGraphic" stdDeviation="10" />
    </filter>
    <image filter="url(#blur)" x="0" y="0" width="100%" height="100%" xlink:href="./xx.png" alt="">
</svg>
```

<image>上有属性filter="url(#blur)"，表示对<image>元素引用filter滤镜效果

svg filter支持度97%还是非常好的

#### 4.canvas

canvas的getImageData获取图像每个像素点的信息，使用特定算法对像素点信息转化也可以达到效果。

> **MDN：`CanvasRenderingContext2D.getImageData()`**返回一个`ImageData`对象，用来描述canvas区域隐含的像素数据，这个区域通过矩形表示，起始点为*(sx, sy)、*宽为*sw、*高为*sh。*

![img](https://pic1.zhimg.com/80/v2-efe50abcd54098211810a59737c01364_720w.jpg)

虽然其支持依然不高，但也可以作为折中的方案，对于不支持svg方案的浏览器或许对canvas的API支持（比如华为平板自带浏览器，刚好给碰上了）

使用：

html：.mask-wrap为需要模糊的容器，img做容器的背景图，canvas做滤镜效果

```html
    <div class="mask-wrap" >
      <img id="sourceImage" :src="imageUrl" alt="" srcset="">
      <canvas id="canvas" ></canvas>
    </div>
```

js：引入stackblur-canvas包，当img加载完后模糊处理

StackBlur ( sourceImageID, targetCanvasID, radius, blurAlphaChannel );

引用[张鑫旭的解释](https://link.zhihu.com/?target=https%3A//www.zhangxinxu.com/wordpress/2013/11/css-svg-image-blur/)：

> `sourceImageID`表示要模糊的图片的`id`, 默认这个图片要隐藏；
> `targetCanvasID`表示要显示模糊图片的`canvas`元素的`id`;
> `radius`表示模糊的半径大小。不过，根据我的对比测试，`radius`好像与CSS中filter滤镜的模糊值不是`1:1`匹配的，反倒是有些类似`2:1`. 也就是这里的`20px`的半径模糊近似于CSS中`blur`滤镜值设置为`10px`;
> `blurAlphaChannel`为布尔属性，表示`aplha`透明通道是否要模糊，`true`表示要模糊。

```js
      const StackBlur = require('stackblur-canvas');
      let sourceImage = document.querySelector('#sourceImage');
      sourceImage.onload = _ => {
        StackBlur.image('sourceImage', 'canvas', 30, true);
      };
```

需要注意的是：

1、使用svg和canvas做背景模糊会对图像拉伸变形，无法达到background-size:cover的效果

2、filter 与 svg兼容性不相上下，不是过于强硬的兼容低版本，filter是最好的，使用background可以自由切换background-size



### 半透明

```
//缺点是背景太花时，无法看清文字
body{
    background:url(...) 0/cover fixed;
}
div{
    background:hsla(0,0%,100%,.3);
}
```

![](https://i.loli.net/2021/07/09/PaG52fjn6eTmiAo.png)



### 毛玻璃