# Pixi.js

[PixiJS](https://github.com/pixijs/pixi.js)是一个轻量级的2D渲染引擎，它能自动侦测使用WebGL还是Canvas来创建图形。

但是它没有动作系统、物理系统，没有针对游戏开发的编辑器，被定义为一个高性能渲染库。

这个库经常被用来制作HTML5游戏以及有复杂交互的H5活动页。

## 搭建环境

**注意：本文使用pixi最新的v5版本，同时使用[Parcel](https://parceljs.org/)进行模块化打包**

项目初始化

```bash
mkdir learn-pixi
cd learn-pixi
npm init -y
```

安装依赖

```bash
npm i pixi.js -save
npm i parcel-bundler -save-dev
```

根目录创建`index.html`

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>learn-pixi</title>
</head>
<body>
  <script src="./src/index.js"></script>
</body>
</html>
```

根目录创建`src`目录，新建`src/index.js`

```bash
alert('pixi');
```

修改`package.json`

```json
"scripts": {
  "dev": "parcel index.html -p 8080",
  "build": "parcel build index.html"
}
```

运行`npm run dev`，访问 http://localhost/:8080/ 即可看到效果

## 快速开始

```js
index.js
import { Application } from 'pixi.js';

const app = new Application({
  width: 300,
  height: 300,
  antialias: true,
  transparent: false,
  resolution: 1,
  backgroundColor: 0x1d9ce0
});

// app.view就是个canvas元素，挂载到页面上
document.body.appendChild(app.view);
```

页面上就出现了一个300*300的蓝色矩形，矩形是由pixi.js创建的canvas渲染的。


我们可以继续创建新的图形，然后渲染到canvas里

```js
import { Application, Graphics } from 'pixi.js';

const app = new Application({
  width: 300,
  height: 300,
  antialias: true,
  transparent: false,
  resolution: 1,
  backgroundColor: 0x1d9ce0
});

document.body.appendChild(app.view);

// 创建一个半径为32px的圆
const circle = new Graphics();
circle.beginFill(0xfb6a8f);
circle.drawCircle(0, 0, 32);
circle.endFill();
circle.x = 130;
circle.y = 130;

// 添加到app.stage里，从而可以渲染出来
app.stage.addChild(circle);
```

我们还可以渲染图片

```js
import { Application, Sprite } from 'pixi.js';

const app = new Application({
  width: 300,
  height: 300,
  antialias: true,
  transparent: false,
  resolution: 1,
  backgroundColor: 0x1d9ce0
});

document.body.appendChild(app.view);

// 创建一个图片精灵
const avatar = new Sprite.from('http://anata.me/img/avatar.jpg');

// 图片宽高缩放0.5
avatar.scale.set(0.5, 0.5);

app.stage.addChild(avatar);
```



我们让这个图片精灵变得可以交互：点击图片后，图片透明度变成0.5

```js
const avatar = new Sprite.from('http://anata.me/img/avatar.jpg');
avatar.scale.set(0.5, 0.5);
// 居中展示
avatar.x = 100;
avatar.y = 100;

// 可交互
avatar.interactive = true;
// 监听事件
avatar.on('click', () => {
   // 透明度
   avatar.alpha= 0.5;
})
app.stage.addChild(avatar);
```

我们还能让图片一直旋转

```js
const avatar = new Sprite.from('http://anata.me/img/avatar.jpg');
avatar.scale.set(0.5, 0.5);
avatar.x = 150;
avatar.y = 150;

// 修改旋转中心为图片中心
avatar.anchor.set(0.5, 0.5)

app.stage.addChild(avatar);

app.ticker.add(() => {
  // 每秒调用该方法60次(60帧动画)
  avatar.rotation += 0.01;
})
```



## 基本概念

`pixi`有几个重要的Class:

- Container (舞台，场景)
- Renderer (渲染器)
- Ticker (计时器)
- Loader （资源加载器)
- Sprite (精灵)

```js
const app = new Application({
  width: 300,
  height: 300
});
```

`Application`是pixi提供的一个工具方法，它能自动创建renderer，ticker 和container，我们通常使用该方法快速创建应用。

## Container

`app.stage`是一个`Container`的实例，作为最底层的舞台(stage)，所有要渲染的图形都应放在它的内部

```js
const app = new Application({
  width: 300,
  height: 300
});
// 添加不同的图形
app.stage.addChild(circle1);
app.stage.addChild(circle2);
```

我们也可以创建自己的`Container`，自定义的Container通常用来分组

```js
import { Application, Container, Graphics } from 'pixi.js';

const app = new Application({
  width: 300,
  height: 300,
  antialias: true,
  transparent: false,
  resolution: 1,
  backgroundColor: 0x1d9ce0
});

// 自定义Container
const myContainer = new Container();
// 相对于根节点偏移
myContainer.position.set(40, 40);

let rectangle = new Graphics();
rectangle.beginFill(0x000000);
rectangle.drawRect(0, 0, 64, 64);
rectangle.endFill();

let rectangle2 = new Graphics();
rectangle2.beginFill(0xFFFFFF);
rectangle2.drawRect(0, 0, 64, 64);
rectangle2.endFill();
// 相对于自定义Container偏移
rectangle2.position.set(20, 20);

// 两个图形加到自定义Container里
myContainer.addChild(rectangle);
myContainer.addChild(rectangle2);

// 自定义Container最后需要添加到app.stage
app.stage.addChild(myContainer);

document.body.appendChild(app.view);
```



分组的好处在于，修改container的属性，位于其中的子节点，都会受到影响。比如上面的例子，我们把`rectangle`和`rectangle2`分到了同一个组里，如果希望同时隐藏这两个元素，只需修改它们父级container的透明度即可。

```js
// 父级透明，则子级也透明
myContainer.alpha = 0;
```

一种常见的做法是，我们创建一个最顶层的`rootContainer`，之后所有的内容，都添加到`rootContainer`里。而`rootContainer`作为顶级元素，可以进行一些缩放来适配不同的分辨率：

```js
const rootContainer = new Container();
app.stage.addChild(rootContainer);

// 相对于设计稿750px进行缩放（竖屏状态）
const screenScaleRito = window.innerWidth / 750; // 横屏则用innerHeight
rootContainer.scale.set(screenScaleRito, screenScaleRito);
```

这种方法类似我们前端的rem布局

## Renderer

`app.renderer`是一个`Renderer`的实例，如果你希望重新渲染页面，就需要使用它

```js
// 把画布重新渲染为500*500大小
app.renderer.resize(500, 500);

// 渲染一个容器
const container = new Container();
app.renderer.render(container);
```

## Sprite

Sprite精灵，你可以把它看成普通的矢量图形，只不过它是根据图片渲染出来的。

```js
const avatar = new Sprite.from('http://anata.me/img/avatar.jpg');

// 和普通的图形一样可以设置各种属性
avatar.width = 100;
avatar.height = 200;
avatar.position.set(20, 30);
avatar.scale.set(2, 2);
```

加载图片通常需要耗费一定的时间，因此我们常常使用`Loader`来预加载图片，当图片全部加载成功后，才渲染出来。

## Loader

```js
import { Application, Sprite, Loader } from 'pixi.js';

// Loader.shared内置的单例loader
const loader = Loader.shared;

// 也可以使用自定义的loader
const loader = new Loader();

const app = new Application({
  width: 300,
  height: 300,
  antialias: true,
  transparent: false,
  resolution: 1,
  backgroundColor: 0x1d9ce0
});

document.body.appendChild(app.view);

loader
.add('bili', 'http://pic.deepred5.com/bilibili.jpg')
.add('avatar', 'http://anata.me/img/avatar.jpg')
.load(setup)

// 监听加载事件
loader.onProgress.add((loader) => {
  console.log(loader.progress);
}); 

function setup() {
  const bili = new Sprite(
    loader.resources["bili"].texture
  );
  bili.width = 50;
  bili.height = 50;
  
  const avatar = new Sprite(
    loader.resources["avatar"].texture
  );
  avatar.width = 50;
  avatar.height = 50;
  avatar.position.set(50, 50);

  app.stage.addChild(bili);
  app.stage.addChild(avatar);
}
```

通过`add`方法添加需要加载的图片，所有图片加载完成后，`load`方法会调用传入的`setup`回调函数，这时就可以把图片精灵加入到`app.stage`里。`onProgress`事件可以监听加载的进度，通过这个方法，可以很方便的制作进度条动画。

前端有时会把多张图片合并成一张图片，通过设置`background-position`来显示不同的图片。`pixi.js`也有类似的技术，我们可以利用[Texture Packer](https://www.codeandweb.com/texturepacker)软件，把多张图片合并成一张图片，合并的同时，软件会生成一份`json`配置文件，记录了每张图片的相对位置。

具体教程见[这里](https://github.com/Zainking/LearningPixi#textureatlas)

```js
import { Application, Container, Sprite, Graphics, Loader, Spritesheet } from 'pixi.js';

// myjson记录了每张图片的相对位置
import myjosn from './assets/treasureHunter.json';

// mypng里面有多张图片
import mypng from './assets/treasureHunter.png';

const loader = Loader.shared;

const app = new Application({
  width: 300,
  height: 300,
  antialias: true,
  transparent: false,
  resolution: 1,
  backgroundColor: 0x1d9ce0
});

document.body.appendChild(app.view);

loader
.add('mypng', mypng)
.load(setup)

function setup() {
  const texture = loader.resources["mypng"].texture.baseTexture;
  const sheet = new Spritesheet(texture, myjosn);
  sheet.parse((textures) => {
    // mypng里面的一张叫treasure.png的图片
    const treasure = new Sprite(textures["treasure.png"]);
    treasure.position.set(0, 0);

    // mypng里面的一张叫blob.png的图片
    const blob = new Sprite(textures["blob.png"]);
    blob.position.set(100, 100);
    
    app.stage.addChild(treasure);
    app.stage.addChild(blob);
  });
}
```

## Ticker

`Ticker`有点类似前端的`requestAnimationFrame`，当浏览器的显示频率刷新的时候，此函数会被执行，因此常常用来制作动画。

`app.ticker`就是一个`Ticker`实例。

```js
import { Application, Sprite, Loader } from 'pixi.js';

const loader = Loader.shared;

const app = new Application({
  width: 300,
  height: 300,
  antialias: true,
  transparent: false,
  resolution: 1,
  backgroundColor: 0x1d9ce0
});

document.body.appendChild(app.view);

loader
.add('bili', 'http://pic.deepred5.com/bilibili.jpg')                      
.load(setup)

function setup() {
  const bili = new Sprite(
    loader.resources["bili"].texture
  );
  bili.width = 50;
  bili.height = 50;

  app.stage.addChild(bili);

  app.ticker.add(() => {
    if (bili.x <= 200) {
      bili.x += 1;
    }
  })
}
```

我们也可以使用`requestAnimationFrame`实现这个效果

```js
function setup() {
  const bili = new Sprite(
    loader.resources["bili"].texture
  );
  bili.width = 50;
  bili.height = 50;

  app.stage.addChild(bili);

  function move() {
    if (bili.x <= 200) {
      bili.x += 1;
      requestAnimationFrame(move)
    }
  }

  requestAnimationFrame(move)

}
```

## 补间动画

`Ticker`可以实现简单的动画，但如果我们希望实现一些复杂效果，则需要自己编写很多代码，这时就可以选择一个兼容`pixi`的动画库。市面上比较常见的动画库有：[Tween.js](https://github.com/tweenjs/tween.js)，[TweenMax](https://www.tweenmax.com.cn/start/init/)，这里我们使用`TweenMax`来演示效果。

安装动画库

```js
npm i gsap
import { Application, Sprite, Loader } from 'pixi.js';

import { TweenMax } from 'gsap/all';

const loader = Loader.shared;

const app = new Application({
  width: 300,
  height: 300,
  antialias: true,
  transparent: false,
  resolution: 1,
  backgroundColor: 0x1d9ce0
});


document.body.appendChild(app.view);

loader
  .add('bili', 'http://pic.deepred5.com/bilibili.jpg')
  .load(setup)

function setup() {
  const bili = new Sprite(
    loader.resources["bili"].texture
  );
  bili.width = 50;
  bili.height = 50;

  app.stage.addChild(bili);

  // 1s内x和y轴移动100
  TweenMax.to(bili, 1, { x: 100, y: 100 });

}
```



`TweenMax`还提供了一个[PixiPlugin](https://greensock.com/docs/v2/Plugins/PixiPlugin)，可以一次修改多个pixi属性

```js
import { Application, Sprite, Loader } from 'pixi.js';
import * as PIXI from 'pixi.js';
import gsap, { TweenMax, PixiPlugin } from 'gsap/all';

// 注册插件
gsap.registerPlugin(PixiPlugin);
PixiPlugin.registerPIXI(PIXI);

const loader = Loader.shared;

const app = new Application({
  width: 300,
  height: 300,
  antialias: true,
  transparent: false,
  resolution: 1,
  backgroundColor: 0x1d9ce0
});

document.body.appendChild(app.view);

loader
  .add('bili', 'http://pic.deepred5.com/bilibili.jpg')
  .load(setup)

function setup() {
  const bili = new Sprite(
    loader.resources["bili"].texture
  );
  bili.width = 50;
  bili.height = 50;

  app.stage.addChild(bili);


  // 一次修改多个属性
  TweenMax.to(bili, 1, { pixi: { scaleX: 1.2, scaleY: 1.2, skewX: 10, rotation: 20 } });

}
```



## 自定义的Application

我们通常使用Pixi提供的`Application`方法来创建一个应用，它能自动创建renderer，ticker 和container。但其实，我们可以自己来创建这些对象。

```js
import { Container, Renderer, Sprite, Loader, Ticker } from 'pixi.js';
import { TweenMax } from 'gsap/all';

// 自定义render
const renderer = new Renderer({
  width: 300,
  height: 300,
  antialias: true,
  transparent: false,
  resolution: 1,
  backgroundColor: 0x1d9ce0
});

// 自定义container
const stage = new Container();

// 自定义loader
const loader = new Loader();

// 自定义ticker
const ticker = new Ticker();

// 每次屏幕刷新重新渲染，否则只会渲染第一帧
ticker.add(() => {
  renderer.render(stage);
});

// 开始执行ticker，一定要调用这个方法，注册的回调函数才会被执行!!!
ticker.start();


document.body.appendChild(renderer.view);

loader
  .add('bili', 'http://pic.deepred5.com/bilibili.jpg')
  .load(setup)

function setup() {
  const bili = new Sprite(
    loader.resources["bili"].texture
  );
  bili.width = 50;
  bili.height = 50;

  stage.addChild(bili);

  // 动画效果
  ticker.add(() => {
    if (bili.x <= 200) {
      bili.x += 2;
    }
  });

  TweenMax.to(bili, 1, { y: 100, delay: 3 });
}
```

其实[PIXI.Application](https://github.com/pixijs/pixi.js/blob/dev/packages/app/src/Application.js)的底层就是帮我们简化了上述的操作。

## 参考

[Pixi教程中文版](https://github.com/Zainking/LearningPixi)

[Pixi wiki](https://github.com/pixijs/pixi.js/wiki)

[学习 PixiJS — 补间动画](https://segmentfault.com/a/1190000018190147)



## 案例

```js
//引入pixi引擎 
import * as PIXI from "@tbminiapp/pixi-miniprogram-engine";  
// registerCanvas 注册canvas给PIXI 
const { registerCanvas, devicePixelRatio } = PIXI.miniprogram;
Page({
  // 供pixi渲染的canvas
  pixiCanvas:null,
  // canvas的onReady事件侦听函数 onCanvasReady
  onCanvasReady() {
    // 建立canvas引用
    my._createCanvas({
      id: "canvas",
      success: (canvas) => {
        const systemInfo = my.getSystemInfoSync();
       // 拿到当前设备像素密度
        const dpr = systemInfo.pixelRatio;
       // 拿到当前设备的宽高
        const windowWidth = systemInfo.windowWidth;
        const windowHeight = systemInfo.windowHeight;
       // 为canvas设定宽高（需要设备宽高* 像素密度）;
        canvas.width = windowWidth * dpr;
        canvas.height = windowHeight * dpr;
        this.pixiCanvas = canvas;
       //为pixi引擎注册当前的canvas  
        registerCanvas(canvas);
       //初始化PIXI.Application
      //计算application的宽高
        const size = {
          width: canvas.width / devicePixelRatio,
          height: canvas.height / devicePixelRatio,  
        };
        const context = canvas.getContext('2d'); // canvas.getContext('webgl')
        const application = new PIXI.Application({
          width: size.width,
          height: size.height,
          view: canvas,
          context: context,
          transparent: true,
          // 强制使用2d上下文进行渲染，如果为flase,则默认使用webgl渲染
          forceCanvas: true,
          // 设置resolution 为像素密度
          resolution: devicePixelRatio,  
         });  
      },  
   });  
 },
  // 监听小程序canvas的touch事件，并触发pixi内部事件
  onTouchHandle(event) {
    if (this.pixiCanvas && event.changedTouches && event.changedTouches.length) {
       this.pixiCanvas.dispatchEvent(event);  
    }  
  } 
}); 

```

