# CDN配置

## 静态资源cdn

基于网站的带宽及其它原因，我们通常将图片等一些静态资源文件都存放在七cdn上，以镜像存储方式提供访问。

国内免费又好用的图床，一个是七牛云和另一个是又拍云,土豪可绕路阿里云和腾讯云。当然，想白嫖，前提是你必须要有个备案的域名。

七牛云：注册认证后有10G永久免费空间，每月10G国内和10G国外流量，速度相当快，七牛云是国内专业CDN服务商，插件支持比较多，有免费ssl证书，但https流量收费；

又拍云：注册认证后有10G永久免费空间，每月15G的HTTP和HTTPS流量，提供两款可以免费续期的SSL证书，不过用户需要加入又拍云联盟（即在网站底部添加又拍云logo及官网链接）  

![img](https://pic4.zhimg.com/50/v2-12132f0e09bd1f20a45ce61d312b8b49_hd.jpg?source=1940ef5c)![img](https://pic4.zhimg.com/80/v2-12132f0e09bd1f20a45ce61d312b8b49_720w.jpg?source=1940ef5c)

 又拍云认证比较麻烦，所以选用了七牛云。



简单说明下Http与Https流量的明显区别，走http流量，浏览器提示不安全。走https流量，浏览量显示安全锁，见下图：  

![img](https://pic1.zhimg.com/50/v2-4e09f368dfb25be86b498fbc1fbd1b30_hd.jpg?source=1940ef5c)

![img](https://pic4.zhimg.com/50/v2-2d400f617c14c89ac99b99560830d1f7_hd.jpg?source=1940ef5c)![img](https://pic4.zhimg.com/80/v2-2d400f617c14c89ac99b99560830d1f7_720w.jpg?source=1940ef5c)

七牛云账号注册及空间创建请自行查看七牛文档。

域名解析商官网->DNS->添加域名解析：主机记录：image（换成你的域名前缀）、记录类型：CNAME、记录值填写七牛云生成值。

七牛云管理控制台->CDN->域名管理->点击域名配置->回源配置:修改配置如下图：  

![img](https://pic4.zhimg.com/50/v2-cf5df0a2bc9776c39cf3e420e950c98f_hd.jpg?source=1940ef5c)
原文链接：https://www.zhihu.com/question/30319173/answer/1060498256



## 图床的使用

**[PicGo](https://github.com/Molunerfinn/PicGo): 一个用于快速上传图片并获取图片 URL 链接的工具**

PicGo 本体支持如下图床：

- `七牛图床` v1.0
- `腾讯云 COS v4\v5 版本` v1.1 & v1.5.0
- `又拍云` v1.2.0
- `GitHub` v1.5.0
- `SM.MS V2` v2.3.0-beta.0
- `阿里云 OSS` v1.6.0
- `Imgur` v1.6.0



[参考教程](https://blog.csdn.net/weixin_39777540/article/details/110491770)

或[https://blog.csdn.net/Henghao123/article/details/106961488/](https://blog.csdn.net/Henghao123/article/details/106961488/)



### 比如GitHub

#### 1.先解决访问慢的问题

   在C:\Windows\System32\drivers\etc目录下找到hosts文件，右键用记事本或者其他编辑器打开，在最下面另起一行添加下面的文本：

```css
192.30.253.112 github.com 
185.199.109.153 assets-cdn.github.com 
199.232.5.194 github.global.ssl.fastly.net 
140.82.114.9 codeload.github.com 
199.232.28.133 raw.githubusercontent.com
```

   保存。

#### 2.创建一个GitHub账号

   在官网[https://github.com/](https://links.jianshu.com/go?to=https%3A%2F%2Fgithub.com%2F)注册登录即可，过程略。

#### 3.新建一个仓库（Repositories）用来存放图片

```dart
1. 登录后在主页左侧点击New
2. 填写Repository name名称，这里以img为例。
3. Description随便填，如这是我的图床。
4. 选择Public公开。
5. Initialize this repository with a README可不选。
6. 最后单击Create repository即可。
```

#### 3.获取Token

1. 单击右上角头像，下来菜单中选择settings。

2. 在左侧导航栏找到Developer settings。

   ![img](https:////upload-images.jianshu.io/upload_images/17029678-7656c08d619ed359.png?imageMogr2/auto-orient/strip|imageView2/2/w/1002/format/webp)

   img

1. 在弹出的产生token页面，Token description随意填写，但是一定要勾选上这几项。

   ![img](https:////upload-images.jianshu.io/upload_images/17029678-55b2842f6875b416.png?imageMogr2/auto-orient/strip|imageView2/2/w/784/format/webp)

   img

   注：token要保管好，丢了只能重新获取，之前的就失效了。

#### 4.配置PicGo



```cpp
1. 打开后左侧选择图床设置，找到GitHub图床。
2. 仓库名填写自己的ID/刚刚创建的仓库名，如Tom/img。
3. 分支名填master。
4. Token填入刚刚获取到的Token。
5. 存储路径不用填。
6. 自定义域名按https://raw.githubusercontent.com/id名/仓库名/master的格式填写。
7. 单击确定，大功告成。
```






## 公共库cdn 

#### 1.[BootCDN](https://www.bootcdn.cn/) 

稳定、快速、免费的前端开源项目 CDN 加速服务



#### 2.[ Staticfile CDN](http://www.staticfile.org/)



#### 3.**Google Ajax API** 

统一了Google自己的JS库和当前主流的JS库，包括YUI、Ext.JS、Dojo、jQuery、SWFObject等，以及不同的版本，还有压缩和不压缩的，为开发者提供动态自动加载的特性，打开了一个新的局面。

**加载**

在Google网站上，提示需要API key才能使用，而实际上是不需要的，Google已经全部放开了，如下简单代码即可完成Google Ajax API的引用：

```js
<script type="text/javascript" src="https://www.google.com/jsapi"></script>  
```

**GoogleLoader**

从其整体上看，Google Ajax API关键是Loader，各个JS库均是以模块的方式存在，通过动态加载，其规则为：

```
google.load(moduleName, moduleVersion, optionalSettings) 
```

其中：

moduleName：模块名；

moduleVersion：模块版本； 

optionalSettings：可选设置，属性有：

  callback：加载完成的回调；

  language：加载模块的UI语言；

  nocss：bool类型，是否加模块相关的CSS，默认为false；

  packages：指定模块使用过程中会涉及到的其它相关包；

  base_domain：指定模块的顶级域，如加载GoogleMap模块maps时，指定域为ditu.google.cn，会自动加载中文版的地图API；

   other_params：其它参数，通过<script>标签完成，细节参考Google网站。

目前不支持动态加载的JS库有：
Friend Connect
Earth
gData
Orkut
它们不支持回调。

**示例**

*加载模块*

```
<script type="text/javascript">   google.load("search", "1");   google.load("jquery", "1.4.2");   google.load("jqueryui", "1.7.2"); </script> 
```

*回调*

```
function mapsLoaded() {   var map = new google.maps.Map2(document.getElementById("map"));   map.setCenter(new google.maps.LatLng(37.4419, -122.1419), 13); }  function loadMaps() {   google.load("maps", "2", {"callback" : mapsLoaded}); } 
```

##### googleapis.com是谷歌提供给网站的便利，网站可以直接引用上面的文件和使用一些服务。

因为谷歌服务器在宽带上的优势，很多网站，都加载了这个域名的一个或多个文件。

这个网站有多个子域名，其中被广泛应用的有ajax，fonts，maps，translate。

由于google已经完全被墙了，所以`一些像ajax.googleapis.com`等前端公共库无法加载。



## 公共接口

https://api.github.com/search/users?q=xxx