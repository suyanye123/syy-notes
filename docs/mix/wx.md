---
sidebarDepth: 2
---
# Uni-app微信小程序
## 一、微信授权登录

详见[微信登录](./login)



## 二、微信支付

详见[微信支付](./pay)



## 三、动态计算显示高度




## 四、scroll吸附贴顶效果

#### 方法1. 监听`onPageScroll`事件，滚动到指定位置添加fixed样式

在Vue中，监听滚动事件，打印当前的`scrollTop`
首先，在mounted钩子中给window添加一个滚动滚动监听事件，

```vue
mounted () {
  window.addEventListener('scroll', this.handleScroll)
},
```

然后在方法中，添加这个`handleScroll`方法
监听元素到顶部的距离 并判断滚动的距离如果大于了元素到顶部的距离时，设置`searchBar`为true,否则就是false

```js
handleScroll () {
  var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
  var offsetTop = document.querySelector('#searchBar').offsetTop
  if (scrollTop > offsetTop) {
    this.searchBarFixed = true
  } else {
    this.searchBarFixed = false
  }
},
```

先写一个该元素固定到顶部的样式，`isFixed`
然后将需要固定的元素的class与`searchBar`进行绑定，如果`searchBar`为true时，就应用这个`isFixed`样式

```js
<view class="searchBar" id="searchBar">
```

注意，如果离开该页面需要移除这个监听的事件，不然会报错。

```js
destroyed () {
  window.removeEventListener('scroll', this.handleScroll)
},
```

存在问题：获取指定位置错误，因为上面都是图片，在图片未加载出来时获取高度， 高度值不对，解决办法就是在`imgae`上加`bindload`事件，在图片加载加载完成之后再获取高度； `onPageScroll`事件会有延迟，导致最终效果会出现卡顿

------

#### 方法2. 通过`position:sticky`

该元素并不脱离文档流，仍然保留元素原来在文档流中的位置；
当元素在容器中被滚动超过指定的偏移值时，元素就会固定到容器的指定位置，也就是说如果元素设置设置`top:50px`那么在sticky元素滚动到距离相对定位元素的顶部`50px`时固定，不再向上移动；
元素固定的相对偏移是相对于离他最近的具有滚动框的祖先元素，如果祖先元素都没有滚动框，那么就是相对于`viewport`来计算元素的偏移量

**tip：需要考虑父元素的高度的情况，sticky元素在到达父元素的底部时，则不会再发生定位，如果父元素并没有比sticky元素高，那么sticky元素一开始就到达了底部，就不会有定位的效果，当元素滚动到父元素的底部时sticky属性失效，如果父元素的overflow属性不是默认的visible，那么sticky属性不会生效**

兼容性不是很好，只支持`FireFox`和`Safari`，移动端



## 五、小程序生成海报图片并保存至本地

这里的痛点在于，uniapp和小程序不能直接操作DOM元素，所以一开始想使用 html2canvas ，不能实现

尝试其他方法：

#### 方法1.  使用原生canvas API直接绘制图片（最原始的方法）

但即使最原始的方法，依旧存在一些踩坑，譬如微信小程序官方在2.9.0开始支持了一个canvas 2D的新API，之前的API不再进行维护，因此之后使用canvas的项目，都建议使用canvas 2D来绘制

canvas 常用api和 canvas 2D用法 [跳转这里](../css/canvas)

那么canvas2D 有哪些变化呢

- 全面支持源生H5 JS的写法，迁移H5代码更容易，学习成本更低

- 性能上的优化和提升，复杂动画上帧数明显
- BUG修复，以及一些不支持的条件完善

#### 方法2.  使用插件

##### 1.painter

painter git地址：https://github.com/Kujiale-Mobile/Painter
可以在这个演示地址 https://lingxiaoyi.github.io/painter-custom-poster 先布局好，然后复制代码

具体使用步骤：
1.下载painter 将components文件下的 painter 文件复制到自己的项目里，然后再使用的页面进行引入
注意：第三方框架编写的小程序需要放到 wxcomponents或者static文件下，默认会报错
不能放在

