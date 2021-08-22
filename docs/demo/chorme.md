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

