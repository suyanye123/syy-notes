# Grid布局

> Grid布局的缺点：兼容性不太好

Grid 布局把网页划分为一个个网格，任意组合不同的网格

将容器划分为行和列，产生单元格，然后指定项目所在的单元格，可以看做是二维布局

## 基本概念

#### 容器和项目

采用网格布局的区域，称为容器，容器内采用网格定位的子元素，称为项目

```html
<div>	//容器
  <div><p>1</p></div> //项目
  <div><p>2</p></div>
  <div><p>3</p></div>
</div>
```

注意：项目只能是容器的顶层子元素，不包含自身的子元素，比如上面代码的<p>元素就不是项目，Grid布局只对项目生效

#### 行、列、单元格、网格线

行（row）和列（column）的交叉区域称为 单元格

划分网格的线，称为网格线，正常情况下 n行有n+1根水平网格线，m列有m+1根垂直网格线



#### 容器属性

定义在容器上面的属性

```js
display:grid	//指定容器采用网格布局
display:inline-grid		//默认情况下，容器元素都是块级元素，但也可以设为行内元素
```

```js
grid-template-columns:100px 100px 100px	//定义每一列的列宽
grid-template-rows:100px 100px 100px	//定义每一行的行宽，也可以使用百分比

grid-template-columns: repeat(3,33.33%)
//重复写同样的值很麻烦，这时可以使用repeat()函数，函数接受两个值，第一个是重复次数，第二个是索要重复的值
//reapet重复某种模式也是可以的，例如：
grid-template-columns: repeat(2,100px 20px 80px)
```

```css
//有时，单元格的大小是固定的，但是容器的大小不确定，如果希望每一行每一列可以容纳尽量多的单元格，这时可以使用auto-fill关键字
.container{
	display:grid;
	grid-template-columns:repeat(auto-fill,100px)
}
```

```js
//为了方便表示比例关系，网格布局提供了fr关键字(fraction 的缩写，意为片段)，如果两列的宽度分别为1fr和2fr，就表示后者是前者的两倍
grid-template-columns: 1fr 2fr;
//fr也可以与绝对长度的单位结合使用
grid-template-columns: 150px 1fr 2fr;
```

```js
//maxmin()函数产生一个长度范围，表示长度就在这个范围之中
grid-template-columns: 1fr 1fr minmax(100px,1fr)
```

```js
//auto关键字表示由浏览器自己决定长度
grid-template-columns: 100px auto 100px;
```



#### 网格线的名称

在`grid-template-columns`属性和`grid-template-rows`属性里面，还可以使用方括号，指定每一根网格线的名字，方便以后的引用。

```css
.container{
  display:grid;
  grid-template-rows: [c1] 100px [c2] 100px [c3] auto [c4];
  grid-template-columns: [r1] 100px [r2] 100px [r3] auto [r4];
}
```



#### 间距

```js
//row-gap属性设置行与行的间隔（行间距），columns-gap属性设置列与列的间隔（列间距）
row-gap:20px;
columns-gap:20px;

//gap是行间距与列间距的简写
gap:20px 20px;

//gap如果省略了第二个值，则 默认第二个值等于第一个值
gap:20px;
```



#### 区域

网格布局允许指定 ”区域“ ，一个区域由多个或单个单元格组成，`grid-template-areas`属性用于定义

```css
.container{
	display:grid;
  grid-template-rows: 100px 100px 100px;
  grid-template-columns: 100px 100px 100px;
  grid-template-areas:'a b c'
    									'd e f'
    									'g h i'
}
//上面代码先划分出9个单元格，然后将其定名为a到i的九个区域，分别对应这九个单元格。
```

也可以将多个单元格合并成一个区域 

```js
grid-template-areas:'header header header'
    								'main main sidebar'
    								'footer footer footer'
```

