---
sidebarDepth: 2
---
# Uni-app微信小程序
##### 本文为简素言也原创，若有错误敬请指正

## 一、微信授权登录全流程

#### 整体流程思路：

用户凭证使用token机制

openid用来做用户唯一标识关联用户id，这样后端就可以根据openid来为小程序进行登录，具体流程如下:

1.小程序调用wx.login()获取code

2.调用后端登录接口,将code作为参数传给后端，后端通过code调用微信后端登录接口换取openid

3.后端通过Openid查询数据库，若查询到用户数据则返回token和refreshToken完成登录流程，若查询不到则设置为未登录状态，仅可浏览部分公开内容

4.在浏览需要登录权限的页面时，如果返回 invalidToken，则根据refreshToken刷新token，用于维持登录状态



#### 后端处理：

通过https://api.weixin.qq.com/sns/jscode2session?appid=APPID&secret=SECRET&js_code=JSCODE&grant_type=authorization_code这个官方api

就能获取到openid和unionid。

去查询 openId和unionId用户唯一标识，然后传给前端

同时查询该唯一标识对应数据库内有无注册信息，返回给前端，判定是否应该登录



#### token刷新机制流程：

1.用户登录之后,后端会返回两个 token ,分别为 accessToken 和 refreshToken 存储到 Storage，有效时间为2h，

如果状态码为 401 ,则表明 token 过期,需要前端请求新的 token，

平时请求数据时,请求头使用 accessToken 来发送接口

2.当返回错误Token 过期后， 我们通过接口向后端获取新的 token ，请求参数为 refreshToken

3.我们拿到新的 accessToken 和 refreshToken 之后, 替换掉之前的 Storage 中存储的 token

4.同时还要将我们请求失败的那个接口 ,使用新的 accessToken ,重新请求一次, 拿到数据,实现无痛刷新 token

5.如果返回的新的 token 也无法使用，表明需要重新登录,跳到登录页



#### 定位授权

```js
onLoad(){
  let that = this;
  wx.getLocation({
    type: 'gcj02',
    success(res) {
          
    },
    fail(error) {
      that.getSetFun();  // 没有获取到位置，不停获取
    }
  })
}
// 没有获取到位置，不停获取
getSetFun() {
  wx.getSetting({
    success(res) {
      if (!res.authSetting['scope.userLocation']) {
        wx.showModal({
          title: '是否授权当前位置',
          content: '请确认授权，否则无法正常使用',
          success(res) {
            if (res.confirm) {
              wx.openSetting({
                success() {
                  // 跳到首页
                }
              })
            } else if (res.cancel) {
                  // 跳到首页
            }
          }
        })
      } else {
         //用户已授权，但是获取地理位置失败，提示用户去系统设置中打开定位
         wx.showModal({
           title: '您手机定位功能没有开启',	
           content: '请在系统设置中打开定位服务',
           success() {
                  // 跳到首页
           }
         })
       }
     }
   })
 }
```



#### 获取个人信息

##### 步骤：

1. 调用 wx.login() 获取 临时登录凭证code ，传给后端。

2. 服务端调用 auth.code2Session 接口，换取 用户唯一标识 OpenID 和 会话密钥 session_key。

   这一步已经可以通过openid，辨别数据库中保存的用户身份的目的。

   但是如果需要知道用户的微信头像、名字、电话等私密信息还需下一步。

3. 前端通过调用  `wx.getUserInfo` ( 此接口在21年4月28日已更改) 方法获取encryptedData和iv ，发送给后端。后端根据 微信小程序的appid，用户openid ， encryptedData和iv 这四个参数进行解析，返回数据。

<img src="..\.vuepress\alias\wxlogin.jpg" alt="login" style="zoom:80%;" />



## 二、微信支付全流程

微信公众号服务号、公众号商城、包括小程序，都是用的JSAPI支付方式

