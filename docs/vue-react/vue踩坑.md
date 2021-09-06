# 一些Vue踩坑的细节

### 1.用${}时要注意不能用''或""而要用``

```js
getApply() {  
 this.$http.get(`/usage?type=all&page=${this.currentPage}`).then(response => {    
 ...  
 });
}
```

### 2.axios的delete方法传参时要用data:{}包裹住

```js
deleteDb(index, row) {  
 this.$http.delete("/usage", {
     data:{
         redis_usage_id:row.redis_usage_id
     }
 }).then(response => {  
     ...
 });
}
```

### 3.@click.native 原生点击事件：

给vue组件绑定事件时候，必须加上native ，不然不会生效（监听根元素的原生事件，使用 .native 修饰符）
相当于子组件内部处理click事件然后向外发送click事件：$emit("click".fn)

### 4.vue 中动态添加的 dom，事件和样式不生效

#### 事件

v-html： vue 中用来将 string 形式的 html 内容按普通 HTML 插入的命令，并且插入的内容不会作为 Vue 模板进行编译。

如：`<a @click="show(1)"></a>`，a 标签能成功渲染，但其绑定的事件无法触发。

**原因：**vue 没有将其作为 vue 的模板解析渲染，只是作为字符串插入进去了而已

**解决：**

1.**事件委托**

把一个元素响应事件（click、keydown…）的函数委托到跟 v-html 同级的元素中，然后通过事件冒泡判断标签是不是想要的那个，从而进行操作。

```js
<ul @click='eventTemp' v-html="toc">  /* 设置的代理事件 */
    /*这里是v-html插入的内容*/
</ul>

<script>
// 代理事件
const vm = new Vue({
  el: "#app",
  computed: {
    toc() {
        let tochtml = ''
        tochtml += `<a>123</a>`
        return tochtml
    }
  },
  methods: {
      eventTemp(e) {
          if (e.target.localName === 'a') { //e.target就是tochtml --> <a>123</a>
            //进行操作
            e.target.innerHTML = 321
          }
      }
  }
});
</script>
```

2.**不用 v-html 而用 component 模板编译**

组件中：

```html
<div id="app">
    我是父组件
    <div id="parent">
    </div>
</div>

<script>
import Vue from 'vue';
var MyComponent = Vue.extend({
  template: '<div><a @click="show(1)">我是大魔王</a><a @click="show(2)">我是二魔王</a></div>',
  methods: { 
    show(i) {
      console.log(i);
    },
  }
});
// 必须手动挂载$mount()。如果没有挂载的话，获取不到$el。component是手动挂载完后的组件实例
var component = new MyComponent().$mount();

export default {
  mounted() {
    // 放到页面中
    document.getElementById('parent').appendChild(component.$el);
    // component.$el就是template --> <div><a>我是大魔王</a><a>我是二魔王</a></div>
  },
}
</script>
```

3.**内容绑定事件**

假如 v-html 里面有一个 class="a" 的节点，要在这个 DOM 上绑定事件。然后调用 nextTick 中的回调函数进行操作。（因为 v-html 渲染视图是异步的，只能在下一个事件循环中处理）

```js
this.$nextTick().then(() => {
      $('.a').on('click',function(){
        // 在这里操作
     })
})
```

注意：v-html 适应的场景是假如服务端拼接好了dom节点需要前端直接渲染的时候。v-html 可正确解析出 dom 节点，但只适用输出展示，而不适合直接在 v-html 的内容内再定义 v-click 等事件，v-html 渲染的实质是字符串，而不是组件。所以最好不要这样用。

#### 样式

vue 组件中，通过 v-html 创建的 DOM 内容不受 scoped 样式影响。

**原因：**当 `<style>` 标签有 scoped 属性时，它的 CSS 只作用于当前组件中的元素。它会**为组件中所有的标签和 class 样式添加一个`scoped`标识**。因为动态添加的 dom 没有 `scoped` 添加的标识，**没有跟 `testAdd` 的样式匹配起来**，导致样式失效。

