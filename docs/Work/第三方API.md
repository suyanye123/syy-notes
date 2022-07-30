# 第三方API接入

### 1.百度文字识别（OCR）服务

官方文档: https://ai.baidu.com/ai-doc/OCR/Ck3h7y2ia



官方实例： https://cloud.baidu.com/apiexplorer/index.html?Product=GWSE-DJAQ8YwekkQ&Api=GWAI-gsbcdCuBWRC



CSDN ： https://blog.csdn.net/qq_29832217/article/details/102770140?spm=1001.2101.3001.6650.2&utm_medium=distribute.pc_relevant.none-task-blog-2%7Edefault%7ECTRLIST%7ERate-2.pc_relevant_paycolumn_v3&depth_1-utm_source=distribute.pc_relevant.none-task-blog-2%7Edefault%7ECTRLIST%7ERate-2.pc_relevant_paycolumn_v3&utm_relevant_index=5

csdn这里的参数提交有问题





### 2.飞书鉴权

- [重定向 URL](https://open.feishu.cn/document/uYjL24iN/uYjN3QjL2YzN04iN2cDN?lang=zh-CN)

添加重定向 URL 作为免登授权码跳转地址。其他重定向 URL 将无法获取免登授权码。

![image-20220325094356928](F:/syy-notes/dist/assets/img/feishu.png)



- H5鉴权（所有api都需要先鉴权才能使用）[JSSDK官方文档](https://open.feishu.cn/document/uYjL24iN/uITO4IjLykDOy4iM5gjM#2d39479a)

```js
/**
      sha1： 需要自己  npm install js-sha1
      ticket: 
          eg：adaec57dc84bacba6610b9da85b2eaaa649c2074
          1、一般是后端给出接口，直接去取就好
          2、我们自己调用飞书接口，用来调试
      
      **/
      let sha1 = require('js-sha1')
      
      const jianQuan = (ticket) => {
        let nonceStr = 'Y7a8KkqX041bsSwT' // 随机字符串
        let timeStamp = new Date().getTime() // 时间戳
        // 当前网页的 URL（可以为本地局域网网址），不包含 # 及其后面部分
        let url = String(location.href.split('#')[0])
        console.log(location.href.split('#')[0], 99999)
        let verifyStr = `jsapi_ticket=${ticket}&noncestr=${nonceStr}&timestamp=${timeStamp}&url=${url}`
        let signature = sha1(verifyStr)
        console.log('签名', signature)
        window.h5sdk.config({
          appId: 'xxxx', // 必填，应用ID, eg: cli_a066b6f94e39900e
          timestamp: timeStamp, // 必填，生成签名的时间戳，ms级
          nonceStr: nonceStr, // 必填，生成签名的随机串
          signature: signature, // 必填，签名
          jsApiList: [
            'biz.user.getUserInfo',
            'biz.user.employee_id',
            'device.health.getStepCount',
            'biz.user.openDetail',
            'biz.contact.open',
            'device.base.getSystemInfo',
            'biz.util.getClipboardInfo',
            'biz.util.openDocument',
            'biz.util.downloadFile',
            'device.geolocation.get',
            'device.geolocation.start',
            'device.geolocation.stop',
            'biz.user.getUserInfoEx',
            'device.connection.getNetworkType',
          ],
          onSuccess: (res) => {
            console.log(`config: 恭喜你成功啦 ${res} `)
          },
          onFail: (res) => {
            alert(`config: 鉴权失败 ${JSON.stringify(res)}`)
          },
        })
      }

```

例如：获取飞书用户信息

```js
   /** 
      crypto：解密方法，vue项目内一般自带有，如果没有自己去引入一个解密插件
       type： 类型
       prefix：方法名
       extraFunc： 返回
   **/
   
    let crypto = require('crypto')
 
 //  normalCallbacks  公共方法，可以多个api使用一个方法回调
   const normalCallbacks = (type, prefix, extraFunc) => {
          let success = (res) => {
            console.log(`${prefix} success`, res)
            if (extraFunc) extraFunc()
          }
          if (type === 'modal') {
            success = (res) => {
              console.log('获取信息,', res)
              // 这时的敏感信息是加密的
              try {
                const iv = res.iv
                let message = res.encryptedData
                console.log('encryptedData', message)
                console.log('iv', iv)
                console.log('seesionkey', session_key)
                const decrypt_with_aes = () => {
                  message = Buffer.from(message, 'base64')
                  const decipher = crypto.createDecipheriv(
                    'aes-128-cbc',
                    Buffer.from(session_key, 'hex'),
                    Buffer.from(iv, 'hex')
                  )
                  let decrypted = decipher.update(message)
                  decrypted += decipher.final()
                  const data = decrypted.toString()
                  const json = JSON.parse(data)
                  return json
                }
                let openIds = '' // 获取用户信息返回的openId 
                const userInfo = decrypt_with_aes()
                console.log('解析完的数据--》 我拿到用户的openId啦', userInfo)
              } catch (e) {
                console.log(e, 'catch')
              }
            }
          }
          const fail = (err) => {
            console.log(`${prefix} fail`, JSON.stringify(err))
          }
          return { success, fail }
        }
   
   //  开始调用方法， tt方法最好写在ready里边
    window.h5sdk.ready(() => {
       window.tt.getUserInfo({
          withCredentials: true, // 开启用户敏感数据
          ...normalCallbacks('modal', 'getUserInfo'),
       })
    }

```

