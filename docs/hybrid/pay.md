# 微信支付全流程

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

![image-20210418234652030](E:\syy-notes\docs\.vuepress\alias\uniapp\wxpay.png)

[网上参考教程](https://blog.csdn.net/weixin_30684743/article/details/97202700)

##### （5）其他未尝试的办法

uniapp提供了一种封装好的unipay插件模板，只需要将小程序的 AppID，商户号，商户密钥等等参数传入，

通过云函数，unipay.initWeixin会帮助你生成最终提供给前端的参数

同理，小程序云开发也提供了同种功能，但是因为云开发需要付费，未曾尝试过。。。