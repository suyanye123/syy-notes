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

