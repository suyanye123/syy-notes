# Vue2

前置知识： [Object](../js/object)

## 一、响应式原理

当你把一个普通的 JavaScript 对象传入 Vue 实例作为 data 选项，Vue 将遍历此对象所有的 property，
并使用 Object.defineProperty 把这些 property 全部转为 getter/setter。
Object.defineProperty 是 ES5 中一个无法 shim 的特性，
这也就是 Vue 不支持 IE8 以及更低版本浏览器的原因。

每个组件实例都对应一个 watcher 实例，它会在组件渲染的过程中把“接触”过的数据 property 记录为依赖。
之后当依赖项的 setter 触发时，会通知 watcher，从而使它关联的组件重新渲染。

但是由于javascript的限制，vue不能检测数组和对象的变化，
因为vue无法检测属性的添加或移除，所以property必须在data对象中保存，vue才能转化为响应式

```js
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
情况一：对象已经创建，需要给上面添加set、get方法

```js
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

```js
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

```js
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



------

## 二、常用API

### 1.object.defineProperty

object的一个方法，可以用来添加一个属性，通过

```js
let number = 19;
let person = {
  name: "zs",
  sex: "man",
};
Object.defineProperty(person, "age", {
  // value: 18,
  enumerable: true, //控制属性是否可以枚举，默认值为false
  writable: true, //控制属性是否可修改，默认为false
  configurable: true, //控制属性是否可以删除，默认是false
  get() {
    console.log("有人取属性");
    return number;
  },
  set(data) {
    console.log("有人修改属性");
    number = data;
  },
});

```

### 2.数据代理

通过一个对象代理，对另一个对象中属性的操作（读写）

```js
let obj = { x: 100 };
let obj2 = { y: 200 };
Object.defineProperty(obj2, "x", {
  get() {
    return obj.x;
  },
  set(value) {
    obj.x = value;
  },
});
```

### 3.数据劫持

实现数据与视图的响应式，只在vue实例的data属性中才有



### 4.事件修饰符

- prevent 阻止默认事件
- stop 阻止事件冒泡
- once 事件只触发一次
- capture 使用事件的捕获模式（默认是冒泡阶段，才处理事件）
- self  只有event.target是当前操作的元素时，才触发事件
- passive 事件的默认行为立即执行，无需等待事件回调执行完毕

### 5.计算属性

```js
//通过已有属性计算新值，然后挂载到vm实例上
computed:{
  fullName:{
   //底层还是借助object.defineProperty的get、set实现的
   //结算属性得到的值可以缓存，不会每次使用时都调用get
   //get什么时候调用？第一次初始化时，或者依赖的数据发生变化时
   get(){
   //在这里规定调用computed的是vm实例，取data里的数据要使用this，所以注意不要使用箭头函数！
   		return this.xxx+this.xxx
    }，
    //set，可不写
    set(){}
  }
}	
//最终精简写法
computed:{
  fullName(){
    return this.xxx+this.xxx
  }
}
```

### 6.监视属性

```js
// 监视属性可以监视 计算属性,监视的属性必须存在
watch: {
  isHot: {
    // 初始化时，让handler调用一次，默认为false
    immediate: true,
    // WatchOptionsWithHandler，当isHot发生改变时调用handler，返回新值与旧值
      handler(newvalue, oldvalue) {},
    },
},
// 监视属性第二种写法
vm.$watch("isHot", { handler(newvalue, oldvalue) {} });
```

```js
//深度监视(多级结构中，watch不能监视对象内部的改变，这时候可以采用深度监视)
vm.$watch("isHot", {
    deep:true,
    handler(newvalue, oldvalue) {} 
});
```

```js
//watch简写形式,同样不允许使用箭头函数
watch:{
    isHot(new,old){
        console.log(new,old)
    }
}
vm.$watch("isHot", function(new,old){ console.log(new,old) })
```

#### 计算属性与监视属性的对比

- computed能完成的功能，watch都可完成

- 计算属性内，不能开启异步任务去维护数据的（因为依赖于一开始定义的返回值），watch内可以异步计算
- 所有被vue管理的函数，最好写成普通函数，这样this的指向才是vm实例
- 所有不被vue管理的函数（定时器，ajax的回调函数),最好写成箭头函数，这样this的指向才是vm实例。否则this为window（因为是js引擎调用的异步任务）

### 7.v-for中key的原理



### 8.vue监测数据改变

- 对象中

```js
//通过observer实例对象，用于监视data中属性的改变
const obs = new Observer(data)
function Observer(obj){
	//汇总对象中的属性形成一个数组
	const keys = Object.keys(obj)
	//遍历
	keys.forEach((item)=>{
	//此处的this是observer实例对象,还是通过get和set来进行数据代理
	Object.defineproperty(this,item,{
		set(){}
		get(){}
	})
	})
}
//最后赋值给 vm._data = obs
```

- 数组中

```
//vue2无法检测数组中元素的变更，除非更改整个原数组,或使用指定的 数组方法
```

- Vue.set()

```js
//添加响应式的数据 Vue.set(target,key,val)
//在组件实例上的写法 vm.$set(target,key,val)
this.$set(this.xxx,'xxx',xxx)
```



### 9. $nextTick

在下一次DOM更新结束后，执行指定的回调

什么时候用：当改变数据后，要基于更新后的新DOM进行某些操作时，要在nextTick所指定的回调函数中执行

```js
this.$nextTick(function(){
	this.$refs.inputTiltle.focus()
})
```



### 10.vue动画过渡

vue封装的过渡与动画，在插入、更新或移除DOM元素时，会在合适的时候给元素添加样式类名