**解决：**

1.**去掉 scoped**

```
tochtml += `<a class="aclass">123</a>`

<style>
  .aclass {
    color: red
  }
</style>
```

2.**使用深度作用选择器**

```
<style scoped>
  ul >>> .aclass {
    color: red
  }
</style>
```

> 有些像 Sass 之类的预处理器无法正确解析 >>>。这种情况下你可以使用 /deep/ 或 ::v-deep 操作符取而代之——两者都是 >>> 的别名，同样可以正常工作。

3.**可以动态添加 style**

```
newDom.style.height = '100px';
newDom.style.width = '100px';
newDom.style.background = 'red';
```

#### 参考

[你或许不知道Vue的这些小技巧](https://juejin.im/post/6844903616101220365#heading-3)

[VUE v-html不能触发点击事件的解决方案](https://blog.csdn.net/qq_31393401/article/details/81017912)

[Vue项目--使用事件代理解决v-html 点击事件无效](https://blog.csdn.net/qq_42497250/article/details/102559195?utm_medium=distribute.pc_relevant.none-task-blog-BlogCommendFromMachineLearnPai2-1.channel_param&depth_1-utm_source=distribute.pc_relevant.none-task-blog-BlogCommendFromMachineLearnPai2-1.channel_param)

### 5.vue动态绑定style

在vue中动态绑定style时，要写成一个对象，并且属性名不能使用短横杠，要使用小驼峰

```vue
<div class='basic' :style="{fontSize:xxx+'px'}" />
```

也可以写成数组

```vue
<div class='basic' :style="[obj1,obj2]" />
```

也可以使用三元表达式

```html
<span v-bind:style="{'display':config.isHaveSearch ? 'block':'none'}" >动态绑定样式</span>
```



### 6.v-if

使用template对元素进行包裹，不会影响DOM结构，但只能配合v-if，不能使用v-show

```vue
<template v-if='true'>
	<h2>xxx<h2/>
	<h2>xxx<h2/>
<template/>
```

v-if 和 v-for 同时使用时存在bug



### 7.vue动态定义图片相对路径

当我在html模块或者css中引入图片的时候用相对路径，例：

```html
<div>
     <img src="../../assets/img/policeImg/tt.png">
</div>
```

这时候图片可以正常显示，但是我想把图片路径动态化，所以我会把图片路径绑定在data中。

```vue
<div>
     <img :src="img">
</div>
<script>
      export default {
           data () {
               return {
                   img: '../../assets/img/policeImg/tt.png'
               }
           }
      }
</script>
```

我们会发现图片显示不出来。



#### 第一种情况

图片放在assets文件夹下面，在html模版中直接引入或者在css中引入，如下：

 

![img](https://upload-images.jianshu.io/upload_images/9955987-b9a9c33695dfd2eb.jpeg)

 

 

![img](https://upload-images.jianshu.io/upload_images/9955987-cefa6573f76d56de.jpeg)





我们可以看到不管是在html中引入或在css中引入图片都会被解析成base64编码，打包之后dist文件夹中也不会有图片，而是在压缩文件中有base64编码。
  解释：因为加载一张图片就需要发送一次http请求，会降低页面性能，这个问题可以通过url-loader解决。url-loader会将引入的图片编码，生成dataURI。相当于把图片数据翻译成一串字符，再把这些字符打包到文件当中，最终只需要引入这个文件就可以访问这个图片。当然如果图片较大，编码会消耗性能，因此url-loader提供了一个limit参数，小于limit字节的文件会被转为DataURl，大于limit的还会使用file-loader进行copy，一般会放在static文件夹下面。



![img](https://upload-images.jianshu.io/upload_images/9955987-f1ef88f9d125f116.jpeg)



 

![img](https://upload-images.jianshu.io/upload_images/9955987-50a6a3dce83b903d.jpeg)



  上面代码中我们可以看到在css中引入assets文件夹中的图片，但是编译或打包之后都显示这张图片在static文件夹下面，说明这张图片大小超过了limit范围，所以直接被拷贝到static文件夹下。那么url-loader和file-loader有什么关系呢？
  简单的说，url-loader封装了file-loader，只需要安装url-loader即可，不需要安装file-loader。url-loader工作分两种情况：1.文件大小小于limit参数，url-loader将会把文件转为DataURL；2.文件大小大于limit，url-loader会调用file-loader进行处理，参数也会直接传给file-loader，file-loader将图片拷贝到static文件夹下。

#### 第二种情况

图片放在assets文件夹下面，在js中引入，如下：

 

![img](https://upload-images.jianshu.io/upload_images/9955987-b9145f4fe1248385.jpeg)



 

 

![img](https://upload-images.jianshu.io/upload_images/9955987-1d195fd503e819f3.jpeg)





从上图我们可以发现如果在js中直接写，编译后图片是无法显示的，但是如果用require或import就可以正常展示，而且跟在html中或者css中直接引入效果是一样的。

 

![img](https://upload-images.jianshu.io/upload_images/9955987-341f1a341770c853.jpeg)



 

![img](https://upload-images.jianshu.io/upload_images/9955987-ff51f351616a6efa.jpeg)

 

 

![img](https://upload-images.jianshu.io/upload_images/9955987-98c1c419e1d25e4e.jpeg)

  解释：使用不同的方式展示图片，webpack对他们的处理方式也是不同的：使用import或者require或者background都会被webpack的url-loader当做依赖模块处理，如果是直接写在js中，因为js是动态的所以webpack是不会处理的，打包后也不会显示在dist目录中。

#### 第三种情况

图片放在static文件夹下面，在html、css、js中直接引入，我们会发现图片都可以正常展示。

 

![img](https://upload-images.jianshu.io/upload_images/9955987-15b8ccdfe805cc3e.jpg)


总结：webpack只能处理静态资源。assets 和 static两个文件都是静态的，但是它们是有区别的，static文件夹下面的文件都是不能被webpack处理的，你必须使用绝对路径来引用这些文件，取决于在config.js里面加入的build.assetsPublicPath 和 build.assetsSubDirectory这两个属性设置的。其他地方的文件或图片都会被webpack解析成模块依赖，这时候就可以用url-loader和css-loader去处理。如果在js中引用图片，因为js是动态的所以没有办法去处理，但是我可以使用require或import将图片当成模块加载进来，就会被webpack当成静态文件解析，这时候就可以被url-loader处理。

 

**补充一个遇到的坑：**

最近做项目设置背景图片的时候发现了这个问题：

![img](https://img2020.cnblogs.com/blog/1556521/202005/1556521-20200509174225626-2032530563.png)

或者

![img](https://img2020.cnblogs.com/blog/1556521/202005/1556521-20200509174426141-769716704.png)

然后报错：

![img](https://img2020.cnblogs.com/blog/1556521/202005/1556521-20200509174206222-839250418.png)

 

后来改为：

![img](https://img2020.cnblogs.com/blog/1556521/202005/1556521-20200509174550095-1840130577.png)

 

 就没有报错了

为什么第三种情况不会报错呢？

vue2.5及以下版本以上三种写法都没有问题, 2.6就出现这个问题,应该和webpack配置相关 .
vue2.6用的是webapack4.0

 

为什么要这么写?

~和@又是什么意思呢?

webpack资源处理的规则,分为相对路径,没有前缀的路径；带~的路径,相对根目录的路径

```
1 相对路径: "./assets/start.png" 
2 没有前缀的路径 "assets/start.png" 被webpack解析为 相对路径
3 带~的路径  "~@/assets/theme/start.png" 被webpack解析为 require(src/assets/theme/start.png) 动态引入 
 @在webpack 被resolve.alias配置下等价于/src
4 相对根目录的路径 "/assets/start.png" webpack不解析
```