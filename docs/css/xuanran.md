# **【转】小程序同层渲染原理剖析**

众所周知，小程序当中有一类特殊的内置组件——原生组件，这类组件有别于 WebView 渲染的内置组件，他们是交由原生客户端渲染的。

原生组件作为 Webview 的补充，为小程序带来了更丰富的特性和更高的性能，但同时由于脱离 Webview 渲染也给开发者带来了不小的困扰。

在小程序引入「同层渲染」之前，原生组件的层级总是最高，不受z-index属性的控制，无法与view、image等内置组件相互覆盖，cover-view和cover-image组件的出现一定程度上缓解了覆盖的问题，同时为了让原生组件能被嵌套在swiper、scroll-view等容器内，小程序在过去也推出了一些临时的解决方案。

但随着小程序生态的发展，开发者对原生组件的使用场景不断扩大，原生组件的这些问题也日趋显现，为了彻底解决原生组件带来的种种限制，我们对小程序原生组件进行了一次重构，引入了「同层渲染」。

相信已经有不少开发者已经在日常的小程序开发中使用了「同层渲染」的原生组件，那么究竟什么是「同层渲染」？它背后的实现原理是怎样的？它是解决原生组件限制的银弹吗？本文将会为你一一解答这些问题。

## 什么是「同层渲染」?

首先我们先来了解一下小程序原生组件的渲染原理。

我们知道，小程序的内容大多是渲染在 WebView 上的，如果把 WebView 看成单独的一层，那么由系统自带的这些原生组件则位于另一个更高的层级。

两个层级是完全独立的，因此无法简单地通过使用z-index控制原生组件和非原生组件之间的相对层级。

正如下图所示，非原生组件位于 WebView 层，而原生组件及cover-view与cover-image则位于另一个较高的层级：