```js
"usingComponents": {
	 "painter":"/wxcomponents/painter/painter"
}
```

如果使用时遇到这个问题，regeneratorRuntime is not defined，解决方案：勾选增强编译 即可

2.在页面中使用

```js
 <painter customStyle='width:630rpx; height: 732rpx;' :palette="canvasdata" :dancePalette="canvasdata" @imgOK="onImgOK"/>
```

```js
data(){
	return{
		canvasdata:'',
		canvasImgUrl:''
	}
}
```


设置动态数据

```js
onSelect() { //设置数据的方法，内容较少仅举例方便理解
				var _this = this
		this.canvasdata = {
		 		width:"630rpx",
				height:"732rpx",
				background:'#fff',
				views:[
					{
						type: 'image',
						url: _this.DetailData.avatar,
						css: {
							width: '78rpx',
							height: '78rpx',
							borderRadius: '39rpx',
							top: '30rpx',
							left: '30rpx',
						}
					},
					{
					    "type": "text",
					    "text":  _this.DetailData.nickname,
					    "css": {
					        "color": "#434343",
					        "width": "200rpx",
					        "top": "28rpx",
					        "left": "128rpx",
							"fontSize": "28rpx"
					    }
					}
				]
			}
		},
```

3.保存图片

```js
onImgOK(e){
	// console.log(e)
	this.canvasImgUrl = e.detail.path
}
savePoster(){ //保存海报
		var _this = this;
		uni.saveImageToPhotosAlbum({
		  filePath: _this.canvasImgUrl,
		  success(result) {
			uni.showToast({
			  title: '图片保存成功',
			  icon: 'none'
			})
		  }
		})
	}
```



##### 2.小程序原生内置扩展组件，[ wxml-to-canvas ](https://developers.weixin.qq.com/miniprogram/dev/extended/component-plus/wxml-to-canvas.html)

正常原生小程序开发，如果要增加扩展组件wxml-to-canvas

只需要 npm install --save wxml-to-canvas,后面再增加JSON组件声明，wxml引入组件即可

执行之后，会在项目根目录下创建node_modules目录，但是这个node_modules 目录不会参与小程序编译、上传和打包，所以要通过开发者工具“工具-构建 npm”，这样就会在node_modules 的同级目录下会生成一个 miniprogram_npm 目录，里面会存放构建打包后的 npm 包，也就是小程序真正使用的 npm 包。

但是uniapp开发的小程序不一样，首先uniapp项目里会有自己的package.json文件，安装npm install之后，会在项目根目录生成一个node_modules目录，里面是所有第三方的安装包，包括uniapp的所有包，核心、编译、解析等等。

经过uniapp打包之后，生成的原生小程序项目（也就是我们最终给开发者工具使用的项目包），里面是不包含node_modules目录，也就没办法通过开发者工具“工具-构建 npm”生成miniprogram_npm 目录

##### 解决方案是

下载官方wxml-to-canvas的代码片段

我们在目录里找到miniprogram_npm目录，里面包含三个已经打包好的文件，分别是eventemitter3、widget-ui、wxml-to-canvas

我们将其中两个个文件widget-ui、wxml-to-canvas拷贝下来，放到我们的uniapp项目里

widget-ui文件放到wxcomponents/widget-ui/miniprogram_npm/widget-ui

wxml-to-canvas文件放到wxcomponents/wxml-to-canvas/miniprogram_npm/wxml-to-canvas

然后在全局引入wxml-to-canvas

```js
"usingComponents": {
    "wxml-to-canvas": "/wxcomponents/wxml-to-canvas/miniprogram_npm/wxml-to-canvas/index",
 }
```

另外需要修改wxml-to-canvas/index.js

```js
module.exports = require("../../../widget-ui/miniprogram_npm/widget-ui/index")
```



##### 3.除此之外还有uni版本的 html-to-canvas插件，请自行搜索~