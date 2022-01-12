# cyml-mh

### 目录结构

```
cyhl-mh 门户网站
|	node_modules			// 依赖包
│   public                  // 静态文件
└───static
|	|	js
|	|	└───jquery.min.js	// jquery生产版本包
|	favicon.ico				// 图标
|	index.html				// 打包后渲染页面
|	src                     // 业务逻辑代码
│   └───api                 // http api 层
|	|	assets				// wx-js-sdk等
│   |   components          // 公共组件
|	|	font				// 字体
│   │   utils               // 工具库
|	|	views				// 页面布局
│   │   store               // vuex
|	|	router				// 路由
|	|	App.vue				// 根组件
│   │   main.js             // 入口文件
|	|	main.scss			// 全局样式
|	.env.dev				// 开发环境全局环境变量
|	.env.prod				// 生产环境全局环境变量
|	vue.config.js			// webpack配置
```



### 依赖

#### 1.animate.css

> [animate.css](https://www.dowebok.com/demo/2014/98/)是一个使用CSS3的animation制作的动画效果的CSS集合，里面预设了抖动（shake）、闪烁（flash）、弹跳（bounce）、翻转（flip）、旋转（rotateIn/rotateOut）、淡入淡出（fadeIn/fadeOut）等多达 60 多种动画效果，几乎包含了所有常见的动画效果

```html
<!-- 使用方法，直接在元素上添加animated和对应的类名即可 -->
<div class="box animated flash"></div>
<!-- 更改动画设置 -->
<style>
#dowebok {
    animate-duration: 2s;    //动画持续时间
    animate-delay: 1s;    //动画延迟时间
    animate-iteration-count: 2;    //动画执行次数
}
</style>
```

#### 2.core-js

#### 3.crypto-js

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

#### 4.element-ui

```js
//el-ui引入 main.js
import ElementUI from 'element-ui';
import "element-ui/lib/theme-chalk/index.css";		//默认主题
Vue.use(ElementUI);
```

#### 5.jsencrypt

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





### 注意点

#### 1.全局样式

[清除浮动](https://blog.csdn.net/qq_44280574/article/details/108323859)

```css
//main.scss中
.fr {
  position: relative;
  float: right;
}
.clearfix:after {
  visibility: hidden;
  display: block;
  font-size: 0;
  content: " ";
  clear: both;
  height: 0;
}
```



#### 2.弹性布局兼容

在更早版本的浏览器，还没有弹性布局的概念，如：ie8等  要实现弹性布局 这个时候就要使用另一种方式（float），这种方式只是模仿弹性布局，float+clear+margin(padding)实现弹性的样式，这种只是为了兼容低版本的一些不存在弹性布局的浏览器