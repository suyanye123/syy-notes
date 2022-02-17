# 如何通过jscode2session获取UnionId?

unionID获取机制请参考：https://developers.weixin.qq.com/miniprogram/dev/framework/open-ability/union-id.html



https://developers.weixin.qq.com/community/develop/article/doc/00066a967c4e384949f93fe1151413

可以试试这种方式。



传统后端服务器获取unionid。
https://developers.weixin.qq.com/miniprogram/dev/api-backend/open-api/login/auth.code2Session.html

需要和wx.getUserInfo结合才能100%获取unionid





# auth.code2Session

https://developers.weixin.qq.com/miniprogram/dev/api-backend/open-api/login/auth.code2Session.html



# 小程序能够获取到unionid的前提

**1.小程序必须绑定在微信开放平台上，不绑定是没有的（PS：绑定开放平台需要开发者资质认证，认证收费的奥）**

**2.需要微信用户授权小程序**

https://blog.csdn.net/a493001894/article/details/80323403



# 微信小程序-获取用户session_key,openid,unionid - 后端为nodejs

https://blog.csdn.net/zzwwjjdj1/article/details/79351005

