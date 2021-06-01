# 什么是shim 和 polyfill，@param

Published on Feb 7, 2021 in [web前端](https://106.54.190.214/index.php/category/web前端/) with [0 comment](https://106.54.190.214/index.php/archives/110/#comments)



在学习和使用 JavaScript 的时候，我们会经常碰到两个术语：shim 和 polyfill。它们有许多定义和解释，意思相近又有差异。



## Shim

Shim 指的是在一个旧的环境中模拟出一个新 API ，而且仅靠旧环境中已有的手段实现，以便所有的浏览器具有相同的行为。主要特征：

该 API 存在于现代浏览器中;
浏览器有各自的 API 或 可通过别的 API 实现;
API 的所有方法都被重新实现；
拦截 API 调用，并提供自己的实现；
是一个优雅降级。



## Polyfill

polyfill 是一段代码(或者插件)，提供了那些开发者们希望浏览器原生提供支持的功能。程序库先检查浏览器是否支持某个API，如果不支持则加载对应的 polyfill。主要特征：

是一个浏览器 API 的 Shim;
与浏览器有关;
没有提供新的API，只是在 API 中实现缺少的功能;
以只需要引入 polyfill ，它会静静地工作;
shim 的概念要比 polyfill 更大一些，可以将 polyfill 理解为专门兼容浏览器 API 的 shim 。简单的说，如果浏览器X支持标准规定的功能，那么 polyfill 可以让浏览器 Y 的行为与浏览器 X 一样。



## JavaScript的@param注解

@param是对函数参数进行解释作用，大型项目所用
/**
//大括号写类型
@param{number}a 第一个参数是数字类型
@param{number}a 第二个参数是数字类型
@returns 返回俩个参数的和
*/
function add(a,b){
return a+b;
}
然后当你使用add函数时，会有提示



# CSS3之Calc

Published on Feb 20, 2021 in [web前端](https://106.54.190.214/index.php/category/web前端/) with [0 comment](https://106.54.190.214/index.php/archives/129/#comments)





## 什么是Calc

calc是英文单词calculate的缩写，是css3的一个新增的功能，用来指定元素的长度。比如说，你可以使用calc()给元素的border、margin、pading、font-size和width等属性设置动态值。为何说是动态值呢?因为我们使用的表达式来得到的值。不过calc()最大的好处就是用在流体布局上，可以通过calc()计算得到元素的宽高。

如何使用
calc()使用通用的数学运算规则，但是也提供更智能的功能：

使用“+”、“-”、“*” 和 “/”四则运算；
可以使用%、px、em、rem等单位；
可以混合使用各种单位进行计算；
表达式中有“+”和“-”时，其前后必须要有空格，如"widht: calc(12%+5em)"这种没有空格的写法是错误的；
表达式中有“*”和“/”时，其前后可以没有空格，但建议留有空格。
使用起来其实很简单，比如:

```
.box {
  width: calc(50% + 2em);
  height: calc(100% - 2em);
  background-color: #f00;
}
```



## // 隐藏scroll-view的滚动条

```
::-webkit-scrollbar {
    display: none;
    width: 0;
    height: 0;
    background-color: rgba($color: #bdbdbd, $alpha: 0);
}
```

本文由 [简素言也](https://106.54.190.214/index.php/author/1/) 创作，采用 [知识共享署名4.0](https://creativecommons.org/licenses/by/4.0/) 国际许可协议进行许可



# 关于websocket和http协议

Published on Dec 25, 2020 in [web前端](https://106.54.190.214/index.php/category/web前端/) with [0 comment](https://106.54.190.214/index.php/archives/21/#comments)





## 背景分析:

完整的HTTP服务过程包括
1.对www.xxx.com这个网址进行DNS域名解析,获取对应的请求
2.根据这个IP,找到对应的服务器,发起TCP三次握手
3.建立TCP连接后发起HTTP请求
4.服务器响应HTTP请求,浏览器得到HTML代码
5.浏览器解析HTML代码,并请求HTML代码的资源
6.浏览器对页面进行渲染呈现给用户
7.服务器关闭TCP连接

HTTP协议是无状态的，服务器只会响应来自客户端的请求，但是它与客户端之间不具备持续连接。

当用户在浏览器上进行操作时，可以请求服务器上的api；但是反过来却不可能：服务器端发生了一个事件，无法将这个事件的信息实时主动地通知客户端。只有在客户端查询服务器当前状态时，所发生事件的信息才会从服务器传递到客户端。



## 那怎么去实时地知道服务器的状态呢？

方法有两个：

（1）轮询：客户端每隔很短的时间，都会对服务器发出请求，查看是否有新的消息，只要轮询速度足够快，例如1秒，就能给人造成交互是实时进行的印象。这种做法是无奈之举，实际上对服务器、客户端双方都造成了大量的性能浪费。

（2）长连接：客户端只请求一次，但是服务器会将连接保持，不会返回结果。当服务器有了新数据时，实时地发给客户端，而一直保持挂起状态。这种做法的也造成了大量的性能浪费。



## WebSocket 协议

最新的 HTML5协议，制定了 WebSocket 协议标准，允许客户端和服务器端以全双工的方式进行通信。

WebSocket 的原理非常简单：利用HTTP请求产生握手，HTTP头部含有 WebSocket 协议的请求，*握手之后，二者转用TCP协议进行交流（QQ的协议）。

WebSocket协议需要浏览器和服务器都支持才可以使用：

支持WebSocket协议的浏览器有：Chrome 4、火狐4、IE10、Safari5

支持WebSocket协议的服务器有：Node 0、Apach7.0.2、Nginx1.3



## http 长连接和 websocket 的长连接区别

HTTP1.1通过使用Connection:keep-alive进行长连接，HTTP 1.1默认进行持久连接。在一次 TCP 连接中可以完成多个 HTTP 请求，但是对每个请求仍然要单独发 header，Keep-Alive不会永久保持连接，它有一个保持时间，可以在不同的服务器软件（如Apache）中设定这个时间。

websocket是一个真正的全双工。长连接第一次tcp链路建立之后，后续数据可以双方都进行发送，不需要发送请求头。

keep-alive双方并没有建立正真的连接会话，服务端可以在任何一次请求完成后关闭。WebSocket 它本身就规定了是正真的、双工的长连接，两边都必须要维持住连接的状态。



## Socket.IO 的引入

Node.js上需要写一些程序，来处理TCP请求。

Node.js从诞生之日起，就支持 WebSocket 协议。不过，从底层一步一步搭建一个Socket服务器很费劲（想象一下Node写一个静态文件服务都那么费劲）。所以，有大神帮我们写了一个库 Socket.IO。

Socket.IO 是业界良心，新手福音。它屏蔽了所有底层细节，让顶层调用非常简单。并且还为不支持 WebSocket 协议的浏览器，提供了长轮询的透明模拟机制。

Node的单线程、非阻塞I/O、事件驱动机制，使它非常适合Socket服务器。

[Socket.IO 的官网](http://socket.io/)



- [背景分析:](https://106.54.190.214/index.php/archives/21/#menu_index_1)
- [那怎么去实时地知道服务器的状态呢？](https://106.54.190.214/index.php/archives/21/#menu_index_2)
- [WebSocket 协议](https://106.54.190.214/index.php/archives/21/#menu_index_3)
- [http 长连接和 websocket 的长连接区别](https://106.54.190.214/index.php/archives/21/#menu_index_4)
- [Socket.IO 的引入](https://106.54.190.214/index.php/archives/21/#menu_index_5)



本文由 [简素言也](https://106.54.190.214/index.php/author/1/) 创作，采用 [知识共享署名4.0](https://creativecommons.org/licenses/by/4.0/) 国际许可协议进行许可



# 不要再问我跨域的问题啦！

Published on Nov 17, 2020 in [web前端](https://106.54.190.214/index.php/category/web前端/) with [0 comment](https://106.54.190.214/index.php/archives/14/#comments)



首先，我们需要明白什么是跨域，跨域源自于[浏览器的同源策略](https://developer.mozilla.org/zh-CN/docs/Web/Security/Same-origin_policy)
协议、域名、端口，只要有一个不同，即为跨域。
跨域请求可以正常发起，但是**返回的结果会被浏览器拦截**
他的作用是为了预防[CSRF攻击](https://www.cnblogs.com/hyddd/archive/2009/04/09/1432744.html)

------



## **解决方案**



### 1. JSONP

在HTML标签里，一些标签比如script、img这样的获取资源的标签是没有跨域限制的（比如我们使用src引入外链、引入cdn）
向服务端发送请求，返回的数据作为一个指定的回调函数的参数，在另一个script中指定这个回调函数，这样就可以获取到服务端数据了
缺点：只支持GET请求，目前已经很少使用



### 2. CORS

"跨域资源共享"（Cross-origin resource sharing）即，后端在服务器端的 HTTP 响应中添加响应头字段
Access-Control-Allow-Origin：* 前端Web发出跨域请求后，浏览器会自动向我们的HTTP
header添加一个额外的请求头字段：Origin，标记了请求的来源，所以前端不需要做任何事，即可跨域请求。
CORS分成两类：简单请求和非简单请求

简单请求：请求为 GET、HEAD 或 POST，且请求头只有以下几种，此时请求无其他变化
Accept、Accept-Language、Content-Language、Last-Event-ID、
Content-Type：只限于三个值application/x-www-form-urlencoded、multipart/form-data、text/plain

非简单请求：除简单请求之外皆为非简单请求 此时发送请求时，会先执行一次 OPTIONS
查询请求（预检请求），以获知服务器是否允许该实际请求，然后再发送请求 不支持IE10以下，目前用的人不多



### 3. Webpack反向代理（主流方法）

使用我们的node后端，去反向代理目标地址服务器，只在我们开发时有效（因为开发时我们才会启动node后端服务）
具体方法为：在webpack.config.js中添加开发环境的配置

```
devServer: {
  host: 'localhost', // 域名
  port: 8080, // 端口号
  // 服务器代理，--> 解决开发环境的跨域问题
  proxy: {
    // 一旦 8080服务器接收到/api/xxx的请求，就会把请求转发到另外一个服务器3000
    '/api': {
      target: 'http://localhost:3000', // 表示目标资源的地址
      //secure: false, // 设置支持https协议的代理
      //changeOrigin: true, // target是域名的话，需要这个参数
      // 发送请求时，请求路径重写：将/api/xxx --> /xxx （去掉/api）
      pathRewrite: {
        '^/api': '' //如果本身的接口地址没有 '/api' 这种通用前缀，则需要rewrite
      }
    }
  }
}
```



### 4. Nginx反向代理 （主流方法）

Nginx是一种高性能的请求分发和反向代理web轻量服务器，类似于起到中转请求到真正数据存储服务器的中转站的作用
原理同webpack反向代理，不过此时为后端配置

```
server{
    # 监听9099端口
    listen 9099;
    # 域名是localhost
    server_name localhost;
    #凡是localhost:9099/api这个样子的，都转发到真正的服务端地址http://localhost:9871 
    location ^~ /api {
        proxy_pass http://localhost:9871;
    }     }
```

前端啥也不用干



### 5. webSocket（高级小众方法）

是一种HTML5中新增的通信协议，比起http协议更加安全，为不受限的双向通信，不会产生跨域问题



- 解决方案
  - [1. JSONP](https://106.54.190.214/index.php/archives/14/#menu_index_2)
  - [2. CORS](https://106.54.190.214/index.php/archives/14/#menu_index_3)
  - [3. Webpack反向代理（主流方法）](https://106.54.190.214/index.php/archives/14/#menu_index_4)
  - [4. Nginx反向代理 （主流方法）](https://106.54.190.214/index.php/archives/14/#menu_index_5)
  - [5. webSocket（高级小众方法）](https://106.54.190.214/index.php/archives/14/#menu_index_6)





# 关于原型链

Published on Nov 12, 2020 in [后端开发](https://106.54.190.214/index.php/category/后端/) with [0 comment](https://106.54.190.214/index.php/archives/90/#comments)





### 对于prototype的认识

每一个**函数**都有一个属性叫做prototype，它的属性值是一个对象，在这个对象中默认有一个constructor属性，指向这个函数的本身。



### 对于__proto__的的认识

__proto__是隐式原型，每一个**对象**都有一个这样的隐式原型属性，**它引用了创建这个对象的函数的prototype。**



### prototype和__proto__的关系

所有的对象**都是**由Object继承而来，对象**都是**由函数来创建的。
需要注意的是，函数也是对象，自然它也有__proto__。

**构造函数的显式原型的值为其对应实例对象的隐式原型的值。**
即 Function.prototype === fuction.__proto__

**所以的函数都是构造函数Function的实例，包括Function自身（new 自己）**
所以： Function.__proto__ === Function.prototype

原型链：沿着隐式原型__proto__查找（隐式原型链）对象的属性

原型继承： 构造函数的实例对象，自动拥有构造函数原型对象的属性和方法

object对象的原型尽头是原型链尽头，即为 null
![10.12.jpg](E:\syy-notes\docs\.vuepress\alias\472868472.jpg)

# 详谈后台管理系统的权限控制

Published on Oct 27, 2020 in [后端开发](https://106.54.190.214/index.php/category/后端/) with [0 comment](https://106.54.190.214/index.php/archives/80/#comments)





### 序

自己在做后台系统的时候涉及到权限管理这一块,于是乎总结了关于这方面的处理方法。权限管理一般是后端配合前端完成的,前端所做的就是控制视图层的展示和控制前端请求,简单理解就是降低非法操作和提高用户体验以及减轻服务器压力

思路如下：
1.导航栏的控制

在登录请求中， 会得到权限数据， 当然， 这个需要后端返回数据的支持． 前端根据权限数据， 展示对应的菜单． 点击菜单， 才能查看相关的界面

2.UI界面的控制

如果用户没有登录， 手动在地址栏敲入管理界面的地址， 则需要跳转到登录界面 如果用户已经登录， 如果手动敲入非权限内的地址， 则需要跳转404 界面或者危险操作提示 如果用户已经登录， 如果手动敲入登录的地址， 则需要提示并不做路由反应

3.按钮的控制

在某个菜单的界面中， 根据权限数据， 展示出可进行操作的按钮，比如删除， 修改， 增加

4.请求和响应的控制

如果用户通过非常规操作， 比如通过浏览器调试工具将某些禁用的按钮变成启用状态， 此时发的请求， 也可以被前端所拦截



## 实现



### 菜单栏控制

用户登录之后,拿到token,然后请求数据,根据这个数据对菜单栏进行渲染,类似于这种,但是最好将token和菜单信息不放在一个接口中,

```
{
 id: 1,
 username: 'admin',
 password: 'admin',
 token: 'abcd12efghqwe23klmnopqrstuvwx31234qr34yz',
 rights: [{
   id: 1,
   authName: '一级菜单',
   icon: 'icon-menu',
   children: [{
     id: 11,
     authName: '一级项目1',
     path: 'goods',
     rights: ['view', 'edit', 'add', 'delete']
   }, {
     id: 11,
     authName: '一级项目2',
     path: 'fetch',
     rights: ['view']
   }]
 }]
}
```

拿到数据后把数据存入vuex中,同时存入本地的sessionStorage中,并保持数据同步,然后主页根据vuex中的数据进行菜单列表的渲染
在退出登陆的时候

```
logOut(){
    sessionStorage.clear()  //删除sessionStorage数据
    this.$router.push('/login')
    window.location.reload()  //删除vue数据,让当前页面刷新
}
```



### 界面的控制

解决在未登录情况下在网址栏输入地址跳转进入管理平台

```
router.beforeEach((to, from, next) => {
if (to.path === '/login') {
 next()
} else {
 const token = sessionStorage.getItem('token')
 if (!token) {
   next('/login')
 } else {
   next()
 }
}
}
```

解决登陆后用户角色权限不够但仍能够使用网址进入所有路由,使用动态路由

首先,将需要权限控制的路由单独定义

```
import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store'
//默认页面
import Home from '@v/Home.vue'
import Login from '@v//Login.vue'
import NotFound from '@v//NotFound.vue'
import GoodsList from '@c/goods/GoodsList.vue'
import mapList from '@c/goods/mapList.vue'
import fetchList from '@c/goods/fetchList.vue'
//需要权限规则的单独定义

const GoodsRule = { path: '/Goods', component: GoodsList }
const mapRule = { path: '/map', component: mapList }
const fetchRule = { path: '/fetch', component: fetchList }

//后端拿到的路径字符串与权限路由进行映射
const ruleMapping = {
  'goods': GoodsRule,
  'map': mapRule,
  'fetch': fetchRule
}

//不会在路由中定义需要的权限路由,而是动态添加
const routes = [{
  path: '/',
  name: 'Home',
  component: Home,
  redirect: '/menu/one',
  children: [{
    path: '/menu/one',
    component: () =>import('@/views/Page1.vue')
  }]
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '*',
    name: 'NotFound',
    component: NotFound
  }]
export function initDynamicRouters() {
  //根据二级权限动态添加路由
  // console.log(router)
  //当前路由信息
  const currentRoutes = router.options.routes
  // 从vuEx拿到数据遍历添加
  const rightList = store.state.rightList
  rightList.forEach(item => {
    item.children.forEach(v => {
      //二级权限(根据字段给它分配对应的路由)
      const temp = ruleMapping[item.path]
      //给路由meta中添加当前角色可做的权限,在按钮控制中需要
    temp.meta=item.rights
      //添加动态路由
      currentRoutes[2].children.push(temp)
    })
  })
  //将更改之后的结果重新设置给路由对象
  router.addRoutes(currentRoutes)
}
```

如果重新刷新的话动态路由就会消失，动态路由是在登录成功之后才会调用的，刷新的时候并没有调用，所以动态路由没有添加上,可以在app.vue中的created中调用添加动态路由的方法initDynamicRouters



### 按钮的控制

虽然用户可以看到某些界面了， 但是这个界面的一些按钮该用户可能是没有权限的。 因此， 我们需要对组件中的一些按钮进行控制， 用户不具备权限的按钮就隐藏或者禁用， 而在这块的实现中， 可以把该逻辑放到自定义指令中,参考 官方描述

```
<el-button
    type="success"
    @click="addDiaLogVis=true"
    v-permission="{action:'add' ,effect:'disable'}">
    添加用户
</el-button>
import Vue from "vue"
import router from '@/router.js'
Vue.directive('permission', {
  inserted(el, binding) {
    //拿到例子中action的值,值为`add`,表示进行添加操作
    const action = binding.value.action
    //拿到例子中effect的值,值为`disable`,表示不可操作
    const effect = binding.value.effect
    //可以获取当前路由中用户角色是否具备action的权限
    //console.log(router.currentRoute.meta)
    //判断当前路由中用户角色是否具备action的权限
    if (router.currentRoute.meta.indexOf(action) == -1) {
      if (effect === 'disabled') {
    //禁用
        el.disabled = true
        el.classList.add('is-disabled')
      } else {
    //移除
        el.parentNode.removeChild(el)
      }
    }
  }
})
```



### 请求的控制

前端代码-->在axios发送前做一些处理 请求拦截器，响应拦截器



# CSS3/HTML5 新增特性

Published on Oct 7, 2020 in [web前端](https://106.54.190.214/index.php/category/web前端/) with [0 comment](https://106.54.190.214/index.php/archives/6/#comments)

[web前端](https://106.54.190.214/index.php/tag/web前端/)

子元素

```
li: nth-child(1) {}
```

水平居中的多种方法

```
margin: 0 auto;  

text-align: center;

position: absolute;
left: 50%;
top: 50%;
transform: translate(-50%, -50%)
```

垂直居中
`line-hight: height` 行高等于hight即为垂直居中

overflow:hidden的多种用法
1.父级元素内部子元素，添加margin-top样式，那么父级元素也会跟着下来，造成 外边距塌陷 ,给父级元素添加overflow:hidden，就可以解决

2.父级元素内部的子元素全部都设置浮动float之后，子元素会脱离标准流，不占位，父级元素检测不到子元素的高度，父级元素高度为0。
给父级加个overflow:hidden属性,清除浮动；在IE中兼容为 zoom:1

3.给一个元素中设置overflow:hidden，那么该元素的内容若超出了给定的宽度和高度属性，那么超出的部分将会被隐藏，不占位。
-->

overflow:auto的用法
<!-- 如果页面被缩小，会显示滚动条-->

去除空白空隙

```
vertical-align: top ;
```

CSS3(层叠样式表)新语句
`border-radius：15px` 圆角
`box-shadow：10px 10px 5px #888888;` 阴影
`border-image:url(border.png) 30 30 stretch或round;` 图片边框

渐变 `background-image: linear-gradient(direction, color-stop1, color-stop2, ...);`
文本溢出 `text-overflow: clip/ellipsis;`
换行 `p{word-wrap:break-word; }`

```
word-break: keep-all/break-all;
```

引入字体

```
@font-face{font-family: myFirstFont;src:url();}
div{font-family:myFirstFont;}
```

2D转换和3D转换

```
translate(x,y)；rotate(angle角度，如30deg)；scale(x,y)；skew()；matrix()
```

过渡

```
transition: 属性1 过渡时间1，属性2 时间2，...;
```

动画
1.先创建动画,指定css样式和新的样式
例如：

```
 @keyframes 动画名字{
  from {background:red;}
  to {background:yellow;}
}
```

2.然后将动画绑定到一个选择器，规定动画时长
例如：

```
 div{
  animation: 动画名字 5s;
}
```

创建多列 例：分割三列 colum-count:3；

`resize:both` 用户可调整某个元素大小
`box-sizing: border-box;`-----C3盒子模型：盒子的宽度=width（里面包换了 border和padding，不会撑大盒子了）
`box-sizing: content-box;`-----传统模式：盒子的宽度=CSS中设置的width+border+padding；

图片 image
可以通过改变border，padding来修改图片

css3分页样式

flex box弹性盒子
多媒体查询 `@media 媒体类型 not|only|and （媒体特性）{}`
例如：

```
 @media screen and (min-width:320px){
  div{
    background-color: red;
  }
}
```

透明 opacity属性为0.0-1.0之间

```
{opacity:0.4;
  filter:alpha(opacity=40); /* IE8 及其更早版本 */}
```

HTML5 中的一些有趣的新特性：

用于绘画的 canvas 元素（图形标签）
内联SVG （可伸缩矢量图 ）
例如：

```
<svg xmlns="http://www.w3.org/2000/svg" version="1.1">
  <circle圆形  cx="100" cy="50"圆心100.50，半径40 r="40" stroke="black"
  stroke-width="2"黑框 fill="red"红底 /> </svg>
```

用于媒介回放的 video 和 audio 元素
对本地离线存储的更好的支持
新的特殊内容元素，比如 article、footer、header、nav、section
新的表单控件，比如 calendar、date、time、email、url、search