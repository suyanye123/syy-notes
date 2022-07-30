## 引入全局scss文件

##### 安装插件

```
npm install sass-resources-loader --save-dev
```

#####  vue.comfig.js 配置文件

```js
module.exports = {
  css: {
    loaderOptions: {
      sass: {
        prependData: `@import "@/styles/init.scss";`
      }
    }
  }
}

```

##### 最后书写函数或者变量皆可以全局引用了，不再需要每个文件单独添加了



## 1.全局样式

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

#### 3.animate.css

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

