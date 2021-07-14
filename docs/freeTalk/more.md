# 未完待续...

1.在new的过程发生了什么

提示：4件事  创建一个新对象，将新对象指定为构造函数的this，执行函数中的代码，返回新对象



2.数组有哪些方法

push-返回新长度； pop-删除并返回最后一个 ； concat-数组拼接，返回新数组；

join(',') - 数组转成字符串拼接，默认符号为，返回新字符串，传' '时为无拼接符号；

 reverse-反转数组，更改原数组并返回； 	 shift-删除返回第一个元素；

 slice(start,end)-截取数组一部分，包含开始，不包含结束，返回新数组； 	 sort：排序，改变原数组；

 tostring-转字符串； unshift-开头添加，返回新长度；

forEach (item,index,items)遍历;



3.对象有哪些方法

map foreach



4.讲解一下vue中的computed和watch，他们有什么区别

- computed-计算属性，是通过已有属性计算新值，然后挂载到vm实例上

底层还是借助object.defineProperty的get、set实现的

结算属性得到的值可以缓存，不会每次使用时都调用getter，
只有第一次初始化时，或者依赖的数据发生变化时才调用getter

并且vue中调用computed的是vm实例，取data里的数据要使用this，在computed中注意不要使用箭头函数

- watch



5.v-for中为什么要绑定key，有什么用，写了和没写会怎么样

虚拟dom，diff算法

