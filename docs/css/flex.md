# flex布局


flex 布局非常好用，但在开发过程中可能会碰到的一些坑

##### 1、内容超出容器
大致情况是：在一个设置了 `display:flex` 布局的大容器 A 中并排放置两个子容器，并且子容器设置 f`lex:1`，子容器中都有一个元素包含一段文本，这段文本设置了不换行并且显示省略号的样式，当文本过长的时候，子容器会被撑开，如下效果：

相关代码：

```vue
<view class='hot-content-box'>
<view wx:for="{{hotCollageList}}" 
      wx:key="hci" 
      class='hot-item-box' 
      data-goodsid="{{item.goodsId}}" 
      data-activityid="{{item.activityId}}" 
      bindtap="goodsDetail">
<image src='{{item.goodsPic}}' mode='widthFix'></image>
<view class='goods-name'>{{item.goodsName}}</view>
<view class="goods-num">{{item.rule.numLimit}}人团</view>
<view class="goods-price-box">
<view class="goods-act-price goods-line">¥{{item.actualPrice}}</view>
<view class="goods-price-txt goods-line">拼团价</view>
<view class="goods-org-price goods-line">¥{{item.goodsPrice}}</view>
</view>
</view>
</view>
.hot-content-box {
padding: 0 30rpx 30rpx;
background: #fff;
display: flex;
}

.hot-item-box {
padding: 20rpx;
box-shadow: inset 0 -1px 1px 1px rgba(228, 221, 221, 0.50);
border-radius: 8px;
flex: 1;
}
.hot-item-box:first-child{
margin-right: 30rpx;
}
.goods-name {
font-size: 18px;
color: #000;
letter-spacing: 0.72px;
line-height: 22px;
width: 100%;
overflow: hidden;
text-overflow: ellipsis;
white-space: nowrap;
}
```

这里的 `text-overflow: ellipsis`不生效，省略号没有出现，并且过长的文字将子容器撑开，问题可能出在于子容器没有设置宽度，省略符可能需要对父元素设置宽度，设置为 100%无效，当设置为 0 的时候，省略号出现了

```css
.hot-item-box {
padding: 20rpx;
box-shadow: inset 0 -1px 1px 1px rgba(228, 221, 221, 0.50);
border-radius: 8px;
flex: 1;
width: 0;
}
```

因为不设置宽度，子容器会被文本节点无限撑开，通过测试发现，设置子容器 `overflow:hidden` 也可以满足效果。

这里参考：https://blog.csdn.net/zgh0711/article/details/78270555

------

##### 2、设置了固定宽高的图片被压缩、挤压
通常实现如下的效果，是把外层容器设置为 `display:flex`，容器中图片设置固定宽高度，右边元素设置为 `flex:1`，但当右边元素宽度超出剩余空间的时候，图片会被挤压，变成椭圆形。

这是因为在 flex 容器中，当空间不够的时候，`flex-shrink` 不为 0 的元素会被压缩，所以解决的方法就是给图片设置：`flex-shrink:0`。

```css
.existCollages .row image {
width: 40px;
height: 40px;
border-radius: 50%;
margin-right: 8px;
flex-shrink: 0;/_防止被压缩_/
```


