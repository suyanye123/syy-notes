# sass

### 1.sass中mixin的用法

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

