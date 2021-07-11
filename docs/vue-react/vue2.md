---
sidebarDepth: 2
---

# Vue2

## 一、响应式原理

当你把一个普通的 JavaScript 对象传入 Vue 实例作为 data 选项，Vue 将遍历此对象所有的 property，
并使用 Object.defineProperty 把这些 property 全部转为 getter/setter。
Object.defineProperty 是 ES5 中一个无法 shim 的特性，
这也就是 Vue 不支持 IE8 以及更低版本浏览器的原因。

每个组件实例都对应一个 watcher 实例，它会在组件渲染的过程中把“接触”过的数据 property 记录为依赖。
之后当依赖项的 setter 触发时，会通知 watcher，从而使它关联的组件重新渲染。

但是由于javascript的限制，vue不能检测数组和对象的变化，
因为vue无法检测属性的添加或移除，所以property必须在data对象中保存，vue才能转化为响应式

```
var vm = new Vue({
  data:{
    a:1
  }
})
// `vm.a` 是响应式的
vm.b = 2
// `vm.b` 是非响应式的
```

对于已经创建的实例，vue不允许动态添加根级别的响应式property
此时可以使用Vue.set(object, propertyName, value) 方法向嵌套对象添加响应式 property
或者vm.$set实例方法（全局vue.set方法的别名）



### ES5和ES6中set和get方法

ES5中
情况一：对象已经创建，需要给上面添加setget方法

```
//如果使用defineProperty定义setget，默认configurable: false，enumerable: false
        var obj={_a:0};
        Object.defineProperty(obj,"a",{
            configurable:false,
            enumerable:false,
            set:function (value) {
                this._a=value;
            },
            get:function () {
                return this._a;
            }
        });
```

情况二：当创建对象时，使用这种写法

```
//当使用对象设置setget时，configurable: true，enumerable: true
        var obj1={
            _a:0,
            set a(value){
                this._a=value;
            },
            get a(){
                return this._a;
            }
        };
        console.log(Object.getOwnPropertyDescriptor(obj1,"a"));
```

ES6种
class Box{

```
        constructor(){
            this._data=null;
        }
        set data(value){
            this._data=value;
        }
        get data(){
            return this._data;
        }
    }
```

### 组件之间传值

#### 1.父传子

props

#### 2.子传父

$emit

#### 3.兄弟组件

##### 通过eventBus

#### 4.祖先组件

##### inject\provide

###### 缺点：传递给后代的数据不是响应式的，除非祖先组件在注入时以响应式的方式注入数据



------

## 二、

------

## 三、VueX

## 四、vue-router

component: resolve => require(['@/view/index.vue'], resolve)：懒加载
component: index：非懒加载

vue的路由配置文件(routers.js)一般使用import引入的写法，当项目打包时路由里的所有component都会打包在一个js中，在项目刚进入首页的时候，就会加载所有的组件，所以导致首页加载较慢。

而用require这种方式引入的时候，会将你的component分别打包成不同的js，加载的时候也是按需加载，只用访问这个路由网址时才会加载这个js，就避免进入首页时加载内容过多。

------

## 五、vue2踩过的坑

1. 用${}时要注意不能用''或""而要用``

   ```
   getApply() {  
    this.$http.get(`/usage?type=all&page=${this.currentPage}`).then(response => {    
    ...  
    });
   }
   ```

2. axios的delete方法传参时要用data:{}包裹住