[JSAPI官方文档](https://pay.weixin.qq.com/wiki/doc/apiv3/apis/chapter3_1_4.shtml)



#### 1.开发前准备

##### （1）在[ 微信商户平台 ](https://pay.weixin.qq.com/index.php/core/home/login?return_url=%2F)开通微信商户（该步骤较为麻烦）

获取商户号MCH_ID和设置商户API密钥，申请API证书

如果需要退款，还需要设置APIv3密钥

##### （2）微信公众平台，小程序提交认证

需填写各种信息，认证务必选择企业类型，提供企业经营证书及社会信用码等等，需要300元费用，认证很快

##### （3）开通小程序支付功能

将小程序的appid绑定到第一步开通的商户号上



#### 2.代码实现

##### （1）JSAPI统一下单

将下单的商品信息和`openId` 发给后端，

后端 通过统一下单接口，进行第一次签名，需要的参数如下：

```js
//APPID：小程序的 AppID
//MCH_ID：商户号
//KEY：商户支付API密钥
//APPSECRET：小程序开发者密钥
```

如果在统一下单的时候，不填写sign_type为MD5,则会默认使用HMAC-SHA256加密，这个是我们要排的第一个坑。

微信后台接到统一下单参数后，会生成一个商户订单，并将预下单id（prepay_id ）返回给后端



##### （2）二次签名

后端 根据微信返回值，通过微信提供的算法，进行二次签名

[签名算法](https://pay.weixin.qq.com/wiki/doc/api/wxa/wxa_api.php?chapter=4_3)

将生成的二次签名和其他参数返回给前端



##### （3）前端通过uni.request调起微信支付接口，代码如下

```js
// 唤起微信支付
uni.requestPayment({
  provider: "wxpay",
  appId: res.result.appId,  //小程序appid
  timeStamp: res.result.timeStamp,  //生产的时间戳
  nonceStr: res.result.nonceStr,  //生成的随机字符
  package: res.result.package,	 //prepay_id
  signType: res.result.signType,	//加密方式，与统一下单时的一致
  paySign: res.result.sign,		//二次签名，由后端基上面五个参数算出来的
  success: (res) => {
    console.log("支付成功", res);
    console.log("success:" + JSON.stringify(res));
    uni.showToast({
      title: "支付成功",
      duration: 3000,
      icon: "none",
    });
    setTimeout(function () {
      uni.switchTab({
        url: "xxx",
      });
    }, 1500);
  },
  fail: (err) => {
    uni.showModal({
      content: "支付失败,原因为:\n " + err.errMsg,
      showCancel: false,
    });
    console.log("fail:" + JSON.stringify(err));
  },
});
```

##### （4）遇到的报错坑

**调用支付JSAPI缺少参数: total_fee**  ==> 

说明一定是第三步里提交的参数有问题，特别注意<u>**package**</u>参数，要以 “prepay_id=xxxxxxxxxx” 的形式发送

或者是参数的大小写问题

**支付验证签名失败**  ==>

这是签名的问题，通常是第二次生成的签名不对，可以用官方的校验工具检查一下[签名校验在线工具](https://pay.weixin.qq.com/wiki/doc/api/jsapi.php?chapter=20_1)

二次签名方式一定要与统一下单接口使用的一致，比如均为MD5

注意二次签名的**变量名的大小写**为小驼峰型，与下面的文档保持一致，否则生成的paySign不对

![image-20210418234652030](../.vuepress/alias/uniapp/wxpay.png)

[网上参考教程](https://blog.csdn.net/weixin_30684743/article/details/97202700)

##### （5）其他未尝试的办法

uniapp提供了一种封装好的unipay插件模板，只需要将小程序的 AppID，商户号，商户密钥等等参数传入，

通过云函数，unipay.initWeixin会帮助你生成最终提供给前端的参数

同理，小程序云开发也提供了同种功能，但是因为云开发需要付费，未曾尝试过。。。

## 三、动态计算显示高度

##### 1.获取手机型号

```js
uni.getsystemInfo(){}
```
##### 2.获取节点高度

```js
//获取节点信息
uni.createSelectorQuery()
    .in(this)
    .select("#one")
//根据节点高度与页面滚动距离scrollTop得到所需滑动的距离
    .boundingClientRect(data => {
        uni.pageScrollTo({
            duration:0,
            scrollTop: that.scrollTop + data.top-44
        });   
}).exec(
```




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