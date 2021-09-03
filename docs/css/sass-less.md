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