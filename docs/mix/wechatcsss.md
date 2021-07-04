## uniapp小程序中的CSS

### 1.hover-class

为了**增强小程序触感，提高用户交互感知度**微信小程序中，可以用 hover-class 属性来指定元素的点击态效果。

但是在在使用中要注意，大部分组件是不支持该属性的。

- 目前支持 hover-class 属性的组件有三个：view、button、navigator。
- 不支持 hover-class 属性的组件，同时也不支持 hover-stop-propagation、hover-start-time、hover-stay-time 这三个属性。
- 当 hover-class 的值为 none 时，组件上不会有任何点击态效果。

![clipboard.png](https://img.jbzj.com/file_images/article/201902/2019022610092810.png)

注意事项

- hover-class样式显示的原理是 点击时把样式加到class的样式中，冲突时，谁在后面就显示谁!
- 当组件中没有任何指定的类时，直接使用 hover-class 就会起到相应的作用，但是当组件中已经指定了其他可能与 hover-class 冲突的类时，hover-class 无效
- 将 hover-class 指定的类放在对应 wss 文件的最末尾，这样就不会被其他类所覆盖
- 通常，当一个 view 组件中包含 image 等不支持 hover-class 的组件，但又需要在该组件上使用 hover-stop-propagation 属性的作用时，需要将不支持 hover-class 的组件用view、button 或 navigator 包裹起来

#### 使用场景1,点击跳转

```html
//html
<view hover-class='myhover'>
  ...
</view>
//css
.myhover {
  opacity: 0.9;
  background: #f7f7f7;
}
```

#### 使用场景2,不触发跳转

设置hover-stay-time属性，突出显示当前触摸行或列：

```html
//html
<view hover-class='wsui-btn__hover_list' hover-stay-time="3000">
  ...
</view>
//css
.wsui-btn__hover_list {
  opacity: 0.9;
  background: #f7f7f7;
}
```

#### 使用场景3，提交类按钮

```css
.wsui-btn__hover_btn {
//圆形按钮
 opacity: 0.9;
 transform: scale(0.95, 0.95);
//长矩形按钮
 position: relative;
 top: 3rpx;
 left: 3rpx;
 box-shadow:0px 0px 8px rgba(0, 0, 0, .1) inset; 
}
```

