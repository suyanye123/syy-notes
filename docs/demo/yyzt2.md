# yyzt2.0

记录yyzt2.0的修改过程

### 脚手架搭建项目

```js
vue create yyzt2.0		//创建vue3项目
```



### 响应式适配

设置五个断点

```scss
/* XLarge */
@media screen and (max-width: 1680px) {}	

/* Large */
@media screen and (max-width: 1280px) {}

/* Medium */
@media screen and (max-width: 1024px) {}
  
/* Small */
@media screen and (max-width: 736px) {}
  
/* XSmall */
@media screen and (max-width: 480px) {}
```



### 跳转外部链接

1.使用a标签

```html
<a href="http://www.eggcake.cn/">
```

2.window.location.href  在当前窗口中打开

```vue
<div onclick='window.location="http://syy123.com/"'>跳转1</div>
```

3.window.open()  打开一个新页面（保留原页面不关闭）

```vue
<div onclick='window.open("http://syy123.com/")'>跳转2</div>
```



### 监听鼠标滚轮滚动事件

```html
//在mounted()方法里监听mousewheel；
// chrome and ie
window.addEventListener('mousewheel',this.handleScroll,false)
// firefox
window.addEventListener"DOMMouseScroll",this.handleScroll,false)
<script>
export default {
       mounted (){
            this.imgHeight = document.documentElement.clientHeight || document.body.clientHeight;
            window.addEventListener('mousewheel',this.handleScroll,false)
        },
        data () {
            return {
                items:[
                    {
                        'url':require("./assets/pin_01.jpg"),
                    },
                    {
                        'url':require("./assets/pin_02.jpg"),
                    },
                    {
                        'url':require("./assets/pin_03.jpg"),
                    }
                ],
                isShow:true,
                nowIndex:0,
                imgHeight:""
            }
        },
         methods:{
            goto(index){
                this.isShow = false
                setTimeout(() => {
                    this.isShow = true
                    this.nowIndex = index
                }, 10)
            },
            handleScroll (e) {
              //var direction = e.deltaY>0?'down':'up' 该语句可以用来判断滚轮是向上滑动还是向下
              if(document.getElementsByTagName("li").length == 1){   
              //此处决定无论一次滚轮滚动的距离是多少，此事件都得等上次滚动结束，才会执行本次
                   this.isShow = false
                    setTimeout(() => {
                        this.isShow = true
                        ++ this.nowIndex
                        if(this.nowIndex == 3){
                        this.nowIndex = 0
                    }
                    }, 10)
                }
            }
             
           }
  }
</script>
<template>
  <div id="app">
    <div class="img-div" v-bind:style="{ height: imgHeight + 'px' }">
        <ul>
            <transition name="slide">
                <li v-if="isShow">
                    <img :src="items[nowIndex].url" v-bind:style="{ height: imgHeight +'px'}" >
                </li>
            </transition>
            <transition name="slideLeave" >
                <li  v-if="!isShow">
                    <img :src="items[nowIndex].url" v-bind:style="{ height: imgHeight +'px'}">
                </li>
            </transition>
        </ul>
    </div>
  </div>
</template>

```

图片防盗链

```js
// js部分  比较请求头中的 Host(请求的主机)和 Referer(来源)两个参数
const fs = require("fs");
const path = require("path");
const http = require("http");
const url = require("url");
constgetHostName = function(str) {
  let { hostname } = url.parse(str);
  returnhostname;
};
http
  .createServer((req, res) => {
    letrefer = req.headers["referer"] || req.headers["referrer"]; // 请求头都是小写的
    // 先看一下refer的值，去和host的值作对比，不相等就需要防盗链了
    // 要读取文件 返回给客户端
    let { pathname } = url.parse(req.url);
    letsrc = path.join(__dirname, "public", "." + pathname);
    // src代表我要找的文件
    fs.stat(src, (err) => {
      // 先判断文件存不存在
      if (!err) {
        if (refer) {
          // 不是所有图片都有来源
          letreferHost = getHostName(refer);
          lethost = req.headers["host"].split(":")[0];
          if (referHost !== host) {
            // 防盗链
            fs.createReadStream(path.join(__dirname, "public", "./1.jpg")).pipe(
              res
            );
          } else {
            // 正常显示，如果路径存在，可以正常显示直接返回
            fs.createReadStream(src).pipe(res);
          }
        } else {
          // 正常显示，如果路径存在，可以正常显示直接返回
          fs.createReadStream(src).pipe(res);
        }
      } else {
        res.end("end");
      }
    });
  })
  .listen(8888);
```



