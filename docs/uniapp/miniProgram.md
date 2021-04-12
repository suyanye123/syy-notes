---
sidebarDepth: 2
---
# 微信小程序业务

## 一、实现scroll吸附贴顶效果

##### 方法1.监听`onPageScroll`事件，滚动到指定位置添加fixed样式

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

###### 存在问题：获取指定位置错误，因为上面都是图片，在图片未加载出来时获取高度， 高度值不对，解决办法就是在`imgae`上加`bindload`事件，在图片加载加载完成之后再获取高度； `onPageScroll`事件会有延迟，导致最终效果会出现卡顿

------

##### 方法2.通过`position:sticky`

该元素并不脱离文档流，仍然保留元素原来在文档流中的位置；
当元素在容器中被滚动超过指定的偏移值时，元素就会固定到容器的指定位置，也就是说如果元素设置设置`top:50px`那么在sticky元素滚动到距离相对定位元素的顶部`50px`时固定，不再向上移动；
元素固定的相对偏移是相对于离他最近的具有滚动框的祖先元素，如果祖先元素都没有滚动框，那么就是相对于`viewport`来计算元素的偏移量

###### **tip：需要考虑父元素的高度的情况，sticky元素在到达父元素的底部时，则不会再发生定位，如果父元素并没有比sticky元素高，那么sticky元素一开始就到达了底部，就不会有定位的效果，当元素滚动到父元素的底部时sticky属性失效，如果父元素的overflow属性不是默认的visible，那么sticky属性不会生效**

兼容性不是很好，只支持`FireFox`和`Safari`，移动端



## 二、uniapp开通微信支付流程

#### 1.准备工作

##### （1）开通商户（该步骤较为麻烦）

##### （2）微信公众平台，小程序认证，或者公众号认证

##### 需填写各种信息，认证需要300元费用，认证很快

##### （3）开通小程序支付功能，appid绑定到商户

###### 注意：个人类型的小程序无法开通支付功能，所以上一步小程序认证务必选择企业类型，提供企业经营证书及社会信用码等等



#### 2.前端代码实现

##### （1）发送商品信息，价格，小程序appid，opendi至后端，然后后端需返回如下参数

##### （2）通过uni.request调起微信支付接口，代码如下