   ```
   deleteDb(index, row) {  
    this.$http.delete("/usage", {
        data:{
            redis_usage_id:row.redis_usage_id
        }
    }).then(response => {  
        ...
    });
   }
   ```

3. @click.native 原生点击事件：
   给vue组件绑定事件时候，必须加上native ，不然不会生效（监听根元素的原生事件，使用 .native 修饰符）
   相当于子组件内部处理click事件然后向外发送click事件：$emit("click".fn)

## 六、vue 中动态添加的 dom，事件和样式不生效

### 事件

v-html： vue 中用来将 string 形式的 html 内容按普通 HTML 插入的命令，并且插入的内容不会作为 Vue 模板进行编译。

如：`<a @click="show(1)"></a>`，a 标签能成功渲染，但其绑定的事件无法触发。

**原因：**vue 没有将其作为 vue 的模板解析渲染，只是作为字符串插入进去了而已

**解决：**

1.**事件委托**

把一个元素响应事件（click、keydown…）的函数委托到跟 v-html 同级的元素中，然后通过事件冒泡判断标签是不是想要的那个，从而进行操作。

```
<ul @click='eventTemp' v-html="toc">  /* 设置的代理事件 */
    /*这里是v-html插入的内容*/
</ul>

<script>
// 代理事件
const vm = new Vue({
  el: "#app",
  computed: {
    toc() {
        let tochtml = ''
        tochtml += `<a>123</a>`
        return tochtml
    }
  },
  methods: {
      eventTemp(e) {
          if (e.target.localName === 'a') { //e.target就是tochtml --> <a>123</a>
            //进行操作
            e.target.innerHTML = 321
          }
      }
  }
});
</script>
```

2.**不用 v-html 而用 component 模板编译**

组件中：

```
<div id="app">
    我是父组件
    <div id="parent">
    </div>
</div>

<script>
import Vue from 'vue';
var MyComponent = Vue.extend({
  template: '<div><a @click="show(1)">我是大魔王</a><a @click="show(2)">我是二魔王</a></div>',
  methods: { 
    show(i) {
      console.log(i);
    },
  }
});
// 必须手动挂载$mount()。如果没有挂载的话，获取不到$el。component是手动挂载完后的组件实例
var component = new MyComponent().$mount();

export default {
  mounted() {
    // 放到页面中
    document.getElementById('parent').appendChild(component.$el);
    // component.$el就是template --> <div><a>我是大魔王</a><a>我是二魔王</a></div>
  },
}
</script>
```

3.**内容绑定事件**

假如 v-html 里面有一个 class="a" 的节点，要在这个 DOM 上绑定事件。然后调用 nextTick 中的回调函数进行操作。（因为 v-html 渲染视图是异步的，只能在下一个事件循环中处理）

```
this.$nextTick().then(() => {
      $('.a').on('click',function(){
        // 在这里操作
     })
})
```

注意：v-html 适应的场景是假如服务端拼接好了dom节点需要前端直接渲染的时候。v-html 可正确解析出 dom 节点，但只适用输出展示，而不适合直接在 v-html 的内容内再定义 v-click 等事件，v-html 渲染的实质是字符串，而不是组件。所以最好不要这样用。

### 样式

vue 组件中，通过 v-html 创建的 DOM 内容不受 scoped 样式影响。

**原因：**当 `<style>` 标签有 scoped 属性时，它的 CSS 只作用于当前组件中的元素。它会**为组件中所有的标签和 class 样式添加一个`scoped`标识**。因为动态添加的 dom 没有 `scoped` 添加的标识，**没有跟 `testAdd` 的样式匹配起来**，导致样式失效。

**解决：**

1.**去掉 scoped**

```
tochtml += `<a class="aclass">123</a>`

<style>
  .aclass {
    color: red
  }
</style>
```

2.**使用深度作用选择器**

```
<style scoped>
  ul >>> .aclass {
    color: red
  }
</style>
```

> 有些像 Sass 之类的预处理器无法正确解析 >>>。这种情况下你可以使用 /deep/ 或 ::v-deep 操作符取而代之——两者都是 >>> 的别名，同样可以正常工作。

3.**可以动态添加 style**

```
newDom.style.height = '100px';
newDom.style.width = '100px';
newDom.style.background = 'red';
```

### 参考

[你或许不知道Vue的这些小技巧](https://juejin.im/post/6844903616101220365#heading-3)

[VUE v-html不能触发点击事件的解决方案](https://blog.csdn.net/qq_31393401/article/details/81017912)

[Vue项目--使用事件代理解决v-html 点击事件无效](https://blog.csdn.net/qq_42497250/article/details/102559195?utm_medium=distribute.pc_relevant.none-task-blog-BlogCommendFromMachineLearnPai2-1.channel_param&depth_1-utm_source=distribute.pc_relevant.none-task-blog-BlogCommendFromMachineLearnPai2-1.channel_param)