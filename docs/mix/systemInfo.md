# 设备信息

在苹果 iPhoneX 、iPhone XR等设备上，可以看到物理Home键被取消，改为底部小黑条替代home键功能。安全区域是在IOS11之后并且是iPhoneX及以上机型才有的，所以需要适配的是这一类机型（为了方便，下文中统称这类需要适配的机型为iPhoneX），更老的机型则不需要考虑适配问题。

> 安全区域指的是一个可视窗口范围，处于安全区域的内容不受圆角(corners)、齐刘海(sensor housing)、小黑条(Home Indicator)的影响。

## 1.获取手机型号

2种方案，判断当前机型是需要适配安全区域

```js
//1. 使用uni.getSystemInfoSync()的model属性得到手机型号，进行判断
let res = uni.getSystemInfoSync()
if (res.model.indexOf("X")) {
     uni.setStorageSync("isX", true);
   } else {
     uni.setStorageSync("isX", false);
   }
```

```js
//2. 使用uni.getSystemInfoSync()中的screenHeight和safeArea对象的bottom属性判断
//这里使用screenHeight而不是windowHeight，因为bottom是以屏幕左上角为原点开始计算的，所以需要的是屏幕高度，对比screenHeight和bottom，如果相等则说明不需要适配，不相等则需要适配。
//注意：如果使用微信开发者工具中的模拟器，screenHeight和bottom始终是相等的，需要用真机来测试。
const isIPhoneX = () => {
  let screenHeight = uni.getSystemInfoSync().screenHeight
  let bottom = uni.getSystemInfoSync().safeArea.bottom
  return screenHeight !== bottom
}
```



## 2.计算小黑条高度

如果是需要适配的机型，使用screenHeight减去bottom就能得到小黑条的高度

```js
const res = uni.getSystemInfoSync();
let X_height = res.screenHeight - res.safeArea.bottom;
```



## 3.动态计算显示高度



##### 获取节点高度

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

