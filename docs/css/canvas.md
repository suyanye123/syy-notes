## 微信小程序canvas 2d模式

[微信canvas 2d官方文档](https://developers.weixin.qq.com/miniprogram/dev/component/canvas.html)

基于uni-app平台的，原生微信小程序写法类似

1、在template模板中写入canvas标签，用CSS把Canvas定位出去就看不到了

1、在template模板中写入canvas标签，用CSS把Canvas定位出去就看不到了



```vue
 <canvas type="2d"
         id="canvas"
         class="canvas"
         canvas-id="canvas"
         :style="{width: canvasObj.w +'px',height: canvasObj.h +'px' }">
</canvas>
```

2、data中定义下尺寸

```js
data() {
      return { canvasObj: { w: 569, h: 822 }, ctx: null, canvas: null };
    },
```

3、在接口执行完成，或者mounted、onReady周期执行获取dom选择器

```js
 const query = uni.createSelectorQuery();
      query
        .select("#canvas")
        .fields({ node: true, size: true })
        .exec((res) => {
          console.log("获取到的canvas元素res", res);
          this.canvas = res[0].node;
          this.canvas.width = this.canvasObj.w;
          this.canvas.height = this.canvasObj.h;
          this.ctx = this.canvas.getContext("2d");
          //开始画图
          this.darwAwardFn();
        });
```


4、弄个下载图片的函数

```js
 getImageInfoFn(url) {
        const _this = this;
        return new Promise((resolve, reject) => {
          uni.getImageInfo({
            src: url,
            success: (res) => {
              console.log("下载正确", res);
              return resolve(res);
            },
            fail: (err) => {
              console.log("下载错误err---", url, err);
              uni.hideLoading();
              return reject(err);
            },
          });
        });
      },
```


5、开始画图

```js
  async darwAwardFn() {
      uni.showLoading({
        title: "生成中",
        // mask: true,
      });
      const ctx = this.ctx;
       //把需要的图片先都下载好
      const bgObj = await this.getImageInfoFn("图片路径.jpg");
      const bgImg = this.canvas.createImage(); //创建图片,与H5端的 new Image()同理
      bgImg.src = bgObj.path;
      bgImg.onload = () => {
        //等图片加载完
        ctx.drawImage(bgImg, 0, 0, this.canvasObj.w, this.canvasObj.h); //背景图写入
        ctx.font = "26px xieyiyi";
        ctx.textAlign = "center";
        ctx.textBaseline = "top";
        ctx.fillText("文字内容,使用 xieyiyi字体", 170, 300);
        //生成图片
        uni.canvasToTempFilePath({
          canvas: this.canvas,
          // 使用2D 需要传递的参数
          success: (res) => {
            console.log("生成的图片", res.tempFilePath);
            this.downPic = res.tempFilePath;
            //把生成的图片增值给需要显示的变量
            uni.hideLoading();
          },
          fail(err) {
            uni.hideLoading();
          },
        });
        // end
      };
    },
```

上面Canvas里有使用自定义字体，自定义字体搞了好久都不生效，CSS里声明的@font-face无效， 最后终于找到方法了
在App.vue里周期里运行下面代码下载字体，这样全局就都可用了。原生小程序在app.js里运行。
切记！！模拟器可能无效，在真机看效果！！！实测安卓iOS可用。
不想放全局的可以在需要的页面试下效果。

```js
 wx.loadFontFace({
        family: "xieyiyi",
        source: 'url("字体路径.ttf")',
        global: true, //是否全局可用
        scopes: ["webview", "native"], //重点!!!使字体在原生canvas 2d里面也可用
        success(e) {
          // console.log('success字体下载', e)
        },
        fail(err) {
          // console.log('字体下载失败', err)
        },
      });
```