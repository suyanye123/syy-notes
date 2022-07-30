# 登录相关

## 1.密码自动填充

> 设置autocomplete="off"在chrom中失效

```
问题：在表单的输入框中，有时候我们并不希望点击输入框时，会出现提示信息。这时，在输入框中添加属性:autocomplete="off”，一般能达到目的。而在chrom里面就失效。
失效的原因是：浏览器会根据输入框的input的type属性为password的时候，自动将用户名和密码框填充。

解决方法1：因为浏览器是否自动填充内容，根据type=password来判断的。此时先将作为密码的输入框的type设成text,当点击密码输入框的时候，将其type属性设为password,这样问题就解决了。

解决方法2：可以在不需要默认填写的input框中设置  autocomplete= "new-password"
```

```vue
 <el-input autocomplete="off"
                  v-model="modifyForm.confrimPassword"
                  :maxlength="18"
                  type="text"
                  :placeholder="$t('modifyPassword.placeholder.confirmPassword')"
                  @οnpaste="()=>{return false}"
                  @οncοntextmenu="()=>{return false}"
                  @οncοpy="''"
                  @oncut="''">
        </el-input>
```

## 2.密码加密

- ### crypto-js

> `crypto-js` 是一个纯 `javascript` 写的加密算法类库 ，可以非常方便地在 `javascript` 进行 `MD5`、`SHA1`、`SHA2`、`SHA3`、`RIPEMD-160` 哈希散列，进行 `AES`、`DES`、`Rabbit`、`RC4`、`Triple DES` 加解密
>
> 这里介绍的是`AES`方式在vue项目中加密的用法

```js
//我们需要定义两个方法 ，分别是用于加密和解密，这里我将它放在了 utils 文件夹下，命名为 secret.js 
    const CryptoJS = require('crypto-js');  //引用AES源码js
    const key = CryptoJS.enc.Utf8.parse("1234123412ABCDEF");  //十六位十六进制数作为密钥
    const iv = CryptoJS.enc.Utf8.parse('ABCDEF1234123412');   //十六位十六进制数作为密钥偏移量 
    //解密方法
    function Decrypt(word) {
        let encryptedHexStr = CryptoJS.enc.Hex.parse(word);
        let srcs = CryptoJS.enc.Base64.stringify(encryptedHexStr);
        let decrypt = CryptoJS.AES.decrypt(srcs, key, { iv: iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 });
        let decryptedStr = decrypt.toString(CryptoJS.enc.Utf8);
        return decryptedStr.toString();
    }
    //加密方法
    function Encrypt(word) {
        let srcs = CryptoJS.enc.Utf8.parse(word);
        let encrypted = CryptoJS.AES.encrypt(srcs, key, { iv: iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 });
        return encrypted.ciphertext.toString().toUpperCase();
    }    
    export default {Decrypt ,Encrypt}
```

#### 

```js
 // 加密算法
import CryptoJS from "crypto-js";
 showEncryptAES(str) {
    let key = "q2ck7h95a6vd3l2f";
    let iv = "q2ck7h95a6vd3l2f";
    let mode = "ECB";
    let pad = "Pkcs7";

    let options = {
      key: CryptoJS.enc.Utf8.parse(key),
      iv: CryptoJS.enc.Utf8.parse(iv || key),
      mode: CryptoJS.mode[mode],
      pad: CryptoJS.pad[pad]
    };

    str = CryptoJS.AES.encrypt(str, options.key, {
      iv: options.iv,
      mode: options.mode,
      padding: options.pad
    });

    str = str.toString();
    return str;
  },
```



- ### jsencrypt

> jsencrypt就是一个基于rsa加解密的js库

```js
import JSEncrypt from 'jsencrypt'
/**rsa加密 */
var encryptor = new JSEncrypt()  // 创建加密对象实例
  //之前ssl生成的公钥，复制的时候要小心不要有空格
  var pubKey = '-----BEGIN PUBLIC KEY-----M...SiQIDAQAB-----END PUBLIC KEY-----'
  encryptor.setPublicKey(pubKey)//设置公钥
  var rsaPassWord = encryptor.encrypt('要加密的内容')  // 对内容进行加密
/**rsa解密 */
var decrypt = new JSEncrypt()//创建解密对象实例
  //之前ssl生成的秘钥
  var priKey  = '-----BEGIN RSA PRIVATE KEY-----MII...WRk=-----END RSA PRIVATE KEY----'
  decrypt.setPrivateKey(priKey)//设置秘钥
  var uncrypted = decrypt.decrypt(encrypted)//解密之前拿公钥加密的内容
```

























## 4.单点登录SSO

> SSO英文全称：Single sign on	是比较流行的企业业务整合的解决方案之一
>
> SSO是指在多系统应用群中登录一个系统，便可在其他所有系统中得到授权而无需再次登录，包括单点登录与单点注销两部分

#### 难点 localstorage的跨域存储

HTML5 的 postMessage 为解决跨域页面通信提供了一套可控的机制，假设有 a.com 和 b.com 两个页面。我们想通过 a 页面去修改 b 页面的本地数据。 我们需要做如下步奏：

- 在 a 页面创建一个 iframe ，嵌入 b 页面
- a 页面通过 postMessage 传递指定格式的消息给 b 页面
- b 页面解析 a 页面传递过来的消息内容，调用localStorage API 操作本地数据
- b 页面包装 localStorage 的操作结果，并通过 postMessage 传递给 a 页面
- a 页面解析 b 页面传递回来的消息内容，得到 localStorage 的操作结果



跨域共享localStorage

```
window.addEventListener('message',)
```



## 5.token刷新

#### 思路：token过期处理方式大概就是：

1. 第一种：跳回登陆页面重新登陆
2. 第二种：`catch` 401 ，然后重新获取 `token`

#### 对于第一种，很简单在vue中我们可以在 `axios` 拦截器中这样写：

```js
instance.interceptors.response.use(
  function (response) {
    // 对响应数据做点什么
    return response.data
  },
  function (error) {
    console.log(error)

    if (error.response) {
      if (error.response.status === 401) {
            Message.error('登陆过期请重新登陆！')
            setToken('')
            router.push({
              name: 'login'
            })
        }
      }
    }

    // 对响应错误做点什么
    return Promise.reject(error.response)
  }
)
```



#### 对于第二种，如何重新获取 `token`，这就要涉及到后端的知识了

```js
instance.interceptors.response.use(
  function (response) {
    // 对响应数据做点什么
    return response.data
  },
  function (error) {
    console.log(error)

    if (error.response) {
      if (error.response.status === 401) {
       
        // 如果当前路由不是login，并且用户有 “记住密码” 的操作
        // 那么去请求新 token
        if (router.currentRoute.name !== 'login') {
          if (getRemember() && getRefreshToken()) {

            return doRequest(error)
          } else {

            Message.error('登陆过期请重新登陆！')
            setToken('')
            router.push({
              name: 'login'
            })
          }
        }
      }
    }

    // 对响应错误做点什么
    return Promise.reject(error.response)
  }
)
```

```js
async function doRequest (error) {
  const data = await store.dispatch('refreshToken')

  return res
}

// refreshToken 中重新设置了 token 和  refresh_token
commit('setToken', { token, expiresIn })
setRefreshToken(token, refreshTtl / (60 * 60 * 24))
```

然后再发送一次请求

```js
async function doRequest (error) {
  const data = await store.dispatch('refreshToken')
  let { token_type: tokenType, access_token: accessToken } = data

  let token = tokenType + accessToken
  let config = error.response.config
  
  config.headers.Authorization = token

  const res = await axios.request(config)

  return res
}
```