![image](https://cdn.nlark.com/yuque/0/2021/jpeg/200416/1618973900051-592b6014-d470-46af-a867-5d83a86b321e.jpeg)

那么「同层渲染」顾名思义则是指通过一定的技术手段把原生组件直接渲染到 WebView 层级上，此时「原生组件层」已经不存在，原生组件此时已被直接挂载到 WebView 节点上。

你几乎可以像使用非原生组件一样去使用「同层渲染」的原生组件，比如使用view、image覆盖原生组件、使用z-index指定原生组件的层级、把原生组件放置在scroll-view、swiper、movable-view等容器内，通过WXSS设置原生组件的样式等等。

启用「同层渲染」之后的界面层级如下图所示：![image](https://cdn.nlark.com/yuque/0/2021/jpeg/200416/1618973899951-1e7ac9a3-ca97-428c-97fe-e9aaf75fbcd8.jpeg)

## 「同层渲染」原理

你一定也想知道「同层渲染」背后究竟采用了什么技术。

只有真正理解了「同层渲染」背后的机制，才能更高效地使用好这项能力。

实际上，小程序的同层渲染在 iOS 和 Android 平台下的实现不同，因此下面分成两部分来分别介绍两个平台的实现方案。

### iOS 端

小程序在 iOS 端使用 WKWebView 进行渲染的，

WKWebView 在内部采用的是分层的方式进行渲染，它会将 WebKit 内核生成的 Compositing Layer（合成层）渲染成 iOS 上的一个 WKCompositingView，这是一个客户端原生的 View，

不过可惜的是，内核一般会将多个 DOM 节点渲染到一个 Compositing Layer 上，因此合成层与 DOM 节点之间不存在一对一的映射关系。

不过我们发现，当把一个 DOM 节点的 CSS 属性设置为overflow: scroll（低版本需同时设置-webkit-overflow-scrolling: touch）之后，

WKWebView 会为其生成一个WKChildScrollView，与 DOM 节点存在映射关系，这是一个原生的UIScrollView的子类，

也就是说 WebView 里的滚动实际上是由真正的原生滚动组件来承载的。

WKWebView 这么做是为了可以让 iOS 上的 WebView 滚动有更流畅的体验。虽说WKChildScrollView也是原生组件，但 WebKit 内核已经处理了它与其他 DOM 节点之间的层级关系，因此你可以直接使用 WXSS 控制层级而不必担心遮挡的问题。

小程序 iOS 端的「同层渲染」也正是基于WKChildScrollView实现的，原生组件在 attached 之后会直接挂载到预先创建好的WKChildScrollView容器下，大致的流程如下：

1. 创建一个 DOM 节点并设置其 CSS 属性为overflow: scroll且-webkit-overflow-scrolling: touch；
2. 通知客户端查找到该 DOM 节点对应的原生WKChildScrollView组件；
3. 将原生组件挂载到该WKChildScrollView节点上作为其子 View。

![image](https://cdn.nlark.com/yuque/0/2021/jpeg/200416/1618973900073-903d680e-9fe7-41fb-bf32-4cdfd1362423.jpeg)

通过上述流程，小程序的原生组件就被插入到WKChildScrollView了，也即是在步骤1创建的那个 DOM 节点对应的原生 ScrollView 的子节点。此时，修改这个 DOM 节点的样式属性同样也会应用到原生组件上。因此，「同层渲染」的原生组件与普通的内置组件表现并无二致。

### Android 端

小程序在 Android 端采用 chromium 作为 WebView 渲染层，

与 iOS 不同的是，Android 端的 WebView 是单独进行渲染而不会在客户端生成类似 iOS 那样的 Compositing View (合成层)，经渲染后的 WebView 是一个完整的视图，因此需要采用其他的方案来实现「同层渲染」。

经过我们的调研发现，chromium 支持 WebPlugin 机制，WebPlugin 是浏览器内核的一个插件机制，主要用来解析和描述embed 标签。Android 端的同层渲染就是基于embed标签结合 chromium 内核扩展来实现的。

![image](https://cdn.nlark.com/yuque/0/2021/png/200416/1618973899993-2c78957f-f6af-4eca-b0c6-04f8dcb38b81.png)

Android 端「同层渲染」的大致流程如下:

1. WebView 侧创建一个embedDOM 节点并指定组件类型；
2. chromium 内核会创建一个WebPlugin实例，并生成一个RenderLayer；
3. Android 客户端初始化一个对应的原生组件；
4. Android 客户端将原生组件的画面绘制到步骤2创建的RenderLayer所绑定的SurfaceTexture上；
5. 通知 chromium 内核渲染该RenderLayer；
6. chromium 渲染该embed节点并上屏。

![image](https://cdn.nlark.com/yuque/0/2021/jpeg/200416/1618973899945-f1a76fa3-d9e0-4caf-9532-a80af5d1f687.jpeg?x-oss-process=image%2Fresize%2Cw_2400)

这样就实现了把一个原生组件渲染到 WebView 上，这个流程相当于给 WebView 添加了一个外置的插件，如果你有留意 Chrome 浏览器上的 pdf 预览，会发现实际上它也是基于<embed />标签实现的。

这种方式可以用于 map、video、canvas、camera 等原生组件的渲染，对于 input 和 textarea，采用的方案是直接对 chromium 的组件进行扩展，来支持一些 WebView 本身不具备的能力。

对比 iOS 端的实现，Android 端的「同层渲染」真正将原生组件视图加到了 WebView 的渲染流程中且 embed 节点是真正的 DOM 节点，理论上可以将任意 WXSS 属性作用在该节点上。

Android 端相对来说是更加彻底的「同层渲染」，但相应的重构成本也会更高一些。

## 「同层渲染」 Tips

通过上文我们已经了解了「同层渲染」在 iOS 和 Android 端的实现原理。

Android 端的「同层渲染」是基于 chromium 内核开发的扩展，可以看成是 webview 的一项能力，

而 iOS 端则需要在使用过程中稍加注意。以下列出了若干注意事项，可以帮助你避免踩坑：

**Tips 1. 不是所有情况均会启用「同层渲染」**

需要注意的是，原生组件的「同层渲染」能力可能会在特定情况下失效，一方面你需要在开发时稍加注意，另一方面同层渲染失败会触发bindrendererror事件，可在必要时根据该回调做好 UI 的 fallback。

根据我们的统计，目前同层失败率很低，也不需要太过于担心。

对 Android 端来说，如果用户的设备没有微信自研的chromium内核，则会无法切换至「同层渲染」，此时会在组件初始化阶段触发bindrendererror。

而 iOS 端的情况会稍复杂一些：如果在基础库创建同层节点时，节点发生了 WXSS 变化从而引起 WebKit 内核重排，此时可能会出现同层失败的现象。

解决方法：应尽量避免在原生组件上频繁修改节点的 WXSS 属性，尤其要尽量避免修改节点的position属性。如需对原生组件进行变换，强烈推荐使用transform而非修改节点的position属性。

**Tips 2. iOS 「同层渲染」与 WebView 渲染稍有区别**

上文我们已经了解了 iOS 端同层渲染的原理，实际上，WebKit 内核并不感知原生组件的存在，因此并非所有的 WXSS 属性都可以在原生组件上生效。

一般来说，定位 (position / margin / padding) 、尺寸 (width / height) 、transform (scale / rotate / translate) 以及层级 (z-index) 相关的属性均可生效，在原生组件外部的属性 (如 shadow、border) 一般也会生效。

但如需对组件做裁剪则可能会失败，例如：border-radius属性应用在父节点不会产生圆角效果。

**Tips 3. 「同层渲染」的事件机制**

启用了「同层渲染」之后的原生组件相比于之前的区别是原生组件上的事件也会冒泡，

意味着，一个原生组件或原生组件的子节点上的事件也会冒泡到其父节点上并触发父节点的事件监听，通常可以使用catch来阻止原生组件的事件冒泡。

**Tips 4. 只有子节点才会进入全屏**

有别于非同层渲染的原生组件，像video和live-player这类组件进入全屏时，只有其子节点会被显示。

![image](https://cdn.nlark.com/yuque/0/2021/png/200416/1618973900706-b5aad446-0029-4075-a2b2-098ae69b436e.png)

## 总结

阅读本文之后，相信你已经对小程序原生组件的「同层渲染」有了更深入的理解。

同层渲染不仅解决了原生组件的层级问题，同时也让原生组件有了更丰富的展示和交互的能力。

下表列出的原生组件都已经支持了「同层渲染」，其他组件（ textarea、camera、webgl 及 input）也会在近期逐步上线。

现在你就可以试试用「同层渲染」来优化你的小程序了。

| **支持同层渲染的原生组件**                                   | **最低版本** |
| ------------------------------------------------------------ | ------------ |
| video                                                        | v2.4.0       |
| map                                                          | v2.7.0       |
| [canvas 2d](https://developers.weixin.qq.com/miniprogram/dev/component/canvas.html)（新接口） | v2.9.0       |
| live-player                                                  | v2.9.1       |
| live-pusher                                                  | v2.9.1       |