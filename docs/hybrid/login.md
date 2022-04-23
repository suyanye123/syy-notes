# 微信授权登录全流程

#### 整体流程思路：

用户凭证使用token机制

openid用来做用户唯一标识关联用户id，这样后端就可以根据openid来为小程序进行登录，具体流程如下:

1.小程序调用wx.login()获取code

2.调用后端登录接口,将code作为参数传给后端，后端通过code调用微信后端登录接口换取openid。返回前端，存储本地。

3.然后前端调用后端提供的登录接口

3.后端通过Openid查询数据库，若查询到用户数据则返回token和refreshToken完成登录流程，若查询不到，则根据手机号，openID注册新用户

4.在浏览需要登录权限的页面时，如果返回 invalid_Token，则根据refreshToken刷新token，用于维持登录状态



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

<img src="https://i.loli.net/2021/08/09/wgsl35amox6hz7p.jpg" alt="login" style="zoom:80%;" />

