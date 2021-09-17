# sass

> 更多技巧可参考[ 大漠 ](https://www.w3cplus.com/)博客

## Sass 变量

变量用于存储一些信息，它可以重复使用。

Sass 变量可以存储以下信息：字符串/数字/颜色值/布尔值/列表/null 值

### 使用方法：

```css
/*$variablename: value;*/
$myFont: Helvetica, sans-serif;
$myColor: red;
$myFontSize: 18px;
$myWidth: 680px;

body {
  font-family: $myFont;
  font-size: $myFontSize;
  color: $myColor;
}

#container {
  width: $myWidth;
}
```

### sass作用域

Sass 变量的作用域只能在当前的层级上有效果，如下所示 h1 的样式为它内部定义的 green，p 标签则是为 red。

```css
$myColor: red;
h1 {
  $myColor: green;   // 只在 h1 里头有用，局部作用域
  color: $myColor;
}
p {
  color: $myColor;
}
```

### 全局变量

```css
/*Sass 中我们可以使用 !global 关键词来设置变量是全局的*/
$myColor: red;

h1 {
  $myColor: green !global;  // 全局作用域,覆盖前面的red
  color: $myColor;
}
p {
  color: $myColor;
}
/*注意：所有的全局变量我们一般定义在同一个文件，如：_globals.scss，然后我们使用 @include 来包含该文件*/
```



## @mixin

- 在sass中可以声明@mixin来使用sass的一个规则集中

```css
// 声明mixin模块
@mixin border-1px {
    position: relative;

    &:after {
        display : block;
        position: absolute;
        left: 0;
        right: 0;
        bottom: 0;
        height: 1px;
        background-color: red;
    }

}
```

- 要注意的是,要使用mixin还需要@include去引用sass规则集

```css
.box {
    width: 100px;
    font-size: 18px;
    height: 21px;
    // 在其他选择器中引入mixin
    //  sass代码规范中 @include 一定要放在当前选择器所有属性之后,嵌套的选择器之前
    @include border-1px();
    
    .small {
        // ...
    }
}
```

- mixin也能传参数,也可以设置默认值

```css
@mixin border-px($px:1px, $color:skyblue) {
    position: relative;

    &:after {
        display         : block;
        position        : absolute;
        left            : 0;
        right           : 0;
        bottom          : 0;
        height          : $px;
        background-color: $color;
    }

}

.box {
    width    : 100px;
    font-size: 18px;
    height   : 21px;
    @include border-px(2px, blue);
}

/*编译后*/

.box {
  width: 100px;
  font-size: 18px;
  height: 21px;
  position: relative;
}
.box:after {
  display: block;
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  height: 2px;
  background-color: blue;
}
```

- 要注意的是,传参时前置位的参数不能为空,否则报错

```css
.box3 {
   @include border-px(, blue);  //Error,已传实参前不可以使用默认值
}
```

更多

```scss
    //-----------------------------------浏览器前缀-----------------------------------------
    //例子：@include css3(transition, 0.5s);
    @mixin css3($property, $value) {
        @each $prefix in -webkit-,
        -moz-,
        -ms-,
        -o-,
        '' {
            #{$prefix}#{$property}: $value;
        }
    }
    
    //-----------------------------------Retina图片-----------------------------------------
    @mixin image-2x($image, $width, $height) {
        @media (min--moz-device-pixel-ratio: 1.3), (-o-min-device-pixel-ratio: 2.6/2), (-webkit-min-device-pixel-ratio: 1.3), (min-device-pixel-ratio: 1.3), (min-resolution: 1.3dppx) {
            /* on retina, use image that's scaled by 2 */
            background-image: url($image);
            background-size: $width $height;
        }
    }
    
    //-----------------------------------清除浮动-----------------------------------------
    //引用例子：@include clearfix();
    @mixin clearfix() {
        &:before,
        &:after {
            content: "";
            display: table;
        }
        &:after {
            clear: both;
        }
    }
    
    //-----------------------------------Black和White-----------------------------------------
    //特别声明，上面这个不属于Sass的Mixins范畴，是Sass的自定义函数功能。
    //background:black(0.15);
    //color:white(0.9);}
    @function black($opacity) {
        @return rgba(0, 0, 0, $opacity)
    }
    
    @function white($opacity) {
        @return rgba(255, 255, 255, $opacity)
    }
    
    //-----------------------------------内阴影和外阴影-----------------------------------------
    //引用例子:@include box-emboss(0.8, 0.05);
    @mixin box-emboss($opacity, $opacity2) {
        box-shadow: white($opacity) 0 1px 0, inset black($opacity2) 0 1px 0;
    }
    
 
    
    //-----------------------------------行高-----------------------------------------
    //引用例子:@include line-height (16);
    @mixin line-height($heightValue: 12) {
        line-height: $heightValue + px; //fallback for old browsers
        line-height: (0.125 * $heightValue) + rem;
    }
    
    //-----------------------------------隐藏文字-----------------------------------------
    //引用例子：
    //.logo{
    //    background: url("logo.png");
    //    height:100px;
    //    width:200px;
    //   @include hide-text;
    //}
    @mixin hide-text {
        overflow: hidden;
        text-indent: -9000px;
        display: block;
    }
    
    //-----------------------------------响应式断点-----------------------------------------
    //引用例子：
    //@include breakpoint(large) {
    //    width: 60%;
    //}
    //@include breakpoint(medium) {
    //    width: 80%;
    //}
    //@include breakpoint(small) {
    //    width: 95%;
    //} 
    @mixin breakpoint($point) {
        @if $point==large {
            @media (min-width: 64.375em) {
                @content;
            }
        }
        @else if $point==medium {
            @media (min-width: 50em) {
                @content;
            }
        }
        @else if $point==small {
            @media (min-width: 37.5em) {
                @content;
            }
        }
    }
    
    //-----------------------------------正三角-----------------------------------------
    //正三角的通用属性
    %triangleBase {
        _font-size: 0;
        _line-height: 0;
        _overflow: hidden;
        width: 0;
        height: 0;
        
    }
    
    //regulaTriangle:正三角(dashed默认透明)
    //例子：@include regulaTriangle(top,red);
    @mixin regulaTriangle($derection:bottom, $color: #000, $width: 20px) {
        @extend %triangleBase;
        border-width: $width;
        //向右
        @if $derection==right {
            border-style: dashed dashed dashed solid;
            border-color: transparent transparent transparent $color;
        }
        //向左
        @if $derection==left {
            border-style: dashed solid dashed dashed;
            border-color: transparent $color transparent transparent;
        }
        //向上
        @if $derection==top {
            border-style: dashed dashed solid dashed;
            border-color: transparent transparent $color transparent;
        }
        //向下
        @if $derection==bottom {
            border-style: solid dashed dashed dashed;
            border-color: $color transparent transparent transparent;
        }
    }
    
    //-----------------------------------直角三角形-----------------------------------------
    //right-angledTriangle:直角三角形
    //例子：@include right-angledTriangle(1,red);
    @mixin right-angledTriangle ($derection:1, $color:#000, $width: 20px, $opacity:transparent, $border:dashed) {
        @extend %triangleBase;
        border-width: $width;
        //向右
        @if $derection==1 {
            border-style: $border dashed dashed $border;
            border-color: $color $opacity $opacity $color;
        }
        //向右
        @if $derection==2 {
            border-style: $border $border dashed dashed;
            border-color: $color $color $opacity $opacity;
        }
        //向右
        @if $derection==3 {
            border-style: dashed $border $border dashed;
            border-color: $opacity $color $color $opacity;
        }
        //向右
        @if $derection==4 {
            border-style: dashed dashed $border $border;
            border-color: $opacity $opacity $color $color;
        }
    }
    
    //-----------------------------------圆角-----------------------------------------
    //radius:圆角
    //例子：@include radius(24,100%);
    @mixin radius($num:1234, $size: 5px) {
        @if $num==1234 {
            -webkit-border-radius: $size; //Saf3+, Chrome
            -moz-border-radius: $size; //FF1+
            border-radius: $size; //Opera 10.5, IE 9
            -ms-border-radius: $size;
        }
        @if $num==12 {
            -webkit-border-top-left-radius: $size;
            border-top-left-radius: $size;
            -webkit-border-top-right-radius: $size;
            border-top-right-radius: $size;
            -moz-border-top-left-radius: $size;
            -ms-border-top-left-radius: $size;
            -moz-border-top-right-radius: $size;
            -ms-border-top-right-radius: $size;
        }
        @if $num==23 {
            -webkit-border-top-right-radius: $size;
            border-top-right-radius: $size;
            -webkit-border-bottom-right-radius: $size;
            border-bottom-right-radius: $size;
            -moz-border-top-right-radius: $size;
            -moz-border-bottom-right-radius: $size;
            -ms-border-top-right-radius: $size;
            -ms-border-bottom-right-radius: $size;
        }
        @if $num==34 {
            -webkit-border-bottom-right-radius: $size;
            border-bottom-right-radius: $size;
            -webkit-border-bottom-left-radius: $size;
            border-bottom-left-radius: $size;
            -moz-border-bottom-left-radius: $size;
            -moz-border-bottom-right-radius: $size;
            -ms-border-bottom-left-radius: $size;
            -ms-border-bottom-right-radius: $size;
        }
        @if $num==14 {
            -webkit-border-top-left-radius: $size;
            border-top-left-radius: $size;
            -webkit-border-bottom-left-radius: $size;
            border-bottom-left-radius: $size;
            -moz-border-top-left-radius: $size;
            -moz-border-bottom-left-radius: $size;
            -ms-border-top-left-radius: $size;
            -ms-border-bottom-left-radius: $size;
        }
        @if $num==13 {
            -webkit-border-top-left-radius: $size;
            -webkit-border-bottom-right-radius: $size;
            -ms-border-top-left-radius: $size;
            -ms-border-bottom-right-radius: $size;
            border-top-left-radiu: $size;
            -moz-border-top-left-radius: $size;
            border-bottom-right-radiu: $size;
            -moz-border-bottom-right-radius: $size;
        }
        @if $num==24 {
            -webkit-border-top-right-radius: $size;
            border-top-right-radius: $size;
            -webkit-border-bottom-left-radius: $size;
            border-bottom-left-radius: $size;
            -moz-border-top-right-radius: $size;
            -moz-border-bottom-left-radius: $size;
            -ms-border-top-right-radius: $size;
            -ms-border-bottom-left-radius: $size;
        }
    }
    
    //-----------------------------------边框阴影-----------------------------------------
    //boxshadow:边框阴影
    //例子：@include boxshadow(24,100%);
    @mixin boxshadow($x: 3px, $y: 3px, $shadowcolor: #cccccc) {
        -moz-box-shadow: $x $y 4px $shadowcolor; // FF3.5+ 
        -webkit-box-shadow: $x $y 4px $shadowcolor; // Saf3.0+, Chrome 
        box-shadow: $x $y 4px $shadowcolor; // Opera 10.5, IE 9.0 
        filter: progid:DXImageTransform.Microsoft.dropshadow(OffX=#{$x}, OffY=#{$y}, Color='#{$shadowcolor}');
        /* IE6,IE7 */
        -ms-filter: "progid:DXImageTransform.Microsoft.dropshadow(OffX=#{$x}, OffY=#{$y}, Color='#{$shadowcolor}')";
        /* IE8 */
    }
    
    //-----------------------------------透明度-----------------------------------------
    //myOpacity:透明度
    //例子：@include myOpacity(0.3,93,197,16);
    @mixin myOpacity($opacity:0.5, $r:0, $g:0, $b:0) {
        $xx: $opacity * 100;
        filter: alpha(opacity=$xx);
        background-color: rgba($r, $g, $b, $opacity); // rgba()和opacity都能实现透明效果，但最大的不同是opacity作用于元素，以及元素内的所有内容的透明度，而rgba()只作用于元素的颜色或其背景色.两种都不被IE支持(IE9开始支持)
        //如果要兼容ie文字不透明，需要用元素把文字包裹起来，然后色值position：relative或者absolute。
        //opacity: $opacity;//opacity属性是css3的属性，也可以实现透明效果，跟background-color: rgba同样效果。    
    }
        //-----------------------------------透明度-----------------------------------------
    //引用例子:@include opacity(0.8);
    @mixin opacity($opacity) {
        opacity: $opacity;
        $opacity-ie: $opacity * 100;
        filter: alpha(opacity=$opacity-ie); //IE8
    }
    //-----------------------------------动画keyframes生成-----------------------------------------
    //动画keyframes生成
    //例子：@include keyframes(动画名称);
    //@include keyframes(move-the-object) {
    //    0% {
    //        transform: translateX(0);
    //    }
    //    100% {
    //        transform: translateX(200px);
    //    }
    //}
    @mixin keyframes($animationName) {
        @-webkit-keyframes #{$animationName} {
            @content;
        }
        @-moz-keyframes #{$animationName} {
            @content;
        }
        @-o-keyframes #{$animationName} {
            @content;
        }
        @keyframes #{$animationName} {
            @content;
        }
    }
```
## @include



## @import与partials



## @extend与继承



## sass嵌套规则与属性

>  Sass 嵌套 CSS 选择器类似于 HTML 的嵌套规则。

很多 CSS 属性都有同样的前缀，例如：font-family, font-size 和 font-weight ， text-align, text-transform 和 text-overflow。

在 Sass 中，我们可以使用嵌套属性来编写它们：

```css
font: {
  family: Helvetica, sans-serif;
  size: 18px;
  weight: bold;
}

text: {
  align: center;
  transform: lowercase;
  overflow: hidden;
}

/*转换为css*/
font-family: Helvetica, sans-serif;
font-size: 18px;
font-weight: bold;

text-align: center;
text-transform: lowercase;
text-overflow: hidden;
```



## sass函数



## [如何在 SCSS 使用 JavaScript 变量/scss全局变量](https://www.cnblogs.com/fayin/p/10363924.html)

发现一个更好的方法，[预处理器加载一个全局设置文件](https://vue-loader-v14.vuejs.org/zh-cn/configurations/pre-processors.html)

[官方github](https://github.com/shakacode/sass-resources-loader)给出了详细的配置。

------

在 SCSS 中使用变量很方便，创建一个 variables.scss 文件，里面声明各种变量，如果你需要使用这些变量，就使用`@import variables.scss`导入这个文件即可。但这样会存在两个小问题：

- 每次使用都要导入，不优雅
- JavaScript 文件无法使用这些变量

有没有两全其美并足够简单的方法呢？（：废话

假设有这样一个保存 scss 变量的文件，style/scss/variables.js:

```js
module.exports = {
  'red-color': 'red',
  'px': `${1/20}rem`
}
```

仅需要在 webpack.config.js 中更改下配置：

```js
let styleVariables = require('/style/scss/variables')

// 其他配置
...

{
  test: /\.scss$/,
  use: [
    'css-loader',
    'postcss-loader',
    {
      loader: 'sass-loader',
      options: {
        data: Object.keys(styleVariables)
          .map(k => `\$${k}: ${styleVariables[k]};`)
          .join('\n')
      }
    }
  ]
},
```

那么在任意 scss 中，都可以直接使用我们在 JavaScript 文件中声明的变量，而无需额外引入：
// page-a.scss

```
.page-a {
  height: 20*$px;
  color: $red-color;
}
```



# Less

/*1.变量命名

@变量名：值；

必须有@前缀，不能包含特殊字符，不能以数字开头，大小写敏感

```css
/*例如：*/
@color: pink;  @font14： 14px;
body {
  background-color: @color;
}
```

2.less编译

使用Easy-Less插件

 

3.less嵌套

3.1 子元素的样式直接写到父元素中。

```less
.header {
  width: 200px;
  height: 200px;
  background-color: red;
  a {
    color: red;
  }
```

3.2 当遇到交集|伪类|伪元素选择器

内层选择器的前面如果没有&符号，则认为是父选择器的后代，如果有&则解析为父元素本身或父元素的伪类。

例子： 

```less
a {
  color: red;
  &:hover {
    color: blue;
  }
}
```

3.3 less的运算

运算符的左右必须用一个空格隔开

两个有单位的数参与运算，结果取第一个值的单位

两个值只有一个值有单位，则结果取该单位

```less
@color: pink;
@font14: 14px;
body {
  background-color: @color;
}

```



# 编写Sass的八个技巧

Sass可以编译出非常优秀的CSS样式表，或者说，这就是Sass要做的事情。

有效的使用Sass可以帮助你构建出干净的有效的CSS，但如果运用不好，Sass其实会让你的CSS文件变得更大，并且添加一些不必要的和重复的CSS代码。

下面一些编写Sass小技巧，可以有效帮助你编写出更好的Sass。

## １、你的Sass结构

在你的项目中使用Sass，管理好网站的结构是对每一个项目最重要的一点。使用Partials允许你把CSS分成若干个更小更易于管理的代码块，这样更易于维护和扩展。

Partial文件使用下划线来命名SCSS文件(如：`_buttons.scss`)，不引入这部分代码是不会编译出CSS代码。每个partial文件都将会在Sass根目录下的主体文件(如：`global.scss`)引入。

例如，这有一个示例，来演示这部分：

```
vendor/
base/
|
|-- _variables.scss
|-- _mixins.scss
|-- _placeholders.scss

framework/
modules/
global.scss
```

这样的文件结构可以确保该网站是很容易工作，并且可以随时添加新的文件。例如，新的模块文件可以很容易添加到`modules`文件夹中，然使用通过`@import`添加到`global.scss`文件中。

为了演示，将`global.scss`文件拿出来做演示：

```
/* VENDOR - Default fall-backs and external files.
========================================================================== */

@import 'vendor/_normalize.scss';


/* BASE - Base Variable file along with starting point Mixins and Placeholders.
========================================================================== */

@import 'base/_variables.scss';
@import 'base/_mixins.scss';
@import 'base/_placeholders.scss';


/* FRAMEWORK - Structure and layout files.
========================================================================== */

@import 'framework/_grid.scss';
@import 'framework/_breakpoints.scss';
@import 'framework/_layout.scss';


/* MODULES - Re-usable site elements.
========================================================================== */

@import 'modules/_buttons.scss';
@import 'modules/_lists.scss';
@import 'modules/_tabs.scss';
```

作为一个知识的侧重点，你可以看看[Hugo对Sass结构方面的一些见解](http://www.sitepoint.com/architecture-sass-project/),因为他在这一个领域有非常深的经验。

### 扩展阅读

- [管理Sass项目文件结构](http://www.w3cplus.com/preprocessor/architecture-sass-project.html)
- [如何组织一个Sass项目](http://www.w3cplus.com/preprocessor/beginner/how-to-structure-a-sass-project.html)
- [css-burrito: an organizational Sass template](http://www.bignerdranch.com/blog/css-burrito-an-organizational-sass-template/)
- [A Little Structure For Your Large Sass Project](https://medium.com/@wanderingmatt/a-little-structure-for-your-large-sass-project-7fe19ab647fa)
- [Our CSS/Sass Project Architecture and Styleguide](http://blog.groupbuddies.com/posts/32-our-css-sass-project-architecture-and-styleguide)
- [SCSS: How do you structure your file architecture and why?](http://branch.com/b/scss-how-do-you-structure-your-file-architecture-and-why)
- [Our Front-end Development Practices: How I Structure my SASS Projects](http://www.infobahndesign.com/how-i-structure-my-sass-projects/)

## 2、更有效的使用Sass变量

变量是Sass中最简单的特性之一，但有时候也会使用不当。创建站点范围内有语义化的变量，是不可或缺的工作。如果命名不好，他会变得难以理解和重复使用。

这里有一些命名变量的小技巧，提供参考：

- 命名变量时不要含糊不清
- 坚持一种命名规则（Modular, BEM等等）
- 确定变量的使用是有道理的

这有一个好的示例：

```
$orange: #ffa600; 
$grey: #f3f3f3; 
$blue: #82d2e5;

$link-primary: $orange;
$link-secondary: $blue;
$link-tertiary: $grey;

$radius-button: 5px;
$radius-tab: 5px;
```

这个是不好的示例：

```
$link: #ffa600;
$listStyle: none;
$radius: 5px;
```

## 3、减少Mixins的使用

[Mixins](http://sass-lang.com/documentation/file.SASS_REFERENCE.html#mixins)是实现代码块的一种伟大方式，可以在一个站点内多次使用。然而，`@include`定义好的Mixins和在CSS代码中复制、粘贴没什么不一样。它将会让你的CSS代码生成很多重复的代码，让你的文件变得越来越臃肿。

到目前为止，Mixins只适合那种需要通过传递参数来快速创建样式的情形。

例如:

```scss
@mixin rounded-corner($arc) {
    -moz-border-radius: $arc;
    -webkit-border-radius: $arc;
    border-radius: $arc;  
}
```

`rounded-corner`这个Mixins可以在任何情况下使用，仅仅通过改变其参数`$arc`的值，将得到不同的代码：

```scss
.tab-button {
     @include rounded-corner(5px); 
}

.cta-button {
     @include rounded-corner(8px); 
}
```

像这样使用Mixins是不明智的：

```scss
@mixin cta-button {
    padding: 10px;
    color: #fff;
    background-color: red;
    font-size: 14px;
    width: 150px;
    margin: 5px 0;
    text-align: center;
    display: block;
}
```

这个Mixins没有传递任何参数，更建议[使用`%placeholder`来创建](http://www.sitepoint.com/sass-mixin-placeholder/)，这也是接下来要说的第四点。

## 4、拥抱Placeholder

与Mixins不同，[%placeholder](http://sass-lang.com/documentation/file.SASS_REFERENCE.html#placeholder_selectors_)也可以多次使用，而且不会生成重复的代码。这使得输入的CSS更友好，更干净。

```scss
%bg-image {
    width: 100%;
    background-position: center center;
    background-size: cover;
    background-repeat: no-repeat;
}

.image-one {
    @extend %bg-image;
    background-image:url(/img/image-one.jpg");
}

.image-two {
    @extend %bg-image;
    background-image:url(/img/image-two.jpg");
}
```

编译出来的CSS：

```scss
.image-one, .image-two {
    width: 100%;
    background-position: center center;
    background-size: cover;
    background-repeat: no-repeat;
}

.image-one {
    background-image:url(/img/image-one.jpg") ;
}

.image-two {
    background-image:url(/img/image-two.jpg") ;
}
```

多个选择器运用了相同的`%placeholder`也只会输出一次代码。没有引用的`%placeholder`是不会输出任何CSS代码。

和第三点的Mixins配合在一起使用，既可保持Mixins灵活性，而且还可以保持代码的简洁与干净。

```scss
/* PLACEHOLDER 
============================================= */

%btn {
    padding: 10px;
    color:#fff;
    curser: pointer;
    border: none;
    shadow: none;
    font-size: 14px;
    width: 150px;
    margin: 5px 0;
    text-align: center;
    display: block;
}

/* BUTTON MIXIN 
============================================= */

@mixin  btn-background($btn-background) {
    @extend %btn;
    background-color: $btn-background;
    &:hover {
        background-color: lighten($btn-background,10%);
    }
}

/* BUTTONS
============================================= */

.cta-btn {
    @include btn-background(green);
}

.main-btn {
    @include btn-background(orange);
}

.info-btn {
    @include btn-background(blue);
}
```

### 扩展阅读

- [理解Sass的选择占位符%placeholder](http://www.w3cplus.com/preprocessor/understanding-placeholder-selectors.html)
- [Sass:Mixin还是Placeholder](http://www.w3cplus.com/preprocessor/sass-mixin-placeholder.html)
- [理解SASS的嵌套，@extend，%Placeholders和Mixins](http://www.w3cplus.com/preprocessor/sass-basic-mixins-nesting-placeholders-extend.html)
- [SASS Placeholders Versus Mixins and Extends](http://miguelcamba.com/blog/2013/07/11/sass-placeholders-versus-mixins-and-extends/)
- [Understanding placeholder selectors](http://thesassway.com/intermediate/understanding-placeholder-selectors)
- [Sass: Mixin or Placeholder?](http://www.sitepoint.com/sass-mixin-placeholder/)
- [Ditto: Making good use of Sass extends and placeholder selectors](http://www.fredparke.com/blog/ditto-making-good-use-sass-extends-and-placeholder-selectors)
- [Sass Mixin and Sass Placeholder Tutorial](http://learnwebtutorials.com/sass-mixin-placeholder-tutorial)

## 5、使用Function计算

使用[Functions](http://sass-lang.com/documentation/file.SASS_REFERENCE.html#functions)来进行计算。Sass的函数不会输出任何CSS代码。相反，在使用的函数的时候，他会返回一个值。在网站使用函数来计算是非常有用的。

例如，函数可以计算给定元素的百分比宽度值：

```
@function calculate-width ($col-span) {
    @return 100% / $col-span
}

.span-two {
    width: calculate-width(2); // spans 2 columns, width = 50%
}

.span-three {
    width: calculate-width(3); // spans 3 columns, width = 33.3%
}
```

### 扩展阅读

- [Using pure Sass functions to make reusable logic more useful](http://thesassway.com/advanced/pure-sass-functions)
- [Sass Functions for Play + Profit](http://www.intridea.com/blog/2014/2/11/sass-functions-for-fun-profit)

## 6、有顺工作

将所有的Mixins、Placeholder、Functions和变量放置在一起。将他们放置一起，可以确认他们可以很快的编写以及将来重复使用。

整站的元素应该放在一个`base`文件夹中。`base`文件夹应该包括全局的变量，如字体和颜色等：

```
$font-primary: 'Roboto', sans-serif; 
$font-secondary: Arial, Helvetica, sans-serif;

$color-primary: $orange;
$color-secondary: $blue;
$color-tertiary: $grey;
```

对于特定模块的Mixins、Functions 和变量，为了保证模块能正常运行，需要将这些集中放置在`module`文件中：

```
$tab-radius: 5px;
$tab-color: $grey;
```

## 7、限制嵌套

[Sass的嵌套规则](http://www.sitepoint.com/8-tips-help-get-best-sass/nested_rules)是，过度的嵌套会导致很多问题的发生,代码变得复杂，而且太过于依赖HTML结构。这样将导致后面的样式需要使用`!important`来覆盖，而这种方式，我们应该尽量要去避免的。

这有几条是使用嵌套的黄金规则：

- 嵌套永远不要超过三个层级
- 确保输出的CSS简洁、可重用
- 使用嵌套是很有意义的，而不是默认选项

## 保持简单

这篇文章的结论是保持简单。使用Sass的目的是要写出更简洁，更易于管理的CSS。在创建任何新的Mixins、变量或函数之前，你都需要确保它们的存在将会加强开发，并不会把事情整得更复杂。Sass的所有功能只要在适度的使用和正确的使用，才能发挥其最大的作用。

无休止创建一个变量列表，或者创建一个复杂的函数，对于任何人来都是很难理解的，因为其他人必竟不是作者，无法理解作者的意图，或者说这样对开发并没带来好处和编译出干净的CSS。

### 扩展阅读

- [保持Sass的简单](http://www.w3cplus.com/preprocessor/keep-sass-simple.html)

## 结论

上面所说的这些小技巧，或许你并不会完全认可。Sass仍然是一门很新的技术，因此我们只有不断去学习和实践，才能得到更多的有用技巧。如果您有更好的看法，欢迎在评论中一起讨论。

译者手语：整个翻译依照原文线路进行，并在翻译过程略加了个人对技术的理解。如果翻译有不对之处，还烦请同行朋友指点。谢谢！

出处：

英文原文：http://www.sitepoint.com/8-tips-help-get-best-sass/

中文译文：http://www.w3cplus.com/preprocessor/8-tips-help-get-best-sass.html