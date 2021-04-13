---
typora-root-url: ../.vuepress/public
sidebarDepth: 2
---

# Vue3

## 一、vue3和vue2的区别



------

## 二、setup的使用

#### 1.通过ref新建响应式数据

##### （1）什么是ref?

ref和reactive一样,也是用来实现响应式数据的方法
由于reactive必须传递一个对象,所以在实际开发中如果只是想让某个变量实现响应式的时候回非常麻烦
所以Vue3提供了ref方法实现简单值得监听

##### （2）.ref本质

ref底层其实还是reactive,所以当运行时系统会自动根据传入的ref转换成reactive.

##### （3）ref注意点

在vue中使用ref的值不用通过value获取
在js中使用ref的值必须通过value获取

![vue1](/img/vue/vue1.png)

##### （4）ref获取元素

在vue2中我们可以通过给元素添加ref=‘xxx’,然后在代码中通过refs.xxx的方式来获取元素,在vue3中也可以通过ref来获取元素.
但不是像以下这种熟悉的方式,因为在vue3中没有$和refs这些东西.

###### 错误示范

![wrong](/img/vue/vue2.png)

###### 正确写法

![vue3](/img/vue/vue3.png)

------

#### 2.通过props接收传递的数据



------

## 三、深入vue3响应式原理