---
sidebarDepth: 2
---

# uniapp

uni-app是逻辑和渲染分离的，渲染层在app端提供了两套排版引擎。

**vue文件走的webview渲染**
**nvue走weex方式的原生渲染**

注：在 uni-app 中，nvue 和 vue 页面可以混搭使用，使用uni.$on,uni.$emit的方式进行页面通讯。

## 一、vue文件

##### vue文件，使用的webview渲染，[什么是webview渲染？](./xuanran)

#### html标签的变化：

```js
//div 改成 view
//span、font 改成 text
//a 改成 navigator
//img 改成 image
//input 仅仅是输入框。 
//form、button、label、textarea、canvas、video 这些还在。
//select 改成 picker
//iframe 改成 web-view
//ul、li没有了，都用view替代。做列表一般使用uList组件
//audio不再推荐使用，改成api方式，背景音频api文档
```

#### 新增了一批手机端常用的新组件：

```js
//scroll-view 可区域滚动视图容器
//swiper 可滑动区域视图容器
//icon 图标
//rich-text 富文本（不可执行js，但可渲染各种文字格式和图片）
//progress 进度条
//slider 滑块指示器
//switch 开关选择器
//camera 相机
//live-player 直播
//map 地图
//cover-view 可覆盖原生组件的视图容器 
```

cover-view需要多强调几句，uni-app的非h5端的video、map、canvas、textarea是原生组件，层级高于其他组件。如需覆盖原生组件，则需要使用cover-view组件。详见层级介绍

#### js的变化

```js
//alert,confirm 改成 uni.showmodel
//ajax 改成 uni.request
//cookie、session 没有了，local.storage 改成 uni.storage
```

#### css的变化

```js
// * 选择器不支持；
//元素选择器里没有body，改为了page
//使用rpx为单位
```

#### 关于本地缓存

`uni.setStorage(OBJECT)` 与 `uni.getStorage(OBJECT)` 这两个是异步缓存，将数据放到本地缓存指定的key中，一个存一个取；

`uni.setStorageStnc(KEY，DATA)` 与 `uni.getStorage(KEY)` 其实这个跟第一个基本上是没有区别的，一个异步一个同步；

`uni.removeStorage（OBJECT）` 与 `uni.removeStorageSync（KEY）` 清除了你本地指定key中的内容；

`uni.clearStorage()` 与 `uni.clearStorageSync()` 清除了所有的本地数据 ；

------

## 二、nvue文件

##### nvue是基于weex方式的原生渲染，适用于app客户端，且必须使用flex布局

1.选择器仅支持class 选择器
/ *错误* /

```css
    #id {}
    .a .b .c {}
    .a > .b {}
```

/ *正确* /

```css
.class {}
```

2.border 不支持简写
/ *错误* /

```css
.class {
   border: 1px red solid;
}
```

/ *正确* /

```css
.class {
   border-width: 1px;
   border-style: solid;
   border-color: red;
}
```

3.background 不支持简写
/ *错误* /

```css
.class {
   background: red;
}
```

/ *正确* /

```css
.class {
   background-color: red;
}
```

vue和nvue页面可以混用

------

## 三、vscode构建uniapp项目配置

1.全局安装vue-cli, 用脚手架创建uniapp项目；
2.去gitee下载 uniapp 代码块，放在.vscode 项目本地配置；

3.安装组件语法提示
`npm i @dcloudio/uni-helper-json`

4.使用scss样式
先安装node-sass
`npm install node-sass`
然后安装sass-loader，这里安装7.3.1版本，版本可选择性更新，因为高版本可能会报错
使用 cnpm 会快一些
`cnpm install sass-loader@7.3.1`

5.运行项目（配置好package.json后直接使用npm run 即可 ）
`npm run dev:%PLATFORM%`
发布项目
`npm run build:%PLATFORM%`
%PLATFORM% 可选值参见package.json中的scripts

------

## 四、uniapp的一些坑

##### 1.uniapp不支持keep-alive

什么是keep-alive？ 就是对动态组件选项状态的缓存

只能在js里封装为类去模拟keep-alive的效果

```js
//建立类
let example = function(){},
example.prototype.fuc = function(){
//你的逻辑
};
//暴露出
module.exports = example
```

