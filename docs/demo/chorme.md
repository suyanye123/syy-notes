# 自定义chrome新建标签页

### 原理介绍:

实质就是让自定义的html文件成为chrome新建标签页



创建manifest.json文件
先创建一个TXT文件
输入以下内容

```json
 {
 "name": "XX",
 "description": "XX Startpage",
 "manifest_version":2,
 "version": "1.0",
 "chrome_url_overrides": {
   "newtab": "XX.html" }
 }


```

保存并将文件命名为manifest.json

------

步骤三：创建XX.html文件


> Ⅰ、Chrome start pages by =White-Baron
>
> 链接地址 [→link](http://white-baron.deviantart.com/art/Chrome-start-pages-173816153?q=boost%3Apopular startpage chrome&qo=0)
> 下载地址 [→link](http://www.deviantart.com/download/173816153/chrome_start_pages_by_white_baron-d2vhheh.zip)
> 将html文件中的http地址补全即可

> Ⅱ、cloudglass startpage chrome by_pu22pu-d3er09c
>
> 链接地址
>
>  
>
> →link
>
> 下载地址
>
>  
>
> →link
>
> ------
>
> 对于这个设计，个人比较喜欢，于是就自己补充了一下，做了一个扩展
>
> 效果如下图
>
> 附件下载：

> Ⅲ、简洁型
>
> 1、如果是只需要空白标签页的话，那么就可以不用编辑，直接保存为XX.html文件即可
>
>  2、如果想要有背景的空白标签页的话，那么按以下步骤做
>
> ①将你想要的背景图片放到XX文件夹中，假设其文件名为YY.jpg
>
> ②在txt文件中输入
>
> 1. <body background=YY.jpg style="margin: 0px;">
>2. </body>
> 
>③保存为XX.html文件即可
>  
>




------

步骤四：使用chrome进行打包
1、点击chrome扳手→工具→扩展程序（或者直接在地址栏输入chrome://extensions/）
2、点击开发人员模式
这时你会看到

> 开发人员模式： 载入正在开发的扩展程序... 打包扩展程序... 立即更新扩展程序


选择“打包扩展程序... ”，浏览扩展程序根目录，选择一开始就建好的XX文件夹，然后点击确定即可
3、XX.crx文件会在XX文件夹的上一级文件夹中生成，将这个crx文件拖入chrome浏览器窗口安装即可

### 启发点：

chrome由于自带pdf插件，所以可以打开pdf文件
利用这一特性，你也可以在html文件中填写pdf文件所在文件的URL地址（但必须加上file:///前缀），从而实现不出浏览器就看本地电子书的功能。

### 扩展：

html网页可以自动跳转　所以我们可以写一个空白网页　

在新建标签页时自动跳转到我们想要的网页

```html
<html> 
<head> 
<title>Google</title> 
<meta http-equiv="refresh" content="0;url=http://www.google.com"> 
</head> 
<body> 

</body> 
</html>
```