```vue
//1.动画实现，用transition包裹
<transition>
	<h1> XXXXX </h1>
</transition>
...
<style>
    //自定义动画
    .v-enter-active{..}
    .v-leave-active{..}
</style>
```

```html
//2.过渡实现
<transition>
	<h1> XXXXX </h1>
</transition>
...
<style>
 //进入的起点，离开的终点
    .v-enter，.v-leave-to{transform:translateX(-100%)}
 //进入过程
    .v-enter-active,.v-leave-active{transition:0.5s linear}
 //离开的起点，进入的终点
    .v-enter-to，.v-leave{transform:translateX(0)}
</style>
```

```html
//3.多个元素使用同一个动画
<transition-group>
	<h1 key=1>xxx</h1>
	<h1 key=2>xxx</h1>
</transition-group>
```

```
//4.集成第三方动画 Animate.css
```

### 11.代理解决跨域

```
1.jsonp
2.CORS
3.反向代理：nginx、webpack
```

```js
//vue.config.js
//方式一，仅能代理一个端口，且如果本地有则先取本地文件
module.exports = {
  pages:{
    index:{
      //入口
      entry:'src/main.js'
    }
  }
    lintOnSave:false,
    devServer:{
    proxy:'http://localhost:xxxx' //xxxx为目标端口
 	  }
}
```

```js
//vue.config.js
//方式二，仅
module.exports = {
  pages:{
    index:{
      //入口
      entry:'src/main.js'
    }
  }
  lintOnSave:false,
  devServer:{
  proxy: {
  	'/api':{
        target:'<url>',	//http://localhost:xxxx 目标端口
  			pathRewrite:{'^/api':''}
  			ws:true,	//用于支持websocket
  			changeOrigin：true	//是否改变请求头中的host值(影响refer)
     	 },
  	'/foo':{
      	target:'<other_url>'
    	}
		}
 	}
}
```



------

## 三、传值

### 1.父传子

props

### 2.子传父

$emit

### 3.兄弟组件,通过eventBus

##### 全局事件总线，是一种组件通信的方式，适用于 任意组件间通信。

```js
//安装全局事件总线
new Vue({
    ...
    beforeCreate(){
    	Vue.prototype.$bus = this  //$bus就是当前应用的vm
}
})
```

```js
//使用事件总线
methods(){
    demo(data){...}
}
...
mounted(){
    this.$bus.$on('xxx',this.demo)
    //提供数据 this.$bus.$emit('xxx',this.demo)
}
//最好记得解绑对应事件
beforeDestroy(){
    this.$bus.$off('xxx')
}
```

### 4.消息订阅与发布

借助第三方库 `pubsub-js`，也可以实现任意组件通信

```js
npm i pubsub-js
//1.在需要使用的组件内，订阅消息
import pubsub from 'pubsub-js'
mounted(){
    //回调函数记得用箭头函数，不然里面的this是undefined，或者把回调函数写在methods里
  const this.id = pubsub.subscribe('hello',(a,b)=>{
        console.log('hello事件的回调函数')
        //回调函数接受两个参数，a--消息名，b--传递数据
    })
}
//最好记得解绑对应事件
beforeDestroy(){
     pubsub.unsubscribe(this.id)
}
//2.在发布消息的组件
import pubsub from 'pubsub-js'
methods:{
    sendMessage(){
        pubsub.publish('hello',666)
    }
}
```



### 5.祖先组件

##### inject\provide

###### 缺点：传递给后代的数据不是响应式的，除非祖先组件在注入时以响应式的方式注入数据



### 6.vueX



## 四、vue-router


### 懒加载

vue的路由配置文件(routers.js)一般使用import引入的写法，当项目打包时路由里的所有component都会打包在一个js中，在项目刚进入首页的时候，就会加载所有的组件，所以导致首页加载较慢。

而用require这种方式引入的时候，会将你的component分别打包成不同的js，加载的时候也是按需加载，只用访问这个路由网址时才会加载这个js，就避免进入首页时加载内容过多。

```js
component: resolve => require(['@/view/index.vue'],)
```



## 五、Vue扩展

### 自定义函数挂载到全局方法

在Vue中可以将自定的方法挂载到全局的方法中，这样在全局的页面都可以不通过引用，而直接使用自定义的方法了，在vue中使用非常广泛。

**方法一：使用Vue.prorotype**

　　第一中方法与定义全局变量一样，在main.js中进行引入(但因为main.js是入口文件，不推荐在其中写入其他逻辑代码)。在main.js中写入函数

```js
Vue.prototype.getPdf = function (){
  ...
}
```

 　这样在所有的组件中便可以调用函数了。

```js
this.getPdf（）
```

**方法二：使用exports.install+Vue.prototype(推荐)**

在htmlToPdf.js文件中创建自己的自定义的方法getPdf()。

```js
export.install = function(Vue,options){
    vue.prototype.getPdf = function(){
       ...         
    }
}
```

在main.js引入并使用

```js
import htmlToPdf from './htmlToPdf';
Vue.use(htmlToPdf);
```

在用了`exports.install`方法时，运行报错`exports is not defined、原因是es6的语法转换问题，统一使用es6的语法来写即可。`

**解决方法：**

```js
export default{
   install(Vue){
       Vue.prototype.getPdf ={
         ...
       }    
    }    
}　　
```

**方法三：使用全局变量模块文件**

Global.vue文件：

```js
<script>
    const token='12345678';

    export default {
        methods: {
            getToken(){
                ....
            }
        }
    }
</script>
```

在需要的地方引入全局变量模块文件，然后通过文件里面的变量名称获取全局变量参数值。

```js
<script>
import global from '../../components/Global'//引用模块进来
export default {
    data () {
        return {
            token:global.token
        }
    },
    created: function() {
        global.getToken();
    }
}
</script>
```
