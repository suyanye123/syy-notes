# sass

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

